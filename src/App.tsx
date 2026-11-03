/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LearningPath } from './components/LearningPath';
import { LessonModal } from './components/LessonModal';
import { PlaygroundModal } from './components/PlaygroundModal';
import { DailyQuestsModal } from './components/DailyQuestsModal';
import { ShopModal } from './components/ShopModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { QuickPracticeModal } from './components/QuickPracticeModal';
import { StreakCalendarModal } from './components/StreakCalendarModal';
import { ByteChatModal } from './components/ByteChatModal';
import { AuthModal } from './components/AuthModal';
import { Language, Lesson, UserProfile, NotificationPreferences } from './types';
import { INITIAL_DAILY_QUESTS, TRACKS } from './data/curriculum';
import { getMuted, setMuted, playSound } from './utils/sound';
import { getWeeklyStreakActivity } from './utils/streakHelper';
import { checkAndTriggerStreakReminder } from './utils/notificationHelper';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { loadUserProfile, saveUserProfile, logoutUser } from './services/authService';
import { Map, Terminal, Target, Trophy, ShoppingBag, Flame, Sparkles, Cloud, Check } from 'lucide-react';

const STORAGE_KEY = 'bytelingo_user_profile_v2';

const DEFAULT_PROFILE: UserProfile = {
  theme: 'light',
  notificationPreferences: {
    enabled: false,
    time: '20:00',
    sound: true,
  },
  hearts: 5,
  maxHearts: 5,
  gems: 120,
  xp: 65,
  streak: 3,
  longestStreak: 14,
  totalDaysActive: 22,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  activeTrack: 'python',
  dailyQuests: INITIAL_DAILY_QUESTS,
  streakActivity: getWeeklyStreakActivity(3),
  inventory: {
    streakFreeze: 1,
    doubleXpMinutesLeft: 0,
  },
  league: 'Ouro',
};

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          theme: parsed.theme || 'light',
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROFILE;
  });

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showPlayground, setShowPlayground] = useState(false);
  const [showDailyQuests, setShowDailyQuests] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showQuickPractice, setShowQuickPractice] = useState(false);
  const [showStreakCalendar, setShowStreakCalendar] = useState(false);
  const [showByteChat, setShowByteChat] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isMuted, setIsMutedState] = useState(() => getMuted());
  const [recentlyCompletedUnitId, setRecentlyCompletedUnitId] = useState<string | null>(null);

  // Apply global dark class to document element based on user theme
  useEffect(() => {
    const isDark = user.theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user.theme]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setCurrentUser(fbUser);
      if (fbUser && !fbUser.isAnonymous) {
        // Fetch saved profile from Firestore
        const cloudProfile = await loadUserProfile(fbUser.uid);
        if (cloudProfile) {
          setUser((prev) => ({
            ...prev,
            ...cloudProfile,
            theme: (cloudProfile.theme as 'light' | 'dark') ?? prev.theme ?? 'light',
            hearts: cloudProfile.hearts ?? prev.hearts,
            gems: cloudProfile.gems ?? prev.gems,
            xp: cloudProfile.xp ?? prev.xp,
            streak: cloudProfile.streak ?? prev.streak,
            completedLessonIds: cloudProfile.completedLessonIds ?? prev.completedLessonIds,
            activeTrack: (cloudProfile.activeTrack as Language) ?? prev.activeTrack,
            notificationPreferences:
              cloudProfile.notificationPreferences ??
              prev.notificationPreferences ??
              DEFAULT_PROFILE.notificationPreferences,
          }));
          setToastMsg(`Progresso sincronizado para ${fbUser.displayName || fbUser.email}!`);
        } else {
          // Initialize document in Firestore with current progress
          await saveUserProfile(fbUser.uid, user);
          setToastMsg('Conta vinculada! Seu progresso agora está seguro na nuvem.');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Periodic check for daily streak reminder via Web Notification API
  useEffect(() => {
    checkAndTriggerStreakReminder(user, (updatedPrefs) => {
      setUser((prev) => ({
        ...prev,
        notificationPreferences: updatedPrefs,
      }));
    });

    const interval = setInterval(() => {
      checkAndTriggerStreakReminder(user, (updatedPrefs) => {
        setUser((prev) => ({
          ...prev,
          notificationPreferences: updatedPrefs,
        }));
      });
    }, 30000);

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkAndTriggerStreakReminder(user, (updatedPrefs) => {
          setUser((prev) => ({
            ...prev,
            notificationPreferences: updatedPrefs,
          }));
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [user.notificationPreferences, user.lastActiveDate, user.streak]);

  // Debounced auto-save to Firestore whenever user profile changes
  useEffect(() => {
    if (currentUser && !currentUser.isAnonymous) {
      setIsSyncing(true);
      const timer = setTimeout(async () => {
        await saveUserProfile(currentUser.uid, user);
        setIsSyncing(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, currentUser]);

  // Clear toast after 4s
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setToastMsg('Você saiu da sua conta. O progresso agora é local.');
      playSound('click');
    } catch (err) {
      console.error('Erro ao sair:', err);
    }
  };

  // Check URL query parameters for ?autostart=1 or direct lesson access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        // Automatically start the first lesson of the active track
        const currentTrack = TRACKS.find((t) => t.id === user.activeTrack) || TRACKS[0];
        if (currentTrack && currentTrack.units[0]?.lessons[0]) {
          setActiveLesson(currentTrack.units[0].lessons[0]);
        }
      }
    }
  }, []);

  // Save profile to localStorage on state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {
      // Ignore
    }
  }, [user]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMutedState(nextMuted);
    setMuted(nextMuted);
    if (!nextMuted) {
      playSound('click');
    }
  };

  const handleToggleTheme = () => {
    setUser((prev) => {
      const nextTheme = prev.theme === 'dark' ? 'light' : 'dark';
      return { ...prev, theme: nextTheme };
    });
    playSound('click');
  };

  const handleSelectTrack = (trackId: Language) => {
    setUser((prev) => ({ ...prev, activeTrack: trackId }));
  };

  const handleStartLesson = (lesson: Lesson) => {
    if (user.hearts <= 0) {
      setShowQuickPractice(true);
      return;
    }
    setActiveLesson(lesson);
  };

  const handleCompleteLesson = ({
    xpGained,
    gemsGained,
  }: {
    xpGained: number;
    gemsGained: number;
    accuracy: number;
  }) => {
    if (!activeLesson) return;

    setUser((prev) => {
      const multiplier = prev.inventory.doubleXpMinutesLeft > 0 ? 2 : 1;
      const totalXp = xpGained * multiplier;
      const completedList = prev.completedLessonIds.includes(activeLesson.id)
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, activeLesson.id];

      // Update daily quests
      const updatedQuests = prev.dailyQuests.map((q) => {
        if (q.id === 'quest-1') {
          return { ...q, progress: Math.min(q.target, q.progress + 1) };
        }
        if (q.id === 'quest-3') {
          return { ...q, progress: Math.min(q.target, q.progress + totalXp) };
        }
        return q;
      });

      const todayStr = new Date().toISOString().split('T')[0];

      return {
        ...prev,
        xp: prev.xp + totalXp,
        gems: prev.gems + gemsGained,
        lastActiveDate: todayStr,
        completedLessonIds: completedList,
        dailyQuests: updatedQuests,
      };
    });

    if (activeLesson) {
      setRecentlyCompletedUnitId(activeLesson.unitId);
      setTimeout(() => {
        setRecentlyCompletedUnitId(null);
      }, 9000);
    }

    setActiveLesson(null);
  };

  const handleLoseHeart = () => {
    setUser((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  };

  const handleGainHeart = () => {
    setUser((prev) => ({
      ...prev,
      hearts: Math.min(prev.maxHearts, prev.hearts + 1),
    }));
  };

  const handleRefillHearts = () => {
    if (user.gems >= 50) {
      setUser((prev) => ({
        ...prev,
        gems: prev.gems - 50,
        hearts: prev.maxHearts,
      }));
      playSound('gem');
    } else {
      setShowShop(true);
    }
  };

  const handleBuyShopItem = (itemId: string, costGems: number): boolean => {
    if (user.gems < costGems) return false;

    setUser((prev) => {
      const newGems = prev.gems - costGems;
      if (itemId === 'heart_refill') {
        return { ...prev, gems: newGems, hearts: prev.maxHearts };
      }
      if (itemId === 'streak_freeze') {
        return {
          ...prev,
          gems: newGems,
          inventory: { ...prev.inventory, streakFreeze: prev.inventory.streakFreeze + 1 },
        };
      }
      if (itemId === 'double_xp') {
        return {
          ...prev,
          gems: newGems,
          inventory: { ...prev.inventory, doubleXpMinutesLeft: 30 },
        };
      }
      return { ...prev, gems: newGems };
    });

    return true;
  };

  const handleClaimChest = (gems: number) => {
    setUser((prev) => ({ ...prev, gems: prev.gems + gems }));
  };

  const handleClaimDailyQuest = (questId: string, rewardGems: number) => {
    setUser((prev) => ({
      ...prev,
      gems: prev.gems + rewardGems,
      dailyQuests: prev.dailyQuests.map((q) =>
        q.id === questId ? { ...q, completed: true } : q
      ),
    }));
  };

  const currentTrack = TRACKS.find((t) => t.id === user.activeTrack) || TRACKS[0];

  return (
    <div className={`min-h-screen ${user.theme === 'dark' ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 pb-16 lg:pb-0 transition-colors duration-200`}>
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTrack={user.activeTrack}
        onSelectTrack={handleSelectTrack}
        onOpenDailyQuests={() => setShowDailyQuests(true)}
        onOpenPlayground={() => setShowPlayground(true)}
        onOpenShop={() => setShowShop(true)}
        onOpenLeaderboard={() => setShowLeaderboard(true)}
        onOpenStreakCalendar={() => setShowStreakCalendar(true)}
        onOpenByteChat={() => setShowByteChat(true)}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        isSyncing={isSyncing}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        currentTheme={user.theme || 'light'}
        onToggleTheme={handleToggleTheme}
      />

      {/* Cloud Sync Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold border border-slate-700 animate-in fade-in slide-in-from-top-4">
          <Cloud className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{toastMsg}</span>
          <button
            onClick={() => setToastMsg(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Learning Map */}
      <main className="flex-1">
        <LearningPath
          track={currentTrack}
          user={user}
          recentlyCompletedUnitId={recentlyCompletedUnitId}
          onStartLesson={handleStartLesson}
          onOpenQuickPractice={() => setShowQuickPractice(true)}
          onClaimChest={handleClaimChest}
          onOpenStreakCalendar={() => setShowStreakCalendar(true)}
          onOpenByteChat={() => setShowByteChat(true)}
        />
      </main>

      {/* Active Lesson Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          user={user}
          track={currentTrack}
          onClose={() => setActiveLesson(null)}
          onComplete={handleCompleteLesson}
          onLoseHeart={handleLoseHeart}
          onRefillHearts={handleRefillHearts}
        />
      )}

      {/* Playground / Code Sandbox Modal */}
      {showPlayground && (
        <PlaygroundModal
          initialLanguage={user.activeTrack}
          onClose={() => setShowPlayground(false)}
        />
      )}

      {/* Daily Quests Modal */}
      {showDailyQuests && (
        <DailyQuestsModal
          quests={user.dailyQuests}
          onClaimQuest={handleClaimDailyQuest}
          onClose={() => setShowDailyQuests(false)}
        />
      )}

      {/* Shop Modal */}
      {showShop && (
        <ShopModal
          user={user}
          onBuyItem={handleBuyShopItem}
          onClose={() => setShowShop(false)}
        />
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal
          user={user}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Quick Practice Modal */}
      {showQuickPractice && (
        <QuickPracticeModal
          onGainHeart={handleGainHeart}
          onClose={() => setShowQuickPractice(false)}
        />
      )}

      {/* Streak Calendar Modal */}
      {showStreakCalendar && (
        <StreakCalendarModal
          user={user}
          onClose={() => setShowStreakCalendar(false)}
          onOpenQuickPractice={() => setShowQuickPractice(true)}
          onOpenShop={() => setShowShop(true)}
          onUpdateNotificationPreferences={(newPrefs) => {
            setUser((prev) => ({
              ...prev,
              notificationPreferences: newPrefs,
            }));
            setToastMsg(
              newPrefs.enabled
                ? `Lembrete diário programado para às ${newPrefs.time}!`
                : 'Lembretes diários desativados.'
            );
          }}
        />
      )}

      {/* Byte AI Tutor Modal */}
      {showByteChat && (
        <ByteChatModal
          user={user}
          onClose={() => setShowByteChat(false)}
        />
      )}

      {/* Auth Modal (Login / Cadastro) */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(userName) => {
            setShowAuthModal(false);
            setToastMsg(`Bem-vindo, ${userName}! Seu progresso está conectado.`);
          }}
        />
      )}

      {/* Floating Byte Tutor Button */}
      <button
        onClick={() => {
          playSound('click');
          setShowByteChat(true);
        }}
        className="fixed bottom-20 lg:bottom-6 right-5 z-40 bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl border-2 border-emerald-300/40 flex items-center gap-2.5 group transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        title="Abrir Byte Tutor IA (Gemini 3.8 Flash)"
        aria-label="Abrir Byte Tutor IA"
      >
        <span className="text-2xl animate-bounce">🦉</span>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-black tracking-tight leading-none flex items-center gap-1">
            Byte Tutor IA
            <Sparkles className="w-3 h-3 text-amber-300" />
          </span>
          <span className="text-[10px] text-emerald-100 font-semibold leading-tight">Dúvidas com Gemini</span>
        </div>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
      </button>

      {/* Mobile Bottom Navigation Bar (Duolingo style) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-900 border-t-2 border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg transition-colors">
        <button
          onClick={() => {
            playSound('click');
          }}
          className="flex flex-col items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]"
          aria-label="Trilha de Aprendizado"
        >
          <Map className="w-5 h-5 stroke-[2.5]" />
          <span>Trilha</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setShowStreakCalendar(true);
          }}
          className="flex flex-col items-center gap-1 text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-bold text-[10px]"
          aria-label="Calendário de Ofensiva"
        >
          <Flame className="w-5 h-5 fill-amber-500 stroke-amber-600" />
          <span>Ofensiva</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setShowPlayground(true);
          }}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold text-[10px]"
          aria-label="Playground de Código"
        >
          <Terminal className="w-5 h-5" />
          <span>Playground</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setShowDailyQuests(true);
          }}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold text-[10px]"
          aria-label="Desafios Diários"
        >
          <Target className="w-5 h-5" />
          <span>Desafios</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setShowShop(true);
          }}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-bold text-[10px]"
          aria-label="Loja"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Loja</span>
        </button>
      </nav>
    </div>
  );
}
