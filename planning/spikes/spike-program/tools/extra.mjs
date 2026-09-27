// Extra checks: BCL probe without System.Text.Json, hosting from a sub-folder, 100-run memory trend.
import { chromium, serve, openPage, sample } from './common.mjs';
const variantDir = process.argv[2];           // e.g. out/trimrooted  (served one level up from wwwroot)
const srv = await serve(variantDir, 8840);
const browser = await chromium.launch();
try {
  const { page, ready } = await openPage(browser, srv.url + 'wwwroot/');
  console.log('subfolder boot ok', JSON.stringify(ready));
  const run = (f, s = '', o = {}) => page.evaluate(([f, s, o]) => window.runner.run(f, s, o), [f, s, o]);
  const r = await run(sample('misc/BclNoJson.cs'));
  console.log('BclNoJson', r.ok, JSON.stringify(r.stdout), r.stderr);
  const college = sample('college/Program.cs', 'college/Student.cs', 'college/Course.cs');
  const mem = [];
  for (let k = 1; k <= 200; k++) {
    await run(college, 'Ada\n21\n', { collectible: process.argv[3] === 'collectible', emitPdb: process.argv[4] !== 'nopdb' });
    if (k % 40 === 0) mem.push({ run: k, ...(await page.evaluate(() => window.runner.memory(true))) });
  }
  console.log('memory', JSON.stringify(mem.map(m => [m.run, m.wasmBytes, m.dotnet.totalMemory])));
} catch (e) { console.error('FAILED', e); }
await browser.close(); srv.stop();
