# Transactional Brake Round v0.4 | Evidence and Open Failures
State: YELLOW. Python local test run: 6/6 passed on 2026-10-16 in assistant sandbox. Independent reproduction: NOT TESTED.

## Scope
Two SQLite databases on the same host: resource transactions and a separate logical revocation witness. SQLite BEGIN IMMEDIATE serializes competing fixture commits, with witness lock acquired before resource lock. No real external effects, no independent machine, no external specialist, no production permission service.

## Local execution
Command: python -m unittest -v test_transactional_brake.py
Result: 6 tests executed, 6 passed, 0 failures. Tests include 12 concurrent caller threads with separate DB connections, stop before queued commit, reopen after stop, stale resource state modification, replay, and task identity reuse. This is self-reported local evidence; exact GitHub commit has not been independently reproduced.

## Critical limitations and falsifiers
TX-01 Both stores are writable by the same OS authority. A privileged human or compromised host could restore both databases and erase a stop. Separate file != independent custody.
TX-02 Resource effects and their record are in the same database, not independently retained observation. No external resource effect oracle.
TX-03 Enrollment crosses two databases without distributed atomic commit. Crash between witness and resource commits may create inconsistent enrollment; denial is preferred, but repair and recovery require explicit protocol.
TX-04 Stop crosses two databases. Witness-first closure is fail-closed for normal commits but no crash-injection tests or bounded stop-latency measurement exist.
TX-05 The fixture lacks actual issuer signature verification, delegation lineage, principal binding, deadlines, real credential lifecycle and authorized recovery. It is a transaction-ordering experiment, not a replacement for asymmetric authorization.
TX-06 No adversarial subprocess with OS-isolated permissions. Thread concurrency does not establish multiprocess or multi-host correctness.
TX-07 No rollback of witness store, filesystem corruption, disk exhaustion, partitions, stale replicated readers or malicious administrators tested.
TX-08 No formal proof of complete mediation. Direct writes to the resource database bypass the API.
TX-09 No externally accountable privileged human override path; no dual custody or tamper-evident independent log.
TX-10 Commit/revocation ordering is the SQLite witness lock order; the system does not claim revocation retroactively cancels already admitted effects.

## Next required specimen
Separate principals and hosts for issuer, resource and evidence custodian; resource-side verified asymmetric grants; durable monotonic stop witness; transactionally ordered commit; externally observed harmless effects; explicit recovery quarantine; authorized override with independent audit. Attack simultaneous commit, stop, queue, delegation, crash/restart, stale snapshots, and privileged human mutation. Preserve each failure and old regression test.

A passing local battery supports only the tested code/environment. No independent validation, production readiness, complete mediation or human release authority is implied. CAN does not entail MAY.
