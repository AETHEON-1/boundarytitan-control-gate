# Cross-action investigative schema v0.1

Status: YELLOW. Synthetic declarations only. No authority transfer.

Optional top-level `cross_action_constraints` is a list. Currently supported entry:

```json
{"id":"budget","kind":"sum_limit","permission":"p1","event_ids":["debit1","debit2"],"max_total":"100"}
```

Each member must be a uniquely identified execution event with matching permission and nonnegative finite amount. Decimal arithmetic compares the declared sum to the inclusive declared limit.

COMPOSITION_LIMIT CONTRADICTED means declared total exceeds declared maximum.
COMPOSITION_LIMIT SUPPORTED means only that the declared total is within the declared maximum.
COMPOSITION_EVIDENCE INDETERMINATE means membership, permission binding, or amounts are insufficient.
COMPOSITION_SCHEMA INDETERMINATE means malformed or unsupported constraint.

The engine does not establish complete membership, issuer authenticity, real-world effect, legitimate permission, or external stop. No inferred composition when the constraint is absent. A valid result cannot certify authority. Existing source code outside this isolated prototype is unchanged.
