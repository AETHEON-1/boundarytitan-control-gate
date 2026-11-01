# BT-REV-001 | Cross-domain specialist entry point

**State:** REVIEW ONLY / NONCANONICAL / NOT EXECUTED.  
**Frozen kernel:** CAN ⊬ MAY.  
**Human disposition:** PENDING.  
**Execution authorized:** false. **Publication authorized:** false.

## Start here
- [BT-REV-001 specialist battery](BT-REV-001-specialist-battery-v0.1.md): 20 negative-control scenarios R01–R20; six compound scenarios X01–X06; status and evidence contract.
- [Cross-PR composition routing, issue #131](https://github.com/AETHEON-1/boundarytitan-control-gate/issues/131): dependency graph and review-only specialist entry.
- [Integrity Sentinel specialist handoff, draft PR #130](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/130): related repository-control-plane tests. Reuse existing Sentinel; do not duplicate workflows.

## Human Translation Key
Removing a tool, turning off a credential, stopping a machine, freezing an account, or denying a request does not prove that previously created access or consequences have disappeared. Test the stop and what survives it separately.

## Cross-domain reviewer routing
| Domain | Recommended reviewers | Initial test IDs | Distinctive consequence |
|---|---|---|---|
| Cybersecurity / identity | Identity engineers, incident responders | R01–R04, R18; X01 | Residual keys, credentials, service persistence |
| Agent runtime / automation | Agent and queue architects | R05–R07; X02 | Queued/replayed/delegated actions |
| Repository / CI | GitHub Actions and policy specialists | R08–R10; X03 | Stale approval, bypassed merge denial |
| Finance / markets | Billing, settlement and risk specialists | R11–R12, R16; X02 | Spend and unsettled obligations |
| Government / public infrastructure | Procurement, continuity and recovery reviewers | R13–R14; X04 | Privileged removal versus recovery loss |
| Energy / grid | Utility regulation, dispatch and reliability specialists | R15; X05 | Load and cost effects after denial |
| Robotics / physical safety | Controls and safety engineers | R17–R18; X05 | Buffered motion, stored energy, restart |
| Science / journalism / evaluation | Independent verification and source-lineage reviewers | R19–R20; X06 | Cached authority, repeated roots, missing falsifiers |

## Required specialist deliverable
For each attempted scenario, provide: exact declared boundary, source roots and SHA/version, event/disclosure/observation timestamps, preconditions, positive and negative controls, revoked grant, attempted successor, actual execution, downstream effect, independent observer, first unsupported arrow, rival explanations, contradiction, falsifier, affected humans, consequence owner, external stop owner, coverage numerator/denominator, status, omissions and independently repeatable next test.

**Status options:** DENIED_OBSERVED / SURVIVED_OBSERVED / RESIDUAL_CONSEQUENCE_OBSERVED / CONTRADICTED / INDETERMINATE / TEST_INVALID / NOT_TESTED.

A synthetic result is not production evidence. A source advisory is not proof of a deployment exposure. A passed test is not an authority grant. Failure to observe is not proof of absence.

## Specialist custody and stop path
Specialists are invited to review, challenge and propose reproducible tests. They are **not assigned**, and this handoff does not authorize live probing, credential use, spending, customer data access, physical actuation, policy changes, merging, release, or deployment. Any consequence-bearing test requires a separately approved scope and an independent stop. Independent reviewers and the human owner may reject or reopen any proposed result.

## Preservation / provenance
Keep prior failures, contradiction records, and source-retrieval gaps. Prior Open-World leads on grid/AI capex, Node.js/PHP, Copilot permissions, and frontier training containment remain source-verification questions. Chaos records are **CANDIDATES**, not canonical admissions. This branch is an additive documentation transfer; no code, workflow or existing frozen doctrine is changed.

## Completion / non-claims
**Prepared and made available for review** is not **tested**, **independently verified**, **accepted**, **merged**, **published**, or **deployed**. Report each transition separately.

**Sigma line:** Stopping the command does not prove the consequence stopped. CAN ⊬ MAY. ⚒️
