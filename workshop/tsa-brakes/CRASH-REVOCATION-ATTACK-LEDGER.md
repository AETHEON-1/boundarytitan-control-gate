# Crash / Revocation Adversarial Ledger v0.1
**State: YELLOW | sandbox only | no deployment or independent custody.**

## HTK
A successful resource-side stop must prevent a *new protected effect* after the stop's effective ordering point, even if the requester has an old token, the process dies, or a task is retried. A local process can refuse correctly while the two databases disagree about enrollment. This is a concrete availability/consistency failure, not a demonstrated unauthorized effect.

## Reproduction
Run from `workshop/tsa-brakes`:
```bash
python -m unittest -v test_crash_boundaries.py test_transactional_brake.py test_process_boundary.py test_resource_boundary.py
```
The crash suite launches a fresh Python interpreter and calls `os._exit(79)` at named checkpoints. It checks database contents after the child is dead. An injected process exit is not a power-loss/fsync proof.

## Failure and repair ledger
| ID | Trigger | Observation / falsifier | Status |
|---|---|---|---|
| CR-01 | Crash after witness enrollment commit, before resource commit | Witness says task exists; resource task absent; same ID cannot be reused. A cross-store atomicity/availability failure. | CONTRADICTED for atomic enrollment; locally reproduced |
| CR-02 | Crash before resource effect COMMIT | No effect durable; subsequent fresh action can proceed. | SUPPORTED in local subprocess fixture |
| CR-03 | Crash after resource effect COMMIT, before response | Effect durable despite no response; replay of same token rejected. | SUPPORTED in local subprocess fixture |
| CR-04 | Crash after witness STOP COMMIT, before resource stop update | Resource still shows open but witness denies stale commit. | SUPPORTED in local subprocess fixture |
| CR-05 | Crash after resource STOP COMMIT | Stop remains effective after restart. | SUPPORTED in local subprocess fixture |
| CR-06 | Owner invokes fail-closed reconcile after CR-01 | Incomplete task is tombstoned; same ID cannot be reauthorized; new human-owned task ID required. | SUPPORTED in local subprocess fixture |
| CR-07 | Crash after witness reconcile commit, before resource commit | Unresolved partial reconciliation and possible stale resource state; witness-side denial remains the intended guard. | NOT TESTED |
| CR-08 | Storage loss, rollback or admin tampering on witness and resource together | Same administrator can restore or rewrite both. | NOT TESTED |
| CR-09 | Real downstream effect after SQLite transaction | An external effect may continue despite successful SQLite stop. | NOT TESTED |
| CR-10 | OS power loss, filesystem durability, fsync behavior | Process exit is not evidence of physical durability. | NOT TESTED |
| CR-11 | Concurrent stop during commit with measured ordering | Existing races test counts but not full linearization trace or stop latency. | NOT TESTED |
| CR-12 | Attacker-controlled fault hook | Fault injection is a privileged test seam and must never be reachable through requester interface. | NOT TESTED under hostile OS control |

## Repair
`Brake.reconcile()` is a privileged fail-closed reconciliation operation. It acquires witness then resource write locks and quarantines witness-only enrollment by closing its tombstone, never restoring MAY. It also closes resource-only tasks and propagates stopped witness state into the resource when possible. **It does not make two databases atomic.** It must not be exposed on the requester endpoint. Failures, inaccessible stores, and uncertain history require external human disposition.

## What remains broken or unproven
- No independent administrative control over resource, witness, or effect oracle.
- No tamper-resistant evidence custodian; a separate reader is not a separate authority.
- No power-failure simulation, filesystem fault model, distributed transaction protocol, or measured stop latency.
- No assurance of end-to-end downstream consequence extinction.
- Reconciliation is a denial/quarantine mechanism, not transparent availability restoration.
- The task registration cross-store split is still architecturally possible; only its post-crash treatment is improved.
- Independent specialists have not reproduced the tests.

## Next specialist falsifiers
1. Kill a child after the witness reconciliation commit; compare both stores after restart.
2. Use a proxy for an external effect and kill between database commit and effect dispatch. Demand a durable outbox and independently observed idempotent delivery.
3. Move witness to a separately administered principal/host; attempt key/custody compromise and rollback.
4. Model-check stop/commit/recovery ordering with a real linearization point and an explicit physical or financial consequence oracle.
5. Blind specialist omission search: ask for a failure absent from this ledger and the existing 36-case battery.

Local tests are developer-run evidence, not independent certification. GitHub CI status must be checked for the exact committed SHA; a successful earlier SHA does not validate new code.

**Only Green proceeds. CAN ⊬ MAY. No owner, no brake. No ledger, no trust.**
