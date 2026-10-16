# Sigma-2 Diagonal | Specialist Handoff v0.1
**HTK first. Status: YELLOW. Evidence packet for external challenge, not certification.**
**Related:** [10/10 roadmap](10-OF-10-BUILDOUT-REGISTER.md) · [unknown unknowns](UNKNOWN-UNKNOWNS-CHALLENGE-BATTERY.md) · [adversarial regression](authority-crossing.adversarial.test.mjs) · [continuity protocol](THREE-SURFACE-CONTINUITY.md)

## What happened?
A new read of the workshop code and GitHub Actions exposed a boundary between **tests passing** and **the repository being verified**. The reference battery passed 34 Node tests and 6 Python tests in GitHub Actions run 38911554249, while the separate bounded verification workflow 38911554354 failed its repository-state check because its manifest omitted tracked files. The failure does not prove missing files or an unsafe runtime; it prevents an unqualified integrity claim.

## What changed?
A new adversarial specimen targets three narrower gaps:
- **A1: Observer failure after token consumption:** in-process grant is consumed, effect does not execute, retry denied. This is an availability/transaction atomicity mismatch, not evidence of unauthorized consequence.
- **A2: Two stale resource instances:** each reports successful commit against its own snapshot; last writer wins in the same JSON state file, losing one effect. This is a lost-update / evidence integrity problem and potentially undermines budget and replay semantics.
- **A3: Self-issuable local authority:** a caller holding the fixture API can authorize and execute; no external MAY is demonstrated.
These tests describe expected, bounded counterexamples in a sandbox, not real-world exploitation. Their execution on the new commit must be verified separately.

## Why does it matter?
The machine can pass its own reference tests while its claimed authority, evidence, and integrity remain unproven. A reported stop is not necessarily effective, and an effect ledger can undercount committed effects.

## Who owns what?
Human BoundaryTitan owner: admission, merge, publication, deployment, reopening and stop authority.
Independent issuer specialist: grant issuance and key custody.
Resource specialist: actual protected consequence and complete mediation.
Independent auditor: effect observation, log custody and provenance.
Reliability specialist: crash/restart/partition and recovery ordering.
No specialist's test output becomes release authority.

## What can still stop it?
Current workshop code is not connected to live consequence-bearing resources. The human owner can decline merge or deployment. A tested independent resource-side stop is NOT ESTABLISHED.

## Remaining Sigma-2 diagonal questions
| ID | Specialist | Precise question | Defeating observation / required evidence |
|---|---|---|---|
| S2-01 | Distributed systems | Can a stale instance commit after witness stop? | two-host schedule, independent effect oracle, witness linearization |
| S2-02 | Databases | Does one successful commit erase another? | concurrent instance history and durable ledger comparison |
| S2-03 | Security / PKI | Can requester, CI runner or admin mint or restore issuer keys? | custody and credential privilege graph, compromise drill |
| S2-04 | Safety engineering | What physical/downstream effects remain after software stop? | harmless hardware simulator and residual-energy inventory |
| S2-05 | Forensics | Can effect, stop and evidence be rewritten by one principal? | distinct administrative roots and observer outage exercise |
| S2-06 | Recovery / SRE | Can snapshot, restore, retry or break-glass reauthorize an old task? | failover timeline, signed recovery approvals, stale grant test |
| S2-07 | Governance / law | Who legitimately grants, refuses, appeals or repairs consequence? | source of authority, jurisdiction, procedure, ownership |
| S2-08 | Human factors | Does operator approval actually block execution? | no-response/denial drill and workflow bypass map |
| S2-09 | Assurance | Can test runner alter scope or hide failing paths? | blind independent path inventory, seeded omitted route |
| S2-10 | Formal methods | What safety property is invariant under all modeled interleavings? | model/checker artifact and counterexample trace, explicit assumptions |
| S2-11 | Infrastructure | Does loss of witness or clock skew cause fail-open? | partition/clock/expiry fault injection and measured denial |
| S2-12 | Supply chain | Can deployed artifact differ from tested artifact? | signed build provenance, runtime digest and reproducibility |
| S2-13 | Cross-domain systems | Can two individually authorized actions compose into an unauthorized effect? | end-to-end consequence composition test with separate MAY |
| S2-14 | Human authority | Can an administrator override and conceal the override? | collusion threat model, separated custody, independent detection |
| S2-15 | Epistemology / evaluation | Can correct detection or scoring be promoted to approval? | correct report by unauthorized source, blocked release path |
| S2-16 | Specialists collectively | Which omitted authority crossing is not represented here? | independent alternative architecture and concrete falsifier |

## Geometric model
```
Epistemic path:  observed event -> record -> inference -> bounded evidentiary claim
Authority path:  external source -> standing/jurisdiction -> scoped MAY -> resource gate
Consequence:     actual protected transition -> downstream effects -> repair/remedy
Stop path:       external NO -> resource enforcement -> independently observed extinction
Crossing risk:   evidence, capability, identity, credentials, historical MAY or a human presence
                 silently substituted for current authority.
```
No one linear ladder contains all four paths. Independent custody is not achieved by different filenames on one host.

## Reproduction / handoff
1. Checkout exact branch commit and record SHA, Node/Python versions and OS.
2. Run `node --test workshop/tsa-brakes/*.test.mjs` and `cd workshop/tsa-brakes && python -m unittest -v test_transactional_brake.py`.
3. Inspect both GitHub Actions workflows separately. Record successful tests AND failing repository integrity. Do not fix integrity by suppressing manifest enforcement.
4. Independently design one attack absent from this file and the unknown-unknown battery.
5. Return exact setup, independently observed effects, first unsupported arrow, rival explanations, falsifier, evidence state and human disposition PENDING.
6. No live deployment, hazardous physical test, credential misuse, publication, merge or frozen-doctrine change.

## Evidence state at preparation
- GitHub Actions sandbox regression run 38911554249: **SUPPORTED** for 34 Node + 6 Python tests on the prior inspected commit.
- Bounded verification run 38911554354: **CONTRADICTED** for a claim of repository-state verification; manifest did not account for tracked files.
- New adversarial specimen execution: **NOT TESTED** until GitHub Actions reports for its commit.
- Independent specialist reproduction, external stop latency, complete mediation, independent custody: **NOT TESTED**.
- No universal proof, validation, safety assurance or release approval.

**The machine may identify the crossing. It may not authorize it. CAN ⊬ MAY.**
