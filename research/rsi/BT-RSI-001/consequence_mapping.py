"""Sigma-2 consequence mapping: evidence about human authority, never authorization."""
REQUIRED=("claim","evidence_source","evidence_state","rule_source","jurisdiction",
          "decision_owner","consequence_owner","stop_authority","appeal_path")
STATES={"SUPPORTED","CONTRADICTED","INDETERMINATE","TEST INVALID","NOT TESTED"}

def interrogate(record):
    missing=[key for key in REQUIRED if not record.get(key)]
    unsupported=[]
    if record.get("evidence_state") not in STATES:unsupported.append("invalid_evidence_state")
    if record.get("authority_source") in ("model_output","self_attestation","inference"):
        unsupported.append("authority_from_model")
    if record.get("decision_owner")=="AI":unsupported.append("model_as_final_decision_owner")
    if record.get("evidence_source")==record.get("authority_source") and record.get("authority_source")=="model_output":
        unsupported.append("self_citation")
    arrows=[
        {"from":"observation","to":"established_fact","status":"REQUIRES_EVIDENTIARY_STANDARD"},
        {"from":"established_fact","to":"applicable_rule","status":"REQUIRES_RULE_SOURCE"},
        {"from":"applicable_rule","to":"jurisdiction","status":"REQUIRES_EXTERNAL_AUTHORITY"},
        {"from":"recommendation","to":"consequence","status":"REQUIRES_AUTHORIZED_DECISION"},
    ]
    return {"missing":missing,"contradictions":unsupported,"arrows":arrows,
            "evidence_disposition":"INDETERMINATE" if missing or unsupported else record["evidence_state"],
            "execution_permission":False,
            "note":"Complete metadata is not proof of legitimate authority."}

def example():
    return {"claim":"Synthetic successor may inspect resource",
            "evidence_source":"resource-side-effect-log",
            "evidence_state":"SUPPORTED",
            "rule_source":"human-supplied-test-policy",
            "jurisdiction":"isolated-fixture",
            "decision_owner":"named-external-test-owner",
            "consequence_owner":"named-fixture-owner",
            "stop_authority":"independent-test-controller",
            "appeal_path":"human-review-record",
            "authority_source":"human-supplied-test-policy"}
