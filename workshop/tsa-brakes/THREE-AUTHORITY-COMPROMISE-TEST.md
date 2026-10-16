# Three-Authority Compromise Test v0.1
**BoundaryTitan | HTK / specialist-ready negative-control specimen | YELLOW**

## What happened?
The existing process gate denies stale requester calls. That does not prove that a compromised resource operator cannot write the consequence directly or erase the record. This specimen deliberately tests that missing boundary.

## What changed?
The executable test `test_three_authority_compromise.py` exercises requester replay, a queued grant after stop, restart after stop, a direct SQLite alternate path, an operator-inserted effect, and deletion of the effect plus a separate observer database. The latter three are *expected counterexamples*: the same OS administrator controls all files. A green unit-test result means the counterexamples were observed as expected, NOT that external stop or independent evidence custody succeeded.

## Geometry
```
Human owner / authority source -- MAY, STOP --> witness (SQLite)
                                                 |
Compromised requester -- queued/replayed IPC --> resource gate --> resource SQLite --> effect
                                                          |              |
                                                          |              +-- polling --> observer SQLite
Compromised resource/host operator -----------------------+---- direct write / delete ---+
```
Three roles are represented; three independent administrative authorities are **not** established. The polling observer is not an independently protected consequence oracle.

## Declared privilege matrix
| Actor | Can submit commit | Can register/stop through requester IPC | Can write resource DB | Can delete observer DB |
|---|---|---|---|---|
| Requester with only requester endpoint | Yes | No | No, **by interface contract only** | No, **by interface contract only** |
| Owner with owner endpoint | No through owner endpoint | Register/stop through owner endpoint | Indirect via gate | No by endpoint |
| Resource operator with same-host file privileges | Yes if IPC acquired | Not required | **Yes** | **Yes** |
| Observer with same-host file privileges | Read/copy | Not required | May share admin access | **Yes** |
| Independently administered observer | NOT IMPLEMENTED | NOT IMPLEMENTED | NOT IMPLEMENTED | NOT IMPLEMENTED |

No operating-system sandbox or real secret/credential isolation is claimed.

## Failure-injection schedule and oracle
1. Register a synthetic task, commit token `before`. Queue `queued` in test memory.
2. Owner commits STOP. Retry `queued`, replay `before`, attempt unauthorized `register` and `stop` via requester endpoint.
3. Restart the resource process after STOP; retry `queued`. Inspect SQLite effects through a separate connection.
4. **Compromise resource operator:** directly insert `operator-bypass` into effects after STOP. Confirm the unauthorized effect exists, despite gate denial.
5. **Alternate path:** directly mutate task row and insert `alternate-path`. Confirm normal requester remains denied while the bypassed consequence exists.
6. **Compromise observation:** copy `concealed` to a separate observer DB, then delete both records as the same host operator. Confirm both readers return empty.
7. Preserve raw test log, Python/SQLite versions, exact SHA, CI run link, and a human disposition. Do not mistake the synthetic DB row for a physical-world consequence.

## Explicit counterexamples
- **TA-01 SUPPORTED if reproduced:** requester IPC denies post-STOP replay and queued action, including after restart.
- **TA-02 CONTRADICTED:** claimed complete mediation is false when the resource operator has direct DB write access. Expected demonstration inserts an effect after STOP.
- **TA-03 CONTRADICTED:** claimed independent observation is false when one principal can delete both resource and observer records.
- **TA-04 CONTRADICTED:** distinct process roles or distinct database files do not by themselves establish independent administrative custody.
- **TA-05 NOT TESTED:** actual credential theft, separate OS principals, network partition, cross-host recovery, hardware stop, external log sink, or physical consequence.
- **TA-06 NOT TESTED:** a genuine compromise of independently administered witness, resource, and observer.

## Specialist falsifiers
For a future stronger specimen, demand all of the following:
- Three separate, independently administered security principals or hosts with documented privilege graph.
- Requester has no credentials, OS rights, filesystem access, deployment controls, or recovery channel that can change witness or resource authority.
- Resource refuses unauthorized writes at its actual commitment boundary; direct storage and alternative paths are either denied or explicitly excluded from the claim.
- Observer independently witnesses real effects; operator cannot edit, erase, suppress, or selectively route observations without externally detectable evidence gaps.
- Revocation has an explicit linearization point and measured stop latency. All queued, retried, delegated, restarted and recovered requests are checked against current MAY.
- Fault injection against host operator, issuer custody, key rotation, clock rollback, partitions, retries, backups, evidence outages, log forgery and colluding principals.
- Independent specialist provides reproducible traces and an alternative explanation; human owner decides disposition.

## Reproduce
```bash
cd workshop/tsa-brakes
python -m unittest -v test_three_authority_compromise.py
```
No live credentials, external systems, or real victim data. The test deliberately bypasses a **disposable test database** only.

## Evidence custody record template
```text
commit SHA:
CI run and job:
Python / SQLite / OS:
resource hash before / after:
witness hash before / after:
observer hash before / after:
actor and exact privilege:
STOP acknowledgement and effective point:
actual consequence oracle:
observed counterexample:
alternate explanation:
evidence state:
human disposition: PENDING
publication authorized: false
deployment authorized: false
```

**No self-certification. No external stop demonstrated. CAN ⊬ MAY.**
