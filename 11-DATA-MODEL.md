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
