# Final Web Integration Scan v0.1

## State

RESEARCHED CANDIDATES — HUMAN SELECTION REQUIRED — NO DEPENDENCY ADDED

This scan identifies external projects that may complement The Impossible System. No project below is treated as a complete brake, verifier, legal authority, or substitute for human disposition.

## Highest-value candidates

### Open Policy Agent (OPA)

Official site: https://openpolicyagent.org/

OPA is a general-purpose policy engine that separates policy decisions from application code and can be used across services, gateways, CI/CD, and infrastructure. [Official OPA documentation](https://openpolicyagent.org/docs)

Potential fit:

- translate lane, scope, owner, expiry, and access rules into executable policy;
- evaluate access requests separately from the assistant;
- return a decision record for the consequence receipt;
- test policy changes before deployment.

Boundary:

OPA can evaluate policy. It does not become the legitimate authority that authored the policy, owns the consequence, or provides the external brake.

### Cedar

Official reference: https://docs.cedarpolicy.com/

Cedar is a policy language for writing authorization policies and making authorization decisions. [Cedar language reference](https://docs.cedarpolicy.com/)

Potential fit:

- formalize `CAN` versus `MAY` at the access layer;
- express subject, action, resource, context, and constraints;
- make policy decisions inspectable and testable;
- support explicit deny paths.

Boundary:

Cedar can express and evaluate authorization rules. A policy decision is not automatically lawful authority, human consent, consequence ownership, or independent verification.

### in-toto and SLSA

Official sources: https://in-toto.io/ and https://slsa.dev/

in-toto records what supply-chain steps were performed, by whom, and in what order. [in-toto overview](https://in-toto.io/) SLSA uses provenance predicates to record build characteristics and defines verification requirements. [SLSA and in-toto](https://slsa.dev/blog/2023/05/in-toto-and-slsa)

Potential fit:

- provenance for repository artifacts, generated documents, and releases;
- source-to-build-to-release receipts;
- explicit functionary and step identity;
- detection of unauthorized or missing build steps;
- stronger custody for specialist handoffs.

Boundary:

Provenance establishes a recorded chain of process claims. It does not prove that the process was substantively correct, legally authorized, safe, or sufficient.

### OpenTelemetry

Official sources: https://opentelemetry.io/docs/ and https://opentelemetry.io/docs/concepts/signals/

OpenTelemetry is a vendor-neutral observability framework for traces, metrics, and logs. Its signals can correlate a request path, runtime measurements, event records, and contextual baggage. [Official signals overview](https://opentelemetry.io/docs/concepts/signals/)

Potential fit:

- consequence-receipt correlation IDs;
- end-to-end transition traces;
- timing, queue, retry, and degradation evidence;
- detection of lane intersections and hidden downstream actions;
- runtime evidence for maintenance and revocation testing.

Boundary:

Observability is not control. A trace can show what was recorded; it cannot stop a system unless connected to an independently controlled brake. Logs also remain subject to omission, sampling, custody, and interpretation limits.

## Integration map

```text
OPA / Cedar
→ access and policy decision

in-toto / SLSA
→ provenance and custody

OpenTelemetry
→ runtime evidence and correlation

The Impossible System
→ lane, owner, uncertainty, handoff, consequence, and external-brake interpretation
```

## Recommended order

1. Define a vendor-neutral consequence-receipt envelope.
2. Add correlation IDs and transition events without granting execution authority.
3. Prototype OPA or Cedar only for access evaluation, not final disposition.
4. Add in-toto/SLSA-style provenance to repository and build artifacts.
5. Map telemetry events to the receipt without treating observability as verification.
6. Run the Sledgehammer against policy bypass, provenance gaps, sampled logs, stale authority, and brake independence.
7. Seek specialist review before selecting production dependencies.

## Integration omissions

- No dependency has been installed.
- No live policy engine is connected.
- No telemetry is collected.
- No provenance attestation has been generated.
- No external brake has been wired.
- No vendor or project has been independently evaluated for legal, operational, or security suitability.

## Final assessment

These projects complement different layers. None is The Impossible System, and none should be allowed to become the final judge of the system that integrates it.

> **Use external tools to make access, provenance, and runtime behavior more visible. Keep authority, consequence ownership, and the final brake outside the tool being evaluated.**
