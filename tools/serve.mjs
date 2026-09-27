#!/usr/bin/env node
// npm run serve — the site, served straight from its sources, so that nothing is rebuilt between edits and
// several people (or agents) can work at once:
//
//   /              web/
//   /lessons/      lessons/        (/lessons/index.json is generated on each request)
//   /courses/      courses/
//   /_framework/   the engine's publish output (npm run build:engine)
//
// It behaves like GitHub Pages where it matters: application/wasm, gzip, `Cache-Control: max-age=600`,
// ETags and 304s, and no COOP/COEP headers (the service worker, web/coi-serviceworker.js, isolates the page,
// as it must on Pages).
//
//   node tools/serve.mjs [--port 8080] [--isolate] [--site [dir]] [--lessons dir] [--courses dir]
//
//   --isolate   send COOP/COEP from the server (then the page is isolated without the service worker)
//   --site      serve a built site/ (npm run build) instead of the sources
import path from 'node:path';
import fs from 'node:fs';
import { startServer, repoRoot, frameworkDir } from './lib/static.mjs';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const k = args.indexOf(name);
  if (k < 0) return fallback;
  const next = args[k + 1];
  return next && !next.startsWith('--') ? next : true;
};
const port = Number(option('--port', process.env.PORT || 8080));
const site = option('--site', null);
const opts = {
  isolate: !!option('--isolate', false),
  site: site ? path.resolve(site === true ? path.join(repoRoot, 'site') : site) : undefined,
  lessons: option('--lessons', undefined),
  courses: option('--courses', undefined),
};
if (!opts.site && !fs.existsSync(path.join(frameworkDir, 'dotnet.js')))
  console.warn(`No engine build in ${path.relative(repoRoot, frameworkDir)}: pages will say C# is unavailable. Run npm run build:engine.`);
if (opts.site && !fs.existsSync(opts.site)) { console.error(`${opts.site} does not exist. Run npm run build first.`); process.exit(1); }

const srv = await startServer(opts, port);
console.log(`dewsharp: ${srv.url}  (${opts.site ? 'serving ' + path.relative(repoRoot, opts.site) : 'serving the sources'}${opts.isolate ? ', with COOP/COEP' : ''})`);
console.log(`  engine dev page: ${srv.url}dev.html   device check: ${srv.url}check.html`);
