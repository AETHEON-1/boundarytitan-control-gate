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
