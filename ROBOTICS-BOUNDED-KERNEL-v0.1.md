# BoundaryTitan Robotics Bounded Kernel v0.1

This package implements ten bounded repo surfaces: Authority Manifest, Safety State Machine, External Brake Contract, Motion Ledger, Fault-Injection Harness contracts, Energy/Maintenance Pack, Hand/Contact Pack, Degradation Monitor, Standards Matrix, and Specialist Handoff.

## State

Prototype only. The kernel is read-only and may hold, route, preserve evidence, and prepare specialist review. It never grants motion authority, certifies safety, approves deployment, or controls a live robot.

## Source anchors

- OSHA robotics guidance: https://www.osha.gov/enforcement/directives/std-01-12-002
- OSHA hazardous energy: https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.147
- ISO 10218-2:2025: https://www.iso.org/standard/73934.html
- ISO 13849-1:2023: https://www.iso.org/standard/73481.html
- NIST robotic hand metrics: https://www.nist.gov/video/nist-tests-take-measure-robot-hands

## Invariants

- CAN ⊬ MAY.
- Machine output cannot authorize, certify, or close itself.
- Unknown or untested safety evidence holds motion.
- Empty energy inventories hold when lockout is required.
- Brake evidence requires a passing result, measured latency, test time, and independent verifier.
- Standards review requires a named competent reviewer and review time.
- Energy isolation and restart are separate states.
- The ledger records evidence; it does not create authority.
- Only an external owner may decide what happens next.

## Build boundary

Simulation, evidence preparation, fault injection, and specialist handoff are in scope. Live actuator control, safety certification, OSHA compliance certification, and deployment authorization are out of scope.
