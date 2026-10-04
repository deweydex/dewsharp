// Shared by the page tests: a server that serves the fixture course and lesson (tests/fixtures/), a
// headless Chromium, and small helpers to drive a page the way a learner would. The engine tests'
// launch() is reused, so Playwright starts without a proxy (see tests/engine/helpers.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { launch } from '../engine/helpers.mjs';
import { repoRoot } from '../../tools/lib/static.mjs';
import { toBase64, fromBase64 } from '../../web/page/github.js';

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

// ---- the editing mode: a stand-in for GitHub, and a browser that holds a token

export const GH = '/repos/deweydex/dewsharp';
export const FIXTURE_PAGE = 'lessons/every-feature/every-feature.md';
export const FIXTURE_SOURCE = fs.readFileSync(path.join(FIXTURES, 'lessons/every-feature/every-feature.md'), 'utf8');

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'authorization, content-type, accept, x-github-api-version',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

/**
 * Stands in for api.github.com on a context, and records every call. `overrides`: "METHOD /path" -> [status,
 * body], or a function of `{ query, body }` that returns one. A call that belongs to keeping a draft on GitHub
 * (the token check, and anything about a `draft/...` branch) has `remote: true`, so that a test of the
 * proposal can leave them out. The stand-in keeps draft branches in `calls.drafts` (a Map from branch name to
 * `{ text, sha, baseBlob, savedAt }`): a test can put one there, as if another computer had saved it, and look
 * at what the page saved.
 */
export async function fakeGithub(ctx, overrides = {}) {
  const calls = [];
  const drafts = new Map();
  calls.drafts = drafts;
  let saves = 0;
  const isDraft = (name) => typeof name === 'string' && name.startsWith('draft/');
  const page = `${GH}/contents/${FIXTURE_PAGE}`;
  const answers = {
    'GET /user': [200, { login: 'josh' }],
    [`GET ${GH}`]: [200, { permissions: { push: true } }],
    [`GET ${GH}/git/ref/heads/main`]: [200, { object: { sha: 'basesha' } }],
    [`GET ${page}`]: ({ query }) => {
      const ref = query.get('ref');
      if (!isDraft(ref)) return [200, { sha: 'filesha', content: toBase64(FIXTURE_SOURCE) }];
      const d = drafts.get(ref);
      return d ? [200, { sha: d.sha, content: toBase64(d.text) }] : [404, { message: `No commit found for the ref ${ref}` }];
    },
    [`GET ${GH}/commits`]: ({ query }) => {
      const d = drafts.get(query.get('sha'));
      return d ? [200, [{ sha: d.sha, commit: { message: `Draft of ${FIXTURE_PAGE}\n\nBase-Blob: ${d.baseBlob}`, committer: { date: d.savedAt } } }]] : [404, { message: 'Not Found' }];
    },
    [`POST ${GH}/git/refs`]: ({ body }) => {
      const name = body.ref.replace('refs/heads/', '');
      if (!isDraft(name)) return [201, {}];
      if (drafts.has(name)) return [422, { message: 'Reference already exists' }];
      drafts.set(name, { text: FIXTURE_SOURCE, sha: 'filesha', baseBlob: '', savedAt: new Date().toISOString() });
      return [201, {}];
    },
    [`PUT ${page}`]: ({ body }) => {
      if (!isDraft(body.branch)) return [200, {}];
      const d = drafts.get(body.branch);
      if (!d) return [404, { message: 'Branch not found' }];
      if (body.sha !== d.sha) return [409, { message: `${FIXTURE_PAGE} does not match ${body.sha}` }];
      Object.assign(d, { text: fromBase64(body.content), sha: `draftsha${++saves}`, baseBlob: /Base-Blob: ([0-9a-f]{40})/.exec(body.message)?.[1] || '', savedAt: new Date().toISOString() });
      return [200, { content: { sha: d.sha } }];
    },
    [`POST ${GH}/pulls`]: [201, { html_url: 'https://github.com/deweydex/dewsharp/pull/99', number: 99 }],
    ...overrides,
  };
  await ctx.route('https://api.github.com/**', async (route) => {
    const request = route.request();
    if (request.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS });
    const url = new URL(request.url());
    const method = request.method();
    let key = `${method} ${url.pathname}`;
    const body = request.postData() ? JSON.parse(request.postData()) : null;
    if (method === 'DELETE' && url.pathname.startsWith(`${GH}/git/refs/heads/`)) {
      const name = decodeURIComponent(url.pathname.slice(`${GH}/git/refs/heads/`.length));
      if (isDraft(name)) drafts.delete(name);
    }
    const remote = key === 'GET /user' || key === `GET ${GH}` || key === `GET ${GH}/commits` || url.pathname.startsWith(`${GH}/git/matching-refs/`)
      || isDraft(url.searchParams.get('ref')) || isDraft(body?.branch) || isDraft(body?.ref?.replace('refs/heads/', ''))
      || (method === 'DELETE' && url.pathname.includes('/heads/draft/'));
    calls.push({ key, body, auth: request.headers().authorization, remote });
    let answer = answers[key];
    const matching = `${GH}/git/matching-refs/heads/`;
    if (!answer && method === 'GET' && url.pathname.startsWith(matching)) {
      const prefix = decodeURIComponent(url.pathname.slice(matching.length));
      answer = [200, [...drafts.keys()].filter(name => name.startsWith(prefix)).map(name => ({ ref: `refs/heads/${name}`, object: { sha: drafts.get(name).sha } }))];
    }
    if (method === 'DELETE' && !answer) answer = [204, null];
    if (typeof answer === 'function') answer = answer({ query: url.searchParams, body });
    const [status, reply] = answer || [404, { message: `no stand-in for ${key}` }];
    return route.fulfill({ status, headers: { ...CORS, 'content-type': 'application/json' }, body: status === 204 ? '' : JSON.stringify(reply) });
  });
  return calls;
}

/** A browser context that holds a GitHub token, with GitHub replaced by the stand-in. */
export async function withToken(env, overrides) {
  const ctx = await env.browser.newContext({ viewport: { width: 1000, height: 1300 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('dewsharp:edit:token', 'test-token'); } catch { } });
  const calls = await fakeGithub(ctx, overrides);
  return { ctx, calls };
}

/**
 * Puts the caret at the start of the rich editor that is open. ProseMirror sets the caret from its own state a
 * moment after the editor takes focus, and a key pressed before then is undone, so this presses the key again until
 * the caret has stayed at the start.
 */
export async function caretToStart(page) {
  for (let attempt = 0; attempt < 8; attempt++) {
    await page.keyboard.press('Control+Home');
    await page.waitForTimeout(80);
    const atStart = await page.evaluate(() => {
      const root = document.querySelector('.ds-rich .ProseMirror');
      const sel = getSelection();
      if (!root || !sel.anchorNode || !root.contains(sel.anchorNode)) return false;
      const before = document.createRange();
      before.selectNodeContents(root);
      before.setEnd(sel.anchorNode, sel.anchorOffset);
      return before.toString() === '';
    });
    if (atStart) return;
  }
  throw new Error('the caret would not stay at the start of the editor');
}
