# Assumptions

This document separates **confirmed requirements** from **working assumptions**. An assumption is not a requirement. If an assumption is wrong, the affected documents and notes must be revised.

- **Status:** initial MVP assumptions, recorded 2026-11-05.
- **Rule:** do not silently promote an assumption into a requirement. If an assumption materially affects architecture, record it in `OPEN_QUESTIONS.md` and ask the human owner before committing to it.
- **Scope:** assumptions about the knowledge base only. No assumption is made about the future agent runtime, Mattermost, or Switch.

## 1. Confirmed requirements

These come directly from the project brief and are not assumptions:

- Markdown files are the single source of truth.
- YAML frontmatter provides metadata for knowledge documents.
- Relative Markdown links connect related notes.
- The repository contains the specified top-level documents, `instructions/` documents, `knowledge/` type directories, and four templates.
- The Curator captures, researches when requested, organizes, enriches, and maintains knowledge.
- The Researcher is read-only, retrieves and synthesizes existing knowledge, and cites the notes it uses.
- Existing knowledge is preferred over general model knowledge, and sources are preserved.
- Duplicate notes must be avoided; existing notes should be updated when appropriate.
- Five realistic demonstration notes are included: JavaScript Event Loop, Python Asyncio, Transformer Architecture, Vector Embeddings, and Retrieval-Augmented Generation.
- The MVP excludes agents, databases, embeddings/vector search, RAG infrastructure, MCP servers, custom Switch integrations, applications, external services, and background processes.

## 2. Working assumptions

Each item below is an assumption, not a confirmed requirement.

| ID | Assumption | Rationale | Impact if wrong | Related |
| --- | --- | --- | --- | --- |
| A1 | A note's ID is its file name without `.md`; `knowledge/index.md` is the documented exception with ID `knowledge-index`. | Keeps IDs readable and makes links easy to resolve by hand. | Renaming a file changes its ID and requires link/index updates. | D3, Q3 |
| A2 | Dates are date-only ISO 8601 strings (`"YYYY-MM-DD"`), interpreted in the authoring agent's local date; no time or timezone is stored. | Sufficient precision for a small knowledge base; portable and readable. | No reliable ordering of events on the same day; users in different timezones may disagree on the date. | D13 |
| A3 | Tags are flat, lowercase, kebab-case, reused where possible, and limited to 1–6 for substantive note types. | Simple search and no taxonomy maintenance. | Synonym drift and inconsistent retrieval as the base grows. | D4, Q11 |
| A4 | `related` frontmatter lists relative paths and mirrors the body "Related notes" section (or, for topic/index notes, the concept/topic links); the duplication is maintained manually. | Gives both machines and humans a usable connection list. | The two lists can drift; link maintenance is manual. | D5 |
| A5 | Topic indexes are flat files under `knowledge/topics/`, one per broad area, split only when an index becomes hard to scan. | Satisfies the index requirement without a hierarchy. | A broad topic such as AI/ML may become unwieldy; a split may require moving links. | D6, Q1 |
| A6 | Sources are recorded inline in each note; a separate `resource` note is created only when the external source itself is worth studying. | Avoids a note explosion and duplicated citation metadata. | Provenance is distributed; there is no central bibliography. | D7, Q5 |
| A7 | `knowledge/index.md` is maintained manually; "Recent additions" stays short and older notes remain in topic indexes. | No indexing infrastructure is allowed in scope. | The index can become stale or incomplete. | D8, Q2 |
| A8 | Demonstration notes remain in `knowledge/` until a human approves removing or replacing them. | Keeps the structure and schema testable in a realistic location. | Demo content could be mistaken for personal knowledge; it is marked to reduce that risk. | D9, Q9 |
| A9 | A journal entry uses `YYYY-MM-DD.md` for a single daily entry or `YYYY-MM-DD-short-slug.md` for multiple entries on one day. | Supports both daily and event-based journaling. | The convention may be too loose for consistent retrieval. | Q6 |
| A10 | Notes and documentation are written in English, encoded as UTF-8, with LF line endings. | Keeps the MVP consistent and portable across tools. | Localization or mixed-language notes would need a new convention. | — |
| A11 | `status` is allowed only on project notes; other types do not carry a lifecycle state. | Avoids unused metadata on concepts and resources. | Archiving or lifecycle tracking for other note types would need a schema change. | D14, Q10 |
| A12 | Agent permissions are enforced by instructions and human review, not by tooling in the MVP. | Agent implementation and validation infrastructure are out of scope. | A misbehaving agent could violate the read-only or approval rules without technical prevention. | D10, D11, Q4 |
| A13 | Empty type directories are retained in Git with `.gitkeep` files. | Git does not track empty directories. | Cosmetic placeholder files appear in the tree. | D12 |
| A14 | The human owner has final authority over schema changes, destructive operations, and scope changes; a detailed approval workflow is not defined yet. | The task does not specify an operating workflow. | Agents may be blocked or may act without a clear escalation path. | Q4 |
| A15 | A source that was reachable when this MVP was authored may change or disappear later; the access date records when it was read, not a guarantee of permanence. | Web sources are mutable. | Citations may become stale; content must be re-verified before reuse. | — |

## 3. Assumptions that materially affect the architecture

A1 (filename IDs), A5 (flat topic indexes), A7 (manual index), and A12 (instruction-level permissions) are the most consequential. They are documented as decisions with trade-offs in `DECISIONS.md`, and their unresolved parts are tracked in `OPEN_QUESTIONS.md`. Do not change them silently.

## 4. Explicitly not assumed

The MVP makes no assumption about:

- Whether or how Mattermost or Switch support agent messages, bot accounts, webhooks, or specific APIs.
- Which agent framework, model provider, tool-calling protocol, or orchestration system will be used.
- That any future integration supports the permissions, citations, or approval workflow described here.
- That a database, vector store, embedding model, or RAG pipeline will be added.
- That multiple agents can write concurrently without conflicts.
- That external sources will remain available or unchanged.

These are future integration questions, not MVP requirements. No integration design is included in this repository.
