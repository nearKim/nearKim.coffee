---
sidebar_position: 9
---

# Section 1: Python Implementation

Python implementations and computational examples for Core Linear System Theory.

## Setup

```python
import numpy as np
import scipy.linalg as la
from typing import Tuple, List
import matplotlib.pyplot as plt
```

## Vector Spaces

### Checking Subspace Conditions

```python
def is_subspace(vectors: List[np.ndarray], vector_space_dim: int) -> bool:
    """
    Check if a set of vectors forms a subspace.

    Args:
        vectors: List of numpy arrays representing vectors
        vector_space_dim: Dimension of the ambient vector space

    Returns:
        True if vectors span a subspace
    """
    # To be implemented
    pass
```

### Finding Basis

```python
def find_basis(vectors: List[np.ndarray]) -> Tuple[List[np.ndarray], int]:
    """
    Find a basis for the span of given vectors.

    Returns:
        Tuple of (basis_vectors, dimension)
    """
    # To be implemented
    pass
```

## Linear Independence

```python
def check_linear_independence(vectors: List[np.ndarray]) -> bool:
    """
    Check if vectors are linearly independent.

    Implementation using rank computation.
    """
    if not vectors:
        return True

    matrix = np.column_stack(vectors)
    rank = np.linalg.matrix_rank(matrix)

    return rank == len(vectors)

# Example
v1 = np.array([1, 2, 3])
v2 = np.array([2, 4, 6])
v3 = np.array([1, 1, 1])

print(f"Are v1, v2, v3 independent? {check_linear_independence([v1, v2, v3])}")
```

## Four Fundamental Subspaces

```python
def four_fundamental_subspaces(A: np.ndarray) -> dict:
    """
    Compute the four fundamental subspaces of matrix A.

    Returns:
        Dictionary with keys: 'column_space', 'nullspace',
        'row_space', 'left_nullspace'
    """
    # Column space: basis from RREF
    # Nullspace: using SVD
    # Row space: column space of A^T
    # Left nullspace: nullspace of A^T

    # To be implemented
    pass
```

## Linear Transformations

```python
class LinearTransformation:
    """Represent a linear transformation with its matrix."""

    def __init__(self, matrix: np.ndarray):
        self.matrix = matrix
        self.m, self.n = matrix.shape

    def apply(self, vector: np.ndarray) -> np.ndarray:
        """Apply the transformation to a vector."""
        return self.matrix @ vector

    def kernel(self) -> np.ndarray:
        """Find the kernel (nullspace) of the transformation."""
        # To be implemented
        pass

    def image_basis(self) -> np.ndarray:
        """Find a basis for the image (column space)."""
        # To be implemented
        pass

    def rank_nullity(self) -> Tuple[int, int]:
        """Return (rank, nullity) of the transformation."""
        rank = np.linalg.matrix_rank(self.matrix)
        nullity = self.n - rank
        return rank, nullity

# Example
A = np.array([[2, -1], [1, 3]])
T = LinearTransformation(A)
v = np.array([1, 1])
print(f"T(v) = {T.apply(v)}")
print(f"Rank-Nullity: {T.rank_nullity()}")
```

## Matrix Operations

### LU Decomposition

```python
def lu_decomposition(A: np.ndarray) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Compute PLU decomposition of matrix A.

    Returns:
        Tuple of (P, L, U) where PA = LU
    """
    P, L, U = la.lu(A)
    return P, L, U

# Example
A = np.array([[2, 1, 1],
              [4, 3, 3],
              [8, 7, 9]], dtype=float)

P, L, U = lu_decomposition(A)
print("L =\n", L)
print("U =\n", U)
print("Verification: PA = LU?\n", np.allclose(P @ A, L @ U))
```

### Special Matrices

```python
def is_symmetric(A: np.ndarray, tol: float = 1e-10) -> bool:
    """Check if matrix is symmetric."""
    return np.allclose(A, A.T, atol=tol)

def is_orthogonal(Q: np.ndarray, tol: float = 1e-10) -> bool:
    """Check if matrix is orthogonal."""
    n = Q.shape[0]
    return np.allclose(Q.T @ Q, np.eye(n), atol=tol)

# Examples
A_sym = np.array([[1, 2], [2, 3]])
print(f"Is A symmetric? {is_symmetric(A_sym)}")

Q = np.array([[1/np.sqrt(2), 1/np.sqrt(2)],
              [-1/np.sqrt(2), 1/np.sqrt(2)]])
print(f"Is Q orthogonal? {is_orthogonal(Q)}")
```

## Visualization

```python
def visualize_transformation(T: np.ndarray, title: str = "Linear Transformation"):
    """
    Visualize how a 2D linear transformation affects the unit square.
    """
    # To be implemented with matplotlib
    pass
```

## Problem Solutions

### Solution to Problem 3.1

```python
def solve_problem_3_1():
    """Find the four fundamental subspaces of A = [[1,2,3], [2,4,6]]."""
    A = np.array([[1, 2, 3], [2, 4, 6]], dtype=float)

    # Column space
    # Nullspace
    # Row space
    # Left nullspace

    # To be implemented
    pass
```

---

## Running the Code

To run these implementations:

```bash
python section1_implementation.py
```

## Dependencies

```txt
numpy>=1.21.0
scipy>=1.7.0
matplotlib>=3.4.0
```
