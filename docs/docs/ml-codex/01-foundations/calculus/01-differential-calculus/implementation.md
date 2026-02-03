---
sidebar_position: 8
---

# Section 1: Python Implementation

Python implementations and computational examples for Differential Calculus.

## Setup

```python
import numpy as np
from typing import Callable, Tuple
import matplotlib.pyplot as plt
```

## Numerical Gradient

```python
def numerical_gradient(f: Callable, x: np.ndarray, h: float = 1e-7) -> np.ndarray:
    """
    Compute the gradient of f at x using central differences.

    Args:
        f: Scalar-valued function of a vector
        x: Point at which to evaluate the gradient
        h: Step size for finite differences

    Returns:
        Gradient vector
    """
    grad = np.zeros_like(x, dtype=float)
    for i in range(len(x)):
        x_plus = x.copy()
        x_minus = x.copy()
        x_plus[i] += h
        x_minus[i] -= h
        grad[i] = (f(x_plus) - f(x_minus)) / (2 * h)
    return grad

# Example
f = lambda x: x[0]**2 * x[1] + np.exp(x[1] * x[2]) + np.log(x[0] * x[2])
x0 = np.array([1.0, 0.0, 1.0])
print(f"Numerical gradient at (1,0,1): {numerical_gradient(f, x0)}")
```

## Directional Derivative

```python
def directional_derivative(f: Callable, x: np.ndarray, v: np.ndarray, h: float = 1e-7) -> float:
    """
    Compute the directional derivative of f at x in direction v.

    Returns:
        Scalar directional derivative
    """
    v_hat = v / np.linalg.norm(v)
    grad = numerical_gradient(f, x, h)
    return np.dot(grad, v_hat)

# Example
f2 = lambda x: x[0]**2 * x[1] - x[1]**3
x0 = np.array([2.0, 1.0])
v = np.array([3.0, 4.0])
print(f"Directional derivative: {directional_derivative(f2, x0, v)}")
```

## Numerical Jacobian

```python
def numerical_jacobian(f: Callable, x: np.ndarray, h: float = 1e-7) -> np.ndarray:
    """
    Compute the Jacobian matrix of f: R^n -> R^m at x.

    Returns:
        m x n Jacobian matrix
    """
    f0 = np.atleast_1d(f(x))
    m = len(f0)
    n = len(x)
    J = np.zeros((m, n))
    for j in range(n):
        x_plus = x.copy()
        x_minus = x.copy()
        x_plus[j] += h
        x_minus[j] -= h
        J[:, j] = (np.atleast_1d(f(x_plus)) - np.atleast_1d(f(x_minus))) / (2 * h)
    return J

# Example
g = lambda x: np.array([x[0]**2 + x[1], x[0]*x[1], np.exp(x[0])])
x0 = np.array([1.0, 2.0])
print(f"Jacobian at (1,2):\n{numerical_jacobian(g, x0)}")
```

## Numerical Hessian

```python
def numerical_hessian(f: Callable, x: np.ndarray, h: float = 1e-5) -> np.ndarray:
    """
    Compute the Hessian matrix of f: R^n -> R at x.

    Returns:
        n x n Hessian matrix
    """
    n = len(x)
    H = np.zeros((n, n))
    for i in range(n):
        for j in range(n):
            x_pp = x.copy(); x_pp[i] += h; x_pp[j] += h
            x_pm = x.copy(); x_pm[i] += h; x_pm[j] -= h
            x_mp = x.copy(); x_mp[i] -= h; x_mp[j] += h
            x_mm = x.copy(); x_mm[i] -= h; x_mm[j] -= h
            H[i, j] = (f(x_pp) - f(x_pm) - f(x_mp) + f(x_mm)) / (4 * h**2)
    return H

# Example
f3 = lambda x: x[0]**3 - 3*x[0]*x[1] + x[1]**3
x0 = np.array([1.0, 1.0])
print(f"Hessian at (1,1):\n{numerical_hessian(f3, x0)}")
```

## Visualization

```python
def visualize_gradient_field(f: Callable, xlim: Tuple, ylim: Tuple, title: str = "Gradient Field"):
    """
    Visualize the gradient field of a 2D scalar function.
    """
    # To be implemented with matplotlib quiver plot
    pass
```

## Problem Solutions

### Solution to Problem 1.1

```python
def solve_problem_1_1():
    """Compute gradient of f(x,y,z) = x^2*y + e^(yz) + ln(xz) at (1,0,1)."""
    f = lambda x: x[0]**2 * x[1] + np.exp(x[1]*x[2]) + np.log(x[0]*x[2])
    x0 = np.array([1.0, 0.0, 1.0])
    grad = numerical_gradient(f, x0)
    print(f"Gradient: {grad}")
    # Analytical: (2xy + 1/x, x^2 + ze^(yz), ye^(yz) + 1/z)
    # At (1,0,1): (0 + 1, 1 + 1, 0 + 1) = (1, 2, 1)

solve_problem_1_1()
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
matplotlib>=3.4.0
```
