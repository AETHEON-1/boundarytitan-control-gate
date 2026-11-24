"""Deterministic, local, synthetic event laboratory. No external actions."""
from dataclasses import dataclass, asdict, replace
import argparse, json, heapq
from pathlib import Path

@dataclass(frozen=True)
class Config:
    name: str
    shared_fault: bool = True
    route: str = 'independent'  # normal, independent
    emergency_shared: bool = False
    usable: bool = True
    valid_owner: bool = True
    stop_tick: int = 2
    stop_delay: int = 1
    commit_tick: int = 5
    fence: bool = True
    bypass: bool = False
    restart: bool = False
    durable_stop: bool = True
    false_ack: bool = False
    cancel_pending: bool = False
    fail_closed_on_fault: bool = False
    essential_required: bool = True
    essential_separate: bool = True
    recovery_overreach: bool = False
    retry: bool = False


def run(c):
    q=[]; seq=0; trace=[]; epoch=0; denied=False; queued=True; power=True
    failed=False; owner_stop=False; effective_tick=None; effects=[]; essential_misses=[]
    def schedule(t, event):
        nonlocal seq
        seq+=1; heapq.heappush(q,(t,seq,event))
    def log(t,event,**kw): trace.append(dict(tick=t,event=event,**kw))
    def commit(t, action, path, token):
        # The physical effect journal is distinct from control-plane acknowledgement.
        if not power: log(t,'commit_denied',action=action,reason='power_off'); return
        if action=='normal' and path!='bypass':
            if c.fail_closed_on_fault and failed:
                log(t,'commit_denied',action=action,reason='fault_fail_closed'); return
            if c.fence and (denied or token!=epoch):
                log(t,'commit_denied',action=action,reason='live_fence',token=token,epoch=epoch); return
        # Recovery credential is deliberately broad in the overreach mutant.
        if action=='recovery_extra' and not c.recovery_overreach:
            log(t,'commit_denied',action=action,reason='recovery_scope'); return
        effects.append(dict(tick=t,action=action,path=path))
        log(t,'effect_committed',action=action,path=path)
    schedule(0,'queue'); schedule(1,'fault'); schedule(c.stop_tick,'stop_request')
    schedule(c.commit_tick,'worker_commit'); schedule(c.commit_tick+1,'essential')
    if c.restart: schedule(c.commit_tick-1,'restart')
    if c.retry: schedule(c.commit_tick+2,'retry')
    if c.recovery_overreach: schedule(c.commit_tick+2,'recovery_extra')
    while q:
        t,_,event=heapq.heappop(q)
        if event=='queue': log(t,'worker_queued',token=0)
        elif event=='fault':
            failed=c.shared_fault; log(t,'dependency_state',failed=failed)
        elif event=='stop_request':
            owner_stop=c.valid_owner; log(t,'stop_requested',valid_owner=owner_stop,route=c.route)
            if not owner_stop: log(t,'stop_rejected',reason='invalid_owner'); continue
            if c.false_ack: log(t,'interface_ack',effective=False)
            if (failed and (c.route=='normal' or c.emergency_shared)) or not c.usable:
                log(t,'delivery_failed',reason='dependency_or_usability'); continue
            schedule(t+c.stop_delay,'stop_effective')
        elif event=='stop_effective':
            denied=True; epoch+=1; effective_tick=t
            if c.cancel_pending: queued=False
            if not c.essential_separate: power=False
            log(t,'stop_effective',epoch=epoch,queued=queued,power=power)
        elif event=='restart':
            if not c.durable_stop: denied=False; epoch=0
            log(t,'restart',denied=denied,epoch=epoch)
        elif event in ('worker_commit','retry'):
            if event=='worker_commit' and not queued: log(t,'worker_cancelled'); continue
            commit(t,'normal','bypass' if c.bypass else 'worker',0)
        elif event=='essential':
            if c.essential_required:
                if power and (not denied or c.essential_separate):
                    effects.append(dict(tick=t,action='essential',path='restricted_service'))
                    log(t,'essential_completed')
                else: essential_misses.append(t); log(t,'essential_missed')
        elif event=='recovery_extra': commit(t,'recovery_extra','recovery',epoch)
    # Oracle is a candidate specification, evaluated from effect journal, not ACKs.
    # A valid human stop makes normal effects at/after the request forbidden in this synthetic contract.
    forbidden=[e for e in effects if (e['action']=='normal' and c.valid_owner and e['tick']>=c.stop_tick) or e['action']=='recovery_extra']
    return dict(config=asdict(c),effective_tick=effective_tick,forbidden_effects=forbidden,
                essential_misses=essential_misses,trace=trace,effects=effects,
                disposition='CONTRADICTED_IN_MODEL' if forbidden or essential_misses else 'NO_VIOLATION_OBSERVED_IN_MODEL')

BASE=Config('reference')
# Expected effects/misses are separate machine-authored test fixtures; no independent adjudication.
CASES=[
 (BASE,0,0),
 (replace(BASE,name='normal_override',route='normal'),1,0),
 (replace(BASE,name='shared_emergency',emergency_shared=True),1,0),
 (replace(BASE,name='unusable_emergency',usable=False),1,0),
 (replace(BASE,name='late_delivery',stop_delay=4),1,0),
 (replace(BASE,name='ack_only',route='normal',false_ack=True),1,0),
 (replace(BASE,name='no_commit_fence',fence=False),1,0),
 (replace(BASE,name='bypass',bypass=True),1,0),
 (replace(BASE,name='restart_loses_stop',restart=True,durable_stop=False),1,0),
 (replace(BASE,name='restart_preserves_stop',restart=True),0,0),
 (replace(BASE,name='blanket_shutdown',essential_separate=False),0,1),
 (replace(BASE,name='recovery_overreach',recovery_overreach=True),1,0),
 (replace(BASE,name='stale_retry',retry=True),0,0),
 (replace(BASE,name='cancel_without_fence',fence=False,cancel_pending=True),0,0),
 (replace(BASE,name='cancel_without_fence_retry',fence=False,cancel_pending=True,retry=True),1,0),
 (replace(BASE,name='shared_failure_fail_closed',emergency_shared=True,fail_closed_on_fault=True),0,0),
 (replace(BASE,name='invalid_owner',valid_owner=False),0,0),
 (replace(BASE,name='same_tick_stop_commit',stop_delay=3),1,0),
 (replace(BASE,name='pre_request_commit',stop_tick=6),0,0),
]

def battery():
    results=[]
    for cfg,n,e in CASES:
        r=run(cfg); r['expected']={'forbidden_effects':n,'essential_misses':e}
        r['fixture_match']=len(r['forbidden_effects'])==n and len(r['essential_misses'])==e
        results.append(r)
    return dict(scope='Synthetic single-worker event scheduler; machine-authored fixtures, no independent review',
                total=len(results),matched=sum(r['fixture_match'] for r in results),
                violations=sum(r['disposition']=='CONTRADICTED_IN_MODEL' for r in results),results=results)

if __name__=='__main__':
    p=argparse.ArgumentParser(); p.add_argument('--output'); p.add_argument('--scenario'); a=p.parse_args()
    if a.scenario:
        cases={c.name:c for c,_,_ in CASES}; out=run(cases[a.scenario]); ok=True
    else: out=battery(); ok=out['matched']==out['total']
    s=json.dumps(out,indent=2)+'\n'
    if a.output: Path(a.output).write_text(s,encoding='utf-8')
    else: print(s,end='')
    raise SystemExit(0 if ok else 1)
