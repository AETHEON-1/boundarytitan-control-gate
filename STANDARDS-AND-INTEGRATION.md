# Standards and Integration Map

BoundaryTitan uses external standards as engineering references and evidence
formats. None of them grants authority, certifies safety, establishes legal
compliance, or closes human review.

## Borrowed patterns

- [Cedar](https://github.com/cedar-policy/cedar): explicit authorization
  entities, actions, context, schema validation, and policy simulation.
- [Open Policy Agent](https://github.com/open-policy-agent/OPA): declarative
  policy separation, versioned bundles, and structured decision records.
- [Inspect AI](https://github.com/UKGovernmentBEIS/inspect_ai): task,
  scenario, tool, transcript, scorer, and reproducible evaluation structure.
- [OpenTelemetry Semantic Conventions](https://github.com/open-telemetry/semantic-conventions):
  stable event names, timestamps, resource identity, and structured attributes.
- [in-toto Attestation Framework](https://github.com/in-toto/attestation):
  subject-bound typed attestations and test-result records.
- [SLSA](https://slsa.dev/spec/v1.2/build-track-basics): provenance maturity
  and source-to-artifact expectations.
- [Sigstore Cosign](https://github.com/sigstore/cosign): artifact signing and
  transparent release records.
- [OpenSSF Scorecard](https://github.com/ossf/scorecard): repository and
  supply-chain posture checks.
- [SPIFFE/SPIRE](https://github.com/spiffe/spire): workload identity,
  attestation, rotation, and trust-domain separation.
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework):
  external risk-management vocabulary.
- [OWASP Agentic AI threats](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/):
  adversarial scenario categories for agentic systems.

## BoundaryTitan additions

The repository adds the missing decision-boundary layer:

```text
policy and identity
→ scenario and event trace
→ evidence and attestation
→ first unsupported arrow
→ consequence owner
→ external stop authority
→ human disposition
```

The canonical artifacts introduced by this integration are:

- `control-event-record.schema.json` — normalized observation record;
- `evaluation-record.schema.json` — bounded evaluation and handoff record;
- `src/types/control-event-record.ts` — TypeScript event contract;
- `src/types/evaluation-record.ts` — TypeScript evaluation contract and builder.

The builder is intentionally not an authorization function. It only assembles
an evidence record and permanently reports that machine authority,
certification, and closure are false.

## Conformance rule

An external standard may strengthen identity, policy, telemetry, provenance,
or repository hygiene. It may not silently promote:

```text
identity → authority
policy result → legitimacy
telemetry → evidence sufficiency
attestation → permission
signature → truth
test pass → safety
```
