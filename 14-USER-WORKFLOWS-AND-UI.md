# 14 — User Workflows and UI Map

## Core screens

1. Control Surface Home
- current doctrine version
- current routing state
- active holds
- visible stop authority
- no “system approved” language

2. New Proposal
- action, lane, evidence, owner, consequence, reversibility, stop path

3. Routing Review
- primary lane
- conflicts
- missing owner or evidence
- color result

4. Consequence Receipt
- full receipt
- mandatory “not permission” language

5. Human Decision
- approve, deny, hold, narrow
- exact scope and expiry
- visible who-can-still-say-no field

6. Release Gate
- permission verification
- revocation check
- stop-path health
- no automatic release from validation

7. Execution Monitor
- live state
- stop and revoke controls
- consequence indicators

8. Audit Ledger
- ordered events
- actor, authority basis, prior/new state
- source and evidence references

9. Incident and Remedy
- containment
- affected parties
- appeal and correction
- owner and closure status

10. Administration
- rule versions
- roles
- policies
- schema versions
- no machine-controlled constitutional edits

## UI prohibitions

- Do not label Green as Approved.
- Do not present machine confidence as authority.
- Do not hide stop controls behind secondary menus for high-consequence actions.
- Do not allow a generated receipt to look like an authorization certificate.
- Do not use dark patterns to accelerate release.
