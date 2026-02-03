---
sidebar_position: 5
---

# Expectation and Variance

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Summarize a Distribution with a Few Numbers?

A full distribution contains all the information about a random variable, but we often need concise summaries: the average value (expectation), the spread (variance), and the relationships between variables (covariance and correlation). These summary statistics drive both the theory and practice of ML.

Consider these scenarios:
1. The expected loss $E[L(\theta)]$ is what we actually minimize in machine learning. Empirical risk minimization approximates this expectation with a sample average.
2. The bias-variance tradeoff decomposes prediction error into squared bias and variance. Understanding variance is essential for model selection.
3. The covariance matrix of features determines the shape of data clusters and drives PCA, Gaussian discriminant analysis, and many other methods.

Expectations and variances are the language of statistical learning theory.

---

## Topics to Cover

### Expectation
- Discrete: $E[X] = \sum_x x \cdot P(X=x)$
- Continuous: $E[X] = \int x f_X(x) dx$
- Linearity: $E[aX + bY] = aE[X] + bE[Y]$ (always, even without independence)
- Law of the unconscious statistician (LOTUS): $E[g(X)] = \int g(x)f_X(x)dx$

### Variance
- $\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$
- $\text{Var}(aX + b) = a^2\text{Var}(X)$
- Standard deviation: $\sigma = \sqrt{\text{Var}(X)}$

### Covariance and Correlation
- $\text{Cov}(X, Y) = E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y]$
- If $X, Y$ independent then $\text{Cov}(X, Y) = 0$ (but not conversely)
- Correlation: $\rho(X, Y) = \text{Cov}(X, Y) / (\sigma_X \sigma_Y)$, always in $[-1, 1]$
- The covariance matrix $\Sigma$ for a random vector

### Moments and Moment Generating Functions
- $k$-th moment: $E[X^k]$
- Moment generating function: $M_X(t) = E[e^{tX}]$
- MGF uniquely determines the distribution (when it exists)

---

## Summary

**Answering the Central Question:** The expectation $E[X]$ gives the "center" of a distribution, the variance $\text{Var}(X)$ measures its spread, and the covariance $\text{Cov}(X, Y)$ captures linear dependence between two variables. Linearity of expectation is the most useful property in probability, holding universally without independence assumptions. The moment generating function $M_X(t) = E[e^{tX}]$ encodes all moments and uniquely determines the distribution, serving as a powerful theoretical tool.

---

## Applications in Data Science and Machine Learning

- **Empirical risk minimization**: The training loss approximates $E[L(\theta)]$ via the law of large numbers
- **Bias-variance decomposition**: $E[(y - \hat{f}(x))^2] = \text{Bias}^2 + \text{Variance} + \text{Irreducible noise}$
- **Covariance matrices**: Central to PCA, Gaussian discriminant analysis, Mahalanobis distance, and whitening
- **Batch normalization**: Uses running estimates of $E[X]$ and $\text{Var}(X)$ to normalize activations
- **Law of total variance**: $\text{Var}(Y) = E[\text{Var}(Y|X)] + \text{Var}(E[Y|X])$ decomposes variance into explained and unexplained components

---

## Guided Problems

---

## References

1. Blitzstein and Hwang - *Introduction to Probability*, 2nd ed., Chapters 4, 7
2. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 6.4
3. Wasserman, Larry - *All of Statistics*, Chapter 3
4. CMU 36-700 - [*Statistical Machine Learning*](https://www.stat.cmu.edu/~larry/=stat705/)
