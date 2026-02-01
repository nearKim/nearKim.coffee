---
sidebar_position: 8
---

# Matrix Operations

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Compute With Matrices Efficiently?

In practice, we need to *compute* with matrices: multiply them, solve systems, and decompose them into simpler pieces.

Naive approaches are expensive. Solving $Ax = b$ by computing $A^{-1}$ costs $O(n^3)$ operations and is numerically unstable. 

Instead, we factorize $A$ into structured components (triangular, orthogonal, diagonal) that are cheap to work with. This is the core idea behind every numerical linear algebra algorithm used in machine learning.

---

## Matrix Multiplication

### Four Ways to See $AB$

The same product $C = AB$ can be interpreted in four equivalent ways. Each reveals different structure.

**1. Entry-level (Dot Product)**

Each entry $C_{ij}$ is the dot product of row $i$ of $A$ with column $j$ of $B$:

$$C_{ij} = (\text{row } i \text{ of } A) \cdot (\text{col } j \text{ of } B)$$

**2. Column Interpretation**

Each column of $C$ is a linear combination of the columns of $A$, with coefficients from $B$:

$$\text{col}_j(C) = A \cdot \text{col}_j(B) = b_{1j} \cdot \text{col}_1(A) + b_{2j} \cdot \text{col}_2(A) + \cdots$$

This view explains $Ax = b$: the output is a combination of columns of $A$ weighted by $x$.

**3. Row Interpretation**

Each row of $C$ is a linear combination of the rows of $B$, with coefficients from $A$:

$$\text{row}_i(C) = \text{row}_i(A) \cdot B = a_{i1} \cdot \text{row}_1(B) + a_{i2} \cdot \text{row}_2(B) + \cdots$$

This view explains why row operations on $A$ correspond to left-multiplication by elementary matrices.

**4. Outer Product (Column × Row)**

$C$ is a sum of rank-1 outer products:

$$AB = \sum_{k=1}^{n} \text{col}_k(A) \cdot \text{row}_k(B)$$

Each term $\text{col}_k(A) \cdot \text{row}_k(B)$ is an $m \times p$ matrix of rank 1. This decomposition is the basis of low-rank approximation and the SVD.

**Example:** 

Let $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 5 & 6 \\ 7 & 8 \end{bmatrix}, C = AB = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$:

**1. Dot product:** $C_{11} = \begin{bmatrix}1&2\end{bmatrix}\cdot\begin{bmatrix}5\\7\end{bmatrix} = 5+14 = 19$, and so on for each entry.

**2. Column:** Each column of $C$ is a combination of columns of $A$:

$$\text{col}_1(C) = 5\begin{bmatrix}1\\3\end{bmatrix} + 7\begin{bmatrix}2\\4\end{bmatrix} = \begin{bmatrix}19\\43\end{bmatrix}, \quad \text{col}_2(C) = 6\begin{bmatrix}1\\3\end{bmatrix} + 8\begin{bmatrix}2\\4\end{bmatrix} = \begin{bmatrix}22\\50\end{bmatrix}$$

**3. Row:** Each row of $C$ is a combination of rows of $B$:

$$\text{row}_1(C) = 1\begin{bmatrix}5&6\end{bmatrix} + 2\begin{bmatrix}7&8\end{bmatrix} = \begin{bmatrix}19&22\end{bmatrix}, \quad \text{row}_2(C) = 3\begin{bmatrix}5&6\end{bmatrix} + 4\begin{bmatrix}7&8\end{bmatrix} = \begin{bmatrix}43&50\end{bmatrix}$$

**4. Outer product:** Sum of rank-1 matrices:

$$AB = \begin{bmatrix} 1 \\ 3 \end{bmatrix}\begin{bmatrix} 5 & 6 \end{bmatrix} + \begin{bmatrix} 2 \\ 4 \end{bmatrix}\begin{bmatrix} 7 & 8 \end{bmatrix} = \begin{bmatrix} 5 & 6 \\ 15 & 18 \end{bmatrix} + \begin{bmatrix} 14 & 16 \\ 28 & 32 \end{bmatrix} = \begin{bmatrix} 19 & 22 \\ 43 & 50 \end{bmatrix}$$

