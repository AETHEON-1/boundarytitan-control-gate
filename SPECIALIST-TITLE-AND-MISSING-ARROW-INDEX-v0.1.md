# Specialist Title and Missing Arrow Index v0.1

**State:** PREPARED — REVIEWABLE  
**Boundary:** Terminology, specialist roles, evidence, authority, enforcement, consequence ownership, and external stop power.  
**Constitutional test:** `CAN ⊬ MAY`  
**Disposition:** This artifact prepares distinctions. It does not certify safety, authorize deployment, or close a case.

## Purpose

This index prevents specialist language and job titles from silently carrying authority they do not establish. Each term must be interpreted within a frozen scope, with evidence separated from authority and with a named consequence owner and external stop authority.

OWASP threat-modeling guidance emphasizes actors, scope, decomposition, data flows, and trust boundaries. NIST separates control assessment, authorization, and monitoring, and its AI RMF requires differentiated human roles and responsibilities for AI oversight.

## Term record schema

Each indexed term or title should preserve:

```text
term_or_title
source_definition
working_definition
actor
object
action
scope
evidence_required
authority_required
enforcement_mechanism
consequence_owner
external_stop_authority
forbidden_inference
unresolved_disagreement
status
```

## Modal layers

| Layer | Question | Does not establish |
|---|---|---|
| Capability | Can the actor perform the action? | Permission |
| Possibility | Is the action physically, technically, or logically possible? | Authorization |
| Permission | Is the action allowed by a valid authority? | Runtime enforcement |
| Enforcement | Will the gate permit or block it? | Safe consequence |
| Consequence | Who owns the result, and who can still stop it? | Technical correctness |

`CAN(action) ⊬ MAY(action)`

Additional non-implications:

```text
MAY(action) ⊬ WILL(action)
MAY(action) ⊬ SAFE(action)
MAY(action) ⊬ ENFORCED(action)
MAY(action) ⊬ ACCEPTED_CONSEQUENCE(action)
```

## Claim-term index

| Term | Bounded meaning | Forbidden inference |
|---|---|---|
| capable | A defined actor can perform a defined action | The action is permitted |
| verified | A defined check passed for a defined object and scope | The object is safe |
| validated | Evidence met stated validation criteria | The system is universally correct |
| tested | A procedure produced a result | The result authorizes operation |
| assessed | A reviewer evaluated specified controls | The reviewer granted permission |
| approved | A named approver recorded a decision | The decision is technically complete |
| authorized | A valid authority granted scoped permission | Runtime enforcement is guaranteed |
| compliant | Mapped requirements were assessed against criteria | The system is secure |
| secure | A bounded claim under a stated threat model | No unknown attack exists |
| contained | Listed paths or components were isolated | All consequences have stopped |
| reversible | A specified rollback exists | Harm is automatically undone |
| independent | The evaluator is structurally separated | The judgment is correct |
| complete | A declared coverage criterion was met | No unknown surface remains |
| trusted | A defined trust relation or verification condition exists | The actor is benign |
| monitored | Telemetry is collected or observed | Intervention is possible |
| controlled | A control mechanism exists | It operates effectively |
| human oversight | A human has a stated review role | The human can understand, deny, revoke, or stop |
| autonomous | The system acts without per-step human input | The system has authority |
| production-ready | Defined readiness criteria were met for a named environment | Deployment is approved |

## Evidence-term index

`signal` · `claim` · `source` · `primary evidence` · `corroboration` · `record` · `log` · `receipt` · `signature` · `attestation` · `chain of custody` · `provenance` · `reproduction` · `audit trail` · `benchmark` · `test result` · `incident record` · `correction` · `retraction`

**Boundary rule:** Evidence may support a decision. Evidence does not become the decision merely by being preserved, signed, or formatted professionally.

## Specialist-title index

