"""Declared cross-action constraints. Synthetic evidence only, never permission."""
from decimal import Decimal, InvalidOperation

def _amount(value):
    if isinstance(value, bool) or not isinstance(value, (int, float, str)):
        return None
    try:
        number = Decimal(str(value))
        return number if number.is_finite() and number >= 0 else None
    except (InvalidOperation, ValueError):
        return None

def evaluate_composition(fixture):
    """Evaluate explicitly declared groups; absent evidence yields INDETERMINATE."""
    findings = []
    def add(code, state, detail):
        findings.append({"code": code, "state": state, "detail": detail})
    constraints = fixture.get("cross_action_constraints", [])
    if not isinstance(constraints, list):
        add("COMPOSITION_SCHEMA", "INDETERMINATE", "Constraints must be a list")
        return findings
    events = fixture.get("events", [])
    if not isinstance(events, list):
        add("COMPOSITION_SCHEMA", "INDETERMINATE", "Events unavailable")
        return findings
    by_id = {e.get("id"): e for e in events if isinstance(e, dict) and isinstance(e.get("id"), str)}
    for c in constraints:
        if not isinstance(c, dict) or not isinstance(c.get("id"), str) or not c["id"]:
            add("COMPOSITION_SCHEMA", "INDETERMINATE", "Constraint lacks valid identity")
            continue
        cid = c["id"]
        if c.get("kind") != "sum_limit":
            add("COMPOSITION_SCHEMA", "INDETERMINATE", f"{cid}: unsupported constraint kind")
            continue
        member_ids = c.get("event_ids")
        limit = _amount(c.get("max_total"))
        if not isinstance(member_ids, list) or not member_ids or any(not isinstance(i, str) for i in member_ids) or len(set(member_ids)) != len(member_ids) or limit is None:
            add("COMPOSITION_SCHEMA", "INDETERMINATE", f"{cid}: invalid members or maximum")
            continue
        missing = [i for i in member_ids if i not in by_id]
        if missing:
            add("COMPOSITION_EVIDENCE", "INDETERMINATE", f"{cid}: missing event IDs {missing}")
            continue
        members = [by_id[i] for i in member_ids]
        if any(e.get("kind") != "execution" for e in members):
            add("COMPOSITION_EVIDENCE", "INDETERMINATE", f"{cid}: non-execution member")
            continue
        permission = c.get("permission")
        if not isinstance(permission, str) or any(e.get("permission") != permission for e in members):
            add("COMPOSITION_EVIDENCE", "INDETERMINATE", f"{cid}: permission binding missing or inconsistent")
            continue
        values = [_amount(e.get("amount")) for e in members]
        if any(v is None for v in values):
            add("COMPOSITION_EVIDENCE", "INDETERMINATE", f"{cid}: missing or invalid amount")
            continue
        total = sum(values, Decimal(0))
        if total > limit:
            add("COMPOSITION_LIMIT", "CONTRADICTED", f"{cid}: declared total {total} exceeds declared limit {limit}; authorization not adjudicated")
        else:
            add("COMPOSITION_LIMIT", "SUPPORTED", f"{cid}: declared total {total} within declared limit {limit}; completeness and authorization not established")
    return findings
