# Terminology Encyclopedia Architecture v0.1

## Status

FROZEN CANDIDATE — CROSS-DOMAIN LANGUAGE CONTROL SURFACE

## Purpose

Create a shared vocabulary for consequence-bearing systems so that capability, permission, authority, evidence, action, and consequence cannot disappear behind department-specific language.

This is not an attempt to eliminate specialist vocabulary. Specialists may retain precise technical language. The requirement is that specialist terms map to a shared cross-domain control vocabulary at every authority-bearing transition.

## Central proposition

> **Terminology is infrastructure. If the words do not line up, the authority path cannot be inspected.**

Different departments may describe the same transition as:

```text
execution
deployment
release
activation
commit
publication
dispatch
intervention
```

Those terms may refer to different technical acts, but each must answer the same control questions:

```text
What changed?
What permission was used?
Who authorized it?
What consequence followed?
Who can still stop or reverse it?
```

## Canonical vocabulary

| Canonical term | Minimum meaning | Must not be silently treated as |
|---|---|---|
| Capability | What the system can do under stated conditions | permission or authority |
| Permission | A bounded allowance to perform a specified act | legitimacy or unrestricted access |
| Authority | Recognized power to decide or authorize consequence | mere possession of a tool |
| Evidence | Material supporting a claim within a declared scope | truth in all contexts |
| Claim | A proposition requiring support | established fact |
| Output | What the system produced or reported | action or completed state |
| Action | An operation that changes an object, system, or state | authorization to act |
| State change | A persistent alteration independently established | a statement that it occurred |
| Consequence | An effect borne by a person, system, institution, or environment | an abstract metric only |
| Owner | Named person or institution accountable for the consequence | a lane, model, or dashboard |
| Receipt | Preserved record of request, transition, evidence, uncertainty, and disposition | permission or certification |
| Handoff | Explicit transfer of review responsibility, not automatic authority | approval |
| Brake | External ability to deny, pause, revoke, or stop | an internal preference |
| Unknown | A material unresolved condition | harmlessness or permission |
| Freeze | Controlled containment of further consequential activity | failure closure |
| Verification | Independent examination against declared criteria | self-report |
| Disposition | Human or authorized institutional treatment of a finding | machine-generated conclusion |
| Lane | Bounded operating context | owner or permission |
| Intersection | Declared, scoped interaction between lanes | shared authority |
| Bleed | Unrecorded inheritance of context, permission, or authority across lanes | collaboration |

## Modal vocabulary

These words must remain distinct:

```text
CAN  = capability under stated conditions
MAY  = permission under stated authority
MUST = binding requirement from an identified source
SHOULD = recommendation with stated rationale
WILL = declared future behavior, not evidence of execution
DID  = claimed or evidenced past occurrence; source required
IS   = state claim; evidence and time required
UNKNOWN = unresolved material condition
```

Minimum logical boundary:

```text
CAN ⊬ MAY
MAY ⊬ AUTHORITY
OUTPUT ⊬ DID
REPORT ⊬ STATE CHANGE
STATE CHANGE ⊬ AUTHORIZATION
UNKNOWN ⊬ HARMLESS
```

## Specialist translation rule

Specialist language remains valid when it is mapped to the shared control surface.

```text
Specialist term
→ technical definition
→ canonical cross-domain term
→ evidence requirement
→ owner
→ external brake
```

Example:

```text
“Commit” in software
→ durable repository state change
→ STATE CHANGE
→ commit hash and independent repository observation
→ named maintainer or release owner
→ external rollback or release stop path
```

## Linguistic attack surface

The terminology system must test for:

- capability presented as permission;
- recommendation presented as decision;
- confidence presented as evidence;
- output presented as completed action;
- routing presented as ownership;
- escalation presented as containment;
- monitoring presented as control;
- persistence presented as truth;
- human-like voice presented as understanding;
- silence presented as consent;
- default presented as neutral;
- specialist jargon used to hide a transition from other owners;
- “temporary” exceptions with no expiry;
- “internal” controls described as external brakes;
- “reviewed” described as independently verified;
- “green” described as approved.

## Cross-department synchronization

The global synchronization target is not identical wording. It is identical visibility of the authority path.

Every department must be able to answer the same seven questions:

```text
1. What is the system capable of?
2. What is it permitted to do?
3. Who granted that permission?
4. What evidence supports the transition?
5. Who owns the consequence?
6. What remains unknown?
7. Who can still stop it?
```

## Anti-hiding rule

Specialist language must not be used as a camouflage layer.

If a term cannot be translated into the shared vocabulary, the term remains `UNRESOLVED` for cross-lane use. No consequential transition proceeds merely because the terminology is familiar inside one department.

## Hacker-resistance objective

Attackers benefit when departments cannot see that their systems are connected. A synchronized vocabulary reduces the hiding space between:

```text
security
→ infrastructure
→ identity
→ legal
→ finance
→ operations
→ safety
→ human consequence
```

The objective is not to make every person a specialist. It is to make the authority-bearing transition legible enough that a specialist cannot hide it from the people who own the consequence or control the brake.

## Encyclopedia entry schema

Every canonical term should carry:

```text
term_id
preferred_term
definition
domain_aliases
forbidden_collapses
examples
counterexamples
evidence_required
authority_effect
consequence_owner
specialist_owner
external_brake
known_ambiguities
reopening_condition
version
```

## Kernel

> **If the language hides the arrow, the system hides the authority.**

The machine may translate specialist language, identify ambiguity, and expose authority laundering. It may not declare the shared vocabulary complete or use linguistic synchronization as permission to act.

**Global terms. Local expertise. Visible arrows. External brake.**
