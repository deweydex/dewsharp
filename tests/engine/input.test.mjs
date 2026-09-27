// Live input, typed-ahead input, the three kinds of Stop, the timeout and a flood of output: the scenarios of
// the input prototype (planning/spikes/spike-input/tools/input.mjs), on the merged engine.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { launch, openRunner, run, runCode, cellsOf } from './helpers.mjs';

let env, page;
before(async () => { env = await launch(); ({ page } = await openRunner(env)); });
after(async () => { await env?.close(); });

const greeting = 'Console.Write("What is your name? ");\nstring name = Console.ReadLine();\nConsole.Write("How old are you? ");\nint age = int.Parse(Console.ReadLine());\nConsole.WriteLine($"Hello, {name}! Next year you will be {age + 1}.");';

test('live input: each prompt is on screen before the program waits, and typed lines are echoed', async () => {
  assert.equal(await page.evaluate(() => window.runner.liveInput), true);
  const r = await run(page, { cells: cellsOf(greeting), answers: ['Ada', '21'] });
  assert.equal(r.result.outcome, 'ok');
  assert.deepEqual(r.prompts, ['What is your name? ', 'What is your name? Ada\nHow old are you? ']);
  assert.equal(r.output, 'What is your name? Ada\nHow old are you? 21\nHello, Ada! Next year you will be 22.\n');
  assert.deepEqual(r.chunks.filter(c => c.kind === 'echo').map(c => c.text), ['Ada\n', '21\n']);
});

test('live input: the page keeps drawing while the program waits', async () => {
  const frames = await page.evaluate(async (code) => {
    const job = window.runner.run({ cells: [{ id: 'g', code }], onOutput() {}, onInputRequest() {} });
    await new Promise(r => setTimeout(r, 300));
    const n = await new Promise(r => { let k = 0; const t = performance.now(); const f = () => { k++; performance.now() - t < 500 ? requestAnimationFrame(f) : r(k); }; requestAnimationFrame(f); });
    job.stop();
    await job.done;
    return n;
  }, greeting);
  assert.ok(frames > 10, `only ${frames} frames in 500 ms`);
});

test('a menu loop across two cells: every branch, bad input, and quit', async () => {
  const register = 'namespace College;\n\npublic class Student(string name, int age)\n{\n    public string Name { get; } = name;\n    public int Age { get; } = age;\n    public override string ToString() => $"{Name} ({Age})";\n}\n\npublic class Register\n{\n    private readonly List<Student> _students = new();\n    public void Add(Student s) => _students.Add(s);\n    public void PrintAll()\n    {\n        if (_students.Count == 0) { Console.WriteLine("No students yet."); return; }\n        for (int i = 0; i < _students.Count; i++) Console.WriteLine($"{i + 1}. {_students[i]}");\n    }\n}';
  const menu = 'using College;\n\nvar register = new Register();\nbool running = true;\nwhile (running)\n{\n    Console.WriteLine();\n    Console.WriteLine("1. Add a student");\n    Console.WriteLine("2. List students");\n    Console.WriteLine("3. Quit");\n    Console.Write("Choose an option: ");\n    string choice = Console.ReadLine();\n    switch (choice)\n    {\n        case "1":\n            Console.Write("Name: ");\n            string name = Console.ReadLine() ?? "";\n            int age = ReadInt("Age: ");\n            register.Add(new Student(name, age));\n            Console.WriteLine($"Added {name}.");\n            break;\n        case "2":\n            register.PrintAll();\n            break;\n        case "3":\n            running = false;\n            Console.WriteLine("Goodbye.");\n            break;\n        default:\n            Console.WriteLine($"\'{choice}\' is not an option. Type 1, 2 or 3.");\n            break;\n    }\n}\n\nint ReadInt(string prompt)\n{\n    while (true)\n    {\n        Console.Write(prompt);\n        if (int.TryParse(Console.ReadLine(), out int value)) return value;\n        Console.WriteLine("Please type a whole number.");\n    }\n}';
  const script = ['2', '1', 'Ada', 'twenty', '21', '1', 'Grace', '85', 'x', '2', '3'];
  const r = await run(page, { cells: cellsOf(register, menu), answers: script });
  assert.equal(r.result.outcome, 'ok', JSON.stringify(r.result.diagnostics));
  assert.equal(r.inputRequests, 11);
  for (const s of ['No students yet.', 'Added Ada.', 'Please type a whole number.', 'Added Grace.', "'x' is not an option", '1. Ada (21)', '2. Grace (85)', 'Goodbye.'])
    assert.ok(r.output.includes(s), s);
  assert.ok(r.prompts.every(p => /(option: |Name: |Age: )$/.test(p)), JSON.stringify(r.prompts));
  assert.equal(r.result.timings.inputLines, 11);
});

test('End input: ReadLine gives null, then Read gives -1', async () => {
  const r = await run(page, { cells: cellsOf('int count = 0;\nstring line;\nwhile ((line = Console.ReadLine()) != null) count++;\nConsole.WriteLine($"Read {count} lines, then end of input.");\nConsole.WriteLine(Console.Read());'), answers: ['a', 'b', null] });
  assert.equal(r.output, 'a\nb\nRead 2 lines, then end of input.\n-1\n');
});

test('Console.Read character by character, then ReadLine for the rest', async () => {
  const r = await run(page, { cells: cellsOf('Console.Write("Two letters: ");\nint a = Console.Read();\nint b = Console.Read();\nstring rest = Console.ReadLine();\nConsole.WriteLine($"a={(char)a} b={(char)b} rest=\'{rest}\'");\nConsole.WriteLine($"got \'{Console.ReadLine()}\'");'), answers: ['xyz tail', 'more'] });
  assert.equal(r.output, "Two letters: xyz tail\na=x b=y rest='z tail'\nmore\ngot 'more'\n");
});

