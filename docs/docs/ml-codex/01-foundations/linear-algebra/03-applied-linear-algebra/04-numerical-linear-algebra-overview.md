---
sidebar_position: 5
---

# Numerical Linear Algebra

## Topics to Cover

### Floating-Point Arithmetic and Error
- Machine epsilon and rounding
- Forward vs backward error
- Why "exact" formulas can give wrong answers on a computer
- Catastrophic cancellation (e.g., $a^2 - b^2$ when $a \approx b$)

### Vector and Matrix Norms
- Vector norms: $\|x\|_1$, $\|x\|_2$ (Euclidean), $\|x\|_{\infty}$
- Matrix norms: induced (operator) norms, Frobenius norm $\|A\|_F = \sqrt{\sum a_{ij}^2}$
- Submultiplicativity: $\|AB\| \leq \|A\|\|B\|$
- Spectral norm $\|A\|_2 = \sigma_1$ (largest singular value)

### Condition Number
- $\kappa(A) = \|A\|\|A^{-1}\| = \sigma_1/\sigma_r$ (via SVD)
- Meaning: a relative change $\epsilon$ in $b$ can cause up to $\kappa \cdot \epsilon$ relative change in $x$
- Well-conditioned ($\kappa$ small) vs ill-conditioned ($\kappa$ large)
- Rule of thumb: lose $\log_{10}(\kappa)$ digits of accuracy
- Cross-reference to [Matrix Inverse: Condition Number](../01-core-linear-system-theory/02-matrix-inverse-overview.md) and [SVD: Condition Number](../02-spectral-theory/03-svd-overview.md)

### Stability of Algorithms
- Backward stability: the algorithm gives the exact answer to a slightly perturbed problem
- LU with partial pivoting: backward stable
- Normal equations ($A^TA\hat{x} = A^Tb$): squares the condition number — unstable for ill-conditioned $A$
- QR: backward stable for least squares
- Cholesky: backward stable for SPD systems
- Cross-reference to [QR vs Normal Equations](./02-least-squares-qr-overview.md)

### Eigenvalue Computation
- **Power method:** repeatedly multiply by $A$, converge to dominant eigenvector
  - Convergence rate: $|\lambda_2/\lambda_1|$
  - Inverse iteration: apply power method to $(A - \mu I)^{-1}$ to find eigenvalue nearest $\mu$
- **QR algorithm:** the workhorse of eigenvalue computation
  - Iterate: $A_k = Q_kR_k$, then $A_{k+1} = R_kQ_k$
  - Converges to upper triangular (Schur form); eigenvalues on diagonal
  - With shifts: cubic convergence for symmetric matrices
- **Lanczos algorithm** (brief): for large sparse symmetric matrices, builds a tridiagonal approximation in Krylov subspace

### Iterative Methods for $Ax = b$
- When to use iterative vs direct: large, sparse systems where $O(n^3)$ is too expensive
- **Jacobi iteration:** split $A = D + (L + U)$, iterate $x^{(k+1)} = D^{-1}(b - (L+U)x^{(k)})$
- **Gauss-Seidel:** use updated values immediately; faster convergence
- **Convergence conditions:** spectral radius $\rho(M) < 1$ where $M$ is the iteration matrix
- **Conjugate gradient** (CG): the optimal iterative solver for SPD systems
  - Converges in at most $n$ steps (exact arithmetic)
  - Practical convergence in $O(\sqrt{\kappa})$ iterations
  - Preconditioning: $M^{-1}Ax = M^{-1}b$ to reduce effective $\kappa$
  - Cross-reference to [Conjugate Gradient](./03-optimization-overview.md)

### Sparse Matrix Techniques
- Storage formats: CSR (compressed sparse row), CSC, COO
- Fill-in during LU: why ordering matters (e.g., Cuthill-McKee, AMD)
- Sparse Cholesky: much cheaper than dense when structure is exploited
- Graph interpretation: nonzero pattern of $A$ = adjacency structure

### Randomized Methods
- **Randomized matrix multiplication:** approximate $AB$ by sampling columns of $A$ and rows of $B$
- **Randomized SVD:** sketch the matrix to a smaller dimension, compute SVD of the sketch
  - Algorithm: random projection $Y = A\Omega$, orthogonalize $Q = \text{QR}(Y)$, compute SVD of $Q^TA$
  - Cost: $O(mn\log k)$ vs $O(mn \min(m,n))$ for full SVD
- **Random projections** (Johnson-Lindenstrauss lemma): $k$ random directions preserve pairwise distances with high probability if $k = O(\log n / \epsilon^2)$
- Why randomization works: concentration of measure in high dimensions
- Cross-reference to [MIT 18.065 Lecture 13: Randomized Matrix Multiplication](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)

### Summary

### Applications in Data Science and Machine Learning
- **Large-scale PCA:** Lanczos / randomized SVD instead of full eigendecomposition — computes top-$k$ singular values of million-dimensional matrices
- **Conjugate gradient in GP inference:** solving $K\alpha = y$ for Gaussian processes without forming $K^{-1}$
- **Preconditioning for training:** second-order optimizers (L-BFGS, K-FAC) approximate the Hessian inverse as a preconditioner
- **Sparse models:** feature matrices in NLP/recommender systems are extremely sparse; sparse solvers are essential
- **Numerical stability in deep learning:** mixed-precision training, loss scaling, and gradient clipping are all responses to floating-point limitations
- **Condition number monitoring:** diagnosing training instability by tracking $\kappa$ of weight matrices or Gram matrices

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 7
- Strang, *Linear Algebra and Learning from Data*, Lecture 13 (Randomized Methods)
- Trefethen & Bau, *Numerical Linear Algebra* (supplementary)
- Halko, Martinsson & Tropp, *Finding Structure with Randomness* (2011) — the standard reference for randomized SVD
