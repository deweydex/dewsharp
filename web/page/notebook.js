// notebook.html: the learner's own notebooks, saved on this device. C# cells follow the same rules of the
// road as a lesson (each Run is a new program; types carry down). Text cells are Markdown. A lesson's
// challenge opens here as a new notebook (notebook.html?challenge=<page id>&n=<k>). docs/ARCHITECTURE.md,
// "The notebook".
import { parseLesson } from '../lesson/parse.js';
import { el, renderChrome, renderFoot, announce, download, pickFile, today, count, loadIndex } from './common.js';
import { createMarkdown, enhance } from './markdown.js';
import { CodeCell } from './cell.js';
import { startEngine } from './engine.js';
import { projectFiles, zip } from './project.js';
import * as store from './store.js';

const NOTEBOOK_FORMAT = 'dewsharp-notebook';
const main = document.getElementById('main');
const params = new URLSearchParams(location.search);
const md = createMarkdown({ html: false });

renderChrome({ current: 'notebook' });
renderFoot();
const runner = startEngine(document.getElementById('status'));

let nb = null;                  // the open notebook
let views = new Map();          // cell id -> { spec, element, code?: CodeCell }
let saveTimer = null;
let lastDeleted = null;         // { cell, index }, for "Bring it back"
const saveState = el('span', { class: 'ds-nb-saved', role: 'status', 'aria-live': 'polite' });
const message = el('span', { class: 'ds-cell-state', role: 'status', 'aria-live': 'polite' });

await start();

async function start() {
  let id = params.get('nb');
  if (params.get('challenge')) {
    const made = await fromChallenge(params.get('challenge'), Number(params.get('n') || 1));
    if (made) id = made.id;
  }
  const list = await store.listNotebooks();
  nb = (id && await store.getNotebook(id)) || list[0] || await store.putNotebook(firstNotebook());
  history.replaceState(null, '', `notebook.html?nb=${encodeURIComponent(nb.id)}${params.get('sw') ? `&sw=${params.get('sw')}` : ''}`);
  await draw();
  if (!(await store.persistent())) message.textContent = 'This browser is not letting the page save. Your notebook will be lost when you close the page, so export it to a file.';
  document.documentElement.dataset.page = 'ready';
}

function firstNotebook() {
  return {
    id: store.newId('nb'), title: 'My first notebook', created_at: new Date().toISOString(),
    cells: [
      { id: store.newId('c'), type: 'text', code: 'A notebook is yours. Write C# in a code cell and run it, and write notes in a text cell.' },
      { id: store.newId('c'), type: 'code', code: 'Console.WriteLine("Hello!");' },
    ],
  };
}

async function fromChallenge(pageId, n) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pageId)) return null;
  const index = await loadIndex();
  const entry = index.pages[pageId];
  const path = entry?.path ?? `${pageId.replace(/-practice$/, '')}/${pageId}.md`;
  const response = await fetch(`lessons/${path}`).catch(() => null);
  if (!response?.ok) { message.textContent = `The challenge could not be found: there is no page "${pageId}".`; return null; }
  const lesson = parseLesson(await response.text(), { id: pageId });
  const challenge = lesson.items.filter(i => i.type === 'challenge')[n - 1];
  if (!challenge) { message.textContent = 'That page has no such challenge.'; return null; }
  const title = lesson.frontmatter.title || pageId;
  return store.putNotebook({
    id: store.newId('nb'), title: `Challenge: ${title.split(':')[0]}`, created_at: new Date().toISOString(),
    cells: [
      { id: store.newId('c'), type: 'text', code: `The challenge at the end of [${title}](lesson:${pageId}).` },
      { id: store.newId('c'), type: 'code', code: challenge.code },
    ],
  });
}

// ---- drawing

