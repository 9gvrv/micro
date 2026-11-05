# Second Brain

A local-first personal knowledge base built on Markdown files.

The knowledge base is designed to be read and maintained by a **Curator** agent and queried by a read-only **Researcher** agent. Those agents are not implemented in this repository. The MVP provides the knowledge structure, note schema, templates, documentation, and demonstration content they will operate on.

## Status

- **MVP documentation and knowledge structure**, created 2026-11-05.
- Markdown is the single source of truth.
- No agents, integrations, databases, embeddings, vector search, RAG infrastructure, applications, or background processes are included.
- Five demonstration notes and three demonstration topic indexes validate the schema and linking conventions.

## Start here

1. [AGENTS.md](./AGENTS.md) — operating contract for any agent or human working in the repository.
2. [instructions/NOTE_SCHEMA.md](./instructions/NOTE_SCHEMA.md) — canonical metadata, naming, linking, and note-structure rules.
3. [instructions/CURATOR.md](./instructions/CURATOR.md) — how to capture, research, organize, and maintain knowledge.
4. [instructions/RESEARCHER.md](./instructions/RESEARCHER.md) — how to retrieve, synthesize, and cite knowledge without modifying it.
5. [knowledge/index.md](./knowledge/index.md) — the entry point to the knowledge itself.

## Repository structure

```text
second-brain/
├── README.md
├── AGENTS.md
├── ASSUMPTIONS.md
├── OPEN_QUESTIONS.md
├── DECISIONS.md
├── instructions/
│   ├── CURATOR.md
│   ├── RESEARCHER.md
│   └── NOTE_SCHEMA.md
├── knowledge/
│   ├── index.md
│   ├── inbox/                 (empty; .gitkeep)
│   ├── concepts/
│   │   ├── javascript-event-loop.md
│   │   ├── python-asyncio.md
│   │   ├── transformer-architecture.md
│   │   ├── vector-embeddings.md
│   │   └── retrieval-augmented-generation.md
│   ├── topics/
│   │   ├── javascript.md
│   │   ├── python.md
│   │   └── ai-ml.md
│   ├── resources/             (empty; .gitkeep)
│   ├── projects/              (empty; .gitkeep)
│   └── journal/               (empty; .gitkeep)
└── templates/
    ├── concept.md
    ├── article.md
    ├── project.md
    └── journal.md
```

## How knowledge is organized

Notes are grouped by **document type**, not by subject:

- `concepts/` — durable explanations of ideas, techniques, mechanisms, and terms.
- `topics/` — lightweight indexes for broad subject areas; they link to concepts rather than duplicate them.
- `resources/` — notes about external sources that are worth studying as objects.
- `projects/` — work with objectives, scope, tasks, and decisions.
- `journal/` — dated personal entries: observations, decisions, and follow-ups.
- `inbox/` — uncategorized captures awaiting triage.

Subject relationships are handled by topic indexes, tags, and relative links. Notes within each type directory are flat. If a capture's type or destination is unclear, it goes in the inbox rather than being forced into a category.

## Conventions at a glance

- **Format:** Markdown with YAML frontmatter; UTF-8; LF line endings.
- **IDs:** the file name without `.md` (the root index is the documented exception).
- **File names:** lowercase kebab-case; journal entries are date-based.
- **Dates:** quoted ISO 8601 dates, `"YYYY-MM-DD"`.
- **Tags:** flat, lowercase, kebab-case; reuse existing terms.
- **Links:** relative Markdown links with `.md`, resolved from the current file.
- **Sources:** recorded in frontmatter and in a body "Sources" section; never invented.
- **Facts vs interpretation:** separated into labeled sections or callouts.
- **Index:** manually maintained; no indexing infrastructure.

The full rules, including required body sections and a validation checklist, are in [instructions/NOTE_SCHEMA.md](./instructions/NOTE_SCHEMA.md).

## Using the knowledge base

### Add a note manually

1. Search the existing notes first to avoid a duplicate.
2. Choose the correct type directory.
3. Copy the matching template from `templates/`.
4. Fill in the frontmatter and body, removing placeholders.
5. Link the note from the relevant topic index and from [knowledge/index.md](./knowledge/index.md).
6. Validate the result against the schema checklist.

