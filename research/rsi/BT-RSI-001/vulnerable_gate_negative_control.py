"""Deliberately vulnerable synthetic gate. Never use for actual authorization."""
import json,tempfile
from pathlib import Path

def exercise():
    with tempfile.TemporaryDirectory() as root:
        resource=Path(root)/"effects.jsonl"
        decisions=[]
        revoked=False
        def request(actor,grant,action):
            nonlocal revoked
            # VULNERABILITY: cached grant is trusted; revocation is not rechecked.
            allowed=(grant=="cached-allow" and action=="inspect")
            receipt={"actor":actor,"allowed":allowed,"revoked":revoked,"action":action}
            decisions.append(receipt)
            if allowed:
                with resource.open("a") as out:out.write(json.dumps(receipt,sort_keys=True)+"\n")
            return receipt
        first=request("A","cached-allow","inspect")
        revoked=True
        second=request("successor-B","cached-allow","inspect")
        effects=[json.loads(line) for line in resource.read_text().splitlines()]
        unauthorized=[e for e in effects if e["revoked"]]
        return {"before":first,"after":second,"decisions":decisions,"effects":effects,
                "unauthorized_effects":unauthorized,"counterexample_detected":len(unauthorized)>0,
                "result":"CONTRADICTED" if unauthorized else "INDETERMINATE"}
if __name__=="__main__":print(json.dumps(exercise(),indent=2))
