# Bounded Case Study Index v0.1

Status: PREPARED
Index type: AUTHORITY-ARROW / EVIDENCE-BOUNDARY INDEX
Execution: STRUCTURAL ONLY
Independent review: NOT PERFORMED
Field validation: NOT APPROVED
Deployment: NOT APPROVED

This index maps bounded cases to the exact claim, evidence boundary, authority arrow, failure modes, owners, stop paths, and unresolved questions under examination.

It is not an incident scoreboard, safety score, certification register, or closure mechanism.

## Index entries

| ID | Case | Primary arrow | Current disposition |
|---|---|---|---|
| BT-BCS-001 | AISI cyber-evaluation incident | Test authorization -> bounded behavior | CONTRADICTED |
| BT-BCS-002 | Runtime control establishment | Policy result -> enforced execution | NOT ESTABLISHED |
| BT-BCS-003 | Test-boundary control | Test environment -> consequence isolation | REQUIRES INDEPENDENT REVIEW |
| BT-BCS-004 | Intent-governed authorization | User intent -> permitted tool action | OPEN |
| BT-BCS-005 | Authorization propagation | Parent authority -> child-agent authority | OPEN |
| BT-BCS-006 | Revocation dominance | Revocation -> descendant cessation | NOT TESTED |
| BT-BCS-007 | End-to-end transparency | Event record -> reconstructable chain | STRUCTURAL ONLY |
| BT-BCS-008 | Sigma-1 optimization | Optimization -> improved preparation | IMPLEMENTED STRUCTURALLY |
| BT-BCS-009 | Human review boundary | Human presence -> effective human control | OPEN |
| BT-BCS-010 | Receipt boundary | Evidence receipt -> permission | EXPLICITLY REJECTED |
| BT-BCS-011 | Unsupported-arrow visual finder | Scan result -> bounded omission evidence | STRUCTURAL ONLY |
| BT-BCS-012 | Machine self-evaluation | Test output -> evaluation authority | EXPLICITLY REJECTED |

## Required case fields

Every case record should preserve:

- case_id;
- title;
- date opened;
- primary lane;
- trigger;
- exact claim;
- documented record;
- bounded inference;
- open questions;
- evidence IDs;
- source class;
- primary authority arrow;
- upstream arrow;
- downstream arrow;
- first unsupported arrow;
- failure modes;
- affected surface;
- consequence owner;
- decision owner;
- external stop authority;
- independent evaluator;
- reversibility;
- containment latency;
- revocation state;
- ledger event IDs;
- correction state;
- reopening state;
- current disposition;
- field-validation state;
- deployment state;
- last reviewed.

## Required case questions

- What was claimed?
- What evidence supports it?
- What arrow was tested?
- Where did support end?
- Who owns the consequence?
- Who can still say no?
- What remains unknown?

## Permitted states

DOCUMENTED  
INFERRED  
CONTRADICTED  
INDETERMINATE  
NOT TESTED  
REQUIRES HUMAN DISPOSITION  
CLOSED  
REOPENED

## Prohibited states

PASS  
SAFE  
CERTIFIED  
COMPLETE  
APPROVED

## External grounding

The index design is informed by public incident-indexing and taxonomy work, including the AI Incident Database, MIT AI Incident Tracker, NIST AI incident-management work, and the CSET incident-reporting framework.

These sources inform structure only. They do not validate BoundaryTitan cases or dispositions.

## Boundary

The index maps where authority was claimed, where evidence ended, and whether a real brake was identified.

It cannot establish universal preparation exhaustion, runtime control, safety, legitimacy, or closure.

No owner, no brake. No ledger, no trust.
Only Green proceeds.
