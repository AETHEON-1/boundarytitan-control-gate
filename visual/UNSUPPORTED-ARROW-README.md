# First Unsupported Arrow Finder

A read-only visual instrument for locating the first transition whose evidence, owner, consequence, or stop path is insufficient.

Each arrow records:

- source and destination JSON Pointers;
- transition claim;
- evidence state;
- evidence pointers;
- consequence;
- owner;
- stop path;
- disposition.

JSON Pointer provides deterministic locations inside the canonical document, consistent with RFC 6901. This fixture is not a live ledger and cannot authorize, certify, approve, release, execute, revoke, or close anything.

Open `unsupported-arrow.html` through a local static server.
