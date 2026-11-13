# BoundaryTitan CR-1: Friction

**Record type:** Engineering project record  
**Disposition:** HUMAN-APPROVED PROJECT RECORD (2026-11-12)  
**Project status:** CONCEPTUAL DEVELOPMENT  
**Repository publication:** Human-authorized; publication does not establish validation.  
**Authority:** Human owner retains acquisition, physical testing, deployment, and closure decisions.  
**Kernel:** CAN ⊬ MAY. ⚒️

## 1. Purpose and scope

Develop a compact raccoon-inspired robotic platform for practical physical assistance, while investigating whether useful machine autonomy can be constrained by independently enforced authorization and physical stop mechanisms. This is a proposed engineering experiment, not a claim of achieved safety or a deployed autonomous system.

**Candidate use cases:** workshop inspection; supervised navigation; lightweight tool retrieval; bounded object manipulation; demonstration of independently enforceable stop behavior.

**Out of scope without separate authorization:** physical deployment; autonomous interaction with people or hazardous machinery; unsupervised tool use; access to privileged systems; purchases; self-certification of safety.

## 2. Proposed system architecture

```text
Named Human Owner / Authorized Operator
                 |
       Scoped Task Authorization
                 |
        AI Compute Subsystem
    Perception / Planning / Proposal
                 |
          Motion Request
                 v
      Authorization Enforcement
     (scope, freshness, expiry)
                 |
    Independent Safety Controller
  (interlocks, faults, stop input)
                 |
     Safety-rated Power Isolation*
                 |
      Motor Drivers / Actuators
                 |
         Physical Consequence

  Hardwired Human Stop ------> Independent Safety Chain
  Independent Evidence ------> Human Review / Decision
```

*Safety-rated components and architecture are requirements to evaluate, not presently selected, implemented, or certified. The authorization enforcement and safety functions may require separate mechanisms. A separate microcontroller alone does not establish independence.*

### Boundary invariants

- Capability to issue a command does not constitute permission to execute it.
- Task authorization, physical permissibility, and safety interlocks are distinct checks.
- The AI must not control the sole stop path, bypass its interlocks, or approve its own exceptions.
- Revocation is effective only if measured worst-case stop latency precedes the relevant consequence threshold: **L_revocation < T_consequence**.
- A recorded stop request does not prove physical cessation; actuator energy and motion must be independently observed.
- No owner, no brake. No ledger, no trust. Only Green proceeds.

## 3. Proposed engineering specifications (unverified targets)

| Subsystem | Proposed target | Qualification |
|---|---|---|
| Form | Raccoon-scale quadruped | Morphology trade study required |
| Mass | 6.2–7.8 kg | Budget not validated |
| Envelope | Approx. 550 × 280 × 220 mm | Packaging/kinematics unverified |
| Structure | 6061-T6 aluminum and carbon fiber | Fabrication and strength unverified |
| Forepaws | Five-digit articulated manipulators | Dexterity, force and actuator sizing unresolved |
| Hind legs | Four degrees of freedom, BLDC actuation | Joint definition and gait feasibility unresolved |
| Main compute | NVIDIA Jetson Orin family | Variant, power, thermal budget unresolved |
| Independent controller | STM32H7 candidate | Independence and safety suitability unproven |
| Vision | Stereo depth cameras | Range, calibration, failure modes untested |
| Additional sensing | MEMS microphone array, thermal, IMU, tactile force, joint encoders | Sensor fusion and fault detection untested |
| Power | Nominal 22.2 V battery architecture | Chemistry, BMS, current, runtime, isolation unresolved |
| Internal communication | CAN-FD candidate | Authentication, fault handling, bus failure unresolved |
| Stop mechanism | Hardwired human stop with independent actuator power isolation | Circuit, response time, and residual energy untested |

**Provenance note:** These are previously discussed conceptual targets carried into a project record, not verified measurements, purchased parts, approved procurement, or a complete bill of materials. No mechanical drawing, wiring schematic, simulation, or prototype evidence is attached to this record.

## 4. Safety and authority boundaries

### A. Human authorization

A named human owner sets permitted tasks, operating area, duration, operating modes, and conditions. Permissions must be scoped, expire, and be revocable. Machine-generated plans cannot broaden permissions.

### B. Independent physical stop

Evaluate a hardwired stop chain capable of removing hazardous actuator drive without cooperation from AI compute, network connectivity, or ordinary motion-control software. Assess whether braking, mechanical support, and stored energy create residual hazards after power isolation. Do not presume that simply cutting power always produces a safe state.

### C. Separation of safety and authorization

A safety controller may reject unsafe motions, but that does not confer human authorization. Conversely, an authorized task must still fail closed when required safety conditions are not met. The enforcement path must demonstrate both conditions before consequence-bearing movement.

### D. No self-certification

AI may generate plans, diagnostics, test cases, and candidate evidence. It may not certify boundedness, accept residual risk, sign off on a safety case, or authorize deployment. Independent measurements and named human review are required.

