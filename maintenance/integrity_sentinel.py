#!/usr/bin/env python3
"""Read-only, fail-closed repository integrity candidate. Not a CI or branch-protection verifier."""
import argparse
import hashlib
import json
import pathlib
import subprocess
import sys

MANIFEST="CURRENT-REPOSITORY-MANIFEST.json"
REQUIRED=[".github/workflows/verify.yml",".github/workflows/interaction-sensor.yml","scripts/verify-repository-state.js"]
def run(root):
    findings=[]
    def add(code,detail): findings.append({"code":code,"detail":detail})
    manifest_path=root/MANIFEST
    if not manifest_path.is_file():
        add("MANIFEST_ABSENT",MANIFEST);return findings
    try:
        manifest=json.loads(manifest_path.read_text(encoding="utf-8"))
        if manifest.get("machine_certification", False) is not False or manifest.get("deployment_authority", False) is not False:\n            add("AUTHORITY_METADATA_INVALID","manifest claims machine certification or deployment authority")\n        entries=manifest["files"]
        if not isinstance(entries,list):raise ValueError("files is not a list")
    except (ValueError,KeyError,TypeError) as e:
        add("MANIFEST_INVALID",str(e));return findings
    paths=[]
    for entry in entries:
        if not isinstance(entry,dict) or not isinstance(entry.get("path"),str):
            add("ENTRY_INVALID",str(entry));continue
        path=entry["path"];paths.append(path)
        p=pathlib.PurePosixPath(path)
        if p.is_absolute() or ".." in p.parts or not path or path==MANIFEST:
            add("ENTRY_UNSAFE_PATH",path);continue
        target=root/path
        if target.is_symlink():
            add("ENTRY_SYMLINK",path);continue
        if not target.is_file():
            add("FILE_ABSENT",path);continue
        data=target.read_bytes()
        if len(data)!=entry.get("size_bytes"):add("SIZE_MISMATCH",path)
        if hashlib.sha256(data).hexdigest()!=entry.get("sha256"):add("HASH_MISMATCH",path)
    if len(paths)!=len(set(paths)):add("DUPLICATE_MANIFEST_PATH",str(sorted({x for x in paths if paths.count(x)>1})))
    try:
        raw=subprocess.check_output(["git","ls-files","--cached","--others","--exclude-standard","-z"],cwd=root,stderr=subprocess.PIPE)
        actual={p for p in raw.decode("utf-8").split("\0") if p and p!=MANIFEST}
        recorded=set(paths)
        for p in sorted(actual-recorded):add("UNMANIFESTED_FILE",p)
        for p in sorted(recorded-actual):add("MANIFEST_ONLY_FILE",p)
    except (OSError,subprocess.CalledProcessError,UnicodeError) as e:
        add("TRACKED_INVENTORY_UNAVAILABLE",str(e))
    for path in REQUIRED:
        if not (root/path).is_file():add("REQUIRED_CHECK_ABSENT",path)
        if path not in paths:add("REQUIRED_CHECK_UNMANIFESTED",path)
    return findings
def main():
    ap=argparse.ArgumentParser();ap.add_argument("--root",type=pathlib.Path,default=pathlib.Path.cwd());args=ap.parse_args()
    findings=run(args.root.resolve())
    print(json.dumps({"state":"FAIL" if findings else "LOCAL_CHECKS_PASS_ONLY","findings":findings,"independent_verification":False,"branch_enforcement":"NOT_TESTED","scheduled_run_continuity":"NOT_TESTED"},indent=2))
    return 1 if findings else 0
if __name__=="__main__":sys.exit(main())
