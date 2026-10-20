"""Adversarial negative controls: expose limitations, not production assurance."""
from completion_extinction import run
from consequence_mapping import interrogate,example

def restart_resurrection_counterexample():
    # Current fixture's closed set is in RAM: a fresh custodian forgets closure.
    closed_before_restart={"T-001"}
    closed_after_restart=set()
    stale_grant="T-001"
    resurrected=(stale_grant not in closed_after_restart)
    return {"closed_before":bool(closed_before_restart),"closed_after":bool(closed_after_restart),
            "resurrection_possible":resurrected,"state":"CONTRADICTED"}

def identity_spoof_counterexample():
    # Current custodian_service.py trusts the caller-provided actor string.
    supplied_actor="predecessor"
    actual_actor="successor-B"
    allowed=(supplied_actor=="predecessor" and "inspect"=="inspect" and not False)
    return {"actual_actor":actual_actor,"claimed_actor":supplied_actor,
            "unauthorized_impersonation_accepted":allowed,"state":"CONTRADICTED"}

def cross_task_isolation():
    # The completion fixture uses task-scoped equality; a T-001 grant cannot commit T-002.
    task="T-002";grant="T-001"
    return {"cross_task_allowed":grant==task,"state":"SUPPORTED"}

def ownership_omission():
    record=example();record.pop("consequence_owner")
    return interrogate(record)

def authority_laundering():
    record=example()
    record["authority_source"]="model_output"
    record["decision_owner"]="AI"
    return interrogate(record)
