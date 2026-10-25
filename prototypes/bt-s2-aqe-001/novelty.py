"""Read-only quarantine for unfamiliar observations; no execution interface."""
from engine import Observation, RULES, STATES

def quarantine(observations):
    seen = set()
    candidates = []
    for obs in observations:
        if not isinstance(obs, Observation) or obs.state not in STATES or not all((obs.identifier, obs.mechanism, obs.statement, obs.evidence_ref)):
            raise ValueError("Invalid observation")
        if not all(isinstance(v, str) for v in (obs.identifier, obs.mechanism, obs.statement, obs.evidence_ref)):
            raise ValueError("Invalid fields")
        if obs.identifier in seen:
            raise ValueError("Duplicate identifier")
        seen.add(obs.identifier)
        if obs.mechanism in RULES:
            continue
        questions = (
            f"What observable operation would establish that {obs.mechanism} crosses an authority boundary?",
            f"Which independent record could falsify the claimed {obs.mechanism} failure?",
            f"Can the same consequence occur without the suspected {obs.mechanism} mechanism?",
            "Who can independently prevent or reverse the observed consequence?",
        )
        candidates.append({"id": obs.identifier, "mechanism": obs.mechanism,
                           "statement": obs.statement, "evidence_ref": obs.evidence_ref,
                           "input_state": obs.state, "state": "NOT TESTED",
                           "admission": "PENDING EXTERNAL REVIEW",
                           "questions": [{"id": f"{obs.identifier}-N{i}", "text": q, "state": "NOT TESTED"} for i, q in enumerate(questions, 1)]})
    return {"engine": "BT-S2-AQE-001", "execution_authorized": False,
            "registry_modified": False, "novelty_established": False, "quarantined": candidates}
