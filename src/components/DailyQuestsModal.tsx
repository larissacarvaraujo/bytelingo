import React from 'react';
import { X, Target, Check, Sparkles, Gem } from 'lucide-react';
import { motion } from 'motion/react';
import { DailyQuest } from '../types';
import { playSound } from '../utils/sound';

interface DailyQuestsModalProps {
  quests: DailyQuest[];
  onClaimQuest: (questId: string, rewardGems: number) => void;
  onClose: () => void;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({
  quests,
  onClaimQuest,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 transition-colors">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Desafios Diários</h2>
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
          Novas metas todo dia às 00:00. Cumpra os objetivos e ganhe cristais preciosos!
        </p>

        <div className="space-y-4">
          {quests.map((quest) => {
            const isFinished = quest.progress >= quest.target;
            const progressPct = Math.min(100, Math.round((quest.progress / quest.target) * 100));

            return (
              <div
                key={quest.id}
                className="p-4 bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{quest.title}</span>
                  <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-bold text-xs">
                    <Gem className="w-3.5 h-3.5 fill-sky-400" />
                    <span>+{quest.rewardGems}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">{quest.description}</p>

                {/* Progress bar and Claim button */}
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-3.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <motion.div
                      className={`h-full rounded-full ${
                        isFinished ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                    {quest.progress}/{quest.target}
                  </span>
                </div>

                {isFinished && !quest.completed && (
                  <button
                    onClick={() => {
                      playSound('gem');
                      onClaimQuest(quest.id, quest.rewardGems);
                    }}
                    className="mt-2 w-full py-2 rounded-xl font-bold text-xs btn-duo-green flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Resgatar +{quest.rewardGems} Cristais</span>
                  </button>
                )}

                {quest.completed && (
                  <div className="mt-1 flex items-center gap-1 text-emerald-600 text-xs font-bold justify-end">
                    <Check className="w-4 h-4" />
                    <span>Recompensa Coletada</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
