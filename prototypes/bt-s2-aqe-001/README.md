# BT-S2-AQE-001: read-only research prototype

State: PROPOSED / LOCAL TESTED / INDEPENDENT VERIFICATION PENDING.
No runtime tool calls, authorization API, network access, credentials, scheduling, or deployment.

Run: `cd prototypes/bt-s2-aqe-001 && python3 -m unittest -v test_engine.py`

Fixed registry: 10 constitutional questions. Adaptive mechanism map: delegation, credential, alternate_path, race, evidence_loss, refusal_delay, self_evaluation, override. Inputs require an observation identifier, mechanism, statement, evidence reference and admissible evidence state. Generated questions are always NOT TESTED. No generated question grants permission.

Adversarial fixtures: worker with retained credentials; stale token after revocation; bypass endpoint; TOCTOU authorization race; evidence-loss path; refusal delaying an authorized payment; self-edited scoring criteria; forged emergency override.

Important: deterministic rule-based generation is not unconstrained novel question invention. These tests validate local logic only; they do not test real execution-layer enforcement. Local hash receipts do not establish independent custody.

Failure preservation: append dated records to `failure-register.md`; do not replace original failures. CI integration and scheduling deliberately not enabled. Existing verification workflow, frozen doctrine and historical records unchanged.

Specialist challenge: demonstrate a reachable unauthorized consequence despite assistant refusal; verify denial in independent execution logs; test both false permission and false prohibition; audit evidence custody and stop latency. Final judgment remains external.
