import React from 'react';
import { X, Trophy, ShieldCheck, Zap } from 'lucide-react';
import { LEADERBOARD_USERS } from '../data/curriculum';
import { UserProfile } from '../types';
import { playSound } from '../utils/sound';

interface LeaderboardModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ user, onClose }) => {
  // Update current user XP in leaderboard list
  const users = LEADERBOARD_USERS.map((u) =>
    u.isCurrentUser ? { ...u, xp: user.xp } : u
  ).sort((a, b) => b.xp - a.xp);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500 fill-amber-400" />
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Divisão Ouro</h2>
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

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Os 3 primeiros colocados sobem para a prestigiosa Liga Safira no domingo!
        </p>

        <div className="space-y-2">
          {users.map((u, idx) => {
            const rank = idx + 1;
            const isTop3 = rank <= 3;
            const isMe = u.isCurrentUser;

            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${
                  isMe
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 font-black'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 font-bold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 text-center text-xs font-black ${
                      rank === 1
                        ? 'text-amber-500 text-sm'
                        : rank === 2
                        ? 'text-slate-400 text-sm'
                        : rank === 3
                        ? 'text-amber-700 dark:text-amber-400 text-sm'
                        : 'text-slate-400'
                    }`}
                  >
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                  </span>

                  <span className="text-2xl">{u.avatar}</span>
                  <div>
                    <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                      {u.name} {isMe && '(Você)'}
                    </div>
                    {isTop3 && (
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Promoção</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-black text-slate-700 dark:text-slate-200 tabular-nums">
                  <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                  <span>{u.xp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
