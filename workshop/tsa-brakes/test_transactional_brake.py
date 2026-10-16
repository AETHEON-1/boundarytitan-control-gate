import os
import tempfile
import unittest
from concurrent.futures import ThreadPoolExecutor
from transactional_brake import Brake

class Tests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.r=os.path.join(self.tmp.name,'resource.db')
        self.w=os.path.join(self.tmp.name,'witness.db')
        b=Brake(self.r,self.w);b.register('task',budget=1);b.close()
    def tearDown(self): self.tmp.cleanup()
    def test_competing_instances_single_commit(self):
        def attempt(i):
            b=Brake(self.r,self.w)
            try:
                try:return b.commit('task','token'+str(i))
                except Exception:return False
            finally:b.close()
        with ThreadPoolExecutor(max_workers=12) as pool:
            outcomes=list(pool.map(attempt,range(12)))
        self.assertEqual(sum(outcomes),1)
        b=Brake(self.r,self.w);self.assertEqual(len(b.effects()),1);b.close()
    def test_stop_before_queued_commit(self):
        b=Brake(self.r,self.w);b.stop('task');b.close()
        c=Brake(self.r,self.w)
        with self.assertRaisesRegex(ValueError,'STOPPED_OR_STALE'):c.commit('task','queued')
        c.close()
    def test_reopen_with_same_storage_stays_stopped(self):
        b=Brake(self.r,self.w);b.stop('task');b.close()
        c=Brake(self.r,self.w)
        with self.assertRaises(ValueError):c.commit('task','restart')
        c.close()
    def test_old_resource_snapshot_cannot_erase_witness(self):
        b=Brake(self.r,self.w);b.stop('task');b.close()
        c=Brake(self.r,self.w)
        c.r.execute('UPDATE tasks SET closed=0,epoch=1')
        with self.assertRaisesRegex(ValueError,'STOPPED_OR_STALE'):c.commit('task','rolled-back')
        c.close()
    def test_replay_rejected(self):
        b=Brake(self.r,self.w);b.commit('task','same')
        with self.assertRaises(Exception):b.commit('task','same')
        b.close()
    def test_no_task_reuse_after_stop(self):
        b=Brake(self.r,self.w);b.stop('task')
        with self.assertRaises(ValueError):b.register('task')
        b.close()
if __name__=='__main__':unittest.main()
