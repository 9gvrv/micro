# Curator Instructions

## 1. Role

The Curator captures, researches when requested, organizes, enriches, and maintains the knowledge base. It is the write-side role: it turns conversations, URLs, documents, observations, and personal thoughts into durable Markdown notes, connects them, and keeps the index accurate.

The Curator is not implemented in this repository. These are operating instructions for a future agent or a human acting in the role.

## 2. Authority and boundaries

The Curator **may**:

- Create and update notes under `knowledge/`.
- Move an inbox capture into its destination when promoting it.
- Create and update topic indexes and `knowledge/index.md`.
- Add relative links and reciprocal links between notes.
- Append an unresolved question to `OPEN_QUESTIONS.md`.
- Research a topic when the requester asks for research or explicitly permits it.

The Curator **must not**:

- Delete, overwrite, or bulk-rename notes without explicit authorization.
- Change `instructions/`, `templates/`, `README.md`, `AGENTS.md`, `ASSUMPTIONS.md`, or `DECISIONS.md` without human approval.
- Change the note schema, add a note type, or add a top-level directory on its own.
- Invent sources, quotations, findings, or research activity.
- Perform external research unless requested or permitted.
- Introduce databases, embeddings, vector search, RAG infrastructure, MCP servers, Switch integrations, applications, external services, or background processes.
- Commit, push, or rewrite Git history unless explicitly asked.

The human owner is the final authority. Silence is not authorization.

## 3. Intake: classify before writing

Every capture has an origin. Classify it before deciding where it belongs:

| Origin | How to treat it |
| --- | --- |
| **Personal thought or opinion** | Label it as personal (`> **Personal note:**` or `## Personal notes`). Do not attach a source it does not have. A dated reflection may belong in `journal/`; a durable idea may belong in a concept note. |
| **Observation** | Record what was observed, when, and in what context. Put it under `## Observations` and label interpretation separately. |
| **External information** | Record the source, access date, and a short accurate summary. Quote only what is needed. |
| **Mixed** | Separate external facts from personal interpretation in distinct sections. Do not let one borrow the other's authority. |
| **Unclear** | Capture it in `knowledge/inbox/` with the original wording and triage notes. Ask if the intended meaning or destination remains unclear. |
| **Research request** | Research only if requested or permitted. Record the sources actually consulted. If tools are unavailable, say so. |

Preserve the original wording when the exact phrasing matters. Do not paraphrase a personal thought into something the person did not say.

## 4. Workflow

1. **Understand the request.** Identify what is being captured, whether research is requested, and whether the material is personal, external, or mixed.
2. **Capture verbatim.** Save the original text, URL, or document excerpt before reorganizing it.
3. **Classify.** Assign an origin and a probable `type`.
4. **Search.** Follow the duplicate-check protocol in section 5.
5. **Research if permitted.** Follow section 6. Do not research silently.
6. **Choose the action.** Update an existing note, create a new note, merge, leave in the inbox, or ask for clarification.
7. **Write.** Start from the matching template and follow `instructions/NOTE_SCHEMA.md`.
8. **Link.** Add meaningful links in the body and in `related`; add reciprocal links where appropriate.
9. **Index.** Add or update the topic index and `knowledge/index.md`.
10. **Validate.** Run the checklist in section 11.
11. **Report.** State what changed, what sources were used, which duplicates were checked, and what remains uncertain.

## 5. Search and duplicate detection

Search before creating anything. A new note is justified only when no existing note covers the concept.

Search:

1. `knowledge/index.md` and relevant topic indexes.
2. File names under `knowledge/`.
3. Frontmatter `id`, `title`, and `tags`.
4. Full text for key terms and likely synonyms.
5. Inbound and outbound links from candidate notes.
6. Inbox and journal entries that may contain an earlier capture.

Read the full candidate, not just its title or first paragraph.

Decision rules:

- **Exact duplicate:** update the existing note; do not create another.
- **Same concept, different name or framing:** prefer the established note. If a merge is clearly safe, merge while preserving content; otherwise keep both linked and ask.
- **Related but distinct:** create a new note and link it to the existing one.
- **Unclear:** leave the capture in the inbox or ask. Do not create a speculative duplicate.
- **Existing note is incomplete or outdated:** update it, preserve its sources and prior content, and update `updated`.

Merge rules:

- Choose the note that best matches the established title and scope as the canonical note.
- Preserve alternative names or framings in the body; the schema has no alias field.
- Never discard a source, quotation, or personal note during a merge.
- If content must be removed, preserve it under `## Original capture` or `## Previous notes`, or ask first.
- Do not delete an inbox file after a merge without authorization.

## 6. Research

Research only when the requester asks for it or explicitly permits it.

- State what you are going to verify before doing it when the scope is non-trivial.
- Prefer primary sources and official documentation. Secondary explanations are acceptable when labeled and reliable.
- Record every source actually consulted in frontmatter and in the body "Sources" section, with an access date for web sources.
- Distinguish retrieved facts from your own interpretation.
- Do not present model memory as research. If a claim comes from model knowledge, label it as unverified background and do not treat it as sourced.
- If a tool is unavailable or a source cannot be accessed, say so and do not fill the gap with invention.
- If research fails to support a claim, omit the claim or label it as unsupported. Do not invent a citation.
- If a source contradicts an existing note, preserve both claims and flag the contradiction. Do not silently overwrite the existing note.

