"""Three-process authority lab. All processes still share one host administrator.

Owner controls witness and its private credential. Resource controls its own
effect DB. Observer controls a separate receipt DB. Requester gets only resource
IPC. The witness uses a separate IPC channel and independently validates epoch.
This lab does NOT claim separate OS administrators, mTLS, HSMs, or network hosts.
"""
import multiprocessing as mp
import sqlite3
import os
from multiprocessing.connection import wait

def db(path):
    c=sqlite3.connect(path,timeout=5,isolation_level=None)
    c.execute('PRAGMA journal_mode=WAL')
    c.execute('PRAGMA synchronous=FULL')
    return c

def witness_server(owner_conn,resource_conn,path):
    c=db(path)
    c.execute('CREATE TABLE IF NOT EXISTS grants(task TEXT PRIMARY KEY,epoch INTEGER,stopped INTEGER)')
    try:
        alive=True
        while alive:
            for conn in wait([owner_conn,resource_conn]):
                try:q=conn.recv()
                except EOFError:
                    alive=False
                    break
                op=q['op']
                if conn is resource_conn and op!='check':
                    ans={'ok':False,'reason':'RESOURCE_CANNOT_MUTATE_WITNESS'}
                elif conn is owner_conn and op=='check':
                    ans={'ok':False,'reason':'OWNER_CHECK_NOT_EXPOSED'}
                elif op=='register':
                    try:
                        c.execute('INSERT INTO grants VALUES(?,1,0)',(q['task'],))
                        ans={'ok':True}
                    except sqlite3.IntegrityError:ans={'ok':False,'reason':'REUSE'}
                elif op=='stop':
                    cur=c.execute('UPDATE grants SET stopped=1,epoch=epoch+1 WHERE task=?',(q['task'],))
                    ans={'ok':cur.rowcount==1}
                elif op=='check':
                    row=c.execute('SELECT epoch,stopped FROM grants WHERE task=?',(q['task'],)).fetchone()
                    ans={'ok':bool(row and row[0]==q['epoch'] and not row[1])}
                elif op=='shutdown' and conn is owner_conn:
                    conn.send({'ok':True})
                    alive=False
                    break
                else:ans={'ok':False,'reason':'DENIED'}
                conn.send(ans)
    finally: c.close();owner_conn.close();resource_conn.close()

def observer_server(conn,path):
    c=db(path)
    c.execute('CREATE TABLE IF NOT EXISTS receipts(token TEXT PRIMARY KEY,task TEXT)')
    try:
        while True:
            try: q=conn.recv()
            except EOFError: break
            if q['op']=='append':
                c.execute('INSERT OR IGNORE INTO receipts VALUES(?,?)',(q['token'],q['task']))
                ans={'ok':True}
            elif q['op']=='read':
                ans={'ok':True,'receipts':c.execute('SELECT token FROM receipts ORDER BY token').fetchall()}
            elif q['op']=='shutdown': conn.send({'ok':True});break
            else: ans={'ok':False}
            conn.send(ans)
    finally:c.close();conn.close()

def resource_server(requester,witness,observer,path):
    c=db(path)
    c.execute('CREATE TABLE IF NOT EXISTS effects(token TEXT PRIMARY KEY,task TEXT)')
    try:
        while True:
            try:q=requester.recv()
            except EOFError:break
            if q['op']=='shutdown':requester.send({'ok':True});break
            if q['op']!='commit':
                requester.send({'ok':False,'reason':'REQUESTER_DENIED'});continue
            # Witness check is a separate process, but resource has a window
            # between this check and local commit: intentional TOCTOU frontier.
            witness.send({'op':'check','task':q['task'],'epoch':q.get('epoch',1)})
            allowed=witness.recv()['ok']
            if not allowed:
                requester.send({'ok':False,'reason':'WITNESS_DENIED'});continue
            try:
                c.execute('INSERT INTO effects VALUES(?,?)',(q['token'],q['task']))
                observer.send({'op':'append','token':q['token'],'task':q['task']})
                observed=observer.recv()['ok']
                requester.send({'ok':observed})
            except sqlite3.IntegrityError:
                requester.send({'ok':False,'reason':'REPLAY'})
    finally:c.close();requester.close();witness.close();observer.close()

class Endpoint:
    def __init__(self,conn):self.conn=conn
    def call(self,op,**kwargs):
        self.conn.send(dict(op=op,**kwargs))
        return self.conn.recv()
    def close(self):self.conn.close()

def launch(root):
    os.makedirs(root,exist_ok=True)
    wc,ws=mp.Pipe();rc,rw=mp.Pipe();oc,osv=mp.Pipe();ro,ors=mp.Pipe();rr,rs=mp.Pipe()
    processes=[
        mp.Process(target=witness_server,args=(ws,rc,os.path.join(root,'witness.db'))),
        mp.Process(target=observer_server,args=(osv,os.path.join(root,'observer.db'))),
        mp.Process(target=resource_server,args=(rs,rw,ors,os.path.join(root,'resource.db')))]
    for p in processes:p.start()
    for c in (ws,rc,osv,rs,rw,ors):c.close()
    return processes,Endpoint(wc),Endpoint(oc),Endpoint(rr),os.path.join(root,'resource.db'),os.path.join(root,'observer.db')
