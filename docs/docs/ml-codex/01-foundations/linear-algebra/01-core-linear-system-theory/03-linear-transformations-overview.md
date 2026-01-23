---
sidebar_position: 6
---

# Linear Transformations

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: What Does a Function That Preserves Structure Look Like?

We want to understand *functions* that act on vectors. In machine learning, data flows through layers of operations: a neural network takes an input vector $x$ and produces an output $y = f(x)$. The simplest such functions, the building blocks of everything from image classifiers to language models, are **linear transformations**.

Consider these scenarios:
1. **Rotating an image**: Each pixel coordinate $(x, y)$ maps to a new location $(x', y')$
2. **Scaling features**: A preprocessing step multiplies each feature by a different constant
3. **Neural network layer**: An input vector $x \in \mathbb{R}^{784}$ (a flattened $28 \times 28$ image) transforms to $y \in \mathbb{R}^{256}$ (a hidden layer)

What do these operations have in common? They all preserve the fundamental structure of linear combinations. If you know what happens to basic building blocks, you know what happens to everything built from them. Understanding this structure unlocks powerful tools: matrix representation, composition via multiplication, and the Rank-Nullity Theorem that tells us exactly what information a transformation preserves and what it destroys.

---

## What Is a Linear Transformation?

Consider the function $T: \mathbb{R}^2 \to \mathbb{R}^2$ that rotates every vector by 90° counterclockwise.

Take the vector $v = \begin{bmatrix} 3 \\ 1 \end{bmatrix}$:

$$T\left(\begin{bmatrix} 3 \\ 1 \end{bmatrix}\right) = \begin{bmatrix} -1 \\ 3 \end{bmatrix}$$

The point $(3, 1)$ rotates to $(-1, 3)$.

Now let's check a crucial property. Take two vectors $u = \begin{bmatrix} 2 \\ 0 \end{bmatrix}$ and $v = \begin{bmatrix} 1 \\ 1 \end{bmatrix}$:

$$T(u) = \begin{bmatrix} 0 \\ 2 \end{bmatrix}, \quad T(v) = \begin{bmatrix} -1 \\ 1 \end{bmatrix}$$

$$T(u + v) = T\left(\begin{bmatrix} 3 \\ 1 \end{bmatrix}\right) = \begin{bmatrix} -1 \\ 3 \end{bmatrix}$$

$$T(u) + T(v) = \begin{bmatrix} 0 \\ 2 \end{bmatrix} + \begin{bmatrix} -1 \\ 1 \end{bmatrix} = \begin{bmatrix} -1 \\ 3 \end{bmatrix}$$

They're equal: $T(u + v) = T(u) + T(v)$. This is no coincidence. It's the defining property of linearity.

**Geometrically**, a linear transformation:
- **Preserves the origin**: The zero vector always maps to zero
- **Preserves lines through the origin**: A line through the origin maps to another line (or point) through the origin
- **Preserves parallelism**: Parallel lines remain parallel after transformation
- **Preserves ratios on lines**: If $P$ is the midpoint of $AB$, then $T(P)$ is the midpoint of $T(A)T(B)$

Think of it as "stretching, rotating, reflecting, or projecting" the entire space while keeping the origin fixed.

![Linear transformation preserving grid structure](/img/ml-codex/01-foundations/linear-algebra/01-core-linear-system-theory/linear-transformations/grid_transformation.jpg)

*Figure: A linear transformation maps the standard grid to a parallelogram grid. Grid lines remain straight and parallel. The origin stays fixed.*

:::danger[Definition: Linear Transformation]
A function $T: V \to W$ between vector spaces is a **linear transformation** (or **linear map**) if it satisfies two properties for all vectors $u, v \in V$ and all scalars $c$:

1. **Additivity**: $T(u + v) = T(u) + T(v)$
2. **Homogeneity**: $T(cv) = cT(v)$

Equivalently (combining both): $T(c_1 v_1 + c_2 v_2) = c_1 T(v_1) + c_2 T(v_2)$
:::

:::info[Theorem: Zero Preservation]
Every linear transformation maps the zero vector to the zero vector:
$$T(0) = 0$$

*Proof*: $T(0) = T(0 \cdot v) = 0 \cdot T(v) = 0$ for any vector $v$.
:::

