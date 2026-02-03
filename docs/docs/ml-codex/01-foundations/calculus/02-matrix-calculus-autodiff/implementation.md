---
sidebar_position: 6
---

# Section 2: Python Implementation

Python implementations and computational examples for Matrix Calculus and Automatic Differentiation.

## Setup

```python
import numpy as np
from typing import Tuple, List
```

## Matrix Calculus Verification

```python
def verify_trace_derivative(A: np.ndarray, X: np.ndarray, B: np.ndarray, h: float = 1e-7) -> np.ndarray:
    """
    Numerically verify d/dX tr(AXB) = A^T B^T.

    Returns:
        Numerical gradient matrix
    """
    m, n = X.shape
    grad = np.zeros_like(X)
    for i in range(m):
        for j in range(n):
            X_plus = X.copy()
            X_minus = X.copy()
            X_plus[i, j] += h
            X_minus[i, j] -= h
            grad[i, j] = (np.trace(A @ X_plus @ B) - np.trace(A @ X_minus @ B)) / (2 * h)
    return grad

# Example
A = np.random.randn(3, 3)
X = np.random.randn(3, 3)
B = np.random.randn(3, 3)
numerical = verify_trace_derivative(A, X, B)
analytical = A.T @ B.T
print(f"Match: {np.allclose(numerical, analytical)}")
```

## Dual Numbers for Forward-Mode AD

```python
class Dual:
    """Dual number for forward-mode automatic differentiation."""

    def __init__(self, value: float, derivative: float = 0.0):
        self.value = value
        self.derivative = derivative

    def __add__(self, other):
        if isinstance(other, Dual):
            return Dual(self.value + other.value, self.derivative + other.derivative)
        return Dual(self.value + other, self.derivative)

    def __radd__(self, other):
        return self.__add__(other)

    def __mul__(self, other):
        if isinstance(other, Dual):
            return Dual(self.value * other.value,
                       self.value * other.derivative + self.derivative * other.value)
        return Dual(self.value * other, self.derivative * other)

    def __rmul__(self, other):
        return self.__mul__(other)

    def __repr__(self):
        return f"Dual({self.value}, {self.derivative})"

# Example: f(x) = x^2 + 2x + 1, f'(3) = 8
x = Dual(3.0, 1.0)  # seed derivative = 1
result = x * x + 2 * x + 1
print(f"f(3) = {result.value}, f'(3) = {result.derivative}")
```

## Simple Reverse-Mode AD

```python
class Variable:
    """Simple computational graph node for reverse-mode AD."""

    def __init__(self, value: float, children=None, grad_fn=None):
        self.value = value
        self.grad = 0.0
        self.children = children or []
        self.grad_fn = grad_fn

    def backward(self, grad: float = 1.0):
        """Propagate gradient backward through the graph."""
        self.grad += grad
        if self.grad_fn:
            child_grads = self.grad_fn(grad)
            for child, g in zip(self.children, child_grads):
                child.backward(g)

# To be extended with __add__, __mul__, sin, log operations
```

---

## Running the Code

To run these implementations:

```bash
python section2_implementation.py
```

## Dependencies

```txt
numpy>=1.21.0
```
