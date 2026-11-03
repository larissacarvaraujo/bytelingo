import test from 'node:test';
import assert from 'node:assert/strict';
import { runCode, checkExerciseAnswer } from './codeRunner';
import { Exercise } from '../types';

test('runCode evaluates JavaScript and captures stdout', () => {
  const result = runCode('console.log("Olá Mundo!"); console.log(40 + 2);', 'javascript');
  assert.equal(result.success, true);
  assert.deepEqual(result.stdout, ['Olá Mundo!', '42']);
  assert.equal(result.error, undefined);
});

test('runCode runs JavaScript test cases with assertions', () => {
  const code = 'function soma(a, b) { return a + b; }';
  const testCases = [
    { inputDescription: 'soma(2, 3)', expectedOutput: '5', assertionCode: 'soma(2, 3)' },
    { inputDescription: 'soma(-1, 1)', expectedOutput: '0', assertionCode: 'soma(-1, 1)' },
  ];
  const result = runCode(code, 'javascript', testCases);
  assert.equal(result.success, true);
  assert.equal(result.testResults?.length, 2);
  assert.equal(result.testResults?.[0].passed, true);
});

test('runCode catches Python syntax errors with helpful hints', () => {
  const invalidCode = 'def soma(a, b)\n  return a + b'; // Missing colon
  const result = runCode(invalidCode, 'python');
  assert.equal(result.success, false);
  assert.match(result.error || '', /Faltou dois-pontos/);
});

test('runCode detects Rust immutable variable mutation', () => {
  const badRust = 'fn main() {\n  let x = 10;\n  x += 5;\n}';
  const result = runCode(badRust, 'rust');
  assert.equal(result.success, false);
  assert.match(result.error || '', /cannot assign twice to immutable variable/);
});

test('checkExerciseAnswer validates block reordering correctly', () => {
  const blockExercise: Exercise = {
    id: 'ex-1',
    type: 'blocks',
    title: 'Loop em Python',
    instruction: 'Monte o loop',
    language: 'python',
    tokenBlocks: ['range(5):', 'for i in', 'print(i)'],
    orderedSolution: ['for i in', 'range(5):', 'print(i)'],
    explanation: 'Ordem padrão do for in range em Python',
    hint: 'Comece com for',
  };

  const correct = checkExerciseAnswer(blockExercise, ['for i in', 'range(5):', 'print(i)']);
  assert.equal(correct.isCorrect, true);

  const wrong = checkExerciseAnswer(blockExercise, ['range(5):', 'for i in', 'print(i)']);
  assert.equal(wrong.isCorrect, false);
});

test('checkExerciseAnswer validates spot_bug correctly', () => {
  const bugExercise: Exercise = {
    id: 'ex-bug',
    type: 'spot_bug',
    title: 'Encontre o bug',
    instruction: 'Toque na linha com erro',
    language: 'javascript',
    codeLines: ['const x = 10;', 'x = 20;', 'console.log(x);'],
    bugLineIndex: 1,
    explanation: 'Constantes não podem ser reatribuídas',
    hint: 'Veja a reatribuição',
  };

  assert.equal(checkExerciseAnswer(bugExercise, 1).isCorrect, true);
  assert.equal(checkExerciseAnswer(bugExercise, 0).isCorrect, false);
});

test('runCode evaluates python factorial script and outputs calculation', () => {
  const pyCode = 'def fact(n):\n  if n <= 1:\n    return 1\n  return n * fact(n - 1)\n\nprint(fact(5))';
  const res = runCode(pyCode, 'python');
  assert.equal(res.success, true);
  assert.equal(res.stdout.includes('120'), true);
});

