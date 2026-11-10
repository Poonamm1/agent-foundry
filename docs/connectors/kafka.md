# Kafka connector

## 1. What information the source provides

Topic names, configuration metadata (as documentation), and **schemas** (Avro/JSON/Protobuf). Not a replica of production message payloads.

## 2. How the agent would access it

Read Schema Registry or checked-in schema files. Admin APIs for topic lists if approved.

## 3. Possible API, SDK or protocol

[Apache Kafka documentation](https://kafka.apache.org/documentation/). Schema Registry HTTP APIs where used. Avoid a long-running consumer group against production.

## 4. Authentication and authorization

Read-only registry credentials. No produce ACL on the ingest identity.

## 5. Ingestion versus live query

**Ingest contracts.** Live consume of business events is a **non-goal** for MVP (privacy, volume, ordering, poisoning).

## 6. Data parsing and indexing

One document per subject version: fields, compatibility, owners if present.

## 7. Update and synchronization

Poll schema versions; keep old versions as superseded.

## 8. Source citation and provenance

`topic` + `subject` + `schema version`.

## 9. Security considerations

Payloads may contain PII. Even “peek one message” is a data access event. Treat it like live SQL: default off.

## 10. Technical limitations

Without a registry, topic lists do not explain fields. Compaction and tombstones are runtime concerns, not MVP Q&A.

## 11. Implementation priority

MVP for schemas; live consume out of scope.

## 12. Acceptance criteria

- Synthetic `ReservationEvent` v4 is retrievable
- Design explicitly forbids production consumers
- Schema version in citations
