---
sidebar_position: 2
---

# Basic Linear Algebra Concepts

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

-----

## Why These Concepts Matter

Before diving into vector spaces and linear transformations, we need to establish the fundamental operations of linear algebra. These concepts appear everywhere in machine learning: from computing similarity between word embeddings to understanding how data varies together.

Consider these common scenarios:

1. **Measuring Similarity:** How do we quantify how similar two data points are? (Inner product)
2. **Creating Structure:** How do we build matrices from vectors? (Outer product)
3. **Understanding Spread:** How do we measure how variables change together? (Covariance and Correlation)

---

## Inner Product (Dot Product)

### Intuition

The inner product measures how much two vectors "point in the same direction." If two vectors are perpendicular (orthogonal), their inner product is zero. If they point in the same direction, the inner product is positive and large.

### Formal Definition

:::danger[Definition: Inner Product (Dot Product)]
The **inner product** (or **dot product**) of two vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$ is:

$$\mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v} = \sum_{i=1}^{n} u_i v_i = u_1 v_1 + u_2 v_2 + \cdots + u_n v_n$$

The result is a **scalar**.
:::

### Geometric Interpretation

:::info[Theorem: Geometric Form of Inner Product]
For vectors $\mathbf{u}$ and $\mathbf{v}$, the inner product relates to the angle $\theta$ between them:

$$\mathbf{u} \cdot \mathbf{v} = \|\mathbf{u}\| \|\mathbf{v}\| \cos\theta$$

where $\|\cdot\|$ denotes the Euclidean norm (length).
:::

This gives us:
- $\mathbf{u} \cdot \mathbf{v} > 0$: angle $< 90°$ (vectors point roughly the same direction)
- $\mathbf{u} \cdot \mathbf{v} = 0$: angle $= 90°$ (vectors are **orthogonal**)
- $\mathbf{u} \cdot \mathbf{v} < 0$: angle $> 90°$ (vectors point roughly opposite directions)

### Key Properties

| Property | Formula | Description |
|----------|---------|-------------|
| **Commutative** | $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$ | Order doesn't matter |
| **Distributive** | $\mathbf{u} \cdot (\mathbf{v} + \mathbf{w}) = \mathbf{u} \cdot \mathbf{v} + \mathbf{u} \cdot \mathbf{w}$ | Distributes over addition |
| **Scalar multiplication** | $(c\mathbf{u}) \cdot \mathbf{v} = c(\mathbf{u} \cdot \mathbf{v})$ | Scalars factor out |
| **Self-dot product** | $\mathbf{v} \cdot \mathbf{v} = \|\mathbf{v}\|^2$ | Gives squared length |

**Applications in ML:**
- **Cosine similarity:** $\text{sim}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}$
- **Projection:** projecting one vector onto another
- **Neural network layers:** $\mathbf{w}^T \mathbf{x} + b$ is the core computation

---

## Outer Product

### Intuition

While the inner product takes two vectors and produces a scalar, the outer product takes two vectors and produces a **matrix**. The key insight is that **each row of the resulting matrix is a scaled copy of $\mathbf{v}^T$**:

$$\text{Row } i = u_i \cdot \mathbf{v}^T$$

We are essentially stacking scaled versions of the row vector $\mathbf{v}^T$, where each scaling factor comes from the corresponding entry of $\mathbf{u}$.

### Formal Definition

:::danger[Definition: Outer Product]
The **outer product** of two vectors $\mathbf{u} \in \mathbb{R}^m$ and $\mathbf{v} \in \mathbb{R}^n$ is the $m \times n$ matrix:

$$\mathbf{u} \mathbf{v}^T = \begin{bmatrix} u_1 \\ u_2 \\ \vdots \\ u_m \end{bmatrix} \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix} = \begin{bmatrix} u_1 \mathbf{v}^T \\ u_2 \mathbf{v}^T \\ \vdots \\ u_m \mathbf{v}^T \end{bmatrix} = \begin{bmatrix} u_1 v_1 & u_1 v_2 & \cdots & u_1 v_n \\ u_2 v_1 & u_2 v_2 & \cdots & u_2 v_n \\ \vdots & \vdots & \ddots & \vdots \\ u_m v_1 & u_m v_2 & \cdots & u_m v_n \end{bmatrix}$$
:::

