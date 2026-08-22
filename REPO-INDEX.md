# BoundaryTitan Control Gate — Complete Repository Index

**Repository state:** prototype / human review required
**Package:** `@boundarytitan/control-gate-phase1`
**Version:** `0.1.0-phase1`
**Primary boundary:** machine output prepares evidence and routes review; it does not authorize, certify, approve deployment, or close its own review.

## Current verification

- TypeScript typecheck: PASS.
- Robotics kernel and specialist handoff battery: 8/8 tests PASS.
- Full Jest suite: 43/45 PASS.
- Remaining failures: two Zombie Permission Hunter fixtures classify an exact 24-hour expiry as `EXPIRING` rather than the stale expected value `NO_DECLARED_DEFECT_DETECTED`.
- Independent verification, field validation, deployment, and publication: NOT ESTABLISHED.
- `node_modules/` is local untracked test infrastructure and is excluded from this index.

## Reading order

1. `README.md`
2. `00-CONTROL-SURFACE-SWEEP-STATUS.md`
3. `01-PROJECT-CONSTITUTION.md`
4. `02-CANONICAL-SOURCE-HIERARCHY.md`
5. `03-DOCTRINE-INVARIANT-REGISTER.md`
6. `05-SYSTEM-ARCHITECTURE.md`
7. `07-AUTHORITY-ROLE-MODEL.md`
8. `08-STATE-MODEL.md`
9. `17-TEST-STRATEGY.md`
10. `20-BREAK-PASS-REPORT.md`
11. `21-HUMAN-DECISION-PACKET.md`
12. `25-KNOWN-LIMITATIONS.md`

## Governance and system definition

