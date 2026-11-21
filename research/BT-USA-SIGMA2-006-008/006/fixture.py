from dataclasses import dataclass

@dataclass(frozen=True)
class Case:
    name: str
    machine_signal: bool
    corroborated: bool
    human_order: str
    order_valid: bool
    translation: str
    queued: bool
    downstream_gate: bool

def evaluate(c: Case):
    standing = c.machine_signal and c.corroborated
    authorized_stop = standing and c.order_valid and c.human_order == 'STOP'
    translation_faithful = c.translation == ('STOP' if c.human_order in ('STOP','DENY') else 'ALLOW')
    model_stopped = authorized_stop and c.translation == 'STOP'
    queued_executes = c.queued and not (c.downstream_gate and c.human_order in ('STOP','DENY') and c.order_valid)
    denial_effective = not (c.human_order in ('STOP','DENY') and queued_executes)
    return dict(standing=standing, authorized_stop=authorized_stop, translation_faithful=translation_faithful,
                model_stopped=model_stopped, queued_executes=queued_executes, denial_effective=denial_effective)

CASES = [
 Case('baseline_valid_stop',True,True,'STOP',True,'STOP',True,True),
 Case('uncorroborated_signal',True,False,'STOP',True,'STOP',False,True),
 Case('semantic_drift',True,True,'STOP',True,'ALLOW',True,False),
 Case('queued_after_stop',True,True,'STOP',True,'STOP',True,False),
 Case('denial_not_propagated',True,True,'DENY',True,'STOP',True,False),
 Case('invalid_order',True,True,'STOP',False,'STOP',True,True),
]
if __name__ == '__main__':
    for case in CASES:
        print(case.name, evaluate(case))
