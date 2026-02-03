---
sidebar_position: 2
---

# Exponential Families

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: Is There a Unifying Framework for Common Distributions?

Bernoulli, Gaussian, Poisson, Exponential, Gamma, Beta, Categorical -- these distributions look different but share a common mathematical structure. The exponential family unifies them into a single framework with elegant properties: sufficient statistics, conjugate priors, and a direct connection to generalized linear models.

Consider these scenarios:
1. The sufficient statistic for a Gaussian is $(\sum x_i, \sum x_i^2)$. For any exponential family, the sufficient statistic has a fixed dimension regardless of sample size, enabling efficient data compression.
2. Every exponential family has a natural conjugate prior, making Bayesian inference tractable. The prior is also an exponential family with the same sufficient statistics.
3. Generalized linear models (logistic regression, Poisson regression, linear regression) each correspond to choosing a different exponential family for the response distribution.

Exponential families are the theoretical backbone of classical statistical ML.

---

## Topics to Cover

### Exponential Family Canonical Form
- $p(x|\eta) = h(x) \exp(\eta^T T(x) - A(\eta))$
- Natural parameter $\eta$, sufficient statistic $T(x)$, log-partition function $A(\eta)$, base measure $h(x)$
- Writing Bernoulli, Gaussian, Poisson, and others in this form

### Natural Parameters and Sufficient Statistics
- Natural parameters as the "canonical" parameterization
- Sufficient statistics: $T(x)$ captures all information about $\eta$ in the data
- Factorization theorem: $T$ is sufficient iff the likelihood factors through it

### Conjugate Priors for Exponential Families
- For any exponential family likelihood, the conjugate prior has the form $p(\eta) \propto \exp(\eta^T \nu - n_0 A(\eta))$
- The posterior updates simply by adding observed sufficient statistics
- Examples: Beta-Bernoulli, Gamma-Poisson, Normal-Normal

### Connection to Generalized Linear Models
- GLMs: $E[Y|x] = g^{-1}(w^Tx)$ where $g$ is the link function
- Each GLM corresponds to an exponential family for $Y$
- Canonical link: when $\eta = w^Tx$ (natural parameter equals linear predictor)

---

## Summary

**Answering the Central Question:** The exponential family $p(x|\eta) = h(x)\exp(\eta^T T(x) - A(\eta))$ unifies the most common distributions under a single framework. Its key properties are: (1) sufficient statistics $T(x)$ compress data without losing information about $\eta$; (2) the log-partition function $A(\eta)$ generates all moments via differentiation ($E[T(x)] = \nabla A(\eta)$, $\text{Var}(T(x)) = \nabla^2 A(\eta)$); (3) conjugate priors exist automatically; (4) GLMs connect exponential families to linear models via link functions.

---

## Applications in Data Science and Machine Learning

- **Generalized linear models**: Logistic regression (Bernoulli), Poisson regression (Poisson), and linear regression (Gaussian) are all GLMs based on exponential families
- **Sufficient statistics**: Enable efficient learning without storing all data points
- **Variational inference**: The exponential family structure enables mean-field variational inference with closed-form coordinate updates
- **Natural gradient descent**: The Fisher information of exponential families has a simple form, enabling efficient natural gradient computation
- **Boltzmann machines and energy-based models**: Follow exponential family structure with learned sufficient statistics

---

## Guided Problems

---

## References

1. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 2.4
2. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 9
3. Wainwright and Jordan - [*Graphical Models, Exponential Families, and Variational Inference*](https://people.eecs.berkeley.edu/~wainwrig/Papers/WaiJor08_FTML.pdf)
4. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 6.6
