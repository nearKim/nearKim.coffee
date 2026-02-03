---
sidebar_position: 4
---

# Maximum Likelihood Estimation

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Find the Best Parameters for a Probabilistic Model?

Given a model $p(x|\theta)$ and observed data $x_1, \ldots, x_n$, how do we choose $\theta$? Maximum likelihood estimation (MLE) chooses the parameters that make the observed data most probable. It is the most widely used estimation method in ML and connects directly to common loss functions.

Consider these scenarios:
1. Fitting a Gaussian to data: the MLE for $\mu$ is the sample mean and for $\sigma^2$ is the sample variance. No optimization algorithm needed.
2. Logistic regression maximizes the Bernoulli likelihood, which is equivalent to minimizing the binary cross-entropy loss. The "loss function" and "negative log-likelihood" are the same object.
3. Adding a prior to the MLE gives MAP estimation, which is equivalent to adding a regularization term to the loss. L2 regularization corresponds to a Gaussian prior.

MLE is the bridge between probability and optimization in ML.

---

## Topics to Cover

### Maximum Likelihood Estimation
- Likelihood function: $L(\theta) = \prod_{i=1}^n p(x_i | \theta)$
- Log-likelihood: $\ell(\theta) = \sum_{i=1}^n \log p(x_i | \theta)$
- MLE: $\hat{\theta}_{MLE} = \arg\max_\theta \ell(\theta)$
- Examples: Bernoulli, Gaussian, Poisson, Exponential

### MAP Estimation
- $\hat{\theta}_{MAP} = \arg\max_\theta [\log p(D|\theta) + \log p(\theta)]$
- MAP = MLE with regularization
- Gaussian prior $\to$ L2 regularization, Laplace prior $\to$ L1 regularization

### Properties of Estimators
- Consistency: $\hat{\theta}_n \to \theta^*$ as $n \to \infty$
- Efficiency: achieving the minimum possible variance
- Asymptotic normality: $\sqrt{n}(\hat{\theta} - \theta^*) \to \mathcal{N}(0, I^{-1}(\theta^*))$

### Fisher Information and the Cramer-Rao Bound
- Fisher information: $I(\theta) = E\left[\left(\frac{\partial}{\partial\theta}\log p(X|\theta)\right)^2\right]$
- Cramer-Rao bound: $\text{Var}(\hat{\theta}) \ge I(\theta)^{-1}$ for any unbiased estimator
- The MLE achieves the Cramer-Rao bound asymptotically (efficient estimator)

---

## Summary

**Answering the Central Question:** MLE finds parameters by maximizing $\ell(\theta) = \sum_i \log p(x_i|\theta)$, which is equivalent to minimizing the average negative log-likelihood (the loss function). MAP estimation adds a prior term, corresponding to regularization. The Fisher information $I(\theta)$ measures how informative the data is about $\theta$, and the Cramer-Rao bound $\text{Var}(\hat{\theta}) \ge I^{-1}$ sets a fundamental limit on estimation accuracy. The MLE is asymptotically efficient, consistent, and normally distributed.

---

## Applications in Data Science and Machine Learning

- **Loss functions as negative log-likelihoods**: MSE (Gaussian), cross-entropy (Bernoulli/Categorical), Poisson regression loss
- **Regularization as MAP**: L2 = Gaussian prior, L1 = Laplace prior, dropout $\approx$ variational inference
- **Fisher information in optimization**: The natural gradient uses $I(\theta)^{-1}\nabla\ell$ instead of $\nabla\ell$
- **Model comparison**: Likelihood ratio tests, AIC, and BIC all use the likelihood
- **EM algorithm**: Maximizes a lower bound on the log-likelihood when latent variables are present

---

## Guided Problems

---

## References

1. Wasserman, Larry - *All of Statistics*, Chapter 9
2. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapters 1.2, 2.3
3. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 6
4. CMU 36-700 - [*Statistical Machine Learning*](https://www.stat.cmu.edu/~larry/=stat705/)
