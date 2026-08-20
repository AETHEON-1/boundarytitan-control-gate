# Bounded Agent Workcells — 51-50 Omissions Pass

**Record date:** 2026-08-20

**Question:** Can a Bounded Agent Workcell remain useful without acquiring authority?

**State:** YELLOW — contract work may be prepared; runtime agents, tool access, credentials, execution, publication, deployment, and autonomous disposition remain out of scope.

## Method

This applies the BoundaryTitan 51-50 Method: one question is tested through fifty historically unasked questions. The result is limited to a contract-design disposition. It is not proof of safety, a permission grant, an authorization, or a release decision.

## The fifty questions

| # | Inquiry | Current answer | Gap / required treatment |
| --- | --- | --- | --- |
| 1 | Is the workcell’s purpose explicit? | Required | `purpose` must be required. |
| 2 | Is there exactly one bounded deliverable? | Required | Require a deliverable reference. |
| 3 | Is the permitted lane named? | Required | Require one lane identifier. |
| 4 | Is scope written as allowed and excluded work? | Required | Bind to a Task Wall. |
| 5 | Can the workcell expand its own scope? | No | Prohibit self-expansion. |
| 6 | Is the agent role stable and versioned? | Required | Add agent identifier and version. |
| 7 | Is a named human accountable owner present? | Required | Require human owner reference. |
| 8 | Is the delegating principal visible? | Required | Add explicit delegation record reference. |
| 9 | Is a machine allowed to become the owner? | No | Prohibit machine ownership. |
| 10 | Is closure owned by a named human? | Required | Prohibit workcell self-closure. |
| 11 | Are input sources declared? | Required | Require input references. |
| 12 | Are untrusted inputs marked? | Required | Add input-trust classification. |
| 13 | Is stale evidence detectable? | Required | Require freshness or review status. |
| 14 | Is evidence custody visible? | Required | Add custodian/reference path. |
| 15 | Can an agent declare its own evidence sufficient? | No | Human review remains external. |
| 16 | Are permitted outputs enumerated? | Required | Allow preparation-only outputs. |
| 17 | Can output be mistaken for a decision? | Must be prevented | Label output non-authoritative. |
| 18 | Can output issue permission or release? | No | Prohibit authority-bearing outputs. |
| 19 | Are contradictions required in handoff? | Required | Use HandoffPackage. |
| 20 | Are failed approaches retained? | Required | Use HandoffPackage. |
| 21 | Does the workcell have any tool access? | Not in scope | No runtime tool contract in this phase. |
| 22 | Can it inherit ambient credentials? | No | Prohibit ambient credentials. |
| 23 | Can it touch external state? | No | Prohibit send, publish, delete, pay, submit, deploy, or record changes. |
| 24 | Is attempted tool access auditable? | Future requirement | Define only in later audit contract. |
| 25 | Can a tool bypass the Task Wall? | No | Task Wall remains upstream. |
| 26 | Is a consequence budget declared? | Required | Inherited from Task Wall. |
| 27 | Is expiry declared? | Required | Inherited from Task Wall. |
| 28 | Is reversibility stated? | Required for future consequence work | Do not infer it from workcell state. |
| 29 | Can a workcell create a new lane? | No | Prohibit lane creation. |
| 30 | Can a workcell convert preparation into permission? | No | Explicit prohibited action. |
| 31 | Is an external stop path identified? | Required | Require a stop-path reference. |
| 32 | Is the stop controller external to the workcell? | Required | No agent-controlled stop. |
| 33 | Can denial materially stop subsequent work? | Future runtime question | Not implemented by a type contract. |
| 34 | Can revocation persist through recovery? | Candidate requirement | Represent only through continuity record. |
| 35 | Can retry silently restore revoked effectiveness? | No | Explicitly prohibit restoration. |
| 36 | Are dependency links explicit? | Required | Use `TOUCHES` / `RELIES_ON`. |
| 37 | Does dependency change trigger reinspection? | Required | Create a review record, not automatic reopening. |
| 38 | Is UNKNOWN distinct from NOVELTY? | Required | Use Boundary Grammar. |
| 39 | Does novelty hold local work? | Required | Future routing rule; no runtime implementation. |
| 40 | Can the agent reopen work by itself? | No | Require material delta and human disposition. |
| 41 | Is a handoff package mandatory? | Required | Reference HandoffPackage. |
| 42 | Is the next admissible move recorded? | Required | Use HandoffPackage. |
| 43 | Is the number of active workcells bounded? | Required | Maximum three active workcells. |
| 44 | Is each workcell linked to a single owner and lane? | Required | Enforce in future validation phase. |
| 45 | Can agent consensus become permission? | No | Consensus is evidence only. |
| 46 | Can tests become a safety or release claim? | No | Tests verify only declared structure. |
| 47 | Can a ledger substitute for a brake? | No | Record and control remain separate. |
| 48 | Can a human be reduced to a rubber stamp? | Must be prevented | Preserve visible hold, deny, narrow, and revoke path. |
| 49 | Is a closure/reopen condition visible? | Required | Add both fields to workcell contract. |
| 50 | Who can still say no before consequence? | Required | Named human owner and external stop authority. |

## Inverse exhaustion

The following cannot answer the governing question: a model’s confidence, a routing color, agent consensus, test success, a complete-looking ledger, a policy statement, an ambient credential, a human merely present in the interface, or a post-hoc audit.

## Result

The unanswered runtime questions make Bounded Agent Workcells **YELLOW**. The next admissible implementation is a declaration-only workcell contract that binds to the Task Wall and HandoffPackage, identifies owner/delegation/stop references, limits functions to preparation, and exposes closure/reopen conditions.

No runtime agent, authorization, tool access, credential mechanism, execution, publication, deployment, or autonomous state transition is admissible from this record.
