# EC-MIKA-001 | Bounded implementation v0.1

2026-11-24 | YELLOW | Human approved candidate build and repository placement following the architecture receipt. No canonical admission, production deployment, external execution or independent validation authorized.

Read-only local CommonJS prototype. No package installation, network calls, credentials, database writes, or model inference required. Run from this directory with Node.js:

    node retrieve.cjs --mechanism FM-009 --text "autonomous AI recovery"
    node retrieve.cjs --text recovery --history
    node retrieve.cjs --test

Files: entry.schema.json (candidate-only JSON Schema); mechanisms.json (18 proposed identifiers); candidates.json (five deliberately bounded records); retrieve.cjs (validation, ingestion, deterministic linear-scan index/query and developer tests); machine-test-receipt.json (machine-run results). The architecture remains at ../2026-11-24-mechanism-indexed-knowledge-architecture-v0.1.md. Existing archive records unchanged.

Mechanism matches are explicit candidate tags, not inferred causality. Text matches are simple case-insensitive substring matches of ASCII tokenized query words, OR semantics, sorted by match count then identifier/revision. This is a baseline mechanism-indexed lookup over records, not a persistent inverted index, semantic search, or comprehensive retrieval system. Unclassified records are text searchable; specific mechanism queries do not guess tags. Latest revision default, history optional; no writes or deletion. Validation supports only schema constructs used here, not general JSON Schema. Source dates and URLs are lexical checks, not provenance validation. Registry and schema are trusted local inputs. No signature, independent source snapshot or immutable source digest. Only candidate state accepted; no authority transitions.

Five records are a purposive subset: three reopened public incident pages, one prior published research anchor, and one repository-documented retrieval failure. Remaining global and internal candidates not ingested; no existing record migrated. All classification and transfer assertions remain review candidates. Positive control is marked separately from failure. Synthetic fixtures exist only inside tests, not the evidence corpus.

Machine tests executed in the JavaScript orchestration environment on the same four function bodies serialized into retrieve.cjs; the Node CLI itself has not been executed there. The tests and fixtures are machine-authored; no independent design, execution, custody or disposition. Test success is not independent validation. A specialist should run the CLI independently, inspect sources, challenge tags and construct hidden cases (unclassified relevant evidence, false positives, conflicting revisions, correction provenance, missing tags, and counterevidence), then measure bounded precision/recall. No measured retrieval accuracy or completeness claimed. Preserve failures and corrections, including test and search misses. Human owner retains admission and stop authority.

CAN ⊬ MAY.
