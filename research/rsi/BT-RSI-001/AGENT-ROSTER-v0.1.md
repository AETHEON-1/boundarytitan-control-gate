# BT-RSI-001 bounded agent roster

State: CONFIGURED AS REPOSITORY INSTRUCTIONS ONLY / NOT RUNNING.

Scout -> Builder -> Breaker -> Evidence Keeper -> external human review. This is a workflow proposal, not a chain of delegated authority. Each agent can challenge predecessors, but no agent may promote a result to permission.

Inputs: pinned source tree, existing BT-HC-004 and AM-01..AM-24 contracts, synthetic fixtures.
Outputs: proposed patches, reproducible tests, raw receipts, contradiction ledger.
Self-improvement envelope: prompts, strategies, test generators, offline candidate model code, and internal evaluation can be revised in isolated research branches. Self-authorization, self-deployment, branch merges, policy changes, token minting, and approval of own evidence are excluded.

Failure retention: append a new observation; do not overwrite original failed runs. Preserve exact commands, timestamps, exit codes, hashes and relevant logs. Never reclassify failure as success by editing expected outcomes.

Stop: human repo owner can halt research; separately administered execution and evidence controls are prerequisites for any consequential test. Repo instructions alone are not an enforceable brake.

Known failure: adding this roster and AGENTS.md changes tracked files. The current repository manifest must be reconciled on the research branch before verify:state can succeed. No green status is claimed.

Next work: implement a deterministic offline simulator and CI check that cannot push, merge, deploy, or mutate authority settings. Human must approve any hosted autonomous service, secrets, scheduled operation, or additional privileges.
