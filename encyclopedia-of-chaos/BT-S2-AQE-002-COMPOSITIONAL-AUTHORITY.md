# Encyclopedia of Chaos | BT-S2-AQE-002

**Failure class:** LOCAL AUTHORIZATION DOES NOT NECESSARILY IMPLY COMPOSITE AUTHORIZATION.
**Recorded:** 2026-10-25.
**Primary lane:** Reality Benchmarks.
**Evidence state:** SUPPORTED for deliberately bounded counterexample; wider applicability INDETERMINATE.
**Authority:** Human BoundaryTitan owner retains disposition and stop power.

## Trigger
Two operations independently carry authorized=True and effect=1; global policy allows only total effects 0 or 1.

## Failure mechanism
The naive gate checks all per-step flags and never evaluates aggregate effect. Both local checks succeed while the aggregate effect becomes 2, outside the stipulated permitted set.

## Minimal counterexample
Step(principal=0,scope=0,effect=1,authorized=True)
Step(principal=1,scope=1,effect=1,authorized=True)
check(steps,{0,1}) -> local_authorized=True; composite_authorized=False; actual_effect=2.

## Reproduction scope
16 distinct step values; ordered sequence lengths 1 through 3; 4,368 enumerated sequences; 272 local-accepted/global-rejected sequences. Counts independently recomputed in a separate Python enumeration, not an independent authenticated GitHub checkout.

## Failed assumptions
1. All local permissions imply permission for the aggregate consequence.
2. A boolean authorization label constitutes evidence of legitimate permission.
3. Exhaustive enumeration of a toy model generalizes to field systems.
4. A hand-designed counterexample demonstrates blind novelty discovery.

## What was NOT demonstrated
No field exploit, no verified deployment defect, no authority model completeness, no external certification, no novelty proof, no independent audit of the full repository.

## Counterevidence and falsifiers requested
Produce a policy model where valid per-step grants also authorize the aggregate; challenge the aggregate-effect rule's legitimacy; show a smaller valid model or disprove the 272 count; blind-test realistic traces where labels are withheld; test legitimate delegated aggregation.

## Lineage and preservation
Original: prototypes/bt-s2-aqe-002/simulator.py, test_simulator.py, bounded-exhaustion-2026-10-25.md.
Review package: prototypes/bt-s2-aqe-002/SPECIALIST-HANDOFF.md.
Append-only defect ledger: prototypes/bt-s2-aqe-002/FAILURE-AND-OMISSION-REGISTER.md.
Earlier related failures remain in prototypes/bt-s2-aqe-001/.

## Disposition
PREPARATION COMPLETE; SPECIALIST REVIEW PENDING; NO CERTIFICATION; NO PUBLICATION OR DEPLOYMENT AUTHORIZED.

HTK: Every step may have a permission slip. That does not mean the destination has one.
CAN ⊬ MAY.
