// Timings and behaviour: cold boot, compile+run #1/#2/#5, warm restart, stop-a-runaway, state between runs,
// memory growth over 30 runs. Usage: node tools/bench.mjs <wwwroot> [port] [--throttle]
import { chromium, serve, openPage, sample, median } from './common.mjs';
import fs from 'node:fs';
const root = process.argv[2];
const port = +(process.argv[3] || 8802);
const throttle = process.argv.includes('--throttle');
const srv = await serve(root, port);
const browser = await chromium.launch();
const out = { root, cold: [], runs: [], restartsWarm: [], stop: null, state: {}, memory: {} };
const college = sample('college/Program.cs', 'college/Student.cs', 'college/Course.cs');
const timed = (page, files, stdin = '', opts = {}) => page.evaluate(async ([f, s, o]) => {
  const t = performance.now(); const r = await window.runner.run(f, s, o); r.hostMs = performance.now() - t; return r;
}, [files, stdin, opts]);
const brief = r => ({ ok: r.ok, phase: r.phase, hostMs: Math.round(r.hostMs), ...r.timings });

try {
  // 1+6. Cold boot (fresh context = empty HTTP cache) x3, each followed by 5 compile+runs in that worker.
  for (let i = 0; i < 3; i++) {
    await srv.reset();
    const { ctx, page, ready, navToReadyMs } = await openPage(browser, srv.url);
    const st = await srv.stats();
    const runs = [];
    for (let k = 1; k <= 5; k++) runs.push(brief(await timed(page, college, 'Ada\n21\n')));
    out.cold.push({ navToReadyMs, workerReadyMs: Math.round(ready.readyMs), bytesSent: st.bytes, requests: st.requests });
    out.runs.push(runs);
    // 5 (warm). Worker re-creation with warm HTTP cache, x3 in this context.
    if (i === 0) {
      for (let k = 0; k < 3; k++) {
        await srv.reset();
        const ms = await page.evaluate(() => window.runner.restart());
        const s2 = await srv.stats();
        const first = brief(await timed(page, sample('misc/Hello.cs')));
        out.restartsWarm.push({ terminateToReadyMs: Math.round(ms), bytesSent: s2.bytes, requests: s2.requests, notModified: s2.notModified, firstRunAfterRestart: first });
      }
      // Stop a runaway loop.
      const spin = await timed(page, sample('misc/Spin.cs'), '', { timeoutMs: 3000 });
      const restartMs = await page.evaluate(() => window.runner.restart());
      const after = await timed(page, sample('misc/Hello.cs'));
      out.stop = { spinResult: spin, terminateToReadyMs: Math.round(restartMs), afterRestart: { stdout: after.stdout, ...brief(after) } };
      // 7. State between runs.
      const counter = [];
      for (let k = 0; k < 3; k++) counter.push((await timed(page, sample('misc/Counter.cs'))).stdout.trim());
      out.state.counter = counter;
      const leaky = await timed(page, sample('misc/Leaky.cs'));
      const waiter = await timed(page, sample('misc/Waiter.cs'));
      out.state.leaky = { run1: leaky.stdout, run2: waiter.stdout };
      // Memory growth: 30 runs, default Assembly.Load, then 30 with a collectible ALC in a fresh worker.
      for (const collectible of [false, true]) {
        await page.evaluate(() => window.runner.restart());
        const samples = [];
        samples.push({ run: 0, ...(await page.evaluate(() => window.runner.memory(true))) });
        for (let k = 1; k <= 30; k++) {
          await timed(page, college, 'Ada\n21\n', { collectible });
          if (k % 5 === 0) samples.push({ run: k, ...(await page.evaluate(() => window.runner.memory(true))) });
        }
        const jsHeap = await page.evaluate(() => performance.memory ? performance.memory.usedJSHeapSize : null);
        out.memory[collectible ? 'collectibleALC' : 'assemblyLoad'] = { samples, mainThreadJsHeap: jsHeap };
      }
    }
    await ctx.close();
  }
  // Optional: one throttled cold boot through CDP (applies to page; worker fetches may not be throttled).
  if (throttle) {
    out.throttled = [];
    for (const mbps of [10, 30, 100]) {
      const ctx = await browser.newContext(); const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 30, downloadThroughput: mbps * 1e6 / 8, uploadThroughput: 5e6 / 8 });
      const t0 = Date.now(); await page.goto(srv.url); await page.evaluate(() => window.runner.ready);
      out.throttled.push({ mbps, navToReadyMs: Date.now() - t0 });
      await ctx.close();
    }
  }
} catch (e) { out.error = String(e.stack || e); console.error(e); }
out.summary = {
  coldNavToReadyMedian: median(out.cold.map(c => c.navToReadyMs)),
  coldWorkerReadyMedian: median(out.cold.map(c => c.workerReadyMs)),
  run1HostMedian: median(out.runs.map(r => r[0].hostMs)),
  run2HostMedian: median(out.runs.map(r => r[1].hostMs)),
  run5HostMedian: median(out.runs.map(r => r[4].hostMs)),
  warmRestartMedian: median(out.restartsWarm.map(r => r.terminateToReadyMs)),
  firstRunAfterRestartMedian: median(out.restartsWarm.map(r => r.firstRunAfterRestart.hostMs)),
};
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(root.replace(/\/wwwroot\/?$/, '') + '/bench.json', JSON.stringify(out, null, 1));
await browser.close(); srv.stop();