**Key Properties:**

| Property | Description | Example |
|----------|-------------|---------|
| **Additivity** | $T(u + v) = T(u) + T(v)$ | Rotating $u+v$ = rotating $u$ + rotating $v$ |
| **Homogeneity** | $T(cv) = cT(v)$ | Rotating $2v$ = twice rotating $v$ |
| **Origin fixed** | $T(0) = 0$ | Rotation keeps the origin in place |

---

## Every Linear Transformation Is a Matrix

Consider the 90° rotation $T: \mathbb{R}^2 \to \mathbb{R}^2$ from before. Let's find what it does to the standard basis vectors:

$$T\left(\begin{bmatrix} 1 \\ 0 \end{bmatrix}\right) = \begin{bmatrix} 0 \\ 1 \end{bmatrix}, \quad T\left(\begin{bmatrix} 0 \\ 1 \end{bmatrix}\right) = \begin{bmatrix} -1 \\ 0 \end{bmatrix}$$

Now, any vector $v = \begin{bmatrix} x \\ y \end{bmatrix} = x\begin{bmatrix} 1 \\ 0 \end{bmatrix} + y\begin{bmatrix} 0 \\ 1 \end{bmatrix}$.

By linearity:
$$T(v) = xT\left(\begin{bmatrix} 1 \\ 0 \end{bmatrix}\right) + yT\left(\begin{bmatrix} 0 \\ 1 \end{bmatrix}\right) = x\begin{bmatrix} 0 \\ 1 \end{bmatrix} + y\begin{bmatrix} -1 \\ 0 \end{bmatrix} = \begin{bmatrix} -y \\ x \end{bmatrix}$$

This is exactly matrix multiplication:
$$T(v) = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix}$$

The matrix columns are the images of the basis vectors.

**The geometric insight**: The matrix of a linear transformation tells you where the "coordinate axes" go:
- **Column 1**: Where $e_1 = (1, 0, \ldots)$ lands
- **Column 2**: Where $e_2 = (0, 1, 0, \ldots)$ lands
- **And so on...**

Once you know where the basis vectors go, linearity determines everything else.

:::info[Theorem: Matrix Representation Theorem]
Let $T: \mathbb{R}^n \to \mathbb{R}^m$ be a linear transformation. Then there exists a unique $m \times n$ matrix $A$ such that:
$$T(x) = Ax \quad \text{for all } x \in \mathbb{R}^n$$

The matrix $A$ is constructed by placing the images of the standard basis vectors as columns:
$$A = \begin{bmatrix} | & | & & | \\ T(e_1) & T(e_2) & \cdots & T(e_n) \\ | & | & & | \end{bmatrix}$$
:::

<details>
<summary>📌 **Proof**</summary>

Let $\{e_1, \ldots, e_n\}$ be the standard basis for $\mathbb{R}^n$. Any vector $x \in \mathbb{R}^n$ can be written as:
$$x = x_1 e_1 + x_2 e_2 + \cdots + x_n e_n$$

By linearity of $T$:
$$T(x) = x_1 T(e_1) + x_2 T(e_2) + \cdots + x_n T(e_n)$$

Define the matrix $A$ with columns $T(e_1), \ldots, T(e_n)$. Then:
$$Ax = x_1 [\text{col}_1(A)] + x_2 [\text{col}_2(A)] + \cdots + x_n [\text{col}_n(A)] = T(x)$$

For uniqueness: if $Bx = T(x)$ for all $x$, then $Be_j = T(e_j)$ = column $j$ of $A$, so $B = A$.

</details>

**Key Properties:**

| Property | Matrix Form | Example |
|----------|-------------|---------|
| Column $j$ of $A$ | $T(e_j)$ = image of $j$-th basis vector | For rotation: $T(e_1) = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$ |
| Applying $T$ | $T(x) = Ax$ | $T\begin{bmatrix} 3 \\ 1 \end{bmatrix} = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 3 \\ 1 \end{bmatrix}$ |
| Size of $A$ | $m \times n$ for $T: \mathbb{R}^n \to \mathbb{R}^m$ | Rotation $\mathbb{R}^2 \to \mathbb{R}^2$: $2 \times 2$ matrix |

