#!/usr/bin/env python3
"""Read-only GitHub interaction snapshot. No untrusted code execution or repo mutation."""
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

BASE = "https://api.github.com"
ENDPOINTS = {
    "repository": "/repos/{repo}",
    "stargazers": "/repos/{repo}/stargazers?per_page=100",
    "forks": "/repos/{repo}/forks?per_page=100&sort=newest",
    "issues": "/repos/{repo}/issues?state=all&sort=updated&direction=desc&per_page=100",
}
def collect(repo, token, opener=urllib.request.urlopen):
    if not token:
        raise ValueError("GH_TOKEN missing")
    if len(repo.split("/")) != 2 or any(not p.replace("-", "").replace("_", "").isalnum() for p in repo.split("/")):
        raise ValueError("Invalid repository identifier")
    report = {"schema": "bt.interaction.snapshot.v1", "collected_at": datetime.now(timezone.utc).isoformat(),
              "repository": repo, "evidence": {}, "failures": [], "limitations": [
                  "Snapshot, not an exhaustive event ledger; list endpoints return first 100 only.",
                  "Traffic covers GitHub's limited recent window; no visitor identities.",
                  "Artifact retention is finite; durable independent custody not established.",
                  "External notification handled by separately administered ChatGPT task monitor.",
                  "No automated technical-challenge classification or event deduplication."
              ]}
    for key, path in ENDPOINTS.items():
        url = BASE + path.format(repo=repo)
        request = urllib.request.Request(url, headers={
            "Authorization": "Bearer " + token,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "boundarytitan-interaction-sensor"})
        try:
            with opener(request, timeout=20) as response:
                payload = json.load(response)
            if key == "repository":
                data = {k: payload.get(k) for k in ("stargazers_count", "forks_count", "open_issues_count", "subscribers_count")}
            elif key in ("views", "clones"):
                data = payload
            elif isinstance(payload, list):
                data = [{"id": item.get("id"), "number": item.get("number"),
                         "updated_at": item.get("updated_at"), "created_at": item.get("created_at"),
                         "html_url": item.get("html_url"), "user": (item.get("user") or {}).get("login"),
                         "kind": "pull_request" if item.get("pull_request") else key}
                        for item in payload]
            else:
                raise ValueError("Unexpected response shape")
            report["evidence"][key] = data
        except urllib.error.HTTPError as exc:
            # Retain safe diagnostic metadata, never authorization headers.
            headers = exc.headers or {}
            report["failures"].append({
                "endpoint": key, "error": str(exc), "http_status": exc.code,
                "rate_limit_remaining": headers.get("X-RateLimit-Remaining"),
                "rate_limit_reset": headers.get("X-RateLimit-Reset"),
                "retry_after": headers.get("Retry-After"),
                "github_request_id": headers.get("X-GitHub-Request-Id"),
            })
        except (urllib.error.URLError, ValueError, TimeoutError) as exc:
            report["failures"].append({"endpoint": key, "error": str(exc)})
    return report

def main():
    report = collect(os.environ.get("GH_REPOSITORY", ""), os.environ.get("GH_TOKEN", ""))
    with open("interaction-report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, sort_keys=True)
    print(json.dumps({"collected_at": report["collected_at"], "successful": list(report["evidence"]),
                      "failed": report["failures"]}, indent=2))
    return 1 if report["failures"] else 0

if __name__ == "__main__":
    sys.exit(main())
