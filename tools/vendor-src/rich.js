// The entry point of web/vendor/rich.bundle.js: ProseMirror, and prosemirror-markdown's parser and serializer
// classes. The editing mode loads it only when an author opens a paragraph (web/page/richtext.js). The schema,
// the Markdown rules and the editor are dewsharp's own, in web/page/richtext.js.
export { Schema } from 'prosemirror-model';
export { EditorState, TextSelection } from 'prosemirror-state';
export { EditorView } from 'prosemirror-view';
export { baseKeymap, toggleMark, setBlockType, wrapIn, lift } from 'prosemirror-commands';
export { keymap } from 'prosemirror-keymap';
export { history, undo, redo } from 'prosemirror-history';
export { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
export { inputRules, wrappingInputRule, textblockTypeInputRule } from 'prosemirror-inputrules';
export { MarkdownParser, MarkdownSerializer } from 'prosemirror-markdown';