:::tip[Finding the Matrix]
To find the matrix of a linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$:
1. Compute $T(e_1), T(e_2), \ldots, T(e_n)$
2. Place these as columns: $A = [T(e_1) \mid T(e_2) \mid \cdots \mid T(e_n)]$
:::

---

## The Kernel (Nullspace): What Gets Destroyed

Consider the projection $T: \mathbb{R}^3 \to \mathbb{R}^3$ that projects vectors onto the $xy$-plane:

$$T\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} x \\ y \\ 0 \end{bmatrix}$$

The matrix is $A = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix}$.

Which vectors get mapped to zero?

$$T(v) = 0 \implies \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix}\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} \implies x = 0, y = 0, z = \text{anything}$$

The kernel is the entire $z$-axis: $\ker(T) = \left\{ \begin{bmatrix} 0 \\ 0 \\ z \end{bmatrix} : z \in \mathbb{R} \right\}$

**Geometrically**, the kernel consists of all vectors that get "crushed" to zero by the transformation. For our projection:
- The $z$-axis gets flattened onto the origin
- All information about "height" is lost
- Once you project, you can't recover the original $z$-coordinate

![Kernel of a projection](/img/ml-codex/01-foundations/linear-algebra/01-core-linear-system-theory/linear-transformations/kernel_projection.jpg)

*Figure: The kernel of projection onto the $xy$-plane is the $z$-axis. Every point on the $z$-axis maps to the origin.*

:::danger[Definition: Kernel (Nullspace)]
The **kernel** (or **nullspace**) of a linear transformation $T: V \to W$ is the set of all vectors that map to zero:

$$\ker(T) = \{v \in V : T(v) = 0\}$$

For a matrix $A$, this is $N(A) = \{x : Ax = 0\}$.
:::

:::info[Theorem: The Kernel is a Subspace]
The kernel of any linear transformation is a subspace of the domain.

*Proof sketch*: If $T(u) = 0$ and $T(v) = 0$, then $T(u + v) = T(u) + T(v) = 0 + 0 = 0$. Similarly for scalar multiplication.
:::

**Key Properties:**

| Property | Description | Our Example |
|----------|-------------|-------------|
| **Subspace** | $\ker(T)$ is always a subspace of the domain | The $z$-axis is a subspace of $\mathbb{R}^3$ |
| **Contains zero** | $0 \in \ker(T)$ always | The origin is on the $z$-axis |
| **Information loss** | Vectors in the kernel lose all their information | Any $(0, 0, z)$ becomes $(0, 0, 0)$ |

---

## The Image (Range): What Gets Produced

Using the same projection $T\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} x \\ y \\ 0 \end{bmatrix}$:

What vectors can we reach as outputs?

$$\text{im}(T) = \left\{T(v) : v \in \mathbb{R}^3\right\} = \left\{\begin{bmatrix} x \\ y \\ 0 \end{bmatrix} : x, y \in \mathbb{R}\right\}$$

The image is the entire $xy$-plane.

**Geometrically**, the image tells you the "range of possibilities" for the output. For our projection:
- Every point in $\mathbb{R}^3$ lands somewhere on the $xy$-plane
- The $xy$-plane is the "shadow" or "footprint" of the transformation
- Points off the $xy$-plane (like $(1, 2, 5)$) can never be outputs

:::danger[Definition: Image (Range)]
The **image** (or **range**) of a linear transformation $T: V \to W$ is the set of all possible outputs:

$$\text{im}(T) = \{T(v) : v \in V\} = \{w \in W : w = T(v) \text{ for some } v \in V\}$$

For a matrix $A$, this is the column space $C(A) = \{Ax : x \in \mathbb{R}^n\}$.
:::

:::info[Theorem: The Image is a Subspace]
The image of any linear transformation is a subspace of the codomain.

*Proof sketch*: If $w_1 = T(v_1)$ and $w_2 = T(v_2)$ are in the image, then $w_1 + w_2 = T(v_1) + T(v_2) = T(v_1 + v_2)$ is also in the image.
:::

**Key Properties:**

| Property | Description | Our Example |
|----------|-------------|-------------|
| **Subspace** | $\text{im}(T)$ is always a subspace of the codomain | The $xy$-plane is a subspace of $\mathbb{R}^3$ |
| **Span of columns** | $\text{im}(T) = \text{span}\{T(e_1), \ldots, T(e_n)\}$ | Columns span the $xy$-plane |
| **Reachability** | $b \in \text{im}(T) \iff Ax = b$ has a solution | Only vectors with $z = 0$ are reachable |

