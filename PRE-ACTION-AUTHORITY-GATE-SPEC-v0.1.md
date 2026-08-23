# Pre-Action Authority Gate Specification v0.1

**State:** PREPARED — REVIEWABLE  
**Purpose:** Define the control surface that must exist before a system receives authority to perform a consequential action.  
**Constitutional boundary:** The machine may prepare the action packet. It may not authorize, certify, or close itself.

## Core invariant

> **No pre-action authority, no consequential action.**

A human present during or after execution is not sufficient evidence of control. Control must occur before the system receives the credential, tool access, or execution authority required to create the consequence.

## Control sequence

Intent → Proposed action → Inspectable work record → Human challenge → Scoped authority decision → Credential or tool release → Independently enforced gate → Bounded execution → Independent monitoring → External stop or recovery

## Required pre-action work record

| Field | Required question |
|---|---|
| Request identity | Who or what initiated the request? |
| Action | What exact action is proposed? |
| Target | What exact object, account, system, or person is affected? |
| Scope | What is explicitly included and excluded? |
| Intended outcome | What result is being sought? |
| Evidence | What sources support the proposal? |
| Provenance | Where did each source come from, and when? |
| Assumptions | What must be true for the proposal to be valid? |
| Uncertainty | What remains unknown or disputed? |
| Alternatives | What lower-risk options were considered? |
| Authority basis | Who or what can permit this exact action? |
| Credential request | What authority, token, or tool access is required? |
| Consequence forecast | What can happen if the action succeeds or fails? |
| Harm budget | What bounded harm is tolerable before suspension? |
| Reversibility | How can the action be undone? |
| Recovery | Who restores the affected state? |
| Consequence owner | Who owns the result if it proceeds? |
| Stop authority | Who can deny, revoke, or halt it externally? |
| Expiry | When does the permission cease to exist? |
| Disposition | Proceed, deny, defer, escalate, or hold? |

## Authority-release rule

A decision is not effective merely because a human clicked an approval control.

Authority is released only when:

- the decision record is bound to the exact action and target;
- the approving authority is identity-bound;
- the scope, duration, and expiry are explicit;
- the credential or tool permission is independently constrained;
- the enforcement point receives the decision;
- the external stop path remains available;
- the record is preserved before execution begins.

Human approval ≠ authority release.  
Authority release = approval + binding + enforcement + expiry + stop path

## Fail-closed conditions

The gate must hold the action when:

- the target is ambiguous;
- the action differs from the approved action;
- the evidence packet is incomplete;
- the authority source is missing or stale;
- the approver is not identity-bound;
- the consequence owner is unknown;
- the stop authority is unavailable;
- credential scope cannot be verified;
- revocation latency is unknown or exceeds the harm window;
- the action is irreversible and no independent delay exists;
- the machine generated or controls the final disposition;
- the system cannot preserve the pre-action record.

## Machine boundary

The machine may draft proposals, collect and cite evidence, expose assumptions and uncertainty, generate alternatives, simulate outcomes, prepare the work record, and identify missing authority or control gaps.

The machine may not approve its own proposal, decide its evidence is sufficient, release its own credentials, certify its own gate, accept residual risk for itself, close its own failure, disable or redefine the external stop, or declare the action Green.

> **The machine cannot be the final judge of the machine.**

## Minimum enforcement model

Request → Policy gate → Human disposition → Credential broker → Target-specific capability → Execution

The policy gate and credential broker must be outside the decision-generating model. Runtime must not infer permission from natural-language intent, prior successful behavior, role labels, or the existence of a valid session.

## Evidence versus authority

Explanation is not evidence.  
Evidence is not authority.  
Authority is not enforcement.  
Enforcement is not consequence containment.  
Containment is not recovery.

## Required external controls

- authority registry;
- identity-binding mechanism;
- scoped credential broker;
- pre-action decision record;
- independent policy enforcement point;
- revocation mechanism;
- stop path outside the agent loop;
- immutable or append-only audit record;
- recovery owner;
- appeal or reopening path where people may be affected.

## State vocabulary

`PROPOSED` · `REQUIRES_EVIDENCE` · `REQUIRES_HUMAN_DECISION` · `DENIED` · `DEFERRED` · `AUTHORIZED_SCOPED` · `EXECUTING` · `SUSPENDED` · `REVOKED` · `RECOVERY_REQUIRED` · `CLOSED_BY_EXTERNAL_AUTHORITY`

Do not use `SAFE`, `CERTIFIED`, `AUTONOMOUSLY_APPROVED`, or `CLOSED_BY_SYSTEM`.

## Verification boundary

A test of the gate is not proof that the gate is safe. The evaluated system must not control test admission, hidden cases, evidence custody, interpretation, success thresholds, or final disposition.

Independent testing and human disposition remain required.

## Current status

This specification is a development artifact. It does not establish implementation, independent review, field validation, certification, deployment readiness, or operational safety.

**Only Green proceeds.**  
**No owner, no brake.**  
**No ledger, no trust.**