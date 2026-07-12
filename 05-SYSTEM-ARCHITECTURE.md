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
