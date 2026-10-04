// Editing on the page itself (web/page/inplace.js, web/page/draft.js, and their part of web/page/lesson.js), in a
// browser, with GitHub replaced by a stand-in. The fixture lesson is changed block by block, and each time
// the test looks at the draft that was kept, to see that the change is exactly the lines of the block that was
// edited and nothing else.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { launchSite, openPage, setCode, withToken, GH, FIXTURE_PAGE, FIXTURE_SOURCE } from './helpers.mjs';
import { fromBase64 } from '../../web/page/github.js';

const PLACE = 'lesson.html?id=every-feature&edit=place';
const SOURCE = FIXTURE_SOURCE;
const LINES = SOURCE.split('\n');
const lines = (a, b) => LINES.slice(a - 1, b).join('\n');

const envs = [];
after(async () => { for (const e of envs) await e.close(); });
async function start(query = PLACE, overrides) {
  const e = await launchSite();
  envs.push(e);
  const { ctx, calls } = await withToken(e, overrides);
  const opened = await openPage(e, query, { context: ctx });
  await opened.page.waitForSelector('.ds-place-bar, #ds-edit');
  return { ...opened, calls, env: e };
}

/** The text of the draft kept in this browser, once it differs from `not` and `has(text)` holds. */
const kept = (page, not = SOURCE, has = null) => page.waitForFunction(({ not, has }) => {
  const saved = JSON.parse(localStorage.getItem('dewsharp:draft:every-feature') || 'null');
  return saved && saved.text !== not && (!has || new Function('text', `return ${has}`)(saved.text)) ? saved.text : false;
}, { not, has }, { timeout: 8000 }).then(h => h.jsonValue());

const block = (page, n) => page.locator('.ds-prose [data-src]').nth(n);
const done = (page) => page.getByRole('button', { name: 'Done', exact: true }).click();

/**
 * Opens a block of prose and gets its Markdown in a text box, whether it opened as rich text or as Markdown. These
 * tests are about lines of the file, and the text box shows them as they are; rich.test.mjs is about the rich
 * editor.
 */
async function asMarkdown(page, block) {
  await block.click();
  await page.waitForSelector('.ds-rich, .ds-raw-text');
  if (await page.locator('.ds-rich').count()) await page.locator('.ds-rich').getByRole('button', { name: 'Edit as Markdown' }).click();
  await page.waitForSelector('.ds-raw-text');
}

test('on the page: items are in boxes, and each block of prose opens as exactly its own lines', async () => {
  const { page, errors } = await start();
  assert.ok(await page.locator('.ds-item').count() > 20);
  assert.ok(await page.locator('.ds-item-tools').count() > 5, 'cells and code have tools above them');
  const first = block(page, 0);
  const [a, b] = (await first.getAttribute('data-src')).split(',').map(Number);
  assert.equal(await first.evaluate(n => n.tagName), 'H1');
  await asMarkdown(page, first);
  assert.equal(await page.locator('.ds-raw-text').first().inputValue(), lines(a, b));
  const para = block(page, 1);
  const [c, d] = (await para.getAttribute('data-src')).split(',').map(Number);
  assert.equal(c, 13);
  await asMarkdown(page, para);
  assert.equal(await page.locator('.ds-raw-text').nth(1).inputValue(), lines(c, d));
  assert.deepEqual(errors, []);
});

test('a change to a block of prose changes only its lines, draws only its chunk again, and leaves the cells alone', async () => {
  const { page } = await start();
  await page.evaluate(() => { window.__cell = document.querySelector('#cell-a-first-program-1'); });
  const para = page.locator('.ds-prose p[data-src="13,15"]');
  await asMarkdown(page, para);
  const area = page.locator('.ds-raw-text');
  await area.fill(lines(13, 15).replace('fixture for the tests', 'fixture, changed in place'));
  await done(page);
  await page.waitForSelector('.ds-prose p:has-text("fixture, changed in place")');
  assert.equal(await page.locator('.ds-raw').count(), 0, 'the editor closes');
  assert.equal(await page.evaluate(() => window.__cell === document.querySelector('#cell-a-first-program-1')), true, 'the same cell, not a new one');
  const text = await kept(page);
  assert.equal(text, SOURCE.replace('fixture for the tests', 'fixture, changed in place'), 'one line of the file changed');
  assert.match(await page.locator('#ds-place-status').textContent(), /Draft kept in this browser/);
});

