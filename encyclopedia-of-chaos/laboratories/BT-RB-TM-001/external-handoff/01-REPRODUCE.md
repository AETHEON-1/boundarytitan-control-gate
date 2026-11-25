# R05 | Minimal specialist reproduction

## Immutable reference set

Repository: https://github.com/AETHEON-1/boundarytitan-control-gate

| Object | Exact reference |
|---|---|
| Review target (candidate branch, not main) | `d345403993ee587c227d6dbff05ae9398282e4a5` |
| Candidate Git tree | `069542aab5c33af540ae20a0cd5989701c1291ef` |
| Reconciled current manifest blob | `f153096c4c624cf060f71c91f70d4602ea7b5bd4` |
| Original experiment placement | `2d5c5fe135ba5f6c91d28642926e364276904a90` |
| Original preparation placement | `05bb5292ccab3068719fc8dab809e0abd442c21a` |
| Earlier main baseline (historical) | `f15f4d15597f76878a8059d81d8c358bd1d22358` |
| Historical manifest commit | `5af0235fb51d4f1d64bbd4eef79964b8fd29150c` |
| Historical manifest blob | `42ff284836dd4909578616d914b3d69a90d64fa4` |
| Trailmark v0.9.0 | `4b4818384725c6b7b86c9ee31f11fc84711ab4c7` |

Pinned review: https://github.com/AETHEON-1/boundarytitan-control-gate/tree/d345403993ee587c227d6dbff05ae9398282e4a5/encyclopedia-of-chaos/laboratories/BT-RB-TM-001

Sources: `REVIEW.md`, `continuation/REVIEW.md`, both SHA256SUMS files, `scripts/verify-repository-state.js`, and `research/candidates/2026-11-25-trailmark-falsification-plan-v0.1.md` at the review target were inspected for this packet. Preserve earlier documents as historical, including their superseded lower-bound counts and pre-placement wording.

## A. Acquisition and ledger (H06)

Proposed commands, not newly executed here. Use a reviewer-owned disposable POSIX environment. Network acquisition is a separate, approved step; disconnect after obtaining the exact source and tools. Inspect the code before executing it. No tokens or sensitive credentials. Record OS, tool versions, source URL, acquisition time, commit signature status (do not assume signed), checkout path and custodian. Disable line-ending conversion; if checkout filters are present, inspect and account for them. Do not repair original files in place.

```sh
git -c core.autocrlf=false clone --no-checkout https://github.com/AETHEON-1/boundarytitan-control-gate.git bt-review
cd bt-review
git -c core.autocrlf=false checkout --detach d345403993ee587c227d6dbff05ae9398282e4a5
git rev-parse HEAD HEAD^{tree}
git status --porcelain=v1 --untracked-files=all
git hash-object CURRENT-REPOSITORY-MANIFEST.json
node --version
npm --version
python3 --version
# inspect scripts/verify-repository-state.js and package.json first
npm run verify:state
```

Expect 360 ledger entries excluding the manifest, 360 unique paths. The previous remote comparison found all 313 old file blob identities and sizes unchanged and freshly hashed 40 missing paths; seven continuation artifacts were then registered. That is not a local fresh rehash of all 360. The verifier uses tracked and non-ignored untracked files; keep outputs outside checkout, and do not use `--write`. `npm run verify:state` invokes a Node built-in-only script; no npm dependency installation is needed. Independently confirm the tracked-byte inventory as well, without relying on that script:

```sh
python3 -I -B - <<'PY'
import hashlib, json, pathlib, subprocess
p = pathlib.Path('CURRENT-REPOSITORY-MANIFEST.json')
m = json.loads(p.read_bytes()); rows = m['files']
paths = subprocess.check_output(['git','ls-files','-z','--cached']).split(b'\0')
paths = [x.decode('utf-8') for x in paths if x and x.decode('utf-8') != str(p)]
assert len(paths) == len(set(paths)) == len(rows) == len({r['path'] for r in rows}) == 360
assert set(paths) == {r['path'] for r in rows}
errors = []
for r in rows:
    f = pathlib.Path(r['path'])
    if not f.is_file() or f.is_symlink():
        errors.append((r['path'], 'not a regular file')); continue
    b = f.read_bytes()
    if len(b) != r['size_bytes'] or hashlib.sha256(b).hexdigest() != r['sha256']:
        errors.append((r['path'], 'size or digest mismatch'))
print(json.dumps({'entries':len(rows),'errors':errors}, indent=2))
raise SystemExit(bool(errors))
PY
```

Preserve stdout, stderr, exit status, checkout status and all discrepancies in reviewer custody. A digest match is byte agreement, not authenticity or permission. A failed comparison is not repaired by regenerating the expected manifest. If the checkout does not match the pinned commit/tree, stop and preserve the failure.

