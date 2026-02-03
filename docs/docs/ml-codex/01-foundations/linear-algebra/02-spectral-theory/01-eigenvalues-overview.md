---
sidebar_position: 2
---

# Eigenvalues, Eigenvectors, and Diagonalization

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: When Does a Matrix Act Like Simple Scaling?

Most matrices rotate, stretch, and shear vectors in complicated ways. But along certain special directions, a matrix acts like multiplication by a scalar: $Av = \lambda v$. The vector $v$ goes in, and the same vector (scaled by $\lambda$) comes out.

These special directions and scaling factors reveal a matrix's intrinsic behavior:
1. The eigenvalues of a covariance matrix are the variances along the principal directions of the data.
2. The dominant eigenvector of the web's link matrix is the PageRank vector.
3. The eigenvalues of a recurrent neural network's weight matrix determine whether gradients explode or vanish during training.

Finding eigenvalues and eigenvectors is the key to diagonalization, which reduces matrix powers, exponentials, and dynamical systems to simple scalar operations.

---

## The Eigenvalue Equation

Take the matrix $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$ and the vector $v = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$:

$$Av = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}\begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 3 \\ 3 \end{bmatrix} = 3\begin{bmatrix} 1 \\ 1 \end{bmatrix} = 3v$$

The matrix $A$ simply scales $v$ by a factor of 3, without changing its direction. Now try $w = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$:

$$Aw = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}\begin{bmatrix} 1 \\ -1 \end{bmatrix} = \begin{bmatrix} 1 \\ -1 \end{bmatrix} = 1 \cdot w$$

The direction $w$ is also preserved, scaled by 1 (unchanged). A generic vector like $\begin{bmatrix} 2 \\ 1 \end{bmatrix}$ would be both rotated and stretched, not just scaled. The directions $v$ and $w$ are the special ones.

**Geometrically**, $A$ stretches space by a factor of 3 along the diagonal direction $\begin{bmatrix} 1 \\ 1 \end{bmatrix}$ and leaves the perpendicular direction $\begin{bmatrix} 1 \\ -1 \end{bmatrix}$ unchanged. Every other vector gets rotated toward the direction with the larger eigenvalue.

:::danger[Definition: Eigenvalue and Eigenvector]
An **eigenvalue** $\lambda$ and **eigenvector** $v \neq 0$ of a square matrix $A$ satisfy:

$$Av = \lambda v$$

The eigenvector $v$ is a direction that $A$ preserves (up to scaling). The eigenvalue $\lambda$ is the scaling factor.
:::

### Finding Eigenvalues

The equation $Av = \lambda v$ rewrites as $(A - \lambda I)v = 0$. For a nonzero $v$ to exist, $A - \lambda I$ must be singular:

$$\det(A - \lambda I) = 0$$

This is the **characteristic polynomial** (see [Determinants: The Characteristic Polynomial](../01-core-linear-system-theory/05-determinants-overview.md#the-characteristic-polynomial)). Its roots are the eigenvalues.

**Example.** For $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$:

$$\det(A - \lambda I) = \det\begin{bmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{bmatrix} = (2-\lambda)^2 - 1 = \lambda^2 - 4\lambda + 3 = (\lambda - 3)(\lambda - 1) = 0$$

Eigenvalues: $\lambda_1 = 3$, $\lambda_2 = 1$.

For each $\lambda$, solve $(A - \lambda I)v = 0$ to find the eigenvector:

- $\lambda_1 = 3$: $\begin{bmatrix} -1 & 1 \\ 1 & -1 \end{bmatrix}v = 0 \implies v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$

- $\lambda_2 = 1$: $\begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}v = 0 \implies v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$

:::tip[Practical Insight]
For **triangular matrices** (upper or lower), the eigenvalues are the diagonal entries. No characteristic polynomial needed: if the $k$-th diagonal entry is $a_{kk}$, then $\det(A - a_{kk}I) = 0$ because one row of $A - a_{kk}I$ is all zeros on the diagonal and below (or above).
:::

### Algebraic vs. Geometric Multiplicity

An eigenvalue can be a **repeated root** of the characteristic polynomial.

Consider $A = \begin{bmatrix} 5 & 1 \\ 0 & 5 \end{bmatrix}$. The characteristic polynomial is $(\lambda - 5)^2 = 0$, so $\lambda = 5$ is a root with multiplicity 2. But solving $(A - 5I)v = 0$:

$$\begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}v = 0 \implies v = t\begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

There is only **one** independent eigenvector, not two.

:::danger[Definition: Algebraic and Geometric Multiplicity]
For an eigenvalue $\lambda$:
- **Algebraic multiplicity** $a(\lambda)$: the number of times $\lambda$ appears as a root of the characteristic polynomial
- **Geometric multiplicity** $g(\lambda)$: the dimension of the eigenspace $\ker(A - \lambda I)$, i.e., the number of independent eigenvectors for $\lambda$

Always: $1 \leq g(\lambda) \leq a(\lambda)$.
:::

When $g(\lambda) < a(\lambda)$, the matrix is called **defective**. The matrix $\begin{bmatrix} 5 & 1 \\ 0 & 5 \end{bmatrix}$ has $a(5) = 2$ but $g(5) = 1$, so it is defective. This matters because defective matrices cannot be diagonalized.

In contrast, $A = \begin{bmatrix} 5 & 0 \\ 0 & 5 \end{bmatrix}$ also has $\lambda = 5$ with $a(5) = 2$, but now $g(5) = 2$ (every nonzero vector is an eigenvector). This matrix is already diagonal.

### Trace, Determinant, and Eigenvalues

Two fundamental relationships connect eigenvalues to matrix properties:

:::info[Theorem: Trace and Determinant]
For an $n \times n$ matrix $A$ with eigenvalues $\lambda_1, \ldots, \lambda_n$ (counted with algebraic multiplicity):

$$\text{tr}(A) = \sum_{i=1}^n \lambda_i \qquad \det(A) = \prod_{i=1}^n \lambda_i$$
:::

**Example.** For $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$ with $\lambda_1 = 3, \lambda_2 = 1$:

$\text{tr}(A) = 2 + 2 = 4 = 3 + 1$ ✓ and $\det(A) = 4 - 1 = 3 = 3 \cdot 1$ ✓

These give a quick sanity check on computed eigenvalues. They also show that $\det(A) = 0$ if and only if at least one eigenvalue is zero, linking singularity to eigenvalues.

---

## Diagonalization

### The Key Idea

Suppose $A$ has $n$ independent eigenvectors $v_1, \ldots, v_n$ with eigenvalues $\lambda_1, \ldots, \lambda_n$. Collect them into matrices:

$$P = \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix}, \quad D = \begin{bmatrix} \lambda_1 & & \\ & \lambda_2 & \\ & & \ddots & \\ & & & \lambda_n \end{bmatrix}$$