test('blocks further down keep their lines after a block gains lines, and a block that is taken out leaves no double blank line', async () => {
  const { page } = await start();
  const second = page.locator('.ds-prose [data-src]').nth(2);
  const [a, b] = (await second.getAttribute('data-src')).split(',').map(Number);
  const [x, y] = (await page.locator('.ds-prose [data-src]').nth(3).getAttribute('data-src')).split(',').map(Number);
  await asMarkdown(page, page.locator('.ds-prose [data-src]').nth(1));
  await page.locator('.ds-raw-text').fill(lines(13, 15) + '\n\nA second paragraph.\n\nA third paragraph.');
  await done(page);
  await page.waitForSelector('.ds-prose p:has-text("A third paragraph.")');
  // The block after the new ones is drawn with its new lines: four more lines than before.
  const next = page.locator(`.ds-prose [data-src="${a + 4},${b + 4}"]`);
  assert.equal(await next.count(), 1);
  await asMarkdown(page, next);
  assert.equal(await page.locator('.ds-raw-text').inputValue(), lines(a, b));
  await page.getByRole('button', { name: 'Cancel' }).click();
  assert.ok(x > b && y >= x);
  // Taking a block out.
  await asMarkdown(page, page.locator('.ds-prose p:has-text("A second paragraph.")'));
  await page.locator('.ds-raw-text').fill('');
  await done(page);
  await page.waitForFunction(() => !document.body.innerText.includes('A second paragraph.'));
  const text = await kept(page, SOURCE, "!text.includes('A second paragraph.')");
  assert.ok(!text.includes('A second paragraph.'));
  assert.ok(text.includes('A third paragraph.'));
  assert.ok(!/\n\n\n/.test(text.slice(text.indexOf('fixture'), text.indexOf('A third') + 30)), 'no two blank lines where the block was');
});

test('a cell changed in its own editor changes only its code lines in the draft', async () => {
  const { page } = await start();
  await setCode(page, 'a-first-program-1', 'Console.WriteLine("Hello, draft!");\nConsole.WriteLine(2);\nConsole.WriteLine(3);');
  const text = await kept(page);
  const cell = /```csharp exec\nid: a-first-program-1\nhint: [^\n]*\n([\s\S]*?)```/.exec(SOURCE)[1];
  assert.equal(text, SOURCE.replace(cell, 'Console.WriteLine("Hello, draft!");\nConsole.WriteLine(2);\nConsole.WriteLine(3);\n'));
  // A paragraph below the cell still opens as its own lines, which moved when the cell gained lines.
  const below = page.locator('.ds-prose [data-src]').nth(4);
  const [a, b] = (await below.getAttribute('data-src')).split(',').map(Number);
  await asMarkdown(page, below);
  const expected = text.split('\n').slice(a - 1, b).join('\n');
  assert.equal(await page.locator('.ds-raw-text').inputValue(), expected);
  assert.ok(!/```|^id:/m.test(expected), 'and it is prose, not part of a cell');
});

test('a cell\'s settings, and a fence, open as text where they are, and the page is drawn again from them', async () => {
  const { page } = await start();
  const tools = page.locator('.ds-item[data-type="cell"]').first().locator('.ds-item-tools');
  await tools.getByRole('button', { name: 'Settings' }).click();
  const area = page.locator('.ds-raw-text');
  assert.match(await area.inputValue(), /^id: a-first-program-1\nhint: Change the text in quotes/);
  await area.fill((await area.inputValue()).replace('Change the text in quotes, then run it again.', 'Change the words, then run it.'));
  await done(page);
  await page.waitForSelector('text=Change the words, then run it.', { state: 'attached' });
  const text = await kept(page);
  assert.equal(text, SOURCE.replace('Change the text in quotes, then run it again.', 'Change the words, then run it.'));
  // A fence of code to read.
  const read = page.locator('.ds-item[data-type="readonly"]').first();
  await read.locator('.ds-item-tools').getByRole('button', { name: 'Edit as text' }).click();
  assert.match(await page.locator('.ds-raw-text').inputValue(), /^```/);
});

test('undo and redo go through the draft, and Start again goes back to the page as it is', async () => {
  const { page } = await start();
  await asMarkdown(page, page.locator('.ds-prose p[data-src="13,15"]'));
  await page.locator('.ds-raw-text').fill(lines(13, 15).replace('fixture', 'MARKER'));
  await done(page);
  await page.waitForSelector('.ds-prose p:has-text("MARKER")');
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await page.waitForSelector('.ds-prose p:has-text("a fixture for the tests")');
  assert.equal(await page.locator('.ds-prose p:has-text("MARKER")').count(), 0);
  await page.getByRole('button', { name: 'Redo', exact: true }).click();
  await page.waitForSelector('.ds-prose p:has-text("MARKER")');
  page.once('dialog', d => d.accept());
  await page.locator('#ds-place-bar').getByRole('button', { name: 'Start again', exact: true }).click();
  await page.waitForSelector('.ds-prose p:has-text("a fixture for the tests")');
  assert.equal(await page.locator('.ds-prose p:has-text("MARKER")').count(), 0);
  await page.waitForFunction(() => localStorage.getItem('dewsharp:draft:every-feature') === null, null, { timeout: 5000 });
});

