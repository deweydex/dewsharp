// The lesson page, lesson.html?id=<page id>: a lesson (or a practice page) rendered in the browser from its
// Markdown (docs/LESSON_FORMAT.md) through web/lesson/parse.js (docs/PARSER.md), with runnable cells, worlds,
// guesses, hints, solutions, the comparison, challenges, and saved work. docs/ARCHITECTURE.md, "The page".
import { parseLesson, cellsForRun, cellsOf } from '../lesson/parse.js';
import { el, renderChrome, renderFoot, loadIndex, placeOf, announce, download, pickFile, today, count } from './common.js';
import { createMarkdown, enhance, staticCodeHtml } from './markdown.js';
import { CodeCell } from './cell.js';
import { guessMatches } from './guess.js';
import { projectFiles, zip } from './project.js';
import { startEngine } from './engine.js';
import * as store from './store.js';
import { githubClient, readToken } from './github.js';
import { startInPlace } from './inplace.js';
import { remoteDraft } from './remotedraft.js';
import { Draft, loadDraft } from './draft.js';

const params = new URLSearchParams(location.search);
const pageId = params.get('id') || '';
const courseHint = params.get('c');
const main = document.getElementById('main');
const statusEl = document.getElementById('status');

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

let lesson = null;            // the parsed page
let md = null;
let runner = null;
let world = null;             // the chosen world's key, or null
const cells = new Map();      // cell id -> { item, cell: CodeCell, predict, hints, attempts, compare }
let saved = new Map();        // cell id -> saved record
let sourceText = '';          // the page's Markdown as the site has it
let pagePath = '';            // its path under lessons/
let pageIds = [];             // every page of the site, for the links an author writes
let previewing = false;       // showing a draft from the editing mode: saved work is neither read nor written
let place = null;             // editing on the page: { draft, controller }, while it is on

start().catch((e) => {
  console.error(e);
  main.replaceChildren(el('h1', {}, 'This page could not be shown'), el('p', {}, String(e.message || e)));
});

async function start() {
  renderFoot();
  if (!SLUG.test(pageId)) return notFound();
  const index = await loadIndex();
  pageIds = Object.keys(index.pages);
  const entry = index.pages[pageId];
  const lessonId = entry?.lesson ?? pageId.replace(/-practice$/, '');
  const path = entry?.path ?? `${lessonId}/${pageId}.md`;
  const response = await fetch(`lessons/${path}`, { cache: 'no-cache' }).catch(() => null);
  if (!response || !response.ok) return notFound();
  const source = await response.text();
  sourceText = source;
  pagePath = path;
  lesson = parseLesson(source, { id: pageId });
  md = createMarkdown({ html: true, base: `lessons/${path.slice(0, path.lastIndexOf('/') + 1)}` });

  const title = lesson.frontmatter.title || pageId;
  document.title = `${title} — dewsharp`;
  const place = placeOf(index, pageId, courseHint);
  const crumbs = [];
  if (place.course) crumbs.push({ text: place.course.title, href: `course.html?c=${place.course.id}` });
  if (place.series) crumbs.push({ text: place.series });
  renderChrome({ crumbs });

  world = chooseWorld(lessonId);
  if (cellsOf(lesson).length) runner = startEngine(statusEl);
  saved = await store.pageWork(pageId);

  render();
  const covers = lesson.frontmatter.covers || [];
  if (covers.length) main.append(el('p', { class: 'ds-covers ds-cell-time' }, `Learning outcomes this page covers: ${covers.join(', ')}.`));
  main.append(pager(index, place), workTools());
  if (readToken()) main.append(editTools());
  await enhance(main);
  showVersionNotice();
  applyWorld();
  document.documentElement.dataset.page = 'ready';
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  if (runner) classifyAll();
  if (params.has('edit') && readToken()) enterInPlace({ asText: params.get('edit') !== 'place' });
}

function notFound() {
  renderChrome();
  document.title = 'No such page — dewsharp';
  main.replaceChildren(
    el('h1', {}, 'There is no page here'),
    el('p', {}, pageId ? `No lesson has the address "${pageId}". It may have moved, or the link may have a typing mistake.` : 'This address does not name a lesson.'),
    el('p', {}, el('a', { href: 'index.html' }, 'Go to the courses')));
  document.documentElement.dataset.page = 'ready';
}

// ---- worlds

function worldKey(lessonId) { return `dewsharp:world:${lessonId}`; }

function chooseWorld(lessonId) {
  if (!lesson.worlds.length) return null;
  const keys = lesson.worlds.map(w => w.key);
  let pick = null;
  try { pick = localStorage.getItem(worldKey(lessonId)) || localStorage.getItem('dewsharp:world'); } catch { }
  return keys.includes(pick) ? pick : keys[0];
}

