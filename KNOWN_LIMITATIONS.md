# Known Limitations

These limitations are preserved as part of Architecture v1.0 RC1.

KL-01 — Exhaustive public URL coverage is not machine-certified.

The available deep-research reports supplied useful doctrine extraction but did not provide a sufficiently complete machine-readable manifest to prove that every current public URL was reviewed.

Disposition:
The architecture may be published as a coherent approved specification. It must not claim independently proven exhaustive site coverage unless the human owner separately approves that claim.

KL-02 — Source URLs require final verification.

Some source-manifest entries were derived from research reports or project continuity and require final URL and canonical-title verification before a public traceability claim is made.

KL-03 — Licensing remains undecided.

No public reuse license is selected in RC1. Publication should either include a chosen license or explicitly state that no license is granted beyond applicable law.

KL-04 — Cryptographic custody is specified at an architectural level.

The architecture supports content hashes and tamper-evident evidence. It does not select a final signing infrastructure, public timestamp service, or key-custody implementation.

KL-05 — Revocation latency budgets are domain-dependent.

The architecture requires stop and revocation dominance but does not impose one universal timing threshold across healthcare, finance, robotics, cybersecurity, publication, and other lanes.

KL-06 — Low-risk prototypes may combine roles.

The authority-role model supports separation of duties. A local prototype may place multiple roles in one human owner, but production deployments require a lane-specific separation-of-duty review.

KL-07 — No production implementation has been tested.

RC1 is an architecture specification. Passing architectural review does not prove that future code, integrations, operators, credentials, or deployments conform.

KL-08 — Publication is not certification.

Public release would establish provenance and make the architecture inspectable. It would not certify universal safety, legal compliance, operational fitness, or correctness.
