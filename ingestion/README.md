# Ingestion (skeleton)

Batch pipeline from authorized sources → normalized documents → (later) chunks and indexes.

Do not point adapters at production systems from this repository.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
pytest
```
