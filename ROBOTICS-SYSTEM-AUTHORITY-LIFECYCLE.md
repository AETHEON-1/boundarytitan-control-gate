# Robotics System Authority and Lifecycle Record

Status: declaration-only preparation artifact.

This object closes a missing layer between the robot and the motion proposal. It records the integrated system, not only the model or controller.

It covers:

- System classification and jurisdiction
- Lifecycle stage
- Workcell integration
- Controllers, end effectors, sensors, safety controllers, networks, and adjacent machines
- Operating modes
- Human authority roles
- Hazardous-energy controls
- Group lockout state
- Ground truth and independent measurement
- Communication surfaces
- Stop, recovery, and decommissioning references
- Open questions and uncertainty

The assessment returns HOLD when required structure or evidence is missing. A complete record returns HUMAN_REVIEW_REQUIRED, never approval or compliance.

External anchors:

- OSHA states that robotics has no single robotics-specific OSHA standard; applicable requirements must be mapped across relevant provisions.
- OSHA hazardous-energy controls include isolation, stored-energy control, verification, and restoration procedures.
- ISO 10218-2:2025 addresses industrial robot application and cell integration across design, commissioning, operation, maintenance, decommissioning, and disposal.
- NIST robotics programs treat ground truth, communication, situational awareness, performance measurement, and test methods as separate evidence problems.

This artifact does not determine legal compliance, safety certification, motion authority, or field readiness.

Open questions remain:

- Is this system within the selected standard's scope?
- Which requirements are excluded and why?
- Does the stop path dominate the integrated system?
- Is group lockout protection independently verified for every protected worker?
- Does ground truth remain independent of the model?
- What happens during communication loss, restart, recovery, or decommissioning?
- Who can still say no at each lifecycle stage?

No verified state, no motion authority.
No controlled energy, no maintenance authority.
No owner, no brake.
CAN does not entail MAY.
