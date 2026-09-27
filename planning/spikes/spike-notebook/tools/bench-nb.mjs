// Model A timings: cold boot + per-cell latency (x3 fresh contexts), stop-a-runaway + replay, memory over 200 cells.
// Usage: node tools/bench-nb.mjs <wwwroot> [port]
import { chromium, serve, openPage, median } from './common.mjs';
import fs from 'node:fs';
import path from 'node:path';
const root = process.argv[2], port = +(process.argv[3] || 8820);
const src = fs.readFileSync(new URL('./scriptA.mjs', import.meta.url), 'utf8');
const cells = eval(src.slice(src.indexOf('const cells = [') + 'const cells = '.length, src.indexOf('];\ntry') + 1));
const srv = await serve(root, port);
const browser = await chromium.launch();
const out = { cold: [], stop: null, memory: [] };
const sub = (page, id, code, timeoutMs = 0) => page.evaluate(async ([id, code, t]) => {
  const s = performance.now(); const r = await window.runner.invoke('SubRun', [id, code, '', true], t); if (r) r.hostMs = Math.round(performance.now() - s); return r; }, [id, code, timeoutMs]);
try {
  for (let i = 0; i < 3; i++) {
    await srv.reset();
    const { ctx, page, ready, navToReadyMs } = await openPage(browser, srv.url);
    const st = await srv.stats();
    const per = [];
    for (let k = 0; k < cells.length; k++) per.push((await sub(page, 'cell' + (k + 1), cells[k])).hostMs);
    // second pass of the same five cells, same worker (state reset between passes)
    await page.evaluate(() => window.runner.invoke('SubReset'));
    const warm = [];
    for (let k = 0; k < cells.length; k++) warm.push((await sub(page, 'cell' + (k + 1), cells[k])).hostMs);
    out.cold.push({ navToReadyMs, workerReadyMs: Math.round(ready.readyMs), bytesSent: st.bytes, requests: st.requests, firstPassCellMs: per, secondPassCellMs: warm });
    if (i === 0) {
      // Runaway cell: stopped by terminate(); every variable is gone; replay cells 1-5 in the new worker.
      const spin = await sub(page, 'cell6', 'while (true) { }', 2000);
      const t0 = Date.now();
      const restartMs = await page.evaluate(() => window.runner.restart());
      const replay = [];
      for (let k = 0; k < cells.length; k++) replay.push((await sub(page, 'cell' + (k + 1), cells[k])).hostMs);
      const check = await sub(page, 'cell7', 'total');
      out.stop = { spin: spin.phase, terminateToReadyMs: Math.round(restartMs), replayCellMs: replay, replayTotalMs: replay.reduce((a, b) => a + b, 0),
                   stopToStateRestoredMs: Date.now() - t0, totalAfterReplay: check.returnValue };
      // Memory: 200 small cells in a fresh worker.
      await page.evaluate(() => window.runner.restart());
      await sub(page, 'c0', 'var n = 0;');
      out.memory.push({ cells: 0, ...(await page.evaluate(() => window.runner.memory(true))) });
      const lat = [];
      for (let k = 1; k <= 200; k++) {
        lat.push((await sub(page, 'c' + k, `n++;\nvar v${k} = new List<int> { n };\nConsole.WriteLine(n);`)).hostMs);
        if (k % 50 === 0) out.memory.push({ cells: k, medianCellMs: median(lat.slice(-50)), ...(await page.evaluate(() => window.runner.memory(true))) });
      }
    }
    await ctx.close();
  }
} catch (e) { console.error('FAILED', e); }
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(root, '..', 'bench-nb.json'), JSON.stringify(out, null, 1));
await browser.close(); srv.stop();
