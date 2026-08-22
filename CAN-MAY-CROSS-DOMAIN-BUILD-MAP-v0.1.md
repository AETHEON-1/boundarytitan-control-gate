# CAN → MAY Cross-Domain Build Map v0.1

**State:** EXPLORATION / PREPARATION ONLY
**Purpose:** identify where capability, evidence, recommendation, or execution can be mistaken for permission, and route each domain to a bounded control adapter.

This map is a search surface, not an exhaustive inventory. Each domain requires separate evidence, authority, consequence, and specialist review.

## Universal boundary

`CAN` describes capability, access, computation, observation, recommendation, or execution.

`MAY` describes permission, authorization, legitimacy, release, or institutional acceptance.

The first unsupported arrow must be located rather than assumed:

`CAN observe → CAN infer → CAN recommend → CAN execute ⊬ MAY investigate ⊬ MAY restrict ⊬ MAY exclude ⊬ MAY detain ⊬ MAY alter infrastructure`

Every consequence-bearing arrow requires its own authority basis, owner, evidence, denial path, revocation path, and external stop.

## Domain surface map

| Domain | Capability surface | Permission risk | First unsupported arrow | Preparation adapter |
|---|---|---|---|---|
| Robotics | perceive, plan, move, manipulate | motion, force, contact, maintenance access | `CAN move → MAY move here` | Robotics admissibility and external-brake harness |
| Agent tools | call APIs, use tools, retry, delegate | tool use, credential use, external action | `CAN call → MAY execute` | Tool contract, execution envelope, revocation checker |
| Cybersecurity | scan, classify, isolate, remediate | investigation, containment, deletion, access change | `CAN detect → MAY alter a system` | Action-authority evidence packet and denial-path tester |
| Cloud infrastructure | provision, modify, scale, delete | production change, outage risk, data exposure | `CAN deploy → MAY deploy` | Change-control ledger and rollback verifier |
| Credentials | possess, present, inherit, cache | authority to act as principal | `CAN authenticate → MAY act` | Credential boundary mapper and live-revocation test |
| Employment | rank, recommend, filter | hire, reject, discipline, terminate | `CAN rank → MAY exclude` | Appeal mapper, evidence register, human decision record |
| Policing/public authority | detect, identify, prioritize | search, detain, restrict, use force | `CAN flag → MAY constrain a person` | Authority-basis checker and external denial path |
| Surveillance/biometrics | identify, track, correlate | consent, monitoring, access restriction | `CAN identify → MAY follow or profile` | Consent boundary and retention/revocation ledger |
| Healthcare | triage, diagnose, recommend | treatment, denial, prioritization, intervention | `CAN predict → MAY decide care` | Clinical review handoff and consequence receipt |
| Finance | score, price, trade, forecast | lending, trading, payment, exclusion | `CAN score → MAY allocate money` | Transaction authority packet and independent readback |
| Insurance | classify risk, price, flag fraud | coverage, denial, premium, investigation | `CAN classify → MAY deny coverage` | Underwriting evidence and appeal-path tester |
| Legal | retrieve, draft, predict outcome | advice, filing, representation, disposition | `CAN generate → MAY submit or advise` | Jurisdiction/owner checker and human sign-off record |
| Education | grade, rank, detect similarity | admission, discipline, advancement | `CAN evaluate → MAY determine opportunity` | Evaluation provenance and dispute register |
| Hiring platforms | match, filter, recommend | access to employment and income | `CAN match → MAY exclude` | Choice-preservation and appeal adapter |
| Content platforms | rank, recommend, moderate | visibility, speech, account access | `CAN rank → MAY suppress` | Enforcement evidence ledger and appeal route |
| Search/retrieval | index, summarize, prioritize | what a human can see or find | `CAN select → MAY define relevance` | Omission scanner and alternative-view recorder |
| Advertising | target, optimize, personalize | influence, pricing, access, disclosure | `CAN target → MAY manipulate choice` | Influence/consequence mapper |
| Commerce | recommend, price, transact | purchase, charge, cancel, fulfill | `CAN transact → MAY charge` | Agentic commerce receipt and payment hold |
| Research/science | model, infer, generate hypotheses | publish, certify, claim discovery | `CAN produce result → MAY claim result` | Reproducibility and independent-verification packet |
| Mathematics/formal methods | derive, search proof, verify locally | accept theorem, alter operational policy | `CAN derive → MAY establish` | Mathematical authority ledger |
| Journalism | summarize, source, draft | publish accusation or public claim | `CAN find → MAY publish` | Source chain, contradiction, and correction register |
| Government procurement | compare, score, recommend | award contract, spend public funds | `CAN rank bids → MAY award` | Procurement authority and dissent register |
| Infrastructure/energy | forecast, balance, dispatch | alter physical service or grid state | `CAN optimize → MAY switch infrastructure` | Physical consequence receipt and external operator brake |
| Transportation | route, schedule, control | movement, access, safety-critical release | `CAN plan route → MAY command movement` | Safety state machine and stop-path verifier |
| Manufacturing | schedule, inspect, tune | change process, accept defect, release product | `CAN detect → MAY release` | Quality evidence and release authority packet |
| Construction | estimate, sequence, inspect | alter field work, accept condition, expose worker | `CAN identify → MAY direct work` | Job-site condition recorder and named supervisor route |
| Insurance/liability | estimate loss, allocate risk | assign responsibility, deny remedy | `CAN estimate → MAY decide liability` | Consequence ownership and appeal mapper |
| Identity/reputation | correlate, score, infer trust | access, status, eligibility | `CAN infer identity → MAY treat as identity` | Identity evidence and correction/reopening ledger |
| Military/security | detect, classify, recommend | target, deploy, escalate force | `CAN identify target → MAY act` | Human command authority and independent abort path |
| Personal productivity | schedule, remind, draft | send, purchase, disclose, commit | `CAN prepare → MAY transmit` | Pre-action confirmation and consequence receipt |
| Publishing | draft, format, schedule | public release and reputational consequence | `CAN prepare → MAY publish` | Publication manifest and human release gate |