async function draw() {
  const list = await store.listNotebooks();
  const title = el('input', { type: 'text', value: nb.title, 'aria-label': 'Notebook name', id: 'nb-title',
    oninput: () => { nb.title = title.value; scheduleSave(); } });
  title.addEventListener('change', () => refreshPicker());
  const picker = el('select', { id: 'nb-picker', onchange: () => openNotebook(picker.value) },
    list.map(n => el('option', { value: n.id, selected: n.id === nb.id }, n.title || 'Untitled')));
  const cellsBox = el('div', { id: 'nb-cells' });
  views = new Map();
  for (const spec of nb.cells) cellsBox.append(...cellNodes(spec));
  if (!nb.cells.length) cellsBox.append(el('p', { class: 'ds-nb-empty' }, 'This notebook is empty. Add a cell to start.'), addRow(-1));
  else cellsBox.prepend(addRow(-1));
  document.title = `${nb.title || 'My notebook'} — dewsharp`;
  main.replaceChildren(
    el('h1', { class: 'dl-sr-only' }, 'My notebook'),
    el('div', { class: 'ds-nb-title' }, title),
    el('div', { class: 'ds-nb-bar' },
      el('label', { for: 'nb-picker' }, 'Your notebooks'), picker,
      el('button', { type: 'button', class: 'dl-btn', onclick: newNotebook }, 'New notebook'),
      el('button', { type: 'button', class: 'dl-btn', onclick: duplicateNotebook }, 'Duplicate'),
      el('button', { type: 'button', class: 'dl-btn', onclick: deleteNotebook }, 'Delete notebook'),
      saveState),
    el('p', { class: 'ds-cell-time' }, 'Each Run starts a new program. A class in a cell can be used by the cells below it. ', el('a', { href: 'help.html#rules-of-the-road' }, 'The rules of the road')),
    cellsBox,
    el('section', { class: 'ds-nb-files', 'aria-label': 'Files' },
      el('h2', {}, 'Keep your work'),
      el('p', {}, 'Your notebooks are saved in this browser, on this device. Some computers clear that when you log out. Export a notebook to a file to keep it or to hand it in, and import it again on any computer.'),
      el('div', { class: 'ds-notice-actions' },
        el('button', { type: 'button', class: 'dl-btn', onclick: exportNotebook }, 'Export this notebook'),
        el('button', { type: 'button', class: 'dl-btn', onclick: importNotebook }, 'Import a notebook'),
        el('button', { type: 'button', class: 'dl-btn', onclick: exportWork }, 'Export my work'),
        el('button', { type: 'button', class: 'dl-btn', onclick: importWork }, 'Import my work')),
      el('p', {}, 'Export my work saves everything: every notebook, and your work on every lesson page. To take one program to Visual Studio, use Download project on its cell.'),
      message));
  await enhance(main);
  classify();
}

function refreshPicker() {
  const picker = document.getElementById('nb-picker');
  const option = picker?.querySelector(`option[value="${CSS.escape(nb.id)}"]`);
  if (option) option.textContent = nb.title || 'Untitled';
  document.title = `${nb.title || 'My notebook'} — dewsharp`;
}

function tool(label, text, onclick) {
  return el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', 'aria-label': label, title: label, onclick }, text);
}

function cellTools(spec) {
  return [
    tool('Move this cell up', '↑', () => move(spec.id, -1)),
    tool('Move this cell down', '↓', () => move(spec.id, 1)),
    tool('Duplicate this cell', '⧉', () => duplicate(spec.id)),
    tool('Delete this cell', '✕', () => remove(spec.id)),
  ];
}

function position(id) { return nb.cells.findIndex(c => c.id === id); }

function cellNodes(spec) {
  const k = position(spec.id);
  const label = `Cell ${k + 1}`;
  if (spec.type === 'text') return [textCell(spec, label), addRow(k)];
  const download = el('button', { type: 'button', class: 'dl-btn ds-btn-quiet ds-download', title: 'Download this program and the types cells above it as a Visual Studio project' }, 'Download project');
  const cell = new CodeCell({
    runner, id: spec.id, code: spec.code, label,
    cellsFor: (code) => cellsFor(spec.id, code),
    onEdit: (code) => { spec.code = code; scheduleSave(); scheduleClassify(); },
    onGoto: (cellId, line, column) => { const v = views.get(cellId); if (v?.code) { v.element.scrollIntoView({ block: 'center' }); v.code.editor.goTo(line, column); } },
    headTools: cellTools(spec),
    barTools: [download],
  });
  download.addEventListener('click', () => downloadProject(spec.id, download));
  views.set(spec.id, { spec, element: cell.element, code: cell });
  return [cell.element, addRow(k)];
}

function textCell(spec, label) {
  const rendered = el('div', { class: 'ds-nb-rendered' });
  const area = el('textarea', { 'aria-label': `${label}: text, in Markdown`, spellcheck: 'true' });
  area.value = spec.code;
  const toggle = el('button', { type: 'button', class: 'dl-btn' });
  const section = el('section', { class: 'dl-cell ds-nb-text', id: `cell-${spec.id}`, 'aria-label': `${label}, text` },
    el('div', { class: 'dl-cell-head' }, el('span', { class: 'dl-cell-pill' }, el('span', { class: 'dl-cell-pill-type' }, 'text')),
      el('span', { class: 'dl-cell-spacer' }), toggle, ...cellTools(spec)),
    rendered, area);
  const show = (editing) => {
    area.hidden = !editing;
    rendered.hidden = editing;
    toggle.textContent = editing ? 'Done' : 'Edit';
    if (!editing) {
      rendered.innerHTML = spec.code.trim() ? md.render(spec.code) : '<p class="ds-nb-empty">An empty text cell. Press Edit to write in it.</p>';
      enhance(rendered);
    }
  };
  toggle.addEventListener('click', () => { const editing = area.hidden; show(editing); (editing ? area : toggle).focus(); });
  area.addEventListener('input', () => { spec.code = area.value; scheduleSave(); });
  area.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey || e.shiftKey) && e.key === 'Enter') { e.preventDefault(); show(false); toggle.focus(); } });
  rendered.addEventListener('dblclick', () => { show(true); area.focus(); });
  show(!spec.code.trim());
  views.set(spec.id, { spec, element: section });
  return section;
}

