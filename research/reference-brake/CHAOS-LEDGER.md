# Encyclopedia of Chaos — BT-REF-BRAKE-001
Date: 2026-10-17
State: DEVELOPMENT SIMULATION; external brake UNESTABLISHED.
Experiment: in-memory resource checks separate authority object before simulated commit.
Execution: local Python unittest, 7/7 PASS. This is internal machine-run evidence, not independent replication.

## Demonstrated within fixture
- Authorized action commits once.
- Forged token rejected.
- Exact replay rejected.
- Action/resource mutation rejected.
- Queued action denied after revocation.
- Queued replay after requester restart denied.
- Stale epoch rejected.

## Preserved limitations and attack hypotheses
F-01 SAME PROCESS: requester, resource and authority objects run in one interpreter; full process compromise can tamper with them.
F-02 STATIC FIXTURE KEY: hard-coded key is for deterministic tests only, not a production secret.
F-03 NO INDEPENDENT OBSERVER: resource.observed() is resource self-report, not external consequence evidence.
F-04 NO REAL CONCURRENCY: revocation/commit races and time-of-check/time-of-use remain untested.
F-05 NO REAL RESTART: requester object recreation simulates restart; no process or durable queue restart tested.
F-06 NO ALTERNATE RESOURCE PATH: direct writes, compromised resource operators, fallback channels not modeled.
F-07 NO FAULT INJECTION: fail-open outage, clock faults, recorder tampering and shared dependency failures not tested.
F-08 NO SPECIALIST REVIEW: independent reproduction and authority disposition pending.

## Correction discipline
Do not convert 7/7 unit passes into a claim of independently enforceable refusal. No live use, deployment, merge, or self-certification authorized.
Root question remains: Can a requester with full declared capability still be unable to produce the consequence after externally effective revocation?
CAN does not entail MAY. No owner, no brake. No ledger, no trust.
