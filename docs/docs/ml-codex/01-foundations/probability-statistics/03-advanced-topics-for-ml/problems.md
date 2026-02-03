---
sidebar_position: 6
---

# Section 3: Problems

University-level exam questions for Advanced Topics for ML.

## Exponential Families

### Problem 1.1
Write the Bernoulli distribution $p(x | p) = p^x (1-p)^{1-x}$ in exponential family form. Identify the natural parameter, sufficient statistic, and log-partition function.

**Difficulty**: Medium

### Problem 1.2
Show that the mean of the sufficient statistic equals the gradient of the log-partition function: $E[T(x)] = \nabla_\eta A(\eta)$.

**Difficulty**: Hard

### Problem 1.3
Identify the conjugate prior for the Poisson distribution and derive the posterior after observing $n$ i.i.d. samples.

**Difficulty**: Medium

## Information Theory

### Problem 2.1
Compute the entropy of a fair coin flip and a biased coin with $p = 0.9$. Which has higher entropy and why?

**Difficulty**: Easy

### Problem 2.2
Prove that $D_{\text{KL}}(p \| q) \ge 0$ with equality iff $p = q$ (Gibbs' inequality).

**Difficulty**: Hard

### Problem 2.3
Show that minimizing the cross-entropy $H(p, q) = -\sum_x p(x) \log q(x)$ over $q$ is equivalent to minimizing $D_{\text{KL}}(p \| q)$.

**Difficulty**: Medium

### Problem 2.4
Compute the mutual information $I(X; Y)$ for jointly Gaussian random variables with correlation $\rho$.

**Difficulty**: Hard

## Concentration Inequalities

### Problem 3.1
Use Markov's inequality to bound $P(X \ge 10)$ when $E[X] = 3$ and $X \ge 0$.

**Difficulty**: Easy

### Problem 3.2
Let $X_1, \ldots, X_n$ be i.i.d. with $X_i \in [0, 1]$ and $E[X_i] = \mu$. Use Hoeffding's inequality to find $n$ such that $P(|\bar{X} - \mu| \ge 0.01) \le 0.05$.

**Difficulty**: Medium

### Problem 3.3
Explain how Hoeffding's inequality leads to the sample complexity bound in PAC learning: $n \ge \frac{1}{2\epsilon^2}\log\frac{2|\mathcal{H}|}{\delta}$.

**Difficulty**: Hard

## Challenge Problems

### Problem 4.1
Derive the ELBO (Evidence Lower Bound) using Jensen's inequality and show that maximizing the ELBO is equivalent to minimizing $D_{\text{KL}}(q \| p)$ where $p$ is the true posterior.

**Difficulty**: Very Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
