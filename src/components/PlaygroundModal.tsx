import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, Terminal, Cpu, Clock, Trash2, ArrowDownCircle, Sun, Moon, Eye } from 'lucide-react';
import { Language } from '../types';
import { executeSandboxCodeAsync, RunResult } from '../utils/codeRunner';
import { playSound } from '../utils/sound';

export type PlaygroundTheme = 'dark' | 'light' | 'high-contrast';

interface PlaygroundModalProps {
  initialLanguage?: Language;
  onClose: () => void;
}

const THEME_STORAGE_KEY = 'bytelingo_playground_theme';

const PLAYGROUND_TEMPLATES: Record<Language, string> = {
  javascript: `// Playground JavaScript (Node.js Sandbox)
function fibonacci(n) {
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq;
}

const resultado = fibonacci(8);
console.log("Sequência de Fibonacci:");
console.log(resultado);
console.log("Total de elementos gerados:", resultado.length);
`,
  python: `# Playground Python (Python 3.10 Sandbox Real)
import math

def calcular_estatisticas(numeros):
    total = sum(numeros)
    media = total / len(numeros)
    quadrados = [x ** 2 for x in numeros]
    return total, media, quadrados

dados = [12, 45, 78, 23, 56, 89]
soma, media, sq = calcular_estatisticas(dados)

print("=== Relatório de Execução Python ===")
print(f"Lista de entrada: {dados}")
print(f"Soma Total: {soma}")
print(f"Média Aritmética: {media:.2f}")
print(f"Raiz quadrada da soma: {math.sqrt(soma):.4f}")
print(f"Quadrados dos valores: {sq}")
`,
  rust: `// Playground Rust
fn main() {
    let mut pontuacao = 100;
    pontuacao += 50;
    println!("Pontuação Final: {}", pontuacao);
    println!("Compilação rustc: Segura e rápida!");
}
`,
  java: `// Playground Java
public class Main {
    public static void main(String[] args) {
        String mensagem = "Bem-vindo ao ByteLingo!";
        System.out.println(mensagem);
        System.out.println("Executando na JVM...");
    }
}
`,
  logic: `// Algoritmo de Busca Linear
const lista = [10, 20, 30, 42, 50];
const alvo = 42;

let encontrado = false;
for (let i = 0; i < lista.length; i++) {
  if (lista[i] === alvo) {
    console.log("Elemento encontrado no índice:", i);
    encontrado = true;
    break;
  }
}
if (!encontrado) console.log("Não encontrado.");
`,
};

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  initialLanguage = 'python',
  onClose,
}) => {
  const [lang, setLang] = useState<Language>(initialLanguage);
  const [code, setCode] = useState<string>(PLAYGROUND_TEMPLATES[initialLanguage]);
  const [stdin, setStdin] = useState<string>('');
  const [showStdin, setShowStdin] = useState<boolean>(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Theme state: dark, light, high-contrast
  const [theme, setTheme] = useState<PlaygroundTheme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'high-contrast') {
          return saved;
        }
      } catch {
        // Fallback
      }
    }
    return 'dark';
  });

  const handleThemeChange = (newTheme: PlaygroundTheme) => {
    playSound('click');
    setTheme(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
  };

  const handleLanguageChange = (newLang: Language) => {
    playSound('click');
    setLang(newLang);
    setCode(PLAYGROUND_TEMPLATES[newLang]);
    setResult(null);
  };

  const handleRun = async () => {
    playSound('click');
    setIsRunning(true);
    setResult(null);

    try {
      const res = await executeSandboxCodeAsync(code, lang, stdin);
      setResult(res);
      if (res.success) {
        playSound('correct');
      } else {
        playSound('wrong');
      }
    } catch {
      setResult({
        success: false,
        stdout: [],
        error: 'Erro de conexão com o ambiente Sandbox.',
      });
      playSound('wrong');
    } finally {
      setIsRunning(false);
    }
  };

  // Theme styling definitions
  const themeStyles = {
    dark: {
      modalBg: 'bg-slate-900 border-2 border-slate-700 text-slate-100',
      headerBg: 'bg-slate-950 border-b border-slate-800 text-white',
      titleColor: 'text-white',
      badge: 'bg-emerald-950 text-emerald-400 border border-emerald-800',
      divider: 'divide-slate-800',
      editorBg: 'bg-slate-950',
      editorToolbar: 'border-b border-slate-800 text-slate-400 bg-slate-950',
      editorFileLabel: 'text-slate-300 font-semibold',
      textarea: 'bg-slate-950 text-emerald-400 selection:bg-emerald-900 selection:text-white caret-emerald-400 placeholder:text-slate-600',
      stdinContainer: 'bg-slate-900 border-b border-slate-800 text-slate-300',
      stdinInput: 'bg-slate-950 border-slate-700 text-slate-200',
      terminalBg: 'bg-slate-900/95',
      terminalToolbar: 'border-b border-slate-800 text-slate-400 bg-slate-900',
      terminalFileLabel: 'text-slate-300 font-semibold',
      terminalText: 'text-emerald-300',
      terminalEmptyText: 'text-slate-500',
      terminalStderr: 'bg-rose-950/70 border-rose-800 text-rose-300',
      footerBg: 'bg-slate-950 border-t border-slate-800 text-slate-400',
      runBtn: 'btn-duo-green',
      langActive: 'bg-emerald-500 text-white shadow-xs',
      langInactive: 'text-slate-400 hover:text-white',
      themeActive: 'bg-slate-700 text-white shadow-xs',
      themeInactive: 'text-slate-400 hover:text-white',
    },
    light: {
      modalBg: 'bg-white border-2 border-slate-300 text-slate-900',
      headerBg: 'bg-slate-50 border-b border-slate-200 text-slate-900',
      titleColor: 'text-slate-900',
      badge: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
      divider: 'divide-slate-200',
      editorBg: 'bg-white',
      editorToolbar: 'border-b border-slate-200 text-slate-600 bg-slate-50',
      editorFileLabel: 'text-slate-800 font-bold',
      textarea: 'bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 caret-blue-600 placeholder:text-slate-400',
      stdinContainer: 'bg-slate-100 border-b border-slate-200 text-slate-700',
      stdinInput: 'bg-white border-slate-300 text-slate-800',
      terminalBg: 'bg-slate-50',
      terminalToolbar: 'border-b border-slate-200 text-slate-600 bg-slate-100/80',
      terminalFileLabel: 'text-slate-800 font-bold',
      terminalText: 'text-slate-900 font-semibold',
      terminalEmptyText: 'text-slate-400',
      terminalStderr: 'bg-rose-50 border-rose-300 text-rose-800 font-semibold',
      footerBg: 'bg-slate-50 border-t border-slate-200 text-slate-600',
      runBtn: 'btn-duo-green',
      langActive: 'bg-emerald-600 text-white shadow-xs',
      langInactive: 'text-slate-600 hover:text-slate-900',
      themeActive: 'bg-white text-slate-900 shadow-xs border border-slate-200 font-bold',
      themeInactive: 'text-slate-500 hover:text-slate-800',
    },
    'high-contrast': {
      modalBg: 'bg-black border-4 border-yellow-400 text-yellow-300',
      headerBg: 'bg-black border-b-2 border-yellow-400 text-yellow-300 font-black',
      titleColor: 'text-yellow-300 font-black tracking-wide',
      badge: 'bg-yellow-400 text-black font-black border-2 border-yellow-400',
      divider: 'divide-yellow-400',
      editorBg: 'bg-black',
      editorToolbar: 'border-b-2 border-yellow-400 text-yellow-300 bg-black font-bold',
      editorFileLabel: 'text-yellow-300 font-black underline',
      textarea: 'bg-black text-yellow-300 font-bold selection:bg-yellow-400 selection:text-black caret-yellow-400 placeholder:text-yellow-600',
      stdinContainer: 'bg-black border-b-2 border-yellow-400 text-yellow-300',
      stdinInput: 'bg-black border-2 border-yellow-400 text-yellow-300 font-bold',
      terminalBg: 'bg-black',
      terminalToolbar: 'border-b-2 border-yellow-400 text-yellow-300 bg-black font-bold',
      terminalFileLabel: 'text-yellow-300 font-black',
      terminalText: 'text-cyan-300 font-bold',
      terminalEmptyText: 'text-yellow-500',
      terminalStderr: 'bg-red-950 border-2 border-red-500 text-white font-bold',
      footerBg: 'bg-black border-t-2 border-yellow-400 text-yellow-300 font-bold',
      runBtn: 'bg-yellow-400 hover:bg-yellow-300 text-black font-black border-b-4 border-yellow-600',
      langActive: 'bg-yellow-400 text-black font-black shadow-xs',
      langInactive: 'text-yellow-300 hover:text-white',
      themeActive: 'bg-yellow-400 text-black font-black',
      themeInactive: 'text-yellow-300 hover:text-white',
    },
  }[theme];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div
        className={`${themeStyles.modalBg} rounded-3xl max-w-5xl w-full h-[88vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95`}
      >
        {/* Header */}
        <div className={`${themeStyles.headerBg} px-5 py-3.5 flex flex-wrap items-center justify-between gap-3`}>
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-black flex items-center gap-2">
              <span className={themeStyles.titleColor}>Playground Sandbox Real-time</span>
              <span className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${themeStyles.badge}`}>
                <Cpu className="w-3 h-3" />
                <span>API Sandbox</span>
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Theme Switcher Segmented Control */}
            <div
              className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/80"
              role="group"
              aria-label="Selecionar Tema do Editor"
            >
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  theme === 'dark' ? themeStyles.themeActive : themeStyles.themeInactive
                }`}
                title="Tema Escuro (Cyber Terminal)"
                aria-label="Tema Escuro"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Escuro</span>
              </button>

              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  theme === 'light' ? themeStyles.themeActive : themeStyles.themeInactive
                }`}
                title="Tema Claro (Clean IDE)"
                aria-label="Tema Claro"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Claro</span>
              </button>

              <button
                onClick={() => handleThemeChange('high-contrast')}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  theme === 'high-contrast' ? themeStyles.themeActive : themeStyles.themeInactive
                }`}
                title="Tema Alto Contraste (Acessibilidade WCAG AAA)"
                aria-label="Tema Alto Contraste"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Alto Contraste</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700/80">
              {(['python', 'javascript', 'rust', 'java', 'logic'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors capitalize ${
                    lang === l ? themeStyles.langActive : themeStyles.langInactive
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar Playground"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editor and Console split */}
        <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x ${themeStyles.divider} overflow-hidden`}>
          {/* Code Editor */}
          <div className={`flex flex-col h-full ${themeStyles.editorBg}`}>
            <div className={`px-4 py-2 ${themeStyles.editorToolbar} flex justify-between items-center text-xs font-mono`}>
              <span className={themeStyles.editorFileLabel}>
                main.{lang === 'python' ? 'py' : lang === 'rust' ? 'rs' : lang === 'java' ? 'java' : 'js'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowStdin(!showStdin)}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    showStdin ? 'text-emerald-400 font-bold' : 'hover:text-white'
                  }`}
                  title="Abrir entrada padrão (STDIN)"
                >
                  <ArrowDownCircle className="w-3.5 h-3.5" />
                  <span>STDIN</span>
                </button>
                <button
                  onClick={() => {
                    playSound('click');
                    setCode(PLAYGROUND_TEMPLATES[lang]);
                  }}
                  className="hover:text-white flex items-center gap-1"
                  title="Restaurar template padrão"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Optional STDIN Input Drawer */}
            {showStdin && (
              <div className={`${themeStyles.stdinContainer} p-2.5`}>
                <label className="text-[11px] font-bold mb-1 block">
                  Entrada Padrão (STDIN - dados para input()):
                </label>
                <input
                  type="text"
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Texto ou números a serem consumidos pelo programa..."
                  className={`w-full ${themeStyles.stdinInput} rounded-lg px-2.5 py-1 text-xs font-mono focus:outline-hidden`}
                />
              </div>
            )}

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className={`flex-1 w-full ${themeStyles.textarea} font-mono text-xs sm:text-sm p-4 focus:outline-hidden resize-none leading-relaxed`}
              placeholder="// Escreva seu código aqui para rodar no sandbox real..."
            />
          </div>

          {/* Terminal Output */}
          <div className={`flex flex-col h-full ${themeStyles.terminalBg} overflow-hidden`}>
            <div className={`px-4 py-2 ${themeStyles.terminalToolbar} flex items-center justify-between text-xs font-mono`}>
              <span className={themeStyles.terminalFileLabel}>Terminal & Console Stdout</span>
              <div className="flex items-center gap-3">
                {result && (
                  <>
                    {result.executionTimeMs !== undefined && (
                      <span className="text-[11px] flex items-center gap-1 opacity-80">
                        <Clock className="w-3 h-3" />
                        <span>{result.executionTimeMs}ms</span>
                      </span>
                    )}
                    <span className={result.success ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {result.success ? '● Exit 0' : '▲ Exit Error'}
                    </span>
                  </>
                )}
                {result && (
                  <button
                    onClick={() => setResult(null)}
                    className="opacity-70 hover:opacity-100 p-1"
                    title="Limpar terminal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 select-text">
              {/* Engine metadata pill */}
              {result?.engine && (
                <div className="text-[11px] opacity-70 border-b border-current/20 pb-1 mb-2 flex items-center justify-between">
                  <span>Engine: {result.engine}</span>
                  <span className="font-bold">Isolamento Seguro</span>
                </div>
              )}

              {!result && !isRunning && (
                <div className={`${themeStyles.terminalEmptyText} italic space-y-2`}>
                  <p>Clique em "Executar Código" para rodar no ambiente Sandbox.</p>
                  <p className="text-[11px] opacity-80">
                    O código Python é executado no interpretador real Python 3 com módulos padrão (math, sys, random, json, etc.).
                    O código JavaScript roda no motor V8 isolado.
                  </p>
                </div>
              )}

              {isRunning && (
                <div className="text-emerald-400 flex items-center gap-2 py-4">
                  <span className="animate-spin">⏳</span>
                  <span>Executando no Sandbox Real...</span>
                </div>
              )}

              {result && (
                <>
                  {result.stdout.length === 0 && !result.error && (
                    <div className="opacity-70 italic">
                      (O programa terminou com sucesso sem produzir saída de console)
                    </div>
                  )}

                  {result.stdout.map((line, idx) => (
                    <div key={idx} className={`${themeStyles.terminalText} font-mono whitespace-pre-wrap leading-relaxed`}>
                      {line}
                    </div>
                  ))}

                  {result.stderr && (
                    <div className={`p-3 mt-2 ${themeStyles.terminalStderr} rounded-xl whitespace-pre-wrap font-mono`}>
                      {result.stderr}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`${themeStyles.footerBg} px-5 py-3 flex items-center justify-between`}>
          <div className="text-xs font-medium hidden sm:block">
            Ambiente sandbox com limite de 6s e proteção contra loops infinitos.
          </div>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-black text-sm ${themeStyles.runBtn} flex items-center justify-center gap-2 cursor-pointer shadow-md`}
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isRunning ? 'Executando...' : 'Executar Código'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
