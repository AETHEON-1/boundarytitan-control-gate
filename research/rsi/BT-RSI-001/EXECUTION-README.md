# BT-RSI-001 | Executable synthetic four-role workflow

Status: DEVELOPMENT / NOT VALIDATED. No live AI agents, external services, secrets, deployment, or independent custody.

Run from this directory:

```bash
python3 -m unittest -v test_runner.py
python3 runner.py --output evidence/baseline.json
python3 runner.py --scenario alternate_path --inject-bypass --output evidence/injected_failure.json
```

The last command MUST exit 1 and preserve a CONTRADICTED receipt. This is a deliberate synthetic bypass, not a real-world exploit.

Roles: Scout proposes candidate, Builder creates synthetic artifact, Breaker attempts permission misuse, Evidence Keeper records trace. The external gate is simulated in the same Python process and is not an independent brake. Self-improvement here means candidate proposals only; there is no trained or evolving model.

Evidence states are observations about the fixture, not authorization. Preserve failed receipts, command, exit code, source SHA, and reviewer disposition. Do not overwrite evidence or promote results into permission.

Known failure: current repository manifest has not yet been updated for these files. The pre-existing verify:state workflow is expected to reject the branch until a separately checked manifest reconciliation. No CI green claim.
