# Product vision

The **Project Knowledge Agent** answers natural-language questions about an existing software system and its ongoing design by retrieving and correlating **authorized** sources.

This repository uses a synthetic system, the **Atlas Inventory Platform (AIP)**, in all examples. Do not add real company, client, or production data.

## Users

- Software engineers implementing or changing Atlas services
- Technical leads reviewing design and impact
- New contributors learning how data moves through Atlas

## Job to be done

When I have a question about how Atlas works, I want a cited answer from the sources I am allowed to see, so that I do not rely on rumor, stale slide decks, or an LLM’s fluent guesses.

## Quality bar

- Grounded: claims are supported by retrieved or tool-provided evidence
- Cited: answers include source URI, version, and when possible a quote or locator (page, SHA, timestamp)
- Honest: missing evidence is stated; assumptions are labeled
- Permission-aware: retrieval respects source ACLs
- Read-only: the agent does not mutate enterprise systems

## Example questions (synthetic)

- How does Atlas Inventory reservation work?
- Where is the reservation TTL business rule implemented?
- Which Java class or SQL query handles reservation create?
- What did we decide about TTL in previous meetings?
- What is the latest approved architecture for reservation?
- Which components would a TTL change impact?
- How does reservation data move across the database, Kafka, and APIs?
- What design questions about reservation are still unresolved?

## Success

Engineers prefer the agent over hunting through six tools **when it cites correctly**, and they still open the source when they need to change code.
