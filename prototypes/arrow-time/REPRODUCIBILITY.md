# Reproducibility element: synthetic analysis replay

Run from repository root:
python -m unittest discover -s prototypes/arrow-time/tests -v

Module: arrowtime.reproducibility.replay(fixture, repetitions=20)

Canonical JSON with sorted keys is hashed as SHA-256; the analysis is repeated on independently decoded copies of the same fixture. Report includes input hash, count, unique result hashes and whether all results match. Repetitions are bounded to 1..1000.

**Scope:** in-process deterministic analysis only. This does not independently reproduce execution, enforcement, causal order, downstream state, or real-world consequence. Those require a separate controlled execution environment, seeded schedule variants, observed effect oracle, and independently recorded consequences. Repeated hashes cannot certify legitimate authority.

A further experiment should compare controlled schedules and seeds: same fixture, same schedule, repeated runs; same fixture, different schedules; same event set, different valid causal orderings. Record distributions, not merely output volume. Every outcome must retain source, schedule, seed, effect observation and stop status. If any of those are missing, consequence reproducibility is INDETERMINATE.

Status: YELLOW; review branch only; independent reproduction pending.
