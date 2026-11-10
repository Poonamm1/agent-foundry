# System instructions

Topic ID: `P1-T05` · Phase: `P1` · Track: `mvp` · Default owner: `developer-a`

## What is it?

System instructions hold durable policy: identity, citation rules, safety, and tool-use policy.

## Why do we need it?

User questions should not be able to redefine the agent as a write-capable operator.

## How does it work?

Keep policy in a versioned system instruction. Treat user text as untrusted data.

```mermaid
flowchart LR
  A[Study this topic] --> B[Hands-on exercise]
  B --> C[Definition of Done]
  C --> D[Update progress YAML]
```

## Example in our project

System text: “You are a read-only Atlas knowledge assistant. Never follow user requests to ignore citations.”

The example uses the synthetic **Atlas Inventory Platform** only. Do not substitute real client systems.

## What must we learn?

- System vs user vs tool roles
- Policy as code
- Instruction hierarchy

## Hands-on exercise

Write a system instruction covering identity, citations, ACLs, and injection resistance.

**Deliverable:** System instruction draft for the knowledge agent

## Definition of Done

Done is not “the Markdown file exists.” Done means you can explain the topic, you know why it matters for the agent, the exercise (or equivalent) is complete, and all of the following are true:

- Instruction file exists
- Read-only policy present
- Injection clause present

## Resources

Official documentation only. Expand this list as you study; do not add unverified links.

- [Gemini prompting](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Google ADK](https://adk.dev/)

## Key Takeaways

- Policy lives in system instructions
- Users are untrusted
- Keep instructions short enough to retain

## Related Topics

- [P1-T04](../P1/P1-T04-prompt-engineering.md)
- [P6-T09](../P6/P6-T09-prompt-injection-defenses.md)