Then $AP = PD$ (each column of $AP$ is $Av_i = \lambda_i v_i$). Since $P$ has independent columns, it is invertible:

$$A = PDP^{-1}$$

**Example.** For $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$ with $v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$, $v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$:

$$P = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}, \quad D = \begin{bmatrix} 3 & 0 \\ 0 & 1 \end{bmatrix}$$

$$P^{-1} = \frac{1}{-2}\begin{bmatrix} -1 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} \frac{1}{2} & \frac{1}{2} \\ \frac{1}{2} & -\frac{1}{2} \end{bmatrix}$$

Verify: $PDP^{-1} = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\begin{bmatrix} 3 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} \frac{1}{2} & \frac{1}{2} \\ \frac{1}{2} & -\frac{1}{2} \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix} = A$ ✓

:::danger[Definition: Diagonalization]
A matrix $A$ is **diagonalizable** if it can be written as:

$$A = PDP^{-1}$$

where $P$ is the matrix of eigenvectors and $D$ is the diagonal matrix of eigenvalues.
:::

:::info[Theorem: Diagonalizability Condition]
An $n \times n$ matrix $A$ is diagonalizable if and only if it has $n$ linearly independent eigenvectors. Equivalently, the geometric multiplicity equals the algebraic multiplicity for every eigenvalue.
:::

A matrix with $n$ **distinct** eigenvalues is always diagonalizable (distinct eigenvalues guarantee independent eigenvectors). But distinct eigenvalues are not necessary: $5I$ is diagonal despite having a single repeated eigenvalue.

### Powers of Matrices

Diagonalization makes matrix powers trivial. Since $A = PDP^{-1}$:

$$A^2 = (PDP^{-1})(PDP^{-1}) = PD^2P^{-1}$$

$$A^k = PD^kP^{-1} = P\begin{bmatrix} \lambda_1^k & & \\ & \lambda_2^k & \\ & & \ddots \end{bmatrix}P^{-1}$$

Raising a diagonal matrix to a power just raises each diagonal entry to that power. This converts a matrix problem into $n$ independent scalar problems.

**Stability.** The powers $A^k$ converge to zero as $k \to \infty$ if and only if $|\lambda_i| < 1$ for all eigenvalues. If any $|\lambda_i| > 1$, the powers blow up. If $|\lambda_i| = 1$ for all $i$, the powers stay bounded but may oscillate.

### Fibonacci Numbers

The Fibonacci sequence $F_0 = 0, F_1 = 1, F_{n+1} = F_n + F_{n-1}$ can be encoded as a matrix recurrence:

$$\begin{bmatrix} F_{n+1} \\ F_n \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix}$$

Let $A = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}$. Then $\begin{bmatrix} F_{n+1} \\ F_n \end{bmatrix} = A^n \begin{bmatrix} 1 \\ 0 \end{bmatrix}$.

The characteristic polynomial is $\lambda^2 - \lambda - 1 = 0$, giving eigenvalues:

