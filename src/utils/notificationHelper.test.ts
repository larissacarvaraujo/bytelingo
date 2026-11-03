import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  shouldTriggerDailyReminder,
  NotificationStatus,
  isNotificationSupported,
} from './notificationHelper';
import { NotificationPreferences } from '../types';

describe('notificationHelper - shouldTriggerDailyReminder', () => {
  it('returns false when preferences are undefined or disabled', () => {
    assert.strictEqual(shouldTriggerDailyReminder(undefined, '2026-11-02'), false);

    const disabledPrefs: NotificationPreferences = {
      enabled: false,
      time: '20:00',
      sound: true,
    };
    assert.strictEqual(shouldTriggerDailyReminder(disabledPrefs, '2026-11-02'), false);
  });

  it('returns false if user already practiced today', () => {
    const fixedNow = new Date(2026, 10, 3, 20, 30, 0); // 2026-11-03 20:30
    const prefs: NotificationPreferences = {
      enabled: true,
      time: '20:00',
      sound: true,
    };

    // User already completed a lesson today
    assert.strictEqual(shouldTriggerDailyReminder(prefs, '2026-11-03', fixedNow), false);
  });

  it('returns false if user was already notified today', () => {
    const fixedNow = new Date(2026, 10, 3, 20, 30, 0);
    const prefs: NotificationPreferences = {
      enabled: true,
      time: '20:00',
      sound: true,
      lastNotifiedDate: '2026-11-03',
    };

    // Yesterday was last active, but already notified today
    assert.strictEqual(shouldTriggerDailyReminder(prefs, '2026-11-02', fixedNow), false);
  });

  it('returns false if current time is before the reminder time', () => {
    const fixedMorning = new Date(2026, 10, 3, 10, 15, 0); // 10:15 AM
    const prefs: NotificationPreferences = {
      enabled: true,
      time: '20:00', // 8:00 PM
      sound: true,
    };

    assert.strictEqual(shouldTriggerDailyReminder(prefs, '2026-11-02', fixedMorning), false);
  });

  it('returns true if time is reached, user has not practiced today, and has not yet been notified', () => {
    const fixedEvening = new Date(2026, 10, 3, 20, 0, 0); // Exactly 20:00
    const prefs: NotificationPreferences = {
      enabled: true,
      time: '20:00',
      sound: true,
      lastNotifiedDate: '2026-11-02',
    };

    assert.strictEqual(shouldTriggerDailyReminder(prefs, '2026-11-02', fixedEvening), true);
  });

  it('handles custom reminder time (e.g. 14:30)', () => {
    const at1429 = new Date(2026, 10, 3, 14, 29, 0);
    const at1430 = new Date(2026, 10, 3, 14, 30, 0);
    const prefs: NotificationPreferences = {
      enabled: true,
      time: '14:30',
      sound: true,
    };

    assert.strictEqual(shouldTriggerDailyReminder(prefs, '2026-11-02', at1429), false);
    assert.strictEqual(shouldTriggerDailyReminder(prefs, '2026-11-02', at1430), true);
  });
});
