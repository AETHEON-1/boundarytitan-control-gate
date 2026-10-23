# Encyclopedia of Chaos | AT-CHAOS-004: Same-Implementation Interleavings

Recorded: 2026-10-23
State: YELLOW / SYNTHETIC LOCAL MODEL
Target: fixed read-check-write shared-state implementation, two actions A=70 B=70, aggregate ceiling=100.

## Reproducibility
Each action has ordered steps read -> check -> write. Enumerated all 20 interleavings respecting each action's internal order (6!/(3!3!)).
Results: 2 schedules finish at total=70; 18 schedules finish at total=140, exceeding the declared limit. Each fixed schedule reproduces the same result. Five unit tests passed. Complete schedule trace and executable tests retained locally.

## Interpretation
The same implementation, same actions and same declared limit can produce different state outcomes under different interleavings. No randomness required. This is a bounded synthetic model, not evidence of a live exploit, real-world consequence, or independently effective external brake. The exhaustive claim applies only to the modeled six-step partial order.

## Falsifier and next step
Instrument an isolated implementation and compare independently observed effects under controlled interleavings, including crash/retry, duplicate writes, idempotency and external stop. Require state/effect oracle and complete schedule receipts. Investigate serialization or atomic aggregate reservation only after human architecture disposition.

CAN ⊬ MAY. No owner, no brake. No ledger, no trust.
