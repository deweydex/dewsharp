// The rules of the road (CLAUDE.md), check mode, classify, diagnostics and the comparison's inputs, plus the
// "Model B" scenarios of the notebook prototype (planning/spikes/spike-notebook/tools/modelB.mjs).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { launch, openRunner, run, runCode, cellsOf } from './helpers.mjs';

let env, page;
before(async () => { env = await launch(); ({ page } = await openRunner(env)); });
after(async () => { await env?.close(); });

const errors = (r) => r.result.diagnostics.filter(d => d.severity === 'error');

test('rule 2: a class from a cell above can be used below; rule 3: its statements are not run', async () => {
  const r = await run(page, { cells: cellsOf('Console.WriteLine("never printed");\npublic class Planet\n{\n    public string Name = "Mars";\n}', 'Console.WriteLine(new Planet().Name);'), stdin: '' });
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.output, 'Mars\n');
  assert.deepEqual(r.result.kind, { 'cell-1': 'program', 'cell-2': 'program' });
});

test('rule 3: variables stay in their cell, and the message says so', async () => {
  const r = await run(page, { cells: cellsOf('int count = 3;', 'Console.WriteLine(count);'), stdin: '' });
  assert.equal(r.result.outcome, 'compile-error');
  const [d] = errors(r);
  assert.equal(d.code, 'CS0103');
  assert.deepEqual([d.cellId, d.file, d.line, d.column, d.endLine, d.endColumn], ['cell-2', 'Program.cs', 1, 19, 1, 24]);
  assert.match(d.help, /count was made in a cell above/);
});

test('rule 4: the last declaration of a class wins, for the cells below it', async () => {
  const planet = (name) => `public class Planet\n{\n    public string Name = "${name}";\n}`;
  let r = await run(page, { cells: cellsOf(planet('Mars'), planet('Venus'), 'Console.WriteLine(new Planet().Name);'), stdin: '' });
  assert.equal(r.output, 'Venus\n');
  assert.deepEqual(r.result.replaced, [{ type: 'Planet', cellId: 'cell-1', by: 'cell-2' }]);
  // The cell between them still sees the first one.
  r = await run(page, { cells: cellsOf(planet('Mars'), 'Console.WriteLine(new Planet().Name);'), stdin: '' });
  assert.equal(r.output, 'Mars\n');
  // A class written again in the cell being run replaces the one above.
  r = await run(page, { cells: cellsOf(planet('Mars'), 'Console.WriteLine(new Planet().Name);\n' + planet('Earth')), stdin: '' });
  assert.equal(r.output, 'Earth\n');
  // Statements after a class are an error in C# itself (CS8803), and the engine reports it as C# would.
  r = await run(page, { cells: cellsOf(planet('Earth') + '\nConsole.WriteLine(new Planet().Name);'), stdin: '' });
  assert.equal(errors(r)[0].code, 'CS8803');
});

test('rule 5: a class with Main stays in its cell; a Main in the cell being run is the entry point', async () => {
  const withMain = 'class Hello\n{\n    static void Main()\n    {\n        Console.WriteLine("Main ran");\n    }\n}';
  let r = await run(page, { cells: cellsOf(withMain, 'Console.WriteLine("statements ran");'), stdin: '' });
  assert.equal(r.output, 'statements ran\n');
  r = await runCode(page, withMain);
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.output, 'Main ran\n');
  assert.deepEqual(r.result.kind, { 'cell-1': 'program' });
});

test('a class named Program: the error says what to do', async () => {
  const r = await run(page, { cells: cellsOf('public class Program\n{\n    public int Score;\n}', 'Console.WriteLine("hi");'), stdin: '' });
  assert.equal(r.result.outcome, 'compile-error');
  const [d] = errors(r);
  assert.equal(d.cellId, 'cell-1');
  assert.match(d.help, /Give your class a name other than Program/);
});

test('an error in a cell above is reported in that cell', async () => {
  const r = await run(page, { cells: cellsOf('public class Broken\n{\n    public int X = "oops";\n}', 'Console.WriteLine("unrelated");'), stdin: '' });
  assert.equal(r.result.outcome, 'compile-error');
  const [d] = errors(r);
  assert.deepEqual([d.code, d.cellId, d.file, d.line], ['CS0029', 'cell-1', 'Broken.cs', 3]);
});

