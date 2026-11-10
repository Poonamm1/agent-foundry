# Functional and non-functional requirements

Topic ID: `P0-T03` · Phase: `P0` · Track: `mvp` · Default owner: `developer-a`

## What is it?

Functional requirements describe questions, citations, and tools. Non-functional requirements cover latency, cost, security, auditability, and evaluation.

## Why do we need it?

Retrieval systems fail quietly on quality and permission bugs. NFRs make those failures testable.

## How does it work?

Write shall-statements with a verification method: demo, automated test, or checklist.

```mermaid
flowchart LR
  A[Study this topic] --> B[Hands-on exercise]
  B --> C[Definition of Done]
  C --> D[Update progress YAML]
```

## Example in our project

FR: every answer cites a source URI. NFR: local p95 latency is measured before Cloud Run tuning.

The example uses the synthetic **Atlas Inventory Platform** only. Do not substitute real client systems.

## What must we learn?

- FR vs NFR
- Verification method
- Quality attributes

## Hands-on exercise

Write 8 functional and 8 non-functional shall-statements with verification methods.

**Deliverable:** Requirements in docs/architecture/nfr.md

## Definition of Done

Done is not “the Markdown file exists.” Done means you can explain the topic, you know why it matters for the agent, the exercise (or equivalent) is complete, and all of the following are true:

- Requirements file exists
- Each NFR is verifiable
- Security NFRs include ACLs and secrets

## Resources

Official documentation only. Expand this list as you study; do not add unverified links.

- [Cloud Run docs](https://cloud.google.com/run/docs)
- [Vertex AI generative AI](https://cloud.google.com/vertex-ai/generative-ai/docs)

## Key Takeaways

- Unverifiable statements are not requirements
- Groundedness is an NFR
- Cost is an NFR

## Related Topics

- [P0-T04](../P0/P0-T04-high-level-architecture.md)
- [P0-T06](../P0/P0-T06-security-boundaries.md)
- [P6-T01](../P6/P6-T01-groundedness.md)
