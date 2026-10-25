# BT-S2-AQE-001 Quarantined Novelty Battery
State: READ-ONLY PREPARATION; INDEPENDENT CI PENDING.

Historical baseline retained: original 12 regression tests; previous mutation detection 8/9; original unknown mechanism discovery 0/6. No original engine or tests overwritten.

Additive files: novelty.py and test_novelty.py. The quarantine accepts unknown labels, preserves evidence references and input state, and generates four falsification-oriented template questions per candidate. It cannot admit candidates or authorize execution.

Local development battery on separately reconstructed engine: 19/19 tests successful; 12/12 selected mutations detected, including the previously surviving fixed-question text drift. This is bounded mutation coverage, not general robustness or independent CI attestation. The repository's exact additive version has not yet been executed in CI.

Six unfamiliar candidate labels produced 24 templated questions locally: cross_tenant_scope_confusion, approval_source_compromise, post_execution_compensation, resource_exhaustion_denial, clock_skew_expiry, policy_version_split_brain. These are not proven novel structural classes.

F-001 preserved: original fixed question text mutation survived prior suite. Exact text regression added.
F-002 preserved: original unknown mechanism rejection yielded no novelty questions. Separate quarantine added.
L-007: templated questions do not establish semantic novelty or real vulnerability discovery.
L-008: external enforcement and independent CI remain NOT TESTED.

Reproduction: cd prototypes/bt-s2-aqe-001 && python3 -m unittest -v test_engine.py test_novelty.py

No changes to frozen doctrine, existing verification workflow, historical files, scheduling, credentials, main branch, or consequential permissions. Specialist evaluation and authority remain external.