function worldChooser() {
  const lessonId = pageId.replace(/-practice$/, '');
  const box = el('fieldset', { class: 'dl-world-chooser' },
    el('legend', {}, 'Choose a world'),
    el('div', { class: 'dl-world-choices' }, lesson.worlds.map(w => el('label', { class: 'dl-world-choice' },
      el('input', { type: 'radio', name: 'ds-world', value: w.key, checked: w.key === world,
        onchange: () => {
          world = w.key;
          try { localStorage.setItem(worldKey(lessonId), w.key); localStorage.setItem('dewsharp:world', w.key); } catch { }
          applyWorld();
          announce(`The tasks on this page are now set in the world: ${w.label}.`);
        } }),
      el('span', { class: 'dl-world-name' }, w.label),
      el('span', { class: 'dl-world-line' }, w.description)))),
    el('p', { class: 'dl-world-note' }, 'The tasks on this page change to your world. The page remembers your choice.'));
  return box;
}

function applyWorld() {
  for (const node of main.querySelectorAll('.dl-world[data-world]')) node.hidden = node.dataset.world !== world;
}

// ---- rendering

function render() {
  const parts = [];
  if (lesson.errors.length) {
    parts.push(el('details', { class: 'ds-notice ds-author-errors' },
      el('summary', {}, `This page has ${count(lesson.errors.length, 'problem')} in its source, so parts of it may look odd.`),
      el('ul', {}, lesson.errors.map(e => el('li', {}, `Line ${e.line}: ${e.message}`)))));
  }
  parts.push(el('div', { id: 'ds-version-notice', hidden: true }));
  const items = lesson.items;
  let number = 0;
  let challengeCount = 0;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.world !== undefined) {
      // A task in worlds: the variants side by side (one group), one shown at a time.
      const group = [];
      while (i < items.length && items[i].group === item.group && items[i].world !== undefined) group.push(items[i++]);
      i--;
      const byWorld = new Map();
      for (const it of group) { if (!byWorld.has(it.world)) byWorld.set(it.world, []); byWorld.get(it.world).push(it); }
      let most = 0;
      const box = el('div', { class: 'ds-task' });
      for (const w of lesson.worlds) {
        const list = byWorld.get(w.key);
        if (!list) continue;
        let n = number;
        const variant = el('div', { class: 'dl-world', 'data-world': w.key });
        variant.append(el('p', { class: 'dl-world-label' }, `In the world: ${w.label}`));
        for (const it of list) variant.append(...boxed(it, renderItem(it, () => ++n, () => ++challengeCount)));
        most = Math.max(most, n - number);
        box.append(variant);
      }
      number += most;
      parts.push(box);
      continue;
    }
    parts.push(...boxed(item, renderItem(item, () => ++number, () => ++challengeCount)));
  }
  main.replaceChildren(...parts);
  if (lesson.worlds.length) {
    const h1 = main.querySelector('h1');
    const chooser = worldChooser();
    if (h1) h1.after(chooser); else main.prepend(chooser);
  }
  if (!main.querySelector('h1')) main.prepend(el('h1', {}, lesson.frontmatter.title || pageId));
}

/** While editing on the page, each item is in a box that says which item it is, so that it can be found again. */
function boxed(item, nodes) {
  if (!place) return nodes;
  return [el('div', { class: 'ds-item', dataset: { item: lesson.items.indexOf(item), type: item.type } }, ...nodes)];
}

function proseHtml(item) {
  return place ? md.render(item.text, { ranges: true, firstLine: item.line }) : md.render(item.text);
}

function renderItem(item, nextNumber, nextChallenge) {
  switch (item.type) {
    case 'markdown': return [el('div', { class: 'ds-prose', html: proseHtml(item) })];
    case 'readonly': return [el('div', { class: 'ds-read', html: staticCodeHtml(item.code, item.lang) })];
    case 'challenge': return [challenge(item, nextChallenge())];
    case 'cell': return renderCell(item, nextNumber());
    default: return [];
  }
}

function challenge(item, n) {
  return el('div', { class: 'dl-challenge' },
    el('div', { html: staticCodeHtml(item.code, 'csharp') }),
    el('p', { class: 'dl-challenge-actions' },
      el('a', { class: 'dl-btn', href: `notebook.html?challenge=${encodeURIComponent(pageId)}&n=${n}` }, 'Open in my notebook')));
}

