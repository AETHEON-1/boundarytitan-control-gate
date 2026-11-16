# BT-REPO-TIN-001 | Tool inventory normalization candidate v0.1

State: YELLOW / preparation and isolated local evaluation only.
Primary lane: control (repository integrity / maintenance).
Source class: proposed implementation control, not doctrine.
Baseline commit: d4e66b6262f79e2b0f8478a8c1118c8bd9a9ca75.
Proposer: machine assistant at human owner's development request, 2026-11-15.

## Purpose and scope

Compare caller-supplied candidate declarations using the existing 18 primitive
labels in `BOUNDARY-ASSISTANT-TOOLBOX-HIERARCHY-v0.1.md` (baseline blob
`af56dc3dac3e50a28887795ae3770e5a7ac88015`). The 1,000-entry conversation
inventory is provisional; this change does not claim its ingestion or
normalization. Original records and positions are retained in the returned
in-memory report. No semantic deduplication, source authentication, authority
resolution, automated admission, deletion or state transition is implemented.

HTK: two tools may use the same machinery without doing the same job or
having the same permission. A match invites review; it does not merge tools.

First unsupported arrow: shared declared primitives -> equivalent tool or
permission. The comparison is syntactic and scoped to supplied JSON-like
records. Unknown or empty mappings must not be treated as matches.

## Traceability and review

- C-02, C-04, C-07, C-09, C-17: output is not authority or certification.
- C-05: comparison and routing do not transfer ownership or permission.
- C-13: comparison, classification and preparation are permitted operations.
- Build Catalog / Toolbox Hierarchy: reuse primitive labels without revising
  the source vocabulary. The new candidate-kind labels are local report types,
  not canonical state-machine or schema changes.
- Contracts: `src/types/tool-inventory-normalization-contracts.ts`.
- Module: `src/workflows/tool-inventory-normalization.ts` (pure function).
- Negative fixtures: `src/tests/tool-inventory-normalization.test.ts`.
- Public package surface and existing workflows are unchanged; Jest discovers
  the new tests through the existing test configuration.
- Current tree ledger must include the new candidate files before review. Historical
  RC1 hashes and existing evidence must remain unchanged.

## Failure and evidence boundary

Invalid input, missing provenance, duplicate IDs, unknown kind, unknown
primitives and incomplete mapping remain findings. Shared signatures are not
proof of semantic equivalence, independent evidence or inventory completeness.
Input records are retained by reference, not deep-frozen custody artifacts.
The function expects passive JSON-like data; executing getters, proxies or
other hostile JavaScript objects is outside the declared input boundary.
A caller must not use findings as an authorization or admission gate.

No live data, credentials, network, filesystem writes or external action are
needed by the comparison function. No new dependency, workflow, permission,
frozen schema, release rule, owner assignment or runtime gate is introduced.
The integration boundary is source and synthetic tests, not live operation.

## Maintenance and consequence receipt

Affected surface: candidate comparison source, local contracts, Jest tests,
current repository manifest and this candidate note. The additional note and
manifest are included in this review package. Consequence: an incorrect
comparison could mislead future development selection; no automatic merger
or deletion is possible through this function. Reversibility: discard the
candidate branch or decline its proposed integration; do not erase history.
Consequence owner / decision owner: human repository owner (AETHEON-1);
no independent reviewer appointed. External stop: owner can withhold merge
and decline further use; technical enforcement of that brake is not established.
Independent specialist route: software testing / architecture reviewer.
Open questions: whether mappings are materially useful; how to verify semantic
reuse independently; whether all original inventory entries can be recovered
with provenance; whether hostile-input parsing and custody need another layer.
Reopening triggers: false equivalence, lost record, permission promotion,
primitive vocabulary drift, incorrect source mapping, or independent objection.
Required human decision: accept, reject, narrow or defer after review.
Machine authority, certification, closure, release and deployment: false.
