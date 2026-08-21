# Zombie Permission Hunter Prototype

Status: declaration-only, read-only prototype.

The prototype inspects permission declarations against lane, scope, owner, evidence, expiry, and declared inspection coverage. It produces:

- A bounded finding
- Evidence state
- Human Translation Key
- Consequence Receipt reference
- Ledger event type
- Explicit machine authority boundary

It does not:

- Grant permissions
- Revoke permissions
- Choose owners
- Certify scan completeness
- Declare the environment clean
- Approve, release, execute, or close
- Inspect live systems
- Use credentials or external-state access

Important uncertainty:

A registry is not permission reality. The prototype reports uninspected surfaces and does not claim that no zombie permissions exist.

The prototype is intentionally compatible with the existing Task Wall, Bounded Agent Workcell, Consequence Receipt v2, read-only Review Surface, and Specialist Handoff contracts.

Human handoff questions:

- Are dormant permissions intentional recovery or emergency access?
- Which permission classes may be auto-expired?
- Does revocation dominate cached, delegated, queued, and replicated access?
- Who owns a disputed permission?
- What evidence establishes registry coverage?
- What happens if fail-closed behavior harms recovery or safety?

Run:

`npm run typecheck`
`npm test`

The prototype is preparation, not permission.

CAN ⊬ MAY.
