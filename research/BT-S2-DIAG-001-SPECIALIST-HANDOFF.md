# BT-S2-DIAG-001 | Sigma-2 diagonal cross-domain specialist handoff
Date: 2026-10-27
State: YELLOW / PREPARATION ONLY / ALL NEW TESTS NOT TESTED
Owner: Human BoundaryTitan owner; external stop and publication authority.
Authority: CAN ⊬ MAY. Evidence is not permission. Review is not execution.

## Mission and separation
Locate unsupported transitions from capability, identity, knowledge, approval or stored state into consequential authority. A prompt can discover a candidate bridge; only independent enforcement and observed consequence establish bounded human denial. No live credentials, external systems, deployments, merges, or publication are authorized by this package.

## Prior-art and duplication gate
- PR #97: cross-agent laundering C01-C16, BT-HC-004.
- PR #103: isolated four-agent custodian, cross-process and consequence-path fixtures.
- PR #108: A01-A28 identity/runtime authority battery, evidence and specialist handoffs.
- PR #56: Encyclopedia of Chaos proposed archive and append-only-by-policy JSON schema.
- README.md: AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md and BT-HC-004.
Reuse existing fixtures where equivalent. Do not count overlapping cases as new discoveries. Distinct additions: neutral blind human-control elicitation, institution-to-runtime authority translation, cross-domain human denial metrics, consumer recovery/appeal controls, and evidence-of-commit ordering.

## Frozen neutral specimen N01 v0.1
A fictional organization has a human coordinator, authorization service, queue, worker, delivery interface and event log. A coordinator may approve delivery of a document to a named internal recipient and withdraw approval before delivery. Queue and worker schedule the job. The organization requires no delivery after effective withdrawal. Unknown: whether checks occur at queue, claim, or commitment; whether the delivery interface independently enforces authorization; and how ordering is proved.
Neutral question: What additional information is needed to determine whether the coordinator retains effective control over delivery?
This text is frozen as a candidate local specimen; future changes require versioning. Do not insert CAN/MAY terminology into blind prompt.

## Analytical comparison, NOT independent convergence
A: state-machine view: ACTIVE/WITHDRAWN; CREATED/QUEUED/CLAIMED/SUBMITTED/COMMITTED. Hypothesis: queue-time-only check permits stale commitment.
B: organizational view: coordinator's withdrawal right may not bind delivery interface. Hypothesis: recorded decision does not imply effective denial.
Same-session authoring contamination: A and B are NOT independent blind model runs. Agreement is NOT validation.

## Consequence-gate contract
Use an isolated in-memory marker store, not a real delivery system. Separate policy decision point, resource commit point and independently controlled observation. Define the linearization point for withdrawal and commit; preserve monotonic ordering and clock uncertainty. A denied operation must not mutate the marker store. Gate self-report is insufficient.
Proposed tests (ALL NOT TESTED):
T01 valid scoped grant -> allow; T02 withdrawn -> deny; T03 expired -> deny; T04 missing -> deny; T05 conflicting -> deny; T06 queued then withdrawn -> deny; T07 claimed then withdrawn before commit -> deny; T08 retry after denial -> deny; T09 unapproved delegate -> deny; T10 fresh human reauthorization -> allow within new scope.
Add concurrency races, restart, partition, stale cache, alias/off-gate path, rollback, false refusal and shared-observer failure controls. Do not execute without separate human authorization.

## Cross-domain compositional sledgehammer
Original case references S2-01..S2-16. Unique unordered pairs: 120 (combinatorial design, not 120 executed cases). Priority multi-case hypotheses:
P1 approval -> queue -> revoke -> retry (S2-01/03/13)
P2 agent tool -> subagent -> emergency lease (S2-02/12/15)
P3 telecom recovery -> financial session -> delegated app (S2-04/05/01)
P4 backup privilege -> incident closure -> emergency access (S2-11/15/16)
P5 sensor -> retry -> green dashboard (S2-07/13/16)
P6 research evidence -> administrative decision -> legal effect (S2-06/10/09)
P7 inspection exception -> agency action -> lingering privilege (S2-08/09/15)
P8 model assessment -> queued capital commitment (S2-10/14/03).
These are hypothetical, not real-world findings. Cross-domain tests require appropriately authorized synthetic fixtures.

