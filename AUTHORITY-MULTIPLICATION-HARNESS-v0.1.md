# Authority Multiplication Harness v0.1

Status: IMPLEMENTATION CANDIDATE — BOUNDED, READ-ONLY, NOT EXECUTED HERE

## Purpose

Turn the existing authorization-machinery attack surfaces into a bounded combinatorial evidence generator.

The harness tests a narrower question:

> Can individually available capabilities, permissions, transitions, retries, restarts, delegations, or evidence actions compose into a consequence whose authority is not independently established?

Primary propositions under attack:

```text
CAN ⊬ MAY
MAY(A) + CAN(B) ⊬ MAY(B)
MAY(A) + MAY(B) ⊬ MAY(A∘B)
WAS MAY ⊬ IS MAY
```

This implementation does not define a universal positive theory of legitimate authority. It preserves the authority-source field so independently grounded rules can be represented and challenged.

## Boundary

The harness:

- generates bounded combinations of declared primitives;
- records authority-source lineage;
- identifies candidate unsupported arrows;
- records coverage within the declared combinatorial bound;
- emits evidence states rather than approval;
- performs no live action and uses no credentials.

It may not:

- authorize execution;
- infer legitimacy from capability;
- certify safety;
- declare global exhaustion;
- convert a local permission into composed permission;
- close human or independent review.

## Why this is separate from the Chaos Engine

The existing Chaos Engine is a declaration-validation simulation. It checks scenario completeness and records the expected disposition. It is not an emergent adversarial search engine.

This harness therefore remains a separate object. Passing its tests does not upgrade the meaning of the Chaos Engine and does not establish runtime enforcement.

## First implementation slice

v0.1 deliberately implements only a small deterministic combination generator and two candidate-arrow detectors:

1. capability with no declared authority source;
2. multiple permission primitives crossing consequence classes.

These are preparation mechanics, not proof that the identified trace is unauthorized in the world.

Future admissible extensions include ordered permutations, t-way coverage, concurrency/interleaving, revocation and restart semantics, authority consumption, identity fork/clone tests, evidence-plane composition, legitimate amplification fixtures, and automatic counterexample minimization.

## Required outside path

```text
Harness output
→ evidence custody
→ independent reproduction
→ human disposition
→ external release or stop
```

Machine authority: NONE.
Deployment authority: NONE.
Field connection: NOT AUTHORIZED.

Only Green proceeds. No owner, no brake. No ledger, no trust.
