# Java code connector

## 1. What information the source provides

Packages, types, methods, Spring mappings, Javadoc, and file paths derived from Git (or SVN).

## 2. How the agent would access it

Not a live JVM. Parse source from the Git adapter output.

## 3. Possible API, SDK or protocol

Lightweight parsers (regex/JavaParser-class tools later). Full compilation is optional and heavy.

## 4. Authentication and authorization

Inherits Git ACLs. Symbol documents copy `acl_groups` from the file.

## 5. Ingestion versus live query

**Ingest** a symbol table. A `lookup_symbol` tool searches the table, not production.

## 6. Data parsing and indexing

Emit documents such as `ReservationController#create` with annotations `@PostMapping("/reservations")`.

## 7. Update and synchronization

Rebuild symbols when Git SHAs for `*.java` change.

## 8. Source citation and provenance

`path` + `sha` + optional `symbol` + line range if cheap to store.

## 9. Security considerations

Comments may include secrets or customer examples—scan. Do not index test fixtures with fake production dumps if they contain PII patterns.

## 10. Technical limitations

Lombok, generated sources, and annotation processors may hide mappings. Be honest about parser coverage.

## 11. Implementation priority

MVP P0 — “where is the rule implemented?”

## 12. Acceptance criteria

- Synthetic `ReservationController` mapping is searchable
- `lookup_symbol` returns path + SHA
- Parser coverage listed
