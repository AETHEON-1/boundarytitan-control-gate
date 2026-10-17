# RB-006 + RB-049: Broken Brake Challenge
Status: DEVELOPMENT SPECIFICATION / YELLOW
Scope: disposable deterministic simulation only; no external resources.

## Claim under test
The evaluator distinguishes an actual protected effect from an application-reported success and detects deliberately seeded defects in the observation or mediation path.

## Independent effect oracle (within this model)
A separate immutable-in-test event list maintained by the harness, never sourced from the application's receipts. This is *logical* independence only, not independent administrative custody.

## Cases
A (positive control): authorized command crosses gate; one effect and one receipt; evaluator returns BOUNDED_MATCH.
B (seeded false-success): application reports success, no actual effect; evaluator returns CONTRADICTION.
C (seeded unmediated path): unauthorized effect occurs without gate; evaluator returns BYPASS_OBSERVED.
D (blind oracle): effect visibility disabled; evaluator returns INDETERMINATE, never PASS.
E (lost update): two receipts claim two effects but only one effect remains in oracle; evaluator returns CONTRADICTION.

## Fail criteria
A false-success or bypass classified as pass; a blind oracle classified as pass; a missing effect silently inferred from a receipt.

## Limits
This does not establish complete path enumeration, cryptographic custody, independent physical observation, distributed consistency, legitimacy of issuer, or a deployed stop. A successful self-authored fixture cannot certify its own validity.

## Required evidence
Commit SHA, interpreter version, test command/output, expected and observed classifications, deliberately seeded defect, rival explanations, and human disposition PENDING.

No production execution, physical tests, or deployment. CAN ⊬ MAY.
