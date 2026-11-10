# High-level architecture

Two pipelines: **ask** (synchronous) and **ingest** (asynchronous).

## Ask path

```mermaid
flowchart TB
  UI[User interface] --> API[Agent API]
  API --> AUTH[Authn / authz]
  AUTH --> ORCH[Agent orchestrator]
  ORCH --> LLM[LLM - Gemini]
  ORCH --> TOOLS[Retrieval and tool layer]
  TOOLS --> IDX[Knowledge index]
  TOOLS --> CONN[Read-only diagnostic tools]
  CONN --> SRC[Authorized data sources]
  IDX --> SRC
  LLM --> ORCH
  ORCH --> API
```

The LLM never opens Confluence, Git, or databases by itself. It proposes tool calls; application code executes them with timeouts, argument validation, and ACL filters.

## Component ownership

| Component | Owner |
| --- | --- |
| Agent API, orchestrator, prompts, evaluation | Developer A |
| Ingestion, connectors, index snapshots, Cloud Run/IAM | Developer B |
| Architecture review and integration tests | Both |

## Ingest path

See [ingestion-pipeline.md](./ingestion-pipeline.md).

## Runtime notes

- First host: **Cloud Run** (stateless)
- Index snapshots: **Cloud Storage**
- Models: **Gemini** via Google Cloud supported APIs
- Framework: **Google ADK** (Python)
- Local development uses fixtures under `examples/synthetic-data/`
