// The rich editor of a block of prose (web/page/richedit.js, web/page/richtext.js, and their part of
// web/page/inplace.js), in a browser. A paragraph opens as the text it will look like; what the author does
// there changes only that block's lines of the draft; a block the editor cannot hold safely opens as Markdown,
// and a switch each way moves what has been typed from one to the other.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { launchSite, openPage, withToken, FIXTURE_SOURCE } from './helpers.mjs';

const PLACE = 'lesson.html?id=every-feature&edit=place';
const SOURCE = FIXTURE_SOURCE;
const LINES = SOURCE.split('\n');
const lines = (a, b) => LINES.slice(a - 1, b).join('\n');
const PARAGRAPH = lines(13, 15);

const envs = [];
after(async () => { for (const e of envs) await e.close(); });
async function start(setup) {
  const e = await launchSite();
  envs.push(e);
  const { ctx, calls } = await withToken(e);
  if (setup) await setup(ctx);
  const opened = await openPage(e, PLACE, { context: ctx });
  await opened.page.waitForSelector('.ds-place-bar');
  return { ...opened, calls };
}

const paragraph = (page) => page.locator('.ds-prose p[data-src="13,15"]');
const editor = (page) => page.locator('.ds-rich .ProseMirror');
const button = (page, name) => page.locator('.ds-rich').getByRole('button', { name, exact: true });

/** Opens the paragraph as rich text and waits for the editor. */
async function openRich(page, block = paragraph(page)) {
  await block.click();
  await page.waitForSelector('.ds-rich .ProseMirror');
}
/** The draft kept in this browser, once its text satisfies `has` (a function body over `text`). */
const kept = (page, has = 'true') => page.waitForFunction((has) => {
  const saved = JSON.parse(localStorage.getItem('dewsharp:draft:every-feature') || 'null');
  return saved && new Function('text', `return ${has}`)(saved.text) ? saved.text : false;
}, has, { timeout: 8000 }).then(h => h.jsonValue());
const draftKept = (page) => page.evaluate(() => localStorage.getItem('dewsharp:draft:every-feature'));

