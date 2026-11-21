# BT-USA-SIGMA2-006–008 | Human–Machine Authority Bridge: specialist reproduction

**State:** YELLOW / synthetic fixtures / independent review pending. **Primary coordination:** #162. **Specialist contracts:** #127, #131, #178. **Related Encyclopedia candidate:** #175. **Human consequence owner and external stop:** BoundaryTitan human owner.

## Scope and evidentiary limit
This review branch preserves runnable source and tests from the three conversation-produced synthetic fixtures. It does **not** certify California's emergency-shutdown architecture, distributed atomicity, independent observation, completeness of threat coverage, or legitimacy of any real-world order. No live system access, credential use, deployment, merge, or doctrine change is authorized.

## Reproduce
Requires Python 3.10+; standard library only. From the repository root:

```sh
cd research/BT-USA-SIGMA2-006-008/006 && python -m unittest discover -v
cd ../007 && python -m unittest discover -v
cd ../008 && python -m unittest discover -v
```

**Prior conversation-reported results:** 006: 6 tests; 007: 7 tests; 008: 5 tests. These are prior self-reported executions, not independently reproduced GitHub CI receipts. Preserve discrepancies if independent replay differs.

## Fixture lineage and failure classes
- **006:** Machine warning → evidentiary standing → human order → instruction translation → queued effect. Six synthetic cases; independence and admissibility remain unverified.
- **007:** Dispatch → human denial → queue/delegate/replay/recovery. Local stale authorization permits post-denial commit; modeled recipient checks reject it. The model assumes durable epochs and denial sets; recovery is a stub, not a crash test.
- **008:** Explicit T1 permission check, T2 pause, T3 effective denial, T4 resume, T5 commit. Stale ALLOW produces a synthetic effect in the vulnerable implementation. Commit-time and epoch-fenced guards reject it under a shared in-process lock. The lock is **not** a distributed enforcement mechanism.

## Original conversation ZIP custody
The original archives were produced in the conversation, not uploaded to this GitHub branch:
- 006: SHA-256 `0d7d014e5d116a35a993726a46facb227ef6604c4ffff2c3978e462d10247631`
- 007: SHA-256 `8d40df3bec82551710fca9b84466b45fdca78c566d77afc4cd549d63fa59f2bf`
- 008: SHA-256 `279b111ee98053545dce984ec50a51c06ba2870d3670a4982282bd92633a3689`

These digests identify the original ZIP archives, **not** the repository source tree or an independent custody chain. The branch includes the executable Python source and unit tests, not the ZIP byte-for-byte, generated test logs, or all original README/review/traces files. Treat this as a **source/test extraction**, not complete archival preservation. Do not erase or overwrite the originals.

## Independent review contract
1. Before reading the fixture, submit a blind threat model and candidate unmodeled consequence path; freeze it with provenance.
2. Independently reproduce each test; capture Python version, platform, checkout commit SHA, stdout/stderr, exit codes and file digests.
3. Challenge assumptions: stale credentials, delayed/replayed jobs, concurrency, network partition, crash/restart, unauthorized delegated paths, pre/post-denial effect ordering, observer compromise, false positives.
4. Separate **check**, **effective denial**, **recipient authorization**, **commit**, and **independently observed effect** timestamps. Identify linearization point and who controls it.
5. Preserve all failures, negative results, contradictions, and test invalidity. Report FAILURE OBSERVED / NO FAILURE OBSERVED WITHIN SCOPE / INDETERMINATE / TEST INVALID / NOT TESTED.
6. No reviewer, model, or fixture self-certifies safety, completeness, jurisdiction, or authorization. Human owner controls disposition.

## Stopping point
The machine-designed synthetic test cycle has reached a **methodological information exhaustion point**. Further self-designed green tests are not a substitute for independent adversarial tests against previously undisclosed paths and independent effect measurement.

**Σ₂:** The machine can produce evidence. The human can issue authority. Neither can prove the bridge between them is legitimate merely because the consequence occurred.

**CAN ⊬ MAY. ⚒️**
