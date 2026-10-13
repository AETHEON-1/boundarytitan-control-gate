# ChatGPT tasks → GitHub research bridge (v0.1)

Five ENABLED tasks are mapped in task-registry.v0.1.json. Disabled tasks remain disabled. Task cadence and notification preferences are not changed by this repository mapping.

Task finds signal → HTK-style bounded structured input → source/provenance and contradiction checks → synthetic/real tagged candidate → automated negative tests → artifact → human review for Encyclopedia admission.

The `task-to-encyclopedia.js` runner converts an explicit JSON finding into an auditable, NOT FROZEN archive candidate. No direct API to ChatGPT Tasks is claimed. A scheduled ChatGPT task does not automatically deliver its output to a GitHub runner or grant that runner permission to edit the repository. Real task output transfer needs a supported task-time connector action or explicit human-controlled intake. This initial implementation uses a synthetic fixture for CI.

Task outputs involving hiring details, sensitive attribution, or legal matters remain private by default. Do NOT put private emails, personal accounts, private-case facts, credentials, or unverified accusations into public branches or workflow artifacts.

Failure dispositions including RETRIEVAL_FAILED, MISSED_INTERVAL, NEGATIVE_RESULT, INCONCLUSIVE and duplicate suppressions must be preserved and distinguish search failure from absence of signal. Do not automatically append machine-authored records to the admitted Encyclopedia. Accepted corrections are linked, never destructive edits. Repository integrity checks are not independent evidence custody.

Existing HTK, Sigma-2, challenge, Encyclopedia and negative fixtures remain in their stacked draft PRs. No merge or task modification is effected merely by this mapping.

CAN ⊬ MAY.
