# BT-RB-TM-001 | Independent falsification and reproducibility plan

2026-11-25 | v0.1 | YELLOW / PREPARATION ONLY. All new probes NOT TESTED. Parent: BT-HC-004. Companion: `2026-11-25-trailmark-structural-reachability-v0.1.md`. No authorization to install packages, execute CI, modify protected files, access live systems, contact specialists or deploy. Proposed reviewers and execution environments remain unassigned.

## Claims to freeze separately

C1: analyzer extracts declared source-level relationships within a pinned language/frontend scope. C2: candidate graph improves discovery of relevant consequence paths compared with a baseline. C3: a particular runtime control denies a specified prohibited effect within a declared timing and authority policy. C4: an authority has legitimate standing. C1/C2 do not establish C3 or C4; C4 requires separately grounded authority evidence. Do not score legitimate authority as a graph property.

## Matched probes

| ID | Existing fixture / proposed extension | Adverse case | Matched control | Falsifier / expected discrimination |
|---|---|---|---|---|
| TM-001 | `bypass` / `reference` | Normal commit skips fence | Same path with fence enforced | Known structural route omitted contrary to declared coverage; runtime forbidden effect contradicts scoped gate claim |
| TM-002 | New blinded dynamic-dispatch microfixture | Indirect invocation | Explicit direct invocation | Known indirect edge silently omitted or claimed impossible; reported unresolved edge is not automatically failure |
| TM-003 | New blinded cross-language microfixture | External call crosses authority boundary | Same external call with receiving-side denial | Cross-system edge mislabeled as extracted when only manually supplied; sink evidence distinguishes actual effects |
| TM-004 | `cancel_without_fence_retry` / `cancel_without_fence` | Retry after cancellation | Single queued action canceled; `stale_retry` fence control | Forbidden simulated effect despite cancellation; preserve successful cancellation in exact scope |
| TM-005 | `restart_loses_stop` / `restart_preserves_stop` | Volatile stop state restored | Durable denial survives restart | Forbidden effect after recovery contradicts persistence claim; graph-only sameness is allowed if honestly scoped |
| TM-006 | New blinded specification/implementation pair | Implementation diverges from stated invariant | Aligned implementation | Reference edge presented as proof or implemented enforcement without evidence |
| TM-007 | New blinded omitted-path microfixture | Known effect reachable through omitted edge | Explicit edge visible in graph | Independent effect/path trace contradicts claimed graph coverage; do not treat a documented unsupported construct as universal analyzer defect |
| TM-008 | `shared_emergency` / `shared_failure_fail_closed` | STOP route fails and effect commits | Failed route but independent fail-closed denial | Preserve successful scoped containment; failure of one route does not establish failure of every brake |
| TM-009 | `blanket_shutdown` / `reference` | Ordinary effect denied, essential service missed | Essential service preserved | Containment claim overstates safety if required service loss excluded |
| TM-010 | `same_tick_stop_commit` / `pre_request_commit` | Same-tick ordering under stipulated request-time policy | Commit before valid request | Distinguish policy, request, delivery, sink enforcement and effect order; no wall-clock or real concurrency claim |
| TM-011 | New blinded receipt omission microfixture | Actual synthetic effect absent from analyzer or control log | Independent complete effect journal | Reported no effect contradicted by independent sink evidence; missing receipt alone is indeterminate |

All TM probes are proposed comparisons, not executed outcomes. Existing laboratory results remain historical machine-authored reports; new microfixtures do not yet exist. `same_tick_stop_commit` uses insertion order; alternative scheduling should be predeclared rather than silently reinterpreted.

## Reproducibility protocol (proposed; not executed)

