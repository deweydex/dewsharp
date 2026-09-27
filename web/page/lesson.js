// The lesson page, lesson.html?id=<page id>: a lesson (or a practice page) rendered in the browser from its
// Markdown (docs/LESSON_FORMAT.md) through web/lesson/parse.js (docs/PARSER.md), with runnable cells, worlds,
// guesses, hints, solutions, the comparison, challenges, and saved work. docs/ARCHITECTURE.md, "The page".
import { parseLesson, cellsForRun, cellsOf } from '../lesson/parse.js';
import { el, renderChrome, renderFoot, loadIndex, placeOf, announce, download, pickFile, today, count } from './common.js';
import { createMarkdown, enhance, staticCodeHtml } from './markdown.js';
import { CodeCell } from './cell.js';
import { projectFiles, zip } from './project.js';
import { startEngine } from './engine.js';
import * as store from './store.js';

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

start().catch((e) => {
  console.error(e);
  main.replaceChildren(el('h1', {}, 'This page could not be shown'), el('p', {}, String(e.message || e)));
});

async function start() {
  renderFoot();
  if (!SLUG.test(pageId)) return notFound();
  const index = await loadIndex();
  const entry = index.pages[pageId];
  const lessonId = entry?.lesson ?? pageId.replace(/-practice$/, '');
  const path = entry?.path ?? `${lessonId}/${pageId}.md`;
  const response = await fetch(`lessons/${path}`, { cache: 'no-cache' }).catch(() => null);
  if (!response || !response.ok) return notFound();
  const source = await response.text();
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
  await enhance(main);
  showVersionNotice();
  applyWorld();
  document.documentElement.dataset.page = 'ready';
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  if (runner) classifyAll();
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
        for (const it of list) variant.append(...renderItem(it, () => ++n, () => ++challengeCount));
        most = Math.max(most, n - number);
        box.append(variant);
      }
      number += most;
      parts.push(box);
      continue;
    }
    parts.push(...renderItem(item, () => ++number, () => ++challengeCount));
  }
  main.replaceChildren(...parts);
  if (lesson.worlds.length) {
    const h1 = main.querySelector('h1');
    const chooser = worldChooser();
    if (h1) h1.after(chooser); else main.prepend(chooser);
  }
  if (!main.querySelector('h1')) main.prepend(el('h1', {}, lesson.frontmatter.title || pageId));
}

function renderItem(item, nextNumber, nextChallenge) {
  switch (item.type) {
    case 'markdown': return [el('div', { class: 'ds-prose', html: md.render(item.text) })];
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
    onEdit: () => { scheduleSave(item.id); scheduleClassify(item.id); },
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
    el('p', { class: 'dl-predict-footer' }, 'Guess first, or just run it.'),
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

const squash = (t) => String(t).replace(/\s+/g, ' ').trim();

/** Whether the guess says what the output says. The page never shows this; it only decides the hints and the question. */
function guessMatches(p, guess, output) {
  if (!output) return false;
  if (p.spec.type === 'number') {
    const value = Number(guess.text.replace(/,/g, ''));
    const numbers = output.replace(/,/g, '').match(/-?\d+(?:\.\d+)?(?:e[-+]?\d+)?/gi);
    if (Number.isNaN(value) || !numbers) return false;
    const last = Number(numbers[numbers.length - 1]);
    return Math.abs(value - last) <= (p.spec.tolerance ?? 0) + 1e-9 * Math.max(1, Math.abs(last));
  }
  const said = squash(guess.text);
  const lines = output.split('\n').map(squash).filter(Boolean);
  return said === squash(output) || lines.includes(said);
}

function notePrediction(state, result, output) {
  const p = state.predict;
  const guess = readGuess(p);
  if (!guess && p.sure !== 'unsure') { p.outcome = null; renderPrediction(p); return; }
  const text = output.replace(/\f/g, '').trimEnd();
  const shown = result.outcome === 'compile-error' ? 'Nothing: it did not compile. The messages are under the cell.'
    : result.outcome === 'exception' ? `${text ? text + '\n' : ''}(then it stopped with an exception)`
    : result.outcome === 'ok' ? (text || '(nothing)') : `${text}${text ? '\n' : ''}(it was stopped)`;
  const match = guess && result.outcome === 'ok' ? guessMatches(p, guess, text) : false;
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
        const differ = solution && b && a && showValue(a) !== showValue(b);
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
  clearTimeout(saveTimers.get(id));
  saveTimers.set(id, setTimeout(() => saveNow(id), 600));
}

async function saveNow(id) {
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

