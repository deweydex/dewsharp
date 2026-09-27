// Boot, warm-up, recycling, the boot-failure path, a page without cross-origin isolation, and the service
// worker. Each test starts its own page (and some their own server), so this file is the slowest.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { launch, openRunner, run, runCode, cellsOf } from './helpers.mjs';
import { frameworkDir } from '../../tools/lib/static.mjs';

const envs = [];
after(async () => { for (const e of envs) await e.close(); });
async function env(opts) { const e = await launch(opts); envs.push(e); return e; }

test('boot: loading, warming, ready; the first run after the warm-up is quick', async () => {
  const e = await env();
  const t0 = Date.now();
  const { page, ctx } = await openRunner(e);
  const bootMs = Date.now() - t0;
  const statuses = await page.evaluate(() => window.statusLog.map(x => x.s));
  assert.deepEqual([...new Set(statuses)], ['loading', 'warming', 'ready']);
  const r = await run(page, { cells: cellsOf('public class Planet\n{\n    public string Name = "Mars";\n}', 'Console.WriteLine(new Planet().Name);'), stdin: '' });
  assert.equal(r.output, 'Mars\n');
  assert.ok(r.wallMs < 1500, `first run took ${r.wallMs} ms`);
  const stats = await page.evaluate(() => window.runner.stats);
  console.log(`# boot to ready ${bootMs} ms (boot ${stats.lastBootMs} ms, warm-up ${stats.lastWarmMs} ms); first run ${Math.round(r.wallMs)} ms`);
  await ctx.close();
});

test('recycling: past the memory threshold, a warmed replacement takes over while idle', async () => {
  const e = await env();
  const { page, ctx } = await openRunner(e, 'recycle=1');
  const first = await runCode(page, 'Console.WriteLine("one");');
  assert.equal(first.output, 'one\n');
  // A run while the replacement is still starting uses the old worker and doesn't wait for the new one.
  const during = await runCode(page, 'Console.WriteLine("two");');
  assert.ok(during.wallMs < 1500, `${during.wallMs} ms`);
  await page.waitForFunction(() => window.runner.stats.recycles >= 1, null, { timeout: 60000 });
  const stats = await page.evaluate(() => window.runner.stats);
  const after = await runCode(page, 'Console.WriteLine("three");');
  assert.equal(after.output, 'three\n');
  assert.ok(after.wallMs < 1500, `the first run on the new worker took ${after.wallMs} ms`);
  assert.equal(stats.restarts, 0);
  console.log(`# recycle: replacement ready ${stats.lastRecycleMs} ms after the threshold; next run ${Math.round(after.wallMs)} ms`);
  await ctx.close();
});

test('boot failure: "unavailable", with a reason a learner can read, after one reload', async () => {
  const e = await env();
  const ctx = await e.browser.newContext();
  const page = await ctx.newPage();
  let loads = 0;
  page.on('load', () => loads++);
  await page.goto(`${e.srv.url}dev.html?sw=off&framework=/missing/`);
  await page.waitForFunction(() => window.statusLog?.some(x => x.s === 'unavailable'), null, { timeout: 30000 });
  assert.equal(loads, 2, 'the page reloads once, then stops trying');
  const status = await page.evaluate(() => window.statusLog.at(-1));
  assert.match(status.d.reason, /Reload the page/);
  const result = await page.evaluate(() => window.runner.run({ cells: [{ id: 'a', code: 'Console.WriteLine(1);' }], stdin: '' }).done);
  assert.equal(result.outcome, 'host-error');
  await assert.rejects(page.evaluate(() => window.runner.ready()));
  await ctx.close();
});

test('boot failure after a deploy renamed the runtime files: "changed"', async () => {
  // A _framework whose dotnet.js lists files that are no longer there.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dewsharp-stale-'));
  fs.copyFileSync(path.join(frameworkDir, 'dotnet.js'), path.join(dir, 'dotnet.js'));
  const e = await env({ server: { framework: dir } });
  const { page, ctx } = await openRunner(e, 'reload=0', { waitReady: false });
  await page.waitForFunction(() => window.statusLog?.some(x => x.s === 'unavailable'), null, { timeout: 30000 });
  const status = await page.evaluate(() => window.statusLog.at(-1));
  assert.equal(status.d.code, 'changed', status.d.technical);
  assert.match(status.d.reason, /updated/);
  await ctx.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

test('without cross-origin isolation: no live input, typed-ahead input works, Stop ends the worker', async () => {
  const e = await env({ isolate: false });
  const { page, ctx } = await openRunner(e);
  assert.equal(await page.evaluate(() => [window.crossOriginIsolated, window.runner.liveInput].join()), 'false,false');
  let r = await run(page, { cells: cellsOf('Console.WriteLine($"Hi {Console.ReadLine()}");') });
  assert.equal(r.output, 'Hi \n');   // no answers given: end of input at once
  r = await run(page, { cells: cellsOf('Console.WriteLine($"Hi {Console.ReadLine()}");'), stdin: 'Ada\n' });
  assert.equal(r.output, 'Ada\nHi Ada\n');
  r = await runCode(page, 'long i = 0;\nwhile (true) Console.WriteLine(i++);', { stopAfterMs: 300 });
  assert.equal(r.result.outcome, 'stopped');
  assert.equal(await page.evaluate(() => window.runner.stats.restarts), 1);
  await ctx.close();
});

test('the service worker isolates the page, and serves the runtime from its cache the second time', async () => {
  const e = await env({ isolate: false });
  const { page, ctx } = await openRunner(e, '', { sw: true, waitReady: false });
  await page.waitForFunction(() => window.crossOriginIsolated === true, null, { timeout: 30000 });
  await page.waitForFunction(() => window.runner, null, { timeout: 30000 });
  await page.evaluate(() => window.runner.ready());
  assert.equal(await page.evaluate(() => window.runner.liveInput), true);
  const r = await run(page, { cells: cellsOf('Console.WriteLine(Console.ReadLine());'), answers: ['live'] });
  assert.equal(r.output, 'live\nlive\n');
  // A second visit: the fingerprinted files come from the service worker's cache, not the network.
  await fetch(e.srv.url + '__reset');
  const second = await ctx.newPage();
  await second.goto(`${e.srv.url}dev.html`);
  await second.evaluate(() => window.runner.ready());
  const stats = await (await fetch(e.srv.url + '__stats')).json();
  const framework = stats.paths.filter(p => p.startsWith('/_framework/'));
  assert.deepEqual(framework, ['/_framework/dotnet.js'], framework.slice(0, 5).join(', '));
  await ctx.close();
});

test('check.html, the device self-test, finds that this browser can run the lessons', async () => {
  const e = await env();
  const ctx = await e.browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${e.srv.url}check.html`);
  await page.waitForFunction(() => /^This device/.test(document.getElementById('summary').textContent), null, { timeout: 60000 });
  const summary = await page.textContent('#summary');
  const states = await page.$$eval('#steps .state', els => els.map(e => e.textContent));
  assert.equal(summary, 'This device can run the C# on the lesson pages.', states.join(', ') + '\n' + await page.textContent('#details'));
  assert.deepEqual([...new Set(states)], ['Works']);
  await ctx.close();
});