test('a draft kept in the browser is opened again after a reload, and a draft of an older page is not', async () => {
  const { page } = await start();
  await asMarkdown(page, page.locator('.ds-prose p[data-src="13,15"]'));
  await page.locator('.ds-raw-text').fill(lines(13, 15).replace('fixture', 'KEPT'));
  await done(page);
  await kept(page);
  await page.reload();
  await page.waitForSelector('.ds-place-notice .ds-notice');
  assert.match(await page.locator('.ds-place-notice').textContent(), /unsaved draft from .* was kept in this browser, and it is open now/);
  await page.waitForSelector('.ds-prose p:has-text("KEPT")');
  // A draft made from a different version of the page is not opened.
  // (The open page keeps its draft again as it unloads, so the older base goes in as the next page loads.)
  await page.addInitScript(() => {
    const key = 'dewsharp:draft:every-feature';
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved) { saved.base = 'an older version of the page'; localStorage.setItem(key, JSON.stringify(saved)); }
  });
  await page.reload();
  await page.waitForSelector('.ds-place-notice .ds-notice');
  assert.match(await page.locator('.ds-place-notice').textContent(), /before the page was changed, so it was not opened/);
  assert.equal(await page.locator('.ds-prose p:has-text("KEPT")').count(), 0);
});

test('typing a fence into a block can make a cell, and a problem in the text stops the proposal', async () => {
  const { page } = await start();
  await asMarkdown(page, page.locator('.ds-prose p[data-src="13,15"]'));
  await page.locator('.ds-raw-text').fill(lines(13, 15) + '\n\n```csharp exec\nid: typed-1\nConsole.WriteLine(1);\n```');
  await done(page);
  await page.waitForSelector('#cell-typed-1');
  assert.equal(await page.locator('.ds-place-problems .ds-notice').count(), 0);
  // A cell with no id is a problem the bar names.
  await page.locator('.ds-item[data-type="cell"]').last().locator('.ds-item-tools').getByRole('button', { name: 'Settings' }).click();
  await page.locator('.ds-raw-text').fill('hint: no id here');
  await done(page);
  await page.waitForSelector('.ds-place-problems .ds-notice');
  assert.match(await page.locator('.ds-place-problems').textContent(), /1 problem in the text/);
  await page.locator('#ds-edit-summary').fill('Whatever');
  assert.equal(await page.getByRole('button', { name: 'Propose this change' }).isDisabled(), true);
});

test('Edit as text and back share the draft, and Propose sends the draft exactly as it is', async () => {
  const { page, calls } = await start();
  await asMarkdown(page, page.locator('.ds-prose p[data-src="13,15"]'));
  await page.locator('.ds-raw-text').fill(lines(13, 15).replace('fixture', 'fixture, with a café,'));
  await done(page);
  await kept(page);
  await page.locator('#ds-place-bar').getByRole('button', { name: 'Edit as text', exact: true }).click();
  const box = page.locator('#ds-edit-text');
  assert.equal(await page.getByRole('button', { name: 'Stop editing', exact: true }).filter({ visible: true }).count(), 1, 'the text box offers Stop editing');
  assert.equal(await page.getByRole('button', { name: 'Back to editing on the page' }).count(), 1);
  const inText = await box.inputValue();
  assert.equal(inText, SOURCE.replace('fixture', 'fixture, with a café,'));
  await box.fill(inText.replace('A first program', 'A first program, retitled'));
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Back to editing on the page' }).click();
  await page.waitForSelector('h2:has-text("A first program, retitled")');
  await page.locator('#ds-edit-summary').fill('Two changes');
  await page.waitForFunction(() => !document.querySelector('#ds-place-propose button[type=submit]').disabled);
  await page.getByRole('button', { name: 'Propose this change' }).click();
  await page.waitForSelector('#ds-edit-pull');
  const put = calls.find(c => c.key.startsWith('PUT ') && !c.remote);
  assert.equal(put.key, `PUT ${GH}/contents/${FIXTURE_PAGE}`);
  assert.equal(fromBase64(put.body.content), SOURCE.replace('fixture', 'fixture, with a café,').replace('A first program', 'A first program, retitled'));
  assert.equal(put.body.message, 'Two changes');
  assert.equal(await page.evaluate(() => localStorage.getItem('dewsharp:draft:every-feature')), null, 'a proposed draft is no longer kept');
});
