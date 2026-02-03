---
sidebar_position: 7
---

# Section 3: Python Implementation

Python implementations and computational examples for Advanced Topics for ML.

## Setup

```python
import numpy as np
from scipy import stats
from typing import Callable
import matplotlib.pyplot as plt
```

## Exponential Family Utilities

```python
def bernoulli_exponential_form(p: float, x: int) -> float:
    """
    Compute Bernoulli probability in exponential family form.

    p(x|eta) = exp(eta*x - log(1 + exp(eta)))
    where eta = log(p/(1-p)) is the natural parameter.
    """
    eta = np.log(p / (1 - p))
    log_partition = np.log(1 + np.exp(eta))
    return np.exp(eta * x - log_partition)

# Example
p = 0.7
for x in [0, 1]:
    standard = p**x * (1-p)**(1-x)
    exp_form = bernoulli_exponential_form(p, x)
    print(f"P(X={x}): standard={standard:.4f}, exp_form={exp_form:.4f}")
```

## Information Theory

```python
def entropy(probs: np.ndarray) -> float:
    """Compute Shannon entropy H(X) = -sum p(x) log p(x)."""
    probs = probs[probs > 0]
    return -np.sum(probs * np.log2(probs))

def cross_entropy(p: np.ndarray, q: np.ndarray) -> float:
    """Compute cross-entropy H(p, q) = -sum p(x) log q(x)."""
    mask = p > 0
    return -np.sum(p[mask] * np.log2(q[mask]))

def kl_divergence(p: np.ndarray, q: np.ndarray) -> float:
    """Compute KL divergence D_KL(p || q) = sum p(x) log(p(x)/q(x))."""
    mask = p > 0
    return np.sum(p[mask] * np.log2(p[mask] / q[mask]))

# Example: fair vs biased coin
fair = np.array([0.5, 0.5])
biased = np.array([0.9, 0.1])
print(f"H(fair) = {entropy(fair):.4f} bits")
print(f"H(biased) = {entropy(biased):.4f} bits")
print(f"D_KL(fair || biased) = {kl_divergence(fair, biased):.4f} bits")
```

## Concentration Inequality Demonstrations

```python
def hoeffding_sample_size(epsilon: float, delta: float, a: float = 0, b: float = 1) -> int:
    """
    Compute minimum sample size from Hoeffding's inequality.

    P(|X_bar - mu| >= epsilon) <= delta
    n >= (b-a)^2 / (2 * epsilon^2) * log(2/delta)
    """
    n = (b - a)**2 / (2 * epsilon**2) * np.log(2 / delta)
    return int(np.ceil(n))

# Example (Problem 3.2)
n = hoeffding_sample_size(0.01, 0.05)
print(f"Required n for epsilon=0.01, delta=0.05: {n}")
```

## Central Limit Theorem Demonstration

```python
def demonstrate_clt(dist, n_samples: int = 30, n_experiments: int = 10000):
    """
    Demonstrate CLT by showing distribution of sample means.
    """
    means = []
    for _ in range(n_experiments):
        sample = dist.rvs(n_samples)
        means.append(np.mean(sample))
    means = np.array(means)
    # Should be approximately normal
    return means

# To be implemented with visualization
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
scipy>=1.7.0
matplotlib>=3.4.0
```
