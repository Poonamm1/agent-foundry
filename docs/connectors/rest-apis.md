# REST API connector

## 1. What information the source provides

OpenAPI paths, operations, parameters, and component schemas.

## 2. How the agent would access it

Parse checked-in OpenAPI files from Git. Optional later: allowlisted `GET` probes.

## 3. Possible API, SDK or protocol

[OpenAPI Specification](https://spec.openapis.org/oas/latest.html). HTTP only for optional live GET.

## 4. Authentication and authorization

Spec files inherit Git ACLs. Live GET would use a tightly scoped client credential and still must not call mutating methods.

## 5. Ingestion versus live query

**Ingest specs.** Live GET is advanced and allowlisted.

## 6. Data parsing and indexing

One document per `operationId` with path, method, and summary.

## 7. Update and synchronization

Reindex when the spec file hash changes.

## 8. Source citation and provenance

`spec path` + `sha` + `operationId`.

## 9. Security considerations

Do not spider production. Do not send Authorization headers to model logs.

## 10. Technical limitations

Undocumented APIs and gateway-only routes will be missing. GraphQL is out of scope here.

## 11. Implementation priority

MVP for OpenAPI ingest.

## 12. Acceptance criteria

- Synthetic `POST /reservations` is searchable
- Live GET marked optional
- Auth schemes recorded on operations
