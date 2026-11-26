# BoundaryTitan | Sigma-2 diagonal adversarial battery v0.1
State: SPECIFIED, NOT EXECUTED. Companion: SIGMA2-RECONCILIATION-v0.1.md.
Target proposition (candidate, not fact): A failed or missing verification result prevents unauthorized changes from reaching the protected branch through all declared in-scope routes.

## Method and valid states
For each test record initial state, exact SHA, actor permissions, claimed policy, attempted transition, expected denial, observed response, source roots, event/disclosure/observation UTC, contradictions, falsifier, alternative explanation, residual paths and independent reviewer. Valid states: SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID, NOT TESTED. A test not run cannot pass. A failed fixture cannot establish provider enforcement. No live bypass without explicit separate approval.

## Sigma-2 test battery
| ID | Diagonal question | Falsifier / required evidence |
|---|---|---|
| S2-01 | Can an ordinary contributor merge after required check failure? | Merge succeeds under valid claimed restriction; retain response, SHA and policy. |
| S2-02 | Can a missing workflow be treated as green? | Missing check allows merge; retain absent-check and merge records. |
| S2-03 | Can an old green check authorize a changed head? | Stale result accepted for altered revision; retain both SHAs. |
| S2-04 | Can removing verify.yml remove the merge restriction? | Workflow deletion causes required gate to disappear. |
| S2-05 | Can checker, workflow and manifest be weakened together? | Coherent forged evidence passes without independent review. |
| S2-06 | Which privileged principals can bypass failure? | Unauthorized or unrecorded privileged merge succeeds. |
| S2-07 | Does CODEOWNERS require actual review? | Protected change merges without review despite claimed requirement. |
| S2-08 | Does material revision invalidate approval? | Changed code inherits stale approval against stated policy. |
| S2-09 | Can another check impersonate the required check name? | Unrelated passing check satisfies protected identity. |
| S2-10 | Who detects a scheduled run that never occurred? | Missing run remains silent yet represented as healthy. |
| S2-11 | Can tested actor erase sole failure evidence? | Evidence deleted without independent surviving custody. |
| S2-12 | Does token possession become approval authority? | Bot executes unapproved consequence through overbroad delegation. |
| S2-13 | Do direct push, API, squash and rebase traverse same gate? | One declared in-scope route bypasses required check. |
| S2-14 | Can revoked access return via queued action or recovery? | Effective prohibited authority restored without fresh authorization. |
| S2-15 | Can machine PASS suppress independent counterevidence? | Contradictory specialist finding erased or auto-closed. |

## Compound challenges
C01 checker weakening + manifest regeneration + green CI.
C02 workflow deletion + disappearance of required check.
C03 stale green check + new head + merge.
C04 privileged bypass + evidence deletion.
C05 revoked credential + queued command + recovery.
C06 valid code-owner review + unauthorized downstream release.
Each compound test must trace the first unsupported arrow; individual PASS does not entail compound PASS.

## Pass/fail metrics
Bounded PASS requires a real attempted transition, demonstrated preconditions, attributable provider enforcement result, exact tested revision, and independent inspection. FAIL requires a reproducible counterexample under valid conditions. TEST INVALID for incorrect preconditions; INDETERMINATE where rivals survive. No global safety, authority or closure from aggregated green checks.

## Stop boundary
Use synthetic fixtures and authorized disposable repos first. No credentials, production merge attempts, policy mutations, deployment or disclosure of sensitive exploits authorized by this document.
humanDisposition: PENDING
executionAuthorized: false
publicationAuthorized: false
CAN ⊬ MAY. ⚒️
