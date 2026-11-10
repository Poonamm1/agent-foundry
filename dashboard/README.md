# Dashboard

Static React + TypeScript + Vite app that reads `roadmap/topics.yaml`.

## Persistence

| Layer | What it does |
| --- | --- |
| `localStorage` | Immediate save of status, owner, notes |
| Export YAML/JSON | Canonical progress format (`schemaVersion: 1`) |
| Import | Validates, warns on unknown topic IDs, merges into local state |
| Git | You commit `roadmap/progress.yaml` via PR |

There is **no** automatic GitHub write. Tokens must not be stored in the browser. A `ProgressSyncClient` interface exists in `src/lib/storage.ts` for a future authenticated sync.

## GitHub Pages

The production base path is `/agent-foundry/`. Pushes to `main` deploy `dashboard/dist` with GitHub Actions. Pages must use **GitHub Actions** as the source. Local progress stays in `localStorage`.
