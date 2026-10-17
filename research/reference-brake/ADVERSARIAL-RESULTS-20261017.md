# Encyclopedia of Chaos | BT-REF-BRAKE-004
State: YELLOW / DEVELOPMENT / DRAFT / NO DEPLOYMENT
Date: 2026-10-17

## Execution
On local Python interpreter, existing test_brake_v2.py: 10 PASS (6.768s).
New test_adversarial.py: 7 tests, 6 PASS and 1 FAIL (4.959s).
A passing adversarial test can demonstrate attacker success rather than defensive success.

## Reproduced findings
- ADV-01 / OBSERVED / AUTHORITY CHANNEL BYPASS: Controller with access to shared command queue directly issued grant for 'intruder' and committed its action. Attack passed, proving absence of requester-versus-authority access control under this threat model. Not a network exploit.
- ADV-02 / OBSERVED / WITNESS FABRICATION: Controller injected fabricated ('commit','fake','write','fabricated') into witness queue; read returned fabricated event. No independent witness custody.
- ADV-03 / CONDITIONAL POLICY FAILURE: After revoke('a'), fresh grant('a') was accepted and committed; test asserting identity suspension FAILS (True is not false). This is only a defect if revoke is meant to disable identity, rather than invalidate preexisting grants. Specification ambiguous; specialist/human decision needed.
- ADV-04 / PASSED WITHIN FIXTURE: Reuse of nonce with a different action rejected after first commit.
- ADV-05 / PASSED WITHIN FIXTURE: Cross-identity token reuse rejected.
- ADV-06 / PASSED WITHIN FIXTURE: Unrelated principal grant remains usable after another principal revocation.
- ADV-07 / COVERAGE LIMITATION: Killing service process is confirmed; this test does NOT prove fail-closed external resource behavior or durable recovery.

## Outstanding gaps
No independent resource or authority administration, persistent storage, actual requester OS compromise, real requester restart, distributed linearization, partitions, crash recovery, resource operator compromise, observer independence, alternate-path completeness, real-world consequence, specialist replication, or full repo regression.

## Next acceptance requirements
Define precise revoke semantics (grant invalidation vs identity suspension), authenticate all authorization commands from an independent principal, ensure resource-side enforcement at a defined commit point, observe consequences externally, and test loss of authority service, concurrent races, and alternate paths. Preserve negative tests as regression fixtures.

## Disposition
The ten original passes remain true but are insufficient for independent control. Two concrete attack successes demonstrate authority-channel and evidence-custody weakness. One failed policy assertion requires an explicit policy choice. No deployment or external-brake claim. Human owner controls promotion.
CAN does not entail MAY. No owner, no brake. No ledger, no trust.
