#!/usr/bin/env bash
set -uo pipefail
PIN=6589d5a9424f3a729805cd1c4d80176a009c8c31
REPO=https://github.com/AETHEON-1/boundarytitan-control-gate.git
OUT=${1:-verification-output}
mkdir -p "$OUT"; OUT=$(cd "$OUT" && pwd)
printf 'pin=%s\nstarted_utc=%s\n' "$PIN" "$(date -u +%FT%TZ)" > "$OUT/metadata.txt"
git clone "$REPO" "$OUT/checkout" > "$OUT/clone.log" 2>&1 || { echo 'BLOCKED: clone failed' | tee "$OUT/status.txt"; exit 2; }
cd "$OUT/checkout" || exit 2
git checkout --detach "$PIN" > "$OUT/checkout.log" 2>&1 || exit 2
[ "$(git rev-parse HEAD)" = "$PIN" ] || { echo 'FAIL: SHA mismatch' | tee "$OUT/status.txt"; exit 3; }
node -v >> "$OUT/metadata.txt"; npm -v >> "$OUT/metadata.txt"; python3 --version >> "$OUT/metadata.txt"
npm ci > "$OUT/npm-ci.log" 2>&1; rc=$?
echo "npm_ci=$rc" > "$OUT/status.txt"
[ "$rc" -eq 0 ] || exit "$rc"
for name in typecheck jest python state; do
 case "$name" in
 typecheck) cmd='npm run typecheck';;
 jest) cmd='npm test';;
 python) cmd='npm run test:python';;
 state) cmd='npm run verify:state';;
 esac
 bash -c "$cmd" > "$OUT/$name.log" 2>&1; rc=$?
 echo "$name=$rc" | tee -a "$OUT/status.txt"
done
