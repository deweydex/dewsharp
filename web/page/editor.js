// The code editor (CodeMirror 6, from web/vendor/editor.bundle.js) as the page uses it: C# cells that a
// learner edits and runs, read-only code, and the compiler's messages drawn as underlines and gutter marks.
import {
  EditorState, Compartment, EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter,
  drawSelection, highlightSpecialChars, StreamLanguage, syntaxHighlighting, bracketMatching, indentOnInput,
  indentUnit, defaultKeymap, history, historyKeymap, indentWithTab, closeBrackets, closeBracketsKeymap,
  setDiagnostics, lintGutter, searchKeymap, highlightSelectionMatches, csharp, pythonLanguage,
  classHighlighter, highlightCode,
} from '../vendor/editor.bundle.js';

const csharpLanguage = StreamLanguage.define(csharp);
const LANGUAGES = { csharp: csharpLanguage, python: pythonLanguage };

/**
 * An editor in `parent`.
 * @param {HTMLElement} parent
 * @param {object} o
 * @param {string} o.doc          the code
 * @param {string} [o.lang]       'csharp' (default) or 'python'
 * @param {boolean} [o.readOnly]
 * @param {string} [o.label]      what a screen reader calls the editor
 * @param {Function} [o.onChange] called with the code after each edit
 * @param {Function} [o.onRun]    Ctrl/Cmd+Enter or Shift+Enter
 */
export function createEditor(parent, { doc = '', lang = 'csharp', readOnly = false, label = 'Code', onChange, onRun } = {}) {
  const editable = new Compartment();
  const runKeys = onRun ? [
    { key: 'Mod-Enter', run: () => { onRun(); return true; } },
    { key: 'Shift-Enter', run: () => { onRun(); return true; } },
  ] : [];
  const extensions = [
    lineNumbers(),
    highlightSpecialChars(),
    history(),
    drawSelection(),
    indentUnit.of('    '),
    EditorState.tabSize.of(4),
    LANGUAGES[lang] || csharpLanguage,
    syntaxHighlighting(classHighlighter),
    bracketMatching(),
    highlightSelectionMatches(),
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({ 'aria-label': label }),
    editable.of([EditorState.readOnly.of(readOnly), EditorView.editable.of(!readOnly)]),
  ];
  if (!readOnly) {
    extensions.push(
      indentOnInput(),
      closeBrackets(),
      highlightActiveLine(),
      highlightActiveLineGutter(),
      lintGutter(),
      // Tab indents. Escape, then Tab, moves on from the editor (CodeMirror's own way out; help.html says so).
      keymap.of([...runKeys, ...closeBracketsKeymap, indentWithTab, ...defaultKeymap, ...historyKeymap, ...searchKeymap]),
      EditorView.updateListener.of((u) => { if (u.docChanged) onChange?.(u.state.doc.toString()); }),
    );
  }
  const view = new EditorView({ parent, state: EditorState.create({ doc, extensions }) });

  const pos = (line, column) => {
    const d = view.state.doc;
    const l = d.line(Math.min(Math.max(1, line || 1), d.lines));
    return Math.min(l.from + Math.max(0, (column || 1) - 1), l.to);
  };

  return {
    view,
    getCode: () => view.state.doc.toString(),
    /** Replaces the code as one edit, so that Ctrl+Z brings the old code back. */
    setCode(code) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code } });
    },
    /** Draws compiler messages: [{ severity, message, line, column, endLine, endColumn }], lines counted in this cell. */
    setDiagnostics(list) {
      const diagnostics = (list || []).filter(d => d.line).map(d => {
        const from = pos(d.line, d.column);
        let to = pos(d.endLine || d.line, d.endColumn || d.column);
        if (to <= from) to = Math.min(from + 1, view.state.doc.length);
        return { from, to: Math.max(from, to), severity: d.severity === 'warning' ? 'warning' : 'error', message: `${d.code ? d.code + ': ' : ''}${d.message}` };
      });
      view.dispatch(setDiagnostics(view.state, diagnostics));
    },
    /** Moves the cursor to a line and column of this cell, shows it, and focuses the editor. */
    goTo(line, column) {
      const at = pos(line, column);
      view.dispatch({ selection: { anchor: at }, effects: EditorView.scrollIntoView(at, { y: 'center' }) });
      view.focus();
    },
    focus: () => view.focus(),
  };
}

/** Code to read, not run, as highlighted HTML nodes in `target` (a <code>). */
export function highlightInto(target, code, lang) {
  const language = LANGUAGES[lang];
  if (!language) { target.textContent = code; return; }
  const tree = language.parser.parse(code);
  const out = document.createDocumentFragment();
  highlightCode(code, tree, classHighlighter,
    (text, classes) => {
      if (!classes) { out.append(text); return; }
      const span = document.createElement('span');
      span.className = classes;
      span.textContent = text;
      out.append(span);
    },
    () => out.append('\n'));
  target.replaceChildren(out);
}