| File | Role |
|---|---|
| `01-PROJECT-CONSTITUTION.md` | Constitutional scope and non-authority rules |
| `02-CANONICAL-SOURCE-HIERARCHY.md` | Source precedence and custody |
| `03-DOCTRINE-INVARIANT-REGISTER.md` | Frozen boundary invariants |
| `04-GLOSSARY.md` | Terminology |
| `05-SYSTEM-ARCHITECTURE.md` | System structure |
| `06-DOMAIN-MODEL.md` | Domain entities and relationships |
| `07-AUTHORITY-ROLE-MODEL.md` | Human and system roles |
| `08-STATE-MODEL.md` | State transitions |
| `09-RULE-CATALOG.md` | Enforceable rule catalog |
| `10-MODULE-CATALOG.md` | Module inventory |
| `11-DATA-MODEL.md` | Data structures |
| `12-CONSEQUENCE-RECEIPT-SPEC.md` | Consequence receipt design |
| `13-PERMISSION-MODEL.md` | Permission and revocation model |
| `14-USER-WORKFLOWS-AND-UI.md` | Human-facing workflows |
| `15-API-SPECIFICATION.md` | API boundary |
| `16-THREAT-AND-FAILURE-MODEL.md` | Threats and failure modes |
| `18-DEPLOYMENT-RECOVERY-REVOCATION.md` | Recovery, revocation, and deployment boundaries |
| `19-TRACEABILITY-LEDGER.md` | Evidence and traceability |
| `24-OUT-OF-SCOPE.md` | Explicit exclusions |
| `25-KNOWN-LIMITATIONS.md` | Known limitations |
| `OPEN-BOUNDARY-CONTROL-ARCHITECTURE-v0.1.md` | Non-closed end-to-end hierarchy and attackable kernel |
| `THERMODYNAMIC-REGULATION-METHOD-v0.1.md` | Energy, heat, reserve, stop-margin, and restart control method |
| `COMMUNICATION-DEFAULT-ADVERSARIAL-BATTERY-v0.1.md` | Adversarial review of default communication behavior |
| `PRESERVE-THE-UNKNOWN-INVARIANT-v0.1.md` | Cross-lane uncertainty, delegation, communication, and receipt invariant |
| `TEST-RESULT-ONLY-v0.1.md` | Verified test and typecheck result with failure disposition |
| `250-SIGMA-LANES-SOURCE-SYNC-v0.1.md` | Drive source inventory and bounded upgrade preparation for the Sigma lanes project |
| `SLEDGEHAMMER-WORKFLOW-v0.1.md` | Adversarial claim, arrow, brake, receipt, and handoff workflow |
| `OPEN-HANDOFF-TRANSFER-PACKAGE-v0.1.md` | Transfer custody, doctrine, limits, and independent-review boundary |
| `BOUNDARY-ASSISTANT-TOOLBOX-HIERARCHY-v0.1.md` | Human-protection tool taxonomy and repository hierarchy |
| `IMPOSSIBLE-SYSTEM-NAMING-DECISION-v0.1.md` | Current project naming and non-closure boundary |
| `TERMINOLOGY-ENCYCLOPEDIA-ARCHITECTURE-v0.1.md` | Cross-domain vocabulary, modal logic, translation, and linguistic security surface |
| `END-TO-END-REVIEW-STATUS-v0.1.md` | Current repository review, verification, advancement, and open-state record |
| `REMAINING-ITEMS-DISPOSITION-v0.1.md` | Disposition of access, lane reconstruction, verification, legal, field, publication, merge, and deployment items |
| `MAINTENANCE-WORKFLOW-v0.1.md` | Maintenance-only inspection, drift, repair, verification, freeze, recovery, and retirement workflow |
| `FINAL-SLEDGEHAMMER-BATTERY-REPORT-v0.1.md` | Final frozen-state adversarial battery and remaining breach surfaces |
| `WEAKNESS-PRESERVATION-AND-DESIGN-v0.1.md` | Weakness registry, containment, ownership, testing, and external-brake design rule |
| `SPECIALIST-OUTREACH-README.md` | Plain-language explanation of the project for independent specialist attack |
| `CARPENTERS-NOTE.md` | Human-origin statement and invitation to independent challenge |
| `SPECIALIST-LANGUAGE-AUDIT-v0.1.md` | Grey-area terminology audit and specialist translation surface |
| `FINAL-WEB-INTEGRATION-SCAN-v0.1.md` | Web-researched candidates for policy, provenance, and observability integration |
| `FINAL-REVIEW-AND-PROPOSALS-v0.1.md` | Final bounded review, last edits, future proposals, and intentional open states |
| `LOCKED-CANDIDATE-BASELINE-v0.1.md` | Frozen local baseline, verified checks, external integration boundary, and reopening rule |

## Decisions, releases, and operational surfaces

| File | Role |
|---|---|
| `ADR-001-MODULAR-MONOLITH-FIRST.md` | Architecture decision |
| `ADR-002-GREEN-IS-NOT-APPROVAL.md` | Green-state boundary |
| `ADR-003-EXTERNAL-STOP-PATH.md` | External brake requirement |
| `ADR-004-APPEND-ONLY-EVIDENCE.md` | Evidence custody decision |
| `APPROVAL_RECORD.md` | Approval-state record |
| `ACTION-AUTHORITY-EVIDENCE-PACKET.md` | Action/evidence separation |
| `BUILD-CATALOG.md` | Build inventory |
| `CHANGELOG.md` | Change history |
| `CURRENT-WORK-INTEGRATION.md` | Integration status |
| `GITHUB_RELEASE_STAGING.md` | Release staging |
| `LICENSE-DECISION.md` | Licensing decision |
| `PUBLICATION_MANIFEST.md` | Publication inventory |
| `RELEASE_NOTES.md` | Release notes |
| `STATUS.md` | Current project status |
| `VERSION` | Version marker |
| `RELEASE_CANDIDATE_CHECKS.json` | Machine-readable release checks |
| `RELEASE_CANDIDATE_MANIFEST.json` | Machine-readable release manifest |
| `SHA256SUMS.txt` | Hash inventory |
| `source-manifest.csv` | Source manifest |

## Review and handoff artifacts

