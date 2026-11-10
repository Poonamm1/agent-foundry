#!/usr/bin/env python3
"""Validate topics.yaml and progress.yaml against JSON Schema."""

from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    try:
        import yaml
        import jsonschema
    except ImportError:
        print("Install pyyaml and jsonschema to validate.", file=sys.stderr)
        return 1

    topics = yaml.safe_load((ROOT / "roadmap" / "topics.yaml").read_text())
    progress = yaml.safe_load((ROOT / "roadmap" / "progress.yaml").read_text())
    topics_schema = json.loads((ROOT / "roadmap" / "schema" / "topics.schema.json").read_text())
    progress_schema = json.loads((ROOT / "roadmap" / "schema" / "progress.schema.json").read_text())

    jsonschema.validate(topics, topics_schema)
    jsonschema.validate(progress, progress_schema)

    ids = [t["id"] for t in topics["topics"]]
    if len(ids) != len(set(ids)):
        raise SystemExit("duplicate topic ids")
    known = set(ids)
    for t in topics["topics"]:
        for dep in t.get("dependencies", []):
            if dep not in known:
                raise SystemExit(f"{t['id']} unknown dependency {dep}")
        doc = ROOT / t["learningDoc"]
        if not doc.is_file():
            raise SystemExit(f"missing learning doc {doc}")

    extra = set(progress["topics"]) - known
    missing = known - set(progress["topics"])
    if extra:
        print(f"warning: progress has unknown ids {sorted(extra)[:5]}...", file=sys.stderr)
    if missing:
        raise SystemExit(f"progress.yaml missing {len(missing)} topics")

    print(f"OK: {len(ids)} topics, progress aligned")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
