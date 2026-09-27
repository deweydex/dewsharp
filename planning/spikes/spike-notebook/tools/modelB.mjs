// Model B: "declarations persist, statements run". Every run compiles cells 0..current as one ordinary program.
// Usage: node tools/modelB.mjs <wwwroot> [port] [filter]
import { chromium, serve, openPage } from './common.mjs';
const root = process.argv[2], port = +(process.argv[3] || 8830), filter = process.argv[4] || '';
const college = [
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
Console.WriteLine($"{ada.Name} has {ada.Credits} credits; total = {total}");`,
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
Console.WriteLine(grace.Describe());`,
`void Check(Student s)
{
    if (s.Credits > 15) throw new InvalidOperationException($"{s.Name} has too many credits");
}
var grace = new Student("Grace");
grace.Enrol(20);
Console.WriteLine("before the throw");
Check(grace);`,
];
// Same lesson written the Model B way: declarations in their own cells, each statement cell self-contained.
const collegeB = [
`namespace School;

public class Student
{
    public string Name { get; }
    public int Credits { get; private set; }
    public Student(string name) { Name = name; }
    public void Enrol(int credits) { Credits += credits; }
    public override string ToString() => $"{Name} ({Credits} credits)";
}`,
`namespace School;

public interface IReport { string Report(); }

public class Course : IReport
{
    private readonly List<Student> students = new();
    public string Title { get; }
    public Course(string title) { Title = title; }
    public void Add(Student s) => students.Add(s);
    public string Report() => $"{Title}: {string.Join(", ", students)}";
}`,
`using School;

var ada = new Student("Ada");
ada.Enrol(15);
var pdp = new Course("PDP");
pdp.Add(ada);
Console.WriteLine(pdp.Report());
Console.WriteLine(ada.GetType().FullName);`,
`using School;

static class StudentExtensions { public static bool IsFullTime(this Student s) => s.Credits >= 12; }
partial class Helpers { public static string Tag = "partial part 1"; }
Console.WriteLine(new Student("Bo").IsFullTime());`,
`partial class Helpers { public static string Other = "partial part 2"; }
Console.WriteLine(Helpers.Tag + " + " + Helpers.Other);`,
`using School;
var s = new Student("Cy");
s.Enrol(30);
if (s.Credits > 20) throw new InvalidOperationException($"{s} is over the limit");`,
];
const cases = [
  ['college, declarations only (replay=false)', college, [0, 1, 2, 3], false, true],
  ['college, replay=true', college, [0, 1, 2, 3], true, true],
  ['college, lastWins=false (duplicate class)', college, [2], false, false],
  ['collegeB (namespaces, interface, extension, partial)', collegeB, [0, 1, 2, 3, 4, 5], false, true],
  ['rerun earlier cell after a later redefinition', college, [2, 1], false, true],
  ['random differs on every replay', [`var seed = new Random().Next(1000);\nConsole.WriteLine("cell1 says " + seed);`, `Console.WriteLine("cell2 sees " + seed);`], [1, 1, 1], true, true],
  ['stdin is consumed by replayed cells', [`var name = Console.ReadLine();`, `var age = Console.ReadLine();\nConsole.WriteLine($"{name} is {age}");`], [1], true, true],
  ['error in an earlier declaration breaks later cells', [`class Broken { public int X = "oops"; }`, `Console.WriteLine("unrelated");`], [1], false, true],
  ['usings are per cell; global using carries', [`using System.Text;\nclass A { public StringBuilder B = new(); }`, `var sb = new StringBuilder();`, `global using System.Text;`, `var sb = new StringBuilder("ok");\nConsole.WriteLine(sb);`], [1, 3], false, true],
  ['Main written by the student', [`class Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Main ran");\n    }\n}`], [0], false, true],
  ['Main written by the student, then a statement cell', [`class Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Main ran");\n    }\n}`, `Console.WriteLine("statements ran");`], [1], false, true],
  ['contrast: script-only forms in a regular program', [`int counter;\ncounter++;`, `private int hidden = 3;`, `static void Main() { }\nConsole.WriteLine("x");`, `class Dog { }\nConsole.WriteLine(new Dog());`], [0, 1, 2, 3], false, true],
  ['variable from an earlier statement cell', [`int count = 3;`, `Console.WriteLine(count);`], [1], false, true],
];
const srv = await serve(root, port);
const browser = await chromium.launch();
const { page } = await openPage(browser, srv.url);
for (const [name, cells, runs, replay, lastWins] of cases) {
  if (filter && !name.includes(filter)) continue;
  console.log(`\n##### ${name}  (replay=${replay}, lastWins=${lastWins})`);
  for (const current of runs) {
    const r = await page.evaluate(async ([cells, current, replay, lastWins]) => {
      const t0 = performance.now();
      const ids = cells.map((_, i) => 'cell' + (i + 1));
      const a = await window.runner.invoke('NotebookAssemble', [ids, cells, current, replay, lastWins]);
      const t1 = performance.now();
      const res = await window.runner.run(a.names.map((n, i) => ({ name: n, text: a.texts[i] })), 'Ada\n21\n', { timeoutMs: 20000 });
      res.assembleMs = Math.round(t1 - t0); res.runMs = Math.round(performance.now() - t1);
      res.notes = a.notes; res.files = a.names;
      if (replay && res.stdout) { const parts = res.stdout.split('\u0001'); const k = parts.indexOf(ids[current]); res.allStdout = res.stdout.replace(/\u0001/g, '|'); res.stdout = k >= 0 ? parts.slice(k + 1).join('') : res.stdout; }
      return res;
    }, [cells, current, replay, lastWins]);
    console.log(`--- run cell${current + 1}: ${r.phase} ok=${r.ok}  assemble ${r.assembleMs} ms, compile+run ${r.runMs} ms; files ${r.files.join(' ')}`);
    for (const n of r.notes) console.log('    note: ' + n);
    for (const d of r.diagnostics || []) console.log(`    ${d.severity} ${d.id} ${d.file}:${d.line}:${d.col} ${d.message}`);
    if (r.stdout) console.log('    stdout: ' + JSON.stringify(r.stdout));
    if (r.allStdout) console.log('    (whole replay stdout: ' + JSON.stringify(r.allStdout) + ')');
    if (r.stderr) console.log('    stderr: ' + JSON.stringify(r.stderr));
  }
}
await browser.close(); srv.stop();
