// A C# cell on a page: its editor, its Run/Stop or Check button, its status line, the compiler's messages,
// and the console under it. The lesson page and the notebook both use it; what differs between them (which
// cells are above, what is saved, hints and guesses) comes in through the options. docs/ENGINE_API.md is
// how it talks to the engine.
import { el } from './common.js';
import { createEditor } from './editor.js';
import { ConsoleView } from './console.js';

/** A first guess at a cell's kind before the engine's classify() answers, so the label rarely changes. */
export function guessKind(code) {
  const text = String(code)
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/\/\/.*$/gm, '')
    .replace(/@?\$?"(?:[^"\\\n]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\\n]|\\.)'/g, "''");
  if (!text.trim()) return 'empty';
  if (/\bstatic\s+(?:async\s+)?(?:void|int|Task(?:<int>)?)\s+Main\s*\(/.test(text)) return 'program';
  // Split the text outside braces into pieces; declarations only means types.
  let depth = 0, piece = '';
  const pieces = [];
  for (const ch of text) {
    if (ch === '{') { if (depth === 0) { pieces.push(piece); piece = ''; } depth++; }
    else if (ch === '}') { depth = Math.max(0, depth - 1); if (depth === 0) piece = ''; }
    else if (depth === 0) piece += ch;
  }
  pieces.push(piece);
  const DECL = /^\s*(?:\[[^\]]*\]\s*)*(?:(?:public|internal|private|protected|static|abstract|sealed|partial|readonly|ref|file|unsafe|new)\s+)*(?:class|record|interface|enum|struct|namespace)\b/;
  const statements = pieces.join(' ').split(';').map(l => l.trim()).filter(Boolean)
    .filter(l => !/^(global\s+)?using\b/.test(l));
  return statements.every(l => DECL.test(l)) ? 'types' : 'program';
}

/** "Program.cs(3,19): error CS0103: The name 'totl' does not exist in the current context", as Visual Studio writes it. */
export function formatDiagnostic(d) {
  const where = d.file ? `${d.file}${d.line ? `(${d.line},${d.column})` : ''}: ` : '';
  return `${where}${d.severity} ${d.code}: ${d.message}`;
}

const KIND_TITLES = {
  program: 'A program cell. Run runs it from its first line to its last.',
  types: 'A types cell: classes and other types. Check compiles it. The cells below can use its types.',
  empty: 'An empty cell. Write some C# in it.',
};

