# CI execution receipt: confirmed negative controls and fail-closed manifest drift
Date: 2026-10-29 | Draft PR #122 | GitHub Actions run 40825711636 | job 123288155217 | source commit 30e130cf95cae0b8d6da6fdfd1c3ec7e225f69c9

## Observed results (provider CI log)
- Checkout: PASS
- npm dependency installation: PASS
- TypeScript typecheck: PASS
- Jest: **36 suites, 112 tests PASS**
- Existing Python handoff tests: **3 PASS**
- New maintenance negative-control tests: **5 PASS** (valid fixture; missing check; mutated bytes; missing manifest entry; duplicate entry).
- Maintenance sentinel on full checked-out tree: **FAIL, exit code 1**, as designed.
- Original `npm run verify:state`: **SKIPPED** because preceding sentinel failed; it was NOT independently executed in this run.

## Exact sentinel failures
1. `SIZE_MISMATCH`: `.github/workflows/verify.yml`
2. `HASH_MISMATCH`: `.github/workflows/verify.yml`
3. `UNMANIFESTED_FILE`: `maintenance/BRANCH-LIFECYCLE.md`
4. `UNMANIFESTED_FILE`: `maintenance/MAINTENANCE-PLAN-2026-10-29.md`
5. `UNMANIFESTED_FILE`: `maintenance/MAINTENANCE-QUEUE.json`
6. `UNMANIFESTED_FILE`: `maintenance/integrity_sentinel.py`
7. `UNMANIFESTED_FILE`: `maintenance/tests/test_integrity_sentinel.py`

The branch was intentionally not allowed to pass with a stale manifest. This is a successful *detection*, not a successful repository acceptance. Later commits including this receipt create additional unmanifested paths until the final manifest is reconciled.

## Required minimal repair path
1. In a clean checkout of the **final** branch head, run `node scripts/verify-repository-state.js --write` after all code/docs changes. Preserve old manifest and diff. Do not use `--write` inside CI.
2. Commit the generated `CURRENT-REPOSITORY-MANIFEST.json` once; do not modify tracked files afterward except for a separately reconciled update.
3. Re-run PR CI and confirm all steps, including sentinel and original `verify:state`, pass. Preserve exact run URL, head SHA, and raw logs.
4. Independently compare tracked-tree file inventory and SHA-256 to manifest, including duplicate and symlink negative controls.
5. Review GitHub required checks and branch protection separately; a green CI badge alone is not enforcement.

## Known limits
These tests do not establish independently controlled checker custody, missing-run detection, runtime authority, or production safety. The user need not troubleshoot CI manually: draft PR retains the failure and instructions. No merge or release approved.

Source: https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/40825711636
