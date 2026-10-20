"""BT-RSI-005: synthetic durable completion and consequence/authority ledger.
SQLite transaction is the authorization/commit boundary. HMAC authenticates
test identities only; the custodian holds the secret, not a real independent IAM.
"""
import hashlib
import hmac
import json
import sqlite3
import threading
from pathlib import Path

REQUIRED=("evidence_source","rule_source","jurisdiction","decision_owner",
          "consequence_owner","execution_authority","stop_authority","appeal_path")
class BoundaryError(Exception):pass

class Custodian:
    def __init__(self,path,secrets):
        self.path=str(path)
        self._secrets=dict(secrets)
        self._setup()
    def _db(self):
        db=sqlite3.connect(self.path,timeout=10,isolation_level=None)
        db.execute("PRAGMA busy_timeout=10000")
        return db
    def _setup(self):
        with self._db() as db:
            db.execute("PRAGMA journal_mode=WAL")
            db.execute("CREATE TABLE IF NOT EXISTS tasks (task TEXT PRIMARY KEY, closed INTEGER NOT NULL DEFAULT 0)")
            db.execute("CREATE TABLE IF NOT EXISTS effects (id INTEGER PRIMARY KEY, task TEXT, actor TEXT, payload TEXT)")
            db.execute("CREATE TABLE IF NOT EXISTS transitions (id INTEGER PRIMARY KEY, task TEXT, event TEXT, record TEXT)")
    def issue_signature(self,actor,task,payload):
        # Fixture helper: real workers must not receive this signing interface.
        return hmac.new(self._secrets[actor],(actor+"|"+task+"|"+payload).encode(),hashlib.sha256).hexdigest()
    def _verify(self,actor,task,payload,signature):
        key=self._secrets.get(actor)
        if not key or not isinstance(signature,str):return False
        expected=hmac.new(key,(actor+"|"+task+"|"+payload).encode(),hashlib.sha256).hexdigest()
        return hmac.compare_digest(expected,signature)
    def open_task(self,task):
        with self._db() as db:db.execute("INSERT INTO tasks(task,closed) VALUES (?,0)",(task,))
    def close(self,task,record):
        # External controller supplies the record. Validation is not legitimation.
        missing=[x for x in REQUIRED if not record.get(x)]
        if missing:raise BoundaryError("missing authority metadata: "+",".join(missing))
        db=self._db()
        try:
            db.execute("BEGIN IMMEDIATE")
            result=db.execute("UPDATE tasks SET closed=1 WHERE task=? AND closed=0",(task,))
            if result.rowcount!=1:raise BoundaryError("task missing or already closed")
            db.execute("INSERT INTO transitions(task,event,record) VALUES (?,?,?)",
                       (task,"CLOSED",json.dumps(record,sort_keys=True)))
            db.commit()
        except:
            db.rollback();raise
        finally:db.close()
    def commit(self,task,actor,payload,signature,record):
        missing=[x for x in REQUIRED if not record.get(x)]
        if missing:return {"allowed":False,"reason":"MISSING_AUTHORITY_METADATA","missing":missing}
        if not self._verify(actor,task,payload,signature):
            return {"allowed":False,"reason":"UNAUTHENTICATED"}
        db=self._db()
        try:
            db.execute("BEGIN IMMEDIATE")
            row=db.execute("SELECT closed FROM tasks WHERE task=?",(task,)).fetchone()
            if not row or row[0]:
                db.rollback();return {"allowed":False,"reason":"CLOSED_OR_UNKNOWN"}
            db.execute("INSERT INTO effects(task,actor,payload) VALUES (?,?,?)",(task,actor,payload))
            db.execute("INSERT INTO transitions(task,event,record) VALUES (?,?,?)",
                       (task,"EFFECT",json.dumps(record,sort_keys=True)))
            db.commit()
            return {"allowed":True,"reason":"COMMITTED"}
        except:
            db.rollback();raise
        finally:db.close()

def observe(path):
    # Separate database connection, not independent trust domain.
    with sqlite3.connect(str(path)) as db:
        effects=db.execute("SELECT task,actor,payload FROM effects ORDER BY id").fetchall()
        events=db.execute("SELECT task,event,record FROM transitions ORDER BY id").fetchall()
    return {"effects":effects,"transitions":events}

def sample_record():
    return dict(evidence_source="synthetic-observation",rule_source="test-policy",
                jurisdiction="isolated-test",decision_owner="human-test-controller",
                consequence_owner="test-owner",execution_authority="test-custodian",
                stop_authority="human-test-controller",appeal_path="review-log")
