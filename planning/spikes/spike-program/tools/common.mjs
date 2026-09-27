import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
export const { chromium } = require('/opt/node22/lib/node_modules/playwright');
export const here = path.dirname(fileURLToPath(import.meta.url));
export const spike = path.resolve(here, '..');

export function sample(...names) {
  return names.map(n => ({ name: path.basename(n).replace('.error', ''), text: fs.readFileSync(path.join(spike, 'samples', n), 'utf8') }));
}

export async function serve(root, port) {
  const p = spawn(process.execPath, [path.join(here, 'serve.mjs'), root, String(port)], { stdio: ['ignore', 'pipe', 'inherit'] });
  await new Promise(r => p.stdout.once('data', r));
  return { url: `http://localhost:${port}/`, stop: () => p.kill(), stats: async () => (await fetch(`http://localhost:${port}/__stats`)).json(),
    reset: () => fetch(`http://localhost:${port}/__reset`) };
}

export async function openPage(browser, url, context, query = '') {
  const ctx = context || await browser.newContext();
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
  page.on('worker', w => w.on('console', m => logs.push(`[worker ${m.type()}] ${m.text()}`)));
  const t0 = Date.now();
  await page.goto(url + query);
  const ready = await page.evaluate(() => window.runner.ready);
  return { ctx, page, logs, ready, navToReadyMs: Date.now() - t0 };
}

export const median = a => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
