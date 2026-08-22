# Robotics Specialist Handoff Test Battery v0.1

Purpose: verify that a bounded-kernel result is useful to specialists without becoming a safety certificate, deployment approval, or motion command.

The battery checks four invariants:

1. Human stop authority remains visible and machine authority remains false.
2. Missing, stale, or unverified brake evidence becomes a named failed test and an open question.
3. Unknowns, missing independent measurements, and unresolved standards review remain explicit.
4. Missing consequence ownership routes the result to human review rather than being inferred away.

Passing this battery means only that the handoff contract preserved the required boundaries for review. It does not establish that a robot is safe, compliant, deployable, or authorized to move.

## Specialist review questions

- Can the named site authority stop the system independently of the planner and model?
- Is the brake test current, measured, independently witnessed, and within the declared limit?
- Are all hazardous energy sources enumerated, isolated, and verified before maintenance access?
- Which claims are measured facts, which are bounded inferences, and which remain unknown?
- Who owns the consequence if the proposed action causes harm?
- Which competent person accepts or rejects the applicable standards and site controls?

## Stopping condition

Any failed battery case is a hold for specialist review. The handoff may be transmitted as a review packet, but it cannot authorize motion, certify safety, approve deployment, or self-certify its own result.
