import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getUserLevelInfo,
  getAllLevelTiers,
  checkHasLeveledUp,
} from './levelHelper';

describe('levelHelper - User Level Progression', () => {
  it('calculates Level 1 correctly for starting XP (0 XP)', () => {
    const info = getUserLevelInfo(0);
    assert.equal(info.level, 1);
    assert.equal(info.title, 'Aprendiz de Sintaxe');
    assert.equal(info.currentLevelBaseXp, 0);
    assert.equal(info.nextLevelXp, 100);
    assert.equal(info.xpIntoCurrentLevel, 0);
    assert.equal(info.xpNeededForNextLevel, 100);
    assert.equal(info.progressPercent, 0);
    assert.equal(info.xpRemaining, 100);
  });

  it('calculates Level 1 progression for 65 XP correctly', () => {
    const info = getUserLevelInfo(65);
    assert.equal(info.level, 1);
    assert.equal(info.xpIntoCurrentLevel, 65);
    assert.equal(info.xpRemaining, 35);
    assert.equal(info.progressPercent, 65);
  });

  it('transitions to Level 2 at exactly 100 XP', () => {
    const info = getUserLevelInfo(100);
    assert.equal(info.level, 2);
    assert.equal(info.title, 'Explorador de Algoritmos');
    assert.equal(info.currentLevelBaseXp, 100);
    assert.equal(info.nextLevelXp, 250);
    assert.equal(info.xpIntoCurrentLevel, 0);
    assert.equal(info.xpNeededForNextLevel, 150);
    assert.equal(info.progressPercent, 0);
    assert.equal(info.xpRemaining, 150);
  });

  it('calculates midway progress in Level 2 (175 XP)', () => {
    const info = getUserLevelInfo(175);
    assert.equal(info.level, 2);
    assert.equal(info.xpIntoCurrentLevel, 75);
    assert.equal(info.xpNeededForNextLevel, 150);
    assert.equal(info.progressPercent, 50);
    assert.equal(info.xpRemaining, 75);
  });

  it('calculates Level 3 at 250 XP', () => {
    const info = getUserLevelInfo(250);
    assert.equal(info.level, 3);
    assert.equal(info.title, 'Desenvolvedor Júnior');
    assert.equal(info.nextLevelXp, 450);
  });

  it('handles Level 10 and beyond (4500 XP)', () => {
    const info = getUserLevelInfo(4500);
    assert.ok(info.level >= 11);
    assert.equal(info.badgeIcon, '🦅');
    assert.ok(info.progressPercent >= 0 && info.progressPercent <= 100);
  });

  it('handles negative or undefined XP safely', () => {
    const infoNegative = getUserLevelInfo(-50);
    assert.equal(infoNegative.level, 1);
    assert.equal(infoNegative.totalXp, 0);

    const infoUndefined = getUserLevelInfo(undefined as unknown as number);
    assert.equal(infoUndefined.level, 1);
    assert.equal(infoUndefined.totalXp, 0);
  });

  it('detects level up properly when threshold crossed', () => {
    const result1 = checkHasLeveledUp(65, 95);
    assert.equal(result1.leveledUp, false);
    assert.equal(result1.oldLevel, 1);
    assert.equal(result1.newLevel, 1);

    const result2 = checkHasLeveledUp(65, 115);
    assert.equal(result2.leveledUp, true);
    assert.equal(result2.oldLevel, 1);
    assert.equal(result2.newLevel, 2);
    assert.equal(result2.newLevelInfo.title, 'Explorador de Algoritmos');
  });

  it('returns complete predefined level tiers', () => {
    const tiers = getAllLevelTiers();
    assert.equal(tiers.length, 10);
    assert.equal(tiers[0].level, 1);
    assert.equal(tiers[9].level, 10);
  });
});
