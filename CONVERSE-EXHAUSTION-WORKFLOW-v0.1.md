# Converse Exhaustion Workflow v0.1

## Purpose

Test whether a one-way claim has been improperly reversed.

`A → B` does not automatically establish `B → A`.

## Sequence

`Freeze forward claim → State converse → Enumerate witnesses → Search counterexamples → Record unsupported bridges → Preserve untested surfaces → Route independent review`

## Results

- `CONVERSE_SUPPORTED_WITHIN_SCOPE` — only permitted when the supplied scope and evidence support the converse; it is not universal closure.
- `CONVERSE_NOT_ESTABLISHED` — no sufficient proof of the converse.
- `CONVERSE_REFUTED_WITHIN_SCOPE` — a bounded counterexample was found.
- `NOT_TESTED` — the witness or evidence surface is insufficient.

## Boundary

The workflow may falsify a converse within scope. It may not promote finite survival into universal proof, convert a surviving test set into certainty, grant authority, certify the forward claim, or close review.
