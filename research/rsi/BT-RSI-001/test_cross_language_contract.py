import json,subprocess,unittest
from pathlib import Path
from cross_language_contract import lint
ROOT=Path(__file__).resolve().parent
class CrossLanguageContract(unittest.TestCase):
    def test_python_vectors(self):
        cases=json.loads((ROOT/"cross_language_vectors.json").read_text())["cases"]
        for case in cases:
            with self.subTest(case=case["id"]):
                self.assertEqual(lint(case["record"]),case["expected"])
    def test_javascript_independent_predicate(self):
        result=subprocess.run(["node",str(ROOT/"cross_language_contract.js")],
            capture_output=True,text=True,timeout=10)
        self.assertEqual(result.returncode,0,result.stderr)
        self.assertIn("6 vectors checked",result.stdout)
if __name__=="__main__":unittest.main()
