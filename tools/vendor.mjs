#!/usr/bin/env node
// npm run vendor — writes web/vendor/, the third-party code and fonts the site serves, from node_modules/:
//
//   web/vendor/js-yaml.mjs            a copy of js-yaml's ES module (web/lesson/parse.js imports it)
//   web/vendor/editor.bundle.js       CodeMirror 6, C# (legacy-modes clike) and Python, bundled by esbuild
//   web/vendor/markdown.bundle.js     markdown-it, bundled by esbuild
//   web/vendor/katex.bundle.js        KaTeX, bundled by esbuild (loaded only on a page with maths)
//   web/vendor/rich.bundle.js         ProseMirror and prosemirror-markdown, bundled by esbuild (loaded only when
//                                     an author opens a paragraph in the editing mode)
//   web/vendor/katex/                 KaTeX's stylesheet and its .woff2 fonts
//   web/vendor/fonts/, accessible-fonts.css   Lexend and OpenDyslexic, for the reader's font setting
//   web/vendor/THIRD-PARTY.txt        the name, version and licence of everything above
//
// The entry points of the bundles are in tools/vendor-src/. Everything here is committed, so the site and
// the dev server need no build step for the page (DECISIONS.md #19 and #33). `--check` fails if a file
// differs from what this script would write; `npm test` runs it. Bump a version in package.json, run
// `npm ci && npm run vendor`, and commit web/vendor/ in the same change.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { repoRoot } from './lib/static.mjs';

const require = createRequire(import.meta.url);
const pkgDir = (name) => {
  try { return path.dirname(require.resolve(`${name}/package.json`)); } catch { /* the package's exports leave package.json out */ }
  // Walk up from the package's entry point to the folder that holds its package.json.
  let dir = path.dirname(require.resolve(name));
  while (!fs.existsSync(path.join(dir, 'package.json')) || JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).name !== name) {
    const up = path.dirname(dir);
    if (up === dir) throw new Error(`cannot find the folder of ${name}`);
    dir = up;
  }
  return dir;
};
const pkgVersion = (name) => JSON.parse(fs.readFileSync(path.join(pkgDir(name), 'package.json'), 'utf8')).version;
const licenseOf = (name) => {
  const dir = pkgDir(name);
  const file = fs.readdirSync(dir).find(f => /^licen[cs]e/i.test(f));
  return file ? fs.readFileSync(path.join(dir, file), 'utf8').trim() : `(see the ${name} package)`;
};

/** The packages bundled or copied, for THIRD-PARTY.txt. */
const PACKAGES = [
  'js-yaml', '@codemirror/state', '@codemirror/view', '@codemirror/language', '@codemirror/commands',
  '@codemirror/autocomplete', '@codemirror/lint', '@codemirror/search', '@codemirror/legacy-modes',
  '@codemirror/lang-python', '@lezer/common', '@lezer/highlight', '@lezer/lr',
  '@lezer/python', 'style-mod', 'w3c-keyname', 'crelt', 'markdown-it', 'entities',
  'linkify-it', 'mdurl', 'punycode.js', 'uc.micro', 'katex',
  'prosemirror-model', 'prosemirror-state', 'prosemirror-view', 'prosemirror-transform', 'prosemirror-commands',
  'prosemirror-keymap', 'prosemirror-history', 'prosemirror-schema-list', 'prosemirror-inputrules',
  'prosemirror-markdown', 'orderedmap', 'rope-sequence', '@fontsource/lexend', '@fontsource/opendyslexic',
];

const BUNDLES = [
  { entry: 'editor.js', out: 'web/vendor/editor.bundle.js', what: 'CodeMirror 6, with C# and Python' },
  { entry: 'markdown.js', out: 'web/vendor/markdown.bundle.js', what: 'markdown-it' },
  { entry: 'katex.js', out: 'web/vendor/katex.bundle.js', what: 'KaTeX' },
  // markdown-it is left out: the page's own is passed in (tools/vendor-src/markdown-it-unused.js).
  { entry: 'rich.js', out: 'web/vendor/rich.bundle.js', what: 'ProseMirror and prosemirror-markdown', alias: { 'markdown-it': path.join(repoRoot, 'tools/vendor-src/markdown-it-unused.js') } },
];

