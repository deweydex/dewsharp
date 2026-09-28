// The one parser of docs/LESSON_FORMAT.md. The lesson page, the notebook, tools/check-lessons.mjs and
// tools/build-site.mjs all use it, so a lesson means the same thing everywhere. It is a pure ES module: it
// runs in the browser and in Node, and it never throws on a bad lesson. docs/PARSER.md describes what it
// returns, field by field. Change that file together with this one.
import yaml from '../vendor/js-yaml.mjs';

/** Small letters and digits, joined by single hyphens: a lesson id, a world key, a cell id's parts. */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CELL_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$/;
const VERSION = /^\d{4}\.\d{2}\.\d{2}\.\d+$/;
const FILE_NAME = /^[A-Za-z_][A-Za-z0-9_.-]*\.cs$/;
const HEADER = /^([a-z][a-z_-]*):(?:[ \t]+(.*?))?\s*$/;
const FENCE_OPEN = /^( {0,3})(`{3,}|~{3,})[ \t]*([^\s`]*)[ \t]*(.*?)\s*$/;
const WORLD_OPEN = /^\s*<div\s+class="dl-world"\s+data-world="([^"]*)"\s*>\s*$/;
const AFTER = /^(?:(\d+) (errors?|runs?)|unsure|guess differed)$/;

/** Frontmatter keys, and what each must be. */
const FRONTMATTER = {
  title: 'string', version: 'string', from: 'slug', worlds: 'worlds', covers: 'strings', practice_for: 'slug',
};

/** Header keys each kind of fence accepts. */
const CELL_HEADERS = new Set(['id', 'hint', 'file', 'expect', 'stdin']);
const BLOCK_HEADERS = {
  hint: new Set(['for', 'after', 'title']),
  predict: new Set(['for', 'type', 'tolerance', 'line']),
  solution: new Set(['for', 'title']),
  inputs: new Set(['for']),
};
/** Languages of code to read, not run (docs/LESSON_FORMAT.md, "Everything else"). */
const READONLY_LANGS = new Set(['csharp', 'python', 'console', 'text', '']);

