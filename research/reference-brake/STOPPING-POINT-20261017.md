# BT-REF-BRAKE-003 | Stopping point
State: YELLOW / DEVELOPMENT / DRAFT

Local Python test suite: 10/10 PASS, 2026-10-17. Internal machine evidence, not independent validation.

## Repair
New brake_v2.py uses per-identity versions to avoid the previously observed global revocation false refusal. It serializes grant, revoke and simulated commit in a single process. A revocation processed before a commit denies it.

## Preserved limitations
This is not an independent brake: simulated authority and resource reside in the same service. The witness queue is produced by that service and is not independent observation. No durable commit, real concurrent client test, external operator separation, partition handling, alternate path coverage, full repository regression or specialist review. Requester restart remains a replay simulation.

## Open specialist questions
What is the revocation linearization point across separate administrations? How is resource state independently witnessed? Can a compromised operator bypass the gate? How do partition, crash and replay affect enforcement? Which alternate paths remain? What is the false-refusal and latency budget?

## Disposition
PASS WITHIN FIXTURE ONLY. INDEPENDENT BRAKE NOT ESTABLISHED. Prior failure remains preserved as repaired-in-v2. No merge, field validation or deployment approved.
CAN does not entail MAY. No owner, no brake. No ledger, no trust.
