"""BT-RSI-009 cross-language metadata predicate; NOT authority verification."""
FIELDS=("evidence_source","rule_source","jurisdiction","decision_owner","consequence_owner","execution_authority","stop_authority","appeal_path")
STATES={"SUPPORTED","CONTRADICTED","INDETERMINATE","TEST INVALID","NOT TESTED"}
def lint(record):
    return (all(isinstance(record.get(k),str) and bool(record[k].strip()) for k in FIELDS)
        and record["decision_owner"].strip().lower() not in {"ai","model","machine"}
        and record.get("evidence_state") in STATES)
