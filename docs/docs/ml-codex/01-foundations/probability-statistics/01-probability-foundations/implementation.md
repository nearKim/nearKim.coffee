---
sidebar_position: 8
---

# Section 1: Python Implementation

Python implementations and computational examples for Probability Foundations.

## Setup

```python
import numpy as np
from scipy import stats
from typing import Callable
import matplotlib.pyplot as plt
```

## Bayes' Theorem Calculator

```python
def bayes_theorem(prior: float, likelihood: float, marginal: float) -> float:
    """
    Compute posterior probability using Bayes' theorem.

    P(A|B) = P(B|A) * P(A) / P(B)
    """
    return likelihood * prior / marginal

# Example: Medical test (Problem 1.1)
sensitivity = 0.95  # P(+|disease)
specificity = 0.90  # P(-|no disease)
prevalence = 0.01   # P(disease)

# P(+) = P(+|disease)*P(disease) + P(+|no disease)*P(no disease)
p_positive = sensitivity * prevalence + (1 - specificity) * (1 - prevalence)
posterior = bayes_theorem(prevalence, sensitivity, p_positive)
print(f"P(disease | positive test) = {posterior:.4f}")
```

## Distribution Sampling and Visualization

```python
def plot_distribution(dist, x_range, title: str, dist_type: str = "continuous"):
    """
    Plot PDF/PMF and CDF of a distribution.
    """
    # To be implemented with matplotlib
    pass

# Common distributions
distributions = {
    "Bernoulli(0.3)": stats.bernoulli(0.3),
    "Binomial(10, 0.3)": stats.binom(10, 0.3),
    "Poisson(5)": stats.poisson(5),
    "Normal(0, 1)": stats.norm(0, 1),
    "Exponential(1)": stats.expon(scale=1),
    "Beta(2, 5)": stats.beta(2, 5),
}
```

## Expectation and Variance via Simulation

```python
def simulate_moments(dist, n_samples: int = 100000) -> dict:
    """
    Estimate moments of a distribution via simulation.

    Returns:
        Dictionary with mean, variance, skewness, kurtosis
    """
    samples = dist.rvs(n_samples)
    return {
        "mean": np.mean(samples),
        "variance": np.var(samples),
        "skewness": stats.skew(samples),
        "kurtosis": stats.kurtosis(samples),
    }

# Example
normal = stats.norm(3, 2)
moments = simulate_moments(normal)
print(f"Simulated moments: {moments}")
print(f"Theoretical: mean={normal.mean()}, var={normal.var()}")
```

## Law of Large Numbers Demonstration

```python
def demonstrate_lln(dist, n_max: int = 10000):
    """
    Demonstrate the law of large numbers via running averages.
    """
    samples = dist.rvs(n_max)
    running_avg = np.cumsum(samples) / np.arange(1, n_max + 1)
    # To be plotted showing convergence to E[X]
    return running_avg

# To be implemented with visualization
```

## Problem Solutions

### Solution to Problem 1.1

```python
def solve_problem_1_1():
    """Medical test Bayes' theorem problem."""
    sensitivity = 0.95
    specificity = 0.90
    prevalence = 0.01

    p_positive = sensitivity * prevalence + (1 - specificity) * (1 - prevalence)
    posterior = sensitivity * prevalence / p_positive
    print(f"P(disease | +) = {posterior:.4f}")
    # Answer: ~0.0876 (about 8.8%)

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
scipy>=1.7.0
matplotlib>=3.4.0
```
