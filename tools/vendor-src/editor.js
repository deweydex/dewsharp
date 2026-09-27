// The entry point of web/vendor/editor.bundle.js (tools/vendor.mjs bundles it with esbuild). Only
// re-exports: what the page does with CodeMirror is in web/page/editor.js, which is not bundled.
export { EditorState, Compartment, StateEffect, StateField } from '@codemirror/state';
export {
  EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, drawSelection,
  highlightSpecialChars, placeholder,
} from '@codemirror/view';
export {
  StreamLanguage, syntaxHighlighting, bracketMatching, indentOnInput, indentUnit, foldGutter,
  HighlightStyle,
} from '@codemirror/language';
export { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
export { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
export { setDiagnostics, lintGutter, lintKeymap } from '@codemirror/lint';
export { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
export { csharp } from '@codemirror/legacy-modes/mode/clike';
export { python, pythonLanguage } from '@codemirror/lang-python';
export { classHighlighter, highlightCode } from '@lezer/highlight';
