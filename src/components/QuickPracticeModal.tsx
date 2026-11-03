import React, { useState } from 'react';
import { X, Heart, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { playSound } from '../utils/sound';

interface QuickPracticeModalProps {
  onGainHeart: () => void;
  onClose: () => void;
}

const QUICK_QUESTIONS = [
  {
    question: 'Em Python, qual palavra-chave define uma função?',
    options: ['def', 'function', 'fn', 'func'],
    correct: 'def',
    explanation: 'Em Python usamos "def nome_funcao():".',
  },
  {
    question: 'No Rust, o que torna uma variável mutável?',
    options: ['let mut', 'mut var', 'dynamic', 'const'],
    correct: 'let mut',
    explanation: 'Variáveis em Rust são imutáveis por padrão. "let mut" permite reatribuição.',
  },
  {
    question: 'No JavaScript moderno, qual operador verifica igualdade estrita (tipo e valor)?',
    options: ['===', '==', '=', 'equals'],
    correct: '===',
    explanation: 'O operador === compara tipo e valor sem coerção implícita.',
  },
  {
    question: 'Em Java, qual método serve como porta de entrada de execução na JVM?',
    options: ['public static void main', 'public start()', 'void run()', 'init()'],
    correct: 'public static void main',
    explanation: 'A JVM busca a assinatura public static void main(String[] args).',
  },
];

export const QuickPracticeModal: React.FC<QuickPracticeModalProps> = ({ onGainHeart, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const q = QUICK_QUESTIONS[currentIdx];

  const handleCheck = () => {
    if (!selected) return;
    if (selected === q.correct) {
      playSound('correct');
      setStatus('correct');
      onGainHeart();
    } else {
      playSound('wrong');
      setStatus('wrong');
    }
  };

  const handleNext = () => {
    playSound('click');
    if (currentIdx + 1 < QUICK_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelected(null);
      setStatus('idle');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-lg">
            <Sparkles className="w-5 h-5" />
            <span>Treino Rápido de Recuperação</span>
          </div>
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Acerte perguntas rápidas de revisão para recuperar corações de vida!
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-2xl">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 leading-snug">{q.question}</h3>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={status !== 'idle'}
                onClick={() => {
                  playSound('click');
                  setSelected(opt);
                }}
                className={`w-full p-3 rounded-2xl text-left font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                  selected === opt
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500 text-sky-900 dark:text-sky-200 border-b-4'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 border-b-4 text-slate-700 dark:text-slate-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {status === 'correct' && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Certo! +1 Vida recuperada com sucesso!</span>
            </div>
          )}

          {status === 'wrong' && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-200 text-xs font-medium">
              Resposta correta: {q.correct}. {q.explanation}
            </div>
          )}

          <div className="pt-2">
            {status === 'idle' ? (
              <button
                onClick={handleCheck}
                disabled={!selected}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider ${
                  selected ? 'btn-duo-green' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Verificar
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider btn-duo-green"
              >
                {currentIdx + 1 < QUICK_QUESTIONS.length ? 'Próxima Questão' : 'Concluir Treino'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
