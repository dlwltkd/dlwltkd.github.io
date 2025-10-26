---
permalink: /blog/
title: "**Blog**"
author_profile: true
mathjax: true
redirect_from: 
---

---
layout: post
title: "VQ-VAE: When Neural Networks Learned to Speak in Symbols"
subtitle: "A big-picture, math-backed, visually guided walkthrough of Neural Discrete Representation Learning (2017)"
date: 2025-10-26
tags: [deep learning, vq-vae, generative models, representation learning]
mathjax: true
---

> Inspired by **“Neural Discrete Representation Learning”** by Aäron van den Oord, Oriol Vinyals, and Koray Kavukcuoglu (NeurIPS 2017).

![Codebook sketch placeholder](/assets/vq-vae/codebook-grid.png)
*Figure: Encoder outputs live in a continuous space but get snapped to the nearest code in a learned dictionary. Each code acts like a vocabulary item.*

---

## 1. The big picture

Before 2017, unsupervised generative models were great at drawing or speaking, yet weak at **structuring** what they learned. Most representations were continuous vectors without a notion of **tokens** or **vocabulary**. There was little separation between the rough signal and the meaningful concept.  

**VQ-VAE** offered a surprisingly simple idea that changed things. It taught networks to **describe data with a learned discrete codebook**, a compact set of embeddings that behave like symbols. These symbols are not labeled by humans. They emerge from data. The model chooses them because they help reconstruct and predict the world efficiently.

This shift matters for two reasons. First, discrete tokens force models to use a **meaningful bottleneck**. Second, tokens connect naturally to language, compression, and long-range structure. That combination quietly seeded the design of many later systems that treat images and audio as **tokens** to be generated with powerful sequence models.

> Prefer a quick video overview first  
> <iframe width="560" height="315" src="https://www.youtube.com/embed/VZFVUrYcig0" title="VQ-VAE Explained" frameborder="0" allowfullscreen></iframe>

---

## 2. A short background: from AEs and VAEs to discrete latents

**Autoencoder (AE).** Compress input \(\\(x\\)\) to a latent \(\\(z\\)\) and reconstruct \(\\(\\hat{x}\\)\). The squared error objective is

$$
L_{\\mathrm{AE}} \= \\lVert x \- \\hat{x} \\rVert\_2^2
$$

AEs learn useful features but the latent is continuous and unconstrained.

**Variational Autoencoder (VAE).** VAEs add a probabilistic latent and optimize

$$
L\_{\\mathrm{VAE}} \= \\mathbb{E}\_{q(z\\mid x)}\\bigl\[\-\\log p(x\\mid z)\\bigr] \+ \\mathrm{KL}\\bigl(q(z\\mid x) \\Vert p(z)\\bigr)
$$

This encourages good reconstructions and a well\-behaved latent distribution. Yet with a very strong decoder, the model may **ignore** the latent. This is the well known **posterior collapse** problem. We want a bottleneck that is simple, stable, and hard to bypass.

---

## 3. The VQ\-VAE idea: quantize the latent into a learned codebook

VQ\-VAE keeps the AE structure but replaces continuous latents with **indices** into a **codebook** \(\\(E \= \\{e\_1, \\dots, e\_K\\}\\)\). The encoder still outputs a continuous vector \(\\(z\_e(x)\\)\). The model then performs **vector quantization** to pick the nearest code.

**Nearest code lookup**

$$
k \= \\arg\\min\_j \\lVert z\_e(x) \- e\_j \\rVert\_2^2, 
\\qquad
z\_q(x) \= e\_k
$$

**Pipeline diagram**


The decoder receives \(\\(z\_q(x)\\)\), not \(\\(z\_e(x)\\)\). This forces the model to communicate through a finite set of symbols that it learns to be useful.

**Training objective**  
VQ\-VAE uses a three\-term loss

$$
L \= 
\\underbrace{\\lVert x \- \\hat{x} \\rVert\_2^2}\_{\\text{reconstruction}}
\+ 
\\underbrace{\\lVert \\mathrm{sg}\\bigl\[z\_e(x)\\bigr] \- e \\rVert\_2^2}\_{\\text{codebook update}}
\+ 
\\beta\\,\\underbrace{\\lVert z\_e(x) \- \\mathrm{sg}\\bigl\[e\\bigr] \\rVert\_2^2}\_{\\text{commitment}}
$$

where \(\\(\\mathrm{sg}\[\\cdot]\\)\) is the **stop\-gradient** operator. The second term moves code vectors toward encoder outputs. The third term keeps the encoder close to the chosen code instead of drifting.

**Why this avoids collapse**  
The decoder only sees discrete codes. It cannot side\-step them. If it wants to reconstruct well, it must rely on symbols that summarize the input. Over time those symbols become a compact **vocabulary of shared concepts**.

---

## 4. What the paper demonstrates across modalities

### Images: compress and sample through tokens

- ImageNet at 128×128  
- Latent grid around 32×32×1 with \(\\(K\=512\\)\) codes  
- Effective compression about 40× relative to raw pixels

Reconstructions preserve global structure and object identity. To **generate** images, the authors train a **PixelCNN prior** over the discrete code grid. Sampling codes from that prior and decoding yields coherent novel images.

