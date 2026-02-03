---
sidebar_position: 2
---

# Matrix Calculus

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Take Derivatives When the Variables Are Matrices?

Machine learning loss functions often involve matrix operations: traces, determinants, inverses, and products. Standard scalar calculus rules do not directly apply. Matrix calculus provides the rules and notation for differentiating scalar, vector, and matrix expressions with respect to vector and matrix variables.

Consider these scenarios:
1. The least squares solution $\hat{\beta} = (X^TX)^{-1}X^Ty$ comes from differentiating $\|y - X\beta\|^2$ with respect to the vector $\beta$. This requires knowing $\frac{\partial}{\partial \beta}(X\beta)^T(X\beta)$.
2. The Gaussian log-likelihood involves $\log\det(\Sigma)$ and $x^T\Sigma^{-1}x$. Optimizing over $\Sigma$ requires derivatives of traces, determinants, and inverses.
3. Layout conventions (numerator vs denominator) cause persistent confusion. Choosing and sticking to a convention is essential.

Matrix calculus is the language that connects ML loss functions to their gradients.

---

## Topics to Cover

### Derivatives of Trace Expressions
- $\frac{\partial}{\partial X}\text{tr}(AX) = A^T$
- $\frac{\partial}{\partial X}\text{tr}(AXB) = A^T B^T$
- $\frac{\partial}{\partial X}\text{tr}(X^TAX) = (A + A^T)X$
- Using the trace trick: $a^T X b = \text{tr}(ba^TX)$

### Derivatives of Determinant and Inverse
- $\frac{\partial}{\partial X}\log\det(X) = X^{-T}$
- $\frac{\partial}{\partial X}\det(X) = \det(X) X^{-T}$
- Differential of the inverse: $dX^{-1} = -X^{-1}(dX)X^{-1}$

### Layout Conventions
- Numerator layout (Jacobian convention): $\frac{\partial \mathbf{y}}{\partial \mathbf{x}}$ has shape $m \times n$
- Denominator layout: transpose of numerator layout
- The importance of choosing one convention and being consistent

### Common Identities Cookbook
- Compilation of the most-used matrix calculus identities
- Strategies for deriving new identities using differentials
- Cross-reference to the Matrix Cookbook

---

## Summary

**Answering the Central Question:** Matrix calculus extends differentiation to expressions involving matrices and vectors. The key identities ($\frac{\partial}{\partial X}\text{tr}(AX) = A^T$, $\frac{\partial}{\partial X}\log\det(X) = X^{-T}$, $dX^{-1} = -X^{-1}(dX)X^{-1}$) are used repeatedly in ML derivations. The differential approach (computing $df$ in terms of $dX$, then reading off the derivative) is often cleaner than direct computation. Consistent use of layout conventions avoids transpose errors.

---

## Applications in Data Science and Machine Learning

- **Deriving the normal equations**: Differentiating $\|y - X\beta\|^2$ gives $X^TX\beta = X^Ty$
- **Gaussian MLE**: Differentiating the log-likelihood with respect to $\mu$ and $\Sigma$ yields the sample mean and covariance
- **Fisher information**: Computing the expected Hessian of the log-likelihood requires matrix derivatives
- **Attention mechanism gradients**: The softmax-weighted matrix products in transformers require matrix calculus to differentiate
- **Matrix factorization**: NMF and PMF objective gradients involve derivatives of matrix norms and traces

---

## Guided Problems

---

## References

1. Petersen and Pedersen - [*The Matrix Cookbook*](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)
2. MIT 18.S096 - [*Matrix Calculus for Machine Learning and Beyond*](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/)
3. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 5.3-5.4
4. Magnus and Neudecker - *Matrix Differential Calculus with Applications in Statistics and Econometrics*, 3rd ed.