function renderCell(item, number) {
  const record = saved.get(item.id);
  const state = { item, attempts: { runs: 0, errors: 0, unsure: 0, guessDiffered: 0, ...(record?.hints?.attempts || {}) }, hints: [], predict: null, compare: null };
  cells.set(item.id, state);
  const nodes = [];
  if (item.blocks.predict) {
    state.predict = predictBlock(state, item.blocks.predict);
    nodes.push(state.predict.el);
  }
  const downloadBtn = el('button', { type: 'button', class: 'dl-btn ds-btn-quiet ds-download', title: 'Download this program, and the types cells above it, as a Visual Studio project' }, 'Download project');
  const hint = item.headers.hint ? el('p', { html: md.renderInline(item.headers.hint) }) : null;
  const cell = new CodeCell({
    runner, id: item.id,
    code: typeof record?.code === 'string' ? record.code : item.code,
    original: item.code,
    file: item.headers.file || null,
    label: `Cell ${number}`,
    hint,
    cellsFor: (code) => cellsFor(item, code),
    onEdit: (code) => { scheduleSave(item.id); scheduleClassify(item.id); place?.controller.cellEdited(item.id, code); },
    onResult: (result, info) => afterRun(state, result, info),
    onGoto: (cellId, line, column) => {
      const other = cells.get(cellId)?.cell;
      if (other) { other.element.scrollIntoView({ block: 'center' }); other.editor.goTo(line, column); }
    },
    barTools: [downloadBtn],
  });
  state.cell = cell;
  downloadBtn.addEventListener('click', async () => {
    downloadBtn.disabled = true;
    try {
      const { name, files } = await projectFiles(runner, cellsFor(item, cell.getCode()), `${pageId} ${item.id}`);
      download(`${name}.zip`, zip(files));
      cell.setState(`Downloaded ${name}.zip: unzip it and open ${name}.sln in Visual Studio.`);
    } catch (e) { cell.setState(`The project could not be made: ${e.message}`, 'error'); }
    finally { downloadBtn.disabled = false; }
  });
  if (record?.output) cell.restoreOutput(record.output, `This is what it printed when you last ran it${record.saved_at ? `, on ${new Date(record.saved_at).toLocaleDateString('en-IE')}` : ''}.`);
  nodes.push(cell.element);

  const after = el('div', { class: 'ds-after-cell' });
  item.blocks.hints.forEach((h, k) => {
    const fold = el('details', { class: 'dl-hint', hidden: true, id: `hint-${item.id}-${k + 1}` },
      el('summary', {}, h.title || (item.blocks.hints.length > 1 ? `Hint ${k + 1}` : 'A hint')),
      el('div', { html: md.render(h.text) }));
    const revealed = !h.when || (record?.hints?.revealed || []).includes(k);
    const hintState = { spec: h, el: fold, revealed };
    if (revealed) fold.hidden = false;
    state.hints.push(hintState);
    after.append(fold);
  });
  for (const s of item.blocks.solutions) {
    after.append(el('details', { class: 'dl-solution' },
      el('summary', {}, s.title ? `A solution, ${s.title}` : 'A solution'),
      el('div', { html: staticCodeHtml(s.code, 'csharp') }),
      s.notes ? el('div', { html: md.render(s.notes) }) : null));
  }
  if (item.blocks.inputs) {
    state.compare = compareBlock(state);
    after.append(state.compare.el);
  }
  if (after.childNodes.length) nodes.push(after);
  if (record?.predict && state.predict) restorePredict(state, record.predict);
  return nodes;
}

/** The cells runner.run() takes for `item`: the visible cells above it (with the reader's edits), then it. */
function cellsFor(item, code) {
  item = cellsOf(lesson).find(c => c.id === item.id) ?? item;   // the draft may have been parsed again since the cell was drawn
  const list = cellsForRun(lesson, item, { world: item.world ?? world, code });
  return list.map(c => (c.id === item.id ? c : { ...c, code: cells.get(c.id)?.cell?.getCode() ?? c.code }));
}

// ---- kinds

async function classifyAll() {
  try {
    const kinds = await runner.classify([...cells.values()].map(s => ({ id: s.item.id, code: s.cell.getCode() })));
    for (const [id, kind] of Object.entries(kinds)) cells.get(id)?.cell.setKind(kind);
  } catch { /* the labels keep their first guess */ }
}

const classifyTimers = new Map();
function scheduleClassify(id) {
  clearTimeout(classifyTimers.get(id));
  classifyTimers.set(id, setTimeout(async () => {
    const s = cells.get(id);
    if (!s || !runner || runner.status === 'unavailable') return;
    try {
      const kinds = await runner.classify([{ id, code: s.cell.getCode() }]);
      s.cell.setKind(kinds[id]);
    } catch { }
  }, 400));
}

// ---- after a run: hints, the guess, saving

