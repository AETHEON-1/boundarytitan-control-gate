# Encyclopedia of Chaos | AT-CHAOS-003: Deterministic Analysis vs Schedule Consequence

Date: 2026-10-23
State: YELLOW / SYNTHETIC REPRODUCTION ONLY
Branch: review/arrow-time-v0.1

## Reproduction
The branch's replay module was reconstructed locally and its five tests passed (5/5). Thirty repeated analyses of one unchanged synthetic fixture yielded one unique result hash. The reproduction tests were executed locally, not in GitHub CI.

Independent synthetic state-machine oracle: two actions A=70 and B=70, declared aggregate ceiling=100. Each schedule was repeated 100 times in two models (400 executions total):
- Serial atomic check-and-commit: 200/200 total=70; 0/200 exceed ceiling. Which action wins changes with order.
- Stale shared-snapshot check before commits: 200/200 total=140; 200/200 exceed ceiling. Both actions accepted.

Five independent schedule-oracle unit tests passed (5/5). Each fixed model and schedule is deterministic. Divergent consequences arise from the **state-visibility/enforcement model**, not demonstrated randomness.

## Falsifiable conclusion
Same actions and aggregate constraint do not imply the same consequence when the execution model differs. A deterministic analysis result cannot establish consequence reproducibility or enforcement. This is a constructed model counterexample, not a finding about a deployed system. Neither simulator represents an independent enforcement gate.

## Required next evidence
Pin and execute exact GitHub commit in independent CI; introduce controlled interleavings and failure schedules in an actual isolated implementation with observed effect oracle, state snapshots, external stop status, and seed/schedule receipt. Evaluate unmodeled actions and incomplete membership. Preserve any divergent effect traces.

No source integration, merge, production test, doctrine revision, or authority transfer.
CAN ⊬ MAY.
