import React, { useState } from 'react';
import { Flame, Heart, Gem, Zap, Volume2, VolumeX, Terminal, Trophy, ShoppingBag, Target, Bot, Sparkles, User as UserIcon, Cloud, LogOut, CheckCircle, Sun, Moon } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { TRACKS } from '../data/curriculum';
import { playSound } from '../utils/sound';

interface NavbarUser {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  isAnonymous?: boolean;
}

interface NavbarProps {
  user: UserProfile;
  activeTrack: Language;
  onSelectTrack: (track: Language) => void;
  onOpenDailyQuests: () => void;
  onOpenPlayground: () => void;
  onOpenShop: () => void;
  onOpenLeaderboard: () => void;
  onOpenStreakCalendar?: () => void;
  onOpenByteChat?: () => void;
  currentUser?: NavbarUser | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  isSyncing?: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  currentTheme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTrack,
  onSelectTrack,
  onOpenDailyQuests,
  onOpenPlayground,
  onOpenShop,
  onOpenLeaderboard,
  onOpenStreakCalendar,
  onOpenByteChat,
  currentUser,
  onOpenAuth,
  onLogout,
  isSyncing = false,
  isMuted,
  onToggleMute,
  currentTheme = 'light',
  onToggleTheme,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const currentTrack = TRACKS.find((t) => t.id === activeTrack) || TRACKS[0];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Track Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 select-none cursor-pointer">
            <span className="text-2xl">🦉</span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight hidden sm:inline">
              Byte<span className="text-slate-800 dark:text-slate-100">Lingo</span>
            </span>
          </div>

          {/* Track Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => {
                playSound('click');
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800 transition-colors font-bold text-sm text-slate-700 dark:text-slate-200"
              aria-label="Selecionar Linguagem ou Trilha"
            >
              <span className="text-lg">{currentTrack.icon}</span>
              <span className="hidden md:inline">{currentTrack.name}</span>
              <span className="text-xs text-slate-400">▼</span>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-slate-700 p-2 z-20 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">
                    Escolha sua Trilha
                  </div>
                  {TRACKS.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        playSound('click');
                        onSelectTrack(track.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                        track.id === activeTrack
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-extrabold border-2 border-emerald-200 dark:border-emerald-800'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold'
                      }`}
                    >
                      <span className="text-2xl">{track.icon}</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold leading-tight">{track.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{track.tagline}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feature Quick Launch Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          {onOpenByteChat && (
            <button
              onClick={() => {
                playSound('click');
                onOpenByteChat();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-300 dark:border-emerald-700 transition-colors shadow-2xs"
              title="Byte Tutor IA (Gemini)"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Byte Tutor IA</span>
            </button>
          )}

          <button
            onClick={() => {
              playSound('click');
              onOpenPlayground();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Terminal de Código Multilinguagem"
          >
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Playground</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onOpenDailyQuests();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Desafios Diários"
          >
            <Target className="w-4 h-4 text-rose-500" />
            <span>Desafios</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Liga e Ranking Semanal"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Ranking</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onOpenShop();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title="Loja do Byte"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
            <span>Loja</span>
          </button>
        </div>

        {/* Game Stats HUD */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak Flame */}
          <button
            onClick={() => {
              playSound('streak');
              if (onOpenStreakCalendar) {
                onOpenStreakCalendar();
              }
            }}
            className="relative flex items-center gap-1.5 text-amber-500 font-extrabold text-sm sm:text-base select-none cursor-pointer hover:scale-105 transition-transform bg-amber-50/60 dark:bg-amber-950/40 hover:bg-amber-100/80 dark:hover:bg-amber-900/60 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800/80"
            title={`${user.streak} dias de ofensiva consecutiva! Lembrete: ${
              user.notificationPreferences?.enabled
                ? `Ativo às ${user.notificationPreferences.time}`
                : 'Desativado'
            }. Clique para abrir o Calendário.`}
            aria-label="Abrir Calendário de Ofensiva e Lembretes"
          >
            <Flame className="w-5 h-5 fill-amber-500 stroke-amber-600 animate-pulse" />
            <span className="tabular-nums">{user.streak}</span>
            {user.notificationPreferences?.enabled && (
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"
                title="Lembretes Diários Ativos"
              />
            )}
          </button>

