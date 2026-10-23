"""Deterministic fixture replay: analysis reproducibility, not execution consequence."""
import hashlib
import json
from .engine import analyze

def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False, allow_nan=False)

def replay(fixture, repetitions=20):
    if not isinstance(repetitions, int) or isinstance(repetitions, bool) or not 1 <= repetitions <= 1000:
        raise ValueError("repetitions must be an integer from 1 to 1000")
    source = canonical(fixture)
    input_hash = hashlib.sha256(source.encode("utf-8")).hexdigest()
    outputs = []
    for _ in range(repetitions):
        result = analyze(json.loads(source))
        outputs.append(hashlib.sha256(canonical(result).encode("utf-8")).hexdigest())
    unique = sorted(set(outputs))
    return {
        "input_sha256": input_hash,
        "repetitions": repetitions,
        "unique_output_hashes": unique,
        "analysis_reproducible": len(unique) == 1,
        "execution_reproduced": "NOT TESTED",
        "consequence_reproduced": "NOT TESTED",
        "external_oracle": "NOT PROVIDED",
        "scope": "identical synthetic fixture, in-process replay",
        "authority_certification": "NOT AUTHORIZED"
    }