function addRow(afterIndex) {
  return el('div', { class: 'ds-nb-add' },
    el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: () => add('code', afterIndex) }, '+ C# cell'),
    el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: () => add('text', afterIndex) }, '+ Text cell'));
}

// ---- cells

/** The cells runner.run() takes: the C# cells above, as they are now, then this one (the rules of the road). */
function cellsFor(id, code) {
  const out = [];
  for (const c of nb.cells) {
    if (c.id === id) { out.push({ id, code }); break; }
    if (c.type === 'code') out.push({ id: c.id, code: views.get(c.id)?.code?.getCode() ?? c.code });
  }
  return out;
}

async function add(type, afterIndex) {
  const spec = { id: store.newId('c'), type, code: '' };
  nb.cells.splice(afterIndex + 1, 0, spec);
  await saveNow();
  await draw();
  const v = views.get(spec.id);
  if (v?.code) v.code.editor.focus(); else v?.element.querySelector('textarea')?.focus();
  announce(type === 'code' ? 'A C# cell was added.' : 'A text cell was added.');
}

async function move(id, by) {
  const k = position(id);
  const to = k + by;
  if (k < 0 || to < 0 || to >= nb.cells.length) return;
  const [spec] = nb.cells.splice(k, 1);
  nb.cells.splice(to, 0, spec);
  await saveNow();
  await draw();
  views.get(id)?.element.querySelector(`[aria-label="${by < 0 ? 'Move this cell up' : 'Move this cell down'}"]`)?.focus();
  announce(`The cell moved ${by < 0 ? 'up' : 'down'}. It is now cell ${to + 1}.`);
}

async function duplicate(id) {
  const k = position(id);
  const copy = { ...nb.cells[k], id: store.newId('c') };
  nb.cells.splice(k + 1, 0, copy);
  await saveNow();
  await draw();
  views.get(copy.id)?.element.scrollIntoView({ block: 'nearest' });
  announce(`The cell was copied. The copy is cell ${k + 2}.`);
}

async function remove(id) {
  const k = position(id);
  if (k < 0) return;
  lastDeleted = { cell: nb.cells[k], index: k };
  nb.cells.splice(k, 1);
  await saveNow();
  await draw();
  message.replaceChildren(`Cell ${k + 1} was deleted. `,
    el('button', { type: 'button', class: 'dl-btn', onclick: undoDelete }, 'Bring it back'));
  message.querySelector('button').focus();
}

async function undoDelete() {
  if (!lastDeleted) return;
  nb.cells.splice(Math.min(lastDeleted.index, nb.cells.length), 0, lastDeleted.cell);
  const id = lastDeleted.cell.id;
  lastDeleted = null;
  message.textContent = '';
  await saveNow();
  await draw();
  views.get(id)?.element.scrollIntoView({ block: 'center' });
}

let classifyTimer = null;
function scheduleClassify() { clearTimeout(classifyTimer); classifyTimer = setTimeout(classify, 400); }
async function classify() {
  const list = nb.cells.filter(c => c.type === 'code').map(c => ({ id: c.id, code: views.get(c.id)?.code?.getCode() ?? c.code }));
  if (!list.length || runner.status === 'unavailable') return;
  try {
    const kinds = await runner.classify(list);
    for (const [id, kind] of Object.entries(kinds)) {
      const v = views.get(id);
      if (!v?.code) continue;
      v.code.setKind(kind);
    }
  } catch { }
}

// ---- notebooks

function scheduleSave() {
  clearTimeout(saveTimer);
  saveState.textContent = '';
  saveTimer = setTimeout(saveNow, 700);
}

async function saveNow() {
  clearTimeout(saveTimer);
  nb = await store.putNotebook(nb);
  saveState.textContent = 'Saved on this device';
  document.documentElement.dataset.saved = String(Date.now());
}

async function openNotebook(id) {
  await saveNow();
  const next = await store.getNotebook(id);
  if (!next) return;
  nb = next;
  history.replaceState(null, '', `notebook.html?nb=${encodeURIComponent(nb.id)}`);
  await draw();
  document.getElementById('nb-picker')?.focus();
}

