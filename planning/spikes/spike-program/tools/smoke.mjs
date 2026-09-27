// Functional checks: the multi-file college program, a compile error in Student.cs, runtime stack traces
// with and without a PDB, async Main, and a BCL-surface probe (catches members removed by trimming).
import { chromium, serve, openPage, sample } from './common.mjs';
const root = process.argv[2];
const port = +(process.argv[3] || 8801);
const srv = await serve(root, port);
const browser = await chromium.launch();
const show = (label, r) => console.log(`\n=== ${label} ===\n` + JSON.stringify(r, null, 1));
try {
  const { page, logs, ready, navToReadyMs } = await openPage(browser, srv.url, null, process.argv[4] || '');
  console.log('ready', JSON.stringify(ready), 'navToReady', navToReadyMs);
  const run = (files, stdin = '', opts = {}) => page.evaluate(([f, s, o]) => window.runner.run(f, s, o), [files, stdin, opts]);
  show('college (pdb)', await run(sample('college/Program.cs', 'college/Student.cs', 'college/Course.cs'), 'Ada\n21\n'));
  show('college (no pdb)', await run(sample('college/Program.cs', 'college/Student.cs', 'college/Course.cs'), 'Ada\n21\n', { emitPdb: false }));
  show('compile error in Student.cs', await run(sample('college/Program.cs', 'college/Student.error.cs', 'college/Course.cs'), 'Ada\n21\n'));
  show('compile error (no pdb)', await run(sample('college/Program.cs', 'college/Student.error.cs', 'college/Course.cs'), '', { emitPdb: false }));
  show('uncaught in Course.cs', await run(sample('misc/ThrowInCourse.cs', 'college/Student.cs', 'college/Course.cs')));
  show('async Main', await run(sample('misc/AsyncMain.cs')));
  show('BCL surface', await run(sample('misc/BclSurface.cs')));
  console.log('\n--- console ---\n' + logs.join('\n'));
} catch (e) { console.error('FAILED', e); }
await browser.close(); srv.stop();
