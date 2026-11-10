# ADR 0003: Markdown for learning and design docs

- Status: Accepted
- Date: 2026-11-09

## Context

Two developers need a Git-native knowledge base that coding agents can read.

## Decision

Author learning notes, architecture, ADRs, and connector designs in Markdown in this repository.

## Alternatives

- Confluence-only — poor PR review, weaker local agent context.
- A wiki database — extra infrastructure this phase forbids.
- Markdown in Git (chosen).

## Consequences

- Review happens in pull requests.
- Generated learning notes stay concise and are expanded when we actually study a topic.
- Machine-readable structure still lives in YAML, not in Markdown tables copied three times.
