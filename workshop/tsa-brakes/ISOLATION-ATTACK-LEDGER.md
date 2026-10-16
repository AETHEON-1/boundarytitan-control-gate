# Isolation Round v0.2: Attack Ledger and Unresolved Failures

State: YELLOW / implementation candidate. Execution NOT TESTED. Independent review NOT TESTED.

## Implemented fixture
- issuer and resource execute in distinct Node child processes;
- issuer creates HMAC-signed, single-use task grants;
- resource checks task identity, principal, action, resource, expiry, epoch, budget and replay;
- controller sequences task registration and closure;
- six test cases cover replay, revocation, queued execution, delegated principal, restart with fresh key, and forged tokens.

## Defeating observations and limitations
F-01 CRITICAL: Controller provisions both services and the same signing secret. A compromised controller or any actor with the secret can mint authority. This is not external custody. Repair: independently administered issuer key and resource verification-only public key, with privileged controller separated from requesting agent.
F-02 CRITICAL: Closure requires separate issuer and resource messages. There is a propagation interval in which a previously issued grant can commit at the resource after issuer-side closure. Repair: serialize revocation and commitment at the authoritative resource or prove a bounded revocation propagation SLA with explicit commitment semantics.
F-03 CRITICAL: Resource and issuer state are volatile. Restart with a different key rejects old grants but does not demonstrate durable revocation, restart with the same key, or recovery from a stale snapshot. Repair: persistent externally protected epoch/tombstone ledger and restart tests using restored keys and task state.
F-04 HIGH: Child-process IPC is mediated by a trusted parent. This is not a hostile agent process with direct access to a separately protected resource. Repair: launch an untrusted requester with no controller channel, keys or resource file handles; independently inspect process permissions.
F-05 HIGH: In-memory effects and events are both held by the resource. They are not independently retained evidence and disappear on process exit. Repair: separate custody with an independent resource-effect oracle.
F-06 HIGH: Scope is single action/resource; composition, multi-step budgets, nested delegation, cascading cancellation, physical effects and irreversible downstream commits are not implemented.
F-07 HIGH: No atomic resource-side durable transaction, no fsync, no fencing for already-running work, no latency measurement, no independent consequence-path inventory.
F-08 MEDIUM: The signing secret is passed in process environment; process/environment exposure is not addressed. Never use this reference design with real credentials.
F-09 MEDIUM: Resource registers task metadata from controller without verifying an independently issued authorization. A malicious controller can register its own task. This is a deliberate counterexample to full authority separation.
F-10 MEDIUM: No resource quota beyond number of admitted operations; bytes, dollars, time, target count and cumulative effects are not bounded.

## Next required adversarial cycle
1. Preserve the above failures as historical observations of architecture, not observed runtime exploits.
2. Replace symmetric shared-key verification with issuer-private asymmetric signing and resource-public verification.
3. Give requester no issuer/admin channel or protected-resource handle.
4. Add an externally owned durable revocation tombstone and atomic commitment boundary.
5. Demonstrate restart with retained keys and restored state, including stale snapshots.
6. Put an independent observer outside the resource process and compare model claims with actual effects.
7. Test an intentionally bypassable specimen alongside the repaired specimen; preserve both results.
8. Request an independently run specialist handoff and clean-room crosswalk.

## Bounded stopping criterion
A run may report no observed failure only for a declared specimen SHA, environment, attack set, and evidence coverage. Never declare complete mediation, independent verification, universal safety, or exhausted attack surface from a passing local suite.

CAN does not entail MAY. The machine cannot be the final judge of the machine.
