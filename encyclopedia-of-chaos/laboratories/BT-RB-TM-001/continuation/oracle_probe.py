"""Machine-authored synthetic oracle challenge; no external effects or independent custody."""
import json

# Explicit stipulated ground labels; observation may omit, invent, or delay an event.
# Ground truth is fixture data, not a real independently operated sink.
CASES = [
    ('denial', False, [], False),
    ('visible_forbidden', True, [{'commit': 5, 'observed': 5}], True),
    ('omitted_effect', True, [], False),
    ('phantom_effect', False, [{'commit': 5, 'observed': 5}], True),
    ('late_report_of_pre_stop', False, [{'commit': 1, 'observed': 5}], False),
    ('delayed_forbidden', True, [{'commit': 5, 'observed': 9}], True),
    ('duplicate_report', True, [{'commit': 5, 'observed': 5}, {'commit': 5, 'observed': 6}], True),
]
STOP = 2

def battery():
    rows = []
    for name, ground, records, expected in CASES:
        commit_oracle = any(x['commit'] >= STOP for x in records)
        observation_oracle = any(x['observed'] >= STOP for x in records)
        assert commit_oracle == expected
        rows.append(dict(case=name, ground=ground, records=records,
                         commit_oracle=commit_oracle, observation_oracle=observation_oracle,
                         commit_oracle_correct=commit_oracle == ground,
                         observation_oracle_correct=observation_oracle == ground))
    return dict(scope='Seven stipulated synthetic cases; same-machine fixture and evaluator; no actual Trailmark',
                stop_tick=STOP, rows=rows,
                commit_oracle_errors=sum(not x['commit_oracle_correct'] for x in rows),
                observation_oracle_errors=sum(not x['observation_oracle_correct'] for x in rows))

if __name__ == '__main__':
    print(json.dumps(battery(), indent=2))
