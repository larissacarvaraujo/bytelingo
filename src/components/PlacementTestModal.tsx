import React, { useState } from 'react';
import { X, Heart, Sparkles, CheckCircle2, AlertCircle, ArrowRight, Zap, Trophy, FastForward, Play, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Track, UserProfile } from '../types';
import { getPlacementTestForUnit, PLACEMENT_TESTS, UnitPlacementTest } from '../data/placementTests';
import { MascotByte } from './MascotByte';
import { playSound } from '../utils/sound';

interface PlacementTestModalProps {
  track: Track;
  user: UserProfile;
  initialUnitId?: string;
  onClose: () => void;
  onPassTest: (
    targetUnitId: string,
    stats: { xpEarned: number; gemsEarned: number; skippedLessonsCount: number }
  ) => void;
}

export const PlacementTestModal: React.FC<PlacementTestModalProps> = ({
  track,
  user,
  initialUnitId,
  onClose,
  onPassTest,
}) => {
  // Find locked units available to skip into
  const availableUnits = track.units.filter((u, idx) => {
    if (idx === 0) return false; // First unit is always starting point
    // Unit is available if not all of its lessons are already completed
    const allCompleted = u.lessons.every((l) => user.completedLessonIds.includes(l.id));
    return !allCompleted;
  });

  const [selectedUnitId, setSelectedUnitId] = useState<string>(() => {
    if (initialUnitId && availableUnits.some((u) => u.id === initialUnitId)) {
      return initialUnitId;
    }
    return availableUnits[0]?.id || track.units[1]?.id || 'py-u2';
  });

  const activeUnit = track.units.find((u) => u.id === selectedUnitId) || track.units[1];
  const testData: UnitPlacementTest = getPlacementTestForUnit(selectedUnitId, track.id) || PLACEMENT_TESTS['py-u2'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<string[]>(() => {
    const q = testData?.questions[0];
    return q?.tokenBlocks ? [...q.tokenBlocks].sort(() => Math.random() - 0.5) : [];
  });
  const [hearts, setHearts] = useState(3);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackExplanation, setFeedbackExplanation] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const currentQ = testData.questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / testData.questions.length) * 100);

  // Calculate preceding lessons that will be skipped and unlocked
  const currentUnitIdx = track.units.findIndex((u) => u.id === selectedUnitId);
  const precedingLessons = track.units
    .slice(0, currentUnitIdx)
    .flatMap((u) => u.lessons)
    .filter((l) => !user.completedLessonIds.includes(l.id));

  const skippedXp = Math.max(30, precedingLessons.length * 25);
  const skippedGems = Math.max(15, precedingLessons.length * 10);

  const handleBlockClick = (block: string, isFromSelected: boolean) => {
    playSound('click');
    if (isFromSelected) {
      setSelectedBlocks((prev) => prev.filter((b, i) => i !== prev.indexOf(block)));
      setAvailableBlocks((prev) => [...prev, block]);
    } else {
      setAvailableBlocks((prev) => prev.filter((b, i) => i !== prev.indexOf(block)));
      setSelectedBlocks((prev) => [...prev, block]);
    }
  };

  const handleSelectUnit = (unitId: string) => {
    playSound('click');
    setSelectedUnitId(unitId);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSelectedBlocks([]);
    const nextTest = getPlacementTestForUnit(unitId, track.id) || PLACEMENT_TESTS['py-u2'];
    const firstQ = nextTest.questions[0];
    setAvailableBlocks(firstQ?.tokenBlocks ? [...firstQ.tokenBlocks].sort(() => Math.random() - 0.5) : []);
    setHearts(3);
    setCorrectCount(0);
    setFeedbackState('idle');
    setIsCompleted(false);
    setIsFailed(false);
  };

  const handleCheckAnswer = () => {
    if (!currentQ || feedbackState !== 'idle') return;

    let isCorrect = false;

    if (currentQ.type === 'blocks') {
      const solution = currentQ.orderedSolution || [];
      isCorrect =
        selectedBlocks.length === solution.length &&
        selectedBlocks.every((val, idx) => val === solution[idx]);
    } else if (currentQ.type === 'spot_bug') {
      isCorrect = selectedAnswer === currentQ.bugLineIndex;
    } else {
      isCorrect = String(selectedAnswer).trim() === String(currentQ.correctAnswer).trim();
    }

    if (isCorrect) {
      playSound('correct');
      setFeedbackState('correct');
      setFeedbackExplanation(currentQ.explanation);
      setCorrectCount((prev) => prev + 1);
    } else {
      playSound('wrong');
      setFeedbackState('wrong');
      setFeedbackExplanation(currentQ.explanation);
      const nextHearts = hearts - 1;
      setHearts(nextHearts);
      if (nextHearts <= 0) {
        setIsFailed(true);
      }
    }
  };

  const handleNextQuestion = () => {
    playSound('click');
    if (currentIndex + 1 < testData.questions.length) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedAnswer(null);
      setSelectedBlocks([]);
      const nextQ = testData.questions[nextIdx];
      setAvailableBlocks(nextQ?.tokenBlocks ? [...nextQ.tokenBlocks].sort(() => Math.random() - 0.5) : []);
      setFeedbackState('idle');
      setFeedbackExplanation('');
    } else {
      // Completed test
      handleSuccessCompletion();
    }
  };

  const handleSuccessCompletion = () => {
    playSound('levelup');
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
    });
    setIsCompleted(true);
  };

  const handleConfirmSkipDirect = () => {
    playSound('levelup');
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });
    onPassTest(selectedUnitId, {
      xpEarned: skippedXp,
      gemsEarned: skippedGems,
      skippedLessonsCount: precedingLessons.length,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border-2 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 my-auto max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between border-b-2 border-amber-600 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
              <Zap className="w-5 h-5 text-amber-200 fill-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-white tracking-tight leading-none">
                  Teste de Nivelamento
                </h3>
                <span className="bg-amber-400 text-amber-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Pular Etapas
                </span>
              </div>
              <p className="text-[11px] text-amber-100 font-semibold mt-0.5 line-clamp-1">
                {activeUnit ? activeUnit.title : 'Comprove seu conhecimento'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lives indicator */}
            {!isCompleted && !isFailed && (
              <div className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-xl border border-white/20 text-rose-300 font-black text-xs">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                <span>{hearts}</span>
              </div>
            )}

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Fechar teste"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unit Selector Tabs (if multiple locked units exist) */}
        {availableUnits.length > 1 && !isCompleted && !isFailed && (
          <div className="bg-slate-100 dark:bg-slate-800/60 p-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 shrink-0 px-2">
              Pular para:
            </span>
            {availableUnits.map((u, i) => (
              <button
                key={u.id}
                onClick={() => handleSelectUnit(u.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  u.id === selectedUnitId
                    ? 'bg-amber-500 text-white shadow-xs font-black'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {u.title.split(':')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Progress bar */}
        {!isCompleted && !isFailed && (
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* SUCCESS SCREEN */}
          {isCompleted && (
            <div className="flex flex-col items-center text-center py-4 space-y-4 animate-in zoom-in-95">
              <MascotByte mood="celebrating" size="md" animation="celebration" />

              <div>
                <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black uppercase px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
                  🎉 Nivelamento Aprovado!
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
                  Você pulou para a {activeUnit.title.split(':')[0]}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mt-1">
                  O Carcará comprovou sua proficiência! Todas as lições anteriores foram concluídas automaticamente.
                </p>
              </div>

              {/* Rewards Box */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">+{skippedXp} XP</div>
                  <div className="text-[11px] text-slate-500 font-bold">Experiência Ganha</div>
                </div>
                <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-center">
                  <div className="text-xl font-black text-sky-600 dark:text-sky-400">+{skippedGems} 💎</div>
                  <div className="text-[11px] text-slate-500 font-bold">Cristais Bônus</div>
                </div>
              </div>

              <button
                onClick={() => {
                  onPassTest(selectedUnitId, {
                    xpEarned: skippedXp,
                    gemsEarned: skippedGems,
                    skippedLessonsCount: precedingLessons.length,
                  });
                  onClose();
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Acessar {activeUnit.title.split(':')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* FAILED SCREEN */}
          {isFailed && (
            <div className="flex flex-col items-center text-center py-6 space-y-4 animate-in zoom-in-95">
              <MascotByte mood="sad" size="md" />

              <div>
                <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400">
                  Faltou pouco para pular!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mt-1">
                  Você gastou suas 3 chances no teste. O Carcará sugere fazer as lições anteriores para solidificar a base, ou tentar o teste novamente.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-sm pt-2">
                <button
                  onClick={() => {
                    playSound('click');
                    handleSelectUnit(selectedUnitId);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Tentar Teste Novamente
                </button>
                <button
                  onClick={handleConfirmSkipDirect}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Pular Direto (Dev)</span>
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE QUESTION SCREEN */}
          {!isCompleted && !isFailed && currentQ && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                  Questão {currentIndex + 1} de {testData.questions.length}
                </span>
                <button
                  onClick={handleConfirmSkipDirect}
                  className="text-[11px] font-bold text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Pular direto sem teste se você já domina o conteúdo"
                >
                  <FastForward className="w-3 h-3" />
                  <span>Pular Direto (Já Domino)</span>
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
                {currentQ.instruction}
              </h4>

              {/* Code Snippet Box */}
              {currentQ.codeSnippet && (
                <div className="rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 bg-slate-950 shadow-inner">
                  <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center gap-1.5 text-[11px] font-mono text-slate-400 font-bold">
                    <span>Python</span>
                  </div>
                  <pre className="p-3.5 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto leading-relaxed">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Spot the bug lines */}
              {currentQ.type === 'spot_bug' && currentQ.codeLines && (
                <div className="space-y-1.5 rounded-2xl p-2 bg-slate-950 border-2 border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm">
                  {currentQ.codeLines.map((line, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (feedbackState === 'idle') {
                          playSound('click');
                          setSelectedAnswer(idx);
                        }
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                        selectedAnswer === idx
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <span className="text-slate-500 text-[10px] w-4">{idx + 1}</span>
                      <span>{line}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Token blocks builder */}
              {currentQ.type === 'blocks' && (
                <div className="space-y-3">
                  {/* Target Container */}
                  <div className="min-h-[58px] p-3 rounded-2xl border-2 border-dashed border-amber-400 dark:border-amber-600 bg-amber-50/40 dark:bg-amber-950/20 flex flex-wrap gap-2 items-center">
                    {selectedBlocks.length === 0 ? (
                      <span className="text-xs text-amber-700/60 dark:text-amber-400/60 font-bold">
                        Toque nos blocos abaixo na ordem correta:
                      </span>
                    ) : (
                      selectedBlocks.map((blk, i) => (
                        <button
                          key={i}
                          onClick={() => handleBlockClick(blk, true)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-mono text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-transform"
                        >
                          {blk}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available blocks */}
                  <div className="flex flex-wrap gap-2">
                    {availableBlocks.map((blk, i) => (
                      <button
                        key={i}
                        onClick={() => handleBlockClick(blk, false)}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold hover:border-amber-400 transition-all cursor-pointer shadow-2xs active:scale-95"
                      >
                        {blk}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Multiple Choice Options */}
              {currentQ.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedAnswer === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (feedbackState === 'idle') {
                            playSound('click');
                            setSelectedAnswer(opt);
                          }
                        }}
                        className={`p-3 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 shadow-sm'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border ${
                            isSelected ? 'bg-amber-500 text-white border-amber-500' : 'border-slate-300 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="font-mono">{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feedback Tray / Footer */}
        {!isCompleted && !isFailed && (
          <div className={`p-4 sm:px-6 border-t-2 shrink-0 transition-colors ${
            feedbackState === 'correct'
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
              : feedbackState === 'wrong'
              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}>
            {feedbackState === 'idle' ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">
                  {currentQ?.hint || 'Escolha a melhor resposta'}
                </span>
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null && selectedBlocks.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-black text-xs transition-colors shadow-xs cursor-pointer disabled:cursor-not-allowed"
                >
                  Verificar Resposta
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-black text-sm">
                  {feedbackState === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>Excelente! Resposta correta!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      <span>Ops! Não foi dessa vez. (-1 vida)</span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed opacity-90 font-medium">
                  {feedbackExplanation}
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNextQuestion}
                    className={`px-6 py-2 rounded-xl text-white font-black text-xs transition-colors cursor-pointer ${
                      feedbackState === 'correct'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                  >
                    {currentIndex + 1 < testData.questions.length ? 'Próxima Questão' : 'Ver Resultado'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
