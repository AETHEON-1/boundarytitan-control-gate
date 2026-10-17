import unittest
from process_brake import Laboratory

class Tests(unittest.TestCase):
    def setUp(self): self.lab = Laboratory()
    def tearDown(self): self.lab.close()
    def test_authorized(self):
        t=self.lab.grant()
        self.assertTrue(self.lab.commit(t))
    def test_forgery(self):
        self.assertFalse(self.lab.commit('fake'))
    def test_replay(self):
        t=self.lab.grant()
        self.assertTrue(self.lab.commit(t))
        self.assertFalse(self.lab.commit(t))
    def test_mutation(self):
        t=self.lab.grant()
        self.assertFalse(self.lab.commit(t, action='changed'))
    def test_revoke(self):
        t=self.lab.grant()
        self.lab.revoke()
        self.assertFalse(self.lab.commit(t))
    def test_requester_restart_replay(self):
        t=self.lab.grant()
        self.lab.revoke()
        old_saved_token=t
        self.assertFalse(self.lab.commit(old_saved_token))
    def test_global_epoch_invalidates_other_grants(self):
        t=self.lab.grant()
        self.lab.revoke('other')
        self.assertFalse(self.lab.commit(t))

if __name__ == '__main__':
    unittest.main()
