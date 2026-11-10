# BT-OW-20261023-MS-AGENT-WORKFLOW-SENSITIVITY-CASE-ALIAS-v0.1

State: ADDITIVE NONCANONICAL SPECIALIST CANDIDATE. No independent reproduction or deployment finding. Source task definition: `6ae2b9d15f8481919d0cdff95cf9f06a`; unique scheduler execution ID: null. Observed: 2026-11-02, approximately 19:12 UTC (web source retrieval, exact per-source timestamp not instrumented).

## LOOK AT THIS | source-root and clocks
- Root maintainer disclosure: https://github.com/microsoft/agent-framework/security/advisories/GHSA-r8fg-8q6m-6c5m ; disclosed 2026-10-23; retrieved 2026-11-02.
- Closely related but DIFFERENT mechanisms: https://github.com/microsoft/agent-framework/security/advisories/GHSA-68cw-g4g7-7h9f (implicit error/blank boolean control-flow leakage; 2026-10-23); https://github.com/microsoft/agent-framework/security/advisories/GHSA-f92h-h85c-p8w6 (exception-message leakage; 2026-10-23); https://github.com/microsoft/agent-framework/security/advisories/GHSA-9f26-7mqc-9vc4 (InvokeMcpTool raw-value leak; 2026-10-07).
- Exact version claim: Microsoft.Agents.AI.Workflows.Declarative <1.26.0 affected; 1.26.0 patched, per maintainer. No CVE listed for case-variant advisory. Publication clock and actual exploitation clock are different; no known victim or exploitation established.
- Repo reconciliation: main-branch code search for exact package returned no result; authorized draft PR #66 intake tree at parent `7cea8571ba0a53409feeea2503294de711f8e641` contained no case-variant Microsoft advisory note. This is bounded dedup only, not a complete publication denominator.

## PRECISE CLAIM / observed versus inferred
Maintainer reports WorkflowFormulaState variable VALUES use case-sensitive keys, while sensitivity LABELS use case-insensitive keys. A less-trusted workflow can write an ordinary variable with a name differing only by case from a protected variable, replacing the latter's effective sensitivity label while leaving its value unchanged. When the embedding host explicitly exposes configuration via AllowedEnvironmentVariables and enables HTTP or MCP output, an untrusted workflow author can cause an outbound action to carry a protected value that has lost its label. Maintainer reports local demonstration on v1.24.0 and regression coverage for checkpoint restoration; independent execution NOT TESTED here.
Inference: a value-only check or a label-only check can pass while the value-to-label binding has been corrupted. This is not proof that every host exposes sensitive Env values or outbound handlers.

## FIRST UNSUPPORTED ARROW
Host allow-lists a protected Env value -> value is marked Sensitive -> every derived variable retains correct label across case-variant writes/checkpoint restore -> HTTP/MCP output checks deny protected data -> no secret leaves the host.

## CONSEQUENCE-FIRST TRACE / authority-forward
Potential unauthorized disclosure -> permitted outbound HTTP/MCP action -> evaluated argument marked non-sensitive -> case-variant variable write overwrites sensitivity metadata -> distinct case-sensitive value remains protected in meaning -> less-trusted workflow author operates inside host-configured execution scope. Forward: workflow submission permission -> expression evaluation -> HTTP/MCP handler -> external recipient -> possible downstream account access if credential remains valid; no actual use or victim documented.

## CONDITIONS / CONTRARY EVIDENCE / NEGATIVES
- Env configuration exposure is opt-in; no unrestricted environment-variable access established.
- No outbound handler means no reported exfiltration path through these actions.
- Advisory's loopback demonstration is maintainer/reporter evidence, not independent verification.
- v1.26.0 claims a fix; deployment inventory, package provenance, all call paths, and restored checkpoint behavior remain unverified.
- Error-message and implicit control-flow advisories are separate defects; similar sensitivity language does not establish identical mechanisms.

## HUMAN CONSEQUENCE / RECEIPT
Lane: OPEN-WORLD SIGNALS. Surface: .NET declarative agent workflows, sensitivity metadata, outbound MCP/HTTP. Exposed: operators, service customers, data subjects whose secrets or protected configuration are available to a workflow. Consequence owner: embedding application operator for Env exposure, trust, handler access and revocation; upstream framework maintainers for library correction. Authority source: host configuration and identity/access policy, not model inference. Denial: host can reject less-trusted workflow submissions and disable handlers; resource administrators can independently revoke credentials and restrict egress. Appeal/correction: host operator's incident and access-control processes, not established here. Reversibility: stopping future egress possible; previously disclosed secrets cannot be un-disclosed, requiring rotation/revocation. External stop effectiveness: NOT TESTED.

## FALSIFIER / PREPARED TEST SPECIFICATION — NOT EXECUTED
Specialty: .NET runtime, information-flow/taint analysis, MCP security. Use only a local offline harness, synthetic TEST_ONLY_MARKER, in-memory recording handler, pinned v1.24.0 and v1.26.0; no real credentials or network.
1. Positive control: sensitive Env marker copied to variable; direct HTTP/MCP argument must be denied in both versions when label intact.
2. Defect case: write ordinary case-variant variable, then attempt output from original; vulnerable version should reach mock handler while patched version should deny.
3. Negative control: no case-variant write; no handler invocation.
4. Defeating case: patched version permits any marker to reach handler, or checkpoint restore changes labels depending on enumeration order.
5. Independent assertion: inspect actual value/label pairs before and after writes, including restored checkpoints, rather than treating a thrown exception as proof of total containment.
Tests performed by this task: NONE. Residual risk: alternate data-flow paths, exceptions and implicit leaks require separate review.

## EXISTING SPECIALIST ROUTE / DECISION GATE
Link existing challenges, not a new package: `AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md`, `challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml`, and BT-S2-NO-001 for denial-observation semantics ONLY; they are not equivalent to taint-label correctness. Selected external security-spec reviewer role may include Trail of Bits, but NO contact, assignment, receipt or acceptance occurred.
Bounded question: Can the sensitive-value-to-label binding survive all case-variant writes and checkpoint restore before any outbound handler, and what observation defeats that claim?
humanDisposition: RESERVED (substantive judgment PENDING)
custodyAuthorized: true
mergeAuthorized: false
executionAuthorized: false
publicationOutsideRepoAuthorized: false
specialistReview: PENDING
CAN ⊬ MAY.