/** "sea-floor" -> "Sea floor": how the page names a world. */
export function worldLabel(key) {
  const words = String(key).split('-').join(' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/**
 * Parses a lesson (or a practice page) from its Markdown source.
 * @param {string} source
 * @param {{ id?: string }} [options]  id: the page's id (its file name without .md), to check `practice_for:`
 * @returns {{ frontmatter: object, worlds: object[], items: object[], errors: {line:number, message:string}[] }}
 */
export function parseLesson(source, options = {}) {
  const errors = [];
  const error = (line, message) => errors.push({ line, message });
  const lines = String(source ?? '').replace(/\r\n?/g, '\n').split('\n');

  // ---- frontmatter
  let frontmatter = {};
  let i = 0;
  if (lines[0]?.trim() === '---') {
    const end = lines.findIndex((l, k) => k > 0 && l.trim() === '---');
    if (end < 0) {
      error(1, 'The frontmatter has no closing --- line.');
      i = lines.length;
    } else {
      frontmatter = readFrontmatter(lines.slice(1, end).join('\n'), error, options);
      i = end + 1;
    }
  } else {
    error(1, 'A lesson starts with frontmatter: a --- line, then title: and version:, then another --- line.');
  }
  const worldKeys = Object.keys(frontmatter.worlds || {});
  const worlds = worldKeys.map(key => ({ key, label: worldLabel(key), description: frontmatter.worlds[key] }));

  // ---- body
  const items = [];
  const blocks = [];                 // { item, kind, headers, line, world } attached after the whole page is read
  let markdown = null;               // { start, lines } being gathered
  let world = null;                  // { key, line, group, divDepth } of the open variant
  let group = 0;                     // variant groups: adjacent variants are one task
  let lastVariantEnd = -2;           // the line index where the last variant closed
  let groupWorlds = new Set();
  let details = 0;                   // depth of <details> folds; fences inside stay in the Markdown
  let lastCell = null;
  const ids = new Map();

  const place = (item) => {
    if (world) { item.world = world.key; item.group = world.group; }
    return item;
  };
  const flush = () => {
    if (!markdown) return;
    const text = trimBlankLines(markdown.lines);
    const first = markdown.lines.findIndex(l => l.trim() !== '');
    if (text) items.push(place({ type: 'markdown', text, line: markdown.start + first + 1 }));
    markdown = null;
  };
  const addMarkdown = (k) => {
    if (!markdown) markdown = { start: k, lines: [] };
    markdown.lines.push(lines[k]);
  };

  for (; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    // World variants: <div class="dl-world" data-world="game"> ... </div>
    const open = WORLD_OPEN.exec(line);
    if (open) {
      flush();
      const key = open[1];
      if (world) error(lineNo, `A world variant cannot be inside another one (the "${world.key}" variant opened on line ${world.line}).`);
      else if (!worldKeys.length) error(lineNo, 'This page has a world variant, but its frontmatter lists no worlds:.');
      else if (!worldKeys.includes(key)) error(lineNo, `The world "${key}" is not in the frontmatter's worlds: (${worldKeys.join(', ')}).`);
      if (details) error(lineNo, 'A world variant cannot be inside a <details> fold.');
      // Variants with nothing but blank lines between them are one task.
      const between = lines.slice(lastVariantEnd + 1, i);
      if (lastVariantEnd < 0 || between.some(l => l.trim() !== '')) { group++; groupWorlds = new Set(); }
      if (groupWorlds.has(key)) error(lineNo, `Two variants for the world "${key}" are side by side. Each task has one variant for each world.`);
      groupWorlds.add(key);
      world = { key, line: lineNo, group, divDepth: 0 };
      continue;
    }
    if (/^\s*<div[^>]*dl-world/.test(line)) {
      error(lineNo, 'The opening tag of a world variant must be on a line of its own: <div class="dl-world" data-world="...">');
    }
    if (world) {
      if (/^\s*<div[\s>]/.test(line)) world.divDepth++;
      if (/^\s*<\/div>\s*$/.test(line)) {
        if (world.divDepth > 0) world.divDepth--;
        else {
          flush();
          world = null;
          lastVariantEnd = i;
          continue;
        }
      }
    }

    // <details> folds (answers, hints in prose, "Why this way?").
    if (/^\s*<details[\s>]/.test(line)) details++;
    if (/<\/details>/.test(line) && details > 0) details--;

    const fence = FENCE_OPEN.exec(line);
    if (!fence) { addMarkdown(i); continue; }

    // A fence: find where it closes.
    const [, , marker, lang, tag] = fence;
    let end = i + 1;
    const close = new RegExp(`^ {0,3}${marker[0] === '`' ? '`' : '~'}{${marker.length},}\\s*$`);
    while (end < lines.length && !close.test(lines[end])) end++;
    if (end >= lines.length) error(lineNo, `This code fence (${marker}${lang}) is never closed.`);
    const body = lines.slice(i + 1, end);
    const bodyLine = lineNo + 1;
    const kind = classifyFence(lang, tag);

    if (kind.error) error(lineNo, kind.error);
    if (details && (kind.type === 'cell' || kind.type === 'block' || kind.type === 'challenge')) {
      error(lineNo, `A ${kind.type === 'block' ? lang + ' block' : kind.type} cannot be inside a <details> fold.`);
    }
    if (kind.type === 'readonly' && details) {
      // Inside a fold, code to read stays part of the fold's Markdown, so that the fold stays whole.
      for (let k = i; k <= Math.min(end, lines.length - 1); k++) addMarkdown(k);
      i = end;
      continue;
    }
    flush();
    i = end;

    if (kind.type === 'readonly' || kind.error) {
      items.push(place({ type: 'readonly', lang, code: body.join('\n'), line: lineNo }));
      continue;
    }
    if (kind.type === 'challenge') {
      items.push(place({ type: 'challenge', lang: 'csharp', code: body.join('\n'), line: lineNo }));
      continue;
    }

    const { headers, headerLines, headerCount, repeated, rest } = readHeaders(body);
    for (const r of repeated) error(bodyLine + r.at, `The "${r.key}:" header is written twice.`);
    if (kind.type === 'cell') {
      for (const [key, h] of Object.entries(headerLines)) {
        if (!CELL_HEADERS.has(key)) error(bodyLine + h, `A cell has no "${key}:" header. The headers are ${[...CELL_HEADERS].join(', ')}.`);
      }
      const cell = place({
        type: 'cell', id: headers.id ?? null, line: lineNo, headers,
        code: rest.join('\n'), codeLine: bodyLine + headerCount,
        blocks: { hints: [], predict: null, solutions: [], inputs: null },
      });
      checkCell(cell, headers, headerLines, bodyLine, world, error);
      if (cell.id) {
        if (ids.has(cell.id)) error(lineNo, `The cell id "${cell.id}" is used twice (first on line ${ids.get(cell.id).line}).`);
        else ids.set(cell.id, cell);
      }
      items.push(cell);
      lastCell = cell;
      continue;
    }

    // A block that belongs to a cell: attached once every cell is known, since for: may name any of them.
    for (const [key, h] of Object.entries(headerLines)) {
      if (!BLOCK_HEADERS[lang].has(key)) error(bodyLine + h, `A ${lang} block has no "${key}:" header. Its headers are ${[...BLOCK_HEADERS[lang]].join(', ')}.`);
    }
    blocks.push({ kind: lang, headers, headerCount, rest, line: lineNo, bodyLine, world: world?.key ?? null, previous: lastCell });
  }
  flush();
  if (world) error(world.line, `The "${world.key}" variant that opens here has no closing </div>.`);

  for (const b of blocks) attachBlock(b, ids, error);
  return { frontmatter, worlds, items, errors: errors.sort((a, b) => a.line - b.line) };
}

/** What a fence is: a cell, a block, a challenge, or code to read. */
function classifyFence(lang, tag) {
  if (lang === 'csharp' && tag === 'exec') return { type: 'cell' };
  if (lang === 'csharp' && tag === 'challenge') return { type: 'challenge' };
  if (BLOCK_HEADERS[lang]) {
    if (tag) return { type: 'readonly', error: `A ${lang} block takes nothing after its name ("${tag}").` };
    return { type: 'block' };
  }
  if (tag === 'exec') return { type: 'readonly', error: `Only C# cells run on this site: write \`\`\`csharp exec, not \`\`\`${lang} exec.` };
  if (tag) return { type: 'readonly', error: `A code fence takes "exec" or "challenge" after its language, not "${tag}".` };
  if (!READONLY_LANGS.has(lang)) return { type: 'readonly', error: `"${lang}" is not a language this site shows. Use csharp, python, console or text.` };
  return { type: 'readonly' };
}

/** The key: value lines at the top of a fence. */
function readHeaders(body) {
  const headers = {};
  const headerLines = {};
  const repeated = [];
  let k = 0;
  for (; k < body.length; k++) {
    const m = HEADER.exec(body[k]);
    if (!m) break;
    if (m[1] in headers) repeated.push({ key: m[1], at: k });
    else { headers[m[1]] = m[2] ?? ''; headerLines[m[1]] = k; }
  }
  return { headers, headerLines, headerCount: k, repeated, rest: body.slice(k) };
}

function checkCell(cell, headers, headerLines, bodyLine, world, error) {
  const at = (key) => bodyLine + (headerLines[key] ?? 0);
  if (!headers.id) {
    error(cell.line, 'A cell needs an id: line, such as "id: a-first-program-1".');
  } else if (!CELL_ID.test(headers.id)) {
    error(at('id'), `The cell id "${headers.id}" must be small letters, digits and single hyphens (with --<world> at the end in a variant).`);
  } else if (world && !headers.id.endsWith('--' + world.key)) {
    error(at('id'), `The cell "${headers.id}" is inside the "${world.key}" variant, so its id must end in --${world.key}.`);
  } else if (!world && headers.id.includes('--')) {
    error(at('id'), `The cell id "${headers.id}" has --, which only a cell inside a world variant has.`);
  }
  if ('file' in headers && !FILE_NAME.test(headers.file)) {
    error(at('file'), `file: must be a C# file name such as Planet.cs, not "${headers.file}".`);
  }
  if ('expect' in headers) {
    if (/^CS\d{4}$/.test(headers.expect)) cell.expect = { outcome: 'compile-error', code: headers.expect };
    else if (headers.expect === 'exception') cell.expect = { outcome: 'exception' };
    else error(at('expect'), `expect: is a compiler error code such as CS0103, or "exception", not "${headers.expect}".`);
  }
  if ('stdin' in headers) {
    let value;
    try { value = JSON.parse(headers.stdin); } catch { value = undefined; }
    if (typeof value !== 'string') error(at('stdin'), 'stdin: must be a JSON string, such as "Ada\\n21\\n".');
    else cell.stdin = value;
  }
  if ('hint' in headers && !headers.hint) error(at('hint'), 'hint: needs some text after it.');
}

function attachBlock(b, ids, error) {
  let cell;
  if ('for' in b.headers) {
    cell = ids.get(b.headers.for);
    if (!cell) { error(b.line, `This ${b.kind} block is for "${b.headers.for}", but no cell has that id.`); return; }
  } else {
    cell = b.previous;
    if (!cell) { error(b.line, `This ${b.kind} block has no cell above it to belong to. Put it after its cell, or give it a for: line.`); return; }
  }
  if ((cell.world ?? null) !== b.world) {
    const where = (w) => (w ? `the "${w}" variant` : 'the shared part of the page');
    error(b.line, `This ${b.kind} block is in ${where(b.world)}, but its cell "${cell.id}" is in ${where(cell.world)}. A block stays with its cell.`);
    return;
  }
  const blocks = cell.blocks;
  const { headers, rest, line } = b;
  const codeLine = b.bodyLine + b.headerCount;
  switch (b.kind) {
    case 'hint': {
      const after = headers.after ?? '1 errors';
      const m = AFTER.exec(after);
      if (!m) error(line, `after: is "N errors", "N runs", "unsure" or "guess differed", not "${after}".`);
      const when = !m ? null : m[1] ? { signal: m[2].startsWith('error') ? 'errors' : 'runs', count: Number(m[1]) } : { signal: after === 'unsure' ? 'unsure' : 'guess-differed', count: 1 };
      const text = trimBlankLines(rest);
      if (!text) error(line, 'This hint block is empty.');
      blocks.hints.push({ line, after, when, title: headers.title ?? null, text });
      break;
    }
    case 'predict': {
      if (blocks.predict) { error(line, `The cell "${cell.id}" already has a predict block (line ${blocks.predict.line}). A cell has one.`); return; }
      const type = headers.type ?? 'choice';
      if (!['choice', 'number', 'text'].includes(type)) error(line, `type: is choice, number or text, not "${type}".`);
      let tolerance = null;
      if ('tolerance' in headers) {
        tolerance = Number(headers.tolerance);
        if (type !== 'number') error(line, 'tolerance: belongs to a predict block of type: number.');
        else if (!Number.isFinite(tolerance) || tolerance < 0) error(line, `tolerance: must be a number, not "${headers.tolerance}".`);
      }
      const { question, options } = readPredict(rest);
      if (!question) error(line, 'This predict block has no question.');
      if (type === 'choice' && options.length < 2) error(line, 'A predict block of type: choice needs at least two options, each on a line starting with "- ".');
      if (type !== 'choice' && options.length) error(line, `A predict block of type: ${type} has no options.`);
      let outputLine = lineOfQuestion(question);
      if ('line' in headers) {
        outputLine = readOutputLine(headers.line);
        if (outputLine === null) error(line, `line: is first, last or a line number, such as 2, not "${headers.line}".`);
      }
      blocks.predict = { line, type, tolerance, question, options, outputLine };
      break;
    }
    case 'solution': {
      const split = rest.findIndex(l => l.trim() === '---');
      const code = (split < 0 ? rest : rest.slice(0, split)).join('\n').replace(/\s+$/, '');
      const notes = split < 0 ? null : trimBlankLines(rest.slice(split + 1)) || null;
      if (!code.trim()) error(line, 'This solution block has no code.');
      blocks.solutions.push({ line, title: headers.title ?? null, code, codeLine, notes });
      break;
    }
    case 'inputs': {
      if (blocks.inputs) { error(line, `The cell "${cell.id}" already has an inputs block (line ${blocks.inputs.line}). A cell has one.`); return; }
      const list = [];
      rest.forEach((text, k) => {
        const { expr, note } = splitComment(text);
        if (!expr) return;
        list.push({ expr, note, throws: /^throws\b/.test(note ?? ''), line: codeLine + k });
      });
      if (!list.length) error(line, 'This inputs block has no expressions.');
      blocks.inputs = { line, items: list };
      break;
    }
  }
}

const LINE_WORDS = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5, last: 'last' };

/** A predict block's line: header: "first", "last" or a line number. Null if it is none of these. */
function readOutputLine(text) {
  const t = String(text).trim().toLowerCase();
  if (Object.hasOwn(LINE_WORDS, t)) return LINE_WORDS[t];
  return /^[1-9]\d*$/.test(t) ? Number(t) : null;
}

/** The output line a question asks about, when it names one: "What will the second line print?" -> 2. */
function lineOfQuestion(question) {
  const m = /\b(first|second|third|fourth|fifth|last) line\b/i.exec(String(question ?? '').replace(/[*_]/g, ''));
  return m ? LINE_WORDS[m[1].toLowerCase()] : null;
}

/** A predict block's body: the question, then the options as a list at the end, each with an optional note. */
function readPredict(body) {
  const options = [];
  let k = body.length;
  // Walk back over the list at the end: top-level "- option" lines and indented "  - note" lines.
  while (k > 0 && body[k - 1].trim() === '') k--;
  let start = k;
  for (let j = k - 1; j >= 0; j--) {
    const l = body[j];
    if (/^- /.test(l) || /^\s+- /.test(l) || (l.trim() !== '' && /^\s{2,}\S/.test(l))) { start = j; continue; }
    break;
  }
  for (const l of body.slice(start, k)) {
    const top = /^- (.*)$/.exec(l);
    const note = /^\s+- (.*)$/.exec(l);
    if (top) options.push({ text: top[1].trim(), note: null });
    else if (note && options.length) {
      const o = options[options.length - 1];
      o.note = o.note ? o.note + ' ' + note[1].trim() : note[1].trim();
    } else if (options.length && l.trim()) {
      // A wrapped line of an option or its note.
      const o = options[options.length - 1];
      if (o.note) o.note += ' ' + l.trim(); else o.text += ' ' + l.trim();
    }
  }
  return { question: trimBlankLines(body.slice(0, start)), options };
}

/** Splits "Total(list)   // an empty list" into the expression and the note. A // inside a string or a
 *  character literal is not a comment. */
export function splitComment(line) {
  let q = null, verbatim = false;
  for (let k = 0; k < line.length; k++) {
    const c = line[k];
    if (q) {
      if (verbatim) { if (c === '"') { if (line[k + 1] === '"') k++; else q = null; } continue; }
      if (c === '\\') { k++; continue; }
      if (c === q) q = null;
      continue;
    }
    if (c === '"' || c === "'") { q = c; verbatim = c === '"' && /@\$?$|\$@$/.test(line.slice(Math.max(0, k - 2), k)); continue; }
    if (c === '/' && line[k + 1] === '/') return { expr: line.slice(0, k).trim(), note: line.slice(k + 2).trim() || null };
  }
  return { expr: line.trim(), note: null };
}

function readFrontmatter(text, error, options) {
  let data;
  try {
    data = yaml.load(text, { schema: yaml.CORE_SCHEMA }) ?? {};
  } catch (e) {
    error((e.mark?.line ?? 0) + 2, `The frontmatter is not valid YAML: ${e.reason || e.message}`);
    return {};
  }
  if (typeof data !== 'object' || Array.isArray(data)) { error(2, 'The frontmatter must be key: value lines.'); return {}; }
  const lineOf = (key) => 2 + Math.max(0, text.split('\n').findIndex(l => l.startsWith(key + ':')));
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    const want = FRONTMATTER[key];
    if (!want) { error(lineOf(key), `The frontmatter has no "${key}:" key. The keys are ${Object.keys(FRONTMATTER).join(', ')}.`); continue; }
    const bad = (what) => error(lineOf(key), `${key}: must be ${what}.`);
    if (want === 'string') { if (typeof value !== 'string' || !value.trim()) { bad('some text'); continue; } }
    if (want === 'slug') { if (typeof value !== 'string' || !SLUG.test(value)) { bad('an id: small letters, digits and hyphens'); continue; } }
    if (want === 'strings') { if (!Array.isArray(value) || value.some(v => typeof v !== 'string')) { bad('a list, such as [FOOP-LO1, FOOP-LO2]'); continue; } }
    if (want === 'worlds') {
      if (!value || typeof value !== 'object' || Array.isArray(value)) { bad('a list of worlds, each "key: a sentence about it"'); continue; }
      let ok = true;
      for (const [k, v] of Object.entries(value)) {
        if (!SLUG.test(k)) { error(lineOf(key), `The world key "${k}" must be small letters, digits and hyphens.`); ok = false; }
        if (typeof v !== 'string' || !v.trim()) { error(lineOf(key), `The world "${k}" needs a sentence that describes it.`); ok = false; }
      }
      if (!ok) continue;
    }
    out[key] = value;
  }
  if (!('title' in data)) error(2, 'The frontmatter needs a title:.');
  if (!('version' in data)) error(2, 'The frontmatter needs a version:, such as 2026.09.27.1.');
  else if (typeof out.version === 'string' && !VERSION.test(out.version)) error(lineOf('version'), `version: is a dated version, YYYY.MM.DD.n, not "${out.version}".`);
  const id = options.id;
  if (id && id.endsWith('-practice')) {
    const lesson = id.slice(0, -'-practice'.length);
    if (out.practice_for !== lesson) error(2, `A practice page needs practice_for: ${lesson} in its frontmatter.`);
  } else if (id && 'practice_for' in out) {
    error(lineOf('practice_for'), `practice_for: belongs on a practice page, whose file name ends in -practice.md.`);
  }
  return out;
}

