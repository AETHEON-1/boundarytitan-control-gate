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
