# 09 — Rule Catalog

R-001. Missing lane → Yellow.

R-002. Missing accountable owner → Yellow.

R-003. Owner lacks actual deny/revoke authority → Red.

R-004. Missing evidence → Yellow.

R-005. Stale or unverifiable evidence → Yellow or Red based on consequence.

R-006. Missing consequence description → Yellow.

R-007. Missing reversibility statement → Yellow.

R-008. Irreversible action without pre-action human authority → Red.

R-009. Missing external stop path for consequence-bearing action → Red.

R-010. Machine self-approval or self-certification → Black.

R-011. Concealment, impersonation, unauthorized access, evidence destruction, consent bypass, or review bypass → Black.

R-012. Green may only mean eligible for bounded human review.

R-013. ValidationResult cannot create Approval, PermissionGrant, ReleaseToken, or ExecutionRecord.

R-014. Receipt generation cannot change authority state.

R-015. Approval must be scoped, attributable, time-bounded where appropriate, and revocable.

R-016. Permission must identify the exact action or action class it covers.

R-017. Release must verify non-revocation immediately before execution.

R-018. Execution without a valid release token → blocked and recorded.

R-019. Lane assignment does not transfer ownership.

R-020. Owner collision → Yellow or Red; machine may not choose the winner.

R-021. Stop authority must be operational before execution begins.

R-022. If execution can outrun review or revocation, the control is not Green.

R-023. Hidden external actions must be surfaced in the ledger.

R-024. Every critical transition must emit an inspectable AuditEvent.

R-025. Break-Pass findings cannot certify completion.

R-026. Restart behavior must default to no inherited release authority unless a human-approved exception is formally specified.

R-027. Any proposed new invariant must be labeled as a proposal until approved by the human owner.
