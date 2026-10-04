// The editing mode (web/page/edit.js, web/page/github.js, and its part of web/page/lesson.js) in a browser,
// with GitHub replaced by a stand-in that records what the page sends it. A person with no token sees no
// sign of editing; Settings turns it on after GitHub has accepted the token; the text box checks the page as
// the parser does and warns about cell ids and versions; the preview shows the draft and keeps no saved
// work; Propose sends a draft pull request and nothing else.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { launchSite, openPage, savedRecord, fakeGithub, withToken, GH, FIXTURE_PAGE, FIXTURE_SOURCE } from './helpers.mjs';
import { toBase64, fromBase64 } from '../../web/page/github.js';

const LESSON = 'lesson.html?id=every-feature';
const PAGE = FIXTURE_PAGE;
const SOURCE = FIXTURE_SOURCE;
const R = GH;

const envs = [];
after(async () => { for (const e of envs) await e.close(); });
const site = async () => { const e = await launchSite(); envs.push(e); return e; };

/** Replaces everything in the text box, as a paste would. */
const setText = (page, text) => page.locator('#ds-edit-text').fill(text);
const problems = (page) => page.locator('.ds-edit-problems');
const settled = (page) => page.waitForTimeout(450);

test('with no token, no page shows any sign of editing, and Settings says editing is off', async () => {
  const e = await site();
  const { page, errors } = await openPage(e, LESSON);
  assert.equal(await page.locator('#ds-edit-open').count(), 0);
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.locator('#ds-editing summary').click();
  assert.match(await page.locator('#ds-token-status').textContent(), /Editing is off/);
  assert.deepEqual(errors, []);
});

test('Settings: a token is kept only after GitHub accepts it, and turning editing off forgets it', async () => {
  const e = await site();
  const ctx = await e.browser.newContext();
  const calls = await fakeGithub(ctx, { 'GET /user': [401, { message: 'Bad credentials' }] });
  const { page } = await openPage(e, LESSON, { context: ctx });
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.locator('#ds-editing summary').click();
  await page.locator('#ds-token').fill('wrong');
  await page.getByRole('button', { name: 'Turn editing on' }).click();
  await page.waitForFunction(() => /did not accept the token/.test(document.getElementById('ds-token-status').textContent));
  assert.equal(await page.evaluate(() => localStorage.getItem('dewsharp:edit:token')), null);

  await ctx.unroute('https://api.github.com/**');
  await fakeGithub(ctx);
  await page.locator('#ds-token').fill('good-token');
  await page.getByRole('button', { name: 'Turn editing on' }).click();
  await page.waitForFunction(() => /Editing is on, as josh/.test(document.getElementById('ds-token-status').textContent));
  assert.equal(await page.evaluate(() => localStorage.getItem('dewsharp:edit:token')), 'good-token');
  assert.equal(await page.locator('#ds-token').inputValue(), '', 'the token is not left in the box');

  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.page === 'ready');
  assert.equal(await page.locator('#ds-edit-open').count(), 1, 'the page now offers Edit this page');
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.locator('#ds-editing summary').click();
  await page.getByRole('button', { name: 'Turn editing off' }).click();
  assert.equal(await page.evaluate(() => localStorage.getItem('dewsharp:edit:token')), null);
  assert.ok(calls.length >= 1);
});

test('Edit this page: the source, a live check, the notes about ids and versions, and a snippet', async () => {
  const e = await site();
  const { ctx } = await withToken(e);
  const { page, errors } = await openPage(e, LESSON, { context: ctx });
  await page.locator('#ds-edit-open').click();
  assert.equal(await page.locator('#main').isHidden(), true, 'the page is out of the way while editing');
  assert.equal(await page.locator('#ds-edit-text').inputValue(), SOURCE);
  assert.match(await problems(page).textContent(), /You have not changed anything yet/);
  assert.equal(await page.getByRole('button', { name: 'Propose this change' }).isDisabled(), true);

  // A cell with no id is a problem the parser names, with its line.
  await setText(page, SOURCE.replace('id: a-first-program-1\n', ''));
  await settled(page);
  assert.match(await problems(page).textContent(), /1 problem in the text/);
  assert.match(await problems(page).textContent(), /Line \d+:/);
  assert.equal(await page.getByRole('button', { name: 'Propose this change' }).isDisabled(), true);

  // Taking a cell out warns that saved work in it will not show; changing code asks for a new version.
  const without = SOURCE.replace(/```csharp exec\nid: a-first-program-1[\s\S]*?```\n/, '');
  await setText(page, without);
  await settled(page);
  assert.match(await page.locator('.ds-edit-notes').textContent(), /not there any more: a-first-program-1/);

  await setText(page, SOURCE.replace('Console.WriteLine("Hello!");', 'Console.WriteLine("Hello, class!");'));
  await settled(page);
  const note = page.locator('.ds-edit-notes li', { hasText: 'Change version' });
  assert.equal(await note.count(), 1);
  assert.match(await note.textContent(), /a-first-program-1/);
  await note.getByRole('button', { name: 'Set version to today' }).click();
  await settled(page);
  assert.match(await page.locator('#ds-edit-text').inputValue(), /^version: \d{4}\.\d{2}\.\d{2}\.\d+$/m);
  assert.doesNotMatch(await page.locator('#ds-edit-text').inputValue(), /version: 2026\.09\.27\.1/);
  assert.equal(await page.locator('.ds-edit-notes li', { hasText: 'Change version' }).count(), 0);

  // A snippet is added where the cursor is, and what it adds is valid.
  await setText(page, SOURCE);
  await page.locator('#ds-edit-text').evaluate((n) => { n.setSelectionRange(n.value.length, n.value.length); });
  await page.getByRole('button', { name: 'Cell', exact: true }).click();
  await settled(page);
  const text = await page.locator('#ds-edit-text').inputValue();
  assert.match(text, /```csharp exec\nid: new-cell-1\nConsole\.WriteLine\("Hello"\);\n```\n$/);
  assert.match(await problems(page).textContent(), /No problems found/);
  assert.deepEqual(errors, []);
});

