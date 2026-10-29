# Maintenance sentinel: execution and failure ledger
Date: 2026-10-29 | Review PR: #122 | State: EXECUTION IN PROGRESS / NOT ACCEPTED

## Test infrastructure
The executable container could not clone the repository: `fatal: unable to access ... Could not resolve host: github.com`. This is a local execution environment blocker, not evidence of GitHub repository failure.

Opened draft PR #122 to invoke GitHub Actions without merging. Initial run ID `40825684985` was observed `in_progress`; checkout and setup had begun. The initial workflow did **not** include the new sentinel tests, so it cannot validate them. Subsequently updated `.github/workflows/verify.yml` on the review branch (commit `30e130cf95cae0b8d6da6fdfd1c3ec7e225f69c9`) to run five Python negative controls and the sentinel before existing repository verification. The new run and its exact results must be collected separately.

## Identified failures and defects
- **F01 CONFIRMED BY TREE DIFF:** The branch adds five maintenance files and modifies one workflow but does not update `CURRENT-REPOSITORY-MANIFEST.json`. Both existing `verify:state` and the new sentinel should reject this mismatch. This is expected fail-closed behavior, not a successful integration.
- **F02 CONFIRMED BY CODE REVIEW:** The sentinel is not independently controlled. A contributor able to edit workflow, sentinel, and manifest can weaken them together. Local passing checks cannot establish branch protection.
- **F03 CONFIRMED BY CODE REVIEW:** The sentinel does not validate the manifest's `machine_certification` or `deployment_authority` metadata; existing verifier checks those. Do not replace the original verifier.
- **F04 CONFIRMED BY CODE REVIEW:** The sentinel checks file presence and hashes but does not prove that a scheduled workflow ran, that artifacts were delivered, or that failures were preserved outside the repo.
- **F05 CONFIRMED BY CODE REVIEW:** The negative controls use synthetic fixtures. They do not exercise the entire real repository or simulate compromised GitHub Actions.
- **F06 NOT TESTED:** Test execution on the new CI commit, independent reproduction, full source-to-manifest byte reconciliation, and protected-branch enforcement.

## Required functional repair
1. Capture complete CI logs and exit codes for the updated workflow; retain failures.
2. Correct code defects revealed by negative-control execution, if any, with explicit failing fixture before repair.
3. Regenerate the tracked-tree manifest using the existing repository generator on the exact branch HEAD in a clean checkout. Review its diff; never silently regenerate on CI.
4. Re-run tests and both verifiers. Record head SHA, results and raw logs.
5. Test absence detection with a separate, independently controlled check-run history monitor; don't infer from this script.
6. Confirm branch protection and required checks using GitHub repository settings, with human owner approval for any settings change.
7. Obtain independent reviewer challenge and explicit human merge decision.

## Custody and authority
No merge, deletion, deployment, publication, frozen-doctrine revision or claim of independent validation. All failures remain open until verified repair receipts exist.
CAN ⊬ MAY.
