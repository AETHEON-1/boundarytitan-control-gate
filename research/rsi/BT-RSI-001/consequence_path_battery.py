"""BT-RSI-006: intentionally modeled full-path bypasses; offline synthetic only."""
import sqlite3
import tempfile
from pathlib import Path
from authority_transition_ledger import Custodian,observe,sample_record

def direct_database_bypass():
    with tempfile.TemporaryDirectory() as root:
        path=Path(root)/"test.db"
        c=Custodian(path,{"worker":b"key"});c.open_task("T");c.close("T",sample_record())
        # Deliberately bypasses the custodian API using the same filesystem authority.
        with sqlite3.connect(path) as db:
            db.execute("INSERT INTO effects(task,actor,payload) VALUES (?,?,?)",("T","rogue","post-close"))
        observed=observe(path)
        return {"bypass_effect_detected":any(x[2]=="post-close" for x in observed["effects"]),
                "custodian_prevented":False,"evidence":"resource-side database query"}

def stolen_key():
    with tempfile.TemporaryDirectory() as root:
        path=Path(root)/"test.db"
        c=Custodian(path,{"worker":b"stolen-secret"});c.open_task("T")
        signature=c.issue_signature("worker","T","inspect")
        # Attacker has obtained the legitimate signing material/signature.
        result=c.commit("T","worker","inspect",signature,sample_record())
        return {"unauthorized_principal_can_replay":result["allowed"],
                "cryptographic_identity_proves_consent":False}

def administrator_override():
    # An administrator able to write the backing store can change closed state.
    with tempfile.TemporaryDirectory() as root:
        path=Path(root)/"test.db"
        c=Custodian(path,{"worker":b"key"});c.open_task("T");c.close("T",sample_record())
        with sqlite3.connect(path) as db:
            db.execute("UPDATE tasks SET closed=0 WHERE task='T'")
        result=c.commit("T","worker","inspect",c.issue_signature("worker","T","inspect"),sample_record())
        return {"closed_task_resurrected":result["allowed"],"independent_admin_custody":False}

def asynchronous_effect():
    # Queue accepts before close; unprotected external consumer applies after close.
    queued={"task":"T","authorized_at_enqueue":True}
    completed=True
    applied=bool(queued["authorized_at_enqueue"])
    return {"completed_before_effect":completed,"effect_after_close":applied,
            "external_commit_barrier":False}

def false_owner_metadata():
    record=sample_record()
    record["decision_owner"]="Invented Official"
    record["jurisdiction"]="Invented Court"
    with tempfile.TemporaryDirectory() as root:
        path=Path(root)/"test.db"
        c=Custodian(path,{"worker":b"key"});c.open_task("T")
        result=c.commit("T","worker","inspect",c.issue_signature("worker","T","inspect"),record)
        return {"fabricated_metadata_accepted":result["allowed"],
                "independent_authority_verification":False}

def register():
    return {"direct_database":direct_database_bypass(),
            "stolen_key":stolen_key(),
            "administrator_override":administrator_override(),
            "asynchronous_effect":asynchronous_effect(),
            "false_owner_metadata":false_owner_metadata()}
