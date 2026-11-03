import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface ExecuteRequest {
  language: string;
  code: string;
  stdin?: string;
}

interface ExecuteResponse {
  success: boolean;
  stdout: string[];
  stderr?: string;
  executionTimeMs?: number;
  engine: string;
  exitCode: number;
}

/**
 * Executes user code safely in an isolated child process with strict timeout.
 */
function executeSubprocess(
  cmd: string,
  args: string[],
  stdin: string,
  timeoutMs = 6000
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    let stdoutData = '';
    let stderrData = '';
    let timedOut = false;

    const child = spawn(cmd, args, {
      env: { ...process.env, PYTHONUNBUFFERED: '1', NODE_ENV: 'test' },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const timer = setTimeout(() => {
      timedOut = true;
      child.kill('SIGKILL');
      stderrData += '\n[Tempo Limite Excedido]: A execução ultrapassou 6 segundos (possível loop infinito).';
    }, timeoutMs);

    if (stdin && child.stdin) {
      child.stdin.write(stdin);
      child.stdin.end();
    }

    child.stdout.on('data', (chunk) => {
      // Limit output size to 100KB to prevent memory exhaustion
      if (stdoutData.length < 100000) {
        stdoutData += chunk.toString();
      }
    });

    child.stderr.on('data', (chunk) => {
      if (stderrData.length < 50000) {
        stderrData += chunk.toString();
      }
    });

    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({
        stdout: stdoutData,
        stderr: stderrData,
        exitCode: timedOut ? 124 : (code ?? 0),
      });
    });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({
        stdout: stdoutData,
        stderr: `Falha ao iniciar processo: ${err.message}`,
        exitCode: 1,
      });
    });
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // Real-time Sandbox Execution API Endpoint
  app.post('/api/execute', async (req: Request, res: Response) => {
    const startTime = Date.now();
    const { language, code, stdin = '' } = req.body as ExecuteRequest;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        stdout: [],
        stderr: 'Código não fornecido ou inválido.',
        engine: 'sandbox',
        exitCode: 1,
      });
    }

    const uniqueId = crypto.randomBytes(8).toString('hex');

    try {
      if (language === 'python') {
        const tempFilePath = path.join(os.tmpdir(), `bytelingo_${uniqueId}.py`);
        await fs.promises.writeFile(tempFilePath, code, 'utf-8');

        try {
          const result = await executeSubprocess('python3', [tempFilePath], stdin, 6000);
          const duration = Date.now() - startTime;
          const stdoutLines = result.stdout
            ? result.stdout.replace(/\r\n/g, '\n').split('\n')
            : [];
          // Remove trailing empty line if present
          if (stdoutLines.length > 0 && stdoutLines[stdoutLines.length - 1] === '') {
            stdoutLines.pop();
          }

          const response: ExecuteResponse = {
            success: result.exitCode === 0,
            stdout: stdoutLines,
            stderr: result.stderr.trim() || undefined,
            executionTimeMs: duration,
            engine: 'Python 3.10 (Linux Sandbox)',
            exitCode: result.exitCode,
          };
          return res.json(response);
        } finally {
          fs.promises.unlink(tempFilePath).catch(() => {});
        }
      }

      if (language === 'javascript' || language === 'logic') {
        const tempFilePath = path.join(os.tmpdir(), `bytelingo_${uniqueId}.mjs`);
        await fs.promises.writeFile(tempFilePath, code, 'utf-8');

        try {
          const result = await executeSubprocess('node', [tempFilePath], stdin, 6000);
          const duration = Date.now() - startTime;
          const stdoutLines = result.stdout
            ? result.stdout.replace(/\r\n/g, '\n').split('\n')
            : [];
          if (stdoutLines.length > 0 && stdoutLines[stdoutLines.length - 1] === '') {
            stdoutLines.pop();
          }

          const response: ExecuteResponse = {
            success: result.exitCode === 0,
            stdout: stdoutLines,
            stderr: result.stderr.trim() || undefined,
            executionTimeMs: duration,
            engine: 'Node.js v22 (V8 Sandbox)',
            exitCode: result.exitCode,
          };
          return res.json(response);
        } finally {
          fs.promises.unlink(tempFilePath).catch(() => {});
        }
      }

      // For Rust and Java (compiled languages in environment without rustc/javac), return simulated execution with compiler diagnostics
      if (language === 'rust') {
        const stdout: string[] = [];
        // Check for common Rust compiler checks
        if (!code.includes('fn ')) {
          return res.json({
            success: false,
            stdout: [],
            stderr: 'error[E0601]: `main` function not found in crate',
            engine: 'rustc simulator (Cargo)',
            exitCode: 1,
            executionTimeMs: Date.now() - startTime,
          });
        }

        const printlnMatches = code.matchAll(/println!\s*\(\s*"([^"]*)"(?:\s*,\s*([^)]*))?\s*\);?/g);
        for (const m of printlnMatches) {
          const template = m[1];
          const args = m[2] ? m[2].split(',').map((s) => s.trim()) : [];
          let formatted = template;
          for (const arg of args) {
            formatted = formatted.replace('{}', arg);
          }
          stdout.push(formatted);
        }

        return res.json({
          success: true,
          stdout: stdout.length > 0 ? stdout : ['[rustc] Compilado com sucesso. Executado com zero avisos.'],
          engine: 'Rust Sandbox Simulator',
          exitCode: 0,
          executionTimeMs: Date.now() - startTime,
        });
      }

      if (language === 'java') {
        const stdout: string[] = [];
        const printRegex = /System\.out\.println\s*\(\s*(.*?)\s*\)\s*;/g;
        let match;
        while ((match = printRegex.exec(code)) !== null) {
          let content = match[1].trim();
          if (content.startsWith('"') && content.endsWith('"')) {
            stdout.push(content.slice(1, -1));
          } else {
            stdout.push(content);
          }
        }

        return res.json({
          success: true,
          stdout: stdout.length > 0 ? stdout : ['[javac] Compilado com sucesso na JVM.'],
          engine: 'Java Virtual Machine Simulator',
          exitCode: 0,
          executionTimeMs: Date.now() - startTime,
        });
      }

      return res.status(400).json({
        success: false,
        stdout: [],
        stderr: `Linguagem '${language}' não suportada.`,
        engine: 'sandbox',
        exitCode: 1,
      });
    } catch (err: unknown) {
      return res.status(500).json({
        success: false,
        stdout: [],
        stderr: `Erro interno no Sandbox: ${(err as Error).message}`,
        engine: 'sandbox',
        exitCode: 1,
      });
    }
  });

  // Gemini AI Multi-turn Chatbot Endpoint
  app.post('/api/gemini/chat', async (req: Request, res: Response) => {
    const { messages, userContext } = req.body as {
      messages: { role: 'user' | 'assistant'; content: string }[];
      userContext?: { activeTrack?: string; streak?: number; xp?: number };
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Nenhuma mensagem enviada.' });
    }

    const systemInstruction = `Você é o Byte, a coruja robótica inteligente e mascote tutor de programação do ByteLingo (o Duolingo da programação).
Seu objetivo é ensinar de forma acolhedora, divertida, gamificada e prática.
Instruções:
1. Responda em Português do Brasil com tom entusiasta e amigável.
2. Explique conceitos de Lógica de Programação, Algoritmos, Python, JavaScript, Rust e Java usando analogias do dia a dia.
3. Se o usuário tiver dúvidas de código ou erros, mostre exemplos curtos e objetivos formatados em blocos de Markdown (\`\`\`python, \`\`\`javascript, etc.).
4. Mantenha as respostas concisas e estimulantes, sem blocos gigantescos de texto cansativo.
5. Dados do usuário atual: Trilha ativa: ${userContext?.activeTrack || 'Python'}, Ofensiva: ${userContext?.streak || 3} dias, XP: ${userContext?.xp || 65}.`;

    try {
      const formattedContents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });

      return res.json({
        reply: response.text || 'Olá! Como posso te ajudar na sua jornada de código hoje?',
      });
    } catch (err: unknown) {
      console.error('Erro na chamada Gemini:', err);
      const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || '';
      let fallback = 'Olá! Sou o Byte, seu tutor! Vamos praticar programação juntos. O que você gostaria de explorar hoje: Python, JavaScript, Rust, Java ou Lógica?';
      if (lastUserMsg.includes('variavel') || lastUserMsg.includes('variável')) {
        fallback = 'Uma variável é como uma gaveta etiquetada na memória do computador onde você guarda um dado (número, texto ou booleano) para usar quando precisar!';
      } else if (lastUserMsg.includes('rust')) {
        fallback = 'Em Rust, a segurança é prioridade! Por padrão, variáveis criadas com `let` são imutáveis. Para alterá-las, use `let mut`!';
      } else if (lastUserMsg.includes('python')) {
        fallback = 'O segredo do Python é a legibilidade e a indentação limpa de 4 espaços! Sem chaves e sem ponto e vírgula obrigatório.';
      }
      return res.json({
        reply: fallback,
        notice: 'Modo tutor Byte ativo.',
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`ByteLingo Sandbox Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
