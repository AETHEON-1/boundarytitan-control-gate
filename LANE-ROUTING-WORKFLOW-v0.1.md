# Lane Routing Workflow v0.1

## Rule

`Signal → candidate lane → human lane selection → owner → specialist → external stop`

A lane is a bounded operating context. It is not an owner, approver, permission, or release authority.

## Current lanes

- Control Surface
- Evidence
- Authority
- Permission
- Consequence
- Robotics
- Agent Workcell
- Mathematical Authority
- Journalism
- Visual
- Publication

## Routing states

- `ROUTED_FOR_PREPARATION` — one lane matched and required routing controls are supplied.
- `HUMAN_LANE_SELECTION_REQUIRED` — multiple lanes match, the lane is sealed, or owner/stop information is missing.
- `NO_LANE_MATCH` — no declared lane matches the request.

Routing does not transfer authority, assign ownership, grant permission, or authorize execution.
