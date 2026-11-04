import { describe, it } from 'node:test';
import assert from 'node:assert';
import { playSound, setMuted, getMuted, SoundEffect } from './sound';

describe('sound utility', () => {
  it('manages mute toggle correctly', () => {
    setMuted(true);
    assert.strictEqual(getMuted(), true);

    setMuted(false);
    assert.strictEqual(getMuted(), false);
  });

  it('handles milestone sound effect types without throwing', () => {
    const soundTypes: SoundEffect[] = [
      'correct',
      'wrong',
      'click',
      'streak',
      'levelup',
      'gem',
      'perfect_score',
      'streak_maintained',
    ];

    // Ensure calling playSound with any valid effect does not throw in Node environment
    for (const type of soundTypes) {
      assert.doesNotThrow(() => {
        playSound(type);
      });
    }
  });
});
