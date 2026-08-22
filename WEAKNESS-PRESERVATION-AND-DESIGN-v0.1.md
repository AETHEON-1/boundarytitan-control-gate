# Weakness Preservation and Design v0.1

## Status

FROZEN CANDIDATE — WEAKNESS-FIRST CONTROL RULE

## Principle

> **Preserve weaknesses. Build around them.**

A weakness is not removed from the system merely because it is documented, explained, patched locally, or hidden behind a successful demonstration.

## Weakness record

Every known weakness must retain:

```text
weakness_id
description
affected_scope
first_unsupported_arrow
failure_conditions
evidence
unknowns
consequence
owner
specialist
containment
external_brake
reopening_condition
```

## Design response

```text
Weakness found
→ preserve the record
→ identify the affected boundary
→ reduce access or consequence exposure
→ add detection
→ add containment
→ add independent verification
→ assign owner and specialist
→ define external stop
→ retest under attack
```

The design must not depend on the weakness disappearing.

## Weakness classes

- **Known limitation:** declared inability or scope boundary.
- **Evidence gap:** required support is missing or inaccessible.
- **Uncertainty:** material state cannot currently be established.
- **Drift:** the system no longer matches its declared baseline.
- **Composition failure:** individually bounded parts become unsafe together.
- **Human-factor weakness:** fatigue, ambiguity, pressure, or misunderstanding creates risk.
- **Physical weakness:** energy, heat, inertia, access, or stop latency remains.
- **Authority weakness:** permission, ownership, or denial path is unclear.
- **Language weakness:** terminology hides the transition or consequence.
- **Maintenance weakness:** the boundary decays over time.

## Anti-cosmetic rule

The following do not erase a weakness by themselves:

```text
documentation
confidence
successful demo
local test
green status
model scale
specialist jargon
human presence
monitoring
logging
explanation
```

They may provide evidence about the weakness. They do not automatically resolve it.

## Weakness-to-control mapping

| Weakness | Design response |
|---|---|
| Unknown state | Preserve uncertainty; narrow or freeze |
| Missing owner | No consequence-bearing release |
| Missing receipt | No closure |
| Ambiguous language | Clarification gate |
| Hidden access | Permission and dependency inspection |
| Lane bleed | Explicit intersection and handoff |
| Self-verification | Independent verifier |
| Brake bypass | External isolation and adversarial test |
| Stale permission | Expiry, revocation, and restart revalidation |
| Physical residue | Energy isolation and measured stop verification |
| Institutional pressure | Named veto, appeal, and escalation path |

## Architectural consequence

The system is not optimized to appear flawless. It is optimized to make weakness:

```text
visible
measurable
owned
containable
reviewable
reversible where possible
externally stoppable
```

## Kernel

> **A weakness that cannot be seen cannot be controlled. A weakness that cannot be stopped cannot be safely delegated.**

Preserving weaknesses does not mean accepting harm. It means refusing to build a control surface that depends on pretending the weakness is gone.

**No weakness erased by language. No weakness hidden by defaults. No weakness closed by self-certification.**
