import React, { useState, useEffect } from 'react';
import { X, Heart, Lightbulb, CheckCircle2, AlertCircle, Play, Sparkles, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Exercise, Lesson, Track, UserProfile } from '../types';
import { checkExerciseAnswer, runCode } from '../utils/codeRunner';
import { playSound } from '../utils/sound';
import { MascotByte } from './MascotByte';

interface LessonModalProps {
  lesson: Lesson;
  user: UserProfile;
  track?: Track;
  onClose: () => void;
  onComplete: (stats: { xpGained: number; gemsGained: number; accuracy: number }) => void;
  onLoseHeart: () => void;
  onRefillHearts: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  user,
  track,
  onClose,
  onComplete,
  onLoseHeart,
  onRefillHearts,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<unknown>(null);
  const [codeAnswer, setCodeAnswer] = useState('');
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<{ [left: string]: string }>({});
  const [selectedLeftTerm, setSelectedLeftTerm] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Status of the current exercise
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [errorsCount, setErrorsCount] = useState(0);
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const currentExercise: Exercise = lesson.exercises[currentIndex];
  const progressPercent = Math.round(((currentIndex) / lesson.exercises.length) * 100);

  // Initialize or reset state when exercise changes
  React.useEffect(() => {
    setFeedbackState('idle');
    setFeedbackMessage('');
    setShowHint(false);

    if (currentExercise.type === 'blocks') {
      const blocks = [...(currentExercise.tokenBlocks || [])];
      // Shuffle blocks
      setAvailableBlocks(blocks.sort(() => Math.random() - 0.5));
      setSelectedBlocks([]);
      setSelectedAnswer([]);
    } else if (currentExercise.type === 'code_editor') {
      setCodeAnswer(currentExercise.starterCode || '');
      setSelectedAnswer(currentExercise.starterCode || '');
    } else if (currentExercise.type === 'match_pairs') {
      setMatchedPairs({});
      setSelectedLeftTerm(null);
      setSelectedAnswer({});
    } else {
      setSelectedAnswer(null);
    }
  }, [currentIndex, currentExercise]);

  const handleBlockClick = (block: string, fromSelected: boolean) => {
    playSound('click');
    if (fromSelected) {
      // Remove from selected, return to available
      const newSel = selectedBlocks.filter((_, idx) => idx !== selectedBlocks.indexOf(block));
      setSelectedBlocks(newSel);
      setAvailableBlocks([...availableBlocks, block]);
      setSelectedAnswer(newSel);
    } else {
      // Add to selected, remove from available
      const newAvail = availableBlocks.filter((_, idx) => idx !== availableBlocks.indexOf(block));
      const newSel = [...selectedBlocks, block];
      setAvailableBlocks(newAvail);
      setSelectedBlocks(newSel);
      setSelectedAnswer(newSel);
    }
  };

  const handlePairSelection = (left: string, right: string) => {
    playSound('click');
    const newMatches = { ...matchedPairs, [left]: right };
    setMatchedPairs(newMatches);
    setSelectedLeftTerm(null);
    setSelectedAnswer(newMatches);
  };

  const handleCheck = () => {
    let answerToEvaluate = selectedAnswer;
    if (currentExercise.type === 'code_editor') {
      answerToEvaluate = codeAnswer;
    } else if (currentExercise.type === 'blocks') {
      answerToEvaluate = selectedBlocks;
    } else if (currentExercise.type === 'match_pairs') {
      answerToEvaluate = matchedPairs;
    }

    const { isCorrect, feedback } = checkExerciseAnswer(currentExercise, answerToEvaluate);

    if (isCorrect) {
      playSound('correct');
      setFeedbackState('correct');
      setFeedbackMessage(feedback);
    } else {
      playSound('wrong');
      setFeedbackState('wrong');
      setFeedbackMessage(feedback);
      setErrorsCount((prev) => prev + 1);
      onLoseHeart();
    }
  };

