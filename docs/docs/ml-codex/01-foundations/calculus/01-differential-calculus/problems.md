---
sidebar_position: 7
---

# Section 1: Problems

University-level exam questions for Differential Calculus.

## Gradients and Directional Derivatives

### Problem 1.1
Compute the gradient of $f(x, y, z) = x^2 y + e^{yz} + \ln(xz)$ at the point $(1, 0, 1)$.

**Difficulty**: Easy

### Problem 1.2
Find the directional derivative of $f(x, y) = x^2 y - y^3$ at $(2, 1)$ in the direction of $\mathbf{v} = (3, 4)$.

**Difficulty**: Medium

### Problem 1.3
Prove that the gradient of a differentiable function $f: \mathbb{R}^n \to \mathbb{R}$ is perpendicular to the level sets of $f$.

**Difficulty**: Medium

## Chain Rule

### Problem 2.1
Let $f(x, y) = x^2 + xy$ where $x = t^2$ and $y = \sin(t)$. Compute $\frac{df}{dt}$ using the chain rule.

**Difficulty**: Easy

### Problem 2.2
For $g: \mathbb{R}^2 \to \mathbb{R}^3$ and $f: \mathbb{R}^3 \to \mathbb{R}^2$, write the Jacobian of $f \circ g$ in terms of the Jacobians of $f$ and $g$.

**Difficulty**: Medium

## Jacobians and Hessians

### Problem 3.1
Compute the Jacobian matrix of $f(x, y) = (x^2 + y, \; xy, \; e^x)$ at the point $(1, 2)$.

**Difficulty**: Easy

### Problem 3.2
Find the Hessian of $f(x, y) = x^3 - 3xy + y^3$ and classify the critical points.

**Difficulty**: Medium

### Problem 3.3
Use the Jacobian determinant to compute the area element when transforming from Cartesian to polar coordinates.

**Difficulty**: Medium

## Taylor Approximation

### Problem 4.1
Write the second-order Taylor expansion of $f(x, y) = e^{x+y}$ about the point $(0, 0)$.

**Difficulty**: Medium

### Problem 4.2
Show that the quadratic approximation of a function $f$ at a critical point $x^*$ is $f(x^*) + \frac{1}{2}(x - x^*)^T H (x - x^*)$ where $H$ is the Hessian. Explain why this connects to second-order optimization.

**Difficulty**: Hard

## Challenge Problems

### Problem 5.1
Prove that for a twice-differentiable function $f: \mathbb{R}^n \to \mathbb{R}$, the Hessian matrix is symmetric (i.e., $\frac{\partial^2 f}{\partial x_i \partial x_j} = \frac{\partial^2 f}{\partial x_j \partial x_i}$).

**Difficulty**: Hard

### Problem 5.2
Let $L(\theta) = \frac{1}{N}\sum_{i=1}^{N} \ell(f_\theta(x_i), y_i)$. Write the gradient $\nabla_\theta L$ using the chain rule, identifying each term as it would appear in backpropagation.

**Difficulty**: Very Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
