// The draft kept on GitHub (web/page/remotedraft.js, web/page/github.js `draft`, and their part of
// web/page/inplace.js), in a browser, with GitHub replaced by a stand-in that keeps draft branches in memory.
// A change is saved to a branch a few seconds after it is made; a draft there is opened again on another
// computer if the page has not changed; a save from somewhere else is not written over; and proposing, or
// starting again, takes the branch away.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { launchSite, openPage, withToken, caretToStart, GH, FIXTURE_PAGE, FIXTURE_SOURCE } from './helpers.mjs';
import { gitBlobSha } from '../../web/page/github.js';

const BRANCH = 'draft/josh/every-feature';
const PLACE = 'lesson.html?id=every-feature&edit=place&draftdelay=300';
const SOURCE = FIXTURE_SOURCE;
const PARAGRAPH = SOURCE.split('\n').slice(12, 15).join('\n');
const MINE = SOURCE.replace(PARAGRAPH, 'Mine. ' + PARAGRAPH);
const THEIRS = SOURCE.replace(PARAGRAPH, 'Theirs. ' + PARAGRAPH);

const envs = [];
after(async () => { for (const e of envs) await e.close(); });

/** Opens the page for editing. `seed(calls.drafts, ctx)` runs first, as if another computer had saved a draft. */
async function start({ seed, overrides } = {}) {
  const e = await launchSite();
  envs.push(e);
  const { ctx, calls } = await withToken(e, overrides);
  if (seed) await seed(calls.drafts, ctx);
  const opened = await openPage(e, PLACE, { context: ctx });
  await opened.page.waitForSelector('.ds-place-bar');
  return { ...opened, calls, drafts: calls.drafts };
}

const remoteStatus = (page) => page.locator('#ds-place-remote');
const paragraph = (page) => page.locator('.ds-prose p[data-src="13,15"]');
/** Adds `words` at the start of the paragraph, as an author would, in the rich editor. */
async function type(page, words) {
  await paragraph(page).click();
  await page.waitForSelector('.ds-rich .ProseMirror');
  await caretToStart(page);
  await page.keyboard.type(words);
  await page.keyboard.press('Control+Enter');
  await page.waitForSelector(`.ds-prose p:has-text("${words.trim()}")`);
}
const saved = (page, drafts, text) => page.waitForFunction(() => /Draft kept on GitHub at/.test(document.getElementById('ds-place-remote').textContent), null, { timeout: 10000 })
  .then(() => assert.equal(drafts.get(BRANCH)?.text, text));
const seeded = async (text, { base = SOURCE, savedAt = new Date().toISOString(), sha = 'seedsha' } = {}) =>
  new Map([[BRANCH, { text, sha, baseBlob: await gitBlobSha(base), savedAt }]]);

test('a change is saved to a branch of its own, then again with one call, and carries the page it was made from', async () => {
  const { page, calls, drafts } = await start();
  assert.equal(drafts.size, 0, 'nothing is kept on GitHub until there is something to keep');
  await type(page, 'Mine. ');
  await saved(page, drafts, MINE);
  const made = calls.filter(c => c.remote && c.key === `POST ${GH}/git/refs`);
  assert.equal(made.length, 1);
  assert.deepEqual(made[0].body.ref, `refs/heads/${BRANCH}`);
  assert.equal(drafts.get(BRANCH).baseBlob, await gitBlobSha(SOURCE));
  const before = calls.length;
  await type(page, 'And more. ');
  await page.waitForFunction(() => /Draft kept on GitHub at/.test(document.getElementById('ds-place-remote').textContent));
  await page.waitForFunction(() => document.getElementById('ds-place-remote').textContent.length > 0);
  await page.waitForTimeout(800);
  const after = calls.slice(before).filter(c => c.remote).map(c => c.key);
  assert.deepEqual(after, [`PUT ${GH}/contents/${FIXTURE_PAGE}`], 'the second save is one call');
  assert.equal(drafts.get(BRANCH).text, SOURCE.replace(PARAGRAPH, 'And more. Mine. ' + PARAGRAPH));
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('dewsharp:draft:every-feature')).text.includes('And more. Mine.')), true, 'and this browser has it too');
});

