// The draft (web/page/draft.js): lines counted from 1 with both ends included, the change each edit reports,
// undo and redo, edits with one key made close together being one step, and the copy kept in the browser.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Draft, saveDraft, loadDraft, clearDraft } from '../../web/page/draft.js';

const TEXT = ['one', 'two', 'three', 'four', 'five'].join('\n');

test('slice and splice use lines from 1, with both ends included, and splice says how many lines it added', () => {
  const d = new Draft(TEXT);
  assert.equal(d.slice(2, 3), 'two\nthree');
  assert.equal(d.splice(2, 3, 'TWO'), -1);
  assert.equal(d.text, 'one\nTWO\nfour\nfive');
  assert.equal(d.splice(1, 1, 'a\nb\nc'), 2);
  assert.equal(d.text, 'a\nb\nc\nTWO\nfour\nfive');
  assert.equal(d.splice(4, 4, ''), -1, 'an empty replacement removes the lines');
  assert.equal(d.text, 'a\nb\nc\nfour\nfive');
  assert.equal(d.dirty, true);
});

test('a listener is told which lines changed and by how much, and undo and redo bring the text back', () => {
  const d = new Draft(TEXT);
  const seen = [];
  d.onChange(c => seen.push(c));
  d.splice(2, 2, 'x\ny');
  assert.deepEqual(seen[0], { reason: 'edit', first: 2, last: 2, delta: 1 });
  assert.equal(d.canUndo, true);
  assert.equal(d.undo(), true);
  assert.equal(d.text, TEXT);
  assert.equal(d.dirty, false);
  assert.equal(seen[1].reason, 'undo');
  assert.equal(d.redo(), true);
  assert.equal(d.text, 'one\nx\ny\nthree\nfour\nfive');
  assert.equal(d.undo() && d.undo(), false, 'nothing is left to undo');
  d.splice(1, 1, 'new');
  assert.equal(d.canRedo, false, 'a new edit ends the redo history');
});

test('edits with the same key close together are one step; a different key or a gap makes another', () => {
  const d = new Draft('a\nb');
  d.splice(1, 1, 'ab', { key: 'cell-1', now: 1000 });
  d.splice(1, 1, 'abc', { key: 'cell-1', now: 1400 });
  d.splice(1, 1, 'abcd', { key: 'cell-1', now: 1800 });
  d.undo();
  assert.equal(d.text, 'a\nb', 'three keystrokes in one cell undo together');
  d.redo();
  d.splice(2, 2, 'z', { key: 'cell-2', now: 2000 });
  d.undo();
  assert.equal(d.text, 'abcd\nb');
  d.redo();
  d.splice(1, 1, 'later', { key: 'cell-1', now: 9000 });
  d.undo();
  assert.equal(d.text, 'abcd\nz', 'a pause makes a new step');
});

test('set replaces everything, and an edit that changes nothing is not an edit', () => {
  const d = new Draft('a\nb');
  const seen = [];
  d.onChange(c => seen.push(c));
  d.set('a\nb');
  d.splice(1, 1, 'a');
  assert.equal(seen.length, 0);
  d.set('x\ny\nz');
  assert.deepEqual(seen[0], { reason: 'edit', first: 1, last: 2, delta: 1 });
  assert.equal(d.canUndo, true);
});

test('a draft kept in the browser comes back as it was kept, and is gone once cleared', () => {
  const store = new Map();
  const storage = { getItem: k => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, v), removeItem: k => store.delete(k) };
  assert.equal(loadDraft('a-page', storage), null);
  assert.equal(saveDraft('a-page', { text: 'new text', base: 'old text' }, storage), true);
  const back = loadDraft('a-page', storage);
  assert.equal(back.text, 'new text');
  assert.equal(back.base, 'old text');
  assert.match(back.savedAt, /^\d{4}-\d{2}-\d{2}T/);
  clearDraft('a-page', storage);
  assert.equal(loadDraft('a-page', storage), null);
  const broken = { getItem: () => '{not json', setItem: () => { throw new Error('full'); }, removeItem: () => { } };
  assert.equal(loadDraft('a-page', broken), null);
  assert.equal(saveDraft('a-page', { text: 't', base: 'b' }, broken), false);
});