function afterRun(state, result, { mode, output, compare }) {
  if (!compare) {
    state.attempts.runs++;
    if (result.outcome === 'compile-error' || result.outcome === 'exception') state.attempts.errors++;
    if (state.predict && mode === 'run') notePrediction(state, result, output);
  }
  revealHints(state);
  state.lastOutput = mode === 'run' ? output : '';
  saveNow(state.item.id);
}

function revealHints(state, { open = false } = {}) {
  const a = state.attempts;
  for (const h of state.hints) {
    if (h.revealed) continue;
    const w = h.spec.when;
    const due = !w
      || (w.signal === 'errors' && a.errors >= w.count)
      || (w.signal === 'runs' && a.runs >= w.count)
      || (w.signal === 'unsure' && a.unsure >= w.count)
      || (w.signal === 'guess-differed' && a.guessDiffered >= w.count);
    if (!due) continue;
    h.revealed = true;
    h.el.hidden = false;
    h.el.classList.add('dl-hint-arrived');
    if (open) h.el.open = true;
    announce('A hint is under the cell now.');
  }
}

// ---- predict (docs/LESSON_FORMAT.md, "predict"): a guess and how sure, then the guess beside the output

const SURE = [['sure', 'Sure'], ['hunch', 'A hunch'], ['unsure', 'I’m not sure yet']];

function predictBlock(state, spec) {
  const id = state.item.id;
  const p = { spec, sure: null, outcome: null };
  let answer;
  if (spec.type === 'choice') {
    answer = el('fieldset', { class: 'dl-predict-options' },
      el('legend', { class: 'dl-sr-only' }, 'Your guess'),
      spec.options.map((o, k) => el('label', { class: 'dl-predict-option' },
        el('input', { type: 'radio', name: `predict-${id}`, value: String(k), onchange: () => scheduleSave(id) }),
        el('span', { class: 'dl-predict-option-text', html: md.renderInline(o.text) }))));
  } else {
    answer = el('input', { type: 'text', class: 'dl-predict-value', 'aria-label': 'Your guess', placeholder: 'Your guess',
      inputmode: spec.type === 'number' ? 'decimal' : null, oninput: () => scheduleSave(id) });
  }
  const sureButtons = SURE.map(([key, label]) => el('button', { type: 'button', class: 'dl-predict-sure-btn', 'aria-pressed': 'false', dataset: { sure: key },
    onclick: () => setSure(state, key, { chosen: true }) }, label));
  const unsure = el('div', { class: 'dl-predict-unsure', hidden: true },
    el('p', {}, 'Not being sure is a good place to start. ', el('span', { class: 'dl-predict-hint-open', hidden: true }, 'The first hint under the cell is open now. '), 'Two ways on:'),
    el('button', { type: 'button', class: 'dl-btn', onclick: () => answer.querySelector?.('input')?.focus() ?? answer.focus() }, 'Make a guess now'), ' ',
    el('button', { type: 'button', class: 'dl-btn', onclick: () => state.cell.run() }, 'Run it and see'));
  const your = el('span', { class: 'dl-predict-your' });
  const printed = el('span', { class: 'dl-predict-output' });
  const notes = spec.options.map((o, k) => (o.note ? el('p', { class: 'dl-predict-note', hidden: true, dataset: { option: String(k) }, html: md.renderInline(o.note) }) : null)).filter(Boolean);
  const which = el('p', { class: 'dl-predict-which', hidden: true }, 'Which line explains what you saw?');
  const afterBox = el('div', { class: 'dl-predict-after', hidden: true, 'aria-live': 'polite' },
    el('div', { class: 'dl-predict-sides' },
      el('div', {}, el('span', { class: 'dl-predict-side-label' }, 'Your guess'), your),
      el('div', {}, el('span', { class: 'dl-predict-side-label' }, 'What the program printed'), printed)),
    notes, which);
  p.el = el('div', { class: 'dl-predict', id: `predict-${id}`, dataset: { cell: id } },
    el('div', { class: 'dl-predict-prompt', html: md.render(spec.question) }),
    answer,
    el('div', { class: 'dl-predict-sure', role: 'group', 'aria-label': 'How sure are you?' },
      el('span', { class: 'dl-predict-sure-label' }, 'How sure are you?'), sureButtons),
    unsure,
    el('p', { class: 'dl-predict-footer' }, 'Guess first, or run it and see.'),
    afterBox);
  Object.assign(p, { answer, sureButtons, unsure, your, printed, notes, which, afterBox });
  return p;
}

