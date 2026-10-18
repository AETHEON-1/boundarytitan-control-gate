# Sigma-2 Incremental Detection: Specialist Handoff 001

Status: YELLOW | SYNTHETIC FIXTURES ADDED | INDEPENDENT COMPARISON PENDING
Date: 2026-10-17
Scope: Read-only research and isolated synthetic tests. No deployment, merge, doctrine promotion, or publication authorization.

## Objective and baseline
Test whether a Sigma-2 authority-transition audit identifies independently verified consequential authorization defects missed by a competent established specialist assessment. Compare with OWASP authorization and workflow testing, distributed authorization consistency, threat modeling, and domain-specific safety/legal analysis. The Boundary Atlas 928-page archive predates this package and already discusses authority transitions, queued revocation, consequence custody, and external stops. This package claims no conceptual novelty.

## Run
`python3 -m unittest -v tests/test_sigma2_incremental_detection.py` (or `python3 tests/test_sigma2_incremental_detection.py` where the tests directory is not importable).

The Python fixture contains a modeled baseline and a modeled Sigma-2 detector. They currently use equivalent policy checks by design. Passing tests demonstrate only fixture consistency, NOT incremental detection. No CI wiring or verified CI result is claimed by this package.

## Pre-registered comparison protocol
1. Freeze the exact system, governing authorization policy, consequence, actor, action, revocation semantics, and time of binding.
2. Inventory all reachable consequence paths: direct calls, delegation, queued jobs, recovery, retries, restart, caches, maintenance and alternate routes.
3. Have independent baseline specialists review evidence WITHOUT Sigma-2 labels. Record their complete findings and effort before revealing the candidate method.
4. Have a separate team apply the Sigma-2 authority-origin, transport, composition, extinction, and external-NO questions.
5. Use independent ground truth from an isolated instrumented reference implementation and named policy owner. Disputed policy is UNDERDETERMINED, not a confirmed defect.
6. Blindly adjudicate matched findings. Report true positives, false positives, false negatives, unique verified findings, time to detection, and unobservable paths.
7. Preserve raw outputs, fixture versions, reviewer instructions, code hash, timestamps, disagreement, rejected signals, and negative results. No result is a certificate.

## Required specialist battery
- S2-01: Revocation before queued execution; durable versus nondurable approval.
- S2-02: Revocation/commit race; precisely defined linearization and stop deadline.
- S2-03: Credential replay across wrong audience, agent, target, or purpose.
- S2-04: Delegated action with a changed consequence, amount, recipient, or scope.
- S2-05: Alternate API or recovery route bypassing the claimed gate.
- S2-06: Restart, partition, stale cache, and retry after permission extinction.
- S2-07: Compromised requester forging or deleting the evidence record.
- S2-08: Independently powered brake, including physical stop, bypass and restart.
- S2-09: Composition of individually permitted actions into forbidden consequence.
- S2-10: Legitimate durable grants and authorized emergency overrides as false-positive controls.
- S2-11: Unknown or contested governing policy; reject premature legal judgment.
- S2-12: Correctly functioning controls and deliberately planted non-defects.
For each: document setup, independent policy oracle, expected result, observed result, artifacts, and who can still say no.

## Justified answers
Q: Is execution after revocation automatically unauthorized?
A: No. Authorization duration depends on governing policy, not merely on the approver's current employment or role.

Q: Is a successful signature, token, log, or local test sufficient evidence of legitimate authority?
A: No. Such evidence proves only bounded technical properties under the relevant assumptions.

Q: Does the existing synthetic comparison establish superior Sigma-2 detection?
A: No. The modeled baseline and Sigma-2 checks coincide. Incremental detections in the current fixtures: zero by construction.

Q: Can a self-reported stop prove effective independent stopping?
A: No. Independent observation and an actual consequence path are required.

## Open Sigma-2 diagonal questions for specialists
1. Can any verified hidden authority transition evade a correctly scoped baseline assessment yet be systematically detected by Sigma-2? Specify the baseline and exclusion criteria.
2. Is authority-extinction across queues, delegates, recovery and partition decidable for a bounded implementation? What assumptions make a proof possible?
3. How should authorization compose across distinct legal entities and policies when each component is locally valid?
4. Can the external NO remain effective under full requester compromise, credential replay, restart, and adversarial evidence tampering?
5. What minimum independently held evidence suffices to distinguish blocked consequence from merely unobserved consequence?
6. When evidence leaves multiple admissible decisions, who legitimately selects one, and how is that authority independently established?
7. Which claims are already covered by object-capability security, OWASP, Zanzibar-style consistency, safety interlocks, legal due process, and formal methods?
8. What false-positive and detection-effort costs does the Sigma-2 method introduce?
9. Does the method generalize across cyber, financial, legal and physical systems without collapsing important differences?
10. What observation would falsify the claimed incremental value of the method?

## Prior-art and overlap discipline
The following are already-consumed research objects, not novel findings: object-capability Property A; UCC Article 3 bearer instruments; ISO 14119 interlocks; permissive action links and two-person rule; Hardy's confused deputy; Hume/Prior is-ought. Archive overlap and prior specialist techniques must be checked before any novelty promotion.

## Encyclopedia of Chaos: failure custody
- EOC-S2-001: First modeled queued-payment comparison produced ZERO incremental detection. Preserve as a negative result.
- EOC-S2-002: An earlier narrative described a 16-case execution; executable evidence for that historical claim was not recovered. Do not promote it to independently verified CI evidence.
- EOC-S2-003: This repository addition contains a synthetic fixture and handoff only; no independently verified external stop or field safety.
- EOC-S2-004: A locally correct test oracle can be wrong about real authorization policy. Ground truth must be independently justified.

## Handoff disposition
GREEN: isolated inspection, synthetic execution, adversarial review, documentation.
YELLOW: effectiveness, coverage, novelty, cross-domain generalization.
HOLD: merge, deployment, field testing, publication, certification, frozen-doctrine revision.

CAN ⊬ MAY. Maximize CAN. Preserve MAY outside it.
No owner, no brake. No ledger, no trust.
