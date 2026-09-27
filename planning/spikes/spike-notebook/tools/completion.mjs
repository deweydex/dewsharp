// Stretch: Roslyn CompletionService in the browser. Usage: node tools/completion.mjs <wwwroot> [port]
import { chromium, serve, openPage } from './common.mjs';
const root = process.argv[2], port = +(process.argv[3] || 8840);
const ctx = [`class Student
{
    public string Name { get; }
    public int Credits { get; private set; }
    public Student(string name) { Name = name; }
    public void Enrol(int credits) { Credits += credits; }
    private int secret;
}`];
const probes = [
  ['member of a class from another cell', ctx, 'var s = new Student("Ada");\ns.'],
  ['Console.Wr', [], 'Console.Wr'],
  ['List members', [], 'var xs = new List<int>();\nxs.'],
  ['statement keywords', [], 'fo'],
  ['type name in new', ctx, 'var s = new Stu'],
  ['member of a class from another cell (again, warm)', ctx, 'var s = new Student("Ada");\ns.'],
  ['string members, warm', [], 'var name = "Ada";\nname.To'],
];
const srv = await serve(root, port);
await srv.reset();
const browser = await chromium.launch();
try {
  const { page, logs, ready } = await openPage(browser, srv.url);
  const st = await srv.stats();
  console.log('ready', JSON.stringify(ready), 'bytesSent', st.bytes, 'requests', st.requests);
  for (const [name, c, code] of probes) {
    const r = await page.evaluate(async ([c, code]) => { const t = performance.now(); const r = await window.runner.invoke('Complete', [c, code, code.length], 60000); r.hostMs = Math.round(performance.now() - t); return r; }, [c, code]);
    console.log(`\n=== ${name}: ${JSON.stringify(code)}\n` + JSON.stringify(r, null, 1).slice(0, 3000));
  }
  // Does compile+run still work in the same worker after the workspace is up?
  const run = await page.evaluate(() => window.runner.run([{ name: 'Program.cs', text: 'Console.WriteLine("still runs");' }], '', {}));
  console.log('\nrun after completion:', run.ok, JSON.stringify(run.stdout), JSON.stringify(run.timings));
  const mem = await page.evaluate(() => window.runner.memory(true));
  console.log('memory', JSON.stringify(mem));
  console.log('\n--- console ---\n' + logs.slice(0, 40).join('\n'));
} catch (e) { console.error('FAILED', e); }
await browser.close(); srv.stop();
