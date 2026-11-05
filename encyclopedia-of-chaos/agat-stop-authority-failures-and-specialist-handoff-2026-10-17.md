# AGAT STOP Authority: Failure Ledger and Sigma-2 Specialist Handoff

Recorded: 2026-10-17
State: YELLOW / BOUNDED SYNTHETIC EVIDENCE / INDEPENDENT BRAKE UNVERIFIED
Authority: Human BoundaryTitan owner. No deployment, certification, merge, or doctrinal revision authorized.
Branch: `experiment/agat-isolated-lab-v0`
Draft PR: https://github.com/AETHEON-1/boundarytitan-control-gate/pull/93
Specialist review request: https://github.com/AETHEON-1/boundarytitan-control-gate/issues/94

## Evidence custody and reproduction

Reproduce with Python 3.12: `python -m unittest discover -s experiments/agat -p 'test_*.py' -v`.

- Pre-STOP baseline: [AGAT run 39066708549](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39066708549), 10/10 tests passed. Evidence artifact 12113209083.
- STOP introduction: [AGAT run 39067145088](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067145088), FAILED. SQLite worker initialization used `INSERT OR IGNORE INTO state VALUES (1,0)` after adding a third `halted` column, producing `sqlite3.OperationalError: table state has 3 columns but 2 values were supplied`. This is a startup defect, not a successful authority bypass.
- Repair: commit `e24cab4e9cee9480b7131613b2fc2e6c935e1983` uses explicit columns in the insert.
- Repaired test run: [AGAT run 39067355698](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067355698), 12/12 tests PASS, including `test_halt_denies_queued_commit_and_new_issue` and `test_halt_survives_process_restart_and_revoke`. Source commit `01fac0541cb6d8ff7d94a102377678cf7d8a7e3d`. [Evidence artifact 12112934122](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067355698/artifacts/12112934122), archive digest SHA-256 `5c67e3d6fd9edb824bc7c6a0a3f9ea7d51e9e1e41dee83a224d28cd661bbd02f`, retention until 2027-01-15.
- Separate [bounded verification run 39067355691](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067355691) FAILED. Manifest drift is a distinct repository-integrity defect, not an AGAT stop-test result. Do not call whole-repo verification green.

## Failure and uncertainty ledger

| ID | Observation | Disposition |
| --- | --- | --- |
| AGAT-F-001 | STOP schema extension broke worker initialization; CI caught it. Repaired and regression suite passed. | OBSERVED FAILURE / REPAIRED IN EXPERIMENTAL BRANCH; retain failed run |
| AGAT-F-002 | Same IPC endpoint accepts requester commands and `halt`; external STOP identity and authorization are not enforced. | DESIGN AUTHORITY GAP / NOT INDEPENDENT |
| AGAT-F-003 | Same-user requester may edit SQLite `halted`, permits, or evidence. OS custody isolation absent. | UNTESTED ATTACK / PLAUSIBLE BYPASS |
| AGAT-F-004 | No demonstrated inventory and mediation of all consequence sink routes. | PATH DOMINANCE UNESTABLISHED |
| AGAT-F-005 | Concurrent halt/commit and post-acknowledgment linearization have not been independently exercised. | RACE TEST PENDING |
| AGAT-F-006 | Evidence hash checks are not independent immutable custody. | EVIDENCE AUTHORITY UNESTABLISHED |
| AGAT-F-007 | Deliberately defective gate ignores revocation and allows synthetic commit; detector test passes. | KNOWN DEFECT DETECTED / NOT A REAL GATE BYPASS |
| AGAT-F-008 | General repository manifest verification fails separately. | OPEN INTEGRITY FAILURE |
| AGAT-F-009 | No independent specialist reproduction or review completed. | EXTERNAL VALIDATION PENDING |

## Specialist handoff: the decisive falsification target

**Claim under test (NOT established):** After an independently authorized STOP is durably acknowledged, no requester-controlled route can produce the prohibited synthetic consequence, including after retry, crash, restart, queue drain, credential replay, state modification, or delegation.

**First authority question:** Who controls the stop credential, stop transport, persisted latch, consequence sink, and evidence observer? Show distinct identities, file permissions, and administrative domains; do not assume process separation means independent authority.

**Adversarial battery (synthetic only):**
1. Run requester under a separate, deliberately constrained OS principal; attempt SQLite edits, file replacement, symlink substitution, process interference, and IPC spoofing. Capture both failed and successful attacks.
2. Force deterministic halt/commit races. Define STOP's linearization point as durable acknowledgment; separately log commands before acknowledgment and all effects after it. Fail on any unauthorized post-acknowledgment effect.
3. Inventory every path to the synthetic consequence sink. Deliberately add a bypass route; confirm independent observation detects it and enforcement prevents it when within declared scope.
4. Kill/restart requester, gate, and observer at defined crash points; retry queued and replayed authorizations. Verify persistent stop and effect outcomes.
5. Attempt evidence deletion, rewrite, omission, reorder, and forged success; compare to an observer outside requester custody.
6. Seed known-bad controls without revealing defect labels to the evaluator; report detection rate and false negatives. Preserve counterexamples.
7. Independently reproduce both failed initialization run and repaired PASS from pinned SHAs, environment, and logs.

**Required deliverable:** threat model; topology and permission map; exact commit/environment; deterministic test harness; complete pass/fail/indeterminate ledger; independently observed consequence receipts; counterexample traces; residual risk; proposed repairs; explicit specialist disposition. Distinguish software refusal, enforcement, and global authority extinction.

**Stop and admission rules:** No real payments, production credentials, deployments, or consequential external actions. A successful synthetic bypass is an evidence finding, not permission to exploit real systems. Do not promote to GREEN on model self-assessment. Human owner and independent specialists retain consequence and admission authority.

CAN ⊬ MAY. Maximize CAN. Keep MAY outside. No owner, no brake. No ledger, no trust.
