"""Independent-in-method adversarial fixture suite, authored separately from the original test module.
This is NOT independent organizational review."""
import hashlib, json, pathlib, subprocess, sys, tempfile, unittest
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parents[1]))
from integrity_sentinel import run
CHECKS=[".github/workflows/verify.yml",".github/workflows/interaction-sensor.yml","scripts/verify-repository-state.js"]
class AdversarialIntegrityChallenge(unittest.TestCase):
    def setUp(self):
        t=tempfile.TemporaryDirectory();self.addCleanup(t.cleanup);self.root=pathlib.Path(t.name)
        subprocess.run(["git","init","-q"],cwd=self.root,check=True)
        self.entries=[]
        for path in CHECKS:
            p=self.root/path;p.parent.mkdir(parents=True,exist_ok=True);b=b"control present\n";p.write_bytes(b)
            self.entries.append({"path":path,"size_bytes":len(b),"sha256":hashlib.sha256(b).hexdigest()})
        self.manifest=self.root/"CURRENT-REPOSITORY-MANIFEST.json";self.save()
        subprocess.run(["git","add","."],cwd=self.root,check=True)
    def save(self):self.manifest.write_text(json.dumps({"files":self.entries}))
    def codes(self):return {x["code"] for x in run(self.root)}
    def test_manifest_absence(self):
        self.manifest.unlink();self.assertIn("MANIFEST_ABSENT",self.codes())
    def test_invalid_json(self):
        self.manifest.write_text("{bad");self.assertIn("MANIFEST_INVALID",self.codes())
    def test_missing_manifest_metadata(self):
        self.manifest.write_text("{}");self.assertIn("MANIFEST_INVALID",self.codes())
    def test_unmanifested_added_file(self):
        p=self.root/"extra.txt";p.write_text("unexpected");self.assertIn("UNMANIFESTED_FILE",self.codes())
    def test_manifest_ghost_file(self):
        self.entries.append({"path":"phantom.txt","size_bytes":1,"sha256":"0"*64});self.save()
        self.assertIn("FILE_ABSENT",self.codes())
    def test_path_traversal_rejected(self):
        self.entries.append({"path":"../outside","size_bytes":1,"sha256":"0"*64});self.save()
        self.assertIn("ENTRY_UNSAFE_PATH",self.codes())
    def test_symlink_rejected(self):
        p=self.root/CHECKS[0];p.unlink();p.symlink_to(self.root/CHECKS[1])
        self.assertIn("ENTRY_SYMLINK",self.codes())
    def test_missing_required_manifest_entry(self):
        self.entries=[e for e in self.entries if e["path"]!=CHECKS[0]];self.save()
        self.assertIn("REQUIRED_CHECK_UNMANIFESTED",self.codes())
    def test_no_git_inventory_is_not_pass(self):
        (self.root/".git").rename(self.root/"git-disabled")
        self.assertIn("TRACKED_INVENTORY_UNAVAILABLE",self.codes())
    @unittest.expectedFailure
    def test_critical_manifest_metadata_tampering_should_be_rejected(self):
        self.manifest.write_text(json.dumps({"files":self.entries,"machine_certification":True,"deployment_authority":True}))
        self.assertTrue(self.codes(), "checker does not inspect authority metadata")
if __name__=="__main__":unittest.main()
