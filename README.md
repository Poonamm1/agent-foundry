# Agent Builder Hub

**[Open Learning Dashboard](https://poonamm1.github.io/agent-foundry/)**

Learning roadmap, architecture notes, and implementation tracker for a **Project Knowledge Agent** that will run on Google Cloud.

The agent will answer grounded, source-cited questions about a software system by retrieving authorized sources (docs, code, schemas, events, APIs, and meeting transcripts). This repository does **not** ship the full agent yet. It is the foundation for two developers to learn and build in 8–10 weeks.

All examples use the fictional **Atlas Inventory Platform**. Do not add real client or production data.

## Quick start

### Dashboard (progress tracker)

```bash
cd dashboard
npm install
npm run dev
```

Open the printed local URL. Mark topics Learning / Practicing / Blocked / Done. Progress saves in **this browser only**.

Export YAML and commit it as `roadmap/progress.yaml` when you want to share (see [CONTRIBUTING.md](CONTRIBUTING.md)).

### Validate the registry

```bash
pip install pyyaml jsonschema
python3 scripts/validate_roadmap.py
```

### Python skeletons (no cloud required)

```bash
cd agent && PYTHONPATH=src pytest
cd ingestion && PYTHONPATH=src pytest
```

## Repository map

| Path | Purpose |
| --- | --- |
| [roadmap/](roadmap/) | Canonical topics, milestones, progress YAML |
| [docs/learning/](docs/learning/) | Topic notes (template per topic) |
| [docs/architecture/](docs/architecture/) | Vision, diagrams, ADRs |
| [docs/connectors/](docs/connectors/) | Source integration designs |
| [dashboard/](dashboard/) | Interactive tracker (GitHub Pages optional) |
| [agent/](agent/) | Future ADK/Gemini application skeleton |
| [ingestion/](ingestion/) | Future source-ingestion skeleton |
| [examples/synthetic-data/](examples/synthetic-data/) | Non-sensitive fixtures |
| [AGENTS.md](AGENTS.md) | Instructions for coding agents |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Two-developer workflow |

## Technology (target)

- Markdown + YAML for knowledge and tracking
- React, TypeScript, Vite for the dashboard
- GitHub Issues + Actions
- Python, [Google ADK](https://adk.dev/), Gemini, Cloud Run for the agent
- Java/Spring Boot as **systems to index**, not the agent runtime

## Collaboration

Developer A — agent, RAG, orchestration, evaluation  
Developer B — ingestion, connectors, infrastructure

## License

MIT. See [LICENSE](LICENSE).
