# Specialist handoff matrix
No specialist is designated as sole authority for system-level acceptance. Each must report assumptions, counterexamples, uncertainty and what would reverse their conclusion.

| Discipline | Claims | Primary adversarial question | Test deliverable | Boundary |
|---|---|---|---|---|
| Functional safety / machinery safety | C01 C02 C11 | Does the proposed stop function survive realistic single faults and common cause failures? | Hazard analysis, safety function allocation, applicable standards mapping, diagnostic gaps | Component rating is not system certification |
| Electrical / power electronics | C02 C05 C11 | Can welded contacts, regeneration, backfeed or shared power preserve hazardous energy? | Energy-flow diagram, fault tree, voltage/current/latency measurements proposed | No live-power testing authorized |
| Mechanical / brakes / dynamics | C03 C05 C12 | Does disabling torque permit drop, drift, coast or release of stored force? | Worst-case load and energy budget, brake failure modes, measurement plan | A motor stop is not load retention |
| Robotics / motion control | C01 C04 C08 C09 | Can a queued or alternate-path command move after grant invalidation? | Transition graph, interface inventory, reproducible schedule cases | Software eligibility is not permission |
| Embedded / real-time | C01 C04 C06 C11 | Where are the non-atomic windows across interrupt, restart and watchdog transitions? | Timing bounds, reset state diagram, race witnesses | Nominal loop timing is insufficient |
| Cybersecurity / IAM | C02 C04 C08 C09 | Can actor compromise forge grant, replay token or bypass enforcement? | Threat model, trust-boundary map, negative tests | No red-team exploit authorizes deployment |
| Metrology / evidence / forensics | C01 C03 C07 | Can independent sensors distinguish actual movement from asserted logs? | Sensor calibration, event schema, custody, gap and ordering checks | Cryptographic log alone does not observe reality |
| Human factors / operations | C06 C10 C12 | Can a real operator understand, reach and exercise NO before consequence? | Human task analysis, response-time and accessibility protocol | Human-in-loop is not necessarily a brake |
| Occupational safety / site engineering | C03 C05 C10 C11 | What is the hazard boundary for bystanders, maintenance and recovery? | Hazard register, energy isolation review, site ownership map | Standards applicability needs competent review |
| Legal / insurance / accountability | C07 C10 C12 | Who owns consequence, evidence preservation, notification and recourse? | Jurisdiction-qualified duty map and unresolved legal questions | Not a legal opinion |
| Independent adversarial reviewer | C01–C12 | Which test is circular, unobservable, or assumes the conclusion? | Countermodel register and test-invalid dispositions | Cannot self-certify own review |

## Review order and dependencies
1. Robotics + electrical + mechanical produce a complete execution/energy topology (or list explicit omissions).
2. Functional safety + embedded + security attack every enforcement arrow.
3. Metrology independently specifies consequence observation and provenance.
4. Human factors + occupational safety test the real external stop and affected people.
5. Legal/accountability maps duty and recourse, without replacing technical evidence.
6. Independent reviewer attacks the method, including whether K-A through K-E are sufficient or redundant.

Disagreement stays visible. Missing evidence never becomes an assumed PASS.
