---
sidebar_position: 3
---

# Matrix Inverse and Invertibility

## Introduction

A matrix $A$ is **invertible** (also called non-singular or non-degenerate) if there exists a matrix $A^{-1}$ such that:

$$AA^{-1} = A^{-1}A = I$$

where $I$ is the identity matrix.

**Key Concept:** Not all matrices have inverses. Understanding when a matrix is invertible and how invertibility relates to the fundamental subspaces is crucial for solving linear systems and analyzing linear transformations.

## Conditions for Invertibility

For a square $n \times n$ matrix $A$, the following conditions are **equivalent**:

1. $A$ is invertible
2. $A$ has full rank: $\text{rank}(A) = n$
3. The columns of $A$ are linearly independent
4. The rows of $A$ are linearly independent
5. $\det(A) \neq 0$
6. The nullspace contains only the zero vector: $N(A) = \{\mathbf{0}\}$
7. The left nullspace contains only the zero vector: $N(A^T) = \{\mathbf{0}\}$
8. The equation $Ax = b$ has a unique solution for every $b$
9. The equation $Ax = 0$ has only the trivial solution $x = 0$

## Invertibility and the Four Fundamental Subspaces

When a square $n \times n$ matrix $A$ is invertible:

| Subspace | Dimension | Space |
|----------|-----------|-------|
| Column Space $C(A)$ | $n$ | $\mathbb{R}^n$ (entire space) |
| Row Space $C(A^T)$ | $n$ | $\mathbb{R}^n$ (entire space) |
| Nullspace $N(A)$ | $0$ | $\{\mathbf{0}\}$ (zero vector only) |
| Left Nullspace $N(A^T)$ | $0$ | $\{\mathbf{0}\}$ (zero vector only) |

**Key Insight:** An invertible matrix "preserves information" - no dimensions are lost, and the transformation is fully reversible.

## Non-Invertible (Singular) Matrices

When a matrix is **not invertible**, it loses information:

- $\text{rank}(A) < n$ (rank-deficient)
- The nullspace contains non-zero vectors
- Multiple inputs map to the same output
- The equation $Ax = b$ may have no solution or infinitely many solutions
- Cannot uniquely recover $x$ from $Ax$

## Applications in Data Science

### 1. Linear Regression

The normal equations for ordinary least squares (OLS) are:

$$(X^T X)\beta = X^T y$$

The matrix $G = X^T X$ is called the **Gram matrix**. For this system to have a unique solution:
- $G$ must be invertible
- The columns of $X$ must be linearly independent
- There must be no perfect multicollinearity

If $G$ is singular, the regression problem has no unique solution.

### 2. Regularization

When $X^T X$ is nearly singular or singular, we add a **regularization term**:

$$(X^T X + \lambda I)\beta = X^T y$$

Adding $\lambda I$ to the diagonal:
- Shifts all eigenvalues by $\lambda$
- Makes the matrix invertible (if $\lambda > 0$)
- Trades exact fit for stability (bias-variance tradeoff)

This is the basis for **Ridge Regression** (L2 regularization).

---

## Guide Problems

### Problem 1: Invertible Matrix and Its Fundamental Subspaces

Suppose that $A$ is an invertible $4 \times 4$ matrix. Find bases for its four fundamental subspaces.


<details>
<summary>💡 **Solution**</summary>

Since $A$ is an invertible $4 \times 4$ matrix, we know that it has full rank.

  * $m = 4, n = 4$
  * Rank $r = 4$

We can derive the properties of the subspaces from the rank:

1.  **Column Space $C(A)$:**

      * Dimension $= r = 4$.
      * Since the dimension is 4 and the space is $\mathbb{R}^4$, the column space is the entire space $\mathbb{R}^4$.
      * **Basis:** The standard basis for $\mathbb{R}^4$:
        $$\mathcal{B}_{col} = \{ \mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3, \mathbf{e}_4 \} = \left\{ \begin{bmatrix} 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix} \right\}$$

2.  **Row Space $C(A^T)$:**

      * Dimension $= r = 4$.
      * Similar to the column space, the row space spans all of $\mathbb{R}^4$.
      * **Basis:** The standard basis for $\mathbb{R}^4$:
        $$\mathcal{B}_{row} = \{ \mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3, \mathbf{e}_4 \}$$

