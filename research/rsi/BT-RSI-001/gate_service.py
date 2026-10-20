#!/usr/bin/env python3
"""Synthetic authority service; runs in a separate OS process. Not a production brake."""
import argparse, json, os, socketserver
from pathlib import Path
class Handler(socketserver.StreamRequestHandler):
    def handle(self):
        try:
            req=json.loads(self.rfile.readline())
            allowed=req.get("actor")=="predecessor" and req.get("action")=="inspect" and not self.server.revoked
            self.wfile.write((json.dumps({"allowed":allowed,"epoch":self.server.epoch})+"\n").encode())
        except (ValueError,TypeError):
            self.wfile.write(b'{"allowed":false,"error":"invalid_request"}\n')
class Server(socketserver.UnixStreamServer):
    allow_reuse_address=True
def main():
    p=argparse.ArgumentParser();p.add_argument("--socket",required=True);p.add_argument("--revoked",action="store_true");args=p.parse_args()
    path=Path(args.socket)
    if path.exists(): raise SystemExit("socket path already exists")
    with Server(str(path),Handler) as s:
        s.revoked=args.revoked;s.epoch=2 if args.revoked else 1
        try:s.serve_forever()
        finally:path.unlink(missing_ok=True)
if __name__=="__main__":main()
