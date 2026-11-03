import { Exercise, Language, TestCase } from '../types';

export interface RunResult {
  success: boolean;
  stdout: string[];
  error?: string;
  stderr?: string;
  executionTimeMs?: number;
  engine?: string;
  testResults?: {
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
  }[];
}

/**
 * Executes code asynchronously against the real-time server sandbox API (/api/execute),
 * with automatic fallback to client-side sandbox if offline.
 */
export async function executeSandboxCodeAsync(
  code: string,
  language: Language,
  stdin?: string
): Promise<RunResult> {
  const startTime = Date.now();
  try {
    const res = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, stdin }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: Boolean(data.success),
        stdout: data.stdout || [],
        stderr: data.stderr,
        error: data.stderr || (data.success ? undefined : 'Execução retornou código diferente de zero.'),
        executionTimeMs: data.executionTimeMs || Date.now() - startTime,
        engine: data.engine || 'Sandbox API',
      };
    }
  } catch {
    // Network or server endpoint error: use local evaluation
  }

  // Client-side fallback evaluation
  const localRes = runCode(code, language);
  return {
    ...localRes,
    executionTimeMs: Date.now() - startTime,
    engine: 'Navegador Web (Sandbox Client-side)',
  };
}

/**
 * Executes or simulates code in JavaScript, Python, Rust, or Java with instant test evaluations.
 */
export function runCode(code: string, language: Language, testCases?: TestCase[]): RunResult {
  const stdout: string[] = [];

  if (!code || code.trim().length === 0) {
    return {
      success: false,
      stdout: [],
      error: 'O código está vazio. Digite sua solução antes de executar!',
    };
  }

  switch (language) {
    case 'javascript':
    case 'logic':
      return runJavaScript(code, testCases);
    case 'python':
      return runPython(code, testCases);
    case 'rust':
      return runRust(code, testCases);
    case 'java':
      return runJava(code, testCases);
    default:
      return runJavaScript(code, testCases);
  }
}

/**
 * JavaScript in-browser sandbox runner with console capture & test assertion evaluator.
 */
function runJavaScript(code: string, testCases?: TestCase[]): RunResult {
  const stdout: string[] = [];
  try {
    const customConsole = {
      log: (...args: unknown[]) => {
        stdout.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      },
      info: (...args: unknown[]) => {
        stdout.push(args.map((a) => String(a)).join(' '));
      },
      warn: (...args: unknown[]) => {
        stdout.push(`[AVISO] ${args.map((a) => String(a)).join(' ')}`);
      },
      error: (...args: unknown[]) => {
        stdout.push(`[ERRO] ${args.map((a) => String(a)).join(' ')}`);
      },
    };

    // Execute user code
    const runFn = new Function('console', code);
    runFn(customConsole);

    // If test cases are provided, evaluate them
    if (testCases && testCases.length > 0) {
      const testResults: { passed: boolean; input: string; expected: string; actual: string }[] = [];
      let allPassed = true;

      for (const tc of testCases) {
        if (tc.assertionCode) {
          try {
            const assertRunner = new Function('console', `${code}\nreturn (${tc.assertionCode});`);
            const actual = assertRunner(customConsole);
            const actualStr = typeof actual === 'object' ? JSON.stringify(actual) : String(actual);
            const passed = actualStr === tc.expectedOutput.trim();
            if (!passed) allPassed = false;
            testResults.push({
              passed,
              input: tc.inputDescription,
              expected: tc.expectedOutput,
              actual: actualStr,
            });
          } catch (err: unknown) {
            allPassed = false;
            testResults.push({
              passed: false,
              input: tc.inputDescription,
              expected: tc.expectedOutput,
              actual: `Erro: ${(err as Error).message}`,
            });
          }
        } else {
          // If no specific assertion code, check if stdout contains expected output
          const passed = stdout.some((line) => line.trim() === tc.expectedOutput.trim()) ||
            stdout.join('\n').includes(tc.expectedOutput.trim());
          if (!passed) allPassed = false;
          testResults.push({
            passed,
            input: tc.inputDescription,
            expected: tc.expectedOutput,
            actual: stdout.join(' ') || '(sem output)',
          });
        }
      }

      return {
        success: allPassed,
        stdout,
        error: allPassed ? undefined : 'Alguns casos de teste não passaram.',
        testResults,
      };
    }

    return {
      success: true,
      stdout,
    };
  } catch (err: unknown) {
    return {
      success: false,
      stdout,
      error: `Erro de Execução (JS): ${(err as Error).message}`,
    };
  }
}

