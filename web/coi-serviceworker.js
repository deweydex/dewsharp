/*! dewsharp's service worker. Based on coi-serviceworker 0.1.7 (MIT, Guido Zuidhof and contributors,
 *  https://github.com/gzuidhof/coi-serviceworker), which dewlab also uses; rewritten to do two jobs.
 *
 *  1. Cross-origin isolation. GitHub Pages can't send COOP/COEP headers, so this worker adds
 *     `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp` to every
 *     response. The page is then crossOriginIsolated, which gives it SharedArrayBuffer: live
 *     Console.ReadLine and a Stop that doesn't need a restart (DECISIONS.md #5). It always uses require-corp,
 *     never credentialless: coi-serviceworker would send credentialless to Safari, which isn't known to
 *     support it (planning/evidence/synthesis.md, "Isolation").
 *  2. The runtime, cache-first. Files in _framework/ whose names carry a fingerprint (Name.abc123xyz9.wasm)
 *     never change, so they come from this worker's cache without asking the network. A redeploy then costs a
 *     learner only the files that really changed, not 15 MB (planning/evidence/correctness.md, item 1).
 *     dotnet.js has no fingerprint and lists all the others, so it always goes to the network (revalidated),
 *     and each time it arrives the cache drops the files it no longer lists.
 *
 *  The same file is loaded by the page (<script src="coi-serviceworker.js">) to register itself, and runs as
 *  the service worker. Add ?sw=off to a page's address to skip it (the tests do, when the server sends the
 *  headers itself). docs/ARCHITECTURE.md, "The service worker", has more.
 */
const CACHE = 'dewsharp-framework-v1';
const FINGERPRINTED = /\.[a-z0-9]{10}\.(wasm|js|dat|pdb|json)$/;

if (typeof window === 'undefined') {
  // ----- service worker side -----
  const frameworkPath = new URL('_framework/', self.registration.scope).pathname;

  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

  const isolate = (response) => {
    if (response.status === 0) return response;   // opaque: its headers can't be changed
    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Resource-Policy', 'cross-origin');
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  };

  async function cacheFirst(request) {
    const cache = await caches.open(CACHE);
    const key = request.url.split('?')[0];
    const hit = await cache.match(key);
    if (hit) return isolate(hit);
    const response = await fetch(request);
    if (response.ok) await cache.put(key, response.clone());
    return isolate(response);
  }

  async function prune(dotnetJs) {
    const text = await dotnetJs.text();
    const listed = new Set(text.match(/[\w.-]+\.[a-z0-9]{10}\.(?:wasm|js|dat|pdb|json)/g) || []);
    if (listed.size === 0) return;
    const cache = await caches.open(CACHE);
    for (const request of await cache.keys()) {
      const name = new URL(request.url).pathname.split('/').pop();
      if (!listed.has(name)) await cache.delete(request);
    }
  }

  self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;
    const url = new URL(request.url);
    if (request.method === 'GET' && url.origin === self.location.origin && url.pathname.startsWith(frameworkPath)) {
      if (FINGERPRINTED.test(url.pathname)) {
        event.respondWith(cacheFirst(request).catch(() => fetch(request).then(isolate)));
        return;
      }
      if (url.pathname.endsWith('/dotnet.js')) {
        event.respondWith(fetch(request, { cache: 'no-cache' }).then((response) => {
          if (response.ok) event.waitUntil(prune(response.clone()).catch(() => {}));
          return isolate(response);
        }));
        return;
      }
    }
    event.respondWith(fetch(request).then(isolate).catch((e) => { console.error(e); throw e; }));
  });
} else {
  // ----- page side: register, then reload once so that the page itself comes through the worker -----
  (() => {
    const KEY = 'dewsharp:coi-reloaded';
    let off = false;
    try { off = new URLSearchParams(window.location.search).get('sw') === 'off'; } catch { }
    if (off || !window.isSecureContext || !('serviceWorker' in navigator)) return;
    const script = document.currentScript?.src;
    if (!script) return;
    let store = null;
    try { store = window.sessionStorage; } catch { }
    navigator.serviceWorker.register(script).then((registration) => {
      registration.addEventListener('updatefound', () => {
        // A new version of this worker: reload once it is in charge, so its headers apply.
        const installing = registration.installing;
        installing?.addEventListener('statechange', () => {
          if (installing.state === 'activated' && !window.crossOriginIsolated && !store?.getItem(KEY)) {
            store?.setItem(KEY, '1');
            window.location.reload();
          }
        });
      });
      if (registration.active && !navigator.serviceWorker.controller && !store?.getItem(KEY)) {
        store?.setItem(KEY, '1');
        window.location.reload();
      } else if (window.crossOriginIsolated) {
        store?.removeItem(KEY);
      }
    }, (err) => console.error('dewsharp: the service worker could not be registered.', err));
  })();
}
