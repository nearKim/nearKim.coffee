---
sidebar_position: 4
---

# Optimization and Linear Algebra

## The Central Question: How Does Matrix Structure Control Optimization?

Minimizing a function requires understanding its curvature, and curvature is encoded in matrices (the Hessian). The eigenvalues of the Hessian determine whether you are at a minimum, maximum, or saddle point. The condition number $\kappa$ controls how fast gradient descent converges. Positive definiteness guarantees a unique global minimum. Every key idea in optimization, from gradient descent to conjugate gradient to Adam, has a linear algebra explanation.

## Topics to Cover

### Quadratic Functions and Their Geometry
- The general quadratic: $f(x) = \frac{1}{2}x^TAx - b^Tx + c$
- Gradient: $\nabla f = Ax - b$; setting to zero gives $Ax = b$
- Hessian: $\nabla^2 f = A$; curvature is determined by the matrix
- Classification via eigenvalues of $A$:
  - All $\lambda_i > 0$: bowl (strict minimum)
  - All $\lambda_i < 0$: dome (strict maximum)
  - Mixed signs: saddle point
- Cross-reference to [Positive Definite Matrices](../02-spectral-theory/02-positive-definite-overview.md)

### Gradient Descent through a Linear Algebra Lens
- Steepest descent on $f(x) = \frac{1}{2}x^TAx - b^Tx$
- Convergence rate depends on condition number $\kappa(A) = \lambda_{\max}/\lambda_{\min}$
  - $\kappa \approx 1$: nearly spherical contours, fast convergence
  - $\kappa \gg 1$: elongated elliptical contours, zig-zagging, slow convergence
- Eigenvalues of $A$ control the step sizes along each eigenvector direction
- Preconditioning: replace $Ax = b$ with $M^{-1}Ax = M^{-1}b$ to improve $\kappa$

### Conjugate Gradient Method
- Motivation: avoid the zig-zagging of steepest descent
- Key idea: search directions that are $A$-conjugate ($d_i^TAd_j = 0$)
- Converges in at most $n$ steps for $n \times n$ positive definite $A$
- In practice converges much faster when eigenvalues are clustered
- Connection to Krylov subspaces: $\{b, Ab, A^2b, \ldots\}$

### Constrained Optimization
- Equality constraints: minimize $f(x)$ subject to $Ax = b$
- Lagrange multipliers: $\nabla f = A^T\lambda$ at the optimum
- The KKT system as a saddle-point linear system:
$$\begin{bmatrix} H & A^T \\ A & 0 \end{bmatrix} \begin{bmatrix} x \\ \lambda \end{bmatrix} = \begin{bmatrix} c \\ b \end{bmatrix}$$
- Inequality constraints (brief): active set, complementary slackness

### Stochastic Gradient Descent (SGD)
- Full gradient is expensive: $\nabla f = \frac{1}{N}\sum_{i=1}^N \nabla f_i$ requires all $N$ data points
- SGD: approximate gradient with a random mini-batch of size $B \ll N$
- Convergence: noisy but unbiased; variance decreases with batch size
- Learning rate schedules: constant, decay, warm-up
- Mini-batch SGD as the standard in deep learning

### Momentum and Accelerated Methods
- SGD zig-zags in elongated valleys (high condition number)
- **Classical momentum:** accumulate a velocity term $v_{t+1} = \beta v_t + \nabla f(x_t)$
  - Dampens oscillations across the short axis, accelerates along the long axis
- **Nesterov momentum:** evaluate gradient at the "lookahead" position $x_t - \beta v_t$
  - Achieves optimal $O(1/t^2)$ convergence for convex smooth functions
- **Adam:** adaptive per-parameter learning rates using first and second moment estimates
  - Combines momentum with RMSProp
  - Bias correction for early iterations
- Connection to ODEs: momentum methods discretize a second-order ODE (damped oscillator)
- Cross-reference to [MIT 18.065 Lecture 23](https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/)

### Convexity and Linear Algebra
- A set is convex iff it's closed under convex combinations
- A function is convex iff its Hessian is PSD everywhere
- Convex optimization: every local minimum is global
- Why ML loves convexity: linear regression, Ridge, SVM (dual), logistic regression loss

### Summary

**Answering the Central Question:** Matrix structure controls optimization at every level. The Hessian's eigenvalues classify critical points (all positive = minimum, mixed = saddle). The condition number $\kappa = \lambda_{\max}/\lambda_{\min}$ governs convergence speed: gradient descent converges in $O(\kappa)$ iterations, conjugate gradient in $O(\sqrt{\kappa})$. Preconditioning improves $\kappa$ to accelerate convergence. SGD and momentum methods address the practical challenges of large-scale optimization while respecting the same underlying linear algebra.

### Applications in Data Science and Machine Learning
- **Training neural networks:** loss landscape curvature (Hessian eigenvalues) determines trainability; saddle points dominate in high dimensions
- **Adam / preconditioned methods:** approximate second-order information to improve conditioning
- **Support Vector Machines:** the dual is a constrained quadratic program (QP)
- **Convex relaxations:** replacing non-convex problems with convex surrogates (e.g., nuclear norm for rank minimization)
- **Natural gradient descent:** uses the Fisher information matrix (PSD) as a preconditioner

### Guided Problems

### References
- Strang, *Introduction to Linear Algebra*, Chapter 6 (6.1, 6.4)
- Boyd & Vandenberghe, *Convex Optimization*, Chapters 2–5 (supplementary)