function trimBlankLines(list) {
  let a = 0, b = list.length;
  while (a < b && list[a].trim() === '') a++;
  while (b > a && list[b - 1].trim() === '') b--;
  return list.slice(a, b).join('\n');
}

/** Every cell of a parsed lesson, in page order. */
export function cellsOf(lesson) {
  return lesson.items.filter(item => item.type === 'cell');
}

/**
 * The cells a reader in `world` sees, in page order: the shared cells and that world's. With no worlds (or
 * `world` null), every shared cell. These are the "cells above" of the rules of the road.
 */
export function cellsInWorld(lesson, world = null) {
  return cellsOf(lesson).filter(cell => cell.world === undefined || cell.world === world);
}

/**
 * What runner.run() needs for `target` in `world`: the visible cells above it, then the target, as
 * { id, file, code }. `code` replaces the target's own code (a solution, or the reader's edit).
 */
export function cellsForRun(lesson, target, { world = target.world ?? null, code } = {}) {
  const visible = cellsInWorld(lesson, world);
  const k = visible.indexOf(target);
  const above = k < 0 ? visible : visible.slice(0, k);
  const toRun = (c, override) => ({ id: c.id, file: c.headers.file ?? null, code: override ?? c.code });
  return [...above.map(c => toRun(c)), toRun(target, code)];
}

