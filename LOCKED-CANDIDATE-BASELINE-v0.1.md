# Locked Candidate Baseline v0.1

## State

FROZEN CANDIDATE — LAST EDITS RECORDED — OPEN TO EXTERNAL ATTACK

The repository is locked as a coherent local preparation baseline. “Locked” means changes require an explicit human reopening decision. It does not mean complete, certified, deployed, or beyond counterexample.

## Local evidence

```text
Typecheck: PASS
Test suites: 28 / 28 PASS
Tests: 88 / 88 PASS
git diff --check: PASS
```

## Locked principles

- Capability remains distinct from access.
- Access and execution are deny-by-default.
- Assistants are untrusted by default.
- Every assistant has a precise role and bounded lane.
- Lanes may intersect; they may never bleed.
- Unknown is a recorded state.
- Recursive improvement may propose and test; recursive self-authorization is prohibited.
- The agent or assistant cannot be its own verification.
- No ledger, no trust.
- The machine cannot be the final judge of the machine.
- The final brake remains outside the system being evaluated.
- Weaknesses remain visible and become design inputs.
- Specialist language must translate into shared authority terms.
- The BoundaryTitan 51-50 Method is an inquiry method, not a certification procedure.

## External integration boundary

OPA, Cedar, in-toto/SLSA, and OpenTelemetry remain researched integration candidates only. They are not installed, connected, or treated as final authority.

OPA and Cedar may support access-policy evaluation; in-toto/SLSA may support provenance; OpenTelemetry may support runtime evidence. Each requires independent integration testing and remains subject to the same receipt, owner, uncertainty, handoff, and brake rules.

## Intentionally open

- Independent verification
- Runtime access enforcement
- Physical brake testing
- Legal and field validation
- Complete 250-lane reconstruction
- Cross-department terminology adoption
- Publication, merge, and deployment authorization
- Any claim of universal safety or completeness

## Reopening rule

Reopen only through an explicit human-owner decision that identifies:

```text
scope
reason
changed claim
evidence required
owner
specialist
external brake
retest condition
```

> **Locked does not mean finished. It means the boundary is visible enough to attack.**
