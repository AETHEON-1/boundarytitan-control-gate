# CAN → MAY Evidence Anchors v0.1

**State:** source-grounded preparation note
**Scope:** external anchors showing where the repository’s kernel fits; not a legal-compliance determination.

| External anchor | Confirmed boundary surface | Repository fit |
|---|---|---|
| NIST AI RMF | AI risk management is organized around Govern, Map, Measure, and Manage and is intended for use across the AI lifecycle. | Control surface, evidence registry, uncertainty register, owner routing, and lifecycle state model. |
| EU AI Act Article 14 | High-risk systems require effective human oversight, the ability to disregard or override outputs, and intervention or interruption through a stop procedure. | External stop-path tester, specialist handoff, human decision record, and non-authority output contract. |
| EU AI Act Article 26 | Deployers must use competent human oversight, monitor operation, retain logs, and report risks or incidents. | Ledger spine, temporal monitor, consequence receipt, and owner/evidence custody. |
| UK ICO automated decision guidance | Human intervention must be meaningful and performed by someone with authority and competence to change the decision; people must be able to express their view and challenge outcomes. | Authority actuality checker, appeal-path tester, dissent register, and specialist disposition loop. |
| OSHA robotics guidance | Emergency stops must be accessible and override other controls; systems should prevent automatic restart after power restoration and permit isolation of motion-related power. | Robotics minimum kernel, external brake contract, energy isolation test, restart reauthorization, and physical stop-path evidence. |
| CFPB adverse-action guidance | Complex or opaque algorithms do not remove the obligation to provide specific and accurate reasons for adverse credit actions. | Claim/evidence mapper, consequence receipt, adverse-action explanation, contradiction detector, and correction/reopening ledger. |
| FDA clinical decision support guidance | Certain clinical-support software must allow professionals to independently review the basis of recommendations and not rely primarily on the software’s output. | Evidence-to-decision brief, uncertainty preservation, independent measurement, specialist handoff, and no-self-certification rule. |
| CISA AI cybersecurity collaboration material | AI security response depends on operational collaboration, information sharing, and coordinated response rather than model output alone. | Incident reconstruction ledger, external owner routing, permission boundary mapper, and revocation/containment harness. |

## Strongest confirmed fits

The strongest externally anchored kernel surfaces are:

1. Human override that is real, competent, and timely—not ceremonial.
2. External interruption or stop capability.
3. Specific evidence and reasons for consequential outcomes.
4. Logging and incident reconstruction.
5. Independent review of recommendations.
6. Restart and revocation controls.
7. Named responsibility outside the model output.

## Claims not established by these sources

These sources do not establish that the BoundaryTitan implementation is compliant, complete, safe, independently verified, or deployable. They support fit between the proposed kernel and documented control problems. They do not supply the repository’s owners, live evidence, timing measurements, or external verification.

## Build implication

The universal kernel should be implemented before domain adapters. The first reusable interfaces should be:

- `ClaimEvidenceState`
- `AuthorityTransition`
- `HumanDecisionRecord`
- `ExternalStopPath`
- `RevocationObservation`
- `ConsequenceReceipt`
- `SpecialistHandoff`
- `AppendOnlyLedgerEvent`
- `UncertaintyRegister`

The domain adapter may describe and test a consequence surface. It may not inherit authority merely because a regulator, standard, or source document recognizes that the surface matters.
