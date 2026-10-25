import unittest
from simulator import Step, check, enumerate_cases

class Tests(unittest.TestCase):
    def test_empty(self):
        self.assertTrue(check([], {0})["composite_authorized"])
    def test_single(self):
        self.assertTrue(check([Step(0,0,1,True)], {0,1})["composite_authorized"])
    def test_composition_failure(self):
        x = check([Step(0,0,1,True), Step(1,1,1,True)], {0,1})
        self.assertTrue(x["local_authorized"])
        self.assertFalse(x["composite_authorized"])
    def test_exhaustive_count(self):
        self.assertEqual(enumerate_cases()["total"], 4368)

if __name__ == "__main__":
    unittest.main()
