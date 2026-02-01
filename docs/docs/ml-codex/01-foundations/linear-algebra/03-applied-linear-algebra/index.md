---
sidebar_position: 1
title: Table of Contents
---

# Section 3: Applied Linear Algebra

## Overview

Focus on orthogonality, projections, least squares, optimization, and numerical computation — the applied machinery that powers regression, dimensionality reduction, model training, and large-scale solvers.

## Topics Covered

### Chapter 4: Orthogonality and Projections
- Orthogonal vectors and subspaces
- Orthogonality of the four fundamental subspaces
- Orthonormal bases and orthogonal matrices
- Projection onto lines and subspaces
- Projection matrices and their properties

### Chapter 4 (cont.): Least Squares and QR
- The least squares problem: minimize $\|Ax - b\|^2$
- Normal equations and the hat matrix
- Linear regression as projection
- Gram-Schmidt process and QR decomposition
- Why QR is more stable than normal equations
- Regularized least squares (Ridge)

### Chapter 6 (Selected): Optimization
- Quadratic functions: gradient, Hessian, classification of critical points
- Gradient descent and condition number
- Conjugate gradient method
- Constrained optimization: Lagrange multipliers, KKT systems
- Stochastic gradient descent (SGD) and mini-batch methods
- Momentum and accelerated methods: classical momentum, Nesterov, Adam
- Convexity and its connection to positive definiteness

### Chapter 7: Numerical Linear Algebra
- Floating-point arithmetic, forward vs backward error
- Vector and matrix norms (L1, L2, Frobenius, spectral)
- Condition number: quantifying sensitivity to perturbation
- Stability of algorithms (LU, QR, Cholesky, normal equations)
- Eigenvalue computation: power method, QR algorithm, Lanczos
- Iterative solvers: Jacobi, Gauss-Seidel, conjugate gradient
- Sparse matrix techniques and storage formats
- Randomized methods: randomized SVD, random projections (Johnson-Lindenstrauss)

## Learning Objectives

- Understand orthogonality as the geometric foundation of least squares
- Derive and solve the normal equations
- Compute QR decomposition via Gram-Schmidt
- Connect condition number to gradient descent convergence
- Formulate constrained optimization as linear algebra
- Choose between direct and iterative solvers based on matrix structure
- Diagnose ill-conditioning and numerical instability

## Navigation

- [Orthogonality and Projections](01-orthogonality-projections-overview.md)
- [Least Squares and QR Decomposition](02-least-squares-qr-overview.md)
- [Optimization and Linear Algebra](03-optimization-overview.md)
- [Numerical Linear Algebra](04-numerical-linear-algebra-overview.md)
- [Problems](problems.md)
- [Python Implementation](implementation.md)
