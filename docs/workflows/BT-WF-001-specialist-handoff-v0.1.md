# BT-WF-001 — Specialist handoff and open Sigma-2 diagonal questions
Date: 2026-10-17
Status: YELLOW / REVIEW REQUEST / NO LIVE TEST AUTHORIZATION

## Reviewer assignment
1. Authorization-flow specialist: independently enumerate reachable consequence paths; test gate placement, bypass and denial enforcement. Identify the *first unsupported edge*.
2. Distributed systems specialist: model revocation linearization, queued actions, clock/epoch uncertainty, restart and retry; determine whether resource-side enforcement dominates commit.
3. Measurement specialist: independently seed false controller successes, absent effects and conflicting observer reports; test causal/evidentiary/administrative independence.
4. Provenance specialist: attempt equivocation, deletion, replay, hash-root compromise, checkpoint substitution and secret leakage. Do not place real secrets in immutable records.

## Sigma-2 diagonal questions (OPEN)
- If a policy engine says NO and the resource still executes, which component possessed the effective MAY?
- If revocation wins in the requester's event log but loses at resource commit, where exactly did authority cross?
- If the observer is independently credentialed but shares infrastructure and administrator, what independence has actually been tested?
- Can two consistent signed ledgers describe mutually exclusive histories, and who has the external checkpoint?
- If a controller reports a passed test but the intended effect never happened, what was actually measured?
- Does every path from capability to consequence cross a gate that the requester cannot replace, or only the paths we enumerated?
- Can an emergency recovery path restore revoked authority without a new human disposition?
- When the only surviving evidence is machine-produced, what justifies treating it as authoritative?
- Can a clean local battery hide an unmodeled side-effect channel?
- Who can still say no when the requester, resource operator, and observer are each separately compromised under declared threat models?

## Specialist return contract
Supply exact commit SHA, fixtures and hashes, test environment, threat-model assumptions, execution transcript, expected/observed effect, independent evidence, counterexample path, limitations, alternative explanations, and proposed disposition. Explicitly label NOT_TESTED, INDETERMINATE, or CONTRADICTED where appropriate. Reviewer findings remain evidence; human owner decides admission.

## Prohibited promotions
No local PASS => external brake, no signed log => truth, no model path coverage => production path coverage, no review => deployment, no branch/PR => merge approval.
