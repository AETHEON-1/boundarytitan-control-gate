# Test-Boundary Control Gap v0.1

Status: PREPARED
Execution: NOT STARTED
Independent evaluation: NOT PERFORMED
Field validation: NOT APPROVED
Deployment: NOT APPROVED

## Problem

A test label does not isolate consequences.

A system under evaluation may still reach real people, identities, repositories, networks, vendors, or infrastructure if the evaluation environment is not independently controlled.

## Required boundary

`test authorization -> disposable environment -> external gateway -> allowlisted target -> independently monitored action -> external stop -> evidence-preserved disposition`

## Required controls

- disposable credentials and identities;
- no uncontrolled public-network access;
- explicit egress allowlists;
- independent gateway enforcement;
- independent outbound monitoring;
- tested emergency stop;
- measured detection-to-containment latency;
- bounded execution depth;
- isolated human reviewers;
- append-only incident evidence;
- correction and reopening records.

## Failure states

- TEST_BOUNDARY_UNKNOWN
- REAL_EXTERNAL_SURFACE_REACHED
- EGRESS_CONTROL_BYPASSED
- IDENTITY_IS_NOT_DISPOSABLE
- MONITORING_DELAY_UNMEASURED
- CONTAINMENT_LATENCY_UNKNOWN
- HUMAN_REVIEWER_EXPOSED
- STOP_PATH_UNTESTED
- EVIDENCE_CUSTODY_UNCLEAR

## Prohibited conclusions

The control must not issue:

- SAFE TEST ENVIRONMENT
- COMPLETE CONTAINMENT
- NO REAL-WORLD CONSEQUENCE
- RUNTIME CONTROL ESTABLISHED
- CERTIFIED EVALUATION

## Required human disposition

The evaluation owner must identify:

- consequence owner;
- evidence custodian;
- external stop authority;
- affected-party and remedy path;
- authority to reopen the evaluation;
- authority to terminate the environment.

AISI's 2026 incident report is a motivating evidence record for this gap, not validation of this specification.

No owner, no brake. No ledger, no trust.
