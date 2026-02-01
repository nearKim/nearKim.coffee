---
sidebar_position: 1
title: Table of Contents
---

# Section 2: Spectral Theory & Matrix Decompositions

## Overview

Focus on eigenvalue analysis, positive definiteness, and the singular value decomposition — the tools that reveal the intrinsic geometry of matrices.

## Topics Covered

### Chapter 5: Eigenvalues and Eigenvectors
- Eigenvalue equation $Av = \lambda v$ and characteristic polynomial
- Diagonalization $A = PDP^{-1}$, matrix powers $A^k$
- Spectral theorem for symmetric matrices
- Similarity transformations
- Difference equations and matrix exponentials

### Chapter 6: Positive Definite Matrices
- Quadratic forms and their geometry (bowls, saddles, domes)
- Five equivalent tests for positive definiteness
- Cholesky decomposition (deeper treatment)
- Gram matrix $A^TA$
- Rayleigh quotient and min-max principles
- Ellipsoids and principal axes

### Chapter 6 (cont.): Singular Value Decomposition
- $A = U\Sigma V^T$ for any matrix
- Geometric interpretation: rotate-stretch-rotate
- Low-rank approximation (Eckart-Young theorem)
- Pseudoinverse and minimum-norm least squares
- Condition number via singular values

## Learning Objectives

- Compute eigenvalues/eigenvectors and diagonalize matrices
- Understand the spectral theorem and why symmetric matrices are special
- Test for positive definiteness and connect it to optimization geometry
- Decompose any matrix via SVD and interpret the components
- Apply low-rank approximation to compress and denoise data
- Connect spectral methods to PCA, spectral clustering, and gradient dynamics

## Navigation

- [Eigenvalues, Eigenvectors, and Diagonalization](01-eigenvalues-overview.md)
- [Positive Definite Matrices](02-positive-definite-overview.md)
- [Singular Value Decomposition](03-svd-overview.md)
- [Problems](problems.md)
- [Python Implementation](implementation.md)
