# 03 — Doctrine and Invariant Register

| ID | Statement | Class | Architecture effect | Human review |
|---|---|---|---|---|
| D-001 | The machine cannot be the final judge of the machine. | Documented public doctrine | Forbids machine self-certification | Confirm wording |
| D-002 | Signal is not authority. | Documented public doctrine | Signal objects cannot issue authorization | Confirm |
| D-003 | Capability is not permission. | Documented public doctrine | Capability checks remain separate from permission | Confirm |
| D-004 | Output is not authority. | Documented public doctrine | Output cannot directly trigger consequence | Confirm |
| D-005 | A lane is not an owner. | Documented public doctrine | Lane assignment cannot satisfy ownership | Confirm |
| D-006 | Routing does not transfer authority. | Documented public doctrine | Router returns placement, not permission | Confirm |
| D-007 | Only Green proceeds. | Documented public doctrine | Non-Green states cannot progress | Confirm semantic definition |
| D-008 | Green means eligible for bounded human review, not approved. | Canonical normalization | Prevents color/approval collapse | Explicit approval required |
| D-009 | Receipt is not permission. | Owner-established doctrine | Evidence object cannot issue release | Confirm public wording |
| D-010 | No ledger, no trust. | Documented operational doctrine | Consequence-bearing transitions require visible records | Confirm minimum ledger |
| D-011 | The brake must exist outside the system that wants to continue. | Documented public doctrine | External stop authority required | Confirm |
| D-012 | The system may prepare; the human owns consequence. | Documented public doctrine | Human release boundary | Confirm |
| D-013 | Constraint precedes capability. | Documented public doctrine | Control requirements are evaluated before feature enablement | Confirm |
| D-014 | The evaluator may evolve; the brake must not become internal. | Owner-established doctrine | Evaluator cannot inherit release authority | Confirm source |
| D-015 | Restart must not silently restore prior authority. | Proposed implementation control | Authority tokens expire across restart unless revalidated | Human decision required |
| D-016 | Critical transitions should emit tamper-evident records. | Proposed implementation control | Audit design requirement | Human decision required |
| D-017 | Credentialed authority must be scoped, revocable, and isolated. | Owner-established / proposed implementation | Credential controller | Confirm public-source status |
| D-018 | Every action must produce a Consequence Receipt. | Owner-established doctrine | Receipt requirement | Confirm scope and exceptions |
| D-019 | The architecture remains open to attack, correction, and human reopening; no internal state constitutes final closure. | Owner-established doctrine | Prevents completion and self-certification claims | Human review required |
| D-020 | Unknown is a recorded state, not a defect to be guessed away. | Owner-established doctrine | Preserves uncertainty across communication, delegation, receipts, and release | Human review required |
| D-021 | Capability is not restricted by default; access to capability and authority to invoke it are bounded. | Owner-established doctrine | Separates available potential from controlled access and consequence | Human review required |
| D-022 | Recursive improvement may propose changes and tests; recursive self-authorization is never permitted. | Owner-established doctrine | Keeps adaptation separate from authority grant, release, and closure | Human review required |
| D-023 | Known weaknesses remain visible and are treated as design inputs, not erased by documentation or local success. | Owner-established doctrine | Requires containment, ownership, testing, and external stop design around weakness | Human review required |
