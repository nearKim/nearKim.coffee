---
sidebar_position: 3
---

# Numerical Methods - Deep Dive

## Mathematical Foundations

Rigorous treatment of numerical linear algebra.

## Norms Theory

### Vector Norms

**Definition**: A norm on ℝⁿ satisfies:
1. ||x|| ≥ 0 with equality iff x = 0
2. ||cx|| = |c| ||x||
3. ||x + y|| ≤ ||x|| + ||y||

**Examples**: (To be completed)

### Matrix Norms

**Induced Norm**: $||A|| = \max_{\|x\|=1} ||Ax||$

**Theorem**: For induced 2-norm, $||A||₂ = σ₁$ (largest singular value)

**Proof**: (To be completed)

## Conditioning

### Condition Number Theory

**Theorem**: The relative error in x satisfies:
(1/κ(A)) (||δb||/||b||) ≤ ||δx||/||x|| ≤ κ(A) (||δb||/||b||)

**Proof**: (To be completed)

### Implications

(To be completed)

## Eigenvalue Algorithms

### Power Method

**Theorem**: The power method converges to dominant eigenvector if |λ₁| > |λ₂|

**Proof**: (To be completed)

### QR Algorithm

**Algorithm**: (To be completed)

**Convergence**: (To be completed)

## Iterative Methods

### Convergence Theory

**Theorem**: Jacobi iteration converges if A is strictly diagonally dominant

**Proof**: (To be completed)

### Conjugate Gradient

**Theorem**: CG finds exact solution in at most n steps

**Proof**: (To be completed)

## Exercises

(Advanced problems to be completed)
