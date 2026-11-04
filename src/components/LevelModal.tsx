import React from 'react';
import { X, Trophy, Zap, Sparkles, Check, Lock, ChevronRight, Star, Award } from 'lucide-react';
import { UserProfile } from '../types';
import { getUserLevelInfo, getAllLevelTiers } from '../utils/levelHelper';
import { MascotByte } from './MascotByte';
import { playSound } from '../utils/sound';

interface LevelModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const LevelModal: React.FC<LevelModalProps> = ({ user, onClose }) => {
  const levelInfo = getUserLevelInfo(user.xp);
  const allTiers = getAllLevelTiers();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border-2 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 my-auto max-h-[90vh]">
        {/* Header Hero */}
        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-6 text-white text-center overflow-hidden shrink-0">
          {/* Close button */}
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-2xl bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer z-10"
            aria-label="Fechar janela de níveis"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative Background Elements */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-amber-300/20 rounded-full blur-xl pointer-events-none" />

          {/* Mascot in header */}
          <div className="flex justify-center mb-1">
            <MascotByte mood="celebrating" size="sm" animation="celebration" />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-200 border border-white/20 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sistema de Progressão</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-center gap-2">
            <span>Nível {levelInfo.level}</span>
            <span className="text-xl sm:text-2xl">{levelInfo.badgeIcon}</span>
          </h2>
          <p className="text-sm font-extrabold text-amber-100 tracking-wide mt-0.5">
            {levelInfo.title}
          </p>

          {/* Level Progress Bar Card */}
          <div className="mt-5 bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-left">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-amber-100 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Progresso para o Nível {levelInfo.level + 1}</span>
              </span>
              <span className="text-white font-black">
                {levelInfo.xpIntoCurrentLevel} / {levelInfo.xpNeededForNextLevel} XP ({levelInfo.progressPercent}%)
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full h-3.5 bg-black/40 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber-300 via-yellow-300 to-lime-300 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-amber-100/90 font-medium">
              <span>{levelInfo.totalXp} XP totais acumulados</span>
              <span className="font-bold text-white">
                Faltam {levelInfo.xpRemaining} XP para avançar
              </span>
            </div>
          </div>
        </div>

        {/* Current Level Perk Highlight */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-100 dark:border-amber-900/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Vantagem Atual Desbloqueada
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {levelInfo.perk}
            </div>
          </div>
        </div>

        {/* Scrollable Levels Roadmap */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Jornada de Níveis de Programador
            </h3>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {user.xp} XP total
            </span>
          </div>

          <div className="space-y-2.5">
            {allTiers.map((tier) => {
              const isCurrent = tier.level === levelInfo.level;
              const isCompleted = tier.level < levelInfo.level;
              const isLocked = tier.level > levelInfo.level;

              return (
                <div
                  key={tier.level}
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-center gap-3.5 ${
                    isCurrent
                      ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-md ring-2 ring-amber-400/20'
                      : isCompleted
                      ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-750 opacity-90'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-xl font-black shadow-xs ${
                      isCurrent
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/20'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : isCurrent ? (
                      tier.badgeIcon
                    ) : (
                      <Lock className="w-4 h-4 text-slate-400" />
                    )}
                  </div>

                  {/* Level Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                        Nível {tier.level}: {tier.title}
                      </span>
                      {isCurrent && (
                        <span className="bg-amber-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                          Você está aqui
                        </span>
                      )}
                      {isCompleted && (
                        <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                          Conquistado
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-medium">
                      {tier.perk}
                    </div>
                  </div>

                  {/* XP Requirement */}
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 tabular-nums">
                      {tier.minXp} XP
                    </span>
                    <div className="text-[10px] text-slate-400">
                      {isCompleted ? 'Alcançado' : isCurrent ? `${levelInfo.xpRemaining} p/ próx.` : 'Bloqueado'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* XP Tip Box */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
            <div className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Como subir de nível mais rápido?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              • Lições concluídas rendem <strong>+10 a +25 XP</strong> base.
              <br />
              • Precisão de 100% garante bônus de maestria do Carcará.
              <br />
              • Ative a poção de <strong>Dobro de XP</strong> na Loja para acelerar sua subida!
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-xs cursor-pointer"
          >
            Continuar Codando
          </button>
        </div>
      </div>
    </div>
  );
};
