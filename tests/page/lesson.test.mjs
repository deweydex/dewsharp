// The lesson page (web/lesson.html, web/page/lesson.js) on the fixture lesson, which uses every part of
// docs/LESSON_FORMAT.md: each block renders, worlds switch and are remembered, cells run, take live input
// and stop, a compiler message moves the cursor, guesses sit beside the output, the comparison draws its
// table, and saved work comes back after a reload, with a notice when the lesson has changed, and through
// an exported file.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import {
  launchSite, openPage, waitEngine, setCode, getCode, cursorLine, cell, stateOf, outputOf, runCell, waitIdle,
  waitForInput, savedRecord, downloadOf, upload, VERDICT,
} from './helpers.mjs';

const LESSON = 'lesson.html?id=every-feature';
const envs = [];
after(async () => { for (const e of envs) await e.close(); });
const site = async (opts) => { const e = await launchSite(opts); envs.push(e); return e; };

test('every block renders: cells with kinds and files, predict, hints, solutions, inputs, challenge, code to read, folds, maths', async () => {
  const e = await site();
  const ctx = await e.browser.newContext();
  // The loading line: record what it says while .NET downloads and starts.
  await ctx.addInitScript(() => {
    window.__status = [];
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.getElementById('status');
      if (s) new MutationObserver(() => window.__status.push(s.textContent)).observe(s, { subtree: true, childList: true, characterData: true });
    });
  });
  const { page, errors } = await openPage(e, LESSON, { context: ctx });
  assert.equal(await page.title(), 'Every feature: a lesson that uses each part of the format — dewsharp');
  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex');
  assert.equal(await page.locator('h1').first().textContent(), 'Every feature');

  // Cells: the shared ones and the ones in the chosen world (game) are on show.
  const ids = await page.locator('.dl-cell').evaluateAll(ns => ns.map(n => n.dataset.cell));
  assert.equal(ids.length, 17);
  assert.ok(ids.includes('your-world-1--game') && ids.includes('your-world-1--space'));
  await waitEngine(page);
  // Kinds come from runner.classify; the file name from file: or the first type.
  await page.waitForFunction(() => document.querySelector('#cell-classes-1 .dl-cell-pill-type').dataset.kind === 'types');
  const label = (id) => page.locator(`#cell-${id} .dl-cell-pill-type`).textContent();
  assert.equal(await label('a-first-program-1'), 'program');
  assert.equal(await label('classes-1'), 'types');
  assert.equal(await label('classes-5'), 'program');
  assert.equal(await page.locator('#cell-classes-1 .ds-cell-file').textContent(), 'Planet.cs');
  assert.equal(await page.locator('#cell-classes-3 .ds-cell-file').textContent(), 'BetterPlanet.cs');
  assert.equal(await page.locator('#cell-a-first-program-1 .ds-cell-file').textContent(), 'Program.cs');
  assert.equal(await page.locator('#cell-classes-1 .dl-btn-run').textContent(), 'Check');
  assert.equal(await page.locator('#cell-a-first-program-1 .dl-btn-run').textContent(), 'Run');
  assert.equal(await page.locator('#cell-a-first-program-1 button', { hasText: 'Reset' }).count(), 1);

  // The loading line said how far the download had got, then that C# was ready.
  const said = await page.evaluate(() => window.__status.join('\n'));
  assert.match(said, /Downloading C#|Starting C#|Starting the compiler/);
  assert.match(said, /C# is ready\./);

  // Blocks: a predict above its cell, a hint behind ? and one that waits, solutions in folds, the inputs table.
  assert.equal(await page.locator('#predict-a-first-program-1 + .dl-cell').getAttribute('data-cell'), 'a-first-program-1');
  assert.equal(await page.locator('#predict-a-first-program-1 .dl-predict-option').count(), 3);
  assert.equal(await page.locator('#predict-a-first-program-1 .dl-predict-sure-btn').allTextContents().then(t => t.join('|')), 'Sure|A hunch|I’m not sure yet');
  assert.equal(await page.locator('#cell-a-first-program-1 .dl-hint-icon').count(), 1);
  assert.equal(await page.locator('#hint-a-first-program-1-1').isHidden(), true, 'a hint waits for an attempt');
  assert.equal(await page.locator('details.dl-solution').count(), 3);
  assert.deepEqual(await page.locator('details.dl-solution > summary').allTextContents(),
    ["A solution, with what you've met so far", 'A solution, with LINQ', 'A solution']);
  assert.equal(await page.locator('.dl-compare[data-cell="a-total-1"] tbody tr').count(), 3);
  assert.match(await page.locator('.dl-compare[data-cell="a-total-1"] tbody tr').nth(1).textContent(), /an empty list/);
  // Code to read, with its language; the answer fold; maths; the challenge; learning outcomes; the pager.
  // Three solutions, then the four fences to read, the fold's console, and the challenge.
  assert.deepEqual(await page.locator('pre.dl-static').evaluateAll(ns => ns.map(n => n.dataset.lang)),
    ['csharp', 'csharp', 'csharp', 'csharp', 'python', 'console', 'text', 'console', 'csharp']);
  assert.ok(await page.locator('pre.dl-static[data-lang=csharp] .tok-keyword').count() > 0, 'C# to read is highlighted');
  assert.equal(await page.locator('details.dl-answer').count(), 1);
  assert.ok(await page.locator('.katex').count() >= 1, 'maths is typeset');
  const challenge = page.locator('.dl-challenge a', { hasText: 'Open in my notebook' });
  assert.equal(await challenge.getAttribute('href'), 'notebook.html?challenge=every-feature&n=1');
  assert.match(await page.locator('.ds-covers').textContent(), /FOOP-LO1, FOOP-LO2/);
  assert.match(await page.locator('.ds-pager .ds-next').textContent(), /Practice/);
  assert.match(await page.locator('.dl-crumbs').textContent(), /A fixture course/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('worlds: the chooser under the title shows one world at a time, and the page remembers the choice', async () => {
  const e = await site();
  const ctx = await e.browser.newContext();
  const { page } = await openPage(e, LESSON, { context: ctx });
  const chooser = page.locator('.dl-world-chooser');
  assert.equal(await page.locator('h1 + .dl-world-chooser').count(), 1, 'the chooser is under the title');
  assert.equal(await chooser.locator('input:checked').getAttribute('value'), 'game');
  assert.equal(await cell(page, 'your-world-1--game').isVisible(), true);
  assert.equal(await cell(page, 'your-world-1--space').isVisible(), false);
  await chooser.locator('input[value=space]').check();
  assert.equal(await cell(page, 'your-world-1--game').isVisible(), false);
  assert.equal(await cell(page, 'your-world-1--space').isVisible(), true);
  assert.equal(await page.locator('#predict-your-world-2--space').isVisible(), true);
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.page === 'ready');
  assert.equal(await page.locator('.dl-world-chooser input:checked').getAttribute('value'), 'space');
  assert.equal(await cell(page, 'your-world-1--space').isVisible(), true);
  // The shared cell after the worlds runs with the chosen world's cells above it.
  await waitEngine(page);
  await runCell(page, 'after-the-worlds-1');
  assert.equal(await outputOf(page, 'after-the-worlds-1'), 'Shared, after the worlds.\n');
  await ctx.close();
});

test('run, live input, End input, a menu with colours, Check, and the three things that can happen', async () => {
  const e = await site();
  const { page, ctx, errors } = await openPage(e, LESSON, { engine: true });

  await runCell(page, 'a-first-program-1');
  assert.equal(await outputOf(page, 'a-first-program-1'), 'Hello!\nA ticket costs €12.50.\nToday is 03/09/2026.\n');
  assert.match(await stateOf(page, 'a-first-program-1'), /^Ran\. \(\d/);

  // Live input: the input row appears and takes the focus when the program waits.
  await runCell(page, 'asking-1', { wait: false });
  await waitForInput(page, 'asking-1');
  assert.equal(await page.evaluate(() => document.activeElement.id), 'cell-asking-1-input');
  assert.equal(await stateOf(page, 'asking-1'), 'waiting for you to type');
  assert.equal(await outputOf(page, 'asking-1'), 'What is your name? ');
  await page.keyboard.type('Ada');
  await page.keyboard.press('Enter');
  await waitForInput(page, 'asking-1');
  await page.keyboard.type('21');
  await page.keyboard.press('Enter');
  await waitIdle(page, 'asking-1');
  assert.equal(await outputOf(page, 'asking-1'), 'What is your name? Ada\nHow old are you? 21\nHello, Ada. Next year you will be 22.\n');
  assert.equal(await page.locator('#cell-asking-1 .ds-echo').first().textContent(), 'Ada\n');

  // End input: ReadLine gives null.
  await runCell(page, 'asking-2', { wait: false });
  await waitForInput(page, 'asking-2');
  await page.locator('#cell-asking-2 button', { hasText: 'End input' }).click();
  await waitIdle(page, 'asking-2');
  assert.equal(await outputOf(page, 'asking-2'), 'True\n');

  // Clear, a colour, ReadKey and Environment.Exit.
  await runCell(page, 'a-menu-1', { wait: false });
  await waitForInput(page, 'a-menu-1');
  await page.keyboard.type('2'); await page.keyboard.press('Enter');
  await waitForInput(page, 'a-menu-1');
  await page.keyboard.type('q'); await page.keyboard.press('Enter');
  await waitIdle(page, 'a-menu-1');
  assert.equal(await outputOf(page, 'a-menu-1'), '1. Start\n2. Help\n2\nYou chose 2.\nq\nQ\n');
  assert.equal(await page.locator('#cell-a-menu-1 .ds-out', { hasText: '1. Start' }).evaluate(n => n.style.color), 'var(--ds-con-Cyan)');
  assert.match(await stateOf(page, 'a-menu-1'), /^Ran\. It ended with exit code 3\./);

  // It did not compile.
  await runCell(page, 'mistakes-1');
  assert.equal(await stateOf(page, 'mistakes-1'), 'Did not compile, so nothing ran.');
  assert.equal(await page.locator('#cell-mistakes-1 .ds-console').isHidden(), true);
  // It stopped with an exception, on a line the reader can click.
  await runCell(page, 'mistakes-2');
  assert.equal(await stateOf(page, 'mistakes-2'), 'Stopped with an exception on line 3 of Program.cs.');
  assert.match(await outputOf(page, 'mistakes-2'), /^before\nUnhandled exception\. System\.IndexOutOfRangeException: Index was outside the bounds of the array\.\s+at line 3 of Program\.cs/);
  await page.locator('#cell-mistakes-2 .ds-exception button', { hasText: 'line 3 of Program.cs' }).click();
  assert.equal(await cursorLine(page, 'mistakes-2'), 3);
  // A types cell: Check compiles it, and nothing runs.
  await runCell(page, 'classes-3');
  assert.equal(await stateOf(page, 'classes-3'), 'Compiled. Nothing ran: this cell has only types. The cells below can use them.');
  // The rules of the road: classes-4 uses the later Planet (rule 4); classes-2 the first one.
  await runCell(page, 'classes-4');
  assert.equal(await outputOf(page, 'classes-4'), 'the planet Venus\n');
  await runCell(page, 'classes-2');
  assert.equal(await outputOf(page, 'classes-2'), 'Planet Mars\n');
  // Ctrl+Enter in the editor runs the cell.
  await page.locator('#cell-classes-5 .cm-content').click();
  await page.keyboard.press('Control+Enter');
  await waitIdle(page, 'classes-5');
  assert.equal(await outputOf(page, 'classes-5'), 'Main ran.\n');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('Stop: a program waiting for input, and a loop that prints nothing', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, LESSON, { engine: true });
  await runCell(page, 'asking-2', { wait: false });
  await waitForInput(page, 'asking-2');
  assert.equal(await page.locator('#cell-asking-2 .dl-btn-run').textContent(), 'Stop');
  await page.locator('#cell-asking-2 .dl-btn-run').click();
  await waitIdle(page, 'asking-2');
  assert.equal(await stateOf(page, 'asking-2'), 'Stopped.');
  assert.equal(await page.locator('#cell-asking-2 .dl-btn-run').textContent(), 'Run');

  await setCode(page, 'asking-2', 'while (true)\n{\n}\n');
  await runCell(page, 'asking-2', { wait: false });
  await page.waitForTimeout(1200);
  await page.locator('#cell-asking-2 .dl-btn-run').click();
  await waitIdle(page, 'asking-2');
  assert.equal(await stateOf(page, 'asking-2'), 'Stopped.');
  // The page goes on working after the worker was replaced.
  await runCell(page, 'a-first-program-1');
  assert.match(await outputOf(page, 'a-first-program-1'), /^Hello!/);
  await ctx.close();
});

test('compiler messages: Visual Studio format, click to the line, focus on the first, warnings quieter and named in the status, help under rule 3, a hint after an error', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, LESSON, { engine: true });
  await runCell(page, 'mistakes-1');
  const messages = page.locator('#cell-mistakes-1 .ds-diag');
  assert.equal(await messages.first().textContent(), "Program.cs(2,19): error CS0103: The name 'totl' does not exist in the current context");
  assert.match(await messages.nth(1).textContent(), /^Program\.cs\(1,5\): warning CS0219: /);
  assert.equal(await messages.nth(1).getAttribute('class'), 'ds-diag ds-diag-warning');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), await messages.first().textContent(), 'the focus is on the first message');
  assert.equal(await page.locator('#cell-mistakes-1 .cm-lintRange-error').count(), 1, 'the name is underlined');
  await messages.first().click();
  assert.equal(await cursorLine(page, 'mistakes-1'), 2);
  assert.equal(await page.evaluate(() => !!document.activeElement.closest('#cell-mistakes-1 .cm-editor')), true);

  // A variable from a cell above: the engine's help sentence is under the message.
  await setCode(page, 'classes-2', 'Console.WriteLine(total);\n');
  await setCode(page, 'mistakes-1', 'int total = 0;\nConsole.WriteLine(total);\n');
  await runCell(page, 'classes-2');
  assert.match(await page.locator('#cell-classes-2 .ds-diag-help').first().textContent(), /Variables stay in their cell/);

  // A run with only a warning says so in the status line, which a screen reader reads (the list is not live).
  await setCode(page, 'mistakes-1', 'int unused = 1;\nConsole.WriteLine("hi");\n');
  await runCell(page, 'mistakes-1');
  assert.match(await stateOf(page, 'mistakes-1'), /^Ran, with 1 warning\. \(\d/);

  // A hint with the default "after: 1 errors" appears after the first run that did not compile.
  assert.equal(await page.locator('#hint-a-first-program-1-1').isHidden(), true);
  await setCode(page, 'a-first-program-1', 'Console.WriteLine(helo);\n');
  await runCell(page, 'a-first-program-1');
  assert.equal(await page.locator('#hint-a-first-program-1-1').isVisible(), true);
  assert.equal(await page.locator('#hint-classes-2-1').isVisible(), true, 'for: attaches a hint to another cell');
  await ctx.close();
});