### E. Data and cybersecurity

Restrict credentials and tool access; isolate remote command surfaces; authenticate control messages as appropriate; log command provenance; test replay, stale authorization, compromised compute, malicious firmware, bus injection, and failover behavior. Logs are forensic evidence, not substitutes for preventive enforcement.

## 5. Development status and evidence register

| Workstream | Current evidence state | Disposition |
|---|---|---|
| Project identity and mission | Concept established in prior design discussions | Human-approved record |
| System architecture | Conceptual separation proposed | Not independently reviewed |
| Mechanical specifications | Candidate targets recorded | Unverified |
| Electrical/power design | Component families and voltage target proposed | No verified schematic |
| Software architecture | AI proposal and bounded execution concept | No verified implementation |
| Human authorization gate | Requirement defined | No implementation/test evidence |
| Independent stop path | Requirement defined | No physical validation |
| Prototype assembly | No confirmed build evidence in reviewed context | Unknown / not established |
| Purchases and BOM | No confirmed acquisition record | Unknown / not established |
| Simulation | No reproducible results attached | Not established |
| Independent adversarial review | No signed review receipt attached | Open |
| Field testing / deployment | Not approved in available project context | NOT AUTHORIZED |
| Repository publication | Human owner explicitly approved | AUTHORIZED |

**Evidence rule:** Absence of a record here is not proof that work never occurred. Any new claim should be accompanied by source, date, version, test conditions, measurements, reviewer, and unresolved discrepancies.

## 6. Outstanding validation requirements

| ID | Requirement | Proposed evidence / acceptance question |
|---|---|---|
| CR1-V01 | Mechanical feasibility | CAD, mass properties, structural load cases, reachable workspace, stability envelope |
| CR1-V02 | Power and thermal feasibility | Peak/continuous load, runtime, thermal characterization, battery fault analysis |
| CR1-V03 | Manipulation feasibility | Payload, grip force, pinch hazards, repeatability, failure recovery |
| CR1-V04 | Locomotion feasibility | Gait stability, fall modes, terrain limits, speed/energy measurements |
| CR1-V05 | Human authorization enforcement | Test expired, revoked, malformed, replayed, and out-of-scope task commands |
| CR1-V06 | Stop-path independence | Demonstrate stop with AI compute hung, malicious, disconnected, or rebooting |
| CR1-V07 | Worst-case stop latency | Independent timestamps from stop initiation to loss of hazardous motion; compare with consequence horizon |
| CR1-V08 | Residual energy and restart | Verify stored energy, gravity loads, coasting, driver faults, and restart inhibit behavior |
| CR1-V09 | Cybersecurity isolation | Threat model and bounded adversarial tests for bus, firmware, network, credentials, update paths |
| CR1-V10 | Evidence provenance | Reproducible manifests, instrument calibration, raw traces, immutable run identifiers |
| CR1-V11 | Independent review | External reviewer challenges evidence, bypass paths, failure cases, and claims |
| CR1-V12 | Human acceptance | Named owner signs scope-specific decision; no machine-authored acceptance |

These are **candidate validation requirements**, not passed tests or finalized acceptance criteria. Test execution requires a separately approved protocol and safe test environment.

## 7. Priority adversarial failure modes

1. AI compute bypasses a nominal safety gate through another actuator or maintenance interface.
2. Stop command is logged but physical motion continues because of stored energy, gravity, brake release, or driver behavior.
3. Stale or replayed permission remains usable after revocation.
4. Firmware update, debug port, or maintenance credential silently creates a successor authority path.
5. Sensor error causes motion beyond the authorized envelope before a safety system detects it.
6. A separate safety microcontroller shares power, firmware, reset, or wiring dependencies that defeat claimed independence.
7. An authorized task composes with another authorized task into an unauthorized consequence path.
8. Independent reviewer sees only curated traces generated by the same subsystem under test.

**First unsupported arrow to test:** AI motion proposal → executable actuator command, including alternate paths and queued commands.

## 8. Proposed next artifacts (not yet approved for execution)

- Versioned requirements and traceability matrix.
- Mechanical concept and mass/power/thermal budget.
- Electrical block diagram with stop-chain fault tree.
- Authorization and revocation state machine.
- Threat model and consequence-path inventory.
- Observation-only test plan with independent instrumentation.
- Test evidence schema, failure register, and consequence receipt template.
- Human review and go/no-go decision record.

## 9. Change control and disposition

This is a **human-approved project record for repository publication**, not an approval of physical implementation. It does not modify frozen BoundaryTitan doctrine, establish novelty, demonstrate physical safety, approve spending, or authorize field work. Preserve corrections as versioned changes with source and reviewer attribution.

**Project record review state:** APPROVED FOR PUBLICATION  
**Engineering validation:** NOT ESTABLISHED  
**Deployment authority:** NOT GRANTED

> The robot may learn to use tools. It may not grant itself permission to use them.
>
> **CAN ⊬ MAY. ⚒️**