/**
 * Parses a course file (courses/<id>.yaml; docs/LESSON_FORMAT.md, "Courses").
 * @returns {{ course: object, errors: {line:number, message:string}[] }}
 */
export function parseCourse(source) {
  const errors = [];
  let data;
  try {
    data = yaml.load(String(source ?? ''), { schema: yaml.CORE_SCHEMA }) ?? {};
  } catch (e) {
    return { course: null, errors: [{ line: (e.mark?.line ?? 0) + 1, message: `The course file is not valid YAML: ${e.reason || e.message}` }] };
  }
  const error = (message) => errors.push({ line: 1, message });
  for (const key of ['title', 'code', 'card', 'description']) {
    if (typeof data[key] !== 'string' || !data[key].trim()) error(`A course needs ${key}: with some text.`);
  }
  for (const key of Object.keys(data)) {
    if (!['title', 'code', 'card', 'description', 'contents', 'explore', 'planned'].includes(key)) error(`A course file has no "${key}:" key.`);
  }
  const contents = Array.isArray(data.contents) ? data.contents : [];
  if (!Array.isArray(data.contents)) error('A course needs contents:, a list of series.');
  const seen = new Set();
  const series = contents.map((s, k) => {
    if (!s || typeof s.title !== 'string') error(`Series ${k + 1} in contents: needs a title:.`);
    const lessons = Array.isArray(s?.lessons) ? s.lessons : [];
    if (!Array.isArray(s?.lessons)) error(`The series "${s?.title ?? k + 1}" needs lessons:, a list of lesson ids.`);
    for (const id of lessons) {
      if (typeof id !== 'string' || !SLUG.test(id)) error(`"${id}" is not a lesson id.`);
      else if (seen.has(id)) error(`The lesson "${id}" is listed twice.`);
      seen.add(id);
    }
    return { title: s?.title ?? '', lessons: lessons.filter(id => typeof id === 'string') };
  });
  const explore = Array.isArray(data.explore) ? data.explore.filter(id => typeof id === 'string') : [];
  if (data.explore != null && !Array.isArray(data.explore)) error('explore: must be a list of lesson ids.');
  // planned: the title of each listed lesson that isn't written yet, so the course page can name it.
  const planned = {};
  if (data.planned != null && (typeof data.planned !== 'object' || Array.isArray(data.planned))) {
    error('planned: must be lesson ids, each with its title.');
  } else {
    const listed = new Set([...seen, ...explore]);
    for (const [id, title] of Object.entries(data.planned ?? {})) {
      if (typeof title !== 'string' || !title.trim()) error(`The planned lesson "${id}" needs a title.`);
      else if (!listed.has(id)) error(`planned: names "${id}", but contents: and explore: don't list it.`);
      else planned[id] = title.trim();
    }
  }
  return {
    course: { title: data.title ?? '', code: data.code ?? '', card: data.card ?? '', description: data.description ?? '', contents: series, explore, planned },
    errors,
  };
}
