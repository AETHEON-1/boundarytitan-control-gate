# Persistent replay ledger v0.1: admission boundary
A chained ledger can detect edits relative to a trusted previous head, and reject repeated run IDs already in its input. It is not an immutable repository, independent origin attestation, or a transactional multi-writer database.

Tested: one valid fixture, second run, replay, tamper, removed entry, exclusive file write, retained unverified-source state. Known gap: separate runners can each use stale prior copies. Exclusive-create destinations mitigate local overwrite but cannot prevent forked histories; GitHub branch protection or an external compare-and-swap store and independent witness are REQUIRED for cross-run replay guarantees. An attacker controlling both the ledger and its expected head can rewrite history.

The initial ledger fixture is intentionally empty. Output must be archived as a reviewed candidate, never auto-applied to the committed source or Encyclopedia. Preserve all rejected runs, validation errors and raw evidence in a separately managed failure record with controlled access; private task output should not be uploaded to public CI.

Live Task → GitHub delivery, run attestation, credential custody, independent stop, durable witness, and cross-run locking: NOT TESTED.
Earlier CI failure: task delivery contract run 38459903618 rejected altered structured input against unchanged raw source; subsequent repaired-fixture run 38460039285 succeeded. This is an example of preserving failure rather than weakening checks.
CAN ⊬ MAY.
