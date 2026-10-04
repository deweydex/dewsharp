// Rich prose, without the editor (docs/ARCHITECTURE.md, "Editing in place", "Rich blocks"): the schema of a
// block of prose, reading Markdown into it with the page's own markdown-it, and writing it back. No DOM is used
// here, so the tests can run it over every paragraph of every lesson.
//
// What it holds: paragraphs, headings marked with #, quotations, bulleted and numbered lists (tight or loose,
// nested), bold, italic, code, links, pictures, hard line breaks, and $…$ maths as a unit it does not open.
// Anything else (a table, a fold written in HTML, a fence, a formula on its own lines, HTML inside a paragraph)
// makes `parse` throw, and the block is edited as Markdown instead.
//
// Two rules keep a change small. A soft line break, which these pages use to wrap their lines, is a node of
// its own that is written back as a line break, so a paragraph keeps the lines it has. And `*`/`_` and `-`/`*` are kept as the author wrote them, as
// attributes. The page also asks `canOpen` before it opens a block: the block is read, written back, and drawn
// by the page's renderer both ways, and it opens as rich text only if the two drawings are the same.
import { Schema, MarkdownParser, MarkdownSerializer } from '../vendor/rich.bundle.js';

/** `base`: the folder the pictures are relative to, so that the editor can show them. */
export function createRichText({ markdown, base = '' }) {
  const schema = new Schema({
    nodes: {
      doc: { content: 'block+' },
      paragraph: { content: 'inline*', group: 'block', parseDOM: [{ tag: 'p' }], toDOM: () => ['p', 0] },
      heading: {
        attrs: { level: { default: 2 } }, content: 'inline*', group: 'block', defining: true,
        parseDOM: [1, 2, 3, 4, 5, 6].map(level => ({ tag: `h${level}`, attrs: { level } })),
        toDOM: (node) => [`h${node.attrs.level}`, 0],
      },
      blockquote: { content: 'block+', group: 'block', defining: true, parseDOM: [{ tag: 'blockquote' }], toDOM: () => ['blockquote', 0] },
      bullet_list: {
        content: 'list_item+', group: 'block', attrs: { tight: { default: true }, bullet: { default: '-' } },
        parseDOM: [{ tag: 'ul' }], toDOM: () => ['ul', 0],
      },
      ordered_list: {
        content: 'list_item+', group: 'block', attrs: { order: { default: 1 }, tight: { default: true }, delim: { default: '.' } },
        parseDOM: [{ tag: 'ol', getAttrs: (dom) => ({ order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1 }) }],
        toDOM: (node) => (node.attrs.order === 1 ? ['ol', 0] : ['ol', { start: node.attrs.order }, 0]),
      },
      list_item: { content: 'paragraph block*', defining: true, parseDOM: [{ tag: 'li' }], toDOM: () => ['li', 0] },
      text: { group: 'inline' },
      hard_break: { inline: true, group: 'inline', selectable: false, parseDOM: [{ tag: 'br' }], toDOM: () => ['br'] },
      // How these pages wrap their lines: a line break in the Markdown that the page draws as a space.
      soft_break: { inline: true, group: 'inline', selectable: false, parseDOM: [{ tag: 'span.ds-soft-break' }], toDOM: () => ['span', { class: 'ds-soft-break' }, ' '] },
      image: {
        inline: true, group: 'inline', draggable: true, attrs: { src: {}, alt: { default: null }, title: { default: null } },
        parseDOM: [{ tag: 'img[src]', getAttrs: (dom) => ({ src: dom.getAttribute('src'), alt: dom.getAttribute('alt'), title: dom.getAttribute('title') }) }],
        toDOM: (node) => ['img', { src: /^([a-z]+:|\/|#)/i.test(node.attrs.src) ? node.attrs.src : base + node.attrs.src, alt: node.attrs.alt, title: node.attrs.title }],
      },
      // $…$ is shown, not opened: its text is TeX, and the editor's rules about * and _ must not touch it.
      math_inline: {
        inline: true, group: 'inline', atom: true, attrs: { tex: {} },
        toDOM: (node) => ['span', { class: 'ds-math-chip', title: 'A formula. Edit it as Markdown.' }, `$${node.attrs.tex}$`],
      },
    },
    marks: {
      em: { attrs: { markup: { default: '*' } }, parseDOM: [{ tag: 'i' }, { tag: 'em' }], toDOM: () => ['em', 0] },
      strong: { attrs: { markup: { default: '**' } }, parseDOM: [{ tag: 'strong' }, { tag: 'b' }], toDOM: () => ['strong', 0] },
      link: {
        attrs: { href: {}, title: { default: null } }, inclusive: false,
        parseDOM: [{ tag: 'a[href]', getAttrs: (dom) => ({ href: dom.getAttribute('href'), title: dom.getAttribute('title') }) }],
        toDOM: (mark) => ['a', { href: mark.attrs.href, title: mark.attrs.title }, 0],
      },
      code: { code: true, parseDOM: [{ tag: 'code' }], toDOM: () => ['code', 0] },
    },
  });

  const tight = (tokens, i) => {
    while (++i < tokens.length) if (tokens[i].type !== 'list_item_open') return tokens[i].hidden;
    return false;
  };

  const parser = new MarkdownParser(schema, markdown.md, {
    blockquote: { block: 'blockquote' },
    paragraph: { block: 'paragraph' },
    list_item: { block: 'list_item' },
    bullet_list: { block: 'bullet_list', getAttrs: (tok, tokens, i) => ({ tight: tight(tokens, i), bullet: tok.markup || '-' }) },
    ordered_list: { block: 'ordered_list', getAttrs: (tok, tokens, i) => ({ order: +tok.attrGet('start') || 1, tight: tight(tokens, i), delim: tok.markup || '.' }) },
    heading: {
      block: 'heading',
      getAttrs: (tok) => {
        if (tok.markup[0] !== '#') throw new Error('heading: underlined');
        return { level: +tok.tag.slice(1) };
      },
    },
    hardbreak: { node: 'hard_break' },
    softbreak: { node: 'soft_break' },
    image: { node: 'image', getAttrs: (tok) => ({ src: tok.attrGet('src'), title: tok.attrGet('title') || null, alt: tok.content || null }) },
    ds_math: {
      node: 'math_inline',
      getAttrs: (tok) => {
        if (tok.meta?.display) throw new Error('ds_math: display');
        return { tex: tok.content };
      },
    },
    em: { mark: 'em', getAttrs: (tok) => ({ markup: tok.markup }) },
    strong: { mark: 'strong', getAttrs: (tok) => ({ markup: tok.markup }) },
    link: { mark: 'link', getAttrs: (tok) => ({ href: tok.attrGet('href'), title: tok.attrGet('title') || null }) },
    code_inline: { mark: 'code', noCloseToken: true },
  });

  const ticks = (node, side) => {
    let longest = 0;
    if (node.isText) for (const m of node.text.matchAll(/`+/g)) longest = Math.max(longest, m[0].length);
    return (longest > 0 && side > 0 ? ' `' : '`') + '`'.repeat(longest) + (longest > 0 && side < 0 ? ' ' : '');
  };
  const plainUrl = (link, parent, index) => {
    if (link.attrs.title || !/^\w+:/.test(link.attrs.href)) return false;
    const content = parent.child(index);
    if (!content.isText || content.text !== link.attrs.href || content.marks[content.marks.length - 1] !== link) return false;
    return index === parent.childCount - 1 || !link.isInSet(parent.child(index + 1).marks);
  };

  const serializer = new MarkdownSerializer({
    blockquote(state, node) { state.wrapBlock('> ', null, node, () => state.renderContent(node)); },
    heading(state, node) { state.write(state.repeat('#', node.attrs.level) + ' '); state.renderInline(node, false); state.closeBlock(node); },
    bullet_list(state, node) { state.renderList(node, '  ', () => node.attrs.bullet + ' '); },
    ordered_list(state, node) {
      const start = node.attrs.order;
      const width = String(start + node.childCount - 1).length;
      state.renderList(node, state.repeat(' ', width + 2), (i) => {
        const n = String(start + i);
        return state.repeat(' ', width - n.length) + n + node.attrs.delim + ' ';
      });
    },
    list_item(state, node) { state.renderContent(node); },
    paragraph(state, node) { state.renderInline(node); state.closeBlock(node); },
    image(state, node) {
      const { src, alt, title } = node.attrs;
      state.write(`![${alt || ''}](${src.replace(/[()]/g, '\\$&')}${title ? ` "${title.replace(/"/g, '\\"')}"` : ''})`);
    },
    hard_break(state, node, parent, index) {
      for (let i = index + 1; i < parent.childCount; i++) if (parent.child(i).type !== node.type) { state.write('\\\n'); return; }
    },
    // Written through `text`, so that a quotation or a list item puts its own margin on the next line.
    soft_break(state) { state.text('\n', false); },
    math_inline(state, node) { state.write(`$${node.attrs.tex}$`); },
    text(state, node) {
      // `<` and `&` that would start a tag or an entity are written as entities, so that "Stack<T>" stays text.
      const text = node.text.replace(/&(?=[#A-Za-z])/g, '&amp;').replace(/<(?=[A-Za-z/!?])/g, '&lt;');
      state.text(text, !state.inAutolink);
    },
  }, {
    em: { open: (_s, mark) => mark.attrs.markup, close: (_s, mark) => mark.attrs.markup, mixable: true, expelEnclosingWhitespace: true },
    strong: { open: (_s, mark) => mark.attrs.markup, close: (_s, mark) => mark.attrs.markup, mixable: true, expelEnclosingWhitespace: true },
    link: {
      open(state, mark, parent, index) { state.inAutolink = plainUrl(mark, parent, index); return state.inAutolink ? '<' : '['; },
      close(state, mark) {
        const { inAutolink } = state;
        state.inAutolink = undefined;
        return inAutolink ? '>' : `](${mark.attrs.href.replace(/[()"]/g, '\\$&')}${mark.attrs.title ? ` "${mark.attrs.title.replace(/"/g, '\\"')}"` : ''})`;
      },
      mixable: true,
    },
    code: { open: (_s, _m, parent, index) => ticks(parent.child(index), -1), close: (_s, _m, parent, index) => ticks(parent.child(index - 1), 1), escape: false },
  }, { strict: false });

  const trim = (text) => text.replace(/^\n+|\s+$/g, '');
  const same = (html) => html.replace(/\s+/g, ' ').replace(/> </g, '><').trim();

  /** The block as a ProseMirror document. Throws if it holds something this does not. */
  const parse = (text) => parser.parse(trim(text));
  /** A document as Markdown, without the blank lines at its ends. */
  const serialize = (doc) => trim(serializer.serialize(doc));

  /**
   * Whether the block can be edited as rich text: it must be read, and drawn by the page's renderer the same
   * after being written back. `why` is a sentence for the author when it cannot.
   */
  function canOpen(text) {
    let doc;
    try { doc = parse(text); } catch (problem) { return { ok: false, why: whyNot(String(problem.message)) }; }
    const back = serialize(doc);
    if (same(markdown.render(trim(text))) !== same(markdown.render(back))) {
      return { ok: false, why: 'The rich editor would write this part differently from the way it is drawn now.' };
    }
    return { ok: true, doc };
  }

  return { schema, parse, serialize, canOpen };
}

/** What to say when a block cannot be opened as rich text. */
function whyNot(message) {
  if (/html_block/.test(message)) return 'This part is written in HTML.';
  if (/table_open/.test(message)) return 'This is a table.';
  if (/fence/.test(message)) return 'This is a block of code.';
  if (/ds_math/.test(message)) return 'This is a formula on its own lines.';
  if (/html_inline/.test(message)) return 'This paragraph has HTML inside it.';
  if (/underlined/.test(message)) return 'This heading is underlined, not marked with #.';
  return 'The rich editor does not handle something in this part.';
}
