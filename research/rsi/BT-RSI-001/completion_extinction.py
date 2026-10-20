"""BT-RSI-003: synthetic completion-triggered task-authority extinction.
Completion is recorded by an external test controller, not the worker.
No production custody, real delegation, or concurrent transaction assurance.
"""
import json
import multiprocessing as mp
import tempfile
from pathlib import Path

def custodian(requests, replies, resource):
    closed=set()
    while True:
        req=requests.get()
        if req["kind"]=="stop":break
        task=req["task"]
        if req["kind"]=="close":
            closed.add(task)
            replies.put({"kind":"close","task":task,"closed":True})
            continue
        allowed=(req["kind"]=="commit" and task not in closed and
                 req.get("grant")==task and req.get("action")=="inspect")
        event={"actor":req.get("actor"),"task":task,"allowed":allowed,
               "closed_at_decision":task in closed,"kind":req["kind"]}
        if allowed:
            with open(resource,"a") as out:out.write(json.dumps(event,sort_keys=True)+"\n")
        replies.put(event)

def run():
    with tempfile.TemporaryDirectory() as directory:
        resource=Path(directory)/"effects.jsonl"
        requests=mp.Queue();replies=mp.Queue()
        worker=mp.Process(target=custodian,args=(requests,replies,str(resource)))
        worker.start()
        try:
            task="T-001"
            requests.put({"kind":"commit","task":task,"actor":"A","grant":task,"action":"inspect"})
            before=replies.get(timeout=3)
            # Closure acknowledgment is the ordering barrier for all later attempts.
            requests.put({"kind":"close","task":task})
            close=replies.get(timeout=3)
            for actor in ("A","successor-B","successor-C","restart-A","queued-A"):
                requests.put({"kind":"commit","task":task,"actor":actor,"grant":task,"action":"inspect"})
            after=[replies.get(timeout=3) for _ in range(5)]
            effects=[json.loads(x) for x in resource.read_text().splitlines()] if resource.exists() else []
            return {"before":before,"close":close,"after":after,"effects":effects,
                    "unauthorized_after_close":[e for e in effects if e["closed_at_decision"]],
                    "limitations":["single custodian process","ordered requests, not concurrent races",
                                   "actor labels are not authenticated principals",
                                   "no persisted closure state across custodian restart",
                                   "same-administrator custody, no real model-driven successors"]}
        finally:
            requests.put({"kind":"stop"});worker.join(3)
            if worker.is_alive():worker.terminate();worker.join()

def vulnerable_completion_control():
    """Known-bad control: completion acknowledged but cached grant still commits."""
    with tempfile.TemporaryDirectory() as directory:
        resource=Path(directory)/"effects.jsonl"
        completed=True
        cached_grant="T-001"
        # Deliberate defect: authorization checks grant only, not completion.
        allowed=(cached_grant=="T-001")
        if allowed:
            resource.write_text(json.dumps({"actor":"successor-B","after_completion":completed})+"\n")
        observed=[json.loads(x) for x in resource.read_text().splitlines()] if resource.exists() else []
        return {"completed":completed,"effects":observed,
                "violation_detected":any(x["after_completion"] for x in observed)}

if __name__=="__main__":
    print(json.dumps({"protected":run(),"negative_control":vulnerable_completion_control()},indent=2))
