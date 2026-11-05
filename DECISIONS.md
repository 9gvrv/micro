# Decisions

Significant architectural decisions and their trade-offs. This is a decision log, not a requirements list.

- **Status:** accepted for the MVP unless marked otherwise.
- **Date:** 2026-11-05.
- **Rule:** a decision that changes the note schema or directory structure also requires updates to `instructions/`, `templates/`, `knowledge/index.md`, and the demonstration notes.

## D1. Use Markdown with YAML frontmatter as the only knowledge store

**Status:** Accepted

**Context:** The knowledge base must be local-first, human-readable, portable, and independent of a particular AI provider or framework. The brief explicitly excludes databases.

**Decision:** Every knowledge document is a Markdown file with a YAML frontmatter block. There is no database, content-management system, or proprietary knowledge store.

**Alternatives considered:**

- **Relational or document database.** Better querying and concurrency, but not human-readable, adds migration and backup concerns, and is outside MVP scope.
- **Proprietary knowledge app.** Convenient editing, but creates vendor lock-in and a second source of truth.
- **Plain Markdown without frontmatter.** Maximum simplicity, but metadata would be inconsistent and hard for agents to parse.

**Consequences:** The repository works with any text editor and version control. There is no native query engine, transaction safety, or schema enforcement; retrieval relies on text search, tags, links, and agent discipline. The choice is expensive to reverse later.

## D2. Organize by document type, with flat directories

**Status:** Accepted

**Context:** The brief prescribes `concepts/`, `topics/`, `resources/`, `projects/`, `journal/`, and `inbox/`. It also requires discoverability without forcing every item into a category.

**Decision:** The top-level split under `knowledge/` is by document type. Files within each type directory are flat. Subject organization is handled by topic indexes, tags, and links, not by nested subject folders. The inbox holds captures whose type or destination is unclear.

**Alternatives considered:**

- **PARA (projects, areas, resources, archives).** Optimized for action rather than durable knowledge and encourages ambiguous placement.
- **Deep subject hierarchy.** Intuitive at small scale, but cross-cutting notes do not fit one branch and moves break links.
- **Single folder with tags only.** Flat and flexible, but offers weaker browsing and no obvious place for type-specific templates.
- **Numeric taxonomy (for example Johnny.Decimal).** Precise, but imposes an external numbering system and maintenance overhead.

**Consequences:** Type is always known from the path, which simplifies templates and validation. A note that changes type must be moved, and all links to it updated. Subject discovery depends on topic indexes being maintained.

## D3. Use the file name as the note ID for the MVP

**Status:** Accepted for the MVP; see Q3

**Context:** Notes need a stable identifier for frontmatter and for agent references. A separate ID registry would add maintenance.

**Decision:** For every note except `knowledge/index.md`, `id` equals the file name without `.md`. The root index uses `knowledge-index` because its file name is fixed as `index.md`. IDs are unique across the knowledge base.

**Alternatives considered:**

- **UUID or ULID.** Stable across renames, but opaque to humans and requires an ID-to-file mapping.
- **Title as ID.** Readable, but titles change frequently and can collide.
- **Separate ID registry.** Central control, but another artifact to maintain and easy to desynchronize.

**Consequences:** IDs are readable and links are easy to resolve by hand. Renaming a file changes its ID and requires updating links and the index. External systems should not treat IDs as permanently stable until Q3 is resolved.

## D4. Use a flat, lowercase tag vocabulary

**Status:** Accepted

**Context:** Tags support discovery across type and topic boundaries. A formal ontology would be excessive for the MVP.

**Decision:** Tags are flat, lowercase, kebab-case strings. Reuse existing tags where possible. Tags describe subject matter, not type or workflow state. Substantive note types use 1–6 tags.

**Alternatives considered:**

- **Hierarchical tags (`ml/nlp/transformers`).** More expressive, but adds parsing rules and vocabulary governance.
- **A formal ontology or thesaurus.** Precise, but far beyond MVP scope.
- **No tags; links only.** Fewer conventions, but weaker cross-cutting discovery.

**Consequences:** Tagging is quick and tool-agnostic. Synonyms and inconsistent granularity can emerge; Q11 tracks governance. Tag-based retrieval is only as good as the vocabulary discipline.

