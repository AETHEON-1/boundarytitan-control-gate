# Research Discovery v0.1 — adversarial failure record (2026-10-13)

Evidence level: SOURCE-INSPECTED, REPRODUCTION PENDING CI. Existing baseline checks succeeded: bounded verification 38456352483 and Offline research discovery 38456352792 at commit dfe781fe960bea404fa308cf43e6b15d07a1780e.

Negative tests created in `scripts/research-discovery.negative.test.js`. These are **intentionally red** and must remain retained after any repair. They challenge:
- NEG-F01 Duplicate observation IDs accepted. A single identifier can contain conflicting observational reports; the code validates observation shape but has no duplicate-ID check.
- NEG-F02 Empty observation list accepted with no NO_OBSERVATIONS gap. Unobserved status is not legible as a case-level evidence absence.
- NEG-F03 A string stop='button' prevents MISSING_STOP but the tool does not emit UNVERIFIED_STOP. A label is not an effective external brake.

Expected failing tests are not certification that the identified exploits can execute in production. This is a deterministic offline research parser, not an authorized runtime gate. The graph and source evidence are synthetic.

Repair admission requirements: retain negative tests verbatim; add duplicate-observation validation, explicit no-observation gap, and a stop-effectiveness evidence status separate from a stop identifier; independently test denial outside the acting system; rerun negative and existing suites; preserve original failure record. Do not merge the deliberately failing branch as-is into a protected production baseline without a human decision.

CAN ⊬ MAY. Failure evidence does not itself establish field consequence.
