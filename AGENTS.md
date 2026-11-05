# Agent Operating Instructions

This is the entry point for any AI agent operating the Second Brain knowledge base.

- **Status:** MVP operating contract. The Curator and Researcher are roles described in documentation; they are not implemented software in this repository.
- **Scope:** documentation, note structure, templates, and knowledge content only. No agent runtime, Mattermost, Switch, MCP, database, embedding, vector search, or RAG integration is included.
- **Audience:** any agent or human acting as the Curator, the Researcher, or a maintainer of this repository.

## 1. Read order

Before acting, read in this order:

1. This file (`AGENTS.md`) for the operating contract.
2. `instructions/NOTE_SCHEMA.md` for the canonical metadata, naming, linking, and body-section rules.
3. `instructions/CURATOR.md` or `instructions/RESEARCHER.md` for the role you are performing.
4. `knowledge/index.md` and the relevant topic indexes.
5. `ASSUMPTIONS.md`, `DECISIONS.md`, and `OPEN_QUESTIONS.md` when the task touches architecture, scope, or an unresolved choice.

Read the actual notes before answering or editing. Do not rely on titles or snippets alone.

## 2. Roles and authority

| Role | Authority | Restrictions |
| --- | --- | --- |
| **Human owner** | Final authority over scope, schema, destructive operations, and unresolved questions. | Should record approved architectural changes in `DECISIONS.md`. |
| **Curator** | May create, update, move, and triage notes under `knowledge/`; may update `knowledge/index.md`; may append unresolved questions to `OPEN_QUESTIONS.md`. | Must not delete or overwrite information without authorization; must not change the schema, templates, instructions, or root governance documents without approval; must not invent sources or claim unperformed research. |
| **Researcher** | May read and search every file in the repository. | Must not create, modify, delete, move, or rename any file, including the index, notes, and documentation. Must not use external research unless explicitly requested or permitted. |

The human owner may delegate a specific action that these rules would otherwise forbid, but the authorization must be explicit and limited to that action. Silence is not authorization.

## 3. Invariants

These rules apply to every task:

- **Markdown is the source of truth.** No database, vector store, or external service replaces the files.
- **The schema is canonical.** `instructions/NOTE_SCHEMA.md` defines metadata, file names, links, and body sections.
- **Avoid duplicates.** Search before creating. Update an existing note when it already covers the concept.
- **Preserve existing information.** Append or restructure with care; never silently remove another person's note, source, or interpretation.
- **Preserve provenance.** Record what was actually consulted and when. Never invent a source, quotation, or finding.
- **Separate facts from interpretation.** Label personal notes, observations, and analysis.
- **Keep links valid.** Internal links are relative, include `.md`, and resolve to existing files.
- **Keep the index current.** Every note must be reachable from `knowledge/index.md`, directly or through a topic index.
- **Stay in scope.** Do not introduce excluded infrastructure or applications.
- **Do not silently resolve architectural questions.** Escalate or record them in `OPEN_QUESTIONS.md`.

## 4. Repository map

```text
second-brain/
├── README.md                 Project overview and usage
├── AGENTS.md                 This operating contract
├── ASSUMPTIONS.md            Working assumptions and confirmed requirements
├── OPEN_QUESTIONS.md         Unresolved decisions
├── DECISIONS.md              Accepted architectural decisions
├── instructions/
│   ├── CURATOR.md            Write-side role instructions
│   ├── RESEARCHER.md         Read-only role instructions
│   └── NOTE_SCHEMA.md        Canonical note specification
├── knowledge/
│   ├── index.md              Central entry point
│   ├── inbox/                Unclassified captures
│   ├── concepts/             Durable explanations
│   ├── topics/               Broad subject indexes
│   ├── resources/            Notes about external sources
│   ├── projects/             Project notes
│   └── journal/              Dated personal entries
└── templates/
    ├── concept.md
    ├── article.md
    ├── project.md
    └── journal.md
```

