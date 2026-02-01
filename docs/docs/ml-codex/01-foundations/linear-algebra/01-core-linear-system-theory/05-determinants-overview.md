---
sidebar_position: 7
---

# Determinants

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: What Single Number Captures a Matrix's Essence?

We want a single number that tells us whether a matrix is invertible, how it scales volume, and what its eigenvalues multiply to. That number is the **determinant**.

Consider these scenarios:
1. You need to know whether a linear system $Ax = b$ has a unique solution. The determinant answers this instantly: $\det(A) \neq 0$ means yes.
2. A neural network layer transforms inputs through a weight matrix. How much does it expand or compress the space of activations? The determinant measures exactly this volume change.
3. A normalizing flow maps a simple distribution to a complex one. To compute the transformed density, you need the Jacobian determinant of the mapping.

The determinant encodes invertibility, volume scaling, and orientation into one number. It connects algebra (is the matrix singular?) to geometry (how does the transformation change space?) to probability (how do densities transform?).

---

## Definition and the Three Properties

Take the $2 \times 2$ matrix $A = \begin{bmatrix} 3 & 1 \\ 2 & 4 \end{bmatrix}$. Its determinant is:

$$\det(A) = 3 \cdot 4 - 1 \cdot 2 = 10$$

This tells us $A$ is invertible (nonzero determinant) and that $A$ scales areas by a factor of 10.

Strang's approach defines the determinant through **three properties** that uniquely determine it for all square matrices:

:::danger[Definition: The Determinant]
The **determinant** is the unique function $\det: \mathbb{R}^{n \times n} \to \mathbb{R}$ satisfying:

1. $\det(I) = 1$
2. Exchanging two rows reverses the sign of $\det$
3. The determinant is **linear in each row separately**:
   - $\det\begin{bmatrix} ta \\ b \end{bmatrix} = t \cdot \det\begin{bmatrix} a \\ b \end{bmatrix}$
   - $\det\begin{bmatrix} a + a' \\ b \end{bmatrix} = \det\begin{bmatrix} a \\ b \end{bmatrix} + \det\begin{bmatrix} a' \\ b \end{bmatrix}$

where $a, a', b$ represent rows.
:::

Property 3 is **not** saying $\det(A + B) = \det(A) + \det(B)$. That is false. The linearity is in one row at a time, holding all other rows fixed. This is called **multilinearity**.

From these three properties alone, every other determinant fact follows.

### The $2 \times 2$ Formula

For a general $2 \times 2$ matrix:

$$\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc$$

<details>
<summary>**Derivation from the three properties**</summary>

Write each row as a combination of standard basis rows:

$$\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = \det\begin{bmatrix} a & 0 \\ c & d \end{bmatrix} + \det\begin{bmatrix} 0 & b \\ c & d \end{bmatrix}$$

Expand the second row of each term the same way:

$$= \det\begin{bmatrix} a & 0 \\ c & 0 \end{bmatrix} + \det\begin{bmatrix} a & 0 \\ 0 & d \end{bmatrix} + \det\begin{bmatrix} 0 & b \\ c & 0 \end{bmatrix} + \det\begin{bmatrix} 0 & b \\ 0 & d \end{bmatrix}$$

The first and last terms have proportional rows (both entries in the same column), so their determinants are zero. The remaining two terms:

$$= ad \cdot \det\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} + bc \cdot \det\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = ad \cdot 1 + bc \cdot (-1) = ad - bc$$

The sign flip in the second term comes from Property 2: swapping the two rows of $I$ reverses the sign.

</details>

### The $3 \times 3$ Formula and Cofactor Expansion

For $3 \times 3$, the **cofactor expansion along the first row** gives:

