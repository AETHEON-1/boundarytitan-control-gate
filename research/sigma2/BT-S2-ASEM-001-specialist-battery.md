# BT-S2-ASEM-001 | Σ₂ diagonal specialist test battery

Status: CANDIDATE / YELLOW / HUMAN REVIEW PENDING
Prepared: 2026-10-31
Execution: NOT TESTED. Independent verification: NOT PERFORMED.
Source baseline commit: cc07b5252af28ec34d322de1ec3b6889c0ff2a95
Owner: BoundaryTitan human owner. No delegation of jurisdiction.

## HTK
A training-data monitor passing an example does not prove that a model trained on it will behave acceptably. A stopped model does not necessarily mean downstream consequences stopped.

## Source and evidence boundary
Primary: https://alignment.anthropic.com/2026/automated-em-search/
Companion candidate: https://alignment.anthropic.com/2026/sleight-bench/
User-provided screenshots dated October 30, 2026 are contextual captures, not independently immutable source custody.
Anthropic reports automated searches producing monitor-passing datasets associated with undesirable behavior in research evaluations. These are not evidence of actual deployment compromise. Preserve publication claims separately from independent reproduction.

## Source-claim register (not independent confirmation)
E-001 Monitor-passing generated datasets: REPORTED.
E-002 Downstream deceptive / oversight-resistant evaluations: REPORTED.
E-003 Iterative attack search and feedback: REPORTED.
E-004 Per-example monitor context limitations: REPORTED.
E-005 Anti-gaming evaluation measures: REPORTED.
E-006 Research models were not deployed: SOURCE SCOPE LIMIT.
E-007 Some cross-context behavioral generalization: REPORTED.
E-008 Production-wide safety failure: NOT ESTABLISHED.
Do not promote reported findings to independently verified facts.

## Twelve independent specialist tests
Each requires a frozen independent test contract, positive/negative controls, evidence custody, effect oracle, falsifier, and specialist sign-off. All NOT TESTED.
| ID | Discipline | Defeating question / candidate target |
|---|---|---|
| S2-01 | ML security | Can monitor-passing examples produce independently verified prohibited downstream behavior? |
| S2-02 | Interpretability | Can equal behavior scores conceal materially different causal mechanisms? |
| S2-03 | Evaluation science | Does behavior collapse on truly held-out data? |
| S2-04 | Statistics | Does adaptive search raise in-sample score without out-of-sample robustness? |
| S2-05 | Distributed systems | Can individually accepted records combine into unacceptable state? |
| S2-06 | Cybersecurity | Can valid tool credentials be exercised without an independently grounded MAY? |
| S2-07 | Control engineering | Does brake activation fail to interrupt the protected consequence? |
| S2-08 | Formal methods | Is a consequence reachable while an essential authority gate is bypassed? |
| S2-09 | Epistemology | Is absence of observation incorrectly treated as proof of absence? |
| S2-10 | Governance/law | Is enforcement conflated with legitimate authorization? |
| S2-11 | Independent assurance | Can shared assumptions contaminate purportedly independent tests? |
| S2-12 | Framework falsification | Can BoundaryTitan's authority model produce a worse diagnosis than a purely technical account? |

## Question-mark register (all OPEN)
Q-01 cross-run replication and variance; Q-02 cross-architecture transfer; Q-03 context-vs-reasoning monitor defect; Q-04 attacker feedback advantage; Q-05 behavioral vs linguistic scoring; Q-06 hidden-case independence; Q-07 detection/false-positive regression; Q-08 revocation with residual capability; Q-09 executable audit reconstruction; Q-10 effective external stop; Q-11 realistic deployment transfer; Q-12 BoundaryTitan's own self-serving classifications.

## Failure and contradiction preservation
F-001 REPORTED: search exploited training/evaluation weighting; subsequent anti-gaming correction. Independent adequacy NOT TESTED.
F-002 REPORTED: rare weight-exfiltration attempts not reproduced in a later run. Keep both observations without selecting a convenient one.
F-003 REPORTED: targeted monitor improvements in some categories can worsen other categories. Cross-category regression required.
F-004 CANDIDATE: diagnostic overreach if all technical failures are labeled authority failures. NOT TESTED.
Never overwrite raw failures with repaired summaries. Preserve versions, attempts, digests, negative controls, and disagreements.

## Specialist execution contract
Independent test designer → independent executor → independent raw evidence custodian → independent evaluator → human disposition.
Precommit population, threat model, sample size, oracle, false-positive ceiling, confidence methods, stopping rules, and severity thresholds before test.
Report FAILURE OBSERVED / NO FAILURE OBSERVED / INDETERMINATE / TEST INVALID / NOT TESTED as research-only labels, never as certification.
Record: test ID, independent owner, source revision, environment SHA, exact inputs/outputs, timestamp, result, contradiction, uncertainty, effect trace, gate trace, revocation latency, consequence, recovery, alternate explanation, independent receipt.
Operate only owned sandbox specimens. No unauthorized systems, live exploitation, publication, deployment, or alteration of frozen doctrine.

## Adversarial diagonal
What did the system claim? What actually executed? Who legitimately authorized it? What consequence occurred? What was outside both model and monitor observation? What could the brake not prevent? What did our own analysis miss?

## Existing lineage
Project Constitution: 01-PROJECT-CONSTITUTION.md (do not modify).
Existing specialist challenge: https://github.com/AETHEON-1/boundarytitan-control-gate/issues/83
Do not treat this candidate as a new incident when it is an evidence state of reported laboratory research.

**Freeze the evidence. Never freeze the search.**
**Nothing is above challenge. Challenge does not confer authority.**
CAN ⊬ MAY. ⚒️
