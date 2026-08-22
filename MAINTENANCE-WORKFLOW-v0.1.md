# Maintenance Workflow v0.1

## Status

FROZEN CANDIDATE — MAINTENANCE-ONLY CONTROL PATH

## Purpose

Maintain the integrity of the repository, tools, permissions, receipts, terminology, lane registry, and external stop paths without silently expanding capability, authority, or execution scope.

Maintenance is not a back door to deployment.

## Maintenance kernel

```text
Inspect
→ compare
→ identify drift
→ declare repair scope
→ obtain maintenance permission
→ make bounded change
→ verify independently
→ record receipt
→ release or freeze
```

## Maintenance assistant boundary

Maintenance assistants are untrusted by default and may assist only with system maintenance.

They may:

- inspect declared repository and configuration surfaces;
- compare versions and manifests;
- identify stale permissions and unknown dependencies;
- detect schema, terminology, and lane drift;
- prepare patches for human review;
- run declared tests;
- generate maintenance receipts;
- recommend freeze, rollback, or specialist handoff.

They may not:

- use live production credentials;
- alter external systems without separate authorization;
- deploy, publish, merge, or release;
- expand their own maintenance scope;
- create new agents without new permission;
- clear their own freeze;
- certify their own repair;
- convert maintenance access into operational authority.

## Recursive improvement boundary

Recursive improvement is admissible only as a bounded proposal and test process:

```text
Observe
→ propose improvement
→ declare changed assumption
→ test independently
→ preserve result and uncertainty
→ request human disposition
```

Recursive self-authorization is never admissible:

```text
System proposes change
⊬
System approves change
⊬
System grants itself new access
⊬
System releases or deploys itself
```

The improving system may attack its own assumptions, generate counterexamples, and recommend a narrower or stronger control. It may not determine that its own improvement is sufficient, authorize its own permission transition, clear its own freeze, or close its own verification.

## Maintenance lanes

```text
REPOSITORY INTEGRITY
DEPENDENCY AND VERSION DRIFT
PERMISSION AND CREDENTIAL HYGIENE
SCHEMA AND CONTRACT ALIGNMENT
LANE AND TERMINOLOGY REGISTRY
RECEIPT AND LEDGER CUSTODY
TEST AND FIXTURE HEALTH
EXTERNAL BRAKE INSPECTION
DEPRECATION AND RETIREMENT
INCIDENT RECOVERY
```

Each run uses one primary lane. Lane intersections require an explicit handoff record. Permissions and context may not bleed across lanes.

## Maintenance state machine

```text
REQUESTED
  ↓
SCOPED
  ↓
INSPECTING
  ↓
DRIFT FOUND / NO DRIFT FOUND
  ↓
REPAIR PROPOSED
  ↓
HUMAN MAINTENANCE RELEASE
  ↓
REPAIR APPLIED
  ↓
INDEPENDENT CHECK
  ↓
RELEASED / FROZEN / ROLLED BACK
```

No transition from `INSPECTING` directly to `RELEASED` is permitted.

## Drift classes

- **Content drift:** source or doctrine changed.
- **Schema drift:** contracts no longer align.
- **Permission drift:** access exceeds declared scope.
- **Identity drift:** role or owner is unclear.
- **Dependency drift:** tool, vendor, library, or external source changed.
- **Temporal drift:** expiry, review date, or evidence window passed.
- **Behavior drift:** output or execution no longer matches the declared role.
- **Brake drift:** stop, revocation, isolation, or restart behavior changed.
- **Receipt drift:** events are no longer captured or remain unverifiable.

## Freeze conditions

Freeze the affected lane when:

- an active permission has no owner;
- a repair changes authority-bearing behavior unexpectedly;
- a dependency is untracked or unreviewed;
- a receipt cannot be produced;
- a test result conflicts with the declared contract;
- a maintenance assistant attempts scope expansion;
- a brake or revocation path is unavailable;
- a restart would restore stale authority;
- the repair cannot be independently checked.

```text
Drift or uncertainty
→ freeze affected scope
→ preserve evidence
→ revoke or quarantine active access where authorized
→ route specialist handoff
→ await external release
```

## Maintenance receipt

```text
maintenance_id
requester
assistant_role
primary_lane
declared_scope
sources_inspected
versions_before
versions_after
drift_found
repair_proposed
repair_applied
tests_run
independent_checker
unknowns
owner
specialist_handoff
freeze_or_release_state
external_brake
reopening_condition
```

The receipt records maintenance work. It is not permission, certification, or deployment approval.

## Restart and recovery

After restart, maintenance authority does not inherit automatically. The system must revalidate:

- assistant identity;
- maintenance role;
- lane and scope;
- owner;
- expiry;
- revocation path;
- external brake;
- unresolved freeze state.

## Retirement

Retiring a tool or assistant requires:

1. stop new work;
2. revoke active access;
3. drain or quarantine queued work;
4. preserve receipts and source history;
5. identify retained copies and delegated descendants;
6. record the retirement owner;
7. verify that restart cannot silently restore authority.

## Smallest maintenance diagnostic

> **What changed, what access does it still have, and who can still stop it?**

## HTK

Maintenance is where boundaries quietly decay. The system may look unchanged while permissions, dependencies, defaults, queues, owners, or brakes have shifted underneath it.

The maintenance assistant keeps the system inspectable. It does not become the system’s authority.

> **Maintain the boundary without inheriting the authority. No ledger, no trust.**
