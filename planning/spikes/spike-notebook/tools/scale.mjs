// How per-run cost grows with notebook length. 20 class cells (~15 lines each) + 1 statement cell.
// Model A runs each cell once (incremental). Model B recompiles every declaration on each run.
import { chromium, serve, openPage, median } from './common.mjs';
const root = process.argv[2], port = +(process.argv[3] || 8850);
const N = 20;
const cells = [];
for (let i = 0; i < N; i++) cells.push(`class Thing${i}
{
    public string Name { get; }
    public int Count { get; private set; }
    public Thing${i}(string name) { Name = name; }
    public void Add(int n) { if (n < 0) throw new ArgumentException("negative"); Count += n; }
    public override string ToString() => $"{Name}: {Count}";
    public static Thing${i} Make() => new Thing${i}("t${i}");
    public IEnumerable<int> Range() => Enumerable.Range(0, Count).Where(x => x % 2 == 0);
}`);
cells.push(`var all = new List<object>();\n${Array.from({ length: N }, (_, i) => `var t${i} = Thing${i}.Make(); t${i}.Add(${i}); all.Add(t${i});`).join('\n')}\nConsole.WriteLine(string.Join(", ", all));`);
const srv = await serve(root, port);
const browser = await chromium.launch();
const { page } = await openPage(browser, srv.url);
// warm up the compiler once so we measure steady state
await page.evaluate(() => window.runner.run([{ name: 'P.cs', text: 'System.Console.WriteLine(1);' }], '', {}));
await page.evaluate(() => window.runner.invoke('SubRun', ['w', 'var w = 1;', '', true]));
await page.evaluate(() => window.runner.invoke('SubReset'));
const a = [];
for (let i = 0; i < cells.length; i++) {
  const r = await page.evaluate(async ([c, i]) => { const t = performance.now(); const r = await window.runner.invoke('SubRun', ['cell' + (i + 1), c, '', true]); r.ms = performance.now() - t; return r; }, [cells[i], i]);
  a.push(Math.round(r.ms)); if (!r.ok) console.log('A fail', i, JSON.stringify(r).slice(0, 300));
}
const aRerun = [];
for (let k = 0; k < 5; k++) aRerun.push(Math.round(await page.evaluate(async (c) => { const t = performance.now(); await window.runner.invoke('SubRun', ['cellX', c, '', true]); return performance.now() - t; }, cells[N])));
const b = [];
let bout = '';
for (let k = 0; k < 6; k++) {
  const r = await page.evaluate(async ([cells]) => {
    const t = performance.now();
    const ids = cells.map((_, i) => 'cell' + (i + 1));
    const asm = await window.runner.invoke('NotebookAssemble', [ids, cells, cells.length - 1, false, true]);
    const r = await window.runner.run(asm.names.map((n, i) => ({ name: n, text: asm.texts[i] })), '', {});
    r.ms = performance.now() - t; return r;
  }, [cells]);
  b.push(Math.round(r.ms)); bout = r.stdout || JSON.stringify(r.diagnostics).slice(0, 300);
}
console.log(JSON.stringify({ N, modelA_perCellFirstRun: a, modelA_statementCell_rerun: aRerun, modelB_statementCellRun: b, modelB_median: median(b.slice(1)), modelB_stdout: bout.slice(0, 120) }, null, 1));
await browser.close(); srv.stop();
