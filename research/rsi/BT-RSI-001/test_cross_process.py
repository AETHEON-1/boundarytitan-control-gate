import json,subprocess,sys,tempfile,time,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parent
class CrossProcessTests(unittest.TestCase):
    def test_separate_gate_and_injected_bypass(self):
        with tempfile.TemporaryDirectory() as d:
            sock=str(Path(d)/"gate.sock")
            server=subprocess.Popen([sys.executable,str(ROOT/"gate_service.py"),"--socket",sock,"--revoked"])
            try:
                for _ in range(100):
                    if Path(sock).exists():break
                    time.sleep(.02)
                self.assertTrue(Path(sock).exists())
                def worker(name,*extra):
                    output=Path(d)/(name+".json")
                    proc=subprocess.run([sys.executable,str(ROOT/"worker_process.py"),"--socket",sock,"--output",str(output),*extra],capture_output=True,text=True,timeout=5)
                    return proc,json.loads(output.read_text())
                normal,receipt=worker("denied")
                self.assertEqual(normal.returncode,0)
                self.assertTrue(receipt["gate_contacted"])
                self.assertFalse(receipt["effect"])
                bypass,receipt=worker("bypass","--inject-bypass")
                self.assertEqual(bypass.returncode,1)
                self.assertFalse(receipt["gate_contacted"])
                self.assertTrue(receipt["effect"])
            finally:
                server.terminate()
                try:server.wait(timeout=3)
                except subprocess.TimeoutExpired:server.kill();server.wait()
if __name__=="__main__":unittest.main()
