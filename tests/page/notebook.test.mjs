// The notebook (web/notebook.html, web/page/notebook.js): code and text cells, the rules of the road across
// cells, saving, several notebooks, moving and deleting cells, a challenge opened from a lesson, a notebook
// file, and a program cell downloaded as a Visual Studio project.
import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  launchSite, openPage, setCode, getCode, stateOf, outputOf, runCell, downloadOf, upload, readZip, VERDICT,
} from './helpers.mjs';

const envs = [];
after(async () => { for (const e of envs) await e.close(); });
const site = async (opts) => { const e = await launchSite(opts); envs.push(e); return e; };

/** The ids of the notebook's cells, in order, with their type. */
const cellsOf = (page) => page.locator('#nb-cells > section').evaluateAll(ns => ns.map(n => ({
  id: n.id.replace(/^cell-/, ''), type: n.classList.contains('ds-nb-text') ? 'text' : 'code' })));
/** Presses "+ C# cell" or "+ Text cell" under the cell at `index` (-1: above the first) and waits for the new cell. */
async function addCell(page, index, type = 'code') {
  const before = (await cellsOf(page)).length;
  await page.locator('.ds-nb-add').nth(index + 1).locator('button', { hasText: type === 'code' ? '+ C# cell' : '+ Text cell' }).click();
  await page.waitForFunction((n) => document.querySelectorAll('#nb-cells > section').length === n, before + 1);
  return cellsOf(page);
}
/** Clicks a cell's tool button and waits until the list of cells has changed. */
async function cellTool(page, id, label) {
  const before = JSON.stringify(await cellsOf(page));
  await page.locator(`#cell-${id} button[aria-label="${label}"]`).click();
  await page.waitForFunction((b) => JSON.stringify([...document.querySelectorAll('#nb-cells > section')].map(n => ({
    id: n.id.replace(/^cell-/, ''), type: n.classList.contains('ds-nb-text') ? 'text' : 'code' }))) !== b, before);
}
const waitSaved = async (page) => {
  const before = await page.evaluate(() => document.documentElement.dataset.saved || '');
  await page.waitForFunction((b) => (document.documentElement.dataset.saved || '') !== b, before, { timeout: 10000 });
};

const PLANET = 'public class Planet\n{\n    public string Name { get; }\n\n    public Planet(string name)\n    {\n        Name = name;\n    }\n}\n';
const USE_PLANET = 'Planet mars = new Planet("Mars");\nConsole.WriteLine($"{mars.Name} costs {12.5:C} to visit.");\n';

