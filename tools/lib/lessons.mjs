// Finding and reading lessons and courses, for tools/serve.mjs, tools/build-site.mjs and
// tools/check-lessons.mjs. Only lessons/ is read, never drafts/.
import fs from 'node:fs';
import path from 'node:path';
import { parseLesson, parseCourse } from '../../web/lesson/parse.js';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Every page under `lessonsDir`: lessons/<id>/<id>.md and lessons/<id>/<id>-practice.md, in id order.
 * Returns [{ id, lesson, practice, file, rel }] where `id` is the page id (the file name without .md),
 * `lesson` the lesson it belongs to, and `rel` the path under lessonsDir.
 */
export function findPages(lessonsDir) {
  if (!fs.existsSync(lessonsDir)) return [];
  const pages = [];
  for (const dir of fs.readdirSync(lessonsDir).sort()) {
    const full = path.join(lessonsDir, dir);
    if (!fs.statSync(full).isDirectory()) continue;
    for (const name of [dir, dir + '-practice']) {
      const file = path.join(full, name + '.md');
      if (fs.existsSync(file)) pages.push({ id: name, lesson: dir, practice: name !== dir, file, rel: `${dir}/${name}.md` });
    }
  }
  return pages;
}

/** Reads and parses one page. Errors carry the page's path, relative to `root`. */
export function readPage(page, root = process.cwd()) {
  const source = fs.readFileSync(page.file, 'utf8');
  const parsed = parseLesson(source, { id: page.id });
  const where = path.relative(root, page.file);
  return { ...page, parsed, errors: parsed.errors.map(e => ({ file: where, line: e.line, message: e.message })) };
}

/** The courses in `coursesDir` (courses/<id>.yaml), in id order: [{ id, course, errors }]. */
export function readCourses(coursesDir, root = process.cwd()) {
  if (!fs.existsSync(coursesDir)) return [];
  return fs.readdirSync(coursesDir).filter(f => /\.ya?ml$/.test(f)).sort().map(f => {
    const file = path.join(coursesDir, f);
    const { course, errors } = parseCourse(fs.readFileSync(file, 'utf8'));
    const where = path.relative(root, file);
    return { id: f.replace(/\.ya?ml$/, ''), course, errors: errors.map(e => ({ file: where, line: e.line, message: e.message })) };
  });
}

/**
 * lessons/index.json: the courses, and every page that exists with what the page needs to list it. The
 * shape is in docs/PARSER.md, "lessons/index.json". Returns { index, errors }; errors are parser errors
 * and files in the wrong place.
 */
export function buildIndex({ lessonsDir, coursesDir, root = process.cwd() }) {
  const errors = [];
  const pages = findPages(lessonsDir).map(p => readPage(p, root));
  const courses = readCourses(coursesDir, root);
  for (const p of pages) errors.push(...p.errors);
  for (const c of courses) errors.push(...c.errors);
  if (fs.existsSync(lessonsDir)) {
    for (const dir of fs.readdirSync(lessonsDir)) {
      const full = path.join(lessonsDir, dir);
      if (!fs.statSync(full).isDirectory()) continue;
      if (!SLUG.test(dir)) errors.push({ file: path.relative(root, full), line: 1, message: `A lesson id is small letters, digits and hyphens, not "${dir}".` });
      for (const f of fs.readdirSync(full).filter(f => f.endsWith('.md'))) {
        if (f !== dir + '.md' && f !== dir + '-practice.md')
          errors.push({ file: path.relative(root, path.join(full, f)), line: 1, message: `A page in lessons/${dir}/ is ${dir}.md or ${dir}-practice.md.` });
      }
      if (!fs.existsSync(path.join(full, dir + '.md')) && fs.existsSync(path.join(full, dir + '-practice.md')))
        errors.push({ file: path.relative(root, full), line: 1, message: `lessons/${dir}/ has a practice page but no ${dir}.md.` });
    }
  }
  const inCourses = {};
  for (const c of courses) {
    for (const s of c.course?.contents || []) for (const id of s.lessons) (inCourses[id] ||= []).push(c.id);
    for (const id of c.course?.explore || []) (inCourses[id] ||= []).push(c.id);
  }
  const index = {
    courses: courses.filter(c => c.course).map(c => ({ id: c.id, ...c.course })),
    pages: {},
  };
  for (const p of pages) {
    const fm = p.parsed.frontmatter;
    index.pages[p.id] = {
      path: p.rel,
      title: fm.title ?? null,
      version: fm.version ?? null,
      lesson: p.lesson,
      practice: p.practice,
      practicePage: !p.practice && pages.some(q => q.id === p.id + '-practice') ? p.id + '-practice' : null,
      worlds: p.parsed.worlds.map(w => w.key),
      covers: fm.covers ?? [],
      courses: p.practice ? [] : (inCourses[p.id] ?? []),
    };
  }
  return { index, errors };
}
