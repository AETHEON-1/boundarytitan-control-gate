# Encyclopedia of Chaos | BT-REF-BRAKE-PROCESS-002
Date: 2026-10-17
State: DEVELOPMENT / YELLOW / UNMERGED
Run: python3 -m unittest -v test_process_brake.py
Local result: 7/7 PASS in 6.209 seconds. Internal execution only, not independent replication.

## What was actually tested
Separate spawned authority and resource processes; authorized commit, forged token, duplicate nonce replay, changed action, revocation before commit, saved-token replay after simulated requester restart, and global epoch invalidation.

## Findings and preserved failures
- F01 (OBSERVED DESIGN DEFECT): Revoking unrelated identity invalidates valid grants for other identities through a global epoch. Test currently asserts this behavior; availability/false refusal regression is not yet fixed.
- F02 (DESIGN GAP): Both processes and all IPC queues are administered by one controller and host; no independent administration.
- F03 (DESIGN GAP): Requester restart is a replay scenario, not actual OS requester process restart or durable queue restoration.
- F04 (DESIGN GAP): No concurrent revocation race. Authority check and resource commit are distinct operations; a revocation between them may permit a post-revocation commit. Requires linearization/atomic commit gate.
- F05 (DESIGN GAP): Resource can be compromised or bypassed through an alternate path in an expanded threat model; no actual external resource guard.
- F06 (DESIGN GAP): Observer is an output queue written by resource process, not independently measured resource state.
- F07 (DESIGN GAP): Queue provenance and authority credentials are not protected from a shared-host administrator.
- F08 (DESIGN GAP): Fail-closed behavior on authority timeout is not handled as an explicit denial receipt; current timeout raises an exception.
- F09 (TEST COVERAGE): No randomized fault injection, formal verification, crash recovery, process kill, or durable storage.
- F10 (REPRODUCIBILITY): Local Python tests run; entire original repo tests not rerun because git clone failed with DNS resolution.

## Specialist diagonal questions
1. What is the linearization point at which revocation must dominate resource commit?
2. Can an attacker compromise the requester host without acquiring authority or resource control?
3. Can the resource independently attest to actual state change without trusting its own logs?
4. Can per-principal revocation avoid false denial of unrelated grants?
5. Which alternate resource paths remain reachable outside the modeled queues?
6. Who can revoke the witness, and who can replace the resource operator?
7. Does loss of the authorization process produce an observable denial rather than indefinite stall or unlogged crash?
8. What assumptions survive independent credentials, machines, and administrative domains?

## Disposition
Pass within tested fixture only. Independent external brake: NOT ESTABLISHED.
Human owner controls next field-testing or deployment transitions. No production authority implied.
Freeze evidence, not search.
