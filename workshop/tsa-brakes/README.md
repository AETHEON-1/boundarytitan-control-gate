# TSA Brake Battery v0.1 | YELLOW | development-only

**Scope:** This is a bounded local reference fixture, not an operational independent brake, proof of complete mediation, or deployment authorization. No protected real-world resource is connected.

## Per-task bounded autonomy specification
A task must have a unique taskId, named principal, exact allowlisted actions and resources, absolute deadline, maximum successful admissions, external issuer, consequence owner, independent evidence custodian, revocation owner, and named external stop mechanism. The fixture implements only taskId/principal/action/resource/deadline/maxCommits and local revocation/completion. The remaining fields are **mandatory integration obligations**, not silently satisfied defaults. Do not use this fixture to enforce production authority.

## Brake families and cross-disciplinary pressure
| Family | Candidate application | Pre-action invariant | Failure probe |
|---|---|---|---|
| Identity | agent, service, operator | authenticated principal matches grant | principal substitution |
| Situational | file, procurement, clinical, legal | exact action/resource scope | resource substitution |
| Temporal | queue, lease, retry | authority current at commitment | revoke then retry |
| Compositional | multi-tool, finance | composite consequence separately authorized | permitted steps combine to prohibited effect |
| Resource | robot, payment, database | all effect paths mediated | alternate direct actuator/write path |
| Budget | compute, funds, rate | bounded cumulative consequence | concurrent overspend |
| Evidence | transcript, dashboard | independently observed effects | forged success or denied log |
| Recovery | reboot, failover | revoked state cannot resurrect | snapshot restore |
| Delegation | subagent, vendor | authority chain bounded and revocable | unscoped subdelegation |
| Completion | workflow, credential | no authority survives task termination | zombie permission hunter |
| Physical | robotic actuation | independent hardware stop and safe state | stale queued actuation |
| Truth | claims, evaluations | machine report not sole fact source | contradict with resource record |
| Safety | operational hazard | external enforceable stop | monitor disabled |
| Authority | approval, release | model cannot issue own MAY | forged grant |

## Zombie Permission Hunter
Inventory issued grants, queued work, cached credentials, delegated children, retry envelopes, signed URLs, resource sessions, worker leases, offline tokens, recovery snapshots, and pre-armed commands. For each, trace the authority lineage and identify the last point at which it can still cause consequence. On task completion or revocation, deny new commitments and independently test each surviving path. **Local token invalidation is not credential extinction at downstream systems.** Record residual capabilities as UNKNOWN until tested.

## Independent control obligations
1. Put protected resources behind a gate that the requesting agent cannot alter or bypass.
2. Bind authorizations to an externally administered issuer, scoped identity, task, action, resource, budget, time and policy generation.
3. Serialize resource-side commitment with revocation, using fencing or an equivalent atomic control. The fixture does **not** solve the in-flight async effect race.
4. Record resource effects with independently retained evidence; an application callback is **not** an independent observer.
5. Cover alternate interfaces, administrative paths, queued jobs, retries, restart, failover, delegation and recovery.
6. For irreversible actions, specify the latest enforceable stop point and measure latency.
7. Never let the model certify Truth, Safety, Authority, its own test results, or the completeness of the path inventory.

## Reproduction
Run `node --test workshop/tsa-brakes/brake.test.mjs` on Node 20+. These are isolated reference tests and do not replace the existing Jest suite. **Tests have not been run by this GitHub connector operation.** Record actual environment, SHA, stdout, failures and independent reproduction before claiming results.

## Bounded break/rebuild protocol
For every attack: freeze specimen SHA and authority assumptions; predict unauthorized effect; run negative control; run protected candidate; observe the actual resource independently; preserve contradictory evidence; repair the first unsupported arrow; rerun prior tests and newly discovered bypasses. A quiet test run is not evidence of exhaustion. Stop at a bounded information-exhaustion point or hand off to an independent reviewer; never claim universal unbreakability.

## Known defects / adversarial targets
- This module exposes a local `authorize` function. A caller with its reference can self-issue permission. Production must separate the issuer at a stronger trust boundary.
- `effect` and `observe` are injected callbacks; no external custody, resource isolation, signature verification, persistence, or crash-safe atomicity is provided.
- An admitted asynchronous effect may complete after revocation. Resource-side fencing is required.
- Process restart loses all state; persistent revocation and generation tracking are not implemented.
- No proof that all paths to consequence traverse this module.
- No hard stop, hardware isolation, third-party audit, or measurable stop latency.
- Failed effects currently consume budget and are not distinguished from successful resource commitments.
- No delegation graph, policy-version check, trusted time, key rotation, or distributed atomic admission.

**Evidence state:** implementation candidate prepared; execution NOT TESTED; external enforcement NOT ESTABLISHED; independent reproduction NOT TESTED. Human owner controls merge, deployment, and any change to frozen baselines. CAN ⊬ MAY.
