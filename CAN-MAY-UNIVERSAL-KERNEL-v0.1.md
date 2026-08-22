# CAN → MAY Universal Kernel v0.1

This is a domain-neutral, read-only preparation kernel.

It accepts a claimed capability and a requested authority transition, then checks whether the supplied packet identifies evidence, authority basis, consequence owner, decision owner, denial authority, revocation authority, external stop path, affected parties, reversibility, harm window, independent measurement, communication, ledger custody, and uncertainty.

The kernel may identify the first unsupported arrow and prepare a specialist handoff. It may not grant permission, authorize execution, certify safety, certify compliance, select an owner, or close review.

## Supported domain classes

- Physical control
- Human eligibility
- Public authority
- Information visibility
- Money and contracts
- Environment and resources
- Research and publication
- Personal productivity
- Other bounded domains

## Core law

`CAN capability ⊬ MAY authority`

The output is always marked `NOT_AUTHORITY`. A complete packet is only `ELIGIBLE_FOR_EXTERNAL_DECISION`; missing controls produce `HUMAN_REVIEW_REQUIRED`.

## Current boundary

This prototype does not inspect live systems, verify legal authority, measure real-world harm windows, operate credentials, stop physical systems, or establish domain compliance. It is a typed preparation layer for future specialist-reviewed adapters.
