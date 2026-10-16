# Boundary Engineering | 10/10 Buildout Register v0.1
**State: YELLOW. This is a work plan, not a safety score or release approval.**
**Entry:** [Specialist guide](START-HERE-SPECIALISTS.md) · [Stop toolbox](EXTERNAL-STOP-TOOLBOX.md) · [Open challenge intake](SPECIALIST-CHALLENGE-INTAKE.md)

## Goal and strict order
Deliver one complete harmless, independently falsifiable protected-consequence path before adding domain adapters. Maximize CAN, keep MAY outside. No benchmark may self-certify.

| ID | Buildout | Present evidence | Critical missing implementation | Exit evidence | Owner discipline |
|---|---|---|---|---|---|
| BE01 | External authority root | asymmetric signing reference | separate administrator/host, enrollment custody, key rotation | requester cannot issue grants under adversarial credential tests | security + independent issuer owner |
| BE02 | Complete resource mediation | local gate references | remove direct resource access, enforce every declared consequence path | enumerated paths with bypass negative controls | resource operator |
| BE03 | Atomic stop/commit | SQLite witness lock specimen | transactional owner protocol, crash injection, multiprocess ordering | no post-effective-stop commit within scoped adversarial schedule | distributed systems |
| BE04 | Zombie permission extinction | queue/replay/delegation tests | delegation graph, fencing, downstream queue drains | stale child/lease/retry cannot commit | identity + resource owners |
| BE05 | Independent evidence | in-resource effects only | separately administered effect observer and immutable custody | adversary cannot both cause and conceal effect in threat model | independent auditor |
| BE06 | Controlled recovery | documented quarantine | rollback-resistant witness, new-task release, crash recovery | stale snapshots never restore MAY | recovery owner |
| BE07 | Human override boundary | accountability specification | privileged operator separation, break-glass receipts, dual custody | override detectable and cannot silently alter records | governance + operations |
| BE08 | Cross-domain adapters | conceptual tool catalog | individually owned harmless adapters, domain standards mapping | each adapter has independent consequence oracle | domain specialist |
| BE09 | Falsification lab | regression fixtures and challenge intake | repeatable fault injection, reproducible environments, external red-team | external replay and counterexamples preserved | independent testers |
| BE10 | Reality benchmark | evidence-state vocabulary | coverage manifest, provenance, independent adjudication | machine cannot convert observation into release | human owner |

## Dependency gate
BE01 + BE02 + BE03 + BE05 form the first vertical slice. BE04/06/07 stress that slice. BE08 only after scope-limited evidence for a concrete domain. BE09 and BE10 challenge every stage.

## Mandatory release artifacts
- Specimen commit SHA, build toolchain, isolated environment and resource/effect definition.
- Named requester, issuer, resource owner, stop owner, independent evidence custodian, recovery owner.
- Capability/authority matrix including humans, service accounts and emergency administrators.
- Complete consequence path inventory for declared scope, with alternate and downstream paths.
- Revocation linearization point, stop latency, queue/drain policy, retry and delegation graph.
- Threat model including administrator compromise, collusion, storage rollback, time/clock failure, partition, observer loss and alternate channels.
- Positive control and independent negative control, counterexample and regression records.
- Independent reproduction evidence and signed human disposition. No self-assigned Green.

## Failure-first challenge queue
1. Two competing resource instances each accept the same token.
2. Stop is recorded while a protected commit is in flight.
3. Queue retries after revocation or task completion.
4. Delegated child remains live after parent stop.
5. Restart restores same signing key and stale grant.
6. Recovery restores old witness snapshot.
7. Privileged administrator rewrites issuer, resource and evidence.
8. Evidence recorder is unavailable while resource commits.
9. Alternate API bypasses the declared gate.
10. Deny-all implementation passes negative tests but cannot execute authorized positive control.
11. Break-glass authority is reused outside its scope.
12. Physical/financial downstream consequence continues after software stop.

## Evidence status
Use SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID, NOT TESTED. A passing test means only no failure observed under the declared test, not completeness, certification or deployment approval.

## Next actionable milestone
Construct a separate-authority, sandbox-only vertical slice with: public-key grant verification at the resource; an independently owned monotonic stop witness; one transactional commit path; separate effect observer; and adversarial multiprocess fault-injection. Preserve current fixtures as historical comparisons, not production components.

Human owner alone may admit findings, merge, deploy or reopen frozen baselines. No owner, no brake. No ledger, no trust.