![Reconstruction placeholder](/assets/vq-vae/reconstruction-triptych.png)
*Original at left, reconstruction in the middle, and a new sample decoded from a PixelCNN prior at right.*

### Speech: phoneme\-like tokens without labels

- VCTK dataset with 109 speakers  
- Encoder compresses waveform by roughly 64×  
- Decoder can be conditioned on a speaker identity

The quantized tokens capture **content** rather than **voice**. Swap the speaker identity while keeping the tokens and you get **speaker conversion**. Without any phoneme supervision, the tokens align with phoneme classes significantly better than chance.

> Hear examples here  
> <https://avdnoord.github.io/homepage/vqvae/>

### Video: predict futures in latent space

On DeepMind Lab frames, the model predicts future **codes** given an action sequence, then decodes to pixels. Planning in latent space makes long rollouts more stable and visually consistent than naive pixel forecasting.

---

## 5. A compact comparison

On CIFAR\-10, likelihood is often summarized as bits per dimension. Lower is better.

| Model | Latent | Bits/Dim |
|:--|:--|:--|
| Continuous VAE | continuous | 4\.51 |
| **VQ\-VAE** | **discrete** | **4\.67** |
| VIMCO | discrete | 5\.14 |

VQ\-VAE is the first discrete latent model to approach continuous VAE performance while giving you interpretability and a usable symbol interface.

---

## 6. What this paper led to

**Hierarchical discrete image models.**  
**VQ\-VAE\-2** stacks codebooks at multiple spatial scales. Higher levels capture layout. Lower levels handle texture and detail. Samples are diverse and high fidelity.

**Tokenized image generation.**  
**DALL·E** and related systems tokenize images with a VQ\-style encoder, then train a text\-conditioned transformer to generate image tokens. Decoding those tokens creates the final picture. Text and image now live in compatible discrete spaces.

**Neural audio codecs and music generation.**  
**SoundStream** and **EnCodec** learn quantized audio tokens that support high\-quality, low bitrate streaming. **Jukebox** composes music by modeling long sequences of discrete audio codes.

**Multimodal tokenization.**  
Modern vision, audio, and speech models often use learned tokenizers. Turning continuous signals into discrete symbols makes it natural to apply language model tooling such as transformers and sequence priors.

The common thread is clear. Treat perception as **tokens**. Learn those tokens from data. Model them with the same families of sequence models that work so well for text.

---

## 7. Why discreteness feels right

Humans describe the world with **categories**. We hear phonemes, we name objects, we reason in steps. Discrete codes encourage models to discover those reusable building blocks. They also make long\-range prediction easier because tokens are more stable than raw pixels or raw waveforms.

From an engineering perspective, tokens enable compression, caching, and modular priors. From a scientific perspective, they are a step toward unifying statistical learning with symbolic structure.

---

## 8. Conclusion

VQ\-VAE is more than a training trick. It is a bridge between continuous perception and discrete reasoning. By learning a small dictionary of codes, a network acquires a vocabulary that captures what truly matters in the data. That vocabulary powers generation, transfer, and control.

When an image model writes with visual tokens or a speech model speaks through audio tokens, you can trace the idea back to this paper. VQ\-VAE showed that neural networks can learn to **speak in symbols**, and that those symbols can be the foundation of modern generative AI.

---

## Appendix: equations at a glance

**Nearest code and quantized latent**

$$
k = \arg\min_j \lVert z_e(x) - e_j \rVert_2^2,
\qquad
z_q(x) = e_k
$$

**Three\-term training loss**

$$
L = \lVert x - \hat{x} \rVert_2^2 
+ \lVert \mathrm{sg}\bigl[z_e(x)\bigr] - e \rVert_2^2 
+ \beta\,\lVert z_e(x) - \mathrm{sg}\bigl[e\bigr] \rVert_2^2
$$

**VAE objective for reference**

$$
L_{\mathrm{VAE}} = \mathbb{E}_{q(z\mid x)}\bigl[ -\log p(x\mid z) \bigr]
+ \mathrm{KL}\bigl(q(z\mid x) \Vert p(z)\bigr)
$$

---

## References and further reading

- van den Oord, Vinyals, Kavukcuoglu. Neural Discrete Representation Learning. NeurIPS 2017.  
- Razavi, van den Oord, Vinyals. Generating Diverse High\-Fidelity Images with VQ\-VAE\-2. 2019\.  
- OpenAI. DALL·E: Creating Images from Text. 2021\.  
- Défossez et al. High Fidelity Neural Audio Compression (EnCodec). 2022\.  
- Yannic Kilcher. VQ\-VAE Explained. YouTube.

---

### Author notes for Jekyll and MathJax

- Inline math uses standard delimiters \\( ... \\).  
- Display math uses $$ on their own lines, with a blank line after each block.  
- Backslashes are escaped once in the Markdown source so the generated HTML still contains the raw delimiters.  
- Avoid trailing backslashes at the end of lines inside aligned environments.  
- Keep the MathJax config centralized in `_includes/footer/custom.html` and set `mathjax: true` in front matter on pages that need it.  
- Prefer MathJax macros such as \\(\\cdot\\) and \\(\\mathrm\\{\\}\\) instead of Unicode glyphs in formulas.  