test('a paragraph opens as the text it will look like, with the formula shown as one unit', async () => {
  const { page, errors } = await start();
  await openRich(page);
  assert.equal(await page.locator('.ds-raw-text').count(), 0, 'no Markdown box');
  const text = await editor(page).textContent();
  assert.match(text, /This page is a fixture for the tests\. It uses every part of docs\/LESSON_FORMAT\.md once/);
  assert.doesNotMatch(text, /`/, 'the code marks are not shown as backticks');
  assert.equal(await editor(page).locator('code').count(), 1);
  assert.equal(await editor(page).locator('.ds-math-chip').textContent(), '$2^3 = 8$');
  assert.equal(await page.locator('.ds-rich select').inputValue(), 'p');
  assert.equal(await editor(page).getAttribute('role'), 'textbox');
  assert.equal(await editor(page).getAttribute('aria-multiline'), 'true');
  assert.deepEqual(errors, []);
});

test('typing in a paragraph changes its first line and nothing else, and its lines stay as they were', async () => {
  const { page } = await start();
  await openRich(page);
  await page.keyboard.press('Control+Home');
  await page.keyboard.type('First, ');
  await page.keyboard.press('Control+Enter');
  await page.waitForSelector('.ds-prose p:has-text("First, This page")');
  assert.equal(await page.locator('.ds-rich').count(), 0, 'the editor closes');
  const text = await kept(page, "text.includes('First, ')");
  assert.equal(text, SOURCE.replace(PARAGRAPH, 'First, ' + PARAGRAPH), 'one word added, every other byte of the file as it was');
});

test('bold, a heading level and a link are written as Markdown', async () => {
  const { page } = await start();
  await openRich(page);
  await page.keyboard.press('Control+a');
  await button(page, 'Bold').click();
  assert.equal(await button(page, 'Bold').getAttribute('aria-pressed'), 'true');
  await button(page, 'Link').click();
  await page.locator('.ds-rich-link input').fill('lesson:every-feature-practice');
  await page.locator('.ds-rich-link').getByRole('button', { name: 'Apply', exact: true }).click();
  await button(page, 'Done').click();
  const text = await kept(page, "text.includes('lesson:every-feature-practice')");
  assert.match(text, /\*\*\[This page is a fixture for the tests\./);
  assert.ok(text.includes('$2^3 = 8$.](lesson:every-feature-practice)**'));
  assert.equal(text.replace('**[', '').replace('](lesson:every-feature-practice)**', ''), SOURCE, 'only the marks were added');

  // A heading changes level from the list of block kinds.
  const heading = page.locator('.ds-prose h2[data-src]').first();
  const before = await heading.textContent();
  await openRich(page, heading);
  assert.equal(await page.locator('.ds-rich select').inputValue(), '2');
  await page.locator('.ds-rich select').selectOption('3');
  await button(page, 'Done').click();
  const after = await kept(page, `text.includes('### ${before}')`);
  assert.ok(!after.includes(`## ${before}\n`) || after.includes(`### ${before}`));
  assert.equal(await page.locator('.ds-prose h3').first().textContent(), before);
});

test('Done with nothing changed, and Escape, leave the draft alone', async () => {
  const { page } = await start();
  await openRich(page);
  await button(page, 'Done').click();
  await page.waitForTimeout(900);
  assert.equal(await draftKept(page), null, 'nothing was changed, so nothing is kept');
  assert.equal(await page.locator('.ds-rich').count(), 0);
  assert.equal(await paragraph(page).isVisible(), true);

  await openRich(page);
  await page.keyboard.type('typed and then abandoned');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(900);
  assert.equal(await draftKept(page), null);
  assert.equal(await page.locator('.ds-rich').count(), 0);
  assert.doesNotMatch(await paragraph(page).textContent(), /abandoned/);
});

test('Edit as Markdown carries what was typed, and Edit as rich text brings it back', async () => {
  const { page } = await start();
  await openRich(page);
  await page.keyboard.press('Control+Home');
  await page.keyboard.type('Pending ');
  await button(page, 'Edit as Markdown').click();
  await page.waitForSelector('.ds-raw-text');
  assert.equal(await page.locator('.ds-rich').count(), 0);
  assert.equal(await page.locator('.ds-raw-text').inputValue(), 'Pending ' + PARAGRAPH, 'what was typed is in the box, in Markdown');
  assert.equal(await draftKept(page), null, 'and it is not in the draft yet');

  // In Markdown it can be changed to something the rich editor cannot hold, and the switch says so.
  const box = page.locator('.ds-raw-text');
  await box.fill('| a | b |\n|---|---|\n| 1 | 2 |');
  await page.getByRole('button', { name: 'Edit as rich text', exact: true }).click();
  assert.match(await page.locator('.ds-raw-why').textContent(), /This is a table\./);
  assert.equal(await page.locator('.ds-rich').count(), 0);

  await box.fill('Pending ' + PARAGRAPH);
  await page.getByRole('button', { name: 'Edit as rich text', exact: true }).click();
  await page.waitForSelector('.ds-rich .ProseMirror');
  assert.equal(await page.locator('.ds-raw-text').count(), 0);
  await button(page, 'Done').click();
  const text = await kept(page, "text.includes('Pending ')");
  assert.equal(text, SOURCE.replace(PARAGRAPH, 'Pending ' + PARAGRAPH));
});

test('a table opens as Markdown with the reason; a list opens as rich text and gains an item', async () => {
  const { page } = await start();
  await openRich(page);
  await button(page, 'Edit as Markdown').click();
  await page.locator('.ds-raw-text').fill(PARAGRAPH + '\n\n| a | b |\n|---|---|\n| 1 | 2 |\n\n- one\n- two');
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  await page.waitForSelector('.ds-prose ul[data-src]');

  await page.locator('.ds-prose table[data-src]').click();
  await page.waitForSelector('.ds-raw-text');
  assert.equal(await page.locator('.ds-rich').count(), 0, 'a table is not opened as rich text');
  assert.equal(await page.locator('.ds-raw-note').textContent(), 'This is a table. It is edited as Markdown.');
  assert.equal(await page.locator('.ds-raw-text').inputValue(), '| a | b |\n|---|---|\n| 1 | 2 |');
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();

  await openRich(page, page.locator('.ds-prose ul[data-src]'));
  assert.equal(await editor(page).locator('li').count(), 2);
  await page.keyboard.press('Control+End');
  await page.keyboard.press('Enter');
  await page.keyboard.type('three');
  await button(page, 'Done').click();
  const text = await kept(page, "text.includes('- three')");
  assert.ok(text.includes('- one\n- two\n- three\n'), 'a tight list stays tight, with the marker it had');
  assert.equal(await page.locator('.ds-prose ul li').count(), 3);
});

test('a block the editor holds is written back drawn the same: a paragraph with a link, emphasis and an entity', async () => {
  const { page } = await start();
  await openRich(page);
  await button(page, 'Edit as Markdown').click();
  const odd = 'Some _emphasis_, __strong__, a [link](lesson:every-feature "Title") and `List<int>`, and Stack&lt;T&gt; too.';
  await page.locator('.ds-raw-text').fill(odd);
  await page.getByRole('button', { name: 'Done', exact: true }).click();
  await page.waitForSelector('.ds-prose p:has-text("Stack<T> too")');
  await openRich(page, page.locator('.ds-prose p:has-text("Stack<T> too")'));
  assert.equal(await editor(page).locator('em').textContent(), 'emphasis');
  await page.keyboard.press('Control+End');
  await page.keyboard.type(' More.');
  await button(page, 'Done').click();
  const text = await kept(page, "text.includes('More.')");
  assert.ok(text.includes('Some _emphasis_, __strong__, a [link](lesson:every-feature "Title") and `List<int>`, and Stack&lt;T> too. More.'),
    'the marks the author used are the marks written');
});

test('if the rich editor cannot be fetched, every block opens as Markdown', async () => {
  const { page } = await start((ctx) => ctx.route('**/vendor/rich.bundle.js', route => route.abort()));
  await paragraph(page).click();
  await page.waitForSelector('.ds-raw-text');
  assert.equal(await page.locator('.ds-rich').count(), 0);
  assert.equal(await page.locator('.ds-raw-text').inputValue(), PARAGRAPH);
});

test('the buttons are one stop on Tab, and the arrow keys move along them', async () => {
  const { page } = await start();
  await openRich(page);
  const buttons = page.locator('.ds-rich-bar button');
  assert.equal(await buttons.evaluateAll(nodes => nodes.filter(n => n.tabIndex === 0).length), 1);
  await button(page, 'Bold').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Italic');
  assert.deepEqual(await buttons.evaluateAll(nodes => nodes.filter(n => n.tabIndex === 0).map(n => n.textContent)), ['Italic']);
  await page.keyboard.press('Space');
  assert.equal(await button(page, 'Italic').getAttribute('aria-pressed'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains('ProseMirror')), true, 'a button hands the keyboard back to the text');
});

test('Done puts the keyboard back on the block, and Undo waits while a block is open', async () => {
  const { page } = await start();
  await openRich(page);
  await page.keyboard.press('Control+Home');
  await page.keyboard.type('Back ');
  await page.keyboard.press('Control+Enter');
  await page.waitForSelector('.ds-prose p:has-text("Back This page")');
  assert.equal(await page.evaluate(() => document.activeElement.dataset.src), '13,15', 'focus is on the block that was changed');

  await page.waitForFunction(() => [...document.querySelectorAll('#ds-place-bar button')].some(b => b.textContent === 'Undo' && !b.disabled));
  await openRich(page);
  await page.keyboard.type('half-typed');
  await page.locator('#ds-place-bar').getByRole('button', { name: 'Undo', exact: true }).click();
  assert.equal(await page.locator('.ds-rich').count(), 1, 'the open block stays');
  assert.match(await page.locator('#ds-place-status').textContent(), /Finish or cancel the block that is open first/);
  assert.match(await editor(page).textContent(), /half-typed/, 'and keeps what was typed');
  await button(page, 'Cancel').click();
  await page.locator('#ds-place-bar').getByRole('button', { name: 'Undo', exact: true }).click();
  await page.waitForSelector('.ds-prose p:has-text("This page is a fixture")');
  assert.doesNotMatch(await paragraph(page).textContent(), /Back/);
});
