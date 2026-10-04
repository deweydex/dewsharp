// The rich-prose reader and writer (web/page/richtext.js) without a browser: what it keeps, what it refuses,
// and, over every block of prose of every lesson, that whatever it agrees to open is drawn the same way by the
// page's renderer after being written back. That last test is the guard of the editing mode, run on the
// whole course.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdown } from '../../web/page/markdown.js';
import { createRichText } from '../../web/page/richtext.js';
import { parseLesson } from '../../web/lesson/parse.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const markdown = createMarkdown({ html: true, base: '' });
const rich = createRichText({ markdown });
const trip = (text) => rich.serialize(rich.parse(text));

test('a paragraph comes back as it was, with its lines, its emphasis marks and its code', () => {
  for (const text of [
    'One line.',
    'A paragraph that\nruns over\nthree lines.',
    'Some *emphasis*, some _other emphasis_, some **strong** and __other strong__, and `code`.',
    'Code with a backtick: `` a`b ``.',
    'A link to [a lesson](lesson:objects-and-classes) and [the web](https://example.com "A title").',
    'A picture: ![The range\nstill to search](range.svg).',
    'A line break with a backslash\\\nin it.',
    'Microsoft. *Stack&lt;T&gt; Class*.\n<https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.stack-1>',
  ]) {
    const back = trip(text);
    assert.equal(markdown.render(back).replace(/\s+/g, ' '), markdown.render(text).replace(/\s+/g, ' '), `drawn the same: ${text}`);
  }
  for (const text of [
    'One line.',
    'A paragraph that\nruns over\nthree lines.',
    'Some *emphasis*, some _other emphasis_, some **strong** and __other strong__, and `code`.',
    'Code with a backtick: `` a`b ``.',
    'A link to [a lesson](lesson:objects-and-classes) and [the web](https://example.com "A title").',
  ]) assert.equal(trip(text), text, 'byte for byte');
});

test('headings, quotations and lists keep their shape, and a tight list stays tight', () => {
  for (const text of [
    '## A heading with `code`',
    '> A quotation\n> over two lines.',
    '- one\n- two\n  - nested\n- three',
    '* star one\n* star two',
    '1. first\n2. second\n3. third',
    '3. starts at three\n4. next',
    '- a loose list\n\n- with a blank line\n\n- between its items',
  ]) assert.equal(trip(text), text, text);
  assert.doesNotMatch(trip('- tight\n- list'), /\n\n/);
});

test('maths inside a paragraph is kept as written, backslashes and underscores included', () => {
  const text = 'The area is $\\frac{a_1}{b}$, and $x_1 + x_2$ is a sum.';
  assert.equal(trip(text), text);
  assert.equal(rich.parse(text).firstChild.childCount, 5, 'two formulas are two units, not text');
});

test('what it does not hold is refused, with a sentence that says why', () => {
  const cases = {
    'This is a table.': '| a | b |\n|---|---|\n| 1 | 2 |',
    'This part is written in HTML.': '<details class="dl-hint">\n<summary>Hint</summary>',
    'This is a block of code.': '```csharp\nvar x = 1;\n```',
    'This is a formula on its own lines.': '$$\nx^2\n$$',
    'This paragraph has HTML inside it.': 'Press <kbd>Ctrl</kbd> and run.',
    'This heading is underlined, not marked with #.': 'Title\n=====',
  };
  for (const [why, text] of Object.entries(cases)) {
    const result = rich.canOpen(text);
    assert.equal(result.ok, false, text);
    assert.equal(result.why, why);
  }
  assert.equal(rich.canOpen('Plain text.').ok, true);
});

test('editing a document changes only what was edited: the rest is written as it was', () => {
  const doc = rich.parse('First *line*,\nsecond line.');
  const tr = rich.schema.nodes.paragraph.create(null, [rich.schema.text('Changed '), rich.schema.text('x', [rich.schema.marks.em.create({ markup: '_' })])]);
  assert.equal(rich.serialize(rich.schema.nodes.doc.create(null, tr)), 'Changed _x_');
  assert.equal(rich.serialize(doc), 'First *line*,\nsecond line.');
});

test('every block of prose in every lesson: what the guard lets open is drawn the same after a round trip', () => {
  const total = { blocks: 0, candidates: 0, open: 0, byteForByte: 0, refused: 0, drawnDifferently: [] };
  const why = {};
  for (const dir of fs.readdirSync(path.join(ROOT, 'lessons'))) {
    const folder = path.join(ROOT, 'lessons', dir);
    if (!fs.statSync(folder).isDirectory()) continue;
    for (const file of fs.readdirSync(folder).filter(f => f.endsWith('.md'))) {
      const lesson = parseLesson(fs.readFileSync(path.join(folder, file), 'utf8'), { id: file.replace(/\.md$/, '') });
      for (const item of lesson.items.filter(i => i.type === 'markdown')) {
        const lines = item.text.split('\n');
        for (const t of markdown.md.parse(item.text, {}).filter(t => t.level === 0 && t.map && !t.type.endsWith('_close'))) {
          const block = lines.slice(t.map[0], t.map[1]).join('\n');
          total.blocks++;
          if (/^(paragraph|heading|blockquote|bullet_list|ordered_list)_open$/.test(t.type)) total.candidates++;
          const result = rich.canOpen(block);
          if (!result.ok) { total.refused++; why[result.why] = (why[result.why] || 0) + 1; continue; }
          total.open++;
          const back = rich.serialize(result.doc);
          if (back === block.replace(/^\n+|\s+$/g, '')) total.byteForByte++;
          const a = markdown.render(block).replace(/\s+/g, ' ').replace(/> </g, '><').trim();
          const b = markdown.render(back).replace(/\s+/g, ' ').replace(/> </g, '><').trim();
          if (a !== b) total.drawnDifferently.push(`${file}:${item.line + t.map[0]}`);
        }
      }
    }
  }
  console.log(`# rich prose: ${total.blocks} blocks, ${total.open} open as rich text (${total.byteForByte} byte for byte), ${total.refused} refused`, why);
  assert.deepEqual(total.drawnDifferently, [], 'a block the guard opens is never drawn differently');
  assert.ok(total.blocks > 1000, 'the whole course was read');
  // Coverage, not content: these fail if the reader or writer regresses, and not when a lesson is edited.
  assert.ok(total.open / total.candidates > 0.98, 'all but a few paragraphs, headings, lists and quotations open as rich text');
  assert.ok(total.byteForByte / total.open > 0.9, 'nearly every block is written back byte for byte');
});
