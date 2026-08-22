# Inverse Exhaustion Workflow v0.1

## Purpose

Test whether the logical inverse of a one-way claim has been silently assumed.

For a forward claim:

`A → B`

the inverse is:

`¬A → ¬B`

Neither the inverse nor the converse follows automatically from the forward claim.

## Sequence

`Freeze forward claim → Negate condition and consequence → Enumerate witnesses → Search consequence-without-condition cases → Record unsupported bridges → Preserve unknowns → Route independent review`

## Results

- `INVERSE_SUPPORTED_WITHIN_SCOPE` — reserved for separately supported bounded evidence; never universal closure.
- `INVERSE_NOT_ESTABLISHED` — no sufficient basis for the inverse.
- `INVERSE_REFUTED_WITHIN_SCOPE` — a consequence-without-condition witness was found.
- `NOT_TESTED` — evidence or witness coverage is insufficient.

## Boundary

The workflow may expose a false inverse. It may not establish universal negation from finite testing, authorize action, certify the forward claim, or close review.
