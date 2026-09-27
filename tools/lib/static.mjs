// A static file server that behaves like GitHub Pages where it matters to this site: correct types
// (application/wasm), gzip, `Cache-Control: max-age=600`, ETag and Last-Modified with 304s. It serves the
// site straight from its sources, so nothing has to be rebuilt between edits:
//
//   /              web/
//   /lessons/      lessons/        (and /lessons/index.json, generated on each request)
//   /courses/      courses/
//   /_framework/   the engine's publish output (engine/out/wwwroot/_framework)
//
// or, with `site`, a built site/ folder as it is. Used by tools/serve.mjs, the tests and tools/check-lessons.mjs.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { buildIndex } from './lessons.mjs';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const frameworkDir = path.join(repoRoot, 'engine/out/wwwroot/_framework');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.wasm': 'application/wasm', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.md': 'text/markdown; charset=utf-8', '.yaml': 'text/yaml; charset=utf-8', '.yml': 'text/yaml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.dat': 'application/octet-stream', '.map': 'application/json',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.mjs', '.json', '.wasm', '.css', '.svg', '.md', '.yaml', '.yml', '.txt', '.dat', '.map']);

/**
 * @param {object} o
 * @param {string} [o.site]         serve this built folder instead of the sources
 * @param {string} [o.lessons]      the lessons folder (default lessons/)
 * @param {string} [o.courses]      the courses folder (default courses/)
 * @param {string} [o.framework]    the _framework folder (default: the engine's publish output)
 * @param {boolean} [o.isolate]     send COOP/COEP, as the service worker would (GitHub Pages can't)
 * @param {boolean} [o.quiet]
 */
export function createHandler(o = {}) {
  const mounts = o.site
    ? [['/', path.resolve(o.site)]]
    : [
        ['/_framework/', path.resolve(o.framework || frameworkDir)],
        ['/lessons/', path.resolve(o.lessons || path.join(repoRoot, 'lessons'))],
        ['/courses/', path.resolve(o.courses || path.join(repoRoot, 'courses'))],
        ['/', path.join(repoRoot, 'web')],
      ];
  const gzCache = new Map();
  const stats = { requests: 0, bytes: 0, notModified: 0, paths: [] };

  function resolve(urlPath) {
    for (const [prefix, dir] of mounts) {
      if (urlPath === prefix.slice(0, -1) || urlPath.startsWith(prefix)) {
        const rel = decodeURIComponent(urlPath.slice(prefix.length));
        const file = path.join(dir, rel);
        if (!file.startsWith(dir)) return null;
        return file;
      }
    }
    return null;
  }

  function handler(req, res) {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/__stats') { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(stats)); return; }
    if (url.pathname === '/__reset') { stats.requests = stats.bytes = stats.notModified = 0; stats.paths = []; res.end('ok'); return; }
    stats.requests++;
    stats.paths.push(url.pathname);
    if (o.isolate) {
      res.setHeader('cross-origin-opener-policy', 'same-origin');
      res.setHeader('cross-origin-embedder-policy', 'require-corp');
    }
    let body, type, mtime;
    if (!o.site && url.pathname === '/lessons/index.json') {
      try {
        body = Buffer.from(JSON.stringify(buildIndex({ lessonsDir: resolve('/lessons/'), coursesDir: resolve('/courses/') }).index, null, 1));
      } catch (e) {
        res.statusCode = 500; res.end(String(e.message)); return;
      }
      type = TYPES['.json']; mtime = new Date();
    } else {
      let file = resolve(url.pathname);
      if (file && fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        if (!url.pathname.endsWith('/')) { res.statusCode = 301; res.setHeader('location', url.pathname + '/' + url.search); res.end(); return; }
        file = path.join(file, 'index.html');
      }
      if (!file || !fs.existsSync(file)) { res.statusCode = 404; res.setHeader('content-type', 'text/plain'); res.end('404 not found'); return; }
      const st = fs.statSync(file);
      mtime = st.mtime;
      type = TYPES[path.extname(file)] || 'application/octet-stream';
      const etag = '"' + crypto.createHash('sha1').update(file + st.mtimeMs + st.size).digest('hex').slice(0, 16) + '"';
      res.setHeader('etag', etag);
      if (req.headers['if-none-match'] === etag) {
        stats.notModified++;
        res.statusCode = 304; res.setHeader('cache-control', 'max-age=600'); res.end(); return;
      }
      body = { file, st, ext: path.extname(file) };
    }
    res.setHeader('content-type', type);
    res.setHeader('cache-control', 'max-age=600');
    res.setHeader('last-modified', mtime.toUTCString());
    res.setHeader('vary', 'accept-encoding');
    const gzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    let data;
    if (Buffer.isBuffer(body)) {
      data = gzip ? zlib.gzipSync(body) : body;
    } else if (gzip && COMPRESSIBLE.has(body.ext)) {
      const key = body.file + ':' + body.st.mtimeMs;
      data = gzCache.get(key);
      if (!data) {
        data = fs.existsSync(body.file + '.gz') && fs.statSync(body.file + '.gz').mtimeMs >= body.st.mtimeMs
          ? fs.readFileSync(body.file + '.gz')
          : zlib.gzipSync(fs.readFileSync(body.file), { level: 6 });
        gzCache.set(key, data);
      }
    } else {
      data = fs.readFileSync(body.file);
    }
    if (gzip && (Buffer.isBuffer(body) || COMPRESSIBLE.has(body.ext))) res.setHeader('content-encoding', 'gzip');
    res.setHeader('content-length', data.length);
    stats.bytes += data.length;
    if (req.method === 'HEAD') { res.end(); return; }
    res.end(data);
  }
  return { handler, stats };
}

/** Starts a server on `port` (0: any free port). Resolves to { url, port, stats, close() }. */
export function startServer(options = {}, port = 0) {
  const { handler, stats } = createHandler(options);
  const server = http.createServer(handler);
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => {
      const p = server.address().port;
      resolve({ url: `http://localhost:${p}/`, port: p, stats, server, close: () => new Promise(r => { server.closeAllConnections?.(); server.close(() => r()); }) });
    });
  });
}
