// The editing surfaces (docs/ARCHITECTURE.md, "Editing" and "Editing in place"). This file has the two parts
// that do not depend on how the text is edited: the form that proposes a change as a draft pull request, and
// the whole-page text box, with a live list of problems, notes that do not block, buttons that insert starter
// blocks, and a preview. Editing on the page itself is in inplace.js. None of it knows about lessons: the
// page says what counts as a problem (`validate`), what is worth a note (`notes`), which starter blocks to
// offer (`snippets`) and how to draw a preview (`onPreview`). Another site can copy this file and github.js.
import { el, announce, count } from './common.js';

/**
 * The form that proposes the draft: a one-line summary, optional detail, and a button. Whoever uses it says
 * when the draft is ready to propose (`ready(true)`), and is told when a proposal was made.
 * @param {object} o
 * @param {object} o.client            githubClient()
 * @param {string} o.path              the file in the repository
 * @param {string} o.name              a short name, for branch names
 * @param {string} o.baseText          the text the author started from
 * @param {()=>string} o.getText       the text to propose
 * @param {(text:string)=>{line:number,message:string}[]} [o.validate]
 * @param {(text:string)=>string[]} [o.describe]   lines for the pull request's description
 * @param {(pull:{url:string,number:number,branch:string})=>void} [o.onProposed]
 * @param {Node[]} [o.buttons]         more buttons beside the proposal button
 */
export function proposalForm({ client, path, name, baseText, getText, validate = () => [], describe = () => [], onProposed = () => { }, buttons = [] }) {
  let done = false;
  const send = el('button', { type: 'submit', class: 'dl-btn dl-btn-run', disabled: true }, 'Propose this change');
  const summary = el('input', { type: 'text', name: 'summary', id: 'ds-edit-summary', required: true, maxlength: 100, autocomplete: 'off' });
  const more = el('textarea', { name: 'description', id: 'ds-edit-more', rows: 3 });
  const result = el('div', { class: 'ds-edit-result', role: 'status', 'aria-live': 'polite' });
  let ok = false;

  async function submit(event) {
    event.preventDefault();
    if (send.disabled) return;
    const text = getText();
    if (validate(text).length) { form.ready(false); return; }
    send.disabled = true;
    result.className = 'ds-edit-result';
    result.setAttribute('role', 'status');
    result.textContent = 'Sending to GitHub…';
    try {
      const detail = more.value.trim();
      const body = [
        detail || null,
        detail ? '' : null,
        `Page: \`${path}\``,
        ...describe(text),
        '',
        'Proposed from the page\'s editing mode. It is a draft, and it changes nothing on the site until it is merged.',
      ].filter(line => line != null).join('\n');
      const pull = await client.propose({ path, text, baseText, name, summary: summary.value.trim(), description: body });
      done = true;
      send.disabled = true;
      result.className = 'ds-edit-result ds-notice';
      result.replaceChildren(
        el('p', {}, el('strong', {}, 'Proposed.')),
        el('p', {}, 'Your change is a draft pull request: ',
          el('a', { href: pull.url, target: '_blank', rel: 'noopener', id: 'ds-edit-pull' }, `#${pull.number} on GitHub`),
          '. It is not on the site until someone reads it and accepts it.'));
      announce('Your change was proposed.');
      form.querySelectorAll('input, textarea').forEach(n => { n.disabled = true; });
      onProposed(pull);
    } catch (problem) {
      result.className = 'ds-edit-result ds-notice ds-author-errors';
      result.setAttribute('role', 'alert');
      result.textContent = problem?.message || String(problem);
      send.disabled = !ok;
    }
  }

  const form = el('form', { class: 'ds-edit-form', onsubmit: submit },
    el('h3', {}, 'Propose this change'),
    el('p', { class: 'ds-cell-time' }, 'This sends your change to GitHub as a draft pull request. Someone reads it before it goes on the site.'),
    el('p', {}, el('label', { for: 'ds-edit-summary' }, 'What did you change? One line.'), el('br'), summary),
    el('p', {}, el('label', { for: 'ds-edit-more' }, 'More detail, if it helps the reader (optional)'), el('br'), more),
    el('p', {}, send, ...buttons.flatMap(b => [' ', b])),
    result);
  form.ready = (value) => { ok = value; send.disabled = done || !value; };
  Object.defineProperty(form, 'done', { get: () => done });
  return form;
}

/**
 * The whole-page text box.
 * @param {object} o
 * @param {HTMLElement} o.page        the page itself, drawn above or below the editor. It is hidden while the
 *                                    text box shows, and shown for the preview.
 * @param {string} o.source           the text the author started from: what "changed" is measured against
 * @param {string} [o.text]           the text to show, if it is not `source` (a draft)
 * @param {string} o.path             the file in the repository
 * @param {string} o.name             a short name, for branch names
 * @param {object} o.client           githubClient()
 * @param {(text:string)=>{line:number,message:string}[]} [o.validate]   problems that block a proposal
 * @param {(text:string)=>{text:string,action?:{label:string,run:(text:string)=>string}}[]} [o.notes]
 * @param {(text:string)=>string[]} [o.describe]    lines for the pull request's description
 * @param {{label:string,block:(text:string)=>string}[]} [o.snippets]
 * @param {(text:string)=>void|Promise<void>} [o.onPreview]
 * @param {()=>void} [o.leave]        what "Stop editing" does once it is safe to
 * @param {(text:string)=>void} [o.onClose]  if given, a "Back to editing on the page" button hands the text
 *                                    back with no question asked. "Stop editing" stays beside it when `leave`
 *                                    is given, and then asks nothing either: the caller keeps the text.
 * @param {(text:string)=>void} [o.onChange]  called after each edit, with the text
 * @param {(pull:object)=>void} [o.onProposed]  called when the proposal has been sent
 */
