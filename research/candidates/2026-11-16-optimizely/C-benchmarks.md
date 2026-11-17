# C | Reality Benchmarks
Links A,B,D,E,F,G. All tests UNTESTED; local synthetic fixtures only in future separately authorized execution. E01 reports 256 hosts examined, 159 organisation classifications: 68 no CSP; 50 execution/exfiltration allowed; 17 partial; 24 payload blocked (24/159=15.09%). 19 organisations difference from 178 reported; host vs organisation aggregation unresolved. No CSP does not imply no other controls. Report-only is detection, not enforcement. No scores granted.

| ID | Path | candidate control | independent effect oracle |
|---|---|---|---|
| RB-01 | modified supplier bytes | SRI | expected hash mismatch prevents execution |
| RB-02 | secondary script | script-src | harmless marker absent |
| RB-03 | descendant execution | restricted trust propagation | child marker absent |
| RB-04 | dynamic evaluation | eval restriction | inline marker absent |
| RB-05 | payment field access | cross-origin payment frame | dummy secret unreadable |
| RB-06 | outbound data | connect-src | independent sink receives nothing |
| RB-07 | address substitution | DOM isolation | dummy address unchanged |
| RB-08 | frame delivery | frame-src | local mock frame not loaded |
| RB-09 | reinfection | revoke project write | subsequent dummy write denied |
| RB-10 | existing execution | containment | no post-denial local effect |
| RB-11 | policy rewrite | independent policy custody | executor cannot modify policy |
| RB-12 | financial consequence | simulated transaction stop/recovery | independent ledger shows denial or restitution |

IDs scoped to this case, not global RB registry. For each test specify browser/version, policy, fixture hash, baseline positive control, negative control, fallback routes, named owner, policy custody, denial timestamp and effect timestamp; distinguish prevention from detection and recovery. Test report-only versus enforcement, cached/already-running code, inline fallback, script trust, alternate channels, and control modification. SRI pins bytes rather than benign behavior. Hosted payment frames protect only under defined isolation assumptions. No live malware, external endpoints or real credentials. BT-HC-004 remains NOT_TESTED in inspected source; local passes cannot close it. Independent reviewer should compare ordinary CSP/least-privilege methodology to this framework on identical evidence.
