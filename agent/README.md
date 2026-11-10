# Agent application (skeleton)

Python package for the future Project Knowledge Agent.

- Framework (later): [Google ADK](https://adk.dev/get-started/python/)
- Model (later): Gemini via Google Cloud supported APIs
- Host (later): Cloud Run

This package **must not** call production APIs or load real credentials in tests.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
pytest
```

Optional ADK extra (Phase 3): `pip install -e ".[adk]"`

Do not commit `.env` files. See `.env.example`.