**Example:**

$$\mathbf{u} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}, \quad \mathbf{v} = \begin{bmatrix} 4 \\ 5 \end{bmatrix}$$

$$\mathbf{u} \mathbf{v}^T = \begin{bmatrix} 1 \cdot \begin{bmatrix} 4 & 5 \end{bmatrix} \\ 2 \cdot \begin{bmatrix} 4 & 5 \end{bmatrix} \\ 3 \cdot \begin{bmatrix} 4 & 5 \end{bmatrix} \end{bmatrix} = \begin{bmatrix} 4 & 5 \\ 8 & 10 \\ 12 & 15 \end{bmatrix}$$

Notice that each row is a scalar multiple of $\begin{bmatrix} 4 & 5 \end{bmatrix}$.

### Rank-1 Structure

The outer product always produces a **rank-1 matrix** (assuming both vectors are non-zero). All rows are scalar multiples of $\mathbf{v}^T$, and all columns are scalar multiples of $\mathbf{u}$. Therefore, the row space and column space are both 1-dimensional: $\text{span}\{\mathbf{v}\}$ and $\text{span}\{\mathbf{u}\}$, respectively.

:::info[Theorem: Outer Product is Rank-1]
For non-zero vectors $\mathbf{u} \in \mathbb{R}^m$ and $\mathbf{v} \in \mathbb{R}^n$:

$$\text{rank}(\mathbf{u}\mathbf{v}^T) = 1$$
:::

### Key Properties

| Property | Description |
|----------|-------------|
| **Rank** | $\text{rank}(\mathbf{u}\mathbf{v}^T) = 1$ (if $\mathbf{u}, \mathbf{v} \neq \mathbf{0}$) |
| **Column space** | $C(\mathbf{u}\mathbf{v}^T) = \text{span}\{\mathbf{u}\}$ |
| **Row space** | $C((\mathbf{u}\mathbf{v}^T)^T) = \text{span}\{\mathbf{v}\}$ |
| **Not commutative** | $\mathbf{u}\mathbf{v}^T \neq \mathbf{v}\mathbf{u}^T$ (different dimensions!) |
| **Trace** | $\text{tr}(\mathbf{u}\mathbf{v}^T) = \mathbf{u}^T \mathbf{v}$ (when $m = n$) |

### Inner Product vs Outer Product

| Aspect | Inner Product | Outer Product |
|--------|---------------|---------------|
| **Notation** | $\mathbf{u}^T \mathbf{v}$ | $\mathbf{u} \mathbf{v}^T$ |
| **Result** | Scalar | Matrix |
| **Dimensions** | $\mathbf{u}, \mathbf{v} \in \mathbb{R}^n$ (same dimension) | $\mathbf{u} \in \mathbb{R}^m$, $\mathbf{v} \in \mathbb{R}^n$ (can differ) |
| **Output size** | $1 \times 1$ | $m \times n$ |
| **Rank of result** | N/A (scalar) | 1 |

**Applications in ML:**
- **Rank-1 updates:** many algorithms update matrices via $A + \mathbf{u}\mathbf{v}^T$
- **Low-rank approximation:** SVD expresses any matrix as sum of rank-1 outer products
- **Attention mechanisms:** query-key outer products
- **Gradient computation:** weight gradients in neural networks are outer products

---

## Vector Norms

### Intuition

A **norm** measures the "size" or "length" of a vector. Different norms emphasize different aspects of a vector.

### L2 Norm (Euclidean Norm)

:::danger[Definition: L2 Norm]
The **L2 norm** (or **Euclidean norm**) of a vector $\mathbf{v} \in \mathbb{R}^n$ is:

