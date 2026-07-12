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
