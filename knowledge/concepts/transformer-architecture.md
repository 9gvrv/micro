---
id: transformer-architecture
title: Transformer Architecture
type: concept
tags:
  - transformers
  - deep-learning
  - nlp
  - attention
created: "2026-11-05"
updated: "2026-11-05"
related:
  - "./vector-embeddings.md"
  - "./retrieval-augmented-generation.md"
  - "../topics/ai-ml.md"
sources:
  - title: "Attention Is All You Need"
    url: https://arxiv.org/abs/1706.03762
    author: "Vaswani et al."
    published: "2017"
    accessed: "2026-11-05"
  - title: "The Illustrated Transformer"
    url: https://jalammar.github.io/illustrated-transformer/
    author: "Jay Alammar"
    published: "2018"
    accessed: "2026-11-05"
  - title: "RoFormer: Enhanced Transformer with Rotary Position Embedding"
    url: https://arxiv.org/abs/2104.09864
    author: "Su et al."
    published: "2021"
    accessed: "2026-11-05"
  - title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
    url: https://arxiv.org/abs/1810.04805
    author: "Devlin et al."
    published: "2019"
    accessed: "2026-11-05"
demo: true
---

# Transformer Architecture

> **Demonstration note.** This note is part of the MVP example set. It demonstrates the note schema and is not a personal knowledge entry. Replace or remove it only with human approval when the knowledge base goes into real use.

## Summary

The Transformer is a neural-network architecture introduced by Vaswani et al. in 2017 for sequence-to-sequence tasks such as machine translation. It replaces recurrence and convolution with attention mechanisms, allowing training to parallelize across sequence positions. Transformer variants underpin most modern large language models.

## Key facts

- The original Transformer is an encoder-decoder model. The encoder builds contextual representations of the input; the decoder generates the output one token at a time during inference.
- Token identities are converted to embeddings, and positional information is added because self-attention by itself has no notion of order. The original paper used fixed sinusoidal positional encodings; later models commonly use learned or rotary positional schemes.
- **Scaled dot-product attention** computes `softmax(QKᵀ / √d_k) V`, where `Q`, `K`, and `V` are query, key, and value matrices and `d_k` is the key dimension. Scaling by `√d_k` keeps the softmax inputs from growing too large as the dimension increases.
- **Multi-head attention** runs several attention operations in parallel with learned projections, then concatenates and projects the results. Different heads can capture different relationships.
- An encoder layer contains multi-head self-attention and a position-wise feed-forward network. In the original paper, each sublayer has a residual connection followed by layer normalization.
- A decoder layer adds masked self-attention, which prevents a position from attending to later positions, and cross-attention over the encoder output. The causal mask is what makes autoregressive next-token generation possible.
- Full self-attention compares every position with every other position, so its time and memory cost grow quadratically with sequence length. This is a central motivation for efficient-attention and long-context research.
- Training can process all positions of a known sequence in parallel. Autoregressive inference remains sequential because each generated token becomes part of the context for the next one.
- The same building blocks are used in encoder-only models such as BERT, which use bidirectional self-attention, and in decoder-only models, which use causal self-attention for language modeling.

## How the pieces fit together

1. Tokenize the input and look up token embeddings.
2. Add positional information.
3. Pass the sequence through stacked encoder layers of self-attention and feed-forward networks.
4. In a decoder, combine masked self-attention over previously generated tokens with cross-attention over the encoder output.
5. Project the final representations to vocabulary logits and select the next token.

The original paper's headline result was that this architecture achieved strong translation quality while being more parallelizable than recurrent models. The broader significance is that attention-based blocks scale well and can be trained on large text corpora.

## Interpretation

Attention weights are sometimes treated as a complete explanation of a model's behavior. They show where a head allocates attention, but they do not by themselves establish causal importance or human-interpretable reasoning. Treat attention visualization as one diagnostic among several.

## Common misconceptions

- **"Transformers are inherently recurrent."** They are not; sequence order is supplied through positional information and masking.
- **"Self-attention has memory across requests."** A Transformer processes the context it is given. Any persistent memory must come from the surrounding system.
- **"Attention weights explain the output."** They are a useful signal, not a full causal explanation.
- **"The original architecture is the only Transformer."** Encoder-only, decoder-only, and encoder-decoder variants are all common.

## Related notes

- [Vector Embeddings](./vector-embeddings.md) — how tokens, sentences, and documents are represented as vectors.
- [Retrieval-Augmented Generation](./retrieval-augmented-generation.md) — a system that supplies retrieved text to a generative model.
- [Artificial Intelligence and Machine Learning](../topics/ai-ml.md) — topic index.

## Sources

- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — Vaswani et al., 2017; accessed 2026-11-05.
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) — Jay Alammar, 2018; accessed 2026-11-05.
- [RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864) — Su et al., 2021; accessed 2026-11-05.
- [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805) — Devlin et al., 2019; accessed 2026-11-05.
