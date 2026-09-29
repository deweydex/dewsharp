// The eight traps of planning/evidence/spike_a.md ("Fixes that were required"), each with a regression test,
// plus culture, the Console shim, Environment.Exit and a stack overflow. Needs an engine build.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { launch, openRunner, run, runCode, cellsOf } from './helpers.mjs';

let env, page;
before(async () => { env = await launch(); ({ page } = await openRunner(env)); });
after(async () => { await env?.close(); });

test('trap 1: Roslyn compiles against embedded reference assemblies (Webcil)', async () => {
  const r = await runCode(page, 'var names = new List<string> { "Ada", "Grace" };\nConsole.WriteLine(string.Join(", ", names.Where(n => n.Length > 3)));');
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.output, 'Grace\n');
});

test('trap 2: a program with a PDB emits (no "Cannot wait on monitors"), across several cells', async () => {
  const r = await run(page, { cells: cellsOf('public class Student\n{\n    public string Name { get; set; } = "";\n}', 'var s = new Student { Name = "Ada" };\nConsole.WriteLine(s.Name);'), stdin: '' });
  assert.equal(r.result.outcome, 'ok', JSON.stringify(r.result));
  assert.equal(r.output, 'Ada\n');
});

test('trap 3: Console.In works (Console.In.ReadLine and Console.ReadLine)', async () => {
  const r = await runCode(page, 'Console.WriteLine(Console.In.ReadLine());\nConsole.WriteLine(Console.ReadLine());', { stdin: 'one\ntwo\n' });
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.output, 'one\none\ntwo\ntwo\n');
});

test('trap 4: async Main and top-level await', async () => {
  let r = await runCode(page, 'Console.WriteLine("a");\nawait Task.Delay(5);\nConsole.WriteLine("b");');
  assert.equal(r.output, 'a\nb\n');
  r = await runCode(page, 'class Starter\n{\n    static async Task<int> Main(string[] args)\n    {\n        await Task.Delay(5);\n        Console.WriteLine($"async Main, args={args.Length}");\n        return 3;\n    }\n}');
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.output, 'async Main, args=0\n');
  assert.equal(r.result.exitCode, 3);
});

test('trap 5: exception messages are words, not resource keys', async () => {
  const r = await runCode(page, 'var list = new List<int> { 1 };\nConsole.WriteLine(list.First(x => x > 1));');
  assert.equal(r.result.outcome, 'exception');
  assert.equal(r.result.exception.type, 'System.InvalidOperationException');
  assert.equal(r.result.exception.message, 'Sequence contains no matching element');
});

test('trap 6: exception frames name the cell and the line, learner code only', async () => {
  const r = await run(page, {
    cells: cellsOf('public class Course\n{\n    public void Enrol(string name)\n    {\n        throw new InvalidOperationException($"{name} is already enrolled");\n    }\n}',
      'var course = new Course();\nConsole.WriteLine("before");\ncourse.Enrol("Ada");'), stdin: '',
  });
  assert.equal(r.result.outcome, 'exception');
  assert.equal(r.output, 'before\n');
  assert.deepEqual(r.result.exception.frames, [
    { cellId: 'cell-1', file: 'Course.cs', line: 5, member: 'Course.Enrol(string)' },
    { cellId: 'cell-2', file: 'Program.cs', line: 3, member: null },
  ]);
});

test('trap 7: the runtime is not trimmed (System.Text.Json, Regex, PriorityQueue)', async () => {
  const r = await runCode(page, [
    'using System.Text.RegularExpressions;',
    'Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(new { a = 1, b = "x" }));',
    'Console.WriteLine(Regex.Replace("a1b22", @"\\d+", "#"));',
    'var queue = new PriorityQueue<string, int>();',
    'queue.Enqueue("low", 5); queue.Enqueue("high", 1);',
    'Console.WriteLine(queue.Dequeue());',
  ].join('\n'));
  assert.equal(r.result.outcome, 'ok', JSON.stringify(r.result));
  assert.equal(r.output, '{"a":1,"b":"x"}\na#b#\nhigh\n');
});

test('trap 8: output from a timer of an earlier run does not reach a later run', async () => {
  await runCode(page, 'var timer = new System.Threading.Timer(_ => Console.WriteLine("TIMER from run 1"), null, 300, System.Threading.Timeout.Infinite);\n_ = Task.Run(async () => { await Task.Delay(400); Console.WriteLine("DELAY from run 1"); });\nConsole.WriteLine("run 1 done");\nGC.KeepAlive(timer);');
  const r = await runCode(page, 'Console.WriteLine("run 2 start");\nawait Task.Delay(800);\nConsole.WriteLine("run 2 end");');
  assert.equal(r.output, 'run 2 start\nrun 2 end\n');
});

test('statics start again on every run', async () => {
  const code = 'public static class Counter { public static int Runs; }';
  for (let i = 0; i < 2; i++) {
    const r = await run(page, { cells: cellsOf(code, 'Counter.Runs++;\nConsole.WriteLine(Counter.Runs);'), stdin: '' });
    assert.equal(r.output, '1\n');
  }
});

test('culture is en-IE: euro, day/month dates', async () => {
  const r = await runCode(page, 'Console.WriteLine(12.5.ToString("C"));\nConsole.WriteLine(new DateTime(2026, 9, 3).ToShortDateString());\nConsole.WriteLine($"{1234.5:N1}");\nConsole.WriteLine(System.Globalization.CultureInfo.CurrentCulture.Name);');
  assert.equal(r.output, '€12.50\n03/09/2026\n1,234.5\nen-IE\n');
});

