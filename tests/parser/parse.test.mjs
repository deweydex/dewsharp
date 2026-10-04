// Unit tests for web/lesson/parse.js, the one parser of docs/LESSON_FORMAT.md (docs/PARSER.md).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseLesson, parseCourse, cellsOf, cellsInWorld, cellsForRun, splitComment, worldLabel } from '../../web/lesson/parse.js';

const fence = '```';
const FM = '---\ntitle: "A page: for the tests"\nversion: 2026.09.27.1\n---\n';
const WORLDS = '---\ntitle: "A page: for the tests"\nversion: 2026.09.27.1\nworlds:\n  game: A game.\n  sea-floor: The sea floor.\n---\n';
const cell = (id, code = 'Console.WriteLine(1);', headers = '') => `${fence}csharp exec\nid: ${id}\n${headers}${code}\n${fence}\n`;
const messages = (lesson) => lesson.errors.map(e => `${e.line}: ${e.message}`);
const expectError = (source, pattern, options) => {
  const l = parseLesson(source, options);
  assert.ok(l.errors.some(e => pattern.test(e.message)), `expected an error like ${pattern}, got:\n${messages(l).join('\n')}`);
  return l;
};

test('frontmatter: title, version, worlds, covers, from', () => {
  const l = parseLesson(WORLDS + '\n# Hi\n');
  assert.deepEqual(l.errors, []);
  assert.equal(l.frontmatter.title, 'A page: for the tests');
  assert.equal(l.frontmatter.version, '2026.09.27.1');
  assert.deepEqual(l.worlds, [
    { key: 'game', label: 'Game', description: 'A game.' },
    { key: 'sea-floor', label: 'Sea floor', description: 'The sea floor.' },
  ]);
  assert.equal(worldLabel('your-own'), 'Your own');
});

test('frontmatter errors: missing, unclosed, bad YAML, unknown key, bad version, missing title', () => {
  expectError('# no frontmatter\n', /starts with frontmatter/);
  expectError('---\ntitle: x\n', /no closing ---/);
  expectError('---\ntitle: [unclosed\nversion: 1\n---\n', /not valid YAML/);
  expectError('---\ntitle: x\nversion: 2026.09.27.1\nauthor: me\n---\n', /no "author:" key/);
  expectError('---\ntitle: x\nversion: 27/09/2026\n---\n', /dated version/);
  expectError('---\nversion: 2026.09.27.1\n---\n', /needs a title/);
  expectError('---\ntitle: x\nversion: 2026.09.27.1\nworlds:\n  Big World: x\n---\n', /world key "Big World"/);
  expectError('---\ntitle: x\nversion: 2026.09.27.1\ncovers: FOOP-LO1\n---\n', /covers: must be a list/);
});

test('practice pages need practice_for: their lesson', () => {
  expectError(FM, /practice_for: every-feature/, { id: 'every-feature-practice' });
  const ok = parseLesson('---\ntitle: x\nversion: 2026.09.27.1\npractice_for: every-feature\n---\n', { id: 'every-feature-practice' });
  assert.deepEqual(ok.errors, []);
  expectError('---\ntitle: x\nversion: 2026.09.27.1\npractice_for: every-feature\n---\n', /belongs on a practice page/, { id: 'every-feature' });
});

test('a cell: headers, code, line numbers', () => {
  const l = parseLesson(FM + '\nSome text.\n\n' + cell('hello-1', 'Console.WriteLine("a: b");\nConsole.WriteLine(2);', 'hint: Try it.\nfile: Hello.cs\nstdin: "Ada\\n"\n'));
  assert.deepEqual(l.errors, []);
  const [md, c] = l.items;
  assert.deepEqual(md, { type: 'markdown', text: 'Some text.', line: 6, endLine: 6 });
  assert.equal(c.type, 'cell');
  assert.equal(c.id, 'hello-1');
  assert.equal(c.line, 8);
  assert.deepEqual(c.headers, { id: 'hello-1', hint: 'Try it.', file: 'Hello.cs', stdin: '"Ada\\n"' });
  assert.equal(c.stdin, 'Ada\n');
  assert.equal(c.code, 'Console.WriteLine("a: b");\nConsole.WriteLine(2);');
  assert.equal(c.codeLine, 13);
  assert.equal(c.endLine, 15, 'the closing fence');
  assert.deepEqual(c.blocks, { hints: [], predict: null, solutions: [], inputs: null });
});

