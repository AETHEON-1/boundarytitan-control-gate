import hashlib
import json
import pathlib
import subprocess
import tempfile
import unittest
import sys
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parents[1]))
from integrity_sentinel import run
REQUIRED=[".github/workflows/verify.yml",".github/workflows/interaction-sensor.yml","scripts/verify-repository-state.js"]
class IntegritySentinelTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory();self.addCleanup(self.temp.cleanup)
        self.root=pathlib.Path(self.temp.name)
        subprocess.run(["git","init","-q"],cwd=self.root,check=True,stdout=subprocess.DEVNULL)
        entries=[]
        for path in REQUIRED:
            p=self.root/path;p.parent.mkdir(parents=True,exist_ok=True);data=b"control present\n";p.write_bytes(data)
            entries.append({"path":path,"size_bytes":len(data),"sha256":hashlib.sha256(data).hexdigest()})
        (self.root/"CURRENT-REPOSITORY-MANIFEST.json").write_text(json.dumps({"files":entries}))
        subprocess.run(["git","add","."],cwd=self.root,check=True,stdout=subprocess.DEVNULL)
        self.entries=entries
    def test_valid_fixture(self):self.assertEqual(run(self.root),[])
    def test_removed_check_detected(self):
        (self.root/REQUIRED[0]).unlink()
        self.assertIn("REQUIRED_CHECK_ABSENT",{x["code"] for x in run(self.root)})
    def test_mutated_bytes_detected(self):
        (self.root/REQUIRED[1]).write_text("control altered\n")
        self.assertIn("HASH_MISMATCH",{x["code"] for x in run(self.root)})
    def test_missing_manifest_entry_detected(self):
        self.entries.pop()
        (self.root/"CURRENT-REPOSITORY-MANIFEST.json").write_text(json.dumps({"files":self.entries}))
        self.assertIn("UNMANIFESTED_FILE",{x["code"] for x in run(self.root)})
    def test_duplicate_entry_detected(self):
        self.entries.append(dict(self.entries[0]))
        (self.root/"CURRENT-REPOSITORY-MANIFEST.json").write_text(json.dumps({"files":self.entries}))
        self.assertIn("DUPLICATE_MANIFEST_PATH",{x["code"] for x in run(self.root)})
if __name__=="__main__":unittest.main()
