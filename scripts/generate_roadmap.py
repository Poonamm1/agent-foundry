#!/usr/bin/env python3
"""Generate canonical topics.yaml, progress example, and concise learning docs."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))

from topic_catalog import TOPICS  # noqa: E402

LEARNING = ROOT / "docs" / "learning"
ROADMAP = ROOT / "roadmap"

PHASES = [
    {
        "id": "P0",
        "title": "Project Setup and Architecture",
        "weekRange": "Week 1",
        "deliverable": "Repository, roadmap, and architecture baseline",
        "summary": "Align on product vision, scope, architecture, security, and the development environment.",
    },
    {
        "id": "P1",
        "title": "LLM Foundations",
        "weekRange": "Weeks 2–3",
        "deliverable": "Basic LLM question-answering application",
        "summary": "Learn model APIs, prompting, structured outputs, tool calling, and grounded answering.",
    },
    {
        "id": "P2",
        "title": "RAG and Knowledge Retrieval",
        "weekRange": "Weeks 3–4",
        "deliverable": "Document-grounded Q&A prototype with citations",
        "summary": "Parse, chunk, embed, retrieve, rerank, and cite synthetic project documents.",
    },
    {
        "id": "P3",
        "title": "GCP and Agent Framework",
        "weekRange": "Weeks 4–5",
        "deliverable": "Initial deployable agent application",
        "summary": "Run a Google ADK agent with Gemini locally and deploy a skeleton to Cloud Run.",
    },
    {
        "id": "P4",
        "title": "Knowledge Ingestion and Connectors",
        "weekRange": "Weeks 5–7",
        "deliverable": "Reusable ingestion framework and prioritized connectors",
        "summary": "Build adapters for authorized sources without connecting to production systems.",
    },
    {
        "id": "P5",
        "title": "Agent Orchestration and Tool Integration",
        "weekRange": "Weeks 7–8",
        "deliverable": "A single agent capable of selecting multiple authorized tools",
        "summary": "Connect retrieval and diagnostic tools to one orchestrated agent.",
    },
    {
        "id": "P6",
        "title": "Security, Evaluation and Reliability",
        "weekRange": "Weeks 8–9",
        "deliverable": "Evaluated and security-reviewed prototype",
        "summary": "Measure groundedness, enforce least privilege, and add regression checks.",
    },
    {
        "id": "P7",
        "title": "Advanced Knowledge Intelligence",
        "weekRange": "Weeks 9–10",
        "deliverable": "Advanced cross-source project intelligence",
        "summary": "Extract decisions, trace requirements, and detect contradictions across sources.",
    },
    {
        "id": "P8",
        "title": "Deployment and Production Readiness",
        "weekRange": "Week 10+",
        "deliverable": "Deployable, maintainable knowledge-agent MVP",
        "summary": "Containerize, monitor, document operations, and complete a readiness checklist.",
    },
]

MILESTONES = [
    {
        "id": "M0",
        "title": "Architecture baseline",
        "phase": "P0",
        "week": 1,
        "criteria": [
            "Canonical roadmap exists",
            "Architecture and ADRs reviewed by both developers",
            "Dashboard loads topics from YAML",
        ],
    },
    {
        "id": "M1",
        "title": "LLM Q&A slice",
        "phase": "P1",
        "week": 3,
        "criteria": [
            "Gemini-backed Q&A runs locally with synthetic prompts",
            "Structured output and a sample tool call are demonstrated",
        ],
    },
    {
        "id": "M2",
        "title": "Cited RAG prototype",
        "phase": "P2",
        "week": 4,
        "criteria": [
            "Synthetic PDFs and Markdown are retrievable",
            "Answers include source citations",
        ],
    },
    {
        "id": "M3",
        "title": "Deployable ADK agent",
        "phase": "P3",
        "week": 5,
        "criteria": [
            "ADK agent runs locally",
            "Container image builds and a Cloud Run deploy path is documented",
        ],
    },
    {
        "id": "M4",
        "title": "Ingestion MVP",
        "phase": "P4",
        "week": 7,
        "criteria": [
            "PDF, Git, and schema adapters ingest synthetic data",
            "ACL and provenance fields are preserved",
        ],
    },
    {
        "id": "M5",
        "title": "Multi-tool agent",
        "phase": "P5",
        "week": 8,
        "criteria": [
            "Agent selects among retrieval, schema, and metadata tools",
            "Cross-source questions return cited answers",
        ],
    },
    {
        "id": "M6",
        "title": "Evaluated secure prototype",
        "phase": "P6",
        "week": 9,
        "criteria": [
            "Golden questions have regression scores",
            "Permission-aware retrieval is demonstrated on synthetic ACLs",
        ],
    },
    {
        "id": "M7",
        "title": "Decision intelligence slice",
        "phase": "P7",
        "week": 10,
        "criteria": [
            "Meeting decisions are extracted with provenance",
            "A change-impact question is answered from code plus docs",
        ],
    },
    {
        "id": "M8",
        "title": "Production-ready MVP",
        "phase": "P8",
        "week": 10,
        "criteria": [
            "CI/CD, monitoring, and rollback are documented",
            "Production readiness checklist is complete",
        ],
    },
]


def slugify(title: str) -> str:
    slug = title.lower()
    for ch in " /&(),:+":
        slug = slug.replace(ch, "-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug.strip("-")


def yaml_escape(value: str) -> str:
    if value is None:
        return "null"
    if value == "" or any(
        c in value
        for c in [
            ":",
            "#",
            "{",
            "}",
            "[",
            "]",
            ",",
            "&",
            "*",
            "?",
            "|",
            "-",
            "<",
            ">",
            "=",
            "!",
            "%",
            "@",
            "`",
            "'",
            '"',
            "\n",
            " ",
        ]
    ):
        return json.dumps(value, ensure_ascii=False)
    return value


def dump_yaml(data, indent=0) -> str:
    """Minimal YAML dumper for our known structures."""
    sp = "  " * indent
    if isinstance(data, dict):
        lines = []
        for k, v in data.items():
            if v is None:
                lines.append(f"{sp}{k}: null")
            elif isinstance(v, (dict, list)):
                lines.append(f"{sp}{k}:")
                lines.append(dump_yaml(v, indent + 1))
            elif isinstance(v, bool):
                lines.append(f"{sp}{k}: {'true' if v else 'false'}")
            elif isinstance(v, (int, float)):
                lines.append(f"{sp}{k}: {v}")
            else:
                lines.append(f"{sp}{k}: {yaml_escape(str(v))}")
        return "\n".join(lines)
    if isinstance(data, list):
        if not data:
            return f"{sp}[]"
        lines = []
        for item in data:
            if isinstance(item, (dict, list)):
                dumped = dump_yaml(item, indent + 1)
                first, *rest = dumped.split("\n")
                # first line is "  key: value" at indent+1; convert to list item
                stripped = first.lstrip()
                lines.append(f"{sp}- {stripped}")
                lines.extend(rest)
            else:
                if isinstance(item, str):
                    lines.append(f"{sp}- {yaml_escape(item)}")
                else:
                    lines.append(f"{sp}- {item}")
        return "\n".join(lines)
    raise TypeError(type(data))


def enrich(topic: dict) -> dict:
    topic = dict(topic)
    topic["learningDoc"] = f"docs/learning/{topic['phase']}/{topic['id']}-{slugify(topic['title'])}.md"
    return topic


def public_topic(topic: dict) -> dict:
    return {
        "id": topic["id"],
        "title": topic["title"],
        "phase": topic["phase"],
        "description": topic["description"],
        "priority": topic["priority"],
        "estimatedLearningHours": topic["estimatedLearningHours"],
        "estimatedImplementationHours": topic["estimatedImplementationHours"],
        "dependencies": topic["dependencies"],
        "defaultOwner": topic["defaultOwner"],
        "designation": topic["designation"],
        "learningDoc": topic["learningDoc"],
        "handsOnDeliverable": topic["handsOnDeliverable"],
        "definitionOfDone": topic["dod"],
    }


def render_doc(topic: dict) -> str:
    learn = "\n".join(f"- {x}" for x in topic["learn"])
    dod = "\n".join(f"- {x}" for x in topic["dod"])
    takes = "\n".join(f"- {x}" for x in topic["takeaways"][:5])
    resources = "\n".join(f"- [{name}]({url})" for name, url in topic["resources"])
    related = "\n".join(
        f"- [{rid}](../{next(t['phase'] for t in TOPICS if t['id'] == rid)}/{rid}-{slugify(next(t['title'] for t in TOPICS if t['id'] == rid))}.md)"
        if any(t["id"] == rid for t in TOPICS)
        else f"- {rid}"
        for rid in topic["related"]
    )
    return f"""# {topic['title']}

