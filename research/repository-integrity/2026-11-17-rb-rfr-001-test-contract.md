# RB-RFR-001 | Specialist handoff and adversarial test contract
YELLOW | All tests UNTESTED | Preparation only.
Related: [EC-RFR-001](../../encyclopedia-of-chaos/reality-benchmarks/2026-11-17-ec-rfr-001-v0.1.md), [placement receipt](2026-11-17-nsa-placement-receipt.md).
Repository: https://github.com/AETHEON-1/boundarytitan-control-gate
Pinned evidence: 3993c3fdae749be6d63b8c20c76aabf635af2014.
Specialist: GitHub security, CI/CD and independent verification; individual not assigned.

## Assignment
Map effective admission rules, credentials, bypasses, verifier ownership, administrative recovery and independent stop authority. Inspect existing historical fixtures before constructing new mechanisms. Explain recurrence without presuming a single cause. Branch protection disabled and empty rulesets were observed; effective-rule endpoint inaccessible. Inspect separately applicable policies using authorized access.

## Tests (proposed; no execution authorized)
| ID | Stimulus | Required observation |
|---|---|---|
| T01 | Missing manifest entry | Detector rejects fixture |
| T02 | Failed check | Target ref remains unchanged |
| T03 | Missing or stale check | Target ref remains unchanged |
| T04 | Altered bytes with stale digest | Detector rejects and admission denied |
| T05 | Administrative override attempt | Actual permission, disposition and receipt; no unowned bypass |
| T06 | Restore inconsistent historical state | Invalid state not silently admitted |
| T07 | Remove or alter verifier | Independently controlled response; no self-approval |
| T08 | Valid manifest change | Positive control: authorized admission remains possible |

## Acceptance and custody
Use a separately authorized disposable environment with representative rules; no destructive main changes. Record initial and final refs, exact fixture bytes/digests, actor permissions, rules and bypasses, check provenance and timestamps, attempted action, actual remote outcome, external observation and counterexamples. Denial means unchanged designated target state, not merely an error response. Scope conclusions to tested paths; simulator results do not establish production control. Identify human acceptance and external stop authority before testing. Rollback and cleanup require separately scoped approval. Do not modify verifier, permissions, branch rules or workflows in this preparation. Preserve failure evidence. Independent reviewer must not be solely the check producer or uploader.

## Specialist deliverables
Effective authority map; recurrence evidence and competing explanations; reproducible test plan; negative and positive controls; residual risks; named owner and decision questions; proposed correction and recovery path. Human owner decides whether to authorize tests and accepts residual risk. No self-certification. CAN ⊬ MAY.
