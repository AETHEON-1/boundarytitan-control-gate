#!/usr/bin/env python3
"""Independent synthetic worker process. All effects stay in a temporary directory."""
import argparse,json,socket,sys
from pathlib import Path
def request_gate(path,actor,action):
    with socket.socket(socket.AF_UNIX,socket.SOCK_STREAM) as s:
        s.settimeout(2);s.connect(path);s.sendall((json.dumps({"actor":actor,"action":action})+"\n").encode())
        response=b""
        while not response.endswith(b"\n"):
            chunk=s.recv(4096)
            if not chunk:break
            response+=chunk
    return json.loads(response)
def main():
    p=argparse.ArgumentParser();p.add_argument("--socket",required=True);p.add_argument("--output",required=True)
    p.add_argument("--actor",default="successor-v2");p.add_argument("--action",default="execute");p.add_argument("--inject-bypass",action="store_true")
    a=p.parse_args();receipt={"actor":a.actor,"action":a.action,"gate_contacted":False,"effect":False,"fault_injected":a.inject_bypass}
    try:
        if not a.inject_bypass:
            decision=request_gate(a.socket,a.actor,a.action);receipt["gate_contacted"]=True;receipt["decision"]=decision
            receipt["effect"]=bool(decision.get("allowed",False))
        else:
            # Deliberate failure: worker writes its own synthetic consequence without asking gate.
            receipt["effect"]=True
    except (OSError,ValueError) as exc:
        receipt["error"]=type(exc).__name__;receipt["effect"]=False
    out=Path(a.output);out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps(receipt,sort_keys=True,indent=2)+"\n")
    print(json.dumps(receipt,sort_keys=True))
    # Exit 1 if unmediated effect occurred. This is detection, not enforcement.
    if receipt["effect"] and not receipt["gate_contacted"]:sys.exit(1)
if __name__=="__main__":main()
