// Whether a guess is the same as the output (web/page/guess.js). No browser: the function is plain.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { guessMatches } from '../../web/page/guess.js';

const output = 'Hello!\nA ticket costs €12.50.\nToday is 03/09/2026.';

test('a question about one line is compared with that line alone', () => {
  const second = { type: 'choice', outputLine: 2 };
  assert.equal(guessMatches(second, 'A ticket costs €12.50.', output), true);
  // "Hello!" is a line of the output, but not the second one.
  assert.equal(guessMatches(second, 'Hello!', output), false);
  assert.equal(guessMatches({ type: 'text', outputLine: 'last' }, ' Today is  03/09/2026. ', output), true);
  assert.equal(guessMatches({ type: 'text', outputLine: 'last' }, 'Hello!', output), false);
  // A line the output doesn't have.
  assert.equal(guessMatches({ type: 'choice', outputLine: 5 }, 'Hello!', output), false);
});

test('a question about the whole output matches the whole output or any one line', () => {
  const any = { type: 'choice', outputLine: null };
  assert.equal(guessMatches(any, 'Hello!', output), true);
  assert.equal(guessMatches(any, 'Hello! A ticket costs €12.50. Today is 03/09/2026.', output), true);
  assert.equal(guessMatches(any, 'Goodbye!', output), false);
  assert.equal(guessMatches(any, 'Hello!', ''), false);
  // A program that prints nothing matches the option "Nothing", and only that.
  assert.equal(guessMatches(any, 'Nothing', ''), true);
  assert.equal(guessMatches(any, 'Nothing: it does not compile', ''), false);
  assert.equal(guessMatches(any, 'Nothing', 'Hello!'), false);
});

test('a number is compared with the last number of the output, or of the line asked about', () => {
  assert.equal(guessMatches({ type: 'number', tolerance: null, outputLine: null }, '2026', output), true);
  assert.equal(guessMatches({ type: 'number', tolerance: null, outputLine: 2 }, '12.5', output), true);
  assert.equal(guessMatches({ type: 'number', tolerance: null, outputLine: 2 }, '2026', output), false);
  assert.equal(guessMatches({ type: 'number', tolerance: 0.5, outputLine: 1 }, '3', '3.4\n9'), true);
  assert.equal(guessMatches({ type: 'number', tolerance: null, outputLine: 1 }, '1,000', '1000\n2'), true);
  assert.equal(guessMatches({ type: 'number', tolerance: null, outputLine: 1 }, 'lots', '1000'), false);
  // A % sign or a currency sign around the guess is not part of the number.
  assert.equal(guessMatches({ type: 'number', tolerance: 0.01, outputLine: null }, '0.5%', 'About 0.5% of the grid'), true);
  assert.equal(guessMatches({ type: 'number', tolerance: null, outputLine: 1 }, ' €12.50 ', 'Total: 12.5'), true);
  assert.equal(guessMatches({ type: 'number', tolerance: null, outputLine: 1 }, '50 %', '0.5'), false);
});

test('a guess that the program does not compile, or stops with an exception, is the same when it does', () => {
  const choice = { type: 'choice', outputLine: null };
  const failed = { outcome: 'compile-error' };
  for (const g of ['It does not compile', "Nothing: it doesn't compile", 'It does not compile, so nothing runs', 'Only a message about line 3', 'only a message'])
    assert.equal(guessMatches(choice, g, '', failed), true, g);
  for (const g of ['7, and then a message about line 3', 'It prints 8', 'It stops with an exception'])
    assert.equal(guessMatches(choice, g, '', failed), false, g);
  const threw = { outcome: 'exception', exception: { type: 'System.IndexOutOfRangeException' } };
  assert.equal(guessMatches(choice, 'It stops with an exception', 'before', threw), true);
  assert.equal(guessMatches(choice, 'It stops with an IndexOutOfRangeException', '', threw), true);
  assert.equal(guessMatches(choice, 'Stop with a KeyNotFoundException', '', threw), false);
  assert.equal(guessMatches(choice, 'It does not compile', '', threw), false);
  assert.equal(guessMatches(choice, 'It prints R', 'R', threw), false);
  assert.equal(guessMatches(choice, 'It does not compile', '', { outcome: 'stopped' }), false);
});
