# Encyclopedia of Chaos | AT-CHAOS-001: Arrow Time Adversarial Battery

Recorded: 2026-10-23
State: BOUNDED LOCAL TEST EVIDENCE / YELLOW
Target: ORIGINAL LOCAL Python prototype, NOT the reduced GitHub review-branch implementation.
Engine SHA-256: b16f3ed053368b4fc1a9d4dca994f50afb928cf08abe8ddb1ab8a24e3986ee1c
Command: python -m unittest discover -s tests -v

## Result
80 executed: 50 passed; 25 assertion failures; 5 unexpected errors. Includes 8 original, 12 prior adversarial and 60 additional tests. Earlier equal-time revocation and concurrent-composition expectations failed again. No live-system access, independent enforcement, or physical consequence tests.

## Unexpected errors (5)
- AT-E01: nonstring timestamp triggers uncontrolled exception.
- AT-E02: null node triggers uncontrolled exception.
- AT-E03: null event triggers uncontrolled exception.
- AT-E04: wrong nodes collection type triggers uncontrolled exception.
- AT-E05: wrong events collection type triggers uncontrolled exception.

## Unmet adversarial expectations (25)
- Equal-time revocation ambiguity: two tests, including previously reported.
- Concurrent composition: two tests, including previously reported.
- Inverted and zero-duration authorization windows: two tests.
- Aggregate permission-use constraints, action scope, and principal binding: three tests.
- Revocation delivery, queued operations, cached permission, partitions, and clock skew: five tests.
- Stop latency, late stop, late appeal, irreversible rollback: four tests.
- Evidence provenance, conflicting witnesses, missing issuer, declared stop independence, evidence quality: five tests.
- Explicit human review in HTK handoff: one test.
- Evidence freshness uncertainty: one test.

## Interpretive constraints
Many tests inject fields not defined by the existing schema (for example max_uses, witnesses, clock_error_bound_ms, appeal_at). Their failures establish feature absence relative to proposed extensions, not proven regressions or security exploits. Two simultaneous executions alone do not prove unauthorized composition. A fixture's independence flag does not verify an external brake. Timestamps do not establish revocation delivery or causality.

## Required reproduction and next attack
Reproduce using the local test file tests/test_remaining_batteries.py and preserve the full test log; pin interpreter version and engine hash. Separately test the exact GitHub review-branch commit: not performed here. Then use schema-defined cross-action invariants, independently established temporal evidence, and an independent consequence oracle.

## Authority
Review-only candidate archive. No main-branch change, deployment, architecture validation, or doctrine revision. Human review and independent reproduction pending.

CAN ⊬ MAY. No owner, no brake. No ledger, no trust.
