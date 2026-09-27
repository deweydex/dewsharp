// Reconcile with the base spike: the 3-file college program, 6 runs in one worker.
import { chromium, serve, openPage, sample } from './common.mjs';
const srv = await serve(process.argv[2], +(process.argv[3] || 8860));
const browser = await chromium.launch();
const { page } = await openPage(browser, srv.url);
const files = sample('college/Program.cs', 'college/Student.cs', 'college/Course.cs');
const ms = [];
for (let k = 0; k < 6; k++) ms.push(await page.evaluate(async (f) => { const t = performance.now(); const r = await window.runner.run(f, 'Ada\n21\n', {}); return [Math.round(performance.now() - t), r.ok, r.timings.compile_emit]; }, files));
console.log(JSON.stringify(ms));
await browser.close(); srv.stop();
