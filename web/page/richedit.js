// The rich editor of one block of prose (docs/ARCHITECTURE.md, "Editing in place", "Rich blocks"): a
// ProseMirror editor over the schema of richtext.js, with a row of buttons above it. It opens where the block
// stands, edits that block alone, and hands back Markdown for the lines the block came from. It knows nothing
// about drafts or lessons. `inplace.js` loads this file when an author first opens a paragraph.
import {
  EditorState, EditorView, TextSelection, baseKeymap, toggleMark, setBlockType, wrapIn, lift, keymap, history,
  undo, redo, wrapInList, splitListItem, liftListItem, sinkListItem, inputRules, wrappingInputRule,
  textblockTypeInputRule,
} from '../vendor/rich.bundle.js';
import { el, announce } from './common.js';
import { createRichText } from './richtext.js';

let counter = 0;

/**
 * @param {object} o
 * @param {{md:object, render:(text:string)=>string}} o.markdown  the page's renderer (createMarkdown)
 * @param {string} [o.base]                    the folder pictures are relative to
 * @param {()=>string[]} [o.pageIds]           the pages a link can point to, offered when a link is written
 */
export function createRichEditor({ markdown, base = '', pageIds = () => [] }) {
  const rich = createRichText({ markdown, base });
  const { schema } = rich;
  const { nodes, marks } = schema;

  // ---- commands

  const markActive = (state, type) => {
    const { from, to, empty, $from } = state.selection;
    return empty ? !!type.isInSet(state.storedMarks || $from.marks()) : state.doc.rangeHasMark(from, to, type);
  };
  const ancestor = (state, ...types) => {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
      if (types.includes($from.node(depth).type)) return { node: $from.node(depth), pos: $from.before(depth) };
    }
    return null;
  };
  /** A list button: takes the item out of a list of this kind, changes a list of the other kind, or makes one. */
  const toggleList = (type) => (state, dispatch) => {
    const list = ancestor(state, nodes.bullet_list, nodes.ordered_list);
    if (list && list.node.type === type) return liftListItem(nodes.list_item)(state, dispatch);
    if (list) {
      if (dispatch) dispatch(state.tr.setNodeMarkup(list.pos, type, { tight: list.node.attrs.tight }));
      return true;
    }
    return wrapInList(type)(state, dispatch);
  };
  const toggleQuote = (state, dispatch) => (ancestor(state, nodes.blockquote) ? lift(state, dispatch) : wrapIn(nodes.blockquote)(state, dispatch));
  const hardBreak = (state, dispatch) => {
    if (dispatch) dispatch(state.tr.replaceSelectionWith(nodes.hard_break.create()).scrollIntoView());
    return true;
  };
  /** The extent of the link the position is in. */
  const linkRange = ($pos) => {
    const start = $pos.parent.childAfter($pos.parentOffset);
    const link = start.node && start.node.marks.find(m => m.type === marks.link);
    if (!link) return null;
    let index = $pos.index(), from = $pos.start() + start.offset, to = from + start.node.nodeSize;
    let after = index + 1;
    while (index > 0 && link.isInSet($pos.parent.child(index - 1).marks)) { index--; from -= $pos.parent.child(index).nodeSize; }
    while (after < $pos.parent.childCount && link.isInSet($pos.parent.child(after).marks)) { to += $pos.parent.child(after).nodeSize; after++; }
    return { from, to, link };
  };

  const rules = inputRules({
    rules: [
      textblockTypeInputRule(/^(#{1,4})\s$/, nodes.heading, (m) => ({ level: m[1].length })),
      wrappingInputRule(/^\s*([-*])\s$/, nodes.bullet_list, (m) => ({ bullet: m[1] })),
      wrappingInputRule(/^(\d+)\.\s$/, nodes.ordered_list, (m) => ({ order: +m[1] }), (m, node) => node.childCount + node.attrs.order === +m[1]),
      wrappingInputRule(/^\s*>\s$/, nodes.blockquote),
    ],
  });

  // ---- one editor

  /**
   * Opens `text` (one block of Markdown, which `canOpen` has accepted) as a rich editor after `anchor`.
   * Exactly one of the callbacks is called, once, after the editor has been taken out of the page.
   * @param {object} o
   * @param {string} o.text                      what to open
   * @param {string} [o.original]                the block as it is in the draft, if `text` is something being edited
   *                                             instead. "Changed" is measured against this.
   * @param {string} o.label                     what the editor is, for a screen reader
   * @param {HTMLElement} o.anchor
   * @param {(markdown:string)=>void} o.onDone   the block was changed: the Markdown to put in its place
   * @param {()=>void} o.onCancel                Cancel, Escape, or Done with nothing changed
   * @param {(markdown:string)=>void} o.onMarkdown   "Edit as Markdown": the block as it is now, as Markdown
   */
  function open({ text, original = text, label, anchor, onDone, onCancel, onMarkdown }) {
    const initial = rich.parse(text);
    let baseline = initial;
    if (original !== text) { try { baseline = rich.parse(original); } catch { baseline = null; } }
    const id = ++counter;
    let view;
    const buttons = [];
    let finished = false;

    const leave = () => { finished = true; view.destroy(); widget.remove(); };
    const changed = () => !baseline || !view.state.doc.eq(baseline);
    const current = () => (changed() ? rich.serialize(view.state.doc) : original.replace(/^\n+|\s+$/g, ''));
    const done = () => { if (finished) return; if (!changed()) { leave(); onCancel(); return; } const out = current(); leave(); onDone(out); };
    const cancel = () => { if (finished) return; leave(); onCancel(); };
    const toMarkdown = () => { if (finished) return; const out = current(); leave(); onMarkdown(out); };

    const run = (command) => { command(view.state, view.dispatch, view); view.focus(); };
    const tool = (name, command, active = null) => {
      const button = el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: () => run(command), onmousedown: (e) => e.preventDefault() }, name);
      if (active) button.setAttribute('aria-pressed', 'false');
      buttons.push({ button, active });
      return button;
    };

    const level = el('select', { id: `ds-rich-level-${id}`, 'aria-label': 'Kind of block' },
      el('option', { value: 'p' }, 'Paragraph'),
      ...[1, 2, 3, 4].map(n => el('option', { value: String(n) }, `Heading ${n}`)));
    level.addEventListener('change', () => {
      run(level.value === 'p' ? setBlockType(nodes.paragraph) : setBlockType(nodes.heading, { level: +level.value }));
    });

    // The link row: shown when "Link" is chosen.
    const address = el('input', { type: 'text', id: `ds-rich-address-${id}`, list: `ds-rich-pages-${id}`, autocomplete: 'off', spellcheck: 'false', 'aria-describedby': `ds-rich-address-help-${id}` });
    const pages = el('datalist', { id: `ds-rich-pages-${id}` }, pageIds().map(p => el('option', { value: `lesson:${p}` })));
    const linkRow = el('p', { class: 'ds-rich-link', hidden: true },
      el('label', { for: address.id }, 'Link address'), ' ', address, pages, ' ',
      el('button', { type: 'button', class: 'dl-btn dl-btn-run', onclick: () => applyLink(address.value.trim()) }, 'Apply'), ' ',
      el('button', { type: 'button', class: 'dl-btn', onclick: () => applyLink('') }, 'Remove link'), ' ',
      el('button', { type: 'button', class: 'dl-btn', onclick: () => closeLinkRow() }, 'Close'),
      el('span', { id: `ds-rich-address-help-${id}`, class: 'ds-cell-time' }, ' A page of this site is written lesson:the-page-id. Choose the words first.'));
    function openLinkRow() {
      const { selection } = view.state;
      const inside = linkRange(selection.$from);
      address.value = inside ? inside.link.attrs.href : '';
      linkRow.hidden = false;
      address.focus();
    }
    function closeLinkRow() { linkRow.hidden = true; view.focus(); }
    function applyLink(href) {
      const { state } = view;
      let { from, to } = state.selection;
      if (state.selection.empty) {
        const inside = linkRange(state.selection.$from);
        if (!inside) { announce('Choose the words to link first.'); address.focus(); return; }
        ({ from, to } = inside);
      }
      const tr = state.tr.removeMark(from, to, marks.link);
      if (href) tr.addMark(from, to, marks.link.create({ href }));
      view.dispatch(tr);
      announce(href ? 'Link added.' : 'Link removed.');
      closeLinkRow();
    }
    address.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); applyLink(address.value.trim()); }
      else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeLinkRow(); }
    });

    const bar = el('div', { class: 'ds-rich-bar', role: 'toolbar', 'aria-label': `Formatting for: ${label}` },
      level,
      tool('Bold', toggleMark(marks.strong), (s) => markActive(s, marks.strong)),
      tool('Italic', toggleMark(marks.em), (s) => markActive(s, marks.em)),
      tool('Code', toggleMark(marks.code), (s) => markActive(s, marks.code)),
      el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: openLinkRow, onmousedown: (e) => e.preventDefault() }, 'Link'),
      tool('Bullets', toggleList(nodes.bullet_list), (s) => !!ancestor(s, nodes.bullet_list)),
      tool('Numbers', toggleList(nodes.ordered_list), (s) => !!ancestor(s, nodes.ordered_list)),
      tool('Quote', toggleQuote, (s) => !!ancestor(s, nodes.blockquote)));
    // Left and Right move along the buttons, which are one stop on Tab. The list of block kinds is a stop of its own.
    const stops = () => [...bar.querySelectorAll('button')];
    const roving = () => stops().forEach((n, k) => { n.tabIndex = k === 0 ? 0 : -1; });
    bar.addEventListener('keydown', (event) => {
      if (event.target.matches('select') || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
      const all = stops();
      const at = all.indexOf(event.target);
      const next = all[(at + (event.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length];
      all.forEach(n => { n.tabIndex = n === next ? 0 : -1; });
      next.focus();
      event.preventDefault();
    });
    bar.addEventListener('focusin', (event) => {
      const all = stops();
      if (all.includes(event.target)) all.forEach(n => { n.tabIndex = n === event.target ? 0 : -1; });
    });

    const surface = el('div', { class: 'ds-rich-surface' });
    const widget = el('div', { class: 'ds-raw ds-rich', role: 'group', 'aria-label': label },
      el('p', { class: 'ds-cell-time' }, `${label}. Ctrl+Enter finishes. Escape leaves it as it was.`),
      bar, linkRow, surface,
      el('p', {}, el('button', { type: 'button', class: 'dl-btn dl-btn-run', onclick: done }, 'Done'), ' ',
        el('button', { type: 'button', class: 'dl-btn', onclick: cancel }, 'Cancel'), ' ',
        el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: toMarkdown }, 'Edit as Markdown')));
    widget.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) { event.preventDefault(); done(); }
      else if (event.key === 'Escape' && linkRow.hidden) { event.preventDefault(); cancel(); anchor.focus?.(); }
    });

    const sync = () => {
      const { state } = view;
      for (const { button, active } of buttons) if (active) button.setAttribute('aria-pressed', String(active(state)));
      const parent = state.selection.$from.parent;
      level.value = parent.type === nodes.heading && parent.attrs.level <= 4 ? String(parent.attrs.level) : 'p';
    };

    const breakKeys = { Enter: splitListItem(nodes.list_item), 'Shift-Enter': hardBreak, Tab: sinkListItem(nodes.list_item), 'Shift-Tab': liftListItem(nodes.list_item) };
    view = new EditorView(surface, {
      state: EditorState.create({
        doc: initial,
        plugins: [
          history(), rules,
          keymap({
            'Mod-z': undo, 'Mod-y': redo, 'Shift-Mod-z': redo,
            'Mod-b': toggleMark(marks.strong), 'Mod-i': toggleMark(marks.em), 'Mod-e': toggleMark(marks.code),
            ...breakKeys,
          }),
          keymap(baseKeymap),
        ],
      }),
      attributes: { role: 'textbox', 'aria-multiline': 'true', 'aria-label': label, class: 'ds-prose' },
      dispatchTransaction(tr) {
        view.updateState(view.state.apply(tr));
        sync();
      },
    });
    view.dispatch(view.state.tr.setSelection(TextSelection.atEnd(view.state.doc)));
    roving();
    anchor.after(widget);
    view.focus();
    announce(`${label}. Escape leaves it as it was.`);
    return { element: widget, view };
  }

  return { canOpen: rich.canOpen, open };
}
