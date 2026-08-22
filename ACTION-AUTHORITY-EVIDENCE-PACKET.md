# Action Authority Evidence Packet

Status: declaration-only integration kernel. Not a live authorization service.

This layer binds an action to its principal, delegation chain, normalized target, policy freshness, evidence, approval, execution, independent readback, consequence owner, and external stop path.

## Boundary

- Identity proves who or what is presenting a request; it does not establish permission.
- A policy decision is an input to enforcement; it is not enforcement itself.
- Approval is bound to one normalized action, one target, one expiry, and one execution.
- Execution does not prove that the target state changed.
- A signed receipt proves custody of a statement, not the truth of the statement.
- Unknown mediation coverage is a HOLD condition.
- Revocation must invalidate downstream delegated authority.
- Machine authority and machine certification remain structurally false.

## State vocabulary

DENIED, HELD, REQUIRES_EXTERNAL_REVIEW, EXECUTED_PENDING_READBACK, READBACK_SUPPORTED, READBACK_CONTRADICTED, and INDETERMINATE are evidence/disposition states. None is machine certification.

## External design anchors

The implementation references are named explicitly in [CITATIONS.md](./CITATIONS.md). The relevant patterns are:

- Delego-Dev's Delego project: intent-bound, single-use action authorization and audit receipts.
- SPIFFE project: short-lived workload identity documents; identity remains distinct from authorization.
- Cedar Policy Language project: policy language and authorization decision evaluation; enforcement remains an application responsibility.
- The Update Framework project: signed metadata, rollback detection, freeze detection, role separation, and trust-root/key rotation.
- Temporal Technologies: durable human-in-the-loop waits using Signals, timers, and recorded decisions.

These are implementation references and attributed design patterns, not validation of BoundaryTitan architecture, legal advice, safety certification, or claims that the cited projects endorse BoundaryTitan.

## Required adversarial checks

- Redirect an approval from action A to action B.
- Replay approval A.
- Revoke an upstream delegation and test every descendant.
- Present stale policy state.
- Hide an alternate execution surface.
- Truncate or roll back the evidence history.
- Change the target after approval.
- Report execution without independent readback.
- Remove the consequence owner.
- Remove the external stop path.

Only Green proceeds. No owner, no brake. No ledger, no trust.
