# Deliberately vulnerable gate: negative control
State: YELLOW | SYNTHETIC COUNTEREXAMPLE

The gate intentionally trusts a cached authorization token after an external revocation flag changes. A successor submits the stale token, and the gate writes a synthetic effect. The resource-side effects file, not merely the gate's decision report, demonstrates the unauthorized write. The expected outcome is CONTRADICTED for the scoped claim that this gate extinguishes authority after revocation.

Run: `cd research/rsi/BT-RSI-001 && python3 -m unittest -v test_vulnerable_gate_negative_control.py && python3 vulnerable_gate_negative_control.py`

A passing unit test means the **detector observed the injected failure**. It does not mean the deliberately vulnerable gate passed. Comparison against the existing serialized-revocation fixture is not independent security assurance. Both are synthetic and share test-controller custody.

The next adversarial step is to reproduce an actual in-flight revocation race and bind actors to authenticated principals at the custodian boundary. No deployment, production credentials, or live consequence surface.

CAN ⊬ MAY.
