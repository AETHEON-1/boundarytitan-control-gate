# Specialist Language Audit v0.1

## Purpose

Provide a repeatable language pass for terms that sound precise while carrying hidden uncertainty, permission, authority, or completion claims.

## Audit rule

Whenever a technical or institutional term appears, ask:

```text
What does this word establish?
What does it merely suggest?
What evidence would make it true?
What authority does it appear to carry?
What consequence follows if readers interpret it broadly?
Who can reject or reopen the interpretation?
```

## Grey-area vocabulary

| Term | Safer question |
|---|---|
| autonomous | Autonomous with respect to which actions, tools, and authority? |
| safe | Safe against which hazards, for whom, under what conditions, and for how long? |
| aligned | Aligned to which objective, evaluator, owner, and affected parties? |
| verified | Verified by whom, against what criteria, with what independence? |
| robust | Robust to which faults, adversaries, environments, and recovery conditions? |
| reliable | What failure rate, time window, population, and consequence class? |
| interpretable | Interpretable to whom, at what level, and with what ability to challenge? |
| compliant | Compliant with which jurisdiction, version, control, and evidence standard? |
| human-in-the-loop | Where exactly can the human deny, pause, correct, or revoke? |
| real-time | What measured latency bound and clock assumptions? |
| explainable | Does the explanation expose causal evidence or merely produce a narrative? |
| privacy-preserving | Which data, threat model, retention period, and adversary? |
| production-ready | Which environment, owner, field evidence, recovery path, and release authority? |
| complete | Complete under which declared corpus, method, and stopping condition? |
| consensus | Agreement among whom, under what failure model, and with what authority? |
| approved | Approved by whom, for what scope, until when, and with what revocation path? |
| no action taken | Were queued, delegated, cached, replicated, or physical actions also checked? |
| monitored | Who receives the signal, and who can still act before consequence? |
| fallback | What authority, data, and risk does the fallback inherit? |
| temporary | What exact expiry, review, and removal mechanism exists? |

## Modal audit

Replace vague authority-bearing language with explicit modal terms:

```text
CAN  capability
MAY  permission
MUST requirement source
SHOULD recommendation and rationale
WILL declared future behavior
DID  past occurrence supported by evidence
IS   time-bounded state claim
UNKNOWN unresolved material condition
```

## Translation template

```text
Specialist phrase:
Technical meaning:
Canonical control meaning:
Evidence required:
Permission implied or not implied:
Authority owner:
Consequence:
External brake:
Remaining uncertainty:
```

## Red-flag transformations

```text
can → may
recommendation → decision
score → truth
output → execution
execution report → completed state
monitoring → control
human presence → human oversight
logging → accountability
green → approved
specialist review → certification
```

Each transformation is an attack surface until independently justified.

## Specialist disposition

The audit may classify a term as:

```text
CANONICAL
DOMAIN-SPECIFIC
AMBIGUOUS
UNSUPPORTED
AUTHORITY-LAUNDERING RISK
REQUIRES HUMAN DISPOSITION
```

The machine may flag and translate. It may not declare the vocabulary complete or impose a universal meaning without human and specialist review.

> **If a word can change what people believe they are allowed to do, audit the word before auditing the action.**