## D5. Use relative Markdown links and a mirrored `related` field

**Status:** Accepted

**Context:** Notes must connect to one another and remain portable. Agents also need a machine-readable connection list.

**Decision:** Internal links are standard Markdown links with relative paths and the `.md` extension. The `related` frontmatter list contains the same relative paths as the note's "Related notes" section, or the concept/topic links for topic and index notes. Reciprocal links are added when the relationship is meaningful in both directions.

**Alternatives considered:**

- **Wiki-style `[[links]]`.** Convenient in some tools, but not standard Markdown and tool-specific.
- **Absolute paths.** Easy within one machine, but break when the repository moves.
- **Database relations.** Queryable, but violates the Markdown-only constraint.
- **Tags only.** Flexible, but less precise than a direct link.

**Consequences:** Links work in GitHub, editors, and static renderers. The `related` list and body links must be kept in sync manually, and renames require link updates. Anchors are allowed but must be checked against headings.

## D6. Use one flat topic index per broad subject

**Status:** Accepted; see Q1

**Context:** `knowledge/index.md` must link to topic indexes, but the brief does not prescribe their internal organization.

**Decision:** Each broad subject area gets a lightweight `type: topic` note under `knowledge/topics/`. A topic index summarizes the area, links to concepts and related topics, and does not duplicate their content. The root index links to every topic index.

**Alternatives considered:**

- **A single master index.** Simple at first, but becomes crowded and mixes navigation with subject overview.
- **Nested topic directories.** Scales further, but adds hierarchy and link complexity before it is needed.
- **Tag-only navigation.** No topic files to maintain, but no curated overview or obvious starting point.
- **Generated topic pages.** Requires tooling and is outside MVP scope.

**Consequences:** Navigation is simple and human-readable. Topic indexes need manual maintenance, and broad topics may need splitting. Q1 tracks the scaling trigger.

## D7. Record sources inline; create resource notes selectively

**Status:** Accepted; see Q5

**Context:** Provenance is mandatory, but creating a note for every citation would produce many thin notes.

**Decision:** Each note records the sources it actually used in frontmatter and repeats them in a body "Sources" section. A separate `type: resource` note is created only when the external source itself is a durable object of study (for example a book or a foundational paper).

**Alternatives considered:**

- **A resource note for every source.** Centralizes metadata, but creates note sprawl and duplicated links.
- **A central bibliography file.** Single citation source, but introduces a non-note artifact and a second data model.
- **No frontmatter sources.** Simpler prose, but agents cannot reliably discover provenance.

**Consequences:** Notes are self-contained and portable, but citation details may be repeated. There is no global bibliography or citation query. Source verification remains manual.

## D8. Maintain the knowledge index manually

**Status:** Accepted

**Context:** The brief requires a central index but prohibits automated indexing infrastructure.

**Decision:** `knowledge/index.md` is updated by the Curator as part of the note workflow. It lists topic indexes, important concepts, recent additions, project references, and inbox status. No script, static-site generator, Obsidian plugin, or external index is used.

**Alternatives considered:**

- **Generated index or static site.** Consistent, but requires a build step and tooling outside scope.
- **Dataview-style dynamic queries.** Convenient in specific editors, but not portable and not standard Markdown.
- **External knowledge tool.** Contradicts local-first and provider independence.

**Consequences:** The index remains readable everywhere and needs no runtime. It can become stale if the maintenance checklist is skipped. Q2 tracks the scaling trigger.

## D9. Mark demonstration content explicitly

**Status:** Accepted; see Q9

**Context:** The brief requires five demonstration notes. Examples in the live knowledge tree can be mistaken for personal knowledge.

**Decision:** Every demonstration note and demonstration topic index has `demo: true` in frontmatter and a visible banner at the top of the body. Demonstration content remains under `knowledge/` so it exercises the real schema and links. Removing or replacing it requires human approval.

**Alternatives considered:**

- **Put examples in a separate branch or repository.** Clean production tree, but weakens schema validation in the real structure.
- **Leave examples unmarked.** Less metadata, but high risk of confusion.
- **Omit examples.** Violates an explicit requirement.

