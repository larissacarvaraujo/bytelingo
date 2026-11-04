import React, { useState, useEffect } from 'react';
import { Check, Lock, Star, Gift, BookOpen, Sparkles, Flame, ShieldCheck, Play, Zap, Award } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Language, Lesson, Track, UserProfile } from '../types';
import { MascotByte } from './MascotByte';
import { playSound } from '../utils/sound';
import { getUserLevelInfo } from '../utils/levelHelper';

interface LearningPathProps {
  track: Track;
  user: UserProfile;
  recentlyCompletedUnitId?: string | null;
  onStartLesson: (lesson: Lesson) => void;
  onOpenQuickPractice: () => void;
  onClaimChest: (gems: number) => void;
  onOpenStreakCalendar?: () => void;
  onOpenByteChat?: () => void;
  onOpenLevelModal?: () => void;
  onOpenPlacementTest?: (targetUnitId?: string) => void;
  onOpenCertificate?: (track?: Track) => void;
  onOpenAchievement?: (track: Track) => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  track,
  user,
  recentlyCompletedUnitId,
  onStartLesson,
  onOpenQuickPractice,
  onClaimChest,
  onOpenStreakCalendar,
  onOpenByteChat,
  onOpenLevelModal,
  onOpenPlacementTest,
  onOpenCertificate,
  onOpenAchievement,
}) => {
  const [chestOpened, setChestOpened] = useState<{ [id: string]: boolean }>({});
  const [selectedGuidebookUnit, setSelectedGuidebookUnit] = useState<string | null>(null);
  const levelInfo = getUserLevelInfo(user.xp);

  // Undulating offset pattern for Duolingo nodes
  const offsetClasses = [
    'translate-x-0',
    'translate-x-8 sm:translate-x-12',
    'translate-x-12 sm:translate-x-20',
    'translate-x-8 sm:translate-x-12',
    'translate-x-0',
    '-translate-x-8 sm:-translate-x-12',
    '-translate-x-12 sm:-translate-x-20',
    '-translate-x-8 sm:-translate-x-12',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Path Column (2 cols on large screen) */}
      <div className="lg:col-span-2 flex flex-col items-center">
        {/* Placement Test / Fast-Track Banner */}
        {onOpenPlacementTest && (
          <div className="w-full max-w-lg mb-8 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/10 border-2 border-amber-300 dark:border-amber-700/80 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-xs shrink-0">
                ⚡
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-amber-950 dark:text-amber-200 leading-tight">
                  Já domina algum conteúdo?
                </h4>
                <p className="text-[11px] sm:text-xs text-amber-800 dark:text-amber-300 font-medium leading-tight mt-0.5">
                  Faça o Teste de Nivelamento para pular fases e desbloquear unidades avançadas!
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                playSound('click');
                onOpenPlacementTest();
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Pular Etapas
            </button>
          </div>
        )}

        {track.units.map((unit, unitIdx) => {
          const completedInUnit = unit.lessons.filter((l) => user.completedLessonIds.includes(l.id)).length;
          const totalInUnit = unit.lessons.length;
          const unitProgressPct = totalInUnit > 0 ? Math.round((completedInUnit / totalInUnit) * 100) : 0;
          const isUnitCompleted = completedInUnit === totalInUnit && totalInUnit > 0;
          const isUnitPrevCompleted =
            unitIdx === 0
              ? true
              : track.units[unitIdx - 1].lessons.every((l) => user.completedLessonIds.includes(l.id));

          return (
            <div key={unit.id} className="w-full max-w-lg mb-12">
              {/* Unit Header Card */}
              <div className="bg-emerald-600 text-white rounded-3xl p-5 mb-8 shadow-md flex flex-col relative overflow-hidden border-2 border-emerald-500">
                <div className="flex items-start justify-between relative z-10 gap-3">
                  <div className="flex-1">
                    <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-200 mb-1">
                      {unit.title.split(':')[0]}
                    </div>
                    <h2 className="text-lg sm:text-xl font-black leading-tight">
                      {unit.title.split(':')[1] || unit.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md">
                      {unit.description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      playSound('click');
                      setSelectedGuidebookUnit(unit.id);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs"
                    title="Ver Guia de Estudos da Unidade"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-200" />
                    <span className="hidden sm:inline">Guia</span>
                  </button>
                </div>

                {/* Unit Visual Progress Bar with Framer Motion celebration */}
                <div className="mt-4 pt-3 border-t border-emerald-500/40 relative z-10">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="flex items-center gap-1.5 text-emerald-100">
                      {isUnitCompleted ? (
                        <span className="text-amber-300 font-extrabold flex items-center gap-1">
                          <span>🎉</span>
                          <span>Unidade 100% Concluída!</span>
                        </span>
                      ) : (
                        <span>
                          Progresso: <strong className="text-white">{completedInUnit}</strong> de {totalInUnit} lições
                        </span>
                      )}
                      {unit.id === recentlyCompletedUnitId && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.25, 1], opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'backOut' }}
                          className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-300 text-emerald-950 shadow-xs"
                        >
                          ✨ +1 Lição!
                        </motion.span>
                      )}
                    </span>
                    <motion.span
                      key={unitProgressPct}
                      initial={{ scale: 1 }}
                      animate={unit.id === recentlyCompletedUnitId ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-amber-300 font-black tabular-nums text-sm"
                    >
                      {unitProgressPct}%
                    </motion.span>
                  </div>

                  {/* The outer track bar */}
                  <div
                    className={`w-full bg-emerald-950/40 border border-emerald-400/30 h-4 rounded-full overflow-hidden p-0.5 shadow-inner relative transition-all ${
                      unit.id === recentlyCompletedUnitId ? 'ring-2 ring-amber-300/80' : ''
                    }`}
                  >
                    <motion.div
                      className={`h-full rounded-full relative overflow-hidden transition-colors ${
                        isUnitCompleted
                          ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-md'
                          : unitProgressPct > 0
                          ? 'bg-gradient-to-r from-emerald-300 to-emerald-400 shadow-sm'
                          : 'bg-emerald-700/50'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(unitProgressPct, unitProgressPct > 0 ? 8 : 0)}%` }}
                      transition={{
                        type: 'spring',
                        stiffness: 60,
                        damping: 14,
                        restDelta: 0.001,
                      }}
                    >
                      {unitProgressPct > 0 && (
                        <>
                          <div className="absolute top-0.5 left-1.5 right-1.5 h-1 bg-white/40 rounded-full" />
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                          />
                        </>
                      )}
                    </motion.div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-emerald-200 mt-1.5 font-medium">
                    <span>
                      {isUnitCompleted
                        ? 'Excelente trabalho! Bloco dominado com sucesso.'
                        : totalInUnit - completedInUnit === 1
                        ? '🔥 Falta apenas 1 lição para completar o bloco!'
                        : `Faltam ${totalInUnit - completedInUnit} lições para completar o bloco atual.`}
                    </span>
                  </div>

                  {/* Fast Skip button on locked unit */}
                  {unitIdx > 0 && !isUnitPrevCompleted && onOpenPlacementTest && (
                    <button
                      onClick={() => {
                        playSound('click');
                        onOpenPlacementTest(unit.id);
                      }}
                      className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-95"
                    >
                      <Zap className="w-3.5 h-3.5 fill-amber-950" />
                      <span>Fazer Teste de Nivelamento para Pular até esta Unidade</span>
                    </button>
                  )}
                </div>

                {/* Decorative background shape */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/30 rounded-full blur-xl pointer-events-none" />
              </div>

            {/* Stepped Nodes */}
            <div className="flex flex-col items-center gap-6 py-2">
              {unit.lessons.map((lesson, lessonIdx) => {
                const isCompleted = user.completedLessonIds.includes(lesson.id);
                // Active if previous is completed or it is the very first lesson
                const isPrevCompleted =
                  lessonIdx === 0
                    ? isUnitPrevCompleted
                    : user.completedLessonIds.includes(unit.lessons[lessonIdx - 1].id);
                const isCurrent = !isCompleted && isPrevCompleted;
                const isLocked = !isCompleted && !isCurrent;

                const offsetClass = offsetClasses[lessonIdx % offsetClasses.length];

                return (
                  <div
                    key={lesson.id}
                    className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                  >
                    {/* Active Floating Flag "COMEÇAR" */}
                    {isCurrent && (
                      <div className="absolute -top-10 z-20 animate-bounce duration-1000">
                        <div className="bg-white border-2 border-slate-200 text-slate-800 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                          <span>Começar</span>
                        </div>
                        <div className="w-2 h-2 bg-white border-r-2 border-b-2 border-slate-200 rotate-45 mx-auto -mt-1" />
                      </div>
                    )}

                    {/* Circular Node Button */}
                    <button
                      onClick={() => {
                        if (!isLocked) {
                          playSound('click');
                          onStartLesson(lesson);
                        } else {
                          playSound('wrong');
                        }
                      }}
                      disabled={isLocked}
                      className={`relative group w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-amber-400 border-b-6 border-amber-600 hover:brightness-105 active:translate-y-1 active:border-b-2 shadow-md'
                          : isCurrent
                          ? 'bg-emerald-500 border-b-6 border-emerald-700 hover:brightness-105 active:translate-y-1 active:border-b-2 shadow-lg ring-4 ring-emerald-200'
                          : 'bg-slate-200 border-b-6 border-slate-300 opacity-80 cursor-not-allowed'
                      }`}
                      aria-label={`${lesson.title} - ${isCompleted ? 'Concluída' : isCurrent ? 'Disponível' : 'Bloqueada'}`}
                    >
                      {/* Inner Node Icon */}
                      {isCompleted ? (
                        <Check className="w-9 h-9 text-amber-900 stroke-[3]" />
                      ) : isCurrent ? (
                        <span className="text-3xl animate-pulse">{lesson.icon}</span>
                      ) : (
                        <Lock className="w-7 h-7 text-slate-400 stroke-[2.5]" />
                      )}

                      {/* Small XP badge badge */}
                      {isCompleted && (
                        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-white" />
                          <span>{lesson.xpReward}</span>
                        </div>
                      )}
                    </button>

                    {/* Lesson Label */}
                    <div className="text-center mt-2 max-w-[140px]">
                      <span className={`text-xs font-bold leading-tight line-clamp-1 ${isCurrent ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {lesson.title}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Unit Chest Reward Node */}
              <div className="mt-4 flex flex-col items-center">
                <button
                  onClick={() => {
                    const chestId = `chest-${unit.id}`;
                    if (!chestOpened[chestId]) {
                      playSound('streak');
                      setChestOpened((prev) => ({ ...prev, [chestId]: true }));
                      onClaimChest(30);
                    }
                  }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    chestOpened[`chest-${unit.id}`]
                      ? 'bg-amber-100 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                      : 'bg-amber-500 border-b-4 border-amber-700 hover:brightness-105 active:translate-y-1 active:border-b-0 shadow-md text-white animate-pulse'
                  }`}
                  title="Baú de Recompensas de Cristais"
                >
                  <Gift className="w-8 h-8" />
                </button>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">
                  {chestOpened[`chest-${unit.id}`] ? 'Baú Aberto (+30 💎)' : 'Baú Bônus'}
                </span>
              </div>
            </div>
          </div>
        );
      })}

        {/* Course Completion & Certificate Section */}
        {(() => {
          const allTrackLessons = track.units.flatMap((u) => u.lessons);
          const totalTrackLessons = allTrackLessons.length;
          const completedTrackLessons = allTrackLessons.filter((l) =>
            user.completedLessonIds.includes(l.id)
          ).length;
          const isTrackComplete = completedTrackLessons === totalTrackLessons && totalTrackLessons > 0;
          const progressPct =
            totalTrackLessons > 0
              ? Math.round((completedTrackLessons / totalTrackLessons) * 100)
              : 0;

          return (
            <div className="w-full max-w-lg mb-12">
              {isTrackComplete ? (
                <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl border-4 border-amber-300 dark:border-amber-400">
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white text-amber-600 flex items-center justify-center text-3xl shadow-md mb-2">
                      🎓
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-100">
                      Parabéns! Trilha Concluída
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black mt-1 leading-tight">
                      Curso de {track.name} Finalizado!
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-100 mt-1.5 max-w-md">
                      Você dominou todas as 5 unidades e 11 etapas práticas de {track.name}. Formalize sua conquista emitindo seu Certificado e compartilhando seu diploma!
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                      <button
                        onClick={() => {
                          playSound('levelup');
                          onOpenAchievement?.(track);
                        }}
                        className="px-5 py-2.5 rounded-2xl bg-white text-amber-950 font-black text-xs sm:text-sm shadow-lg hover:bg-amber-50 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Ver Conquista & Compartilhar</span>
                      </button>

                      <button
                        onClick={() => {
                          playSound('click');
                          onOpenCertificate?.(track);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-amber-600/80 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm border border-amber-300/40 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Certificado PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 flex items-center justify-center text-2xl shrink-0">
                      🎓
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                        Certificado do Curso de {track.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {completedTrackLessons} de {totalTrackLessons} lições concluídas ({progressPct}%)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        playSound('click');
                        onOpenAchievement?.(track);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 border border-amber-300 dark:border-amber-700 transition-colors cursor-pointer"
                    >
                      Conquista
                    </button>
                    <button
                      onClick={() => {
                        playSound('click');
                        onOpenCertificate?.(track);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      Ver Modelo
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Side HUD & Companion Column */}
      <div className="hidden lg:flex flex-col gap-6">
        {/* Mascot Mascot Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center transition-colors">
          <MascotByte
            mood={user.hearts <= 1 ? 'sad' : user.streak > 3 ? 'celebrating' : 'neutral'}
            message={
              user.hearts === 0
                ? 'Sem vidas! Pratique no Treino Rápido ou compre na Loja!'
                : user.streak > 0
                ? `${user.streak} dias de sequência! Você está voando!`
                : 'Vamos codar hoje? Escolha uma lição!'
            }
            size="md"
          />

          <div className="mt-4 w-full">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">Byte, seu Mentor</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Programação se aprende na prática diária. Faça uma lição por dia para fixar!
            </p>

            {/* Quick Practice & Byte Tutor buttons */}
            <div className="mt-4 w-full flex flex-col gap-2">
              {onOpenByteChat && (
                <button
                  onClick={() => {
                    playSound('click');
                    onOpenByteChat();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs bg-emerald-500 border-b-4 border-emerald-700 hover:brightness-105 active:translate-y-0.5 active:border-b-0 text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Conversar com Byte Tutor IA</span>
                </button>
              )}

              <button
                onClick={() => {
                  playSound('click');
                  onOpenQuickPractice();
                }}
                className="w-full py-2.5 px-4 rounded-xl font-extrabold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>⚡ Treino Rápido (Ganhe Vidas)</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Level Progression Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-xl shadow-xs">
                {levelInfo.badgeIcon}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">
                    Nível {levelInfo.level}
                  </h4>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-md border border-amber-300 dark:border-amber-700/80">
                    {levelInfo.progressPercent}%
                  </span>
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-extrabold truncate max-w-[170px]">
                  {levelInfo.title}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 tabular-nums">
                {user.xp} XP
              </span>
              <div className="text-[10px] text-slate-400">Total</div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <span>{levelInfo.xpIntoCurrentLevel} / {levelInfo.xpNeededForNextLevel} XP</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                Faltam {levelInfo.xpRemaining} XP
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-500 rounded-full transition-all duration-500 shadow-2xs"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mb-3">
            🎁 <strong>Vantagem:</strong> {levelInfo.perk}
          </p>

          <button
            onClick={() => {
              playSound('click');
              if (onOpenLevelModal) onOpenLevelModal();
            }}
            className="w-full py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Ver Jornada de Níveis</span>
          </button>
        </div>

        {/* Streak Calendar Promo Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-3xl p-5 border-2 border-amber-200 dark:border-amber-800/60 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                <Flame className="w-5 h-5 fill-white stroke-orange-600 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-black text-amber-950 dark:text-amber-200">
                  {user.streak} {user.streak === 1 ? 'Dia de Ofensiva' : 'Dias de Ofensiva'}
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 font-medium">Meta diária em dia!</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-amber-900/80 dark:text-amber-200/80 mb-3">
            Visualize seus dias ativos na semana, recordes e proteções contra congelamento.
          </p>

          <button
            onClick={() => {
              playSound('click');
              if (onOpenStreakCalendar) onOpenStreakCalendar();
            }}
            className="w-full py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-100/60 dark:hover:bg-amber-900/40 border-2 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <span>Ver Calendário de Ofensiva</span>
            <span>🔥</span>
          </button>
        </div>

        {/* Daily Quests Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1.5">
              <span>🎯</span>
              <span>Desafios de Hoje</span>
            </h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {user.dailyQuests.filter((q) => q.completed).length}/{user.dailyQuests.length}
            </span>
          </div>

          <div className="space-y-3">
            {user.dailyQuests.map((quest) => {
              const progressPct = Math.min(100, Math.round((quest.progress / quest.target) * 100));
              return (
                <div key={quest.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    <span>{quest.title}</span>
                    <span className="text-amber-600 dark:text-amber-400">+{quest.rewardGems} 💎</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{quest.description}</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* League Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Liga Atual
              </div>
              <div className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                Liga {user.league} (#2 Lugar)
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Zona de Promoção</span>
            </span>
          </div>
        </div>
      </div>

      {/* Guidebook Modal */}
      {selectedGuidebookUnit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Resumo da Unidade</span>
              </h3>
              <button
                onClick={() => setSelectedGuidebookUnit(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-3">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Conceitos fundamentais desta unidade em {track.name}:
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <li>Sintaxe canônica e regras de formatação essenciais</li>
                <li>Operações lógicas, fluxo de controle e manipulação de variáveis</li>
                <li>Boas práticas recomendadas pela documentação oficial da linguagem</li>
                <li>Feedback imediato em tempo real no console de execução</li>
              </ul>
            </div>

            <button
              onClick={() => setSelectedGuidebookUnit(null)}
              className="mt-6 w-full py-2.5 rounded-xl font-bold text-sm btn-duo-green"
            >
              Entendido! Voltar à Trilha
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