$$\lambda_1 = \frac{1 + \sqrt{5}}{2} = \varphi \approx 1.618 \quad (\text{the golden ratio}), \quad \lambda_2 = \frac{1 - \sqrt{5}}{2} \approx -0.618$$

Since $|\lambda_2| < 1$, the $\lambda_2^n$ term vanishes for large $n$. The dominant eigenvalue $\varphi$ controls the growth, giving Binet's formula:

$$F_n = \frac{\varphi^n - (1-\varphi)^n}{\sqrt{5}}$$

The ratio of consecutive Fibonacci numbers converges to $\varphi$: $F_{n+1}/F_n \to \varphi$ as $n \to \infty$. The golden ratio emerges directly from the eigenvalues.

### Markov Chains

A **Markov matrix** has nonnegative entries with each column summing to 1. It describes a system that transitions between states with fixed probabilities.

**Example.** A simplified weather model: if today is sunny, there is a 90% chance tomorrow is sunny and 10% chance of rain. If today is rainy, there is a 50% chance tomorrow is sunny and 50% chance of rain.

$$A = \begin{bmatrix} 0.9 & 0.5 \\ 0.1 & 0.5 \end{bmatrix}$$

Starting from state $u_0$, the state after $k$ steps is $u_k = A^k u_0$. The key properties of Markov matrices:

1. $\lambda = 1$ is always an eigenvalue (since columns sum to 1, the row vector $\begin{bmatrix} 1 & 1 & \cdots & 1 \end{bmatrix}$ is a left eigenvector for $\lambda = 1$)
2. All other eigenvalues satisfy $|\lambda_i| \leq 1$
3. The **steady-state** vector $q$ satisfies $Aq = q$, meaning it is the eigenvector for $\lambda = 1$

For our weather example: $\lambda_1 = 1, \lambda_2 = 0.4$. The steady-state eigenvector (normalized to sum to 1):

$$(A - I)q = 0: \quad \begin{bmatrix} -0.1 & 0.5 \\ 0.1 & -0.5 \end{bmatrix}q = 0 \implies q = \begin{bmatrix} 5/6 \\ 1/6 \end{bmatrix}$$

Regardless of the initial weather, the system converges to 5/6 sunny and 1/6 rainy. The second eigenvalue $\lambda_2 = 0.4$ controls the convergence rate: $|0.4|^k \to 0$, so the transient component decays by a factor of 0.4 each step.

:::tip[Practical Insight]
The convergence rate of a Markov chain is governed by the **spectral gap** $1 - |\lambda_2|$, where $\lambda_2$ is the second-largest eigenvalue in magnitude. A larger spectral gap means faster convergence to steady state. This is the basis of MCMC convergence diagnostics.
:::

---

## The Spectral Theorem for Symmetric Matrices

The matrix $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$ from our running example is symmetric ($A = A^T$). Its eigenvectors $v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$ and $v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$ are **orthogonal**: $v_1 \cdot v_2 = 1 - 1 = 0$. This is not a coincidence.

:::info[Theorem: The Spectral Theorem]
Every real symmetric matrix $A$ has:
1. **Real eigenvalues** (no complex numbers)
2. **Orthogonal eigenvectors** (eigenvectors for distinct eigenvalues are perpendicular)
3. A full set of $n$ orthonormal eigenvectors, so $A$ is always diagonalizable as:

$$A = Q\Lambda Q^T$$

where $Q$ is orthogonal ($Q^T Q = I$) and $\Lambda = \text{diag}(\lambda_1, \ldots, \lambda_n)$.
:::

The notation changes from $P$ to $Q$ to emphasize that the eigenvector matrix is now orthogonal, and $P^{-1}$ simplifies to $Q^T$ (since $Q^{-1} = Q^T$ for orthogonal matrices).

<details>
<summary>**Why symmetric matrices have real eigenvalues**</summary>

Suppose $Av = \lambda v$ where $v$ might be complex. Take the conjugate transpose of both sides:

$$\bar{v}^T A^T = \bar{\lambda} \bar{v}^T$$

Since $A = A^T$: $\bar{v}^T A = \bar{\lambda} \bar{v}^T$. Multiply on the right by $v$:

$$\bar{v}^T A v = \bar{\lambda} \bar{v}^T v$$

But also $\bar{v}^T (Av) = \bar{v}^T (\lambda v) = \lambda \bar{v}^T v$. So:

$$\lambda \bar{v}^T v = \bar{\lambda} \bar{v}^T v$$

Since $v \neq 0$, $\bar{v}^T v = \|v\|^2 > 0$. Dividing: $\lambda = \bar{\lambda}$, which means $\lambda$ is real.

</details>

<details>
<summary>**Why eigenvectors for distinct eigenvalues are orthogonal**</summary>

Suppose $Av_1 = \lambda_1 v_1$ and $Av_2 = \lambda_2 v_2$ with $\lambda_1 \neq \lambda_2$. Then:

