// The editing surface (docs/ARCHITECTURE.md, "Editing"): the page's source in a text box, a live list of
// problems, notes that do not block, buttons that insert starter blocks, a preview of the page as it would
// be, and a form that proposes the change as a draft pull request. It knows nothing about lessons. The page
// that uses it says what counts as a problem (`validate`), what is worth a note (`notes`), which starter
// blocks to offer (`snippets`) and how to draw a preview (`onPreview`). Another site can copy this file
// and github.js, and give them its own checks.
import { el, announce, count } from './common.js';

/**
 * @param {object} o
 * @param {HTMLElement} o.page        the page itself, drawn above or below the editor. It is hidden while the
 *                                    text box shows, and shown for the preview.
 * @param {string} o.source           the text as it is now
 * @param {string} o.path             the file in the repository
 * @param {string} o.name             a short name, for branch names
 * @param {object} o.client           githubClient()
 * @param {(text:string)=>{line:number,message:string}[]} [o.validate]   problems that block a proposal
 * @param {(text:string)=>{text:string,action?:{label:string,run:(text:string)=>string}}[]} [o.notes]
 * @param {(text:string)=>string[]} [o.describe]    lines for the pull request's description
 * @param {{label:string,block:(text:string)=>string}[]} [o.snippets]
 * @param {(text:string)=>void|Promise<void>} [o.onPreview]
 * @param {()=>void} o.leave          what "Stop editing" does once it is safe to
 */
export function mountEditor({
  page, source, path, name, client, validate = () => [], notes = () => [], describe = () => [],
  snippets = [], onPreview = () => { }, leave,
}) {
  let done = false;       // a proposal was made: the form is finished
  let timer = null;

  const box = el('textarea', {
    id: 'ds-edit-text', class: 'ds-edit-text', rows: 28, spellcheck: 'false', autocapitalize: 'off',
    autocomplete: 'off', wrap: 'soft',
  });
  box.value = source;

  const problems = el('div', { class: 'ds-edit-problems', role: 'status', 'aria-live': 'polite' });
  const noteList = el('ul', { class: 'ds-edit-notes' });
  const result = el('div', { class: 'ds-edit-result', role: 'status', 'aria-live': 'polite' });
  const send = el('button', { type: 'submit', class: 'dl-btn dl-btn-run' }, 'Propose this change');
  const summary = el('input', { type: 'text', name: 'summary', id: 'ds-edit-summary', required: true, maxlength: 100, autocomplete: 'off' });
  const more = el('textarea', { name: 'description', id: 'ds-edit-more', rows: 3 });

  const insert = (block) => {
    const text = box.value;
    const a = box.selectionStart, b = box.selectionEnd;
    const before = text.slice(0, a), after = text.slice(b);
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
    const text = box.value;
    found = validate(text);
    problems.replaceChildren(found.length
      ? el('div', { class: 'ds-notice ds-author-errors' },
        el('p', {}, el('strong', {}, `${count(found.length, 'problem')} in the text.`), ' The page cannot be proposed until they are fixed.'),
        el('ul', {}, found.map(p => el('li', {},
          el('button', { type: 'button', class: 'ds-linklike', onclick: () => jump(p.line) }, `Line ${p.line}`), `: ${p.message}`))))
      : el('p', { class: 'ds-cell-time' }, dirty() ? 'No problems found.' : 'You have not changed anything yet.'));
    noteList.replaceChildren(...notes(text).map(n => el('li', {},
      n.text,
      n.action ? [' ', el('button', { type: 'button', class: 'dl-btn ds-btn-quiet', onclick: () => {
        box.value = n.action.run(box.value);
        box.dispatchEvent(new Event('input'));
      } }, n.action.label)] : null)));
    send.disabled = done || !dirty() || found.length > 0;
  }

  box.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(refresh, 200); send.disabled = true; });

  async function submit(event) {
    event.preventDefault();
    if (send.disabled) return;
    const text = box.value;
    if (validate(text).length) { refresh(); return; }
    send.disabled = true;
    result.className = 'ds-edit-result';
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
      const pull = await client.propose({ path, text, baseText: source, name, summary: summary.value.trim(), description: body });
      done = true;
      refresh();
      result.className = 'ds-edit-result ds-notice';
      result.replaceChildren(
        el('p', {}, el('strong', {}, 'Proposed.')),
        el('p', {}, 'Your change is a draft pull request: ',
          el('a', { href: pull.url, target: '_blank', rel: 'noopener', id: 'ds-edit-pull' }, `#${pull.number} on GitHub`),
          '. It is not on the site until someone reads it and accepts it.'));
      announce('Your change was proposed.');
      form.querySelectorAll('input, textarea').forEach(n => { n.disabled = true; });
    } catch (problem) {
      result.className = 'ds-edit-result ds-notice ds-author-errors';
      result.setAttribute('role', 'alert');
      result.textContent = problem?.message || String(problem);
      send.disabled = false;
    }
  }

  const form = el('form', { class: 'ds-edit-form', onsubmit: submit },
    el('h3', {}, 'Propose this change'),
    el('p', { class: 'ds-cell-time' }, 'This sends your change to GitHub as a draft pull request. Someone reads it before it goes on the site.'),
    el('p', {}, el('label', { for: 'ds-edit-summary' }, 'What did you change? One line.'), el('br'), summary),
    el('p', {}, el('label', { for: 'ds-edit-more' }, 'More detail, if it helps the reader (optional)'), el('br'), more),
    el('p', {}, send, ' ',
      el('button', { type: 'button', class: 'dl-btn', onclick: stop }, 'Stop editing')),
    result);

  function stop() {
    if (dirty() && !done && !confirm('Stop editing? The changes you have made on this page will be lost.')) return;
    window.removeEventListener('beforeunload', warn);
    leave();
  }

  function warn(event) {
    if (dirty() && !done) { event.preventDefault(); event.returnValue = ''; }
  }
  window.addEventListener('beforeunload', warn);

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
  return { text: () => box.value, show, element: section };
}