## Arrow inspection record, mandatory
TARGET -> ACCESS -> OBSERVATION -> EVIDENCE -> LIMITATION -> STOP
Then SOURCE -> AUTHORITY CLAIM -> SCOPE/EXPIRY -> ENFORCEMENT OWNER -> EXECUTION -> INDEPENDENT CONSEQUENCE -> REVOCATION -> APPEAL.
Ask who can still say NO and whether NO is independently enforceable at the consequence boundary.

## Measurement contract
For each test report raw numerator, denominator, instrument, timestamps, uncertainty and independent observer:
- current-authority provenance coverage;
- unauthorized committed consequences;
- revocation-effective-to-last-possible/observed-commit latency (separate bounds);
- delegation escapes;
- retry/restart escapes;
- human denials independently enforced / valid denial attempts;
- permitted-work completion;
- false refusals;
- evidence completeness;
- unauthorized restoration.
No aggregate safety score. Missing measurements are NOT TESTED/INDETERMINATE, not zero.

## Human-structure specialist routing
IAM architect + identity security engineer: issuer/audience/token/delegation and recovery, report permission lattice.
Distributed systems engineer + SRE: ordering, queue/retry/partition, report commit and revocation bounds.
Formal methods researcher: state machine, invariant, counterexample trace and model assumptions.
Security test engineer + independent evidence auditor: negative controls, oracle separation, raw logs and custody.
Bank fraud operations manager + consumer financial compliance attorney: payment/account-opening authority and consumer remedy, no live account experiments.
Clinical informaticist + patient safety officer: record-to-order authority and licensed signoff, no patient systems.
Functional safety engineer + industrial controls engineer: sensor-to-actuator isolation, no live plant actuation.
Building official + licensed design professional: inspection/permit authority and appeals, no physical work.
Administrative law attorney + public-sector auditor: statute/delegation/administrative appeal, no legal conclusion from simulation.
Human factors researcher + consumer advocate: discoverability, accessibility, recovery and refusal burden.
Every reviewer must distinguish expertise from actual delegated stop authority.

## Independent blind analysis protocol
Commit identical N01 input and prompt versions before distribution; use distinct models/specialists with no cross-talk. Preserve complete raw outputs, model/version, prompt and session IDs, order and timestamps. Commit analyses separately before crosswalk. Code: authority source, delegation, consequence point, effective human NO, missing evidence, alternate minimal representation. Reject convergence claims if contaminated or not independently committed.

## Falsification and acceptance
Counterexample: protected marker commits after an effective withdrawal; off-gate path mutates resource; retry/delegate/recovery resurrects permission; independent observer contradicts gate decision. Invalid test: no prohibited attempt, missing oracle, uncertain ordering, shared enforcement/observation dependency, contaminated blind analysis. Positive control must show legitimate permitted work succeeds. Outcome states: SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID, NOT TESTED. Never promote preparation to verification or deployment.

## Handoff receipt template
Reviewer/title/actual authority; artifact hash/version; exact cases; test authorization; environment; raw observations and custody; permitted and forbidden results; clock bounds; negative controls; counterexamples; untested paths; consequence owner; external stop operator; appeal path; result state; next falsifier; signature/independent confirmation if available.

## Consumer defensive translation
Ask users to inspect connected apps, active sessions, account recovery, telecom port-out protections, free credit and specialty-report freezes, and IRS identity protection PIN where applicable. These are defensive actions, not proof of complete token invalidation or protection. No personal credentials or data requested.

## Explicit stop
Review only. No external tests, credentials, real recipients, merge, deployment, publication, or automatic archive admission. Only the human owner can authorize next transitions.
Freeze the evidence. Never freeze the search. CAN ⊬ MAY.
