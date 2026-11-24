# BT-RB-CTC-001 | The Unusable Override Laboratory v0.1
2026-11-24 | YELLOW | Local candidate implementation only.
Human agreement to useful actions interpreted as approval to prepare and test a local synthetic artifact. No repository placement, external execution, publication, deployment, certification or canonical admission inferred.

## Reproduce
Python 3.10+, standard library only. No network, credentials, packages, external side effects or production access.

```
python recovery_lab.py --output reproduced.json
python recovery_lab.py --scenario shared_emergency
python recovery_lab.py --scenario cancel_without_fence_retry
```

`test-receipt.json` preserves all event traces, configurations, expected and actual outcomes. Exit 0 means machine-authored fixture expectations matched, not control certification. `transfer-record.json` documents the source-to-target compatibility candidate. `transfer.schema.json` specifies its data contract. `EC-MAR-001.md` preserves the original-domain evidence and contradiction. `review-handoff.md` describes the independent attack surface. `SHA256SUMS` covers the package contents other than itself.

## Model
A worker obtains a synthetic token at tick 0; a dependency may fail at tick 1; a simulated owner requests STOP; a queued worker attempts commit. Ordinary override and independent emergency route have distinct delivery conditions. Enforcement uses an epoch fence at commit, with optional mutants for bypass, restart, stale retry and cancellation. A separate effect journal records actual committed simulated effects. The oracle uses a stipulated policy: normal effects at or after a valid stop request are forbidden; recovery-extra effects forbidden; essential service required at a designated tick. A stop acknowledgement is not a prevention receipt. A valid stop is distinct from effective delivery. Same-tick events are ordered by insertion sequence (commit scheduled before dynamically scheduled stop); this is a model choice, not a timing claim about reality.

## Results and counterexamples
19/19 machine-authored fixture outcomes reproduced, 12 modeled violations, 7 with no modeled violation observed. Counterexamples to overbroad necessity claims: fail-closed enforcement prevents the normal action even when the emergency route fails; cancellation without a commit fence prevents the single modeled action, but a later retry defeats it. Therefore route independence or commit-time fencing cannot be declared individually necessary for every possible architecture from this experiment. Blanket shutdown prevents the prohibited commit but misses required essential service. Scoped recovery authority is distinct from ordinary execution authority.

## Boundaries
Single-worker discrete-event toy, not a vessel simulator or production AI runtime. Synthetic timing, idealized journal, no authentication implementation, no real operator usability assessment, no concurrency except event ordering, no actual rollback, no physically verified consequence. The invalid-owner case models rejection, not real authentication. No coverage of every possible execution path or real restart implementation. Source record is a retrieval pointer, not archived independent custody. All tests, assertions, traces and classifications are authored/executed by the same machine. No independent reviewer or human disposition of residual risk. No changes to frozen doctrine or existing repository. The Encyclopedia retrieval engine is not modified by this package. Independent design, execution, custody, evaluation and human decision required.
