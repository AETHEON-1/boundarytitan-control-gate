# Specialist Inspection Quality Gate v0.1 — proposal

Status: CANDIDATE / NOT CERTIFIED / NOT INDEPENDENTLY REVIEWED
Applicability: Domain-specific, case-specific, jurisdiction-specific. This document does not assert conformance with any standard.

## Objective
The workbench must be legible to a competent specialist, inspectable by auditors and regulatory reviewers, reproducible by a successor, and challengeable without dependence on its author. Operator simplicity shall not erase domain complexity.

## Standards mapping (candidates; assess applicability with an actual specialist)
- **IEC 60812:2018**: FMEA/FMECA method and record structure. Capture item/function, failure mode, local/end effects, causes, controls, severity, likelihood and detection only where defined, assumptions, action, owner and verification. Never treat a calculated RPN as a universal approval threshold.
- **IEC 31010:2019**: risk-assessment technique selection and application. Bow-tie, FMEA and other techniques require a documented scope, selected method, assumptions, uncertainty and suitability for the case.
- **ISO 19011:2026**: audit principles, planning, evidence, competence, independence, finding and follow-up when auditing management systems. A tool does not certify an audit.
- **ISO/IEC 42001:2023** and **NIST AI RMF**: AI lifecycle and management-system governance, risk identification, evaluation, response and accountability where AI is involved. NIST AI RMF is voluntary and undergoing revision.
- **NIST SP 800-53 Rev. 5 / SP 800-53A Rev. 5**: security/privacy control family and assessment-procedure crosswalk for identity, access, audit, configuration, contingency and monitoring, as applicable.
- **FDA Computer Software Assurance guidance (February 2026)**: relevant only where the actual use falls within medical-device production or QMS software scope. It is a risk-based guidance document, not approval of the Workshop.
Domain specialists must additionally identify binding laws, codes, contracts, licensing duties, organizational procedures and superseding editions. Missing licensing/copyright permissions for standards text remain an access gap. Link and cite standards; do not reproduce paywalled normative content.

## Required specialist-native instrument surfaces
1. **FMEA/FMECA**: functional boundary; failure ID; failure mode; causal mechanism; local and system effect; existing prevention/detection; severity and other metrics with their specific rubric; residual uncertainty; named treatment owner; evidence ID; retest.
2. **Bow-tie**: hazard; top event; threats; preventive barriers; consequences; recovery/mitigating barriers; degradation factors; accountable barrier owners; evidence that each barrier works; independence and common-cause dependencies.
3. **Authority/dataflow graph**: typed actors, tools, credentials, inputs, outputs, storage, triggers, retry/fallback, proposed transition, receiving systems, consequence; per-edge provenance, identity, authorization scope, expiry, stop and revocation.
4. **Evidence and challenge ledger**: immutable source/version link, observed versus inferred, contradiction, absence category, retrieval/custody, negative evidence, candidate falsifier, reviewer dispute and unresolved disposition.
5. **Standards applicability matrix**: standard and edition, clause/control reference where legitimately available, whether applicable and why, required evidence, observed evidence, gap, reviewer competency, disputed interpretation and no-conformance claim.
6. **Operator plain-language view**: what works, first unsupported arrow, affected party, proposed next permitted step and why execution remains held.

## Strict transition model
DATA_OBSERVED -> CLAIM_ASSERTED -> EVIDENCE_SUPPORTED -> CONTROL_ASSESSED -> HUMAN_DISPOSITION -> EXTERNALLY_ENFORCED_ACTION -> CONSEQUENCE_OBSERVED -> RECOVERY_VERIFIED.

These are distinct record types, not a forced linear certainty ladder. Neither source IDs nor hashes prove authenticity; neither high confidence nor standards references grant execution authority. Each asserted consequential edge must carry source/authority provenance, actor identity, owner, scope, time limits and an effective independently controlled denial/stop path. Unknown edges stay unresolved; no graph completeness certification from the tool.

## Acceptance and falsification tests
- An external specialist unfamiliar with the build can open a fixture, identify the top event / failure mode / authority gap, export it, and reproduce the result.
- The same case yields internally consistent FMEA, bow-tie, typed graph, evidence ledger and export. Cross-view contradictory data fails deterministically.
- Injected fake hashes, missing reviewers, fabricated approval, ambiguous credentials, revoked tokens, misleading "false" strings, cyclic delegation, retry bypass, expired scope, downstream ghosts and missing stop-path effectiveness remain visible and cannot upgrade to approval.
- A second reviewer can contest any finding and retain an attributable dissent without altering the original.
- Controls are evaluated for actual evidence and effectiveness; mere existence of a diagram node or self-reported flag is not sufficient.
- Test usability with keyboard-only interaction, accessibility checks, terminology teach-back and specialist task completion; record real results separately from machine assertions.
- Preserve the intentionally failing v0.2 cases F01-F07 as negative fixtures, not silently repaired history.
- Independent domain review must be conducted before domain correctness claims. Jurisdictional/legal and field suitability are never inferred from internal CI.

## Evidence and owners
Owner for repository consequence and final disposition: Human BoundaryTitan owner.
Independent domain assessor: NOT APPOINTED.
Standards conformance assessor: NOT APPOINTED.
Evidence custodian: NOT INDEPENDENTLY ESTABLISHED.
External runtime brake: NOT TESTED.
Browser end-to-end tests: NOT TESTED.
Current demonstrated state: local standalone mockup preparation, JS syntax/static checks reported, no field validation.
Novelty or superiority over established specialist products: NOT ESTABLISHED.

## Distinct gates
- GREEN_ANALYSIS: local bounded analysis may run.
- GREEN_CANDIDATE: reproducible candidate and negative fixtures prepared.
- GREEN_DOMAIN_REVIEW: independent specialist assessment completed for a declared scope.
- GREEN_EXECUTION: separate human authorization, named consequence owner, effective external technical stop, and all required evidence for exact transition.
No gate promotes itself into another.

## Acceptance metric
A reviewer should be able to ask "show the failure mode", "show the source", "show the control test", "show the relevant standard", "show the owner", "show the brake", and "what would disprove this?" from the same persistent case record.

The telescope extends the eye. It doesn't cheat the sky.
