---
sidebar_position: 3
---

# Least Squares and QR Decomposition

## The Central Question: What Is the Best Approximate Solution When $Ax = b$ Has No Exact Answer?

When there are more equations than unknowns, $Ax = b$ typically has no solution. The least squares approach finds the $\hat{x}$ that minimizes $\|Ax - b\|^2$, which is the projection of $b$ onto the column space of $A$. The normal equations, QR decomposition, and Gram-Schmidt process provide three ways to compute this, with different tradeoffs between speed and numerical stability.

## Topics to Cover

### The Least Squares Problem
- When $Ax = b$ has no solution ($b \notin C(A)$): minimize $\|Ax - b\|^2$
- Geometric view: find the point in $C(A)$ closest to $b$ (i.e., project)
- Normal equations: $A^TA\hat{x} = A^Tb$
- The solution $\hat{x} = (A^TA)^{-1}A^Tb$ when $A$ has independent columns
- Cross-reference to [Projections](./01-orthogonality-projections-overview.md)

### Linear Regression as Least Squares
- Fitting $y = X\beta + \epsilon$: minimize $\|y - X\beta\|^2$
- Design matrix $X$, coefficient vector $\beta$
- The hat matrix $H = X(X^TX)^{-1}X^T$: maps $y$ to $\hat{y}$
- Residual properties: $e \perp C(X)$, $\sum e_i = 0$ (when intercept is included)
- Weighted least squares: minimize $\|W^{1/2}(Ax - b)\|^2$ for non-uniform noise

### Gram-Schmidt Process
- Input: linearly independent vectors $a_1, a_2, \ldots, a_n$
- Output: orthonormal vectors $q_1, q_2, \ldots, q_n$
- Algorithm: subtract projections onto previous vectors, then normalize
- Step-by-step example
- Classical vs Modified Gram-Schmidt: same math, different numerical stability

### QR Decomposition
- $A = QR$: $Q$ orthonormal columns, $R$ upper triangular
- Gram-Schmidt produces $Q$ and $R$ simultaneously
- Solving least squares via QR: $R\hat{x} = Q^Tb$ (triangular solve, no $A^TA$ needed)
- Why QR is more stable than normal equations:
  - Normal equations square the condition number: $\kappa(A^TA) = \kappa(A)^2$
  - QR works with $\kappa(A)$ directly
- Householder reflections (brief): the numerically preferred way to compute QR

### Regularized Least Squares
- When $A^TA$ is singular or near-singular (rank-deficient or ill-conditioned)
- Ridge regression: minimize $\|Ax - b\|^2 + \lambda\|x\|^2$
  - Solution: $\hat{x} = (A^TA + \lambda I)^{-1}A^Tb$
  - Geometric view: shrinks the ellipsoid, rounds the bowl
  - Cross-reference to [Ridge Regression](../01-core-linear-system-theory/02-matrix-inverse-overview.md#applications-in-data-science-and-machine-learning)
- Connection to SVD truncation: ridge suppresses small singular values smoothly

### Summary

**Answering the Central Question:** The best approximate solution is $\hat{x} = (A^TA)^{-1}A^Tb$, the least squares solution that minimizes $\|Ax - b\|^2$. This is geometrically the projection of $b$ onto $C(A)$. The normal equations give this directly but square the condition number. QR decomposition ($A = QR$, then $R\hat{x} = Q^Tb$) avoids forming $A^TA$ and is numerically stable, making it the default in practice.

### Applications in Data Science and Machine Learning
- **Ordinary Least Squares (OLS):** the foundation of linear regression
- **Polynomial and basis-function regression:** same framework, different design matrix
- **QR in practice:** `numpy.linalg.lstsq` and `scipy.linalg.qr` use QR internally, not normal equations
- **Stable training:** QR-based solvers avoid catastrophic cancellation in ill-conditioned feature matrices
- **Orthogonal features:** after Gram-Schmidt, each feature's contribution is independent — interpretable coefficients
- **Recursive least squares:** updating the QR factorization as new data arrives (online learning)

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 4 (4.3–4.4)
