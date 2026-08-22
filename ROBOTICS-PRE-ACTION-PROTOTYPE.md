# Robotics Pre-Action Boundary Prototype

Status: declaration-only, read-only prototype.

The prototype separates:

World-model estimate
→ independent measurement
→ bounded motion envelope
→ external stop check
→ human decision

It does not convert a world-model estimate into motion authority.

It holds when state, force, energy, stop, permission, communication, task expiry, reversibility, or human release conditions are unresolved.

Even when all supplied conditions are complete, the result remains external-decision eligibility, not permission.

Required future specialist review:

- Functional safety
- Robot controls
- Human-robot interaction
- Industrial integration
- Force and biomechanical limits
- Recovery and emergency operations
- Evidence custody and logging

Open questions:

- Does the physical stop dominate the controller, planner, retries, queues, and stored energy?
- What independently measures robot position, human position, force, and payload?
- What happens after a protective stop or restart?
- Can teleoperation bypass the same boundary?
- What evidence establishes the workspace boundary?
- Who owns recovery after contact, collision, dropped load, or jam?
- Which standards and jurisdictional requirements govern the deployment?

The world model is evidence about the world. It is not authority over the world.

No verified state, no motion authority.
No physically dominant brake, no force authority.
CAN ⊬ MAY.
