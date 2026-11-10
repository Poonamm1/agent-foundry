from __future__ import annotations

import hashlib
from datetime import datetime, timezone
from pathlib import Path

from ingestion.adapters.base import BaseAdapter, SourceDocument


class FakeFsAdapter(BaseAdapter):
    source_type = "filesystem"

    def __init__(self, root: Path, acl_groups: tuple[str, ...] = ("engineering",)) -> None:
        self.root = root
        self.acl_groups = acl_groups

    def list_ids(self) -> list[str]:
        if not self.root.exists():
            return []
        return sorted(str(p.relative_to(self.root)) for p in self.root.rglob("*") if p.is_file())

    def fetch(self, doc_id: str) -> SourceDocument | None:
        path = self.root / doc_id
        if not path.exists():
            return None
        data = path.read_bytes()
        digest = hashlib.sha256(data).hexdigest()
        text = data.decode("utf-8", errors="replace")
        return SourceDocument(
            source_type=self.source_type,
            uri=str(path),
            version=digest[:12],
            content_hash=digest,
            acl_groups=self.acl_groups,
            captured_at=datetime.now(timezone.utc).isoformat(),
            text=text,
        )