$$\|\mathbf{v}\|_2 = \sqrt{\sum_{i=1}^{n} v_i^2} = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}$$
:::


This is the standard Euclidean distance from the origin.

### L1 Norm (Manhattan Norm)

:::danger[Definition: L1 Norm]
The **L1 norm** (or **Manhattan norm**) of a vector $\mathbf{v} \in \mathbb{R}^n$ is:

$$\|\mathbf{v}\|_1 = \sum_{i=1}^{n} |v_i| = |v_1| + |v_2| + \cdots + |v_n|$$
:::

This measures distance by moving along grid lines (like city blocks).

### Comparison of Norms

| Norm | Formula | Geometric Shape (Unit Ball) | Use Case |
|------|---------|----------------------------|----------|
| **L1** | $\sum |v_i|$ | Diamond (rhombus) | Promotes sparsity (Lasso) |
| **L2** | $\sqrt{\sum v_i^2}$ | Circle (sphere) | Standard distance, regularization (Ridge) |
| **L∞** | $\max_i |v_i|$ | Square (hypercube) | Maximum absolute value |

**Applications in ML:**
- **L2 regularization (Ridge):** prevents large weights
- **L1 regularization (Lasso):** encourages sparse weights
- **Normalization:** unit norm vectors via $\hat{\mathbf{v}} = \mathbf{v} / \|\mathbf{v}\|$

---

## Transpose

:::danger[Definition: Transpose]
The **transpose** of an $m \times n$ matrix $A$, denoted $A^T$, is the $n \times m$ matrix obtained by swapping rows and columns:

$$(A^T)_{ij} = A_{ji}$$
:::

### Key Properties

| Property | Formula |
|----------|---------|
| **Double transpose** | $(A^T)^T = A$ |
| **Sum** | $(A + B)^T = A^T + B^T$ |
| **Scalar** | $(cA)^T = cA^T$ |
| **Product** | $(AB)^T = B^T A^T$ (order reverses!) |
| **Inverse** | $(A^{-1})^T = (A^T)^{-1}$ |

---

## Trace

:::danger[Definition: Trace]
The **trace** of a square $n \times n$ matrix $A$, denoted $\text{tr}(A)$, is the sum of its diagonal entries:

$$\text{tr}(A) = \sum_{i=1}^{n} a_{ii} = a_{11} + a_{22} + \cdots + a_{nn}$$
:::

**Example:**

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{bmatrix} \implies \text{tr}(A) = 1 + 5 + 9 = 15$$

### Key Properties

| Property | Formula | Description |
|----------|---------|-------------|
| **Linearity** | $\text{tr}(A + B) = \text{tr}(A) + \text{tr}(B)$ | Trace of sum = sum of traces |
| **Scalar** | $\text{tr}(cA) = c \cdot \text{tr}(A)$ | Scalars factor out |
| **Transpose** | $\text{tr}(A^T) = \text{tr}(A)$ | Same diagonal |
| **Cyclic** | $\text{tr}(ABC) = \text{tr}(BCA) = \text{tr}(CAB)$ | Cyclic permutations equal |
| **Inner product** | $\text{tr}(\mathbf{u}\mathbf{v}^T) = \mathbf{u}^T\mathbf{v}$ | Connects outer and inner products |

**Applications in ML:**
- **Sum of eigenvalues:** $\text{tr}(A) = \sum \lambda_i$
- **Frobenius norm:** $\|A\|_F^2 = \text{tr}(A^T A)$
- **Loss functions:** trace appears in matrix derivatives

---

## Eigenvalues and Eigenvectors

### Intuition

When a matrix $A$ multiplies most vectors, it changes both their direction and magnitude. However, certain special vectors only get **scaled**—their direction remains unchanged (or exactly reversed). These are **eigenvectors**, and the scaling factors are **eigenvalues**.

