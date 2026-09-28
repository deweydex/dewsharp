// tools/check-lessons.mjs on the fixture lesson (it must pass as recorded) and on lessons made to fail in
// each way the checker knows. Needs an engine build.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkLessons } from '../../tools/check-lessons.mjs';

const fixtures = fileURLToPath(new URL('../fixtures/lessons/', import.meta.url));
const quiet = () => {};

test('the fixture lesson and its practice page pass, as recorded', async () => {
  const t0 = Date.now();
  const { problems, pages, runs } = await checkLessons({ lessonsDir: fixtures, log: quiet });
  assert.deepEqual(problems, []);
  assert.equal(pages, 2);
  assert.ok(runs >= 20, `${runs} runs`);
  console.log(`# checker on the fixture: ${pages} pages, ${runs} runs, ${((Date.now() - t0) / 1000).toFixed(1)} s including the browser's start`);
});

test('the checker reports parser errors, unmet expect:, failing solutions, a predict about a missing line and changed outputs', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dewsharp-check-'));
  const fence = '```';
  const page = (id, body) => { fs.mkdirSync(path.join(dir, id)); fs.writeFileSync(path.join(dir, id, id + '.md'), `---\ntitle: "${id}: a test"\nversion: 2026.09.27.1\n---\n\n${body}`); };
  page('broken', `${fence}csharp exec\nConsole.WriteLine(1);\n${fence}\n`);
  page('wrong', [
    `${fence}csharp exec\nid: meant-to-fail-1\nexpect: CS0103\nConsole.WriteLine("it compiles");\n${fence}`,
    `${fence}csharp exec\nid: fails-1\nConsole.WriteLine(nope);\n${fence}`,
    `${fence}csharp exec\nid: task-1\nint Half(int n) => 0;\n${fence}`,
    `${fence}inputs\nHalf(4)\nHalf(1) / 0\n${fence}`,
    `${fence}solution\nint Half(int n) => n / 2;\n${fence}`,
    `${fence}csharp exec\nid: changes-1\nConsole.WriteLine("now");\n${fence}`,
    // A blank "your turn": the cell is empty, and its solution must still run.
    `${fence}csharp exec\nid: blank-1\n// Your code here\n${fence}`,
    `${fence}solution\nConsole.WriteLine(blank);\n${fence}`,
    'The [next page](lesson:no-such-page) is not written yet, and [this one](lesson:wrong) is.',
    // A challenge opens alone in a notebook, so it can't use a method from a cell above it.
    `${fence}csharp challenge\nConsole.WriteLine(Twice(4));\n${fence}`,
    // A predict about the third line of a two-line output; the second asks about a line that is there.
    `${fence}csharp exec\nid: two-lines-1\nConsole.WriteLine(1);\nConsole.WriteLine(2);\n${fence}`,
    `${fence}predict\ntype: number\n\nWhat will the third line print?\n${fence}`,
    `${fence}csharp exec\nid: two-lines-2\nConsole.WriteLine(1);\nConsole.WriteLine(2);\n${fence}`,
    `${fence}predict\ntype: number\n\nWhat will the second line print?\n${fence}`,
    // Compare runs with no input, so a cell that reads input can't have inputs.
    `${fence}csharp exec\nid: asks-1\nstring name = Console.ReadLine();\nint Twice(int n) => n * 2;\nConsole.WriteLine(name);\n${fence}`,
    `${fence}inputs\nTwice(2)\n${fence}`,
  ].join('\n\n'));
  const courses = path.join(dir, '..', path.basename(dir) + '-courses');
  fs.mkdirSync(courses);
  fs.writeFileSync(path.join(courses, 'c.yaml'), 'title: C\ncode: X\ncard: c\ndescription: d\ncontents:\n- title: S\n  lessons: [wrong, later, missing]\nplanned:\n  later: "Later: a lesson not written yet"\n');
  fs.writeFileSync(path.join(dir, 'wrong', 'wrong.outputs.json'), JSON.stringify({ page: 'wrong', version: '2026.09.27.1', cells: { 'changes-1': { kind: 'program', outcome: 'ok', output: 'then\n' } } }));
  const { problems } = await checkLessons({ lessonsDir: dir, coursesDir: courses, log: quiet });
  const text = problems.map(p => `${p.where}: ${p.message}`).join('\n');
  assert.match(text, /broken\.md:\d+: A cell needs an id/);
  assert.match(text, /meant-to-fail-1: expect: CS0103, but it compiled and ran/);
  assert.match(text, /fails-1: it has no expect: header.*did not compile \(CS0103/);
  assert.match(text, /solution 1: the input Half\(1\) \/ 0 gave DivideByZeroException/);
  assert.match(text, /changes-1: output differs/);
  assert.match(text, /meant-to-fail-1: not recorded/);
  assert.match(text, /blank-1, solution 1: a solution must compile and run, but it did not compile \(CS0103/);
  assert.match(text, /wrong\.md:\d+: The link to lesson:no-such-page goes nowhere/);
  assert.match(text, /wrong\.md:\d+: challenge 1: a challenge must compile on its own, as it does in a new notebook, but it did not compile \(CS0103/);
  assert.match(text, /two-lines-1: the predict block asks about line 3, but the output has 2 line\(s\)/);
  assert.doesNotMatch(text, /two-lines-2: the predict/);
  assert.match(text, /asks-1: this cell reads input, so it can't have an inputs block/);
  assert.doesNotMatch(text, /lesson:wrong goes nowhere/);
  assert.match(text, /c\.yaml:1: The course lists "missing", but/);
  assert.doesNotMatch(text, /The course lists "(wrong|later)"/);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.rmSync(courses, { recursive: true, force: true });
});
