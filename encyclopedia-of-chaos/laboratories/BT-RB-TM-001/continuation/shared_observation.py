"""Synthetic observation-boundary counterexample. No network or external effects."""
import itertools
import json

# Machine-authored design: two possible effect routes, only normal is visible
# to the shared projection. The independent channel is simulated, not independent custody.

def evaluate(normal, hidden, shared_drop, separate_drop):
    world = {"normal": normal, "hidden": hidden}
    ground = any(world.values())
    # Distinct analysis procedures consume the same incomplete projection.
    projection = [] if shared_drop else ["normal"] if normal else []
    count_detector = len(projection) > 0
    membership_detector = "normal" in projection
    # Separate observation is deliberately modelled with a different visibility surface.
    separate = [] if separate_drop else [k for k, v in world.items() if v]
    separate_detector = bool(separate)
    combined = count_detector or separate_detector
    return dict(normal=normal, hidden=hidden, shared_drop=shared_drop,
                separate_drop=separate_drop, ground=ground,
                count_detector=count_detector, membership_detector=membership_detector,
                separate_detector=separate_detector, combined=combined,
                shared_projection=projection, separate_projection=separate)


def metrics(rows, key):
    return {label: sum((r[key], r['ground']) == pair for r in rows)
            for label, pair in [('TP',(True,True)),('TN',(False,False)),
                                ('FP',(True,False)),('FN',(False,True))]}


def battery():
    rows = [evaluate(*v) for v in itertools.product([False, True], repeat=4)]
    intact = [r for r in rows if not r['shared_drop'] and not r['separate_drop']]
    both_blind = [r for r in rows if r['shared_drop'] and r['separate_drop']]
    assert all(r['count_detector']==r['membership_detector'] for r in rows)
    assert any(r['ground'] and not r['combined'] for r in both_blind)
    assert all(r['combined']==r['ground'] for r in intact)
    assert any(r['ground'] and not r['count_detector'] and r['separate_detector'] for r in intact)
    return {'scope':'16 exhaustive Boolean model configurations; no actual Trailmark; no independent oracle or custody',
            'total':len(rows),'shared_agreements':sum(r['count_detector']==r['membership_detector'] for r in rows),
            'metrics_all':{k:metrics(rows,k) for k in ['count_detector','membership_detector','separate_detector','combined']},
            'metrics_intact':{k:metrics(intact,k) for k in ['count_detector','membership_detector','separate_detector','combined']},
            'rows':rows}

if __name__=='__main__':
    print(json.dumps(battery(), indent=2))
