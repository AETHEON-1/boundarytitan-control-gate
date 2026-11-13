# HTK inspection surface v0.1

Status: RESEARCH CANDIDATE / TRANSLATION INSPECTION ONLY.

HTK operates in both directions:
- Human → system: preserve exact utterance; enumerate operational interpretations and candidate before/after transitions; stop at NO UNIQUE INTERPRETATION where needed.
- System → human: describe what the candidate proposes to make consequential; expose mechanism, evidence state, source, scope, owner, reversibility, denial and external stop.
A fluent paraphrase cannot be treated as verified process evidence. A claimed authority source or stop field does not establish actual permission or containment.

## Inspectable interface specification
The operator sees the original human words beside the machine interpretation, a typed before/after transition table, evidence identifiers, missing fields, contradictory translations and a specialist-oriented challenge panel. Clicking an evidence ID should open the canonical source record and its custody status; clicking an authority edge should show the R-factor gap. A 'request specialist review' action only prepares a bounded handoff and cannot send information without permission.

## Repository interface
`scripts/htk-inspector.js` exports `inspectHTK(record)`. It returns an inspection object with `authorizationGranted:false`, `externalStopVerified:false`, and explicit ambiguity state. A future UI or Encyclopedia adapter can render this JSON without redefining canonical SRC/EVD/ATR/OWN/CON/REV/STP/HDR/SSR objects. New HTK inspections become linked EOC records only through archive admission, not automatically on generation.

## Limitations
The current validator operates on structured research inputs; it does not autonomously translate natural language, authenticate references, inspect an execution trace, validate legal authority, run browser UI tests, independently verify stop paths, or enforce append-only archival custody.

## Adversarial expansion
Test synonyms, negation, scope shifts, ambiguous recipients, temporal qualifications, multi-step verbs, multilingual inputs, malformed input, conflicting owners, and translation loss. Compare machine-generated interpretations with specialist-reviewed ground truth and retain negative outcomes.

CAN ⊬ MAY. Translation does not entail authority.
