# 15 — API Specification

## Preparation APIs

POST /signals
POST /proposals
POST /evidence
POST /route
POST /validate
POST /receipts
POST /break-pass

These endpoints may prepare records and findings. They may not authorize.

## Human authority APIs

POST /human-decisions
POST /permissions
POST /revocations

These require authenticated human or institutional authority and explicit scope.

## Release and execution APIs

POST /releases
POST /executions
POST /stops
POST /rollbacks

Release requires:
- valid approval;
- valid permission;
- no revocation;
- stop-path ready;
- matching action hash;
- current evidence where required.

## Read APIs

GET /proposals/{id}
GET /receipts/{id}
GET /audit-events
GET /owners
GET /lanes
GET /policies
GET /incidents

## API invariant

No preparation endpoint may call a human-authority or release endpoint using machine-generated credentials or inferred consent.