test('file names: from the header, the first type, or Program.cs', async () => {
  const r = await run(page, { cells: [
    { id: 'a', code: 'public enum Size { Small, Large }\npublic class Box { }' },
    { id: 'b', file: 'Shapes.cs', code: 'public record Circle(double Radius);' },
    { id: 'c', code: 'Console.WriteLine(new Circle(2) with { Radius = 3 });' },
  ], stdin: '' });
  assert.deepEqual(r.result.files, { a: 'Size.cs', b: 'Shapes.cs', c: 'Program.cs' });
  assert.equal(r.output, 'Circle { Radius = 3 }\n');
});

test('warnings are reported as warnings and do not stop the run', async () => {
  const r = await runCode(page, 'int unused = 3;\nConsole.WriteLine("ok");');
  assert.equal(r.result.outcome, 'ok');
  assert.deepEqual(r.result.diagnostics.map(d => [d.severity, d.code, d.line, d.column]), [['warning', 'CS0219', 1, 5]]);
});

test('nullable reference types are off; C# 14 is on', async () => {
  let r = await runCode(page, 'string name = null;\nConsole.WriteLine(name == null);');
  assert.deepEqual(r.result.diagnostics, []);
  // C# 14: the field keyword and extension members.
  r = await run(page, { cells: cellsOf(
    'public class Temperature\n{\n    public int Celsius\n    {\n        get;\n        set => field = Math.Max(value, -273);\n    }\n}',
    'public static class Words\n{\n    extension(string text)\n    {\n        public int WordCount => text.Split(\' \').Length;\n    }\n}',
    'Console.WriteLine(new Temperature { Celsius = -500 }.Celsius);\nConsole.WriteLine("two words".WordCount);'), stdin: '' });
  assert.equal(r.result.outcome, 'ok', JSON.stringify(r.result.diagnostics));
  assert.equal(r.output, '-273\n2\n');
});

test('check mode compiles and never runs; a types cell compiles as a library', async () => {
  let r = await run(page, { cells: cellsOf('public class Planet\n{\n    public string Name = 5;\n}'), mode: 'check' });
  assert.equal(r.result.outcome, 'compile-error');
  assert.equal(errors(r)[0].code, 'CS0029');
  r = await run(page, { cells: cellsOf('public class Planet\n{\n    public string Name = "Mars";\n}'), mode: 'check' });
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.result.ran, false);
  r = await run(page, { cells: cellsOf('Console.WriteLine("must not print");'), mode: 'check' });
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.output, '');
  assert.equal(r.result.ran, false);
});

test('classify is syntax only: types, program, empty', async () => {
  const kinds = await page.evaluate(() => window.runner.classify([
    { id: 'a', code: 'public class A { }' },
    { id: 'b', code: '// only a comment\n' },
    { id: 'c', code: 'int x = 1;' },
    { id: 'd', code: 'class B\n{\n    static void Main() { }\n}' },
    { id: 'e', code: 'namespace School;\npublic interface IReport { string Report(); }' },
    { id: 'f', code: 'using System.Text;' },
    { id: 'g', code: 'Console.WriteLine(nope' },
  ]));
  assert.deepEqual(kinds, { a: 'types', b: 'empty', c: 'program', d: 'program', e: 'types', f: 'types', g: 'program' });
});

test('inputs: one value per input, a compile error in one input stays in that input', async () => {
  const cell = 'int Total(List<int> values)\n{\n    int total = 0;\n    foreach (int value in values) total += value;\n    return total;\n}\nint start = 1;';
  const inputs = ['Total(new List<int> { 4, 8 })', 'Total(null)', 'Nope(3)', 'start + 1', '"a" + start', 'new[] { 1, 2 }', 'Total(new List<int>', '12.5', "'x'", 'true', 'new Dictionary<string, int> { ["a"] = 1 }', '(1, "b")'];
  const r = await run(page, { cells: cellsOf(cell), inputs, stdin: '' });
  assert.equal(r.result.outcome, 'ok');
  assert.deepEqual(r.result.diagnostics, []);
  const shown = r.result.values.map(v => v.ok ? v.display : `${v.kind}:${v.error}`);
  assert.deepEqual(shown, ['12', 'exception:NullReferenceException', 'compile-error:CS0103', '2', '"a1"', '[1, 2]', 'compile-error:CS1526', '12.5', "'x'", 'true', '{ ["a"] = 1 }', '(1, "b")']);
});

