---
id: knowledge-index
title: Knowledge Index
type: index
tags: []
created: "2026-11-05"
updated: "2026-11-05"
related:
  - "./topics/javascript.md"
  - "./topics/python.md"
  - "./topics/ai-ml.md"
sources: []
---

# Knowledge Index

> **Maintained by the Curator; read-only for the Researcher.** Last reviewed: 2026-11-05.

## Overview

This is the entry point to the Second Brain knowledge base. Notes are Markdown files with YAML frontmatter, organized by type. Start with a topic index or jump directly to a concept.

- Five concept notes and three topic indexes are demonstration content. They are marked `demo: true` and carry a visible banner.
- The knowledge base is local-first and portable. There is no database, search service, or automation layer in the MVP.
- Conventions live in [NOTE_SCHEMA.md](../instructions/NOTE_SCHEMA.md). Agent rules live in [AGENTS.md](../AGENTS.md).

## Topic indexes

- [JavaScript](./topics/javascript.md) — language and runtime concepts.
- [Python](./topics/python.md) — language and asyncio concepts.
- [Artificial Intelligence and Machine Learning](./topics/ai-ml.md) — Transformers, embeddings, and retrieval.

## Important concepts

- [JavaScript Event Loop](./concepts/javascript-event-loop.md) — how a JavaScript runtime schedules tasks, microtasks, and rendering.
- [Python Asyncio](./concepts/python-asyncio.md) — cooperative concurrency with `async`/`await` and an event loop.
- [Transformer Architecture](./concepts/transformer-architecture.md) — attention-based neural architecture for sequence modeling.
- [Vector Embeddings](./concepts/vector-embeddings.md) — dense vector representations and similarity.
- [Retrieval-Augmented Generation](./concepts/retrieval-augmented-generation.md) — grounding generation in retrieved documents.

## Recent additions

All demonstration notes were added on 2026-11-05:

- [JavaScript Event Loop](./concepts/javascript-event-loop.md)
- [Python Asyncio](./concepts/python-asyncio.md)
- [Transformer Architecture](./concepts/transformer-architecture.md)
- [Vector Embeddings](./concepts/vector-embeddings.md)
- [Retrieval-Augmented Generation](./concepts/retrieval-augmented-generation.md)
- [JavaScript topic](./topics/javascript.md)
- [Python topic](./topics/python.md)
- [Artificial Intelligence and Machine Learning topic](./topics/ai-ml.md)

## Projects

No project notes yet. When the first project starts, create it from [templates/project.md](../templates/project.md) and link it here.

## Inbox status

**Empty.** No captures are awaiting triage (reviewed 2026-11-05). New captures go in `knowledge/inbox/` until their type and destination are clear.

## Maintenance

When adding, renaming, or removing a note:

1. Update the relevant topic index and this index.
2. Add the note to "Recent additions" with its date; keep the list short and move older entries into the topic indexes.
3. Update "Inbox status" if captures are added or triaged.
4. Verify that every link on this page resolves.
5. Follow the validation checklist in [NOTE_SCHEMA.md](../instructions/NOTE_SCHEMA.md).

## Demonstration content

The five concept notes and three topic indexes above are examples that validate the schema, templates, and linking conventions. They are not personal knowledge. The Curator must ask before removing or replacing them; see [OPEN_QUESTIONS.md](../OPEN_QUESTIONS.md).
