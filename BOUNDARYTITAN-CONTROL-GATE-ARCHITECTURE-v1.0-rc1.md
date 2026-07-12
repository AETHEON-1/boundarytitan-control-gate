# BoundaryTitan Control Gate

Architecture Specification v1.0 — Release Candidate 1

Status: HUMAN-APPROVED ARCHITECTURE BASELINE — RELEASE CANDIDATE — NOT YET PUBLISHED  
Version: 1.0.0-rc.1  
Candidate tag: `architecture-v1.0-rc1`  
Human approval recorded: 2026-07-11  
Owner and release authority: Michael J. Cates / The Carpenter of Impossible Systems

This package is the final release candidate for the BoundaryTitan Control Gate Architecture Specification v1.0.

It has been reviewed and approved by the human owner as the architecture baseline. It has not yet been published, merged into the public repository, deployed, or represented as universal certification.

Core rule:

> The machine cannot be the final judge of the machine.

Control order:

Continuity → Machine Start Here → Decision Brake → Routing Board → Routing-to-Owner Matrix → Response Protocol

Mandatory separations:

- Signal is not authority.
- Output is not authority.
- Validation is not approval.
- Green eligibility is not approval.
- Approval is not permission.
- Permission is not release.
- Release is not execution.
- Receipt is not permission.
- A lane is not an owner.
- Routing does not transfer authority.

Publication remains a separate human-controlled action. This release candidate may be inspected, compared, hashed, staged, or returned for revision. It may not publish itself.


---

# 00 — Control-Surface Sweep Status

## Status for Architecture v1.0 RC1

The available control-surface review was sufficient for the human owner to approve the architecture baseline.

It was not sufficient for the machine to certify exhaustive coverage of every current public URL.

## Reviewed inputs

1. BoundaryTitan public control surface at boundarytitan.wordpress.com.
2. Two uploaded deep-research reports.
3. Current project continuity supplied by the human owner.
4. Control-surface excerpts confirming:
   - the governing order;
   - the distinction between architecture and control surface;
   - the Consequence Receipt;
   - Break-Pass;
   - Green / Yellow / Red / Black;
   - human-owner release authority;
   - “Only Green proceeds.”

## Preserved limitation

The research outputs claimed complete crawling, but their displayed manifests were insufficient to prove complete current coverage. Therefore:

- RC1 does not certify that every public URL was reviewed.
- The source manifest remains a working evidence register.
- Any public claim of exhaustive coverage requires separate human approval.

## Human disposition

The human owner reviewed and approved the architecture package despite the documented coverage limitation.

The machine may record that decision. It may not convert the decision into a broader certification claim.


---

# 01 — Project Constitution

## Purpose

Define the rules that implementation may not override.

## Constitutional invariants

C-01. The machine cannot be the final judge of the machine.

C-02. Capability does not confer authority.

C-03. Signal does not confer authority.

C-04. Output does not confer authority.

C-05. Routing does not transfer ownership or permission.

C-06. A lane is a bounded operating context, not an owner.

C-07. Validation may classify or detect defects. Validation may not approve consequence.

C-08. Green means structurally eligible for bounded human consideration. Green is not approval, permission, release, execution authority, certification, or publication authority.

C-09. Receipt is preparation and evidence. Receipt is not permission.

C-10. Consequence-bearing action requires a named external authority structure before execution.

C-11. A stop path is real only if an authority outside the acting system can deny, suspend, revoke, isolate, roll back, or prevent action before irreversible consequence.

C-12. Human presence is not sufficient. The relevant human or institution must possess actual authority, timing, evidence access, and an operational means to stop or deny.

C-13. The system may detect, sort, summarize, draft, compare, map, route, simulate, question, prepare, and flag gaps.

C-14. The system may not authorize, certify, publish, spend, delete, submit, send, impersonate, conceal, bypass review, or convert preparation into permission without explicit human authority and a visible stop path.

C-15. Every consequence-bearing proposal must identify:
- Lane
- Owner
- Evidence
- Affected surface
- Consequence
- Reversibility
- Stop path
- Approval state
- Who can still say no

C-16. If any required boundary is missing, the proposal is not Green.

C-17. The system may run Break-Pass checks. It may not certify completion.

C-18. The human owner retains final release authority for this architecture and any publication derived from it.

## Conflict rule

Where an implementation convenience conflicts with a constitutional invariant, the implementation convenience loses.


---

# 02 — Canonical Source Hierarchy

## Purpose

Prevent case studies, rhetoric, or implementation proposals from silently becoming constitutional doctrine.

## Source classes