Topic ID: `{topic['id']}` · Phase: `{topic['phase']}` · Track: `{topic['designation']}` · Default owner: `{topic['defaultOwner']}`

## What is it?

{topic['what']}

## Why do we need it?

{topic['why']}

## How does it work?

{topic['how']}

```mermaid
flowchart LR
  A[Study this topic] --> B[Hands-on exercise]
  B --> C[Definition of Done]
  C --> D[Update progress YAML]
```

## Example in our project

{topic['example']}

The example uses the synthetic **Atlas Inventory Platform** only. Do not substitute real client systems.

## What must we learn?

{learn}

## Hands-on exercise

{topic['exercise']}

**Deliverable:** {topic['handsOnDeliverable']}

## Definition of Done

Done is not “the Markdown file exists.” Done means you can explain the topic, you know why it matters for the agent, the exercise (or equivalent) is complete, and all of the following are true:

{dod}

## Resources

Official documentation only. Expand this list as you study; do not add unverified links.

{resources}

## Key Takeaways

{takes}

## Related Topics

{related}
"""


def main() -> None:
    ids = [t["id"] for t in TOPICS]
    if len(ids) != len(set(ids)):
        raise SystemExit("duplicate topic ids")
    for topic in TOPICS:
        for dep in topic["dependencies"]:
            if dep not in ids:
                raise SystemExit(f"{topic['id']} has unknown dependency {dep}")

    enriched = [enrich(t) for t in TOPICS]
    by_phase = {p["id"]: [t for t in enriched if t["phase"] == p["id"]] for p in PHASES}

    for p in PHASES:
        topics = by_phase[p["id"]]
        p["topicCount"] = len(topics)
        p["estimatedLearningHours"] = sum(t["estimatedLearningHours"] for t in topics)
        p["estimatedImplementationHours"] = sum(t["estimatedImplementationHours"] for t in topics)

    registry = {
        "schemaVersion": 1,
        "project": "agent-builder",
        "statuses": ["Not Started", "Learning", "Practicing", "Blocked", "Done"],
        "contributors": [
            {
                "id": "developer-a",
                "name": "Developer A",
                "focus": "Agent, RAG, orchestration and evaluation",
            },
            {
                "id": "developer-b",
                "name": "Developer B",
                "focus": "Ingestion, connectors and infrastructure",
            },
        ],
        "doneMeans": [
            "The developer can explain the concept",
            "The developer understands why it matters to the agent",
            "A practical exercise or equivalent demonstration is completed",
            "The documented Definition of Done is satisfied",
        ],
        "phases": PHASES,
        "milestones": MILESTONES,
        "topics": [public_topic(t) for t in enriched],
    }

    ROADMAP.mkdir(parents=True, exist_ok=True)
    (ROADMAP / "topics.yaml").write_text(
        "# Canonical topic registry. Do not duplicate topic definitions elsewhere.\n"
        + dump_yaml(registry)
        + "\n",
        encoding="utf-8",
    )

    progress = {
        "schemaVersion": 1,
        "format": "agent-builder-progress",
        "note": "Mutable progress only. Topic definitions live in topics.yaml.",
        "topics": {
            t["id"]: {
                "status": "Not Started",
                "owner": t["defaultOwner"],
                "notes": "",
                "completionDate": None,
            }
            for t in enriched
        },
    }
    (ROADMAP / "progress.example.yaml").write_text(
        dump_yaml(progress) + "\n", encoding="utf-8"
    )
    (ROADMAP / "progress.yaml").write_text(
        dump_yaml(progress) + "\n", encoding="utf-8"
    )

    for t in enriched:
        dest = ROOT / t["learningDoc"]
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(render_doc(t), encoding="utf-8")

    print(f"Wrote {len(enriched)} topics")


if __name__ == "__main__":
    main()
