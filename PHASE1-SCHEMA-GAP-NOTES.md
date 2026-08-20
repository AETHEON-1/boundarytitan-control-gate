# Phase 1 schema-gap notes

This is a descriptive comparison note, not an amendment request or a change to RC1.

The RC1 prose mentions `consequence_class` and `approval_reference`; neither is accepted by the frozen `consequence-receipt.schema.json`, which has `additionalProperties: false`. Phase 1 therefore does not model either property in the schema-compatible `ConsequenceReceipt` contract or fixture.

Any disposition of this difference remains a human-owner decision outside Phase 1.
