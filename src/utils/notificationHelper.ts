import { NotificationPreferences, UserProfile } from '../types';
import { playSound } from './sound';

// High-fidelity SVG icon for the Notification API (Byte Owl / Flame mascot)
export const BYTE_NOTIFICATION_ICON = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="flame" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="%23ea580c"/><stop offset="50%" stop-color="%23f97316"/><stop offset="100%" stop-color="%23fbbf24"/></linearGradient></defs><rect width="100" height="100" rx="28" fill="%230f172a"/><path d="M50 12 C35 28 24 45 24 62 C24 78 35 88 50 88 C65 88 76 78 76 62 C76 45 65 28 50 12 Z" fill="url(%23flame)"/><path d="M50 38 C42 48 36 58 36 68 C36 77 42 82 50 82 C58 82 64 77 64 68 C64 58 58 48 50 38 Z" fill="%23fef08a"/><circle cx="43" cy="62" r="4" fill="%230f172a"/><circle cx="57" cy="62" r="4" fill="%230f172a"/><path d="M47 70 Q50 74 53 70" stroke="%230f172a" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;

export type NotificationStatus = 'granted' | 'denied' | 'default' | 'unsupported';

/**
 * Checks whether the Web Notification API is supported in the current environment
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Returns current permission status ('granted' | 'denied' | 'default' | 'unsupported')
 */
export function getNotificationPermission(): NotificationStatus {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  return Notification.permission;
}

/**
 * Requests permission from the user to display notifications
 */
export async function requestNotificationPermission(): Promise<NotificationStatus> {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.warn('Erro ao solicitar permissão de notificação:', err);
    return Notification.permission;
  }
}

export interface SendStreakNotificationOptions {
  isTest?: boolean;
  customTitle?: string;
  customBody?: string;
  playAudio?: boolean;
}

/**
 * Dispatches a native Web Notification encouraging the user to maintain their streak
 */
export function sendStreakNotification(
  streak: number,
  options: SendStreakNotificationOptions = {}
): { success: boolean; reason?: string } {
  if (!isNotificationSupported()) {
    return { success: false, reason: 'Navegador não suporta a Web Notification API' };
  }

  if (Notification.permission !== 'granted') {
    return { success: false, reason: 'Permissão de notificação não concedida' };
  }

  const { isTest = false, customTitle, customBody, playAudio = true } = options;

  const title =
    customTitle ||
    (isTest
      ? '🔔 ByteLingo - Lembretes Ativados!'
      : `🔥 Byte te chamando! Salve sua Ofensiva de ${streak} ${streak === 1 ? 'dia' : 'dias'}!`);

  const body =
    customBody ||
    (isTest
      ? 'Tudo pronto! Vamos te lembrar no horário escolhido para você nunca perder sua sequência de código.'
      : `Você tem ${streak} ${
          streak === 1 ? 'dia consecutivo' : 'dias consecutivos'
        }! Faça uma lição rápida de 2 minutos hoje antes da meia-noite para manter o fogo aceso.`);

  try {
    if (playAudio) {
      playSound('streak');
    }

    const notification = new Notification(title, {
      body,
      icon: BYTE_NOTIFICATION_ICON,
      badge: BYTE_NOTIFICATION_ICON,
      tag: 'bytelingo-streak-reminder',
      silent: false,
    });

    notification.onclick = () => {
      if (typeof window !== 'undefined') {
        window.focus();
      }
      notification.close();
    };

    return { success: true };
  } catch (err) {
    console.error('Falha ao instanciar notificação:', err);
    return { success: false, reason: 'Falha ao instanciar notificação nativa' };
  }
}

/**
 * Pure evaluation function for whether a daily reminder should be fired.
 * Designed for unit testability without browser mocks.
 */
export function shouldTriggerDailyReminder(
  preferences: NotificationPreferences | undefined,
  lastActiveDate: string,
  now: Date = new Date()
): boolean {
  if (!preferences || !preferences.enabled) {
    return false;
  }

  // Format today's date YYYY-MM-DD in local time
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  // If already practiced today, no reminder needed!
  if (lastActiveDate === todayStr) {
    return false;
  }

  // If already sent a reminder today, do not spam
  if (preferences.lastNotifiedDate === todayStr) {
    return false;
  }

  // Parse preferred reminder time (default '20:00')
  const timeStr = preferences.time || '20:00';
  const parts = timeStr.split(':');
  const targetHour = parseInt(parts[0], 10) || 20;
  const targetMinute = parseInt(parts[1], 10) || 0;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const targetMinutes = targetHour * 60 + targetMinute;

  // Fire if current time is at or after scheduled time
  return currentMinutes >= targetMinutes;
}

/**
 * Evaluates and fires daily reminder if due, updating preferences via callback
 */
export function checkAndTriggerStreakReminder(
  user: UserProfile,
  onUpdatePreferences: (updated: NotificationPreferences) => void
): boolean {
  const prefs = user.notificationPreferences;
  if (!prefs || !prefs.enabled) return false;

  const now = new Date();
  const shouldFire = shouldTriggerDailyReminder(prefs, user.lastActiveDate, now);

  if (shouldFire && getNotificationPermission() === 'granted') {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    sendStreakNotification(user.streak, {
      isTest: false,
      playAudio: prefs.sound !== false,
    });

    onUpdatePreferences({
      ...prefs,
      lastNotifiedDate: todayStr,
    });

    return true;
  }

  return false;
}
