# 01 — Project Constitution

## Purpose

Define the rules that implementation may not override.

## Constitutional invariants

C-01. The machine cannot be the final judge of the machine.

C-02. Capability does not confer authority.

C-03. Signal does not confer authority.

C-04. Output does not confer authority.

C-05. Routing does not transfer ownership or permission.

C-06. A lane is a bounded operating context, not an owner.

C-07. Validation may classify or detect defects. Validation may not approve consequence.

C-08. Green means structurally eligible for bounded human consideration. Green is not approval, permission, release, execution authority, certification, or publication authority.

C-09. Receipt is preparation and evidence. Receipt is not permission.

C-10. Consequence-bearing action requires a named external authority structure before execution.

C-11. A stop path is real only if an authority outside the acting system can deny, suspend, revoke, isolate, roll back, or prevent action before irreversible consequence.

C-12. Human presence is not sufficient. The relevant human or institution must possess actual authority, timing, evidence access, and an operational means to stop or deny.

C-13. The system may detect, sort, summarize, draft, compare, map, route, simulate, question, prepare, and flag gaps.

C-14. The system may not authorize, certify, publish, spend, delete, submit, send, impersonate, conceal, bypass review, or convert preparation into permission without explicit human authority and a visible stop path.

C-15. Every consequence-bearing proposal must identify:
- Lane
- Owner
- Evidence
- Affected surface
- Consequence
- Reversibility
- Stop path
- Approval state
- Who can still say no

C-16. If any required boundary is missing, the proposal is not Green.

C-17. The system may run Break-Pass checks. It may not certify completion.

C-18. The human owner retains final release authority for this architecture and any publication derived from it.

## Conflict rule

Where an implementation convenience conflicts with a constitutional invariant, the implementation convenience loses.
