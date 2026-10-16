# Boundary Engineering | External Stop Toolbox v0.1
Status: YELLOW | Open specialist challenge | Not deployed | No claim of independent validation

## Problem statement
The engineering target is not whether the model obeys a stop instruction. It is whether an external authority can prevent further protected commitments without cooperation from the requester, preserve an independently held record, and prevent unauthorized human operators from bypassing controls without detectable, attributable consequences. No architecture can promise that every privileged human bypass is impossible. Define the trusted base, break-glass rules, physical custody, oversight, and consequence of override.

## Candidate stop tools, from old disciplines and modern implementations
| Tool / rediscovered practice | Who can use it | Mechanism | Critical defeating test |
|---|---|---|---|
| Physical disconnect, lockout/tagout, trapped-key interlock | operator, safety specialist | isolate energy or actuator at source | alternate power or stored energy persists |
| Hardwired emergency stop and safety relay | machine safety specialist | independent circuit de-energizes hazard | software restarts or bypasses relay |
| Network egress deny, isolated VLAN, physical network switch | IT admin, everyday local user | remove outbound path | cached local or alternate radio path |
| Resource-side permission revoke / account disable | service owner | deny further server commitments | preauthorized queue or offline token commits |
| Database deny trigger / read-only mode / transaction guard | DBA | resource rejects writes | superuser bypass or replication replays |
| Short lease with monotonic fencing token | distributed systems engineer | stale worker rejected at resource | lease expiration without fencing |
| Capability handle revocation / indirection table | systems engineer | cut authority at resource reference | leaked raw handle survives |
| Two-person control and dual custody | safety/compliance specialist | separate issuance from release | collusion or emergency override |
| Quorum key / HSM signing separation | cryptography/security specialist | requester cannot mint grants | key admin can sign without independent approval |
| One-way evidence capture / WORM storage / append-only journal | forensic specialist | independent custody of observed effects | observation path misses alternate effects |
| Circuit breaker and bulkhead | reliability engineer | isolate failing dependency | fallback path silently restores reachability |
| Permit-to-work, change ticket and expiration | construction/industrial specialist | action bound to task, site, time, responsible owner | old permit reused after site condition changes |
| Dead-man control / hold-to-run | robotics/industrial specialist | ongoing authorization required | latency or stored kinetic energy |
| Financial transaction limits / settlement holds | payment operations | deny consequence at settlement boundary | irrevocable instruction already submitted |
| Safety case and independent witness testing | assurance specialist | explicit claims and defeating observations | self-selected test scope hides path |
| Kill-switch drill and restoration authority separation | incident commander | stop exercised under independent supervision | same operator can silently restore |
| Data diode / unidirectional gateway | OT specialist | constrain direction of control/evidence flow | side channel or maintenance backdoor |

These are candidates, not certified controls or universal requirements. Cross-domain analogies require domain specialists and applicable standards before use.

## Everyday-user workflow
1. Identify the protected consequence (sending, spending, writing, moving, deleting, publishing).
2. Identify the actual account, resource, or actuator that commits it.
3. Find an independently controlled denial point; do not mistake a chat STOP instruction for that point.
4. Verify whether queued work, delegated access, offline sessions, scheduled jobs or alternate devices survive.
5. Capture before/after evidence from the resource, not solely the assistant transcript.
6. Escalate unknowns; do not attempt unsafe live shutdown or tamper with systems without authority.

## Specialist stop drill
S0 inventory consequence paths and trust assumptions.
S1 freeze task-scoped authorization and protected effect.
S2 confirm named stop owner and independent observer.
S3 run an authorized positive control in a harmless sandbox.
S4 request stop through the owner-controlled channel.
S5 challenge pre-issued, queued, delegated, retried and restarted actions.
S6 independently inspect actual resource effects and surviving credentials.
S7 try a separately authorized human break-glass path; preserve identity, justification, dual approval, evidence and accountability.
S8 preserve failures and missing observations; repair and rerun prior attacks.
S9 submit to external specialist for a new attack without revealing the expected result.
S10 human owner disposes; machine cannot certify.

## Human bypass accountability
Model: HUMAN_CAN does not entail HUMAN_MAY. A human admin may possess technical capability to override controls, but any exceptional path requires an identified authority, scope, expiry, two-party or independently reviewable release where appropriate, immutable independent evidence, and explicit downstream accountability. A root administrator with power over all evidence and enforcement remains an unclosed trust concentration, not a solved bypass.

## Required proof obligations before operational claims
Complete mediation in declared scope; resource-side stop dominance; atomic revocation/commit order; durable tombstones; restart and rollback safety; delegated and queued authority extinction; independent evidence custody; trusted clock/key lifecycle; fail-closed behavior; positive control; stop latency; recovery authority; override detection; physical residual energy; independent test reproduction.

## Candidate sources for specialist verification
IEC 60204-1 / ISO 13850 emergency stop; OSHA 29 CFR 1910.147 energy control; IEC 61508 functional safety; NIST SP 800-207 zero trust; NIST SP 800-53 access controls and audit; reference monitor complete mediation; distributed fencing tokens; NIST SP 800-61 incident response; PCI/payment settlement holds where applicable. This list is a research routing aid, not a claim of current standards conformance.

## Admission rule
A stop demonstration requires: identified resource, owner, specimen SHA, authority state, independent effect oracle, actual positive/negative control results, evidence of all claimed paths, bounded limitations, and human disposition. Local tests, tool availability, paperwork, dashboards, and machine self-reports do not certify field safety. CAN does not entail MAY.
