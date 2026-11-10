# Roadmap

This directory is the **canonical** learning and implementation registry.

| File | Role |
| --- | --- |
| `topics.yaml` | Single source of truth for phases, milestones, and topics |
| `progress.yaml` | Shared committed progress (optional; reconcile via PR) |
| `progress.example.yaml` | Empty template matching the progress schema |
| `schema/` | JSON Schema for CI and dashboard import validation |

Do not copy topic definitions into Markdown except as generated learning notes that **reference** topic IDs.

## Statuses

`Not Started` → `Learning` → `Practicing` → `Done`

`Blocked` can be set from any non-done state. Reopen `Done` by setting `Learning` or `Practicing`.

A topic is **not** Done because a learning document exists. See `doneMeans` in `topics.yaml`.

## Editing progress

1. Use the dashboard for local work (`localStorage`).
2. Export YAML/JSON.
3. Open a PR that updates `roadmap/progress.yaml`.
4. If both developers export, reconcile topic-by-topic (see [CONTRIBUTING.md](../CONTRIBUTING.md)).

Regenerate learning docs after catalog changes:

```bash
python3 scripts/generate_roadmap.py
```
