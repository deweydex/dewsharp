// Isolation experiments: what COEP breaks, whether coi-serviceworker can be confined to /csharp/, and how
// it interacts with a dewlab-style root-scoped shim.   node tools/scope.mjs [port]
import { chromium, sample, here, spike } from './common.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const base = +(process.argv[2] || 8930);
const www = path.join(spike, 'out/trimrooted/wwwroot');
const out = {};
let portN = base;
async function server(args) {
  const port = portN; portN += 2;
  const p = spawn(process.execPath, [path.join(here, 'serve2.mjs'), www, String(port), ...args], { stdio: ['ignore', 'pipe', 'inherit'] });
  await new Promise(r => p.stdout.once('data', r));
  return { port, url: `http://localhost:${port}`, stop: () => p.kill(), stats: async () => (await fetch(`http://localhost:${port}/__stats`)).json() };
}
const browser = await chromium.launch();

async function matrix(label, srvArgs, pathq) {
  const srv = await server(srvArgs);
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  let navs = 0; page.on('framenavigated', f => { if (f === page.mainFrame()) navs++; });
  console.error('[matrix]', label, 'goto');
  await page.goto(srv.url + pathq, { timeout: 20000 });
  console.error('[matrix]', label, 'loaded');
  await page.waitForTimeout(1500);
  if (pathq.includes('coi=1')) { await page.waitForFunction(() => crossOriginIsolated, null, { timeout: 10000 }).catch(() => {}); await page.waitForLoadState('load'); }
  await page.waitForTimeout(1500);
  console.error('[matrix]', label, 'evaluate');
  const r = await page.evaluate(async () => {
    const img = (id) => { const i = document.getElementById(id); return i.complete && i.naturalWidth > 0 ? 'loads' : 'BLOCKED'; };
    return { crossOriginIsolated, controlled: !!navigator.serviceWorker.controller,
      'img cross-origin, no CORP': img('img-nocorp'), 'img cross-origin, CORP': img('img-corp'),
      'img with YouTube thumbnail headers': img('img-ytthumb'), 'fetch with CORS': await window.corsFetch, frameMsgs: window.frameMsgs };
  });
  console.error('[matrix]', label, 'frames');
  const fr = {};
  for (const f of page.frames()) {
    if (f === page.mainFrame()) continue;
    const el = await f.frameElement(); const id = await el.getAttribute('id');
    let state = f.url().startsWith('chrome-error') ? 'BLOCKED' : 'loads';
    fr[id] = state;
  }
  const ran = (id) => r.frameMsgs.includes(id) ? 'loads' : 'BLOCKED';
  r['iframe cross-origin, no COEP'] = ran('fr-nocoep'); r['iframe cross-origin, sends COEP'] = ran('fr-coep');
  r['iframe credentialless attr, no COEP'] = ran('fr-credentialless-attr');
  r['iframe with YouTube embed headers'] = ran('fr-youtube'); r['iframe with YouTube embed headers + credentialless attr'] = ran('fr-youtube-cl');
  r.frameUrls = fr; delete r.frameMsgs;
  r.navigations = navs;
  out['matrix: ' + label] = r;
  console.log(label, JSON.stringify(r, null, 1));
  await ctx.close(); srv.stop();
}

const ONLY = process.env.SECTION || 'all';
const want = (k) => ONLY === 'all' || ONLY === k;
const bootOrFail = (page) => page.waitForFunction(() => window.bootInfo || /Boot failed/.test(document.getElementById('status')?.textContent || ''), null, { timeout: 60000 })
  .then(() => page.evaluate(() => ({ status: document.getElementById('status').textContent, boot: window.bootInfo ?? null, ...window.pageInfo })));
if (want('matrix')) {
await matrix('no isolation (control)', [], '/matrix.html');
await matrix('headers COEP require-corp', ['--headers=all'], '/matrix.html');
await matrix('headers COEP credentialless', ['--headers=all', '--coep=credentialless'], '/matrix.html');
await matrix('coi-serviceworker (Chrome default: require-corp)', [], '/csharp/matrix.html?coi=1');
await matrix('coi-serviceworker forced credentialless', [], '/csharp/matrix.html?coi=1&cl=1');
}

