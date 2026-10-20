#!/usr/bin/env python3
"""Synthetic custodian. OS permissions, not agent promises, protect the resource."""
import argparse, json, os, socketserver
from pathlib import Path

class Handler(socketserver.StreamRequestHandler):
    def handle(self):
        try:
            request=json.loads(self.rfile.readline())
            allowed=(request.get("actor")=="predecessor" and request.get("action")=="inspect" and not self.server.revoked)
            receipt={"allowed":allowed,"actor":request.get("actor"),"action":request.get("action"),"epoch":self.server.epoch}
            # Only custodian writes protected consequence state; worker never receives a write handle.
            if allowed:
                with (self.server.private/"effects.jsonl").open("a") as f:
                    f.write(json.dumps(receipt,sort_keys=True)+"\n")
            with (self.server.private/"decisions.jsonl").open("a") as f:
                f.write(json.dumps(receipt,sort_keys=True)+"\n")
            self.wfile.write((json.dumps(receipt)+"\n").encode())
        except (ValueError,TypeError):
            self.wfile.write(b'{"allowed":false,"error":"invalid_request"}\n')

class Server(socketserver.UnixStreamServer):
    allow_reuse_address=True

def main():
    p=argparse.ArgumentParser()
    p.add_argument("--socket",required=True);p.add_argument("--private",required=True);p.add_argument("--revoked",action="store_true")
    a=p.parse_args()
    private=Path(a.private);private.mkdir(mode=0o700,parents=True,exist_ok=True);os.chmod(private,0o700)
    socket_path=Path(a.socket)
    if socket_path.exists():raise SystemExit("refusing to replace socket")
    with Server(str(socket_path),Handler) as s:
        os.chmod(socket_path,0o666) # local synthetic test only; identity binding is not established
        s.private=private;s.revoked=a.revoked;s.epoch=2 if a.revoked else 1
        try:s.serve_forever()
        finally:socket_path.unlink(missing_ok=True)
if __name__=="__main__":main()
