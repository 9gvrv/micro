# Open Questions

Unresolved architectural and product decisions are recorded here. None of these should be silently decided by an agent.

- **Status:** open as of 2026-11-05.
- **How to use:** add context, options, trade-offs, and the current MVP handling. Do not present a tentative recommendation as an approved decision.
- **Approval:** decisions that materially affect architecture, scope, or agent permissions require human approval and should then be recorded in `DECISIONS.md`.

## Q1. How should the topic taxonomy scale?

**Context:** The MVP uses one flat topic index file per broad area (`topics/javascript.md`, `topics/python.md`, `topics/ai-ml.md`). Topic notes link to concepts but do not duplicate them.

**Options:**

- **Flat topic files (current).** Simple, portable, and easy to browse. Trade-off: a broad topic such as AI/ML can become crowded, and cross-cutting subjects are awkward.
- **Nested topic directories.** Scales to many subtopics, but adds navigation and linking complexity for a small base.
- **Tag-only organization.** No topic index files; rely on tags and the root index. Less curation, but weaker browsing and no overview pages.
- **Generated topic indexes.** Would require tooling or a script, which is out of MVP scope.

**MVP handling:** Flat topic files, split only when an index becomes hard to scan.

**Decision needed before:** The number of topics grows beyond roughly 15, or a topic requires its own subtopics. A tentative recommendation is to keep flat indexes and split `ai-ml` first if it grows; this is not approved.

## Q2. How should the knowledge index be maintained at scale?

**Context:** `knowledge/index.md` is manually maintained and must reference all topic indexes, important concepts, recent additions, projects, and inbox status.

**Options:**

- **Manual maintenance (current).** No tooling, fully portable, but prone to staleness and human error.
- **Read-only validation script.** Could check links and metadata without generating content. Still adds a small application and is out of MVP scope.
- **Generated index or static site.** Requires a build step and possibly a specific tool, reducing portability.
- **External knowledge tool.** Contradicts the Markdown-first, provider-independent goal.

**MVP handling:** Manual maintenance plus the validation checklist.

**Decision needed before:** The base exceeds roughly 50 notes, link checking becomes unreliable, or the index is stale for more than one working session. A future read-only checker is a candidate, but it is not part of this MVP.

## Q3. Should IDs remain tied to file names?

**Context:** Using the file name as the ID is readable and keeps links simple. Renaming a note changes its ID and can break external references, even if internal links are updated.

**Options:**

- **File name as ID (current).** Human-readable, link-friendly, no registry. Trade-off: renames are expensive and IDs are not stable.
- **Immutable opaque ID (UUID/ULID).** Stable across renames, but unreadable and requires an ID-to-file mapping.
- **Hybrid: immutable ID plus a readable slug.** Durable and readable, but adds metadata and a rename procedure.

**MVP handling:** File name as ID. Internal links must be updated on rename.

**Decision needed before:** Notes are referenced by external systems or IDs are exposed outside the repository. This affects future agent links and any integration that stores note identifiers.

## Q4. What approval workflow should the agents follow?

**Context:** The MVP defines the Curator as a writer and the Researcher as read-only, but does not implement either agent or define who approves changes.

**Options:**

- **Full Curator autonomy within `knowledge/`.** Fast capture, but risks unwanted edits and merges.
- **Review before every write.** Safest, but slow and defeats automated capture.
- **Review after write, with rollback.** Balances speed and safety, but requires version control discipline and a notification channel.
- **Per-action approval for destructive or structural changes only.** A likely middle ground: autonomous note creation, approval for deletes, bulk renames, schema changes, and merges.

**MVP handling:** Instruction-level boundaries; no approval mechanism is implemented.

**Decision needed before:** Any agent is connected to the repository or to Mattermost. This is a blocking design question for future work, not for the current documentation.

## Q5. Should sources be inline or centralized?

**Context:** Sources are currently recorded in each note's frontmatter and body. A resource note can represent a source that deserves its own page.

**Options:**

- **Inline sources (current).** Simple, self-contained, and portable. Trade-off: source details are duplicated across notes and there is no bibliography.
- **A resource note for every source.** Centralizes metadata, but creates many thin notes and duplicate links.
- **A central bibliography file.** Single source of truth for citations, but adds a non-note artifact and a second linking model.

**MVP handling:** Inline sources; resource notes only for sources worth studying as objects.

**Decision needed before:** The same source is cited in many notes, or source metadata must be queried as a dataset.

## Q6. What is the journal granularity?

**Context:** Journal entries may represent a day, an event, or a single thought. The MVP permits `YYYY-MM-DD.md` and `YYYY-MM-DD-short-slug.md`.

**Options:**

- **One entry per day.** Easy chronology, but mixes unrelated events.
- **One entry per event or thought.** Better retrieval, but more files and naming decisions.
- **Hybrid (current).** Flexible, but less predictable.

