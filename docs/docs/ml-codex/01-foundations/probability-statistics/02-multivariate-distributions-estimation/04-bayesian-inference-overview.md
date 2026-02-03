---
sidebar_position: 5
---

# Bayesian Inference

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Update Our Beliefs About Parameters as We See Data?

MLE gives a single point estimate $\hat{\theta}$. But how confident should we be in that estimate? Bayesian inference maintains a full probability distribution over parameters, updating from a prior $p(\theta)$ to a posterior $p(\theta|D)$ as data arrives. This quantifies uncertainty naturally.

Consider these scenarios:
1. After seeing 3 heads in 3 coin flips, the MLE says $p = 1$. But our prior belief says that's unlikely. The Bayesian posterior gives a more reasonable distribution that accounts for both the data and our prior knowledge.
2. In Gaussian process regression, the posterior over functions gives not just a prediction but a credible interval, telling us where the model is uncertain.
3. Bayesian neural networks maintain distributions over weights, providing uncertainty estimates that are crucial for safety-critical applications.

Bayesian inference is the principled framework for learning under uncertainty.

---

## Topics to Cover

### Prior, Likelihood, and Posterior
- Bayes' theorem for parameters: $p(\theta|D) = \frac{p(D|\theta)p(\theta)}{p(D)}$
- Prior: $p(\theta)$ encodes beliefs before seeing data
- Likelihood: $p(D|\theta)$ is the data-generating model
- Posterior: $p(\theta|D)$ is the updated belief
- Evidence: $p(D) = \int p(D|\theta)p(\theta)d\theta$ (normalizing constant)

### Conjugate Priors
- Definition: prior and posterior belong to the same family
- Beta-Bernoulli: $\text{Beta}(\alpha, \beta)$ prior + Binomial data $\to$ $\text{Beta}(\alpha + k, \beta + n - k)$ posterior
- Normal-Normal: Gaussian prior on mean + Gaussian data $\to$ Gaussian posterior
- Gamma-Poisson, Dirichlet-Categorical

### Posterior Predictive Distribution
- $p(x^*|D) = \int p(x^*|\theta)p(\theta|D)d\theta$
- Averages predictions over all parameter values, weighted by posterior probability
- Automatically accounts for parameter uncertainty

### Worked Examples
- Beta-Binomial: coin flipping with prior belief
- Normal-Normal: estimating a mean with prior knowledge
- How the posterior interpolates between prior and data as $n$ grows

---

## Summary

**Answering the Central Question:** Bayesian inference updates beliefs via Bayes' theorem: $p(\theta|D) \propto p(D|\theta)p(\theta)$. The prior encodes initial beliefs, the likelihood connects parameters to data, and the posterior gives updated beliefs that quantify uncertainty. Conjugate priors (Beta-Bernoulli, Normal-Normal) yield closed-form posteriors. The posterior predictive $p(x^*|D) = \int p(x^*|\theta)p(\theta|D)d\theta$ averages over parameter uncertainty, providing calibrated predictions. As data grows, the posterior concentrates around the true parameter, and Bayesian and frequentist answers converge.

---

## Applications in Data Science and Machine Learning

- **Bayesian neural networks**: Distributions over weights for uncertainty quantification
- **Gaussian processes**: Non-parametric Bayesian regression with automatic uncertainty bands
- **Thompson sampling**: Bayesian approach to the exploration-exploitation tradeoff in bandits
- **Bayesian optimization**: Uses posterior uncertainty to decide where to evaluate an expensive objective function
- **Hierarchical models**: Place priors on priors (hyperpriors) to share statistical strength across groups

---

## Guided Problems

---

## References

1. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapters 1.2, 2.1-2.4
2. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 5
3. Gelman et al. - *Bayesian Data Analysis*, 3rd ed., Chapters 1-3
4. Blitzstein and Hwang - *Introduction to Probability*, 2nd ed., Chapter 12
