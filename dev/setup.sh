#!/usr/bin/env bash
# First-time setup for working on dewsharp (CLAUDE.md, "Running things"):
#   1. the .NET SDK that global.json names, installed into .dotnet/ (gitignored) unless it is there already;
#   2. the npm packages (npm ci);
#   3. Playwright's Chromium, for the tests and the lesson checker, unless the machine already has it.
# Run it again at any time: each step skips itself when it is already done.
# tools/build-engine.mjs finds the SDK in .dotnet/ by itself; for other dotnet commands, put it on PATH:
#   export PATH="$PWD/.dotnet:$PATH" DOTNET_ROOT="$PWD/.dotnet"
set -euo pipefail
cd "$(dirname "$0")/.."
root="$PWD"
export DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1

want=$(node -e 'console.log(JSON.parse(require("fs").readFileSync("global.json","utf8")).sdk.version)')
if [ -x "$root/.dotnet/dotnet" ] && "$root/.dotnet/dotnet" --list-sdks | grep -q "^${want} "; then
  echo "The .NET SDK $want is in .dotnet/."
else
  echo "Installing the .NET SDK $want into .dotnet/ ..."
  script="$(mktemp)"
  curl -sSL --retry 3 https://dot.net/v1/dotnet-install.sh -o "$script"
  bash "$script" --jsonfile "$root/global.json" --install-dir "$root/.dotnet" --no-path
  rm -f "$script"
fi

echo "Installing the npm packages ..."
npm ci

if node -e 'const fs=require("fs");process.exit(fs.existsSync(require("playwright").chromium.executablePath())?0:1)'; then
  echo "Playwright's Chromium is installed."
else
  echo "Installing Playwright's Chromium ..."
  npx playwright install chromium
fi

cat <<'DONE'

Ready. Next:
  npm run build          # the engine (about a minute the first time), then site/
  npm test               # parser, engine, checker and page tests in headless Chromium
  npm run check-lessons  # every cell of every lesson in lessons/
  npm run serve          # http://localhost:8080/
DONE
