"""Finite-state compositional authority simulator. No external execution."""
from dataclasses import dataclass
from itertools import product

@dataclass(frozen=True)
class Step:
    principal: int
    scope: int
    effect: int
    authorized: bool

def check(steps, approved_effects):
    local = all(s.authorized for s in steps)
    total_effect = sum(s.effect for s in steps)
    return {"local_authorized": local,
            "composite_authorized": total_effect in approved_effects,
            "actual_effect": total_effect}

def enumerate_cases():
    universe = [Step(*p) for p in product(range(2), range(2), range(2), (False, True))]
    n = 0
    false_authorizations = 0
    examples = []
    for length in range(1, 4):
        for seq in product(universe, repeat=length):
            result = check(seq, {0, 1})
            n += 1
            if result["local_authorized"] and not result["composite_authorized"]:
                false_authorizations += 1
                if len(examples) < 3:
                    examples.append([s.__dict__ for s in seq])
    return {"total": n, "false_authorizations": false_authorizations, "examples": examples}
