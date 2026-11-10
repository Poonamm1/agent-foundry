# Connector designs

These pages describe **how** the Project Knowledge Agent would integrate with each source. They do **not** connect to real systems.

Synthetic fixtures: [`examples/synthetic-data/`](../../examples/synthetic-data/).

| Connector | Priority | MVP |
| --- | --- | --- |
| [PDF](./pdf.md) | P0 | Yes |
| [Git](./git.md) | P0 | Yes |
| [Java code](./java-code.md) | P0 | Yes |
| [Relational databases](./relational-databases.md) | P0 schema | Schema yes; live SQL later |
| [Kafka](./kafka.md) | P0 schemas | Yes (contracts only) |
| [REST APIs](./rest-apis.md) | P0 specs | Yes |
| [Confluence](./confluence.md) | P1 | Yes |
| [Shared drives](./shared-drives.md) | P1 | Yes |
| [Teams transcripts](./teams.md) | P1 | Transcripts yes; recordings no |
| [SVN](./svn.md) | P2 | Advanced |

Every connector must preserve **provenance** and **ACL metadata**, or it must not ingest.
