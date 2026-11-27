# Branch lifecycle protocol | proposal only
State is about the **work object**, not proof of safety.

ACTIVE: work in progress, named owner, explicit baseline and scope.
REVIEW: candidate frozen for specialist challenge, reviewer/receipt required.
BLOCKED: prerequisite, evidence or authorization absent; preserve reason.
ARCHIVED: retained for reproducibility, failure evidence or historical record; do not delete automatically.
SUPERSEDED: later work replaces proposal, with explicit link to replacement; retain original.

Each record should include branch, base SHA, head SHA, status, owner, scope, last verified UTC, review ID, unresolved failures, related case IDs, and preservation location. No state may be inferred solely from branch prefix, commit age, or CI badge. Branch deletion requires separate human approval and evidence-custody review.

Do not treat a long-lived branch as abandoned without owner disposition. Do not silently merge historical research into frozen architecture.