/** Every file web/vendor/ should hold: [{ file, data: string | Buffer }]. */
export async function vendored() {
  const out = [];
  const add = (rel, data) => out.push({ file: path.join(repoRoot, rel), data });

  // js-yaml: a plain copy, since it already ships an ES module.
  {
    const dir = pkgDir('js-yaml');
    const body = fs.readFileSync(path.join(dir, 'dist/js-yaml.mjs'), 'utf8').replace(/\n\/\/# sourceMappingURL=.*\s*$/, '\n');
    const header = `/*! js-yaml ${pkgVersion('js-yaml')}, copied from node_modules/js-yaml/dist/js-yaml.mjs by tools/vendor.mjs. Do not edit.\n${licenseOf('js-yaml').split('\n').map(l => ' * ' + l).join('\n').replace(/ +$/gm, '')}\n */\n`;
    add('web/vendor/js-yaml.mjs', header + body);
  }

  // The bundles.
  const esbuild = await import('esbuild');
  for (const b of BUNDLES) {
    const result = await esbuild.build({
      entryPoints: [path.join(repoRoot, 'tools/vendor-src', b.entry)],
      bundle: true, format: 'esm', minify: true, write: false, target: 'es2022', legalComments: 'none',
      logLevel: 'silent', alias: b.alias,
    });
    const banner = `/*! ${b.what}, bundled from tools/vendor-src/${b.entry} by tools/vendor.mjs (esbuild ${pkgVersion('esbuild')}). Do not edit. Licences: web/vendor/THIRD-PARTY.txt */\n`;
    add(b.out, banner + result.outputFiles[0].text);
  }

  // KaTeX's stylesheet and fonts. The stylesheet lists .woff2 first, which every browser the site supports
  // reads, so only those are copied.
  {
    const dir = path.join(pkgDir('katex'), 'dist');
    add('web/vendor/katex/katex.min.css', fs.readFileSync(path.join(dir, 'katex.min.css')));
    for (const f of fs.readdirSync(path.join(dir, 'fonts')).filter(f => f.endsWith('.woff2')).sort())
      add(`web/vendor/katex/fonts/${f}`, fs.readFileSync(path.join(dir, 'fonts', f)));
  }

  // The reader's fonts: the same two dewlab offers, so that the font setting carries over.
  {
    const faces = [];
    const fonts = [
      ['@fontsource/lexend', 'Lexend', 'lexend', [['400', 'normal'], ['700', 'normal']]],
      ['@fontsource/opendyslexic', 'OpenDyslexic', 'opendyslexic', [['400', 'normal'], ['400', 'italic'], ['700', 'normal'], ['700', 'italic']]],
    ];
    for (const [pkg, family, stem, styles] of fonts) {
      for (const [weight, style] of styles) {
        const name = `${stem}-latin-${weight}-${style}.woff2`;
        add(`web/vendor/fonts/${name}`, fs.readFileSync(path.join(pkgDir(pkg), 'files', name)));
        faces.push(`@font-face {\n  font-family: '${family}';\n  font-style: ${style};\n  font-display: swap;\n  font-weight: ${weight};\n  src: url('fonts/${name}') format('woff2');\n}`);
      }
    }
    add('web/vendor/accessible-fonts.css', `/* Lexend and OpenDyslexic (latin), from @fontsource, written by tools/vendor.mjs. Do not edit. */\n${faces.join('\n')}\n`);
  }

  // Licences.
  const parts = ['Third-party code and fonts in web/vendor/, written by tools/vendor.mjs from node_modules/. Do not edit.\n'];
  for (const name of PACKAGES) {
    let version;
    try { version = pkgVersion(name); } catch { continue; }
    parts.push(`${'='.repeat(78)}\n${name} ${version}\n${'='.repeat(78)}\n${licenseOf(name)}\n`);
  }
  add('web/vendor/THIRD-PARTY.txt', parts.join('\n'));
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes('--check');
  let stale = 0;
  const files = await vendored();
  for (const { file, data } of files) {
    const rel = path.relative(repoRoot, file);
    const want = Buffer.isBuffer(data) ? data : Buffer.from(data);
    if (check) {
      if (!fs.existsSync(file) || !fs.readFileSync(file).equals(want)) { console.error(`${rel} is not what npm run vendor writes. Run it and commit the result.`); stale++; }
    } else {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, want);
    }
  }
  if (!check) console.log(`wrote ${files.length} files in web/vendor/`);
  process.exit(stale ? 1 : 0);
}
