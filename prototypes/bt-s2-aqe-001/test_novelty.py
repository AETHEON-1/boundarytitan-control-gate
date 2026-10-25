import unittest
from engine import FIXED, Observation
from novelty import quarantine

EXPECTED = (
 ('CAN','What operation is technically reachable?'),
 ('MAY','Which independent authority permits it?'),
 ('OWNER','Who owns the consequences?'),
 ('EVIDENCE','What inspectable evidence establishes authorization?'),
 ('PATH','Can the consequence occur through another route?'),
 ('BRAKE','Who can interrupt execution independently?'),
 ('REVOCATION','Does withdrawal of permission remain effective?'),
 ('RECOVERY','Who can remediate the consequences?'),
 ('CONTESTATION','Who can challenge an incorrect authorization decision?'),
 ('RECURSION','Can the system modify any of these checks?'),
)
class NoveltyTests(unittest.TestCase):
    def test_exact_fixed(self): self.assertEqual(FIXED,EXPECTED)
    def test_six_candidates(self):
        labels=('cross_tenant_scope_confusion','approval_source_compromise','post_execution_compensation','resource_exhaustion_denial','clock_skew_expiry','policy_version_split_brain')
        r=quarantine([Observation(f'N{i}',v,'candidate',f'fixture:{v}') for i,v in enumerate(labels)])
        self.assertEqual(len(r['quarantined']),6)
        self.assertEqual(sum(len(x['questions']) for x in r['quarantined']),24)
        self.assertIs(r['novelty_established'],False)
    def test_no_authority(self):
        r=quarantine([Observation('N','new','event','fixture:n')])
        self.assertIs(r['execution_authorized'],False)
        self.assertIs(r['registry_modified'],False)
        self.assertEqual(r['quarantined'][0]['admission'],'PENDING EXTERNAL REVIEW')
        self.assertEqual(r['quarantined'][0]['state'],'NOT TESTED')
    def test_provenance_and_falsification(self):
        c=quarantine([Observation('N','new','event','fixture:n','CONTRADICTED')])['quarantined'][0]
        self.assertEqual(c['evidence_ref'],'fixture:n')
        self.assertEqual(c['input_state'],'CONTRADICTED')
        self.assertTrue(any('falsify' in q['text'] for q in c['questions']))
    def test_known_excluded(self):
        self.assertEqual(quarantine([Observation('K','race','event','fixture:k')])['quarantined'],[])
    def test_duplicate_rejected(self):
        o=Observation('N','new','event','fixture:n')
        with self.assertRaises(ValueError): quarantine([o,o])
    def test_missing_provenance_rejected(self):
        with self.assertRaises(ValueError): quarantine([Observation('N','new','event','')])
    def test_invalid_state_rejected(self):
        with self.assertRaises(ValueError): quarantine([Observation('N','new','event','fixture:n','APPROVED')])
if __name__=='__main__': unittest.main(verbosity=2)
