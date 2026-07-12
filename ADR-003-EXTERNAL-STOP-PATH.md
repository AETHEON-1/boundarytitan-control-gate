# ADR-003 — External Stop Path

Decision: Stop controls are independently owned from the acting runtime.

Rationale:
A system cannot be its own final brake.

Implementation consequence:
The stop controller must be able to invalidate release tokens, credentials, jobs, tools, or network access without cooperation from the acting agent.

Status: Accepted in the human-approved Architecture v1.0 baseline.