$$\det\begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix} = a_{11}\det\begin{bmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{bmatrix} - a_{12}\det\begin{bmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{bmatrix} + a_{13}\det\begin{bmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{bmatrix}$$

The signs alternate: $+, -, +, -, \ldots$ following the checkerboard pattern $(-1)^{i+j}$.

**Example.** Compute $\det\begin{bmatrix} 2 & 1 & 3 \\ 0 & 4 & 5 \\ 1 & 0 & 2 \end{bmatrix}$:

$$= 2\det\begin{bmatrix} 4 & 5 \\ 0 & 2 \end{bmatrix} - 1\det\begin{bmatrix} 0 & 5 \\ 1 & 2 \end{bmatrix} + 3\det\begin{bmatrix} 0 & 4 \\ 1 & 0 \end{bmatrix}$$

$$= 2(8 - 0) - 1(0 - 5) + 3(0 - 4) = 16 + 5 - 12 = 9$$

### Computing via Elimination

Cofactor expansion costs $O(n!)$ operations. For practical computation, **elimination** is far better.

Row-reduce $A$ to upper triangular form $U$, tracking row swaps. Since elimination subtracts multiples of one row from another (which does not change the determinant by Property 3), and each row swap flips the sign (Property 2):

$$\det(A) = (-1)^s \cdot \prod_{i=1}^n u_{ii}$$

where $s$ is the number of row swaps and $u_{ii}$ are the **pivots** (diagonal entries of $U$).

**Example.** For $A = \begin{bmatrix} 2 & 1 & 3 \\ 0 & 4 & 5 \\ 1 & 0 & 2 \end{bmatrix}$, swap $R_1 \leftrightarrow R_3$ then eliminate:

$$\xrightarrow{R_1 \leftrightarrow R_3} \begin{bmatrix} 1 & 0 & 2 \\ 0 & 4 & 5 \\ 2 & 1 & 3 \end{bmatrix} \xrightarrow{R_3 - 2R_1} \begin{bmatrix} 1 & 0 & 2 \\ 0 & 4 & 5 \\ 0 & 1 & -1 \end{bmatrix} \xrightarrow{R_3 - \frac{1}{4}R_2} \begin{bmatrix} 1 & 0 & 2 \\ 0 & 4 & 5 \\ 0 & 0 & -\frac{9}{4} \end{bmatrix}$$

One row swap ($s = 1$), pivots $1, 4, -\frac{9}{4}$:

$$\det(A) = (-1)^1 \cdot 1 \cdot 4 \cdot \left(-\frac{9}{4}\right) = (-1)(- 9) = 9 \checkmark$$

This costs $O(\frac{2}{3}n^3)$, the same as LU factorization (see [Matrix Operations: LU Decomposition](./04-matrix-operations-overview.md#lu-decomposition)).

:::tip[Practical Insight]
In practice, nobody computes determinants by cofactor expansion for $n > 3$. Use LU factorization: $\det(A) = (-1)^s \prod(\text{pivots})$.
:::

---

## Properties of the Determinant

The three defining properties generate a rich collection of consequences.

:::info[Theorem: Properties of Determinants]
For $n \times n$ matrices $A$ and $B$, and scalar $c$:

| Property | Formula |
|----------|---------|
| **Multiplicative** | $\det(AB) = \det(A)\det(B)$ |
| **Transpose** | $\det(A^T) = \det(A)$ |
| **Inverse** | $\det(A^{-1}) = 1/\det(A)$ |
| **Scalar multiple** | $\det(cA) = c^n \det(A)$ |
| **Triangular** | $\det = \text{product of diagonal entries}$ |
| **Singular** | $A$ is singular $\Leftrightarrow$ $\det(A) = 0$ |
:::

The **multiplicative** property is the most important and the most surprising. The determinant is *not* additive: $\det(A + B) \neq \det(A) + \det(B)$. But it turns products into products.

**Example.** Let $A = \begin{bmatrix} 1 & 2 \\ 0 & 3 \end{bmatrix}$ and $B = \begin{bmatrix} 2 & 0 \\ 1 & 4 \end{bmatrix}$.

$$\det(A) = 3, \quad \det(B) = 8, \quad AB = \begin{bmatrix} 4 & 8 \\ 3 & 12 \end{bmatrix}, \quad \det(AB) = 48 - 24 = 24 = 3 \cdot 8 \checkmark$$

<details>
<summary>**Why $\det(AB) = \det(A)\det(B)$**</summary>

If $A$ is singular, then $AB$ is also singular (its columns are dependent), so both sides are zero.

If $A$ is invertible, define $f(B) = \det(AB)/\det(A)$. Check the three properties:
- $f(I) = \det(A)/\det(A) = 1$ ✓
- Row swap in $B$ causes a row swap in $AB$ (left-multiplying by $A$ does not mix up the "row swap" structure once we fix $A$), so the sign flips ✓
- Linearity in each row of $B$ carries through to $AB$ ✓

Since the determinant is the *unique* function satisfying the three properties, $f(B) = \det(B)$. Multiplying both sides by $\det(A)$ gives $\det(AB) = \det(A)\det(B)$.

</details>

The **scalar multiple** rule $\det(cA) = c^n\det(A)$ is a common trap. Multiplying every row by $c$ applies Property 3 once per row, so the factor is $c^n$, not $c$.

**Example.** $\det(2I_3) = 2^3 \det(I_3) = 8$, not 2.

The **singularity** test follows from elimination: if $A$ is singular, at least one pivot is zero, making $\det(A) = 0$.

---

## Geometric Interpretation

Take two column vectors $a_1 = \begin{bmatrix} 3 \\ 0 \end{bmatrix}$ and $a_2 = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$, and form $A = \begin{bmatrix} 3 & 1 \\ 0 & 2 \end{bmatrix}$. The determinant $\det(A) = 6$.

**Geometrically**, the columns of $A$ span a parallelogram in $\mathbb{R}^2$. The base is $\|a_1\| = 3$ and the height (perpendicular distance from $a_2$ to $a_1$) is 2. The area is $3 \times 2 = 6 = |\det(A)|$.

This generalizes to any dimension:

:::info[Theorem: Determinant as Volume]
For an $n \times n$ matrix $A$ with columns $a_1, \ldots, a_n$:

$$|\det(A)| = \text{volume of the parallelepiped spanned by } a_1, \ldots, a_n$$
:::

Three consequences follow immediately:

**1. Zero determinant means collapse.** If the columns are linearly dependent, the parallelepiped collapses to a lower dimension and has zero volume. This is why $\det(A) = 0$ characterizes singular matrices.

**2. The sign encodes orientation.** In $\mathbb{R}^2$, $\det(A) > 0$ means the columns $a_1, a_2$ form a counterclockwise (right-handed) pair. $\det(A) < 0$ means clockwise (left-handed). A row swap reverses orientation, consistent with Property 2.

**3. Orthogonal matrices preserve volume.** If $Q$ is orthogonal, $|\det(Q)| = 1$. Its columns are orthonormal, so they span a unit cube with volume 1.

### The Jacobian Determinant

When a differentiable map $f: \mathbb{R}^n \to \mathbb{R}^n$ transforms a small region around point $x$, the local volume scaling factor is $|\det(J_f(x))|$, where $J_f$ is the **Jacobian matrix** of partial derivatives:

$$(J_f)_{ij} = \frac{\partial f_i}{\partial x_j}$$

For a linear transformation $f(x) = Ax$, the Jacobian is $A$ itself, so the scaling factor is $|\det(A)|$ everywhere. For nonlinear maps, the Jacobian determinant varies from point to point.

**Example.** The polar-to-Cartesian transformation $f(r, \theta) = (r\cos\theta, r\sin\theta)$ has Jacobian:

$$J_f = \begin{bmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{bmatrix}, \quad \det(J_f) = r\cos^2\theta + r\sin^2\theta = r$$

The familiar $dA = r\,dr\,d\theta$ in polar integration comes directly from $|\det(J_f)| = r$.

---

## Cofactors and the Adjugate

The cofactor expansion from the $3 \times 3$ case generalizes to any size.

:::danger[Definition: Cofactor]
The **$(i,j)$ cofactor** of $A$ is:

$$C_{ij} = (-1)^{i+j} M_{ij}$$

where $M_{ij}$ is the **$(i,j)$ minor**: the determinant of the $(n-1) \times (n-1)$ matrix obtained by deleting row $i$ and column $j$.
:::

The determinant expands along any row $i$ or any column $j$:

$$\det(A) = \sum_{j=1}^n a_{ij} C_{ij} \quad \text{(expansion along row } i\text{)}$$

$$\det(A) = \sum_{i=1}^n a_{ij} C_{ij} \quad \text{(expansion along column } j\text{)}$$

:::tip[Practical Insight]
Expand along the row or column with the most zeros. Each zero entry eliminates an entire minor computation.
:::

### The Adjugate and the Cofactor Inverse Formula

The **adjugate** (or classical adjoint) of $A$ is the transpose of the cofactor matrix:

$$\text{adj}(A) = [C_{ij}]^T$$

It provides an explicit formula for the inverse:

:::info[Theorem: Cofactor Formula for the Inverse]
If $\det(A) \neq 0$:

$$A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$$
:::

**Example.** For $A = \begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}$, $\det(A) = 1$. The cofactors are:

$$C_{11} = 3, \quad C_{12} = -5, \quad C_{21} = -1, \quad C_{22} = 2$$

$$A^{-1} = \frac{1}{1}\begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix} = \begin{bmatrix} 3 & -1 \\ -5 & 2 \end{bmatrix}$$

For $2 \times 2$ matrices this gives the well-known formula: swap the diagonal, negate the off-diagonal, divide by $\det$. For larger matrices, the cofactor formula costs $O(n \cdot n!)$, making it useless for computation. Its value is theoretical: it proves the inverse exists when $\det(A) \neq 0$ and provides explicit formulas.

See [Matrix Inverse](./02-matrix-inverse-overview.md) for practical methods of computing $A^{-1}$.

### Cramer's Rule

Cramer's rule gives each component of $x = A^{-1}b$ as a ratio of determinants:

$$x_j = \frac{\det(B_j)}{\det(A)}$$

where $B_j$ is $A$ with column $j$ replaced by $b$.

**Example.** Solve $\begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix} x = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$:

$$x_1 = \frac{\det\begin{bmatrix} 1 & 1 \\ 2 & 3 \end{bmatrix}}{\det\begin{bmatrix} 2 & 1 \\ 5 & 3 \end{bmatrix}} = \frac{3 - 2}{6 - 5} = 1, \quad x_2 = \frac{\det\begin{bmatrix} 2 & 1 \\ 5 & 2 \end{bmatrix}}{1} = \frac{4 - 5}{1} = -1$$

Cramer's rule requires computing $n+1$ determinants, each costing $O(n^3)$. Total cost: $O(n^4)$, which is far worse than the $O(n^3)$ of Gaussian elimination. Like the cofactor inverse formula, Cramer's rule is a theoretical tool, not a computational one.

---

## The Characteristic Polynomial

The determinant connects directly to eigenvalues through the **characteristic polynomial**.

:::danger[Definition: Characteristic Polynomial]
The **characteristic polynomial** of an $n \times n$ matrix $A$ is:

$$p(\lambda) = \det(A - \lambda I)$$

The eigenvalues of $A$ are the roots of $p(\lambda) = 0$.
:::

For the $2 \times 2$ case:

$$\det\begin{bmatrix} a - \lambda & b \\ c & d - \lambda \end{bmatrix} = \lambda^2 - (a+d)\lambda + (ad - bc) = \lambda^2 - \text{tr}(A)\lambda + \det(A)$$

This gives two elegant relationships:

:::info[Theorem: Determinant and Trace from Eigenvalues]
For an $n \times n$ matrix $A$ with eigenvalues $\lambda_1, \ldots, \lambda_n$:

$$\det(A) = \prod_{i=1}^n \lambda_i \qquad \text{tr}(A) = \sum_{i=1}^n \lambda_i$$
:::

The determinant is the **product** of all eigenvalues. The trace is their **sum**. The determinant equals $p(0)$ (the constant term of the characteristic polynomial), and the trace relates to the coefficient of $\lambda^{n-1}$ (with sign $(-1)^{n-1}$).

**Example.** The matrix $A = \begin{bmatrix} 4 & 2 \\ 1 & 3 \end{bmatrix}$ has $\text{tr}(A) = 7$ and $\det(A) = 10$.

Characteristic polynomial: $\lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2)$.

Eigenvalues: $\lambda_1 = 5$, $\lambda_2 = 2$. Check: $5 \cdot 2 = 10 = \det(A)$ and $5 + 2 = 7 = \text{tr}(A)$.

This means that $\det(A) = 0$ if and only if **at least one eigenvalue is zero**, which is equivalent to $A$ being singular. The chain of equivalences grows:

$$A \text{ is singular} \iff \det(A) = 0 \iff \text{some } \lambda_i = 0 \iff \text{some pivot is zero} \iff \text{columns are dependent}$$

For deeper treatment of eigenvalues, see [Eigenvalues and Eigenvectors](../02-spectral-theory/01-eigenvalues-overview.md).

---

## Summary

- The **determinant** is uniquely defined by three properties: $\det(I) = 1$, row swaps flip the sign, and the determinant is linear in each row separately
- For $2 \times 2$: $\det\begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc$. For larger matrices, use **elimination**: $\det(A) = (-1)^s \prod(\text{pivots})$
- The determinant is **multiplicative** ($\det(AB) = \det(A)\det(B)$) but not additive
- $|\det(A)|$ equals the **volume** of the parallelepiped spanned by the columns. $\det(A) = 0$ means the columns are dependent and the volume collapses
- The **sign** of the determinant encodes orientation (preserved or reversed)
- The **Jacobian determinant** $|\det(J_f)|$ measures local volume scaling of nonlinear transformations
- The **cofactor inverse** $A^{-1} = \frac{1}{\det(A)}\text{adj}(A)$ and **Cramer's rule** are elegant but computationally impractical
- The **characteristic polynomial** $\det(A - \lambda I) = 0$ defines eigenvalues. The determinant equals the product of all eigenvalues, and the trace equals their sum

**Answering the Central Question:** The determinant is the single number that captures invertibility ($\det(A) \neq 0$ iff invertible), volume scaling ($|\det(A)|$ is the factor by which the transformation stretches space), and eigenvalue information ($\det(A) = \prod \lambda_i$). It bridges algebra, geometry, and probability in one formula.

---

## Applications in Data Science and Machine Learning

The determinant appears throughout machine learning whenever probability densities are transformed, covariance matrices are evaluated, or volume changes matter.

### Multivariate Gaussian Log-Likelihood

The density of a multivariate Gaussian $\mathcal{N}(\mu, \Sigma)$ is:

$$p(x) = \frac{1}{(2\pi)^{n/2}\det(\Sigma)^{1/2}} \exp\left(-\frac{1}{2}(x - \mu)^T\Sigma^{-1}(x - \mu)\right)$$

The log-likelihood involves $\log|\det(\Sigma)|$. Computing this naively is expensive ($O(n^3)$ for the determinant) and numerically unstable (the determinant can overflow or underflow for large $n$).

The standard approach uses **Cholesky decomposition**. Since $\Sigma$ is symmetric positive definite, factor $\Sigma = LL^T$. Then:

$$\log\det(\Sigma) = \log\det(LL^T) = \log(\det(L))^2 = 2\log\det(L) = 2\sum_{i=1}^n \log L_{ii}$$

Since $L$ is triangular, its determinant is just the product of diagonal entries. Working in log-space avoids overflow entirely.

### Normalizing Flows

A **normalizing flow** transforms a simple base distribution $p_z(z)$ (e.g., standard Gaussian) into a complex distribution $p_x(x)$ through an invertible mapping $x = f(z)$.

The change-of-variables formula requires the Jacobian determinant:

$$p_x(x) = p_z(f^{-1}(x)) \cdot \left|\det\left(\frac{\partial f^{-1}}{\partial x}\right)\right|$$

Without the $|\det(J)|$ factor, the transformed density would not integrate to 1. The Jacobian determinant corrects for the volume change: where the map stretches space, density decreases; where it compresses, density increases.

Computing $\det(J)$ for a general $n \times n$ Jacobian costs $O(n^3)$, which is prohibitive for high-dimensional data. Modern flow architectures (RealNVP, MAF, Glow) design transformations whose Jacobians are **triangular**, reducing the cost to $O(n)$ since $\det(L) = \prod L_{ii}$.

### Bayesian Model Comparison

In Bayesian inference, the **marginal likelihood** (model evidence) involves integrating over parameters:

$$p(D \mid \mathcal{M}) = \int p(D \mid \theta) p(\theta) \, d\theta$$

The Laplace approximation to this integral introduces $\det(H)$ where $H$ is the Hessian of the negative log-posterior at the mode:

$$\log p(D \mid \mathcal{M}) \approx \log p(D \mid \hat{\theta}) + \log p(\hat{\theta}) - \frac{1}{2}\log\det(H) + \frac{n}{2}\log(2\pi)$$

The $\log\det(H)$ term penalizes model complexity: a model with a sharply peaked posterior (large $\det(H)$, tightly constrained parameters) is penalized less than one with a flat posterior.

### Fisher Information and Experimental Design

The **Fisher information matrix** $\mathcal{I}(\theta)$ measures how much information the data carries about parameters $\theta$. Its determinant, known as the **D-optimality criterion**, quantifies the volume of the confidence ellipsoid for parameter estimation:

$$\text{Volume} \propto \frac{1}{\sqrt{\det(\mathcal{I}(\theta))}}$$

Larger $\det(\mathcal{I})$ means a smaller confidence region, so each parameter is better determined. In **optimal experimental design**, one chooses experiments to maximize $\det(\mathcal{I})$, minimizing the volume of uncertainty in parameter space.

---

## Guided Problems

### Problem 1: Properties in Action

Let $A$ be a $4 \times 4$ matrix with $\det(A) = 6$.

1. What is $\det(2A)$?
2. What is $\det(A^{-1})$?
3. What is $\det(A^3)$?
4. If $B$ is obtained by swapping two rows of $A$, what is $\det(B)$?

<details>
<summary>💡 **Solution**</summary>

1. $\det(2A) = 2^4 \det(A) = 16 \cdot 6 = 96$. (Scalar multiple rule with $n = 4$.)

2. $\det(A^{-1}) = 1/\det(A) = 1/6$.

3. $\det(A^3) = \det(A \cdot A \cdot A) = (\det A)^3 = 216$. (Multiplicative property applied twice.)

4. $\det(B) = -\det(A) = -6$. (Row exchange reverses sign.)

</details>

---

### Problem 2: Determinant and Eigenvalues

The matrix $A = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$ has eigenvalues $\lambda_1 = 6$ and $\lambda_2 = 1$.

1. Verify that $\det(A) = \lambda_1 \lambda_2$ and $\text{tr}(A) = \lambda_1 + \lambda_2$.
2. Without computing the eigenvalues directly, determine $\det(A^2)$ and the eigenvalues of $A^2$.
3. If one eigenvalue of $B$ is zero and $B$ is $3 \times 3$, what can you say about $\det(B)$?

<details>
<summary>💡 **Solution**</summary>

1. $\det(A) = 5 \cdot 2 - 2 \cdot 2 = 6 = 6 \cdot 1$ ✓. $\text{tr}(A) = 5 + 2 = 7 = 6 + 1$ ✓.

2. $\det(A^2) = (\det A)^2 = 36$. The eigenvalues of $A^2$ are $\lambda_1^2 = 36$ and $\lambda_2^2 = 1$ (since if $Ax = \lambda x$ then $A^2 x = \lambda^2 x$). Check: $36 \cdot 1 = 36$ ✓.

3. $\det(B) = \lambda_1 \lambda_2 \lambda_3 = 0$ (since one factor is zero). The matrix $B$ is singular, regardless of the other two eigenvalues.

</details>

---

### Problem 3: Volume and Linear Dependence

Consider the matrix $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix}$.

1. Compute $\det(A)$ using elimination or cofactor expansion.
2. What does the result tell you geometrically about the three column vectors?
3. Verify by showing an explicit linear dependence among the columns.

<details>
<summary>💡 **Solution**</summary>

1. Cofactor expansion along row 1:
$$\det(A) = 1(45 - 48) - 2(36 - 42) + 3(32 - 35) = 1(-3) - 2(-6) + 3(-3) = -3 + 12 - 9 = 0$$

2. $|\det(A)| = 0$ means the parallelepiped spanned by the three columns has zero volume. The three columns lie in a plane (a 2-dimensional subspace of $\mathbb{R}^3$), not spanning all of $\mathbb{R}^3$. The matrix is singular.

3. Column 3 = $2 \cdot$ Column 2 $-$ Column 1:
$$\begin{bmatrix}3\\6\\9\end{bmatrix} = 2\begin{bmatrix}2\\5\\8\end{bmatrix} - \begin{bmatrix}1\\4\\7\end{bmatrix} = \begin{bmatrix}3\\6\\9\end{bmatrix} \checkmark$$

</details>

---

### Problem 4: The Jacobian in Practice

Let $f: \mathbb{R}^2 \to \mathbb{R}^2$ be defined by $f(u, v) = (u^2 - v^2, \; 2uv)$.

1. Compute the Jacobian matrix $J_f$.
2. Compute $\det(J_f)$.
3. At the point $(u, v) = (1, 0)$, how does $f$ scale areas locally?
4. At the point $(u, v) = (3, 4)$, how does $f$ scale areas locally?

<details>
<summary>💡 **Solution**</summary>

1. $J_f = \begin{bmatrix} \partial f_1/\partial u & \partial f_1/\partial v \\ \partial f_2/\partial u & \partial f_2/\partial v \end{bmatrix} = \begin{bmatrix} 2u & -2v \\ 2v & 2u \end{bmatrix}$

2. $\det(J_f) = (2u)(2u) - (-2v)(2v) = 4u^2 + 4v^2 = 4(u^2 + v^2)$

3. At $(1, 0)$: $|\det(J_f)| = 4(1 + 0) = 4$. The map stretches areas by a factor of 4.

4. At $(3, 4)$: $|\det(J_f)| = 4(9 + 16) = 100$. The map stretches areas by a factor of 100.

Note: this function is $f(z) = z^2$ in complex notation where $z = u + iv$. The area scaling $4|z|^2 = |f'(z)|^2$ is the squared modulus of the complex derivative $f'(z) = 2z$.

</details>

---

## References

1. Strang, Gilbert - *Introduction to Linear Algebra*, 5th ed., Chapter 5
2. MIT OpenCourseWare - *18.06 Linear Algebra* - [Lecture 18: Properties of Determinants](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/resources/lecture-18-properties-of-determinants/)
3. MIT OpenCourseWare - *18.06 Linear Algebra* - [Lecture 19: Determinant Formulas and Cofactors](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/least-squares-determinants-and-eigenvalues/determinant-formulas-and-cofactors/)
4. Stanford CS229 - [Linear Algebra Review](https://cs229.stanford.edu/section/cs229-linalg.pdf) (Kolter), Section 3.9
5. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 4.1
6. Stanford CS236 - [Normalizing Flow Models](https://deepgenerativemodels.github.io/notes/flow/)
