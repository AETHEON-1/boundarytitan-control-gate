# 19 — Traceability Ledger

## Required columns

- requirement_id
- doctrine_statement
- source_class
- source_url
- source_excerpt_reference
- architecture_section
- software_rule
- data_entity
- state_transition
- test_id
- owner
- approval_status
- conflict_status
- notes

## Initial traceability rows

| Requirement | Doctrine | Architecture | Rule/Test |
|---|---|---|---|
| C-01 | Machine cannot be final judge | Constitution, authority flow | R-010; authority-boundary test |
| C-03 | Signal is not authority | Domain model | Signal cannot issue decision |
| C-08 | Green is not approval | State/UI models | R-012; UI test |
| C-09 | Receipt is not permission | Receipt specification | R-014; API test |
| C-11 | External stop path | System architecture | R-009, R-021; stop-path test |
| C-15 | Consequence receipt fields | Receipt schema | schema validation |
| C-17 | Break-Pass cannot certify | Break-Pass report | completion-language test |

## Publication condition

Before Architecture v1.0 is published as complete, every constitutional invariant and high-consequence rule should have a populated source and test mapping or be visibly labeled as an owner-approved proposal.
