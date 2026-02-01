---
sidebar_position: 2
---

# Orthogonality and Projections

## Topics to Cover

### Orthogonal Vectors and Subspaces
- Definition: $v \cdot w = 0$
- Orthogonal complements: $V^{\perp}$ = all vectors perpendicular to $V$
- Orthogonality of the four fundamental subspaces:
  - Row space $\perp$ Nullspace (both in $\mathbb{R}^n$)
  - Column space $\perp$ Left nullspace (both in $\mathbb{R}^m$)
- Why this orthogonality is the geometric backbone of $Ax = b$
- Cross-reference to [The Four Fundamental Subspaces](../01-core-linear-system-theory/01-vector-spaces-overview.md)

### Orthogonal Bases and Orthonormal Bases
- Orthogonal basis: mutually perpendicular, any length
- Orthonormal basis: mutually perpendicular, unit length
- Why orthonormal bases are computationally ideal: $c_i = q_i^T b$ (no system to solve)
- Orthogonal matrices: $Q^TQ = I$, $Q^{-1} = Q^T$
- Cross-reference to [Special Matrices: Orthogonal](../01-core-linear-system-theory/04-matrix-operations-overview.md)

### Projection onto a Line
- Projection of $b$ onto line through $a$: $p = \frac{a^Tb}{a^Ta}a$
- Projection matrix: $P = \frac{aa^T}{a^Ta}$
- Error $e = b - p$ is perpendicular to $a$ (the key idea)
- Geometric picture: dropping a perpendicular

### Projection onto a Subspace
- Projection of $b$ onto column space of $A$: $p = A\hat{x}$
- Derivation from $e \perp C(A)$, i.e., $A^T(b - A\hat{x}) = 0$
- Normal equations: $A^TA\hat{x} = A^Tb$
- Projection matrix: $P = A(A^TA)^{-1}A^T$
- Properties: $P^2 = P$ (idempotent), $P^T = P$ (symmetric)
- $(I - P)$ projects onto the orthogonal complement

### Summary

### Applications in Data Science and Machine Learning
- **Linear regression as projection:** $\hat{y} = Pb$ projects the response vector onto the column space of the feature matrix
- **Residuals:** $e = (I - P)b$ lives in the left nullspace — the part of $b$ unexplained by features
- **Dimensionality reduction:** projection onto top-$k$ principal subspace
- **Signal vs noise decomposition:** projecting data onto signal subspace, residual = noise
- **Feature orthogonalization:** removing collinearity by projecting out shared directions

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 4 (4.1–4.2)
