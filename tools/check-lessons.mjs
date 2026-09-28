#!/usr/bin/env node
// npm run check-lessons [-- --write] [-- --lessons dir] [-- --jobs n] [ids...]
//
// Runs every cell of every lesson page through the real C# engine (web/engine/runner.js) in headless
// Chromium, the way a reader's browser would, and compares what happened with the page's recorded outputs,
// lessons/<id>/<page id>.outputs.json. docs/ARCHITECTURE.md, "The lesson checker", describes it; the
// recorded file's shape is in docs/PARSER.md, "Recorded outputs".
//
// For each page, and for each world (a page without worlds has one), it runs, with the cells a reader in
// that world sees above each one:
//   - each program cell, with its stdin: header or no input at all (ReadLine gives null), as Run runs it; then,
//     if it has inputs, again with them, for their values;
//   - each types cell in check mode (compiled, never run);
//   - each solution, in place of its cell's code (an empty cell's too), with the same stdin and inputs;
//   - each challenge, alone, in check mode (it opens in a new notebook, with no cells above it).
// It fails if a page has a parser error or a lesson: link to a page that doesn't exist; (with the real
// lessons/) if a course lists a lesson that neither exists nor is planned; if a cell doesn't do what its
// expect: header says (no expect: means it must compile and run to the end); if a solution doesn't compile
// and run, or throws on an input not marked "// throws"; if a challenge doesn't compile on its own; if a
// predict block asks about a line of the output (its question names one, or line:) that isn't there; or,
// without --write, if anything differs from the recorded file. --write records what happened instead (the
// parser, expect: and challenge checks still apply).
//
// Only lessons/ is checked, never drafts/. ids limit the run to those lessons (a lesson's id includes
// its practice page).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { repoRoot } from './lib/static.mjs';
import { findPages, readPage, buildIndex } from './lib/lessons.mjs';
import { cellsInWorld, cellsForRun } from '../web/lesson/parse.js';

const args = process.argv.slice(2);
const flag = (name) => { const k = args.indexOf(name); if (k < 0) return null; args.splice(k, 1); return true; };
const value = (name) => { const k = args.indexOf(name); if (k < 0) return null; const v = args[k + 1]; args.splice(k, 2); return v; };

export async function checkLessons({ lessonsDir = path.join(repoRoot, 'lessons'), coursesDir, ids = [], write = false, jobs, log = console.log } = {}) {
  // The course files are checked with the real lessons/ only, or when coursesDir is given.
  if (coursesDir === undefined) coursesDir = path.resolve(lessonsDir) === path.join(repoRoot, 'lessons') ? path.join(repoRoot, 'courses') : null;
  const t0 = Date.now();
  let pages = findPages(lessonsDir);
  if (ids.length) pages = pages.filter(p => ids.includes(p.lesson) || ids.includes(p.id));
  const problems = [];
  if (!pages.length) {
    log(ids.length ? `No lesson pages match ${ids.join(', ')} in ${path.relative(repoRoot, lessonsDir) || '.'}.` : `No lessons in ${path.relative(repoRoot, lessonsDir)}/ yet: nothing to check.`);
    return { problems: ids.length ? [{ message: 'no pages matched' }] : [], pages: 0, runs: 0, ms: Date.now() - t0 };
  }
  const read = pages.map(p => readPage(p, repoRoot));
  for (const p of read) for (const e of p.errors) problems.push({ where: `${e.file}:${e.line}`, message: e.message });
  // What the site build also refuses: a course that lists a lesson that neither exists nor is planned,
  // and a lesson: link to a page that doesn't exist (DECISIONS.md #39).
  const { errors: indexErrors } = buildIndex({ lessonsDir, coursesDir, root: repoRoot });
  const checked = new Set(read.map(p => path.relative(repoRoot, p.file)));
  const seen = new Set(problems.map(p => `${p.where} ${p.message}`));
  for (const e of indexErrors) {
    const where = `${e.file}:${e.line}`;
    if (seen.has(`${where} ${e.message}`) || (e.file.endsWith('.md') && !checked.has(e.file))) continue;
    if (!e.file.endsWith('.md') && ids.length) continue;
    problems.push({ where, message: e.message });
  }
  const runnable = read.filter(p => !p.errors.length);

  const { launch } = await import('../tests/engine/helpers.mjs');
  const env = await launch();
  let runs = 0;
  try {
    const count = Math.max(1, Math.min(jobs ?? defaultJobs(), runnable.length));
    const queue = [...runnable];
    const workers = await Promise.all(Array.from({ length: count }, () => openChecker(env)));
    await Promise.all(workers.map(async (page) => {
      for (let p = queue.shift(); p; p = queue.shift()) {
        const started = Date.now();
        const { record, found, runCount } = await checkPage(page, p);
        runs += runCount;
        const outputsFile = path.join(path.dirname(p.file), `${p.id}.outputs.json`);
        const rel = path.relative(repoRoot, outputsFile);
        const text = JSON.stringify(record, null, 1) + '\n';
        if (write) {
          fs.writeFileSync(outputsFile, text);
        } else if (!fs.existsSync(outputsFile)) {
          found.push({ where: rel, message: 'There are no recorded outputs. Run npm run check-lessons -- --write, and read what changed before you commit it.' });
        } else {
          const old = fs.readFileSync(outputsFile, 'utf8');
          if (old !== text) found.push(...differences(JSON.parse(old), record).map(message => ({ where: rel, message })));
        }
        problems.push(...found);
        log(`${p.id}: ${runCount} runs, ${((Date.now() - started) / 1000).toFixed(1)} s${found.length ? `, ${found.length} problem(s)` : ''}${write ? ', recorded' : ''}`);
      }
    }));
  } finally {
    await env.close();
  }
  return { problems, pages: pages.length, runs, ms: Date.now() - t0 };
}