// --- Scoping: coi-serviceworker served from /csharp/ only --------------------------------------------
if (want('scoping')) {
  const srv = await server([]);
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await srv.stats();
  const s0 = await srv.stats();
  let navs = 0; page.on('framenavigated', f => { if (f === page.mainFrame()) navs++; });
  const t0 = Date.now();
  await page.goto(srv.url + '/csharp/?sw=coi');
  await page.waitForFunction(() => window.bootInfo, null, { timeout: 60000 });
  const firstVisitMs = Date.now() - t0;
  const s1 = await srv.stats();
  const csharp = await page.evaluate(() => ({ crossOriginIsolated, controller: navigator.serviceWorker.controller?.scriptURL,
    regs: null }));
  csharp.regs = await page.evaluate(async () => (await navigator.serviceWorker.getRegistrations()).map(r => r.scope));
  // Second visit to /csharp/ in the same profile: no reload needed any more.
  let navs2 = 0; const h = (f) => { if (f === page.mainFrame()) navs2++; }; page.on('framenavigated', h);
  const t1 = Date.now();
  await page.goto(srv.url + '/csharp/?sw=coi');
  await page.waitForFunction(() => window.bootInfo, null, { timeout: 60000 });
  const secondVisitMs = Date.now() - t1; page.off('framenavigated', h);
  const s2 = await srv.stats();
  // Now the rest of the site.
  await page.goto(srv.url + '/');
  await page.waitForTimeout(800);
  const rest = await page.evaluate(() => ({ crossOriginIsolated, controlled: !!navigator.serviceWorker.controller,
    crossImg: (() => { const i = document.getElementById('cross'); return i.complete && i.naturalWidth > 0 ? 'loads' : 'BLOCKED'; })() }));
  out.scoping = { csharp, navigationsFirstVisit: navs - 0, firstVisitMs, secondVisitMs,
    firstVisitRequests: s1.requests - s0.requests, firstVisitBytes: s1.bytes - s0.bytes,
    secondVisitRequests: s2.requests - s1.requests, secondVisitBytes: s2.bytes - s1.bytes, restOfSite: rest };
  console.log('scoping', JSON.stringify(out.scoping, null, 1));
  await ctx.close(); srv.stop();
}

// --- dewlab-like: coi-serviceworker at the site root (scope /), as build.py deploys it -----------------
if (want('dewlab')) {
  const srv = await server(['--root-coi']);
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.goto(srv.url + '/');
  await page.waitForFunction(() => crossOriginIsolated, null, { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(500);
  const root = await page.evaluate(() => ({ crossOriginIsolated, controller: navigator.serviceWorker.controller?.scriptURL }));
  // /csharp/ with no service worker of its own: covered by the root shim already?
  await page.goto(srv.url + '/csharp/?sw=none');
  await page.waitForFunction(() => window.bootInfo, null, { timeout: 60000 });
  const csharpUnderRoot = await page.evaluate(() => ({ ...window.pageInfo, transport: window.bootInfo.transport }));
  await page.evaluate((f) => { window.inputRequests = 0; window.__p = window.runSource(f); }, sample('input/Greeting.cs'));
  await page.waitForFunction(() => window.inputRequests >= 1, null, { timeout: 60000 });
  await page.fill('#line', 'Root'); await page.press('#line', 'Enter');
  await page.waitForFunction(() => window.inputRequests >= 2); await page.fill('#line', '9'); await page.press('#line', 'Enter');
  const r1 = await page.evaluate(() => window.__p);
  csharpUnderRoot.greeting = r1.stdout;
  // A /csharp/-scoped stdin-only service worker takes over /csharp/ (longest scope wins): isolation lost?
  const plogs = []; page.on('console', m => plogs.push(m.text().slice(0, 200)));
  await page.goto(srv.url + '/csharp/?sw=stdin');
  const withStdinSw = await bootOrFail(page);
  // reload once more: now the page itself is loaded through the /csharp/ stdin-only worker
  await page.reload();
  const withStdinSwAfterReload = await bootOrFail(page);
  withStdinSw.afterReload = withStdinSwAfterReload; withStdinSw.consoleTail = plogs.slice(-6);
  await page.evaluate(() => sessionStorage.clear());
  // The merged worker (stdin + COOP/COEP) restores it.
  await page.evaluate(async () => { for (const r of await navigator.serviceWorker.getRegistrations()) if (r.scope.endsWith('/csharp/')) await r.unregister(); });
  await page.goto(srv.url + '/csharp/?sw=stdin-coi');
  const withMergedSw = await bootOrFail(page);
  await page.goto(srv.url + '/');
  const rootAfter = await page.evaluate(() => ({ crossOriginIsolated, controller: navigator.serviceWorker.controller?.scriptURL }));
  out.dewlabLike = { root, csharpUnderRoot, withStdinSw, withMergedSw, rootAfter };
  console.log('dewlab-like', JSON.stringify(out.dewlabLike, null, 1));
  await ctx.close(); srv.stop();
}

// --- JSPI ----------------------------------------------------------------------------------------------
{
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.goto('about:blank');
  out.jspi = await page.evaluate(() => ({ userAgent: navigator.userAgent,
    Suspending: typeof WebAssembly.Suspending, promising: typeof WebAssembly.promising }));
  out.browserVersion = browser.version();
  console.log('jspi', JSON.stringify(out.jspi), out.browserVersion);
  await ctx.close();
}
fs.writeFileSync(path.join(spike, 'results-scope.json'), JSON.stringify(out, null, 1));
await browser.close();
