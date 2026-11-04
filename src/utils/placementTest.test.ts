import test from 'node:test';
import assert from 'node:assert';
import { PLACEMENT_TESTS, getPlacementTestForUnit } from '../data/placementTests';
import { TRACKS } from '../data/curriculum';

test('placementTests - Data integrity across all modules', async (t) => {
  const languageTracks = ['python', 'javascript', 'logic', 'rust', 'java'] as const;

  await t.test('all 5 language tracks exist with 5 units each', () => {
    assert.strictEqual(TRACKS.length, 5, 'Must have 5 complete language tracks');
    for (const trackId of languageTracks) {
      const track = TRACKS.find((t) => t.id === trackId);
      assert.ok(track, `Track ${trackId} must exist`);
      assert.strictEqual(track.units.length, 5, `Track ${trackId} must have 5 units`);
      const totalLessons = track.units.reduce((acc, u) => acc + u.lessons.length, 0);
      assert.strictEqual(totalLessons, 11, `Track ${trackId} must have 11 lessons`);
    }
  });

  await t.test('all locked units (u2, u3, u4, u5) in all 5 languages have placement tests', () => {
    const unitPrefixes: Record<string, string> = {
      python: 'py',
      javascript: 'js',
      logic: 'logic',
      rust: 'rust',
      java: 'java',
    };

    for (const trackId of languageTracks) {
      const p = unitPrefixes[trackId];
      for (let u = 2; u <= 5; u++) {
        const unitId = `${p}-u${u}`;
        const testDef = PLACEMENT_TESTS[unitId];
        assert.ok(testDef, `Placement test for ${unitId} must exist`);
        assert.strictEqual(testDef.targetUnitId, unitId);
        assert.strictEqual(testDef.trackId, trackId);
        assert.strictEqual(testDef.questions.length, 4, `${unitId} must have exactly 4 diagnostic questions`);
      }
    }
  });

  await t.test('getPlacementTestForUnit resolves correct tests and track-specific fallbacks', () => {
    // JavaScript
    const jsU3 = getPlacementTestForUnit('js-u3', 'javascript');
    assert.strictEqual(jsU3.targetUnitId, 'js-u3');

    // Rust
    const rustU4 = getPlacementTestForUnit('rust-u4', 'rust');
    assert.strictEqual(rustU4.targetUnitId, 'rust-u4');

    // Java
    const javaU5 = getPlacementTestForUnit('java-u5', 'java');
    assert.strictEqual(javaU5.targetUnitId, 'java-u5');

    // Logic
    const logicU2 = getPlacementTestForUnit('logic-u2', 'logic');
    assert.strictEqual(logicU2.targetUnitId, 'logic-u2');

    // Fallback for unknown unit in Java
    const javaFallback = getPlacementTestForUnit('unknown-unit', 'java');
    assert.strictEqual(javaFallback.targetUnitId, 'java-u2');
  });

  await t.test('skipping to unit 3 in JavaScript completes all lessons in unit 1 and unit 2', () => {
    const jsTrack = TRACKS.find((t) => t.id === 'javascript')!;
    const targetUnitIdx = jsTrack.units.findIndex((u) => u.id === 'js-u3');
    assert.strictEqual(targetUnitIdx, 2);

    const precedingLessons = jsTrack.units
      .slice(0, targetUnitIdx)
      .flatMap((u) => u.lessons)
      .map((l) => l.id);

    // Units 1 (2 lessons) and 2 (3 lessons) = 5 lessons
    assert.strictEqual(precedingLessons.length, 5);
    assert.ok(precedingLessons.includes('js-l1'));
    assert.ok(precedingLessons.includes('js-l2'));
    assert.ok(precedingLessons.includes('js-l3'));
    assert.ok(precedingLessons.includes('js-l4'));
    assert.ok(precedingLessons.includes('js-l5'));
  });

  await t.test('skipping to unit 4 in Rust completes 7 preceding lessons', () => {
    const rustTrack = TRACKS.find((t) => t.id === 'rust')!;
    const targetUnitIdx = rustTrack.units.findIndex((u) => u.id === 'rust-u4');
    assert.strictEqual(targetUnitIdx, 3);

    const precedingLessons = rustTrack.units
      .slice(0, targetUnitIdx)
      .flatMap((u) => u.lessons)
      .map((l) => l.id);

    // Units 1 (2), 2 (3), 3 (2) = 7 lessons
    assert.strictEqual(precedingLessons.length, 7);
  });
});
