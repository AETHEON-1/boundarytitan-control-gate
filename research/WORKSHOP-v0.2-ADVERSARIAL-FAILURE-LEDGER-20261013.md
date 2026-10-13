# Workshop v0.2 adversarial failure ledger — 2026-10-13

Status: REPRODUCED LOCALLY / UNREVIEWED / NOT A MERGE OR DEPLOYMENT APPROVAL

## Scope and custody
Target: separate offline artifact `boundarytitan-workshop-v0.2.zip` in the conversation working container. The artifact is **not** a committed repository baseline. Tested files: `workshop.py`, `authority.py`, and `fixtures/agent-revocation.json`. Reproducer below describes local probes against that candidate; this record does not imply that those modules already reside in the GitHub repository. No production target, credentials, live API, external execution, or live stop path tested. Evidence custodian for local run: assisting machine (not independent custody). Consequence owner/disposition authority: human BoundaryTitan owner. External stop path: human-controlled refusal of promotion/merge; runtime revocation not tested.

## Probe observations
Seven targeted negative cases were submitted through `workshop.inspect` and were **missed** by the corresponding specific detector. Detection = relevant problem reported in the matching findings or evidence response; generic `PREPARATION_ONLY` is not detection of a malformed source claim.

| ID | Input mutation | Expected detector | Actual result |
|---|---|---|---|
| F01 | Source `content_sha256="not-a-hash"` | Reject or flag invalid digest format | MISSED |
| F02 | Source `independently_authenticated=true` without verification artifact | Flag unsupported independent-authentication claim | MISSED |
| F03 | Claim marked `SUPPORTED` with `independent_review_ref="fictional-review-123"` | Reject or flag unresolved reviewer record | MISSED |
| F04 | Correction flags as strings `"false"`, fictional confirmation ref | Type validation / flag unrepaired chain | MISSED |
| F05 | Omission `cause_evidence_refs=["fabricated"]` | Ref resolution rather than bool(nonempty) | MISSED |
| F06 | `proposed_transitions=[]` | Flag absence of consequence-transition mapping | MISSED |
| F07 | All eight authority stages `EVIDENCED`, each referencing `"imaginary"` | Flag unresolved evidentiary links | MISSED |

**Interpretation:** the candidate is a review packet generator with potentially misleading evidence labels; no actual elevation of action authority was observed or attempted. A `SUPPORTED` label is not independent support. Nonempty hashes and locators are not verified content. A reference string is not a custody record.

## Surviving boundary
All seven packets still report `execution_authorized=false`, `deployment_authorized=false`, `publication_authorized=false`, and `status=PREPARATION_ONLY`. Those are output flags, **not** tested external enforcement mechanisms. Logical `simulate_stop` does not exercise a physical/network/credential stop.

## Proposed repairs (not yet applied to v0.2)
1. Strict typed schema; reject bool-like strings and malformed digests.
2. Resolve source and review references against a registered local evidence inventory with content hashes; never infer authenticity from a user-input boolean.
3. Separate ASSERTED, LOCATED, RETRIEVED, HASH_MATCHED, INDEPENDENTLY_AUTHENTICATED, and INDEPENDENTLY_ADJUDICATED states.
4. Require and validate a typed transition graph for a consequential case; permit explicit NOT_APPLICABLE only with an inspectable justification and review.
5. Require matched evidence links for correction, recipient inventory, downstream repair, and external confirmation.
6. Re-run negative controls after repairs; retain pre-repair failures and cross-domain counterexamples.

## Test status and authority
Evidence state: SUPPORTED for reproduction of these seven *local detector misses*, not for general-world failure.
Independent technical review: NOT STARTED.
New domain adapter admission: NOT AUTHORIZED.
Merge to main: NOT AUTHORIZED BY THIS RECORD.
Deployment or publication as established field result: NOT AUTHORIZED.
Falsifier/reopen: independent reproduction contrary to any recorded observation, input/schema mismatch, or evidence of a real enforcement mechanism invalidating the limited interpretation.

**Control statement:** the model may preserve failures and propose repairs; it may not revise frozen doctrine, certify the repair, or authorize consequential use.