test('cells: run, add, the rules of the road across cells, text cells, saved after a reload', async () => {
  const e = await site();
  const { page, ctx, errors } = await openPage(e, 'notebook.html', { engine: true });
  assert.equal(await page.locator('#nb-title').inputValue(), 'My first notebook');
  let cells = await cellsOf(page);
  assert.deepEqual(cells.map(c => c.type), ['text', 'code']);
  await runCell(page, cells[1].id);
  assert.equal(await outputOf(page, cells[1].id), 'Hello!\n');

  // Add a C# cell under the program cell, then another under that: a class, and a program that uses it.
  cells = await addCell(page, 1);
  assert.equal(cells.length, 3);
  assert.equal(await page.evaluate((id) => !!document.activeElement.closest(`#cell-${id}`), cells[2].id), true, 'the new cell has the focus');
  await setCode(page, cells[2].id, PLANET);
  cells = await addCell(page, 2);
  await setCode(page, cells[3].id, USE_PLANET);
  await page.waitForFunction((id) => document.querySelector(`#cell-${id} .dl-cell-pill-type`).dataset.kind === 'types', cells[2].id);
  assert.equal(await page.locator(`#cell-${cells[2].id} .ds-cell-file`).textContent(), 'Planet.cs');
  await runCell(page, cells[2].id);
  assert.match(await stateOf(page, cells[2].id), /^Compiled\. Nothing ran/);
  await runCell(page, cells[3].id);
  assert.equal(await outputOf(page, cells[3].id), 'Mars costs €12.50 to visit.\n');

  // Rule 3: a variable stays in its cell.
  await setCode(page, cells[1].id, 'int score = 10;\nConsole.WriteLine(score);\n');
  cells = await addCell(page, 3);
  await setCode(page, cells[4].id, 'Console.WriteLine(score);\n');
  await runCell(page, cells[4].id);
  assert.equal(await stateOf(page, cells[4].id), 'Did not compile, so nothing ran.');
  assert.match(await page.locator(`#cell-${cells[4].id} .ds-diag`).first().textContent(), /^Program\.cs\(1,19\): error CS0103: /);
  assert.match(await page.locator(`#cell-${cells[4].id} .ds-diag-help`).textContent(), /Variables stay in their cell/);

  // A text cell is Markdown.
  cells = await addCell(page, 4, 'text');
  const text = page.locator(`#cell-${cells[5].id}`);
  await text.locator('textarea').fill('Planets have **names**.');
  await text.locator('button', { hasText: 'Done' }).click();
  assert.equal(await text.locator('.ds-nb-rendered strong').textContent(), 'names');

  // Rename, then reload: everything is still there.
  await page.locator('#nb-title').fill('Planets');
  await waitSaved(page);
  await page.reload();
  await page.waitForFunction(() => document.documentElement.dataset.page === 'ready');
  assert.equal(await page.locator('#nb-title').inputValue(), 'Planets');
  assert.equal(await page.title(), 'Planets — dewsharp');
  const again = await cellsOf(page);
  assert.deepEqual(again.map(c => c.type), ['text', 'code', 'code', 'code', 'code', 'text']);
  assert.equal(await getCode(page, again[3].id), USE_PLANET);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('move, duplicate, delete and bring back a cell; several notebooks', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, 'notebook.html');
  let cells = await cellsOf(page);
  const [textId, codeId] = cells.map(c => c.id);
  await cellTool(page, codeId, 'Move this cell up');
  assert.deepEqual((await cellsOf(page)).map(c => c.id), [codeId, textId]);
  // The focus stays on the button, in the cell's new place.
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Move this cell up');
  await cellTool(page, codeId, 'Duplicate this cell');
  cells = await cellsOf(page);
  assert.equal(cells.length, 3);
  assert.equal(await getCode(page, cells[1].id), await getCode(page, codeId));
  await cellTool(page, cells[1].id, 'Delete this cell');
  assert.equal((await cellsOf(page)).length, 2);
  await page.locator('button', { hasText: 'Bring it back' }).click();
  await page.waitForFunction(() => document.querySelectorAll('#nb-cells > section').length === 3);
  assert.equal((await cellsOf(page)).length, 3);

  await page.locator('button', { hasText: 'New notebook' }).click();
  await page.waitForFunction(() => document.querySelectorAll('#nb-picker option').length === 2);
  assert.equal(await page.locator('#nb-title').inputValue(), 'Notebook 2');
  assert.equal((await cellsOf(page)).length, 1);
  await page.locator('#nb-picker').selectOption({ label: 'My first notebook' });
  await page.waitForFunction(() => document.getElementById('nb-title').value === 'My first notebook');
  assert.equal((await cellsOf(page)).length, 3);
  await ctx.close();
});

