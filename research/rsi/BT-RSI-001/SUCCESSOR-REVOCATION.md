# BT-RSI-002 Successor revocation and fault-injection fixture
State: YELLOW | DEVELOPMENT | NOT VALIDATED.

Question: Can a worker improve its methods without gaining the ability to disobey revocation?

This offline Python fixture represents predecessor A and successors B/C as *messages*, not actual successor processes or models. A custodian process serially evaluates requests against an externally held revocation epoch. A legitimate pre-revocation inspect is the positive control. After epoch transition, stale-grant requests from A, B and C must not append protected effects. Two optional fault probes exercise infinite CPU computation and bounded allocation pressure with a cooperative stop followed by OS termination fallback.

Run: `cd research/rsi/BT-RSI-001 && python3 -m unittest -v test_successor_revocation.py && python3 successor_revocation.py`

**Critical limitations:** The custodian and test share UID and administration. Revocation and requests are ordered by the controller, not raced. No authenticated principal, real delegation, concurrent in-flight transaction, alternate consequence path, separate evidence custodian, restart persistence, or arbitrary adversarial code is tested. CPU and allocation probes test process liveness, not permission extinction. No Collatz proof claim. Do not promote these results to BT-HC-004 consequence-path dominance.

Next negative controls: force a post-revocation commit in a deliberately broken gate, spoof the predecessor while its grant remains active, race an in-flight commit against revocation, and verify that independent resource-side receipts detect every injected violation.

CAN ⊬ MAY. Maximize CAN. Keep MAY outside.
