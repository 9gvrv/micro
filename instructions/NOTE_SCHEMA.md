# Note Schema

This file is the single source of truth for note metadata, file naming, linking, and document structure in the Second Brain knowledge base.

- **Applies to:** every Markdown file under `knowledge/`, including `knowledge/index.md` and inbox captures.
- **Also applies to:** every file in `templates/`. Templates must produce schema-valid notes.
- **Authority:** if another document disagrees with this file about metadata or note structure, this file wins. Report the conflict instead of guessing.
- **Status:** MVP convention. Changing it requires a decision in `DECISIONS.md` and updates to the agent instructions, templates, index, and demonstration notes.

## 1. File format

- Markdown (`.md`), UTF-8, LF line endings.
- A YAML frontmatter block delimited by `---` must be the first content in the file.
- One H1 (`# Title`) per document. The H1 must match the `title` field.
- No HTML is required. Use standard Markdown so the files remain readable in any editor and on GitHub.
- Dates in frontmatter are quoted strings (`"YYYY-MM-DD"`) so YAML parsers do not coerce them into date objects.

## 2. File names and locations

The document `type` determines the directory:

| Type | Directory | File name | ID |
| --- | --- | --- | --- |
| `concept` | `knowledge/concepts/` | `kebab-case.md` | File name without `.md` |
| `topic` | `knowledge/topics/` | `kebab-case.md` | File name without `.md` |
| `resource` | `knowledge/resources/` | `kebab-case.md` | File name without `.md` |
| `project` | `knowledge/projects/` | `kebab-case.md` | File name without `.md` |
| `journal` | `knowledge/journal/` | `YYYY-MM-DD.md` or `YYYY-MM-DD-short-slug.md` | File name without `.md` |
| `inbox` | `knowledge/inbox/` | `kebab-case.md` | File name without `.md` |
| `index` | `knowledge/index.md` | `index.md` | `knowledge-index` (documented exception) |

File-name rules:

- Lowercase ASCII letters, digits, and hyphens only: `^[a-z0-9]+(?:-[a-z0-9]+)*$`.
- No spaces, underscores, uppercase letters, or punctuation other than hyphens.
- Use a descriptive noun phrase, not a date, for non-journal notes (for example `vector-embeddings.md`, not `notes-2026-11-05.md`).
- IDs are globally unique across all directories. A rename changes the ID, so renaming requires updating every link and the knowledge index.
- The only place where the file name and ID intentionally differ is `knowledge/index.md`, whose ID is `knowledge-index`.

## 3. Required frontmatter

The fields in the required block below are mandatory. Use empty lists (`[]`) when a field does not apply; do not omit the key. `status` and `demo` are optional and are documented in the field reference.

```yaml
---
id: example-note
title: Example Note
type: concept
tags:
  - example-tag
created: "2026-11-05"
updated: "2026-11-05"
related: []
sources: []
---
```

Recommended field order is shown above. YAML key order is not semantically significant, but keeping it consistent makes notes easier to scan and validate.

### Field reference

| Field | Type | Rules |
| --- | --- | --- |
| `id` | string | Unique, kebab-case, matches the file name (except `knowledge/index.md`). |
| `title` | string | Human-readable title; must match the H1 exactly. |
| `type` | string | One of `concept`, `topic`, `resource`, `project`, `journal`, `inbox`, `index`. |
| `tags` | list of strings | Flat, lowercase kebab-case; see section 5. |
| `created` | string | ISO 8601 date, quoted: `"YYYY-MM-DD"`. Set once; never change it. |
| `updated` | string | ISO 8601 date, quoted. Must be on or after `created`. Change it on every substantive edit. |
| `related` | list of strings | Relative paths to other notes, including `.md`; see section 6. May be empty. |
| `sources` | list of objects | External sources; see section 7. May be empty. |
| `status` | string | Optional; allowed only for `project`: `planned`, `active`, `paused`, `completed`, `archived`. |
| `demo` | boolean | Optional; `true` only on demonstration notes. Omit for real knowledge. |

