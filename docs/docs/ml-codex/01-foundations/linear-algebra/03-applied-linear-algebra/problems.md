---
sidebar_position: 6
---

# Section 3: Problems

University-level exam questions for Applied Linear Algebra.

## Orthogonality

### Problem 1.1
Verify that the vectors v₁ = (1, 1, 1) and v₂ = (1, -2, 1) are orthogonal.

**Difficulty**: Easy

### Problem 1.2
Find an orthogonal basis for the column space of A = [[1, 1], [1, 2], [1, 3]].

**Difficulty**: Medium

### Problem 1.3
Prove that if $\{q₁, q₂, ..., qₙ\}$ is an orthonormal basis, then any vector v can be written as $v = \sum(v \cdot qᵢ)qᵢ$.

**Difficulty**: Medium

## Projections

### Problem 2.1
Find the projection of b = (1, 2, 3) onto the line through a = (1, 1, 1).

**Difficulty**: Easy

### Problem 2.2
Prove that for projection matrix P, we have P² = P.

**Difficulty**: Medium

## Least Squares

### Problem 3.1
Fit a line y = C + Dt to data points: (0, 6), (1, 0), (2, 0).

**Difficulty**: Medium

### Problem 3.2
For matrix A with full column rank, prove that AᵀA is invertible.

**Difficulty**: Hard

## Gram-Schmidt

### Problem 4.1
Apply Gram-Schmidt to vectors a₁ = (1, 1, 0), a₂ = (1, 0, 1), a₃ = (0, 1, 1).

**Difficulty**: Medium

### Problem 4.2
Find the QR decomposition of A = [[1, 1], [1, 2], [1, 3]].

**Difficulty**: Medium

## Optimization

### Problem 5.1
Find the minimum of f(x, y) = x² + 2xy + 3y² - 2x - 4y.

**Difficulty**: Medium

### Problem 5.2
Use Lagrange multipliers to minimize f(x, y) = x² + y² subject to x + y = 1.

**Difficulty**: Hard

## Norms and Conditioning

### Problem 6.1
Compute ||A||₁, ||A||₂, and ||A||∞ for A = [[1, 2], [3, 4]].

**Difficulty**: Medium

### Problem 6.2
Show that ||AB|| ≤ ||A|| ||B|| for any compatible matrix norm.

**Difficulty**: Medium

### Problem 6.3
Compute the condition number κ₂(A) for A = [[1, 1], [1, 1+ε]] where ε is small.

**Difficulty**: Hard

## Iterative Methods and Eigenvalue Computation

### Problem 7.1
Apply one iteration of Jacobi method to solve:
3x + y = 5
x + 2y = 5
starting from x₀ = [0, 0].

**Difficulty**: Easy

### Problem 7.2
Apply two iterations of the power method to A = [[2, 1], [1, 2]] starting with x₀ = [1, 0].

**Difficulty**: Medium

### Problem 7.3
Explain why the power method fails for A = [[0, 1], [1, 0]].

**Difficulty**: Medium

## Challenge Problems

### Problem 8.1
Prove that the four fundamental subspaces come in orthogonal pairs.

**Difficulty**: Very Hard

### Problem 8.2
Derive the normal equations from first principles using calculus.

**Difficulty**: Hard

### Problem 8.3
Prove that the Jacobi iteration for a strictly diagonally dominant matrix converges.

**Difficulty**: Very Hard

### Problem 8.4
Implement the conjugate gradient method and analyze its convergence.

**Difficulty**: Very Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
