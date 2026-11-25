# BT-CDTB v0.1 | Candidate specification for independent challenge

## Root question
When individually understood capabilities and guarantees are composed, can an investigator correctly distinguish working behavior, failure, uncertainty, and the practical effect on affected humans, and can independent investigators reproduce or defeat the result?

### Hypotheses (not strict complements)
H1: a compatibility-aware cross-disciplinary method identifies material defects and working controls that ordinary approaches miss at comparable cost.
H0 candidate: conventional specialist methods are equally or more useful at comparable cost; the added architecture is redundant or harmful. Mixed results remain admissible. The current synthetic exercises do not compare these hypotheses.

## Source anchors
Read-only, version-pinned source references (tree f15f4d15597f76878a8059d81d8c358bd1d22358):
- https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f15f4d15597f76878a8059d81d8c358bd1d22358/CROSS-DISCIPLINARY-CHALLENGE-PROTOCOL.md
- https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f15f4d15597f76878a8059d81d8c358bd1d22358/challenges/SPECIALIST-HANDOFF-PROTOCOL.md
- https://github.com/AETHEON-1/boundarytitan-control-gate/tree/f15f4d15597f76878a8059d81d8c358bd1d22358/encyclopedia-of-chaos/laboratories/BT-CTC-001
- https://github.com/AETHEON-1/boundarytitan-control-gate/tree/f15f4d15597f76878a8059d81d8c358bd1d22358/encyclopedia-of-chaos/implementation
These references establish continuity, not independent validation. Prior arts and historical article crosswalks in conversation require source-level review before further claims. No physical or human experiment occurred.

## Test claims and matched controls
All claims are conditional and scoped to declared toy models. Positive controls should be recognized; negative controls should defeat the specific claim; missing evidence should produce INDETERMINATE. Malformed inputs may produce TEST INVALID. Result classification applies to the stated claim, not to an actor or entire system. Domain specialists may reject the model, assumptions or oracle before interpreting a result.

| ID | Frozen local claim | Positive control | Negative control | Missing evidence / invalidity | Defeating observation | Narrow specialist route |
|---|---|---|---|---|---|---|
| CD-01 | Both required outputs are delivered within the toy budget | 10 units; costs 4 and 6 | 9 units; same costs | Journal incomplete | Required output absent or resource cap exceeded | Operations research / software testing |
| CD-02 | At least one declared route survives the injected dependency fault | Disjoint routes; one power fault | Shared bus fails, both routes lost | Dependency inventory incomplete | All relevant routes fail despite redundancy claim | Reliability / electrical / systems engineering |
| CD-03 | All local grants AND the parent aggregate cap are respected | 4+4 <= 10 | 6+6 > 10, despite both local caps of 6 | Incomplete destination journal | Composed effect exceeds parent scope | Distributed authorization / formal methods |
| CD-04 | The effect strictly precedes withdrawal under the stipulated policy | Nonoverlapping pre-withdrawal interval | Definitely at or after withdrawal | Overlapping uncertainty intervals; reversed interval invalid | Effect necessarily outside authorized order | Distributed systems / clock metrology |
| CD-05 | Observations uniquely identify a member of the declared finite hypothesis set | Product and factor known | Product alone, multiple candidates | Hypothesis class not complete | Two admissible distinct hypotheses yield identical observation | Statistics / experimental physics / causal inference |
| CD-06 | Current state AND stipulated quantified loss are restored | Restored state, loss compensated | Restored state, loss uncompensated | Loss record incomplete | Residual loss remains after restoration | Recovery engineering / economics / remedy expertise |
| CD-07 | Two entities can simultaneously satisfy their minimum requirements | 12 units, minima 6+6 | 10 units, minima 6+6 | Requirements incomplete | No feasible joint allocation under the model | Ecology / viability theory / operations research |
| CD-08 | Every declared necessary source assumption holds in the target | All marked true | Finite latency condition false | Latency unknown | Necessary premise fails or is unestablished | Causal transportability / formal verification / domain specialists |
| CD-09 | The evaluator correctly labels all three stipulated specimens | Both paths observed, correct and defective cases | Alternate path invisible | Oracle incomplete | False negative or false positive | Measurement science / mutation testing / assurance cases |
| CD-10 | The declared exit-and-continuation conditions hold in a synthetic exercise | Export, readable copy, fallback and credentials | Export exists but unreadable | No exercise observation | User cannot exercise specified capability in test | HCI / accessibility / human factors |

CD-08 supports only a necessary-assumption check, never actual mechanism equivalence. CD-10 Boolean inputs are synthetic conditions, not observed human behavior. CD-09 uses an idealized oracle authored by the same machine. CD-04 does not implement revocation or physical clocks; it tests interval-order ambiguity. CD-06 measures only a stipulated numeric loss, not all forms of restitution. CD-07 assumes discrete fixed demands and capacity; fairness is not modeled. CD-01 does not model all task failure modes. CD-02 represents only declared dependencies. CD-03 evaluates aggregate scope, not actual identity, access control or legal permission. CD-05 assumes a declared hypothesis set and exact measurement. Each limitation is a reopening trigger if it becomes relevant.

