---
sidebar_position: 7
---

# Section 2: Problems

University-level exam questions for Multivariate Distributions and Estimation.

## Joint, Marginal, and Conditional Distributions

### Problem 1.1
Let $(X, Y)$ have joint density $f(x, y) = 2$ for $0 \le x \le y \le 1$. Find the marginal densities $f_X(x)$ and $f_Y(y)$, and the conditional density $f_{X|Y}(x|y)$.

**Difficulty**: Medium

### Problem 1.2
Prove the law of total variance: $\text{Var}(Y) = E[\text{Var}(Y|X)] + \text{Var}(E[Y|X])$.

**Difficulty**: Hard

## The Multivariate Gaussian

### Problem 2.1
Let $\begin{bmatrix} X \\ Y \end{bmatrix} \sim \mathcal{N}\left(\begin{bmatrix} 1 \\ 2 \end{bmatrix}, \begin{bmatrix} 4 & 2 \\ 2 & 3 \end{bmatrix}\right)$. Find $E[X | Y = 3]$ and $\text{Var}(X | Y = 3)$.

**Difficulty**: Medium

### Problem 2.2
Show that the Mahalanobis distance $d_M(x) = \sqrt{(x - \mu)^T \Sigma^{-1} (x - \mu)}$ reduces to Euclidean distance when $\Sigma = I$.

**Difficulty**: Easy

### Problem 2.3
Prove that if $X \sim \mathcal{N}(\mu, \Sigma)$ and $Y = AX + b$, then $Y \sim \mathcal{N}(A\mu + b, A\Sigma A^T)$.

**Difficulty**: Medium

## Maximum Likelihood Estimation

### Problem 3.1
Derive the MLE for the parameters $(\mu, \sigma^2)$ of a Gaussian distribution from $n$ i.i.d. samples.

**Difficulty**: Medium

### Problem 3.2
Show that the MLE for the variance is biased, and compute the bias correction factor.

**Difficulty**: Medium

### Problem 3.3
Compute the Fisher information for the Bernoulli distribution and state the Cramer-Rao lower bound for any unbiased estimator of $p$.

**Difficulty**: Hard

## Bayesian Inference

### Problem 4.1
Given a Beta(2, 2) prior on $p$ and observing 7 heads in 10 coin flips, compute the posterior distribution and the posterior mean.

**Difficulty**: Medium

### Problem 4.2
For a Gaussian likelihood with known variance $\sigma^2$ and a Gaussian prior $\mu \sim \mathcal{N}(\mu_0, \sigma_0^2)$, derive the posterior distribution of $\mu$ given $n$ observations.

**Difficulty**: Hard

### Problem 4.3
Explain why the posterior mean is always between the prior mean and the MLE, and show this algebraically for the Normal-Normal conjugate model.

**Difficulty**: Medium

## Challenge Problems

### Problem 5.1
Derive the posterior predictive distribution for the Normal-Normal model (Gaussian likelihood with Gaussian prior on the mean).

**Difficulty**: Very Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
