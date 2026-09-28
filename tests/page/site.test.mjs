// The pages around the lessons: the home page, a course page, help, teachers, the device check, and what
// every page shares (noindex, the service worker, dewlab's settings snippet, the settings panel).
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { launchSite, openPage, VERDICT } from './helpers.mjs';
import { repoRoot } from '../../tools/lib/static.mjs';

const PAGES = ['index.html', 'course.html', 'lesson.html', 'notebook.html', 'help.html', 'teachers.html', 'check.html'];
const envs = [];
after(async () => { for (const e of envs) await e.close(); });
const site = async () => { const e = await launchSite(); envs.push(e); return e; };

test('every page: noindex, the service worker first in <head>, and dewlab\'s settings snippet', () => {
  // The snippet must stay dewlab's (dewlab/assets/shell.html), so that a setting made on either site shows on both.
  const snippet = /localStorage\.getItem\("dewlab:texture"\)[\s\S]*?--dl-code-line-height", s\.codeLineHeight\)/;
  for (const name of PAGES) {
    const html = fs.readFileSync(path.join(repoRoot, 'web', name), 'utf8');
    const head = html.slice(0, html.indexOf('</head>'));
    assert.match(head, /<meta name="robots" content="noindex">/, name);
    assert.match(head, /<script src="coi-serviceworker\.js"><\/script>/, name);
    assert.ok(head.indexOf('coi-serviceworker.js') < head.indexOf('<script>\n'), `${name}: the service worker comes before other scripts`);
    assert.match(head, snippet, name);
    assert.match(html, /<html lang="en-IE">/, `${name}: lang en-IE`);
    assert.match(html, /<main id="main" tabindex="-1">/, name);
  }
});

test('the home page: the two courses as cards, the notebook, help and teachers, and dewlab', async () => {
  const e = await site();
  const { page, ctx, errors } = await openPage(e, 'index.html');
  assert.equal(await page.locator('h1').textContent(), 'C# in your browser');
  const card = page.locator('a.ds-card[href="course.html?c=fixture"]');
  assert.match(await card.textContent(), /A fixture course/);
  assert.equal(await page.locator('a.ds-card[href="notebook.html"]').count(), 1);
  for (const href of ['help.html', 'teachers.html', 'check.html']) assert.ok(await page.locator(`main a[href="${href}"]`).count() >= 1, href);
  assert.match(await page.locator('.ds-sibling').textContent(), /C# sibling of dewlab/);
  assert.doesNotMatch(await page.locator('body').textContent(), VERDICT);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('a course page: series and lessons in order, practice links, a planned lesson; an unknown course', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, 'course.html?c=fixture');
  assert.equal(await page.locator('h1').textContent(), 'A fixture course');
  assert.equal(await page.locator('.ds-series h2').first().textContent(), 'Everything');
  assert.equal(await page.locator('.ds-lessons a').first().getAttribute('href'), 'lesson.html?id=every-feature&c=fixture');
  assert.equal(await page.locator('.ds-lesson-practice').getAttribute('href'), 'lesson.html?id=every-feature-practice&c=fixture');
  // A planned lesson: its title from planned:, and no link.
  const later = page.locator('.ds-lesson-later');
  assert.match(await later.textContent(), /^A later lesson: listed, and not written yet\s*not written yet$/);
  assert.equal(await later.locator('a').count(), 0);
  const missing = await openPage(e, 'course.html?c=nothing', { context: ctx });
  assert.equal(await missing.page.locator('h1').textContent(), 'There is no course here');
  await ctx.close();
});

test('the settings: the same localStorage key as dewlab, applied at once, and from the keyboard', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, 'help.html');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Skip to the page');
  const toggle = page.locator('.ds-nav button', { hasText: 'Settings' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  await page.locator('#ds-settings input[name=ds-theme][value=dark]').check();
  await page.locator('#ds-settings input[name=ds-contrast][value=high]').check();
  await page.locator('#ds-settings input[name=ds-size][value="20"]').check();
  const root = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme, contrast: document.documentElement.dataset.contrast,
    size: document.documentElement.style.getPropertyValue('--dl-font-size'), stored: JSON.parse(localStorage.getItem('dewlab:texture')) }));
  assert.deepEqual(root, { theme: 'dark', contrast: 'high', size: '20px', stored: { theme: 'dark', contrast: 'high', size: 20 } });
  // A setting made on dewlab (which also stores its default link colour) shows here, before the first paint.
  await page.evaluate(() => localStorage.setItem('dewlab:texture', JSON.stringify({ theme: 'light', font: 'opendyslexic', link: '#d4692a', motion: 'reduced', buttons: 'icons' })));
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.page === 'ready');
  const after = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme, font: document.documentElement.dataset.font,
    motion: document.documentElement.dataset.motion, link: document.documentElement.style.getPropertyValue('--dl-link'),
    family: getComputedStyle(document.body).fontFamily }));
  assert.deepEqual(after, { theme: 'light', font: 'opendyslexic', motion: 'reduced', link: '', family: after.family });
  assert.match(after.family, /OpenDyslexic/);
  await ctx.close();
});

test('help and teachers: no verdicts, highlighted examples, and the rules of the road in the same words', async () => {
  const e = await site();
  for (const [address, heading] of [['help.html', 'How the pages work'], ['teachers.html', 'For teachers']]) {
    const { page, ctx, errors } = await openPage(e, address);
    assert.equal(await page.locator('h1').textContent(), heading);
    assert.doesNotMatch(await page.locator('main').textContent(), VERDICT, address);
    assert.ok(await page.locator('pre.dl-static[data-lang=csharp] .tok-keyword').count() > 0 || address !== 'help.html', 'help highlights its examples');
    assert.deepEqual(errors, []);
    await ctx.close();
  }
  const help = fs.readFileSync(path.join(repoRoot, 'web/help.html'), 'utf8');
  for (const rule of ['Each Run starts a new program.', 'A class written in a cell can be used by the cells below it.',
    'Variables stay in their cell.', 'A class written again further down replaces the earlier one.', '<code>Main</code> stays in its cell'])
    assert.ok(help.includes(rule), `help.html states the rule in CLAUDE.md's words: ${rule}`);
});
