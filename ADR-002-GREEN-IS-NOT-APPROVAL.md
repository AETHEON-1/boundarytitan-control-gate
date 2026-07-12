# ADR-002 — Green Is Not Approval

Decision: Green is represented as `GREEN_ELIGIBLE`, never `APPROVED`.

Rationale:
Prevents routing status from becoming authority.

Implementation consequence:
- UI cannot label Green as Approved.
- APIs return validation status separately from human decision status.
- tests reject any direct transition from Green to permission or execution.

Status: Accepted in the human-approved Architecture v1.0 baseline.