function setSure(state, sure, { chosen = false } = {}) {
  const p = state.predict;
  p.sure = sure;
  for (const b of p.sureButtons) b.setAttribute('aria-pressed', String(b.dataset.sure === sure));
  p.unsure.hidden = sure !== 'unsure';
  if (sure === 'unsure' && chosen) {
    state.attempts.unsure++;
    const first = state.hints[0];
    if (first) {
      if (!first.revealed) { first.revealed = true; first.el.hidden = false; first.el.classList.add('dl-hint-arrived'); }
      first.el.open = true;
    }
    p.unsure.querySelector('.dl-predict-hint-open').hidden = !first;
    revealHints(state);
  }
  if (chosen) scheduleSave(state.item.id);
}

function readGuess(p) {
  if (p.spec.type === 'choice') {
    const chosen = p.answer.querySelector('input:checked');
    if (!chosen) return null;
    return { option: Number(chosen.value), text: chosen.closest('label').textContent.trim() };
  }
  const value = p.answer.value.trim();
  return value ? { option: null, text: value } : null;
}

function writeGuess(p, guess) {
  if (!guess) return;
  if (p.spec.type === 'choice') {
    const radio = p.answer.querySelector(`input[value="${Number(guess.option)}"]`);
    if (radio) radio.checked = true;
  } else if (typeof guess.text === 'string') p.answer.value = guess.text;
}

function notePrediction(state, result, output) {
  const p = state.predict;
  const guess = readGuess(p);
  if (!guess && p.sure !== 'unsure') { p.outcome = null; renderPrediction(p); return; }
  const text = output.replace(/\f/g, '').trimEnd();
  const shown = result.outcome === 'compile-error' ? 'Nothing: it did not compile. The messages are under the cell.'
    : result.outcome === 'exception' ? `${text ? text + '\n' : ''}(then it stopped with an exception)`
    : result.outcome === 'ok' ? (text || '(nothing)') : `${text}${text ? '\n' : ''}(it was stopped)`;
  const match = guess ? guessMatches(p.spec, guess.text, text, result) : false;
  if (guess && !match) state.attempts.guessDiffered++;
  p.outcome = { guess: guess?.text ?? null, option: guess?.option ?? null, output: shown.length > 600 ? '…' + shown.slice(-600) : shown, match };
  renderPrediction(p);
}

function renderPrediction(p) {
  const o = p.outcome;
  p.afterBox.hidden = !o;
  if (!o) return;
  p.your.textContent = o.guess ?? '(no guess)';
  p.printed.textContent = o.output;
  for (const n of p.notes) n.hidden = Number(n.dataset.option) !== o.option;
  p.which.hidden = o.match && p.sure !== 'unsure';
}

function restorePredict(state, saved) {
  const p = state.predict;
  writeGuess(p, saved.guess);
  if (saved.sure) setSure(state, saved.sure);
  p.outcome = saved.outcome || null;
  renderPrediction(p);
}

// ---- the comparison (docs/LESSON_FORMAT.md, "solution and inputs")

function compareBlock(state) {
  const item = state.item;
  const inputs = item.blocks.inputs.items;
  const solution = item.blocks.solutions[0] || null;
  const head = [el('th', { scope: 'col' }, 'Input'), el('th', { scope: 'col' }, 'What your code gave')];
  if (solution) head.push(el('th', { scope: 'col' }, 'What a solution gives'));
  const rows = inputs.map((input, k) => el('tr', { dataset: { case: String(k) } },
    el('td', { class: 'dl-compare-input' }, el('code', {}, input.expr), input.note ? el('span', { class: 'dl-compare-label' }, input.note) : null),
    el('td', { class: 'dl-compare-yours' }),
    solution ? el('td', { class: 'dl-compare-theirs' }) : null));
  const status = el('span', { class: 'dl-compare-status', role: 'status', 'aria-live': 'polite' });
  const button = el('button', { type: 'button', class: 'dl-btn' }, solution ? 'Compare with a solution' : 'Try these inputs on your code');
  const box = el('div', { class: 'dl-compare', dataset: { cell: item.id } },
    el('table', { class: 'dl-compare-table' }, el('caption', {}, 'Inputs to try'), el('thead', {}, el('tr', {}, head)), el('tbody', {}, rows)),
    el('div', { class: 'dl-compare-actions' }, button, status));
  button.addEventListener('click', async () => {
    if (state.cell.running) return;
    button.disabled = true;
    status.textContent = solution ? 'Running your cell, then a solution, with each input…' : 'Running your cell with each input…';
    try {
      const exprs = inputs.map(i => i.expr);
      const yours = await state.cell.runWithInputs(exprs);
      let theirs = null;
      if (solution && yours) {
        const job = runner.run({ cells: cellsFor(item, solution.code), inputs: exprs, stdin: '', onOutput: () => {} });
        theirs = await job.done;
      }
      if (!yours) { status.textContent = ''; return; }
      rows.forEach((tr, k) => {
        const a = yours.values?.[k];
        const b = theirs?.values?.[k];
        fill(tr.querySelector('.dl-compare-yours'), a);
        if (solution) fill(tr.querySelector('.dl-compare-theirs'), b);
        // A side that never reached the inputs has no value to set beside the other: the note says why.
        const differ = solution && b && a && a.kind !== 'not-run' && b.kind !== 'not-run' && showValue(a) !== showValue(b);
        tr.classList.toggle('dl-compare-differ', !!differ);
        if (differ) tr.querySelector('.dl-compare-theirs').append(el('span', { class: 'dl-compare-diff' }, 'different'));
      });
      const notes = [];
      if (yours.values?.every(v => v.kind === 'not-run')) notes.push('Your cell did not reach the inputs. What happened is under the cell.');
      if (theirs && (theirs.outcome === 'compile-error' || theirs.outcome === 'host-error')) notes.push('The solution could not run here. That is a problem in the page, not in your code.');
      const differing = rows.filter(r => r.classList.contains('dl-compare-differ')).length;
      if (solution && theirs && !notes.length) notes.push(differing ? `${count(differing, 'row')} ${differing === 1 ? 'is' : 'are'} different. What does your code do with ${differing === 1 ? 'that input' : 'those inputs'}?` :'Each row gives the same value.');
      status.textContent = notes.join(' ');
    } catch (e) {
      status.textContent = `The comparison could not run: ${e.message}`;
    } finally {
      button.disabled = false;
    }
  });
  return { el: box };
}

