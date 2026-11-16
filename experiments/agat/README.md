# AGAT isolated reference laboratory v0 (YELLOW)

Status: experimental synthetic fixture; not an independent brake, validation, certification, or deployment approval.

## Scope
Read-only with respect to external systems. Python standard library only. No external APIs, sockets, subprocesses, credentials, cloud resources, production data, or real-world consequence actions. The sole consequence is an append to an in-memory list.

## Execute
```sh
python -m unittest discover -s experiments/agat -p 'test_*.py' -v
```

## Architecture
- Requester is modeled by subject/action inputs and may retain stale permits.
- Gate holds issued permits, one-use replay state, and revocation epoch.
- Sink checks gate authorization before recording a synthetic commit.
- Observer records a SHA-256 hash chain. It detects in-memory record edits in the included test, but it is not independently hosted, durable, or tamper-proof.

## Initial test coverage
Valid once; replay refused; queued stale permit refused after revocation; delegate substitution refused; action substitution refused; forged permit refused; restarted requester with retained gate state refused; evidence alteration detected.

## Important limitations and falsification targets
1. Gate, requester, observer, and sink run in ONE Python process. Python attribute access and monkeypatching can bypass the model. No independent enforcement or isolation is demonstrated.
2. No atomic transaction across decision and commit. The current sink is single-threaded; a concurrent revoke/commit race is untested.
3. Gate state is volatile. Actual process restart or state restoration is not tested.
4. Evidence hash chain is unkeyed and in-memory. A hostile writer can rewrite the entire chain. Independent observer custody is untested.
5. No full inventory of consequence paths. Direct sink access, alternate endpoints, administrator overrides, delegated tools, retries, and recovery mechanisms remain open.
6. The repository's broader adversarial battery has NOT been executed by this fixture. Mapping all 24 cases is pending.
7. This initial branch does not modify frozen doctrine, production policy, or existing CI.

## Required next phase (not yet authorized for external deployment)
- Isolate gate and sink in separate local processes with restricted OS permissions; requester compromise must not grant access to policy, keys, or consequence store.
- Durable monotonic revocation and idempotent commit checks; verify fail-closed restart and queued-work extinction.
- Independent append-only observation, reconciliation against sink state, and adversarial evidence mutation tests.
- Deliberately defective control variants, blind evaluator detection, reproducible artifacts, and external specialist review.
- Treat a successful local test as bounded evidence only, not global assurance.

## Evidence protocol
For every run preserve commit SHA, interpreter version, command, complete test output, synthetic test inputs, expected/actual outcomes, defect IDs, scope exclusions, and reviewer identity. Record FAIL and INCONCLUSIVE without promotion to PASS. Do not report tests as executed unless the actual run output is retained.

CAN does not imply MAY. Maximize CAN. Keep MAY outside.