Level 1 — Constitutional BoundaryTitan doctrine
- Core control-surface pages
- Machine Start Here
- Decision Brake
- Routing Board
- Routing-to-Owner Matrix
- Response Protocol
- BoundaryTitan: The Control Surface
- Canonical Public Anchors
- Human-review and Green Packet standards

Level 2 — Operational doctrine
- Consequence Receipt
- Break-Pass
- No Ledger, No Trust
- Bounded Agent workflow
- Lane maintenance and rollover
- Bounded Case Study discipline

Level 3 — Domain translations
- Healthcare
- Finance
- Cybersecurity
- Robotics
- Legal and institutional authority
- Insurance, procurement, infrastructure, and other sector applications

Level 4 — Case evidence
- Bounded Case Studies
- Incident analyses
- Source packets
- Public evidence maps

Level 5 — Visual and rhetorical compression
- Field cards
- Diagrams
- One-line doctrine
- Satire

Level 6 — Proposed implementation controls
- Schemas
- APIs
- credential controls
- restart behavior
- cryptographic evidence
- timeouts
- role-separation mechanics

## Authority rule

A lower source class may illustrate or motivate a higher-level rule. It may not silently redefine it.

## Publication rule

Every architecture requirement must be labeled as one of:

- Documented public doctrine
- Owner-established project doctrine
- Bounded inference
- Proposed implementation control
- Open human decision


---

# 03 — Doctrine and Invariant Register

| ID | Statement | Class | Architecture effect | Human review |
|---|---|---|---|---|
| D-001 | The machine cannot be the final judge of the machine. | Documented public doctrine | Forbids machine self-certification | Confirm wording |
| D-002 | Signal is not authority. | Documented public doctrine | Signal objects cannot issue authorization | Confirm |
| D-003 | Capability is not permission. | Documented public doctrine | Capability checks remain separate from permission | Confirm |
| D-004 | Output is not authority. | Documented public doctrine | Output cannot directly trigger consequence | Confirm |
| D-005 | A lane is not an owner. | Documented public doctrine | Lane assignment cannot satisfy ownership | Confirm |
| D-006 | Routing does not transfer authority. | Documented public doctrine | Router returns placement, not permission | Confirm |
| D-007 | Only Green proceeds. | Documented public doctrine | Non-Green states cannot progress | Confirm semantic definition |
| D-008 | Green means eligible for bounded human review, not approved. | Canonical normalization | Prevents color/approval collapse | Explicit approval required |
| D-009 | Receipt is not permission. | Owner-established doctrine | Evidence object cannot issue release | Confirm public wording |
| D-010 | No ledger, no trust. | Documented operational doctrine | Consequence-bearing transitions require visible records | Confirm minimum ledger |
| D-011 | The brake must exist outside the system that wants to continue. | Documented public doctrine | External stop authority required | Confirm |
| D-012 | The system may prepare; the human owns consequence. | Documented public doctrine | Human release boundary | Confirm |
| D-013 | Constraint precedes capability. | Documented public doctrine | Control requirements are evaluated before feature enablement | Confirm |
| D-014 | The evaluator may evolve; the brake must not become internal. | Owner-established doctrine | Evaluator cannot inherit release authority | Confirm source |
| D-015 | Restart must not silently restore prior authority. | Proposed implementation control | Authority tokens expire across restart unless revalidated | Human decision required |
| D-016 | Critical transitions should emit tamper-evident records. | Proposed implementation control | Audit design requirement | Human decision required |
| D-017 | Credentialed authority must be scoped, revocable, and isolated. | Owner-established / proposed implementation | Credential controller | Confirm public-source status |
| D-018 | Every action must produce a Consequence Receipt. | Owner-established doctrine | Receipt requirement | Confirm scope and exceptions |


---

# 04 — Canonical Glossary

Signal: Information indicating an event, condition, anomaly, request, or possible action. A signal has no authority.

Capability: What a person, model, tool, or system can technically do.

Lane: A bounded context defining admissible preparation, forbidden actions, owner requirements, and stop conditions. A lane is not an owner.

Route: The placement of a signal or proposal into a lane. A route is not permission.

Owner: The accountable person or institution responsible for a defined consequence surface. Ownership must be matched with actual authority.

Reviewer: A person authorized to inspect evidence and identify defects. Review is not approval unless the authority model explicitly combines those roles.

Approver: A person or institution authorized to accept a bounded proposal within defined scope. Approval is not necessarily execution authority.

Revoker: A person or institution able to withdraw permission or release authority.

Operator: A person or service that performs an authorized action. Operation does not create authority.

Authority: Recognized ability to approve, deny, revoke, release, enforce, or bear responsibility for a consequential action.

Permission: A bounded grant allowing a defined action under defined scope and conditions.