$$\lambda_1 (v_1 \cdot v_2) = (Av_1) \cdot v_2 = v_1 \cdot (A^T v_2) = v_1 \cdot (Av_2) = \lambda_2 (v_1 \cdot v_2)$$

The middle step uses $A = A^T$. So $(\lambda_1 - \lambda_2)(v_1 \cdot v_2) = 0$. Since $\lambda_1 \neq \lambda_2$, we must have $v_1 \cdot v_2 = 0$.

</details>

### The Spectral Decomposition

Expanding $A = Q\Lambda Q^T$ column by column reveals a beautiful structure. Let $q_1, \ldots, q_n$ be the orthonormal eigenvectors:

$$A = Q\Lambda Q^T = \sum_{i=1}^n \lambda_i q_i q_i^T$$

Each term $q_i q_i^T$ is a **rank-1 projection matrix** onto the direction $q_i$. The symmetric matrix $A$ is a weighted sum of orthogonal projections, with the eigenvalues as weights.

**Example.** Normalize the eigenvectors of $A = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}$:

$$q_1 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \end{bmatrix}, \quad q_2 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ -1 \end{bmatrix}$$

$$A = 3 \cdot q_1 q_1^T + 1 \cdot q_2 q_2^T = 3 \cdot \frac{1}{2}\begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix} + 1 \cdot \frac{1}{2}\begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix} \checkmark$$

The matrix $A$ projects any vector onto $q_1$, scales that component by 3, projects onto $q_2$, scales by 1, and adds the results.