function showValue(v) {
  if (!v) return '';
  if (v.kind === 'value') return v.display;
  if (v.kind === 'exception') return `exception ${v.error}`;
  if (v.kind === 'compile-error') return `compile ${v.error}`;
  return 'not-run';
}

function fill(td, v) {
  td.replaceChildren();
  if (!v) return;
  if (v.kind === 'value') { td.textContent = v.display; return; }
  const text = v.kind === 'exception' ? `an exception: ${v.error}`
    : v.kind === 'compile-error' ? `did not compile: ${v.error}${v.message ? ` (${v.message})` : ''}`
    : 'did not run';
  td.append(el('span', { class: 'dl-compare-error', title: v.message || '' }, text));
}

// ---- saved work

const saveTimers = new Map();
function scheduleSave(id) {
  if (previewing) return;
  clearTimeout(saveTimers.get(id));
  saveTimers.set(id, setTimeout(() => saveNow(id), 600));
}

async function saveNow(id) {
  if (previewing) return;
  clearTimeout(saveTimers.get(id));
  const s = cells.get(id);
  if (!s) return;
  const code = s.cell.getCode();
  const p = s.predict;
  const record = {
    page: pageId, cell: id, code,
    output: s.lastOutput ?? saved.get(id)?.output ?? '',
    predict: p ? { guess: readGuess(p), sure: p.sure, outcome: p.outcome } : null,
    hints: { attempts: s.attempts, revealed: s.hints.map((h, k) => (h.revealed ? k : -1)).filter(k => k >= 0) },
    version: lesson.frontmatter.version || null,
    saved_at: new Date().toISOString(),
  };
  const written = await store.putWork(record);
  saved.set(id, written);
  document.documentElement.dataset.saved = String(Date.now());
}

function showVersionNotice() {
  const version = lesson.frontmatter.version;
  const old = [...saved.values()].filter(r => r.version && version && r.version !== version && cells.has(r.cell));
  const box = document.getElementById('ds-version-notice');
  if (!old.length || !box) return;
  box.className = 'ds-notice';
  box.hidden = false;
  box.setAttribute('role', 'note');
  box.replaceChildren(
    el('p', {}, el('strong', {}, 'This page has changed since you saved your work on it. '),
      `Your code is still in the cells. If a cell no longer does what the page says, Reset puts the page's new version in it, and Ctrl+Z in the editor brings yours back.`),
    el('p', { class: 'ds-cell-time' }, `Your work is from version ${old[0].version}. The page is now version ${version}.`));
}

