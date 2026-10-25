"""Fail-closed Sigma-2 test inventory and execution. No external side effects."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SUITES = (
    ("prototypes/bt-s2-aqe-001", ("engine.py", "novelty.py", "test_engine.py", "test_novelty.py"), ("test_engine.py", "test_novelty.py")),
    ("prototypes/bt-s2-aqe-002", ("simulator.py", "test_simulator.py"), ("test_simulator.py",)),
)

def main():
    failures = []
    for directory, required, tests in SUITES:
        base = ROOT / directory
        missing = [name for name in required if not (base / name).is_file()]
        if missing:
            failures.append(f"{directory}: MISSING REQUIRED FILES: {missing}")
            continue
        for name in tests:
            result = subprocess.run([sys.executable, "-m", "unittest", "-v", name[:-3]], cwd=base, capture_output=True, text=True, timeout=120)
            output = result.stdout + result.stderr
            print(f"=== {directory}/{name} ===", flush=True)
            print(output, flush=True)
            if result.returncode != 0 or "Ran 0 tests" in output or "Ran " not in output:
                failures.append(f"{directory}/{name}: TEST FAILURE OR ZERO TESTS")
    if failures:
        print("SIGMA2 TEST INVENTORY FAILED", *failures, sep="\n", file=sys.stderr)
        return 1
    print("SIGMA2 TEST INVENTORY EXECUTED; NO CERTIFICATION")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
