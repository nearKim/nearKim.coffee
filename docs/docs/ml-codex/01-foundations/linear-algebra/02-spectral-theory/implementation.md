---
sidebar_position: 7
---

# Section 2: Python Implementation

Python implementations for Spectral Theory & Matrix Decompositions.

## Setup

```python
import numpy as np
from scipy import linalg
import matplotlib.pyplot as plt
```

## Eigenvalues and Eigenvectors

```python
def compute_eigenvalues(A: np.ndarray):
    """Compute eigenvalues and eigenvectors."""
    eigenvalues, eigenvectors = np.linalg.eig(A)
    return eigenvalues, eigenvectors

# Example
A = np.array([[3, 1], [1, 3]])
eigenvalues, eigenvectors = compute_eigenvalues(A)
print(f"Eigenvalues: {eigenvalues}")
print(f"Eigenvectors:\n{eigenvectors}")
```

## Diagonalization

```python
def diagonalize(A: np.ndarray):
    """Diagonalize matrix A = PDP^(-1)."""
    eigenvalues, P = np.linalg.eig(A)
    D = np.diag(eigenvalues)
    return P, D, np.linalg.inv(P)

def matrix_power(A: np.ndarray, k: int):
    """Compute A^k using diagonalization."""
    P, D, P_inv = diagonalize(A)
    D_k = np.diag(np.diag(D) ** k)
    return P @ D_k @ P_inv

# Example
A = np.array([[2, 1], [1, 2]])
A_10 = matrix_power(A, 10)
print(f"A^10 =\n{A_10}")
```

## Matrix Exponential

```python
def matrix_exponential(A: np.ndarray, t: float):
    """Compute e^(At)."""
    return linalg.expm(A * t)

# Example
A = np.array([[0, 1], [-1, 0]])
eAt = matrix_exponential(A, np.pi/2)
print(f"e^(At) at t=π/2:\n{eAt}")
```

## SVD

```python
def compute_svd(A: np.ndarray):
    """Compute Singular Value Decomposition."""
    U, sigma, Vt = np.linalg.svd(A)
    return U, sigma, Vt

def low_rank_approximation(A: np.ndarray, k: int):
    """Best rank-k approximation using SVD."""
    U, sigma, Vt = compute_svd(A)
    sigma_k = np.zeros_like(A, dtype=float)
    min_dim = min(k, len(sigma))
    sigma_k[:min_dim, :min_dim] = np.diag(sigma[:min_dim])
    return U @ sigma_k @ Vt

# Example
A = np.array([[4, 0], [3, -5]], dtype=float)
A_rank1 = low_rank_approximation(A, 1)
print(f"Best rank-1 approximation:\n{A_rank1}")
```

## Positive Definite Matrices

```python
def is_positive_definite(A: np.ndarray) -> bool:
    """Check if matrix is positive definite."""
    try:
        np.linalg.cholesky(A)
        return True
    except np.linalg.LinAlgError:
        return False

def cholesky_decomposition(A: np.ndarray):
    """Compute Cholesky decomposition A = LL^T."""
    return np.linalg.cholesky(A)

# Example
A = np.array([[2, -1, 0], [-1, 2, -1], [0, -1, 2]])
print(f"Is A positive definite? {is_positive_definite(A)}")
if is_positive_definite(A):
    L = cholesky_decomposition(A)
    print(f"Cholesky factor L:\n{L}")
```

## Applications

### Difference Equations

```python
def solve_difference_equation(A: np.ndarray, x0: np.ndarray, n: int):
    """Solve x_{k+1} = Ax_k for k = 0, 1, ..., n."""
    trajectory = [x0]
    for _ in range(n):
        trajectory.append(A @ trajectory[-1])
    return np.array(trajectory)

# Example: Markov chain
A = np.array([[0.8, 0.3], [0.2, 0.7]])
x0 = np.array([1, 0])
trajectory = solve_difference_equation(A, x0, 20)
print(f"Final state: {trajectory[-1]}")
```

### Differential Equations

```python
def solve_linear_ode(A: np.ndarray, x0: np.ndarray, t_span: np.ndarray):
    """Solve dx/dt = Ax with x(0) = x0."""
    solutions = []
    for t in t_span:
        solutions.append(matrix_exponential(A, t) @ x0)
    return np.array(solutions)

# Example
A = np.array([[2, 1], [1, 2]])
x0 = np.array([1, 0])
t = np.linspace(0, 2, 100)
solutions = solve_linear_ode(A, x0, t)
```

## Visualization

```python
def visualize_eigenvectors(A: np.ndarray):
    """Visualize eigenvectors of 2x2 matrix."""
    # To be implemented
    pass

def visualize_svd(A: np.ndarray):
    """Visualize SVD geometric interpretation."""
    # To be implemented
    pass
```

---

## Dependencies

```txt
numpy>=1.21.0
scipy>=1.7.0
matplotlib>=3.4.0
```