3.  **Nullspace $N(A)$:**

      * Dimension $= n - r = 4 - 4 = 0$.
      * The nullspace contains only the zero vector $\{\mathbf{0}\}$.
      * **Basis:** The basis for the zero subspace is the **empty set**:
        $$\mathcal{B}_{null} = \emptyset$$

4.  **Left Nullspace $N(A^T)$:**

      * Dimension $= m - r = 4 - 4 = 0$.
      * The left nullspace contains only the zero vector $\{\mathbf{0}\}$.
      * **Basis:** The basis is the **empty set**:
        $$\mathcal{B}_{leftnull} = \emptyset$$

</details>

---

### Problem 2: Symmetric Matrix and Diagonal Perturbation

Let $S$ be a $4 \times 4$ symmetric matrix defined as follows:

$$
S = \begin{bmatrix}
1 & 1 & 0 & 0 \\
1 & 1 & 0 & 0 \\
0 & 0 & 2 & 0 \\
0 & 0 & 0 & 3
\end{bmatrix}
$$

1. Find the **rank** of $S$ and a basis for its **Nullspace**, $N(S)$. Is $S$ invertible?

2. Let $\lambda$ be a positive scalar (e.g., $\lambda = 0.5$). We construct a new matrix $P$ by adding $\lambda$ to the diagonal of $S$:
   $$
   P = S + \lambda I
   $$
   Find the **rank** of this new matrix $P$. Is $P$ invertible?


<details>
<summary>💡 **Solution**</summary>

#### Part 1: Analyzing Matrix $S$

To find the rank and nullspace, we perform Gaussian elimination to reach Row Echelon Form.

$$
\begin{bmatrix}
1 & 1 & 0 & 0 \\
1 & 1 & 0 & 0 \\
0 & 0 & 2 & 0 \\
0 & 0 & 0 & 3
\end{bmatrix}
\xrightarrow{R_2 - R_1}
\begin{bmatrix}
\mathbf{1} & 1 & 0 & 0 \\
0 & 0 & 0 & 0 \\
0 & 0 & \mathbf{2} & 0 \\
0 & 0 & 0 & \mathbf{3}
\end{bmatrix}
$$

Rearranging the zero row to the bottom:
$$
U = \begin{bmatrix}
\mathbf{1} & 1 & 0 & 0 \\
0 & 0 & \mathbf{2} & 0 \\
0 & 0 & 0 & \mathbf{3} \\
0 & 0 & 0 & 0
\end{bmatrix}
$$

* **Rank:** There are **3 pivots** (in columns 1, 3, and 4). Therefore, $\text{rank}(S) = 3$.
* **Invertibility:** Since the rank (3) is less than the dimension (4), the matrix is **singular** (not invertible).
* **Nullspace Basis:**
    There is one free variable corresponding to column 2 ($x_2$).
    The equation from row 1 is: $x_1 + x_2 = 0 \implies x_1 = -x_2$.
    The other rows imply $x_3 = 0$ and $x_4 = 0$.
    Setting free variable $x_2 = 1$:
    $$
    \mathcal{B}_{null} = \left\{ \begin{bmatrix} -1 \\ 1 \\ 0 \\ 0 \end{bmatrix} \right\}
    $$

#### Part 2: Analyzing the Perturbed Matrix $P = S + \lambda I$

We add $\lambda$ (where $\lambda > 0$) to the diagonal elements of $S$.

$$
P = \begin{bmatrix}
1+\lambda & 1 & 0 & 0 \\
1 & 1+\lambda & 0 & 0 \\
0 & 0 & 2+\lambda & 0 \\
0 & 0 & 0 & 3+\lambda
\end{bmatrix}
$$

To check the rank/invertibility, we can check the determinant. Since the matrix is block diagonal, the determinant is the product of the determinants of the blocks.

**Block 1 (Top-Left $2\times2$):**
$$
\det \left( \begin{bmatrix} 1+\lambda & 1 \\ 1 & 1+\lambda \end{bmatrix} \right) = (1+\lambda)(1+\lambda) - (1)(1)
$$
$$
= (1 + 2\lambda + \lambda^2) - 1 = 2\lambda + \lambda^2
$$

**Block 2 (Bottom-Right Diagonal):**
The determinants are simply the diagonal entries: $(2+\lambda)$ and $(3+\lambda)$.

**Total Determinant:**
$$
\det(P) = (2\lambda + \lambda^2) \cdot (2+\lambda) \cdot (3+\lambda)
$$

**Conclusion:**
Since $\lambda$ is positive ($\lambda > 0$), every term in that product is positive.
Therefore, $\det(P) \neq 0$.

