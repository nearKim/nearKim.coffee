---
sidebar_position: 2
---

# Integration for ML

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Compute the Sums and Averages That Probability Requires?

Probability and statistics are built on integration: expectations are integrals, marginalizations require integrating out variables, and normalizing constants ensure densities integrate to one. Many of these integrals have no closed form, making approximation methods essential.

Consider these scenarios:
1. The posterior in Bayesian inference is $p(\theta | D) = \frac{p(D|\theta)p(\theta)}{p(D)}$. The denominator $p(D) = \int p(D|\theta)p(\theta)d\theta$ is often an intractable integral.
2. Computing $E[f(X)]$ for a complex distribution requires $\int f(x)p(x)dx$. Monte Carlo approximation replaces this with a sample average.
3. In normalizing flows, the change-of-variables formula transforms integrals via the Jacobian determinant, connecting integration to linear algebra.

Integration is the bridge between probability models and computable quantities.

---

## Topics to Cover

### Computing Expectations
- $E[f(X)] = \int f(x)p(x)dx$ (continuous) or $\sum_x f(x)p(x)$ (discrete)
- Linearity of expectation
- Expectations of common distributions

### Marginalization
- $p(x) = \int p(x, y)dy$: integrating out variables
- Applications in latent variable models
- Connection to the sum rule of probability

### Normalizing Constants
- $p(x) = \frac{1}{Z}\tilde{p}(x)$ where $Z = \int \tilde{p}(x)dx$
- Partition functions in exponential families and energy-based models
- When $Z$ is tractable vs intractable

### Monte Carlo Integration
- Basic Monte Carlo: $\hat{I} = \frac{1}{N}\sum_{i=1}^N f(x_i)$ where $x_i \sim p$
- Convergence rate: $O(1/\sqrt{N})$ regardless of dimension
- Importance sampling: $E_p[f] = E_q\left[\frac{f(x)p(x)}{q(x)}\right]$

### Change of Variables with the Jacobian
- $\int_A f(x)dx = \int_{g^{-1}(A)} f(g(u)) |\det(J_g(u))| du$
- Connection to [Determinants](../../linear-algebra/01-core-linear-system-theory/05-determinants-overview.md)
- Application to probability density transformation

---

## Summary

**Answering the Central Question:** Integration is how we compute expectations ($E[f(X)] = \int f(x)p(x)dx$), marginalize out variables ($p(x) = \int p(x,y)dy$), and normalize densities ($Z = \int \tilde{p}(x)dx$). When these integrals are intractable, Monte Carlo methods approximate them with sample averages that converge at $O(1/\sqrt{N})$. The change-of-variables formula with the Jacobian determinant allows us to transform integrals between coordinate systems, which is fundamental to normalizing flows and density estimation.

---

## Applications in Data Science and Machine Learning

- **Bayesian inference**: Computing posterior distributions requires marginalizing over parameters (intractable integrals motivate MCMC and variational inference)
- **Expectation-maximization (EM)**: The E-step computes expected sufficient statistics, requiring integration over latent variables
- **Normalizing flows**: The change-of-variables formula with Jacobian determinants enables tractable density estimation
- **Monte Carlo methods**: MCMC, importance sampling, and particle filters approximate intractable integrals
- **Variational inference**: The ELBO is an expectation that lower-bounds the log-evidence

---

## Guided Problems

---

## References

1. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 6.3
2. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 11 (Sampling Methods)
3. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 24 (Monte Carlo Methods)
4. Papamakarios et al. - [*Normalizing Flows for Probabilistic Modeling and Inference*](https://arxiv.org/abs/1912.02762) (2021)
