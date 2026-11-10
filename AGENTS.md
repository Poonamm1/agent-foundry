# Agent instructions

This repository is **Agent Builder Hub**: a learning roadmap, architecture set, and future home of a GCP Project Knowledge Agent.

## Non-negotiables

- Do not implement the full production agent unless the user asked for that phase.
- Do not connect to real Confluence, Git hosts, databases, Kafka clusters, drives, or Microsoft tenants.
- Do not add real company, client, or production data. Use **Atlas Inventory Platform** synthetic examples only.
- Do not store GitHub tokens or cloud keys in the dashboard or git.
- The agent is **read-only**. Do not add write tools without an ADR and human approval.
- Canonical topic data lives in `roadmap/topics.yaml`. Do not fork a second registry.
- After catalog edits, run `python3 scripts/generate_roadmap.py` then `python3 scripts/validate_roadmap.py`.

## Layout

- `roadmap/` — YAML registry and progress
- `docs/learning/` — concise topic notes
- `docs/architecture/` — vision, diagrams, ADRs
- `docs/connectors/` — source designs
- `dashboard/` — Vite + React tracker
- `agent/` — Python ADK-bound skeleton (no ADK required for tests)
- `ingestion/` — adapter skeleton
- `examples/synthetic-data/` — fixtures

## Commands

```bash
python3 scripts/validate_roadmap.py
cd dashboard && npm test && npm run build
cd agent && PYTHONPATH=src pytest
cd ingestion && PYTHONPATH=src pytest
```

Dashboard progress persistence is localStorage + export. Do not fake cloud sync.

## Stack reminders

Python + Google ADK + Gemini + Cloud Run later. Java/Spring appears as **source code to index**, not as the agent runtime.
