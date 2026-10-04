// Editing on the page itself (docs/ARCHITECTURE.md, "Editing in place"). The lesson is drawn as usual, and in
// this mode each block of prose, and each cell, fence and block under a cell, can be changed where it
// stands. Whatever is changed becomes a change to the draft (draft.js), a splice of the lines the block came
// from, so every other line of the file stays as it was. This file is the part that does not depend on how
// the page is drawn: the bar, the editors that open in place, the draft's autosave and the proposal. The
// lesson page gives it the few things it needs (`ctx`) and draws the page again when it asks. A paragraph,
// heading, list or quotation opens as a rich editor (richedit.js) when it can, and as Markdown when it cannot;
// either can be switched to the other while it is open.
import { el, announce, count } from './common.js';
import { saveDraft, clearDraft } from './draft.js';
import { mountEditor, proposalForm } from './edit.js';

const range = (node) => node.dataset.src.split(',').map(Number);
const blank = (line) => line === undefined || line.trim() === '';

/**
 * @param {object} ctx
 * @param {HTMLElement} ctx.main           the page
 * @param {import('./draft.js').Draft} ctx.draft
 * @param {string} ctx.baseText            the page as the site has it
 * @param {string} ctx.pageId
 * @param {string} ctx.path                the file in the repository
 * @param {object} ctx.client              githubClient()
 * @param {()=>object} ctx.getLesson       the parsed draft
 * @param {()=>void} ctx.reparse           parse the draft again, quietly, without drawing it
 * @param {(index:number)=>Promise<void>} ctx.renderProse   draw one chunk of prose again
 * @param {()=>Promise<void>} ctx.renderAll                 draw the whole page again
 * @param {(text:string)=>{line:number,message:string}[]} ctx.validate
 * @param {(text:string)=>{text:string,action?:object}[]} ctx.notes
 * @param {(text:string)=>string[]} ctx.describe
 * @param {object[]} ctx.snippets
 * @param {()=>Promise<{canOpen:Function,open:Function}>} [ctx.loadRich]   loads the rich editor (richedit.js)
 * @param {()=>void} ctx.leave
 * @param {{text:string,base:string,savedAt:string}|null} [ctx.restored]  a kept draft that was opened
 * @param {{text:string,base:string,savedAt:string}|null} [ctx.stale]     a kept draft of an older page
 */
