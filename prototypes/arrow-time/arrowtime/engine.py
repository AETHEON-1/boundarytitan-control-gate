"""Synthetic authority/time investigation only. No external effects."""
from datetime import datetime, timezone
from .composition import evaluate_composition

VALID_NODES = {"actor", "system", "evidence", "permission", "decision", "action", "consequence", "control"}
VALID_EDGES = {"evidence", "dependency", "delegation", "execution", "consequence", "review", "stop"}

def timestamp(value):
    if not isinstance(value, str):
        return None
    try:
        dt = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return dt.astimezone(timezone.utc) if dt.tzinfo else None
    except ValueError:
        return None

def analyze(fixture):
    """Return bounded observations, never an authority determination."""
    findings = []
    def add(code, state, detail):
        findings.append({"code": code, "state": state, "detail": detail})
    nodes = fixture.get("nodes", [])
    ids = [n.get("id") for n in nodes]
    if len(ids) != len(set(ids)) or any(n.get("type") not in VALID_NODES for n in nodes):
        add("NODE_SCHEMA", "CONTRADICTED", "Duplicate IDs or invalid node types")
    for edge in fixture.get("edges", []):
        if edge.get("from") not in ids or edge.get("to") not in ids or edge.get("type") not in VALID_EDGES:
            add("EDGE_SCHEMA", "CONTRADICTED", "Invalid edge or unknown endpoint")
    events = fixture.get("events", [])
    event_map = {e.get("id"): e for e in events}
    if len(event_map) != len(events):
        add("EVENT_SCHEMA", "CONTRADICTED", "Duplicate event IDs")
    graph = {e.get("id"): e.get("after", []) for e in events}
    visited, active = set(), set()
    def visit(x):
        if x in active:
            return True
        if x in visited:
            return False
        active.add(x)
        if any(visit(y) for y in graph.get(x, []) if y in graph):
            return True
        active.remove(x)
        visited.add(x)
        return False
    if any(visit(x) for x in graph):
        add("CAUSAL_CYCLE", "CONTRADICTED", "Declared causal graph contains a cycle")
    for e in events:
        t = timestamp(e.get("time"))
        if t is None:
            add("EVENT_TIME", "INDETERMINATE", "Missing or invalid timezone-aware timestamp: " + str(e.get("id")))
        for predecessor in e.get("after", []):
            p = event_map.get(predecessor)
            if p is None:
                add("CAUSAL_REFERENCE", "INDETERMINATE", "Unknown predecessor: " + str(predecessor))
            elif t and timestamp(p.get("time")) and t < timestamp(p["time"]):
                add("CLOCK_CAUSAL_CONFLICT", "CONTRADICTED", "Declared causality conflicts with recorded clock order")
    permissions = {p.get("id"): p for p in fixture.get("permissions", [])}
    for e in events:
        if e.get("kind") != "execution":
            continue
        t = timestamp(e.get("time"))
        p = permissions.get(e.get("permission"))
        if not p:
            add("MISSING_PERMISSION", "INDETERMINATE", "Execution lacks declared permission")
            continue
        start, end = timestamp(p.get("start")), timestamp(p.get("end"))
        if not (t and start and end):
            add("AUTH_WINDOW", "INDETERMINATE", "Incomplete permission timing evidence")
        elif not (start <= t < end):
            add("AUTH_WINDOW", "CONTRADICTED", "Execution outside declared permission window")
        else:
            add("AUTH_WINDOW", "SUPPORTED", "Recorded execution falls within declared window; authority not certified")
        revocations = [timestamp(r.get("time")) for r in events if r.get("kind") == "revocation" and r.get("permission") == p.get("id")]
        if t and any(r is not None and r <= t for r in revocations):
            add("PRIOR_REVOCATION", "CONTRADICTED", "Recorded revocation precedes execution; enforcement unknown")
    findings.extend(evaluate_composition(fixture))
    if not fixture.get("consequence_bearer"):
        add("MISSING_BEARER", "INDETERMINATE", "No documented consequence bearer")
    if not fixture.get("external_stop"):
        add("MISSING_STOP", "INDETERMINATE", "No declared external stop path")
    return {"status": "YELLOW", "scope": "synthetic fixture only", "findings": findings,
            "independent_enforcement": "NOT TESTED", "authority_certification": "NOT AUTHORIZED"}
