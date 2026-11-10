# ADR 0007: localStorage plus explicit export

- Status: Accepted
- Date: 2026-11-09

## Context

The tracker may be hosted on GitHub Pages (static). A browser checkbox cannot commit to GitHub by itself.

## Decision

- Persist immediately in `localStorage`.
- Import/export YAML or JSON matching `roadmap/schema/progress.schema.json`.
- Share progress by committing `roadmap/progress.yaml` through the normal Git workflow.
- Do not store GitHub tokens in the dashboard.
- Keep the progress module typed so an authenticated GitHub sync could be added later.

## Alternatives

- Embed a PAT in the SPA — insecure.
- Fake “cloud sync” — dishonest on a static host.
- localStorage + export (chosen).

## Consequences

- Developers must export and PR to share across devices.
- Concurrent edits are reconciled in Git, not in the browser.
