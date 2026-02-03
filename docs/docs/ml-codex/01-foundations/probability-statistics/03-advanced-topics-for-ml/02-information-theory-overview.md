---
sidebar_position: 3
---

# Information Theory

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Measure Information, Surprise, and the Distance Between Distributions?

Information theory, originally developed for communication, provides the mathematical tools for measuring uncertainty (entropy), comparing distributions (KL divergence), and quantifying shared information (mutual information). These concepts appear throughout ML, from loss functions to generative models.

Consider these scenarios:
1. The cross-entropy loss used to train classifiers is literally the cross-entropy between the true label distribution and the model's predicted distribution.
2. The KL divergence $D_{\text{KL}}(q \| p)$ measures how far an approximate posterior $q$ is from the true posterior $p$. Variational inference minimizes this divergence.
3. Mutual information $I(X; Y)$ measures how much knowing $X$ reduces uncertainty about $Y$. It is used in feature selection, decision tree splitting, and representation learning.

Information theory gives ML its fundamental notions of "goodness of fit" and "information content."

---

## Topics to Cover

### Entropy
- Shannon entropy: $H(X) = -\sum_x p(x)\log p(x)$ (discrete) or $h(X) = -\int p(x)\log p(x)dx$ (differential)
- Interpretation: average surprise, average number of bits to encode
- Properties: non-negative, maximized by uniform (discrete) or Gaussian (given mean and variance)

### Cross-Entropy
- $H(p, q) = -\sum_x p(x)\log q(x)$
- Interpretation: average bits needed to encode data from $p$ using code optimized for $q$
- $H(p, q) = H(p) + D_{\text{KL}}(p \| q)$
- Connection to the cross-entropy loss in classification

### KL Divergence
- $D_{\text{KL}}(p \| q) = \sum_x p(x)\log\frac{p(x)}{q(x)} \ge 0$
- Not symmetric: $D_{\text{KL}}(p \| q) \neq D_{\text{KL}}(q \| p)$
- Forward KL ($D_{\text{KL}}(p \| q)$): mean-seeking; Reverse KL ($D_{\text{KL}}(q \| p)$): mode-seeking
- Connection to likelihood: minimizing $D_{\text{KL}}(p_{\text{data}} \| p_\theta)$ = maximizing likelihood

### Mutual Information
- $I(X; Y) = H(X) - H(X|Y) = D_{\text{KL}}(p(x,y) \| p(x)p(y))$
- Measures dependence beyond linear correlation
- Properties: $I(X; Y) \ge 0$, $I(X; Y) = 0$ iff $X \perp Y$

---

## Summary

**Answering the Central Question:** Entropy $H(X) = -\sum p(x)\log p(x)$ measures the inherent uncertainty in a distribution. Cross-entropy $H(p, q)$ measures the cost of using distribution $q$ to encode data from $p$. KL divergence $D_{\text{KL}}(p \| q) = H(p, q) - H(p)$ measures the extra cost, and is always non-negative (Gibbs' inequality). Mutual information $I(X; Y)$ measures the total dependence between variables. These quantities appear directly as loss functions, optimization objectives, and information measures throughout ML.

---

## Applications in Data Science and Machine Learning

- **Cross-entropy loss**: The standard classification loss is $H(p_{\text{true}}, p_\theta) = -\sum y \log \hat{y}$
- **Variational inference**: The ELBO maximizes a lower bound on $\log p(x)$, equivalent to minimizing $D_{\text{KL}}(q \| p_{\text{posterior}})$
- **GANs**: Some formulations minimize $f$-divergences related to KL divergence
- **Decision trees**: Split criteria (information gain) use entropy and mutual information
- **InfoNCE and contrastive learning**: Maximize a lower bound on mutual information between representations
- **Rate-distortion theory**: The information bottleneck method trades off compression (rate) and prediction (distortion)

---

## Guided Problems

---

## References

1. Cover and Thomas - *Elements of Information Theory*, 2nd ed., Chapters 2, 8
2. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 1.6
3. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 2.8
4. Goodfellow, Bengio, and Courville - *Deep Learning*, Chapter 3.13