test('ReadLine after await, and input that is not ASCII', async () => {
  let r = await run(page, { cells: cellsOf('Console.WriteLine("Loading...");\nawait Task.Delay(100);\nConsole.Write("Name: ");\nstring n = Console.ReadLine();\nawait Task.Delay(20);\nConsole.WriteLine($"Hi {n}");'), answers: ['Mo'] });
  assert.equal(r.output, 'Loading...\nName: Mo\nHi Mo\n');
  r = await run(page, { cells: cellsOf('string s = Console.ReadLine();\nConsole.WriteLine($"{s} ({s.Length})");'), answers: ['héllo 👋 日本'] });
  assert.equal(r.output, 'héllo 👋 日本\nhéllo 👋 日本 (11)\n');
});

test('typed-ahead input (stdin) asks for nothing, and runs out as end of input', async () => {
  const r = await run(page, { cells: cellsOf(greeting + '\nConsole.WriteLine(Console.ReadLine() == null);'), stdin: 'Ada\n21\n' });
  assert.equal(r.inputRequests, 0);
  assert.equal(r.output, 'What is your name? Ada\nHow old are you? 21\nHello, Ada! Next year you will be 22.\nTrue\n');
});

test('Stop, kind 1: while the program waits for input (no restart)', async () => {
  const before = await page.evaluate(() => window.runner.stats.restarts);
  const r = await run(page, { cells: cellsOf(greeting), stopOnInput: true });
  assert.equal(r.result.outcome, 'stopped');
  assert.equal(await page.evaluate(() => window.runner.stats.restarts), before);
  const next = await run(page, { cells: cellsOf(greeting), answers: ['Lin', '30'] });
  assert.ok(next.output.includes('Hello, Lin!'));
});

test('Stop, kind 2: a loop that prints stops by itself within a few milliseconds', async () => {
  const before = await page.evaluate(() => window.runner.stats.restarts);
  const r = await runCode(page, 'long i = 0;\nwhile (true) Console.WriteLine($"count {i++}");', { stopAfterMs: 400 });
  assert.equal(r.result.outcome, 'stopped');
  assert.ok(r.stopToDoneMs < 300, `${r.stopToDoneMs} ms`);
  assert.equal(await page.evaluate(() => window.runner.stats.restarts), before);
  assert.ok(r.output.startsWith('count 0\ncount 1\n'));
});

test('Stop, kind 2b: a loop that catches every exception still stops', async () => {
  const r = await run(page, { cells: cellsOf('while (true)\n{\n    try\n    {\n        Console.Write("Number (or q): ");\n        string s = Console.ReadLine();\n        if (s == "q" || s == null) break;\n        Console.WriteLine(int.Parse(s) * 2);\n    }\n    catch (Exception e) { Console.WriteLine("Oops: " + e.Message); }\n}'), answers: ['4'], stopAfterMs: 600 });
  assert.equal(r.result.outcome, 'stopped');
  assert.ok(r.output.startsWith('Number (or q): 4\n8\nNumber (or q): '), r.output);
  assert.ok(!r.output.includes('Oops'));
});

test('Stop, kind 3: a loop that prints nothing is ended after 750 ms, and the worker is replaced', async () => {
  const before = await page.evaluate(() => window.runner.stats.restarts);
  const r = await runCode(page, 'long i = 0;\nwhile (true) i++;', { stopAfterMs: 300 });
  assert.equal(r.result.outcome, 'stopped');
  assert.ok(r.stopToDoneMs >= 700 && r.stopToDoneMs < 1500, `${r.stopToDoneMs} ms`);
  assert.equal(await page.evaluate(() => window.runner.stats.restarts), before + 1);
  const next = await runCode(page, 'Console.WriteLine("after restart");');
  assert.equal(next.output, 'after restart\n');
});

test('timeout: 30 s of the program\'s own time by default; time spent waiting for input does not count', async () => {
  assert.equal(await page.evaluate(() => window.runner.opts.timeoutMs), 30000);
  let r = await runCode(page, 'long i = 0;\nwhile (true) { i++; if (i % 1000000 == 0) Console.Write(""); }', { timeoutMs: 1000 });
  assert.equal(r.result.outcome, 'timeout');
  r = await run(page, { cells: cellsOf(greeting), answers: ['Slow', '1'], answerDelayMs: 900, timeoutMs: 1000 });
  assert.equal(r.result.outcome, 'ok');
  assert.ok(r.result.timings.inputWaitMs > 1500, JSON.stringify(r.result.timings));
});

test('a flood of output is capped at 1,000,000 characters, with a note at the end', async () => {
  const r = await runCode(page, 'for (int i = 0; i < 2000000; i++) Console.WriteLine("line " + i);\nConsole.WriteLine("end");');
  assert.equal(r.result.outcome, 'ok');
  const last = r.chunks[r.chunks.length - 1];
  assert.equal(last.kind, 'err');
  assert.match(last.text, /more than 1,000,000 characters/);
  assert.equal(r.output.length - last.text.length, 1000000);
  assert.ok(r.chunks.length < 200, `${r.chunks.length} chunks`);
});

test('a prompt written with Console.Write shows while the program works', async () => {
  const seen = await page.evaluate(async () => {
    const chunks = [];
    const job = window.runner.run({ cells: [{ id: 'w', code: 'Console.Write("Working...");\nvar until = DateTime.Now.AddMilliseconds(600);\nwhile (DateTime.Now < until) { }\nConsole.WriteLine(" done");' }], stdin: '', onOutput: c => chunks.push(c.text) });
    await new Promise(r => setTimeout(r, 400));
    const early = chunks.join('');
    await job.done;
    return early;
  });
  assert.equal(seen, 'Working...');
});