Do not add ad-hoc frontmatter fields. If a new field is genuinely needed, update this schema, the templates, the agent instructions, and `DECISIONS.md` first.

## 4. Document types

| Type | Purpose |
| --- | --- |
| `concept` | A durable explanation of an idea, technique, mechanism, or term. |
| `topic` | A lightweight index for a broad subject area. Links to concepts, resources, projects, and related topics; does not duplicate their content. |
| `resource` | A note about an external source (article, book, talk, documentation) and why it matters. Used when the source itself is worth tracking as a note. |
| `project` | Work with an objective, scope, tasks, and decisions. |
| `journal` | A dated personal entry containing observations, decisions, and follow-ups. |
| `inbox` | An uncategorized capture awaiting triage. Temporary by design. |
| `index` | The single root index at `knowledge/index.md`. |

## 5. Tags

- Lowercase ASCII, kebab-case: `machine-learning`, not `Machine Learning` or `#machinelearning`.
- Flat vocabulary: no hierarchy, no parent/child syntax.
- Tags describe subject matter, not document type or workflow state. The `type` and `status` fields already carry that information.
- Reuse existing tags where possible. Search the knowledge base before introducing a synonym (`js` vs `javascript`).
- Use 1–6 tags for `concept`, `topic`, `resource`, and `project` notes. `journal`, `inbox`, and `index` notes may have zero tags.
- Examples: `javascript`, `concurrency`, `python`, `asyncio`, `transformers`, `vector-embeddings`, `retrieval`, `nlp`.

## 6. Links

Internal links must be relative Markdown links that include the `.md` extension:

```markdown
[Python asyncio](./python-asyncio.md)
[JavaScript topic](../topics/javascript.md)
```

Rules:

- Resolve the path relative to the file that contains the link. Do not use absolute paths, `file://` URLs, or wiki-style `[[links]]`.
- Every internal link must point to an existing note. Do not link to planned but unwritten notes.
- Use descriptive link text, normally the target note's title.
- The `related` frontmatter list is the machine-readable connection list. When the note has a "Related notes" section, keep the two consistent. Topic indexes use their "Concepts" and "Related topics" sections instead; the root index uses its topic and concept links. In every case, `related` must contain only paths that also appear as links in the body.
- Add a reciprocal link when the relationship is meaningful in both directions. Do not add link spam or link every note to every other note.
- Every note should be reachable from `knowledge/index.md` directly or through a topic index.

## 7. Sources and provenance

The `sources` list records what was actually consulted. The body "Sources" section gives humans the same information with readable links.

Source object fields:

| Field | Required | Rules |
| --- | --- | --- |
| `title` | Yes | Title of the source as published. Quote it in YAML if it contains `:` or other special characters. |
| `url` | For web sources | `http://` or `https://` URL. Omit for books or offline documents that have no canonical URL. |
| `accessed` | For web sources | Date the source was read, `"YYYY-MM-DD"`. |
| `author` | No | Author or organization. |
| `published` | No | Publication year (`"2020"`) or date (`"2020-05-22"`). |

Rules:

- Never invent a source, URL, author, date, quotation, or finding.
- Never claim that research was performed when it was not.
- If a claim comes from general model knowledge rather than a consulted source, label it as such and mark it as unverified. Do not present it as sourced fact.
- Quotes must be exact and attributed. Paraphrases must still cite the source.
- Record the access date for web sources. Sources can change or disappear.
- A resource note is appropriate when the external source itself is a durable object of study. A passing citation belongs inline in the note it supports.

## 8. Facts, interpretations, and personal material

Notes may mix externally verifiable information with personal interpretation, but the two must be distinguishable:

- **Facts:** place under `## Key facts`, `## Details`, or a similarly factual heading, and cite sources where applicable.
- **Interpretation:** place under `## Interpretation` or label the paragraph inline with `**Interpretation:**`.
- **Personal material:** use a blockquote callout, for example `> **Personal note:** ...`, or a `## Personal notes` section.
- **Observations from a conversation or journal:** place under `## Observations`.
- **Contradictions:** use `## Contradictions and uncertainties` and present both claims with their sources. Do not silently reconcile them.

