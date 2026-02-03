---
sidebar_position: 5
---

# Section 3: Problems

University-level exam questions for Integral Calculus and Optimization.

## Integration for ML

### Problem 1.1
Compute the normalizing constant $Z = \int_{-\infty}^{\infty} e^{-x^2/2} dx$ using the polar coordinates trick.

**Difficulty**: Medium

### Problem 1.2
Given $p(x, y) = 6xy$ for $0 \le x \le 1$, $0 \le y \le 1$ (and 0 elsewhere), compute the marginal density $p(x)$ and the expectation $E[X]$.

**Difficulty**: Medium

### Problem 1.3
Estimate $\int_0^1 e^{-x^2} dx$ using Monte Carlo integration with $N = 1000$ samples. Report the estimate and its standard error.

**Difficulty**: Easy

### Problem 1.4
Use the change-of-variables formula to derive the density of $Y = e^X$ when $X \sim \mathcal{N}(\mu, \sigma^2)$ (i.e., derive the lognormal density).

**Difficulty**: Hard

## Calculus of Optimization

### Problem 2.1
Find and classify all critical points of $f(x, y) = x^4 + y^4 - 4xy + 1$ using first- and second-order conditions.

**Difficulty**: Medium

### Problem 2.2
Prove that if $f: \mathbb{R}^n \to \mathbb{R}$ is twice differentiable and $\nabla^2 f(x) \succeq 0$ for all $x$, then $f$ is convex.

**Difficulty**: Hard

### Problem 2.3
For $f(x) = \frac{1}{2}x^T A x - b^T x$ with $A$ symmetric positive definite, derive the gradient descent update and show that the optimal step size is $\alpha_k = \frac{r_k^T r_k}{r_k^T A r_k}$ where $r_k = b - Ax_k$.

**Difficulty**: Hard

### Problem 2.4
Use Lagrange multipliers to find the maximum entropy distribution subject to given mean and variance constraints.

**Difficulty**: Very Hard

## Challenge Problems

### Problem 3.1
Prove that gradient descent with step size $\alpha \le 1/L$ on an $L$-smooth convex function satisfies $f(x_k) - f(x^*) \le \frac{\|x_0 - x^*\|^2}{2\alpha k}$.

**Difficulty**: Very Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