test('a draft on GitHub is opened on another computer, if the page has not changed since', async () => {
  const { page } = await start({ seed: async (drafts) => { drafts.set(BRANCH, (await seeded(MINE)).get(BRANCH)); } });
  await page.waitForSelector('.ds-prose p:has-text("Mine. This page")');
  assert.match(await page.locator('.ds-place-notice').textContent(), /unsaved draft from .* was kept on GitHub, and it is open now/);
  assert.match(await remoteStatus(page).textContent(), /Draft kept on GitHub at/);
});

test('a draft made from an older page is not opened, and can be read as text', async () => {
  const { page, drafts } = await start({ seed: async (drafts) => { drafts.set(BRANCH, (await seeded(MINE, { base: SOURCE + '\nAn older page.\n' })).get(BRANCH)); } });
  await page.waitForSelector('.ds-place-notice .ds-notice');
  assert.match(await page.locator('.ds-place-notice').textContent(), /GitHub has a draft of this page from .*before the page was changed, so it was not opened/);
  assert.equal(await page.locator('.ds-prose p:has-text("Mine. This page")').count(), 0);
  await page.locator('.ds-place-notice').getByRole('button', { name: 'Show it as text' }).click();
  assert.match(await page.locator('#ds-edit-text').inputValue(), /Mine\. This page is a fixture/);
  assert.equal(drafts.size, 1, 'and it is still there');
});

test('a save from somewhere else is not written over: the author chooses, and Open takes theirs', async () => {
  const { page, drafts } = await start();
  await type(page, 'Mine. ');
  await saved(page, drafts, MINE);
  Object.assign(drafts.get(BRANCH), { text: THEIRS, sha: 'elsewhere', savedAt: new Date().toISOString() });
  await type(page, 'Again. ');
  await page.waitForSelector('.ds-choice');
  assert.match(await page.locator('.ds-choice').textContent(), /saved from somewhere else/);
  assert.equal(drafts.get(BRANCH).text, THEIRS, 'nothing was written over it');
  await page.locator('.ds-choice').getByRole('button', { name: 'Open the one from GitHub' }).click();
  await page.waitForSelector('.ds-prose p:has-text("Theirs. This page")');
  assert.equal(await page.locator('.ds-choice').count(), 0);
  assert.equal(drafts.get(BRANCH).text, THEIRS);
});

test('...and Keep makes this page\'s draft the one on GitHub', async () => {
  const { page, drafts } = await start();
  await type(page, 'Mine. ');
  await saved(page, drafts, MINE);
  Object.assign(drafts.get(BRANCH), { text: THEIRS, sha: 'elsewhere' });
  await type(page, 'Again. ');
  await page.waitForSelector('.ds-choice');
  await page.locator('.ds-choice').getByRole('button', { name: 'Keep the one open here' }).click();
  await page.waitForFunction(() => /Draft kept on GitHub at/.test(document.getElementById('ds-place-remote').textContent), null, { timeout: 10000 });
  assert.equal(drafts.get(BRANCH).text, SOURCE.replace(PARAGRAPH, 'Again. Mine. ' + PARAGRAPH));
});