Approval: A recorded human or institutional decision on a proposal. Approval must identify scope, expiry, evidence, and revocation.

Release: The transition that makes an approved action eligible for execution. Release must remain distinct from approval.

Execution: Actual performance of an external action.

Consequence: A material effect on rights, safety, liberty, property, access, livelihood, evidence, reputation, infrastructure, or institutional accountability.

Validation: Mechanical or analytical evaluation against rules. Validation cannot authorize.

Decision Brake: A pause and defect-exposure layer that prevents premature movement toward consequence.

Stop Path: An independently owned path capable of denying, suspending, revoking, isolating, rolling back, or preventing action before unacceptable consequence.

Consequence Receipt: A structured record describing a proposed or completed action, its evidence, owners, consequences, boundaries, approval state, and stop path. A receipt is not permission.

Break-Pass: An adversarial review of scope, evidence, owner, permission, reversibility, revocation, stop path, receipt, overclaiming, and self-certification defects.

Green: Structurally eligible for bounded human consideration. Not approval.

Yellow: Missing, ambiguous, stale, conflicting, or insufficient information. Narrow, verify, revise, or route.

Red: Hold. A consequence, authority, evidence, reversibility, or stop-path defect prevents progression.

Black: Refuse. The proposal depends on deception, concealment, impersonation, unauthorized access, evidence destruction, consent bypass, or self-certification.

Ledger: An inspectable event record sufficient to reconstruct what was proposed, checked, owned, approved, released, executed, stopped, revoked, or closed.

Continuity: Persistent project state, doctrine, lane placement, and prior decisions that must be consulted before creating new work.

Machine Start Here: The control-surface entry point that establishes the governing order and scope before work proceeds.


---

# 05 — System Architecture

## Architectural style

Modular monolith first.

Reason:
- preserves clear module boundaries;
- avoids premature distributed-system complexity;
- supports local-first development;
- allows later service separation where isolation or scale requires it.

## Control sequence

Continuity
→ Machine Start Here
→ Decision Brake
→ Routing Board
→ Routing-to-Owner Matrix
→ Response Protocol
→ Consequence Receipt
→ Break-Pass
→ Human decision
→ Bounded release
→ Execution gate
→ Audit
→ Revocation or closure

## Authority sequence

Signal
→ Proposal
→ Validation Result
→ Routing Color
→ Human Review
→ Approval Record
→ Permission Grant
→ Release Token
→ Execution
→ Consequence Record

No transition may skip directly from machine validation to approval, permission, release, or execution.

## Trust boundaries

Boundary A — Input boundary
Untrusted signals enter. No authority enters with them.

Boundary B — Analysis boundary
The system may classify, compare, and prepare.

Boundary C — Human authority boundary
A named human or institution may approve, deny, narrow, or revoke.

Boundary D — Release boundary
A separate control converts a valid approval into a scoped, expiring release token.

Boundary E — Execution boundary
Only a valid release token may reach external tools.

Boundary F — External stop boundary
An independently controlled mechanism can invalidate credentials, tokens, jobs, tools, network access, or deployment state.

## Dependency rule

Preparation modules may depend on doctrine and evidence.
Authority modules may depend on verified owners and approvals.
Execution modules may depend on release tokens.
No preparation module may issue release tokens.


---

# 06 — Domain Model

## Core entities

Signal
- raw input or detected condition
- no authority

Lane
- bounded operating context
- allowed and forbidden preparation
- owner requirements
- stop-path requirements

ActionProposal
- requested external action
- scope, consequence, reversibility, destination

EvidenceItem
- source, claim, provenance, freshness, custody, confidence

OwnerAssignment
- accountable owner
- authority basis
- domain and scope
- availability and escalation

ValidationResult
- rule findings
- routing color
- defects and missing fields
- no authority

ConsequenceReceipt
- complete pre-action or post-action record
- no permission

HumanDecision
- approve, deny, narrow, hold, revoke
- evidence and rationale

PermissionGrant
- bounded grant derived from a valid human decision

ReleaseToken
- scoped, expiring, single-action or bounded-session execution eligibility

ExecutionRecord
- attempted or completed external action

AuditEvent
- append-only event describing a state transition

StopPath
- independent stop, revoke, isolate, or rollback capability

PolicyRule
- versioned rule with source class and test mapping

Incident
- control failure, bypass, delayed stop, unauthorized action, or evidence defect

## Relationship rules