`.gitkeep` files retain empty directories. They are not notes and must not be indexed.

## 5. Note lifecycle

1. **Capture.** Record the information and its origin. If type or destination is unclear, use `knowledge/inbox/` and preserve the original wording.
2. **Triage.** Identify whether the material is personal, external, or mixed; what type it is; and where it belongs.
3. **Search.** Look for an existing note before creating anything.
4. **Decide.** Update the existing note, create a new note, merge carefully, or leave the item in the inbox for clarification.
5. **Write.** Start from the matching template and follow the schema. Remove placeholders and empty sections.
6. **Link.** Add meaningful relative links in the body and in `related`. Add reciprocal links where appropriate.
7. **Index.** Add the note to the relevant topic index and to `knowledge/index.md`.
8. **Validate.** Run the checklist in section 10.
9. **Report.** State what changed, what sources were used, which duplicates were checked, and what remains uncertain.

## 6. Search before creating

Search in this order, using whatever read/search tools are available:

1. `knowledge/index.md` and the relevant topic indexes.
2. File names under `knowledge/`.
3. Frontmatter `id`, `title`, and `tags`.
4. Full text for the key terms and likely synonyms.
5. Notes linked from candidates, and notes that link back to them.
6. Journal and inbox entries that may contain an earlier capture.

Read the full candidate note before deciding. Then classify:

| Finding | Action |
| --- | --- |
| Exact duplicate (same concept, same scope) | Update the existing note. Do not create a second note. |
| Same concept under a different name or framing | Prefer the established note; merge only if the content can be preserved and the result stays coherent. Ask if uncertain. |
| Related but distinct concept | Create a new note from the template and link it to the existing note. |
| Unclear whether it is a duplicate | Leave the capture in the inbox or ask. Do not guess and create a parallel note. |
| Existing note is outdated or incomplete | Update it, preserving prior information and sources; update `updated`. |

A merge must not silently discard content. If material is removed during a merge, preserve it under an "Original capture" or "Previous notes" section, or ask the human owner first.

## 7. Links and indexing

- Use relative Markdown links with the `.md` extension, resolved from the current file. Examples: `[Python asyncio](./python-asyncio.md)`, `[JavaScript](../topics/javascript.md)`.
- Do not use wiki links, absolute paths, or links to nonexistent notes.
- The `related` frontmatter list is the machine-readable connection list. Keep it consistent with the "Related notes" section when present; topic indexes use their "Concepts" and "Related topics" links, and the root index uses its topic/concept links.
- Add a reciprocal link when the relationship is meaningful in both directions.
- Put a new note in a topic index and in `knowledge/index.md`. Add it to "Recent additions"; keep that list short and let older notes live in topic indexes.
- Update "Inbox status" when captures are added or triaged, and "Projects" when a project note is created.
- Update `updated` on every note and index you substantively change.
- If a file is renamed or moved, update its `id`, every inbound link, the topic indexes, and the root index.

## 8. Sources and provenance

- Use the source object format in `instructions/NOTE_SCHEMA.md`.
- Record only sources that were actually consulted. Do not list a source because it seems relevant.
- Record an access date for every web source.
- Quote exactly or paraphrase accurately; either way, attribute the source.
- If a claim comes from model knowledge rather than a consulted source, label it clearly as unverified background. Do not present it as sourced fact.
- If a research tool is unavailable, say so. Do not simulate research or invent results.
- Prefer primary sources and official documentation. Secondary explanations are acceptable when labeled and reliable.
- Create a `type: resource` note only when the source itself merits a note. Otherwise cite it inline.

## 9. Conflicts, contradictions, and escalation

When notes disagree:

1. Do not overwrite one claim with the other.
2. Record both claims, with their sources and dates, in a `## Contradictions and uncertainties` section or in the completion report.
3. Mark your interpretation as interpretation.
4. Tell the human owner. Do not silently resolve the conflict.

