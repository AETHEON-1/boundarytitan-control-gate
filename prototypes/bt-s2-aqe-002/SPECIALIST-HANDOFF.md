# BT-S2-AQE-002 | Independent specialist handoff

Date: 2026-10-25
Lane: Reality Benchmarks; Investigation Tactics consulted.
State: PREPARATION COMPLETE / INDEPENDENT REVIEW PENDING / NO CERTIFICATION.

## Research question
Can individually authorized operations compose into an effect that is not authorized by an independently specified consequence policy?

## Reproduction
Read simulator.py and test_simulator.py.
From this directory run:
```
python3 -m unittest -v test_simulator.py
python3 -c "from simulator import enumerate_cases; print(enumerate_cases())"
```
No network, credentials or third-party packages required.

## Frozen test surface for this handoff
16 possible Step tuples: principal in {0,1}, scope in {0,1}, effect in {0,1}, authorized in {False,True}.
All ordered sequences of lengths 1..3: 4,368.
Local gate: all authorized flags true.
Stipulated composite policy: sum(effect) in {0,1}.
Expected count of local-accepted/composite-rejected sequences: 272.
Minimal illustrative witness: two locally authorized effect=1 operations.

## Independent specialist assignments
1. Formal methods: verify finite enumeration, independently derive the 272 count, assess whether the authorization predicate is semantically meaningful; provide countermodel.
2. Authorization/policy engineering: replace Boolean authorized with provenance, actor, scope, resource, delegation, revocation, time and policy version. Find cases where local and composite authorization genuinely differ, or demonstrate that the distinction disappears under a sound authorization model.
3. Distributed systems: examine queues, retries, commit points, asynchronous settlement, revocation races and compensating actions; distinguish authorization-before-commit from post-commit recovery.
4. Security testing: blind-test novel traces without exposing expected failure labels; include legitimate delegated actions and negative controls; report false positives and false negatives.
5. Evidence auditor: rerun from a fresh independently authenticated checkout, record commit/tree SHA, interpreter version, command, stdout/stderr, hashes, and failures. Do not treat a model-authored report as independent evidence.

## Required response format
For each claim: test ID; source and version; initial conditions; permitted and prohibited transitions; executed procedure; raw observations; alternative explanations; falsifier; owner; evidence state (SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID, NOT TESTED); reproducibility instructions.
Report tests not performed explicitly. Preserve every failing case and correction lineage. Separate discovery from validation and authorization.

## Known objections to test
- The global budget {0,1} is stipulated rather than independently justified.
- Principal and scope are recorded but ignored by the predicate.
- The authorized flag is an assertion, not proof of permission.
- Additive effects do not model arbitrary real-world consequences.
- Enumeration is exhaustive only over this toy finite space.
- A vacuous empty sequence is locally authorized.
- No runtime enforcement, revocation, recovery or third-party consequence is measured.
- The failure class was designed into the model; semantic novelty is not established.
- No independently authenticated checkout or full repository CI execution is established by this package.

## Stopping and reopening
Preparation stops when runnable files, bounded evidence, challenge instructions and failure ledger are available on the preparation branch. Reopen on independently reproduced contradiction, a smaller countermodel, real policy semantics, new specialist evidence, or an uncovered authority path.

The investigator may produce evidence. It may not certify itself, accept risk, authorize field testing, merge, deploy, or publish.
CAN ⊬ MAY.
