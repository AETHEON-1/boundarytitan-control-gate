# Sledgehammer Workflow v0.1

## Purpose

Attack a proposed system, claim, tool, lane, or control surface before capability is expanded or consequence is accepted.

The Sledgehammer is an adversarial method, not a certification engine. It may expose failure; it may not declare the system permanently safe.

## Kernel

> **Build it. Freeze it. Hit it. Keep what survives.**

## Workflow

```text
1. FREEZE THE CLAIM
2. DECLARE THE SYSTEM BOUNDARY
3. MAP THE END-TO-END ARROWS
4. FIND HIDDEN DEFAULT BAGGAGE
5. ATTACK THE FIRST UNSUPPORTED ARROW
6. ATTACK THE STOP PATH
7. ATTACK THE RECEIPT
8. ATTACK THE OWNER AND HANDOFF
9. INJECT DRIFT, FAILURE, DELAY, AND ADVERSARIAL INPUT
10. CLASSIFY WHAT SURVIVED
11. PRESERVE THE UNKNOWN
12. FREEZE, REOPEN, NARROW, OR ROUTE
```

## Attack surfaces

### Claim

- What exactly is being asserted?
- Is it documented, inferred, proposed, or unknown?
- Does the wording imply more than the evidence establishes?

### Boundary

- What is inside the system?
- What is outside it?
- Which defaults, queues, caches, retries, credentials, agents, vendors, or physical energies remain hidden?

### Arrows

Attack every promotion:

```text
CAN → MAY
OUTPUT → EVIDENCE
EVIDENCE → AUTHORITY
AUTHORITY → ACTION
ACTION → STATE CHANGE
STATE CHANGE → CONSEQUENCE
REPORT → COMPLETION
SILENCE → AGREEMENT
LOCAL PASS → GLOBAL SAFETY
```

### Brake

- Can it act without the optimizer’s cooperation?
- Can queued, delegated, cached, or stored energy continue afterward?
- Does restart restore authority?
- Who can still say no from outside the system?

### Receipt

- Does it record the original claim?
- Does it preserve assumptions, failed attempts, unknowns, and corrections?
- Does it distinguish what was said, what occurred, and what was authorized?

### Handoff

- Which lane does the issue belong to?
- Which specialist must review it?
- Does routing transfer authority accidentally?
- Is the human owner named?

## Attack modes

- **Sledgehammer:** construct the strongest failure case.
- **Inverse:** assume the control failed; work backward to the first enabling condition.
- **Converse:** test whether the claimed implication survives reversal.
- **Chaos:** inject timing, communication, identity, queue, restart, and dependency failures.
- **Omissions:** identify what the presentation avoids naming.
- **Thermodynamic:** test residual energy, heat, inertia, pressure, and stop margin.
- **Linguistic:** replace confident terms with exact claims and expose hidden authority.
- **Institutional:** test whether the surrounding organization will honor the brake.

## Disposition

```text
GREEN FOR BOUNDED REVIEW
YELLOW — UNKNOWN OR EVIDENCE GAP
RED — UNSUPPORTED AUTHORITY OR CONSEQUENCE PATH
FROZEN — DRIFT, BRAKE FAILURE, OR CUSTODY FAILURE
REOPENED — HUMAN OWNER CHANGED THE SCOPE
```

The Sledgehammer does not promote a result to approval, certification, deployment, legal compliance, or closure.

## Sledgehammer receipt

```text
claim_id
scope
declared assumptions
attack performed
first unsupported arrow
failure observed
evidence preserved
unknowns remaining
consequence owner
specialist handoff
external brake
reopening condition
disposition
```

## Smallest diagnostic question

> **What is this allowed to change—and who can still say no?**

## HTK

Do not ask whether the system looks impressive. Hit the place where capability becomes permission, permission becomes action, and action becomes consequence.

If the system survives, keep the evidence. If it fails, preserve the receipt. If nobody owns the consequence or nobody can stop it, stop the build.

**Only Green proceeds. No owner, no brake. No ledger, no trust.**