test('cell errors: missing id, bad id, duplicate id, unknown header, repeated header, bad expect, stdin, file', () => {
  expectError(FM + `${fence}csharp exec\nConsole.WriteLine(1);\n${fence}\n`, /needs an id/);
  expectError(FM + cell('Hello_World'), /small letters, digits and single hyphens/);
  expectError(FM + cell('a-1') + cell('a-1'), /used twice/);
  expectError(FM + cell('a-1', 'x', 'name: thing\n'), /no "name:" header/);
  expectError(FM + cell('a-1', 'x', 'hint: one\nhint: two\n'), /written twice/);
  expectError(FM + cell('a-1', 'x', 'expect: error\n'), /expect: is a compiler error code/);
  expectError(FM + cell('a-1', 'x', 'stdin: Ada\n'), /stdin: must be a JSON string/);
  expectError(FM + cell('a-1', 'x', 'file: Planet.txt\n'), /file: must be a C# file name/);
  expectError(FM + cell('a-1--game'), /only a cell inside a world variant/);
  const ok = parseLesson(FM + cell('a-1', 'x', 'expect: CS0103\n') + cell('a-2', 'y', 'expect: exception\n'));
  assert.deepEqual(cellsOf(ok).map(c => c.expect), [{ outcome: 'compile-error', code: 'CS0103' }, { outcome: 'exception' }]);
});

test('fences: code to read, challenge, unknown tags and languages, unclosed', () => {
  const l = parseLesson(FM + `${fence}csharp\nint x;\n${fence}\n\n${fence}console\nout\n${fence}\n\n${fence}\nplain\n${fence}\n\n${fence}csharp challenge\n// go\n${fence}\n`);
  assert.deepEqual(l.errors, []);
  assert.deepEqual(l.items.map(i => [i.type, i.lang, i.code]), [['readonly', 'csharp', 'int x;'], ['readonly', 'console', 'out'], ['readonly', '', 'plain'], ['challenge', 'csharp', '// go']]);
  expectError(FM + `${fence}python exec\nx = 1\n${fence}\n`, /Only C# cells run/);
  expectError(FM + `${fence}csharp run\nx\n${fence}\n`, /takes "exec" or "challenge"/);
  expectError(FM + `${fence}java\nx\n${fence}\n`, /not a language this site shows/);
  expectError(FM + `${fence}csharp exec\nid: a-1\nx\n`, /never closed/);
  // A longer fence holds a shorter one.
  const nested = parseLesson(FM + '````text\n```csharp exec\nid: not-a-cell\n```\n````\n');
  assert.deepEqual(nested.errors, []);
  assert.equal(nested.items.length, 1);
  assert.equal(nested.items[0].type, 'readonly');
});

test('<details> folds keep their code to read in the Markdown; cells cannot be inside one', () => {
  const l = parseLesson(FM + `<details class="dl-answer"><summary>answer</summary>\n\nText.\n\n${fence}console\nHello!\n${fence}\n\n</details>\n\nAfter.\n`);
  assert.deepEqual(l.errors, []);
  assert.equal(l.items.length, 1);
  assert.equal(l.items[0].type, 'markdown');
  assert.match(l.items[0].text, /^<details[\s\S]*```console\nHello!\n```\n\n<\/details>\n\nAfter\.$/);
  expectError(FM + `<details>\n\n${cell('a-1')}\n</details>\n`, /cell cannot be inside a <details> fold/);
});

test('blocks attach to the cell above, or to the cell named by for:', () => {
  const src = FM + cell('a-1') + `\n${fence}hint\nWhat does line 1 print?\n${fence}\n\n` + cell('a-2') +
    `\n${fence}hint\nfor: a-1\nafter: 3 runs\ntitle: steps\n1. One\n2. Two\n${fence}\n\n${fence}hint\nafter: unsure\nNot sure?\n${fence}\n`;
  const l = parseLesson(src);
  assert.deepEqual(l.errors, []);
  const [a1, a2] = cellsOf(l);
  assert.deepEqual(a1.blocks.hints.map(h => [h.after, h.when, h.title, h.text]), [
    ['1 errors', { signal: 'errors', count: 1 }, null, 'What does line 1 print?'],
    ['3 runs', { signal: 'runs', count: 3 }, 'steps', '1. One\n2. Two'],
  ]);
  assert.deepEqual(a2.blocks.hints.map(h => h.when), [{ signal: 'unsure', count: 1 }]);
  // Blocks are not items: the page draws them with their cell.
  assert.deepEqual(l.items.map(i => i.type), ['cell', 'cell']);
});

test('block errors: no cell above, unknown for:, bad after:, unknown header, empty, a second predict or inputs', () => {
  expectError(FM + `${fence}hint\nx\n${fence}\n`, /no cell above/);
  expectError(FM + cell('a-1') + `${fence}hint\nfor: a-9\nx\n${fence}\n`, /no cell has that id/);
  expectError(FM + cell('a-1') + `${fence}hint\nafter: 5 minutes\nx\n${fence}\n`, /after: is "N errors"/);
  expectError(FM + cell('a-1') + `${fence}solution\nid: x\nint y;\n${fence}\n`, /no "id:" header/);
  expectError(FM + cell('a-1') + `${fence}hint\n${fence}\n`, /hint block is empty/);
  expectError(FM + cell('a-1') + `${fence}inputs\n${fence}\n`, /no expressions/);
  const p = `${fence}predict\ntype: text\n\nWhat?\n${fence}\n`;
  expectError(FM + cell('a-1') + p + p, /already has a predict block/);
  const i = `${fence}inputs\nF(1)\n${fence}\n`;
  expectError(FM + cell('a-1') + i + i, /already has an inputs block/);
  expectError(FM + cell('a-1') + `${fence}hint extra\nx\n${fence}\n`, /takes nothing after its name/);
});

test('predict: choice options with notes, number with tolerance, text', () => {
  const src = FM + cell('a-1') + `${fence}predict\ntype: choice\n\nWhat will the **last** line print?\n\n- 12\n  - The loop adds each day.\n- 4\n- Nothing: it stops with an error\n${fence}\n` +
    cell('a-2') + `${fence}predict\ntype: number\ntolerance: 0.5\n\nHow many?\n${fence}\n` + cell('a-3') + `${fence}predict\ntype: text\n\nWhat?\n${fence}\n`;
  const l = parseLesson(src);
  assert.deepEqual(l.errors, []);
  const [a1, a2, a3] = cellsOf(l).map(c => c.blocks.predict);
  assert.deepEqual(a1, { line: 9, endLine: 18, type: 'choice', tolerance: null, question: 'What will the **last** line print?',
    options: [{ text: '12', note: 'The loop adds each day.' }, { text: '4', note: null }, { text: 'Nothing: it stops with an error', note: null }],
    outputLine: 'last' });
  assert.deepEqual([a2.type, a2.tolerance, a2.question, a2.options, a2.outputLine], ['number', 0.5, 'How many?', [], null]);
  assert.equal(a3.type, 'text');
  expectError(FM + cell('a-1') + `${fence}predict\ntype: choice\n\nWhat?\n\n- only one\n${fence}\n`, /at least two options/);
  expectError(FM + cell('a-1') + `${fence}predict\ntype: text\ntolerance: 1\n\nWhat?\n${fence}\n`, /tolerance: belongs/);
  expectError(FM + cell('a-1') + `${fence}predict\ntype: guess\n\nWhat?\n${fence}\n`, /type: is choice, number or text/);
});

test('predict: the output line a question asks about, from its words or from line:', () => {
  const lineOf = (headers, question) => {
    const l = parseLesson(FM + cell('a-1') + `${fence}predict\ntype: text\n${headers}\n${question}\n${fence}\n`);
    assert.deepEqual(l.errors, []);
    return cellsOf(l)[0].blocks.predict.outputLine;
  };
  assert.equal(lineOf('', 'What will the second line print?'), 2);
  assert.equal(lineOf('', 'What will the First line show?'), 1);
  assert.equal(lineOf('', 'What will the last line do?'), 'last');
  assert.equal(lineOf('', 'What will it print?'), null);
  assert.equal(lineOf('', 'What will the last two lines print?'), null);
  assert.equal(lineOf('', 'What will the line for Grace print?'), null);
  assert.equal(lineOf('line: 3', 'What will the line for Grace print?'), 3);
  assert.equal(lineOf('line: last', 'What will it print?'), 'last');
  assert.equal(lineOf('line: first', 'What will the last line print?'), 1);
  expectError(FM + cell('a-1') + `${fence}predict\ntype: text\nline: 0\n\nWhat?\n${fence}\n`, /line: is first, last or a line number/);
  expectError(FM + cell('a-1') + `${fence}predict\ntype: text\nline: toString\n\nWhat?\n${fence}\n`, /line: is first, last or a line number/);
});

test('solution: code, then notes after ---; inputs: expressions, notes and "throws"', () => {
  const src = FM + cell('a-1') + `${fence}solution\ntitle: with a loop\nint Total(List<int> v)\n{\n    return v.Sum();\n}\n---\nNotes in *Markdown*.\n${fence}\n\n${fence}solution\nint Total(List<int> v) => 0;\n${fence}\n\n` +
    `${fence}inputs\nTotal(new List<int> { 4, 8 })\n\nTotal(new List<int>())   // an empty list\nTotal(null)              // throws: no list\nCheck("http://x // y")\n${fence}\n`;
  const l = parseLesson(src);
  assert.deepEqual(l.errors, []);
  const [c] = cellsOf(l);
  assert.deepEqual(c.blocks.solutions.map(s => [s.title, s.code, s.notes]), [
    ['with a loop', 'int Total(List<int> v)\n{\n    return v.Sum();\n}', 'Notes in *Markdown*.'],
    [null, 'int Total(List<int> v) => 0;', null],
  ]);
  assert.deepEqual(c.blocks.inputs.items.map(x => [x.expr, x.note, x.throws]), [
    ['Total(new List<int> { 4, 8 })', null, false],
    ['Total(new List<int>())', 'an empty list', false],
    ['Total(null)', 'throws: no list', true],
    ['Check("http://x // y")', null, false],
  ]);
});

test('splitComment ignores // inside strings and characters', () => {
  assert.deepEqual(splitComment('F("a//b") // note'), { expr: 'F("a//b")', note: 'note' });
  assert.deepEqual(splitComment("F('/') // n"), { expr: "F('/')", note: 'n' });
  assert.deepEqual(splitComment('F(@"c:\\\\x//y") //z'), { expr: 'F(@"c:\\\\x//y")', note: 'z' });
  assert.deepEqual(splitComment('F("say \\"hi\\" //") '), { expr: 'F("say \\"hi\\" //")', note: null });
});

test('worlds: variants, groups, ids that end in their world, blocks that stay with their cell', () => {
  const variant = (w, extra = '') => `<div class="dl-world" data-world="${w}">\n\nText for ${w}.\n\n${cell('turn-1--' + w)}${extra}\n</div>\n`;
  const src = WORLDS + '\n' + cell('shared-1') + '\n' + variant('game', `${fence}hint\nAsk.\n${fence}\n`) + '\n' + variant('sea-floor') + '\nBetween.\n\n' + variant('game').replace(/turn-1/g, 'turn-2') + '\n' + cell('shared-2');
  const l = parseLesson(src);
  assert.deepEqual(messages(l), []);
  const shape = l.items.map(i => [i.type, i.id ?? i.text?.slice(0, 14), i.world ?? null, i.group ?? null]);
  assert.deepEqual(shape, [
    ['cell', 'shared-1', null, null],
    ['markdown', 'Text for game.', 'game', 1], ['cell', 'turn-1--game', 'game', 1],
    ['markdown', 'Text for sea-f', 'sea-floor', 1], ['cell', 'turn-1--sea-floor', 'sea-floor', 1],
    ['markdown', 'Between.', null, null],
    ['markdown', 'Text for game.', 'game', 2], ['cell', 'turn-2--game', 'game', 2],
    ['cell', 'shared-2', null, null],
  ]);
  assert.equal(cellsOf(l)[1].blocks.hints.length, 1);
  assert.deepEqual(cellsInWorld(l, 'sea-floor').map(c => c.id), ['shared-1', 'turn-1--sea-floor', 'shared-2']);
  assert.deepEqual(cellsInWorld(l, 'game').map(c => c.id), ['shared-1', 'turn-1--game', 'turn-2--game', 'shared-2']);
});

test('world errors: no worlds:, unknown world, id without its world, nested, unclosed, side by side, a block in another world', () => {
  const v = (w, body) => `<div class="dl-world" data-world="${w}">\n\n${body}\n</div>\n`;
  expectError(FM + v('game', 'x'), /frontmatter lists no worlds/);
  expectError(WORLDS + v('ocean', 'x'), /"ocean" is not in the frontmatter/);
  expectError(WORLDS + v('game', cell('turn-1')), /must end in --game/);
  expectError(WORLDS + v('game', v('sea-floor', 'x')), /cannot be inside another/);
  expectError(WORLDS + '<div class="dl-world" data-world="game">\n\ntext\n', /no closing <\/div>/);
  expectError(WORLDS + v('game', 'a') + '\n' + v('game', 'b'), /side by side/);
  expectError(WORLDS + cell('shared-1') + v('game', `${fence}hint\nAsk.\n${fence}`), /block stays with its cell/);
  expectError(WORLDS + v('game', cell('turn-1--game')) + `${fence}solution\nfor: turn-1--game\nx\n${fence}\n`, /block stays with its cell/);
  expectError(WORLDS + '<div class="dl-world" data-world="game">text</div>\n', /on a line of its own/);
  // A <div> inside a variant closes before the variant does.
  const inner = parseLesson(WORLDS + v('game', '<div class="note">\n\nNote.\n\n</div>\n\n' + cell('turn-1--game')));
  assert.deepEqual(messages(inner), []);
  assert.equal(cellsOf(inner)[0].world, 'game');
});

test('cellsForRun: the visible cells above the target, then the target, with a replacement for its code', () => {
  const l = parseLesson(WORLDS + cell('shared-1', 'public class A { }') + `<div class="dl-world" data-world="game">\n\n${cell('t-1--game', 'public class B { }')}\n</div>\n\n<div class="dl-world" data-world="sea-floor">\n\n${cell('t-1--sea-floor', 'public class C { }')}\n</div>\n\n` + cell('shared-2', 'Console.WriteLine(1);', 'file: Main.cs\n'));
  const target = cellsOf(l).at(-1);
  assert.deepEqual(cellsForRun(l, target, { world: 'sea-floor' }), [
    { id: 'shared-1', file: null, code: 'public class A { }' },
    { id: 't-1--sea-floor', file: null, code: 'public class C { }' },
    { id: 'shared-2', file: 'Main.cs', code: 'Console.WriteLine(1);' },
  ]);
  assert.deepEqual(cellsForRun(l, cellsOf(l)[1], { code: '// mine' }).map(c => c.code), ['public class A { }', '// mine']);
});

test('the fixture lesson and its practice page parse with no errors', () => {
  const dir = fileURLToPath(new URL('../fixtures/lessons/every-feature/', import.meta.url));
  const lesson = parseLesson(fs.readFileSync(dir + 'every-feature.md', 'utf8'), { id: 'every-feature' });
  assert.deepEqual(messages(lesson), []);
  const types = new Set(lesson.items.map(i => i.type));
  assert.deepEqual([...types].sort(), ['cell', 'challenge', 'markdown', 'readonly']);
  const cells = cellsOf(lesson);
  assert.ok(cells.some(c => c.blocks.predict) && cells.some(c => c.blocks.inputs) && cells.some(c => c.blocks.solutions.length > 1) && cells.some(c => c.blocks.hints.length));
  const practice = parseLesson(fs.readFileSync(dir + 'every-feature-practice.md', 'utf8'), { id: 'every-feature-practice' });
  assert.deepEqual(messages(practice), []);
});

test('parseCourse: the real course files, and errors', () => {
  for (const name of ['pdp', 'foop']) {
    const { course, errors } = parseCourse(fs.readFileSync(fileURLToPath(new URL(`../../courses/${name}.yaml`, import.meta.url)), 'utf8'));
    assert.deepEqual(errors, [], name);
    assert.ok(course.contents.length > 0);
  }
  assert.match(parseCourse('title: x\n').errors.map(e => e.message).join(' '), /needs code:/);
  assert.match(parseCourse('title: x\ncode: y\ncard: z\ndescription: d\ncontents:\n- title: s\n  lessons: [a, a]\n').errors[0].message, /listed twice/);
  const head = 'title: x\ncode: y\ncard: z\ndescription: d\ncontents:\n- title: s\n  lessons: [a, b]\n';
  const planned = parseCourse(head + 'planned:\n  b: "B: a lesson not written yet"\n');
  assert.deepEqual(planned.errors, []);
  assert.deepEqual(planned.course.planned, { b: 'B: a lesson not written yet' });
  assert.match(parseCourse(head + 'planned:\n  c: C\n').errors[0].message, /don't list it/);
  assert.match(parseCourse(head + 'planned:\n  b: ""\n').errors[0].message, /needs a title/);
  assert.match(parseCourse(head + 'planned: [b]\n').errors[0].message, /planned: must be/);
  assert.deepEqual(parseCourse(head).course.planned, {});
});

test('never throws, whatever it is given', () => {
  for (const s of [undefined, null, '', '---', '---\n---', '```', '<div class="dl-world" data-world="x">', '---\ntitle: [\n---\n```predict\n```']) {
    const l = parseLesson(s);
    assert.ok(Array.isArray(l.errors) && Array.isArray(l.items));
  }
});

test('endLine: the last line of every chunk of prose, fence and block, so that the editing mode can name the lines of each', () => {
  const src = FM + '\n# Title\n\nA paragraph\non two lines.\n\n' + cell('a-1', 'x\ny', 'hint: h\n') +
    `${fence}hint\nafter: 2 errors\nThink.\n${fence}\n\n` + `${fence}predict\ntype: text\n\nWhat?\n${fence}\n` +
    `${fence}solution\nx\n---\nNotes.\n${fence}\n` + `${fence}inputs\n1\n${fence}\n\nAfter.\n\n` +
    `${fence}console\nout\n${fence}\n\n${fence}csharp challenge\nint a;\n${fence}\n`;
  const l = parseLesson(src);
  assert.deepEqual(l.errors, []);
  const lines = src.split('\n');
  const text = (first, last) => lines.slice(first - 1, last).join('\n');
  const [h, para] = [l.items[0], l.items[0]];
  assert.equal(text(h.line, h.endLine), '# Title\n\nA paragraph\non two lines.', 'a chunk of prose is its lines, blank lines inside included');
  const c = cellsOf(l)[0];
  assert.equal(text(c.line, c.endLine), '```csharp exec\nid: a-1\nhint: h\nx\ny\n```');
  const b = c.blocks;
  assert.equal(text(b.hints[0].line, b.hints[0].endLine), '```hint\nafter: 2 errors\nThink.\n```');
  assert.equal(text(b.predict.line, b.predict.endLine), '```predict\ntype: text\n\nWhat?\n```');
  assert.equal(text(b.solutions[0].line, b.solutions[0].endLine), '```solution\nx\n---\nNotes.\n```');
  assert.equal(text(b.inputs.line, b.inputs.endLine), '```inputs\n1\n```');
  const read = l.items.find(i => i.type === 'readonly');
  assert.equal(text(read.line, read.endLine), '```console\nout\n```');
  const ch = l.items.find(i => i.type === 'challenge');
  assert.equal(text(ch.line, ch.endLine), '```csharp challenge\nint a;\n```');
  const after = l.items.find(i => i.type === 'markdown' && i.text === 'After.');
  assert.equal(text(after.line, after.endLine), 'After.');
  assert.ok(para);
});
