# FR-001 claim and falsifier register
Disposition vocabulary: SUPPORTED / CONTRADICTED / INDETERMINATE / TEST_INVALID / NOT_TESTED. SUPPORTED is scoped to evidence, not certification.

| ID | Claim to attack | Smallest falsifier | Required evidence | Initial disposition |
|---|---|---|---|---|
| FR-C01 | Revocation prevents any subsequent commanded displacement | One command applied after revocation without a new matching grant | Monotonic event IDs, authorization epoch, measured actuator state, independent clock bounds | NOT_TESTED physically |
| FR-C02 | External enable is outside acting-process control | Actor or alternate writer re-enables power without external authority | Wiring/block diagrams, privilege analysis, fault injection, independent state sensing | NOT_TESTED |
| FR-C03 | Electrical disable contains physical consequence | Motion, falling payload, or harmful energy release after disable | Energy inventory, load cases, brake curves, displacement/force observations | CONTRADICTED as universal inference by countermodels; NOT_TESTED physically |
| FR-C04 | Restart never restores residual authority | Stale queue, token, relay or power stage resumes without fresh grant | Boot sequence, persistent-state dump, controller and actuator logs | NOT_TESTED |
| FR-C05 | Power loss results in controlled consequence | Gravity, momentum or stored energy causes uncontrolled outcome | Power-loss timing, mechanical brake test, worst-case load | NOT_TESTED |
| FR-C06 | Communication loss makes external NO stick | Continued command execution during partition beyond authorized envelope | Network partition traces, watchdog state, stop-state sensor | NOT_TESTED |
| FR-C07 | Recorder is independent of acting controller | Acting controller can suppress, forge or reorder movement without detectable gap | Independent sensor trace, custody, event sequence, clock uncertainty, tamper evidence | NOT_TESTED |
| FR-C08 | All motion paths cross one enforcement boundary | Alternate firmware, maintenance port, relay, driver or manual path changes state | Complete interface and energy-path inventory, red-team bypass test | NOT_TESTED |
| FR-C09 | Scope binds grant to one task, device and workspace | Valid grant reused on other device, task or area | Grant schema, replay corpus, identity and revocation evidence | NOT_TESTED |
| FR-C10 | Human denial is operationally effective | Human says NO but motion continues due to timing, interface or inaccessible stop | Human-factors drills, measured latency, independent stop outcome | NOT_TESTED |
| FR-C11 | Fault detection and shutdown remain valid under single faults | Welded contact, sensor short, common-mode power fault defeats claimed stop | FMEA/FTA, diagnostic coverage evidence, physical topology | NOT_TESTED |
| FR-C12 | Recovery cannot silently recreate consequence | Recovery operation drops load, replays queue or erases provenance | Recovery test trace, independent physical observation, lineage | NOT_TESTED |

Do not collapse distinct outcomes: torque inhibited, motion halted, payload retained, harm avoided, permission valid, and evidence complete are separate claims.

## Smallest candidate kernels
K-A: Every consequence-bearing actuation path has externally enforceable denial.
K-B: Grant validity is scoped, non-replayable and evaluated at the consequence transition.
K-C: Energy and mechanical consequences remain bounded after denial.
K-D: Independent measurement and evidence custody expose disagreement and missing events.
K-E: A named human authority can reject, revoke and withhold release before consequence.

These are **candidate engineering requirements**, not logically derived from CAN ⊬ MAY alone, not certified properties, and not deployment approval.