- Signal may create ActionProposal.
- ActionProposal must bind to one primary Lane.
- Lane must not satisfy OwnerAssignment.
- ValidationResult may color-route an ActionProposal.
- ValidationResult may not create HumanDecision.
- HumanDecision may create a PermissionGrant.
- PermissionGrant may create a ReleaseToken only if the release gate verifies scope, expiry, stop path, and non-revocation.
- ExecutionRecord requires a valid ReleaseToken.
- Every state transition emits an AuditEvent.
- Revocation invalidates PermissionGrant and ReleaseToken within the stated latency budget.


---

# 07 — Authority Role Model

## Roles

Accountable Owner
- owns the consequence surface
- answers for the outcome
- may be a person or institution

Decision Owner
- makes the bounded approve/deny/hold decision

Reviewer
- inspects evidence and defects
- cannot be assumed to approve

Operator
- performs the authorized action

Release Authority
- converts a valid approval into execution eligibility

Revocation Authority
- can withdraw permission or release

Emergency Stop Authority
- can stop or isolate execution under emergency criteria

Auditor
- inspects records and control performance

Evidence Custodian
- maintains source integrity, provenance, and retention

System Custodian
- maintains the technical system

Affected Party
- person or group subject to consequence, review, appeal, or remedy

## Separation-of-duty rule

The architecture must support distinct roles even when one person occupies multiple roles in a low-risk prototype.

## Collision rule

If ownership or authority assignments conflict, the proposal becomes Yellow or Red. The machine may surface the collision but may not resolve it by selecting an owner.

## Availability rule

A nominal owner who cannot act before consequence does not satisfy the owner requirement.


---

# 08 — State Model

## Proposal states

Draft
→ Submitted
→ Routed
→ Validated
→ Green-Eligible | Yellow | Red | Black
→ Awaiting Human Decision
→ Approved | Denied | Held | Narrowed
→ Permission Granted
→ Released
→ Execution Started
→ Executed | Failed | Stopped | Revoked
→ Closed

## Prohibited collapses

- Validated → Approved
- Green-Eligible → Permission Granted
- Approved → Executed
- Receipt Generated → Released
- Machine Recommendation → Human Decision
- Restarted → Prior Released State

## Approval states

Pending
Approved
Denied
Expired
Revoked
Superseded

## Permission states

Not Granted
Granted
Suspended
Expired
Revoked
Consumed

## Release states

Not Released
Released
Blocked
Expired
Revoked
Consumed

## Execution states

Not Started
Started
Paused
Stopped
Succeeded
Failed
Rolled Back
Irreversible

## Routing colors

Green:
Structurally eligible for human review.

Yellow:
Needs clarification, evidence, owner resolution, narrower scope, or updated records.

Red:
Held because a material control requirement is absent or failed.

Black:
Refused because the proposal depends on prohibited conduct or machine self-certification.

## Transition requirement

Each transition must identify:
- actor;
- authority basis;
- evidence;
- timestamp;
- prior state;
- new state;
- scope;
- consequence;
- reversibility;
- stop-path status;
- audit event.


---

# 09 — Rule Catalog

R-001. Missing lane → Yellow.

R-002. Missing accountable owner → Yellow.

R-003. Owner lacks actual deny/revoke authority → Red.

R-004. Missing evidence → Yellow.

R-005. Stale or unverifiable evidence → Yellow or Red based on consequence.

R-006. Missing consequence description → Yellow.

R-007. Missing reversibility statement → Yellow.

R-008. Irreversible action without pre-action human authority → Red.

R-009. Missing external stop path for consequence-bearing action → Red.

R-010. Machine self-approval or self-certification → Black.

R-011. Concealment, impersonation, unauthorized access, evidence destruction, consent bypass, or review bypass → Black.

R-012. Green may only mean eligible for bounded human review.

R-013. ValidationResult cannot create Approval, PermissionGrant, ReleaseToken, or ExecutionRecord.

R-014. Receipt generation cannot change authority state.

R-015. Approval must be scoped, attributable, time-bounded where appropriate, and revocable.

R-016. Permission must identify the exact action or action class it covers.

R-017. Release must verify non-revocation immediately before execution.

R-018. Execution without a valid release token → blocked and recorded.

R-019. Lane assignment does not transfer ownership.

R-020. Owner collision → Yellow or Red; machine may not choose the winner.

R-021. Stop authority must be operational before execution begins.

R-022. If execution can outrun review or revocation, the control is not Green.

R-023. Hidden external actions must be surfaced in the ledger.

R-024. Every critical transition must emit an inspectable AuditEvent.

R-025. Break-Pass findings cannot certify completion.

R-026. Restart behavior must default to no inherited release authority unless a human-approved exception is formally specified.

R-027. Any proposed new invariant must be labeled as a proposal until approved by the human owner.


---

# 10 — Module Catalog

Continuity Registry
- stores project state, canonical doctrine versions, and closed decisions

Machine Start Here
- entry control and scope declaration

