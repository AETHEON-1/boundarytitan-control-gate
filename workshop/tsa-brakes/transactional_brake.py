"""Sandbox reference: SQLite serialized commits plus separately held witness DB.
Not independent custody if same OS administrator controls both stores.
"""
import sqlite3
import time
import os

def connect(path):
    db = sqlite3.connect(path, timeout=10, isolation_level=None)
    db.execute('PRAGMA busy_timeout=10000')
    db.execute('PRAGMA synchronous=FULL')
    db.execute('PRAGMA journal_mode=WAL')
    return db

class Brake:
    def __init__(self, resource_path, witness_path):
        if os.path.abspath(resource_path) == os.path.abspath(witness_path):
            raise ValueError('SEPARATE_STORES_REQUIRED')
        self.r = connect(resource_path)
        self.w = connect(witness_path)
        self.r.executescript("""CREATE TABLE IF NOT EXISTS tasks
            (id TEXT PRIMARY KEY, epoch INTEGER NOT NULL, closed INTEGER NOT NULL DEFAULT 0,
             budget INTEGER NOT NULL, spent INTEGER NOT NULL DEFAULT 0);
            CREATE TABLE IF NOT EXISTS effects
            (token TEXT PRIMARY KEY, task TEXT NOT NULL, created INTEGER NOT NULL);
        """)
        self.w.executescript("""CREATE TABLE IF NOT EXISTS tombstones
            (id TEXT PRIMARY KEY, minimum_epoch INTEGER NOT NULL, closed INTEGER NOT NULL);
        """)

    def register(self, task, budget=1):
        if not task or budget < 1: raise ValueError('INVALID_TASK')
        self.w.execute('BEGIN IMMEDIATE')
        try:
            if self.w.execute('SELECT 1 FROM tombstones WHERE id=?', (task,)).fetchone():
                raise ValueError('TASK_ID_REUSE')
            self.r.execute('BEGIN IMMEDIATE')
            try:
                self.r.execute('INSERT INTO tasks(id,epoch,budget) VALUES(?,1,?)', (task,budget))
                self.w.execute('INSERT INTO tombstones VALUES(?,1,0)', (task,))
                self.w.execute('COMMIT')
                self.r.execute('COMMIT')
            except:
                self.r.execute('ROLLBACK')
                raise
        except:
            if self.w.in_transaction: self.w.execute('ROLLBACK')
            raise

    def stop(self, task):
        self.w.execute('BEGIN IMMEDIATE')
        try:
            row = self.w.execute('SELECT minimum_epoch FROM tombstones WHERE id=?',(task,)).fetchone()
            if row is None: raise ValueError('UNKNOWN_TASK')
            self.w.execute('UPDATE tombstones SET minimum_epoch=?,closed=1 WHERE id=?',(row[0]+1,task))
            self.w.execute('COMMIT')
        except:
            if self.w.in_transaction: self.w.execute('ROLLBACK')
            raise
        self.r.execute('BEGIN IMMEDIATE')
        try:
            self.r.execute('UPDATE tasks SET epoch=epoch+1,closed=1 WHERE id=?',(task,))
            self.r.execute('COMMIT')
        except:
            if self.r.in_transaction:self.r.execute('ROLLBACK')
            raise

    def commit(self, task, token, epoch=1):
        self.w.execute('BEGIN IMMEDIATE')
        try:
            w = self.w.execute('SELECT minimum_epoch,closed FROM tombstones WHERE id=?',(task,)).fetchone()
            if w is None or w[1] or w[0] != epoch: raise ValueError('STOPPED_OR_STALE')
            self.r.execute('BEGIN IMMEDIATE')
            try:
                r = self.r.execute('SELECT epoch,closed,budget,spent FROM tasks WHERE id=?',(task,)).fetchone()
                if r is None or r[1] or r[0]!=epoch: raise ValueError('RESOURCE_STOPPED')
                if r[3]>=r[2]: raise ValueError('BUDGET')
                self.r.execute('INSERT INTO effects VALUES(?,?,?)',(token,task,time.time_ns()))
                self.r.execute('UPDATE tasks SET spent=spent+1 WHERE id=?',(task,))
                self.r.execute('COMMIT')
                return True
            except:
                if self.r.in_transaction:self.r.execute('ROLLBACK')
                raise
        finally:
            if self.w.in_transaction:self.w.execute('ROLLBACK')

    def effects(self):
        return self.r.execute('SELECT token FROM effects ORDER BY token').fetchall()

    def close(self):
        self.r.close();self.w.close()