## Reusable adapter contract

Every domain adapter should expose:

- capability claim
- permission claim
- first unsupported arrow
- documented record
- bounded inference
- open question
- evidence owner
- consequence owner
- decision owner
- denial authority
- revocation authority
- external stop path
- reversibility
- harm window
- independent measurement
- specialist handoff
- ledger event
- uncertainty register
- rejection condition
- non-claims

## Build order

### Layer 1 — Universal kernel

Build once:

- claim/evidence/state model
- authority-transition model
- owner and stop-path model
- append-only event model
- uncertainty model
- specialist handoff model
- 51-50 omission compiler

### Layer 2 — High-consequence adapters

Prepare first for:

1. Robotics
2. Credentials and agents
3. Cybersecurity
4. Cloud infrastructure
5. Employment and public authority
6. Healthcare and finance
7. Physical infrastructure

### Layer 3 — Evidence-heavy adapters

Prepare next for:

- mathematics and science
- journalism
- research reproducibility
- publishing
- procurement
- identity and reputation

### Layer 4 — Lower-consequence preparation surfaces

Prepare after the core has independent review:

- personal productivity
- commerce
- advertising
- search
- content ranking

## Omissions pass

The map does not yet establish:

- a complete domain inventory
- universal legal authority rules
- domain-specific standards compliance
- actual owner identity or authority
- live permission state
- measurable harm windows for every adapter
- independent verification
- field readiness

The most dangerous omission is treating the same word—`permission`, `approval`, `release`, `consent`, `authorization`, or `acceptance`—as if it has the same meaning across domains.

## Stop condition

No adapter may advance from preparation to live integration without a named consequence owner, an operational external stop, independent evidence, a rejection route, and a human disposition record.

The map expands the search surface. It does not expand machine authority.
