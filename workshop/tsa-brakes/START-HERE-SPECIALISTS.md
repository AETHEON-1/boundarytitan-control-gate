# Specialist Entry Point | Boundary Engineering Stop Battery
**Status: YELLOW | draft, unmerged, no deployment authority**

This folder is a cross-disciplinary research workbench, not a deployable safety product or a certification. The goal is to test whether a task's protected consequence remains externally stoppable after revocation, queueing, delegation, restart, recovery, or human override.

## Start here
1. Read [EXTERNAL-STOP-TOOLBOX.md](EXTERNAL-STOP-TOOLBOX.md) for controls borrowed from industrial safety, distributed systems, cryptography, forensics, operations, databases, and finance.
2. Read [SPECIALIST-CHALLENGE-INTAKE.md](SPECIALIST-CHALLENGE-INTAKE.md) for a standard challenge submission and 18 open defeating tests.
3. Read [ISOLATION-ATTACK-LEDGER.md](ISOLATION-ATTACK-LEDGER.md), [DURABLE-RECOVERY-ATTACK-LEDGER.md](DURABLE-RECOVERY-ATTACK-LEDGER.md), and [TRANSACTIONAL-ATTACK-LEDGER.md](TRANSACTIONAL-ATTACK-LEDGER.md) **before** treating the code as an effective brake.
4. Read [SPECIALIST-CLEAN-ROOM.md](SPECIALIST-CLEAN-ROOM.md) for independent-review separation; [OPEN-SIGMA-2-QUESTIONS.md](OPEN-SIGMA-2-QUESTIONS.md) for unresolved authority questions.
5. Review the source and run only sandbox tests on a disposable environment.

## Final Sigma-2 specialist handoff
Read [Sigma-2 Specialist Handoff](SIGMA-2-SPECIALIST-HANDOFF.md) for HTK explanation, observed CI split, new adversarial counterexamples, geometric authority map, and 16 open specialist questions. Run [authority-crossing.adversarial.test.mjs](authority-crossing.adversarial.test.mjs) with the Node battery; these are bounded demonstrations, not independent real-world stop evidence.

## Omission and unknown-unknown challenge
Before proposing approval, independently attack the [36 overlooked failure hypotheses and omission protocol](UNKNOWN-UNKNOWNS-CHALLENGE-BATTERY.md). The list is intentionally non-exhaustive; specialists must contribute defeating observations that are absent from it. Treat untested questions as NOT TESTED, not as successful brakes.

## Test map
| Area | Specimen | Tests | What it does not establish |
|---|---|---|---|
| In-process control | `brake.mjs` | `brake.test.mjs`, `clean-room.test.mjs` | external authority |
| Isolated process simulation | `isolated-service.mjs` | `isolated-service.test.mjs` | independent key custody, OS separation |
| Asymmetric local resource | `authority-crypto.mjs`, `durable-resource.mjs` | `durable-resource.test.mjs` | concurrent transaction isolation, rollback resistance |
| Stop-evidence assessment | `stop-drill.mjs` | `stop-drill.test.mjs` | independent observations from real systems |
| SQLite transaction ordering | `transactional_brake.py` | `test_transactional_brake.py` | independent custody, signed issuance, real-world enforcement |

Suggested local commands (Node 20+ and Python 3 with sqlite3):
```sh
node --test workshop/tsa-brakes/*.test.mjs
cd workshop/tsa-brakes && python -m unittest -v test_transactional_brake.py
```
The existence of test commands is not evidence they ran. Report interpreter versions, OS, SHA, complete output, and any failure. Prior self-reported local run of the Python specimen is not independent verification.

## Specialist routing
- **Industrial / robotics safety:** stored energy, lockout, safety relays, physical isolation, recovery and stop latency.
- **Distributed systems / databases:** atomicity, witness ordering, race conditions, replay, fencing, failover, rollback and stale snapshots.
- **Identity / security / cryptography:** issuer custody, key lifecycle, delegation, compromise, privileged override and complete mediation.
- **Forensics / assurance:** independent evidence custody, observation blind spots, chain of custody, falsifiers and negative controls.
- **Operations / reliability:** runbooks, break-glass accountability, failure recovery, incident response and rollback testing.
- **Law / public authority / governance:** identify applicable authority sources, jurisdiction, appeal, owner and consequence without assuming software can confer legitimacy.
- **Everyday users / accessibility:** identify what the system can do, who can deny it, and whether a stopped task still acts. Do not attempt production bypass testing.

## Reporting standard
Provide specimen commit SHA; exact protected effect; requester, authority issuer, resource owner, evidence custodian; environment and assumptions; positive control; negative control; attack trace; first unsupported arrow; actual independently observed effects; counterexamples; unknowns; status (SUPPORTED / CONTRADICTED / INDETERMINATE / TEST INVALID / NOT TESTED); and human disposition (pending unless explicitly issued).

No passing result, simulation, model report, or specialist agreement certifies universal unbreakability. The stop criterion is bounded: **no observed failure within a declared, independently challenged test scope**. Human owner controls merge, publication, deployment and external stop. No unsafe live testing.

## Invariant
A stop is not effective because someone issued it. It is effective only where protected consequences can no longer occur through paths inside the declared boundary.

**Maximize CAN. Keep MAY outside. No owner, no brake. No ledger, no trust.**
