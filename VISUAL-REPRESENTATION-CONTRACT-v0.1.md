# Visual Representation Contract v0.1

Status: PREPARATION ARTIFACT — SPECIFICATION ONLY  
State: SPECIFICATION_REQUIRED  
Authority: no approval, permission, release, execution, certification, or closure

## Purpose

Define the boundary between canonical structured state and any visual representation of that state.

> The UI may expose the receipt. It may not become the authority that the receipt describes.

The HTML is the house. The JSON is the ledger. The house must not rewrite the deed.

## Constitutional boundary

The visual layer may:

- read canonical fixtures or accepted state snapshots;
- render receipts, evidence states, transitions, uncertainty, and stop-path status;
- identify missing owners, evidence, brakes, or revocation state;
- expose contradictions and uninspected surfaces;
- propose no authority transition.

The visual layer may not:

- approve, deny, narrow, release, execute, revoke, reopen, or close;
- assign an owner or authority;
- convert Green eligibility into approval;
- convert a receipt into permission;
- certify evidence, completeness, safety, or deployment readiness;
- mutate canonical JSON, ledger events, or human decision records;
- hide uncertainty, dissent, stale state, or missing evidence.

## Canonical source boundary

The visual layer must declare:

- source artifact identifier;
- source hash or version;
- schema version;
- state version;
- observation timestamp;
- freshness or expiry rule;
- rendering timestamp;
- renderer version;
- whether the view is current, historical, stale, contradictory, or incomplete.

If canonical state cannot be loaded or verified, the visual state is UNKNOWN or NOT_TESTED; it is not Green.

## Required visual objects

Every receipt or state view must expose, where applicable:

- lane;
- proposal or action;
- evidence state;
- bounded inference;
- open questions;
- uninspected surfaces;
- consequence owner;
- decision owner;
- evidence custodian;
- denial authority;
- revocation authority;
- external stop authority;
- affected parties;
- consequence;
- reversibility;
- expiry;
- approval state;
- permission state;
- release state;
- execution state;
- who can still say no;
- linked ledger events;
- reopening triggers;
- failure and downgrade condition.

## Evidence-state rendering

The interface must preserve these states distinctly:

- SUPPORTED
- CONTRADICTED
- INDETERMINATE
- TEST_INVALID
- NOT_TESTED
- UNKNOWN
- STALE
- MISSING

No state may be rendered as an empty field, silent omission, or generic success state.

GREEN_ELIGIBLE means eligible for human review only. It must never be labeled APPROVED.

## Authority-transition rendering

The forward path must remain visibly separated:

~~~
Signal
→ Proposal
→ Validation
→ Routing
→ Human Review
→ Approval
→ Permission
→ Release
→ Execution
→ Consequence
~~~

The view must also represent resistance and reversal:

~~~
Deny
Hold
Narrow
Expire
Revoke
Rollback
Recover
Appeal
Correct
Reopen
Supersede
~~~

No arrow may be visually implied as completed merely because a prior arrow completed.

## Stop and revocation rendering

A stop control is not evidence of a working brake.

The UI must distinguish:

- stop declared;
- stop available;
- stop externally controlled;
- stop tested;
- stop failed;
- authority invalidated;
- queued action cancelled;
- cached authority removed;
- delegated authority rechecked;
- replicated authority rechecked;
- recovery state reauthorized.

If any required stop-path fact is unknown, the status must remain visibly unresolved.

## Anti-laundering rules

Do not use:

- checkmarks that imply certification;
- progress bars that imply inevitable completion;
- confidence scores as authority signals;
- green styling for approval or permission;
- hidden dissent or uncertainty;
- default-selected approval actions;
- visual motion implying successful execution;
- VERIFIED labels without defined evidence scope;
- HUMAN OVERSIGHT as a substitute for independent judgment;
- rendered screenshots as proof of current state.

## Interaction boundary

Interaction may filter, expand, compare, or inspect.

Interaction must not mutate canonical state.

Any future write-capable action requires a separate authority contract, named owner, bounded scope, independent evidence, visible approval, external stop path, and inspectable ledger event.

## Required conformance tests

The first implementation must test:

- fixture-to-render field preservation;
- canonical JSON immutability under interaction;
- missing-owner rendering;
- stale-evidence rendering;
- contradictory-evidence rendering;
- failed-stop rendering;
- revocation and restart rendering;
- queued and cached authority rendering;
- GREEN_ELIGIBLE label protection;
- receipt-not-permission label protection;
- export provenance and expiry;
- accessible non-color status rendering;
- divergence between JSON state and visual state;
- renderer version and source hash visibility.

The renderer cannot certify its own fidelity. Visual conformance requires independent review.

## First implementation boundary

The first visual artifact is a read-only Boundary State Inspector containing:

1. Consequence Receipt Viewer
2. Authority Arrow Inspector
3. Evidence and Uncertainty Panel
4. Stop and Revocation Panel
5. Ledger Timeline

No live connection is implied.

## Open questions

- What is the canonical state envelope?
- Which schema owns each visual field?
- Who accepts the visual contract?
- What evidence qualifies as independent visual review?
- How are affected parties and appeal paths represented?
- How are exported views prevented from becoming authorization artifacts elsewhere?

## Sigma line

> If the interface makes an unresolved state feel resolved, the interface has become part of the control failure.

Only Green proceeds.
