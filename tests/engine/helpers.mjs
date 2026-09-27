// Shared by the engine tests and tools/check-lessons.mjs: a server, a headless Chromium, and a page with a
// runner on it. Playwright is launched without a proxy: its proxy option also routes localhost, and every
// local page load then hangs.
import fs from 'node:fs';
import { chromium } from 'playwright';
import { startServer, frameworkDir } from '../../tools/lib/static.mjs';

export function requireEngine() {
  if (!fs.existsSync(frameworkDir + '/dotnet.js'))
    throw new Error(`No engine build at ${frameworkDir}. Run: npm run build:engine`);
}

/** Starts a server and a browser. `isolate`: the server sends COOP/COEP (no service worker needed). */
export async function launch({ isolate = true, server = {} } = {}) {
  requireEngine();
  const srv = await startServer({ isolate, quiet: true, ...server });
  const browser = await chromium.launch(process.env.DUMPIO ? { dumpio: true } : {});
  return {
    srv, browser,
    async close() { await browser.close().catch(() => {}); await srv.close(); },
  };
}

/** Opens dev.html with a runner and waits for it to be ready. `query`: extra dev.html options. */
export async function openRunner(env, query = '', { context, waitReady = true, sw = false } = {}) {
  const ctx = context || await env.browser.newContext();
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
  const q = [sw ? '' : 'sw=off', query].filter(Boolean).join('&');
  await page.goto(`${env.srv.url}dev.html${q ? '?' + q : ''}`);
  if (waitReady) await page.evaluate(() => window.runner.ready());
  return { page, ctx, logs };
}

/**
 * Runs cells on the page's runner. Returns { result, output, chunks, inputRequests, wallMs, stopToDoneMs }.
 * `answers`: lines to type, one per input request (a string, or null for End input), for live input.
 * `stopAfterMs`: press Stop this long after the start. `stopOnInput`: press Stop at the first input request.
 */
export async function run(page, { cells, mode, stdin, inputs, answers, stopAfterMs, stopOnInput, timeoutMs, answerDelayMs = 0 }) {
  return page.evaluate(async ({ cells, mode, stdin, inputs, answers, stopAfterMs, stopOnInput, timeoutMs, answerDelayMs }) => {
    const chunks = [];
    const requests = [];
    const queue = answers ? [...answers] : [];
    let job;
    const t0 = performance.now();
    job = window.runner.run({
      cells: cells.map((c, i) => typeof c === 'string' ? { id: 'cell-' + (i + 1), code: c } : c),
      mode, stdin, inputs, timeoutMs,
      onOutput: (c) => chunks.push(c),
      onInputRequest: () => {
        // What was on screen when the program asked: the prompt must be there before it waits.
        requests.push(chunks.map(c => c.text || '').join('').slice(-40));
        if (stopOnInput) { job.stop(); return; }
        if (!queue.length) return;
        const a = queue.shift();
        setTimeout(() => (a === null ? job.endInput() : job.sendLine(a)), answerDelayMs);
      },
    });
    let stopMs = null;
    if (stopAfterMs != null) setTimeout(() => { stopMs = performance.now(); job.stop(); }, stopAfterMs);
    const result = await job.done;
    const end = performance.now();
    const output = chunks.map(c => c.kind === 'clear' ? '\f' : c.kind === 'style' ? '' : c.text).join('');
    return { result, output, chunks, inputRequests: requests.length, prompts: requests, wallMs: end - t0,
      stopToDoneMs: stopMs == null ? null : end - stopMs };
  }, { cells, mode, stdin, inputs, answers, stopAfterMs, stopOnInput, timeoutMs, answerDelayMs });
}

/** Cells from code strings, with ids cell-1, cell-2, ... */
export const cellsOf = (...codes) => codes.map((c, i) => ({ id: 'cell-' + (i + 1), code: c }));

/** Runs one program cell with no input (end of input at once) and returns what run() returns. */
export const runCode = (page, code, extra = {}) => run(page, { cells: cellsOf(code), stdin: '', ...extra });
