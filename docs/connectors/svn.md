# SVN connector

## 1. What information the source provides

Legacy trees (for Atlas, a fictional pricing module), file contents, and revision numbers.

## 2. How the agent would access it

Read-only `svn export` of allowlisted paths at a pinned revision.

## 3. Possible API, SDK or protocol

[Apache Subversion](https://subversion.apache.org/) CLI (`svn export`, `svn list`) over HTTPS or `svn+ssh`.

## 4. Authentication and authorization

Service account with read access to listed modules only.

## 5. Ingestion versus live query

**Ingest** exports. Do not two-way sync or mount production working copies into Cloud Run.

## 6. Data parsing and indexing

Same as files from Git after export. Metadata uses `revision` instead of SHA.

## 7. Update and synchronization

Poll `svn info` for newest revision; export diffs or full tree for small modules.

## 8. Source citation and provenance

`svn URI` + `revision` + path.

## 9. Security considerations

Legacy trees often contain credentials and production dumps. Scan and allowlist strictly.

## 10. Technical limitations

Branching models differ from Git. Auth and networking (VPN) may block Cloud Run; ingest may need an approved jump host later.

## 11. Implementation priority

Advanced / P2 unless a legacy module is required for MVP questions.

## 12. Acceptance criteria

- Fixture export at `r1844` indexes with revision metadata
- Design documents why Git is preferred when both exist