**MVP handling:** Hybrid naming convention.

**Decision needed before:** Journal usage becomes frequent enough that consistent retrieval matters. This is a minor, reversible decision.

## Q7. How should contradictions between notes be handled?

**Context:** The Researcher must identify contradictions, and the Curator must preserve information rather than overwrite it. The MVP has no separate contradiction register.

**Options:**

- **Record contradictions in the affected note** under `## Contradictions and uncertainties`, citing both claims. Keeps context local, but the contradiction may be missed elsewhere.
- **Create a dedicated contradiction note.** Centralizes conflicts, but adds a note type or convention and more maintenance.
- **Escalate to the human owner without recording.** Safe, but loses the finding if follow-up is delayed.

**MVP handling:** Record both claims in the note and escalate to the human owner. Do not silently resolve.

**Decision needed before:** Contradictions recur or multiple notes conflict on the same topic.

## Q8. When may the Curator perform external research?

**Context:** The brief says the Curator researches topics when requested. It does not define whether the Curator may browse proactively, which sources are acceptable, or how to record unavailable tools.

**Options:**

- **Only on explicit request (current interpretation).** Predictable and avoids unrequested scope. Trade-off: the Curator cannot fill obvious gaps.
- **Proactive research within a stated budget.** More complete notes, but harder to audit and can introduce low-quality sources.
- **No external research; only user-provided sources.** Safest, but limited.

**MVP handling:** Research only when requested or explicitly permitted. If a tool is unavailable, state that and do not present model memory as research.

**Decision needed before:** The Curator is implemented and connected to browsing or search tools. The Researcher's permission model is also unresolved and must be decided with this question.

## Q9. What happens to the demonstration notes?

**Context:** Five concept notes and three topic indexes are marked `demo: true` and carry a banner. They validate the schema and linking conventions but are not personal knowledge.

**Options:**

- **Keep them as permanent examples.** Useful for onboarding, but they clutter the index.
- **Remove them before production.** Clean knowledge base, but loses worked examples.
- **Move them to a separate examples location.** Clean separation, but changes the agreed directory structure.

**MVP handling:** Keep them in place and clearly marked; removal requires human approval.

**Decision needed before:** The knowledge base is used for real personal knowledge. This is a minor, reversible decision, but deleting content requires authorization.

## Q10. What is the archive and deletion policy?

**Context:** The instructions prohibit deleting or overwriting information without authorization. There is no archive directory and no archive metadata.

**Options:**

- **No deletion; mark stale notes in the body.** Simple, but the base accumulates obsolete material.
- **Add an `archive/` directory and move notes there.** Clean active view, but changes the agreed structure and link paths.
- **Add an `archived` field or status to the schema.** Machine-readable, but requires a schema change and template updates.
- **Delete after explicit human approval.** Simple, but irreversible unless version control preserves history.

**MVP handling:** No deletion or archiving. Ask the human owner.

**Decision needed before:** The first note needs retirement. Any option other than deletion requires a schema or directory change and must be recorded in `DECISIONS.md`.

## Q11. How should the tag vocabulary be governed?

**Context:** Tags are flat and reused where possible, but there is no controlled vocabulary or tag index.

**Options:**

- **Free tags with a reuse convention (current).** Low overhead. Trade-off: synonyms and inconsistent granularity.
- **A controlled tag list in a document.** Better consistency, but adds maintenance and a place for the list.
- **Hierarchical tags.** More expressive, but contradicts the flat-tag decision and complicates search.
- **Derived tag index.** Requires tooling or manual upkeep.

**MVP handling:** Flat tags, search before adding, reuse existing terms.

**Decision needed before:** Tag drift makes search unreliable, or a tag list becomes necessary for agent retrieval.

## Q12. How should concurrent writes be handled?

**Context:** Future Curator and Researcher agents may communicate through Mattermost. The MVP has no concurrency control, locking, or merge protocol.

**Options:**

- **Single writer at a time.** Simplest and safest, but serializes work.
- **Git-based conflict resolution.** Leverages version control, but requires agents to understand merges and conflicts.
- **A queue or coordination service.** Robust, but introduces external infrastructure and is out of scope.
- **Separate repositories per agent.** Avoids write conflicts, but complicates retrieval and synthesis.

**MVP handling:** None; only one human or agent should write at a time. The Researcher never writes.

**Decision needed before:** Multiple agents can modify the repository. This is intentionally not designed in the MVP.

## Q13. What language and locale conventions apply?

**Context:** The MVP is written in English with ISO dates and ASCII file names.

**Options:** English-only (current), bilingual notes, or locale-specific dates and filenames. The current choice is a working assumption (A10); revisit only if the knowledge base becomes multilingual.
