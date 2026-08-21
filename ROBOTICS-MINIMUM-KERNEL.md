# Minimum Robotics Kernel

Status: declaration-only control artifact
Lane: Bounded Robotics
Authority state: preparation only

## Constitutional boundary

World-model output is evidence, not authority.

No verified state, no motion authority.

No controlled energy, no maintenance authority.

No bounded workspace, no movement.

No known force, speed, payload, and residual energy, no release.

No physically dominant external brake, no force authority.

No named consequence owner, no action.

No fresh permission after restart, no motion.

No independent evidence custody, no trust.

No ledger, no accountable transition.

Human presence is not human control.

A robot demonstration is not field admissibility.

Machine output cannot authorize, certify, or close itself.

The machine cannot be the final judge of the machine.

CAN does not entail MAY.

## Minimum admissibility record

Before motion can be considered, record:

- Robot identity and version
- Operating mode
- Task and lane
- Workspace boundary
- Tool and tool-center point
- Payload
- Force
- Speed
- Energy
- Residual energy
- World-state evidence
- Independent measurement
- Sensor freshness
- Human separation
- External stop path
- Measured stop latency
- Stop owner
- Consequence owner
- Recovery owner
- Permission state
- Restart state
- Evidence custodian
- Human release owner
- Consequence Receipt
- Ledger reference

## Gate sequence

Verified state
→ bounded task
→ controlled energy
→ external brake check
→ named owner
→ Human Translation Key
→ Consequence Receipt
→ external human decision
→ final physical stop check
→ motion

The gate may return:

- HOLD
- HUMAN_REVIEW_REQUIRED
- PREPARED_FOR_EXTERNAL_MOTION_DECISION

It may never return:

- SAFE
- APPROVED
- AUTHORIZED
- RELEASED
- CERTIFIED
- DEPLOYED

## Automatic hold conditions

Hold when any of the following is true:

- World-state is unknown, stale, or contradictory
- Independent measurement is absent
- Workspace is unbounded or changed
- Force, speed, payload, energy, or residual energy is unknown
- Human separation is unknown
- Stop path is unavailable, untested, or not physically dominant
- Permission is missing, expired, or revoked
- Task envelope is expired
- Communication is lost or degraded
- Recovery owner is missing
- Restart lacks fresh authorization
- Evidence custody is unavailable
- Human denial authority is unclear
- The consequence is irreversible or insufficiently characterized

## Non-claims

This kernel does not establish:

- Physical safety
- OSHA compliance
- Standards certification
- Correct world-state
- Complete hazard coverage
- Brake dominance
- Safe outcome
- Deployment readiness
- Human authorization

## Minimum question

Who can still stop the robot before motion becomes harm?

## Boundary

Motion eligibility is not motion authority.

A world model may propose.

A controller may regulate.

A robot may move.

Only an external authority may decide whether the motion is permitted.

No verified state, no motion authority.
No physically dominant brake, no force authority.
No owner, no release.