export function mountEditor({
  page, source, text = source, path, name, client, validate = () => [], notes = () => [], describe = () => [],
  snippets = [], onPreview = () => { }, leave = null, onClose = null, onChange = () => { }, onProposed = () => { },
}) {
  let timer = null;

  const box = el('textarea', {
    id: 'ds-edit-text', class: 'ds-edit-text', rows: 28, spellcheck: 'false', autocapitalize: 'off',
    autocomplete: 'off', wrap: 'soft',
  });
  box.value = text;

  const problems = el('div', { class: 'ds-edit-problems', role: 'status', 'aria-live': 'polite' });
  const noteList = el('ul', { class: 'ds-edit-notes' });

  const insert = (block) => {
    const current = box.value;
    const a = box.selectionStart, b = box.selectionEnd;
    const before = current.slice(0, a), after = current.slice(b);
    const lead = before === '' || before.endsWith('\n\n') ? '' : before.endsWith('\n') ? '\n' : '\n\n';
    const trail = after === '' || after.startsWith('\n\n') ? '\n' : after.startsWith('\n') ? '\n\n' : '\n\n';
    box.setRangeText(lead + block.replace(/\n+$/, '') + trail, a, b, 'end');
    box.dispatchEvent(new Event('input'));
    box.focus();
  };

  const jump = (line) => {
    const lines = box.value.split('\n');
    const at = lines.slice(0, Math.max(0, line - 1)).reduce((n, l) => n + l.length + 1, 0);
    box.focus();
    box.setSelectionRange(at, at + (lines[line - 1]?.length ?? 0));
  };

  const dirty = () => box.value !== source;
  let found = [];

  function refresh() {
    const current = box.value;
    found = validate(current);
    problems.replaceChildren(found.length
      ? el('div', { class: 'ds-notice ds-author-errors' },
        el('p', {}, el('strong', {}, `${count(found.length, 'problem')} in the text.`), ' The page cannot be proposed until they are fixed.'),
        el('ul', {}, found.map(p => el('li', {},
          el('button', { type: 'button', class: 'ds-linklike', onclick: () => jump(p.line) }, `Line ${p.line}`), `: ${p.message}`))))
      : el('p', { class: 'ds-cell-time' }, dirty() ? 'No problems found.' : 'You have not changed anything yet.'));
    noteList.replaceChildren(...notes(current).map(n => el('li', {},
      n.text,
      n.action ? [' ', el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: () => {
        box.value = n.action.run(box.value);
        box.dispatchEvent(new Event('input'));
      } }, n.action.label)] : null)));
    form.ready(dirty() && found.length === 0);
  }

  box.addEventListener('input', () => {
    clearTimeout(timer);
    form.ready(false);
    onChange(box.value);
    timer = setTimeout(refresh, 200);
  });

  const back = () => onClose(box.value);
  function stop() {
    if (onClose) { onChange(box.value); leave(); return; }
    if (dirty() && !form.done && !confirm('Stop editing? The changes you have made on this page will be lost.')) return;
    window.removeEventListener('beforeunload', warn);
    (leave || (() => { }))();
  }

  function warn(event) {
    if (dirty() && !form.done) { event.preventDefault(); event.returnValue = ''; }
  }
  if (!onClose) window.addEventListener('beforeunload', warn);

  const form = proposalForm({
    client, path, name, baseText: source, getText: () => box.value, validate, describe, onProposed,
    buttons: [
      onClose ? el('button', { type: 'button', class: 'dl-btn', onclick: back }, 'Back to editing on the page') : null,
      !onClose || leave ? el('button', { type: 'button', class: 'dl-btn', onclick: stop }, 'Stop editing') : null,
    ].filter(Boolean),
  });

  const pane = el('div', { class: 'ds-edit-pane' },
    snippets.length ? el('p', { class: 'ds-edit-snippets' }, 'Add a block: ', snippets.map(s =>
      el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: () => insert(s.block(box.value)) }, s.label))) : null,
    el('label', { for: 'ds-edit-text', class: 'dl-sr-only' }, 'The text of the page, in Markdown'),
    box, problems, noteList, form);

  const tab = (label, which) => el('button', {
    type: 'button', class: 'dl-btn', 'data-tab': which, 'aria-pressed': 'false', onclick: () => show(which),
  }, label);
  const tabEdit = tab('Edit', 'edit');
  const tabPreview = tab('Preview', 'preview');

  async function show(which) {
    const editing = which === 'edit';
    pane.hidden = !editing;
    page.hidden = editing;
    tabEdit.setAttribute('aria-pressed', String(editing));
    tabPreview.setAttribute('aria-pressed', String(!editing));
    if (editing) { announce('Editing the text of the page.'); box.focus(); return; }
    announce('Preview of your changes. Nothing in it is saved.');
    await onPreview(box.value);
    page.scrollIntoView?.({ block: 'start' });
  }

  const section = el('section', { class: 'ds-edit', id: 'ds-edit', 'aria-label': 'Editing this page' },
    el('h2', {}, 'Editing this page'),
    el('p', { class: 'ds-cell-time' }, `You are editing the text of ${path}. The Preview shows the page as it would look with your changes.`),
    el('p', { class: 'ds-edit-tabs' }, tabEdit, ' ', tabPreview),
    pane);
  page.before(section);
  refresh();
  show('edit');
  return { text: () => box.value, show, element: section, destroy: () => { window.removeEventListener('beforeunload', warn); section.remove(); } };
}
