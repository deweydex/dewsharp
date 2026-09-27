#!/usr/bin/env node
// npm run build:site — assembles site/ for GitHub Pages from:
//
//   web/                          the pages, the engine's JavaScript, the service worker, web/vendor/
//   lessons/                      the lessons, their pictures and their recorded outputs (never drafts/)
//   courses/                      the course files
//   engine/out/wwwroot/_framework the engine (npm run build:engine), without the SDK's .gz/.br copies
//   lessons/index.json            generated from courses/*.yaml and each page's frontmatter
//
// It fails, and writes nothing, if a lesson or a course file has a parser error, or if the engine hasn't
// been built. docs/ARCHITECTURE.md, "The build", has more.
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot, frameworkDir } from './lib/static.mjs';
import { buildIndex } from './lib/lessons.mjs';

export function buildSite({ out = path.join(repoRoot, 'site'), lessonsDir = path.join(repoRoot, 'lessons'), coursesDir = path.join(repoRoot, 'courses') } = {}) {
  const { index, errors } = buildIndex({ lessonsDir, coursesDir, root: repoRoot });
  if (errors.length) {
    for (const e of errors) console.error(`${e.file}:${e.line}: ${e.message}`);
    throw new Error(`${errors.length} problem(s) in the lessons or courses; site/ was not written.`);
  }
  if (!fs.existsSync(path.join(frameworkDir, 'dotnet.js'))) throw new Error('No engine build. Run npm run build:engine first.');

  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  const copy = (from, to, filter = () => true) => fs.cpSync(from, to, { recursive: true, filter: (src) => filter(src) });
  copy(path.join(repoRoot, 'web'), out);
  if (fs.existsSync(lessonsDir)) copy(lessonsDir, path.join(out, 'lessons'));
  fs.mkdirSync(path.join(out, 'lessons'), { recursive: true });
  if (fs.existsSync(coursesDir)) copy(coursesDir, path.join(out, 'courses'));
  copy(frameworkDir, path.join(out, '_framework'), (src) => !/\.(gz|br)$/.test(src));
  fs.writeFileSync(path.join(out, 'lessons', 'index.json'), JSON.stringify(index, null, 1) + '\n');
  // GitHub Pages must not run Jekyll, which leaves out folders whose names start with _ (_framework).
  fs.writeFileSync(path.join(out, '.nojekyll'), '');

  let files = 0, bytes = 0;
  const walk = (d) => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); const st = fs.statSync(p); if (st.isDirectory()) walk(p); else { files++; bytes += st.size; } } };
  walk(out);
  return { files, bytes, pages: Object.keys(index.pages).length, courses: index.courses.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const s = buildSite();
    console.log(`site/: ${s.files} files, ${(s.bytes / 1e6).toFixed(1)} MB; ${s.pages} lesson page(s), ${s.courses} course(s)`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
