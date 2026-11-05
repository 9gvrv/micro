---
id: retrieval-augmented-generation
title: Retrieval-Augmented Generation
type: concept
tags:
  - rag
  - retrieval
  - llm
  - nlp
created: "2026-11-05"
updated: "2026-11-05"
related:
  - "./transformer-architecture.md"
  - "./vector-embeddings.md"
  - "../topics/ai-ml.md"
sources:
  - title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
    url: https://arxiv.org/abs/2005.11401
    author: "Lewis et al."
    published: "2020"
    accessed: "2026-11-05"
  - title: "Retrieval-Augmented Generation for Large Language Models: A Survey"
    url: https://arxiv.org/abs/2312.10997
    author: "Gao et al."
    published: "2023"
    accessed: "2026-11-05"
demo: true
---

# Retrieval-Augmented Generation

> **Demonstration note.** This note is part of the MVP example set. It demonstrates the note schema and is not a personal knowledge entry. Replace or remove it only with human approval when the knowledge base goes into real use.

## Summary

Retrieval-Augmented Generation (RAG) combines a retrieval component with a generative model. Given a query, the system retrieves relevant material from an external corpus and supplies that material to the generator, which conditions its output on it. The approach is used to ground language-model responses in documents that can be updated independently of the model's weights.

## Key facts

- RAG was introduced by Lewis et al. in 2020 for knowledge-intensive natural-language tasks. The original formulation combined a pre-trained sequence-to-sequence generator with a dense vector index of Wikipedia accessed by a neural retriever.
- The original model paired a DPR (Dense Passage Retrieval) retriever with a BART generator and marginalized over retrieved passages. It described two formulations, RAG-Sequence and RAG-Token, which differ in how the retrieved passages are integrated during generation.
- Modern RAG is a family of pipelines, not one fixed architecture. Common stages include query processing, retrieval (sparse, dense, or hybrid), reranking, context assembly, generation, and sometimes citation extraction.
- The external corpus can be updated without retraining the generator. This is the main architectural advantage over storing all knowledge in model parameters.
- RAG can improve factuality and attribution, but it does not guarantee correctness. The generator can ignore, misread, or contradict the retrieved context.
- Retrieval quality is a bottleneck. If the relevant passage is not retrieved, the generator cannot ground its answer in it. Chunking, ranking, and query formulation therefore matter as much as the generator.
- Evaluation should cover retrieval quality, generation quality, and the end-to-end result. Retrieval metrics include recall@k and nDCG; end-to-end evaluation often examines answer correctness and faithfulness to the retrieved evidence.
- RAG and fine-tuning solve different problems. RAG supplies knowledge at inference time; fine-tuning changes model weights and behavior. They can be combined.

## Interpretation

The useful distinction is between **knowledge** and **behavior**. RAG is a way to supply knowledge and evidence at inference time; it is not a substitute for evaluating whether the retriever found the right material or whether the generator used it faithfully.

**Engineering risks (interpretation):** retrieved text is untrusted input. A corpus can contain stale, contradictory, malicious, or access-restricted material. A production system needs source validation, permission-aware retrieval, and defenses against prompt injection through retrieved content. Long contexts also add latency and cost, and a larger context window does not guarantee that the model attends to the right passage.

## Common misconceptions

- **"RAG eliminates hallucination."** It reduces some failures by supplying evidence, but the generator can still produce unsupported statements.
- **"RAG is just a vector database."** A vector index can be part of retrieval, but RAG also includes query processing, ranking, context construction, generation, and evaluation.
- **"More retrieved text is always better."** Irrelevant or contradictory context can hurt answer quality and increases cost.
- **"RAG makes evaluation unnecessary."** Grounding must be measured; retrieval misses and unfaithful generations are common failure modes.
- **"RAG is the same as fine-tuning."** One changes the inference-time context; the other changes model parameters.

## Scope note

This knowledge base is a Markdown-only MVP. It deliberately does not implement embeddings, vector search, or RAG infrastructure. This note records the concept for future reference; it is not a design for the Second Brain.

## Related notes

- [Transformer Architecture](./transformer-architecture.md) — the model family commonly used as the generator.
- [Vector Embeddings](./vector-embeddings.md) — a common representation used by dense retrievers.
- [Artificial Intelligence and Machine Learning](../topics/ai-ml.md) — topic index.

## Sources

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) — Lewis et al., 2020; accessed 2026-11-05.
- [Retrieval-Augmented Generation for Large Language Models: A Survey](https://arxiv.org/abs/2312.10997) — Gao et al., 2023; accessed 2026-11-05.