### Block Multiplication

Matrices partitioned into blocks multiply like scalar entries, as long as block dimensions are compatible:

$$\begin{bmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{bmatrix} \begin{bmatrix} B_{11} & B_{12} \\ B_{21} & B_{22} \end{bmatrix} = \begin{bmatrix} A_{11}B_{11} + A_{12}B_{21} & A_{11}B_{12} + A_{12}B_{22} \\ A_{21}B_{11} + A_{22}B_{21} & A_{21}B_{12} + A_{22}B_{22} \end{bmatrix}$$


### Properties

:::info[Theorem: Properties of Matrix Multiplication]
For matrices of compatible sizes:

1. **Associativity:** $(AB)C = A(BC)$
2. **Distributivity:** $A(B + C) = AB + AC$
3. **Not commutative:** $AB \neq BA$ in general
4. **Transpose reverses:** $(AB)^T = B^T A^T$
5. **Identity:** $AI = IA = A$
:::

**Non-commutativity matters.** If $A$ is $2 \times 3$ and $B$ is $3 \times 2$, then $AB$ is $2 \times 2$ but $BA$ is $3 \times 3$—different sizes entirely. Even when both products are defined (square matrices), they're typically different.

---

## LU Decomposition

### Gaussian Elimination as Matrix Factorization

Gaussian elimination transforms $A$ into an upper triangular matrix $U$ by applying elementary row operations. Each row operation corresponds to left-multiplying by an elementary matrix $E_k$:

$$E_k \cdots E_2 E_1 A = U$$

Rearranging:

$$A = E_1^{-1} E_2^{-1} \cdots E_k^{-1} U = LU$$

The product of inverse elementary matrices is a lower triangular matrix $L$.

:::danger[Definition: LU Decomposition]
An LU decomposition of a matrix $A$ is a factorization:

$$A = LU$$

where $L$ is **lower triangular** (with 1s on the diagonal) and $U$ is **upper triangular**.
:::

**Example:**

$$A = \begin{bmatrix} 2 & 1 & 1 \\ 4 & 3 & 3 \\ 8 & 7 & 9 \end{bmatrix}$$

**Step 1:** $R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - 4R_1$:

$$\begin{bmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 3 & 5 \end{bmatrix}$$

**Step 2:** $R_3 \leftarrow R_3 - 3R_2$:

$$U = \begin{bmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{bmatrix}$$

The multipliers (2, 4, 3) fill $L$ below the diagonal:

$$L = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 4 & 3 & 1 \end{bmatrix}$$

**Verification:** $LU = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 4 & 3 & 1 \end{bmatrix}\begin{bmatrix} 2 & 1 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 2 \end{bmatrix} = \begin{bmatrix} 2 & 1 & 1 \\ 4 & 3 & 3 \\ 8 & 7 & 9 \end{bmatrix} = A$ ✓

### Why Factor Instead of Invert?

Solving $Ax = b$ via $A^{-1}b$ costs $O(n^3)$ for the inverse *plus* $O(n^2)$ for the multiply. With LU:

1. **Factor once:** $A = LU$ costs $O(\frac{2}{3}n^3)$
2. **Solve twice:** $Ly = b$ (forward substitution, $O(n^2)$), then $Ux = y$ (back substitution, $O(n^2)$)

For multiple right-hand sides $b_1, b_2, \ldots, b_k$, the factorization is reused. Solving $k$ systems costs $O(\frac{2}{3}n^3 + 2kn^2)$ instead of $O(kn^3)$.

<details>
<summary>Proof</summary>

**LU factorization — $O(\frac{2}{3}n^3)$**

Consider a $4 \times 4$ matrix. At each step of elimination, we pick a pivot and use it to zero out everything below it. The work happens in the **shaded submatrix** — the block below and to the right of the pivot:

**Step $k=1$:** Pivot at position $(1,1)$. To zero out the 3 entries below it (rows 2, 3, 4), we subtract a multiple of row 1 from each row. But the subtraction updates every entry to the right of the pivot too — that's 3 entries per row. So the work is a $3 \times 3$ block: **9 multiply-subtracts**.

$$\begin{bmatrix} \boxed{a_{11}} & a_{12} & a_{13} & a_{14} \\ 0 & \color{red}{*} & \color{red}{*} & \color{red}{*} \\ 0 & \color{red}{*} & \color{red}{*} & \color{red}{*} \\ 0 & \color{red}{*} & \color{red}{*} & \color{red}{*} \end{bmatrix} \quad (n-1)^2 = 3^2 = 9 \text{ operations}$$

**Step $k=2$:** Pivot at $(2,2)$. Zero out 2 rows below, each with 2 entries to update. Work is a $2 \times 2$ block: **4 multiply-subtracts**.

$$\begin{bmatrix} * & * & * & * \\ 0 & \boxed{a_{22}} & a_{23} & a_{24} \\ 0 & 0 & \color{red}{*} & \color{red}{*} \\ 0 & 0 & \color{red}{*} & \color{red}{*} \end{bmatrix} \quad (n-2)^2 = 2^2 = 4 \text{ operations}$$

**Step $k=3$:** Pivot at $(3,3)$. One row below, one entry: **1 multiply-subtract**.

The pattern: at step $k$, the work is an $(n-k) \times (n-k)$ block. Each entry in this block requires 1 multiply + 1 subtract. Total:

$$\text{Multiplications} = \sum_{k=1}^{n-1}(n-k)^2 = \sum_{j=1}^{n-1}j^2 = \frac{(n-1)n(2n-1)}{6}\approx \frac{n^3}{3}$$

Each multiply is paired with a subtract, so the total operation count is $\sim \frac{2n^3}{3}$.

**Forward/back substitution — $O(n^2)$**

Solving $Ly = b$: the $k$-th unknown requires $(k-1)$ multiplications. Total: $\sum_{k=1}^{n}(k-1) = \frac{n(n-1)}{2} = O(n^2)$. Same for $Ux = y$.

**Computing $A^{-1}$ — $O(n^3)$**

$A^{-1}$ solves $AX = I$, i.e., $n$ separate systems $Ax_j = e_j$. LU factorization costs $\frac{2n^3}{3}$ once, then each of the $n$ forward/back solves costs $O(n^2)$, giving an additional $n \cdot O(n^2) = O(n^3)$. Total: $\sim \frac{2n^3}{3} + n^3 \approx \frac{5n^3}{3}$, which is roughly **2.5x more** than a single LU solve.

**Matrix-vector multiply $A^{-1}b$ — $O(n^2)$**

Each of the $n$ entries of the result requires a dot product of length $n$: $n \times n = n^2$ operations.

</details>

| Method | One system | $k$ systems |
|--------|-----------|-------------|
| Inverse | $O(n^3) + O(n^2)$ | $O(n^3) + O(kn^2)$ |
| LU | $O(\frac{2}{3}n^3) + O(n^2)$ | $O(\frac{2}{3}n^3) + O(kn^2)$ |

The LU approach is also more numerically stable.

### When Does LU Exist?

LU exists without row swaps when all **leading principal minors** of $A$ are nonzero (i.e., the top-left $k \times k$ submatrix is invertible for all $k$). When a zero pivot is encountered, row swaps are necessary.

### PLU Decomposition

When row swaps are needed, we use a **permutation matrix** $P$:

:::danger[Definition: PLU Decomposition]
Every invertible matrix $A$ has a factorization:

$$PA = LU$$

where $P$ is a permutation matrix, $L$ is lower triangular, and $U$ is upper triangular.
:::

A **permutation matrix** $P$ is obtained by reordering the rows of the identity matrix. It satisfies $P^T P = I$ (i.e., $P^{-1} = P^T$).

**Example:** Swapping rows 1 and 2:

$$P = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

**Partial pivoting:** In practice, even when row swaps aren't strictly necessary, we swap to place the largest available pivot in position. This controls the growth of entries in $L$ and $U$, improving numerical stability.

---

## Special Matrices

Certain matrix structures appear repeatedly in linear algebra and ML. Recognizing them unlocks computational shortcuts and theoretical guarantees.

### Diagonal Matrices

$$D = \begin{bmatrix} d_1 & & \\ & d_2 & \\ & & d_3 \end{bmatrix}$$

| Operation | Formula | Cost |
|-----------|---------|------|
| Multiply $Dx$ | $(d_1 x_1, d_2 x_2, d_3 x_3)$ | $O(n)$ |
| Inverse $D^{-1}$ | $\text{diag}(1/d_1, 1/d_2, 1/d_3)$ | $O(n)$ |
| Powers $D^k$ | $\text{diag}(d_1^k, d_2^k, d_3^k)$ | $O(n)$ |
| Determinant | $d_1 d_2 d_3$ | $O(n)$ |
| Eigenvalues | $d_1, d_2, d_3$ | Already known |

Diagonal matrices are the "ideal" form. Many decompositions (eigendecomposition, SVD) aim to reduce a matrix to diagonal form.

### Triangular Matrices

**Lower triangular** $L$: all entries above the diagonal are zero.
**Upper triangular** $U$: all entries below the diagonal are zero.

$$L = \begin{bmatrix} l_{11} & 0 & 0 \\ l_{21} & l_{22} & 0 \\ l_{31} & l_{32} & l_{33} \end{bmatrix}, \quad U = \begin{bmatrix} u_{11} & u_{12} & u_{13} \\ 0 & u_{22} & u_{23} \\ 0 & 0 & u_{33} \end{bmatrix}$$

**Key properties:**
- **Determinant:** Product of diagonal entries: $\det(L) = l_{11} l_{22} l_{33}$
- **Solving $Lx = b$:** Forward substitution, $O(n^2)$
- **Solving $Ux = b$:** Back substitution, $O(n^2)$
- **Product:** The product of lower (upper) triangular matrices is lower (upper) triangular
- **Inverse:** The inverse of a lower (upper) triangular matrix is lower (upper) triangular

### Symmetric Matrices

:::danger[Definition: Symmetric Matrix]
A matrix $S$ is **symmetric** if $S = S^T$, meaning $S_{ij} = S_{ji}$ for all $i, j$.
:::

**Key properties:**
- Eigenvalues are **real** (even for matrices with complex entries)
- Eigenvectors corresponding to distinct eigenvalues are **orthogonal**
- Can be diagonalized as $S = Q\Lambda Q^T$ where $Q$ is orthogonal

**Where they appear:**
- **Gram matrix:** $A^T A$ is always symmetric
- **Covariance matrix:** $\Sigma = \frac{1}{n-1}X^T X$ (centered data)
- **Hessian:** Second-derivative matrix in optimization
- **Kernel/similarity matrices:** $K_{ij} = k(x_i, x_j)$

:::info[Theorem: Spectral Theorem for Symmetric Matrices]
Every real symmetric matrix $S$ can be factored as:

$$S = Q\Lambda Q^T$$

where $Q$ is orthogonal ($Q^T Q = I$) and $\Lambda$ is diagonal (the eigenvalues).
:::

### Positive Definite Matrices

:::danger[Definition: Positive Definite Matrix]
A symmetric matrix $S$ is **positive definite** (PD) if for all non-zero vectors $x$:

$$x^T S x > 0$$

It is **positive semi-definite** (PSD) if $x^T S x \geq 0$.
:::

**Equivalent conditions for PD:**
- All eigenvalues are positive: $\lambda_i > 0$
- All pivots are positive
- All leading principal minors are positive
- $S = R^T R$ for some matrix $R$ with independent columns

**Where they appear:**
- $A^T A$ is PSD for any $A$; PD when $A$ has independent columns
- Covariance matrices are PSD
- Hessians at local minima are PSD

**Cholesky decomposition:** Every PD matrix has a unique factorization $S = LL^T$ where $L$ is lower triangular with positive diagonal. This is the "square root" of a matrix, and costs half the operations of LU.

### Orthogonal Matrices

:::danger[Definition: Orthogonal Matrix]
A square matrix $Q$ is **orthogonal** if its columns are orthonormal:

$$Q^T Q = QQ^T = I$$

Equivalently, $Q^{-1} = Q^T$.
:::

**Key properties:**
- **Preserves lengths:** $\|Qx\| = \|x\|$
- **Preserves angles:** $(Qx)^T(Qy) = x^T y$
- **Preserves determinant magnitude:** $|\det(Q)| = 1$
- **Numerically stable:** No error amplification when multiplying by $Q$

**Examples:**
- **Rotation:** $R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$
- **Reflection:** $H = I - 2uu^T$ (Householder reflector, $\|u\| = 1$)
- **Permutation:** Any row-permuted identity matrix

**Where they appear:**
- QR decomposition: $A = QR$
- SVD: $A = U\Sigma V^T$ where $U, V$ are orthogonal
- PCA: the principal component matrix is orthogonal

### Identity and Zero Matrices

**Identity** $I$: the multiplicative identity. $AI = IA = A$. Diagonal with all 1s.

**Zero matrix** $0$: the additive identity. $A + 0 = A$. The unique matrix that maps everything to zero.

---

## Matrix Factorizations at a Glance

| Factorization | Form | Requires | Cost | Purpose |
|---------------|------|----------|------|---------|
| **LU** | $A = LU$ | Square, no zero pivots | $\frac{2}{3}n^3$ | Solve $Ax = b$ |
| **PLU** | $PA = LU$ | Square, invertible | $\frac{2}{3}n^3$ | Solve $Ax = b$ with pivoting |
| **Cholesky** | $A = LL^T$ | Symmetric positive definite | $\frac{1}{3}n^3$ | Solve SPD systems (2× faster) |
| **QR** | $A = QR$ | Any $m \times n$ ($m \geq n$) | $\frac{4}{3}n^3$ | Least squares, eigenvalues |
| **Eigendecomposition** | $A = Q\Lambda Q^T$ | Symmetric | Iterative | Spectral analysis, PCA |
| **SVD** | $A = U\Sigma V^T$ | Any $m \times n$ | Iterative | Low-rank approx, pseudoinverse |

Each factorization exploits different structure. The choice depends on the matrix properties and the problem at hand.

---

## Summary

**Matrix multiplication:**
- Four views: dot product (entry), column combination, row combination, outer product sum
- Not commutative; transpose reverses order: $(AB)^T = B^T A^T$
- Block multiplication works when block dimensions are compatible

**LU decomposition:**
- Gaussian elimination encoded as $A = LU$ (lower × upper triangular)
- Factor once ($O(n^3)$), solve many times ($O(n^2)$ each)
- PLU with partial pivoting handles zero pivots and improves stability

**Special matrices:**
- **Diagonal:** All operations in $O(n)$; the ideal target form
- **Triangular:** $O(n^2)$ solves via forward/back substitution
- **Symmetric:** Real eigenvalues, orthogonal eigenvectors; spectral theorem gives $S = Q\Lambda Q^T$
- **Positive definite:** All eigenvalues positive; Cholesky $S = LL^T$ at half the cost of LU
- **Orthogonal:** $Q^{-1} = Q^T$; preserves lengths and angles; numerically ideal

---

## Applications in Data Science and Machine Learning

### Solving the Normal Equations

Linear regression requires solving $(X^TX)\beta = X^Ty$. The Gram matrix $X^TX$ is symmetric and (when $X$ has independent columns) positive definite. **Cholesky decomposition** is the method of choice:

1. Compute $G = X^TX$ and $c = X^Ty$
2. Factor $G = LL^T$ (Cholesky)
3. Solve $Ly = c$ (forward substitution)
4. Solve $L^T\beta = y$ (back substitution)

This costs $\frac{1}{3}n^3 + n^2$—half the cost of LU—and exploits the symmetry and positive definiteness of $G$. See [Matrix Inverse: Linear Regression](./02-matrix-inverse-overview.md#linear-regression-ordinary-least-squares) for when $G$ is singular.

### QR for Numerically Stable Least Squares

When $X^TX$ is ill-conditioned, Cholesky on the normal equations amplifies errors (the condition number squares: $\kappa(X^TX) = \kappa(X)^2$). The QR approach avoids forming $X^TX$ entirely:

1. Factor $X = QR$ where $Q$ is orthogonal, $R$ is upper triangular
2. The normal equations become $R\beta = Q^Ty$
3. Solve by back substitution

Since $Q$ preserves lengths, no condition number is lost. QR is the default in `numpy.linalg.lstsq` and similar libraries.

### Batch Linear Systems in Neural Networks

A forward pass through a linear layer computes $Y = XW^T + b$ for a batch of inputs $X \in \mathbb{R}^{B \times n}$. This is a single matrix multiplication—$O(Bnm)$ for output dimension $m$.

Modern deep learning relies on highly optimized BLAS (Basic Linear Algebra Subprograms) implementations that use:
- **Block multiplication** for cache efficiency
- **GPU parallelism** across the outer product structure
- **Mixed precision** (float16 multiply, float32 accumulate) for speed

### Cholesky in Gaussian Processes

Gaussian process inference requires computing $K^{-1}y$ and $\log\det(K)$ for a kernel matrix $K$. Since $K$ is symmetric positive definite:

1. Factor $K = LL^T$ (Cholesky)
2. Solve $K^{-1}y$ via two triangular solves: $O(n^2)$
3. Compute $\log\det(K) = 2\sum_i \log L_{ii}$: $O(n)$

The Cholesky factor is the computational workhorse of GP inference.

---

## Guided Problems

### Problem 1: Factorization Practice

Compute the LU decomposition of:

$$A = \begin{bmatrix} 1 & 2 & 1 \\ 2 & 6 & 1 \\ 1 & 1 & 4 \end{bmatrix}$$

1. Find $L$ and $U$ such that $A = LU$.
2. Use the factorization to solve $Ax = \begin{bmatrix} 1 \\ -1 \\ 2 \end{bmatrix}$.

<details>
<summary>💡 **Solution**</summary>

**Part 1:**

**Step 1:** $R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - 1R_1$:

$$\begin{bmatrix} 1 & 2 & 1 \\ 0 & 2 & -1 \\ 0 & -1 & 3 \end{bmatrix}$$

Multipliers: $l_{21} = 2$, $l_{31} = 1$.

**Step 2:** $R_3 \leftarrow R_3 + \frac{1}{2}R_2$:

$$U = \begin{bmatrix} 1 & 2 & 1 \\ 0 & 2 & -1 \\ 0 & 0 & \frac{5}{2} \end{bmatrix}$$

Multiplier: $l_{32} = -\frac{1}{2}$.

$$L = \begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & -\frac{1}{2} & 1 \end{bmatrix}$$

**Verification:** $LU = A$ ✓

**Part 2:**

Solve $Ly = b$ (forward substitution) with $b = \begin{bmatrix} 1 \\ -1 \\ 2 \end{bmatrix}$:

$$y_1 = 1, \quad y_2 = -1 - 2(1) = -3, \quad y_3 = 2 - 1(1) - (-\frac{1}{2})(-3) = 2 - 1 - \frac{3}{2} = -\frac{1}{2}$$

$$y = \begin{bmatrix} 1 \\ -3 \\ -\frac{1}{2} \end{bmatrix}$$

Solve $Ux = y$ (back substitution):

$$x_3 = \frac{-1/2}{5/2} = -\frac{1}{5}, \quad x_2 = \frac{-3 - (-1)(-1/5)}{2} = \frac{-3 - 1/5}{2} = -\frac{8}{5}, \quad x_1 = 1 - 2(-\frac{8}{5}) - 1(-\frac{1}{5}) = 1 + \frac{16}{5} + \frac{1}{5} = \frac{22}{5}$$

$$x = \begin{bmatrix} \frac{22}{5} \\ -\frac{8}{5} \\ -\frac{1}{5} \end{bmatrix}$$

</details>

---

### Problem 2: Cholesky Decomposition

Let $S = \begin{bmatrix} 4 & 2 \\ 2 & 3 \end{bmatrix}$.

1. Verify that $S$ is symmetric and positive definite.
2. Find the Cholesky factor $L$ such that $S = LL^T$.
3. Use it to solve $Sx = \begin{bmatrix} 8 \\ 7 \end{bmatrix}$.

<details>
<summary>💡 **Solution**</summary>

**Part 1:**

Symmetric: $S = S^T$ ✓

Positive definite: eigenvalues of $S$ are $\lambda = \frac{7 \pm \sqrt{9-8}}{2} = \frac{7 \pm \sqrt{1}}{2}$... Actually, using the trace and determinant: $\text{tr}(S) = 7 > 0$, $\det(S) = 12 - 4 = 8 > 0$. Both eigenvalues are positive. ✓

Alternatively: leading minors are $4 > 0$ and $\det(S) = 8 > 0$. ✓

**Part 2:**

$$S = LL^T = \begin{bmatrix} l_{11} & 0 \\ l_{21} & l_{22} \end{bmatrix}\begin{bmatrix} l_{11} & l_{21} \\ 0 & l_{22} \end{bmatrix}$$

From $(1,1)$: $l_{11}^2 = 4 \implies l_{11} = 2$

From $(2,1)$: $l_{21} l_{11} = 2 \implies l_{21} = 1$

From $(2,2)$: $l_{21}^2 + l_{22}^2 = 3 \implies l_{22} = \sqrt{2}$

$$L = \begin{bmatrix} 2 & 0 \\ 1 & \sqrt{2} \end{bmatrix}$$

**Part 3:**

Forward solve $Ly = \begin{bmatrix} 8 \\ 7 \end{bmatrix}$:

$$y_1 = 4, \quad y_2 = \frac{7 - 1(4)}{\sqrt{2}} = \frac{3}{\sqrt{2}}$$

Back solve $L^T x = y$:

$$x_2 = \frac{3/\sqrt{2}}{\sqrt{2}} = \frac{3}{2}, \quad x_1 = \frac{4 - 1(\frac{3}{2})}{2} = \frac{5}{4}$$

$$x = \begin{bmatrix} \frac{5}{4} \\ \frac{3}{2} \end{bmatrix}$$

</details>

---

### Problem 3: Properties of Special Matrices

For each statement, determine if it is **True** or **False**. Justify your answer.

1. If $A$ is symmetric and $B$ is symmetric, then $AB$ is symmetric.

2. If $Q$ is orthogonal, then $\det(Q) = \pm 1$.

3. If $S$ is positive definite, then all diagonal entries of $S$ are positive.

4. The product of two upper triangular matrices is upper triangular.

<details>
<summary>💡 **Solution**</summary>

**1. False.**

$(AB)^T = B^T A^T = BA$. This equals $AB$ only if $A$ and $B$ commute ($AB = BA$), which is not true in general.

Counterexample: $A = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}$. Both symmetric, but $AB = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} \neq (AB)^T$.

**2. True.**

From $Q^T Q = I$: $\det(Q^T)\det(Q) = 1$, so $(\det Q)^2 = 1$, giving $\det Q = \pm 1$.

**3. True.**

The diagonal entry $S_{ii} = e_i^T S e_i$. Since $e_i \neq 0$ and $S$ is positive definite, $e_i^T S e_i > 0$.

**4. True.**

If $U_1$ and $U_2$ are upper triangular, then $(U_1 U_2)_{ij} = \sum_k (U_1)_{ik}(U_2)_{kj}$. For $i > j$: $(U_1)_{ik} = 0$ when $k < i$ and $(U_2)_{kj} = 0$ when $k > j$. Since $i > j$, every term has either $k < i$ or $k > j$ (or both), so the sum is zero.

</details>

---

## References

1. Strang, Gilbert - *Introduction to Linear Algebra* (Chapters 1.4, 1.5, 1.7, 2.6)
2. Trefethen, Lloyd N. and Bau, David - *Numerical Linear Algebra* (Chapters 20-23)
3. Golub, Gene H. and Van Loan, Charles F. - *Matrix Computations* (Chapters 3-4)