## B. Known-answer replay (H03/H04/H06)

Python 3.13.5 was previously reported; use it for exact byte comparison when available. No third-party packages needed. This is public replay material, not blinded evaluation. Preserve original files and failed transcription. From repository root, after inspection and execution admission:

```sh
OUT=$(mktemp -d "${TMPDIR:-/tmp}/bt-tm-review.XXXXXX")
export OUT
cd encyclopedia-of-chaos/laboratories/BT-RB-TM-001
sha256sum -c SHA256SUMS
python3 -I -B specimen/recovery_lab.py --output "$OUT/reproduced.json"
cmp reproduced.json "$OUT/reproduced.json"
python3 -I -B compare.py > "$OUT/comparison.json"
cmp comparison.json "$OUT/comparison.json"
# Preserve different source bytes and compare their output separately.
sha256sum specimen/recovery_lab.py first-transcription.py
python3 -I -B first-transcription.py --output "$OUT/first-transcription-replay.json"
cmp reproduced.json "$OUT/first-transcription-replay.json"
cd continuation
sha256sum -c SHA256SUMS
python3 -I -B shared_observation.py > "$OUT/replay-observation.json"
cmp observation-receipt.json "$OUT/replay-observation.json"
python3 -I -B oracle_probe.py > "$OUT/replay-oracle.json"
cmp oracle-receipt.json "$OUT/replay-oracle.json"
sha256sum "$OUT"/*.json
```

If portability requires an alternate hash tool, record it. Run commands individually or capture every exit status and stderr; `cmp` silence is not a receipt by itself. Store output outside the checkout. If any comparison fails, preserve both versions, investigate environment/serialization differences without overwriting evidence.

### Published expected results (do not distribute to blind evaluators before lock)

- Recovery: 19/19 machine-authored fixture matches; 12 modeled violations and 7 without modeled violation. Source SHA-256 `fa2dc947f826ba2c2d123e28d44c9b251504515ea1a0bc8da338805dd0ae5a16`; receipt `fa86f67eadc5790ae698755ee58d6711fd2f6eeeb62d289b5ed984e274a5db05`.
- First transcription SHA-256 `97214ca876982442573aba78c2e596f88e6cc5f06df495ce0daed6da1a2e2b76` differs while output matched. It was a local line-wrap mistake, not repository corruption.
- AST baseline: 77 call expressions; four configurations, same source; restart pairs have identical unordered same-file runtime call pairs with different simulated outcomes. Not a resolved graph or Trailmark output.
- Observation battery: 16 configurations. Shared count and membership detectors each TP=4/TN=4/FP=0/FN=8; separate modeled channel 6/4/0/6; combined 8/4/0/4. Four intact-channel cases combined 3/1/0/0. Constructed functional equivalence; false positives excluded by design.
- Oracle: commit-time errors 2/7; observation-time errors 3/7. Both fail omitted and phantom effects; observation time additionally mislabels a late report of a pre-STOP commit. Binary classification does not test duplicate-count integrity.

## C. Trailmark execution (H03/H08) — NOT TESTED

Upstream: https://github.com/trailofbits/trailmark/tree/4b4818384725c6b7b86c9ee31f11fc84711ab4c7 . The previous acquisition and recheck failed DNS; no executable acquired. Do not substitute the AST baseline for a Trailmark result. Acquire exact release wheel/source, resolved dependency wheels, required grammar cache and applicable licenses under separately controlled custody. Record version/platform/ABI, retrieval URL and SHA-256 of every artifact; compare to upstream metadata where available, and retain unresolved provenance. Pin exact versions and hashes, not only ranges. Inspect install hooks/native builds and network behavior. Verify package/grammar cache in offline environment before enabling execution. No unpinned install, no credentials or uncontrolled network. The lockfile was only partially inspected in prior work; full supply-chain audit remains open.

After reviewer verifies release-supported flags and receives execution admission, run from laboratory root (with external OUT set):

```sh
trailmark --version
trailmark analyze --summary --json --language python specimen > "$OUT/trailmark-summary.json"
trailmark analyze --language python --resolution specimen > "$OUT/trailmark-resolution.txt"
trailmark analyze --language python specimen > "$OUT/trailmark-graph.json"
```

Record stderr/exit statuses, graph schema, parser diagnostics, excluded files, unresolved calls and manually supplied external links distinct from extracted edges. Zero unresolved calls does not establish all code paths were extracted. A formal syntax graph does not establish verifier results or runtime dispatch. Compare only against preregistered in-scope claims and independent labels; if unavailable, mark NOT TESTED/INDETERMINATE. Do not interpret a graph as a brake, permission or operational safety receipt.
