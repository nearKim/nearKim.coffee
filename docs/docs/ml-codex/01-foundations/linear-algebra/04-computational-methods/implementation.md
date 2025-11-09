---
sidebar_position: 7
---

# Section 4: Python Implementation

Python implementations for Computational Methods & Applications.

## Setup

```python
import numpy as np
from scipy import linalg, sparse, optimize
import networkx as nx
import matplotlib.pyplot as plt
```

## Matrix Norms

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

# Example
A = np.array([[1, 2], [3, 4]])
norms = compute_norms(A)
for name, value in norms.items():
    print(f"||A||_{name} = {value:.4f}")
```

## Condition Number

```python
def condition_number(A: np.ndarray, ord=2) -> float:
    """Compute condition number of A."""
    return np.linalg.cond(A, p=ord)

def analyze_conditioning(A: np.ndarray):
    """Analyze matrix conditioning and sensitivity."""
    kappa = condition_number(A)
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
        # Multiply by A
        y = A @ x

        # Normalize
        x_new = y / np.linalg.norm(y)

        # Rayleigh quotient (eigenvalue estimate)
        eigenvalue = x_new @ (A @ x_new)

        # Check convergence
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

## Linear Programming

```python
def solve_linear_program(c, A_ub, b_ub, A_eq=None, b_eq=None, bounds=None):
    """
    Solve LP using scipy:
    minimize c^T x
    subject to A_ub x <= b_ub
              A_eq x = b_eq
              bounds on x
    """
    result = optimize.linprog(c, A_ub=A_ub, b_ub=b_ub,
                             A_eq=A_eq, b_eq=b_eq,
                             bounds=bounds, method='highs')
    return result

# Example: Maximize 3x + 4y subject to x + 2y <= 8, 3x + 2y <= 12, x,y >= 0
# Convert to minimization
c = np.array([-3, -4])  # Negative for maximization
A_ub = np.array([[1, 2], [3, 2]])
b_ub = np.array([8, 12])
bounds = [(0, None), (0, None)]

result = solve_linear_program(c, A_ub, b_ub, bounds=bounds)
print(f"Optimal solution: x = {result.x}")
print(f"Optimal value: {-result.fun:.2f}")  # Negative to get max
```

## Network Flow

```python
def max_flow_example():
    """Example of max flow problem using NetworkX."""
    G = nx.DiGraph()
    G.add_edge('s', 'a', capacity=10)
    G.add_edge('s', 'b', capacity=5)
    G.add_edge('a', 'b', capacity=15)
    G.add_edge('a', 't', capacity=10)
    G.add_edge('b', 't', capacity=10)

    flow_value, flow_dict = nx.maximum_flow(G, 's', 't')
    print(f"Maximum flow value: {flow_value}")
    print(f"Flow distribution: {flow_dict}")

    return flow_value, flow_dict

# Example
max_flow_example()
```

## Game Theory

```python
def solve_zero_sum_game(payoff_matrix: np.ndarray):
    """
    Solve zero-sum game using LP.

    Returns: (value of game, row player strategy, column player strategy)
    """
    m, n = payoff_matrix.shape

    # Row player LP: max v subject to A^T y >= v, sum(y) = 1, y >= 0
    c_row = np.concatenate([np.zeros(m), [-1]])
    A_ub = np.hstack([-payoff_matrix.T, np.ones((n, 1))])
    b_ub = np.zeros(n)
    A_eq = np.concatenate([np.ones(m), [0]]).reshape(1, -1)
    b_eq = np.array([1])
    bounds = [(0, None)] * m + [(None, None)]

    result = optimize.linprog(c_row, A_ub=A_ub, b_ub=b_ub,
                             A_eq=A_eq, b_eq=b_eq, bounds=bounds)

    row_strategy = result.x[:-1]
    value = result.x[-1]

    return value, row_strategy

# Example
payoff = np.array([[3, -1], [-2, 4]])
value, strategy = solve_zero_sum_game(payoff)
print(f"Value of game: {value:.4f}")
print(f"Optimal strategy: {strategy}")
```

---

## Dependencies

```txt
numpy>=1.21.0
scipy>=1.7.0
networkx>=2.6
matplotlib>=3.4.0
```