function workTools() {
  const message = el('span', { role: 'status', 'aria-live': 'polite', class: 'ds-cell-state' });
  return el('section', { class: 'ds-work-tools', 'aria-label': 'Your work' },
    el('p', {}, 'Your code and your guesses are saved in this browser, on this device. Some computers clear that when you log out, so export your work to a file to keep it, and import the file next time.'),
    el('button', { type: 'button', class: 'dl-btn', onclick: async () => {
      for (const id of cells.keys()) if (saveTimers.has(id)) await saveNow(id);
      const data = await store.exportAll();
      download(`dewsharp-work-${today()}.json`, JSON.stringify(data, null, 1));
      message.textContent = `Exported ${count(data.work.length, 'cell')} and ${count(data.notebooks.length, 'notebook')}.`;
    } }, 'Export my work'),
    el('button', { type: 'button', class: 'dl-btn', onclick: async () => {
      const text = await pickFile();
      if (text == null) return;
      try {
        const r = await store.importAll(text);
        message.textContent = `Imported ${count(r.work, 'cell')} and ${count(r.notebooks, 'notebook')}.${r.kept ? ` ${count(r.kept, 'item')} here ${r.kept === 1 ? 'was' : 'were'} newer, so ${r.kept === 1 ? 'it stays' : 'they stay'} as ${r.kept === 1 ? 'it was' : 'they were'}.` : ''} The page will now show it.`;
        setTimeout(() => location.reload(), 1200);
      } catch (e) { message.textContent = e.message; }
    } }, 'Import my work'),
    message);
}

// ---- editing mode (docs/ARCHITECTURE.md, "Editing"). Only a browser that holds a GitHub token (Settings)
// is offered it. web/page/edit.js is the surface and web/page/github.js proposes the change; what is
// specific to lessons is here: what counts as a problem, which notes help, and how to draw a preview.

function editTools() {
  return el('section', { class: 'ds-work-tools ds-edit-entry', 'aria-label': 'Editing' },
    el('button', { type: 'button', class: 'dl-btn dl-btn-run', id: 'ds-edit-place', onclick: () => enterInPlace() }, 'Edit on the page'),
    el('button', { type: 'button', class: 'dl-btn', id: 'ds-edit-open', onclick: () => enterInPlace({ asText: true }) }, 'Edit as text'),
    el('span', { class: 'ds-cell-state' }, 'A GitHub token is saved in this browser, so you can propose a change to this page.'));
}

/**
 * Turns on editing. The draft is the page's Markdown as one string; the page is drawn from it, and
 * web/page/inplace.js changes it. A draft kept in this browser from an earlier visit is opened again, if it
 * was made from this version of the page.
 */
async function enterInPlace({ asText = false } = {}) {
  const token = readToken();
  if (!token || place) return;
  const kept = loadDraft(pageId);
  const restored = kept && kept.base === sourceText && kept.text !== sourceText ? kept : null;
  const stale = kept && kept.base !== sourceText ? kept : null;
  const draft = new Draft(restored ? restored.text : sourceText, sourceText);
  previewing = true;
  saved = new Map();
  place = { draft, controller: null };
  const client = githubClient({ token });
  place.controller = startInPlace({
    main, draft, baseText: sourceText, pageId, path: `lessons/${pagePath}`, client,
    remote: remoteDraft({ client, path: `lessons/${pagePath}`, name: pageId, baseText: sourceText }),
    remoteDelay: Number(params.get('draftdelay')) || undefined,      // the tests: milliseconds before a change is saved to GitHub
    getLesson: () => lesson, reparse, renderProse, renderAll: fullRender,
    validate: (text) => parseLesson(text, { id: pageId }).errors,
    notes: lessonNotes, describe: describeChange, snippets: SNIPPETS, restored, stale,
    loadRich: () => import('./richedit.js').then(m => m.createRichEditor({ markdown: md, base: `lessons/${pagePath.slice(0, pagePath.lastIndexOf('/') + 1)}`, pageIds: () => pageIds })),
    leave: () => {
      const q = new URLSearchParams(location.search);
      q.delete('edit');
      location.search = q.toString();
    },
  });
  await fullRender();
  if (asText) place.controller.editAsText();
}

/** Parses the draft again without drawing it, and points each drawn cell at its new item. */
function reparse() {
  lesson = parseLesson(place.draft.text, { id: pageId });
  const byId = new Map(cellsOf(lesson).map(c => [c.id, c]));
  for (const [id, state] of cells) {
    const item = byId.get(id);
    if (item) state.item = item;
  }
}

/** Draws the whole page from the draft, and keeps the reader where they were. */
async function fullRender() {
  const y = window.scrollY;
  lesson = parseLesson(place.draft.text, { id: pageId });
  cells.clear();
  if (!lesson.worlds.some(w => w.key === world)) world = chooseWorld(pageId.replace(/-practice$/, ''));
  if (cellsOf(lesson).length && !runner) runner = startEngine(statusEl);
  render();
  place.controller.decorate(main);
  await enhance(main);
  applyWorld();
  if (runner) classifyAll();
  window.scrollTo(0, y);
}

/** Draws one chunk of prose again, leaving every cell as it is. */
async function renderProse(index) {
  const item = lesson.items[index];
  const wrapper = main.querySelector(`.ds-item[data-item="${index}"]`);
  const prose = wrapper?.querySelector('.ds-prose');
  if (!item || !prose) return fullRender();
  prose.innerHTML = proseHtml(item);
  await enhance(wrapper);
  place.controller.decorate(wrapper);
}