Geometrically, eigenvectors represent the "natural axes" of a linear transformation. Along these directions, the matrix acts as simple scaling.

### Formal Definition

:::danger[Definition: Eigenvalue and Eigenvector]
For a square matrix $A \in \mathbb{R}^{n \times n}$, a non-zero vector $\mathbf{v} \in \mathbb{R}^n$ is an **eigenvector** of $A$ if:

$$A\mathbf{v} = \lambda \mathbf{v}$$

for some scalar $\lambda \in \mathbb{R}$ (or $\mathbb{C}$). The scalar $\lambda$ is the corresponding **eigenvalue**.
:::

**Interpretation:** Multiplying $\mathbf{v}$ by $A$ produces the same result as multiplying $\mathbf{v}$ by the scalar $\lambda$.

### Finding Eigenvalues: The Characteristic Equation

Rearranging $A\mathbf{v} = \lambda\mathbf{v}$:

$$(A - \lambda I)\mathbf{v} = \mathbf{0}$$

For a non-zero solution $\mathbf{v}$ to exist, the matrix $(A - \lambda I)$ must be singular:

:::danger[Definition: Characteristic Equation]
The eigenvalues of $A$ are the roots of the **characteristic polynomial**:

$$\det(A - \lambda I) = 0$$
:::

**Example:**

$$A = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}$$

**Step 1: Set up characteristic equation**

$$\det(A - \lambda I) = \det\begin{bmatrix} 4-\lambda & 1 \\ 2 & 3-\lambda \end{bmatrix} = (4-\lambda)(3-\lambda) - 2 = 0$$

$$\lambda^2 - 7\lambda + 10 = 0$$

$$(\lambda - 5)(\lambda - 2) = 0$$

**Eigenvalues:** $\lambda_1 = 5$, $\lambda_2 = 2$

**Step 2: Find eigenvectors**

For $\lambda_1 = 5$:

$$(A - 5I)\mathbf{v} = \begin{bmatrix} -1 & 1 \\ 2 & -2 \end{bmatrix}\mathbf{v} = \mathbf{0} \implies \mathbf{v}_1 = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$$

For $\lambda_2 = 2$:

$$(A - 2I)\mathbf{v} = \begin{bmatrix} 2 & 1 \\ 2 & 1 \end{bmatrix}\mathbf{v} = \mathbf{0} \implies \mathbf{v}_2 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$$

**Verification:** $A\mathbf{v}_1 = \begin{bmatrix} 4 & 1 \\ 2 & 3 \end{bmatrix}\begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 5 \\ 5 \end{bmatrix} = 5\begin{bmatrix} 1 \\ 1 \end{bmatrix} = 5\mathbf{v}_1$ ✓

### Key Properties

| Property | Formula | Description |
|----------|---------|-------------|
| **Trace** | $\text{tr}(A) = \sum_{i=1}^n \lambda_i$ | Sum of eigenvalues equals trace |
| **Determinant** | $\det(A) = \prod_{i=1}^n \lambda_i$ | Product of eigenvalues equals determinant |
| **Invertibility** | $A$ invertible $\iff$ all $\lambda_i \neq 0$ | Zero eigenvalue means singular |
| **Powers** | $A^k\mathbf{v} = \lambda^k\mathbf{v}$ | Eigenvalues of $A^k$ are $\lambda^k$ |
| **Inverse** | $A^{-1}\mathbf{v} = \frac{1}{\lambda}\mathbf{v}$ | Eigenvalues of $A^{-1}$ are $1/\lambda$ |

---

## Covariance and Correlation

This section covers how to measure relationships between variables using matrix representations.

### Data Matrix Setup

Consider a data matrix $X$ with $n$ observations (rows) and $p$ features (columns):

$$X = \begin{bmatrix} x_{11} & x_{12} & \cdots & x_{1p} \\ x_{21} & x_{22} & \cdots & x_{2p} \\ \vdots & \vdots & \ddots & \vdots \\ x_{n1} & x_{n2} & \cdots & x_{np} \end{bmatrix}$$

