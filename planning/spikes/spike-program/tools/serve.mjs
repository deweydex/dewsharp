// Tiny static server that behaves like GitHub Pages for our purposes:
// correct MIME types (application/wasm), gzip when the client accepts it (uses the SDK's .gz siblings),
// Cache-Control: max-age=600 and ETag/304 revalidation. Counts bytes sent per request for the harness.
// Usage: node tools/serve.mjs <root> [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(process.argv[2] || '.');
const port = +(process.argv[3] || 8765);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.wasm': 'application/wasm', '.json': 'application/json', '.dat': 'application/octet-stream',
  '.css': 'text/css', '.pdb': 'application/octet-stream' };
export const stats = { requests: 0, bytes: 0, notModified: 0 };

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/__stats') { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(stats)); return; }
  if (url.pathname === '/__reset') { stats.requests = stats.bytes = stats.notModified = 0; res.end('ok'); return; }
  let file = path.join(root, decodeURIComponent(url.pathname));
  if (!file.startsWith(root)) { res.statusCode = 403; res.end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) { res.statusCode = 404; res.end('not found'); return; }
  const st = fs.statSync(file);
  const etag = '"' + crypto.createHash('md5').update(file + st.mtimeMs + st.size).digest('hex') + '"';
  stats.requests++;
  res.setHeader('content-type', types[path.extname(file)] || 'application/octet-stream');
  res.setHeader('cache-control', 'max-age=600');
  res.setHeader('etag', etag);
  if (req.headers['if-none-match'] === etag) { stats.notModified++; res.statusCode = 304; res.end(); return; }
  let body = file;
  if (/\bgzip\b/.test(req.headers['accept-encoding'] || '') && fs.existsSync(file + '.gz')) {
    body = file + '.gz'; res.setHeader('content-encoding', 'gzip');
  }
  res.setHeader('vary', 'accept-encoding');
  const data = fs.readFileSync(body);
  stats.bytes += data.length;
  res.setHeader('content-length', data.length);
  res.end(data);
});
server.listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