---

## The Rank-Nullity Theorem: The Conservation Law

Our projection $T: \mathbb{R}^3 \to \mathbb{R}^3$ onto the $xy$-plane:
- **Domain dimension**: $\dim(\mathbb{R}^3) = 3$
- **Kernel dimension** (nullity): $\dim(\ker(T)) = 1$ (the $z$-axis is a line)
- **Image dimension** (rank): $\dim(\text{im}(T)) = 2$ (the $xy$-plane)

Notice: $3 = 1 + 2$. The input dimension equals nullity plus rank.

**The key insight**: The Rank-Nullity Theorem says **dimension is conserved**.

Think of the input space as having a certain "budget" of dimensions. A linear transformation either:
- **Preserves** a dimension (it goes into the image), or
- **Destroys** a dimension (it goes into the kernel)

No dimension can be created or lost. They're redistributed between "preserved" and "destroyed."

![Rank-Nullity visualization](/img/ml-codex/01-foundations/linear-algebra/01-core-linear-system-theory/linear-transformations/rank_nullity.jpg)

*Figure: The Rank-Nullity Theorem visualized. The domain decomposes into kernel (destroyed dimensions) and a complement (preserved dimensions). The preserved dimensions map isomorphically onto the image.*

:::info[Theorem: The Rank-Nullity Theorem]
Let $T: V \to W$ be a linear transformation where $V$ is finite-dimensional. Then:

$$\dim(V) = \dim(\ker(T)) + \dim(\text{im}(T))$$

Or equivalently: $\dim(V) = \text{nullity}(T) + \text{rank}(T)$

For an $m \times n$ matrix $A$:
$$n = \dim(N(A)) + \text{rank}(A)$$
:::

<details>
<summary>📌 **Proof Sketch**</summary>

Let $\{v_1, \ldots, v_k\}$ be a basis for $\ker(T)$.

Extend this to a basis $\{v_1, \ldots, v_k, u_1, \ldots, u_r\}$ for all of $V$.

**Claim**: $\{T(u_1), \ldots, T(u_r)\}$ is a basis for $\text{im}(T)$.

*Spans*: Any $T(v) = T(c_1 v_1 + \cdots + c_k v_k + d_1 u_1 + \cdots + d_r u_r) = d_1 T(u_1) + \cdots + d_r T(u_r)$ (since $T(v_i) = 0$).

*Independent*: If $d_1 T(u_1) + \cdots + d_r T(u_r) = 0$, then $T(d_1 u_1 + \cdots + d_r u_r) = 0$, so $d_1 u_1 + \cdots + d_r u_r \in \ker(T) = \text{span}\{v_1, \ldots, v_k\}$. Linear independence of the extended basis forces all $d_i = 0$.

Therefore: $\dim(V) = k + r = \text{nullity}(T) + \text{rank}(T)$.

</details>

**Key Properties:**

| Property | Formula | Our Example |
|----------|---------|-------------|
| **Conservation** | $\dim(V) = \text{nullity} + \text{rank}$ | $3 = 1 + 2$ |
| **Rank from nullity** | $\text{rank} = \dim(V) - \text{nullity}$ | $2 = 3 - 1$ |
| **Nullity from rank** | $\text{nullity} = \dim(V) - \text{rank}$ | $1 = 3 - 2$ |

:::tip[Using Rank-Nullity]
The theorem is powerful for deduction:
- If you know the matrix is $5 \times 3$ and has rank 2, the nullspace has dimension $3 - 2 = 1$
- If you know the nullspace is trivial ($\{0\}$), the rank equals the number of columns
- If rank = number of columns, the transformation is **injective** (one-to-one)
:::

---

## Injectivity, Surjectivity, and Invertibility

### Injective (One-to-One)

A transformation is **injective** if different inputs always produce different outputs: $T(u) = T(v) \implies u = v$.

:::info[Theorem: Injectivity and Kernel]
$T$ is injective if and only if $\ker(T) = \{0\}$.
:::