Do not pad a note to fill a template. Omit optional sections that add nothing.

## 9. Required body sections by type

These are minimums. Additional sections are allowed when they add substantive value.

| Type | Required sections |
| --- | --- |
| `concept` | `Summary`; at least one substantive explanatory section (`Key facts`, `Details`, or similar); `Related notes`; `Sources` when `sources` is non-empty. |
| `topic` | `Overview`; `Concepts` (or `Notes`); `Related topics`; `Sources` when `sources` is non-empty. |
| `resource` | `Summary`; `Key takeaways`; `Relevance`; `Related notes`; `Sources`. |
| `project` | `Objective`; `Context`; `Scope`; `Tasks` or `Next actions`; `Decisions`; `Related notes`; `Sources` when `sources` is non-empty. |
| `journal` | `Context`; `Observations`; `Decisions`; `Follow-ups`; `Related notes`; `Sources` when `sources` is non-empty. |
| `inbox` | `Capture`; `Triage`. |
| `index` | `Overview`; `Topic indexes`; `Important concepts`; `Recent additions`; `Projects`; `Inbox status`. |

When `sources` is empty, either omit the Sources section or state that the note has no external sources. Never leave a claim looking sourced when it is not.

## 10. Inbox capture format

An inbox note is a temporary capture. It still uses the required frontmatter, with `type: inbox`, and this body:

```markdown
# Capture title

## Capture

Original text, quotation, URL, or document excerpt. Preserve the wording; label personal material and external material separately.

## Triage

- Origin: personal | external | mixed | unknown
- Proposed type: concept | topic | resource | project | journal | still unclear
- Candidate duplicates: relative link(s) or "none found"
- Next action: promote, merge, ask for clarification, or leave in inbox
```

Triage rules:

- Search before promoting. Do not create a second note for an existing concept.
- Preserve the original capture when rewriting. If content is reorganized, keep the original wording under `## Original capture`.
- Prefer moving and rewriting the inbox file into its destination over copying it and leaving a duplicate behind.
- Do not delete a capture or its content without authorization. If a merge makes the inbox file redundant, ask before removing it.

## 11. Templates

| Template | Produces |
| --- | --- |
| `templates/concept.md` | `type: concept` |
| `templates/article.md` | `type: resource` (articles, books, talks, documentation) |
| `templates/project.md` | `type: project` |
| `templates/journal.md` | `type: journal` |

There are no separate templates for `topic`, `inbox`, or `index`; use the structures in this document. Templates contain placeholders and instructional comments. Remove placeholders and comments before saving a real note, and do not leave empty required sections.

## 12. Validation checklist

Run this checklist before finishing any write:

1. The file is in the directory required by its `type`.
2. The YAML frontmatter parses and contains every required field.
3. `id` is unique and matches the file name (except `knowledge/index.md`).
4. `title` matches the H1.
5. `created` and `updated` are quoted ISO dates; `updated` is not earlier than `created`.
6. `tags` follow the tag rules and reuse existing vocabulary.
7. `related` and body links are relative, include `.md`, and resolve to existing files.
8. `related` is consistent with the body links: the "Related notes" section when present, otherwise the topic/index link sections.
9. Every source is real, was actually consulted, and has an access date when it is a web source.
10. Facts, interpretations, and personal material are distinguishable.
11. Required body sections for the type are present.
12. `knowledge/index.md` links to the note, directly or through a topic index.
13. No duplicate note was created; an existing note was updated instead where appropriate.
14. No out-of-scope implementation files were introduced.

## 13. Minimal example

```markdown
---
id: example-note
title: Example Note
type: concept
tags:
  - example
created: "2026-11-05"
updated: "2026-11-05"
related:
  - "./another-note.md"
sources:
  - title: "Example source"
    url: https://example.com/source
    accessed: "2026-11-05"
---

# Example Note

## Summary

One or two sentences explaining the concept.

## Key facts

- A verifiable claim with a citation in the Sources section.

## Related notes

- [Another note](./another-note.md) — why it is related.

## Sources

- [Example source](https://example.com/source) — accessed 2026-11-05.
```
