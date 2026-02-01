---
sidebar_position: 7
---

# Section 3: Python Implementation

Python implementations for Applied Linear Algebra.

## Setup

```python
import numpy as np
from scipy import linalg, optimize, sparse
import matplotlib.pyplot as plt
```

## Orthogonality

```python
def is_orthogonal(v: np.ndarray, w: np.ndarray, tol: float = 1e-10) -> bool:
    """Check if two vectors are orthogonal."""
    return abs(np.dot(v, w)) < tol

def orthonormal_basis(vectors: list) -> np.ndarray:
    """Convert list of vectors to orthonormal basis using Gram-Schmidt."""
    # To be implemented
    pass

# Example
v1 = np.array([1, 1, 1])
v2 = np.array([1, -2, 1])
print(f"Are v1, v2 orthogonal? {is_orthogonal(v1, v2)}")
```

## Projections

```python
def project_onto_line(b: np.ndarray, a: np.ndarray) -> np.ndarray:
    """Project vector b onto line through a."""
    return (np.dot(b, a) / np.dot(a, a)) * a

def projection_matrix(A: np.ndarray) -> np.ndarray:
    """Compute projection matrix P = A(A^T A)^(-1)A^T."""
    return A @ np.linalg.inv(A.T @ A) @ A.T

def project_onto_subspace(b: np.ndarray, A: np.ndarray) -> np.ndarray:
    """Project b onto column space of A."""
    P = projection_matrix(A)
    return P @ b

# Example
b = np.array([1, 2, 3])
a = np.array([1, 1, 1])
p = project_onto_line(b, a)
print(f"Projection: {p}")
print(f"Error vector: {b - p}")
print(f"Is error orthogonal to a? {is_orthogonal(b - p, a)}")
```

## Least Squares

```python
def least_squares(A: np.ndarray, b: np.ndarray) -> np.ndarray:
    """Solve least squares problem: minimize ||Ax - b||²."""
    # Normal equations: A^T A x = A^T b
    return np.linalg.solve(A.T @ A, A.T @ b)

def fit_line(x_data: np.ndarray, y_data: np.ndarray) -> tuple:
    """Fit line y = C + Dx to data."""
    A = np.column_stack([np.ones(len(x_data)), x_data])
    coeffs = least_squares(A, y_data)
    C, D = coeffs
    return C, D

# Example: Fit line to data
x = np.array([0, 1, 2])
y = np.array([6, 0, 0])
C, D = fit_line(x, y)
print(f"Best fit line: y = {C:.2f} + {D:.2f}t")

# Visualize
plt.scatter(x, y, label='Data')
x_line = np.linspace(-0.5, 2.5, 100)
y_line = C + D * x_line
plt.plot(x_line, y_line, 'r-', label=f'y = {C:.2f} + {D:.2f}t')
plt.legend()
plt.grid(True)
```

## Gram-Schmidt Process

```python
def gram_schmidt(vectors: list) -> np.ndarray:
    """
    Apply Gram-Schmidt orthogonalization.

    Returns orthogonal (not normalized) vectors.
    """
    orthogonal = []
    for v in vectors:
        # Subtract projections onto previous vectors
        v_orth = v.copy()
        for u in orthogonal:
            v_orth -= (np.dot(v, u) / np.dot(u, u)) * u
        orthogonal.append(v_orth)
    return np.array(orthogonal)

def qr_decomposition(A: np.ndarray) -> tuple:
    """Compute QR decomposition using Gram-Schmidt."""
    Q, R = np.linalg.qr(A)
    return Q, R

# Example
a1 = np.array([1., 1., 0.])
a2 = np.array([1., 0., 1.])
a3 = np.array([0., 1., 1.])

orthogonal = gram_schmidt([a1, a2, a3])
print("Orthogonal vectors:")
for i, v in enumerate(orthogonal):
    print(f"q{i+1} = {v}")

# Verify orthogonality
print(f"\nq1 · q2 = {np.dot(orthogonal[0], orthogonal[1]):.10f}")
print(f"q1 · q3 = {np.dot(orthogonal[0], orthogonal[2]):.10f}")
print(f"q2 · q3 = {np.dot(orthogonal[1], orthogonal[2]):.10f}")
```

