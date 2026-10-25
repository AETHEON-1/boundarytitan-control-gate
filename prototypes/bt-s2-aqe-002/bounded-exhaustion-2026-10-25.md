# BT-S2-AQE-002 Bounded Exhaustion Evidence

State: CONTROLLED FINITE SIMULATION; NOT PRODUCTION ENFORCEMENT; NOT CERTIFICATION.

Local execution: python3 -m unittest -v test_simulator.py
Result: 4/4 successful.
Finite search: all sequences of lengths 1, 2, 3 from 16 Step tuples (principal 0/1, scope 0/1, effect 0/1, authorized false/true). 16 + 256 + 4096 = 4368 sequences.

Naive local gate: all individual authorized flags true.
Composite policy: total effect must belong to {0,1}.
Result: 272 sequences pass local gate while violating composite policy.
Minimal witness: two locally authorized effect=1 operations, combined effect=2.

Interpretation: counterexample to this synthetic local-only gate, not proof of a real production defect or a novel theoretical result. The gate is deliberately naive and the composite policy is externally stipulated for the simulation. The current semantic novelty engine did not independently discover this mechanism; this test is human-designed.

Limits: no real credentials, revocation, concurrency, asynchronous queues, distributed policy, stop latency, execution instrumentation, or independent evidence custody. No Hypothesis dependency added; this is standard-library finite enumeration.

Original BT-S2-AQE-001 failures preserved. Frozen doctrine and existing CI workflow unchanged. No scheduled execution, merge, deployment or consequential permission authorized.

Specialist handoff: independently reproduce counts, challenge the chosen policy and step semantics, add metamorphic transformations and adversarial mutations, then test a realistic isolated execution gate with independent observation.
