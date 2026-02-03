---
sidebar_position: 3
---

# Calculus of Optimization

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: What Does Calculus Tell Us About Finding Minima?

Machine learning is optimization: we minimize loss functions, maximize likelihoods, and find optimal parameters. Calculus provides the conditions that characterize optima (gradient equals zero, Hessian is positive semidefinite) and the convergence analysis of algorithms that find them.

Consider these scenarios:
1. Setting $\nabla L(\theta) = 0$ gives the necessary condition for a minimum. But is it sufficient? The Hessian tells us whether the critical point is a minimum, maximum, or saddle point.
2. Gradient descent converges at a rate determined by the condition number of the Hessian. A poorly conditioned problem (elongated contours) causes slow convergence.
3. Constrained optimization (e.g., maximizing entropy subject to constraints) uses Lagrange multipliers to convert a constrained problem into an unconstrained one.

Optimization theory explains why algorithms work and when they fail.

---

## Topics to Cover

### First-Order and Second-Order Conditions
- Necessary condition: $\nabla f(x^*) = 0$ at a local minimum
- Second-order necessary: $H(x^*) \succeq 0$
- Second-order sufficient: $\nabla f = 0$ and $H \succ 0$ guarantees a strict local minimum
- Saddle points in high dimensions and their prevalence in deep learning

### Convexity via the Hessian
- $f$ is convex iff $H(x) \succeq 0$ for all $x$ (twice-differentiable case)
- Strong convexity: $H(x) \succeq mI$ for some $m > 0$
- Convex functions have a single global minimum (no local minima to get stuck in)

### Gradient Descent Convergence Analysis
- For $L$-smooth functions: $f(x_{k+1}) \le f(x_k) - \frac{1}{2L}\|\nabla f(x_k)\|^2$ with step size $1/L$
- Convergence rate: $O(1/k)$ for convex, $O(e^{-ck})$ for strongly convex
- The role of the condition number $\kappa = L/m$

### Newton's Method
- Update: $x_{k+1} = x_k - H^{-1}\nabla f$
- Quadratic convergence near the optimum
- Computational cost: $O(n^3)$ per step for the Hessian solve

### Lagrange Multipliers
- Constrained optimization: minimize $f(x)$ subject to $g(x) = 0$
- The Lagrangian: $\mathcal{L}(x, \lambda) = f(x) + \lambda g(x)$
- KKT conditions for inequality constraints
- Cross-reference to Constrained Optimization in the linear algebra section

---

## Summary

**Answering the Central Question:** Calculus characterizes optima through first-order conditions ($\nabla f = 0$) and second-order conditions ($H \succeq 0$ for minima, $H \preceq 0$ for maxima). Convexity ($H \succeq 0$ everywhere) guarantees that local minima are global. Gradient descent convergence depends on smoothness and strong convexity, with rates $O(1/k)$ and $O(e^{-ck})$ respectively. Newton's method achieves quadratic convergence by using second-order information. Lagrange multipliers handle equality constraints by introducing dual variables.

---

## Applications in Data Science and Machine Learning

- **Understanding optimization algorithms**: Convergence guarantees for SGD, Adam, and other optimizers rely on smoothness and convexity assumptions
- **Learning rate selection**: The Lipschitz constant $L$ determines the maximum safe step size $\alpha \le 1/L$
- **Second-order methods**: L-BFGS, natural gradient, and K-FAC approximate the Newton step for faster convergence
- **Regularization as constrained optimization**: L2 regularization corresponds to constraining the parameter norm (Lagrange multiplier interpretation)
- **SVM dual problem**: The SVM optimization uses Lagrange multipliers and KKT conditions to derive the support vector solution

---

## Guided Problems

---

## References

1. Boyd and Vandenberghe - [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/), Chapters 3, 5, 9
2. Nocedal and Wright - *Numerical Optimization*, 2nd ed., Chapters 2-3
3. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 7
4. Nesterov, Yurii - *Introductory Lectures on Convex Optimization*, Chapter 2
