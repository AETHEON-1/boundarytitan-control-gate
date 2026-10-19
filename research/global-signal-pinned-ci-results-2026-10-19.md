# GitHub Actions pinned-commit verification: observed execution 2026-10-19

State: YELLOW / FAILED CHECK / EVIDENCE CAPTURED
Target commit: 6589d5a9424f3a729805cd1c4d80176a009c8c31
Existing hosted workflow: https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39339420855
Job: https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39339420855/job/118356964497
Source of evidence: GitHub Actions job log retrieved through connected GitHub interface and preserved verbatim at `research/evidence/github-actions-39339420855-job-118356964497.log`.

## Important execution distinction
This record refers to an **existing GitHub Actions push-triggered workflow** at the pinned commit. The separately prepared `scripts/run-pinned-global-signal-verification.sh` was NOT itself invoked on GitHub Actions, and has no recorded execution at this time. Direct terminal cloning remained unavailable because the environment could not resolve github.com. No new workflow run was dispatched.

## Observed results from actual hosted runner
- Ubuntu hosted checkout: successful at exact pinned SHA, from job log.
- Node v20.20.2, npm 10.8.2.
- `npm ci`: completed with 286 packages added. npm reported **35 vulnerabilities: 3 moderate, 31 high, 1 critical**. This is installer advisory output, not confirmed runtime exploitability.
- `npm run typecheck`: PASS.
- `npm test -- --coverage=false`: PASS, 36 suites / 112 tests.
- `npm run test:python`: PASS, 3 tests.
- `npm run verify:state`: FAIL, exit code 1.
- Exact reported fault: `current manifest is missing tracked file: research/global-signal-adversarial-2026-10-19.md`.
- Overall job: FAILURE; no downloadable workflow artifact was found at inspection. The raw job log is preserved in this branch instead.

## Implementation-level disposition
**REPRODUCED REPOSITORY INTEGRITY FAILURE at this commit:** the tracked-tree manifest omitted an added research document; this is a real integrity-check failure. It does NOT demonstrate runtime authority bypass, unsafe deployment, or that the repository's other test suites are ineffective.

The pinned verifier code enumerates tracked files and compares each against `CURRENT-REPOSITORY-MANIFEST.json` by filename, byte length and SHA-256; on an omitted tracked file it fails. That is an intended detection control, not evidence that the verifier incorrectly passes. The process failure occurred *after a push*, so it does not establish that branch protection prevented admission of a bad manifest.

The dependency vulnerability count demands `npm audit --json` and lockfile-specific triage in a separately approved repair. Do not run `npm audit fix --force` or silently change dependencies; exploitability is UNKNOWN.

## Preservation and next gate
1. Preserve pinned-failure record; do not rewrite the pinned commit.
2. Create separate manifest-reconciliation candidate if needed, enumerating all tracked files added on the branch and updating digest bytes exactly; verify on GitHub runner before claiming repair.
3. Preserve previous October 19 manifest-failure investigation as independent historical evidence; do not conflate distinct branch failures.
4. No live consequence testing, merge, branch-protection modification, deployment, certification, or human disposition performed.

CAN ⊬ MAY. No ledger, no trust.
