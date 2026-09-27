// Static server for the input spike. Like GitHub Pages (application/wasm, gzip siblings, max-age=600),
// plus switches for the isolation experiments.
//   node tools/serve2.mjs <wwwroot> <port> [--headers=all|csharp|none] [--root-coi]
// Layout:  /csharp/...        the C# app (wwwroot)
//          /                  a plain "rest of the site" page (outside.html) with a same-origin image
//          /coi-serviceworker.js  only with --root-coi (mimics dewlab: shim at the site root, scope /)
// A second origin on <port+1> (127.0.0.1 instead of localhost) serves cross-origin test resources:
//          /img.png (no CORP)  /img-corp.png (CORP: cross-origin)  /frame.html (no COEP)
//          /frame-coep.html (COEP: require-corp + CORP)  /data.json (CORS *)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve(process.argv[2]);
const port = +(process.argv[3] || 8900);
const flags = Object.fromEntries(process.argv.slice(4).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const headersMode = flags.headers || 'none';
const coiSrc = path.join(root, 'coi-serviceworker.js');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.wasm': 'application/wasm', '.json': 'application/json', '.dat': 'application/octet-stream', '.png': 'image/png',
  '.css': 'text/css', '.pdb': 'application/octet-stream' };
// 1x1 PNG
const PNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==', 'base64');
const X = `http://127.0.0.1:${port + 1}`;
const outside = (coi) => `<!doctype html><html><head><meta charset="utf-8"><title>Rest of the site</title>
${coi ? '<script src="/coi-serviceworker.js"></script>' : ''}</head><body><h1>Python page stand-in</h1>
<img id="same" src="/pixel.png"><img id="cross" src="${X}/img.png"></body></html>`;
export const stats = { requests: 0, bytes: 0 };

function isolationHeaders(res, p) {
  if (headersMode === 'all' || (headersMode === 'csharp' && p.startsWith('/csharp/'))) {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', flags.coep || 'require-corp');
  }
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x'); const p = decodeURIComponent(url.pathname);
  stats.requests++;
  if (p === '/__stats') { res.end(JSON.stringify(stats)); return; }
  isolationHeaders(res, p);
  res.setHeader('cache-control', 'max-age=600');
  if (p === '/matrix.html' || p === '/csharp/matrix.html') {
    // What still loads on an isolated page? ?coi=1 adds the coi-serviceworker script (relative), ?cl=1 asks
    // it for COEP: credentialless.
    const q = url.searchParams;
    res.setHeader('content-type', types['.html']);
    res.end(`<!doctype html><html><head><meta charset="utf-8"><title>COEP matrix</title>
${q.get('cl') ? '<script>window.coi={coepCredentialless:()=>true}</script>' : ''}
${q.get('coi') ? '<script src="coi-serviceworker.js"></script>' : ''}</head><body>
<img id="img-nocorp" src="${X}/img.png"><img id="img-corp" src="${X}/img-corp.png">
<img id="img-ytthumb" src="${X}/thumb-yt.png">
<iframe id="fr-nocoep" src="${X}/frame.html"></iframe><iframe id="fr-coep" src="${X}/frame-coep.html"></iframe>
<iframe id="fr-credentialless-attr" credentialless src="${X}/frame.html"></iframe>
<iframe id="fr-youtube" src="${X}/frame-yt.html"></iframe>
<iframe id="fr-youtube-cl" credentialless src="${X}/frame-yt.html"></iframe>
<script>
window.frameMsgs=[]; addEventListener('message', e => { if (!e.data || !e.data.frame) return; for (const f of document.querySelectorAll('iframe')) if (f.contentWindow === e.source) frameMsgs.push(f.id); });
window.corsFetch = fetch('${X}/data.json').then(r => r.json()).then(j => 'ok', e => 'blocked: ' + e.message);
</script></body></html>`);
    return;
  }
  if (p === '/' || p === '/index.html') { res.setHeader('content-type', types['.html']); res.end(outside(!!flags['root-coi'])); return; }
  if (p === '/pixel.png') { res.setHeader('content-type', 'image/png'); res.end(PNG); return; }
  if (p === '/coi-serviceworker.js' && flags['root-coi']) { res.setHeader('content-type', types['.js']); res.end(fs.readFileSync(coiSrc)); return; }
  if (!p.startsWith('/csharp/')) { res.statusCode = 404; res.end('not found'); return; }
  let file = path.join(root, p.slice('/csharp'.length));
  if (!file.startsWith(root)) { res.statusCode = 403; res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.statusCode = 404; res.end('not found'); return; }
  res.setHeader('content-type', types[path.extname(file)] || 'application/octet-stream');
  let body = file;
  if (/\bgzip\b/.test(req.headers['accept-encoding'] || '') && fs.existsSync(file + '.gz')) { body = file + '.gz'; res.setHeader('content-encoding', 'gzip'); }
  const data = fs.readFileSync(body); stats.bytes += data.length;
  res.setHeader('content-length', data.length); res.end(data);
}).listen(port, () => console.log(`main on http://localhost:${port}/ headers=${headersMode}`));

http.createServer((req, res) => {
  const p = new URL(req.url, 'http://x').pathname;
  if (p === '/img.png') { res.setHeader('content-type', 'image/png'); res.end(PNG); return; }
  // Headers copied from real responses (curl -I, 2026-09-27): i.ytimg.com thumbnails send CORP cross-origin
  // and ACAO *; youtube.com/embed sends CORP cross-origin but COEP and COOP only as *-Report-Only.
  if (p === '/thumb-yt.png') { res.setHeader('content-type', 'image/png'); res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); res.setHeader('access-control-allow-origin', '*'); res.end(PNG); return; }
  if (p === '/frame-yt.html') {
    res.setHeader('content-type', types['.html']); res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Embedder-Policy-Report-Only', 'require-corp'); res.setHeader('Cross-Origin-Opener-Policy-Report-Only', 'same-origin');
    res.end('<!doctype html><title>yt-like</title><p id=f>youtube-like frame</p><script>parent.postMessage({frame:location.pathname},"*")</script>'); return;
  }
  if (p === '/img-corp.png') { res.setHeader('content-type', 'image/png'); res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); res.end(PNG); return; }
  if (p === '/data.json') { res.setHeader('access-control-allow-origin', '*'); res.setHeader('content-type', 'application/json'); res.end('{"ok":true}'); return; }
  if (p === '/frame.html' || p === '/frame-coep.html') {
    res.setHeader('content-type', types['.html']);
    if (p === '/frame-coep.html') { res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp'); res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); }
    res.end('<!doctype html><title>frame</title><p id=f>frame loaded</p><script>parent.postMessage({frame:location.pathname},"*")</script>'); return;
  }
  res.statusCode = 404; res.end();
}).listen(port + 1, () => console.log(`cross-origin on ${X}/`));
