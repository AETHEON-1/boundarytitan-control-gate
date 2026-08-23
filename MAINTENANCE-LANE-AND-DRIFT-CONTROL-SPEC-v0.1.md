# Maintenance Lane and Drift-Control Specification v0.1

**State:** PREPARED — REVIEWABLE
**Purpose:** Keep doctrine, rules, states, schemas, modules, tests, evidence, owners, and external stop paths synchronized after change.
**Constitutional test:** `CAN ⊬ MAY`

## Core proposition

> A merged artifact is not a maintained control.

> Maintenance must prove that the repository’s declared control state still matches its executable, testable, and reviewable state.

## Maintenance chain

Change proposed → Impact mapped → Authority checked → Source hierarchy updated → State and schema reconciled → Module and test links updated → Drift checks run → Human review → Recorded maintenance disposition

## Controlled surfaces

| Surface | Maintenance question |
|---|---|
| Constitution | Did the change alter or conflict with an invariant? |
| Source hierarchy | Is the artifact in the correct authority class? |
| Doctrine register | Did a new invariant or interpretation appear? |
| Glossary | Did a term change meaning or scope? |
| Architecture | Did a boundary, dependency, or control sequence change? |
| Role model | Did ownership, authority, or separation of duties change? |
| State model | Are new states and transitions represented canonically? |
| Rule catalog | Are new prohibitions and fail-closed rules recorded? |
| Schemas | Are required fields and states machine-readable? |
| Modules | Is every declared control mapped to an implementation surface? |
| Tests | Does every critical rule have an independent test? |
| Failure register | Does every high-consequence failure have detection and containment? |
| Evidence | Can the current result be reconstructed? |
| Owners | Are owners and stop authorities current and capable? |
| Versioning | Can the change be traced, migrated, and rolled back? |

## Change classes

| Class | Description | Required disposition |
|---|---|---|
| Documentation | Clarification with no semantic change | Record and link |
| Doctrine | New or changed invariant | Human-owner review before adoption |
| Schema | Field, enum, or validation change | Migration and compatibility test |
| State | New state or transition | State-machine review and failure mapping |
| Rule | New permission, denial, or hold condition | Rule-to-test traceability |
| Module | Runtime behavior or boundary change | Independent implementation review |
| Cryptography | Key, root, algorithm, signature, or revocation change | Security review and rollback plan |
| Authority | Owner, delegation, approval, or stop-path change | Identity and authority verification |
| Test | Threshold, fixture, evaluator, or evidence-path change | Independent admission and provenance |
| Publication | Public wording or artifact exposure | Human publication authority |

## Mandatory maintenance record

Every non-trivial change must record:

- change identifier;
- proposer;
- date and current version;
- purpose and scope;
- affected files and control surfaces;
- source authority class;
- invariant impact;
- schema impact;
- state impact;
- rule impact;
- module impact;
- test impact;
- failure-state impact;
- owner impact;
- stop-path impact;
- migration or rollback plan;
- unresolved uncertainty;
- human reviewer;
- final maintenance disposition.

## Drift classes

| Drift | Definition | Default response |
|---|---|---|
| Doctrine drift | Implementation contradicts a constitutional invariant | Hold and escalate |
| Semantic drift | Same term has multiple active meanings | Freeze interpretation |
| Schema drift | Documents and machine-readable fields disagree | Block affected path |
| State drift | Runtime or tests use states absent from canonical model | Hold transition |
| Rule drift | Behavior no longer matches the rule catalog | Re-run review and tests |
| Test drift | Tests no longer exercise current controls | Mark evidence stale |
| Failure drift | New failure mode lacks owner or containment | Yellow or Red |
| Authority drift | Named owner or stop authority changed or expired | Revalidate before action |
| Cryptographic drift | Key, root, algorithm, or revocation policy diverges | Suspend affected authority |
| Evidence drift | Receipts, hashes, or provenance no longer reconcile | Preserve and investigate |
| Version drift | Deployed or referenced version differs from source | Block release or reopen |
| Publication drift | Public artifact overstates current state | Correct or withdraw wording |

## Required maintenance gates

### Gate 1 — Admission
Reject changes with missing scope, owner, authority class, or rollback condition.

### Gate 2 — Dependency impact
Identify every invariant, state, schema, rule, module, test, failure mode, owner, and stop path touched by the change.

### Gate 3 — Reconciliation
Require canonical files and derived artifacts to agree before review proceeds.

### Gate 4 — Independent test
Run tests that were not authored or controlled solely by the changed component.

### Gate 5 — Human disposition
Record approve, deny, defer, narrow, reopen, or retire. Machine output cannot supply the final disposition.

### Gate 6 — Post-merge verification
Verify that the merged repository, generated artifacts, public indexes, and recorded state all describe the same version.

## Minimum traceability matrix

Each critical control must map:

Invariant → Rule → State → Schema field → Module → Test → Failure state → Owner → External stop → Evidence receipt

Missing links are recorded as `UNKNOWN`, not guessed.

## Retirement and supersession

An obsolete artifact must not be silently deleted when it carries historical authority or evidence.

Retirement requires:

- successor or reason for retirement;
- preserved historical reference;
- affected links and indexes updated;
- migration status;
- human disposition;
- confirmation that no active module or test depends on it.

## Maintenance states

`CURRENT` · `DRIFT_SUSPECTED` · `RECONCILIATION_REQUIRED` · `REVIEW_REQUIRED` · `BLOCKED` · `SUPERSEDED` · `RETIRED` · `REOPENED`

Do not use `CURRENT` merely because a file is present in the default branch.

## Failure handling

If maintenance cannot establish that the declared control state matches the effective control state:

- affected actions remain non-Green;
- authority release is held or narrowed;
- stale evidence is marked stale;
- the discrepancy is preserved in the ledger;
- an owner and external stop authority are assigned;
- reopening remains possible;
- the machine may not resolve the discrepancy by choosing the most convenient interpretation.

## Maintenance metrics

Track at minimum:

- time from change to impact map;
- unresolved drift count and age;
- stale evidence age;
- owner/stop-authority verification age;
- schema-to-state mismatch count;
- rule-to-test coverage;
- failure-mode-to-containment coverage;
- revocation-path test age;
- time to detect and reconcile drift;
- changes merged without complete traceability;
- unauthorized or undocumented state transitions.

Metrics are evidence of maintenance activity, not proof of safety.

## Review cadence

Review after every non-trivial merge and periodically for:

- source hierarchy;
- active doctrine and proposed invariants;
- state and schema compatibility;
- cryptographic roots, algorithms, keys, and revocation;
- owner and stop-authority availability;
- test freshness and independence;
- public claims versus current implementation;
- retirement and supersession status.

Cadence does not replace event-triggered review after a control, authority, cryptography, or consequence change.

## Final boundary

Maintenance may detect drift, preserve history, open discrepancies, route ownership, and prepare corrections.

Maintenance may not silently redefine doctrine, erase contradictory evidence, approve its own correction, certify synchronization, or close a control gap without external human disposition.

> **The repository is not maintained because it contains the documents. It is maintained when the documents, controls, tests, owners, and brakes still agree.**

**Only Green proceeds.**  
**No owner, no brake.**  
**No ledger, no trust.**