Each row $\mathbf{x}_i^T$ is a single data point. Each column represents a feature.

### Covariance

:::danger[Definition: Covariance]
The **covariance** between features $j$ and $k$ measures how they vary together:

$$\text{Cov}(X_j, X_k) = \frac{1}{n} \sum_{i=1}^{n} (x_{ij} - \bar{x}_j)(x_{ik} - \bar{x}_k)$$

where $\bar{x}_j = \frac{1}{n}\sum_{i=1}^n x_{ij}$ is the mean of feature $j$.

- $\text{Cov} > 0$: features increase together
- $\text{Cov} < 0$: one increases as the other decreases
- $\text{Cov} = 0$: no linear relationship
:::

:::note[Population vs Sample Covariance]
The formula above uses $\frac{1}{n}$ (**population covariance**), which is appropriate when you have the entire population.

When working with a **sample** from a larger population, use $\frac{1}{n-1}$ (**sample covariance**) for an unbiased estimator:

$$\text{Cov}_{\text{sample}}(X_j, X_k) = \frac{1}{n-1} \sum_{i=1}^{n} (x_{ij} - \bar{x}_j)(x_{ik} - \bar{x}_k)$$

The $(n-1)$ factor is called **Bessel's correction**. Most statistical software uses sample covariance by default.
:::

### Covariance Matrix

The covariance matrix packages all pairwise covariances into a single matrix. Entry $(j, k)$ tells us how features $j$ and $k$ co-vary.

:::danger[Definition: Covariance Matrix]
For centered data $\tilde{X} = X - \mathbf{1}\bar{\mathbf{x}}^T$ (each row has the mean subtracted), the **covariance matrix** $\Sigma \in \mathbb{R}^{p \times p}$ is:

$$\Sigma = \frac{1}{n} \tilde{X}^T \tilde{X} \quad \text{(population)}$$

$$\Sigma = \frac{1}{n-1} \tilde{X}^T \tilde{X} \quad \text{(sample)}$$

Entry $(j, k)$ is:

$$\Sigma_{jk} = \text{Cov}(X_j, X_k)$$
:::

**Example:**

Consider 3 data points in $\mathbb{R}^2$:

$$X = \begin{bmatrix} 1 & 2 \\ 3 & 4 \\ 5 & 6 \end{bmatrix}$$

**Step 1: Compute means**
$$\bar{x}_1 = \frac{1+3+5}{3} = 3, \quad \bar{x}_2 = \frac{2+4+6}{3} = 4$$

**Step 2: Center the data**
$$\tilde{X} = \begin{bmatrix} 1-3 & 2-4 \\ 3-3 & 4-4 \\ 5-3 & 6-4 \end{bmatrix} = \begin{bmatrix} -2 & -2 \\ 0 & 0 \\ 2 & 2 \end{bmatrix}$$

**Step 3: Compute covariance matrix (population)**
$$\Sigma = \frac{1}{3} \tilde{X}^T \tilde{X} = \frac{1}{3} \begin{bmatrix} -2 & 0 & 2 \\ -2 & 0 & 2 \end{bmatrix} \begin{bmatrix} -2 & -2 \\ 0 & 0 \\ 2 & 2 \end{bmatrix} = \frac{1}{3} \begin{bmatrix} 8 & 8 \\ 8 & 8 \end{bmatrix} = \begin{bmatrix} 8/3 & 8/3 \\ 8/3 & 8/3 \end{bmatrix}$$

**Interpretation:**
- $\Sigma_{11} = 8/3$: variance of feature 1
- $\Sigma_{22} = 8/3$: variance of feature 2
- $\Sigma_{12} = \Sigma_{21} = 8/3$: positive covariance (features increase together)

### Key Properties of Covariance Matrix