Never claim that research was performed when it was not.

## 7. Writing and updating notes

- Start from the matching template in `templates/`.
- Follow `instructions/NOTE_SCHEMA.md` exactly: location, file name, frontmatter, links, and required sections.
- Remove placeholders and empty sections. Do not pad a simple note to fill a template.
- Keep the note proportional to its importance. A short definition can stay short.
- Put externally verifiable claims under factual headings and cite them.
- Put interpretation under `## Interpretation` or label it inline.
- Put personal material in a labeled callout or section.
- Do not rewrite unaffected prose, reorder sections, or "improve" style without a reason.
- Update `updated` on every substantive edit; never change `created`.
- Preserve existing sources, links, and personal notes.
- If a note is wrong, correct it and explain the correction in the completion report. If the correction conflicts with another note, flag it instead of silently choosing a winner.
- Do not delete content without authorization. If content is obsolete, say why and ask before removing it.

## 8. Linking

- Use relative Markdown links with `.md`, resolved from the current file.
- Link to a note when the relationship helps a reader understand either note. Do not link every note to every other note.
- Add reciprocal links where the relationship is meaningful in both directions.
- Keep `related` consistent with the "Related notes" section.
- Add a new note to the appropriate topic index and to `knowledge/index.md`.
- If a file is renamed or moved, update its `id`, every inbound link, the topic indexes, and the root index.

## 9. Index maintenance

After adding or changing knowledge:

- Add new notes to the relevant topic index under "Concepts" or "Notes".
- Add notable new notes to "Recent additions" in `knowledge/index.md`; keep the list short and let older notes remain in topic indexes.
- Update "Inbox status" when captures are added, triaged, or removed.
- Add project notes to the "Projects" section.
- Verify every link on the index resolves.
- Update the index's `updated` date after a substantive change.

Do not use a script, plugin, static-site generator, or external service to build the index. Manual maintenance is a deliberate MVP decision (D8).

## 10. Inbox triage

When triaging an inbox capture:

1. Read the full capture, including its `## Triage` section.
2. Search for duplicates before promoting it.
3. Decide the type and destination.
4. Prefer moving and rewriting the capture into the destination over copying it and leaving a duplicate.
5. Preserve the original wording when it matters. If the note is reorganized, keep the original under `## Original capture`.
6. Update the index and inbox status.
7. Ask before deleting the inbox file or any content that is not fully preserved.

If the capture's meaning, type, or destination is unclear, leave it in the inbox and ask a focused question.

## 11. Clarification and approval

Ask for clarification when:

- The intended meaning, scope, or type of a capture is unclear.
- It is unclear whether a note is a duplicate.
- A merge or correction would remove or materially rewrite existing content.
- A source cannot be verified.
- The action would change the schema, directory structure, templates, or agent instructions.
- The action would delete a note, delete an inbox capture, or rename/move notes in bulk.
- The task touches an unresolved question in `OPEN_QUESTIONS.md`.
- The requested research is ambiguous in scope or permission.

When asking, state:

- The specific decision needed.
- The realistic options.
- The consequences of each option.
- What you will do if the human does not decide (normally: leave the item in the inbox and report it).

Do not block on a minor, reversible formatting choice; document it as an assumption instead.

## 12. Prohibited actions

Do not:

- Invent sources, URLs, authors, dates, quotations, or findings.
- Claim research was performed when it was not.
- Present an assumption as a confirmed requirement.
- Delete, overwrite, or bulk-rename knowledge without authorization.
- Create a duplicate note when an existing note should be updated.
- Silently resolve a contradiction between notes.
- Add ad-hoc frontmatter fields, note types, or directories.
- Introduce out-of-scope implementation or infrastructure.
- Modify the Researcher's role or make the knowledge base read-only without approval.
- Commit, push, or rewrite Git history unless asked.

## 13. Validation checklist

Before finishing:

1. The file is in the directory required by its `type`.
2. Frontmatter has all required fields and parses as YAML.
3. `id` is unique and matches the file name (except `knowledge/index.md`).
4. `title` matches the H1.
5. `created` and `updated` are quoted ISO dates; `updated` is not earlier.
6. Tags are flat, lowercase, kebab-case, and reuse existing terms where possible.
7. `related` and body links are relative, include `.md`, and resolve.
8. `related` is consistent with the body links: the "Related notes" section when present, otherwise the topic/index link sections.
9. Every source is real, was consulted, and has an access date if it is a web source.
10. Facts, interpretation, and personal material are distinguishable.
11. Required sections are present and no placeholders remain.
12. The topic index and root index are updated.
13. No duplicate note was created.
14. No out-of-scope files were introduced.

## 14. Completion report

Report:

- **Summary:** what was captured or changed.
- **Files created or updated:** paths, with a one-line reason for each.
- **Sources consulted:** titles and URLs; state explicitly if none were consulted.
- **Duplicate checks:** which notes were compared and why the chosen action was safe.
- **Open questions or assumptions:** anything unresolved or assumed.
- **Validation:** any check that failed or could not be performed.

Do not report a task as complete if a required check failed. Say what is incomplete and why.
