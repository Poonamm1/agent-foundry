# ADR 0006: YAML canonical registry

- Status: Accepted
- Date: 2026-11-09

## Context

Topics need stable IDs, estimates, owners, and dependencies that a dashboard can load.

## Decision

Keep one registry: `roadmap/topics.yaml`. Progress is a separate document with only mutable fields. Validate both with JSON Schema.

## Alternatives

- Spreadsheet — weak PR review and no schema.
- Duplicate lists in README and dashboard JSON — drift.
- YAML registry (chosen).

## Consequences

- Learning Markdown is generated from the catalog and then edited carefully.
- Dashboard must not invent a second topic list.
