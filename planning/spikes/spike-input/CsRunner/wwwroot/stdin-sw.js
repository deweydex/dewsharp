// Service worker for the 'sync-xhr' stdin transport ("sync-message" technique), plus optional
// cross-origin isolation headers so ONE service worker can do both jobs for a /csharp/ scope.
//
//   POST <scope>__stdin__/read    body = key.  Held open until an answer for `key` arrives, or `hold` ms
//                                 pass (then {retry:true}, and the worker asks again). The worker's XHR
//                                 is synchronous, so the worker thread sleeps meanwhile.
//   POST <scope>__stdin__/answer  body = {key, line|eof|stop}. Sent by the page with fetch().
//
// Registration URL options: ?coi=1 adds COOP/COEP to every response it serves (like coi-serviceworker),
// &coep=credentialless picks that COEP value instead of require-corp, &hold=<ms> (default 20000).
const params = new URL(self.location.href).searchParams;
const COI = params.get('coi') === '1';
const COEP = params.get('coep') || 'require-corp';
const HOLD_MS = +(params.get('hold') || 20000);

const waiting = new Map();   // key -> resolve(answer)
const answers = new Map();   // key -> answer that arrived before the read (a race the page cannot rule out)
let heldTotal = 0, retries = 0;
const recentKeys = [];   // diagnostics: last few keys read

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

const json = (o) => new Response(JSON.stringify(o), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin === self.location.origin && url.pathname.endsWith('/__stdin__/read')) {
    event.respondWith(event.request.text().then((key) => {
      recentKeys.push(key); if (recentKeys.length > 5) recentKeys.shift();
      if (answers.has(key)) { const a = answers.get(key); answers.delete(key); return json(a); }
      heldTotal++;
      return new Promise((resolve) => {
        const timer = setTimeout(() => { waiting.delete(key); retries++; resolve(json({ retry: true })); }, HOLD_MS);
        waiting.set(key, (a) => { clearTimeout(timer); resolve(json(a)); });
      });
    }));
    return;
  }
  if (url.origin === self.location.origin && url.pathname.endsWith('/__stdin__/answer')) {
    event.respondWith(event.request.json().then(({ key, ...a }) => {
      const w = waiting.get(key);
      if (w) { waiting.delete(key); w(a); } else answers.set(key, a);
      return json({ ok: true, delivered: !!w });
    }));
    return;
  }
  if (url.origin === self.location.origin && url.pathname.endsWith('/__stdin__/stats')) {
    event.respondWith(json({ heldTotal, retries, waiting: waiting.size, recentKeys, coi: COI, coep: COEP, hold: HOLD_MS }));
    return;
  }
  if (!COI) return;   // leave everything else to the network untouched
  const r = event.request;
  if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') return;
  const req = (COEP === 'credentialless' && r.mode === 'no-cors') ? new Request(r, { credentials: 'omit' }) : r;
  event.respondWith(fetch(req).then((res) => {
    if (res.status === 0) return res;
    const h = new Headers(res.headers);
    h.set('Cross-Origin-Embedder-Policy', COEP);
    if (COEP === 'require-corp') h.set('Cross-Origin-Resource-Policy', 'cross-origin');
    h.set('Cross-Origin-Opener-Policy', 'same-origin');
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
  }));
});