* **Invertibility:** The matrix $P$ is **invertible**.
* **Rank:** Since it is invertible, it must have **full rank**. $\text{rank}(P) = 4$.

**Connection Summary:**
Even though the original matrix $S$ lost information (rank 3, non-invertible), adding a small scalar matrix $\lambda I$ restored the rank to 4, making the system solvable for a unique solution.

</details>

---

### Problem 3: Linear Dependence and Gram Matrix

Let $A$ be a $4 \times 3$ matrix defined as:

$$
A = \begin{bmatrix}
1 & 2 & 3 \\
1 & 3 & 4 \\
1 & 4 & 5 \\
1 & 5 & 6
\end{bmatrix}
$$

1. Determine if the columns of $A$ are linearly independent. If they are dependent, find a non-zero vector $\mathbf{x}$ such that $A\mathbf{x} = \mathbf{0}$.

2. Calculate the symmetric matrix $G = A^T A$.

3. Without performing full Gaussian elimination on $G$, determine the **rank** of $G$ and whether $G$ is **invertible**. Explain your reasoning based on the result from Part 1.


<details>
<summary>💡 **Solution**</summary>

#### Part 1: Linear Independence and Nullspace

We examine the columns of $A$:
$$
c_3 = c_1 + c_2
$$

Since $\mathbf{c}_3$ can be written as a linear combination of $\mathbf{c}_1$ and $\mathbf{c}_2$, the columns are **linearly dependent**.

To find the vector $\mathbf{x}$ (which is in the Nullspace $N(A)$), we rewrite the dependency equation:
$$
1\cdot\mathbf{c}_1 + 1\cdot\mathbf{c}_2 - 1\cdot\mathbf{c}_3 = \mathbf{0}
$$

This gives us the coefficients for our vector $\mathbf{x}$:
$$
\mathbf{x} = \begin{bmatrix} 1 \\ 1 \\ -1 \end{bmatrix}
$$


#### Part 2: Calculating $G = A^T A$

$$
G = \begin{bmatrix}
1 & 1 & 1 & 1 \\
2 & 3 & 4 & 5 \\
3 & 4 & 5 & 6
\end{bmatrix}
\begin{bmatrix}
1 & 2 & 3 \\
1 & 3 & 4 \\
1 & 4 & 5 \\
1 & 5 & 6
\end{bmatrix}
$$

$$
G = \begin{bmatrix}
4 & 14 & 18 \\
14 & 54 & 72 \\
18 & 72 & 86
\end{bmatrix}
$$

#### Part 3: Rank and Invertibility of $G$

**Key Fact:** $\text{rank}(A^T A) = \text{rank}(A)$ (see [Vector Spaces Deep Dive](./01-vector-spaces-deepdive.md#rank-of-gram-matrix) for proof)

1.  **Rank of A:** Since column 3 is dependent on columns 1 and 2 (and columns 1 and 2 are independent of each other), $\text{rank}(A) = 2$.
2.  **Rank of G:** Therefore, $\text{rank}(G) = \text{rank}(A^T A) = \text{rank}(A) = 2$.
3.  **Invertibility:** The matrix $G$ is a $3 \times 3$ matrix. For a $3 \times 3$ matrix to be invertible, it must have full rank (rank = 3).
    * Since $\text{rank}(G) = 2 < 3$, **$G$ is not invertible (it is singular).**

**Mathematical Connection to Data Science**

This problem illustrates **Perfect Multicollinearity**.

1.  **The Matrix $A$ (Feature Matrix):** Imagine $A$ represents your data. Column 1 is a bias term, Column 2 is "Feature A", and Column 3 is "Feature B". The math shows that Feature B is exactly Feature A plus the bias. They contain redundant information.
2.  **The Vector $\mathbf{x}$ (Non-uniqueness):** The existence of a non-zero vector $\mathbf{x}$ in the nullspace means there are infinite ways to combine the features to get the same result. The weights are not unique.
3.  **The Matrix $G$ (Hessian/Gram Matrix):** In optimization (OLS), we must invert $G = A^T A$. Because the columns were dependent, $G$ became singular. You literally cannot calculate $(A^T A)^{-1}$, causing the algorithm to crash or output "NaN".

</details>

-----

## References

1. Strang, Gilbert - *Introduction to Linear Algebra* (Chapters 2-3)
2. MIT OpenCourseWare - *18.06SC Linear Algebra*
