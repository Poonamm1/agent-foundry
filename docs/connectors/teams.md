# Teams transcripts and recordings

## 1. What information the source provides

- Meeting metadata: id, title, start/end, organizer, attendees
- Transcripts: utterances with **speaker attribution** and **timestamps**
- Chat messages in the meeting (optional, noisy)
- Recordings: audio/video — **higher risk**, default **do not ingest**

## 2. How the agent would access it

Microsoft Graph with an approved application or delegated permission set, after tenant admin consent. This repository uses fixtures only.

## 3. Possible API, SDK or protocol

- [Microsoft Graph overview](https://learn.microsoft.com/en-us/graph/overview)
- [onlineMeeting resource](https://learn.microsoft.com/en-us/graph/api/resources/onlinemeeting?view=graph-rest-1.0)

Confirm current transcript and recording APIs in Graph docs at implementation time; permission names change.

## 4. Authentication and authorization

Least-privilege Graph permissions for **online meetings and transcripts** only. No `Mail.Read` or broad `Files.Read.All` “just in case.” Store client secrets in Secret Manager. Ingest only meetings in an allowlisted group or with an explicit label such as `aip-knowledge-ok`.

## 5. Ingestion versus live query

**Ingest** completed transcripts. Do not attach a bot to every meeting in MVP.

## 6. Data parsing and indexing

Chunk by time window or topic; every chunk has `meetingId`, `speaker`, `startMs`, `endMs`.

## 7. Update and synchronization

Poll for ended meetings; immutable transcript versions; deletions if a meeting recording/transcript is removed in source.

## 8. Source citation and provenance

Meeting title + date + timestamp + speaker. Example: `AIP reservation review 2026-03-12 @ 00:12:04 (Jordan)`.

## 9. Security considerations

Transcripts are personal and potentially sensitive. Default ACL is the meeting attendees plus an approved engineering group—not “all employees.” Prompt injection in spoken jokes is still injection.

## 10. Technical limitations

Speaker attribution errors, missing transcripts when recording was off, multiple languages, and Graph permission admin-consent delays.

## 11. Implementation priority

MVP for **transcripts** after Graph approval. **Recordings** advanced / default deny (consent, retention, storage region). Prefer vendor transcripts over copying audio into Cloud Storage.

## 12. Acceptance criteria

- Synthetic transcript fixture retrieves a decision by timestamp
- Permission list documented before any tenant app is created
- Recordings remain out of the index unless a later ADR changes this
