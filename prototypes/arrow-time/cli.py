"""Local read-only fixture analyzer. Prints JSON; does not write files."""
import json
import sys
from pathlib import Path
from arrowtime import analyze

def main():
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python cli.py fixture.json")
    fixture = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    print(json.dumps(analyze(fixture), indent=2, sort_keys=True))

if __name__ == "__main__":
    main()
