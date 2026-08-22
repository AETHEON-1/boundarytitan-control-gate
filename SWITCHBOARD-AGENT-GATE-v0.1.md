# Switchboard Agent Gate v0.1

## Purpose

Place an untrusted agent request at the correct preparation lane without allowing the agent to inherit authority.

## Admission requirements

- Explicit agent identity
- Untrusted-by-default state
- Bounded task
- Explicit requested actions
- Permission manifest
- Named owner
- External stop path
- Revocation path
- Expiry
- Maintenance-only scope
- No live credentials
- No live connection
- One unambiguous lane

## Dispositions

- `ROUTE_TO_LANE` — preparation may be routed to one lane.
- `HOLD_FOR_HUMAN_REVIEW` — missing, conflicting, or ambiguous controls.
- `DENY` — live credentials, live connection, or equivalent prohibited surface.
- `EXPIRED` — request is no longer temporally valid.

The Switchboard is a gate and router, not an authority issuer. It does not grant tools, start execution, select owners, or replace the external brake.
