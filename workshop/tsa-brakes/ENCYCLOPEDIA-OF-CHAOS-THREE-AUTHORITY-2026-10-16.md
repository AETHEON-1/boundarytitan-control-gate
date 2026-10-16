# Encyclopedia of Chaos | EOC-2026-10-16-THREE-AUTHORITY

**Candidate archive entry. Human admission PENDING. State YELLOW.**
**Root question:** Can external STOP survive compromise of the requester, resource operator and evidence path?
**Research lineage:** CAN ⊬ MAY → temporal residual authorization → SQLite transactional brake → hard-crash repair → three-authority negative controls → process-separated specimen.

## HTK
The requester API denied revoked actions. But the resource operator could write directly to the resource DB after STOP, and the same-host administrator could erase the effect and observer rows. The three-process specimen then initially wired the resource witness-check channel to an unserved pipe; CI did not complete promptly. The wiring was corrected, but no independent administrative custody was created.

## Preserved failure objects
| ID | Failure / counterexample | Observation | State |
|---|---|---|---|
| EOC-TA-01 | Cross-store registration split on hard crash | Witness enrollment exists, resource task absent. Fail-closed reconciliation quarantines; does not restore availability or atomicity. | CONTRADICTED for atomic enrollment |
| EOC-TA-02 | Resource operator bypass | Direct resource DB write after witness STOP creates synthetic effect while gate denies API calls. | CONTRADICTED for complete mediation under same-host operator |
| EOC-TA-03 | Evidence erasure | Shared-host administrator deletes resource effect and observer receipt; both readers return empty. | CONTRADICTED for independent custody |
| EOC-TA-04 | Observer blind spot | Direct DB bypass is not automatically forwarded to polling/voluntary observer. | CONTRADICTED for complete capture |
| EOC-TA-05 | Three-process IPC miswiring | Resource check used an IPC channel without a witness receiver; CI SQLite job remained in progress while Node succeeded. | CONTRADICTED for initial integration; repair committed, validation pending |
| EOC-TA-06 | TOCTOU between witness YES and resource COMMIT | Independent witness check precedes uncoordinated resource commit; revocation may race after check. | INDETERMINATE pending deterministic schedule |
| EOC-TA-07 | Single host principal controls all three stores | OS-admin isolation, independent keys, and independently governed evidence not implemented. | NOT TESTED as independent separation |

## Corrective descendants
- CR-01: owner-only `Brake.reconcile()` closes incomplete witness-only tasks. Quarantine is not a distributed transaction.
- TA-02/03: tests deliberately demonstrate direct resource and evidence bypass. They remain expected negative controls, not resolved vulnerabilities.
- TA-05: `three_process_lab.py` now routes both owner and resource witness channels into `witness_server` and restricts mutation operations to the owner channel. Verify exact latest SHA in CI before claiming correction.
- Proposed but NOT IMPLEMENTED: separate cloud/IAM administration, resource commitment fencing, independent consequence sink and independently protected evidence custody.

## Omitted/remaining attack surfaces
- Race a witness YES against STOP before resource COMMIT, record exact linearization.
- Kill witness while resource is checking; demand fail-closed timeout, not indefinite hang.
- Simulate partition and stale cache; deny absent current MAY.
- Compromise resource administrator and force an external consequence not voluntarily reported to observer.
- Attack common cloud root, CI, backup, KMS, restore, and operator collusion.
- Compare independently captured consequence with logs under selective omission and erasure.
- Reproduce on genuinely separately administered environments; physical power loss and downstream effect not tested.

## Reproduction and source anchors
- `workshop/tsa-brakes/test_crash_boundaries.py`
- `workshop/tsa-brakes/test_three_authority_compromise.py`
- `workshop/tsa-brakes/three_process_lab.py`
- `workshop/tsa-brakes/test_three_process_lab.py`
- `workshop/tsa-brakes/CRASH-REVOCATION-ATTACK-LEDGER.md`
- `workshop/tsa-brakes/THREE-AUTHORITY-SEPARATION-REGISTER.md`
- Draft PR #82, specialist challenge issue #83.
- Historical verified baseline before three-process integration: 65/65 tests and repository verification at e0d31c92bbf04c5b6656bf0a9077d1dd0b033687.

## Archive disposition
This file is a **candidate** Encyclopedia of Chaos entry, not a frozen constitutional baseline, independently validated result, or human-admitted canonical archive object. Preserve negative evidence and corrected claims. No Green, merge, deployment, publication or authority transfer.

**Freeze the evidence. Never freeze the search. CAN ⊬ MAY.**