## Optimization

```python
def minimize_quadratic(A: np.ndarray, b: np.ndarray) -> np.ndarray:
    """
    Minimize f(x) = (1/2)x^T A x - b^T x.

    Solution: x* = A^(-1) b (when A is positive definite).
    """
    return np.linalg.solve(A, b)

def gradient_descent(A: np.ndarray, b: np.ndarray,
                    x0: np.ndarray,
                    learning_rate: float = 0.01,
                    max_iter: int = 1000,
                    tol: float = 1e-6) -> np.ndarray:
    """
    Minimize f(x) = (1/2)x^T A x - b^T x using gradient descent.

    Gradient: ∇f = Ax - b
    """
    x = x0.copy()
    for i in range(max_iter):
        grad = A @ x - b
        x_new = x - learning_rate * grad

        if np.linalg.norm(x_new - x) < tol:
            print(f"Converged in {i+1} iterations")
            break

        x = x_new

    return x

# Example
A = np.array([[2., 1.], [1., 2.]])
b = np.array([1., 1.])

# Direct solution
x_exact = minimize_quadratic(A, b)
print(f"Exact solution: {x_exact}")

# Gradient descent
x_gd = gradient_descent(A, b, x0=np.zeros(2), learning_rate=0.1)
print(f"Gradient descent: {x_gd}")
```

## Constrained Optimization

```python
from scipy.optimize import minimize

def objective(x):
    return x[0]**2 + x[1]**2

def constraint(x):
    return x[0] + x[1] - 1

result = minimize(objective, x0=[0, 0],
                 constraints={'type': 'eq', 'fun': constraint})
print(f"Constrained minimum: {result.x}")
print(f"Minimum value: {result.fun}")
```

## Matrix Norms and Condition Number

```python
def compute_norms(A: np.ndarray):
    """Compute various norms of matrix A."""
    norm_1 = np.linalg.norm(A, ord=1)        # Max column sum
    norm_2 = np.linalg.norm(A, ord=2)        # Spectral norm (max singular value)
    norm_inf = np.linalg.norm(A, ord=np.inf) # Max row sum
    norm_fro = np.linalg.norm(A, ord='fro')  # Frobenius norm

    return {
        '1-norm': norm_1,
        '2-norm': norm_2,
        'inf-norm': norm_inf,
        'Frobenius': norm_fro
    }

def analyze_conditioning(A: np.ndarray):
    """Analyze matrix conditioning and sensitivity."""
    kappa = np.linalg.cond(A, p=2)
    print(f"Condition number κ(A) = {kappa:.4e}")

    if kappa < 10:
        print("Well-conditioned")
    elif kappa < 1000:
        print("Moderately conditioned")
    else:
        print("Ill-conditioned")

    return kappa

# Example: Hilbert matrix (notoriously ill-conditioned)
n = 5
H = np.array([[1/(i+j+1) for j in range(n)] for i in range(n)])
print("Hilbert matrix conditioning:")
analyze_conditioning(H)
```

## Eigenvalue Computation

