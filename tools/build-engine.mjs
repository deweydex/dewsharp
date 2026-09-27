#!/usr/bin/env node
// npm run build:engine — publishes the C# engine (engine/Dewsharp.Browser) with the .NET SDK named in
// global.json. The output is engine/out/wwwroot/_framework/, which tools/serve.mjs serves as /_framework/ and
// tools/build-site.mjs copies into site/. docs/ARCHITECTURE.md, "The build", has more.
//
// The SDK is looked for in $DOTNET, then .dotnet/ (where dev/setup.sh installs it), then on PATH.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot, frameworkDir } from './lib/static.mjs';

export function findDotnet() {
  const candidates = [process.env.DOTNET, path.join(repoRoot, '.dotnet', 'dotnet')].filter(Boolean);
  for (const c of candidates) if (fs.existsSync(c)) return c;
  return 'dotnet';
}

function main() {
  const dotnet = findDotnet();
  const env = { ...process.env, DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1' };
  if (dotnet !== 'dotnet') env.DOTNET_ROOT = path.dirname(dotnet);
  const out = path.join(repoRoot, 'engine', 'out');
  // Every publish writes new fingerprinted names; clear the old ones so that nothing stale is served or deployed.
  fs.rmSync(frameworkDir, { recursive: true, force: true });
  const t0 = Date.now();
  const r = spawnSync(dotnet, ['publish', path.join(repoRoot, 'engine', 'Dewsharp.Browser'), '-c', 'Release', '-o', out, '--nologo'],
    { stdio: 'inherit', env, cwd: repoRoot });
  if (r.error) {
    console.error(`Could not run ${dotnet}: ${r.error.message}\nInstall the SDK with dev/setup.sh, or set DOTNET to the dotnet executable.`);
    process.exit(1);
  }
  if (r.status !== 0) process.exit(r.status ?? 1);
  if (!fs.existsSync(path.join(frameworkDir, 'dotnet.js'))) {
    console.error(`The publish finished, but ${path.relative(repoRoot, frameworkDir)}/dotnet.js is missing.`);
    process.exit(1);
  }
  const files = fs.readdirSync(frameworkDir).filter(f => !/\.(gz|br)$/.test(f));
  const bytes = files.reduce((n, f) => n + fs.statSync(path.join(frameworkDir, f)).size, 0);
  console.log(`engine: ${files.length} files, ${(bytes / 1e6).toFixed(2)} MB in ${path.relative(repoRoot, frameworkDir)} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
