import test from 'node:test';
import assert from 'node:assert';
import {
  isTrackCompleted,
  getTrackCompletionStats,
  generateCertificateCode,
  formatCertificateDate,
} from './certificateHelper';
import { TRACKS } from '../data/curriculum';

test('certificateHelper - Track completion and code generation', async (t) => {
  const pyTrack = TRACKS.find((t) => t.id === 'python')!;

  await t.test('detects incomplete track correctly', () => {
    const stats = getTrackCompletionStats(pyTrack, ['py-l1', 'py-l2']);
    assert.strictEqual(stats.totalLessons, 11);
    assert.strictEqual(stats.completedLessons, 2);
    assert.strictEqual(stats.percentage, 18);
    assert.strictEqual(stats.isCompleted, false);
    assert.strictEqual(isTrackCompleted(pyTrack, ['py-l1', 'py-l2']), false);
  });

  await t.test('detects 100% completed track correctly', () => {
    const allPyLessons = pyTrack.units.flatMap((u) => u.lessons).map((l) => l.id);
    assert.strictEqual(allPyLessons.length, 11);

    const stats = getTrackCompletionStats(pyTrack, allPyLessons);
    assert.strictEqual(stats.totalLessons, 11);
    assert.strictEqual(stats.completedLessons, 11);
    assert.strictEqual(stats.percentage, 100);
    assert.strictEqual(stats.isCompleted, true);
    assert.strictEqual(isTrackCompleted(pyTrack, allPyLessons), true);
  });

  await t.test('generates valid certificate verification code', () => {
    const code = generateCertificateCode('python', 'Larissa Dev');
    assert.ok(code.startsWith('BYTE-PYT-2026-'));
    assert.strictEqual(code.length, 19); // BYTE-PYT-2026-XXXXX
  });

  await t.test('formats date in Portuguese correctly', () => {
    const formatted = formatCertificateDate('2026-11-04T12:00:00Z');
    assert.ok(formatted.includes('novembro'));
    assert.ok(formatted.includes('2026'));
  });
});
