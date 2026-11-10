# Contributing

Two developers share this repository:

| ID | Name | Focus |
| --- | --- | --- |
| `developer-a` | Developer A | Agent, RAG, orchestration, evaluation |
| `developer-b` | Developer B | Ingestion, connectors, infrastructure |

Both review architecture and integration tests.

## Branching

- `main` is always deployable documentation + passing CI.
- Create `topic/P2-T13-citations` or `fix/dashboard-import` branches.
- Open a pull request. Do not push straight to `main` once a second contributor is active.
- Rebase or merge `main` before asking for review. No force-push to `main`.

## Pull requests

Use the template. Keep PRs reviewable (one topic cluster or one subsystem).

## Code review checklist

- [ ] Synthetic data only; no real client names or artifacts
- [ ] Secrets not committed
- [ ] Topic IDs match `roadmap/topics.yaml`
- [ ] Learning docs stay concise
- [ ] New agent/ingest code is read-only by default
- [ ] Tests or a documented reason for no tests
- [ ] Dashboard import/export still validates if progress types changed

## Definition of Done (work items)

Matches the roadmap: explain, relevance, exercise, documented DoD. Documentation files alone are not Done.

## Issues and Projects

Use GitHub Issues (templates provided). A GitHub Project board is optional.

## Weekly review (30–45 minutes)

1. Dashboard: blocked topics and hours remaining.
2. Milestone: still the right current milestone?
3. Demo: one hands-on artifact from the week.
4. Risks: IAM, data, cost.
5. Next week: each developer picks at most three topic IDs.

## Progress file reconciliation

`localStorage` is per browser. To share:

1. Export YAML from the dashboard.
2. Copy onto `roadmap/progress.yaml` on a branch.
3. If both of you changed the file:
   - Prefer **Done** over earlier statuses if the DoD was actually met.
   - Keep the union of notes (append, do not delete).
   - Keep the later `completionDate` when both marked Done.
   - Re-validate with `python scripts/validate_roadmap.py`.
4. Open a PR. Never store a GitHub token in the dashboard.

Authenticated GitHub sync is intentionally not implemented (see ADR 0007).