Ask for clarification when:

- The intended meaning, scope, or type of a capture is unclear.
- It is unclear whether a note is a duplicate.
- A merge would remove or materially rewrite existing content.
- A source cannot be verified.
- The requested action would change the schema, directory structure, templates, or agent rules.
- The action would delete, move, or rename notes in bulk.
- The task touches an unresolved question in `OPEN_QUESTIONS.md`.

If instructions conflict, stop and report the conflict instead of choosing silently. Use the precedence order in section 12.

## 10. Validation before completion

Before declaring a write task complete:

1. The file is in the directory required by its `type`.
2. Frontmatter is valid YAML with all required fields from `instructions/NOTE_SCHEMA.md`.
3. `id` is unique and matches the file name (except `knowledge/index.md`).
4. `title` matches the H1.
5. `created` and `updated` are quoted ISO dates; `updated` is not earlier.
6. Tags follow the flat, lowercase, kebab-case convention and reuse existing terms.
7. `related` and body links are relative, include `.md`, and resolve to existing files.
8. `related` is consistent with the body links: the "Related notes" section when present, otherwise the topic/index link sections.
9. Every source is real, was consulted, and has an access date for web sources.
10. Facts, interpretation, and personal material are distinguishable.
11. Required body sections are present and no placeholders remain.
12. The note is reachable from `knowledge/index.md` directly or through a topic index.
13. The index, topic index, and inbox status are updated.
14. No duplicate note was created.
15. No out-of-scope files or infrastructure were introduced.

For a Researcher task, validate that every cited file exists, every citation was actually read, and the answer separates knowledge-base evidence from general background and missing information.

## 11. Scope guardrails

Do not introduce, without a new approved decision:

- Databases or external knowledge stores.
- Embeddings, vector search, or RAG infrastructure.
- Custom MCP servers or Switch integrations.
- Python or JavaScript applications.
- Frontend applications.
- External services.
- Background processes.
- New top-level directories, note types, or frontmatter fields.
- Automated indexing or build infrastructure.

Documentation, structure, templates, and Markdown notes are in scope. Future features belong in `OPEN_QUESTIONS.md`, not in the repository.

## 12. Instruction precedence

When documents disagree, apply this order:

1. An explicit, in-scope instruction from the human owner for the current task.
2. `instructions/NOTE_SCHEMA.md` for metadata, naming, links, and note structure.
3. The role-specific file (`CURATOR.md` or `RESEARCHER.md`) for that role's behavior.
4. This file for general operating rules.
5. `DECISIONS.md` for architectural rationale, and `ASSUMPTIONS.md` for unconfirmed choices.
6. `OPEN_QUESTIONS.md` for unresolved matters; never treat an open question as decided.

If two documents conflict, stop and report the conflict. Do not invent a resolution. The human owner is the final authority.

## 13. Change management

- **Schema changes** require a decision in `DECISIONS.md`, updates to `instructions/NOTE_SCHEMA.md`, all affected templates, the demonstration notes, and the index conventions. See D14.
- **Role or permission changes** require human approval and updates to this file and the role instructions.
- **Template changes** must remain consistent with the schema and the demonstration notes.
- **Architectural decisions** are recorded in `DECISIONS.md` with alternatives and trade-offs.
- **Unresolved questions** are recorded in `OPEN_QUESTIONS.md`; the Curator may append one but may not resolve it unilaterally.
- **Assumptions** are recorded in `ASSUMPTIONS.md` and must not be presented as confirmed requirements.

## 14. Known limitations

- The rules are enforced by instructions and human review, not by software. A careless agent can still violate them.
- There is no automated link checker, schema validator, index generator, or duplicate detector.
- There is no concurrency control. Only one writer should operate at a time.
- Web sources can change or disappear after their access dates.
- Mattermost, Switch, MCP, and agent-runtime capabilities are not verified or designed here. Do not assume they support the required permissions, citations, or workflows.
