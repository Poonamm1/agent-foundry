# Shared-drive connector

## 1. What information the source provides

Approved PDFs and office documents in specific folders (network shares or Drive-like stores).

## 2. How the agent would access it

Service identity with access to an **allowlisted folder tree** only.

## 3. Possible API, SDK or protocol

SMB/NFS (often needs a connector VM), or vendor Drive APIs. Prefer APIs when available; do not mount arbitrary corporate roots into Cloud Run.

## 4. Authentication and authorization

Machine account + folder ACL copy. If folder ACL cannot be enumerated, do not ingest.

## 5. Ingestion versus live query

**Ingest** via hash sync. Q&A never opens the live share.

## 6. Data parsing and indexing

Delegate to PDF/office parsers. Store original path and ACL groups.

## 7. Update and synchronization

List → hash → download new → propagate deletes. Daily is enough for MVP.

## 8. Source citation and provenance

UNC or Drive URL + hash + modified time.

## 9. Security considerations

Shares mix HR, finance, and architecture. Allowlist is the control. No “index the whole NAS.”

## 10. Technical limitations

VPN, OS locks, Office macros, and path encoding. Office-to-text quality varies.

## 11. Implementation priority

MVP P1 after local PDF fixtures work.

## 12. Acceptance criteria

- Local folder simulation including a deletion
- HR-like folder excluded in the design
- ACL copied or ingest skipped