Decision Brake
- pauses consequential movement and exposes missing controls

Routing Board
- assigns one primary lane and optional secondary references

Owner Matrix
- resolves candidate accountable and operational roles without granting authority

Evidence Registry
- stores source, freshness, provenance, custody, and claim mapping

Consequence Classifier
- identifies affected surfaces and materiality

Rule Engine
- evaluates formal rules and returns ValidationResult

Consequence Receipt Engine
- generates structured receipts without changing authority

Break-Pass Engine
- performs adversarial defect checks

Human Review Workspace
- presents evidence, defects, scope, and options to the owner

Approval Registry
- records human decisions and their scope

Permission Service
- creates bounded grants from valid approvals

Release Gate
- verifies scope, expiry, non-revocation, and stop-path readiness

Execution Adapter
- performs external actions only with a valid release token

External Stop Controller
- independently invalidates release, credentials, tools, jobs, or network access

Audit Ledger
- records all material state transitions

Incident and Remedy Module
- records failures, appeal, correction, and closure

Reporting Module
- produces human-readable status without certifying safety

Administration
- manages policies, roles, and configuration under human authority

API Layer
- exposes bounded internal and external interfaces

SDK
- future integration package; not part of the first implementation


---

# 11 — Data Model

## Required identifiers

All entities use immutable UUIDs.

## Common fields

- id
- schema_version
- created_at
- created_by
- updated_at
- status
- source_provenance
- retention_class

## Primary records

Signal
- id, source, received_at, payload_reference, sensitivity, integrity_status

ActionProposal
- id, signal_id, lane_id, action_type, scope, destination, affected_surface, expected_consequence, reversibility

EvidenceItem
- id, source_uri, source_class, title, collected_at, freshness, content_hash, custodian, claim_ids

OwnerAssignment
- id, role_type, subject_id, authority_basis, scope, effective_from, expires_at, revocation_path

ValidationResult
- id, proposal_id, rule_version, routing_color, findings, missing_fields, evaluated_at

ConsequenceReceipt
- fields defined in the dedicated specification

HumanDecision
- id, proposal_id, decision_type, decision_owner, rationale, evidence_ids, scope, effective_at, expires_at

PermissionGrant
- id, approval_id, action_scope, destination_scope, conditions, issued_at, expires_at, revocation_status

ReleaseToken
- id, permission_id, action_hash, issued_at, expires_at, consumed_at, revoked_at

ExecutionRecord
- id, release_token_id, started_at, ended_at, outcome, consequence_observed, rollback_status

AuditEvent
- id, event_type, actor, authority_basis, object_type, object_id, prior_state, new_state, timestamp, evidence_hash

StopPath
- id, controller, mechanism, target, activation_method, test_status, last_tested_at, latency_budget

Incident
- id, severity, detected_at, affected_objects, containment, owner, remedy, closure

## Data integrity

- Approval, permission, release, execution, and audit records are append-only.
- Corrections are new events, not destructive edits.
- Content hashes support evidence integrity but do not create authority.


---

# 12 — Consequence Receipt Specification

## Doctrine

Receipt(A) ≠ Permission(A)

## Required fields

- receipt_id
- schema_version
- created_at
- created_by
- lane
- proposed_action
- action_scope
- named_accountable_owner
- decision_owner
- evidence
- affected_surface
- expected_consequence
- consequence_class
- reversibility
- rollback_plan
- external_stop_path
- stop_path_owner
- stop_path_test_status
- approval_state
- approval_reference
- permission_state
- release_state
- execution_state
- expiry
- revocation_authority
- who_can_still_say_no
- source_provenance
- validation_findings
- routing_color
- unresolved_questions
- audit_event_ids

## Mandatory display language

“Receipt generated.”

“Receipt is preparation, not permission.”

## Receipt types

Pre-action receipt
- describes proposed consequence and control readiness

Decision receipt
- records human decision without implying execution

Execution receipt
- records what actually happened

Revocation receipt
- records what authority was withdrawn and when

Closure receipt
- records final disposition, remedy, or unresolved risk

## Prohibition

The receipt engine must not expose an API or UI operation named “approve receipt.” Approval applies to a proposal under human authority, not to the receipt as an authority object.


---

# 13 — Permission Model

## Principle

Access, capability, approval, permission, release, and execution are distinct.

## Permission dimensions

- subject
- action
- object
- destination
- scope
- time
- volume
- consequence class
- evidence basis
- approval reference
- revocation path
- stop-path requirement

## Permission grant requirements

A PermissionGrant requires:
- valid human approval;
- named accountable owner;
- bounded scope;
- sufficient evidence;
- visible approval record;
- external stop path;
- inspectable ledger;
- non-expired authority basis.

