"""Hard process-kill crash-point tests; synthetic SQLite only, same OS authority.

The expected negative result in register_after_witness_commit is an explicit
cross-store partial commit. Do not confuse this with a successful recovery.
"""
import os
import sqlite3
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from transactional_brake import Brake

CHILD = '''
import os,sys
from transactional_brake import Brake
r,w,action,checkpoint=sys.argv[1:]
def kill(name):
    if name==checkpoint:
        os._exit(79)
b=Brake(r,w,fault_hook=kill)
if action=='register': b.register('task',budget=2)
elif action=='stop': b.stop('task')
elif action=='commit': b.commit('task','crash-token')
elif action=='reconcile': b.reconcile()
else: raise RuntimeError(action)
b.close()
'''

class CrashBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.r=str(Path(self.tmp.name)/'resource.sqlite')
        self.w=str(Path(self.tmp.name)/'witness.sqlite')
    def tearDown(self): self.tmp.cleanup()
    def child(self, action, checkpoint):
        p=subprocess.run([sys.executable,'-c',CHILD,self.r,self.w,action,checkpoint],
                         cwd=str(Path(__file__).parent),capture_output=True,text=True,timeout=15)
        self.assertEqual(p.returncode,79,(p.stdout,p.stderr))
    def init(self):
        b=Brake(self.r,self.w)
        b.register('task',budget=2)
        b.close()
    def effect_count(self):
        with sqlite3.connect(self.r) as db:
            return db.execute('SELECT count(*) FROM effects').fetchone()[0]
    def test_commit_crash_before_sqlite_commit_rolls_back(self):
        self.init()
        self.child('commit','commit_before_resource_commit')
        self.assertEqual(self.effect_count(),0)
        b=Brake(self.r,self.w)
        self.assertTrue(b.commit('task','fresh'))
        self.assertEqual(len(b.effects()),1)
        b.close()
    def test_commit_crash_after_sqlite_commit_preserves_effect(self):
        self.init()
        self.child('commit','commit_after_resource_commit')
        self.assertEqual(self.effect_count(),1)
        b=Brake(self.r,self.w)
        with self.assertRaises(sqlite3.IntegrityError): b.commit('task','crash-token')
        b.close()
    def test_stop_crash_after_witness_commit_blocks_stale_action(self):
        self.init()
        self.child('stop','stop_after_witness_commit')
        b=Brake(self.r,self.w)
        self.assertEqual(b.r.execute('SELECT closed FROM tasks WHERE id=?',('task',)).fetchone()[0],0)
        with self.assertRaisesRegex(ValueError,'STOPPED_OR_STALE'): b.commit('task','late')
        self.assertEqual(self.effect_count(),0)
        b.close()
    def test_stop_crash_after_resource_commit_remains_stopped(self):
        self.init()
        self.child('stop','stop_after_resource_commit')
        b=Brake(self.r,self.w)
        with self.assertRaisesRegex(ValueError,'STOPPED_OR_STALE'): b.commit('task','late')
        self.assertEqual(self.effect_count(),0)
        b.close()
    def test_incomplete_registration_quarantined_without_restoring_may(self):
        self.child('register','register_after_witness_commit')
        b=Brake(self.r,self.w)
        self.assertEqual(b.reconcile(),('task',))
        row=b.w.execute('SELECT closed FROM tombstones WHERE id=?',('task',)).fetchone()
        self.assertEqual(row,(1,))
        with self.assertRaisesRegex(ValueError,'STOPPED_OR_STALE'):
            b.commit('task','old')
        with self.assertRaisesRegex(ValueError,'TASK_ID_REUSE'):
            b.register('task')
        b.close()
    def test_crash_during_reconcile_is_fail_closed_and_retryable(self):
        self.init()
        self.child('stop','stop_after_witness_commit')
        self.child('reconcile','reconcile_after_witness_commit')
        b=Brake(self.r,self.w)
        with self.assertRaisesRegex(ValueError,'STOPPED_OR_STALE'):
            b.commit('task','late')
        self.assertEqual(b.reconcile(),('task',))
        self.assertEqual(b.r.execute('SELECT closed FROM tasks WHERE id=?',('task',)).fetchone(),(1,))
        self.assertEqual(self.effect_count(),0)
        b.close()

    def test_missing_witness_row_quarantines_resource_without_regrant(self):
        self.init()
        with sqlite3.connect(self.w) as db:
            db.execute('DELETE FROM tombstones WHERE id=?',('task',))
        b=Brake(self.r,self.w)
        with self.assertRaisesRegex(ValueError,'STOPPED_OR_STALE'):
            b.commit('task','late')
        self.assertEqual(b.reconcile(),('task',))
        self.assertEqual(b.r.execute('SELECT closed FROM tasks WHERE id=?',('task',)).fetchone(),(1,))
        with self.assertRaisesRegex(ValueError,'TASK_ID_REUSE'):
            b.register('task')
        b.close()

    def test_registration_cross_store_partial_commit_is_exposed(self):
        self.child('register','register_after_witness_commit')
        b=Brake(self.r,self.w)
        witness=b.w.execute('SELECT id,closed FROM tombstones WHERE id=?',('task',)).fetchone()
        resource=b.r.execute('SELECT id FROM tasks WHERE id=?',('task',)).fetchone()
        self.assertEqual(witness,('task',0))
        self.assertIsNone(resource)
        with self.assertRaisesRegex(ValueError,'TASK_ID_REUSE'): b.register('task')
        with self.assertRaisesRegex(ValueError,'RESOURCE_STOPPED'): b.commit('task','not-admitted')
        b.close()

if __name__=='__main__': unittest.main()
