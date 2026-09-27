// Markdown for lessons and notebook text cells: markdown-it (web/vendor/markdown.bundle.js) with the rules
// docs/LESSON_FORMAT.md lists under "Everything else": tables, ~~struck out~~, - [ ] task lists,
// [text](lesson:<id>) links, pictures beside the lesson, and $…$ / $$…$$ maths (KaTeX, loaded only when a
// page has some). Code to read is highlighted after the HTML is in the page (enhance()).
import { MarkdownIt } from '../vendor/markdown.bundle.js';
import { highlightInto } from './editor.js';

const LANG_LABELS = { csharp: 'C#', python: 'Python', console: 'Console', text: '' };

function mathPlugin(md) {
  // $…$ inline: the $ must be followed by a non-space and closed by a $ that is not followed by a digit,
  // so that "costs $5 and $6" stays text.
  md.inline.ruler.after('escape', 'ds_math_inline', (state, silent) => {
    const src = state.src;
    const start = state.pos;
    if (src[start] !== '$' || src[start + 1] === '$') return false;
    if (start > 0 && src[start - 1] === '\\') return false;
    if (!src[start + 1] || /\s/.test(src[start + 1])) return false;
    let end = start + 1;
    while ((end = src.indexOf('$', end)) !== -1) {
      if (src[end - 1] !== '\\' && !/\s/.test(src[end - 1]) && !/\d/.test(src[end + 1] || '')) break;
      end++;
    }
    if (end === -1) return false;
    if (!silent) {
      const token = state.push('ds_math', 'span', 0);
      token.content = src.slice(start + 1, end);
      token.meta = { display: false };
    }
    state.pos = end + 1;
    return true;
  });
  // $$ on a line of its own (or $$…$$ on one line).
  md.block.ruler.before('fence', 'ds_math_block', (state, startLine, endLine, silent) => {
    const line = (n) => state.src.slice(state.bMarks[n] + state.tShift[n], state.eMarks[n]);
    const first = line(startLine);
    if (!first.startsWith('$$')) return false;
    let content;
    let last = startLine;
    const rest = first.slice(2);
    if (rest.trim().endsWith('$$') && rest.trim().length > 2) content = rest.trim().slice(0, -2);
    else {
      const lines = [rest];
      for (last = startLine + 1; last < endLine; last++) {
        const l = line(last);
        if (l.trim().endsWith('$$')) { lines.push(l.trim().slice(0, -2)); break; }
        lines.push(l);
      }
      if (last >= endLine) return false;
      content = lines.join('\n');
    }
    if (silent) return true;
    const token = state.push('ds_math', 'div', 0);
    token.block = true;
    token.content = content.trim();
    token.meta = { display: true };
    token.map = [startLine, last + 1];
    state.line = last + 1;
    return true;
  });
  md.renderer.rules.ds_math = (tokens, i) => {
    const t = tokens[i];
    const tag = t.meta.display ? 'div' : 'span';
    return `<${tag} class="ds-math${t.meta.display ? ' ds-math-display' : ''}" data-tex="${md.utils.escapeHtml(t.content)}">${md.utils.escapeHtml(t.content)}</${tag}>`;
  };
}

function taskListPlugin(md) {
  md.core.ruler.after('inline', 'ds_task_lists', (state) => {
    const tokens = state.tokens;
    for (let i = 2; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.type !== 'inline' || tokens[i - 1].type !== 'paragraph_open' || tokens[i - 2].type !== 'list_item_open') continue;
      const m = /^\[([ xX])\][ \t]/.exec(t.content);
      if (!m) continue;
      const first = t.children[0];
      if (!first || first.type !== 'text') continue;
      first.content = first.content.replace(/^\[[ xX]\][ \t]/, '');
      const box = new state.Token('html_inline', '', 0);
      box.content = `<input type="checkbox" disabled${m[1] === ' ' ? '' : ' checked'}> `;
      t.children.unshift(box);
      tokens[i - 2].attrJoin('class', 'task-list-item');
      for (let k = i - 3; k >= 0; k--) {
        if (tokens[k].type === 'bullet_list_open' || tokens[k].type === 'ordered_list_open') {
          if (tokens[k].level === tokens[i - 2].level - 1) { tokens[k].attrJoin('class', 'task-list'); break; }
        }
      }
    }
  });
}