**Why symmetry matters.** Covariance matrices, Hessians, graph Laplacians, and kernel matrices are all symmetric. The spectral theorem guarantees they have real eigenvalues and orthogonal eigenvectors, which is why so many ML algorithms reduce to symmetric eigenvalue problems. See [Applications in Data Science and Machine Learning](#applications-in-data-science-and-machine-learning) for specific examples.

---

## Similarity Transformations

Two matrices can represent the same linear transformation in different bases. They are connected by a **similarity transformation**.

:::danger[Definition: Similar Matrices]
Matrices $A$ and $B$ are **similar** if there exists an invertible matrix $M$ such that:

$$B = M^{-1}AM$$
:::

Diagonalization is a special case: $D = P^{-1}AP$, where $P$ changes from the standard basis to the eigenvector basis. In the eigenvector basis, the transformation is just diagonal scaling.

:::info[Theorem: Similarity Preserves Eigenvalues]
If $B = M^{-1}AM$, then $A$ and $B$ have the same eigenvalues (same characteristic polynomial).
:::

<details>
<summary>**Proof**</summary>

$$\det(B - \lambda I) = \det(M^{-1}AM - \lambda I) = \det(M^{-1}(A - \lambda I)M) = \det(M^{-1})\det(A - \lambda I)\det(M)$$

Since $\det(M^{-1})\det(M) = 1$: $\det(B - \lambda I) = \det(A - \lambda I)$.

</details>

The eigenvalues are the same, but the eigenvectors change. If $Av = \lambda v$, then $B(M^{-1}v) = \lambda(M^{-1}v)$. The eigenvectors of $B$ are $M^{-1}v$, the eigenvectors of $A$ expressed in the new basis.

**The key invariants** under similarity: eigenvalues, trace, determinant, rank, and characteristic polynomial. These are properties of the linear transformation itself, not of the particular basis.

### Jordan Normal Form

When a matrix is not diagonalizable (defective), the closest we can get is the **Jordan normal form**:

$$A = PJP^{-1}, \quad J = \begin{bmatrix} J_1 & & \\ & J_2 & \\ & & \ddots \end{bmatrix}$$

where each **Jordan block** $J_k$ looks like:

$$J_k = \begin{bmatrix} \lambda & 1 & & \\ & \lambda & 1 & \\ & & \ddots & 1 \\ & & & \lambda \end{bmatrix}$$

The 1s on the superdiagonal appear precisely when the geometric multiplicity falls short of the algebraic multiplicity. For a diagonalizable matrix, all Jordan blocks are $1 \times 1$ (just eigenvalues on the diagonal).

**Example.** The defective matrix $A = \begin{bmatrix} 5 & 1 \\ 0 & 5 \end{bmatrix}$ is already in Jordan form: one $2 \times 2$ Jordan block with $\lambda = 5$.

Jordan form is more of a theoretical tool than a computational one. In practice, computing it is numerically unstable (small perturbations can change block structure). The Schur decomposition $A = QTQ^T$ (where $T$ is upper triangular and $Q$ is orthogonal) is the stable alternative.

---

## Difference Equations and Differential Equations

### Difference Equations

A linear recurrence $u_{k+1} = Au_k$ with initial condition $u_0$ has the solution $u_k = A^k u_0$. Diagonalization makes this explicit.

Write $u_0$ in the eigenvector basis: $u_0 = c_1 v_1 + c_2 v_2 + \cdots + c_n v_n$. Then:

$$u_k = A^k u_0 = c_1 \lambda_1^k v_1 + c_2 \lambda_2^k v_2 + \cdots + c_n \lambda_n^k v_n$$

Each eigenvector component evolves independently, scaled by $\lambda_i^k$. The long-term behavior depends entirely on which eigenvalues dominate:

| Condition | Behavior of $u_k$ |
|-----------|-------------------|
| All $\|\lambda_i\| < 1$ | $u_k \to 0$ (stable) |
| Some $\|\lambda_i\| > 1$ | $u_k$ blows up (unstable) |
| $\|\lambda_i\| = 1$ for all $i$ | $u_k$ stays bounded |
| One dominant $\|\lambda_1\| > \|\lambda_i\|$ for $i \geq 2$ | $u_k \approx c_1 \lambda_1^k v_1$ for large $k$ |

### Differential Equations

The continuous-time analogue $\frac{du}{dt} = Au$ has the solution:

$$u(t) = e^{At} u(0)$$

where the **matrix exponential** is defined by:

$$e^{At} = I + At + \frac{(At)^2}{2} + \frac{(At)^3}{6} + \cdots = \sum_{k=0}^{\infty} \frac{(At)^k}{k\,!}$$

If $A = PDP^{-1}$, then $e^{At} = P e^{Dt} P^{-1}$, and:

$$e^{Dt} = \begin{bmatrix} e^{\lambda_1 t} & & \\ & e^{\lambda_2 t} & \\ & & \ddots \end{bmatrix}$$

The solution decomposes as:

$$u(t) = c_1 e^{\lambda_1 t} v_1 + c_2 e^{\lambda_2 t} v_2 + \cdots + c_n e^{\lambda_n t} v_n$$

The stability conditions mirror the discrete case, but use the **real parts** of eigenvalues (since $|e^{\lambda t}| = e^{\text{Re}(\lambda) t}$):

| Condition | Behavior of $u(t)$ |
|-----------|-------------------|
| All $\text{Re}(\lambda_i) < 0$ | $u(t) \to 0$ (stable) |
| Some $\text{Re}(\lambda_i) > 0$ | $u(t)$ blows up (unstable) |
| All $\text{Re}(\lambda_i) = 0$ | $u(t)$ oscillates |

:::tip[Practical Insight]
The stability condition is the same idea in both cases. For discrete systems ($u_{k+1} = Au_k$), stability requires eigenvalues inside the **unit circle** ($|\lambda| < 1$). For continuous systems ($du/dt = Au$), stability requires eigenvalues in the **left half-plane** ($\text{Re}(\lambda) < 0$).
:::

---

## Summary

- An **eigenvalue** $\lambda$ and **eigenvector** $v$ satisfy $Av = \lambda v$: the matrix acts as simple scaling along $v$
- Eigenvalues are roots of the characteristic polynomial $\det(A - \lambda I) = 0$. The trace equals their sum, the determinant equals their product
- **Algebraic multiplicity** counts root repetitions; **geometric multiplicity** counts independent eigenvectors. A matrix is **defective** when these differ
- **Diagonalization** $A = PDP^{-1}$ exists when there are $n$ independent eigenvectors. It reduces powers to $A^k = PD^kP^{-1}$
- The **Fibonacci sequence** is governed by the eigenvalues of $\begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}$, producing the golden ratio $\varphi = (1+\sqrt{5})/2$
- **Markov chains** converge to the eigenvector for $\lambda = 1$ at a rate controlled by $|\lambda_2|$
- The **spectral theorem** guarantees that symmetric matrices have real eigenvalues, orthogonal eigenvectors, and the decomposition $A = Q\Lambda Q^T = \sum \lambda_i q_i q_i^T$
- **Similar matrices** $B = M^{-1}AM$ share eigenvalues, trace, determinant, and rank
- For difference equations $u_{k+1} = Au_k$, stability requires $|\lambda_i| < 1$. For differential equations $du/dt = Au$, stability requires $\text{Re}(\lambda_i) < 0$

**Answering the Central Question:** A matrix acts like simple scaling along its eigenvector directions. When $A$ has $n$ independent eigenvectors, it diagonalizes as $A = PDP^{-1}$, reducing matrix powers, exponentials, and dynamical systems to scalar operations on the eigenvalues. For symmetric matrices, the spectral theorem guarantees this decomposition always exists with orthogonal eigenvectors, making $A = Q\Lambda Q^T$ the most important factorization in applied mathematics.

---

## Applications in Data Science and Machine Learning

Eigenvalues and eigenvectors form the mathematical backbone of many ML algorithms, from dimensionality reduction to graph analysis to understanding training dynamics.

### Principal Component Analysis (PCA)

Given a centered data matrix $X \in \mathbb{R}^{n \times d}$ ($n$ samples, $d$ features), the covariance matrix is:

