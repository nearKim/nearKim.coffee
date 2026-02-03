---
sidebar_position: 4
---

# Common Distributions

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: Which Distribution Families Appear Most in Machine Learning?

A handful of distribution families appear again and again in ML: Gaussian for continuous data and noise, Bernoulli for binary outcomes, Categorical for classification, Poisson for counts. Knowing their properties, conjugacies, and relationships is essential for building and understanding probabilistic models.

Consider these scenarios:
1. Linear regression assumes Gaussian noise: $y = X\beta + \epsilon$ where $\epsilon \sim \mathcal{N}(0, \sigma^2)$. This assumption leads to the least squares loss.
2. Logistic regression models binary outcomes with a Bernoulli distribution: $y \sim \text{Bernoulli}(\sigma(w^Tx))$. The loss function is the negative log-likelihood (binary cross-entropy).
3. The Beta distribution is the conjugate prior for the Bernoulli, making Bayesian updating analytically tractable.

Knowing distributions means knowing which loss functions, priors, and likelihoods to use.

---

## Topics to Cover

### Discrete Distributions
- **Bernoulli($p$)**: binary outcome, $P(X=1)=p$, mean $p$, variance $p(1-p)$
- **Binomial($n, p$)**: number of successes in $n$ trials
- **Poisson($\lambda$)**: count of rare events, $P(X=k) = e^{-\lambda}\lambda^k/k!$
- **Categorical($\pi$)** and **Multinomial**: multi-class generalization

### Continuous Distributions
- **Uniform($a, b$)**: constant density on $[a, b]$
- **Gaussian($\mu, \sigma^2$)**: the normal distribution, bell curve, CLT
- **Exponential($\lambda$)**: memoryless waiting time
- **Gamma($\alpha, \beta$)**: generalization of Exponential, conjugate prior for Poisson rate
- **Beta($\alpha, \beta$)**: distribution on $[0, 1]$, conjugate prior for Bernoulli

### Relationships Between Distributions
- Binomial $\to$ Poisson (rare events limit)
- Binomial $\to$ Gaussian (CLT)
- Gamma $\to$ Exponential (special case $\alpha = 1$)
- Beta-Binomial conjugacy
- Normal-Normal conjugacy

---

## Summary

**Answering the Central Question:** The core distribution families in ML are: Bernoulli/Binomial (binary/count data, logistic regression), Categorical/Multinomial (classification), Poisson (event counts), Gaussian (continuous data, noise), Exponential/Gamma (rates, waiting times), and Beta (probabilities, priors). Each has known mean, variance, and moment generating function. Relationships between them (limits, conjugacies, special cases) simplify both theoretical analysis and practical computation.

---

## Applications in Data Science and Machine Learning

- **Gaussian noise assumption**: Leads to MSE loss in regression
- **Bernoulli/Categorical likelihood**: Leads to cross-entropy loss in classification
- **Poisson regression**: Modeling count data (click counts, word frequencies)
- **Conjugate priors**: Beta-Bernoulli, Gamma-Poisson, Normal-Normal enable closed-form Bayesian updates
- **Mixture models**: Gaussian mixture models (GMMs) combine multiple Gaussians for density estimation and clustering

---

## Guided Problems

---

## References

1. Blitzstein and Hwang - *Introduction to Probability*, 2nd ed., Chapters 3-8
2. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 2.3-2.4
3. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 2
4. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 6.2