function cellChanges(text) {
  const before = parseLesson(sourceText, { id: pageId });
  const after = parseLesson(text, { id: pageId });
  const then = new Map(cellsOf(before).map(c => [c.id, c]));
  const now = new Map(cellsOf(after).map(c => [c.id, c]));
  return {
    before, after,
    gone: [...then.keys()].filter(id => !now.has(id)),
    added: [...now.keys()].filter(id => !then.has(id)),
    changed: [...now].filter(([id, c]) => then.has(id) && then.get(id).code !== c.code).map(([id]) => id),
  };
}

function lessonNotes(text) {
  const { before, after, gone, changed } = cellChanges(text);
  const notes = [];
  if (gone.length) {
    notes.push({ text: `${count(gone.length, 'cell')} on the page ${gone.length === 1 ? 'is' : 'are'} not there any more: ${gone.join(', ')}. A learner who saved work in ${gone.length === 1 ? 'it' : 'one of them'} will not see that work again. If you meant to change a cell, keep its id: the line that starts "id:" at the top of the cell.` });
  }
  if (changed.length && after.frontmatter.version === before.frontmatter.version) {
    notes.push({
      text: `You changed what ${changed.length === 1 ? 'one cell does' : 'some cells do'} (${changed.join(', ')}). Change version: at the top of the page, so that learners who saved work are told the page has changed.`,
      action: { label: 'Set version to today', run: bumpVersion },
    });
  }
  return notes;
}

function describeChange(text) {
  const { gone, added, changed } = cellChanges(text);
  const lessonId = pageId.replace(/-practice$/, '');
  const lines = [];
  if (changed.length) lines.push(`Cells whose code changed: ${changed.join(', ')}. CI compares each cell's output with the recorded one. If it differs, run \`npm run check-lessons -- --write ${lessonId}\` and read what changed in the outputs file before merging.`);
  if (added.length) lines.push(`New cells: ${added.join(', ')}. Their outputs need recording too (\`npm run check-lessons -- --write ${lessonId}\`).`);
  if (gone.length) lines.push(`Cells removed: ${gone.join(', ')}. Work that learners saved in them will no longer show.`);
  return lines.length ? ['', ...lines] : [];
}

/** version: YYYY.MM.DD.n, with n counted on if the page was already changed today. */
function bumpVersion(text) {
  const d = new Date();
  const stamp = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  return text.replace(/^version:[ \t]*(\S*)[ \t]*$/m, (line, current) => {
    const m = /^(\d{4}\.\d{2}\.\d{2})\.(\d+)$/.exec(current);
    return `version: ${stamp}.${m && m[1] === stamp ? Number(m[2]) + 1 : 1}`;
  });
}

const nextId = (text, stem) => {
  const used = [...text.matchAll(new RegExp(`${stem}-(\\d+)`, 'g'))].map(m => Number(m[1]));
  return `${stem}-${used.length ? Math.max(...used) + 1 : 1}`;
};

const SNIPPETS = [
  { label: 'Cell', block: (text) => `\`\`\`csharp exec\nid: ${nextId(text, 'new-cell')}\nConsole.WriteLine("Hello");\n\`\`\`` },
  { label: 'Hint', block: () => '```hint\nafter: 2 errors\nWrite the hint here, as a question the reader can try to answer.\n```' },
  { label: 'Predict', block: () => '```predict\ntype: choice\n\nWhat will the last line print?\n\n- The first answer\n  - Why a reader might choose it.\n- The second answer\n```' },
  { label: 'Solution', block: () => '```solution\ntitle: one way to do it\nConsole.WriteLine("Hello");\n---\nNotes about the solution, in Markdown.\n```' },
];

// ---- previous and next

function pager(index, place) {
  const link = (id, cls, label) => {
    const p = index.pages[id];
    if (!p) return null;
    const c = place.course ? `&c=${place.course.id}` : '';
    return el('a', { class: cls, href: `lesson.html?id=${id}${c}`, rel: cls === 'ds-next' ? 'next' : 'prev' },
      el('span', {}, label), p.practice ? `Practice: ${index.pages[p.lesson]?.title?.split(':')[0] ?? p.title}` : (p.title || id));
  };
  const prev = place.prev ? link(place.prev, 'ds-prev', 'Previous') : null;
  const next = place.next ? link(place.next, 'ds-next', 'Next') : null;
  const back = place.course && !prev && !next ? el('a', { href: `course.html?c=${place.course.id}` }, el('span', {}, 'Back to'), place.course.title) : null;
  return el('nav', { class: 'ds-pager', 'aria-label': 'Previous and next' }, prev, back, next);
}