## Deny-by-default

Missing or ambiguous dimensions default to no permission.

## Inheritance

Permissions do not automatically inherit across:
- lanes;
- tools;
- repositories;
- tenants;
- sessions;
- restarts;
- deployments;
- action classes.

## Delegation

Delegation must identify:
- delegator;
- delegate;
- scope;
- duration;
- revocation authority;
- non-delegable powers;
- audit record.


---

# 14 — User Workflows and UI Map

## Core screens

1. Control Surface Home
- current doctrine version
- current routing state
- active holds
- visible stop authority
- no “system approved” language

2. New Proposal
- action, lane, evidence, owner, consequence, reversibility, stop path

3. Routing Review
- primary lane
- conflicts
- missing owner or evidence
- color result

4. Consequence Receipt
- full receipt
- mandatory “not permission” language

5. Human Decision
- approve, deny, hold, narrow
- exact scope and expiry
- visible who-can-still-say-no field

6. Release Gate
- permission verification
- revocation check
- stop-path health
- no automatic release from validation

7. Execution Monitor
- live state
- stop and revoke controls
- consequence indicators

8. Audit Ledger
- ordered events
- actor, authority basis, prior/new state
- source and evidence references

9. Incident and Remedy
- containment
- affected parties
- appeal and correction
- owner and closure status

10. Administration
- rule versions
- roles
- policies
- schema versions
- no machine-controlled constitutional edits

## UI prohibitions

- Do not label Green as Approved.
- Do not present machine confidence as authority.
- Do not hide stop controls behind secondary menus for high-consequence actions.
- Do not allow a generated receipt to look like an authorization certificate.
- Do not use dark patterns to accelerate release.


---

# 15 — API Specification

## Preparation APIs

POST /signals
POST /proposals
POST /evidence
POST /route
POST /validate
POST /receipts
POST /break-pass

These endpoints may prepare records and findings. They may not authorize.

## Human authority APIs

POST /human-decisions
POST /permissions
POST /revocations

These require authenticated human or institutional authority and explicit scope.

## Release and execution APIs

POST /releases
POST /executions
POST /stops
POST /rollbacks

Release requires:
- valid approval;
- valid permission;
- no revocation;
- stop-path ready;
- matching action hash;
- current evidence where required.

## Read APIs

GET /proposals/{id}
GET /receipts/{id}
GET /audit-events
GET /owners
GET /lanes
GET /policies
GET /incidents

## API invariant

No preparation endpoint may call a human-authority or release endpoint using machine-generated credentials or inferred consent.


---

# 16 — Threat and Failure-Mode Model

## Required cases

F-01 Machine self-approval
Detection: approval lacks external actor.
Containment: block release.
Owner: authority-system owner.

F-02 Green laundering
Detection: Green label used as Approved.
Containment: UI and API schema rejection.

F-03 Fake human handoff
Detection: execution continues while review is pending.
Containment: hard execution pause.

F-04 Owner ambiguity
Detection: missing or conflicting accountable owner.
Containment: Yellow/Red hold.

F-05 Approval replay
Detection: reused or expired approval reference.
Containment: single-use or action-bound release token.

F-06 Credential leakage
Detection: anomalous token use or secret exposure.
Containment: revoke credentials and isolate execution.

F-07 Restart authority inheritance
Detection: released state survives restart without revalidation.
Containment: invalidate release on restart by default.

F-08 Stop-path delay
Detection: revocation latency exceeds the consequence window.
Containment: fail closed before irreversible commit.

F-09 Audit tampering
Detection: hash or sequence mismatch.
Containment: freeze affected action and preserve evidence.

F-10 Receipt laundering
Detection: receipt presented as certificate or permission.
Containment: mandatory language and schema separation.

F-11 Lane drift
Detection: action scope no longer matches assigned lane.
Containment: reroute and invalidate prior validation.

F-12 Hidden action path
Detection: external side effect without an ExecutionRecord.
Containment: revoke integration and open incident.

F-13 Insider misuse
Detection: valid credential used outside approved scope.
Containment: revoke, investigate, preserve ledger.

F-14 Supply-chain compromise
Detection: dependency integrity failure.
Containment: block release and isolate build artifact.

F-15 Tenant or identity boundary failure
Detection: cross-tenant or wrong-subject access.
Containment: deny, revoke, incident response.

F-16 Revocation failure
Detection: revoked token remains effective.
Containment: external network/tool/credential kill path.

## Failure-mode requirement

Every high-consequence failure mode must have:
- detection;
- containment;
- accountable owner;
- evidence trail;
- reversibility treatment;
- external stop path;
- test.