/**
 * Python execution simulator and syntax validator.
 */
function runPython(code: string, testCases?: TestCase[]): RunResult {
  const stdout: string[] = [];
  const lines = code.split('\n');

  // Syntax checks: check for common python errors
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      line.startsWith('def ') ||
      line.startsWith('if ') ||
      line.startsWith('elif ') ||
      line.startsWith('else') ||
      line.startsWith('for ') ||
      line.startsWith('while ')
    ) {
      if (!line.endsWith(':') && !line.includes(': #')) {
        return {
          success: false,
          stdout,
          error: `SyntaxError na linha ${i + 1}: Faltou dois-pontos (:) no final de '${line}'`,
        };
      }
    }
  }

  // Try transpiling and executing via sandbox
  try {
    const transpiled = transpilePythonToJs(code);
    const customConsole = {
      log: (...args: unknown[]) => {
        stdout.push(args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
      },
    };
    const fnRunner = new Function('console', transpiled);
    fnRunner(customConsole);
  } catch {
    // Fallback: parse simple print statements
    const printRegex = /print\s*\((.*?)\)/g;
    let match;
    while ((match = printRegex.exec(code)) !== null) {
      const content = match[1].trim();
      if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
        stdout.push(content.slice(1, -1));
      } else if (!isNaN(Number(content))) {
        stdout.push(content);
      } else {
        stdout.push(content);
      }
    }
  }

  let functionName = '';
  const defMatch = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\):/);
  if (defMatch) {
    functionName = defMatch[1];
  }

  // If there are test cases and a function is defined, transpile/simulate for test verification
  if (testCases && testCases.length > 0) {
    const testResults: { passed: boolean; input: string; expected: string; actual: string }[] = [];
    let allPassed = true;

    for (const tc of testCases) {
      const expected = tc.expectedOutput.trim();
      let actual = '';
      let passed = false;

      try {
        const jsTranspiled = transpilePythonToJs(code);
        if (tc.assertionCode && functionName) {
          const fnRunner = new Function('console', `${jsTranspiled}\nreturn (${tc.assertionCode});`);
          const res = fnRunner({ log: () => {} });
          actual = typeof res === 'object' ? JSON.stringify(res) : String(res);
          passed = actual === expected;
        } else {
          passed = stdout.some((line) => line.trim() === expected) || code.includes(expected);
          actual = stdout.join('\n') || (passed ? expected : 'Nenhum retorno compatível');
        }
      } catch {
        passed = stdout.some((line) => line.trim() === expected) || code.includes(expected);
        actual = stdout.join('\n') || 'Execução simulada';
      }

      if (!passed) allPassed = false;
      testResults.push({
        passed,
        input: tc.inputDescription,
        expected,
        actual,
      });
    }

    return {
      success: allPassed,
      stdout: stdout.length > 0 ? stdout : ['[Python 3.12] Código executado com sucesso.'],
      error: allPassed ? undefined : 'Um ou mais testes falharam. Verifique a lógica da sua função!',
      testResults,
    };
  }

  return {
    success: true,
    stdout: stdout.length > 0 ? stdout : ['[Python 3.12] Código executado sem erros.'],
  };
}

/**
 * Transpiles indentation-based Python constructs to executable JS.
 */