$$\Sigma = \frac{1}{n-1}X^TX$$

This is symmetric and positive semi-definite, so the spectral theorem applies: $\Sigma = Q\Lambda Q^T$. The eigenvectors $q_1, \ldots, q_d$ are the **principal components** (directions of maximum variance), and the eigenvalues $\lambda_1 \geq \lambda_2 \geq \cdots \geq \lambda_d \geq 0$ are the **variances** along those directions.

To reduce from $d$ dimensions to $k$, project onto the top $k$ eigenvectors:

$$X_{\text{reduced}} = X Q_k, \quad Q_k = \begin{bmatrix} q_1 & q_2 & \cdots & q_k \end{bmatrix}$$

The fraction of variance retained is $\sum_{i=1}^k \lambda_i / \sum_{i=1}^d \lambda_i$. If the eigenvalues decay rapidly, a few components capture most of the information.

### Spectral Clustering

Given a similarity graph with weight matrix $W$ and degree matrix $D = \text{diag}(\sum_j W_{ij})$, the **graph Laplacian** is:

$$L = D - W$$

The Laplacian is symmetric and positive semi-definite. Its smallest eigenvalue is always 0 (with eigenvector $\mathbf{1}$). The number of zero eigenvalues equals the number of connected components. Spectral clustering computes the bottom $k$ eigenvectors of $L$ (or the normalized Laplacian $D^{-1/2}LD^{-1/2}$) and clusters the rows using $k$-means.

The **spectral gap** (the gap between the $k$-th and $(k+1)$-th eigenvalues) indicates how well-separated the clusters are. A large gap means clean cluster structure.

### PageRank

Google's original algorithm models the web as a Markov chain. The transition matrix $A$ has entry $A_{ij} = 1/n_j$ if page $j$ links to page $i$ (where $n_j$ is the number of outgoing links from $j$). PageRank is the steady-state eigenvector for $\lambda = 1$ of a modified Markov matrix:

$$M = (1 - \alpha)A + \frac{\alpha}{N}\mathbf{1}\mathbf{1}^T$$

where $\alpha \approx 0.15$ is the "teleportation" probability and $N$ is the number of pages. The dominant eigenvector $q_1$ (with $Mq_1 = q_1$) ranks pages by importance.

### Gradient Flow in Recurrent Neural Networks

An RNN processes sequences by iterating $h_{t+1} = \sigma(Wh_t + Ux_t)$. During backpropagation through time, the gradient involves products of the weight matrix $W$:

$$\frac{\partial h_T}{\partial h_t} \approx \prod_{k=t}^{T-1} W^T \cdot \text{diag}(\sigma')$$

This behaves like $W^{T-t}$ for large time gaps. The eigenvalues of $W$ determine the gradient dynamics:

- $|\lambda_{\max}| > 1$: gradients **explode** (products grow exponentially)
- $|\lambda_{\max}| < 1$: gradients **vanish** (products shrink to zero)
- $|\lambda_i| \approx 1$ for all $i$: gradients remain **stable**

This is why orthogonal/unitary weight initialization (eigenvalues on the unit circle) helps RNN training. LSTMs and GRUs address this by introducing gating mechanisms that keep the effective eigenvalues near 1.

### Stability of Fixed Points in Optimization

At a critical point $\theta^*$ of a loss function $\mathcal{L}(\theta)$, the Hessian $H = \nabla^2 \mathcal{L}(\theta^*)$ determines local behavior:

- All eigenvalues of $H$ positive: **local minimum** (the usual goal of training)
- All eigenvalues negative: **local maximum**
- Mixed signs: **saddle point**

In high-dimensional optimization (deep learning), saddle points vastly outnumber local minima. The fraction of negative eigenvalues at a critical point indicates how many directions lead downhill. See [Positive Definite Matrices](./02-positive-definite-overview.md) for a deeper treatment.

---

## Guided Problems

### Problem 1: Diagonalization Practice

Let $A = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}$.

1. Find the eigenvalues of $A$.
2. Find eigenvectors for each eigenvalue.
3. Write $A = PDP^{-1}$ and verify.
4. Use the diagonalization to compute $A^3$.

<details>
<summary>💡 **Solution**</summary>

**1.** Characteristic polynomial: $\det(A - \lambda I) = (4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2)$.

Eigenvalues: $\lambda_1 = 5, \lambda_2 = 2$.

Quick check: $\text{tr}(A) = 7 = 5 + 2$ ✓, $\det(A) = 10 = 5 \cdot 2$ ✓.

**2.** For $\lambda_1 = 5$: $(A - 5I)v = \begin{bmatrix} -1 & 1 \\ 2 & -2 \end{bmatrix}v = 0 \implies v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$.

For $\lambda_2 = 2$: $(A - 2I)v = \begin{bmatrix} 2 & 1 \\ 2 & 1 \end{bmatrix}v = 0 \implies v_2 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$.