---

# 17 — Test Strategy

## Test layers

Unit tests
- rule evaluation
- state transitions
- receipt validation
- permission scope

Integration tests
- proposal to receipt
- human decision to permission
- permission to release
- revocation to execution denial

Authority-boundary tests
- machine cannot create approval
- validation cannot create permission
- Green cannot create release
- receipt cannot create execution

Adversarial tests
- replay
- stale evidence
- owner collision
- hidden action
- credential misuse
- stop-path outage
- restart inheritance

Latency tests
- revocation reaches enforcement before irreversible commit
- stop path dominates planner/executor timing

Ledger tests
- every critical transition emits an event
- event order and hashes remain valid
- corrections do not erase prior records

UI tests
- Green is never displayed as Approved
- receipt always shows “not permission”
- stop authority is visible
- missing owner/evidence/stop path cannot be hidden

## Acceptance rule

A passing test suite is evidence of conformance to tested requirements. It is not certification of safety, correctness, or authority.


---

# 18 — Deployment, Recovery, and Revocation

## Environments

Local
- no external consequence
- synthetic data
- no production credentials

Development
- isolated services
- test identities
- no production release path

Staging
- production-like controls
- simulated external actions
- stop-path tests

Production
- separate credentials
- named operators
- formal release and revocation
- monitored audit ledger

## Deployment authority

Build success does not authorize deployment.
Deployment requires a human release decision and environment-specific permission.

## Recovery

Recovery must preserve:
- audit records;
- incident state;
- revocation state;
- owner assignments;
- evidence references.

Recovery must not silently restore:
- expired approvals;
- consumed release tokens;
- revoked permissions;
- prior execution authority.

## Revocation

Revocation targets may include:
- approval;
- permission;
- release token;
- credential;
- session;
- tool;
- job;
- network route;
- deployment.

The external stop controller must remain operable even when the application is unhealthy.


---

# 19 — Traceability Ledger

## Required columns

- requirement_id
- doctrine_statement
- source_class
- source_url
- source_excerpt_reference
- architecture_section
- software_rule
- data_entity
- state_transition
- test_id
- owner
- approval_status
- conflict_status
- notes

## Initial traceability rows

| Requirement | Doctrine | Architecture | Rule/Test |
|---|---|---|---|
| C-01 | Machine cannot be final judge | Constitution, authority flow | R-010; authority-boundary test |
| C-03 | Signal is not authority | Domain model | Signal cannot issue decision |
| C-08 | Green is not approval | State/UI models | R-012; UI test |
| C-09 | Receipt is not permission | Receipt specification | R-014; API test |
| C-11 | External stop path | System architecture | R-009, R-021; stop-path test |
| C-15 | Consequence receipt fields | Receipt schema | schema validation |
| C-17 | Break-Pass cannot certify | Break-Pass report | completion-language test |

## Publication condition

Before Architecture v1.0 is published as complete, every constitutional invariant and high-consequence rule should have a populated source and test mapping or be visibly labeled as an owner-approved proposal.


---

# 20 — Break-Pass Report

Status: CLOSED FOR RC1 PREPARATION; LIMITATIONS PRESERVED

## Defects corrected

BP-01 Green collapsed into approval.
Correction: Green means eligible for bounded human consideration.

BP-02 Machine validation flowed to execution.
Correction: mandatory human decision, permission, and release boundaries inserted.

BP-03 Stop path was modeled as an internal conveyor step.
Correction: stop authority is independently owned and can interrupt execution.

BP-04 Receipt was treated as an approval object.
Correction: receipt is evidence only.

BP-05 Proposed controls were presented as public doctrine.
Correction: source classes separate documented doctrine from proposals.

BP-06 “Human in the loop” lacked authority-role precision.
Correction: authority-role model added.

## Human disposition

The human owner reviewed and approved the package for preparation as Architecture v1.0 RC1.

## Preserved limitations

Open issues concerning exhaustive URL coverage, source verification, license selection, final cryptographic custody, domain-specific revocation timing, and implementation conformance are transferred to `KNOWN_LIMITATIONS.md`.

## Machine boundary

This report records defect treatment and human disposition. It does not declare the architecture universally safe, complete, correct, certified, or suitable for every deployment.


---

# 21 — Human Decision Record

## Decision

Architecture package reviewed and approved.

## Human statement

> Reviewed and approved, only green proceeds.

## Date recorded

2026-07-11

## Approved scope

- Architecture v1.0 baseline
- Final release-candidate preparation
- Versioning, hashing, packaging, and publication staging
- Future coding planning against the frozen architecture baseline

## Not yet approved

