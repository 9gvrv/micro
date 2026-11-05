---
id: vector-embeddings
title: Vector Embeddings
type: concept
tags:
  - embeddings
  - vector-representations
  - nlp
  - machine-learning
created: "2026-11-05"
updated: "2026-11-05"
related:
  - "./transformer-architecture.md"
  - "./retrieval-augmented-generation.md"
  - "../topics/ai-ml.md"
sources:
  - title: "Speech and Language Processing (3rd edition draft) — Chapter 6: Vector Semantics and Embeddings"
    url: https://web.stanford.edu/~jurafsky/slp3/6.pdf
    author: "Daniel Jurafsky and James H. Martin"
    accessed: "2026-11-05"
  - title: "Efficient Estimation of Word Representations in Vector Space"
    url: https://arxiv.org/abs/1301.3781
    author: "Mikolov et al."
    published: "2013"
    accessed: "2026-11-05"
  - title: "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"
    url: https://arxiv.org/abs/1908.10084
    author: "Reimers and Gurevych"
    published: "2019"
    accessed: "2026-11-05"
demo: true
---

# Vector Embeddings

> **Demonstration note.** This note is part of the MVP example set. It demonstrates the note schema and is not a personal knowledge entry. Replace or remove it only with human approval when the knowledge base goes into real use.

## Summary

A vector embedding represents a discrete item—such as a word, sentence, document, image, or user—as a fixed-length vector of real numbers. Models learn these vectors from data so that items used in similar ways or with similar meanings end up near each other in the vector space. Embeddings are used for semantic search, clustering, classification, recommendation, and retrieval.

## Key facts

- An embedding is a dense vector, typically with tens to thousands of dimensions. The dimension is a property of the model, not of the item.
- Individual dimensions are usually not directly interpretable as concepts. Meaning is distributed across the vector, although some dimensions can correlate with interpretable properties.
- **Static word embeddings** assign one vector per word type. Word2vec, for example, learns vectors by training a model to predict a word from its context or its context from a word. The same word receives the same vector regardless of sentence.
- **Contextual embeddings** produce different vectors for the same word in different contexts. Transformer-based language models are commonly used this way.
- **Sentence and document embeddings** represent longer spans. Sentence-BERT, for example, fine-tunes a BERT-style model with a siamese network objective so that semantically similar sentences have similar vectors and can be compared efficiently.
- **Cosine similarity** measures the angle between two vectors: `cos(a, b) = (a · b) / (‖a‖ ‖b‖)`. It ignores vector magnitude. Dot product and Euclidean distance are alternatives; the right choice depends on how the model was trained.
- Similarity scores are model- and task-specific. A threshold that works for one embedding model may be meaningless for another.
- Embeddings inherit patterns, including social biases, from their training data. They are not neutral representations of meaning.
- Common uses include semantic search, nearest-neighbor retrieval, clustering, deduplication, classification features, and recommendation.

## Interpretation

A high cosine similarity means the model places two items close together under its training objective. It does not by itself prove that the items are factually related, equivalent, or true. Antonyms and words that appear in similar contexts can be close neighbors. Embedding-based systems need task-specific evaluation rather than assuming that geometric proximity equals meaning.

Embedding quality also depends on the training objective and domain. A general-purpose sentence model may perform poorly on legal, medical, or code-specific text without adaptation or a domain-specific model.

## Common misconceptions

- **"Each dimension has a single meaning."** Dimensions are learned features and are usually distributed and entangled.
- **"Higher dimension always means better."** Larger vectors can capture more distinctions but cost more to store and compare; the right size depends on the task and data.
- **"Cosine similarity is always the correct metric."** It is common for normalized embeddings, but some models are trained for dot-product or Euclidean similarity.
- **"Embeddings understand truth."** They capture statistical regularities, not verified facts.
- **"Embeddings are a database."** They are a representation; storage, indexing, and retrieval are separate system concerns.

## Related notes

- [Transformer Architecture](./transformer-architecture.md) — the model family commonly used to produce contextual and sentence embeddings.
- [Retrieval-Augmented Generation](./retrieval-augmented-generation.md) — a system that uses retrieved passages, often found through embedding similarity, to ground generation.
- [Artificial Intelligence and Machine Learning](../topics/ai-ml.md) — topic index.

## Sources

- [Speech and Language Processing (3rd edition draft) — Chapter 6: Vector Semantics and Embeddings](https://web.stanford.edu/~jurafsky/slp3/6.pdf) — Daniel Jurafsky and James H. Martin; accessed 2026-11-05.
- [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781) — Mikolov et al., 2013; accessed 2026-11-05.
- [Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks](https://arxiv.org/abs/1908.10084) — Reimers and Gurevych, 2019; accessed 2026-11-05.
