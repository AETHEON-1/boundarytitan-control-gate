#!/usr/bin/env python3
"""Offline successor revocation laboratory. Synthetic resource, no live agents."""
import json,multiprocessing as mp,os,queue,tempfile,time
from pathlib import Path

def custodian(commands, receipts, path, revocation):
    # The custodian alone owns the resource write path in this *logical* fixture.
    # NOT a security boundary against same-UID or privileged attackers.
    while True:
        msg=commands.get()
        if msg["kind"]=="shutdown":break
        epoch=revocation.value
        allowed=(msg["kind"]=="commit" and epoch==0 and msg.get("grant")==0 and msg.get("action")=="inspect")
        event={"kind":msg["kind"],"actor":msg.get("actor"),"epoch":epoch,"allowed":allowed,"action":msg.get("action")}
        if allowed:
            with open(path,"a") as f:f.write(json.dumps(event,sort_keys=True)+"\n")
        receipts.put(event)

def run_scenario(fault="none"):
    with tempfile.TemporaryDirectory() as tmp:
        path=str(Path(tmp)/"effects.jsonl")
        q=mp.Queue();receipts=mp.Queue();revocation=mp.Value("i",0)
        p=mp.Process(target=custodian,args=(q,receipts,path,revocation));p.start()
        try:
            q.put({"kind":"commit","actor":"A","grant":0,"action":"inspect"})
            before=receipts.get(timeout=3)
            # Epoch transition occurs outside worker and before post-revocation requests.
            with revocation.get_lock():revocation.value=1
            for actor in ("A","B","C"):
                q.put({"kind":"commit","actor":actor,"grant":0,"action":"inspect"})
            after=[receipts.get(timeout=3) for _ in range(3)]
            effects=Path(path).read_text().splitlines() if Path(path).exists() else []
            return {"before":before,"after":after,"effects":effects,
                    "post_revoke_accepted":sum(x["allowed"] for x in after),
                    "fault":fault,"limits":["same-UID process isolation only","revocation ordering is serialized by test","no concurrent commit race tested","no real successor processes","no authenticated principal"]}
        finally:
            q.put({"kind":"shutdown"});p.join(3)
            if p.is_alive():p.terminate();p.join()

def compute_fault(kind, stop, observations):
    if kind=="infinite":
        while not stop.is_set():pass
    elif kind=="starvation":
        while not stop.is_set():
            # Bounded allocation pressure, no unbounded fork or memory growth.
            chunk=bytearray(128*1024)
            chunk[0]=1
    observations.put("stopped")

def fault_probe(kind, duration=.15):
    stop=mp.Event();observations=mp.Queue()
    p=mp.Process(target=compute_fault,args=(kind,stop,observations));p.start()
    try:
        time.sleep(duration)
        stop.set();p.join(1)
        forced=p.is_alive()
        if forced:p.terminate();p.join(2)
        return {"fault":kind,"terminated":not p.is_alive(),"forced":forced,"limit":"cooperative event plus OS terminate fallback; not an independent brake"}
    finally:
        if p.is_alive():p.kill();p.join()

if __name__=="__main__":
    print(json.dumps({"successors":run_scenario(),"faults":[fault_probe("infinite"),fault_probe("starvation")]},indent=2))
