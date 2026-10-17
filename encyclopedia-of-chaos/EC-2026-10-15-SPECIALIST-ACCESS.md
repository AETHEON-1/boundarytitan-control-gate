# Encyclopedia of Chaos | EC-2026-10-15-SPECIALIST-ACCESS

**Object:** BoundaryTitan specialist entry, draft PR #80.
**Root question:** Can a new specialist independently reach, understand, reproduce and falsify a claim without granting the interface consequential authority?
**State:** BOUNDED INVESTIGATION CLOSED / ACCEPTANCE YELLOW.
**Evidence freeze:** candidate `644aee7a58144445b73cf1f10863f5d6756b3843`; CI runs [38760761783](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/38760761783) and [38760751233](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/38760751233).
**Authority:** human owner retains merge, publication, acceptance and any consequential approval.

## Observed evidence
- Both final candidate CI workflows passed. Typecheck, 36 Jest suites / 112 tests, three Python handoff tests, specialist-entry static checks, and repository manifest checks passed.
- Static entry test reported 15 local file targets, six in-page anchors, five sections, reproduction commands and basic accessibility markers.
- Earlier manifest failures occurred when FR-001 specialist files or newly added artifacts were not indexed. They were repaired; failed runs remain in CI history.
- Static source inspection confirms no executable `<script>` element or `<form>` in the specialist entry. This is not a security audit of linked destinations.

## Adversarial failure examples to preserve

| ID | Counterexample or test case | What would fail | State | Evidence required |
|---|---|---|---|---|
| EC-01 | Replace an existing linked claim file's content with irrelevant or misleading text while preserving its path. | Link-existence PASS is mistaken for semantic correctness. | STRUCTURAL COUNTEREXAMPLE; NOT INJECTED | Isolated fixture with altered file and test output; independent content review. |
| EC-02 | Replace a valid external GitHub URL with an inaccessible or unrelated URL. | Local-only link test misses an external broken destination. | STRUCTURAL COUNTEREXAMPLE; NOT INJECTED | HTTP/navigation check with timestamp, redirect chain and final content. |
| EC-03 | Keep `:focus-visible` in CSS but make an interactive link unreachable or visually obscured. | Presence of CSS token mistaken for keyboard accessibility. | STRUCTURAL COUNTEREXAMPLE; NOT INJECTED | Real browser Tab/Shift+Tab traversal and focus screenshots. |
| EC-04 | Keep `lang`, headings and `aria-label` while changing visual/DOM reading order or link names. | Marker-based smoke check mistaken for WCAG 2.2 AA or screen-reader usability. | STRUCTURAL COUNTEREXAMPLE; NOT INJECTED | Screen-reader test, DOM inspection, WCAG audit. |
| EC-05 | Open the HTML source on github.com and attempt to use it as a rendered site. | Repository file availability mistaken for published website usability. | KNOWN DISTRIBUTION LIMITATION | Real static hosting/preview and end-to-end navigation. |
| EC-06 | Run instructions on an unfamiliar platform or unsupported runtime, without assistance. | CI success mistaken for portable newcomer reproduction. | OPEN / NOT TESTED | Independent participant, pinned SHA, environment, logs and blockers. |
| EC-07 | Submit a challenge but fail to trace its claim ID, evidence lineage or human disposition. | Issue submission mistaken for complete evidence custody and review. | OPEN / NOT TESTED | Tracked challenge, claim/evidence mapping, independent reviewer and recorded disposition. |
| EC-08 | A green software check is presented as authorization for FR-001 motion, deployment or certification. | Capability evidence is laundered into permission. | PROHIBITED INFERENCE / NEGATIVE CONTROL | UI copy review, no live execution path, external owner decision. |
| EC-09 | An automated check modifies the evidence manifest to match unauthorized changes, then passes. | Ledger consistency mistaken for independent evidence integrity or authority. | STRUCTURAL COUNTEREXAMPLE; NOT INJECTED | Signed external baseline, change approval and independent custody review. |
| EC-10 | A newcomer selects a claim with no directly reproducible case-specific artifact. | General test suite PASS mistaken for claim-specific reproduction. | OPEN / NOT TESTED | Claim-level fixture, expected/observed outputs and independent rerun. |

**Classification discipline:** Structural counterexamples show the claimed inference is invalid; they are not reports of observed production defects. Unexecuted tests remain NOT TESTED. A CI pass supports only the exact checked tree and specified tests.

## Closure and reopen
**Closed:** bounded automated verification and source-level adversarial review of the candidate at the evidence-freeze SHA. No claim of browser accessibility, newcomer success, independent certification or deployment authorization.

**Reopen on:** CI regression, broken live navigation, inaccessible keyboard/screen-reader behavior, specialist inability to reproduce a claim, false provenance, a bypass of the read-only boundary, or new independent evidence contradicting a recorded result.

**Archive admission:** This is a candidate repository record prepared by the machine, not proof that the human owner admitted it to a separately governed canonical archive. No automatic human approval is implied.

**Invariant:** Freeze the evidence. Never freeze the search. CAN ⊬ MAY. Only GREEN proceeds. No owner, no brake. No ledger, no trust.
