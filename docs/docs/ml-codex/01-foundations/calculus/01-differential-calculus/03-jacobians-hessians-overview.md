---
sidebar_position: 4
---

# Jacobians and Hessians

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Capture First-Order and Second-Order Behavior of Multivariate Functions?

The gradient tells us the first-order behavior of a scalar function. But what about vector-valued functions, or when we need second-order information? The Jacobian generalizes the gradient to vector-valued maps, and the Hessian captures curvature for scalar functions. Together they give us the tools to analyze transformations and optimize non-trivially.

Consider these scenarios:
1. A neural network layer maps $\mathbb{R}^n \to \mathbb{R}^m$. Its Jacobian is the $m \times n$ matrix of all partial derivatives, encoding how each output depends on each input.
2. Newton's method uses the Hessian (second derivatives) to take smarter optimization steps than gradient descent, accounting for curvature.
3. In normalizing flows, the Jacobian determinant measures how a transformation stretches or compresses probability density.

The Jacobian and Hessian are the workhorses of multivariate analysis in ML.

---

## Topics to Cover

### The Jacobian Matrix
- Definition for $f: \mathbb{R}^n \to \mathbb{R}^m$: $(J_f)_{ij} = \frac{\partial f_i}{\partial x_j}$
- Relationship to the gradient: for scalar-valued $f$, $J_f = (\nabla f)^T$
- The Jacobian as a linear approximation: $f(x + h) \approx f(x) + J_f(x) h$

### The Hessian Matrix
- Definition for $f: \mathbb{R}^n \to \mathbb{R}$: $(H_f)_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$
- Symmetry of the Hessian (Schwarz's theorem)
- Positive/negative definiteness and its meaning for convexity

### Second-Order Conditions
- Necessary conditions: at a minimum, $\nabla f = 0$ and $H \succeq 0$
- Sufficient conditions: $\nabla f = 0$ and $H \succ 0$ guarantees a local minimum
- Saddle points: $\nabla f = 0$ with an indefinite Hessian

### Change of Variables
- The Jacobian determinant in integration: $dx = |\det(J_f)| \, du$
- Connection to [Determinants](../../linear-algebra/01-core-linear-system-theory/05-determinants-overview.md) and volume scaling
- Application to probability density transformation

---

## Summary

**Answering the Central Question:** The Jacobian matrix $J_f$ captures all first-order partial derivatives of a vector-valued function, generalizing the gradient and serving as the best linear approximation. The Hessian matrix $H_f$ captures second-order partial derivatives of a scalar function, encoding curvature. Together they enable: Newton's method ($x_{k+1} = x_k - H^{-1}\nabla f$), second-order convergence analysis, saddle point detection, and probability density transformation via the Jacobian determinant.

---

## Applications in Data Science and Machine Learning

- **Newton's method and second-order optimizers**: The Hessian enables quadratic convergence near optima (L-BFGS, natural gradient)
- **Normalizing flows**: The Jacobian determinant corrects probability densities under invertible transformations
- **Loss landscape analysis**: Hessian eigenvalues reveal whether critical points are minima, maxima, or saddle points
- **Fisher information matrix**: The expected Hessian of the negative log-likelihood, central to statistical efficiency and natural gradient descent
- **Neural tangent kernel**: The Jacobian of network outputs with respect to parameters defines the NTK

---

## Guided Problems

---

## References

1. Stewart, James - *Calculus: Early Transcendentals*, 8th ed., Chapter 14.7
2. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 5.3
3. Boyd and Vandenberghe - [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/), Section 3.1
4. MIT 18.S096 - [*Matrix Calculus for Machine Learning and Beyond*](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/)
