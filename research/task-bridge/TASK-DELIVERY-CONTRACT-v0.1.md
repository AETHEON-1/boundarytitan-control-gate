# Task delivery envelope v0.1

Source ChatGPT Task run → attributable immutable original output → scoped transport → GitHub read-only parsing → candidate evidence receipt → separate human archive admission.

Required envelope: `schema`, `taskId`, `taskRunId`, `originalOutput`, `originalOutputSha256`, structured `output`, `deliveryVerified:false`, `authorizationGranted:false`.

The provided run ID is still a claim until independently checked against the task service. The SHA-256 digest establishes raw payload consistency, not task origin or authenticity. Duplicate protection requires a persisted ledger of previously ingested `taskId:taskRunId` identities; local `known` argument supports a deterministic negative test but is not persistent in this version. The structured `output` is not yet cryptographically or semantically bound to `originalOutput` beyond the containing envelope and therefore requires separate reconciliation. No secret-bearing action, GitHub write token or webhook is installed. A real transfer must be verified separately.

Fail closed for unknown/disabled task IDs, missing run ID, corrupt original-output digest, misleading success/authorization claims, or repeated delivery identity. Retrieval failures remain evidence records and are not automatically suppressed.

First live test: independently obtain one actual task execution output, task run identifier and timestamp; preserve original bytes in controlled custody; produce matching structured candidate; deliver through an authenticated and scoped external integration; cross-check task service identity independently; store a versioned receipt; submit to human archive admission. Do not claim complete until the comparison is demonstrated.

CAN ⊬ MAY.
