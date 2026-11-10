# ADR 0001: RAG instead of fine-tuning initially

- Status: Accepted
- Date: 2026-11-09

## Context

Atlas knowledge changes weekly: ADRs, meeting decisions, and code. Answers must be cited.

## Decision

Use retrieval-augmented generation over authorized indexes. Do not fine-tune on project documents for MVP.

## Alternatives

- Fine-tune or continue-train a model on wikis and code — poor citations, stale as soon as a page changes, higher ops cost.
- Long-context stuffing of entire corpora — does not scale and still lacks ACL filters.
- RAG (chosen).

## Consequences

- We must invest in parsing, chunking, evaluation, and freshness.
- Model weights stay general; project facts live in the index.
- Fine-tuning remains possible later for style, not as the knowledge store.
