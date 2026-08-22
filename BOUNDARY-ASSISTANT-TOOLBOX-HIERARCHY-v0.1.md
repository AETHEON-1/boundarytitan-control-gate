# Boundary Assistant Toolbox Hierarchy v0.1

## Status

FROZEN CANDIDATE — IDEATION AND ROUTING CATALOG

This catalog places possible human-protection tools into the repository hierarchy. It is not a product roadmap, market validation, safety certification, or implementation approval.

## Hierarchy position

```text
CONSTITUTIONAL DOCTRINE
        ↓
UNIVERSAL MINIMUM KERNEL
        ↓
ASSISTANT ROLE REGISTRY
        ↓
PRIMITIVE TOOL CAPABILITIES
        ↓
DOMAIN TOOL FAMILIES
        ↓
LANE-SPECIFIC IMPLEMENTATIONS
        ↓
SPECIALIST HANDOFFS
        ↓
CONSEQUENCE RECEIPTS
        ↓
HUMAN DISPOSITION
        ↓
EXTERNAL BRAKE
```

The hierarchy separates what a tool does from who may authorize consequence.

## Universal assistant contract

Every tool must declare:

```text
role_name
precise_job
lane
allowed_inputs
forbidden_inputs
permitted_output
evidence_required
unknowns
consequence_class
owner
specialist_handoff
receipt_schema
freeze_condition
external_brake
```

No tool may self-certify, authorize, close, create an unapproved successor, or treat its own output as final verification.

## Primitive capability layer

The smallest reusable capabilities are:

```text
EXTRACT
SOURCE
COMPARE
CLASSIFY STATE
DETECT CHANGE
DETECT CONTRADICTION
PRESERVE EVIDENCE
PRESERVE UNCERTAINTY
FIND OBLIGATION
FIND PERMISSION
FIND CONSEQUENCE
FIND OWNER
FIND DEPENDENCY
FIND REVERSIBILITY
CLARIFY MEANING
ROUTE HANDOFF
IDENTIFY REMAINING STOP
TEST BOUNDARY
```

New tools should first be tested against this primitive layer. A renamed or recombined primitive is not automatically a new tool class.

## Tool families

### Daily-life assistants

- What Changed?
- Default Finder
- Receipt Builder
- Pause Card
- Meaning Check
- Small-Print Extractor
- Reversibility Meter
- Who Owns This?
- Disagreement Preserver
- Scam Pressure Timer

### Professional assistants

- Trades Scope Drift Detector
- Measurement-to-Quote Checker
- Change-Order Receipt
- Healthcare Consent Translator
- Care-Handoff Receipt
- Legal Obligation Extractor
- Appeal Path Finder
- Financial Promise-versus-Terms Comparator
- Education Citation Custody Tool
- Journalism Source Distance Mapper

### Hobby assistants

- Maker’s Constraint Board
- Canonical Object Checker
- Weather-to-Action Planner
- Music Arrangement Difference Finder
- Collector Provenance Ledger
- Travel Assumption Tester
- Home Repair Triage Assistant

### Truth-seeking assistants

- Claim Freezer
- First Unsupported Arrow Finder
- Evidence Ladder
- Unknown Registry
- Countermodel Builder
- Inverse Exhaustion Tool
- Converse Tester
- Sledgehammer Inspector
- Self-Certification Detector
- Source Contamination Scanner
- Information Exhaustion Monitor

### Innovation and novelty assistants

- Novelty Search Assistant
- Dead-End Mapper
- Constraint Recombiner
- Assumption Inverter
- Adjacent-Possibility Finder
- Unserved-User Detector
- Prior-Art Boundary Finder
- Prototype Boundary Spec
- Impossibility Tester
- Originality Evidence Packet

### Testing assistants

- Requirement Contradiction Scanner
- Fault-Injection Planner
- Boundary Condition Generator
- Degraded-Mode Tester
- Communication-Loss Tester
- Restart and Recovery Tester
- Permission Inheritance Hunter
- Queue and Retry Inspector
- Thermal Margin Tester
- Human-Factors Adversarial Tester
- Specialist Handoff Test Battery
- External Brake Independence Tester

## Domain translation rule

Domain tools are translations of the same primitives. They do not receive broader authority because they operate in a professional domain.

```text
Primitive capability
→ domain vocabulary
→ domain evidence
→ domain specialist
→ domain owner
```

Examples:

```text
FIND OBLIGATION
→ construction change-order detector
→ legal deadline extractor
→ healthcare follow-up finder

FIND REVERSIBILITY
→ payment transfer brake
→ robotics stop-margin check
→ deployment rollback check
```

## Small-model placement

Small models are preferred where the task can remain narrow, inspectable, and locally testable:

- field extraction;
- deadline detection;
- local document comparison;
- contradiction highlighting;
- receipt formatting;
- lane routing;
- evidence packaging;
- sensor anomaly flagging;
- privacy-sensitive offline triage.

Model size does not establish trust. Task scope, evidence, review, and external control establish admissibility.

## Reimagined tool translations

| Existing tool | Boundary Assistant translation |
|---|---|
| Search engine | Evidence Route |
| Calendar | Commitment and Consequence Ledger |
| Inbox | Obligation and Authority Map |
| Browser | Source and Permission Inspector |
| Spreadsheet | Decision Ledger |
| Checklist | State-Transition Gate |
| Dashboard | Uncertainty Surface |
| Chatbot | Clarification Interface |
| Workflow engine | Brake-Aware Handoff System |
| Benchmark | Adversarial Field Test |

## Impossible-element lane

Seemingly impossible ideas remain test prompts, not promises:

- detect the system’s blind spot without self-certifying;
- preserve disagreement without forced consensus;
- find missing evidence rather than only matching words;
- route billions of requests without lane bleed;
- improve human judgment without replacing it;
- make a brake increase usable capability;
- prove the limits of what the system does not know.

Each must be decomposed into bounded claims before implementation.

## Admission test for a new tool

```text
Is the job distinct?
Is the lane explicit?
Is the output bounded?
Are unknowns preserved?
Is evidence named?
Is the owner named?
Is the handoff named?
Is the receipt defined?
Is the external brake real?
Can the assistant be independently verified?
```

If any answer is unknown, the tool remains a proposal or enters human review.

## Kernel

> **The toolbox exists to make the human harder to bypass, not easier to replace.**

Every tool remains subordinate to:

```text
CAN ⊬ MAY
OUTPUT ⊬ AUTHORITY
UNKNOWN ⊬ HARMLESS
LOCAL PASS ⊬ GLOBAL SAFETY
NO LEDGER, NO TRUST
```
