# Chaos Engine Workflow v0.1

## Purpose

Perturb the declared control surface in simulation and test whether the expected hold, review, degraded-mode, or revoke-and-stop response remains visible.

## Scenario families

- Missing evidence
- Owner unavailable
- Stop path unavailable
- Revocation delay
- Stale evidence
- Clock skew
- Dependency failure
- Contradictory signal
- Retry after revocation
- Ledger gap
- Uninspected surface

## Required scenario fields

- Injected fault
- Expected disposition
- Required evidence
- Named owner
- External stop path
- Harm window when relevant

## Boundary

This prototype is simulation-only. It does not connect to live systems, use credentials, inject faults into production, revoke permissions, stop machines, or certify resilience.

`PASS_WITHIN_SIMULATION_SCOPE` means only that the declared scenario packet was structurally valid and the expected control was recorded. It is not field validation or deployment approval.
