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
export async function openRunner(env, query = '', { context, waitReady = true } = {}) {
  const ctx = context || await env.browser.newContext();
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
  await page.goto(`${env.srv.url}dev.html?sw=off${query ? '&' + query : ''}`);
  if (waitReady) await page.evaluate(() => window.runner.ready());
  return { page, ctx, logs };
}

/**
 * Runs cells on the page's runner. Returns { result, output, chunks, inputRequests }. `answers`: lines to type,
 * one per input request (a string, or null for End input), for live input.
 */
export async function run(page, { cells, mode, stdin, inputs, answers, stopAfterMs, stopOnInput, timeoutMs }) {
  return page.evaluate(async ({ cells, mode, stdin, inputs, answers, stopAfterMs, stopOnInput, timeoutMs }) => {
    const chunks = [];
    let inputRequests = 0;
    const queue = answers ? [...answers] : [];
    let job;
    const t0 = performance.now();
    job = window.runner.run({
      cells: cells.map((c, i) => typeof c === 'string' ? { id: 'cell-' + (i + 1), code: c } : c),
      mode, stdin, inputs, timeoutMs,
      onOutput: (c) => chunks.push(c),
      onInputRequest: () => {
        inputRequests++;
        if (stopOnInput) { job.stop(); return; }
        if (!queue.length) return;
        const a = queue.shift();
        setTimeout(() => (a === null ? job.endInput() : job.sendLine(a)), 0);
      },
    });
    let stopMs = null;
    if (stopAfterMs != null) setTimeout(() => { stopMs = performance.now(); job.stop(); }, stopAfterMs);
    const result = await job.done;
    const end = performance.now();
    const output = chunks.map(c => c.kind === 'clear' ? '\f' : c.kind === 'style' ? '' : c.text).join('');
    return { result, output, chunks, inputRequests, wallMs: end - t0, stopToDoneMs: stopMs == null ? null : end - stopMs };
  }, { cells, mode, stdin, inputs, answers, stopAfterMs, stopOnInput, timeoutMs });
}

export const cellsOf = (...codes) => codes.map((c, i) => ({ id: 'cell-' + (i + 1), code: c }));