| Property | Description |
|----------|-------------|
| **Symmetric** | $\Sigma = \Sigma^T$ (since $\text{Cov}(X_j, X_k) = \text{Cov}(X_k, X_j)$) |
| **Positive Semi-definite** | $\mathbf{v}^T \Sigma \mathbf{v} \geq 0$ for all $\mathbf{v}$ |
| **Diagonal = Variances** | $\Sigma_{jj} = \text{Var}(X_j)$ |
| **Eigenvalues** | All eigenvalues $\geq 0$ |

### Correlation

Correlation is a **normalized** version of covariance. It removes the scale of variables, showing only the strength and direction of linear relationships.

:::danger[Definition: Correlation]
The **correlation** between features $j$ and $k$ is:

$$\rho_{jk} = \frac{\text{Cov}(X_j, X_k)}{\sigma_j \sigma_k} = \frac{\Sigma_{jk}}{\sqrt{\Sigma_{jj}} \sqrt{\Sigma_{kk}}}$$

where $\sigma_j = \sqrt{\text{Var}(X_j)}$ is the standard deviation.
:::

### Correlation Matrix

:::danger[Definition: Correlation Matrix]
The **correlation matrix** $R \in \mathbb{R}^{p \times p}$ has entries:

$$R_{jk} = \rho_{jk} = \frac{\Sigma_{jk}}{\sigma_j \sigma_k}$$

Equivalently, if $D = \text{diag}(\sigma_1, \sigma_2, \ldots, \sigma_p)$ is the diagonal matrix of standard deviations:

$$R = D^{-1} \Sigma D^{-1}$$
:::

**Example (continuing from above):**

$$\Sigma = \begin{bmatrix} 8/3 & 8/3 \\ 8/3 & 8/3 \end{bmatrix}$$

Standard deviations: $\sigma_1 = \sqrt{8/3}$, $\sigma_2 = \sqrt{8/3}$

$$\rho_{12} = \frac{8/3}{\sqrt{8/3} \cdot \sqrt{8/3}} = \frac{8/3}{8/3} = 1$$

$$R = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}$$

The correlation of 1 indicates **perfect positive linear relationship**.

### Key Properties of Correlation Matrix

| Property | Description |
|----------|-------------|
| **Bounded** | $-1 \leq \rho_{jk} \leq 1$ |
| **Diagonal = 1** | $R_{jj} = 1$ (perfect correlation with itself) |
| **Symmetric** | $R = R^T$ |
| **Scale-invariant** | Unaffected by linear transformations of variables |

### Covariance vs Correlation

| Aspect | Covariance Matrix $\Sigma$ | Correlation Matrix $R$ |
|--------|---------------------------|------------------------|
| **Diagonal entries** | Variances | Always 1 |
| **Range** | $(-\infty, \infty)$ | $[-1, 1]$ |
| **Scale** | Depends on variable units | Unit-free |
| **Use case** | PCA, Mahalanobis distance | Comparing relationships |

---

## Summary

| Concept | Definition | Key Formula |
|---------|------------|-------------|
| **Inner Product** | Sum of component products | $\mathbf{u}^T \mathbf{v} = \sum u_i v_i$ |
| **Outer Product** | Matrix from two vectors (rank-1) | $\mathbf{u}\mathbf{v}^T$, row $i$ = $u_i \mathbf{v}^T$ |
| **L2 Norm** | Euclidean length | $\|\mathbf{v}\|_2 = \sqrt{\sum v_i^2}$ |
| **Transpose** | Swap rows and columns | $(A^T)_{ij} = A_{ji}$ |
| **Trace** | Sum of diagonal | $\text{tr}(A) = \sum a_{ii}$ |
| **Eigenvalue/Eigenvector** | Scaling directions of a matrix | $A\mathbf{v} = \lambda\mathbf{v}$ |
| **Covariance Matrix** | Pairwise covariances | $\Sigma = \frac{1}{n}\tilde{X}^T\tilde{X}$ |
| **Correlation Matrix** | Normalized covariances | $R = D^{-1}\Sigma D^{-1}$ |