function slug(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
}

/**
 * A Markdown renderer. `html`: allow raw HTML (lessons, whose folds are HTML; not a learner's notebook).
 * `base`: the folder pictures are relative to, such as "lessons/objects-and-classes/".
 */
export function createMarkdown({ html = true, base = '' } = {}) {
  const md = new MarkdownIt({ html, linkify: false, typographer: false });
  md.use(mathPlugin).use(taskListPlugin);
  const validate = md.validateLink;
  md.validateLink = (url) => /^lesson:[a-z0-9-]+(#.*)?$/.test(url) || validate(url);
  const normalize = md.normalizeLink;
  md.normalizeLink = (url) => (url.startsWith('lesson:') ? url : normalize(url));

  const defaultLink = md.renderer.rules.link_open || ((tokens, i, options, env, self) => self.renderToken(tokens, i, options));
  md.renderer.rules.link_open = (tokens, i, options, env, self) => {
    const href = tokens[i].attrGet('href') || '';
    const lesson = /^lesson:([a-z0-9-]+)(#.*)?$/.exec(href);
    if (lesson) tokens[i].attrSet('href', `lesson.html?id=${lesson[1]}${lesson[2] || ''}`);
    return defaultLink(tokens, i, options, env, self);
  };
  const defaultImage = md.renderer.rules.image;
  md.renderer.rules.image = (tokens, i, options, env, self) => {
    const src = tokens[i].attrGet('src') || '';
    if (base && !/^([a-z]+:|\/|#)/i.test(src)) tokens[i].attrSet('src', base + src);
    tokens[i].attrSet('loading', 'lazy');
    return defaultImage(tokens, i, options, env, self);
  };
  md.renderer.rules.fence = (tokens, i) => {
    const t = tokens[i];
    const lang = (t.info || '').trim().split(/\s+/)[0];
    return staticCodeHtml(t.content.replace(/\n$/, ''), lang, md.utils.escapeHtml);
  };
  md.renderer.rules.heading_open = (tokens, i, options, env, self) => {
    const inline = tokens[i + 1];
    if (inline?.type === 'inline' && !tokens[i].attrGet('id')) {
      env.ids ||= new Map();
      let id = slug(inline.content);
      const n = env.ids.get(id) || 0;
      env.ids.set(id, n + 1);
      if (n) id += '-' + (n + 1);
      tokens[i].attrSet('id', id);
    }
    return self.renderToken(tokens, i, options);
  };
  return { render: (text, env = {}) => md.render(text, env), renderInline: (text) => md.renderInline(text) };
}

/** The HTML of code to read: a labelled <pre> that enhance() highlights. */
export function staticCodeHtml(code, lang, escape = escapeHtml) {
  const label = LANG_LABELS[lang] ?? '';
  const cls = lang === 'console' ? 'dl-static ds-console-sample' : 'dl-static';
  return `${label ? `<span class="ds-static-lang">${escape(label)}</span>` : ''}<pre class="${cls}" data-lang="${escape(lang || '')}"><code>${escape(code)}</code></pre>\n`;
}

export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let katexPromise = null;

/** After rendered Markdown is in the page: highlights code to read and typesets maths. */
export async function enhance(root) {
  for (const pre of root.querySelectorAll('pre.dl-static[data-lang]:not([data-done])')) {
    pre.dataset.done = '1';
    const lang = pre.dataset.lang;
    if (lang === 'csharp' || lang === 'python') highlightInto(pre.firstElementChild, pre.textContent, lang);
    // Code that scrolls sideways must be reachable from the keyboard.
    pre.tabIndex = 0;
  }
  const maths = root.querySelectorAll('.ds-math:not([data-done])');
  if (!maths.length) return;
  katexPromise ||= import('../vendor/katex.bundle.js').then(m => m.katex);
  const katex = await katexPromise;
  for (const node of maths) {
    node.dataset.done = '1';
    try {
      katex.render(node.dataset.tex, node, { displayMode: node.classList.contains('ds-math-display'), throwOnError: false, output: 'htmlAndMathml' });
    } catch { /* leave the TeX as text */ }
  }
}