test('Preview draws the draft, uses no saved work, and writes none', async () => {
  const e = await site();
  const { ctx } = await withToken(e);
  const { page } = await openPage(e, `${LESSON}&edit=1`, { context: ctx });
  assert.equal(await page.locator('#ds-edit').count(), 1, '?edit opens the editor directly');
  await setText(page, SOURCE.replace('# Every feature', '# Every feature, edited').replace('Console.WriteLine("Hello!");', 'Console.WriteLine("Hello, preview!");'));
  await page.getByRole('button', { name: 'Preview' }).click();
  await page.waitForSelector('#main .ds-notice:has-text("preview of your changes")');
  assert.equal(await page.locator('#main h1').first().textContent(), 'Every feature, edited');
  assert.match(await page.locator('#cell-a-first-program-1 .cm-content').textContent(), /Hello, preview!/);
  // An edit in a previewed cell is not saved under the lesson's real cell id.
  await page.locator('#cell-a-first-program-1 .cm-content').click();
  await page.keyboard.type('// typed in the preview');
  await page.waitForTimeout(900);
  assert.equal(await savedRecord(page, 'every-feature/a-first-program-1'), null);
  // Back to the text, which still holds the draft.
  await page.getByRole('button', { name: 'Edit', exact: true }).click();
  assert.equal(await page.locator('#main').isHidden(), true);
  assert.match(await page.locator('#ds-edit-text').inputValue(), /Every feature, edited/);
});

test('Propose sends a branch, the file, and a draft pull request, and says where it is', async () => {
  const e = await site();
  const { ctx, calls } = await withToken(e);
  const { page } = await openPage(e, `${LESSON}&edit=1`, { context: ctx });
  const edited = SOURCE.replace('This page is a fixture for the tests.', 'This page is a fixture for the tests, with a café.');
  await setText(page, edited);
  await page.locator('#ds-edit-summary').fill('Add a café to the opening');
  await page.locator('#ds-edit-more').fill('For the Irish lessons.');
  await settled(page);
  await page.getByRole('button', { name: 'Propose this change' }).click();
  await page.waitForSelector('#ds-edit-pull');
  assert.equal(await page.locator('#ds-edit-pull').getAttribute('href'), 'https://github.com/deweydex/dewsharp/pull/99');

  const keys = calls.map(c => c.key);
  assert.deepEqual(keys, [
    `GET ${R}/git/ref/heads/main`, `GET ${R}/contents/${PAGE}`, `POST ${R}/git/refs`, `PUT ${R}/contents/${PAGE}`, `POST ${R}/pulls`,
  ]);
  assert.ok(calls.every(c => c.auth === 'Bearer test-token'));
  const branch = calls[2].body.ref.replace('refs/heads/', '');
  assert.match(branch, /^edit\/every-feature-\d{8}-\d{6}-[a-z0-9]{3}$/);
  const put = calls[3].body;
  assert.equal(put.branch, branch);
  assert.equal(put.sha, 'filesha');
  assert.equal(put.message, 'Add a café to the opening');
  assert.equal(fromBase64(put.content), edited, 'the text goes up exactly as it was typed, accents included');
  const pull = calls[4].body;
  assert.equal(pull.draft, true);
  assert.equal(pull.base, 'main');
  assert.equal(pull.head, branch);
  assert.equal(pull.title, 'Add a café to the opening');
  assert.match(pull.body, /^For the Irish lessons\./);
  assert.match(pull.body, new RegExp('Page: `' + PAGE + '`'));
  assert.match(pull.body, /it changes nothing on the site until it is merged/);
  assert.equal(await page.getByRole('button', { name: 'Propose this change' }).isDisabled(), true, 'the form is finished');
});

test('Propose when the page has changed on GitHub: nothing is written and the reason is given', async () => {
  const e = await site();
  const { ctx, calls } = await withToken(e, { [`GET ${R}/contents/${PAGE}`]: [200, { sha: 'newer', content: toBase64(SOURCE + '\nSomeone else was here.\n') }] });
  const { page } = await openPage(e, `${LESSON}&edit=1`, { context: ctx });
  await setText(page, SOURCE.replace('Every feature', 'Every feature again'));
  await page.locator('#ds-edit-summary').fill('Retitle');
  await settled(page);
  await page.getByRole('button', { name: 'Propose this change' }).click();
  await page.waitForSelector('.ds-edit-result[role=alert]');
  assert.match(await page.locator('.ds-edit-result').textContent(), /changed on GitHub since you opened it/);
  assert.ok(!calls.some(c => c.key.startsWith('POST') || c.key.startsWith('PUT')));
  assert.equal(await page.getByRole('button', { name: 'Propose this change' }).isDisabled(), false, 'the author can try again');
});