| Title | Primary contribution | Boundary |
|---|---|---|
| Threat modeler | Threats, assets, actors, attack paths, trust boundaries | Cannot authorize operation |
| Security architect | Design constraints and control placement | Cannot certify field effectiveness alone |
| Control assessor | Tests whether controls are present and operating | Cannot grant permission |
| Authorizing official | Accepts bounded operational risk | Cannot personally prove every technical claim |
| System owner | Owns system operation and documentation | Cannot inherit unlimited authority |
| Information owner/steward | Defines data sensitivity and handling | Cannot authorize unrelated actions |
| Risk executive | Correlates risk across systems | Cannot replace the action owner |
| Privacy officer | Evaluates privacy impact and obligations | Cannot silently become security authority |
| System security officer | Coordinates security implementation | Cannot self-certify the system |
| System privacy officer | Coordinates privacy controls | Cannot close unresolved harm |
| Auditor | Performs independent examination | Cannot remediate and independently validate the same result |
| Evidence custodian | Preserves records and provenance | Cannot convert custody into truth |
| Cryptographic key custodian | Protects signing authority | Cannot establish human intent from signature validity |
| Runtime operator | Executes, pauses, or stops covered operations | Cannot accept residual risk merely by operating |
| Incident responder | Detects, contains, and recovers | Cannot rewrite the original authority chain |
| Domain specialist | Supplies subject-matter interpretation | Cannot provide cross-domain permission automatically |
| Human reviewer | Reviews a bounded output | Must have real denial or escalation power |
| Consequence owner | Owns impact if action proceeds | Must be identified before execution |
| External stop authority | Can halt or revoke from outside the system | Must be independent of continuation logic |
| Appeal authority | Can challenge or reopen a disposition | Cannot be the unchecked system itself |
| Recovery owner | Owns restoration after failure | Must not be inferred from machine success output |

## Missing-arrow register

| Existing arrow | Unsupported inference | Required arrow |
|---|---|---|
| Specialist → meaning | Everyone uses the term identically | Specialist → shared operational definition |
| Test → evidence | The test measured the intended object | Test → scope-valid evidence |
| Evidence → finding | The evidence is sufficient and relevant | Evidence → bounded conclusion |
| Finding → approval | A finding grants permission | Finding → named authority decision |
| Approval → action | Permission will be enforced | Authority → runtime gate |
| Runtime gate → safety | One blocked path covers all paths | Gate → consequence containment |
| Containment → resolution | Isolation means harm is over | Containment → recovery and closure |
| Signature → human approval | Key validity proves informed intent | Signature → accountable human disposition |
| Owner → control | Responsibility implies capability | Owner → intervention power |
| Oversight → control | Presence implies meaningful veto | Reviewer → deny/revoke/stop capability |
| Monitoring → intervention | Observation implies response | Telemetry → bounded response path |
| Independence → correctness | Separation guarantees sound judgment | Independence → reproducible judgment |
| Machine output → closure | The system can evaluate itself | Output → external evaluation and human disposition |

## Required decision path

```text
Specialist claim
→ Shared definition
→ Scoped evidence
→ Independent assessment
→ Named human authority
→ Enforced permission
→ Consequence containment
→ External stop or revocation
```

## Green gate

A case cannot be Green unless every authority-bearing arrow has:

- a named actor;
- a defined object and action;
- an explicit scope;
- evidence appropriate to the claim;
- a separate authority basis;
- a runtime enforcement mechanism;
- a named consequence owner;
- an external stop or revocation path;
- a recorded uncertainty state;
- no machine self-certification.

**No owner, no brake. No ledger, no trust.**

## Sources

- NIST Risk Management Framework: https://csrc.nist.gov/projects/risk-management
- NIST Authorizing Official glossary: https://csrc.nist.gov/glossary/term/authorizing_official
- NIST Security Control Assessor glossary: https://csrc.nist.gov/glossary/term/security_control_assessor
- NIST AI RMF Core, Govern: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- OWASP Threat Modeling Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html
- Stanford Encyclopedia of Philosophy, Deontic Logic: https://plato.stanford.edu/entries/logic-deontic/

## Status boundary

This is a terminology and authority-mapping artifact. It does not establish independent review, field validation, deployment readiness, safety, or certification. The machine may prepare the index; it may not certify the index or authorize itself through it.
