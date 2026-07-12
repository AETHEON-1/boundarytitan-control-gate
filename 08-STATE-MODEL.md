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