test('Console shim: Clear, colours, ResetColor and ReadKey work on the page', async () => {
  const r = await runCode(page, [
    'Console.WriteLine("gone");',
    'Console.Clear();',
    'Console.ForegroundColor = ConsoleColor.Red;',
    'Console.WriteLine("red");',
    'Console.BackgroundColor = ConsoleColor.Blue;',
    'Console.ResetColor();',
    'Console.WriteLine(Console.ForegroundColor);',
    'ConsoleKeyInfo key = Console.ReadKey();',
    'Console.WriteLine($"{key.KeyChar} {key.Key}");',
    'Console.WriteLine(Console.ReadKey(true).Key);',
    'Console.WriteLine(Console.ReadKey().Key);',
  ].join('\n'), { stdin: 'yes\nQ\n' });
  assert.equal(r.result.outcome, 'ok', JSON.stringify(r.result));
  const kinds = r.chunks.map(c => c.kind === 'style' ? `style:${c.style.fg}/${c.style.bg}` : c.kind);
  assert.deepEqual(kinds.slice(0, 5), ['out', 'clear', 'style:Red/null', 'out', 'style:Red/Blue']);
  assert.ok(kinds.includes('style:null/null'));
  assert.equal(r.output, 'gone\n\fred\nGray\nyes\ny Y\nQ\nQ\nEnter\n');
});

test('Console shim: ordinary Console calls still compile and behave', async () => {
  const r = await runCode(page, [
    'Console.Write("{0} + {1} = {2}\\n", 1, 2, 3);',
    'Console.WriteLine("{0,-5}|", "ab");',
    'Console.Out.WriteLine("out");',
    'TextWriter writer = Console.Out;',
    'writer.Write(\'c\');',
    'Console.WriteLine();',
    'Console.Error.WriteLine("err");',
    'string line = Console.ReadLine();',
    'Console.WriteLine(line.ToUpper());',
    'int n = int.Parse(Console.ReadLine());',
    'Console.WriteLine(n * 2);',
    'Console.WriteLine(Console.ReadLine() == null);',
    'using static System.Console;',
    'WriteLine("static");',
  ].join('\n'), { stdin: 'hi\n21\n' });
  assert.equal(r.result.outcome, 'compile-error');   // a using directive must come first: the compiler says so
  assert.equal(r.result.diagnostics[0].code, 'CS1529');
  const ok = await runCode(page, [
    'using static System.Console;',
    'Console.Write("{0} + {1} = {2}\\n", 1, 2, 3);',
    'Console.WriteLine("{0,-5}|", "ab");',
    'Console.Out.WriteLine("out");',
    'TextWriter writer = Console.Out;',
    'writer.Write(\'c\');',
    'Console.WriteLine();',
    'Console.Error.WriteLine("err");',
    'string line = Console.ReadLine();',
    'Console.WriteLine(line.ToUpper());',
    'int n = int.Parse(Console.ReadLine());',
    'Console.WriteLine(n * 2);',
    'Console.WriteLine(Console.ReadLine() == null);',
    'WriteLine("static");',
    'Console.WriteLine(Environment.NewLine == "\\n");',
  ].join('\n'), { stdin: 'hi\n21\n' });
  assert.equal(ok.result.outcome, 'ok', JSON.stringify(ok.result.diagnostics));
  assert.equal(ok.output, '1 + 2 = 3\nab   |\nout\nc\nerr\nhi\nHI\n21\n42\nTrue\nstatic\nTrue\n');
  assert.deepEqual(ok.chunks.filter(c => c.kind === 'err').map(c => c.text), ['err\n']);
  assert.deepEqual(ok.chunks.filter(c => c.kind === 'echo').map(c => c.text), ['hi\n', '21\n']);
});

test('Environment.Exit ends the run with its exit code, and keeps the output', async () => {
  let r = await runCode(page, 'Console.WriteLine("bye");\nConsole.Write("partial");\nEnvironment.Exit(4);\nConsole.WriteLine("not here");');
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.result.exitCode, 4);
  assert.equal(r.output, 'bye\npartial');
  r = await runCode(page, 'try\n{\n    Environment.Exit(2);\n}\ncatch (Exception)\n{\n    Console.WriteLine("caught");\n}');
  assert.equal(r.result.exitCode, 2);
  assert.equal(r.output, '');
  r = await runCode(page, 'Console.WriteLine("full name");\nSystem.Environment.Exit(5);');
  assert.equal(r.result.outcome, 'ok');
  assert.equal(r.result.exitCode, 5);
  assert.equal(r.output, 'full name\n');
  r = await runCode(page, 'Console.WriteLine(Environment.SpecialFolder.Desktop);');
  assert.equal(r.output, 'Desktop\n');
});

test('a stack overflow is an exception that names the member, and the next run works', async () => {
  const r = await run(page, {
    cells: cellsOf('public class Hero\n{\n    public string Name\n    {\n        get => Name;\n        set => Name = value;\n    }\n}', 'Console.WriteLine("start");\nHero hero = new Hero();\nhero.Name = "Ada";'), stdin: '',
  });
  assert.equal(r.result.outcome, 'exception');
  assert.equal(r.result.exception.type, 'System.StackOverflowException');
  assert.equal(r.output, 'start\n');
  assert.deepEqual(r.result.exception.frames[0], { cellId: 'cell-1', file: 'Hero.cs', line: null, member: 'Hero.Name' });
  const next = await runCode(page, 'Console.WriteLine("alive");');
  assert.equal(next.output, 'alive\n');
});

test('a frame names an array parameter as C# writes it: int[,] and int[][] keep their shape', async () => {
  const r = await runCode(page, 'void Show(int[,] grid, int[][] rows) { throw new Exception("x"); }\nShow(new int[2, 2], new int[1][]);');
  assert.equal(r.result.outcome, 'exception');
  assert.equal(r.result.exception.frames[0].member, 'Show(int[,], int[][])');
});