  const handleContinue = () => {
    playSound('click');
    if (currentIndex + 1 < lesson.exercises.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finished all exercises in this lesson
      playSound('levelup');
      setIsCompletedScreen(true);
    }
  };

  // Heart depletion screen
  if (user.hearts <= 0) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center border-2 border-slate-200 shadow-2xl animate-in zoom-in-95">
          <MascotByte mood="sad" size="lg" />
          <h2 className="text-2xl font-black text-slate-800 mt-4">Você ficou sem vidas!</h2>
          <p className="text-sm text-slate-600 mt-2">
            Não se preocupe, errar faz parte de aprender a programar. Recarregue suas vidas com cristais para continuar!
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                onRefillHearts();
              }}
              className="w-full py-3 rounded-2xl font-black text-sm btn-duo-green flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Recarregar Vidas (50 💎)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl font-bold text-sm btn-duo-slate"
            >
              Voltar à Trilha
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Celebration sound & confetti effect
  useEffect(() => {
    if (isCompletedScreen) {
      playSound('levelup');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#06b6d4', '#6366f1', '#ec4899'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#fbbf24', '#f59e0b', '#10b981'],
        });
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [isCompletedScreen]);

  // Celebration Completion Screen
  if (isCompletedScreen) {
    const accuracy = Math.round(
      ((lesson.exercises.length) / (lesson.exercises.length + errorsCount)) * 100
    );

    const currentUnit = track?.units.find((u) => u.id === lesson.unitId);
    const totalInUnit = currentUnit ? currentUnit.lessons.length : 1;
    const prevCompletedInUnit = currentUnit
      ? currentUnit.lessons.filter((l) => user.completedLessonIds.includes(l.id) && l.id !== lesson.id).length
      : 0;
    const newCompletedInUnit = Math.min(totalInUnit, prevCompletedInUnit + 1);
    const prevUnitPct = totalInUnit > 0 ? Math.round((prevCompletedInUnit / totalInUnit) * 100) : 0;
    const newUnitPct = totalInUnit > 0 ? Math.round((newCompletedInUnit / totalInUnit) * 100) : 100;
    const isUnitCompleted = newCompletedInUnit === totalInUnit && totalInUnit > 0;

    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 transition-colors">
          <MascotByte
            mood="celebrating"
            size="lg"
            message="Lição concluída! Você é incrível!"
          />

          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-4">Parabéns!</h2>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">{lesson.title}</p>

          {/* Unit Advancement Progress Bar with Framer Motion celebration */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/60 my-5 text-left shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-black mb-2">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs shadow-xs">
                  {isUnitCompleted ? '🏆' : '📈'}
                </div>
                <span>
                  {isUnitCompleted
                    ? 'Unidade 100% Concluída!'
                    : `Avanço no Bloco (${newCompletedInUnit}/${totalInUnit} lições)`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-black">
                <span className="text-slate-400 line-through text-[11px] font-bold">
                  {prevUnitPct}%
                </span>
                <motion.span
                  className="text-emerald-600 dark:text-emerald-400 text-sm"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.35, 1] }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                >
                  {newUnitPct}%
                </motion.span>
              </div>
            </div>

            {/* Framer Motion animated progress bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-4 rounded-full overflow-hidden p-0.5 shadow-inner relative">
              <motion.div
                className={`h-full rounded-full relative overflow-hidden ${
                  isUnitCompleted
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400'
                    : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                }`}
                initial={{ width: `${Math.max(prevUnitPct, prevUnitPct > 0 ? 8 : 0)}%` }}
                animate={{ width: `${Math.max(newUnitPct, 8)}%` }}
                transition={{
                  type: 'spring',
                  stiffness: 45,
                  damping: 12,
                  delay: 0.35,
                }}
              >
                <div className="absolute top-0.5 left-1.5 right-1.5 h-1 bg-white/40 rounded-full" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
              </motion.div>
            </div>

            <div className="flex items-center justify-between mt-2 text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <span>
                {isUnitCompleted
                  ? '🎉 Você dominou todos os tópicos deste bloco!'
                  : `Faltam ${totalInUnit - newCompletedInUnit} lições para completar o bloco.`}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                +{Math.max(0, newUnitPct - prevUnitPct)}% de avanço
              </span>
            </div>
          </motion.div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-3 my-5">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border-2 border-amber-200 dark:border-amber-800/80">
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">Total XP</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-300">+{lesson.xpReward}</div>
            </div>

            <div className="p-3 bg-sky-50 dark:bg-sky-950/40 rounded-2xl border-2 border-sky-200 dark:border-sky-800/80">
              <div className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase">Cristais</div>
              <div className="text-2xl font-black text-sky-600 dark:text-sky-300">+{lesson.gemReward}</div>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/80">
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Precisão</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-300">{accuracy}%</div>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('gem');
              onComplete({
                xpGained: lesson.xpReward,
                gemsGained: lesson.gemReward,
                accuracy,
              });
            }}
            className="w-full py-3.5 rounded-2xl font-black text-base btn-duo-green flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <span>Continuar na Trilha</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between overflow-y-auto transition-colors">
      {/* Top Header / Progress Bar */}
      <div className="max-w-4xl w-full mx-auto px-4 pt-6 pb-2 flex items-center justify-between gap-4">
        <button
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          aria-label="Sair da lição"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Duolingo smooth progress bar with Framer Motion spring */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 shadow-inner">
          <motion.div
            className="bg-emerald-500 h-full rounded-full relative overflow-hidden"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 85, damping: 14 }}
          >
            <div className="absolute top-1 left-2 right-2 h-1 bg-white/35 rounded-full" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
            />
          </motion.div>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 text-rose-500 font-extrabold text-base select-none">
          <Heart className="w-6 h-6 fill-rose-500 stroke-rose-600" />
          <span className="tabular-nums">{user.hearts}</span>
        </div>
      </div>

      {/* Main Exercise Viewport */}
      <main className="max-w-3xl w-full mx-auto px-4 py-6 flex-1 flex flex-col justify-center">
        {/* Instruction Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {currentExercise.instruction}
          </h1>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            {currentExercise.title}
          </div>
        </div>

        {/* 1. THEORY EXERCISE */}
        {currentExercise.type === 'theory' && currentExercise.theoryContent && (
          <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-start gap-4">
              <MascotByte mood="tutor" size="sm" className="hidden sm:inline-flex" />
              <div className="flex-1">
                <p className="text-base text-slate-800 leading-relaxed font-medium">
                  {currentExercise.theoryContent.summary}
                </p>
              </div>
            </div>

            {/* Key takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
                Pontos-Chave:
              </div>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {currentExercise.theoryContent.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✔</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Code snippet example */}
            {currentExercise.theoryContent.codeSnippet && (
              <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
                <pre>{currentExercise.theoryContent.codeSnippet}</pre>
              </div>
            )}

            {/* Pro Tip */}
            {currentExercise.theoryContent.proTip && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{currentExercise.theoryContent.proTip}</span>
              </div>
            )}
          </div>
        )}

        {/* 2. BLOCKS REORDERING EXERCISE */}
        {currentExercise.type === 'blocks' && (
          <div className="space-y-6">
            {/* Selected blocks assembly area */}
            <div className="min-h-24 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-4 flex flex-wrap gap-2 items-center">
              {selectedBlocks.length === 0 ? (
                <span className="text-xs sm:text-sm text-slate-400 font-semibold mx-auto select-none">
                  Toque nos blocos abaixo para organizá-los na ordem correta
                </span>
              ) : (
                selectedBlocks.map((block, idx) => (
                  <button
                    key={`sel-${idx}`}
                    onClick={() => handleBlockClick(block, true)}
                    className="px-3.5 py-2 rounded-xl bg-white border-2 border-emerald-400 text-emerald-800 font-mono text-xs sm:text-sm font-bold shadow-xs hover:bg-rose-50 hover:border-rose-400 hover:text-rose-700 transition-all active:scale-95 cursor-pointer"
                  >
                    {block}
                  </button>
                ))
              )}
            </div>

            {/* Available blocks bank */}
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              {availableBlocks.map((block, idx) => (
                <button
                  key={`avail-${idx}`}
                  onClick={() => handleBlockClick(block, false)}
                  className="px-4 py-2.5 rounded-xl btn-duo-slate font-mono text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer"
                >
                  {block}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. PREDICT OUTPUT EXERCISE */}
        {currentExercise.type === 'predict_output' && (
          <div className="space-y-6">
            {/* Code Box */}
            {currentExercise.codeSnippet && (
              <div className="bg-slate-900 text-slate-100 p-5 rounded-3xl font-mono text-xs sm:text-sm overflow-x-auto shadow-md border border-slate-800">
                <pre>{currentExercise.codeSnippet}</pre>
              </div>
            )}

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentExercise.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playSound('click');
                    setSelectedAnswer(opt);
                  }}
                  className={`p-4 rounded-2xl text-left font-bold text-sm transition-all border-2 cursor-pointer ${
                    selectedAnswer === opt
                      ? 'bg-sky-50 border-sky-500 text-sky-900 border-b-4'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 border-b-4'
                  }`}
                >
                  <span className="text-xs text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                  <span className="font-mono">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. SPOT THE BUG EXERCISE */}
        {currentExercise.type === 'spot_bug' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-semibold">
              Toque na linha que contém o erro de sintaxe ou lógica:
            </p>

            <div className="bg-slate-900 text-slate-100 rounded-3xl p-4 font-mono text-xs sm:text-sm overflow-hidden shadow-md border border-slate-800 space-y-1">
              {currentExercise.codeLines?.map((line, idx) => {
                const isSelected = selectedAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      playSound('click');
                      setSelectedAnswer(idx);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/30 text-rose-200 border-l-4 border-rose-500'
                        : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <span className="text-slate-500 text-xs w-6 text-right select-none">{idx + 1}</span>
                    <span className="font-mono whitespace-pre">{line}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. MATCH PAIRS EXERCISE */}
        {currentExercise.type === 'match_pairs' && currentExercise.pairMatches && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 font-semibold">
              Selecione um item da esquerda e ligue ao seu equivalente da direita:
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-2">
                {currentExercise.pairMatches.map((pair, idx) => {
                  const isMatched = matchedPairs[pair.left] !== undefined;
                  const isSelected = selectedLeftTerm === pair.left;
                  return (
                    <button
                      key={`left-${idx}`}
                      disabled={isMatched}
                      onClick={() => {
                        playSound('click');
                        setSelectedLeftTerm(pair.left);
                      }}
                      className={`w-full p-3 rounded-2xl text-left font-mono font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60'
                          : isSelected
                          ? 'bg-sky-50 border-sky-500 text-sky-900 border-b-4'
                          : 'bg-white border-slate-200 hover:border-slate-300 border-b-4 text-slate-800'
                      }`}
                    >
                      {pair.left}
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                {currentExercise.pairMatches.map((pair, idx) => {
                  const matchedLeft = Object.keys(matchedPairs).find((k) => matchedPairs[k] === pair.right);
                  const isMatched = matchedLeft !== undefined;
                  return (
                    <button
                      key={`right-${idx}`}
                      disabled={isMatched || !selectedLeftTerm}
                      onClick={() => {
                        if (selectedLeftTerm) {
                          handlePairSelection(selectedLeftTerm, pair.right);
                        }
                      }}
                      className={`w-full p-3 rounded-2xl text-left font-bold text-xs sm:text-sm border-2 transition-all cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 opacity-60'
                          : selectedLeftTerm
                          ? 'bg-white border-slate-300 hover:border-sky-400 border-b-4 text-slate-800'
                          : 'bg-slate-100 border-slate-200 text-slate-400 border-b-2 cursor-not-allowed'
                      }`}
                    >
                      {pair.right}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 6. CODE EDITOR EXERCISE WITH INSTANT TEST RUNNER */}
        {currentExercise.type === 'code_editor' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                Editor {currentExercise.language.toUpperCase()}:
              </span>
              <button
                onClick={() => {
                  playSound('click');
                  setCodeAnswer(currentExercise.starterCode || '');
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                title="Reiniciar código inicial"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar</span>
              </button>
            </div>

            {/* Code Input Area */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-lg">
              <textarea
                value={codeAnswer}
                onChange={(e) => {
                  setCodeAnswer(e.target.value);
                  setSelectedAnswer(e.target.value);
                }}
                rows={7}
                spellCheck={false}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm p-4 focus:outline-hidden resize-none leading-relaxed"
                placeholder="// Escreva seu código aqui..."
              />
            </div>

            {/* Live Test Cases Indicator */}
            {currentExercise.testCases && (
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs space-y-1.5">
                <div className="font-extrabold text-slate-700">Casos de Teste Avaliados:</div>
                {currentExercise.testCases.map((tc, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-600 font-mono">
                    <span>{tc.inputDescription}</span>
                    <span className="text-slate-500">➔ Esperado: {tc.expectedOutput}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mascot Hint Accordion */}
        <div className="mt-6">
          <button
            onClick={() => {
              playSound('click');
              setShowHint(!showHint);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            <Lightbulb className="w-4 h-4" />
            <span>{showHint ? 'Ocultar Dica do Byte' : 'Precisa de uma Dica?'}</span>
          </button>

          {showHint && (
            <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-medium text-amber-900 animate-in fade-in">
              💡 {currentExercise.hint}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Sticky Action / Feedback Sheet */}
      <footer
        className={`border-t-2 py-4 px-4 sm:px-6 transition-colors duration-200 ${
          feedbackState === 'correct'
            ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800'
            : feedbackState === 'wrong'
            ? 'bg-rose-100 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Feedback Message Block */}
          {feedbackState === 'correct' && (
            <div className="flex items-center gap-3 text-emerald-800">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <div className="text-base font-black">Excelente!</div>
                <div className="text-xs font-semibold">{feedbackMessage}</div>
              </div>
            </div>
          )}

          {feedbackState === 'wrong' && (
            <div className="flex items-center gap-3 text-rose-800">
              <AlertCircle className="w-8 h-8 text-rose-600 shrink-0" />
              <div>
                <div className="text-base font-black">Quase lá!</div>
                <div className="text-xs font-semibold">{feedbackMessage}</div>
              </div>
            </div>
          )}

          {feedbackState === 'idle' && (
            <div className="text-xs text-slate-400 font-semibold hidden sm:block">
              Exercício {currentIndex + 1} de {lesson.exercises.length}
            </div>
          )}

          {/* Action Button */}
          <div className="w-full sm:w-auto">
            {feedbackState === 'idle' ? (
              <button
                onClick={handleCheck}
                disabled={
                  currentExercise.type !== 'theory' &&
                  (selectedAnswer === null ||
                    (Array.isArray(selectedAnswer) && selectedAnswer.length === 0) ||
                    (typeof selectedAnswer === 'string' && selectedAnswer.trim().length === 0))
                }
                className={`w-full sm:w-44 py-3 rounded-2xl font-black text-sm tracking-wide uppercase transition-all shadow-md ${
                  currentExercise.type === 'theory' ||
                  (selectedAnswer !== null &&
                    (!Array.isArray(selectedAnswer) || selectedAnswer.length > 0) &&
                    (typeof selectedAnswer !== 'string' || selectedAnswer.trim().length > 0))
                    ? 'btn-duo-green cursor-pointer'
                    : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
                }`}
              >
                {currentExercise.type === 'theory' ? 'Entendido!' : 'Verificar'}
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`w-full sm:w-44 py-3 rounded-2xl font-black text-sm tracking-wide uppercase shadow-md ${
                  feedbackState === 'correct' ? 'btn-duo-green' : 'bg-rose-500 hover:bg-rose-600 text-white border-b-4 border-rose-700'
                }`}
              >
                Continuar
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};
