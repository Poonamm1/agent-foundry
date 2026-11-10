# ADR 0004: Python, Google ADK, and Gemini

- Status: Accepted
- Date: 2026-11-09

## Context

We need an official agent framework and a Google Cloud model stack. Atlas-like services are Java/Spring, but the agent is a new application.

## Decision

- Implement the agent in Python 3.11+.
- Use [Google ADK](https://adk.dev/) as the framework.
- Use Gemini through Google Cloud supported model APIs.
- Keep Java/Spring for future integration with source systems, not as the agent runtime.

## Alternatives

- Java ADK for the agent — possible later; Python has the fastest ADK getting-started path for this team.
- A custom orchestrator — duplicates ADK session/tool work.
- Non-Gemini models only — would fight GCP hosting and IAM later.

## Consequences

- `google-adk` is an optional extra until Phase 3 hands-on work.
- Model names stay in config.
- Java remains in `examples/synthetic-data/java` as a **source**, not the serving stack.
