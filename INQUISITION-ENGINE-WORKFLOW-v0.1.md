# Inquisition Engine Workflow v0.1

## Purpose

Attack a claim before it is allowed to acquire standing.

## Attack sequence

`Claim → Source → Evidence → Assumption → Capability → Authority → Owner → Consequence → Stop → Revocation → Reversibility → Harm Window → Independent Verification → Coverage → Self-Certification`

For each layer, the engine asks what would falsify the claim and what must be present before the transition can continue.

## Dispositions

- `SURVIVES_INITIAL_ATTACK` — no omissions were found in the supplied packet; this is not proof.
- `REQUIRES_REPAIR` — one or more boundary defects require correction.
- `HOLD_FOR_COUNTEREVIDENCE` — self-certification or another high-risk defect requires external counterevidence.
- `NOT_ADMISSIBLE` — the claim is not defined well enough to attack.

## Boundary

The Inquisition Engine is a sledgehammer, not a judge. It may produce attacks, rejection conditions, and counterevidence requests. It cannot issue a verdict, certify the claim, grant authority, or close review.
