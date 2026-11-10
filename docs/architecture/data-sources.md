# Data source inventory

All rows are **synthetic Atlas** sources. Access to any real enterprise system requires a separate approval and is out of scope for this repository.

| Source | Knowledge | Access (planned) | Ingest vs live | MVP | Notes |
| --- | --- | --- | --- | --- | --- |
| Confluence | Design, runbooks | REST v2, space allowlist | Ingest | Yes | Page version in citations |
| PDF | Architecture packs | File/drive adapter | Ingest | Yes | Page numbers |
| Git | Current code, history | Read-only clone | Ingest | Yes | Cite SHA |
| SVN | Legacy modules | Export at revision | Ingest | Later | Cite revision |
| Java code | Symbols, Spring mappings | Derived from Git | Ingest | Yes | Symbol index |
| Relational DB | Tables, keys, comments | `information_schema` | Ingest schema; live SQL later | Schema yes | Live SQL allowlisted only |
| Kafka | Topics, schemas | Schema Registry / files | Ingest contracts | Yes | No prod consumer |
| REST APIs | OpenAPI operations | Spec files | Ingest | Yes | Live GET later |
| Shared drives | Approved PDFs | Folder allowlist + hash | Ingest | Yes | Deletes propagate |
| Teams | Metadata, transcripts | Microsoft Graph | Ingest | Transcripts yes | Recordings default deny |

## Authorization assumption

No connector is “available” just because a protocol exists. Designs assume **explicit allowlists** and credentials in Secret Manager after approval.