1. Obtain human authorization for a disposable, offline/isolated environment with no production credentials, live endpoints or operational side effects. Assign specimen owner, reviewer, independent effect-oracle custodian and external stop authority. Preserve reviewer conflict disclosure and blind first-pass expectations.
2. Acquire exact upstream `v0.9.0` release artifacts/source and immutable full commit ID; record retrieval URL/time, artifact SHA-256, signatures if available, dependency lock and resolved package provenance. Inspect install/build behavior before permitting execution. No unpinned install. Verify exact CLI/frontend support from the pinned distribution; do not invent version-specific command flags.
3. Check out BoundaryTitan at `f15f4d15597f76878a8059d81d8c358bd1d22358` in disposable custody. Record Git status, commit/tree IDs and file hashes; inspect the laboratory manifest and run digest verification in the laboratory directory (`sha256sum -c SHA256SUMS` where available). Record any failure, do not repair historical evidence in place.
4. Reproduce the existing laboratory separately: Python 3.10+; from the laboratory directory run `python recovery_lab.py --output /path/to/reviewer-output/reproduced.json` and selected `--scenario` runs. Use a real reviewer-owned output directory outside the tracked tree. Record interpreter version, exit code, stdout/stderr, output hash and differences against `test-receipt.json`. Historical expected values and the same-machine oracle are not independent ground truth.
5. Generate a source graph with the pinned, independently inspected analyzer using the actual release-supported commands. Record exact command, language/frontend, source exclusions, graph schema, unresolved edges, edge direction, import resolution and manually declared external links. Preserve raw graph bytes, hashes and logs; compare repeat runs without normalizing away contradictions.
6. Compare analyst-blind structural ground truth, analyzer output, independent effect observations and declared authority/temporal policy. Use separate hidden microfixtures, matched controls and an effect oracle outside the acting specimen's judgment. Compare against manual review or another independent analyzer with equivalent scope and budget.
7. Report edge-level TP/FP/FN and unresolved counts against a declared inventory; path-level discovery, infeasible paths, unknown coverage, review time and incremental findings. Do not report precision/recall without an independently defined denominator; report unavailable metrics as UNKNOWN. Distinguish graph errors from semantic or policy questions outside tool claims.
8. Preserve raw inputs, configs, source maps, test results, failed runs, successful controls, provenance, dissent and corrections under independent custody. No automatic admission. Human disposition remains separate.

## Independent reviewer return

Use existing #127 submission contract and its result vocabulary: FAILURE OBSERVED / NO FAILURE OBSERVED (within tested scope) / INDETERMINATE / TEST INVALID / NOT TESTED. Specify separately the analyzer claim and specimen control claim. Route H03 formal methods/static analysis, H04 distributed systems, H06 forensics/custody, H08 independent evaluation; H07 only for separately grounded legitimacy questions. No assignment or specialist acceptance implied.

Required return: exact pinned versions, tested scope, effect oracle, competing explanations, positive and negative controls, trace-level evidence, missing edges, coverage assumptions, stop/recovery conditions, correction history, independent custody receipt and unresolved questions. A graph without a consequence oracle is not a denial receipt.

Stop on scope escape, unexpected network/credential access, writes to protected files, live effects, missing independent observation or inability to preserve evidence. Record interrupted tests and do not silently rerun to erase failure. Human owner retains authority to admit tests and results, refuse closure, and stop the activity.

## Existing anchors

- https://github.com/AETHEON-1/boundarytitan-control-gate/issues/127
- https://github.com/AETHEON-1/boundarytitan-control-gate/issues/178
- https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f15f4d15597f76878a8059d81d8c358bd1d22358/AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md (AM-01, 05, 06, 13, 15, 17, 20, 21, 24)
- https://github.com/AETHEON-1/boundarytitan-control-gate/tree/f15f4d15597f76878a8059d81d8c358bd1d22358/encyclopedia-of-chaos/laboratories/BT-CTC-001
- https://github.com/trailofbits/trailmark/releases/tag/v0.9.0

Preparation complete; execution and independent review pending. Freeze the evidence. Never freeze the search. CAN ⊬ MAY. ⚒️