test('inputs: a solution and a learner cell give two tables to compare', async () => {
  const inputs = ['Double(2)', 'Double(-1)'];
  const mine = await run(page, { cells: cellsOf('int Double(int n) => n + n;'), inputs, stdin: '' });
  const theirs = await run(page, { cells: cellsOf('int Double(int n) => n * 2;'), inputs, stdin: '' });
  assert.deepEqual(mine.result.values.map(v => v.display), theirs.result.values.map(v => v.display));
  const broken = await run(page, { cells: cellsOf('int Double(int n) => n * ;'), inputs, stdin: '' });
  assert.equal(broken.result.outcome, 'compile-error');
  assert.deepEqual(broken.result.values.map(v => v.kind), ['not-run', 'not-run']);
});

test('inputs: a types cell, a Main cell, and output printed by the cell itself', async () => {
  let r = await run(page, { cells: cellsOf('public static class Stats\n{\n    public static int Twice(int n) => n * 2;\n}'), inputs: ['Stats.Twice(4)', 'Stats.Nope()'], stdin: '' });
  assert.deepEqual(r.result.values.map(v => v.ok ? v.display : v.error), ['8', 'CS0117']);
  r = await run(page, { cells: cellsOf('class Hello\n{\n    static void Main()\n    {\n        Console.WriteLine("Main ran");\n    }\n\n    public static int Three() => 3;\n}'), inputs: ['Hello.Three()'], stdin: '' });
  assert.deepEqual(r.result.values.map(v => v.display), ['3']);
  r = await run(page, { cells: cellsOf('Console.WriteLine("hello");\nint Half(int n) => n / 2;'), inputs: ['Half(5)', 'Half(0) / 0'], stdin: '' });
  assert.equal(r.output, 'hello\n');
  assert.deepEqual(r.result.values.map(v => v.ok ? v.display : v.error), ['2', 'DivideByZeroException']);
});

test('Model B: namespaces, an interface, an extension method and a partial class across cells', async () => {
  const cells = cellsOf(
    'namespace School;\n\npublic class Student\n{\n    public string Name { get; }\n    public int Credits { get; private set; }\n    public Student(string name) { Name = name; }\n    public void Enrol(int credits) { Credits += credits; }\n    public override string ToString() => $"{Name} ({Credits} credits)";\n}',
    'namespace School;\n\npublic interface IReport { string Report(); }\n\npublic class Course : IReport\n{\n    private readonly List<Student> students = new();\n    public string Title { get; }\n    public Course(string title) { Title = title; }\n    public void Add(Student s) => students.Add(s);\n    public string Report() => $"{Title}: {string.Join(", ", students)}";\n}',
    'using School;\n\nvar ada = new Student("Ada");\nada.Enrol(15);\nvar pdp = new Course("PDP");\npdp.Add(ada);\nConsole.WriteLine(pdp.Report());\nConsole.WriteLine(ada.GetType().FullName);',
    'using School;\n\nConsole.WriteLine(new Student("Bo").IsFullTime());\n\nstatic class StudentExtensions { public static bool IsFullTime(this Student s) => s.Credits >= 12; }\npartial class Helpers { public static string Tag = "partial part 1"; }',
    'Console.WriteLine(Helpers.Tag + " + " + Helpers.Other);\n\npartial class Helpers { public static string Other = "partial part 2"; }',
  );
  let r = await run(page, { cells: cells.slice(0, 3), stdin: '' });
  assert.equal(r.output, 'PDP: Ada (15 credits)\nSchool.Student\n');
  r = await run(page, { cells: cells.slice(0, 4), stdin: '' });
  assert.equal(r.output, 'False\n');
  r = await run(page, { cells: cells.slice(0, 5), stdin: '' });
  assert.equal(r.output, 'partial part 1 + partial part 2\n');
});

test('Model B: a global using in a cell above carries; a plain using does not', async () => {
  let r = await run(page, { cells: cellsOf('using System.Text;\npublic class A { public StringBuilder B = new(); }', 'var sb = new StringBuilder();'), stdin: '' });
  assert.equal(errors(r)[0].code, 'CS0246');
  r = await run(page, { cells: cellsOf('global using System.Text;', 'var sb = new StringBuilder("ok");\nConsole.WriteLine(sb);'), stdin: '' });
  assert.equal(r.output, 'ok\n');
});

test('Model B: forms only C# script allows are errors in a program', async () => {
  const r = await runCode(page, 'private int hidden = 3;\nConsole.WriteLine("x");');
  assert.equal(r.result.outcome, 'compile-error');
});
