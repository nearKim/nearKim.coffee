---
sidebar_position: 8
---

# Section 2: Python Implementation

Python implementations and computational examples for Multivariate Distributions and Estimation.

## Setup

```python
import numpy as np
from scipy import stats
from typing import Tuple
import matplotlib.pyplot as plt
```

## Multivariate Gaussian Conditioning

```python
def gaussian_conditional(
    mu: np.ndarray,
    Sigma: np.ndarray,
    observed_indices: list,
    observed_values: np.ndarray
) -> Tuple[np.ndarray, np.ndarray]:
    """
    Compute conditional distribution of unobserved variables
    given observed values in a multivariate Gaussian.

    Returns:
        Tuple of (conditional_mean, conditional_covariance)
    """
    all_indices = list(range(len(mu)))
    unobserved = [i for i in all_indices if i not in observed_indices]

    mu_1 = mu[unobserved]
    mu_2 = mu[observed_indices]
    Sigma_11 = Sigma[np.ix_(unobserved, unobserved)]
    Sigma_12 = Sigma[np.ix_(unobserved, observed_indices)]
    Sigma_22 = Sigma[np.ix_(observed_indices, observed_indices)]

    Sigma_22_inv = np.linalg.inv(Sigma_22)
    cond_mean = mu_1 + Sigma_12 @ Sigma_22_inv @ (observed_values - mu_2)
    cond_cov = Sigma_11 - Sigma_12 @ Sigma_22_inv @ Sigma_12.T

    return cond_mean, cond_cov

# Example (Problem 2.1)
mu = np.array([1.0, 2.0])
Sigma = np.array([[4.0, 2.0], [2.0, 3.0]])
cond_mean, cond_var = gaussian_conditional(mu, Sigma, [1], np.array([3.0]))
print(f"E[X | Y=3] = {cond_mean[0]:.4f}")
print(f"Var(X | Y=3) = {cond_var[0,0]:.4f}")
```

## Maximum Likelihood Estimation

```python
def gaussian_mle(data: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
    """
    Compute MLE for multivariate Gaussian parameters.

    Returns:
        Tuple of (mu_hat, Sigma_hat)
    """
    mu_hat = np.mean(data, axis=0)
    Sigma_hat = np.cov(data, rowvar=False, bias=True)  # MLE uses 1/n
    return mu_hat, Sigma_hat

# Example
np.random.seed(42)
true_mu = np.array([1.0, 2.0])
true_Sigma = np.array([[4.0, 2.0], [2.0, 3.0]])
data = np.random.multivariate_normal(true_mu, true_Sigma, size=1000)
mu_hat, Sigma_hat = gaussian_mle(data)
print(f"MLE mean: {mu_hat}")
print(f"MLE covariance:\n{Sigma_hat}")
```

## Bayesian Inference: Beta-Binomial

```python
def beta_binomial_update(
    alpha_prior: float,
    beta_prior: float,
    n_heads: int,
    n_tails: int
) -> Tuple[float, float, float]:
    """
    Update Beta prior with Binomial likelihood.

    Returns:
        Tuple of (alpha_posterior, beta_posterior, posterior_mean)
    """
    alpha_post = alpha_prior + n_heads
    beta_post = beta_prior + n_tails
    post_mean = alpha_post / (alpha_post + beta_post)
    return alpha_post, beta_post, post_mean

# Example (Problem 4.1)
alpha_post, beta_post, post_mean = beta_binomial_update(2, 2, 7, 3)
print(f"Posterior: Beta({alpha_post}, {beta_post})")
print(f"Posterior mean: {post_mean:.4f}")
```

## Bayesian Inference: Normal-Normal

```python
def normal_normal_update(
    mu_0: float, sigma_0_sq: float,
    sigma_sq: float,
    data: np.ndarray
) -> Tuple[float, float]:
    """
    Update Gaussian prior on mean with Gaussian likelihood.

    Returns:
        Tuple of (posterior_mean, posterior_variance)
    """
    n = len(data)
    x_bar = np.mean(data)
    post_var = 1.0 / (1.0 / sigma_0_sq + n / sigma_sq)
    post_mean = post_var * (mu_0 / sigma_0_sq + n * x_bar / sigma_sq)
    return post_mean, post_var

# Example
data = np.array([2.1, 1.8, 2.3, 1.9, 2.0])
post_mean, post_var = normal_normal_update(0.0, 10.0, 1.0, data)
print(f"Posterior mean: {post_mean:.4f}")
print(f"Posterior variance: {post_var:.4f}")
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
scipy>=1.7.0
matplotlib>=3.4.0
```
