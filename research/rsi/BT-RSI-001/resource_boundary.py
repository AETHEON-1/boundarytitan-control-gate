"""BT-RSI-007: resource-side OS boundary and separately signed human-authority receipt.
Research fixture only. Administrator/root can bypass both.
"""
import hashlib,hmac,json,os,pwd,subprocess,sys,tempfile
from pathlib import Path

def canonical(record):
    return json.dumps(record,sort_keys=True,separators=(",",":")).encode()

def authority_receipt(record,registry_key):
    """External fixture registry signs an exact human-supplied scope and owner record."""
    return hmac.new(registry_key,canonical(record),hashlib.sha256).hexdigest()

def validate_receipt(record,signature,registry_key,task):
    if not isinstance(signature,str) or record.get("task")!=task:return False
    required=("task","human_owner","jurisdiction","scope","consequence_owner","stop_owner")
    if not all(record.get(k) for k in required):return False
    expected=authority_receipt(record,registry_key)
    return hmac.compare_digest(expected,signature)

def attempt_unprivileged_write(path):
    nobody=pwd.getpwnam("nobody")
    def drop():
        os.setgroups([]);os.setgid(nobody.pw_gid);os.setuid(nobody.pw_uid)
    return subprocess.run([sys.executable,"-c",
        "from pathlib import Path; import sys; Path(sys.argv[1]).write_text('unauthorized')",
        str(path)],preexec_fn=drop,capture_output=True,text=True,timeout=5)

def protected_resource_probe():
    if os.geteuid()!=0:return {"state":"TEST INVALID","reason":"requires root to drop UID"}
    with tempfile.TemporaryDirectory() as directory:
        root=Path(directory);os.chmod(root,0o755)
        protected=root/"protected";protected.mkdir(mode=0o700)
        resource=protected/"effect.txt"
        resource.write_text("baseline")
        before=resource.read_bytes()
        attempted=attempt_unprivileged_write(resource)
        after=resource.read_bytes()
        return {"state":"SUPPORTED" if attempted.returncode!=0 and before==after else "CONTRADICTED",
                "unprivileged_write_denied":attempted.returncode!=0,
                "resource_unchanged":before==after,
                "limitation":"root administrator can bypass; not independent infrastructure custody"}
