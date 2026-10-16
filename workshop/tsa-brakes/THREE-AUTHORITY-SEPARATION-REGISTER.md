# Three-Authority Separation: Stage 1 evidence and Stage 2 deployment gate

**State: YELLOW. Three processes built. Three independent administrative domains NOT BUILT. No production connections or deployment authorized.**

## HTK
What changed: witness, resource, and observer now run in separate Python processes with separate SQLite databases and message channels in `three_process_lab.py`. Requester only receives a resource submission endpoint. Tests repeat replay, STOP, bypass and evidence erasure. The **same host administrator** still owns all processes and files, so this is a staged laboratory, not the requested independent infrastructure.

What failed: a compromised resource operator with filesystem write access can insert a protected-effect row directly. The observer sees no event because it only receives messages sent voluntarily by the resource. A shared-host administrator can delete both resource and observer rows. Distinct processes and databases therefore do not establish independent consequence observation or evidence custody.

## Stage 1 geometry
```
owner -> witness process [witness.db]
              | check(epoch) via IPC
requester -> resource process [resource.db] -> voluntary append via IPC -> observer process [observer.db]
                    ^ direct host write possible                       ^ host deletion possible
```
This design also has a check/commit time-of-check-to-time-of-use window. Revocation may happen after the witness says YES but before the resource commits. No claim of atomic stop linearization is admissible.

## Stage 2 proposed real authority topology (NOT IMPLEMENTED)
- **W domain:** independently administered witness host/service, private signing authority or mutually authenticated request channel, monotonic revocation epoch and durable tombstones, independent backup/restore governance. Resource operator cannot mint MAY or administer W.
- **R domain:** independently administered protected resource, resource-side enforcement at actual commitment, authenticated witness epoch or lease validation, denial on partition/stale lease, fencing across retries and queues. Requester cannot administer R.
- **O domain:** independently administered observer and evidence custodian, append-only or WORM retention with external timestamps/checkpoints, event capture outside resource's voluntary reporting channel, independent integrity verification and audit access. Resource operator cannot administer O.
- **Owner:** separately controls authority changes, emergency stop, recovery disposition, and acceptance. No one administrator or shared cloud root account may reconfigure W, R, and O together if independence is claimed.
- **Consequence:** use a harmless, externally observed sink that the resource operator cannot forge, suppress or reverse without a detectable record. A database row on the same host does not qualify.

## Privilege and custody acceptance
For each domain capture: owner/operator identity (role, not personal secrets); cloud account/organization; root and IAM graph; KMS/HSM custody; secrets distribution; deployment and CI permissions; backup and restore access; network paths; audit sink; external stop and recovery approvers; tested break-glass paths. A shared super-admin, shared CI token, shared backup root, or shared key vault is an unresolved common-mode authority path.

## Attack schedule
1. Admit one task with budget and epoch. Queue a harmless request.
2. Revoke at W, record authoritative effective ordering point.
3. Replay and retry queued/delegated/restarted requests; test partition and stale cache. Independently observe real effects at O.
4. Compromise requester credentials and process within declared scope; try issuer impersonation, alternative ingress, credential replay, deployment/recovery override.
5. Compromise R operator independently; attempt direct write, out-of-band effect, forged W response, event suppression and rollback. O must detect actual consequences and evidence gaps.
6. Compromise O operator independently; test record deletion and selective omission. External custody must detect tampering or explicitly fail to prove integrity.
7. Test collusion and common-mode IAM/CI/recovery authority, including who can re-enroll a stopped task.
8. Measure stop latency, in-flight ordering, failure windows, downstream irreversible consequences, and recovery behavior.

## Defeating observations
- **F-01** Resource operator produces a consequence after STOP without W authorization.
- **F-02** Observer fails to see an actual effect or cannot prove completeness of capture.
- **F-03** One principal can erase both effect and observer evidence.
- **F-04** W authorizes stale MAY after restore, partition, key rotation or administrative compromise.
- **F-05** W YES occurs before STOP but R commits afterward without an enforceable lease/transaction ordering guarantee.
- **F-06** One cloud/CI/backup administrator can alter all three domains.

## Reproduction and evidence
```bash
cd workshop/tsa-brakes
python -m unittest -v test_three_process_lab.py test_three_authority_compromise.py
```
Record exact SHA, OS/Python/SQLite versions, CI job, actor privileges, stop linearization, witness response, resource effect, observer evidence, alternate path, observed failure, alternative explanation and independent custodian. Test successes here reproduce **negative controls**, not secure isolation.

## Next admissible work
First implement and validate independent identity and privilege separation in an approved disposable multi-account lab. Next replace voluntary resource event reporting with an independently captured consequence. Then build a resource-side stop protocol with bounded leases/fencing or transaction-level authority checks, and run crash/revocation races. Finally commission a blind external specialist to find missing failure paths. Infrastructure provisioning, credentials, external connections, deployment, and independent acceptance require separate human authorization.

**No independent external stop demonstrated. CAN ⊬ MAY.**
