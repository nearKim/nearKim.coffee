---
sidebar_position: 7
---

# Determinants

## Topics to Cover

### Definition and Computation
- The determinant as a single number $\det(A)$ assigned to a square matrix
- Three defining properties:
  1. $\det(I) = 1$
  2. Row exchange reverses sign
  3. Determinant is linear in each row separately
- Cofactor expansion along any row or column
- $2 \times 2$ formula: $\det\begin{bmatrix}a&b\\c&d\end{bmatrix} = ad - bc$
- $3 \times 3$ and the pattern of signed minors
- Computing via elimination: $\det(A)$ = product of pivots (times $(-1)^{\text{row swaps}}$)

### Properties
- $\det(AB) = \det(A)\det(B)$ (multiplicative, not additive)
- $\det(A^T) = \det(A)$
- $\det(A^{-1}) = 1/\det(A)$
- $\det(cA) = c^n\det(A)$ for $n \times n$ matrix
- Singular matrix $\Leftrightarrow$ $\det(A) = 0$ (one or more zero pivots)
- Triangular matrix: determinant = product of diagonal entries

### Geometric Interpretation
- $|\det(A)|$ = volume of the parallelepiped formed by the column (or row) vectors
- $\det(A) = 0$: columns are linearly dependent, the parallelepiped collapses to lower dimension
- Sign of determinant: orientation (preserved or reversed)
- Connection to the Jacobian: $\det(J)$ measures how a transformation scales volume locally

### Cofactors and the Adjugate
- Cofactor $C_{ij} = (-1)^{i+j} M_{ij}$ where $M_{ij}$ is the $(i,j)$ minor
- Cofactor formula for inverse: $A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$
- Cramer's rule: $x_i = \det(B_i)/\det(A)$ — elegant but $O(n \cdot n!)$ cost
  - Impractical for computation, but useful for theoretical arguments
- Cross-reference to [Matrix Inverse](./02-matrix-inverse-overview.md)

### The Characteristic Polynomial
- $\det(A - \lambda I) = 0$ defines the eigenvalues
- For $2 \times 2$: $\lambda^2 - \text{tr}(A)\lambda + \det(A) = 0$
- $\det(A) = \prod \lambda_i$ (product of all eigenvalues)
- $\text{tr}(A) = \sum \lambda_i$ (sum of all eigenvalues)
- Cross-reference to [Eigenvalues](../02-spectral-theory/01-eigenvalues-overview.md)

### Summary

### Applications in Data Science and Machine Learning
- **Multivariate Gaussian:** the log-likelihood involves $\log|\det(\Sigma)|$; computing this efficiently via Cholesky: $\log\det(\Sigma) = 2\sum \log L_{ii}$
- **Normalizing flows:** transforming probability distributions requires the Jacobian determinant $|\det(\partial f/\partial x)|$ to preserve valid densities
- **Bayesian model comparison:** marginal likelihood involves determinants of covariance matrices
- **Volume and information:** determinant of the Fisher information matrix measures the "volume" of distinguishable parameter configurations

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 5
- Stanford CS229, [Linear Algebra Review](https://cs229.stanford.edu/section/cs229-linalg.pdf) (Kolter), Section 3.9
- Deisenroth et al., [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 4.1
