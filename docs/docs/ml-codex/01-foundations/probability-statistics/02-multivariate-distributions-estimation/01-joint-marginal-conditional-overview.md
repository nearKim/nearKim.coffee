---
sidebar_position: 2
---

# Joint, Marginal, and Conditional Distributions

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Work with Multiple Random Variables Together?

Machine learning models deal with collections of variables: features, labels, latent variables, and parameters. Understanding how these variables relate through their joint distribution, and how to extract information via marginalization and conditioning, is fundamental to probabilistic modeling.

Consider these scenarios:
1. A generative model defines $p(x, y) = p(y)p(x|y)$. To predict, we need $p(y|x)$, which requires Bayes' theorem and marginalization.
2. In a latent variable model, $p(x) = \int p(x|z)p(z)dz$. Computing this marginal likelihood requires integrating out the latent variable $z$.
3. The EM algorithm alternates between computing $p(z|x, \theta)$ (conditioning) and maximizing $E_{z|x}[\log p(x,z|\theta)]$ (expectation under a conditional distribution).

Joint, marginal, and conditional distributions are the building blocks of probabilistic ML.

---

## Topics to Cover

### Joint Distributions
- Joint PMF: $P(X = x, Y = y)$
- Joint PDF: $f_{X,Y}(x, y)$ where $P((X,Y) \in A) = \iint_A f_{X,Y}(x,y) \, dx \, dy$
- The product rule: $p(x, y) = p(x|y)p(y) = p(y|x)p(x)$

### Marginalization
- Discrete: $P(X = x) = \sum_y P(X = x, Y = y)$
- Continuous: $f_X(x) = \int f_{X,Y}(x, y) \, dy$
- The sum rule of probability

### Conditional Distributions
- $p(y|x) = p(x, y) / p(x)$
- Conditional expectation: $E[Y|X = x]$
- Law of total expectation: $E[Y] = E[E[Y|X]]$
- Law of total variance: $\text{Var}(Y) = E[\text{Var}(Y|X)] + \text{Var}(E[Y|X])$

---

## Summary

**Answering the Central Question:** Multiple random variables are described by their joint distribution $p(x, y)$. Marginalization ($p(x) = \int p(x,y)dy$) recovers individual distributions by summing/integrating out other variables. Conditioning ($p(y|x) = p(x,y)/p(x)$) gives the distribution of one variable given knowledge of another. The product rule $p(x,y) = p(y|x)p(x)$ connects these three operations and is the foundation of Bayes' theorem. The laws of total expectation and total variance allow computation by conditioning.

---

## Applications in Data Science and Machine Learning

- **Generative vs discriminative models**: Generative models define $p(x, y)$ and derive $p(y|x)$; discriminative models model $p(y|x)$ directly
- **Latent variable models**: VAEs, GMMs, and HMMs all require marginalizing over latent variables
- **EM algorithm**: Alternates between conditioning on latent variables (E-step) and maximizing the expected complete-data likelihood (M-step)
- **Graphical models**: Factor joint distributions using conditional independence: $p(x_1, \ldots, x_n) = \prod_i p(x_i | \text{parents}(x_i))$
- **Missing data**: Marginalization over missing features allows prediction with incomplete observations

---

## Guided Problems

---

## References

1. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 1.2, 2.1
2. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 2.2
3. Blitzstein and Hwang - *Introduction to Probability*, 2nd ed., Chapters 7-8
4. Koller and Friedman - *Probabilistic Graphical Models*, Chapter 2
