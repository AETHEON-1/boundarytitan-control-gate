# Authority Multiplication Harness — v0.4 Synchronization Candidate

Status: IMPLEMENTATION SYNCHRONIZATION AGAINST v0.4 — BOUNDED — READ-ONLY — NOT EXECUTED AGAINST A RECIPIENT SPECIMEN

## Kernel

```text
STATE
→ TRANSITION
→ AUTHORITY Δ
→ CAPABILITY Δ
→ CONSEQUENCE
→ EVIDENCE
→ EXTERNAL NO
```

This branch replaces the original unordered combination-enumeration assumption with an ordered state-transition slice.

It does not claim the full v0.4 specification is implemented.

## Implemented in this synchronization slice

- explicit initial AuthorityState;
- explicit AuthorityGrant records;
- ordered sequence generation up to a declared depth;
- transition records containing authority and capability deltas;
- revocation that may remove MAY while preserving CAN;
- single-use consumption accounting;
- candidate composition detection without treating the candidate as an authorization verdict;
- explicit coverage fields declaring major untested surfaces;
- fixed Reality Benchmark evidence states only.

## Explicitly NOT implemented yet

- concurrency/interleaving;
- complete restart/restore semantics;
- queue/finality semantics;
- delegation attenuation/subdelegation;
- identity fork/clone lineage;
- authority collision/precedence;
- legitimate amplification rules;
- negative authority/prohibitions;
- consequence-equivalence derivation;
- scale/rate/cumulative consequence;
- material version-transition semantics;
- evidence-plane suppression/fabrication;
- brake-causality proof;
- automatic counterexample minimization;
- BCS fixture execution;
- recipient-specimen execution;
- independent reproduction.

Those omissions are surfaced in coverage rather than converted into an exhaustion claim.

## Non-monotonicity requirements

The implementation must preserve:

```text
CAN ⊬ MAY
MAY ⊬ CAN
MAY(A)+MAY(B) ⊬ MAY(A∘B)
MAY(A∘B) ⊬ MAY(A) ∧ MAY(B)
REVOKED may remove MAY while CAN persists
DID NOT EXECUTE ≠ BLOCKED BY EXTERNAL NO
RECORDED MAY ≠ MAY
NO COUNTEREXAMPLE FOUND ≠ EXHAUSTION
```

## Falsification boundary

A clean case in which legitimate consequential MAY arises solely from CAN, with no imported authority source, is not to be repaired by terminology after observation. If independently reproduced, preserve the minimal witness for external adjudication as CONTRADICTED against the claimed scope.

## Separation

This harness remains separate from the existing Chaos Engine. The Chaos Engine's declaration-validation semantics are unchanged.

Required outside path:

```text
machine search
→ evidence custody
→ independent reproduction
→ human/external adjudication
→ release or stop
```

Machine authority: NONE.
Field connection: NOT AUTHORIZED.
Deployment authority: NONE.

No owner, no brake. No ledger, no trust.
