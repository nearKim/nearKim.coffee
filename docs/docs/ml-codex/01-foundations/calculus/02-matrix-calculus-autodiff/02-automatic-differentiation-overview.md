---
sidebar_position: 3
---

# Automatic Differentiation

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do Computers Compute Exact Derivatives Efficiently?

We know how to differentiate functions by hand using the chain rule. But for a function with millions of parameters and thousands of operations, we need an algorithm. Automatic differentiation (AD) computes exact derivatives (not numerical approximations) by systematically applying the chain rule to a computational graph.

Consider these scenarios:
1. A deep neural network with 100 layers computes a scalar loss. Reverse-mode AD (backpropagation) computes the gradient with respect to all parameters in roughly the same time as one forward pass.
2. Forward-mode AD computes the derivative with respect to one input efficiently. This is useful when we have few inputs and many outputs (e.g., computing the Jacobian column by column).
3. JAX, PyTorch, and TensorFlow all implement AD as their core differentiation engine, enabling `jax.grad`, `loss.backward()`, and `tf.GradientTape`.

AD is the computational engine behind modern deep learning.

---

## Topics to Cover

### Forward-Mode AD and Dual Numbers
- Dual numbers: $a + b\epsilon$ where $\epsilon^2 = 0$
- Evaluating $f(a + \epsilon)$ gives $f(a) + f'(a)\epsilon$ automatically
- Forward-mode propagates derivatives alongside function values
- Computes one column of the Jacobian per pass (Jacobian-vector product, JVP)

### Reverse-Mode AD and Backpropagation
- The adjoint method: propagate sensitivities backward from outputs to inputs
- Computes one row of the Jacobian per pass (vector-Jacobian product, VJP)
- For $f: \mathbb{R}^n \to \mathbb{R}$, reverse mode costs $O(1)$ forward passes (independent of $n$)
- Memory cost: must store intermediate values from the forward pass

### Computational Graphs
- Representing functions as directed acyclic graphs (DAGs)
- Nodes are operations, edges carry values and gradients
- Topological sort for forward evaluation, reverse topological order for backpropagation

### JVP vs VJP
- JVP ($J \cdot v$): efficient for tall Jacobians (few inputs, many outputs)
- VJP ($v^T \cdot J$): efficient for wide Jacobians (many inputs, few outputs)
- Why ML uses reverse-mode: loss functions map many parameters to one scalar

---

## Summary

**Answering the Central Question:** Automatic differentiation computes exact derivatives by decomposing functions into elementary operations and applying the chain rule systematically. Forward-mode (JVP) propagates derivatives forward and is efficient when there are few inputs. Reverse-mode (VJP) propagates sensitivities backward and is efficient when there are few outputs, making it ideal for ML where we differentiate a scalar loss with respect to many parameters. Backpropagation is precisely reverse-mode AD applied to neural network computational graphs.

---

## Applications in Data Science and Machine Learning

- **Backpropagation**: Reverse-mode AD applied to neural networks, computing $\nabla_\theta L$ for all parameters $\theta$
- **Higher-order derivatives**: AD can be applied recursively to compute Hessians, Hessian-vector products, and higher-order derivatives
- **Differentiable programming**: AD enables gradient-based optimization of any differentiable program (physics simulators, renderers, ODE solvers)
- **Neural ODE**: Forward and adjoint sensitivity methods for continuous-depth networks
- **Meta-learning**: Computing gradients of gradients (second-order) for MAML and related algorithms

---

## Guided Problems

---

## References

1. Baydin et al. - [*Automatic Differentiation in Machine Learning: a Survey*](https://arxiv.org/abs/1502.05767) (2018)
2. Goodfellow, Bengio, and Courville - *Deep Learning*, Chapter 6.5
3. MIT 18.S096 - [*Matrix Calculus for Machine Learning and Beyond*](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/)
4. Griewank and Walther - *Evaluating Derivatives: Principles and Techniques of Algorithmic Differentiation*, 2nd ed.
