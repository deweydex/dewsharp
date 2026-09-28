// Shared by the page tests: a server that serves the fixture course and lesson (tests/fixtures/), a
// headless Chromium, and small helpers to drive a page the way a learner would. The engine tests'
// launch() is reused, so Playwright starts without a proxy (see tests/engine/helpers.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { launch } from '../engine/helpers.mjs';
import { repoRoot } from '../../tools/lib/static.mjs';

export const FIXTURES = path.join(repoRoot, 'tests/fixtures');

/** A server for the fixture site. `isolate: false` gives a page without SharedArrayBuffer (typed-ahead input). */
export function launchSite({ isolate = true } = {}) {
  return launch({ isolate, server: { lessons: path.join(FIXTURES, 'lessons'), courses: path.join(FIXTURES, 'courses') } });
}

/**
 * Opens a page of the site (with ?sw=off: the server isolates the page itself) and waits until the page
 * says it is drawn (<html data-page="ready">). Collects errors from the page in `errors`.
 */
export async function openPage(env, address, { context, engine = false } = {}) {
  const ctx = context || await env.browser.newContext();
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(`${env.srv.url}${address}${address.includes('?') ? '&' : '?'}sw=off`);
  await page.waitForFunction(() => document.documentElement.dataset.page === 'ready', null, { timeout: 30000 });
  if (engine) await waitEngine(page);
  return { page, ctx, errors };
}

export const waitEngine = (page) =>
  page.waitForFunction(() => document.documentElement.dataset.engine === 'ready', null, { timeout: 90000 });

/** Replaces the code in the editor of the cell `id` (as one edit, like a paste). */
export async function setCode(page, id, code) {
  await page.evaluate(async ({ id, code }) => {
    const { EditorView } = await import('/vendor/editor.bundle.js');
    const view = EditorView.findFromDOM(document.querySelector(`#cell-${CSS.escape(id)} .cm-editor`));
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code }, userEvent: 'input.paste' });
  }, { id, code });
}

/** The code in the editor of the cell `id`. */
export const getCode = (page, id) => page.evaluate(async (id) => {
  const { EditorView } = await import('/vendor/editor.bundle.js');
  return EditorView.findFromDOM(document.querySelector(`#cell-${CSS.escape(id)} .cm-editor`)).state.doc.toString();
}, id);

/** The line (1-based) the cursor is on in the editor of the cell `id`. */
export const cursorLine = (page, id) => page.evaluate(async (id) => {
  const { EditorView } = await import('/vendor/editor.bundle.js');
  const view = EditorView.findFromDOM(document.querySelector(`#cell-${CSS.escape(id)} .cm-editor`));
  return view.state.doc.lineAt(view.state.selection.main.head).number;
}, id);

export const cell = (page, id) => page.locator(`#cell-${id}`);
export const stateOf = (page, id) => page.locator(`#cell-${id} .ds-cell-state`).textContent();
export const outputOf = (page, id) => page.locator(`#cell-${id} .ds-console-out`).textContent();

/** Presses the cell's Run (or Check) button and waits until the cell is no longer busy. */
export async function runCell(page, id, { wait = true } = {}) {
  await page.locator(`#cell-${id} .dl-btn-run`).click();
  if (wait) await waitIdle(page, id);
}

export async function waitIdle(page, id) {
  await page.waitForFunction((id) => {
    const s = document.querySelector(`#cell-${CSS.escape(id)} .ds-cell-state`);
    return s && s.textContent && !['busy', 'waiting'].includes(s.dataset.state);
  }, id, { timeout: 60000 });
}

export async function waitForInput(page, id) {
  await page.waitForFunction((id) => document.querySelector(`#cell-${CSS.escape(id)} .ds-input`)?.dataset.waiting === 'true', id, { timeout: 30000 });
}

/** The saved record of a cell, straight from IndexedDB (database "dewsharp", store "work"). */
export const savedRecord = (page, key) => page.evaluate((key) => new Promise((resolve, reject) => {
  const open = indexedDB.open('dewsharp');
  open.onsuccess = () => {
    const req = open.result.transaction('work').objectStore('work').get(key);
    req.onsuccess = () => { resolve(req.result ?? null); open.result.close(); };
    req.onerror = () => reject(req.error);
  };
  open.onerror = () => reject(open.error);
}), key);

/** Waits for the next download that `action` starts, and returns its bytes. */
export async function downloadOf(page, action) {
  const [download] = await Promise.all([page.waitForEvent('download'), action()]);
  const file = await download.path();
  return { name: download.suggestedFilename(), bytes: fs.readFileSync(file) };
}

/** Answers the next file dialog with `bytes` as a file called `name`, while `action` opens it. */
export async function upload(page, name, bytes, action) {
  const [chooser] = await Promise.all([page.waitForEvent('filechooser'), action()]);
  await chooser.setFiles({ name, mimeType: 'application/json', buffer: Buffer.from(bytes) });
}

/** The entries of a ZIP whose files are stored (not compressed), as web/page/project.js writes them. */
export function readZip(buffer) {
  const files = [];
  let at = 0;
  while (buffer.readUInt32LE(at) === 0x04034b50) {
    const method = buffer.readUInt16LE(at + 8);
    const size = buffer.readUInt32LE(at + 18);
    const nameLength = buffer.readUInt16LE(at + 26);
    const extra = buffer.readUInt16LE(at + 28);
    const name = buffer.subarray(at + 30, at + 30 + nameLength).toString('utf8');
    const start = at + 30 + nameLength + extra;
    if (method !== 0) throw new Error(`${name} is compressed`);
    files.push({ name, text: buffer.subarray(start, start + size).toString('utf8') });
    at = start + size;
  }
  if (buffer.readUInt32LE(at) !== 0x02014b50) throw new Error('no central directory after the entries');
  return files;
}

/** Words the pages never use about a learner's work (planning/PEDAGOGICAL_STYLE_GUIDE.md#voice). */
export const VERDICT = /\b(right|wrong|correct|incorrect|well done|not yet)\b/i;
