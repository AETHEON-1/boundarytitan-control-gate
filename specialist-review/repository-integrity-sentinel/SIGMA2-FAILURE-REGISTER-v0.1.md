# BoundaryTitan | Sigma-2 failure preservation register v0.1
State: HISTORICAL AND OPEN EVIDENCE PRESERVED; NOT A CLOSURE DECLARATION.
Original failures must remain intact after correction. Each correction is a separate claim with its own source, test and human disposition.

| ID | Preserved finding | State |
|---|---|---|
| F01 | main branch API reported protected=false | OBSERVED |
| F02 | Repository rulesets query returned [] | OBSERVED |
| F03 | Direct protection endpoint returned HTTP 403 | ACCESS FAILURE |
| F04 | PR description stale against manifest update and later green CI | CONTRADICTION |
| F05 | Earlier CI rejected stale manifest: size/hash and unmanifested files | HISTORICAL FAILURE |
| F06 | Original Sentinel missed authority metadata tampering; subsequently repaired | HISTORICAL DEFECT |
| F07 | Same actor may alter checker, workflow and manifest | CONTROL GAP |
| F08 | Actual merge-denial and privileged-bypass experiments not performed | NOT TESTED |
| F09 | Independent specialist review not completed | NOT VERIFIED |
| F10 | Independently controlled missed-schedule-run detector not established | NOT TESTED |
| F11 | Independent failure-evidence custody not established | NOT VERIFIED |
| F12 | Revocation/recovery resistance not established | NOT TESTED |
| F13 | Latest inspected PR head had successful provider CI | SUPPORTED PROVIDER OBSERVATION |
| F14 | Prior downloadable handoff links were inaccessible to user; plaintext fallback supplied | DELIVERY FAILURE |

## Source lineage
Historical failing CI: https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/40825711636
Latest observed successful CI: https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/40826287452
Original defect: maintenance/ADVERSARIAL-CHALLENGE-2026-10-29.md
Original failure: maintenance/FAILURE-LEDGER-2026-10-29.md
Provider run and current branch API are distinct evidence surfaces. Green CI does not resolve F01, F02, F07-F12.

## Closure gate
A record may gain a separate RESOLVED disposition only with exact defect, change SHA, reproducing negative test, independent observed result, remaining bypasses and legitimate human disposition. Do not delete or overwrite the original. Historical failures are not evidence that a later revision remains broken; later green checks are not proof of global enforcement.

## Aggregate state
Source reconciliation: BOUNDED READ-ONLY REVIEW.
Sentinel: EXISTING IMPLEMENTATION PRESERVED.
Merge enforcement: NOT ESTABLISHED.
Independent specialist review: NOT COMPLETED.
Test execution authorization: false.
Publication authorization: false.
humanDisposition: PENDING.
CAN ⊬ MAY. ⚒️
