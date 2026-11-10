# PDF connector

## 1. What information the source provides

Architecture packs, approved design PDFs, page-oriented text, sometimes tables.

## 2. How the agent would access it

Read files from Git, an allowlisted shared-drive folder, or Cloud Storage prefixes—not arbitrary user uploads in MVP.

## 3. Possible API, SDK or protocol

Filesystem / Cloud Storage plus a maintained PDF text-extraction library. OCR is deferred.

## 4. Authentication and authorization

Same as the parent store (Git, drive, bucket IAM). No extra PDF password workflow in MVP; encrypted PDFs are skipped and logged.

## 5. Ingestion versus live query

**Ingest.** Parsing at question time is too slow.

## 6. Data parsing and indexing

Page-level text with `page` on every chunk. Empty pages recorded as parse failures, not as empty “facts.”

## 7. Update and synchronization

Content hash; re-parse when hash changes.

## 8. Source citation and provenance

`uri` + `page` + document title + hash/version.

## 9. Security considerations

PDFs can contain embedded files and injection text. Do not execute JavaScript. Scan for secret-like strings.

## 10. Technical limitations

Scans, two-column layouts, and diagrams lose meaning. Tables may be unordered.

## 11. Implementation priority

MVP P0 — needed for RAG prototype.

## 12. Acceptance criteria

- Synthetic `reservation-v3` PDF yields page-aware chunks
- Citations include page numbers
- Empty extraction is visible in logs
