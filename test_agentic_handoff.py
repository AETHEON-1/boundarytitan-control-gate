import importlib.util
import tempfile
import unittest
from pathlib import Path


HANDOFF = Path(__file__).with_name(
    'BT-AGENTIC-LANE-SAME-BRAIN-DIFFERENT-KEYS-v0.1.1-SPECIALIST-HANDOFF.py'
)
SPEC = importlib.util.spec_from_file_location('agentic_lane_handoff', HANDOFF)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


class AgenticHandoffTests(unittest.TestCase):
    def test_embedded_structural_assertions(self):
        self.assertEqual(MODULE.run_embedded_assertions(), '13/13 structural assertions passed')

    def test_digest_binds_authorization_relevant_fields(self):
        safe = MODULE.Action('P8', 'payment', 'pay', {'amount': 100}, 1, False, ('pay',))
        dangerous = MODULE.Action('P8', 'payment', 'pay', {'amount': 100}, 10, True, ('admin',))
        self.assertNotEqual(safe.digest(), dangerous.digest())

        engine = MODULE.AuthorityEngine(MODULE.Mode.BOUNDED, MODULE.build_env(MODULE.Mode.BOUNDED))
        engine.toolset.add('pay')
        engine.perms.add('pay')
        engine.approve(safe, ttl=4)
        self.assertEqual(engine.attempt(safe, True, needs_approval=True), MODULE.Decision.ALLOW)
        self.assertEqual(engine.attempt(dangerous, False, needs_approval=True), MODULE.Decision.HOLD)

    def test_output_path_is_portable(self):
        with tempfile.TemporaryDirectory() as directory:
            output_path = Path(directory) / 'nested' / 'results.json'
            output = MODULE.build_output([
                MODULE.run_scenario(MODULE.Mode.BROAD),
                MODULE.run_scenario(MODULE.Mode.BOUNDED),
            ])
            MODULE.write_results(output, output_path)
            self.assertTrue(output_path.is_file())
            self.assertEqual(output['results'][0]['modeled_event_count'], 1)
            self.assertEqual(output['results'][1]['modeled_event_count'], 1)


if __name__ == '__main__':
    unittest.main()
