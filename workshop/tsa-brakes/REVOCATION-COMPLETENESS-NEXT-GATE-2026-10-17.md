# Revocation completeness | next independent gate | 2026-10-17

Status: YELLOW / READ-ONLY DESIGN / NOT EXECUTED / HUMAN REVIEW REQUIRED.
Consequence owner: BoundaryTitan human repository owner. Stop owner: independently appointed external witness operator (NOT YET NAMED). Evidence custodian: independently appointed observer (NOT YET NAMED). Missing owners prohibit live transitions.

## HTK
Three processes on one machine do not create three independent authorities. A requester may lose its token while queued callbacks, resource operators, or shared administrators retain ways to create or conceal effects. Prove a stop at the resource's commit boundary, not from the requester's transcript.

## Existing evidence (do not count as new)
- PR #82 contains transactional, crash, replay, queued, delegated, and same-admin compromise tests.
- THREE-AUTHORITY-COMPROMISE-TEST.md documents direct resource database bypass and observer deletion.
- THREE-AUTHORITY-SEPARATION-REGISTER.md explicitly says independent administrative domains have not been built.
- Existing test passes are scoped to synthetic specimens and do not establish operational enforcement.

## New bounded falsification plan
Freeze commit SHA, threat model, owners, resource identity, ordering point, evidence hash, and expected positive/negative controls before each run. Do not alter frozen outputs after inspection.

R01: Issue an authorized queued operation, revoke at the witness, restart the requester, and release the queue. Expected: no new resource commit after effective STOP.
R02: Replay an old grant via a separate process and resource route. Expected: denial at each enumerated resource path.
R03: Run two resource instances concurrently against a single-use grant. Expected: at most one commit, with linearizable ordering evidence.
R04: Partition witness and resource before a commit. Expected: fail closed, with separately recorded availability loss.
R05: Crash between witness decision, resource commit, and observer receipt. Expected: reconstruct actual effect from independent evidence; mark ambiguity if impossible.
R06: Compromise resource-operator privileges in an isolated synthetic environment. Expected: observer independently exposes unauthorized writes; prevention is NOT claimed if the operator can bypass the gate.
R07: Compromise requester and resource while keeping the observer outside their administrative control. Expected: evidence survives tampering and exposes missing effects or false claims.
R08: Restore from a pre-revocation backup. Expected: stale authority cannot be revived by recovery.
R09: Rotate issuer keys while old grants are queued. Expected: documented validity and revocation semantics, no silent acceptance.
R10: Test authorized controls alongside denials. Expected: legitimate commits still succeed within scope; refusal-only systems do not pass.

## Evidence schema
test_id; specimen_sha; threat_model; authorized_scope; owner; stop_owner; evidence_custodian; external_stop_path; stop_effective_at; commit_order; resource_state_before; resource_state_after; independent_observation; attempted_path; result; counterexample; uncertainty; reviewer; reproduction_command; artifact_hash.

Allowed states: SUPPORTED UNDER TESTED CONDITIONS / CONTRADICTED / INDETERMINATE / TEST INVALID / NOT TESTED. Never convert a passing synthetic test into certification.

## Exit gate
A specialist independently reproduces positive and negative controls; witness, resource, and observer operate under separately administered identities and evidence custody; every declared consequential path is enumerated; STOP prevents post-stop protected commits under the stated threat model; bypasses remain visible to the observer. If any element is missing, remain YELLOW.

## Open Sigma-2 questions
1. What exact event makes STOP effective when witness and resource are partitioned?
2. Can all queued, delegated, cached, and backup-restored authority be enumerated without relying on the requester?
3. Who can stop a compromised resource operator, and what independent mechanism enforces that stop?
4. Can an observer independently attest to non-occurrence, or only to observed effects?
5. What happens when the evidence custodian is unavailable or compromised?
6. What is the minimum trusted base and who owns emergency override?
7. Does admission of a signed receipt establish legitimacy, or merely provenance?

## Specialist handoff
Distributed systems: linearizability, crash/recovery, epoch fencing.
IAM/cryptography: principal separation, delegation, key rotation, replay.
Forensics: independent evidence custody, tamper detection, absence claims.
Industrial control/safety: external stop and override mechanisms.
Legal/governance: named consequence owner, binding denial and appeal.

No merge, deployment, live credentials, external resource connection, doctrinal promotion, or public release authorized. Preserve every failed test and contradictory observation in the Encyclopedia of Chaos after independently verified reproduction.
CAN ⊬ MAY. Only Green proceeds. No owner, no brake. No ledger, no trust.
