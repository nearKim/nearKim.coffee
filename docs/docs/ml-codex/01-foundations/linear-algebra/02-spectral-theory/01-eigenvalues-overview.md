---
sidebar_position: 2
---

# Eigenvalues, Eigenvectors, and Diagonalization

## The Central Question: When Does a Matrix Act Like Simple Scaling?

Most matrices rotate, stretch, and shear vectors in complicated ways. But certain special directions survive unchanged except for scaling: $Av = \lambda v$. Finding these eigenvectors and eigenvalues reveals the matrix's intrinsic behavior, enabling diagonalization, spectral analysis, and the tools behind PCA, PageRank, and dynamical systems.

## Topics to Cover

### The Eigenvalue Equation
- Definition: $Av = \lambda v$ — directions that survive a transformation
- Characteristic polynomial $\det(A - \lambda I) = 0$
- Computing eigenvalues and eigenvectors (2×2 and 3×3 examples)
- Algebraic vs geometric multiplicity
- Trace = sum of eigenvalues, determinant = product of eigenvalues

### Diagonalization
- $A = PDP^{-1}$: when and why
  - Condition: $n$ linearly independent eigenvectors
  - Fails when geometric multiplicity < algebraic multiplicity (defective matrices)
- Powers of matrices: $A^k = PD^kP^{-1}$
  - Fibonacci numbers via matrix powers
  - Stability: $A^k \to 0$ iff all $|\lambda_i| < 1$
- Markov chains: steady-state = eigenvector for $\lambda = 1$

### The Spectral Theorem (Symmetric Matrices)
- Real symmetric $\Rightarrow$ real eigenvalues
- Real symmetric $\Rightarrow$ orthogonal eigenvectors
- Spectral decomposition: $A = Q\Lambda Q^T = \sum_i \lambda_i q_i q_i^T$
  - Every symmetric matrix is a sum of rank-1 projections scaled by eigenvalues
- Why symmetry matters everywhere in ML (covariance, kernel, Hessian, Gram, Laplacian)

### Similarity Transformations
- $B = M^{-1}AM$: same eigenvalues, different eigenvectors
- Change of basis interpretation
- Jordan normal form (brief: what happens when diagonalization fails)

### Difference and Differential Equations
- Difference equations $u_{k+1} = Au_k$: solution via eigenvalues
- Matrix exponential $e^{At}$: solving $\frac{du}{dt} = Au$
- Stability conditions: real parts of eigenvalues

### Summary

**Answering the Central Question:** A matrix acts like simple scaling along its eigenvector directions. When $A$ has $n$ independent eigenvectors, it diagonalizes as $A = PDP^{-1}$, reducing matrix powers, exponentials, and dynamical systems to scalar operations on the eigenvalues. For symmetric matrices, the spectral theorem guarantees this decomposition always exists with orthogonal eigenvectors.

### Applications in Data Science and Machine Learning
- **PCA foundation:** eigenvalues of covariance matrix = variance along principal directions
- **Spectral clustering:** eigenvectors of graph Laplacian reveal cluster structure
- **PageRank:** dominant eigenvector of the web transition matrix
- **Recurrent neural networks:** eigenvalues of weight matrix control gradient flow (vanishing/exploding gradients)
- **Dynamical systems:** stability of fixed points in optimization

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 5 (5.1–5.6)
- Strang, *Linear Algebra and Its Applications*, Chapter 5
