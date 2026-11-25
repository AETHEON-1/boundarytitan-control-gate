# Machine execution receipt context

- Date: 2026-11-24 America/Chicago (container UTC date may differ).
- Environment: isolated Linux working container; Python 3.13.5; standard library only.
- Command: `python run_battery.py --output machine-receipt.json`.
- Repeat: `python run_battery.py --output /tmp/cdtb-reproduced.json`; `cmp machine-receipt.json /tmp/cdtb-reproduced.json` returned exit 0.
- 31/31 machine-authored expected classifications matched: 10 SUPPORTED, 10 CONTRADICTED, 10 INDETERMINATE, 1 TEST INVALID. No unexpected fixture mismatch in these runs. Contradicted fixtures are deliberately constructed countermodels; not observed real-world incidents. No empirical human outcome measured.
- Deterministic fixtures, no randomness. CPU/memory consumption not instrumented. Not a general-purpose input validator; malformed/out-of-domain arbitrary inputs and large resource bounds have not been comprehensively tested. No security claim about execution in arbitrary environments. Only the bundled fixtures were run. All source, fixtures, oracle, and analysis authored by the machine. Independent review, independent custody, holdout tests, cross-platform reproduction and comparison to alternative methods remain NOT TESTED.
- Implementation decision: a small standard-library Python specimen rather than a new service or repository branch. No repository mutation or deployment. No frozen doctrine changed. The repository read was selective, full duplicate reconciliation pending.
