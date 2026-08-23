# Authority Resolver and Cryptographic Failure-State Register v0.1

**State:** PREPARED — REVIEWABLE
**Lane:** Cryptography
**Boundary:** Resolve whether a cryptographically authenticated action is currently authorized, then preserve all failure states that can invalidate that conclusion.
**Constitutional test:** `CAN ⊬ MAY`

## Core distinction

> The verifier answers: “Is this signature valid under the stated cryptographic rules?”

> The Authority Resolver answers: “May this principal perform this exact action against this exact target now?”

Signature validity is evidence. It is not permission.

## Authority-resolution chain

Valid signature → Verified principal → Current delegation → Correct jurisdiction → Exact action and target scope → Active permission → Enforced credential release

Every link is required. If any link is unknown, contradictory, stale, or unreachable, the action is held.

## Authority Resolver inputs

| Input | Required question |
|---|---|
| Principal | Who is requesting or authorizing the action? |
| Key identity | Which key produced the signature, and how is it bound to the principal? |
| Action | What exact operation is requested? |
| Target | What exact object, system, account, person, or resource is affected? |
| Audience | Which enforcement point or service is intended to consume the authority? |
| Scope | What limits apply to action, target, duration, volume, and environment? |
| Delegation | Who granted authority to this principal, and was delegation permitted? |
| Jurisdiction | Does the authority apply to this location, organization, data, and consequence domain? |
| Time | Is the authorization current under bounded clock assumptions? |
| Revocation | Has the authority been withdrawn, suspended, or superseded? |
| Freshness | Is this a new authorization or a replayed one? |
| Policy | Which version of the policy governs the decision? |
| Consequence owner | Who owns the result if the action proceeds? |
| Stop authority | Who can still deny, revoke, or halt the action externally? |

## Resolver output

The resolver must return a structured disposition:

| State | Meaning |
|---|---|
| `AUTHORIZED_SCOPED` | Every required authority condition is satisfied and enforcement is reachable |
| `DENIED` | A required authority condition fails |
| `REQUIRES_HUMAN_DECISION` | Evidence is sufficient to present, but authority remains unresolved |
| `DEFERRED` | A dependency such as time, revocation, or trust-root status cannot be established |
| `SUSPENDED` | Previously valid authority is temporarily withheld |
| `RECOVERY_AUTHORITY_REQUIRED` | An emergency or recovery path needs separate authority |

The resolver must never return `SAFE`, `CERTIFIED`, `FINAL`, or `CLOSED_BY_SYSTEM`.

## Verification and resolution separation

| Function | May establish | May not establish |
|---|---|---|
| Signature verifier | Signature validity over defined bytes | Permission or safety |
| Identity mapper | Key-to-principal binding | Authority for the action |
| Delegation checker | Validity of an authority transition | Correct consequence decision |
| Policy evaluator | Applicability of a stated rule | That runtime enforcement succeeded |
| Authority Resolver | Current scoped permission disposition | Universal safety or truth |
| Credential broker | Release of constrained capability | That the action is wise or lawful |
| Enforcement point | Permit or deny the bound request | That the consequence is contained |

## Cryptographic failure-state register

