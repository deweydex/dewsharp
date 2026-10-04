// Stands in for markdown-it inside web/vendor/rich.bundle.js. prosemirror-markdown builds a default parser
// from markdown-it when it loads. The editing mode never uses that parser: it gives MarkdownParser the page's
// own markdown-it (web/page/markdown.js), so that the editor reads Markdown exactly as the page does.
export default function MarkdownIt() {
  return { parse() { throw new Error('rich.bundle.js has no markdown-it. Pass the page\'s own.'); } };
}
