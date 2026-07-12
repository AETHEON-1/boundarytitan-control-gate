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