test('predict: a guess and how sure, then the guess beside the output, with no verdict', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, LESSON, { engine: true });
  const predict = page.locator('#predict-a-first-program-1');
  await predict.locator('.dl-predict-option', { hasText: '$12.50' }).click();
  await predict.locator('button', { hasText: 'A hunch' }).click();
  assert.equal(await predict.locator('button[aria-pressed=true]').textContent(), 'A hunch');
  await runCell(page, 'a-first-program-1');
  await page.waitForFunction(() => !document.querySelector('#predict-a-first-program-1 .dl-predict-after').hidden);
  assert.equal(await predict.locator('.dl-predict-your').textContent(), 'A ticket costs $12.50.');
  assert.equal(await predict.locator('.dl-predict-output').textContent(), 'Hello!\nA ticket costs €12.50.\nToday is 03/09/2026.');
  assert.equal(await predict.locator('.dl-predict-which').isVisible(), true);
  assert.doesNotMatch(await predict.textContent(), VERDICT);
  // The chosen option has no note; the first option's note stays hidden.
  assert.equal(await predict.locator('.dl-predict-note').isVisible(), false);

  // "I'm not sure yet" opens the first hint and offers two ways on.
  await predict.locator('button', { hasText: 'not sure yet' }).click();
  assert.equal(await predict.locator('.dl-predict-unsure').isVisible(), true);
  assert.equal(await page.locator('#hint-a-first-program-1-1').evaluate(n => !n.hidden && n.open), true);

  // The guess is saved with the cell.
  await page.waitForFunction(async () => document.documentElement.dataset.saved);
  await page.waitForTimeout(800);
  const record = await savedRecord(page, 'every-feature/a-first-program-1');
  assert.equal(record.predict.guess.option, 1);
  assert.equal(record.predict.sure, 'unsure');
  await ctx.close();
});

