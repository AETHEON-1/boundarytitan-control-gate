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
Detection: reused, expired, target-mismatched, or parameter-mismatched approval reference.
Containment: single-use or exact-action-bound release token.

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
Detection: hash, sequence, or expected-event mismatch.
Containment: freeze affected action and preserve evidence.

F-10 Receipt laundering
Detection: receipt presented as certificate or permission.
Containment: mandatory language and schema separation.

F-11 Lane drift
Detection: action scope no longer matches assigned lane.
Containment: reroute and invalidate prior validation.

F-12 Hidden action path
Detection: external side effect without an ExecutionRecord or mediation record.
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
Detection: revoked token, session, lease, cached allow, or descendant delegation remains effective.
Containment: external network/tool/credential kill path.

F-17 Confused deputy
Detection: valid credential used by the wrong caller, purpose, delegation chain, or target.
Containment: bind caller, audience, purpose, action, and target at enforcement.

F-18 Token audience substitution
Detection: token accepted by unintended resource, proxy, sibling service, or redirected endpoint.
Containment: strict audience/resource validation at every resource server.

F-19 Authorization cache staleness
Detection: local policy or session state remains permissive beyond revocation deadline.
Containment: bounded leases, revalidation, and fail-closed expiry.

F-20 Revocation/commit race
Detection: revocation arrives after policy check but before irreversible commit.
Containment: commit-time recheck or enforced commit delay sufficient for stop dominance.

F-21 TOCTOU action mutation
Detection: reviewed action, target, dependency, or parameters differ at commit.
Containment: immutable binding or mandatory reauthorization.

F-22 Tool poisoning
Detection: adversarial instructions in tool metadata, schema, descriptions, or outputs.
Containment: treat tool content as untrusted data; require execution-layer authorization.

F-23 Tool shadowing/name collision
Detection: multiple tools resolve to the same or confusable identity.
Containment: immutable namespace, provenance, implementation, and version binding.

F-24 Tool rug pull
Detection: tool behavior, metadata, endpoint, or dependency changes after approval.
Containment: integrity pinning and change-triggered reinspection.

F-25 Delegation amplification
Detection: descendant authority exceeds parent authority through role, group, tool, or sub-agent composition.
Containment: monotonic attenuation and full delegation-graph evaluation.

F-26 Cross-agent authority laundering
Detection: one agent routes a prohibited action through a more privileged peer.
Containment: the acting agent must independently evaluate action authority.

F-27 Authority composition leakage
Detection: individually permitted steps combine into an unauthorized aggregate consequence.
Containment: aggregate consequence limits and composition-aware policy.

F-28 Output-to-execution laundering
Detection: generated content is interpreted downstream as executable command, policy, configuration, or authorization.
Containment: typed content/execution boundary and downstream authorization.

F-29 Hidden side-effect channel
Detection: consequential effect through callbacks, telemetry, previews, sync, notifications, error paths, or indexing.
Containment: side-effect inventory plus complete mediation testing.

F-30 Fail-open control outage
Detection: identity, policy, network, clock, approval, or audit dependency outage causes permissive fallback.
Containment: fail closed for privileged or irreversible operations.

F-31 Ownerless consequence
Detection: delegation or automation reaches execution without an identifiable accountable human or institution.
Containment: block until owner binding is restored.

F-32 Brake dependency capture
Detection: executor and brake share a dependency the executor can control, disable, delay, or outlive.
Containment: independent stop authority and dependency separation.

F-33 Policy-version drift
Detection: authorization and execution reference different policy state.
Containment: policy version binding and change-triggered hold.

F-34 Downstream prompt cascade
Detection: inherited agent/tool content causes privileged downstream action.
Containment: provenance/taint handling and fresh action-time authorization.

F-35 Recovery-path bypass
Detection: break-glass, maintenance, degraded, or disaster-recovery path bypasses ordinary authority controls.
Containment: separately bounded recovery authority with owner, expiry, audit, and closure.

## Failure-mode requirement

Every high-consequence failure mode must have:
- detection;
- containment;
- accountable owner;
- evidence trail;
- reversibility treatment;
- external stop path;
- test.

The public executable challenge surface is `AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md` and `src/tests/authorization-machinery-adversarial-battery.test.ts`.

A gate observed on one path is not evidence that all paths are gated.
