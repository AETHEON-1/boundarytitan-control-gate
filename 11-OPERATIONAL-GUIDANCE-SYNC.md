# 11 — Operational Guidance Sync

## Purpose

Define how a machine or agent may consume this repository as operational guidance without allowing repository state, machine interpretation, or automated synchronization to become authority.

## Core boundary

Repository state ≠ permission state.

The repository may provide inspectable operational guidance. It may not authorize, certify, approve, or close consequence-bearing decisions merely because guidance is present, parsed, synchronized, or executable.

CAN read guidance.
CAN apply guidance.
CAN detect conflicts.
CAN prepare evidence.
CAN propose updates.
CAN show which rule produced a recommendation or refusal.
CAN refuse when a governing rule requires refusal.

CAN ⊬ MAY rewrite governing authority.

## Direction of control

BoundaryTitan control surface
→ human-established canonical doctrine
→ repository normalization
→ machine-readable operational guidance
→ bounded system behavior

Never:

repository change
→ automatic doctrine
→ automatic authority

## Sync contract

A compliant operational sync MUST:

1. Read guidance from an explicit repository ref, commit SHA, or release identifier.
2. Preserve the exact source path and source revision for every rule used in a consequential decision path.
3. Preserve each rule's source class and authority status.
4. Treat lower-level sources as unable to silently redefine higher-level sources.
5. Detect contradictory guidance and HOLD rather than choose authority by convenience.
6. Preserve UNKNOWN when required ownership, evidence, permission, or source status is missing.
7. Produce an inspectable decision trace showing which repository rules were consulted.
8. Keep approval, certification, deployment authorization, risk acceptance, and final disposition outside machine authority.
9. Require an external human-controlled path for overriding, revoking, replacing, or stopping operational guidance.
10. Fail closed for consequence-bearing transitions when the applicable authority state cannot be established.

## Source-class handling

The source hierarchy in `02-CANONICAL-SOURCE-HIERARCHY.md` remains controlling for interpretation.

Operational consumers MUST preserve these distinctions:

- Constitutional doctrine
- Operational doctrine
- Domain translation
- Case evidence
- Visual/rhetorical compression
- Proposed implementation control

A machine MAY use all classes as evidence or guidance within their stated scope.

A machine MUST NOT promote any lower class into a higher authority class by inference, repetition, implementation, code generation, commit history, or successful execution.

## Required runtime record

For every consequence-bearing recommendation, request, refusal, or proposed execution transition, the operational consumer SHOULD emit or retain a record containing at minimum:

- repository
- source ref
- commit SHA
- consulted paths
- applicable source classes
- detected conflicts
- evidence state
- authorization state
- named consequence owner, if known
- external stop path, if known
- who can still say no
- resulting gate state

This record is evidence. It is not permission.

## Gate behavior

GREEN
- applicable rule path resolved
- required evidence present
- authorization externally established
- named consequence owner present where required
- external stop path present where required
- no unresolved source conflict

YELLOW
- ambiguity, incomplete evidence, stale guidance, or bounded uncertainty exists
- narrow, reversible, non-consequential preparation may continue
- consequence-bearing transition does not proceed

RED
- governing rule prohibits the transition
- required authority is absent
- applicable conflict cannot be resolved
- evidence contradicts the proposed transition

BLACK
- attempted self-authorization, self-certification, authority escalation, provenance suppression, or bypass of the external brake
- refuse and preserve the evidence trail

Only GREEN may be presented to the named human owner as ready for decision.

GREEN does not mean machine approval. It means the packet is clean enough for the named human owner to decide.

## Update handling

Synchronization to a newer repository revision MUST NOT silently replace the active operational baseline for consequence-bearing work.

A new revision MUST be treated as a candidate guidance state until one of the following occurs:

- the human owner explicitly adopts it for the relevant operational scope, or
- an already-authorized external deployment process adopts it under a pre-existing bounded change-control rule.

Absent one of those conditions, the previous adopted baseline remains active and the newer state remains proposed guidance.

## Conflict rule

When repository guidance conflicts with the higher-order control surface, explicit human-owner direction, or a more authoritative source class:

1. Freeze the claim.
2. Establish the evidence.
3. Identify the conflicting sources and revisions.
4. Do not resolve authority by machine preference.
5. HOLD consequence-bearing action.
6. Route the conflict to the named human owner.

## Machine limits

The operational consumer cannot:

- declare itself compliant
- certify its own interpretation
- approve a repository revision
- convert successful execution into legitimate authorization
- infer permission from capability
- infer authority from credentials
- infer correctness from repeated agreement
- close its own audit finding
- remove or supersede the external stop path

## External brake

The final brake remains outside the operational consumer and outside any self-modifiable guidance interpreter.

The system may know the brake.
The system may model the brake.
The system may predict the brake.
It may not own the authority that makes the brake binding.

## Minimum kernel

The repo may guide the machine.
The machine may not use the repo to crown itself.

Only Green proceeds.
No owner, no brake.
No ledger, no trust.
