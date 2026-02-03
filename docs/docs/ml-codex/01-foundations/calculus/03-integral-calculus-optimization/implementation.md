---
sidebar_position: 6
---

# Section 3: Python Implementation

Python implementations and computational examples for Integral Calculus and Optimization.

## Setup

```python
import numpy as np
from typing import Callable, Tuple
import matplotlib.pyplot as plt
```

## Monte Carlo Integration

```python
def monte_carlo_integrate(f: Callable, a: float, b: float, n_samples: int = 10000) -> Tuple[float, float]:
    """
    Estimate the integral of f over [a, b] using Monte Carlo.

    Returns:
        Tuple of (estimate, standard_error)
    """
    samples = np.random.uniform(a, b, n_samples)
    values = np.array([f(x) for x in samples])
    estimate = (b - a) * np.mean(values)
    std_error = (b - a) * np.std(values) / np.sqrt(n_samples)
    return estimate, std_error

# Example: integral of e^(-x^2) from 0 to 1
f = lambda x: np.exp(-x**2)
estimate, se = monte_carlo_integrate(f, 0, 1)
print(f"Estimate: {estimate:.6f} +/- {se:.6f}")
```

## Gradient Descent

```python
def gradient_descent(
    f: Callable,
    grad_f: Callable,
    x0: np.ndarray,
    lr: float = 0.01,
    max_iter: int = 1000,
    tol: float = 1e-8
) -> Tuple[np.ndarray, list]:
    """
    Gradient descent optimization.

    Returns:
        Tuple of (optimal_x, loss_history)
    """
    x = x0.copy()
    history = [f(x)]
    for _ in range(max_iter):
        g = grad_f(x)
        x = x - lr * g
        history.append(f(x))
        if np.linalg.norm(g) < tol:
            break
    return x, history

# Example: minimize f(x) = 0.5 * x^T A x - b^T x
A = np.array([[2.0, 0.5], [0.5, 1.0]])
b = np.array([1.0, 2.0])
f = lambda x: 0.5 * x @ A @ x - b @ x
grad_f = lambda x: A @ x - b

x_opt, history = gradient_descent(f, grad_f, np.zeros(2), lr=0.3)
print(f"Optimal x: {x_opt}")
print(f"Analytical: {np.linalg.solve(A, b)}")
```

## Newton's Method

```python
def newtons_method(
    grad_f: Callable,
    hess_f: Callable,
    x0: np.ndarray,
    max_iter: int = 100,
    tol: float = 1e-10
) -> np.ndarray:
    """
    Newton's method for optimization.

    Returns:
        Optimal x
    """
    x = x0.copy()
    for _ in range(max_iter):
        g = grad_f(x)
        H = hess_f(x)
        step = np.linalg.solve(H, -g)
        x = x + step
        if np.linalg.norm(g) < tol:
            break
    return x

# To be used with specific functions
```

## Visualization

```python
def visualize_optimization(f: Callable, history: list, title: str = "Convergence"):
    """
    Visualize optimization convergence.
    """
    # To be implemented with matplotlib
    pass
```

---

## Running the Code

To run these implementations:

```bash
python section3_implementation.py
```

## Dependencies

```txt
numpy>=1.21.0
matplotlib>=3.4.0
```