**3.** $P = \begin{bmatrix} 1 & 1 \\ 1 & -2 \end{bmatrix}$, $D = \begin{bmatrix} 5 & 0 \\ 0 & 2 \end{bmatrix}$, $P^{-1} = \frac{1}{-3}\begin{bmatrix} -2 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{bmatrix}$.

Verify: $PDP^{-1} = \begin{bmatrix} 1 & 1 \\ 1 & -2 \end{bmatrix}\begin{bmatrix} 5 & 0 \\ 0 & 2 \end{bmatrix}\begin{bmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{bmatrix}$

$= \begin{bmatrix} 5 & 2 \\ 5 & -4 \end{bmatrix}\begin{bmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{bmatrix} = \begin{bmatrix} 12/3 & 3/3 \\ 6/3 & 9/3 \end{bmatrix} = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}$ ✓

**4.** $A^3 = PD^3P^{-1}$. $D^3 = \begin{bmatrix} 125 & 0 \\ 0 & 8 \end{bmatrix}$.

$A^3 = \begin{bmatrix} 1 & 1 \\ 1 & -2 \end{bmatrix}\begin{bmatrix} 125 & 0 \\ 0 & 8 \end{bmatrix}\begin{bmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{bmatrix}$

$= \begin{bmatrix} 125 & 8 \\ 125 & -16 \end{bmatrix}\begin{bmatrix} 2/3 & 1/3 \\ 1/3 & -1/3 \end{bmatrix} = \begin{bmatrix} 258/3 & 117/3 \\ 234/3 & 141/3 \end{bmatrix} = \begin{bmatrix} 86 & 39 \\ 78 & 47 \end{bmatrix}$

Quick check: $\text{tr}(A^3) = 133 = 125 + 8 = 5^3 + 2^3$ ✓.

</details>

---

### Problem 2: Spectral Theorem

Let $S = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix}$.

1. Find the eigenvalues and eigenvectors of $S$.
2. Verify that the eigenvectors are orthogonal.
3. Write the spectral decomposition $S = \lambda_1 q_1 q_1^T + \lambda_2 q_2 q_2^T$ and verify.
4. Using the spectral decomposition, what is $S^{100}$? (Express in closed form.)

<details>
<summary>💡 **Solution**</summary>

**1.** $\det(S - \lambda I) = (3-\lambda)^2 - 1 = \lambda^2 - 6\lambda + 8 = (\lambda - 4)(\lambda - 2)$.

$\lambda_1 = 4$: $(S - 4I)v = \begin{bmatrix} -1 & 1 \\ 1 & -1 \end{bmatrix}v = 0 \implies v_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$, normalized: $q_1 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \end{bmatrix}$

$\lambda_2 = 2$: $(S - 2I)v = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}v = 0 \implies v_2 = \begin{bmatrix} 1 \\ -1 \end{bmatrix}$, normalized: $q_2 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ -1 \end{bmatrix}$

**2.** $q_1 \cdot q_2 = \frac{1}{2}(1 \cdot 1 + 1 \cdot (-1)) = 0$ ✓

**3.** $4 \cdot q_1 q_1^T = 4 \cdot \frac{1}{2}\begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}$

$2 \cdot q_2 q_2^T = 2 \cdot \frac{1}{2}\begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix}$

Sum: $\begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix} + \begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix} = \begin{bmatrix} 3 & 1 \\ 1 & 3 \end{bmatrix} = S$ ✓

**4.** $S^{100} = 4^{100} q_1 q_1^T + 2^{100} q_2 q_2^T = \frac{4^{100}}{2}\begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix} + \frac{2^{100}}{2}\begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix}$

$= \frac{1}{2}\begin{bmatrix} 4^{100} + 2^{100} & 4^{100} - 2^{100} \\ 4^{100} - 2^{100} & 4^{100} + 2^{100} \end{bmatrix}$

Since $4^{100} = 2^{200}$: $S^{100} = \frac{1}{2}\begin{bmatrix} 2^{200} + 2^{100} & 2^{200} - 2^{100} \\ 2^{200} - 2^{100} & 2^{200} + 2^{100} \end{bmatrix}$

Note how $4^{100} \gg 2^{100}$, so $S^{100} \approx \frac{4^{100}}{2}\begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}$, which is dominated by the larger eigenvalue's projection.

</details>

---

### Problem 3: Markov Chain Convergence

A mouse moves between three rooms. From any room, it moves to each of the other two rooms with equal probability. The transition matrix is:

$$A = \begin{bmatrix} 0 & 1/2 & 1/2 \\ 1/2 & 0 & 1/2 \\ 1/2 & 1/2 & 0 \end{bmatrix}$$

1. Verify that $A$ is a Markov matrix (nonneg entries, columns sum to 1).
2. Show that $\lambda = 1$ is an eigenvalue and find the steady-state vector.
3. Find the other eigenvalues. (Hint: use trace and determinant.)
4. Starting from room 1 ($u_0 = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$), what is the long-term probability distribution?

