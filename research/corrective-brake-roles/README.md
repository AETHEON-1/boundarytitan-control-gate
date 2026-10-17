# Corrective role-channel fixture — 2026-10-17
State: YELLOW / DEVELOPMENT ONLY / NOT AN INDEPENDENT BRAKE.
Owner: Michael J. Cates / human BoundaryTitan owner. No merge, deployment, new credentials or external systems enabled.

## Exact lineage
Original specimen: PR #88 at 9ccc53ed09015121e13460099daf32c8d4dea8b7, research/reference-brake.
Original code was retrieved unchanged; SHA-256 and complete local run output are in evidence/original-reproduction.json.
Same-assistant local reproduction: original tests 10/10 pass; adversarial tests 6/7 pass, including two successful attacks and one failing identity-suspension assertion. This is local reproduction, not independent review.
Original PR #88 is untouched.

## Preserve failures before correcting
F1: shared command queue can mint authorization and commit.
F2: shared witness queue accepts fabricated evidence.
F3: revoke advances epochs but permits a new grant; identity-suspension assertion fails. Existing behavior is grant invalidation, not necessarily a policy defect.
F4: process termination alone observes neither resource-side denial nor durable recovery.
C1: first corrective draft crashed on BrokenPipeError after recording an effect when witness was killed; the test suite still returned success. Preserved code and complete stderr in evidence/corrective-initial*.
C2: next corrective draft used multiprocessing object decoding; requester could execute an inert local marker before role checks. Preserved specimen, marker probe and log in evidence/pickle-*.
C1 repair returns EFFECT_COMMITTED_WITNESS_UNKNOWN and preserves resource inspector state. The effect remains committed; no rollback claim.
C2 repair uses JSON bytes rather than pickle decoding; final regression sends the former marker and observes denial, no marker and no effect.
Final local tests: 10/10; exact hashes and full output in evidence/corrective-final.json. Successful checks do not erase any failed specimen.

## Explicit revocation contract
No ambiguous revoke operation is added.
- invalidate_grants(subject): increment epoch; prior grants denied; new issuer grants permitted.
- suspend_identity(subject): increment epoch and deny new grants/commits until issuer resume_identity.
- resume_identity(subject): permit fresh grants; previously invalidated tokens stay invalid.
These are separate development operations. This does not decide what existing revoke must mean in deployment; that remains a human/specialist policy disposition.

## Channel and evidence model
The trusted controller creates separate issuer, requester, inspector and observer handles. The requester channel cannot invoke issuer operations; the observer cannot append witness records. The resource sends effects to a separate witness process. No role is accepted from a caller-supplied identity field.
These are bearer process handles, NOT separately administered credentials. The harness owns every handle. A controller/host owner can still issue grants, terminate processes, inspect memory or substitute code.
The resource and authorization checks still share one process. Effects and witness records are in memory. A witness record is not an independently administered consequence record.
JSON removes this demonstrated pickle execution path; parser malformation, flooding, resource exhaustion, descriptor theft and arbitrary host compromise are not contained or exhaustively tested.
No key protection, OS privilege separation, durable restart, distributed linearization, independently administered resource gate, or alternate-path completeness is established.

## Reproduce without hiding a failing result
Corrective suite: cd research/corrective-brake-roles && python3 -m unittest -v test_brake_roles.py
Original source: retrieve the three original modules at the exact PR #88 SHA; run python3 -m unittest -v test_brake_v2.py test_adversarial.py in an isolated directory. Expected exit 1 must remain a recorded failure, not be relabeled a defense pass.
Preserved failure specimens in evidence/ are historical. Do not import them into production or blindly run them against live resources.
The marker probe writes only to a temporary local directory and uses no external endpoint.
New corrective tests ran locally on Python 3.12; repository CI tests do not automatically discover this directory.

## Specialist handoff / open Sigma-2 questions
1. Can independently administered issuer credentials deny minting when requester and controller are compromised? This fixture cannot establish it.
2. Which source has authority to choose grant invalidation versus identity suspension, and who may resume?
3. Can a resource commit after a revocation linearizes under concurrent execution, partition, retry or restart? Current loop is serialized; durable recovery NOT TESTED.
4. Does every path to the actual resource cross enforcement? Supply a declared path inventory plus a deliberately omitted path; report UNKNOWN rather than universal closure.
5. Can an independently custodied observer reveal resource-operator tampering? Same-host witness does not answer this.
6. When effect succeeds but witness fails, who owns reconciliation? A timeout or missing acknowledgment cannot erase consequence.
7. What can the last external refusal actually prevent after an effect crosses its frontier?
Next admissible experimental boundary: separate administrative identities, separately owned resource, external effect record, frozen threat model, disposable namespace and explicit human execution authorization. No real-provider access or live connection is authorized here.
Stop point: local corrective preparation complete; independent boundary not established.