async function newNotebook() {
  await saveNow();
  const count = (await store.listNotebooks()).length;
  nb = await store.putNotebook({ id: store.newId('nb'), title: `Notebook ${count + 1}`, created_at: new Date().toISOString(),
    cells: [{ id: store.newId('c'), type: 'code', code: '' }] });
  history.replaceState(null, '', `notebook.html?nb=${encodeURIComponent(nb.id)}`);
  await draw();
  document.getElementById('nb-title').select();
  document.getElementById('nb-title').focus();
}

async function duplicateNotebook() {
  await saveNow();
  nb = await store.putNotebook({ ...nb, id: store.newId('nb'), title: `${nb.title} (copy)`, created_at: new Date().toISOString(),
    cells: nb.cells.map(c => ({ ...c, id: store.newId('c') })) });
  history.replaceState(null, '', `notebook.html?nb=${encodeURIComponent(nb.id)}`);
  await draw();
  announce('This is the copy.');
}

async function deleteNotebook() {
  if (!confirm(`Delete the notebook "${nb.title}"? This cannot be undone. Export it first if you want to keep a copy.`)) return;
  await store.deleteNotebook(nb.id);
  const list = await store.listNotebooks();
  nb = list[0] || await store.putNotebook(firstNotebook());
  history.replaceState(null, '', `notebook.html?nb=${encodeURIComponent(nb.id)}`);
  await draw();
  message.textContent = 'The notebook was deleted.';
}

function safeFileName(text) {
  return String(text || 'notebook').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-').toLowerCase() || 'notebook';
}

async function exportNotebook() {
  await saveNow();
  const data = { format: NOTEBOOK_FORMAT, version: 1, exported_at: new Date().toISOString(), title: nb.title,
    cells: nb.cells.map(c => ({ type: c.type, code: c.code })) };
  download(`${safeFileName(nb.title)}.dewsharp.json`, JSON.stringify(data, null, 1));
  message.textContent = `Exported "${nb.title}" to a file.`;
}

async function importNotebook() {
  const text = await pickFile();
  if (text == null) return;
  let data;
  try { data = JSON.parse(text); } catch { data = null; }
  if (data?.format === store.FILE_FORMAT) { message.textContent = 'That is a work file. Use Import my work for it.'; return; }
  if (!data || data.format !== NOTEBOOK_FORMAT || !Array.isArray(data.cells)) {
    message.textContent = 'That file is not a dewsharp notebook. It should come from Export this notebook.';
    return;
  }
  await saveNow();
  nb = await store.putNotebook({ id: store.newId('nb'), title: String(data.title || 'Imported notebook'), created_at: new Date().toISOString(),
    cells: data.cells.filter(c => c && typeof c.code === 'string').map(c => ({ id: store.newId('c'), type: c.type === 'text' ? 'text' : 'code', code: c.code })) });
  history.replaceState(null, '', `notebook.html?nb=${encodeURIComponent(nb.id)}`);
  await draw();
  message.textContent = `Imported "${nb.title}", with ${count(nb.cells.length, 'cell')}.`;
}

async function exportWork() {
  await saveNow();
  const data = await store.exportAll();
  download(`dewsharp-work-${today()}.json`, JSON.stringify(data, null, 1));
  message.textContent = `Exported ${count(data.notebooks.length, 'notebook')} and your work on ${count(new Set(data.work.map(w => w.page)).size, 'lesson page')}.`;
}

async function importWork() {
  const text = await pickFile();
  if (text == null) return;
  try {
    const r = await store.importAll(text);
    const again = await store.getNotebook(nb.id);
    if (again) nb = again;
    await draw();
    message.textContent = `Imported ${count(r.notebooks, 'notebook')} and ${count(r.work, 'lesson cell')}.${r.kept ? ` ${count(r.kept, 'item')} here ${r.kept === 1 ? 'was' : 'were'} newer, so ${r.kept === 1 ? 'it stays' : 'they stay'} as ${r.kept === 1 ? 'it was' : 'they were'}.` : ''}`;
  } catch (e) { message.textContent = e.message; }
}

async function downloadProject(id, button) {
  const v = views.get(id);
  if (!v?.code) return;
  button.disabled = true;
  v.code.setState('making the project…', 'busy');
  try {
    const { name, files } = await projectFiles(runner, cellsFor(id, v.code.getCode()), nb.title);
    download(`${name}.zip`, zip(files));
    v.code.setState(`Downloaded ${name}.zip: unzip it and open ${name}.sln in Visual Studio.`);
  } catch (e) {
    v.code.setState(`The project could not be made: ${e.message}`, 'error');
  } finally {
    button.disabled = false;
  }
}