*Why?* If $T(u) = T(v)$, then $T(u - v) = 0$, so $u - v \in \ker(T)$. If the kernel is trivial, then $u - v = 0$, so $u = v$.

### Surjective (Onto)

A transformation is **surjective** if every possible output is actually achieved: $\text{im}(T) = W$.

:::info[Theorem: Surjectivity and Rank]
$T: V \to W$ is surjective if and only if $\text{rank}(T) = \dim(W)$.
:::

### Invertibility

A transformation is **invertible** (bijective) if it's both injective and surjective.

:::info[Theorem: Invertibility Conditions]
For $T: V \to W$ with $\dim(V) = \dim(W) = n$:

$T$ is invertible $\iff$ $\ker(T) = \{0\}$ $\iff$ $\text{rank}(T) = n$ $\iff$ $\text{im}(T) = W$
:::

**Summary Table:**

| Property | Condition | Matrix Test |
|----------|-----------|-------------|
| **Injective** | $\ker(T) = \{0\}$ | Nullspace is trivial; rank = number of columns |
| **Surjective** | $\text{im}(T) = W$ | Rank = number of rows |
| **Invertible** | Both | Square matrix with rank = $n$ |

---

## Standard Transformations Gallery

### Rotation (2D)

Rotation by angle $\theta$ counterclockwise:

$$R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

- **Kernel**: $\{0\}$ (nothing gets crushed)
- **Image**: All of $\mathbb{R}^2$
- **Invertible**: Yes, $R_\theta^{-1} = R_{-\theta}$

### Projection

Projection onto the $x$-axis in $\mathbb{R}^2$:

$$P = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$$

- **Kernel**: The $y$-axis (dimension 1)
- **Image**: The $x$-axis (dimension 1)
- **Rank-Nullity**: $2 = 1 + 1$ ✓

### Reflection

Reflection across the $x$-axis:

$$F = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$$

- **Kernel**: $\{0\}$
- **Image**: All of $\mathbb{R}^2$
- **Invertible**: Yes, $F^{-1} = F$ (self-inverse)

### Scaling

Uniform scaling by factor $k$:

$$S_k = \begin{bmatrix} k & 0 \\ 0 & k \end{bmatrix}$$

- **Kernel**: $\{0\}$ if $k \neq 0$; all of $\mathbb{R}^2$ if $k = 0$
- **Invertible**: Yes if $k \neq 0$

### Shear

Horizontal shear by factor $k$:

$$H_k = \begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$$

- **Kernel**: $\{0\}$
- **Image**: All of $\mathbb{R}^2$
- **Invertible**: Yes, $H_k^{-1} = H_{-k}$

---

## Composition: Transformations Multiply

Let $R_{90}$ be 90° rotation and $S_2 = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}$ be scaling by 2.

Apply rotation first, then scaling: $(S_2 \circ R_{90})(v) = S_2(R_{90}(v))$

$$S_2 R_{90} = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -2 \\ 2 & 0 \end{bmatrix}$$

Apply scaling first, then rotation: $(R_{90} \circ S_2)(v) = R_{90}(S_2(v))$

$$R_{90} S_2 = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} = \begin{bmatrix} 0 & -2 \\ 2 & 0 \end{bmatrix}$$

In this case they're equal (scaling commutes with everything). But in general, **order matters**.

:::info[Theorem: Composition as Matrix Multiplication]
If $T: U \to V$ has matrix $A$ and $S: V \to W$ has matrix $B$, then the composition $S \circ T: U \to W$ has matrix $BA$.

$$(S \circ T)(x) = S(T(x)) = S(Ax) = B(Ax) = (BA)x$$
:::

---

## Applications in Data Science and Machine Learning

Linear transformations appear throughout machine learning, often disguised as matrices or "layers."

### Neural Network Layers

Each linear layer in a neural network is a linear transformation $y = Wx + b$. Without the bias $b$, it's purely linear. The weight matrix $W \in \mathbb{R}^{m \times n}$ transforms $n$-dimensional inputs to $m$-dimensional outputs.

The linearity of $W$ has important consequences:
- **Response to sums**: The network's response to a sum of inputs equals the sum of responses. This property is exploited in understanding gradients and backpropagation
- **Rank of $W$**: Determines the "effective dimensionality" of the layer's output
- **Kernel of $W$**: Input directions that produce zero output (potential dead features)
- **Bottlenecks**: If rank$(W) < \min(m, n)$, the layer compresses information

