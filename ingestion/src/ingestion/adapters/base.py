from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field


@dataclass(frozen=True)
class SourceDocument:
    source_type: str
    uri: str
    version: str
    content_hash: str
    acl_groups: tuple[str, ...]
    captured_at: str
    text: str
    extra: dict[str, str] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if not self.acl_groups:
            raise ValueError("Unknown ACL: refuse to ingest")


class BaseAdapter(ABC):
    source_type: str

    @abstractmethod
    def list_ids(self) -> list[str]:
        raise NotImplementedError

    @abstractmethod
    def fetch(self, doc_id: str) -> SourceDocument | None:
        """Return a document, or None if it was deleted."""
        raise NotImplementedError