test('Compare with a solution: the reader\'s cell, then the solution, with the same inputs; differing rows say "different"', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, LESSON, { engine: true });
  const compare = page.locator('.dl-compare[data-cell="a-total-1"]');
  await compare.locator('button', { hasText: 'Compare with a solution' }).click();
  await page.waitForFunction(() => /different|same/.test(document.querySelector('.dl-compare[data-cell="a-total-1"] .dl-compare-status').textContent), null, { timeout: 60000 });
  const rows = await compare.locator('tbody tr').evaluateAll(trs => trs.map(tr => ({
    yours: tr.querySelector('.dl-compare-yours').textContent, theirs: tr.querySelector('.dl-compare-theirs').textContent,
    differ: tr.classList.contains('dl-compare-differ') })));
  assert.deepEqual(rows, [
    { yours: '0', theirs: '27different', differ: true },
    { yours: '0', theirs: '0', differ: false },
    { yours: '0', theirs: 'an exception: NullReferenceExceptiondifferent', differ: true },
  ]);
  assert.match(await compare.locator('.dl-compare-status').textContent(), /^2 rows are different\./);
  assert.doesNotMatch(await compare.textContent(), VERDICT);
  // With the solution's code in the cell, every row is the same.
  await setCode(page, 'a-total-1', 'int Total(List<int> values)\n{\n    int total = 0;\n    foreach (int value in values)\n    {\n        total += value;\n    }\n    return total;\n}\n');
  await compare.locator('button').click();
  await page.waitForFunction(() => /same/.test(document.querySelector('.dl-compare[data-cell="a-total-1"] .dl-compare-status').textContent), null, { timeout: 60000 });
  assert.equal(await compare.locator('tr.dl-compare-differ').count(), 0);
  await ctx.close();
});

