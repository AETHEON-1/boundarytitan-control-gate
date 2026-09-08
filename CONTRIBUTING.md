# Contributing

Changes should preserve the repository's core boundary:

```text
machine output is not authority
machine output is not certification
machine output is not closure
```

Pull requests should identify the affected lane, evidence boundary, first
unsupported arrow, consequence owner, external stop path, unresolved
questions, and reopening condition. Add negative tests for every new control.

Passing CI establishes only the tested repository result. It does not grant
permission, approve deployment, or replace independent review.