export function startInPlace(ctx) {
  const { main, draft } = ctx;
  let text = null;                 // the whole-page text box, while it is open
  let proposal = null;
  let proposeSection = null;
  let persistTimer = null;
  let chromeTimer = null;
  const cellTimers = new Map();
  // The rich editor is fetched as soon as editing starts, so that it is there by the first click. If it cannot
  // be fetched, every block opens as Markdown.
  const richReady = ctx.loadRich ? ctx.loadRich().catch(() => null) : Promise.resolve(null);
  const opening = new WeakSet();

  // ---- the bar

  const button = (label, onclick, attrs = {}) => el('button', { type: 'button', class: 'dl-btn', onclick, ...attrs }, label);
  // Undo and Redo draw the page again, which would take away a block that is open with what has been typed in
  // it, so they wait until it is finished.
  const whenClosed = (step) => () => {
    if (main.querySelector('.ds-raw')) { announce('Finish or cancel the block that is open first.'); status.textContent = 'Finish or cancel the block that is open first.'; return; }
    step();
  };
  const undo = button('Undo', whenClosed(() => draft.undo()));
  const redo = button('Redo', whenClosed(() => draft.redo()));
  const status = el('span', { class: 'ds-cell-state', role: 'status', 'aria-live': 'polite', id: 'ds-place-status' });
  const problems = el('div', { class: 'ds-place-problems' });
  const notice = el('div', { class: 'ds-place-notice' });
  const bar = el('section', { class: 'ds-place-bar', id: 'ds-place-bar', 'aria-label': 'Editing on the page' },
    el('p', { class: 'ds-place-lede' }, el('strong', {}, 'Editing on the page. '),
      'Choose a paragraph to change it, and change a cell where it is. The tools above a cell change its settings and the blocks under it. Nothing goes on the site until you propose it.'),
    el('p', { class: 'ds-place-buttons' }, undo, redo,
      button('Edit as text', () => editAsText()),
      button('Start again', startAgain),
      button('Stop editing', stop, { id: 'ds-place-stop' }), status),
    notice, problems);
  main.before(bar);

  if (ctx.restored) {
    notice.append(el('p', { class: 'ds-notice', role: 'note' },
      `Your unsaved draft from ${new Date(ctx.restored.savedAt).toLocaleString('en-IE')} was kept in this browser, and it is open now. `,
      button('Start again from the page as it is', startAgain)));
  } else if (ctx.stale) {
    notice.append(el('p', { class: 'ds-notice', role: 'note' },
      'This browser has a draft of this page from before the page was changed, so it was not opened: it could undo the change. ',
      button('Show it as text', () => editAsText({ text: ctx.stale.text })), ' ',
      button('Forget it', () => { clearDraft(ctx.pageId); notice.replaceChildren(); })));
  }

  function refreshChrome() {
    clearTimeout(chromeTimer);
    chromeTimer = setTimeout(() => {
      const found = ctx.validate(draft.text);
      problems.replaceChildren(...(found.length
        ? [el('div', { class: 'ds-notice ds-author-errors' },
          el('p', {}, el('strong', {}, `${count(found.length, 'problem')} in the text.`), ' The page cannot be proposed until they are fixed. "Edit as text" shows each line.'),
          el('ul', {}, found.map(p => el('li', {}, `Line ${p.line}: ${p.message}`))))]
        : []));
      undo.disabled = !draft.canUndo;
      redo.disabled = !draft.canRedo;
      if (proposal) proposal.ready(draft.dirty && found.length === 0);
      const list = proposeSection?.querySelector('.ds-edit-notes');
      if (list) {
        list.replaceChildren(...ctx.notes(draft.text).map(n => el('li', {}, n.text,
          n.action ? [' ', button(n.action.label, () => { draft.set(n.action.run(draft.text)); ctx.reparse(); }, { class: 'dl-btn ds-btn-quiet' })] : null)));
      }
    }, 120);
  }

  function persist() {
    clearTimeout(persistTimer);
    persistTimer = setTimeout(() => {
      if (proposal?.done) return;
      if (!draft.dirty) { clearDraft(ctx.pageId); status.textContent = ''; return; }
      status.textContent = saveDraft(ctx.pageId, { text: draft.text, base: ctx.baseText })
        ? 'Draft kept in this browser.' : 'This browser would not keep the draft.';
    }, 500);
  }

  draft.onChange((change) => {
    persist();
    refreshChrome();
    if (change.reason === 'undo' || change.reason === 'redo') { announce(change.reason === 'undo' ? 'Undone.' : 'Redone.'); ctx.renderAll(); }
  });

  function stop() {
    window.removeEventListener('beforeunload', warn);
    persistNow();
    ctx.leave();
  }
  function persistNow() {
    clearTimeout(persistTimer);
    if (proposal?.done) return;
    if (draft.dirty) saveDraft(ctx.pageId, { text: draft.text, base: ctx.baseText });
  }
  function startAgain() {
    if (draft.dirty && !confirm('Start again? Everything you have changed on this page will be set aside. Undo will bring it back until you leave.')) return;
    draft.set(ctx.baseText);
    clearDraft(ctx.pageId);
    notice.replaceChildren();
    ctx.renderAll();
  }
  function warn(event) {
    if (draft.dirty && !proposal?.done) { persistNow(); event.preventDefault(); event.returnValue = ''; }
  }
  window.addEventListener('beforeunload', warn);

  // ---- the proposal, under the page

  function buildPropose() {
    proposal = proposalForm({
      client: ctx.client, path: ctx.path, name: ctx.pageId, baseText: ctx.baseText,
      getText: () => draft.text, validate: ctx.validate, describe: ctx.describe,
      onProposed: () => { clearDraft(ctx.pageId); status.textContent = 'Proposed. The draft is no longer kept in this browser.'; },
    });
    proposeSection = el('section', { class: 'ds-place-propose', id: 'ds-place-propose', 'aria-label': 'Propose this change' },
      el('ul', { class: 'ds-edit-notes' }), proposal);
    main.after(proposeSection);
    refreshChrome();
  }

  // ---- the whole page as text

  function editAsText({ text: initial } = {}) {
    if (text) return;
    bar.hidden = true;
    proposeSection?.remove();
    proposeSection = null;
    proposal = null;
    text = mountEditor({
      page: main, source: ctx.baseText, text: initial ?? draft.text, path: ctx.path, name: ctx.pageId, client: ctx.client,
      validate: ctx.validate, notes: ctx.notes, describe: ctx.describe, snippets: ctx.snippets,
      onPreview: async (t) => {
        draft.set(t, { key: 'text', within: 4000 });
        await ctx.renderAll();
        main.prepend(el('div', { class: 'ds-notice', role: 'note' },
          el('p', {}, el('strong', {}, 'This is a preview of your changes, not the saved page.'),
            ' Your saved work on this page is not used here, and nothing you do in a cell is saved. Choose Edit to carry on.')));
      },
      onChange: (t) => draft.set(t, { key: 'text', within: 4000 }),
      onClose: (t) => {
        draft.set(t, { key: 'text', within: 4000 });
        text.destroy();
        text = null;
        main.hidden = false;
        bar.hidden = false;
        buildPropose();
        ctx.renderAll();
      },
      leave: stop,
    });
  }

  // ---- blocks that open where they stand

  /**
   * Opens the lines `first` to `last` as text, beside `anchor`. `kind` says how to draw the page again. `text`
   * is what the box starts with, if that is not the lines as they are (a block that was being edited as rich
   * text); `note` says why the block is edited as Markdown; `toRich(text)` is given when the block could be
   * edited as rich text, and returns a sentence if it cannot, or null if it has taken over.
   */
  function openRaw({ first, last, anchor, label, kind, hide = null, text: start = null, note = null, toRich = null }) {
    const raw = draft.slice(first, last);
    const area = el('textarea', { class: 'ds-raw-text', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', 'aria-label': label, rows: 3 });
    area.value = start ?? raw;
    area.rows = Math.min(32, area.value.split('\n').length + 1);
    const close = () => { widget.remove(); if (hide) hide.hidden = false; };
    const finish = async () => {
      const next = area.value.replace(/^\n+|\s+$/g, '');
      if (next === raw) { close(); return; }
      close();
      await apply({ first, last, next, kind });
    };
    const why = el('p', { class: 'ds-cell-time ds-raw-why', role: 'status' });
    const richButton = toRich ? button('Edit as rich text', () => {
      const reason = toRich(area.value);
      if (reason) why.textContent = reason;
    }, { class: 'dl-btn ds-btn-quiet' }) : null;
    const widget = el('div', { class: 'ds-raw', role: 'group', 'aria-label': label },
      el('p', { class: 'ds-cell-time' }, `${label}. Ctrl+Enter finishes. Escape leaves it as it was.`),
      note ? el('p', { class: 'ds-cell-time ds-raw-note' }, `${note} It is edited as Markdown.`) : null,
      area,
      el('p', {}, button('Done', finish, { class: 'dl-btn dl-btn-run' }), ' ', button('Cancel', close), richButton ? [' ', richButton] : null),
      why);
    area.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); anchor.focus?.(); }
      else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); finish(); }
    });
    area.addEventListener('input', () => { area.rows = Math.min(32, area.value.split('\n').length + 1); });
    if (hide) hide.hidden = true;
    anchor.after(widget);
    area.focus();
    announce(`${label}. Escape leaves it as it was.`);
    return { widget, close };
  }

  const signature = (lesson) => JSON.stringify([lesson.items.map(i => [i.type, i.world ?? '', i.id ?? '', i.group ?? '']), lesson.worlds.map(w => w.key)]);

  /** Puts `next` in place of the lines `first` to `last`, and draws what changed. */
  async function apply({ first, last, next, kind }) {
    if (kind !== 'prose') {
      draft.splice(first, last, next);
      await ctx.renderAll();
      return;
    }
    const lines = draft.lines();
    // A block taken out of the page should not leave two blank lines where it was.
    const start = next === '' && blank(lines[first - 2]) && (blank(lines[last]) || last >= lines.length) ? first - 1 : first;
    const before = signature(ctx.getLesson());
    const delta = draft.splice(start, last, next);
    shift(last, delta);
    ctx.reparse();
    const lesson = ctx.getLesson();
    const index = lesson.items.findIndex(i => i.type === 'markdown' && i.line <= first && first <= i.endLine);
    if (index >= 0 && signature(lesson) === before) await ctx.renderProse(index);
    else await ctx.renderAll();
    // Where the block was, so that a keyboard or a screen reader is not left at the top of the page.
    main.querySelector(`[data-src^="${first},"]`)?.focus({ preventScroll: true });
  }

  /** After lines changed, the blocks further down are drawn with the lines they had: move them. */
  function shift(afterLine, delta) {
    if (!delta) return;
    for (const node of main.querySelectorAll('[data-src]')) {
      const [a, b] = range(node);
      if (a > afterLine) node.dataset.src = `${a + delta},${b + delta}`;
    }
  }

  /** A cell's code was edited in the cell's own editor: the same edit, to the lines of the draft. */
  function cellEdited(id, code) {
    if (text) return;                                      // a cell tried out in the text box's preview is not kept
    clearTimeout(cellTimers.get(id));
    cellTimers.set(id, setTimeout(() => {
      const cell = ctx.getLesson().items.find(i => i.type === 'cell' && i.id === id);
      if (!cell || cell.code === code) return;
      const last = cell.endLine - 1;                       // the line before the closing fence
      const delta = draft.splice(cell.codeLine, last, code, { key: `cell:${id}` });
      shift(last, delta);
      ctx.reparse();
    }, 300));
  }

  // ---- the tools above each cell, and above each fence

  function tools(wrapper) {
    const lesson = ctx.getLesson();
    const item = lesson.items[Number(wrapper.dataset.item)];
    if (!item || wrapper.querySelector(':scope > .ds-item-tools')) return;
    const strip = el('p', { class: 'ds-item-tools' });
    const raw = (label, first, last, what) => button(label, () => {
      const open = strip.nextElementSibling?.classList.contains('ds-raw') ? strip.nextElementSibling : null;
      open?.remove();
      openRaw({ first, last, anchor: strip, label: what, kind: 'fence' });
    }, { class: 'dl-btn ds-btn-quiet' });
    if (item.type === 'cell') {
      const b = item.blocks;
      strip.append(
        el('span', { class: 'ds-item-tools-label' }, 'Cell:'),
        raw('Settings', item.line + 1, item.codeLine - 1, `The settings of the cell ${item.id}: id, hint, file, expect and stdin`),
        raw('Whole cell as text', item.line, item.endLine, `The whole cell ${item.id}, with its fence lines`));
      if (b.predict) strip.append(raw('Predict', b.predict.line, b.predict.endLine, 'The predict block'));
      b.hints.forEach((h, k) => strip.append(raw(b.hints.length > 1 ? `Hint ${k + 1}` : 'Hint', h.line, h.endLine, `Hint ${k + 1}`)));
      b.solutions.forEach((s, k) => strip.append(raw(b.solutions.length > 1 ? `Solution ${k + 1}` : 'Solution', s.line, s.endLine, `Solution ${k + 1}`)));
      if (b.inputs) strip.append(raw('Inputs', b.inputs.line, b.inputs.endLine, 'The inputs block'));
    } else if (item.type === 'readonly' || item.type === 'challenge') {
      strip.append(
        el('span', { class: 'ds-item-tools-label' }, item.type === 'challenge' ? 'Challenge:' : 'Code to read:'),
        raw('Edit as text', item.line, item.endLine, item.type === 'challenge' ? 'The challenge, with its fence lines' : 'The code to read, with its fence lines'));
    } else return;
    wrapper.prepend(strip);
  }

  /** Makes what was just drawn editable. Called by the lesson page after it draws. */
  function decorate(root) {
    if (text) return;                                      // the text box's preview is the page, as a reader sees it
    for (const node of root.querySelectorAll('[data-src]')) {
      node.classList.add('ds-editable');
      node.tabIndex = 0;
      node.title = 'Choose to change this';
    }
    for (const wrapper of root.querySelectorAll('.ds-item[data-type]')) tools(wrapper);
  }

  const PROSE = 'This part of the page';

  /**
   * Opens a block of prose: as a rich editor if the reader and writer of richtext.js hold it and draw it the
   * same, and as Markdown if not. `pending` is text that is being edited and not yet in the draft (what a
   * block was changed to before the switch to the other kind of editor).
   */
  async function showProse({ first, last, anchor, hide, pending = null, preferRaw = false }) {
    const rich = await richReady;
    const original = draft.slice(first, last);
    const start = pending ?? original;
    const verdict = rich && !preferRaw ? rich.canOpen(start) : null;
    let current;
    const toRich = rich ? (value) => {
      const result = rich.canOpen(value);
      if (!result.ok) return result.why;
      current.close();
      showProse({ first, last, anchor, hide, pending: value });
      return null;
    } : null;
    if (verdict?.ok) {
      hide.hidden = true;
      rich.open({
        text: start, original, label: `${PROSE}, as rich text`, anchor,
        onDone: (next) => { hide.hidden = false; apply({ first, last, next, kind: 'prose' }); },
        onCancel: () => { hide.hidden = false; },
        onMarkdown: (value) => showProse({ first, last, anchor, hide, pending: value, preferRaw: true }),
      });
      return;
    }
    current = openRaw({
      first, last, anchor, label: `${PROSE}, in Markdown`, kind: 'prose', hide, text: pending,
      note: verdict && !verdict.ok ? verdict.why : null,
      toRich: preferRaw ? toRich : null,
    });
  }

  async function openProse(node) {
    const open = node.nextElementSibling;
    if (open?.classList.contains('ds-raw')) { open.querySelector('textarea, [role=textbox]')?.focus(); return; }
    if (opening.has(node)) return;
    opening.add(node);
    try {
      const [first, last] = range(node);
      await showProse({ first, last, anchor: node, hide: node });
    } finally { opening.delete(node); }
  }

  main.addEventListener('click', (event) => {
    if (text || event.target.closest('.ds-raw, .ds-item-tools, button, textarea, input, summary')) return;
    const node = event.target.closest('[data-src]');
    if (!node || !main.contains(node)) return;
    event.preventDefault();
    openProse(node);
  });
  main.addEventListener('keydown', (event) => {
    if (text || event.target.matches('textarea, input, button')) return;
    const node = event.target.closest?.('[data-src]');
    if (node && event.target === node && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openProse(node); }
  });

  buildPropose();
  refreshChrome();

  return {
    decorate, cellEdited, editAsText, refreshChrome,
    destroy() { window.removeEventListener('beforeunload', warn); bar.remove(); proposeSection?.remove(); text?.destroy(); },
  };
}
