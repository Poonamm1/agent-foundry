# Technology stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Learning docs | Markdown | Human-readable, Git-native |
| Roadmap metadata | YAML | Canonical registry + progress |
| Tracker UI | React + TypeScript + Vite | Static dashboard |
| Hosting (tracker) | GitHub Pages (optional) | No server |
| Agent language | Python 3.11+ | ADK-first |
| Agent framework | Google ADK | Official docs: https://adk.dev/ |
| LLM | Gemini | Google Cloud supported APIs |
| Serving | Cloud Run | Stateless container |
| Future service integration | Java / Spring Boot | Atlas-like sources, not the agent runtime |
| Tasks | GitHub Issues | Optional Projects board |

No database, auth provider, or cloud project is required to use this repository’s dashboard and fixtures.
