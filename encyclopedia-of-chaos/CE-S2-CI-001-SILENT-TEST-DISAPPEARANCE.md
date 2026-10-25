# Encyclopedia of Chaos | CE-S2-CI-001: Silent Test Disappearance

Recorded 2026-10-25. State: CORRECTIVE CHANGE COMMITTED; CI EXECUTION NOT YET VERIFIED.

## Defect
Before correction, package.json test:python executed test_agentic_handoff.py only, and .github/workflows/verify.yml did not invoke the BT-S2-AQE-001 and BT-S2-AQE-002 test files. Consequently, successful existing CI could be misread as evidence that these prototypes had been tested.

## Correction
Original workflow preserved verbatim at handoffs/ci-verify-workflow-pre-sigma2-2026-10-25.yml.
Added scripts/test-sigma2-inventory.py with explicit required file inventory and fail-closed subprocess execution of test_engine.py, test_novelty.py, test_simulator.py.
Appended an explicit Sigma-2 CI step to .github/workflows/verify.yml. Existing verification steps retained.

## Residual attack surface
- This is an inventory and test execution guard, not independent proof of test adequacy or completeness.
- An attacker who can edit the workflow and guard together can bypass both; branch protection and independently controlled required checks remain unverified.
- The runner checks that a test count is reported but does not pin the expected number or immutable fixture hashes.
- CI execution on the new commit has not been observed or authenticated.
- Existing repository-state manifest may require a separate, independently reviewed regeneration; do not treat manifest freshness as established.
- No real enforcement, field testing, or certification performed.

## Independent challenge
Delete or rename each required test file in a disposable checkout; verify guard exits nonzero. Replace tests with a zero-test module; verify guard exits nonzero. Make an assertion fail; verify guard exits nonzero. Verify normal suites run and compare the archived workflow against the corrected one. Independently inspect CI run IDs and logs.

## Disposition
CORRECTION PROPOSED IN PREPARATION BRANCH. Independent CI run and external review pending. No merge, deployment or publication authorized.
CAN ⊬ MAY.
