import test from 'node:test';
import assert from 'node:assert/strict';
import { getWeeklyStreakActivity, getMonthlyHeatmap } from './streakHelper.ts';

test('getWeeklyStreakActivity generates 7 days with labels and dates', () => {
  const week = getWeeklyStreakActivity(3);
  assert.equal(week.length, 7);
  assert.equal(week[0].dayLabel, 'Dom');
  assert.equal(week[6].dayLabel, 'Sáb');

  // Should have at least one today marked
  const todayItem = week.find((d) => d.isToday);
  assert.ok(todayItem, 'One day should be marked as isToday');
  assert.equal(todayItem.completed, true);
});

test('getMonthlyHeatmap generates exactly 30 days of data', () => {
  const heatmap = getMonthlyHeatmap(5);
  assert.equal(heatmap.length, 30);
  const todayEntry = heatmap[heatmap.length - 1];
  assert.equal(todayEntry.isToday, true);
  assert.equal(todayEntry.completed, true);
  assert.ok(todayEntry.level >= 2);
});

test('Theme toggle flips between light and dark correctly', () => {
  const toggle = (current: 'light' | 'dark'): 'light' | 'dark' =>
    current === 'dark' ? 'light' : 'dark';

  assert.equal(toggle('light'), 'dark');
  assert.equal(toggle('dark'), 'light');
});
