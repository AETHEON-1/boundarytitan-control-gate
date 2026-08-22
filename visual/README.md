# Boundary State Inspector

A static, read-only visual prototype for the Visual Representation Contract v0.1.

Open `index.html` through a local static server. The page reads `visual-state.json` and renders:

- source and freshness metadata;
- consequence receipt;
- authority transitions;
- evidence and uncertainty;
- stop and revocation state;
- append-only ledger events.

This prototype has no write path, credentials, live connection, approval control, permission grant, release token, execution path, revocation action, or closure mechanism.

The JSON fixture is canonical for this prototype only. It is not the production ledger and does not establish safety, completeness, or deployment readiness.
