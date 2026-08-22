# Sigma-2 Diagonal Workflow v0.1

## Purpose

Inspect a system by applying its own boundary requirements to every authority transition.

The diagonal asks:

- Who owns the evidence?
- Who owns the consequence?
- Who decides?
- Who can deny?
- Who can revoke?
- Who can still say no?
- Can the transition be reversed?
- How long is the harm window?
- Is the verifier independent?
- Is the ledger inspectable?
- Can the system certify or close itself?

## Sequence

`Capability → Evidence → Authority → Consequence → Owner → Decision → Denial → Revocation → Reversibility → Verification → Ledger → External Stop → Specialist Review`

## Disposition

- **GREEN_FOR_BOUNDED_REVIEW:** structural separation is present; external human decision remains required.
- **YELLOW_REQUIRES_REPAIR:** missing owner, evidence, timing, verification, ledger, denial, revocation, or uncertainty control.
- **RED_HOLD:** self-certification, self-closure, or irreversible consequence without a declared harm window.
- **NOT_ADMISSIBLE:** the claim packet is structurally incomplete.

Green is not permission, release, deployment, safety certification, or closure.