**Consequences:** Demo content is easy to find and remove. The optional `demo` field is reserved for this purpose. The knowledge index must continue to identify demo content until it is retired.

## D10. Separate Curator write authority from Researcher read-only access

**Status:** Accepted

**Context:** One agent maintains knowledge; the other answers questions from it. Accidental writes during research could corrupt the source of truth.

**Decision:** The Curator may create and update notes, triage the inbox, and maintain the indexes within the rules. The Researcher may only read. The human owner retains final authority and must approve destructive or structural changes. Neither agent may silently change the schema or instructions.

**Alternatives considered:**

- **Both agents write.** Flexible, but increases conflict and corruption risk.
- **Separate repositories per agent.** Isolates writes, but duplicates knowledge and complicates synthesis.
- **Shared writes with locking.** Technically stronger, but requires infrastructure outside MVP scope.

**Consequences:** Roles are clear and the Researcher is safe to run against the live base. Enforcement is instruction-level only; no tooling prevents a violation. Q4 and Q12 track the future approval and concurrency models.

## D11. Do not implement agents, integrations, or automation in the MVP

**Status:** Accepted

**Context:** The brief strictly limits the MVP to documentation, structure, templates, and knowledge content.

**Decision:** This repository contains no agent runtime, Python or JavaScript application, database, embedding or vector search, RAG pipeline, MCP server, Switch integration, frontend, external service, or background process. Validation is manual.

**Alternatives considered:**

- **Prototype the Curator now.** Tempting, but outside scope and would force premature provider and integration choices.
- **Add a read-only validation script.** Useful, but still an application and outside the stated scope.
- **Add vector search for the demo notes.** Directly contradicts the scope constraints.

**Consequences:** The deliverable is portable and easy to review. Operations are manual, validation depends on discipline, and future work must start with new decisions and verified integration research.

## D12. Retain empty directories with `.gitkeep`

**Status:** Accepted

**Context:** Git does not track empty directories, but the agreed structure includes `inbox/`, `resources/`, `projects/`, and `journal/`, which may be empty at first.

**Decision:** Each empty type directory contains a `.gitkeep` file. The file is a placeholder, not a knowledge note, and is ignored by the schema.

**Alternatives considered:**

- **A README in each directory.** More explanatory, but adds documentation that could drift.
- **Do not track empty directories.** Cleaner repository, but the required structure would be missing after clone.
- **A `.gitignore` exception pattern.** More complex than a placeholder.

**Consequences:** The directory structure survives cloning. `.gitkeep` files are cosmetic and must not be treated as notes or linked from the index.

## D13. Store date-only, quoted ISO 8601 dates

**Status:** Accepted

**Context:** Notes need creation and update dates that sort correctly and parse reliably across tools.

**Decision:** `created`, `updated`, and source `accessed` dates use quoted `"YYYY-MM-DD"` strings. No time or timezone is stored.

**Alternatives considered:**

- **Full ISO timestamps.** More precise, but adds timezone handling and unnecessary complexity.
- **Unix epoch values.** Sortable, but unreadable.
- **Free-form dates.** Human-friendly, but not reliably parseable.

**Consequences:** Dates are readable and sort lexicographically. Notes updated on the same day cannot be ordered by time, and dates reflect the authoring agent's local date.

## D14. Require coordinated changes to the note schema

**Status:** Accepted

**Context:** A schema split across instructions, templates, and examples will drift if fields are added ad hoc.

**Decision:** `instructions/NOTE_SCHEMA.md` is the single source of truth for metadata and structure. A schema change requires a decision entry here and coordinated updates to the templates, agent instructions, index conventions, and demonstration notes. Ad-hoc frontmatter fields are prohibited.

**Alternatives considered:**

- **Evolve the schema informally.** Fast, but leads to incompatible notes and unreliable agent behavior.
- **Freeze the schema forever.** Consistent, but prevents justified improvements.
- **Use an external schema tool.** Rigorous, but adds tooling and is outside MVP scope.

**Consequences:** Changes are deliberate and documented. Each change costs more coordination, which is acceptable for a small, stable MVP.