function defaultJobs() {
  return Math.max(1, Math.min(4, Math.floor((os.availableParallelism?.() ?? os.cpus().length) / 2)));
}

/** A page with a runner that has no time limit on warm-up, reused for every lesson it is given. */
async function openChecker(env) {
  const ctx = await env.browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${env.srv.url}dev.html?sw=off&reload=0`);
  await page.evaluate(() => window.runner.ready());
  return page;
}

/** Runs one job on the page's runner and returns its result and its output as text. */
function runOnPage(page, request) {
  return page.evaluate(async (request) => {
    const chunks = [];
    const job = window.runner.run({ ...request, onOutput: (c) => chunks.push(c) });
    const result = await job.done;
    // A clear shows as a form feed; colours don't show.
    const output = chunks.map(c => c.kind === 'clear' ? '\f' : c.kind === 'style' ? '' : c.text).join('');
    return { result, output };
  }, request);
}

async function checkPage(page, p) {
  const lesson = p.parsed;
  const found = [];
  const record = { page: p.id, version: lesson.frontmatter.version ?? null, cells: {} };
  const worlds = lesson.worlds.length ? lesson.worlds.map(w => w.key) : [null];
  const allCells = lesson.items.filter(i => i.type === 'cell');
  const kinds = await page.evaluate((cells) => window.runner.classify(cells), allCells.map(c => ({ id: c.id, code: c.code })));
  let runCount = 0;
  const where = (cell) => `${path.relative(repoRoot, p.file)}:${cell.line}`;

  for (const [w, world] of worlds.entries()) {
    const visible = cellsInWorld(lesson, world);
    for (const [k, cell] of visible.entries()) {
      // A shared cell runs once, unless a world's cell above it changes the program it is part of.
      const shared = cell.world === undefined;
      const dependsOnWorld = shared && world !== null && visible.slice(0, k).some(c => c.world !== undefined);
      if (shared && !dependsOnWorld && w > 0) continue;
      const key = dependsOnWorld ? `${cell.id}@${world}` : cell.id;
      const label = `${cell.id}${dependsOnWorld ? ` (world ${world})` : ''}`;
      const kind = kinds[cell.id];
      const entry = { kind };
      record.cells[key] = entry;

      const inputs = cell.blocks.inputs?.items.map(x => x.expr);
      const stdin = cell.stdin ?? '';
      // An empty cell (a blank "your turn") has nothing to run, but its solutions still run below.
      if (kind !== 'empty') {
        // A program cell is recorded as Run runs it, without its inputs, so the record has the warnings the
        // reader sees; its inputs then run separately, for their values. A types cell with inputs has no Run:
        // it is recorded with its inputs, as Compare runs it.
        const plain = kind === 'program' && inputs;
        const mode = kind === 'types' && !inputs ? 'check' : 'run';
        const { result, output } = await runOnPage(page, { cells: cellsForRun(lesson, cell, { world }), mode, stdin, inputs: plain ? undefined : inputs });
        runCount++;
        Object.assign(entry, summarise(result, output, cell.id));
        if (plain) {
          const withInputs = await runOnPage(page, { cells: cellsForRun(lesson, cell, { world }), mode: 'run', stdin, inputs });
          runCount++;
          entry.values = summarise(withInputs.result, withInputs.output, cell.id).values;
        }
        const expected = cell.expect ?? { outcome: 'ok' };
        if (result.outcome !== expected.outcome) {
          found.push({ where: where(cell), message: `${label}: ${expectation(cell.expect)}, but ${what(result)}.` });
        } else if (expected.code && !result.diagnostics.some(d => d.severity === 'error' && d.code === expected.code)) {
          found.push({ where: where(cell), message: `${label}: expect: ${expected.code}, but the errors were ${result.diagnostics.filter(d => d.severity === 'error').map(d => d.code).join(', ')}.` });
        }
        const predict = cell.blocks.predict;
        if (predict && predict.outputLine != null && result.outcome === 'ok') {
          const problem = predictProblem(predict, output);
          if (problem) found.push({ where: `${path.relative(repoRoot, p.file)}:${predict.line}`, message: `${label}: ${problem}` });
        }
      }

      if (cell.blocks.solutions.length) entry.solutions = [];
      for (const [s, solution] of cell.blocks.solutions.entries()) {
        const sol = await runOnPage(page, { cells: cellsForRun(lesson, cell, { world, code: solution.code }), mode: 'run', stdin, inputs });
        runCount++;
        entry.solutions.push(summarise(sol.result, sol.output, cell.id));
        const name = `${label}, solution ${s + 1}${solution.title ? ` ("${solution.title}")` : ''}`;
        if (sol.result.outcome !== 'ok') {
          found.push({ where: `${path.relative(repoRoot, p.file)}:${solution.line}`, message: `${name}: a solution must compile and run, but ${what(sol.result)}.` });
          continue;
        }
        for (const [n, v] of (sol.result.values || []).entries()) {
          const input = cell.blocks.inputs.items[n];
          if (v.ok || (v.kind === 'exception' && input.throws)) continue;
          found.push({ where: `${path.relative(repoRoot, p.file)}:${input.line}`, message: `${name}: the input ${input.expr} gave ${v.kind === 'compile-error' ? `${v.error}: ${v.message}` : v.error}${v.kind === 'exception' ? ' (mark the input "// throws" if that is meant)' : ''}.` });
        }
      }
    }
  }
  // A challenge opens alone in a new notebook, with no cells above it. It must compile there. It is compiled
  // and not run: it is starter code, and it may wait for input or never end until the reader finishes it.
  const challenges = lesson.items.filter(i => i.type === 'challenge');
  if (challenges.length) record.challenges = [];
  for (const [n, challenge] of challenges.entries()) {
    const { result, output } = await runOnPage(page, { cells: [{ id: 'challenge', code: challenge.code }], mode: 'check' });
    runCount++;
    record.challenges.push({ kind: result.kind?.challenge ?? null, ...summarise(result, output, 'challenge') });
    if (result.outcome !== 'ok')
      found.push({ where: `${path.relative(repoRoot, p.file)}:${challenge.line}`, message: `challenge ${n + 1}: a challenge must compile on its own, as it does in a new notebook, but ${what(result)}.` });
  }
  return { record, found, runCount };
}

/** A predict block that asks about one line of the output: the output must have that line, or the page
 *  compares the guess with nothing (web/page/guess.js). */
function predictProblem(predict, output) {
  const text = output.replace(/\f/g, '').trimEnd();
  const lines = text ? text.split('\n') : [];
  if (lines.length && (predict.outputLine === 'last' || predict.outputLine <= lines.length)) return null;
  const which = predict.outputLine === 'last' ? 'the last line' : `line ${predict.outputLine}`;
  return `the predict block asks about ${which}, but the output has ${lines.length} line(s). Set line: to the line it means.`;
}

/** What the recorded file keeps of a result: everything but the timings. */
function summarise(result, output, cellId) {
  const out = { outcome: result.outcome, output };
  if (result.diagnostics.length) {
    out.diagnostics = result.diagnostics.map(d => ({
      severity: d.severity, code: d.code, ...(d.cellId !== cellId ? { cellId: d.cellId } : {}), line: d.line, column: d.column, message: d.message,
    }));
  }
  const exception = (e) => ({ type: e.type, message: e.message,
    frames: e.frames.map(f => ({ ...(f.cellId !== cellId ? { cellId: f.cellId } : {}), line: f.line, member: f.member })),
    ...(e.inner ? { inner: exception(e.inner) } : {}) });
  if (result.exception) out.exception = exception(result.exception);
  if (result.exitCode != null && result.exitCode !== 0 && result.outcome !== 'exception') out.exitCode = result.exitCode;
  if (result.values) out.values = result.values.map(v => v.ok ? { display: v.display } : { [v.kind === 'compile-error' ? 'compileError' : v.kind]: v.error ?? true });
  if (result.outcome === 'host-error') out.detail = result.detail;
  return out;
}

function expectation(expect) {
  if (!expect) return 'it has no expect: header, so it must compile and run to the end';
  return expect.outcome === 'exception' ? 'expect: exception' : `expect: ${expect.code}`;
}

function what(result) {
  switch (result.outcome) {
    case 'ok': return 'it compiled and ran';
    case 'compile-error': return `it did not compile (${result.diagnostics.filter(d => d.severity === 'error').map(d => `${d.code} line ${d.line}: ${d.message}`).join('; ')})`;
    case 'exception': return `it stopped with an exception (${result.exception?.type}: ${result.exception?.message})`;
    case 'timeout': return 'it ran for longer than 30 seconds';
    case 'stopped': return 'it was stopped';
    default: return `the engine failed (${result.detail})`;
  }
}

/** Plain differences between a recorded file and a new run, one line each. */
function differences(old, now) {
  const out = [];
  if (old.version !== now.version) out.push(`version: recorded ${old.version}, now ${now.version}`);
  const entries = (r) => ({ ...(r.cells || {}), ...Object.fromEntries((r.challenges || []).map((c, n) => [`challenge ${n + 1}`, c])) });
  const was = entries(old), is = entries(now);
  const keys = new Set([...Object.keys(was), ...Object.keys(is)]);
  for (const key of keys) {
    const a = was[key], b = is[key];
    const thing = key.startsWith('challenge ') ? 'challenge' : 'cell';
    if (!a) { out.push(`${key}: not recorded (a new ${thing}?)`); continue; }
    if (!b) { out.push(`${key}: recorded, but the page has no such ${thing} now`); continue; }
    for (const field of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const x = JSON.stringify(a[field]), y = JSON.stringify(b[field]);
      if (x !== y) out.push(`${key}: ${field} differs\n      recorded: ${clip(x)}\n      now:      ${clip(y)}`);
    }
  }
  return out.length ? out : ['the file differs only in its layout; run with --write to rewrite it'];
}

const clip = (s) => (s === undefined ? '(none)' : s.length > 300 ? s.slice(0, 300) + '…' : s);

if (import.meta.url === `file://${process.argv[1]}`) {
  const write = !!flag('--write');
  const lessonsArg = value('--lessons');
  const jobs = value('--jobs');
  const lessonsDir = path.resolve(lessonsArg || path.join(repoRoot, 'lessons'));
  const { problems, pages, runs, ms } = await checkLessons({ lessonsDir, ids: args, write, jobs: jobs ? Number(jobs) : undefined });
  for (const pr of problems) console.error(`${pr.where ? pr.where + ': ' : ''}${pr.message}`);
  console.log(`${pages} page(s), ${runs} runs in ${(ms / 1000).toFixed(1)} s: ${problems.length ? `${problems.length} problem(s)` : 'no problems'}.`);
  process.exit(problems.length ? 1 : 0);
}
