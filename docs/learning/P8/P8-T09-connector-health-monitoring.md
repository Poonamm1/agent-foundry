# Connector health monitoring

Topic ID: `P8-T09` · Phase: `P8` · Track: `mvp` · Default owner: `developer-b`

## What is it?

Each adapter should expose last_success_at, error rate, and documents ingested. Stale connectors silently rot knowledge.

## Why do we need it?

Users will trust answers while Git ingest is 12 days behind.

## How does it work?

Record health in logs/metrics. Surface in operator notes. Optionally later in the dashboard.

```mermaid
flowchart LR
  A[Study this topic] --> B[Hands-on exercise]
  B --> C[Definition of Done]
  C --> D[Update progress YAML]
```

## Example in our project

git last_success 2h ago OK; confluence last_success 6d ago WARN.

The example uses the synthetic **Atlas Inventory Platform** only. Do not substitute real client systems.

## What must we learn?

- last_success_at
- Stale threshold
- Per-adapter errors

## Hands-on exercise

Define health fields and stale thresholds per MVP adapter.

**Deliverable:** Connector health fields

## Definition of Done

Done is not “the Markdown file exists.” Done means you can explain the topic, you know why it matters for the agent, the exercise (or equivalent) is complete, and all of the following are true:

- Fields defined
- Stale thresholds set
- Git vs PDF thresholds may differ

## Resources

Official documentation only. Expand this list as you study; do not add unverified links.

- [Cloud Logging](https://cloud.google.com/logging/docs)

## Key Takeaways

- Stale is a first-class outage
- Per adapter
- Show operators

## Related Topics

- [P4-T02](../P4/P4-T02-batch-and-incremental-ingestion.md)
- [P8-T07](../P8/P8-T07-operational-runbooks.md)
