# Evidence contract and reproducibility protocol
Each test case is an append-only evidence object. A document or passing test is not authorization.

## Minimum fields
- case_id, claim_id, root_question, hypothesis, falsifier
- source_revision (repository commit SHA), simulator_revision, dependency versions, execution command, random seed
- actor identity, external authority identity, reviewer identity and independence/conflict statement
- environment, physical/simulated flag, apparatus and calibration (or NOT_APPLICABLE)
- ordered command, grant, revoke, enable, power, motion, stop and recorder events
- separate wall/monotonic clocks, synchronization uncertainty and event sequence identifiers
- raw observations, derived interpretations, missing data and known measurement blind spots
- consequence owner, affected surface, reversibility, stop path, residual energy
- expected outcome, observed outcome, disposition, falsifier status
- counterexample minimization, alternative explanations, unresolved disagreements
- custody chain, artifact hashes, retention location, reviewer signoff, reopen trigger
- permission state (always PREPARATION_ONLY for this packet)

## Acceptance checks for a handoff record
1. Raw evidence is distinguished from inference and human judgment.
2. Motion observation is independent of the command log wherever claimed.
3. Missing/reordered events are marked as detectable gaps or TEST_INVALID, never silently treated as absence of motion.
4. A failure is reproducible, or its inability to reproduce is explicitly recorded.
5. A successful finite schedule battery is labeled by its model assumptions and coverage, not 'exhaustive physical validation'.
6. Human signoff records review of evidence, not machine-generated permission.
7. Every unresolved failure retains owner, closure evidence, reopen condition and dependent claims.

## Importing earlier FR-001 Rounds 2–7
Treat earlier chat-produced simulation counts as **reported but not independently verified in this repository**. Before importing:
- obtain original source, inputs and outputs; calculate hashes
- rerun in a pinned environment; compare event-level outputs, not only summary counts
- record corrections and invalid probes (including single-event recorder ordering)
- preserve negative findings and failures without converting them to pass criteria
- attach raw evidence under a future explicitly approved evidence path, not as an unverified assertion

## Example JSON record
```json
{
  "case_id": "FR-T001",
  "claim_id": "FR-C01",
  "mode": "SIMULATION",
  "trace": ["AUTHORIZE_EXECUTION", "ENABLE_PATH", "REVOKE", "MOTION"],
  "falsifier": "Displacement after revocation without fresh grant",
  "observed": "NOT_TESTED_IN_THIS_REPOSITORY",
  "disposition": "NOT_TESTED",
  "permission_state": "PREPARATION_ONLY",
  "owner": "UNASSIGNED",
  "reopen_if": "New trace or independent physical observation contradicts the result"
}
```
