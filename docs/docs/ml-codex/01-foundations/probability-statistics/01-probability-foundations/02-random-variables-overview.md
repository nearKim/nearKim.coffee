---
sidebar_position: 3
---

# Random Variables

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Mathematically Describe Uncertain Quantities?

We need a formal way to talk about quantities that take different values with different probabilities: the number of clicks on an ad, the height of a person, the pixel values in an image. Random variables give us this language, and their distributions (PMF, PDF, CDF) fully characterize their behavior.

Consider these scenarios:
1. The output of a coin flip is a discrete random variable taking values in $\{0, 1\}$ with a Bernoulli distribution. The number of heads in $n$ flips follows a Binomial distribution.
2. The waiting time until a radioactive decay is a continuous random variable described by a probability density function (PDF). The probability of the event occurring in an interval is the area under the PDF.
3. A neural network's output before softmax is a continuous random variable. After softmax, it becomes a probability distribution over classes, connecting continuous and discrete perspectives.

Random variables are the mathematical objects that represent uncertain data in ML.

---

## Topics to Cover

### Discrete Random Variables
- Definition: a function from the sample space to a countable set
- Probability mass function (PMF): $P(X = x)$
- Examples: Bernoulli, Binomial, Poisson, Geometric

### Continuous Random Variables
- Probability density function (PDF): $f_X(x)$ where $P(a \le X \le b) = \int_a^b f_X(x)dx$
- The PDF is not a probability (it can exceed 1)
- Examples: Uniform, Gaussian, Exponential

### Cumulative Distribution Function (CDF)
- $F_X(x) = P(X \le x)$
- Properties: non-decreasing, right-continuous, $F(-\infty) = 0$, $F(\infty) = 1$
- Relationship between CDF, PDF, and PMF

### Transformations of Random Variables
- If $Y = g(X)$, how to find the distribution of $Y$
- CDF method: $F_Y(y) = P(g(X) \le y)$
- PDF transformation: $f_Y(y) = f_X(g^{-1}(y)) \left|\frac{dg^{-1}}{dy}\right|$

---

## Summary

**Answering the Central Question:** A random variable $X$ is a function that assigns numerical values to outcomes of a random experiment. Its distribution is fully described by the PMF (discrete: $P(X=x)$), PDF (continuous: $f_X(x)$), or CDF ($F_X(x) = P(X \le x)$). Transformations of random variables produce new distributions via the CDF method or the change-of-variables formula. These tools allow us to model any uncertain quantity mathematically.

---

## Applications in Data Science and Machine Learning

- **Data modeling**: Choosing the right distribution family (Gaussian, Poisson, Bernoulli) to model features or targets
- **Generative models**: Defining distributions over data (VAEs, GANs, diffusion models)
- **Reparameterization trick**: Transforming a simple random variable (e.g., standard normal) to sample from a complex distribution
- **Quantile functions**: The inverse CDF is used for generating samples and quantile regression
- **Normalizing flows**: Repeated application of the change-of-variables formula to transform simple distributions into complex ones

---

## Guided Problems

---

## References

1. Blitzstein and Hwang - *Introduction to Probability*, 2nd ed., Chapters 3-5
2. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 1.2
3. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 2
4. Wasserman, Larry - *All of Statistics*, Chapters 2-3
