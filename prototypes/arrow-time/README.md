# Arrow Mapper + Time Arrow v0.1 (review fixture)
Status: YELLOW. Synthetic, local, read-only investigation. No production access, enforcement, approval, deployment or certification.

Run: `python -m unittest discover -s prototypes/arrow-time/tests -v` from repo root.
Run: `python prototypes/arrow-time/cli.py prototypes/arrow-time/fixtures/revoked_queued.json`.

This isolated Python standard-library prototype complements, but does not replace, `src/types/temporal.ts`. The existing TypeScript implementation checks UTC windows; this prototype examines fixture-declared event ordering, revoked permissions and missing evidence. A timestamp is not proof of causal receipt, institutional authorization, independent stopping, or physical consequence. No live connectors or credentials.

HTK is a translation interface, not an approval mechanism. No change to canonical doctrine, execution gates, or existing modules. Review required before integration.

Known limitations: incomplete causal ordering, untrusted fixture assertions, no independent source validation, no measured stop latency, no clock-skew bounds, no real-world consequence horizon. Results describe the supplied synthetic records only.
