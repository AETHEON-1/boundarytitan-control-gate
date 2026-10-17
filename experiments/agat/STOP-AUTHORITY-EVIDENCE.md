# AGAT STOP authority test record

Status: YELLOW. Experimental synthetic laboratory only. No deployment, certification, or independent specialist validation.

## Stop semantics

`halt` is a simulated control command handled by the gate process. It writes `halted=1` and increments the revocation epoch in SQLite, committing before acknowledging the command. New permits are refused while halted. Synthetic commits check the halted flag in the same SQL statement that consumes a permit. There is no reset command in this interface. The existing `stop` command is a worker shutdown command, not a revocation authority command; do not confuse them.

## Reproduction

`python -m unittest discover -s experiments/agat -p 'test_*.py' -v`

New tests: `test_halt_denies_queued_commit_and_new_issue` and `test_halt_survives_process_restart_and_revoke`. Inspect GitHub Actions AGAT workflow output for execution evidence. This file documents intended behavior, not a claim that CI passed.

## Known open bypasses and authority defects

- The same process IPC channel accepts `halt` and requester commands; it does not authenticate an external stop owner. A requester with IPC access may impersonate the stop owner. This is NOT an independent brake.
- Same-user access to the SQLite database may allow a compromised requester to clear `halted`, edit permits, or change evidence. No OS-level file ownership isolation is established.
- A direct alternate consequence sink would bypass this gate; no exhaustive sink inventory exists.
- Concurrent halt/commit ordering needs a separately controlled race test. A commit completed before durable stop acknowledgment is not necessarily a post-stop violation. No post-acknowledgment commits should succeed under the current gate path.
- No tamper-resistant, external evidence custodian or process-independent stop channel exists.
- A passing test establishes only behavior in the bounded fixture. Independent specialist review remains open in issue #94.

## Separate repository-state failure

The general bounded-verification workflow failed due manifest drift. Do not claim overall repository CI green from AGAT success. Rebuild and review the manifest under repository procedures separately, without suppressing failure history.

CAN ⊬ MAY. Maximize CAN. Keep MAY outside.

## Preserved regression: failed first STOP CI build

GitHub Actions run [39067145088](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067145088) failed after STOP state gained a third SQLite column (`halted`) while initialization still used `INSERT OR IGNORE INTO state VALUES (1,0)`. Worker startup raised `sqlite3.OperationalError: table state has 3 columns but 2 values were supplied`. This is an initialization failure, not proof of a bypass. The separate bounded verification run [39067145094](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067145094) also failed and remains separate. Repair commit `e24cab4e9cee9480b7131613b2fc2e6c935e1983` names columns explicitly: `INSERT OR IGNORE INTO state (id, epoch, halted) VALUES (1, 0, 0)`. Re-run outcomes must be recorded separately; do not retroactively convert the failed run to PASS.
