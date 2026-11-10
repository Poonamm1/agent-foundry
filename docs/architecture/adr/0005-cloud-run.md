# ADR 0005: Cloud Run as initial host

- Status: Accepted
- Date: 2026-11-09

## Context

The ask path is a stateless HTTPS API with bursty traffic.

## Decision

Deploy the agent container to Cloud Run. Load index snapshots from Cloud Storage. Do not introduce GKE or a custom VM fleet for MVP.

## Alternatives

- GKE — extra operational load for two developers.
- Cloud Functions — weaker fit for long tool loops and a persistent API shape.
- Cloud Run (chosen).

## Consequences

- The container must be stateless; durable data lives in Storage/index snapshots.
- IAM at the service edge plus Secret Manager for credentials.
- `adk web` remains a **development** UI only ([ADK Python quickstart](https://adk.dev/get-started/python/)).