| ID | Failure state | First unsupported assumption | Required disposition |
|---|---|---|---|
| CFR-001 | `KEY_COMPROMISED` | Key custody → trustworthy authorization | Revoke, quarantine, investigate, recover externally |
| CFR-002 | `KEY_SUSPENDED` | Prior validity → current permission | Hold all new actions |
| CFR-003 | `REVOCATION_UNKNOWN` | No revocation response → still authorized | Fail closed for consequential action |
| CFR-004 | `DELEGATION_CONFLICT` | Multiple authority chains → one valid authority | Hold and escalate to human authority |
| CFR-005 | `TRUST_ROOT_CHANGED` | New root → automatically trusted root | Require independent root admission |
| CFR-006 | `SIGNATURE_CONTEXT_MISMATCH` | Signed bytes → intended action context | Reject; require action-specific signing |
| CFR-007 | `REPLAY_DETECTED` | Valid historical signature → fresh permission | Reject and preserve evidence |
| CFR-008 | `ROLLBACK_DETECTED` | Older valid state → current valid state | Reject or require external recovery authority |
| CFR-009 | `CLOCK_UNTRUSTED` | Timestamp → reliable current time | Suspend time-dependent authority |
| CFR-010 | `CLOCK_SKEW_EXCEEDED` | Expiry calculation → valid temporal decision | Hold until bounded time is restored |
| CFR-011 | `ENFORCEMENT_UNREACHABLE` | Authorization decision → gate received it | Fail closed; do not release capability |
| CFR-012 | `VERIFIER_POLICY_MISMATCH` | Shared signature rules → shared decision | Hold and reconcile policy versions |
| CFR-013 | `CANONICALIZATION_MISMATCH` | Same object text → same signed object | Reject; normalize independently |
| CFR-014 | `AUDIENCE_MISMATCH` | Valid token → intended service may consume it | Reject; bind audience explicitly |
| CFR-015 | `SCOPE_MISMATCH` | Valid principal → exact action and target permitted | Reject and preserve packet |
| CFR-016 | `RECOVERY_PATH_UNTRUSTED` | Emergency credential → safe restoration | Require separate recovery authority |
| CFR-017 | `TRUST_SERVICE_UNAVAILABLE` | Missing status → permission persists | Suspend or fail closed by harm bound |
| CFR-018 | `VERIFICATION_DOS` | Verification service → available control | Activate bounded fallback; never fail open |
| CFR-019 | `SECRET_BACKUP_UNBOUND` | Recovery copy → same custody controls | Quarantine until custody is verified |
| CFR-020 | `HUMAN_DISPLAY_MISMATCH` | Human saw → human signed | Bind displayed and signed canonical packet |
| CFR-021 | `ALGORITHM_DEPRECATED` | Accepted algorithm → acceptable security | Reject or route to controlled migration |
| CFR-022 | `LIBRARY_OR_FIRMWARE_UNTRUSTED` | Cryptographic primitive → trusted implementation | Suspend affected path and investigate |
| CFR-023 | `REVOCATION_PROPAGATION_DELAY` | Revocation issued → enforcement stopped | Measure latency; hold irreversible action |
| CFR-024 | `EXTERNAL_STOP_UNAVAILABLE` | Permission → stoppability remains | Deny or suspend consequential action |

## Replay and rollback requirements

Every consequential authorization must bind:

- unique request identifier;
- nonce or monotonic sequence;
- principal and key identifier;
- action and exact target;
- audience and enforcement point;
- policy version;
- issuance time and bounded expiry;
- current authority state;
- predecessor state or version;
- consequence owner;
- external stop reference.

A valid signature over an old packet must not create current permission.

## Trust-root governance

Trusted roots, algorithms, verification policies, and revocation services are themselves authority-bearing dependencies.

They require:

- named admission authority;
- versioned change records;
- independent review;
- rollback protection;
- emergency suspension;
- recovery ownership;
- external stop authority;
- public or independently inspectable custody where appropriate.

## Multi-party authority

When multiple approvals are required, the register must preserve:

- required quorum;
- signer identities and roles;
- independence or conflict status;
- ordering requirements;
- disagreement state;
- unavailable signer behavior;
- revocation of individual approvals;
- whether one signer can unilaterally authorize execution.

Quorum does not automatically establish good judgment. It establishes only that the stated quorum condition was met.

## Required tests

- replay a previously valid authorization;
- revoke before execution and measure enforcement latency;
- alter the target while preserving a valid signature over the original;
- substitute an audience or enforcement point;
- introduce clock skew and stale timestamps;
- change the trusted root;
- create conflicting delegation chains;
- interrupt revocation services;
- exercise emergency recovery;
- present a human with a display different from the signed canonical packet;
- downgrade the algorithm or verification policy;
- make the external stop path unavailable.

Tests must be admitted, executed, and evaluated independently of the system under test.

## Final boundary

Cryptographic verification can establish that defined bytes were signed under defined assumptions.

The Authority Resolver must separately establish whether the signed action is currently permitted.

The enforcement point must separately establish whether the permission was applied.

The external stop authority must remain able to say no.

> **A cryptographic control is not Green merely because it rejects forged messages. It must fail safely when identity, time, revocation, trust roots, enforcement, or availability become uncertain.**

## Status

This is a development artifact. It does not establish implementation, key security, identity assurance, independent review, field validation, certification, or deployment readiness.

**No owner, no brake. No ledger, no trust.**