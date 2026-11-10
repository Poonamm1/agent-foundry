# Git connector

## 1. What information the source provides

Trees, selected file contents, commit SHA, authors (optional), and path history.

## 2. How the agent would access it

Read-only fetch/clone of allowlisted repositories and paths.

## 3. Possible API, SDK or protocol

`git` CLI or a maintained Git library. Host APIs (GitHub/GitLab) are optional for metadata.

Official Git documentation: https://git-scm.com/docs

## 4. Authentication and authorization

Deploy key or app token with **read** permission only. Path allowlists exclude secrets, `.env`, and key material.

## 5. Ingestion versus live query

**Ingest** at known SHAs (tags or default branch). Live `git show` as a diagnostic tool is optional and still read-only.

## 6. Data parsing and indexing

Text files chunked; binary skipped. Java files also feed the [Java code](./java-code.md) indexer. Record `commit` on every chunk.

## 7. Update and synchronization

Fetch new commits; reindex changed paths; handle deletions.

## 8. Source citation and provenance

`repo` + `path` + `sha`.

## 9. Security considerations

History can contain accidentally committed secrets—scan before embed. Do not index credentials directories.

## 10. Technical limitations

Submodules, LFS, and generated code can explode the corpus. Allowlist paths.

## 11. Implementation priority

MVP P0.

## 12. Acceptance criteria

- Synthetic repo snapshot indexes with SHAs
- Secret-like paths excluded
- Delete of a file drops chunks
