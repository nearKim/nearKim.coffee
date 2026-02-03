---
sidebar_position: 2
---

# Derivatives and Gradients

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Does a Function Change When We Nudge Its Inputs?

Machine learning is fundamentally about adjusting parameters to reduce a loss function. To know which way to adjust, we need to measure how the loss responds to small changes in each parameter. This is what derivatives and gradients tell us.

Consider these scenarios:
1. A neural network has millions of parameters, and we need to know how the loss changes with respect to each one simultaneously.
2. In gradient descent, we move in the direction of steepest decrease. But what direction is "steepest" when there are many variables?
3. A contour plot of a loss function shows level curves. The gradient tells us which direction is perpendicular to these curves, pointing uphill.

The gradient generalizes the single-variable derivative to functions of many variables, and it is the engine behind every optimization algorithm in ML.

---

## Topics to Cover

### Partial Derivatives
- Definition: the derivative with respect to one variable, holding all others fixed
- Notation: $\frac{\partial f}{\partial x_i}$
- Computing partial derivatives for common functions

### The Gradient Vector
- Definition: $\nabla f = \left(\frac{\partial f}{\partial x_1}, \ldots, \frac{\partial f}{\partial x_n}\right)^T$
- The gradient as a vector field
- Gradient of linear functions, quadratic forms, and compositions

### Directional Derivatives
- The rate of change in an arbitrary direction $\mathbf{v}$: $D_\mathbf{v} f = \nabla f \cdot \hat{\mathbf{v}}$
- The gradient gives the direction of steepest ascent
- The magnitude $\|\nabla f\|$ is the maximum rate of change

### Level Curves and Gradient Perpendicularity
- Level sets: $\{x : f(x) = c\}$
- The gradient is perpendicular to level curves
- Geometric interpretation: why gradient descent moves across contours

---

## Summary

**Answering the Central Question:** The partial derivative $\frac{\partial f}{\partial x_i}$ measures sensitivity to a single input, and the gradient $\nabla f$ collects all partial derivatives into a vector that points in the direction of steepest increase. The directional derivative $D_\mathbf{v} f = \nabla f \cdot \hat{\mathbf{v}}$ measures the rate of change in any direction, and is maximized when $\mathbf{v}$ aligns with $\nabla f$. This is why gradient descent works: moving opposite to the gradient decreases the function as fast as possible locally.

---

## Applications in Data Science and Machine Learning

- **Gradient descent**: The gradient $\nabla_\theta L$ tells us how to update each parameter $\theta_i$ to reduce the loss $L$
- **Feature sensitivity**: $\frac{\partial f}{\partial x_i}$ measures how much a model's output depends on feature $x_i$ (saliency maps, feature importance)
- **Contour analysis**: Understanding loss landscapes via level curves and gradient directions helps diagnose optimization difficulties (saddle points, plateaus)
- **Natural gradient**: Using the Fisher information metric instead of Euclidean distance changes the notion of "steepest descent" in parameter space

---

## Guided Problems

---

## References

1. Stewart, James - *Calculus: Early Transcendentals*, 8th ed., Chapters 14.3-14.6
2. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 5.1-5.2
3. MIT 18.S096 - [*Matrix Calculus for Machine Learning and Beyond*](https://ocw.mit.edu/courses/18-s096-matrix-calculus-for-machine-learning-and-beyond-january-iap-2023/)
4. Boyd and Vandenberghe - [*Convex Optimization*](https://web.stanford.edu/~boyd/cvxbook/), Appendix A
