---
sidebar_position: 5
---

# Taylor Approximation

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Approximate Complex Functions with Simple Polynomials?

Many functions in machine learning are too complicated to analyze directly. Taylor approximation replaces a function with a polynomial that matches its behavior near a point. First-order approximations give us gradient descent; second-order approximations give us Newton's method.

Consider these scenarios:
1. Gradient descent assumes the loss is approximately linear near the current point: $L(\theta + \delta) \approx L(\theta) + \nabla L \cdot \delta$. This is a first-order Taylor expansion.
2. Newton's method uses a quadratic approximation: $L(\theta + \delta) \approx L(\theta) + \nabla L \cdot \delta + \frac{1}{2}\delta^T H \delta$. The optimal step minimizes this quadratic.
3. The Laplace approximation in Bayesian inference approximates the posterior with a Gaussian by taking a second-order Taylor expansion of the log-posterior around its mode.

Taylor approximation bridges the gap between exact analysis and practical computation.

---

## Topics to Cover

### Taylor Series in One Dimension
- $f(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots$
- Remainder terms and convergence
- Common Taylor series: $e^x$, $\sin x$, $\ln(1+x)$

### Multivariate Taylor Expansion
- First-order: $f(x + h) \approx f(x) + \nabla f(x)^T h$
- Second-order: $f(x + h) \approx f(x) + \nabla f(x)^T h + \frac{1}{2}h^T H_f(x) h$
- Vector notation and the role of the gradient and Hessian

### Linearization
- Tangent plane approximation
- When linearization is sufficient (small perturbations, sensitivity analysis)
- Linearization of nonlinear systems

### Quadratic Approximation
- The connection to Newton's method: minimize the quadratic model
- Quadratic form $\frac{1}{2}x^T A x + b^T x + c$ and its minimizer
- Trust regions: when the quadratic approximation is trustworthy

---

## Summary

**Answering the Central Question:** Taylor approximation replaces a complicated function with a polynomial that matches the function's value, slope, and curvature at a point. The first-order approximation $f(x+h) \approx f(x) + \nabla f^T h$ underlies gradient descent. The second-order approximation $f(x+h) \approx f(x) + \nabla f^T h + \frac{1}{2}h^T H h$ underlies Newton's method and the Laplace approximation. Higher-order terms are rarely needed in ML because we only need local accuracy, and the cost of computing higher derivatives grows rapidly.

---

## Applications in Data Science and Machine Learning

- **Gradient descent**: A consequence of the first-order Taylor approximation with a step size constraint
- **Newton's method**: Minimizing the second-order Taylor model gives the update $\delta = -H^{-1}\nabla f$
- **Laplace approximation**: Approximating the log-posterior with a quadratic yields a Gaussian approximation to the posterior distribution
- **Activation function approximations**: ReLU, sigmoid, and softmax can be analyzed via their Taylor expansions around key points
- **Loss function analysis**: Taylor expansion around a critical point reveals whether it is a minimum, maximum, or saddle point

---

## Guided Problems

---

## References

1. Stewart, James - *Calculus: Early Transcendentals*, 8th ed., Chapter 11.10-11.11
2. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 5.4
3. Boyd and Vandenberghe - [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/), Section 9.5
4. Nocedal and Wright - *Numerical Optimization*, 2nd ed., Chapter 2
