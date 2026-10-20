"""BT-RSI-010 deterministic swarm composition negative controls and bounded candidates.
No agents, network, credentials, external effects, or production authority.
"""
from dataclasses import dataclass,field
@dataclass
class World:
    global_cap:int=10
    spent:int=0
    closed:bool=False
    effects:list=field(default_factory=list)
    credentials:dict=field(default_factory=lambda:{"A":"token-A","B":"token-B"})
    scope:dict=field(default_factory=lambda:{"A":{"inspect"},"B":{"inspect"}})
    provenance:dict=field(default_factory=lambda:{"A":"source-1","B":"source-1"})
    def commit(self,worker,action,amount,token,queue_epoch=0):
        if self.closed:return "DENIED_CLOSED"
        if self.credentials.get(worker)!=token:return "DENIED_IDENTITY"
        if action not in self.scope.get(worker,set()):return "DENIED_SCOPE"
        if amount<0 or self.spent+amount>self.global_cap:return "DENIED_GLOBAL_CAP"
        self.spent+=amount;self.effects.append((worker,action,amount))
        return "COMMITTED"

def local_only_budget_failure():
    # Each worker checks only its own quota; shared effect breaches global budget.
    local={"A":0,"B":0};effects=[]
    for actor in ("A","B"):
        if local[actor]+6<=10:
            local[actor]+=6;effects.append((actor,6))
    return {"total":sum(x[1] for x in effects),"global_cap":10,
            "unauthorized_global_excess":sum(x[1] for x in effects)>10}

def bounded_budget():
    w=World()
    return [w.commit("A","inspect",6,"token-A"),
            w.commit("B","inspect",6,"token-B")],w

def delegation_failure():
    # Vulnerable path: delegation copies a token and omits task/scope binding.
    grant={"token":"token-A","scope":"inspect"}
    successor={"worker":"C","token":grant["token"],"action":"deploy"}
    return {"successor_can_deploy":successor["token"]==grant["token"]}
def bounded_delegation():
    w=World()
    return w.commit("C","deploy",1,"token-A")

def shared_credential_failure():
    # A copied bearer token accepted by a naive token-only gate.
    return {"impersonation_accepted":"token-A" in {"token-A","token-B"}}
def bounded_shared_identity():
    return World().commit("B","inspect",1,"token-A")

def queue_after_stop_failure():
    queue=[("A","inspect",1)]
    closed=True
    effects=list(queue) # unguarded consumer
    return {"post_stop_effect":closed and len(effects)>0}
def bounded_queue_after_stop():
    w=World();queued=("A","inspect",1,"token-A")
    w.closed=True
    return w.commit(*queued)

def corroboration_failure():
    # Different worker labels are not independent evidence sources.
    return {"naive_independent_count":2,"actual_independent_sources":1}
def bounded_corroboration():
    w=World()
    return len(set(w.provenance.values()))

def orchestrator_bypass_failure():
    # A denied gate does not control direct resource mutation.
    w=World();w.closed=True
    w.effects.append(("orchestrator","inspect",1))
    return {"post_stop_resource_effect":bool(w.effects)}
def bounded_orchestrator():
    w=World();w.closed=True
    result=w.commit("A","inspect",1,"token-A")
    return result,w

def run_register():
    results,world=bounded_budget()
    return {"budget":{"negative":local_only_budget_failure(),"bounded":results,"spent":world.spent},
            "delegation":{"negative":delegation_failure(),"bounded":bounded_delegation()},
            "shared_identity":{"negative":shared_credential_failure(),"bounded":bounded_shared_identity()},
            "queue":{"negative":queue_after_stop_failure(),"bounded":bounded_queue_after_stop()},
            "corroboration":{"negative":corroboration_failure(),"bounded_sources":bounded_corroboration()},
            "orchestrator":{"negative":orchestrator_bypass_failure(),"bounded":bounded_orchestrator()[0]}}
