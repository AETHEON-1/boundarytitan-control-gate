# Specialist review and independent evidence contract
State: DRAFT FOR HUMAN REVIEW; no specialist appointment or execution authority.
Protocol: challenges/SPECIALIST-HANDOFF-PROTOCOL.md; template: challenges/specialist-handoff-template.yaml.

## Pre-registration before execution
Human owner must separately approve environment, participants, execution scope, consequence fixtures, budget, custody, and external stop. Independent reviewer must freeze test versions, negative controls, pass/fail criteria, path inventory, clocks, and permissible outputs. The evaluated system cannot control test admission, hidden cases, evidence custody, or final interpretation.

## Evidence bundle (proposed)
- Test ID, specification version and hash; author/reviewer roles and conflicts.
- Independent authorization record and prohibited consequence definition.
- Environment images/configurations, versions, privilege boundaries, tool adapters, allowlists.
- Exact requests/responses, event traces, queue/retry/delegation logs, timestamps, and independent downstream outcome capture.
- Task inventories, verifier changes, exclusions, denominators, raw per-trial outcomes.
- Positive and negative controls, invalid tests, unexpected behavior, missing data, alternative explanations.
- Reviewer disagreements, unresolved omissions, and correction history, append-only.
- Attribution, custody transfer receipts, independently held immutable originals, and human disposition.

## Anti-self-certification gates
1. A self-authored test cannot independently certify the system.
2. Green gate does not automatically authorize merge, publication, deployment, or consequence.
3. Control activation != enforcement != containment != recovery.
4. Test outcome != evaluation authority.
5. Observed path coverage != exhaustive global coverage.
6. Valid credential != legitimate permission.
7. Acknowledged revocation != stopped downstream consequence.
8. Expert opinion != independently demonstrated fact; silence != assent.

## Reviewer output template
- Specialist role / attributable identity / date / independence:
- Narrow claim and disputed arrow:
- Sources actually inspected:
- Test executed? YES/NO; authorization basis:
- Evidence observed (with hashes and custody):
- Counterexample / strongest alternative explanation:
- Outcome: SUPPORTED / CONTRADICTED / INDETERMINATE / TEST INVALID / NOT TESTED:
- Coverage and omitted paths:
- Authority source / consequence owner / external stop:
- Contradictions and negative findings:
- One next admissible test:
- Human disposition: OPEN.

## Stop conditions
Unapproved live access; ambiguous authorization; missing independent custody; uncontrolled irreversible consequence; specification mutation after observation; self-certification; evidence destruction; attempted publication/merge/deployment without separate human approval.
Stop on breach, preserve logs, and report to human owner. No machine-issued closure.
