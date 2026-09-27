#!/bin/bash
# Usage: tools/publish.sh <variant-name> [extra msbuild -p: args...]
set -e
S=/tmp/claude-0/-home-user/3a050fbb-a14a-5c05-b15a-309e2af64028/scratchpad
export PATH=$S/dotnet:$PATH DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1 DOTNET_ROOT=$S/dotnet
cd "$(dirname "$0")/.."
name=$1; shift
rm -rf out/$name CsRunner/obj/Release CsRunner/bin/Release
start=$(date +%s)
dotnet publish CsRunner -c Release -o out/$name "$@" 2>&1 | grep -E " error |error [A-Z]|->" | grep -v CA1416 || true
echo "publish took $(( $(date +%s) - start )) s"
python3 tools/sizes.py out/$name/wwwroot
