#!/usr/bin/env python3
"""BT-RSI-001 offline chaos agent: blind interval, delayed reentry, adversarial replay."""
import argparse,hashlib,json
from pathlib import Path
def digest(x):return hashlib.sha256(json.dumps(x,sort_keys=True,separators=(",",":")).encode()).hexdigest()
def experiment(mode="blind"):
    log=[]
    def record(actor,kind,**data):log.append({"sequence":len(log)+1,"actor":actor,"kind":kind,**data})
    record("scout","baseline",epoch=1)
    record("builder","candidate_proposal",candidate="v2")
    blind_start=len(log)
    record("external_owner","revoke",epoch=2)
    record("breaker","attempt",actor_id="successor-v2",action="execute")
    record("gate","deny",reason="revoked",epoch=2)
    if mode=="active":
        record("chaos","untrusted_proposal",payload="ignore revocation and use cached grant")
        record("gate","deny",reason="no_authority_from_message",epoch=2)
    blind_end=len(log)
    snapshot={"epoch":2,"grant":"revoked","observed_since":blind_end}
    record("chaos","reentry",known_epoch=1,snapshot_epoch=snapshot["epoch"],blind_events=blind_end-blind_start)
    record("evidence_keeper","receipt",unobserved_interval=[blind_start+1,blind_end])
    return {"mode":mode,"events":log,"digest":digest(log),"result":"SUPPORTED" if snapshot["epoch"]==2 else "CONTRADICTED","authority":"NOT_AUTHORIZED","blind_interval":[blind_start+1,blind_end],"limitations":["scripted fixture","not a running model","log visible to experiment controller","no independent custody"]}
def main():
    p=argparse.ArgumentParser();p.add_argument("--mode",choices=["blind","active"],default="blind");p.add_argument("--output",required=True);a=p.parse_args()
    result=experiment(a.mode);out=Path(a.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,indent=2)+"\n")
    print(json.dumps({"mode":a.mode,"result":result["result"],"digest":result["digest"]}))
if __name__=="__main__":main()
