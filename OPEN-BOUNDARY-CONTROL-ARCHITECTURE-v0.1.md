# Open Boundary Control Architecture v0.1

## Status

FROZEN CANDIDATE — INTEGRATION PREPARATION

This is not a finished product and must not be described as complete, safe, certified, deployable, or closed. It is a continuously inspectable control architecture whose kernel remains open to adversarial attack.

## Name

**Open Boundary Control Architecture (OBCA)**

“Open” means open to evidence, attack, correction, specialist review, and human reopening. It does not mean open authority.

## End-to-end hierarchy

```text
CONSTITUTIONAL BOUNDARY
        ↓
LANE / SCOPE
        ↓
CAPABILITY
        ↓
OUTPUT
        ↓
CLAIM
        ↓
EVIDENCE
        ↓
PERMISSION
        ↓
AUTHORITY
        ↓
ACTION
        ↓
STATE CHANGE
        ↓
CONSEQUENCE
        ↓
CONSEQUENCE RECEIPT
        ↓
OWNER + SPECIALIST HANDOFF
        ↓
EXTERNAL BRAKE
```

No downward arrow is automatic. Each arrow is an authority-bearing transition requiring its own evidence, owner, denial path, and receipt.

## Smallest kernel

```text
CAN ⊬ MAY
OUTPUT ⊬ AUTHORITY
LOCAL PASS ⊬ GLOBAL SAFETY
RECEIPT ⊬ PERMISSION
MACHINE OUTPUT ⊬ FINAL VERDICT
```

Minimum operational form:

> No consequential transition without evidence, authority, ownership, a receipt, and an external stop path.

## Capability and access distinction

The architecture does not need to erase capability in order to control consequence. It bounds access, invocation, execution, and authority.

```text
Capability may remain available
→ access is scoped
→ invocation is permitted
→ execution is controlled
→ consequence is owned
```

“Deny by default” applies to access and execution. It does not mean that capability itself must be destroyed or hidden.

## Permanent attack condition

The machine may know the kernel, map the walls, inspect the brake, search for bypasses, simulate escape, and propose repairs. It may not convert discovery of a route around a control into permission to use that route.

Every review therefore asks:

- What is the first unsupported arrow?
- What hidden authority is carried by a default, fallback, cache, retry, queue, or inherited credential?
- Can the transition be paused before consequence?
- What receipt proves what actually happened?
- Who can still say no?

## Lane-drift rule

```text
DRIFT DETECTED
→ FREEZE EXECUTION
→ REVOKE OR QUARANTINE ACTIVE AUTHORITY
→ PRESERVE STATE AND RECEIPT
→ ROUTE SPECIALIST HANDOFF
→ AWAIT EXTERNAL HUMAN RELEASE
```

The machine cannot clear its own freeze, certify its own containment, or authorize its own restart.

## What “finished” means

There is no closure state for the architecture. The admissible states are:

- `PREPARED` — structure exists; claims remain bounded.
- `GREEN FOR BOUNDED REVIEW` — the declared review packet is internally coherent.
- `YELLOW` — uncertainty, custody, or verification remains open.
- `FROZEN` — execution or promotion is blocked.
- `REOPENED` — a human owner has changed the review scope.
- `RED` — a control failure or unacceptable uncertainty blocks progression.

No state means universally safe or complete. Only the human owner may admit, reopen, publish, deploy, or stop.

## Integration rule

OBCA sits above domain implementations as a cross-lane control architecture. Domain kernels translate it; they do not supersede it. Robotics, legal, cyber, finance, healthcare, and other lanes must retain their own standards, owners, evidence, and external stop paths.

The architecture may evolve indefinitely. Its invariant is not “never change.” Its invariant is:

> Change must remain visible, attributable, reviewable, reversible where possible, and externally stoppable.

## HTK

The system is never finished. It is kept inspectable.

The machine can help find the wall and attack the wall. Humans still decide whether the wall is sufficient, who owns the consequence, and when anything may proceed.

**Constraint precedes capability. No owner, no brake. No ledger, no trust.**