          {/* Gems */}
          <div
            className="flex items-center gap-1.5 text-sky-500 font-extrabold text-sm sm:text-base select-none cursor-pointer hover:scale-105 transition-transform"
            title={`${user.gems} cristais acumulados`}
            onClick={() => {
              playSound('gem');
              onOpenShop();
            }}
          >
            <Gem className="w-5 h-5 fill-sky-400 stroke-sky-600" />
            <span className="tabular-nums">{user.gems}</span>
          </div>

          {/* Hearts / Lives */}
          <div
            className="flex items-center gap-1.5 text-rose-500 font-extrabold text-sm sm:text-base select-none cursor-pointer hover:scale-105 transition-transform"
            title={`${user.hearts}/${user.maxHearts} vidas disponíveis`}
            onClick={() => {
              if (user.hearts < user.maxHearts) onOpenShop();
            }}
          >
            <Heart className="w-5 h-5 fill-rose-500 stroke-rose-600" />
            <span className="tabular-nums">{user.hearts}</span>
          </div>

          {/* XP */}
          <div className="hidden sm:flex items-center gap-1 text-yellow-500 font-extrabold text-sm select-none">
            <Zap className="w-4 h-4 fill-yellow-400 stroke-yellow-600" />
            <span className="tabular-nums text-slate-700 dark:text-slate-200">{user.xp} XP</span>
          </div>

          {/* Global Theme Toggle Button */}
          {onToggleTheme && (
            <button
              onClick={() => {
                onToggleTheme();
              }}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={currentTheme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
              aria-label={currentTheme === 'dark' ? 'Alternar para Modo Claro' : 'Alternar para Modo Escuro'}
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 fill-indigo-600/10" />
              )}
            </button>
          )}

          {/* Sound Mute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isMuted ? 'Ativar Efeitos Sonoros' : 'Mutar Efeitos Sonoros'}
            aria-label={isMuted ? 'Ativar Efeitos Sonoros' : 'Mutar Efeitos Sonoros'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          </button>

          {/* User Account / Cloud Sync Button */}
          {currentUser && !currentUser.isAnonymous ? (
            <div className="relative">
              <button
                onClick={() => {
                  playSound('click');
                  setIsUserMenuOpen(!isUserMenuOpen);
                }}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer select-none"
                title={`Logado como ${currentUser.displayName || currentUser.email}`}
                aria-label="Abrir menu de usuário"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center uppercase shadow-2xs">
                  {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[100px]">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Cloud className="w-2.5 h-2.5" />
                    {isSyncing ? 'Salvando...' : 'Nuvem OK'}
                  </span>
                </div>
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-slate-700 p-3 z-20 animate-in fade-in zoom-in-95">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                      <div className="text-xs font-black text-slate-800 dark:text-slate-100">
                        {currentUser.displayName || 'Dev ByteLingo'}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</div>
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        <span>Progresso salvo no Firebase</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 px-2 py-0.5">
                        Ofensiva: <strong className="text-amber-600 dark:text-amber-400">{user.streak} dias</strong> • XP:{' '}
                        <strong className="text-slate-700 dark:text-slate-200">{user.xp}</strong>
                      </div>

                      {/* Theme selection in user menu */}
                      {onToggleTheme && (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 px-2">
                            Tema do Aplicativo
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                            <button
                              onClick={() => {
                                if (currentTheme !== 'light') onToggleTheme();
                              }}
                              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                currentTheme === 'light'
                                  ? 'bg-white text-slate-800 shadow-xs'
                                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                              }`}
                            >
                              <Sun className="w-3.5 h-3.5 text-amber-500" />
                              <span>Claro</span>
                            </button>
                            <button
                              onClick={() => {
                                if (currentTheme !== 'dark') onToggleTheme();
                              }}
                              className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                currentTheme === 'dark'
                                  ? 'bg-slate-700 text-white shadow-xs'
                                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                              }`}
                            >
                              <Moon className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Escuro</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {onLogout && (
                        <button
                          onClick={() => {
                            playSound('click');
                            setIsUserMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full mt-2 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sair da Conta</span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                playSound('click');
                if (onOpenAuth) onOpenAuth();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs transition-colors cursor-pointer"
              title="Salvar progresso criando conta gratuita"
              aria-label="Entrar ou criar conta"
            >
              <Cloud className="w-4 h-4" />
              <span className="hidden sm:inline">Salvar Progresso</span>
              <span className="sm:hidden">Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
