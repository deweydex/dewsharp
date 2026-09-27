// Model A: C# scripting across four cells (+ extras). Usage: node tools/scriptA.mjs <wwwroot> [port] [mode]
import { chromium, serve, openPage } from './common.mjs';
const root = process.argv[2], port = +(process.argv[3] || 8811), mode = process.argv[4] || 'refs';
const srv = await serve(root, port);
const browser = await chromium.launch();
const cells = [
`var total = 0;
class Student
{
    public string Name { get; }
    public int Credits { get; private set; }
    public Student(string name) { Name = name; }
    public void Enrol(int credits) { Credits += credits; }
}`,
`var ada = new Student("Ada");
ada.Enrol(10); ada.Enrol(5);
total += ada.Credits;
Console.WriteLine($"{ada.Name} has {ada.Credits} credits; total = {total}");
total`,
`class Student
{
    public string Name { get; }
    public int Credits { get; private set; }
    public Student(string name) { Name = name; }
    public void Enrol(int credits) { Credits += credits; }
    public string Describe() => $"{Name} ({Credits} credits)";
}
var grace = new Student("Grace");
grace.Enrol(20);
Console.WriteLine(grace.Describe());
Console.WriteLine($"ada is still {ada.GetType().FullName}; grace is {grace.GetType().FullName}");
Console.WriteLine($"ada is Student (new)? {ada is Student}");`,
`void Check(Student s)
{
    if (s.Credits > 15) throw new InvalidOperationException($"{s.Name} has too many credits");
}
Console.WriteLine("before the throw");
Check(grace);
Console.WriteLine("never printed");`,
`Console.WriteLine($"after the exception, total is still {total} and grace is {grace.Describe()}");`,
];
try {
  const { page, logs, ready } = await openPage(browser, srv.url);
  console.log('ready', JSON.stringify(ready));
  console.log('probe', JSON.stringify(await page.evaluate(() => window.runner.invoke('Probe'))));
  const inv = (m, a) => page.evaluate(async ([m, a]) => { const t = performance.now(); const r = await window.runner.invoke(m, a); r.hostMs = Math.round(performance.now() - t); return r; }, [m, a]);
  for (let pass = 1; pass <= 3; pass++) {
    const own = mode === 'own';
    await page.evaluate((own) => window.runner.invoke(own ? 'SubReset' : 'ScriptReset'), own);
    for (let i = 0; i < cells.length; i++) {
      const r = own ? await inv('SubRun', ['cell' + (i + 1), cells[i], '', true]) : await inv('ScriptRun', ['cell' + (i + 1), cells[i], '', mode]);
      if (pass === 1) console.log(`\n=== pass ${pass} cell${i + 1} ===\n` + JSON.stringify(r, null, 1));
      else console.log(`pass ${pass} cell${i + 1}: ok=${r.ok} phase=${r.phase} hostMs=${r.hostMs} timings=${JSON.stringify(r.timings)}`);
    }
  }
  console.log('\n--- console ---\n' + logs.join('\n'));
} catch (e) { console.error('FAILED', e); }
await browser.close(); srv.stop();