const READS_INPUT = /Console\s*\.\s*Read(Line|Key)?\s*\(/;

export class CodeCell {
  /**
   * @param {object} o
   * @param {object} o.runner       the page's runner (docs/ENGINE_API.md)
   * @param {string} o.id           the cell's id (unique on the page)
   * @param {string} o.code         the code to show (the reader's saved version, or the page's)
   * @param {string} [o.original]   the page's version, for Reset; without it there is no Reset
   * @param {string} [o.file]       the file name from the lesson (file:)
   * @param {string} [o.label]      what a screen reader calls this cell ("Cell 3")
   * @param {Node}   [o.hint]       the cell's hint: header, as rendered HTML, behind a small ?
   * @param {Function} o.cellsFor   (code) => the cells runner.run() takes, this one last
   * @param {Function} [o.onEdit]   (code) after each edit
   * @param {Function} [o.onResult] (result, { mode, output, compare }) after each run or check
   * @param {Function} [o.onGoto]   (cellId, line, column) for a message about another cell
   * @param {Node[]} [o.headTools]  extra buttons for the head (the notebook's move and delete)
   * @param {Node[]} [o.barTools]   extra buttons for the bar under the editor
   */
  constructor(o) {
    this.o = o;
    this.runner = o.runner;
    this.id = o.id;
    this.original = o.original;
    this.kind = guessKind(o.code);
    this.job = null;
    this.running = false;
    this.lastResult = null;

    const labelId = `cell-${o.id}-label`;
    this.pill = el('span', { class: 'dl-cell-pill-type' });
    this.fileEl = el('span', { class: 'ds-cell-file' });
    this.editedEl = el('span', { class: 'ds-cell-edited', hidden: true }, 'your version');
    const head = el('div', { class: 'dl-cell-head' },
      el('span', { class: 'dl-sr-only', id: labelId }, o.label || 'Cell'),
      el('span', { class: 'dl-cell-pill' }, this.pill),
      this.fileEl, this.editedEl,
      el('span', { class: 'dl-cell-spacer' }),
      ...(o.headTools || []));
    let hintText = null;
    if (o.hint) {
      hintText = el('div', { class: 'dl-hint-text', id: `cell-${o.id}-hint`, hidden: true }, o.hint);
      const icon = el('button', { type: 'button', class: 'dl-hint-icon', 'aria-expanded': 'false', 'aria-controls': hintText.id, title: 'A hint', 'aria-label': 'A hint for this cell' }, '?');
      icon.addEventListener('click', () => {
        hintText.hidden = !hintText.hidden;
        icon.setAttribute('aria-expanded', String(!hintText.hidden));
      });
      head.append(icon);
    }

    const editorBox = el('div', { class: 'ds-editor' });
    this.typed = el('textarea', { rows: 3, spellcheck: 'false', id: `cell-${o.id}-typed` });
    this.typedBox = el('div', { class: 'ds-typed-ahead', hidden: true },
      el('label', { for: this.typed.id }, 'This browser cannot pause a program while you type. Write the answers the program will ask for here, one on each line, then press Run.'),
      this.typed);

    this.runBtn = el('button', { type: 'button', class: 'dl-btn dl-btn-run' }, 'Run');
    this.runBtn.addEventListener('click', () => (this.running ? this.stop() : this.go()));
    const tools = [];
    if (o.original != null) {
      this.resetBtn = el('button', { type: 'button', class: 'dl-btn', title: "Put the page's version of the code back" }, 'Reset');
      this.resetBtn.addEventListener('click', () => this.reset());
      tools.push(this.resetBtn);
    }
    this.state = el('span', { class: 'ds-cell-state', role: 'status', 'aria-live': 'polite' });
    const bar = el('div', { class: 'dl-cell-bar' }, this.runBtn, ...tools, ...(o.barTools || []), this.state);

    this.diagList = el('ul', { class: 'ds-diagnostics', hidden: true, 'aria-label': 'Compiler messages' });
    this.out = el('pre', { class: 'ds-console-out', role: 'log', 'aria-live': 'polite', 'aria-label': `Output of ${o.label || 'this cell'}`, tabindex: '0', 'data-empty': 'It printed nothing.' });
    this.inputLine = el('input', { type: 'text', autocomplete: 'off', spellcheck: 'false', id: `cell-${o.id}-input` });
    this.inputLabel = el('label', { for: this.inputLine.id }, 'Type a line for the program, then press Enter');
    this.endBtn = el('button', { type: 'button', class: 'dl-btn' }, 'End input');
    this.inputForm = el('form', { class: 'ds-input', hidden: true, 'data-waiting': 'false' },
      this.inputLabel, this.inputLine, el('button', { type: 'submit', class: 'dl-btn' }, 'Enter'), this.endBtn);
    this.inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!this.job) return;
      this.job.sendLine(this.inputLine.value);
      this.inputLine.value = '';
      this.setWaiting(false);
    });
    this.endBtn.addEventListener('click', () => { this.job?.endInput(); this.setWaiting(false); });
    this.consoleBox = el('div', { class: 'ds-console', hidden: true }, this.out, this.inputForm);
    this.console = new ConsoleView(this.out);

    this.element = el('section', { class: 'dl-cell', id: `cell-${o.id}`, 'data-cell': o.id, 'aria-labelledby': labelId },
      head, hintText, editorBox, this.typedBox, bar, this.diagList, this.consoleBox);

    this.editor = createEditor(editorBox, {
      doc: o.code,
      label: `${o.label || 'Cell'}: C# code. Ctrl+Enter runs it. Escape, then Tab, leaves the editor.`,
      onChange: (code) => this.edited(code),
      onRun: () => (this.running ? null : this.go()),
    });
    this.setFile(o.file || null);
    this.drawKind();
    this.edited(o.code, { quiet: true });
  }

  getCode() { return this.editor.getCode(); }

  edited(code, { quiet = false } = {}) {
    if (this.original != null) this.editedEl.hidden = code === this.original;
    this.typedBox.hidden = this.runner?.liveInput !== false || !READS_INPUT.test(code);
    const guess = guessKind(code);
    if (guess !== this.kind && !this.classified) { this.kind = guess; this.drawKind(); }
    if (!quiet) this.o.onEdit?.(code);
  }

  /** The kind from the engine (runner.classify or a result). */
  setKind(kind) {
    if (!kind) return;
    this.classified = true;
    if (kind === this.kind) return;
    this.kind = kind;
    this.drawKind();
  }

  drawKind() {
    this.pill.textContent = this.kind;
    this.pill.dataset.kind = this.kind;
    if (this.element) this.element.dataset.kind = this.kind;
    this.pill.title = KIND_TITLES[this.kind] || '';
    if (!this.running) this.runBtn.textContent = this.kind === 'types' ? 'Check' : 'Run';
    this.runBtn.title = this.kind === 'types' ? 'Compile this cell and show any compiler messages. Nothing runs.' : 'Run this program (Ctrl+Enter)';
    if (!this.fileFromLesson) this.fileEl.textContent = this.defaultFile();
  }

  defaultFile() {
    if (this.kind !== 'types') return 'Program.cs';
    const m = /\b(?:class|record|interface|enum|struct)\s+(?:class\s+|struct\s+)?([A-Za-z_]\w*)/.exec(this.getCode?.() ?? this.o.code);
    return m ? `${m[1]}.cs` : 'Types.cs';
  }

  setFile(file) {
    this.fileFromLesson = !!file;
    this.fileEl.textContent = file || this.defaultFile();
  }

  get file() { return this.fileEl.textContent; }

  setState(text, state = 'idle') {
    this.state.textContent = text;
    this.state.dataset.state = state;
  }

  setWaiting(waiting) {
    this.inputForm.dataset.waiting = String(waiting);
    this.inputLabel.textContent = waiting ? 'The program is waiting. Type a line, then press Enter' : 'Type a line for the program, then press Enter';
    if (this.running) this.setState(waiting ? 'waiting for you to type' : 'running…', waiting ? 'waiting' : 'busy');
  }

  reset() {
    if (this.original == null) return;
    this.editor.setCode(this.original);
    this.setState("Back to the page's version. Ctrl+Z in the editor brings yours back.");
    this.editor.focus();
  }

  go() { return this.kind === 'types' ? this.check() : this.run(); }
  check() { return this.execute({ mode: 'check' }); }
  run() { return this.execute({ mode: 'run' }); }

  stop() {
    this.job?.stop();
    this.setState('stopping…', 'busy');
  }

  /** Runs this cell with the comparison's inputs; resolves to the result (with values). */
  runWithInputs(inputs) { return this.execute({ mode: 'run', inputs, stdin: '', compare: true }); }

  async execute({ mode, inputs, stdin, compare = false }) {
    if (this.running) return null;
    this.running = true;
    const code = this.getCode();
    this.console.clear();
    this.diagList.hidden = true;
    this.diagList.replaceChildren();
    this.editor.setDiagnostics([]);
    this.consoleBox.hidden = mode === 'check';
    const live = this.runner.liveInput && mode === 'run' && stdin === undefined;
    if (!live && stdin === undefined && mode === 'run') stdin = this.runner.liveInput ? undefined : (this.typedBox.hidden ? '' : this.typed.value.replace(/\r/g, ''));
    this.inputForm.hidden = !live;
    this.setWaiting(false);
    if (mode === 'run') {
      this.runBtn.textContent = 'Stop';
      this.runBtn.classList.add('dl-btn-stop');
      this.runBtn.title = 'Stop the program';
    } else this.runBtn.disabled = true;
    const waitingForEngine = this.runner.status === 'loading' || this.runner.status === 'warming' || this.runner.status === 'restarting';
    this.setState(waitingForEngine ? 'waiting for C# to start…' : (mode === 'check' ? 'checking…' : 'compiling…'), 'busy');
    let printed = false;
    const t0 = performance.now();
    this.job = this.runner.run({
      cells: this.o.cellsFor(code),
      mode, stdin, inputs,
      onOutput: (chunk) => {
        if (!printed) { printed = true; if (!this.inputForm.dataset.waiting || this.inputForm.dataset.waiting === 'false') this.setState('running…', 'busy'); }
        this.console.push(chunk);
      },
      onInputRequest: () => {
        this.console.flush();
        this.setWaiting(true);
        this.inputLine.focus();
      },
    });
    const result = await this.job.done;
    this.console.flush();
    this.job = null;
    this.running = false;
    this.runBtn.disabled = false;
    this.runBtn.classList.remove('dl-btn-stop');
    this.inputForm.hidden = true;
    this.lastResult = result;
    const own = result.kind?.[this.id];
    if (own) this.setKind(own);
    if (!this.fileFromLesson && result.files?.[this.id]) this.fileEl.textContent = result.files[this.id];
    this.drawKind();
    this.show(result, { mode, ms: performance.now() - t0 });
    this.o.onResult?.(result, { mode, output: this.console.text, compare });
    return result;
  }

  /** Draws a result: the status line, the compiler's messages, and an exception under the output. */
  show(result, { mode, ms }) {
    const seconds = ms != null ? ` (${(ms / 1000).toFixed(ms < 10000 ? 2 : 1)} s)` : '';
    const errors = result.diagnostics.filter(d => d.severity === 'error');
    const warnings = result.diagnostics.filter(d => d.severity !== 'error');
    this.editor.setDiagnostics(result.diagnostics.filter(d => d.cellId === this.id));
    if (result.diagnostics.length) this.drawDiagnostics(result.diagnostics);
    const hasOutput = this.console.text.length > 0;
    switch (result.outcome) {
      case 'compile-error':
        this.consoleBox.hidden = true;
        this.setState(mode === 'check' ? 'Did not compile.' : 'Did not compile, so nothing ran.', 'error');
        this.diagList.querySelector('.ds-diag')?.focus();
        break;
      case 'ok':
        if (mode === 'check' || !result.ran) {
          this.consoleBox.hidden = true;
          this.setState(this.kind === 'types' ? 'Compiled. Nothing ran: this cell has only types. The cells below can use them.' : 'Compiled. Nothing ran.');
        } else {
          this.consoleBox.hidden = false;
          this.setState(result.exitCode ? `Ran. It ended with exit code ${result.exitCode}.${seconds}` : `Ran.${seconds}`);
        }
        break;
      case 'exception': {
        this.consoleBox.hidden = false;
        const ex = result.exception || {};
        const top = ex.frames?.[0];
        const where = top ? (top.line ? ` on line ${top.line} of ${top.file}` : ` in ${top.member || 'the program'}, in ${top.file}`) : '';
        this.setState(`Stopped with an exception${where}.`, 'error');
        this.drawException(ex);
        break;
      }
      case 'stopped':
        this.consoleBox.hidden = !hasOutput;
        this.setState('Stopped.');
        break;
      case 'timeout':
        this.consoleBox.hidden = false;
        this.setState('Stopped after 30 seconds of running. A loop that never ends is the usual reason.', 'error');
        break;
      default:
        this.consoleBox.hidden = !hasOutput;
        this.setState('The page could not run this. That is a problem in the page, not in your code. Reload the page and try again.', 'error');
    }
    if (!errors.length && warnings.length && result.outcome !== 'compile-error') this.diagList.hidden = false;
  }

  drawDiagnostics(list) {
    const shown = list.slice(0, 20);
    for (const d of shown) {
      const button = el('button', { type: 'button', class: `ds-diag${d.severity === 'error' ? '' : ' ds-diag-warning'}` }, formatDiagnostic(d));
      button.addEventListener('click', () => this.goto(d.cellId, d.line, d.column));
      this.diagList.append(el('li', {}, button, d.help ? el('span', { class: 'ds-diag-help' }, d.help) : null));
    }
    if (list.length > shown.length) this.diagList.append(el('li', { class: 'ds-diag-more' }, `And ${list.length - shown.length} more. Read the first message first: one mistake can cause several messages.`));
    else if (list.filter(d => d.severity === 'error').length > 1) this.diagList.append(el('li', { class: 'ds-diag-more' }, 'Read the first message first: one mistake can cause several messages.'));
    this.diagList.hidden = false;
  }

  goto(cellId, line, column) {
    if (!line) return;
    if (cellId && cellId !== this.id && this.o.onGoto) { this.o.onGoto(cellId, line, column); return; }
    this.editor.goTo(line, column);
  }

  drawException(ex) {
    const shortName = String(ex.type || 'Exception');
    const box = el('span', { class: 'ds-exception' }, `Unhandled exception. ${shortName}: ${ex.message || ''}`);
    for (const f of ex.frames || []) {
      const text = f.line ? `line ${f.line} of ${f.file}` : f.file;
      const member = f.member ? ` (in ${f.member})` : '';
      const line = el('span', { style: 'display:block' }, '   at ');
      if (f.line) {
        const b = el('button', { type: 'button' }, text);
        b.addEventListener('click', () => this.goto(f.cellId, f.line, 1));
        line.append(b);
      } else line.append(text);
      line.append(member);
      box.append(line);
    }
    if (ex.inner) box.append(el('span', { style: 'display:block' }, `It was caused by ${ex.inner.type}: ${ex.inner.message}`));
    if (ex.trace) box.append(el('details', {}, el('summary', {}, "What .NET said, in full"), el('span', { style: 'display:block' }, ex.trace)));
    this.console.appendNode(box);
  }

  /** Output as it was saved, drawn back without running anything. */
  restoreOutput(text, note) {
    if (!text) return;
    this.console.clear();
    this.console.push({ kind: 'out', text: text.replace(/\f/g, '') });
    this.console.flush();
    this.console.appendNode(el('span', { class: 'ds-note-line' }, note));
    this.consoleBox.hidden = false;
  }
}