## Unexecuted specialist extensions
| ID | Question to defeat or support | Required specimen / evidence |
|---|---|---|
| CD-11 | Do local component guarantees compose under actual asynchronous recovery? | Extend BT-CTC-001 with independently authored concurrency/replay faults and destination effect ledger; distinguish pre-boundary commits observed later, reauthorization, clock uncertainty. No production tests. |
| CD-12 | Can protection preserve both authorized progress and denial of unauthorized effects? | Matched positive and negative controls, harm windows, legitimate liveness, false denials, owner lockout; independent model and evaluator. |
| CD-13 | Can apparent empathy improve protection without inappropriate reliance? | Human factors study with independent ethical review, consent, no exploitation, prespecified trust calibration and ability to refuse; NOT AUTHORIZED for human subjects. |
| CD-14 | Can locally controlled essential service survive loss of remote authority? | Simulated habitat, communication delay/partition, finite resources, competing emergencies, local legitimate authority mapping; no physical life-support experiments. |
| CD-15 | Does a cross-domain transfer yield an independently reproducible mechanism? | Source and target records, scale/assumption compatibility, alternate causal explanations, matched target controls, specialist review on both sides. |
| CD-16 | Does the integrated battery improve decisions over existing specialist methods? | Blinded frozen case set; separate reviewers and custody; equivalent resources; preregistered decision criteria; conventional methods may outperform BoundaryTitan. |
| CD-17 | Can a human recover and continue without the original machine or provider? | Human-owned export, readable open formats, separate credentials and documented restore exercise; no account disconnection or destructive test authorized. |
| CD-18 | Can the evaluator detect unknown classes of defects or false alarms? | Independently created holdout mutations, known correct cases, unmodeled routes, evidence tampering simulations, null/invalid cases; oracle independent of acting model. |

CD-11 through CD-18: NOT TESTED. No external execution or specialist invitation implied.

## Reproducibility and defeat protocol
1. Freeze exact claim, source versions, assumptions, threat/operating envelope, fixture IDs and expected result criteria before execution. Reviewer may submit corrections as new versions. Do not edit this specimen silently.
2. Verify package checksums; preserve the original and independent copies. Record OS, interpreter, commands, stdout/stderr, exit status, seed (none in this deterministic model), config, times, resource use and tool version. A matching digest confirms bytes, not truth or authenticity.
3. Run as supplied, compare all outputs and retain divergence. Repeat on a second independent environment where practical. Same machine rerun is repeatability only.
4. Independently derive an oracle or use a separately implemented model; inspect every proof obligation and challenge hidden assumptions. Author additional blinded fixtures withheld from the tested evaluator. Include genuine successful control, genuine defect, null/ambiguous evidence, invalid test, and where applicable a false alarm trap. Keep holdout labels outside tested system custody.
5. For real-world transfer, identify original mechanism, target mechanism, relevant scale, resources, observation channels, intervention conditions, time bounds, authority regime, shared dependencies, affected people and recovery. Record failed transfer and alternative explanation. Do not infer causality or jurisdiction from analogy.
6. Report SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID or NOT TESTED at claim level. The existing challenge protocol has its own evidence states; TEST INVALID here refers to test validity, not a new canonical challenge state. No PASS, SAFE, certification or self-admission. Preserve independent disagreements; human disposition is separate.
7. Evaluate with prespecified metrics: capability completion; violation count per observed opportunity; true/false positive and negative counts with denominator; unresolved/invalid cases; detection latency and observation coverage; joint feasibility; per-person consequences; recovery and exit; resource/attention cost; reproduction differences. No aggregate universal score or post-hoc threshold. For comparative work, specialist-defined ground truth and thresholds must be frozen before holdout evaluation. The toy suite does not establish empirical precision or recall beyond its fixtures.
8. Record evidence custody, provenance, uncertainty, rejected claims, failed runs, unexplored branches, counterevidence, reviewer conflicts and reopening triggers. Missing logs do not prove inactivity. A declined invitation or no response is not evidence of validation or rejection.

## Authority and human-protection receipt
Purpose: local preparation and harmless synthetic modeling only. Route: Reality Benchmarks (primary), existing Encyclopedia of Chaos and specialist challenge crosswalk. Human owner: BoundaryTitan human owner; independent review owners and evidence custodians unassigned. Local operator may interrupt execution; no separate technical external stop mechanism demonstrated. No external credential, deployment, publication, contact, repository write, irreversible action, or human-subject experiment. Data: synthetic fixtures and public source pointers. Stop condition: complete local suite or error, then preserve results; do not rerun indefinitely to hide failure. Reopen upon discrepancy, new countermodel, material evidence or human-authorized scope change. Consequential transitions reserved to appropriate named owners and affected rights holders; expertise is not jurisdiction. External review and custody NOT ESTABLISHED. Disposition YELLOW / CANDIDATE.
