#!/usr/bin/env python3
"""Worker attempts to bypass custodian-owned synthetic resource."""
import argparse,json,os,socket,sys
from pathlib import Path
def main():
    p=argparse.ArgumentParser();p.add_argument("--socket",required=True);p.add_argument("--private",required=True);p.add_argument("--output",required=True)
    p.add_argument("--attack",action="store_true");a=p.parse_args()
    result={"worker_uid":os.geteuid(),"attack":a.attack,"direct_write":False,"custodian_allowed":None}
    if a.attack:
        try:
            with (Path(a.private)/"effects.jsonl").open("a") as f:f.write('{"unauthorized":true}\n')
            result["direct_write"]=True
        except OSError as e:
            result["denial_errno"]=e.errno
    else:
        try:
            with socket.socket(socket.AF_UNIX,socket.SOCK_STREAM) as s:
                s.settimeout(3);s.connect(a.socket);s.sendall(b'{"actor":"successor-v2","action":"execute"}\n')
                result["custodian_allowed"]=json.loads(s.recv(4096)).get("allowed")
        except OSError as e:result["socket_error"]=type(e).__name__
    Path(a.output).write_text(json.dumps(result,sort_keys=True)+"\n")
    print(json.dumps(result,sort_keys=True))
    if result["direct_write"]:sys.exit(1)
if __name__=="__main__":main()