test('two different drafts at the start: this browser\'s older one and GitHub\'s newer one; the author chooses', async () => {
  const local = JSON.stringify({ text: MINE, base: SOURCE, savedAt: '2026-10-01T09:00:00.000Z' });
  const { page, drafts } = await start({
    seed: async (drafts, ctx) => {
      drafts.set(BRANCH, (await seeded(THEIRS, { savedAt: '2026-10-03T09:00:00.000Z' })).get(BRANCH));
      await ctx.addInitScript((value) => { try { if (!localStorage.getItem('dewsharp:draft:every-feature')) localStorage.setItem('dewsharp:draft:every-feature', value); } catch { } }, local);
    },
  });
  await page.waitForSelector('.ds-choice');
  assert.match(await page.locator('.ds-choice').textContent(), /GitHub has a different draft of this page/);
  assert.equal(await page.locator('.ds-prose p:has-text("Mine. This page")').count(), 1, 'this browser\'s is open until the author chooses');
  assert.equal(drafts.get(BRANCH).text, THEIRS, 'and nothing is saved over GitHub\'s');
  await page.locator('.ds-choice').getByRole('button', { name: 'Open the one from GitHub' }).click();
  await page.waitForSelector('.ds-prose p:has-text("Theirs. This page")');
  await page.locator('#ds-place-bar').getByRole('button', { name: 'Undo', exact: true }).click();
  await page.waitForSelector('.ds-prose p:has-text("Mine. This page")');
});

test('proposing takes the draft branch away, and so does Start again', async () => {
  const { page, calls, drafts } = await start();
  await type(page, 'Mine. ');
  await saved(page, drafts, MINE);
  await page.locator('#ds-edit-summary').fill('Mine first');
  await page.waitForFunction(() => !document.querySelector('#ds-place-propose button[type=submit]').disabled);
  await page.getByRole('button', { name: 'Propose this change' }).click();
  await page.waitForSelector('#ds-edit-pull');
  await page.waitForFunction(() => /The draft on GitHub was removed/.test(document.getElementById('ds-place-remote').textContent));
  assert.equal(drafts.size, 0);
  assert.ok(calls.some(c => c.key.startsWith('DELETE ') && c.key.endsWith(BRANCH)));
  // The pull request came from a branch of its own, not from the draft.
  assert.match(calls.find(c => c.key === `POST ${GH}/pulls`).body.head, /^edit\/every-feature-/);

  const again = await start();
  await type(again.page, 'Mine. ');
  await saved(again.page, again.drafts, MINE);
  again.page.once('dialog', d => d.accept());
  await again.page.locator('#ds-place-bar').getByRole('button', { name: 'Start again', exact: true }).click();
  await again.page.waitForFunction(() => document.getElementById('ds-place-remote').textContent === '', null, { timeout: 10000 });
  assert.equal(again.drafts.size, 0, 'a draft that was set aside is not left to come back on another computer');
});

test('Stop editing saves what GitHub has not seen before it leaves', async () => {
  const { page, drafts } = await start();
  await page.goto(page.url().replace('draftdelay=300', 'draftdelay=60000'));
  await page.waitForSelector('.ds-place-bar');
  await type(page, 'Mine. ');
  assert.equal(drafts.size, 0, 'the long wait has not run out');
  await page.locator('#ds-place-stop').click();
  await page.waitForFunction(() => !new URLSearchParams(location.search).has('edit'), null, { timeout: 15000 });
  assert.equal(drafts.get(BRANCH)?.text, MINE);
});

test('if GitHub will not take the draft, the page says so and the browser keeps it', async () => {
  const { page, drafts } = await start({
    overrides: { [`PUT ${GH}/contents/${FIXTURE_PAGE}`]: ({ body }) => (body.branch.startsWith('draft/') ? [403, { message: 'Resource not accessible by personal access token' }] : [200, {}]) },
  });
  await type(page, 'Mine. ');
  await page.waitForFunction(() => /Not kept on GitHub/.test(document.getElementById('ds-place-remote').textContent), null, { timeout: 10000 });
  assert.match(await remoteStatus(page).textContent(), /The token is not allowed to do this.*It is kept in this browser/);
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('dewsharp:draft:every-feature') || 'null')?.text.includes('Mine. This page'), null, { timeout: 5000 });
  assert.equal(drafts.get(BRANCH)?.text === MINE, false);
});
