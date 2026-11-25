"""BT-CDTB-v0.1: deterministic, synthetic, local-only model checks. No network.
Machine-authored scenarios and model are NOT independent evaluation.
"""
import argparse, hashlib, json, platform
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STATES = {'SUPPORTED','CONTRADICTED','INDETERMINATE','TEST INVALID'}

def outcome(value, details):
    return ('INDETERMINATE' if value is None else 'SUPPORTED' if value else 'CONTRADICTED'), details

def capability(x):
    # Two required outputs, each uses a finite resource budget.
    delivered = []
    remaining = x['budget']
    for cost in x['costs']:
        if remaining >= cost:
            delivered.append(True); remaining -= cost
        else: delivered.append(False)
    return outcome(all(delivered) if x['complete_journal'] else None,
                   {'delivered':delivered,'remaining':remaining,'journal_complete':x['complete_journal']})

def common_mode(x):
    # A route works iff all its dependencies remain available.
    failed=set(x['failed']); routes=x['routes']
    live=[not bool(set(route)&failed) for route in routes]
    return outcome(any(live) if x['dependency_inventory_complete'] else None,
                   {'route_live':live,'failed':sorted(failed),'shared_dependencies':sorted(set(routes[0]) & set(routes[1]))})

def composed_scope(x):
    # Each child has a local cap; all share a separate parent aggregate cap.
    local=[a<=b for a,b in zip(x['effects'],x['local_caps'])]
    total=sum(x['effects'])
    return outcome(all(local) and total<=x['parent_cap'] if x['journal_complete'] else None,
                   {'local_checks':local,'total_effect':total,'parent_cap':x['parent_cap']})

def temporal_order(x):
    # Closed uncertainty intervals for authority withdrawal and effect commit.
    r0,r1=x['revocation_interval']; c0,c1=x['commit_interval']
    if r0>r1 or c0>c1: return 'TEST INVALID',{'reason':'invalid interval'}
    # Stipulated toy policy: effect must strictly precede withdrawal.
    state=True if c1<r0 else False if c0>=r1 else None
    return outcome(state,{'revocation_interval':[r0,r1],'commit_interval':[c0,c1],'policy':'strict precedence; no reauthorization in model'})

def identification(x):
    # Finite hypothesis class; observed product, optional second measurement.
    survivors=[a for a in x['hypotheses'] if a[0]*a[1]==x['product'] and (x['first_factor'] is None or a[0]==x['first_factor'])]
    if not survivors: return 'TEST INVALID',{'reason':'no candidate consistent with observations','survivors':[]}
    return outcome(len(survivors)==1 if x['hypothesis_class_complete'] else None,
                   {'survivors':survivors,'hypothesis_class_complete':x['hypothesis_class_complete']})

def recovery(x):
    # A rollback changes current balance, but external losses remain unless remedied.
    restored=x['initial']==x['restored']; uncompensated=max(0,x['loss']-x['remedy'])
    return outcome(restored and uncompensated==0 if x['loss_record_complete'] else None,
                   {'state_restored':restored,'uncompensated_loss':uncompensated})

def coviability(x):
    # Exhaustive finite integer allocations. No fairness/rights inference.
    capacity=x['capacity']; a,b=x['minimums']; allocations=[[i,capacity-i] for i in range(capacity+1) if i>=a and capacity-i>=b]
    return outcome(bool(allocations) if x['requirements_complete'] else None,
                   {'individual_feasible':[a<=capacity,b<=capacity],'joint_allocations':allocations})

def transfer(x):
    # Contract transfer: claim requires all necessary source assumptions in target.
    missing=[k for k,v in x['target'].items() if v=='UNKNOWN']
    false=[k for k,v in x['target'].items() if v is False]
    state=False if false else None if missing else True
    return outcome(state,{'violated_assumptions':false,'unestablished_assumptions':missing,'scope':'assumption check only; not proof of equivalent mechanism'})

def defeat(x):
    # An evaluator observes only configured paths. A separate idealized oracle knows toy effects.
    labels=[]
    for case in x['specimens']:
        detected=any(case['defects'].get(p,False) for p in x['observed_paths'])
        actual=any(case['defects'].values())
        labels.append({'id':case['id'],'oracle_defect':actual,'evaluator_defect':detected})
    errors=[v['id'] for v in labels if v['oracle_defect']!=v['evaluator_defect']]
    return outcome(not errors if x['oracle_complete'] else None,{'labels':labels,'misclassified':errors})

def independence(x):
    # Toy ability to leave and continue; not a metric of actual human freedom.
    dimensions={'export':x['exported'],'usable_copy':x['format_readable'],'fallback':x['fallback_available'],'credentials':x['owner_credentials']}
    return outcome(all(dimensions.values()) if x['exercise_observed'] else None,{'required_conditions':dimensions,'exercise_observed':x['exercise_observed']})

MODELS={'CD-01':capability,'CD-02':common_mode,'CD-03':composed_scope,'CD-04':temporal_order,'CD-05':identification,'CD-06':recovery,'CD-07':coviability,'CD-08':transfer,'CD-09':defeat,'CD-10':independence}

def run(fixtures):
    ids=set(); results=[]
    for f in fixtures:
        if f['id'] in ids: raise ValueError('duplicate fixture ID: '+f['id'])
        ids.add(f['id'])
        if f['expected'] not in STATES: raise ValueError('invalid expected state')
        try: state,detail=MODELS[f['family']](f['inputs'])
        except (KeyError,TypeError,ValueError,IndexError) as e: state,detail='TEST INVALID',{'reason':type(e).__name__}
        results.append({'id':f['id'],'family':f['family'],'inputs':f['inputs'],'expected':f['expected'],'observed_model_state':state,'fixture_match':state==f['expected'],'model_observation':detail})
    return {'scope':'synthetic declared model claims only','independent_review':'NOT TESTED','authority_state':'CANDIDATE','total':len(results),'matched':sum(r['fixture_match'] for r in results),'states':{s:sum(r['observed_model_state']==s for r in results) for s in sorted(STATES)},'results':results}

def main():
    parser=argparse.ArgumentParser(description=__doc__); parser.add_argument('--output',type=Path); args=parser.parse_args()
    fixtures=json.loads((ROOT/'fixtures.json').read_text())
    receipt=run(fixtures)
    receipt['fixture_sha256']=hashlib.sha256((ROOT/'fixtures.json').read_bytes()).hexdigest()
    receipt['runner_sha256']=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    payload=json.dumps(receipt,indent=2,sort_keys=True)+'\n'
    if args.output: args.output.write_text(payload,encoding='utf-8')
    else: print(payload,end='')
    return 0 if receipt['matched']==receipt['total'] else 1
if __name__=='__main__': raise SystemExit(main())