<details>
<summary>💡 **Solution**</summary>

**1.** All entries are nonneg ✓. Each column sums to $0 + 1/2 + 1/2 = 1$ ✓.

**2.** $(A - I)q = \begin{bmatrix} -1 & 1/2 & 1/2 \\ 1/2 & -1 & 1/2 \\ 1/2 & 1/2 & -1 \end{bmatrix}q = 0$. By symmetry, $q = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$ is a solution. Normalized (probabilities sum to 1): $q = \begin{bmatrix} 1/3 \\ 1/3 \\ 1/3 \end{bmatrix}$.

**3.** $\text{tr}(A) = 0 = 1 + \lambda_2 + \lambda_3$, so $\lambda_2 + \lambda_3 = -1$.

$\det(A) = 0 + 1/8 + 1/8 - 0 - 0 - 0 = 1/4$. And $\det(A) = 1 \cdot \lambda_2 \cdot \lambda_3$, so $\lambda_2 \lambda_3 = 1/4$.

The two unknown eigenvalues satisfy $x^2 + x + 1/4 = 0$, giving $x = (-1 \pm \sqrt{1-1})/2 = -1/2$.

So $\lambda_2 = \lambda_3 = -1/2$ (a repeated eigenvalue).

**4.** Since $|\lambda_2| = |\lambda_3| = 1/2 < 1$, the transient components decay: $(-1/2)^k \to 0$. For large $k$:

$$u_k = A^k u_0 \to \begin{bmatrix} 1/3 \\ 1/3 \\ 1/3 \end{bmatrix}$$

The mouse spends equal time in all three rooms, regardless of where it starts. The convergence rate is $|{-1/2}|^k = (1/2)^k$, so after $k = 10$ steps the transient is $\approx 0.001$.

</details>

---

### Problem 4: Defective Matrices

Consider $A = \begin{bmatrix} 2 & 1 \\ 0 & 2 \end{bmatrix}$.

1. Find the eigenvalues and their algebraic multiplicities.
2. Find the eigenvectors. What is the geometric multiplicity?
3. Is $A$ diagonalizable? Explain.
4. Compute $A^k$ directly using the binomial theorem on $A = 2I + N$ where $N = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$.

<details>
<summary>💡 **Solution**</summary>

**1.** $\det(A - \lambda I) = (2 - \lambda)^2 = 0$. So $\lambda = 2$ with algebraic multiplicity 2.

**2.** $(A - 2I)v = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}v = 0 \implies v_2 = 0$, so $v = t\begin{bmatrix} 1 \\ 0 \end{bmatrix}$.

Geometric multiplicity = 1 (only one independent eigenvector).

**3.** No. Diagonalization requires $n = 2$ independent eigenvectors, but we only have 1. The matrix is defective.

**4.** Note $N^2 = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}\begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$. So $N^k = 0$ for all $k \geq 2$.

Since $2I$ and $N$ commute: $A^k = (2I + N)^k = \sum_{j=0}^{k} \binom{k}{j}(2I)^{k-j}N^j$

Only $j = 0$ and $j = 1$ survive (since $N^2 = 0$):

$$A^k = 2^k I + k \cdot 2^{k-1} N = \begin{bmatrix} 2^k & k \cdot 2^{k-1} \\ 0 & 2^k \end{bmatrix}$$

Verify for $k = 1$: $\begin{bmatrix} 2 & 1 \\ 0 & 2 \end{bmatrix}$ ✓. For $k = 2$: $\begin{bmatrix} 4 & 4 \\ 0 & 4 \end{bmatrix} = A^2 = \begin{bmatrix} 4 & 4 \\ 0 & 4 \end{bmatrix}$ ✓.

Notice the off-diagonal grows as $k \cdot 2^{k-1} = (k/2) \cdot 2^k$, which exceeds the diagonal $2^k$ by a growing factor of $k/2$. This polynomial-times-exponential growth in the off-diagonal is characteristic of defective matrices and does not happen for diagonalizable ones.

</details>

---

## References

1. Strang, Gilbert - *Introduction to Linear Algebra*, 5th ed., Chapter 6 (Sections 6.1-6.6)
2. MIT OpenCourseWare - *18.06 Linear Algebra* - [Lecture 21: Eigenvalues and Eigenvectors](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-21-eigenvalues-and-eigenvectors/)
3. MIT OpenCourseWare - *18.06 Linear Algebra* - [Lecture 22: Diagonalization and Powers of A](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-22-diagonalization-and-powers-of-a/)
4. MIT OpenCourseWare - *18.06 Linear Algebra* - [Lecture 24: Markov Matrices](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-24-markov-matrices-fourier-series/)
5. MIT OpenCourseWare - *18.06 Linear Algebra* - [Lecture 25: Symmetric Matrices and Positive Definiteness](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/symmetric-matrices-and-positive-definiteness/)
6. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 4.2-4.4