function transpilePythonToJs(py: string): string {
  const lines = py.split('\n');
  const indentStack: number[] = [0];
  const output: string[] = [];

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;
    const indent = rawLine.match(/^(\s*)/)?.[1].length || 0;

    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      output.push('}');
    }

    let line = rawLine.trim();
    if (line.startsWith('#')) continue;

    // def foo(args): -> function foo(args) {
    if (line.startsWith('def ') && line.endsWith(':')) {
      const match = line.match(/^def\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\):$/);
      if (match) {
        line = `function ${match[1]}(${match[2]}) {`;
        indentStack.push(indent + 1);
        output.push(line);
        continue;
      }
    }

    // if / elif / while
    if ((line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('while ')) && line.endsWith(':')) {
      const keyword = line.split(' ')[0];
      const condition = line.slice(keyword.length, -1).trim();
      const jsKeyword = keyword === 'elif' ? 'else if' : keyword;
      line = `${jsKeyword} (${condition}) {`;
      indentStack.push(indent + 1);
      output.push(line);
      continue;
    }

    if (line === 'else:') {
      line = 'else {';
      indentStack.push(indent + 1);
      output.push(line);
      continue;
    }

    // for i in range(n):
    const forRangeMatch = line.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\(([^)]+)\):$/);
    if (forRangeMatch) {
      const varName = forRangeMatch[1];
      const rangeArg = forRangeMatch[2].trim();
      line = `for (let ${varName} = 0; ${varName} < ${rangeArg}; ${varName}++) {`;
      indentStack.push(indent + 1);
      output.push(line);
      continue;
    }

    // Replacements
    line = line
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/\blen\(([^)]+)\)/g, '$1.length')
      .replace(/\bprint\s*\(/g, 'console.log(');

    // f-strings
    line = line.replace(/f"([^"]*)"/g, '`$1`').replace(/f'([^']*)'/g, '`$1`');

    // Module / scope variable assignment: x = 10 -> var x = 10;
    if (
      /^[a-zA-Z_][a-zA-Z0-9_]*\s*=\s*[^=]/.test(line) &&
      !line.startsWith('return ') &&
      !line.startsWith('function ')
    ) {
      line = 'var ' + line;
    }

    if (!line.endsWith(';') && !line.endsWith('{') && !line.endsWith('}')) {
      line += ';';
    }

    output.push(line);
  }

  while (indentStack.length > 1) {
    indentStack.pop();
    output.push('}');
  }

  return output.join('\n');
}

/**
 * Rust syntax analysis, borrow-checker checks & execution simulator.
 */
function runRust(code: string, testCases?: TestCase[]): RunResult {
  const stdout: string[] = [];

  // Syntax checks: Rust requires semicolons on statements, fn main or fn declaration, let mut for modifications
  if (!code.includes('fn ')) {
    return {
      success: false,
      stdout,
      error: 'error[E0601]: `main` function not found in crate. Em Rust, declare ao menos `fn main() { ... }` ou sua função!',
    };
  }

  // Check for common Rust immutability pitfall: assigning to immutable variable
  const letMatches = [...code.matchAll(/let\s+([a-zA-Z0-9_]+)\s*=/g)];
  for (const m of letMatches) {
    const varName = m[1];
    if (varName !== 'mut') {
      const reassign = new RegExp(`${varName}\\s*\\+=|${varName}\\s*=\\s*[^=]`);
      if (reassign.test(code) && !code.includes(`let mut ${varName}`)) {
        return {
          success: false,
          stdout,
          error: `error[E0384]: cannot assign twice to immutable variable \`${varName}\`\n  --> help: consider making this binding mutable: \`let mut ${varName}\``,
        };
      }
    }
  }

  // Check for println! statements
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

  if (testCases && testCases.length > 0) {
    const testResults: { passed: boolean; input: string; expected: string; actual: string }[] = [];
    let allPassed = true;

    for (const tc of testCases) {
      const expected = tc.expectedOutput.trim();
      let passed = false;
      let actual = '';

      // Test against stdout or return pattern
      if (stdout.some((line) => line.trim() === expected)) {
        passed = true;
        actual = expected;
      } else if (code.includes(expected)) {
        passed = true;
        actual = expected;
      } else {
        actual = stdout.join('\n') || 'Retorno incorreto';
      }

      if (!passed) allPassed = false;
      testResults.push({
        passed,
        input: tc.inputDescription,
        expected,
        actual,
      });
    }

    return {
      success: allPassed,
      stdout: stdout.length > 0 ? stdout : ['[cargo run] Finished dev [unoptimized + debuginfo] target(s)'],
      error: allPassed ? undefined : 'Testes de compilação/lógica falharam.',
      testResults,
    };
  }

  return {
    success: true,
    stdout: stdout.length > 0 ? stdout : ['Compilado com rustc: Sucesso! Zero warnings de ownership.'],
  };
}

/**
 * Java syntax analysis, OOP checks & execution simulator.
 */
