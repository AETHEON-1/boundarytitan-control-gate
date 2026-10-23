# Encyclopedia of Chaos | AT-CHAOS-002: Branch-Exact Composition Battery

Date: 2026-10-23
State: YELLOW / REPRODUCED LOCALLY AGAINST HASH-MATCHED REVIEW-BRANCH ENGINE
Repository: AETHEON-1/boundarytitan-control-gate
Branch: review/arrow-time-v0.1
Engine Git blob SHA: c6e5fb90b56bbaa8de77a871975a698b0b73f680
Engine SHA-256: be9c9fd871407db097b815f68f37898efe24146d0762e37f285c7968593ddcca
Python: 3.13.5
Command: python -m unittest discover -s tests -v
Environment: local Python execution; GitHub-hosted CI not run.

## Results
23 tests: 15 PASS, 6 assertion FAIL, 2 unexpected ERROR.
The original eight review-branch tests pass. Additional tests: 7 PASS, 6 FAIL, 2 ERROR.

## Formal synthetic composition counterexample
Fixture contains one declared permission with per_action_max=100, aggregate_max=100, and two recorded debit actions of amount 70, each in the declared temporal window. Independent arithmetic oracle:
forall a in actions: amount(a) <= 100 (TRUE)
sum(amount(a) for a in actions) <= 100 (FALSE; sum=140).
The engine returns AUTH_WINDOW SUPPORTED for each action and no aggregate-scope finding. This establishes a missing detector relative to the proposed extension, not a security exploit or proof of unauthorized real-world activity. The existing schema does not define aggregate_max or action scope.

## Six unmet expectations
1. AGGREGATE_SCOPE_VIOLATION: absent.
2. ACTION_SCOPE_VIOLATION: absent.
3. INVALID_AUTH_WINDOW: absent for inverted interval (engine reports execution outside window).
4. TEMPORAL_ORDER_AMBIGUOUS: absent for equal timestamps.
5. STOP_UNVERIFIED: absent for a declared but unverified stop.
6. ISSUER_UNVERIFIED: absent for absent issuer provenance.

## Two unexpected errors
- nodes=[None] triggers AttributeError, not bounded NODE_SCHEMA finding.
- top-level list triggers AttributeError, not bounded FIXTURE_SCHEMA finding.

## Controls and limitations
Baseline deterministic tests passed. Causal-clock contradiction detection passed. Input mutation test passed. No independent provenance or external consequence oracle, no real-world enforcement, no measured revocation or stop latency. GitHub CI and third-party independent reproduction NOT PERFORMED. Local copy of engine has matching Git blob hash. No source code was changed to pass tests.

## Specialist handoff
Schema owner: decide whether aggregate action constraints are in scope.
Distributed-systems specialist: distinguish equal clock readings from causal order.
Security specialist: determine actual revocation receipt and issuer custody.
Safety specialist: require external stop evidence and consequence horizon.
HTK: preserve UNKNOWN rather than promote temporal window success into authorization.

No merge, no deployment, no approval, no architecture certification. Human review required.
CAN ⊬ MAY.
