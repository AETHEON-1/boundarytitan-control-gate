import json,os,pwd,subprocess,sys,tempfile,time,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parent
class CustodyIsolation(unittest.TestCase):
    def test_unprivileged_worker_cannot_modify_custodian_resource(self):
        if os.geteuid()!=0:
            self.skipTest("TEST INVALID for OS permission isolation: requires root to drop worker UID")
        nobody=pwd.getpwnam("nobody")
        with tempfile.TemporaryDirectory() as root:
            base=Path(root);os.chmod(base,0o755)
            private=base/"private";sock=base/"gate.sock"
            server=subprocess.Popen([sys.executable,str(ROOT/"custodian_service.py"),"--socket",str(sock),"--private",str(private),"--revoked"])
            try:
                for _ in range(100):
                    if sock.exists():break
                    time.sleep(.03)
                self.assertTrue(sock.exists())
                def run(name,attack):
                    output=base/(name+".json")
                    output.touch();os.chmod(output,0o666)
                    cmd=[sys.executable,str(ROOT/"custodian_worker.py"),"--socket",str(sock),"--private",str(private),"--output",str(output)]
                    if attack:cmd.append("--attack")
                    def drop():
                        os.setgroups([]);os.setgid(nobody.pw_gid);os.setuid(nobody.pw_uid)
                    proc=subprocess.run(cmd,preexec_fn=drop,capture_output=True,text=True,timeout=6)
                    return proc,json.loads(output.read_text())
                normal,normal_receipt=run("normal",False)
                self.assertEqual(normal.returncode,0)
                self.assertIs(normal_receipt["custodian_allowed"],False)
                attack,attack_receipt=run("attack",True)
                self.assertEqual(attack.returncode,0)
                self.assertFalse(attack_receipt["direct_write"])
                self.assertIn(attack_receipt.get("denial_errno"),(1,13))
                self.assertFalse((private/"effects.jsonl").exists())
                self.assertTrue((private/"decisions.jsonl").exists())
            finally:
                server.terminate()
                try:server.wait(timeout=3)
                except subprocess.TimeoutExpired:server.kill();server.wait()
if __name__=="__main__":unittest.main()
