# Ingestion pipeline

Ingestion is a batch (or incremental) job, not part of the `/ask` request thread.

```mermaid
flowchart LR
  S[Authorized source] --> E[Extraction]
  E --> N[Normalization]
  N --> C[Chunking]
  C --> M[Metadata and ACL preservation]
  M --> I[Embeddings / indexing]
  I --> R[Retrieval snapshots]
```

## Stages

1. **Extraction** — adapter fetches bytes or JSON with a content hash and native version.
2. **Normalization** — text, headings, symbols, or schema objects in a common `SourceDocument`.
3. **Chunking** — heading-aware or symbol-aware units with parent IDs.
4. **Metadata / ACL** — source URI, version, timestamps, `acl_groups`. Unknown ACL → skip.
5. **Embeddings / indexing** — write a new snapshot; do not mutate the live pointer until health checks pass.
6. **Retrieval** — serving reads the current snapshot only.

## Adapter contract (target)

```text
list() -> identities
fetch(id) -> SourceDocument | Deleted
```

`SourceDocument` must include `source_type`, `uri`, `version`, `content_hash`, `acl_groups`, `captured_at`.

## Swap

```mermaid
sequenceDiagram
  participant Job
  participant Storage
  participant Serve
  Job->>Storage: write snapshot N+1
  Job->>Job: health check retrieval
  Job->>Storage: atomic pointer -> N+1
  Serve->>Storage: read pointer
  Note over Job,Serve: On failure, pointer stays at N
```
