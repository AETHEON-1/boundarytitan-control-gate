# BT-S2-AQE-001 Independent Mutation Battery — 2026-10-25

State: LOCAL REPRODUCTION; REPOSITORY EXECUTION NOT INDEPENDENTLY ATTESTED; NO CERTIFICATION.

The engine.py and test_engine.py content was fetched through the connected GitHub API at blob SHAs 68ba221085be4a53d7810b1fc7b76372ad2d2ed4 and 74d043f543bfa769071efdebd8566fa62f0cf75c. Text was reconstructed in a separate local Python runtime; direct git clone failed because github.com DNS was unavailable. Therefore this is not an independently authenticated executable checkout.

Command: python3 -m unittest -v test_engine.py
Result: 12/12 tests successful.

Mutation protocol: one deliberate source-text mutation per temporary directory; run the original tests against each mutated engine; nonzero exit means detected.

| Mutation | Detected |
| --- | --- |
| execution_authorized True | yes |
| remove observation origin | yes |
| promote generated question state | yes |
| disable duplicate rejection | yes |
| allow missing evidence reference | yes |
| replace refusal-delay question | yes |
| alter fixed CAN question text | NO |
| nondeterministic receipt | yes |
| allow unknown mechanism | yes |

Mutation detection 8/9 = 88.9%. This is a bounded fixture result, not production efficacy.

Novel mechanism cases: cross_tenant_scope_confusion, approval_source_compromise, post_execution_compensation, resource_exhaustion_denial, clock_skew_expiry, policy_version_split_brain. All six were rejected with ValueError because the engine only accepts eight predefined mechanisms. Novel-question generation 0/6.

FINDING F-001 / CONTRADICTED: fixed question text integrity is not guaranteed by the existing tests. Add an exact immutable registry fixture and detect text mutation without changing frozen doctrine.

FINDING F-002 / SUPPORTED (bounded): unknown mechanisms are rejected; the current engine does not generate new questions for them. Introduce a separate quarantined novelty-candidate stage that preserves raw observations, proposes falsifiable questions, and requires independent admission before registry changes.

LIMITATION L-005 / NOT TESTED: no real infrastructure execution gate, external stop, credential revocation or production authorization was tested.

LIMITATION L-006 / INDETERMINATE: the six novel labels are candidate mechanisms, not evidence that these represent genuinely new structural failure classes.

Evidence custody: GitHub commit stores this report, but local run artifacts and the GitHub-fetched text have not been independently cross-attested. Preserve original test and failure lineage.

Next specialist tasks: exact registry text regression; novel input quarantine; independent executable checkout and CI execution; metamorphic tests for equivalent descriptions; independent execution-layer denial test.

CAN does not entail MAY. Neither successful tests nor discovered defects grant expanded authority.
