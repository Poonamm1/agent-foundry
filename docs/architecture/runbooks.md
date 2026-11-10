# Runbook stubs

Replace placeholders when a GCP project exists. These are operator notes, not a pager product.

## Gemini / model API outage

- Symptoms: 5xx/429, empty model responses, rising latency.
- Checks: provider status, quota, request_id in logs.
- Actions: fail user-visible 503; do not retry forever; optional read-only cached message.
- Rollback: none for the model; wait or pin a fallback model name if configured.

## Bad index snapshot

- Symptoms: citation SLI drop, missing symbols, sudden empty retrieval.
- Checks: current pointer, snapshot timestamp, last-good snapshot.
- Actions: point serving at previous snapshot (see `P4-T20` / `P8-T10`).
- Rollback: index pointer only; service revision may stay.

## Connector auth expiry

- Symptoms: ingest errors, stale `last_success_at`.
- Checks: Secret Manager version, IAM accessor, allowlists.
- Actions: rotate secret; re-run ingest; do not paste tokens into chat logs.

## Suspected secret leak

- Symptoms: key in git history, logs, or an answer.
- Actions: rotate immediately, purge logs if needed, treat as incident. Do not commit the secret “for tracking.”