test('a challenge from a lesson opens as a new notebook; a notebook file exports and imports', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, 'notebook.html?challenge=every-feature&n=1');
  assert.equal(await page.locator('#nb-title').inputValue(), 'Challenge: Every feature');
  assert.match(page.url(), /notebook\.html\?nb=nb-/);
  const cells = await cellsOf(page);
  assert.deepEqual(cells.map(c => c.type), ['text', 'code']);
  assert.equal(await getCode(page, cells[1].id), '// A running total that never goes below zero.\nint[] changes = { 5, -3, -4, 6, -10, 2 };');
  assert.equal(await page.locator(`#cell-${cells[0].id} a`).getAttribute('href'), 'lesson.html?id=every-feature');

  const file = await downloadOf(page, () => page.locator('button', { hasText: 'Export this notebook' }).click());
  assert.equal(file.name, 'challenge-every-feature.dewsharp.json');
  const data = JSON.parse(file.bytes.toString('utf8'));
  assert.equal(data.format, 'dewsharp-notebook');
  assert.deepEqual(data.cells.map(c => c.type), ['text', 'code']);
  await upload(page, file.name, file.bytes, () => page.locator('button', { hasText: 'Import a notebook' }).click());
  await page.waitForFunction(() => document.querySelectorAll('#nb-picker option').length === 2);
  assert.match(await page.locator('.ds-nb-files [role=status]').last().textContent(), /Imported "Challenge: Every feature", with 2 cells\./);
  assert.doesNotMatch(await page.locator('main').textContent(), VERDICT);
  await ctx.close();
});

test('Download project: a Visual Studio project with the page\'s settings, one file per types cell above, no Console shim', async () => {
  const e = await site();
  const { page, ctx } = await openPage(e, 'notebook.html', { engine: true });
  let cells = await cellsOf(page);
  await setCode(page, cells[1].id, PLANET);
  cells = await addCell(page, 1);
  await setCode(page, cells[2].id, 'int answer = 42;\nConsole.WriteLine(answer);\n');
  cells = await addCell(page, 2);
  const program = cells[3].id;
  await setCode(page, program, USE_PLANET + 'Console.ForegroundColor = ConsoleColor.Red;\nConsole.WriteLine(DateTime.Parse("2026-09-03").ToString("d"));\nConsole.ResetColor();\n');
  await runCell(page, program);
  assert.equal(await outputOf(page, program), 'Mars costs €12.50 to visit.\n03/09/2026\n');
  // Only a program cell offers a project.
  assert.equal(await page.locator(`#cell-${cells[1].id} .ds-download`).isVisible(), false);

  const file = await downloadOf(page, () => page.locator(`#cell-${program} .ds-download`).click());
  assert.equal(file.name, 'MyFirstNotebook.zip');
  if (process.env.DS_ZIP_OUT) fs.writeFileSync(process.env.DS_ZIP_OUT, file.bytes);
  const files = Object.fromEntries(readZip(file.bytes).map(f => [f.name, f.text]));
  assert.deepEqual(Object.keys(files).sort(), [
    'MyFirstNotebook.sln', 'MyFirstNotebook/IrishCulture.cs', 'MyFirstNotebook/MyFirstNotebook.csproj',
    'MyFirstNotebook/Planet.cs', 'MyFirstNotebook/Program.cs', 'README.txt']);
  assert.equal(files['MyFirstNotebook/Planet.cs'], PLANET);
  assert.match(files['MyFirstNotebook/Program.cs'], /^Planet mars = new Planet\("Mars"\);/);
  assert.doesNotMatch(files['MyFirstNotebook/Program.cs'], /answer/, 'statements in cells above stay out (rule 3)');
  const csproj = files['MyFirstNotebook/MyFirstNotebook.csproj'];
  for (const setting of ['<OutputType>Exe</OutputType>', '<TargetFramework>net10.0</TargetFramework>', '<LangVersion>14</LangVersion>',
    '<ImplicitUsings>enable</ImplicitUsings>', '<Nullable>disable</Nullable>']) assert.ok(csproj.includes(setting), setting);
  assert.match(files['MyFirstNotebook/IrishCulture.cs'], /CultureInfo\.GetCultureInfo\("en-IE"\)/);
  assert.match(files['MyFirstNotebook.sln'], /"MyFirstNotebook", "MyFirstNotebook\\MyFirstNotebook\.csproj"/);
  for (const [name, text] of Object.entries(files)) assert.doesNotMatch(text, /Dewsharp|global using Console/, `${name} has no shim`);
  assert.match(files['README.txt'], /Double-click MyFirstNotebook\.sln/);
  await ctx.close();
});
