// Does a throwaway warm-up compile right after boot hide the slow first compile?
import { chromium, serve, openPage, sample, median } from './common.mjs';
const srv = await serve(process.argv[2], 8850);
const browser = await chromium.launch();
const res = [];
for (let i = 0; i < 3; i++) {
  const { ctx, page } = await openPage(browser, srv.url);
  const t = (f, s = '') => page.evaluate(async ([f, s]) => { const t0 = performance.now(); await window.runner.run(f, s); return Math.round(performance.now() - t0); }, [f, s]);
  const warm = await t(sample('misc/Hello.cs'));
  const college = await t(sample('college/Program.cs', 'college/Student.cs', 'college/Course.cs'), 'Ada\n21\n');
  res.push({ warmupMs: warm, firstRealRunMs: college });
  await ctx.close();
}
console.log(JSON.stringify(res), 'median warm-up', median(res.map(r => r.warmupMs)), 'median first real run', median(res.map(r => r.firstRealRunMs)));
await browser.close(); srv.stop();
