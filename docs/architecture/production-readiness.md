# Production readiness checklist

Owners complete this before any non-synthetic deployment. Items stay unchecked until true.

| Gate | Owner | Pass? |
| --- | --- | --- |
| Permission-aware retrieval tests pass | A | |
| No write tools in the deployed image | A | |
| Secrets only in Secret Manager | B | |
| Smoke golden questions in CI | A | |
| Index swap + rollback documented | B | |
| Connector stale thresholds defined | B | |
| Audit log schema emitting in staging | B | |
| Cost caps in config | B | |
| Runbooks reviewed | Both | |
| UAT script signed | Both | |
| Known limitations listed below | Both | |
| Legal/privacy review of transcripts flagged | B | |

## Known limitations (honest)

- This repository does not connect to real enterprise systems.
- Recordings are default-deny.
- Live SQL and live Kafka consume are non-goals for MVP.
- Multi-agent runtime is deferred (ADR 0002).
