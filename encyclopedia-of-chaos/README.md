# Encyclopedia of Chaos — Research Evidence Archive v0.1

STATUS: ARCHIVE ARCHITECTURE CANDIDATE. This archive records research observations, outcomes, failed tests, adverse findings, contradictions, corrections, and re-open conditions. It does NOT declare truth, safety, certification, deployment approval, or authority to transition into external consequence.

## Constitutional custody rule
- A frozen entry is an immutable historical snapshot once recorded in a commit. Corrections and disputes MUST be appended as separately identified records linking the earlier entry, never overwrite the historical claim or erase its failure.
- Each claim is distinguishable from supporting evidence, inference, test execution, machine classification, specialist review, human decision, and observable consequence.
- Frozen is not closed. A research question can stay OPEN indefinitely, and a frozen conclusion can be contradicted in a new linked record.
- A Git commit hash or SHA-256 hash establishes a comparison anchor, not independent authenticity, immutability outside this repository, or trusted external custody.
- The archive may describe R-factor requirements but does not generate MAY.
- The Encyclopedia never becomes the sole authority over its own completeness or correctness.

## Record format
One JSON entry per file in `encyclopedia-of-chaos/entries/`, with schema `BT-EOC-ENTRY-v0.1`. Stable entry IDs and parent/supersedes links. Required:
- identity, classification and date
- exact claim and source locators (not proof)
- evidence state (SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID, NOT TESTED)
- reproduction commands, environment, scope and concrete observations
- positive, negative, and defeating tests; explicitly record non-execution
- beneficial, harmful, ambiguous or unknown consequence hypotheses
- unresolved omissions and human/specialist review status
- external stop/authority state
- links to corrections and reopen conditions
- `authorizationGranted: false` for archive-generated records

No unqualified PASS/SAFE or approval status may be inferred from a frozen entry.

## Workflow
Candidate research result → identify source → independently recheck evidence available → create proposed Encyclopedia entry → validate schema and cross-links → commit on review branch → run tests → external human disposition for archive admission → freeze entry at commit → append future corrections/challenges, never edit admitted entry.

## Scope
The archive is separate from the runnable research machinery. It will record results from the Raccoon, RSI, Kernel Forge, Sigma-2, Reality Bench, specialist consultations, and downstream real-world consequence observation as the evidence actually becomes available.

## Initial seed
EOC-20261013-RD-F01-F03-v0.1 documents the research-discovery negative fixture results and subsequent repair CI. It does not claim independent containment testing.

## Constraints not yet technically enforced
Protected branch rules, independent custody, append-only server enforcement and privileged deletion prevention have NOT been established. The validator in this PR can validate file shape; it cannot prove history is immutable or protect against an administrator rewriting Git history. These are separate controls needing human configuration and independent checks.

CAN ⊬ MAY. The archive preserves what research found, including evidence against itself.
