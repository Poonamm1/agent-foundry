# Source adapters

Topic ID: `P4-T03` · Phase: `P4` · Track: `mvp` · Default owner: `developer-b`

## What is it?

Adapters hide source SDKs behind list/fetch/normalize. The rest of the pipeline should not import Confluence clients.

## Why do we need it?

Without a contract, every connector forks the pipeline.

## How does it work?

Define SourceDocument with bytes or text, metadata, acl, and content_hash. Adapters yield these objects.

```mermaid
flowchart LR
  A[Study this topic] --> B[Hands-on exercise]
  B --> C[Definition of Done]
  C --> D[Update progress YAML]
```

## Example in our project

FakeDriveAdapter reads examples/synthetic-data/pdf and emits SourceDocuments.

The example uses the synthetic **Atlas Inventory Platform** only. Do not substitute real client systems.

## What must we learn?

- Adapter contract
- SourceDocument
- No SDK leakage

## Hands-on exercise

Implement BaseAdapter plus FakeFsAdapter over synthetic files.

**Deliverable:** Base adapter class and one fake adapter

## Definition of Done

Done is not “the Markdown file exists.” Done means you can explain the topic, you know why it matters for the agent, the exercise (or equivalent) is complete, and all of the following are true:

- Interface in ingestion/
- Fake adapter tested
- Metadata required fields enforced

## Resources

Official documentation only. Expand this list as you study; do not add unverified links.

- [Git documentation](https://git-scm.com/docs)

## Key Takeaways

- One pipeline, many adapters
- Metadata is mandatory
- Keep SDKs at the edge

## Related Topics

- [P4-T04](../P4/P4-T04-pdf-extraction.md)
- [P4-T06](../P4/P4-T06-git-integration.md)
