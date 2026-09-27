// Interactive-input checks in headless Chromium.
//   node tools/input.mjs <mode> [port]
// modes:  headers   server sends COOP/COEP; Atomics transport
//         coi       no headers; coi-serviceworker (npm 0.1.7) served from /csharp/; Atomics transport
//         sync-xhr  no headers; stdin-sw.js (no isolation); sync-XHR transport
//         stdin-coi no headers; stdin-sw.js?coi=1 does both jobs; Atomics transport
//         none      no headers, no service worker (expect: no way to pause for input)
import { chromium, sample } from './common.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { here, spike } from './common.mjs';

const mode = process.argv[2] || 'headers';
const port = +(process.argv[3] || 8910);
const www = path.join(spike, 'out/trimrooted/wwwroot');
const serverArgs = { headers: ['--headers=all'], coi: [], 'sync-xhr': [], 'stdin-coi': [], none: [] }[mode];
const query = { headers: '?sw=none', coi: '?sw=coi', 'sync-xhr': '?sw=stdin&transport=sync-xhr' + (process.env.HOLD ? '&hold=' + process.env.HOLD : ''),
  'stdin-coi': '?sw=stdin-coi', none: '?sw=none' }[mode];

const srv = spawn(process.execPath, [path.join(here, 'serve2.mjs'), www, String(port), ...serverArgs], { stdio: ['ignore', 'pipe', 'inherit'] });
await new Promise(r => srv.stdout.once('data', r));
const browser = await chromium.launch();
const results = { mode, checks: [], timings: {} };
let swPage = null, lastSw = null;
async function swDelta() { if (!swPage || mode !== 'sync-xhr') return ''; const st = await swPage.evaluate(() => fetch('./__stdin__/stats').then(r => r.json())).catch(() => null); if (!st) return ''; const d = lastSw ? ` [sw held +${st.heldTotal - lastSw.heldTotal} retries +${st.retries - lastSw.retries} waiting ${st.waiting}]` : ''; lastSw = st; return d; }
const check0 = (name, ok, detail) => { results.checks.push({ name, ok: !!ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail !== undefined ? '  ' + JSON.stringify(detail) : ''}`); };
const check = (name, ok, detail) => { check0(name, ok, detail); pendingDelta = pendingDelta.then(() => swDelta().then(d => d && console.log('      ' + d))); };
let pendingDelta = Promise.resolve();

try {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
  let navs = 0; page.on('framenavigated', f => { if (f === page.mainFrame()) navs++; });
  const t0 = Date.now();
  await page.goto(`http://localhost:${port}/csharp/${query}`);
  await page.waitForFunction(() => window.bootInfo, null, { timeout: 60000 });
  results.timings.navToReadyMs = Date.now() - t0;
  const info = await page.evaluate(() => ({ ...window.pageInfo, boot: window.bootInfo }));
  results.page = info; results.navigations = navs; swPage = page; await swDelta();
  console.log('page', JSON.stringify(info), 'navigations', navs, 'navToReady', results.timings.navToReadyMs);

  // Instrument: timestamps of every input request and every sendLine.
  await page.evaluate(() => {
    window.events = [];
    const o = window.runOpts.onInputRequest;
    window.runOpts.onInputRequest = (m) => { window.events.push({ t: performance.now(), k: 'req', tail: window.transcript().slice(-40) }); o(m); };
    const s = window.runner.sendLine.bind(window.runner);
    window.runner.sendLine = (x) => { window.events.push({ t: performance.now(), k: 'send' }); return s(x); };
  });
  const start = (files) => page.evaluate((f) => { window.inputRequests = 0; window.events.length = 0; window.lastResult = null; window.__p = window.runSource(f); }, files);
  const waitReq = (n, timeout = 30000) => page.waitForFunction((n) => (window.inputRequests || 0) >= n, n, { timeout });
  const type = async (text) => { await page.fill('#line', text); await page.press('#line', 'Enter'); };
  const finish = () => page.evaluate(() => window.__p);
  const transcript = () => page.evaluate(() => window.transcript());
  const events = () => page.evaluate(() => window.events);

  if (mode === 'none') {
    await start(sample('input/Greeting.cs'));
    const r = await finish();
    check('no transport: ReadLine returns null and says why', /cannot pause/.test(await transcript()), (await transcript()).slice(0, 200));
    throw 'done';
  }

  // 1. Greeting: prompt visible before the worker blocks; typed input resumes the program.
  let tRun = Date.now();
  await start(sample('input/Greeting.cs'));
  await waitReq(1, 60000);
  results.timings.firstRunToPromptMs = Date.now() - tRun;
  let tr = await transcript();
  check('prompt is on the page while the program waits', tr === 'What is your name? ', tr);
  const visible = await page.isVisible('#line');
  check('input box shown while waiting', visible);
  // main thread stays responsive while the worker sleeps
  const rafs = await page.evaluate(() => new Promise(r => { let n = 0; const t = performance.now(); const f = () => { n++; performance.now() - t < 500 ? requestAnimationFrame(f) : r(n); }; requestAnimationFrame(f); }));
  check('main thread keeps painting while the worker is blocked (frames in 500 ms)', rafs > 10, rafs);
  await page.waitForTimeout(300);
  check('program really is paused (no result yet)', (await page.evaluate(() => window.lastResult)) === null);
  await type('Ada');
  await waitReq(2);
  tr = await transcript();
  check('second prompt appears after first answer', tr.endsWith('How old are you? '), tr);
  await type('21');
  let res = await finish();
  tr = await transcript();
  check('greeting completes with both answers', res.ok && res.phase === 'run' && tr.includes('Hello, Ada! Next year you will be 22.'), { tr, phase: res.phase, transport: res.transport });
  check('result transcript echoes typed input', res.stdout === 'What is your name? Ada\nHow old are you? 21\nHello, Ada! Next year you will be 22.\n', res.stdout);
  let ev = await events();
  const lat = []; for (let i = 0; i < ev.length; i++) if (ev[i].k === 'send' && ev[i + 1]?.k === 'req') lat.push(+(ev[i + 1].t - ev[i].t).toFixed(1));
  results.timings.greetingSendToNextPromptMs = lat;
  results.timings.greetingTimings = res.timings;

  // 2. Three-option menu loop across two files, with bad input.
  const menu = sample('input/MenuProgram.cs', 'input/Register.cs');
  const script = ['2', '1', 'Ada', 'twenty', '21', '1', 'Grace', '85', 'x', '2', '3'];
  tRun = Date.now();
  await start(menu);
  for (let i = 0; i < script.length; i++) { await waitReq(i + 1); await type(script[i]); }
  res = await finish();
  tr = await transcript();
  const expected = ['No students yet.', 'Added Ada.', 'Please type a whole number.', 'Added Grace.', "'x' is not an option", '1. Ada (21)', '2. Grace (85)', 'Goodbye.'];
  check('menu loop: 11 inputs, all branches, validation, quit', res.ok && res.exitCode === 0 && expected.every(s => tr.includes(s)), { missing: expected.filter(s => !tr.includes(s)), inputLines: res.timings.inputLines });
  ev = await events();
  const menuLat = []; for (let i = 0; i < ev.length; i++) if (ev[i].k === 'send' && ev[i + 1]?.k === 'req') menuLat.push(+(ev[i + 1].t - ev[i].t).toFixed(1));
  results.timings.menuSendToNextPromptMs = menuLat;
  const promptsOk = ev.filter(e => e.k === 'req').every(e => /(option: |Name: |Age: )$/.test(e.tail));
  check('every menu prompt was on screen when input was requested', promptsOk, ev.filter(e => e.k === 'req').map(e => e.tail.slice(-18)));
  results.timings.menuTotalMs = Date.now() - tRun; results.timings.menuRun = res.timings;
  results.menuTranscript = tr;

  // 3. Stop while blocked in ReadLine.
  await start(sample('input/Greeting.cs'));
  await waitReq(1);
  await page.click('#stop');
  await page.waitForFunction(() => window.lastStop, null, { timeout: 30000 });
  let st = await page.evaluate(() => { const s = window.lastStop; window.lastStop = null; return s; });
  res = await finish();
  check('Stop while blocked in ReadLine', res && (res.phase === 'stopped' || res.phase === 'terminated'), { stop: st, phase: res?.phase });
  results.timings.stopWhileBlocked = st;
  await page.waitForFunction(() => document.getElementById('status').textContent.startsWith('Stopped'));
  let t = Date.now();
  await start(sample('input/Greeting.cs'));
  await waitReq(1, 60000);
  results.timings.runToPromptAfterStopMs = Date.now() - t;
  await type('Lin'); await waitReq(2); await type('30');
  res = await finish();
  check('next run works after Stop while blocked', res.ok && (await transcript()).includes('Hello, Lin!'), results.timings.runToPromptAfterStopMs);

  // 4. Stop while printing in a loop (cooperative with Atomics).
  await start(sample('input/PrintForever.cs'));
  await waitReq(1); await type('');
  await page.waitForTimeout(700);
  const linesBeforeStop = (await transcript()).split('\n').length;
  check('output streams while the program runs (lines on screen before Stop)', linesBeforeStop > 50, linesBeforeStop);
  await page.click('#stop');
  await page.waitForFunction(() => window.lastStop, null, { timeout: 30000 });
  st = await page.evaluate(() => { const s = window.lastStop; window.lastStop = null; return s; });
  res = await finish();
  check('Stop a printing loop', !!st, { stop: st, phase: res?.phase });
  results.timings.stopPrintingLoop = st;

  // 5. Stop a silent spin (must terminate).
  await start(sample('input/SpinSilently.cs'));
  await waitReq(1); await type('');
  await page.waitForTimeout(500);
  await page.click('#stop');
  await page.waitForFunction(() => window.lastStop, null, { timeout: 30000 });
  st = await page.evaluate(() => { const s = window.lastStop; window.lastStop = null; return s; });
  res = await finish();
  check('Stop a silent loop (terminate + reboot)', st.how === 'terminated', st);
  results.timings.stopSilentLoop = st;
  t = Date.now();
  await start(sample('input/Greeting.cs'));
  await waitReq(1, 60000);
  results.timings.runToPromptAfterTerminateMs = Date.now() - t;
  await type('Kay'); await waitReq(2); await type('40');
  res = await finish();
  check('next run works after terminate', res.ok && (await transcript()).includes('Hello, Kay!'), results.timings.runToPromptAfterTerminateMs);

  // 6. Stop against a catch-all loop.
  await start(sample('input/CatchAll.cs'));
  await waitReq(1); await type('4'); await waitReq(2);
  await page.click('#stop');
  await page.waitForFunction(() => window.lastStop, null, { timeout: 30000 });
  st = await page.evaluate(() => { const s = window.lastStop; window.lastStop = null; return s; });
  res = await finish();
  tr = await transcript();
  check('Stop a loop that catches every Exception', res && res.phase !== 'run', { stop: st, phase: res?.phase, tail: tr.slice(-120) });

  // 7. End of input, Console.Read, char-level reads, async + ReadLine, Unicode, ReadKey etc.
  await start(sample('input/Eof.cs'));
  await waitReq(1); await type('a'); await waitReq(2); await type('b'); await waitReq(3);
  await page.click('#eof');
  res = await finish(); tr = await transcript();
  check('End input: ReadLine returns null, Read returns -1', tr.includes('Read 2 lines, then end of input.') && tr.includes('Console.Read after EOF = -1'), tr);
  await start(sample('input/ReadChars.cs'));
  await waitReq(1); await type('xyz tail'); await waitReq(2); await type('more');
  res = await finish(); tr = await transcript();
  check('Console.Read char by char, then ReadLine for the rest', tr.includes("a=x b=y rest='z tail'") && tr.includes("got 'more'"), tr);
  await start(sample('input/AsyncRead.cs'));
  await waitReq(1); await type('Mo');
  res = await finish(); tr = await transcript();
  check('ReadLine after await (top-level async)', tr.includes('Hi Mo'), tr);
  await start(sample('input/Unicode.cs'));
  await waitReq(1); await type('héllo 👋 日本');
  res = await finish(); tr = await transcript();
  check('non-ASCII input round-trips', tr.includes("You said 'héllo 👋 日本' (11 UTF-16 chars)"), tr);
  await start(sample('input/ReadKey.cs'));
  await waitReq(1).catch(() => {}); await type('ok').catch(() => {});
  res = await finish(); tr = await transcript();
  results.readKeyProbe = tr;
  console.log('--- ReadKey probe ---\n' + tr);

  // 8. Timeout does not count typing time.
  await page.evaluate(() => { window.runOpts.timeoutMs = 3000; });
  await start(sample('input/Greeting.cs'));
  await waitReq(1); await page.waitForTimeout(4000); await type('Slow'); await waitReq(2); await type('1');
  res = await finish();
  check('4 s of thinking does not trip a 3 s run timeout', res.ok && res.phase === 'run', res.phase);
  await page.evaluate(() => { window.runOpts.timeoutMs = 10000; });

  // 9. Long wait (sync-xhr: survives the SW's hold/retry cycle)
  if (process.env.LONGWAIT) {
    await start(sample('input/Greeting.cs'));
    await waitReq(1); await page.waitForTimeout(+process.env.LONGWAIT); await type('Patient'); await waitReq(2); await type('2');
    res = await finish();
    check(`answer after ${process.env.LONGWAIT} ms wait`, res.ok && (await transcript()).includes('Hello, Patient!'), res.timings);
    if (mode === 'sync-xhr') results.swStats = await page.evaluate(() => fetch('./__stdin__/stats').then(r => r.json()));
  }
  // 10. Many runs in one worker (memory / stability)
  const mem0 = await page.evaluate(() => window.runner.memory());
  for (let i = 0; i < 10; i++) { await start(sample('input/Greeting.cs')); await waitReq(1); await type('N' + i); await waitReq(2); await type(String(i)); await finish(); }
  check('10 more interactive runs in the same worker', (await transcript()).includes('Hello, N9!'));
} catch (e) { if (e !== 'done') { console.error('FAILED', e); results.error = String(e); } }
const fails = results.checks.filter(c => !c.ok).length;
console.log(`\n${mode}: ${results.checks.length - fails}/${results.checks.length} checks passed`);
console.log('TIMINGS', JSON.stringify(results.timings, null, 1));
(await import('node:fs')).writeFileSync(path.join(spike, `results-${mode}.json`), JSON.stringify(results, null, 1));
await browser.close(); srv.kill();
