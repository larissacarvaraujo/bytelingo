import React from 'react';
import { X, Gem, Heart, Shield, Zap, Sparkles } from 'lucide-react';
import { SHOP_ITEMS } from '../data/curriculum';
import { UserProfile } from '../types';
import { playSound } from '../utils/sound';

interface ShopModalProps {
  user: UserProfile;
  onBuyItem: (itemId: string, costGems: number) => boolean;
  onClose: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ user, onBuyItem, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border-2 border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏪</span>
            <h2 className="text-xl font-black text-slate-800 dark:text-slate-100">Loja do Byte</h2>
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

        {/* User Balance */}
        <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl p-3 flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-sky-800 dark:text-sky-300">Seu Saldo Atual:</span>
          <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-black text-base">
            <Gem className="w-5 h-5 fill-sky-400" />
            <span className="tabular-nums">{user.gems} Cristais</span>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {SHOP_ITEMS.map((item) => {
            const canAfford = user.gems >= item.costGems;
            const isFullHearts = item.type === 'hearts' && user.hearts >= user.maxHearts;

            return (
              <div
                key={item.id}
                className="p-4 bg-slate-50 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 shadow-xs">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-slate-100">{item.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (canAfford && !isFullHearts) {
                      const success = onBuyItem(item.id, item.costGems);
                      if (success) playSound('gem');
                    } else {
                      playSound('wrong');
                    }
                  }}
                  disabled={!canAfford || isFullHearts}
                  className={`px-3 py-2 rounded-xl font-extrabold text-xs shrink-0 flex items-center gap-1 transition-all ${
                    isFullHearts
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : canAfford
                      ? 'btn-duo-green'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Gem className="w-3.5 h-3.5 fill-current" />
                  <span>{isFullHearts ? 'Cheio' : item.costGems}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Inventory status */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-500 font-semibold">
          <span>Congelamentos guardados: {user.inventory.streakFreeze}</span>
          <span>{user.inventory.doubleXpMinutesLeft > 0 ? '⚡ 2x XP Ativo!' : 'XP Normal'}</span>
        </div>
      </div>
    </div>
  );
};
