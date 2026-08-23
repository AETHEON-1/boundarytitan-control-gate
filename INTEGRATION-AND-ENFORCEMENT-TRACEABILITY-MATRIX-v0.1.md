# Integration and Enforcement Traceability Matrix v0.1

**State:** PREPARED — REVIEWABLE
**Purpose:** Connect constitutional invariants to rules, states, schemas, modules, tests, failure states, owners, external stops, and evidence.
**Boundary:** This matrix exposes implementation gaps. It does not certify synchronization or operational effectiveness.

## Traceability rule

Every critical control must map:

Invariant → Rule → State → Schema field → Module → Test → Failure state → Owner → External stop → Evidence

Missing links are recorded as `UNKNOWN`. They may not be inferred from neighboring documents.

## Canonical control matrix

| Control | Invariant | Rule | State | Schema or record | Module | Test | Failure state | Owner | External stop | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| No machine self-approval | C-01, C-07 | R-010, R-013 | Awaiting Human Decision | ApprovalRecord | Authority Gate | Machine cannot create approval | F-01 | Decision Owner | Emergency Stop Authority | AuditEvent | DOCUMENTED |
| Capability is not permission | C-02 | R-016 | Permission Not Granted | PermissionGrant | Permission Model | Capability without permission | F-02 | Accountable Owner | Revocation Authority | Permission record | DOCUMENTED |
| Green is not approval | C-08 | R-012 | Green-Eligible | Routing result | Routing Board | Green display test | F-02 | Reviewer | Decision Owner | Routing record | DOCUMENTED |
| Receipt is not permission | C-09 | R-014 | Consequence Recorded | ConsequenceReceipt | Receipt module | Receipt cannot release | F-10 | Evidence Custodian | Release Authority | Receipt | DOCUMENTED |
| Pre-action authority | C-10, C-12 | R-008, R-015 | Requires Human Decision | Pre-action Work Record | Pre-Action Authority Gate | No record, no release | F-03 | Decision Owner | Emergency Stop Authority | Work record | DOCUMENTED |
| Scoped release | C-10 | R-017, R-018 | Authorized Scoped / Released | ReleaseToken | Credential Broker | Scope mismatch blocks | F-06, F-15 | Release Authority | Revocation Authority | Release event | NOT IMPLEMENTED |
| Restart invalidates authority | C-11, C-15 | R-026 | Restarted / Not Released | Session and release state | Runtime state manager | Restart inheritance test | F-07 | System Custodian | External Stop Authority | Restart audit | DOCUMENTED |
| Revocation dominance | C-11 | R-017, R-021, R-022 | Revoked / Suspended | Revocation record | Revocation Controller | Latency dominance test | F-08, F-16 | Revocation Authority | External Stop Authority | Revocation receipt | NOT MEASURED |
| External brake | C-11, C-12 | R-009, R-021 | Suspended / Stopped | Stop event | External Stop Controller | Stop-path test | F-08 | Emergency Stop Authority | Independent stop mechanism | Stop evidence | NOT IMPLEMENTED |
| Machine cannot close itself | C-01, C-17 | R-025 | External Disposition Required | DispositionRecord | Review Boundary | Self-closure test | F-01 | Decision Owner | Appeal Authority | Human disposition | DOCUMENTED |
| Authority resolution | C-02, C-10 | R-015, R-016 | Authorized Scoped / Denied | AuthorityResolution | Authority Resolver | Delegation and scope tests | CFR-015 | Authority Resolver Owner | Revocation Authority | Resolution record | NOT IMPLEMENTED |
| Cryptographic verification | C-16 | R-024 | Verification Pending / Verified | Signature and key record | Cryptography Lane | Signature and context tests | CFR-006, CFR-013 | Key Custodian | Key Revocation Authority | Verification record | DOCUMENTED |
| Cryptographic failure handling | C-11, C-16 | R-009, R-022 | Suspended / Recovery Required | FailureStateRecord | Failure Register | Failure battery | CFR-001–CFR-024 | Cryptography Owner | External Stop Authority | Failure record | DOCUMENTED |
| Maintenance drift control | C-16, C-19, C-20 | R-024, R-027 | Drift Suspected / Reconciliation Required | MaintenanceRecord | Maintenance Lane | Drift detection tests | Schema or state drift | Maintenance Owner | Human Reopening Authority | Maintenance record | DOCUMENTED |