test('saved work: code and output come back after a reload; Reset; a notice when the lesson has changed', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, LESSON, { engine: true });
  await setCode(page, 'a-first-program-1', 'Console.WriteLine("Mine");\n');
  assert.equal(await page.locator('#cell-a-first-program-1 .ds-cell-edited').isVisible(), true);
  await runCell(page, 'a-first-program-1');
  await page.waitForFunction(() => document.documentElement.dataset.saved);
  const record = await savedRecord(page, 'every-feature/a-first-program-1');
  assert.equal(record.code, 'Console.WriteLine("Mine");\n');
  assert.equal(record.output, 'Mine\n');
  assert.equal(record.version, '2026.09.27.1');
  assert.match(record.saved_at, /^\d{4}-\d\d-\d\dT/);

  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.page === 'ready');
  assert.equal(await getCode(page, 'a-first-program-1'), 'Console.WriteLine("Mine");\n');
  assert.match(await outputOf(page, 'a-first-program-1'), /^Mine\nThis is what it printed when you last ran it/);
  assert.equal(await page.locator('#ds-version-notice').isHidden(), true);

  // Reset puts the page's version back, and Ctrl+Z brings the reader's back.
  await page.locator('#cell-a-first-program-1 button', { hasText: 'Reset' }).click();
  assert.match(await getCode(page, 'a-first-program-1'), /^Console\.WriteLine\("Hello!"\);/);
  await page.keyboard.press('Control+z');
  assert.equal(await getCode(page, 'a-first-program-1'), 'Console.WriteLine("Mine");\n');

  // Work saved under an older version of the lesson: the page says so, and keeps the code.
  await page.evaluate(() => new Promise((resolve) => {
    const open = indexedDB.open('dewsharp');
    open.onsuccess = () => {
      const t = open.result.transaction('work', 'readwrite');
      const s = t.objectStore('work');
      const g = s.get('every-feature/a-first-program-1');
      g.onsuccess = () => s.put({ ...g.result, version: '2026.01.01.1' });
      t.oncomplete = () => { open.result.close(); resolve(); };
    };
  }));
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.page === 'ready');
  const notice = page.locator('#ds-version-notice');
  assert.equal(await notice.isVisible(), true);
  assert.match(await notice.textContent(), /This page has changed since you saved your work on it\..*version 2026\.01\.01\.1.*version 2026\.09\.27\.1/s);
  assert.equal(await getCode(page, 'a-first-program-1'), 'Console.WriteLine("Mine");\n');
  await ctx.close();
});

