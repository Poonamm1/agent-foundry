# Requirements

Verification methods: **D** demo, **T** automated test, **C** checklist.

## Functional

| ID | Requirement | Verify |
| --- | --- | --- |
| FR-01 | Answer natural-language questions about synthetic Atlas artifacts | D |
| FR-02 | Include source citations with URI and version when evidence exists | T |
| FR-03 | State when evidence is missing instead of inventing identifiers | T |
| FR-04 | Distinguish confirmed facts from assumptions | D |
| FR-05 | Retrieve from indexed documents, code symbols, and schemas | D |
| FR-06 | Support follow-up questions that refer to prior citations | D |
| FR-07 | Expose only read-only tools in MVP | T |
| FR-08 | Filter retrieval by caller identity in tests using synthetic ACLs | T |
| FR-09 | Record request metadata for audit (principal, sources, denials) | T |
| FR-10 | Ingest PDF, Git, and schema fixtures through a common adapter | T |

## Non-functional

| ID | Requirement | Verify |
| --- | --- | --- |
| NFR-01 | Local fixture p95 latency is measured and recorded | C |
| NFR-02 | Token counts are logged per request | T |
| NFR-03 | Secrets never appear in git, images, prompts, or debug logs | C |
| NFR-04 | Default deny when ACL metadata is missing | T |
| NFR-05 | Index rebuild does not serve a half-built snapshot | C |
| NFR-06 | Deletes propagate out of the retrievable set | T |
| NFR-07 | Smoke golden questions run on pull requests with fixtures | T |
| NFR-08 | Cost drivers (tokens, hops, k) are configurable caps | C |
| NFR-09 | Structured answers validate against a schema | T |
| NFR-10 | Operator runbooks exist for model outage, bad index, secret leak | C |

## Non-goals (MVP)

- Write-back to tickets, chat, or source systems
- Live consumption of production Kafka payloads
- Unconstrained SQL against production data
- Ingesting meeting recordings by default
- Multi-agent graphs for ordinary Q&A
- Fine-tuning on project documents
