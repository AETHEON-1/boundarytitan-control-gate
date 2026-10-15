# FR-001 | Cross-domain specialist test handoff (candidate)
Status: YELLOW / PREPARATION ONLY. No physical test, purchase, deployment, release, certification, or publication authorization.

## Entry points and continuity
- Constitution: [01-PROJECT-CONSTITUTION.md](../../01-PROJECT-CONSTITUTION.md)
- Existing robotics specialist battery: [ROBOTICS-SPECIALIST-HANDOFF-TEST-BATTERY-v0.1.md](../../ROBOTICS-SPECIALIST-HANDOFF-TEST-BATTERY-v0.1.md)
- Minimum robotics kernel: [ROBOTICS-MINIMUM-KERNEL.md](../../ROBOTICS-MINIMUM-KERNEL.md)
- Existing assessment: [src/robotics/pre-action-gate.ts](../../src/robotics/pre-action-gate.ts)
- This packet: [specialist-matrix.md](specialist-matrix.md), [claim-register.md](claim-register.md), [evidence-contract.md](evidence-contract.md), [review-template.md](review-template.md)

## Mission
Test whether an external denial remains effective at the physical consequence, not just the software command. Maximize bounded investigation; keep consequential authorization external.

## Chain under test
PROPOSAL -> PRE-ACTION ASSESSMENT -> EXTERNAL AUTHORITY -> ENABLE -> DRIVE COMMAND -> POWER STAGE -> DISPLACEMENT -> CONSEQUENCE -> INDEPENDENT EVIDENCE

Every arrow is independently contestable. A passing upstream arrow never certifies a downstream arrow.

## Existing evidence, carefully bounded
Earlier local FR-001 simulations (Rounds 2–7) reported scheduling counterexamples involving stale authorization, shared-process authority, event loss, residual energy, inertia, gravity, alternate writers and welded-contact assumptions. Those artifacts are **not committed to this repository in this handoff** and are **not independently reproduced by this PR**. Counts, completeness and reproducibility remain UNVERIFIED HERE until original executables and ledgers are supplied and rerun against pinned versions. No physical testing has occurred.

## Workflow
1. Specialist receives a claim ID, test request, environment boundary, falsifier and evidence contract.
2. Specialist may return SUPPORTED (bounded), CONTRADICTED, INDETERMINATE, TEST_INVALID or NOT_TESTED, with provenance.
3. Record disagreement and missing evidence without majority-vote closure.
4. Route cross-domain contradiction to the owner and keep HOLD.
5. Human owner decides whether to admit a finding into canonical state. This packet cannot authorize hardware or deployment.

## Priority order
P0: independent denial dominance; consequence after electrical stop; restart/revocation races; independent evidence custody.
P1: mechanical holding; power-stage faults; task/identity scope; communication partitions; human reachability.
P2: maintainability, cost, ergonomics and operational readiness only after P0/P1 evidence.

## Stop conditions
No physical test planning becomes permission. Unknown physical energy, independent stop effectiveness, consequence ownership, or evidence custody => HOLD. No specialist may certify a complete system by reviewing only their component.

## Owner review checklist
- [ ] Original simulation ledgers and source checksums supplied, pinned, independently rerun
- [ ] Each critical claim has a named independent specialist and a falsifier
- [ ] All consequence paths and residual energy sources enumerated
- [ ] Conflicting specialist conclusions preserved
- [ ] Physical validation authorization separately requested and explicitly granted (NOT GRANTED)
- [ ] No autonomous release, purchase, deployment, or merge implied
