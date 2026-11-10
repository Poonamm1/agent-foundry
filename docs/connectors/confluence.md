# Confluence connector

## 1. What information the source provides

Design pages, runbooks, decision records, labels, space membership, page versions, and comments (comments are optional and noisy).

## 2. How the agent would access it

Read-only REST calls against an allowlisted set of spaces, using a dedicated ingest identity.

## 3. Possible API, SDK or protocol

[Confluence Cloud REST API v2](https://developer.atlassian.com/cloud/confluence/rest/v2/intro/). Do not scrape the HTML UI.

## 4. Authentication and authorization

API token or OAuth with **space-limited** read scopes. Store the token in Secret Manager. The ingest identity must not be a human’s personal token.

## 5. Ingestion versus live query

**Ingest** pages and versions on a schedule. Live query is unnecessary for Q&A and increases token exposure.

## 6. Data parsing and indexing

Convert storage format / exported Markdown to text; keep headings; attach `pageId`, `version`, `spaceKey`, URL, labels.

## 7. Update and synchronization

Cursor on `updatedAt` plus periodic full reconcile. Hash body to skip unchanged versions.

## 8. Source citation and provenance

Cite canonical page URL + version + heading anchor when available.

## 9. Security considerations

Space allowlist. If a space ACL cannot be read, skip it. Retrieved page bodies are untrusted (injection).

## 10. Technical limitations

Apps, whiteboards, and some macros extract poorly. Server/DC vs Cloud APIs differ—confirm edition before implementation.

## 11. Implementation priority

MVP (after PDF/Git fixtures), because narrative architecture lives here.

## 12. Acceptance criteria

- Fixtures for space `AIP-DESIGN` ingest without a live tenant
- Version appears in citations
- Non-allowlisted space is not listed