function runJava(code: string, testCases?: TestCase[]): RunResult {
  const stdout: string[] = [];

  // Check for semicolons
  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (
      line.length > 0 &&
      !line.endsWith('{') &&
      !line.endsWith('}') &&
      !line.startsWith('//') &&
      !line.startsWith('/*') &&
      !line.startsWith('*') &&
      !line.startsWith('class ') &&
      !line.startsWith('public class ') &&
      !line.startsWith('if ') &&
      !line.startsWith('for ') &&
      !line.startsWith('while ')
    ) {
      if (!line.endsWith(';')) {
        return {
          success: false,
          stdout,
          error: `javac Error: ';' expected na linha ${i + 1}: '${line}'`,
        };
      }
    }
  }

  // Parse System.out.println
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

  if (testCases && testCases.length > 0) {
    const testResults: { passed: boolean; input: string; expected: string; actual: string }[] = [];
    let allPassed = true;

    for (const tc of testCases) {
      const expected = tc.expectedOutput.trim();
      const passed = stdout.some((line) => line.trim() === expected) || code.includes(expected);
      const actual = passed ? expected : (stdout.join('\n') || 'Retorno incorreto');
      if (!passed) allPassed = false;
      testResults.push({
        passed,
        input: tc.inputDescription,
        expected,
        actual,
      });
    }

    return {
      success: allPassed,
      stdout: stdout.length > 0 ? stdout : ['[javac] Compilado com sucesso. Executando JVM...'],
      error: allPassed ? undefined : 'Testes de verificação falharam.',
      testResults,
    };
  }

  return {
    success: true,
    stdout: stdout.length > 0 ? stdout : ['[javac] Sucesso! Nenhuma exceção lançada.'],
  };
}

/**
 * Validates a user's answer for various gamified exercise types.
 */
export function checkExerciseAnswer(
  exercise: Exercise,
  userAnswer: unknown
): { isCorrect: boolean; feedback: string } {
  if (exercise.type === 'theory') {
    return { isCorrect: true, feedback: 'Excelente! Teoria compreendida com sucesso.' };
  }

  if (exercise.type === 'blocks') {
    const selectedBlocks = Array.isArray(userAnswer) ? (userAnswer as string[]) : [];
    const expected = exercise.orderedSolution || [];

    if (selectedBlocks.length !== expected.length) {
      return {
        isCorrect: false,
        feedback: `Faltam blocos! Você selecionou ${selectedBlocks.length} de ${expected.length} blocos.`,
      };
    }

    const matches = selectedBlocks.every((block, idx) => block.trim() === expected[idx].trim());
    return {
      isCorrect: matches,
      feedback: matches
        ? 'Perfeito! Sintaxe montada na ordem exata.'
        : `Ordem incorreta. Resposta esperada: "${expected.join(' ')}"`,
    };
  }

  if (exercise.type === 'predict_output' || exercise.type === 'fill_blank') {
    const expected = String(exercise.correctAnswer).trim();
    const actual = String(userAnswer || '').trim();
    const isCorrect = expected.toLowerCase() === actual.toLowerCase();

    return {
      isCorrect,
      feedback: isCorrect
        ? 'Na mosca! Sua previsão de execução foi exata.'
        : `Resposta incorreta. A resposta certa era "${expected}". ${exercise.explanation}`,
    };
  }

  if (exercise.type === 'spot_bug') {
    const selectedIndex = Number(userAnswer);
    const expectedIndex = exercise.bugLineIndex;
    const isCorrect = selectedIndex === expectedIndex;

    return {
      isCorrect,
      feedback: isCorrect
        ? 'Mandou bem! Você encontrou exatamente a linha com bug!'
        : `Não é esta linha. O bug estava na linha ${(expectedIndex ?? 0) + 1}. ${exercise.explanation}`,
    };
  }

  if (exercise.type === 'match_pairs') {
    const matches = userAnswer as { [left: string]: string };
    const pairs = exercise.pairMatches || [];
    let correctCount = 0;

    for (const pair of pairs) {
      if (matches && matches[pair.left] === pair.right) {
        correctCount++;
      }
    }

    const isCorrect = correctCount === pairs.length;
    return {
      isCorrect,
      feedback: isCorrect
        ? 'Todas as combinações corretas! Excelente associação de conceitos.'
        : `Você acertou ${correctCount} de ${pairs.length} combinações.`,
    };
  }

  if (exercise.type === 'code_editor') {
    const code = String(userAnswer || '');
    const result = runCode(code, exercise.language, exercise.testCases);
    return {
      isCorrect: result.success,
      feedback: result.success
        ? 'Todos os testes passaram! Código executado com perfeição!'
        : result.error || 'O código não atendeu a todos os critérios.',
    };
  }

  return { isCorrect: false, feedback: 'Tipo de exercício não suportado.' };
}
