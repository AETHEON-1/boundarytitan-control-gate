# Thermodynamic Regulation Method v0.1

## Status

FROZEN CANDIDATE — DEVELOPMENT METHOD ONLY

This method is a control specification for systems that consume energy, generate heat, store pressure, or otherwise approach physical operating limits. It is not a thermodynamic proof, safety certification, or deployment approval.

## Purpose

Keep a consequence-bearing machine inside a measured physical envelope by regulating energy and heat before the system reaches an irreversible or unsafe state.

The controller does not ask only whether the machine can continue. It asks whether continuation preserves enough margin for detection, communication, braking, shutdown, recovery, and human intervention.

## Minimum measured state

```text
E        = available energy
P        = instantaneous power draw
T        = measured temperature field
dT/dt    = thermal rate of change
R        = reserve required for safe stop and recovery
L_stop   = worst-case time to reach safe stopped state
J_sensor = bounded sensor uncertainty
H        = heat rejection capacity under current conditions
F        = fault state and degraded-sensor state
```

The system must not infer safety from a single temperature or battery reading. A missing, stale, contradictory, or out-of-range measurement is a control fault.

## Regulation envelope

```text
E_safe  = E − R
T_safe  = T_limit − J_sensor − T_stop_margin
Q_net   = heat_generated − heat_rejected
```

Continuation requires all of the following:

```text
E ≥ R
T + J_sensor < T_limit − T_stop_margin
dT/dt is bounded
Q_net is acceptable for the declared horizon
sensor freshness and agreement are valid
external stop path is available
```

If any condition is unknown, the system does not treat the condition as safe. It freezes or degrades to a lower-energy state.

## Control states

| State | Meaning | Permitted response |
|---|---|---|
| `GREEN` | Measured margins are within declared bounds | Bounded operation |
| `AMBER` | Margin is shrinking, uncertain, or approaching threshold | Reduce load, increase sampling, prepare stop |
| `RED` | Limit crossed, stop margin lost, or evidence invalid | Freeze consequential action and enter safe stop |
| `BLACK` | Control authority, sensor custody, or stop path is unavailable | Remove energy/authority through external mechanism |

State transitions are monotonic toward lower energy when the evidence is degraded. Recovery requires new evidence and external release; automatic optimism is prohibited.

## Regulation loop

```text
MEASURE
  → CHECK SENSOR CUSTODY
  → ESTIMATE MARGIN
  → CHECK RATE AND HORIZON
  → SELECT LOWER-ENERGY ACTION
  → VERIFY RESPONSE
  → EMIT CONSEQUENCE RECEIPT
  → REPEAT
```

The controller may reduce speed, duty cycle, torque, load, charging rate, compute, or task scope. It may not silently expand the operating envelope to preserve throughput.

## Thermodynamic brake rule

```text
If predicted margin at stop time ≤ 0
or sensor validity is unknown
or heat rejection is unavailable
or reserve is insufficient:

    freeze new consequential work
    reduce energy input
    initiate safe stop
    preserve state and evidence
    notify the consequence owner
    await external release
```

The brake must be capable of acting without the cooperation of the optimizer or agent it is stopping.

## Hysteresis and restart

No restart occurs merely because a reading falls below a threshold. Restart requires:

1. measured recovery margin;
2. verified sensor freshness and agreement;
3. confirmed heat rejection and energy reserve;
4. cleared fault and authority ledger;
5. named human owner;
6. explicit external release.

Separate trip and reset thresholds are required to prevent thermal or power oscillation around a boundary.

## Consequence receipt

Every threshold crossing, degraded mode, stop attempt, and restart request emits a receipt containing:

```text
timestamp and clock uncertainty
energy, power, temperature, rate, and reserve values
sensor identities, freshness, and disagreement
declared limit and margin calculation
load-reduction or stop command
physical response observed
unverified assumptions
owner and specialist handoff
external brake status
restart authority, if any
```

The receipt records what the controller observed and attempted. It does not certify that the physical system stopped unless independent evidence establishes that fact.

## Thermodynamic Sigma-2 interrogation

- Is the displayed temperature the temperature that matters?
- What heat is hidden in the mass, enclosure, battery, motor, or environment?
- What default load, retry, queue, or background process continues after “pause”?
- What energy remains after the command to stop?
- Can stored energy produce consequence after software shutdown?
- Who owns the physical consequence?
- Who can cut energy outside the controller?
- Where is the receipt proving the stop actually occurred?

## Limits and open questions

This method does not establish material limits, sensor placement, thermal models, stopping times, electrical isolation, pressure relief, fire protection, or compliance with applicable standards. Those require domain-specific engineering, testing, and qualified human approval.

## Kernel

> **Regulate the margin, not merely the temperature. Freeze before the physical boundary becomes the receipt.**

Constraint precedes capability. No owner, no brake. No ledger, no trust.
