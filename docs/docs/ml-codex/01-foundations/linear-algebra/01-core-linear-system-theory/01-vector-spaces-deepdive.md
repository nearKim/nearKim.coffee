---
sidebar_position: 3
---

# Vector Spaces - Deep Dive

## Mathematical Foundations

Detailed mathematical treatment of vector spaces with proofs, theorems, and rigorous definitions.

## Formal Definitions

### Vector Space Axioms

A vector space V over a field F is a set with two operations:
- Vector addition: V × V → V
- Scalar multiplication: F × V → V

Satisfying 8 axioms...

### Subspace Theorem

**Theorem**: A subset W of vector space V is a subspace if and only if:
1. The zero vector is in W
2. W is closed under addition
3. W is closed under scalar multiplication

**Proof**: (To be completed)

## Theorems and Proofs

### Linear Independence

**Definition**: Vectors v₁, v₂, ..., vₙ are linearly independent if...

**Theorem**: (To be completed)

### Basis and Dimension

**Theorem**: All bases of a vector space have the same number of elements.

**Proof**: (To be completed)

## The Four Fundamental Subspaces

### Detailed Analysis

(Mathematical treatment to be completed)

## Fundamental Theorems

### Row Rank = Column Rank

The number of independent rows in a matrix $A$ is always equal to the number of independent columns. This number is the rank $r$.

$$\dim(C(A^T)) = \dim(C(A)) = \text{rank}(A)$$

**Intuition:**
For a $3 \times 4$ matrix,
$$A = \begin{bmatrix} 1 & 2 & 0 & 3 \\ 0 & 0 & 1 & 4 \\ 1 & 2 & 1 & 7 \end{bmatrix}$$
We have $r_{3} =r_1 + r_2$, therefore:
- **Basis of $C(A^T)$** :  $\{ r_1, r_2 \}$
- **$dim(C(A^T))$**: 2

Let's look at the columns,
- $c_2 = 2 \cdot c_1$
- $c_4 = 3c_1 + 4c_3$
- $c_1$ and $c_3$ are independent.
  All the columns ($c_2$ and $c_4$) can be built from $c_1$ and $c_3$.
- **Basis for the $C(A)$:** $\{ c_1, c_3 \}$
- **$\text{dim}(C(A))$** = 2
  So we found that Column and Row spaces share the same dimension, but why?

Look at our basis rows $r_1$ and $r_2$
- $r_1 = \begin{bmatrix} 1 & \mathbf{2} & 0 & \mathbf{3} \end{bmatrix}$
- $r_2 = \begin{bmatrix} 0 & \mathbf{0} & 1 & \mathbf{4} \end{bmatrix}$

The "recipe" to build the dependent columns ($c_2$ and $c_4$) is written _directly_ into the non-basis columns of the basis rows ($r_1$ and $r_2$).
- To make $c_2$, the recipe is $\mathbf{2}c_1 + \mathbf{0}c_3$. Those numbers, $\begin{bmatrix} 2 \\ 0 \end{bmatrix}$, are sitting right there in the $c_2$ position of our basis rows.
- To make $c_4$, the recipe is $\mathbf{3}c_1 + \mathbf{4}c_3$. Those numbers, $\begin{bmatrix} 3 \\ 4 \end{bmatrix}$, are sitting right there in the $c_4$ position of our basis rows.

Look at our basis columns $c_1$ and $c_3$
- $\{c_1, c_3 \}=\begin{bmatrix} 1 & 0 \\0 & 1 \\1 & 1 \\\end{bmatrix}$

Simultaneously, the "recipe" to build the dependent rows ($r_3$) is written _directly_ into the non-basis rows of the basis columns ($c_1$ and $c_3$).
- To make $r_3$, the recipe is $\mathbf{1}r_1 + \mathbf{1}r_2$. Those numbers, $\begin{bmatrix} 1 & 1 \end{bmatrix}$, are sitting right there in the $r_3$ position of our basis columns ($c_1$ and $c_3$).

You can't add an independent row without also creating an independent column. You can't add a dependent column without it _perfectly matching_ a dependency that already exists in the rows.

The **rank $r$** is the true number of "independent ingredients" you have. This number dictates _both_ how many independent rows you can form _and_ how many independent columns you can form. They are two sides of the exact same coin.

### Rank-Nullity Theorem

$$ rank(A) + nullity(A) = n$$

**Intuition:**
$$A = \begin{bmatrix} 1 & 0 & 2 \\ 0 & 1 & 3 \end{bmatrix}$$ Let this matrix $A$ be a transform 3D space into 2D space ($\mathbb{R}^3\Rightarrow  \mathbb{R}^2$). This means our matrix is $2 \times 3$, and our input dimension $n$ is **3**, and output dimension $m$ is 2.
An input vector $x$ is in $\mathbb{R}^3$, so $x = \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix}$. Our total input dimension is **$n=3$**.

The Column Space $C(A)$ is the output space. The rank is, by definition, the dimension of $C(A)$.
The output $Ax$ is just a combination of the columns of $A$: $x_1 \begin{bmatrix} 1 \\ 0 \end{bmatrix} + x_2 \begin{bmatrix} 0 \\ 1 \end{bmatrix} + x_3 \begin{bmatrix} 2 \\ 3 \end{bmatrix}$
It's obvious that $c_3 = 2c_1 + 3c_2$. The third column is totally **redundant**; it doesn't add a new direction. The entire output space can be described by $c_1$ and $c_2$.
- **Basis for $C(A)$:** $\{ \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \end{bmatrix} \}$
- **$\text{rank}(A) = 2$**

So, among our 3 input dimensions, **2 dimensions "survive"** to create the 2D output space. These are the **pivot columns** (columns 1 and 2).

The Null Space $N(A)$ is the input space. The nullity is the dimension of $N(A)$.
Let's find them by solving $Ax = 0$:

$$\begin{bmatrix} 1 & 0 & 2 \\ 0 & 1 & 3 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \\ x_3 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

This gives us two equations:

1. $x_1 + 2x_3 = 0 \implies x_1 = -2x_3$
2. $x_2 + 3x_3 = 0 \implies x_2 = -3x_3$

The variable $x_3$ is "free variable". It can be anything, and it corresponds to the **non-pivot column** (column 3).
Let $x_3 = t$. Any vector in the null space looks like:

$$x_{\text{null}} = \begin{bmatrix} -2t \\ -3t \\ t \end{bmatrix} = t \begin{bmatrix} -2 \\ -3 \\ 1 \end{bmatrix}$$

This is a **line** in $\mathbb{R}^3$. A line has one dimension.
- **Basis for $N(A)$:** $\{ \begin{bmatrix} -2 \\ -3 \\ 1 \end{bmatrix} \}$
- **$\text{nullity}(A) = 1$**
  So, **1 dimension of our input space gets completely "lost"** or collapsed to zero.

In sum,
- **Total Input Dimensions ($n$):** 3 (from the 3 columns)
- **Dimensions that "Survive" (Rank):** 2 (the pivot columns)
- **Dimensions that "Get Lost" (Nullity):** 1 (the free variable column)

**$\text{rank}(A) + \text{nullity}(A) = 2 + 1 = 3 = n$**

The **number of pivot columns** (rank) plus the **number of free columns** (nullity) must equal the **total number of columns** ($n$).

Every single one of the $n$ dimensions of your input space is accounted for. It either contributes to the output (a pivot column) or it gets nullified (a free column).

## Exercises

(Advanced problems to be completed)