## State reconciliation

The following states are defined in newer lane artifacts and require canonical integration into the state model before runtime implementation:

- `REQUIRES_EVIDENCE`;
- `REQUIRES_HUMAN_DECISION`;
- `AUTHORIZED_SCOPED`;
- `RECOVERY_AUTHORITY_REQUIRED`;
- `KEY_COMPROMISED`;
- `KEY_SUSPENDED`;
- `REVOCATION_UNKNOWN`;
- `DELEGATION_CONFLICT`;
- `TRUST_ROOT_CHANGED`;
- `SIGNATURE_CONTEXT_MISMATCH`;
- `REPLAY_DETECTED`;
- `ROLLBACK_DETECTED`;
- `CLOCK_UNTRUSTED`;
- `ENFORCEMENT_UNREACHABLE`;
- `CURRENT`;
- `DRIFT_SUSPECTED`;
- `RECONCILIATION_REQUIRED`.

Until reconciled, these states remain lane-local preparation states and must not be treated as globally executable states.

## Schema reconciliation

The following records require canonical machine-readable schemas or explicit field extensions:

| Record | Required minimum fields | Status |
|---|---|---|
| Pre-action Work Record | Request, action, target, evidence, uncertainty, authority, credential request, consequence, owner, brake, expiry, disposition | MISSING |
| Authority Resolution | Principal, key, delegation, action, target, audience, scope, jurisdiction, time, revocation, policy, disposition | MISSING |
| Release Token | Approval reference, action binding, target binding, issuer, expiry, nonce, revocation state, enforcement point | PARTIAL |
| Cryptographic Failure State | Failure ID, detection, evidence, containment, owner, stop path, recovery, disposition | MISSING |
| Maintenance Record | Change, impact, affected controls, migration, reviewer, disposition, rollback | MISSING |
| Stop Event | Issuer, target, reason, time, propagation, enforcement confirmation, recovery owner | PARTIAL |

## Implementation boundary

Current repository evidence supports:

- declaration-only TypeScript contracts;
- schema and compatibility preparation;
- documentation of control sequences;
- test strategy and failure enumeration;
- public traceability of current claims.

Current repository evidence does not establish:

- an executable Authority Resolver;
- an executable Credential Broker;
- an independently enforced Release Gate;
- a production cryptographic key hierarchy;
- measured revocation or stop latency;
- independent test custody;
- deployment or field readiness.

## Required resolution order

1. Canonicalize states and transitions.
2. Add the missing machine-readable schemas.
3. Implement the local-only pre-action gate.
4. Implement Authority Resolver decision logic.
5. Bind release tokens to exact action and target.
6. Add independent failure and revocation tests.
7. Measure stop and revocation dominance.
8. Reconcile maintenance checks against the matrix.
9. Obtain independent human review.

## Green rule

A control may not be marked Green because its document exists.

It may be Green only when the matrix has:

- a canonical state;
- a validated schema;
- an implementation module;
- an independent test;
- a named owner;
- a reachable external stop;
- current evidence;
- human disposition.

## Current disposition

**DOCUMENTATION: STRUCTURALLY MAPPED**  
**SCHEMAS: PARTIAL**  
**RUNTIME ENFORCEMENT: NOT ESTABLISHED**  
**INDEPENDENT TESTING: NOT ESTABLISHED**  
**STOP-PATH LATENCY: NOT MEASURED**  
**DEPLOYMENT: NOT APPROVED**

**No owner, no brake. No ledger, no trust.**