# ADR 0002: Single agent before multi-agent orchestration

- Status: Accepted
- Date: 2026-11-09

## Context

Cross-source questions need tools, not necessarily multiple cooperating agents.

## Decision

Ship one ADK `root_agent` that selects multiple read-only tools. Defer multi-agent graphs until a measured problem (for example an offline faithfulness critic) requires a split.

## Alternatives

- Planner/retriever/critic swarm on every question — extra latency, cost, and failure modes.
- Single tool-using agent (chosen).

## Consequences

- Tool catalog must stay small and well described.
- Offline evaluation jobs may still use separate “critic” prompts without becoming a runtime mesh.
