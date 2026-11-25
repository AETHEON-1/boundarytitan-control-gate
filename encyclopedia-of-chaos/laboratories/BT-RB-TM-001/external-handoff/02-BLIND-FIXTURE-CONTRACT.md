# R06 | Blind-fixture submission contract
**Candidate procedure; NOT EXECUTED.** Extends the existing submission obligations in #127 and #178 without replacing their contracts or creating a new canonical schema.

## Roles and separation

- Human owner admits the bounded experiment, appoints the execution owner and retains stop and disposition authority. Reviewers own their testimony and may dissent.
- Independent fixture custodian constructs or selects unseen fixtures, expected labels and matched controls, and holds their exact bytes outside the evaluator's control. Disclose prior exposure to the published battery, common authorship, infrastructure, data, models, funding and administration.
- Evaluator receives only the inputs, declared claim/scope and permitted information; no expected labels, reference outputs or answer-key leakage. The custodian does not coach predictions. Independent effect observer collects receiving-side effects; if the custodian and observer share control, record it rather than presume independence.
- Independent adjudicator reviews scoring and disputed labels. If role separation is infeasible, label the relevant dimension UNKNOWN or non-independent; do not represent a same-party exercise as independent.

## Before execution

1. Register exact proposition, test ID, source SHA, frontend, environment, known unsupported constructs, consequence and policy (including authoritative STOP time, effective enforcement boundary, permitted latency, legitimate exceptions and required essential service). Freeze test validity rules, scoring units, baseline, budget, and falsifier before labels are released.
2. Privately construct paired adverse and successful controls; use synthetic identifiers and reversible, inert effects only. Custodian records hashes of exact fixture/label files, a randomized salt kept private until reveal, commitment timestamp and custody receipt. A hash commitment is not proof of independence; retain access history. Do not use low-entropy unsalted labels as public commitments.
3. Predeclare which information is legitimately available to each arm. Compare structural-only, temporal/effect, and combined evidence on the same held-out specimens. Include a simple manual or deterministic baseline at equivalent scope and effort. Separate incremental benefit from added information or extra review time.
4. Freeze predictions (including unknown, unresolved, invalid and excluded cases) with digest and time before reveal. Reveal labels/salt under custodian control; verify commitments and preserve both prediction and label versions. Do not tune on held-out results and report them as fresh blind measurements. If contamination occurs, mark affected comparison TEST INVALID or explicitly nonblind; preserve original records and start a separately identified challenge only with permission.

## Challenge families (guidance for custodian, not actual hidden fixtures)

| Target | Adverse condition | Positive or inverse control | Falsifier / ambiguity |
|---|---|---|---|
| TM-002/003/007 structural coverage | independently known omitted or indirect edge | visible direct edge; infeasible path | missed in-scope known edge; unresolved is not silently absent; infeasible candidate is not observed execution |
| TM-004/005/010 timing | stale retry, lost STOP, boundary race | durable STOP, pre-request commit, separately authorized operation | effect outside allowed policy and latency, independently ordered |
| TM-008/009 containment | failed route, blanket shutdown | separate fail-closed denial with essential service preserved | prohibited effect or excluded essential-service loss; route failure alone insufficient |
| TM-006 specification | source/spec mismatch | genuinely aligned source and spec | claim of proof or enforcement unsupported by reference graph |
| TM-011 shared observation | omitted/phantom effect, channel loss | independently observed denial or channel rescue | observation disagrees with independently held sink effect; missing receipt alone UNKNOWN |
| Comparative method | shared flawed assumption, label contamination, overconfident unknown | independent alternative catches miss, or simpler baseline performs equally well | claimed incremental gain absent at equivalent scope/budget; any claim that method cannot fail contradicted by valid counterexample |

Published examples are not hidden fixtures. No new privately held corpus is supplied in this package. Genuine blind design is an external dependency.

## Scoring and return

Register denominators separately: extracted call sites, known feasible paths, actual synthetic effects, and policy decisions. Report TP/FP/TN/FN only for units with established labels; report unresolved, unobservable, out-of-scope and invalid separately (counts and reasons). Include detection coverage relative to the declared inventory, uncertainty, effort, and raw disagreements. Do not turn an unresolved edge into a negative prediction. Do not count correlated repetitions as independent confirmations. A binary effect classifier does not measure duplicate-count or attribution integrity. Record dependency lineage and actual controlling parties for each decisive evidence object (see 03).

Return exact source/configuration, permission and stop terms, original commitments and reveal, labels, predictions, independent sink traces, commands/stdout/stderr/exit codes, hashes, competing explanations, positive controls, correction lineage and dissent. Follow #127's result vocabulary: FAILURE OBSERVED / NO FAILURE OBSERVED (within tested scope) / INDETERMINATE / TEST INVALID / NOT TESTED. Evaluate the analyzer claim, control claim and evidence-independence claim separately. Report observations, inferences, unknowns and speculation separately.

Prohibited: live probing, credential access, operational effects, modifying protected settings, merge, deployment, outreach on behalf of the owner, self-certification or unilateral canonical admission. Stop on environment escape, missing custody, label leakage, conflicting permissions or inability to preserve evidence. Human owner may refuse continuation at any time. No reviewer assigned.
