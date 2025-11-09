---
sidebar_position: 8
---

# Section 1: Problems

University-level exam questions for Core Linear System Theory.

## Conceptual Questions

### Question 1.1
Can there be multiple bases for a given vector spaces?

**Difficulty**: Easy

### Question 1.2
If there are multiple bases, can the dimensions differ?

**Difficulty**: Easy

### Question 1.3
Prove: The rank $r$ of an $m \times n$ matrix is **always less than or equal to both $m$ and $n$**.
$$\text{rank}(A) \le \min(m, n)$$

**Difficulty**: Medium

### Question 1.4
If all columns of a matrix A are linearly independent, are there any element in its nullspace other than the zero vector? (i.e. dimension of N(A) > 0?)

**Difficulty**: Medium

### Question 1.5
Show that the _reduced form_ of $A^T$ is **not** the transpose of the reduced form of $A$.

**Difficulty**: Medium

## Vector Spaces

### Problem 2.1
Determine whether the following sets form vector spaces:

a) All vectors in ℝ³ whose components sum to zero
b) All matrices A such that A² = A
c) All polynomials of degree exactly 3

**Difficulty**: Medium

### Problem 2.2
Let V be the space of all 2×2 matrices. Find a basis for V and verify it.

**Difficulty**: Medium

### Problem 2.3
Prove that the intersection of two subspaces is a subspace.

**Difficulty**: Hard

## Linear Independence

### Problem 2.1
Determine if the following vectors are linearly independent:
v₁ = (1, 2, 3), v₂ = (2, 4, 6), v₃ = (1, 1, 1)

**Difficulty**: Easy

### Problem 2.2
Find the dimension of the span of {(1,0,1), (0,1,0), (1,1,1), (2,1,2)}

**Difficulty**: Medium

## The Four Fundamental Subspaces

### Problem 3.1
For matrix A = [[1, 2, 3], [2, 4, 6]], find:
- Column space C(A)
- Nullspace N(A)
- Row space C(Aᵀ)
- Left nullspace N(Aᵀ)

**Difficulty**: Medium

### Problem 3.2
Prove that dim(C(A)) + dim(N(Aᵀ)) = m for an m×n matrix A.

**Difficulty**: Hard

## Linear Transformations

### Problem 4.1
Let T: ℝ² → ℝ² be defined by T(x, y) = (2x - y, x + 3y). Find the matrix representation of T.

**Difficulty**: Easy

### Problem 4.2
Prove the rank-nullity theorem for a linear transformation T: V → W.

**Difficulty**: Hard

## Matrix Operations

### Problem 5.1
Compute the LU decomposition of:
A = [[2, 1, 1], [4, 3, 3], [8, 7, 9]]

**Difficulty**: Medium

### Problem 5.2
Prove that (AB)ᵀ = BᵀAᵀ for any matrices A and B where AB is defined.

**Difficulty**: Medium

## Challenge Problems

### Problem 6.1
Let A be an n×n matrix. Prove that the four fundamental subspaces come in orthogonal pairs.

**Difficulty**: Very Hard

### Problem 6.2
Construct an example of a linear transformation that is injective but not surjective.

**Difficulty**: Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