test('Export my work and Import my work: a JSON file that brings the work back on a device with none', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, LESSON);
  await setCode(page, 'classes-2', 'Planet home = new Planet("Earth");\nConsole.WriteLine(home);\n');
  await page.waitForFunction(() => document.documentElement.dataset.saved, null, { timeout: 10000 });
  const file = await downloadOf(page, () => page.locator('.ds-work-tools button', { hasText: 'Export my work' }).click());
  assert.match(file.name, /^dewsharp-work-\d{4}-\d\d-\d\d\.json$/);
  const data = JSON.parse(file.bytes.toString('utf8'));
  assert.equal(data.format, 'dewsharp-work');
  const mine = data.work.find(w => w.key === 'every-feature/classes-2');
  assert.equal(mine.code, 'Planet home = new Planet("Earth");\nConsole.WriteLine(home);\n');
  await ctx.close();

  // Another device: nothing saved, then the file.
  const other = await openPage(e, LESSON);
  assert.match(await getCode(other.page, 'classes-2'), /^Planet mars/);
  await upload(other.page, file.name, file.bytes, () => other.page.locator('.ds-work-tools button', { hasText: 'Import my work' }).click());
  await other.page.waitForEvent('load', { timeout: 10000 });
  await other.page.waitForFunction(() => document.documentElement.dataset.page === 'ready');
  assert.equal(await getCode(other.page, 'classes-2'), 'Planet home = new Planet("Earth");\nConsole.WriteLine(home);\n');

  // A file that is not a work file is refused, in words a learner can read.
  await upload(other.page, 'notes.json', '{"hello": 1}', () => other.page.locator('.ds-work-tools button', { hasText: 'Import my work' }).click());
  await other.page.waitForFunction(() => /not a dewsharp work file/.test(document.querySelector('.ds-work-tools [role=status]').textContent));
  await other.ctx.close();
});