```python
def power_method(A: np.ndarray, x0: np.ndarray = None,
                max_iter: int = 100, tol: float = 1e-6):
    """
    Compute dominant eigenvalue and eigenvector using power method.
    """
    n = A.shape[0]
    if x0 is None:
        x0 = np.random.rand(n)

    x = x0 / np.linalg.norm(x0)

    for i in range(max_iter):
        y = A @ x
        x_new = y / np.linalg.norm(y)
        eigenvalue = x_new @ (A @ x_new)

        if np.linalg.norm(x_new - x) < tol:
            print(f"Converged in {i+1} iterations")
            return eigenvalue, x_new

        x = x_new

    print(f"Did not converge in {max_iter} iterations")
    return eigenvalue, x

# Example
A = np.array([[2., 1.], [1., 2.]])
eigenvalue, eigenvector = power_method(A)
print(f"Dominant eigenvalue: {eigenvalue:.6f}")
print(f"Dominant eigenvector: {eigenvector}")

# Verify
actual_eigenvalues = np.linalg.eigvalsh(A)
print(f"Actual eigenvalues: {actual_eigenvalues}")
```

## Iterative Methods

```python
def jacobi_iteration(A: np.ndarray, b: np.ndarray, x0: np.ndarray = None,
                    max_iter: int = 100, tol: float = 1e-6):
    """Solve Ax = b using Jacobi iteration."""
    n = len(b)
    if x0 is None:
        x0 = np.zeros(n)

    x = x0.copy()
    D = np.diag(np.diag(A))
    R = A - D

    for i in range(max_iter):
        x_new = np.linalg.solve(D, b - R @ x)

        if np.linalg.norm(x_new - x) < tol:
            print(f"Jacobi converged in {i+1} iterations")
            return x_new

        x = x_new

    print(f"Jacobi did not converge in {max_iter} iterations")
    return x

def gauss_seidel(A: np.ndarray, b: np.ndarray, x0: np.ndarray = None,
                max_iter: int = 100, tol: float = 1e-6):
    """Solve Ax = b using Gauss-Seidel iteration."""
    n = len(b)
    if x0 is None:
        x0 = np.zeros(n)

    x = x0.copy()

    for k in range(max_iter):
        x_old = x.copy()

        for i in range(n):
            sigma = sum(A[i, j] * x[j] for j in range(n) if j != i)
            x[i] = (b[i] - sigma) / A[i, i]

        if np.linalg.norm(x - x_old) < tol:
            print(f"Gauss-Seidel converged in {k+1} iterations")
            return x

    print(f"Gauss-Seidel did not converge in {max_iter} iterations")
    return x

# Example
A = np.array([[4., 1., 0.],
              [1., 4., 1.],
              [0., 1., 4.]])
b = np.array([1., 2., 3.])

x_jacobi = jacobi_iteration(A, b)
x_gauss = gauss_seidel(A, b)
x_exact = np.linalg.solve(A, b)

print(f"\nJacobi solution: {x_jacobi}")
print(f"Gauss-Seidel solution: {x_gauss}")
print(f"Exact solution: {x_exact}")
```

## Conjugate Gradient

```python
def conjugate_gradient(A: np.ndarray, b: np.ndarray, x0: np.ndarray = None,
                      max_iter: int = None, tol: float = 1e-6):
    """
    Solve Ax = b using conjugate gradient (A must be SPD).
    """
    n = len(b)
    if x0 is None:
        x0 = np.zeros(n)
    if max_iter is None:
        max_iter = n

    x = x0.copy()
    r = b - A @ x
    p = r.copy()
    rs_old = r @ r

    for i in range(max_iter):
        Ap = A @ p
        alpha = rs_old / (p @ Ap)
        x = x + alpha * p
        r = r - alpha * Ap
        rs_new = r @ r

        if np.sqrt(rs_new) < tol:
            print(f"CG converged in {i+1} iterations")
            return x

        p = r + (rs_new / rs_old) * p
        rs_old = rs_new

    return x

# Example
n = 100
A = np.random.rand(n, n)
A = A @ A.T  # Make symmetric positive definite
b = np.random.rand(n)

x_cg = conjugate_gradient(A, b)
x_exact = np.linalg.solve(A, b)
print(f"CG error: {np.linalg.norm(x_cg - x_exact):.6e}")
```

---

## Dependencies

```txt
numpy>=1.21.0
scipy>=1.7.0
matplotlib>=3.4.0
```