When we say a neural network layer is "a weight matrix $W$," we're using the Matrix Representation Theorem implicitly. Training the network means finding the right columns: where should each input feature direction map?

A deep neural network (without nonlinearities) computes $W_n W_{n-1} \cdots W_2 W_1 x$. This is just one big linear transformation. Without nonlinear activation functions, depth adds no expressive power.

### Principal Component Analysis (PCA)

PCA projects high-dimensional data onto a lower-dimensional subspace via $y = W^T x$, where $W \in \mathbb{R}^{n \times k}$ contains the top $k$ principal components.

- **Rank**: $k$ (the number of components kept)
- **Kernel**: Dimension $n - k$ (the discarded directions)
- **Rank-Nullity interpretation**: The variance explained by the kept components plus the variance discarded equals total variance

### Dimensionality Reduction and Bottleneck Layers

Any linear dimensionality reduction from $\mathbb{R}^n$ to $\mathbb{R}^k$ (where $k < n$) is a rank-$k$ transformation. By Rank-Nullity:
- The kernel has dimension $n - k$ (information destroyed)
- The image has dimension $k$ (information preserved)

An autoencoder with a hidden layer of size $k$ has rank at most $k$. The nullspace dimension $n - k$ represents the compression: information that can't be distinguished after encoding.

### Feature Engineering

Transforming raw features $x$ to engineered features $\phi(x)$ often involves linear transformations:
- **Standardization**: $z = \frac{x - \mu}{\sigma}$ (affine, nearly linear)
- **Whitening**: $z = \Sigma^{-1/2}(x - \mu)$ (linear after centering)
- **Random projections**: $z = Rx$ for random matrix $R$

---

## Summary

- A **linear transformation** $T: V \to W$ is a function that preserves addition ($T(u+v) = T(u) + T(v)$) and scalar multiplication ($T(cv) = cT(v)$)
- Every linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$ can be represented by a unique $m \times n$ **matrix** whose columns are $T(e_1), \ldots, T(e_n)$
- The **kernel** $\ker(T) = \{v : T(v) = 0\}$ is the subspace of vectors that get "destroyed" (mapped to zero)
- The **image** $\text{im}(T) = \{T(v) : v \in V\}$ is the subspace of all possible outputs
- The **Rank-Nullity Theorem** states $\dim(V) = \dim(\ker T) + \dim(\text{im } T)$ (dimension is conserved)
- A transformation is **injective** (one-to-one) iff $\ker(T) = \{0\}$, and **surjective** (onto) iff $\text{im}(T) = W$
- **Composition** of linear transformations corresponds to **matrix multiplication**: if $T$ has matrix $A$ and $S$ has matrix $B$, then $S \circ T$ has matrix $BA$

The Rank-Nullity Theorem is the fundamental conservation law: input dimensions are either preserved (going to the image) or destroyed (going to the kernel), with no dimensions created or lost.

---

## Guided Problems

### Problem 1: Determining Injectivity from the Matrix

Consider the linear transformation $T: \mathbb{R}^3 \to \mathbb{R}^2$ given by:

$$A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$$

1. What is the rank of $T$?
2. What is the dimension of $\ker(T)$?
3. Is $T$ injective? Is $T$ surjective?

<details>
<summary>💡 **Solution**</summary>

**Hints:**
- Row reduce to find the rank
- Use Rank-Nullity: nullity = $n$ - rank
- Injective requires kernel = {0}

**Solution:**

1. **Rank**: Row reduce $A$:
   $$\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \xrightarrow{R_2 - 4R_1} \begin{bmatrix} 1 & 2 & 3 \\ 0 & -3 & -6 \end{bmatrix}$$
   Two pivots, so **rank = 2**.

2. **Nullity**: By Rank-Nullity, $3 = \text{nullity} + 2$, so **nullity = 1**.

3. **Injectivity/Surjectivity**:
   - $T$ is **not injective** because $\ker(T) \neq \{0\}$ (nullity = 1 > 0)
   - $T$ is **surjective** because rank = 2 = dim($\mathbb{R}^2$) (the codomain)

</details>

---

### Problem 2: Composition and Rank

