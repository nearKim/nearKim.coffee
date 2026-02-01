---
sidebar_position: 4
---

# Singular Value Decomposition

## Topics to Cover

### Motivation: Beyond Eigenvalues
- Eigenvalues require square matrices; SVD works for any $m \times n$ matrix
- Every matrix has an SVD (existence theorem)
- SVD reveals the "true geometry" of a linear transformation

### The SVD: $A = U\Sigma V^T$
- $V$: orthonormal basis for the row space (and nullspace)
- $U$: orthonormal basis for the column space (and left nullspace)
- $\Sigma$: diagonal matrix of singular values $\sigma_1 \geq \sigma_2 \geq \cdots \geq 0$
- Connection to the four fundamental subspaces (cross-reference to [Vector Spaces](../01-core-linear-system-theory/01-vector-spaces-overview.md))

### Where Singular Values Come From
- $\sigma_i = \sqrt{\lambda_i(A^TA)}$: singular values are square roots of eigenvalues of $A^TA$
- $V$ = eigenvectors of $A^TA$, $U$ = eigenvectors of $AA^T$
- Derivation from the eigendecomposition of $A^TA$ and $AA^T$

### Geometric Interpretation
- Any linear map = rotate ($V^T$) → stretch ($\Sigma$) → rotate ($U$)
- Mapping the unit sphere to an ellipsoid: singular values = semi-axis lengths
- Rank = number of nonzero singular values

### Reduced vs Full SVD
- Full SVD: $U$ is $m \times m$, $\Sigma$ is $m \times n$, $V$ is $n \times n$
- Reduced (compact) SVD: keep only the $r$ nonzero singular values
- Truncated SVD: keep only the top $k < r$ singular values

### Low-Rank Approximation
- Eckart-Young theorem: the best rank-$k$ approximation to $A$ (in Frobenius or spectral norm) is $A_k = \sum_{i=1}^k \sigma_i u_i v_i^T$
- Error = $\sigma_{k+1}$ (spectral norm) or $\sqrt{\sigma_{k+1}^2 + \cdots + \sigma_r^2}$ (Frobenius)
- The "elbow" in the singular value spectrum: choosing $k$

### Pseudoinverse and Least Squares
- Moore-Penrose pseudoinverse: $A^+ = V\Sigma^+U^T$
- $\Sigma^+$: invert nonzero singular values, transpose
- Minimum-norm least-squares solution: $x^+ = A^+b$
- Connection to the complete solution theory (cross-reference to [Vector Spaces](../01-core-linear-system-theory/01-vector-spaces-overview.md))

### Condition Number via SVD
- $\kappa(A) = \sigma_1 / \sigma_r$: ratio of largest to smallest singular value
- Large condition number = near-singular, numerically unstable
- Cross-reference to [Matrix Inverse](../01-core-linear-system-theory/02-matrix-inverse-overview.md) condition number section

### Summary

### Applications in Data Science and Machine Learning
- **PCA:** SVD of the centered data matrix directly gives principal components (no need to form $X^TX$)
- **Latent Semantic Analysis (LSA):** truncated SVD of term-document matrix discovers topics
- **Recommender systems:** low-rank matrix factorization via SVD (Netflix problem)
- **Image compression:** each image channel as a matrix, truncated SVD keeps dominant structure
- **Numerical rank and noise:** singular values separate signal from noise; effective rank = number of singular values above a threshold
- **Data whitening:** $\Sigma^{-1/2}U^T X$ decorrelates and normalizes features

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 6 (6.3–6.4)
- Strang, *Linear Algebra and Its Applications*, Chapter 6
