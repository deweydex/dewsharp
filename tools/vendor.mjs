#!/usr/bin/env node
// npm run vendor — copies the third-party browser modules the site serves from node_modules/ into
// web/vendor/, where both the browser and Node import them (web/lesson/parse.js imports js-yaml from there).
// The copies are committed, so the site needs no bundler. `--check` fails if a copy differs from what this
// script would write (the tests run it). Bump a version in package.json, run `npm ci && npm run vendor`,
// and commit web/vendor/ in the same change.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { repoRoot } from './lib/static.mjs';

const require = createRequire(import.meta.url);
const VENDOR = [
  { name: 'js-yaml', from: 'dist/js-yaml.mjs', to: 'web/vendor/js-yaml.mjs', license: 'LICENSE' },
];

export function vendored() {
  return VENDOR.map(v => {
    const dir = path.dirname(require.resolve(`${v.name}/package.json`));
    const { version } = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    const license = fs.readFileSync(path.join(dir, v.license), 'utf8').trim();
    const body = fs.readFileSync(path.join(dir, v.from), 'utf8').replace(/\n\/\/# sourceMappingURL=.*\s*$/, '\n');
    const header = `/*! ${v.name} ${version}, copied from node_modules/${v.name}/${v.from} by tools/vendor.mjs. Do not edit.\n${license.split('\n').map(l => ' * ' + l).join('\n').replace(/ +$/gm, '')}\n */\n`;
    return { file: path.join(repoRoot, v.to), text: header + body };
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const check = process.argv.includes('--check');
  let stale = 0;
  for (const { file, text } of vendored()) {
    const rel = path.relative(repoRoot, file);
    if (check) {
      if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text) { console.error(`${rel} is not what npm run vendor writes. Run it and commit the result.`); stale++; }
    } else {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, text);
      console.log(`wrote ${rel}`);
    }
  }
  process.exit(stale ? 1 : 0);
}
