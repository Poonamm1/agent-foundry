# Security boundaries

```mermaid
flowchart TB
  subgraph UserTrust[User device]
    U[Engineer]
  end
  subgraph Edge[Agent runtime]
    API[Cloud Run API]
    ORCH[Orchestrator]
    TOOL[Tool executors]
  end
  subgraph Secrets[Secret Manager]
    TOK[Connector tokens]
  end
  subgraph Index[Derived knowledge]
    SNAP[Index snapshots]
  end
  subgraph Origins[Origin systems]
    CF[Confluence]
    GIT[Git]
    DB[(Database catalog)]
  end
  U -->|identity token| API
  API --> ORCH --> TOOL
  TOOL -->|user ACL filter| SNAP
  Job[Ingest job] -->|ingest SA| TOK
  Job --> Origins
  Job --> SNAP
  API -.->|must not| TOK
```

## Rules

- The **user identity** flows into retrieval filters. Prompt text is not an ACL.
- **Serve** and **ingest** use different service accounts.
- Connector tokens are for ingest (and rarely for live diagnostic tools with extra review).
- Write tools are out of scope for MVP. Any later write requires human approval.
- Retrieved documents are **untrusted data** (prompt injection).
- This repository contains **synthetic data only**.

## Data classes

| Class | Examples | Handling |
| --- | --- | --- |
| Public-in-repo | Synthetic Atlas fixtures | Git |
| Project knowledge | Design pages, code, schemas | Index + ACL |
| Credentials | API keys, Graph tokens | Secret Manager only |
| Restricted | HR, payroll, customer PII | Do not ingest in MVP |

## Human approval

Risky actions (non-allowlisted SQL, messages, mutations) stay disabled. See topic `P6-T13`.
