---
permalink: /blog/
title: "**Blog**"
author_profile: true
mathjax: true
redirect_from: 
---
---
layout: post
title: "VQ-VAE: How Neural Networks Learned to Speak in Symbols"
subtitle: "An illustrated, math-backed walkthrough of Neural Discrete Representation Learning"
tags: [deep learning, vq-vae, generative models, representation learning]
---

> Based on “Neural Discrete Representation Learning” (van den Oord, Vinyals, & Kavukcuoglu, NeurIPS 2017).

![Codebook sketch placeholder](/assets/vq-vae/codebook-grid.png)
*Figure: The encoder output snaps to the nearest code “cell” in a learned vocabulary (codebook).*

## 🌟 Why this paper still matters
Imagine if a neural net could invent its **own vocabulary** for perception. That’s the idea behind **VQ-VAE**: learn **discrete** latent tokens (like words) that represent high-level structure in images, speech, and video—**without labels**. This simple twist avoids the “posterior collapse” that plagues VAEs and paved the way for models like **VQ-VAE-2**, **DALL·E**, **Jukebox**, and modern neural codecs.

**Prefer watching first?**  
<iframe width="560" height="315" src="https://www.youtube.com/embed/VZFVUrYcig0" title="VQ-VAE Explained" frameborder="0" allowfullscreen></iframe>

---

## 🧱 Background in 60 seconds
**Autoencoder (AE):** compress \(x \to z\), reconstruct \(\hat{x}\).  
Loss: \(L_{\text{AE}}=\|x-\hat{x}\|^2\).

**Variational Autoencoder (VAE):** learns a distribution \(q(z|x)\), samples \(z\), reconstructs:
\[
L_{\text{VAE}}=\mathbb{E}_{q(z|x)}[-\log p(x|z)] + \mathrm{KL}\big(q(z|x)\|p(z)\big).
\]

**Problem — Posterior collapse:** powerful decoders (e.g., PixelCNN/LSTM) can ignore \(z\).  
We want a latent that the decoder **must** use, and ideally it should be **discrete** (closer to words/phonemes).

---

## 💡 The VQ-VAE idea
Replace continuous \(z\) with **indices into a learned codebook** \(e=\{e_1,\dots,e_K\}\).

**Pipeline**
1) **Encoder:** \(x \mapsto z_e(x)\) (continuous)  
2) **Quantize:** choose nearest codeword  
\[
k=\arg\min_j \|z_e(x)-e_j\|^2,\quad z_q(x)=e_k
\]
3) **Decoder:** reconstruct from \(z_q(x)\)


**Training objective**
\[
L = \underbrace{\|x-\hat{x}\|^2}_{\text{reconstruction}}
+ \underbrace{\|\mathrm{sg}[z_e(x)]-e\|_2^2}_{\text{codebook update}}
+ \beta\,\underbrace{\|z_e(x)-\mathrm{sg}[e]\|_2^2}_{\text{commitment}}
\]
`sg[·]` is *stop-gradient*.

**Why it works**
- Discrete lookup forces the decoder to condition on tokens → no collapse.  
- Straight-through gradient to the encoder keeps training stable.  
- The codebook becomes a **vocabulary of concepts**.

---

## 🧪 What the paper shows

### 🖼 Images (ImageNet 128×128)
- Latent grid: \(32\times32\times1\), codebook size \(K=512\) → ~40× compression.
- Reconstructions are coherent; slight blur only.
- Train a **PixelCNN prior** over the discrete codes and decode samples → realistic images (foxes, whales, reefs).

![Reconstruction placeholder](/assets/vq-vae/reconstruction-triptych.png)
*Original | Reconstruction | Sample from PixelCNN prior*

### 🔊 Speech (VCTK, 109 speakers)
- Encoder compresses waveform ~64×; tokens capture **content** (what is said), not speaker identity.
- **Speaker conversion:** same content, change the speaker id at the decoder → same sentence, new voice.
- Discovered **phoneme-like** clusters without labels (~49% phoneme accuracy vs ~7% random).

> Demos: <https://avdnoord.github.io/homepage/vqvae/>

### 🎮 Video (DeepMind Lab)
- Predict future frames **in latent space** conditioned on actions (e.g., “move forward”).
- Decode afterward → crisp sequences with consistent geometry.

---

## 📊 Numbers (CIFAR-10, bits/dim ↓)
| Model          | Latent      | Bits/Dim |
|----------------|-------------|----------|
| Continuous VAE | continuous  | 4.51     |
| **VQ-VAE**     | **discrete**| **4.67** |
| VIMCO          | discrete    | 5.14     |

VQ-VAE is the **first discrete-latent VAE** to approach continuous VAE likelihoods—while giving you a symbolic code.

---

## 🧭 Why it mattered (and still does)
- Made **discrete latents** easy to train → tokens for images/audio.
- Scales beautifully with strong priors (PixelCNN, Transformers).
- Influenced **VQ-VAE-2**, **DALL·E**, **Jukebox**, **EnCodec** and many modern tokenizers.

**Big picture:** VQ-VAE bridges continuous perception and discrete reasoning.

---

## 🧠 Closing thought
Humans think in **discrete** concepts: “edge,” “phoneme,” “chair.”  
VQ-VAE lets neural nets **learn such concepts** automatically—and then *speak* in them.

Whenever you see AI synthesizing images or music from tokens, you’re hearing echoes of this paper.

---

## 📚 References & links
- van den Oord, Vinyals, Kavukcuoglu. *Neural Discrete Representation Learning.* NeurIPS 2017.  
- Yannic Kilcher: *VQ-VAE Explained* (YouTube).  
- Follow-ups: VQ-VAE-2 (2019), DALL·E (2021), Jukebox (2020), EnCodec (2022).