| File | Role |
|---|---|
| `00-CONTROL-SURFACE-SWEEP-STATUS.md` | Control-surface review status |
| `BOUNDARY-ATLAS-CONTEXT-NOTES.md` | Boundary context |
| `BOUNDARYTITAN-CONTROL-GATE-ARCHITECTURE-v1.0-rc1.md` | Architecture candidate |
| `BOUNDED-AGENT-51-50-OMISSIONS-PASS.md` | 51-50 and omissions review |
| `PHASE1-SCHEMA-GAP-NOTES.md` | Schema gaps |
| `REVIEW-SURFACE-BOUNDARY.md` | Review boundary |
| `REVIEW-SURFACE-HTK.md` | Human Translation Key review surface |
| `SPECIALIST-HANDOFF-v0.1.md` | Specialist handoff contract |
| `SPECIALIST-HANDOFF-READINESS.md` | Handoff readiness state |
| `STATE-RECONCILIATION-v1.1.md` | State reconciliation |
| `examples/review-packet.html` | Review-packet example |

## Robotics lane

| File | Role |
|---|---|
| `ROBOTICS-MINIMUM-KERNEL.md` | Minimum robotics boundary |
| `ROBOTICS-PRE-ACTION-PROTOTYPE.md` | Pre-action gate proposal |
| `ROBOTICS-BOUNDED-KERNEL-v0.1.md` | Read-only bounded robotics kernel |
| `ROBOTICS-SYSTEM-AUTHORITY-LIFECYCLE.md` | Authority lifecycle |
| `ROBOTICS-SPECIALIST-HANDOFF-TEST-BATTERY-v0.1.md` | Specialist handoff test requirements |

## TypeScript implementation

### Types and contracts

`src/types/` contains declaration-level contracts for:

- action authority and evidence packets
- bounded agent workcells
- consequence receipts
- core contracts
- delegation and revocation
- dependency reinspection
- inert contracts
- mediation coverage
- robotics bounded kernel
- robotics pre-action gate
- robotics system authority lifecycle
- specialist handoff
- task wall
- Zombie Permission Hunter

### Implementations

| Path | Role |
|---|---|
| `src/robotics/bounded-kernel.ts` | Read-only evidence gate and specialist handoff producer |
| `src/robotics/pre-action-gate.ts` | Pre-action review logic |
| `src/robotics/system-lifecycle.ts` | Robotics authority lifecycle |
| `src/review/review-surface.ts` | Review surface implementation |
| `src/maintenance/zombie-permission-hunter.ts` | Permission-expiry inspection |
| `src/maintenance/zombie-permission-hunter-batch.ts` | Batch permission inspection |

### Fixtures

`src/fixtures/` contains valid, invalid, review-surface, task-wall, consequence-receipt, dependency-reinspection, bounded-workcell, specialist-handoff, and Zombie Permission Hunter shapes.

### Tests

`src/tests/` contains contract, schema-alignment, authority-invariant, review-surface, task-wall, dependency-reinspection, consequence-receipt, bounded-workcell, robotics lifecycle, robotics pre-action, bounded-kernel, specialist-handoff, fixture-classification, and Zombie Permission Hunter tests.

The newest robotics battery is `src/tests/robotics-specialist-handoff-battery.test.ts`.

## Schemas and diagrams

- `audit-event.schema.json` — audit event schema
- `consequence-receipt.schema.json` — consequence receipt schema
- `owner-role.schema.json` — owner/role schema
- `control-sequence.mmd` — control sequence diagram
- `state-machine.mmd` — state machine diagram
- `trust-boundaries.mmd` — trust boundary diagram

## Open items

- Resolve or explicitly update the two stale Zombie Permission Hunter expiry expectations.
- Decide whether generated `node_modules/` should be ignored through `.gitignore` before commit.
- Perform independent review of the robotics kernel and handoff battery.
- Establish external evidence custody for release hashes and publication artifacts.
- Do not infer deployment readiness from passing local tests.

## Boundary disposition

This index is an inventory and navigation aid. It is not a certification, release approval, safety determination, or deployment authorization. The machine-produced index cannot close its own review. Human consequence ownership and external stop authority remain outside the repository.
