# BT-WF-001 — Read-only workflow integrity battery v0.1
Date: 2026-10-17
State: DEVELOPMENT CANDIDATE / YELLOW / NOT INDEPENDENTLY VALIDATED
Source register: https://docs.google.com/spreadsheets/d/1vzb6nmmXGwbcJuH4C9ZDZrEu7-vkJjHF9kj0EjeUUcc/edit
Base commit: 93804f9f8936ac0e52517a6442cbd5e91b8057ba

## Purpose
Reproduce four *synthetic* counterexamples without network access, production credentials, resource effects, or changes to frozen doctrine. Test code is standard-library Python and creates no files.

Run: `python3 -m unittest -v tests.test_bt_wf_001` (module path may require Python package discovery; direct alternative: `python3 tests/test_bt_wf_001.py -v`).
Tests supplied as proposed branch content; results must not be asserted without an actual runner transcript.

## Contracts and limits
- T01 / O-04 O-18: Enumerate bounded directed paths from requester to effect. A path lacking gate is a counterexample *within the modeled graph*. Empty bypass list does not establish graph completeness or external dominance.
- T02 / O-03 O-07 O-14 O-22: Process ordered synthetic grant/revoke/effect events. A post-revocation effect must be denied. No claim about real clocks, delivery guarantees, or provider enforcement.
- T03 / O-05 O-19 O-20: Separate controller PASS from observer effect. False PASS with NO_EFFECT is contradicted. Missing or non-independent observer is indeterminate. A synthetic 'independent' flag is a fixture assumption, not demonstrated independence.
- T04 / O-08 O-09 O-12 O-15 O-16 O-21: Compare ledger digests against prior checkpoint. Mutation must be detected; missing checkpoint is indeterminate. A hash does not prove truthful input, external custody, or authorization.

## Evidence requirements
Record exact branch and commit SHA, Python version, command, stdout/stderr, environment, fixture hash, unexpected results, and independently held consequence record if moving beyond simulation. Preserve counterexamples even after repairs. Do not silently replace previous evidence.

## Disposition vocabulary
MODEL_PASS, COUNTEREXAMPLE, CONTRADICTED, INDETERMINATE, NOT_EXECUTED. Never convert MODEL_PASS to APPROVED, SAFE, CERTIFIED, or DEPLOYABLE.

## Acceptance boundary
Local unit tests assess functions and fixtures only. They cannot prove all reachable production paths encounter an external gate, actual revocation dominance, causal independence of an observer, or unforgeable custody. Human owner controls merge, independent review, field validation, publication, and deployment. No automatic execution rights follow from this battery.

## Prior-art directions
Cedar / OPA Conftest: policy test organization; Hypothesis: generated adversarial fixtures; in-toto Witness and SLSA: provenance; OpenLineage: derivation; Temporal: replay semantics; Chaos Mesh: injected failure / runtime observation. None imported or endorsed as a brake.