- Public publication to a named destination
- Repository merge or release creation
- Deployment
- License grant
- Claims of exhaustive site coverage
- Machine certification of safety, completeness, correctness, or authority

## Known limitations

See `KNOWN_LIMITATIONS.md`.

## Final publication decision still required

The human owner must approve the exact release package and exact publication destination.


---

# 22 — Publication Checklist

Architecture preparation:

[x] Architecture package reviewed by human owner  
[x] Architecture baseline approved  
[x] Doctrine/proposal labels preserved  
[x] Glossary prepared  
[x] Green-not-approval rule visible  
[x] Receipt-not-permission rule visible  
[x] Authority-role model prepared  
[x] State transitions prepared  
[x] Threat model prepared  
[x] Break-Pass findings addressed or preserved as limitations  
[x] Known limitations written  
[x] Version number assigned  
[x] Release notes prepared  
[x] Changelog prepared  
[x] SHA-256 manifest prepared  

Final publication controls:

[ ] Complete source-manifest claim approved  
[ ] Source URLs verified as required  
[ ] License selected or no-license statement approved  
[ ] Exact publication destination confirmed  
[ ] Exact release-candidate files reviewed  
[ ] Repository access/write scope confirmed  
[ ] Final v1.0 tag selected  
[ ] Human owner explicitly authorizes publication  
[ ] Published files verified against hashes  

Publication remains Yellow until every applicable final publication control is resolved by the human owner.


---

# 23 — Implementation Roadmap

Phase 0 — Architecture freeze
Human approval of the architecture baseline is recorded. Coding may begin only after the final v1.0 baseline is placed under version control and each implementation phase is separately bounded.

Phase 1 — Core types and schemas
- Signal
- Lane
- ActionProposal
- Evidence
- OwnerAssignment
- ValidationResult
- ConsequenceReceipt

Phase 2 — Rule engine
- color routing
- missing-control findings
- no authority changes

Phase 3 — Receipt engine
- pre-action receipts
- list/detail views
- schema validation

Phase 4 — Audit ledger
- append-only events
- state-transition records

Phase 5 — Owner Matrix and Lane Registry
- role and lane definitions
- conflict detection

Phase 6 — Decision Brake and Break-Pass
- pause logic
- adversarial review

Phase 7 — Human decision workspace
- approve, deny, hold, narrow
- no automated approval

Phase 8 — Permission and release
- scoped grants
- expiry and revocation
- release tokens

Phase 9 — External stop controller
- simulated first
- independently controlled

Phase 10 — Integrations
- only after threat, test, and owner review

Each phase requires:
- architecture reference;
- tests;
- receipt;
- human review;
- visible stop path.


---

# 24 — Out of Scope for the First Implementation

- Autonomous approval
- Autonomous publication
- Autonomous deployment
- Payment movement
- Production infrastructure changes
- Destructive file operations
- Credential rotation by an AI system
- Legal, medical, financial, or safety certification
- Real-world agent execution
- Multi-tenant production hosting
- Public claims of universal safety
- Machine-declared completion
- Machine-controlled constitutional changes


---

# Known Limitations

These limitations are preserved as part of Architecture v1.0 RC1.

KL-01 — Exhaustive public URL coverage is not machine-certified.

The available deep-research reports supplied useful doctrine extraction but did not provide a sufficiently complete machine-readable manifest to prove that every current public URL was reviewed.

Disposition:
The architecture may be published as a coherent approved specification. It must not claim independently proven exhaustive site coverage unless the human owner separately approves that claim.

KL-02 — Source URLs require final verification.

Some source-manifest entries were derived from research reports or project continuity and require final URL and canonical-title verification before a public traceability claim is made.

KL-03 — Licensing remains undecided.

No public reuse license is selected in RC1. Publication should either include a chosen license or explicitly state that no license is granted beyond applicable law.

KL-04 — Cryptographic custody is specified at an architectural level.

The architecture supports content hashes and tamper-evident evidence. It does not select a final signing infrastructure, public timestamp service, or key-custody implementation.

KL-05 — Revocation latency budgets are domain-dependent.

The architecture requires stop and revocation dominance but does not impose one universal timing threshold across healthcare, finance, robotics, cybersecurity, publication, and other lanes.

KL-06 — Low-risk prototypes may combine roles.

The authority-role model supports separation of duties. A local prototype may place multiple roles in one human owner, but production deployments require a lane-specific separation-of-duty review.

KL-07 — No production implementation has been tested.

RC1 is an architecture specification. Passing architectural review does not prove that future code, integrations, operators, credentials, or deployments conform.

KL-08 — Publication is not certification.

Public release would establish provenance and make the architecture inspectable. It would not certify universal safety, legal compliance, operational fitness, or correctness.
