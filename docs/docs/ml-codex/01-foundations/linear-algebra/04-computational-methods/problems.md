---
sidebar_position: 6
---

# Section 4: Problems

University-level exam questions for Computational Methods & Applications.

## Norms and Conditioning

### Problem 1.1
Compute ||A||₁, ||A||₂, and ||A||∞ for A = [[1, 2], [3, 4]].

**Difficulty**: Medium

### Problem 1.2
Show that ||AB|| ≤ ||A|| ||B|| for any compatible matrix norm.

**Difficulty**: Medium

### Problem 1.3
Compute the condition number κ₂(A) for A = [[1, 1], [1, 1+ε]] where ε is small.

**Difficulty**: Hard

## Iterative Methods

### Problem 2.1
Apply one iteration of Jacobi method to solve:
3x + y = 5
x + 2y = 5
starting from x₀ = [0, 0].

**Difficulty**: Easy

### Problem 2.2
Prove that the Jacobi iteration for a strictly diagonally dominant matrix converges.

**Difficulty**: Very Hard

## Eigenvalue Computation

### Problem 3.1
Apply two iterations of the power method to A = [[2, 1], [1, 2]] starting with x₀ = [1, 0].

**Difficulty**: Medium

### Problem 3.2
Explain why the power method fails for A = [[0, 1], [1, 0]].

**Difficulty**: Medium

## Linear Programming

### Problem 4.1
Solve using the simplex method:
Maximize 3x + 4y
Subject to: x + 2y ≤ 8, 3x + 2y ≤ 12, x,y ≥ 0

**Difficulty**: Hard

### Problem 4.2
Write the dual of the LP in Problem 4.1 and verify strong duality.

**Difficulty**: Hard

## Network Flow

### Problem 5.1
Find the maximum flow in a network with given capacities.

**Difficulty**: Medium

### Problem 5.2
Formulate the assignment problem as a linear program.

**Difficulty**: Medium

## Game Theory

### Problem 6.1
Find the optimal mixed strategies for the zero-sum game with payoff matrix:
[[3, -1], [-2, 4]]

**Difficulty**: Hard

### Problem 6.2
Formulate the game in Problem 6.1 as a linear program.

**Difficulty**: Very Hard

## Challenge Problems

### Problem 7.1
Prove the strong duality theorem for linear programming.

**Difficulty**: Very Hard

### Problem 7.2
Implement the conjugate gradient method and analyze its convergence.

**Difficulty**: Very Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
