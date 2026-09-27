// After Stop (terminate) of a catch-all loop blocked in a sync XHR, does the old worker keep running?
import { chromium, sample, here, spike } from './common.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
const port = +(process.argv[2] || 9320);
const srv = spawn(process.execPath, [path.join(here, 'serve2.mjs'), path.join(spike, 'out/trimrooted/wwwroot'), String(port)], { stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise(r => srv.stdout.once('data', r));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${port}/csharp/?sw=stdin&transport=sync-xhr&hold=2000`);
await page.waitForFunction(() => window.bootInfo, null, { timeout: 60000 });
const stats = () => page.evaluate(() => fetch('./__stdin__/stats').then(r => r.json()));
await page.evaluate((f) => { window.inputRequests = 0; window.__p = window.runSource(f); }, sample('input/' + (process.argv[3] || 'CatchAll.cs')));
await page.waitForFunction(() => window.inputRequests >= 1, null, { timeout: 60000 });
await page.fill('#line', '4'); await page.press('#line', 'Enter');
await page.waitForFunction(() => window.inputRequests >= 2);
const t0 = Date.now();
await page.click('#stop');
await page.waitForFunction(() => window.lastStop);
console.log('stop', JSON.stringify(await page.evaluate(() => window.lastStop)));
for (let i = 0; i < 6; i++) { const s = await stats(); console.log(`${Date.now() - t0} ms  held ${s.heldTotal} waiting ${s.waiting} keys ${s.recentKeys.slice(-2).join(' ')}`); await page.waitForTimeout(700); }
console.log('transcript tail', JSON.stringify((await page.evaluate(() => window.transcript())).slice(-160)));
await browser.close(); srv.kill();
