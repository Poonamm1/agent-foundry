# Tool calling

Topic ID: `P5-T04` · Phase: `P5` · Track: `mvp` · Default owner: `developer-a`

## What is it?

Calling is dispatch, timeout, and result shaping. Parallel calls need cancellation and error isolation.

## Why do we need it?

Hanging connector calls freeze the user. Huge results blow the context window.

## How does it work?

Implement a dispatcher that logs tool name, latency, and result size. Truncate safely.

```mermaid
flowchart LR
  A[Study this topic] --> B[Hands-on exercise]
  B --> C[Definition of Done]
  C --> D[Update progress YAML]
```

## Example in our project

lookup_symbol returns 1–5 hits of 200 tokens each, never the whole module.

The example uses the synthetic **Atlas Inventory Platform** only. Do not substitute real client systems.

## What must we learn?

- Dispatch
- Truncation
- Isolation of errors

## Hands-on exercise

Implement dispatcher tests for success, timeout, and oversize results.

**Deliverable:** Tool executor with tests

## Definition of Done

Done is not “the Markdown file exists.” Done means you can explain the topic, you know why it matters for the agent, the exercise (or equivalent) is complete, and all of the following are true:

- Tests exist
- Timeouts configured
- Result size capped

## Resources

Official documentation only. Expand this list as you study; do not add unverified links.

- [Google ADK](https://adk.dev/)

## Key Takeaways

- Cap results
- Time out
- Log every call

## Related Topics

- [P5-T11](../P5/P5-T11-error-handling.md)
- [P5-T12](../P5/P5-T12-timeouts-and-retries.md)
