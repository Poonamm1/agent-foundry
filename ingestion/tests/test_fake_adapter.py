from pathlib import Path

from ingestion.adapters.base import SourceDocument
from ingestion.adapters.fake_fs import FakeFsAdapter
from ingestion.pipeline import collect


def test_collect_synthetic_markdown(tmp_path: Path) -> None:
    sample = tmp_path / "note.md"
    sample.write_text("TTL is 15 minutes.\n", encoding="utf-8")
    docs = collect(FakeFsAdapter(tmp_path))
    assert len(docs) == 1
    assert "15 minutes" in docs[0].text
    assert docs[0].acl_groups == ("engineering",)


def test_refuses_empty_acl() -> None:
    try:
        SourceDocument(
            source_type="pdf",
            uri="x",
            version="1",
            content_hash="abc",
            acl_groups=(),
            captured_at="2026-01-01T00:00:00Z",
            text="nope",
        )
    except ValueError as exc:
        assert "ACL" in str(exc)
    else:
        raise AssertionError("expected ACL refusal")
