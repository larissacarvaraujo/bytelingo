import React, { useState, useEffect } from 'react';
import {
  X,
  Flame,
  Snowflake,
  Calendar,
  Sparkles,
  Trophy,
  CheckCircle2,
  TrendingUp,
  Bell,
  BellRing,
  BellOff,
  Clock,
  Volume2,
  VolumeX,
  AlertCircle,
  Send,
  HelpCircle,
} from 'lucide-react';
import { UserProfile, NotificationPreferences } from '../types';
import { getWeeklyStreakActivity, getMonthlyHeatmap } from '../utils/streakHelper';
import { playSound } from '../utils/sound';
import {
  getNotificationPermission,
  requestNotificationPermission,
  sendStreakNotification,
  isNotificationSupported,
  NotificationStatus,
} from '../utils/notificationHelper';

interface StreakCalendarModalProps {
  user: UserProfile;
  onClose: () => void;
  onOpenQuickPractice: () => void;
  onOpenShop: () => void;
  onUpdateNotificationPreferences?: (prefs: NotificationPreferences) => void;
}

export const StreakCalendarModal: React.FC<StreakCalendarModalProps> = ({
  user,
  onClose,
  onOpenQuickPractice,
  onOpenShop,
  onUpdateNotificationPreferences,
}) => {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'reminders'>('week');
  const weeklyActivity = getWeeklyStreakActivity(user.streak);
  const monthlyHeatmap = getMonthlyHeatmap(user.streak);

  const longestStreak = user.longestStreak ?? Math.max(user.streak, 14);
  const totalDaysActive = user.totalDaysActive ?? 22;
  const streakFreezes = user.inventory?.streakFreeze ?? 1;

  // Next milestone calculation (e.g. 7, 14, 30, 50, 100 days)
  const milestones = [7, 14, 30, 50, 100, 365];
  const nextMilestone = milestones.find((m) => m > user.streak) || 7;
  const daysToMilestone = nextMilestone - user.streak;

  // Notification state
  const [prefs, setPrefs] = useState<NotificationPreferences>(() => ({
    enabled: user.notificationPreferences?.enabled ?? false,
    time: user.notificationPreferences?.time ?? '20:00',
    sound: user.notificationPreferences?.sound ?? true,
    lastNotifiedDate: user.notificationPreferences?.lastNotifiedDate,
  }));
  const [permission, setPermission] = useState<NotificationStatus>('default');
  const [testStatus, setTestStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setPermission(getNotificationPermission());
  }, []);

  const updatePreferences = (newPrefs: NotificationPreferences) => {
    setPrefs(newPrefs);
    onUpdateNotificationPreferences?.(newPrefs);
  };

  const handleToggleReminders = async () => {
    playSound('click');
    setTestStatus(null);

    if (!prefs.enabled) {
      // Trying to enable
      let currentPerm = getNotificationPermission();
      if (currentPerm === 'default') {
        currentPerm = await requestNotificationPermission();
        setPermission(currentPerm);
      }

      if (currentPerm === 'granted') {
        const next = { ...prefs, enabled: true };
        updatePreferences(next);
        setTestStatus({
          success: true,
          message: 'Lembretes diários ativados com sucesso! Não deixe o fogo apagar.',
        });
      } else if (currentPerm === 'denied') {
        setTestStatus({
          success: false,
          message:
            'As notificações foram bloqueadas no seu navegador. Para permitir, clique no ícone de ajustes/cadeado na barra de endereços do navegador e marque "Permitir Notificações".',
        });
      } else {
        // Still default or unsupported
        const next = { ...prefs, enabled: true };
        updatePreferences(next);
      }
    } else {
      // Disabling
      const next = { ...prefs, enabled: false };
      updatePreferences(next);
      setTestStatus(null);
    }
  };

  const handleTestNotification = async () => {
    playSound('click');
    setTestStatus(null);

    let currentPerm = getNotificationPermission();
    if (currentPerm !== 'granted') {
      currentPerm = await requestNotificationPermission();
      setPermission(currentPerm);
    }

    if (currentPerm === 'granted') {
      const res = sendStreakNotification(user.streak, {
        isTest: true,
        playAudio: prefs.sound,
      });
      if (res.success) {
        setTestStatus({
          success: true,
          message: '🔔 Notificação enviada! Verifique o canto da tela ou sua central do sistema.',
        });
      } else {
        setTestStatus({
          success: false,
          message: res.reason || 'Não foi possível disparar a notificação.',
        });
      }
    } else {
      setTestStatus({
        success: false,
        message:
          'Permissão necessária! Clique em "Permitir" quando o navegador perguntar para receber notificações.',
      });
    }
  };

  const timePresets = [
    { label: '09:00', desc: 'Manhã' },
    { label: '13:00', desc: 'Almoço' },
    { label: '18:00', desc: 'Tarde' },
    { label: '20:00', desc: 'Noite (Recomendado)' },
    { label: '22:00', desc: 'Última chamada' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 my-8 transition-colors">
        {/* Banner with fiery animated theme */}
        <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 text-white text-center overflow-hidden">
          {/* Background decorative sparks */}
          <div className="absolute top-2 left-6 text-2xl opacity-20 select-none animate-pulse">🔥</div>
          <div className="absolute bottom-3 right-8 text-3xl opacity-20 select-none animate-pulse delay-200">✨</div>
          <div className="absolute top-1/2 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          {/* Close Button */}
          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-2xl bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            aria-label="Fechar Calendário de Ofensiva"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Giant Burning Flame */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-inner mb-3">
            <Flame className="w-16 h-16 fill-amber-300 stroke-amber-100 animate-bounce duration-1000" />
            <div className="absolute -bottom-2 bg-white text-orange-600 font-black text-xs px-2.5 py-0.5 rounded-full shadow-md">
              NÍVEL {Math.max(1, Math.floor(user.streak / 3))}
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight drop-shadow-xs">
            {user.streak} {user.streak === 1 ? 'Dia de Ofensiva!' : 'Dias de Ofensiva!'}
          </h2>
          <p className="text-orange-100 text-sm mt-1 max-w-md mx-auto font-medium">
            Sua chama está acesa! Pratique todo dia antes da meia-noite para não deixar o fogo apagar.
          </p>

          {/* Milestone mini-badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-black/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-200 border border-white/20">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>
              Faltam <span className="text-white font-extrabold">{daysToMilestone} dias</span> para o marco de {nextMilestone} dias!
            </span>
          </div>
        </div>

        {/* View Switcher: Semana vs Mês vs Lembretes */}
        <div className="px-6 pt-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 hidden sm:inline">
              Atividade e Sequência
            </span>
          </div>

          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('week');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'week'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Esta Semana
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('month');
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'month'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              30 Dias
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('reminders');
              }}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'reminders'
                  ? 'bg-orange-500 text-white shadow-xs font-extrabold'
                  : 'text-orange-600 dark:text-orange-400 hover:text-orange-700'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Lembretes</span>
              {prefs.enabled && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {activeTab === 'week' ? (
            /* Weekly Calendar Ribbon */
            <div>
              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {weeklyActivity.map((day) => {
                  return (
                    <div
                      key={day.date}
                      className={`flex flex-col items-center justify-between p-2.5 rounded-2xl border-2 transition-all ${
                        day.isToday
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 ring-2 ring-amber-200 dark:ring-amber-900'
                          : day.completed
                          ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-800'
                          : day.frozen
                          ? 'bg-sky-50 dark:bg-sky-950/30 border-sky-300 dark:border-sky-800'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        {day.dayLabel}
                      </span>
                      <div className="my-2">
                        {day.completed ? (
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs animate-in zoom-in-75">
                            <Flame className="w-5 h-5 fill-amber-200" />
                          </div>
                        ) : day.frozen ? (
                          <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-500">
                            <Snowflake className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs font-black ${
                          day.isToday
                            ? 'text-amber-700 dark:text-amber-300'
                            : day.completed
                            ? 'text-orange-700 dark:text-orange-400'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {day.isToday ? 'Hoje' : `${day.xpEarned} XP`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Meta de consistência diária: 1 lição ou desafio por dia</span>
                </div>
                <span className="font-extrabold text-orange-600 dark:text-orange-400">
                  {user.streakActivity.filter((d) => d.completed).length}/7 dias
                </span>
              </div>
            </div>
          ) : activeTab === 'month' ? (
            /* Monthly Heatmap Grid */
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold mb-2">
                <span>Histórico de 30 dias de prática</span>
                <span className="text-orange-600 dark:text-orange-400">{user.streak} dias seguidos</span>
              </div>

              <div className="grid grid-cols-10 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                {monthlyHeatmap.map((day, idx) => (
                  <div
                    key={idx}
                    title={`${day.date}: ${day.completed ? `${day.xp} XP acumulados` : 'Sem atividade'}`}
                    className={`h-9 rounded-xl flex flex-col items-center justify-center text-[10px] font-black border transition-all hover:scale-110 cursor-pointer ${
                      day.isToday
                        ? 'ring-2 ring-amber-500 bg-amber-400 text-white border-amber-600'
                        : day.completed
                        ? day.level === 3
                          ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                          : 'bg-orange-400 text-white border-orange-500'
                        : day.frozen
                        ? 'bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-700'
                        : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>{day.dayOfMonth}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-2 px-1">
                <span>Mais antigo</span>
                <div className="flex items-center gap-1">
                  <span>Menos</span>
                  <div className="w-2.5 h-2.5 rounded-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-orange-300" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-orange-500" />
                  <span>Mais</span>
                </div>
                <span>Hoje</span>
              </div>
            </div>
          ) : (
            /* Reminders Configuration Tab */
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              {/* Permission Banner */}
              <div
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  permission === 'granted'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : permission === 'denied'
                    ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                }`}
              >
                {permission === 'granted' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : permission === 'denied' ? (
                  <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <BellRing className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="text-xs">
                  <div className="font-extrabold text-sm mb-0.5">
                    {permission === 'granted'
                      ? 'Notificações Ativas no Navegador'
                      : permission === 'denied'
                      ? 'Notificações Bloqueadas no Navegador'
                      : 'Permissão da Web Notification API Pendente'}
                  </div>
                  <p className="opacity-90 leading-relaxed">
                    {permission === 'granted'
                      ? 'Seu navegador está pronto para enviar notificações no horário configurado para proteger sua ofensiva!'
                      : permission === 'denied'
                      ? 'Você bloqueou as notificações deste site. Clique no cadeado na barra de endereço para desbloquear e receber alertas diários.'
                      : 'Ative os lembretes para que o Byte envie um toque no seu computador/celular antes do fim do dia.'}
                  </p>
                </div>
              </div>

              {/* Master Reminder Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      prefs.enabled
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {prefs.enabled ? (
                      <BellRing className="w-6 h-6 animate-pulse" />
                    ) : (
                      <BellOff className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                      Lembretes Diários de Ofensiva
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Receba um aviso inteligente se ainda não praticou hoje.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleToggleReminders}
                  className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    prefs.enabled ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                  aria-label="Alternar Lembretes Diários"
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      prefs.enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Time Configuration */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-slate-200">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Horário do Lembrete</span>
                  </div>
                  <input
                    type="time"
                    value={prefs.time}
                    disabled={!prefs.enabled}
                    onChange={(e) => {
                      updatePreferences({ ...prefs, time: e.target.value });
                    }}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 disabled:opacity-50"
                  />
                </div>

                {/* Preset time buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {timePresets.map((preset) => {
                    const isSelected = prefs.time === preset.label;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        disabled={!prefs.enabled}
                        onClick={() => {
                          playSound('click');
                          updatePreferences({ ...prefs, time: preset.label });
                        }}
                        className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                          isSelected
                            ? 'bg-orange-500 text-white border-orange-600 shadow-xs font-black'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-800'
                        }`}
                      >
                        <div className="font-extrabold">{preset.label}</div>
                        <div
                          className={`text-[10px] ${
                            isSelected ? 'text-orange-100' : 'text-slate-400'
                          }`}
                        >
                          {preset.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sound Option & Test Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    updatePreferences({ ...prefs, sound: !prefs.sound });
                  }}
                  className="flex-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {prefs.sound ? (
                      <Volume2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-400" />
                    )}
                    <span>Tocar som ao notificar</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-black ${
                      prefs.sound
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {prefs.sound ? 'LIGADO' : 'MUTADO'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleTestNotification}
                  className="p-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Testar Notificação Agora</span>
                </button>
              </div>

              {/* Test Status Feedback Banner */}
              {testStatus && (
                <div
                  className={`p-3 rounded-2xl border text-xs flex items-center gap-2 animate-in fade-in-50 ${
                    testStatus.success
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800 dark:text-rose-200'
                  }`}
                >
                  {testStatus.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  )}
                  <span>{testStatus.message}</span>
                </div>
              )}

              {/* Preview Box */}
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold mb-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-orange-500" />
                  <span>Como será a notificação da sua ofensiva:</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Flame className="w-5 h-5 fill-amber-200" />
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-slate-800 dark:text-slate-100">
                      🔥 Byte te chamando! Salve sua Ofensiva de {user.streak} dias!
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Você tem {user.streak} dias consecutivos! Faça uma lição rápida de 2 minutos hoje antes da meia-noite para manter o fogo aceso.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Grid (Visible on all tabs) */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 dark:text-slate-400 text-xs font-bold mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Atual</span>
              </div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100">{user.streak} dias</div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 dark:text-slate-400 text-xs font-bold mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Recorde</span>
              </div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100">{longestStreak} dias</div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 dark:text-slate-400 text-xs font-bold mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>Total Ativo</span>
              </div>
              <div className="text-xl font-black text-slate-800 dark:text-slate-100">{totalDaysActive} dias</div>
            </div>
          </div>

          {/* Streak Freeze & Reminder Status Callouts */}
          <div className="space-y-2.5">
            {/* Streak Freeze */}
            <div className="p-3.5 rounded-2xl border-2 border-sky-200 dark:border-sky-800/60 bg-sky-50/80 dark:bg-sky-950/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0">
                  <Snowflake className="w-5 h-5 animate-spin duration-3000" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-sky-950 dark:text-sky-200 flex items-center gap-1.5">
                    <span>Bloqueio de Ofensiva</span>
                    <span className="bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-[10px] font-black px-1.5 py-0.2 rounded-md">
                      {streakFreezes} EQUIPADO
                    </span>
                  </h4>
                  <p className="text-xs text-sky-800/80 dark:text-sky-300/80 mt-0.5">
                    Protege sua sequência caso você esqueça de praticar um dia.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  playSound('click');
                  onClose();
                  onOpenShop();
                }}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
              >
                Comprar +1
              </button>
            </div>

            {/* Quick reminder status if on other tabs */}
            {activeTab !== 'reminders' && (
              <div className="p-3.5 rounded-2xl border border-orange-200 dark:border-orange-800/60 bg-orange-50/70 dark:bg-orange-950/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold text-orange-950 dark:text-orange-200 flex items-center gap-1.5">
                      <span>Lembrete Diário Web</span>
                      <span
                        className={`text-[10px] font-black px-1.5 py-0.2 rounded-md ${
                          prefs.enabled
                            ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {prefs.enabled ? `ATIVADO ÀS ${prefs.time}` : 'DESATIVADO'}
                      </span>
                    </h4>
                    <p className="text-[11px] text-orange-800/80 dark:text-orange-300/80 mt-0.5">
                      {prefs.enabled
                        ? `Notificação nativa programada diariamente para às ${prefs.time}.`
                        : 'Ative um lembrete no horário que preferir para nunca perder sua ofensiva.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playSound('click');
                    setActiveTab('reminders');
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-slate-700 font-extrabold text-xs transition-colors cursor-pointer"
                >
                  Configurar
                </button>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                playSound('click');
                onClose();
                onOpenQuickPractice();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 border-b-4 border-emerald-700 hover:brightness-105 active:translate-y-1 active:border-b-0 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Praticar Agora (+15 XP)</span>
            </button>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="py-3 px-5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-transparent dark:border-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
