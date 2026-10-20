# BT-RSI-004 | Sigma-2 computational / human authority bridge
State: YELLOW | DEVELOPMENT | synthetic omissions battery.

The two lanes intersect through *inspectable records*, not shared authority. Computation supplies proposals, observations, and evidence receipts. Human authority mapping records the rule source, jurisdiction, decision owner, consequence owner, external stop and appeal paths. A populated record is not legitimacy, a valid judgment, or permission.

Sigma-2 interrogation sequence:
1. Identify the actual output and source provenance.
2. Separate observation, inference, evidentiary standard, and established fact.
3. Map each arrow from fact to rule, jurisdiction, decision, and consequence.
4. Ask the inverse and converse: can a correct conclusion lack authority? Can an authorized decision rest on false evidence?
5. Demand a defeating observation for each control claim.
6. Detect omissions, owner substitution, delegation, stale grants, completion/revocation resurrection, and external stop failures.
7. Preserve uncertainty and source-specific status; do not infer motive from incentives.
8. Keep a human-owned disposition outside the machine-generated map.

Initial negative controls explicitly demonstrate *existing design weaknesses*: restart can forget an in-memory completion tombstone; a synthetic custodian trusts an actor string rather than authenticated peer identity. These are **modeled counterexamples from code structure**, not live exploit demonstrations against a deployed service. The test must flag these weaknesses, not claim that they are fixed.

Test: `cd research/rsi/BT-RSI-001 && python3 -m unittest -v test_adversarial_omissions.py`.

No cross-lane authority inheritance. No field validation, independent security assurance, live consequence, or deployment. CAN ⊬ MAY.