test('without cross-origin isolation, the answers are typed before the run', async () => {
  const e = await site({ isolate: false });
  const { page, ctx } = await openPage(e, LESSON, { engine: true });
  assert.equal(await page.evaluate(() => crossOriginIsolated), false);
  const box = page.locator('#cell-asking-1 .ds-typed-ahead');
  assert.equal(await box.isVisible(), true);
  assert.equal(await page.locator('#cell-a-first-program-1 .ds-typed-ahead').isVisible(), false, 'only for a cell that reads input');
  await box.locator('textarea').fill('Ada\n21\n');
  await runCell(page, 'asking-1');
  assert.equal(await outputOf(page, 'asking-1'), 'What is your name? Ada\nHow old are you? 21\nHello, Ada. Next year you will be 22.\n');
  await ctx.close();
});

test('a page that does not exist, and the practice page with its previous link', async () => {
  const e = await site();
  const missing = await openPage(e, 'lesson.html?id=no-such-page');
  assert.equal(await missing.page.locator('h1').textContent(), 'There is no page here');
  await missing.ctx.close();
  const { page, ctx } = await openPage(e, 'lesson.html?id=every-feature-practice');
  assert.match(await page.locator('.ds-pager .ds-prev').textContent(), /Every feature/);
  assert.doesNotMatch(await page.locator('main').textContent(), VERDICT);
  await ctx.close();
});
