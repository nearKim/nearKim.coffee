---
sidebar_position: 3
---

# The Chain Rule

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Differentiate Compositions of Functions?

Nearly every function in machine learning is a composition: the loss is a function of predictions, predictions are functions of activations, activations are functions of weights. To compute how the loss depends on the weights, we must differentiate through the entire chain. The chain rule is the tool that makes this possible.

Consider these scenarios:
1. A deep neural network computes $L = \ell(f_K(\cdots f_2(f_1(x; W_1); W_2)\cdots; W_K))$. Computing $\frac{\partial L}{\partial W_1}$ requires chaining derivatives through every layer.
2. In a parameterized path $x(t), y(t)$, the total derivative $\frac{df}{dt}$ combines partial derivatives with the rates of change of each coordinate.
3. The backpropagation algorithm is nothing more than the chain rule applied systematically to a computational graph.

The chain rule is the mathematical backbone of training neural networks.

---

## Topics to Cover

### Single-Variable Chain Rule
- Review: $(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$
- Interpretation as scaling rates of change
- Chains of more than two functions

### Multivariate Chain Rule
- Total derivative: $\frac{df}{dt} = \sum_i \frac{\partial f}{\partial x_i}\frac{dx_i}{dt}$
- The chain rule in matrix form: $J_{f \circ g} = J_f \cdot J_g$
- Tree diagrams for tracking dependencies

### Composition of Vector-Valued Functions
- $f: \mathbb{R}^n \to \mathbb{R}^m$, $g: \mathbb{R}^k \to \mathbb{R}^n$, then $h = f \circ g: \mathbb{R}^k \to \mathbb{R}^m$
- Jacobian of the composition: $J_h(x) = J_f(g(x)) \cdot J_g(x)$
- Connection to forward-mode and reverse-mode AD

---

## Summary

**Answering the Central Question:** The chain rule decomposes the derivative of a composition into the product of derivatives of each component function. In single-variable form, $(f \circ g)' = f'(g(x)) \cdot g'(x)$. In multivariate form, the Jacobian of a composition is the product of Jacobians: $J_{f \circ g} = J_f \cdot J_g$. This matrix product structure is exactly what backpropagation exploits: computing gradients layer by layer through a neural network.

---

## Applications in Data Science and Machine Learning

- **Backpropagation**: The chain rule applied to a computational graph gives the gradient of the loss with respect to all parameters
- **Reparameterization trick**: In variational autoencoders, the chain rule through $z = \mu + \sigma \cdot \epsilon$ allows gradients to flow through stochastic nodes
- **Transfer learning fine-tuning**: When only some layers are trainable, the chain rule determines which gradients to compute and which to stop
- **Jacobian-vector products (JVPs)** and **vector-Jacobian products (VJPs)**: The two directions of applying the chain rule correspond to forward-mode and reverse-mode AD

---

## Guided Problems

---

## References

1. Stewart, James - *Calculus: Early Transcendentals*, 8th ed., Chapter 14.5
2. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 5.2
3. MIT 18.S096 - [*Matrix Calculus for Machine Learning and Beyond*](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/)
4. Goodfellow, Bengio, and Courville - *Deep Learning*, Chapter 6.5 (Back-Propagation)
