# Durable Stop Round v0.3 | Recovery and Defeating Cases
Status: YELLOW / candidate / NOT TESTED / not deployable

## Candidate improvements
- Ed25519 issuer-private signing, resource-public verification.
- Local persisted task closure/epoch, replay set, budgets and simulated resource effects.
- Atomic temp-write, file fsync, rename and parent directory fsync for a local POSIX specimen.
- Test cases for queued grants, same-key restart, delegated identity, expiry, forged signature and replay.

## Critical unclosed failures
D-01 CONCURRENT RESOURCE INSTANCES: each gate holds an in-memory snapshot. Two independent instances can accept the same grant or overwrite each other's state. Single-process synchronous commit does not establish distributed atomicity. Required repair: exclusive durable transactional authority at the resource (database transaction/lock/fencing) and concurrent-process test.
D-02 STALE SNAPSHOT ROLLBACK: an operator who restores an older state file can erase revocation tombstones. Required repair: externally held monotonic generation/witness with rollback detection and recovery quarantine.
D-03 PRIVILEGED HUMAN OVERRIDE: any operator with write access to state or issuer private key can change effective authority. Required repair: OS separation, key custody, dual control, independent audit, emergency path and explicit override consequences.
D-04 REGISTRATION CONTROL: caller with register() access can create tasks. A valid signature is necessary but not sufficient if task creation is ungoverned. Required repair: owner-only authenticated enrollment channel with external issuance evidence.
D-05 EVIDENCE INDEPENDENCE: simulated effect and event record live in the same state file. They are not independently observed effects. Required repair: independently held observation channel that verifies actual protected-resource changes.
D-06 EFFECT SEMANTICS: durable fixture commit is not an external irreversible operation; resource transactions, outbox and downstream acknowledgements are not implemented.
D-07 RECOVERY AUTHORITY: no authorized recovery API or dual approval; do not auto-unstop, reissue old tasks or reuse epochs. Recovery must require new task identity, new authorization, external review and negative regression before release.
D-08 KEY LIFECYCLE: no trusted key distribution, rotation, hardware custody, public-key pinning or compromise handling.
D-09 ENVIRONMENT: filesystem durability assumptions are platform-specific and not verified; no crash injection or power-loss simulation.
D-10 STOP LATENCY: no measured resource stop latency, partition semantics, or queue-drain guarantee.

## Controlled recovery workflow candidate
1. Stop protected commitments at resource; record owner and effective ordering point.
2. Freeze all pending task identities and delegation trees.
3. Verify durable tombstone against independent monotonic witness.
4. Inspect queued/retried/partitioned effects with a separately controlled observer.
5. Recover into QUARANTINE with no ability to commit.
6. Require two externally accountable roles to approve a *new* task authorization, not restoration of a revoked grant.
7. Run positive and negative controls and replay all prior bypass cases.
8. Preserve old evidence, corrections, human override receipts and contradictions.
9. Human owner decides whether release is allowed; no self-certification.

## Open specialist challenge
Can two resource instances race and both commit a grant? Can a restored stale state file resurrect MAY? Can an operator with administrative access bypass the resource gate and falsify its own evidence? These are live design falsifiers, not resolved tests.

Do not claim that no failures were observed until the tests are executed, independently reproduced and scoped. No production use. CAN does not entail MAY.
