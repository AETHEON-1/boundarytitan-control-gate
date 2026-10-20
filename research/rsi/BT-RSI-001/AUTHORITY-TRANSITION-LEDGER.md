# BT-RSI-005 | Consequence and Authority Transition Ledger

State: YELLOW / DEVELOPMENT EVIDENCE. This is a synthetic, single-host SQLite prototype, not a production control.

## Separation
The computational custodian performs atomic SQLite transactions. A separate, human-supplied authority metadata record names evidence source, rule source, jurisdiction, decision owner, consequence owner, execution authority, stop authority, and appeal path. Sigma-2 may interrogate each arrow and flag missing fields. **Neither record completeness nor the machine's assessment supplies legitimacy or permission.**

## What is tested
* Durable completion tombstone after creating a new custodian object.
* Actor-bound HMAC fixture signatures and cross-task replay rejection.
* Fail-closed missing consequence owner and missing task.
* Concurrent close-versus-commit ordering under SQLite `BEGIN IMMEDIATE`.
* Resource-side effect inspection from a separate database connection.
* A successor's stale signed request denied after completion.

## Limits and defeating observations
The signing helper is accessible to the test harness; real workers are not isolated from it. No independent custodian, credential vault, cross-machine trust domain, kernel process credential enforcement, network adversary, credential compromise, or machine-generated successor is tested. An administrator with direct write access to the database can bypass this custodian. SQLite atomic ordering does not prove a distributed stop boundary or a physical effect's reversibility. The concurrency test checks ledger order, not real-time linearizability against external devices. Closure metadata is supplied by a fixture, not independently verified human authority. No moral competence, empathy, legal legitimacy, or universal revocation guarantee is inferred.

## Sigma-2 arrows
Observation -> evidence -> established fact (evidentiary standard required).
Established fact + rule -> jurisdiction (external source required).
Jurisdiction + decision owner -> authorized disposition (human review required).
Disposition -> execution -> consequence (external stop and appeal must remain inspectable).
Evidence, authority, and consequence are different lanes with a common reference ledger, not inherited permission.

Run `python3 -m unittest -v test_authority_transition_ledger.py` in `research/rsi/BT-RSI-001`.