Let $T: \mathbb{R}^4 \to \mathbb{R}^3$ be a linear transformation with rank 2, and let $S: \mathbb{R}^3 \to \mathbb{R}^5$ be a linear transformation with rank 3.

1. What are the possible values for rank$(S \circ T)$?
2. Give an example achieving the maximum rank.
3. Give an example achieving the minimum rank.

<details>
<summary>💡 **Solution**</summary>

**Hints:**
- rank$(S \circ T) \leq \min(\text{rank}(S), \text{rank}(T))$
- The composition's image is contained in $S$'s image
- The composition's kernel contains $T$'s kernel

**Solution:**

1. **Possible values**: rank$(S \circ T) \leq \min(2, 3) = 2$, and rank$(S \circ T) \geq 0$. So rank can be **0, 1, or 2**.

2. **Maximum rank = 2**:
   Let $T(x) = \begin{bmatrix} x_1 \\ x_2 \\ 0 \end{bmatrix}$ (projects onto first two coordinates) and $S(y) = \begin{bmatrix} y_1 \\ y_2 \\ y_3 \\ 0 \\ 0 \end{bmatrix}$ (embeds $\mathbb{R}^3$ into $\mathbb{R}^5$).

   Then $(S \circ T)(x) = \begin{bmatrix} x_1 \\ x_2 \\ 0 \\ 0 \\ 0 \end{bmatrix}$, which has rank 2.

3. **Minimum rank = 0**:
   Let $T(x) = \begin{bmatrix} 0 \\ x_1 \\ x_2 \end{bmatrix}$ (puts output in last two components) and $S(y) = \begin{bmatrix} y_1 \\ 0 \\ 0 \\ 0 \\ 0 \end{bmatrix}$ (only uses first component).

   Then $(S \circ T)(x) = 0$ for all $x$, giving rank 0.

</details>

---

### Problem 3: Kernel and Image of a Projection

Let $P: \mathbb{R}^3 \to \mathbb{R}^3$ be the projection onto the plane $x + y + z = 0$.

1. Find a basis for $\ker(P)$.
2. Find a basis for $\text{im}(P)$.
3. Verify the Rank-Nullity Theorem.
4. What is $P^2$? What does this tell you about projections?

<details>
<summary>💡 **Solution**</summary>

**Hints:**
- The kernel of a projection onto a plane is the line perpendicular to that plane
- The image of a projection onto a plane is the plane itself
- For projections, $P^2 = P$ (applying twice is the same as once)

**Solution:**

1. **Kernel**: The kernel consists of vectors perpendicular to the plane $x + y + z = 0$. The normal to this plane is $n = \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}$.

   **Basis for $\ker(P)$**: $\left\{ \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix} \right\}$

2. **Image**: The image is the plane $x + y + z = 0$ itself. Two independent vectors in this plane:

   **Basis for $\text{im}(P)$**: $\left\{ \begin{bmatrix} 1 \\ -1 \\ 0 \end{bmatrix}, \begin{bmatrix} 1 \\ 0 \\ -1 \end{bmatrix} \right\}$

3. **Rank-Nullity**:
   - dim($\mathbb{R}^3$) = 3
   - nullity = 1, rank = 2
   - $3 = 1 + 2$ ✓

4. **$P^2$**: For any projection, $P^2 = P$. Once you're on the plane, projecting again does nothing. You stay where you are. This property ($P^2 = P$) is called **idempotence** and characterizes projections.

</details>

---

## References

1. MIT OpenCourseWare - *18.06SC Linear Algebra* - [Linear Transformations and Their Matrices](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/positive-definite-matrices-and-applications/linear-transformations-and-their-matrices/)
2. Stanford EE263 - *Introduction to Linear Dynamical Systems* - [Linear Algebra Review](https://see.stanford.edu/materials/lsoeldsee263/03-lin-alg.pdf)
3. Strang, Gilbert - *Introduction to Linear Algebra* (Chapter 8)
4. Mathematics LibreTexts - [Kernel and Image of a Linear Transformation](https://math.libretexts.org/Bookshelves/Linear_Algebra/Linear_Algebra_with_Applications_(Nicholson)/07:_Linear_Transformations/7.02:_Kernel_and_Image_of_a_Linear_Transformation)
