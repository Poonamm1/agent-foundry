# When multi-agent systems are appropriate

Topic ID: `P5-T14` · Phase: `P5` · Track: `advanced` · Default owner: `developer-a`

## What is it?

Multi-agent systems split roles (retriever, critic, planner). They add latency, cost, and failure modes.

## Why do we need it?

Two developers can overfit to fashionable multi-agent graphs before one tool-using agent works.

## How does it work?

Use extra agents only for a measured problem: isolated eval critic, or a separate ingest ops agent—not for every question.

```mermaid
flowchart LR
  A[Study this topic] --> B[Hands-on exercise]
  B --> C[Definition of Done]
  C --> D[Update progress YAML]
```

## Example in our project

A faithfulness critic job offline is fine; five chatty agents for “where is TTL set?” is not.

The example uses the synthetic **Atlas Inventory Platform** only. Do not substitute real client systems.

## What must we learn?

- Cost of coordination
- Measured split
- Single-agent default

## Hands-on exercise

List three splits you will not do in MVP and one future split that might be valid.

**Deliverable:** ADR 0002 review note

## Definition of Done

Done is not “the Markdown file exists.” Done means you can explain the topic, you know why it matters for the agent, the exercise (or equivalent) is complete, and all of the following are true:

- ADR 0002 accepted
- MVP is one agent
- Future split criteria written

## Resources

Official documentation only. Expand this list as you study; do not add unverified links.

- [Google ADK](https://adk.dev/)

## Key Takeaways

- One agent first
- Split on evidence
- Critics can be offline

## Related Topics

- [P0-T07](../P0/P0-T07-technology-selection-and-tradeoffs.md)
- [P6-T02](../P6/P6-T02-faithfulness-and-answer-correctness.md)
