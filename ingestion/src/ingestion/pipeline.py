from __future__ import annotations

from ingestion.adapters.base import BaseAdapter, SourceDocument


def collect(adapter: BaseAdapter) -> list[SourceDocument]:
    docs: list[SourceDocument] = []
    for doc_id in adapter.list_ids():
        fetched = adapter.fetch(doc_id)
        if fetched is not None:
            docs.append(fetched)
    return docs
