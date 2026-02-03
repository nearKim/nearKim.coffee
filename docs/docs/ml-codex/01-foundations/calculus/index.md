---
title: "Calculus for Machine Learning"
sidebar_label: "Table of Contents"
sidebar_position: 1
---

# Calculus for Machine Learning

## Introduction

This calculus course is structured around the mathematical foundations most relevant to machine learning, drawing from MIT 18.S096 (Matrix Calculus for ML), Stanford MATH51, and the *Mathematics for Machine Learning* textbook by Deisenroth, Faisal, and Ong. The material is organized into three sections progressing from single-variable and multivariate differential calculus through matrix calculus and automatic differentiation to integral calculus and optimization.

## The Three Sections

### [Section 1: Differential Calculus](differential-calculus/)

Derivatives, gradients, and higher-order analysis in multiple dimensions.

**Topics:**
- Partial derivatives, gradient vectors, and directional derivatives
- The chain rule in single and multiple variables
- Jacobian and Hessian matrices, second-order conditions
- Taylor approximation: linearization and quadratic approximation

### [Section 2: Matrix Calculus and Automatic Differentiation](matrix-calculus-autodiff/)

Differentiating matrix expressions and computing gradients algorithmically.

**Topics:**
- Derivatives of trace, determinant, and inverse; layout conventions; common identities
- Forward-mode and reverse-mode automatic differentiation
- Computational graphs, JVP vs VJP, backpropagation

### [Section 3: Integral Calculus and Optimization](integral-calculus-optimization/)

Integration for probabilistic ML and calculus-based optimization theory.

**Topics:**
- Computing expectations, marginalizations, normalizing constants, Monte Carlo integration
- First/second order optimality conditions, convexity via the Hessian
- Gradient descent convergence, Newton's method, Lagrange multipliers
