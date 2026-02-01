---
sidebar_position: 3
---

# Positive Definite Matrices

## Topics to Cover

### Quadratic Forms and Geometry
- The quadratic form $f(x) = x^TAx$ and its graph
- Positive definite = bowl (minimum), negative definite = dome (maximum), indefinite = saddle
- Connection to second-derivative test: Hessian matrix

### Tests for Positive Definiteness
- Five equivalent conditions (for symmetric $A$):
  1. All eigenvalues $\lambda_i > 0$
  2. All upper-left determinants (leading minors) > 0
  3. All pivots > 0
  4. $x^TAx > 0$ for all $x \neq 0$ (energy test)
  5. $A = R^TR$ for some matrix $R$ with independent columns (Cholesky)
- Proving the equivalence chain
- Positive *semi*-definite: $\geq 0$ everywhere (allow zero eigenvalues)

### Cholesky Decomposition (Deeper Treatment)
- $A = LL^T$: the "square root" of a positive definite matrix
- Why it exists (positive pivots guarantee no zero divisions)
- Cost: $\frac{1}{3}n^3$ — half the cost of LU
- Numerical stability: no pivoting needed
- Cross-reference to [Matrix Operations](../01-core-linear-system-theory/04-matrix-operations-overview.md) for the introductory treatment

### The Gram Matrix $A^TA$
- Always positive semi-definite (proof via energy test: $x^TA^TAx = \|Ax\|^2 \geq 0$)
- Positive definite iff $A$ has independent columns (trivial nullspace)
- Central object: normal equations, covariance matrices, kernel matrices

### Rayleigh Quotient and Min-Max Principles
- Rayleigh quotient: $R(x) = \frac{x^TAx}{x^Tx}$
- $\lambda_{\min} \leq R(x) \leq \lambda_{\max}$ for all $x \neq 0$
- Min-max (Courant-Fischer): variational characterization of every eigenvalue
- Interlacing theorem (eigenvalues of submatrices)

### Ellipsoids and Principal Axes
- $x^TAx = 1$ defines an ellipsoid
- Eigenvectors = axis directions, $1/\sqrt{\lambda_i}$ = axis lengths
- Condition number $\kappa = \lambda_{\max}/\lambda_{\min}$ = elongation of the ellipsoid

### Summary

### Applications in Data Science and Machine Learning
- **Optimization:** Hessian positive definite ⇔ strict local minimum; condition number controls convergence speed of gradient descent
- **Covariance matrices:** always PSD; eigenvalues = variance along principal axes
- **Kernel methods:** kernel matrix $K_{ij} = k(x_i, x_j)$ must be PSD (Mercer's condition)
- **Gaussian processes:** covariance matrix must be PSD; Cholesky used for sampling and log-likelihood
- **Regularization:** $A^TA + \lambda I$ is always positive definite for $\lambda > 0$ (Ridge regression makes the bowl rounder)

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 6 (6.1–6.2)
- Strang, *Linear Algebra and Its Applications*, Chapter 6
