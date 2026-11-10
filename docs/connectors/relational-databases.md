# Relational database connector

## 1. What information the source provides

Catalogs, schemas, tables, columns, comments, primary/foreign keys. Not customer row dumps.

## 2. How the agent would access it

A **read-only catalog role** against `information_schema` (or vendor equivalent). Live row queries are a separate, constrained tool.

## 3. Possible API, SDK or protocol

JDBC/DB-API with TLS. PostgreSQL documentation for information schema: https://www.postgresql.org/docs/current/information-schema.html

## 4. Authentication and authorization

Dedicated ingest user: `SELECT` on catalog views only. No `pg_read_server_files`, no DDL, no application tables unless a later allowlist exists.

## 5. Ingestion versus live query

**Ingest schemas** for Q&A. **Live SQL** is advanced, allowlisted, `SELECT`-only, with timeouts, max rows, and human approval for new templates (see `P4-T10`).

## 6. Data parsing and indexing

One document per table plus column lists and comments. Cite `database.schema.table`.

## 7. Update and synchronization

Periodic catalog pull; hash the canonical schema JSON.

## 8. Source citation and provenance

`db` + `schema` + `table` + captured_at. For a live query, cite the **template id**, not a pasted password.

## 9. Security considerations

LLM-generated SQL is unsafe by default. Prefer schema Q&A. Never log row payloads. PII tables are excluded even from schema comments if required.

## 10. Technical limitations

Views, stored procedures, and vendor dialects. Catalog comments are often empty.

## 11. Implementation priority

MVP: schema ingest. Advanced: live SQL.

## 12. Acceptance criteria

- Synthetic SQL file produces a schema catalog
- Default tool surface cannot `SELECT` rows
- Forbidden queries documented
