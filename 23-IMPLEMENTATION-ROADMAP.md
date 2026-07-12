# 23 — Implementation Roadmap

Phase 0 — Architecture freeze
Human approval of the architecture baseline is recorded. Coding may begin only after the final v1.0 baseline is placed under version control and each implementation phase is separately bounded.

Phase 1 — Core types and schemas
- Signal
- Lane
- ActionProposal
- Evidence
- OwnerAssignment
- ValidationResult
- ConsequenceReceipt

Phase 2 — Rule engine
- color routing
- missing-control findings
- no authority changes

Phase 3 — Receipt engine
- pre-action receipts
- list/detail views
- schema validation

Phase 4 — Audit ledger
- append-only events
- state-transition records

Phase 5 — Owner Matrix and Lane Registry
- role and lane definitions
- conflict detection

Phase 6 — Decision Brake and Break-Pass
- pause logic
- adversarial review

Phase 7 — Human decision workspace
- approve, deny, hold, narrow
- no automated approval

Phase 8 — Permission and release
- scoped grants
- expiry and revocation
- release tokens

Phase 9 — External stop controller
- simulated first
- independently controlled

Phase 10 — Integrations
- only after threat, test, and owner review

Each phase requires:
- architecture reference;
- tests;
- receipt;
- human review;
- visible stop path.