If the type or destination is unclear, create an inbox capture following section 10 of the schema and leave it for triage.

### Operate as the Curator

Follow [instructions/CURATOR.md](./instructions/CURATOR.md). The Curator searches before creating, preserves sources and existing content, maintains the index, and asks for approval before destructive or structural changes.

### Operate as the Researcher

Follow [instructions/RESEARCHER.md](./instructions/RESEARCHER.md). The Researcher is read-only, reads notes before citing them, distinguishes knowledge-base evidence from missing information, and never fabricates citations.

## Documentation map

| Document | Purpose |
| --- | --- |
| [AGENTS.md](./AGENTS.md) | Entry point, role authority, invariants, lifecycle, escalation, and validation rules. |
| [ASSUMPTIONS.md](./ASSUMPTIONS.md) | Confirmed requirements, working assumptions, and what is explicitly not assumed. |
| [DECISIONS.md](./DECISIONS.md) | Accepted architectural decisions with alternatives and trade-offs. |
| [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md) | Unresolved decisions, options, and current MVP handling. |
| [instructions/NOTE_SCHEMA.md](./instructions/NOTE_SCHEMA.md) | Canonical note metadata, naming, links, sections, and validation. |
| [instructions/CURATOR.md](./instructions/CURATOR.md) | Write-side role instructions. |
| [instructions/RESEARCHER.md](./instructions/RESEARCHER.md) | Read-only retrieval and synthesis instructions. |
| [knowledge/index.md](./knowledge/index.md) | Knowledge entry point: topics, concepts, recent additions, projects, inbox. |
| `templates/` | Reusable note skeletons for concepts, resources, projects, and journal entries. |

## Scope

**In scope for this MVP:**

- Markdown knowledge notes with YAML frontmatter.
- The specified directory structure.
- Note schema, templates, index, and agent operating instructions.
- Five demonstration concept notes and three demonstration topic indexes.
- Documentation of assumptions, decisions, and open questions.

**Explicitly out of scope:**

- Implementing the Curator or Researcher.
- Mattermost or Switch integration.
- Databases, embeddings, vector search, or RAG infrastructure.
- Custom MCP servers.
- Python or JavaScript applications.
- Frontend applications.
- External services or background processes.
- Automated indexing, validation, or build tooling.

## Demonstration content

The five concept notes and three topic indexes are examples. They carry `demo: true` in frontmatter and a visible banner. They exist to exercise the real schema, linking conventions, and index. They are not personal knowledge.

Removing or replacing them requires human approval; see [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md) (Q9).

## Validation

The MVP is validated manually. Before treating a change as complete, use the checklist in [instructions/NOTE_SCHEMA.md](./instructions/NOTE_SCHEMA.md#12-validation-checklist) and [AGENTS.md](./AGENTS.md#10-validation-before-completion). At minimum:

- The directory structure matches the agreed layout.
- Frontmatter is valid and consistent across notes.
- Every relative link resolves.
- The index references existing files.
- No duplicate notes or out-of-scope implementation were introduced.

## Assumptions, decisions, and open questions

The repository distinguishes three things:

- **Confirmed requirements** — stated in the project brief.
- **Working assumptions** — documented in [ASSUMPTIONS.md](./ASSUMPTIONS.md), not presented as requirements.
- **Unresolved questions** — documented in [OPEN_QUESTIONS.md](./OPEN_QUESTIONS.md), with options and trade-offs.

Architectural choices are recorded in [DECISIONS.md](./DECISIONS.md). A schema change requires a decision and coordinated updates to the instructions, templates, index, and demonstration notes.

## Portability and limitations

- The knowledge base works with any text editor and with Git. No provider-specific format is required.
- Relative links and YAML frontmatter are widely supported, but rendering details vary by tool.
- There is no automated validation, search index, or duplicate detection.
- There is no concurrency control; only one writer should operate at a time.
- Web sources can change or disappear after their recorded access dates.
- Future agent and integration capabilities are not verified or designed here. Do not assume Mattermost, Switch, MCP, or any agent runtime supports the required permissions, citations, or workflows.
