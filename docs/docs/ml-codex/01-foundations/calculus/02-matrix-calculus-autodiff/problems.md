---
sidebar_position: 5
---

# Section 2: Problems

University-level exam questions for Matrix Calculus and Automatic Differentiation.

## Matrix Calculus

### Problem 1.1
Compute $\frac{\partial}{\partial X} \text{tr}(AXB)$ where $A$, $X$, $B$ are matrices of compatible dimensions.

**Difficulty**: Medium

### Problem 1.2
Show that $\frac{\partial}{\partial X} \log\det(X) = X^{-T}$ for a positive definite matrix $X$.

**Difficulty**: Hard

### Problem 1.3
Derive $\frac{\partial}{\partial X} X^{-1} = -X^{-1} (\partial X) X^{-1}$ using the identity $XX^{-1} = I$.

**Difficulty**: Medium

### Problem 1.4
For the linear regression loss $L = \|y - X\beta\|^2$, compute $\frac{\partial L}{\partial \beta}$ and $\frac{\partial^2 L}{\partial \beta^2}$ using matrix calculus.

**Difficulty**: Medium

## Automatic Differentiation

### Problem 2.1
Draw the computational graph for $f(x_1, x_2) = \ln(x_1) + x_1 x_2 - \sin(x_2)$ and compute the gradient using reverse-mode AD.

**Difficulty**: Medium

### Problem 2.2
Explain why forward-mode AD is efficient for $f: \mathbb{R} \to \mathbb{R}^m$ and reverse-mode AD is efficient for $f: \mathbb{R}^n \to \mathbb{R}$. What are the computational costs of each?

**Difficulty**: Medium

### Problem 2.3
Implement dual numbers for forward-mode AD and verify on $f(x) = x^2 + 2x + 1$ that $f'(3) = 8$.

**Difficulty**: Medium

## Challenge Problems

### Problem 3.1
Derive the backpropagation equations for a two-layer neural network with ReLU activations and cross-entropy loss, identifying each step as a VJP computation.

**Difficulty**: Very Hard

### Problem 3.2
Prove that the memory cost of reverse-mode AD is proportional to the number of operations in the computational graph.

**Difficulty**: Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
