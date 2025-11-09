---
sidebar_position: 2
---

# Vector Spaces and The Four Fundamental Subspaces

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Problem of Solving Linear Equations

We want to solve a system of $m$ linear equations in $n$ unknowns, written as $Ax=b$. In the "row picture," each of these $m$ equations defines a hyperplane in $n$-dimensional space. The goal is to find a solution $x$, which is a single point of intersection that lies on _all_ $m$ of these hyperplanes.

This geometric view presents three possibilities:

1. **One Solution:** The hyperplanes intersect at a single point.
2. **No Solution:** The hyperplanes have no common intersection point (e.g., two planes are parallel).
3. **Infinite Solutions:** The hyperplanes intersect on a larger set, such as a line or a plane (e.g., three planes intersect on a common line).

The homogeneous case $Ax=0$ is a related problem where $b=0$. Since all hyperplanes must pass through the origin, $x=0$ (the "trivial solution") is always one answer. The fundamental question becomes: Do the hyperplanes intersect _only_ at the origin, or do they also intersect along a larger set (like a line or plane) that passes through the origin?

## Basis, Dimension, and Rank
### Basis
- **Definition:** A set of vectors $\{v_1, \dots, v_k\}$ in a vector space $V$ that is both **linearly independent** and **spans** the space $V$.
    - **Linearly Independent:** The only combination $c_1v_1 + \dots + c_kv_k = 0$ is when all coefficients $c_i$ are zero. This means there is no redundancy in the set.
    - **Spans the Space:** Every vector $v$ in the space $V$ can be expressed as a linear combination $v = c_1v_1 + \dots + c_kv_k$.

- **Intuition:** A basis is the smallest possible set of "building blocks" or "coordinate axes" for a vector space.
    - It has _just enough_ vectors:
        - Not too few (or it couldn't span the whole space).
        - Not too many (or the vectors would be dependent, and some would be redundant).

    - **Example:** The standard basis for $R^2$ (the x-y plane) is $\left\{ \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \end{bmatrix} \right\}$.
    - **Example:** A different basis for $R^2$ is $\left\{ \begin{bmatrix} 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ -1 \end{bmatrix} \right\}$. A vector space can have infinitely many different bases.

### Dimension
- **Definition:** The number of vectors in _any_ basis for a vector space $V$.
    - **Key Theorem:** All bases for a specific vector space have the exact same number of vectors. This fixed number is the dimension.
- **Intuition:** The dimension is the "number of independent (orthogonal) directions" or "degrees of freedom" of a space.
    - A line has **dimension 1**.
    - A plane has **dimension 2**.
    - $R^n$ has **dimension $n$**.
    - If the nullspace of $A = \begin{bmatrix} 1 & 1 \\ 2 & 2 \end{bmatrix}$ is the line of all multiples of $\begin{bmatrix} 1 \\ -1 \end{bmatrix}$, its basis is $\left\{ \begin{bmatrix} 1 \\ -1 \end{bmatrix} \right\}$ and its **dimension is 1**.

### Rank
- **Definition:** The **dimension of the column space $C(A)$** of a matrix $A$
    - **Key Theorem:** The dimension of the column space is _equal_ to the dimension of the row space. This common number is the rank $r$.
- **Intuition:** The rank is the "true dimension" of a matrix. It counts the number of "essential" or "independent" columns (or rows).
    - A matrix like $A = \begin{bmatrix} 1 & 2 \\ 2 & 4 \end{bmatrix}$ looks 2D, but its columns are on the same line. Its column space has dimension 1, so its **rank is 1**.
- **How to Find Rank:** The rank $r$ is the **number of pivots** found by Gaussian elimination in the echelon form $U$ or $R$.
    - **Example:** $A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 4 & 6 \end{bmatrix}$ reduces to $U = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 0 & 0 \end{bmatrix}$.
    - It has only **one pivot** (the 1).
    - Therefore, the **rank is 1**.

### What is different between Dimension and Rank?
- $\text{rank}(A) = \dim(C(A))$ (the dimension of the column space)
- $\text{rank}(A) = \dim(C(A^T))$ (the dimension of the row space)

| **Feature**            | **Dimension**                                                                                                                                                                           | **Rank**                                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **What it describes?** | A **vector space** (or subspace).                                                                                                                                                       | A **matrix**.                                                                                                                 |
| **What it measures?**  | The **number of vectors in any basis** for the space.                                                                                                                                   | The **dimension of the column space** (or row space) of the matrix.                                                           |
| **How to find it?**    | Find a basis for the space and count the vectors.                                                                                                                                       | Find the **number of pivots** in the matrix's echelon form.                                                                   |
| **Example:**           | The plane $x+y+z=0$ is a subspace of $R^3$ with **dimension 2**. (A basis is $\left\{ \begin{bmatrix} -1 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} -1 \\ 0 \\ 1 \end{bmatrix} \right\}$) | The matrix $A = \begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \end{bmatrix}$ (which has that plane as its nullspace) has **rank 1**. |



## The Four Fundamental Subspaces

To answer these questions, we analyze the $m \times n$ matrix $A$. The key is to find its **rank $r$**, which is the number of pivots in its echelon form. For our examples, we will use this $3 \times 3$ matrix $A$ with **rank $r=2$**:

$$A = \begin{bmatrix} 1 & 1 & 2 \\ 2 & 3 & 5 \\ 3 & 4 & 7 \end{bmatrix} \xrightarrow{\text{Elimination}} U = \begin{bmatrix} 1 & 1 & 2 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix} \xrightarrow{\text{Reduced Form}} R = \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix}$$
### The Column Space $C(A)$

#### Definition

The subspace of $\mathbb{R}^m$ consisting of all linear combinations of the columns of $A$.

#### Intuition and Properties

1. $C(A)$ is the **span** of the columns. This is the set of all vectors that can be **constructed** from linear combinations of the columns of $A$.
2. The question "Does $Ax=b$ have a solution?" is _identical_ to the question "Is $b$ in the column space of $A$?" In other words, can $b$ be built from the columns?
   **Example:**
   For our matrix $A$, the columns are $c_1 = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$, $c_2 = \begin{bmatrix} 1 \\ 3 \\ 4 \end{bmatrix}$, and $c_3 = \begin{bmatrix} 2 \\ 5 \\ 7 \end{bmatrix}$. We can see that $c_1 + c_2 = c_3$, so the third column is dependent and adds no new vectors to the span. Therefore, $C(A)$ is not all of $\mathbb{R}^3$; it is a 2-dimensional **plane** inside $\mathbb{R}^3$.

#### Formal Math

1. $b \in C(A)$ if and only if $b = Ax$ for some $x$.
2. The **dimension** of $C(A)$ is the **rank $r$**. For our example, $\dim(C(A)) = r = 2$.
3. A **basis** for $C(A)$ is formed by the $r$ **pivot columns** of the _original matrix $A$_. In our example, the pivots are in columns 1 and 2. So, one basis for $C(A)$ is $\left\{ \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}, \begin{bmatrix} 1 \\ 3 \\ 4 \end{bmatrix} \right\}$.

### The Nullspace $N(A)$

#### Definition

The subspace of $\mathbb{R}^n$ consisting of all solutions $x$ to the homogeneous equation $Ax=0$.

#### Intuition and Properties

1. The nullspace is the set of all "recipes" $x$ that combine the columns of $A$ to produce the zero vector. Hence, it describes the _dependency_ among the columns. (i.e.  redundancy in the matrix)
2. This space represents the ambiguity in the solutions to $Ax=b$. If $x_p$ is one solution, the complete solution is $x_p + x_n$, where $x_n$ is any vector in the nullspace. Therefore, if $N(A) = \{0\}$, solutions (if they exist) are **unique**.
3. In short, If the nullspace is **just the zero vector**, the columns are **independent**, and if the nullspace **contains non-zero vectors**, they are **dependent**.

**Example #1:**
Consider this matrix $A$, which has independent columns:

$$A = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$
The "recipe" to combine these columns to get the zero vector is the equation $Ax=0$:
$$x_1 \begin{bmatrix} 1 \\ 0 \end{bmatrix} + x_2 \begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$
The only recipe $x = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix}$ that makes this happen is $x_1 = 0$ and $x_2 = 0$, which is a trivial vector already in Nullspace.
- **Conclusion:** The only vector in the nullspace is $x=0$.
- **Meaning:** There is **no dependency** between the columns. You can't use one column to "cancel out" the other. The columns are independent.

**Example #2:**
Now consider this matrix $A$, which has dependent columns:

$$A = \begin{bmatrix} 1 & 2 \\ 3 & 6 \end{bmatrix}$$

Column 2 is just 2 times Column 1. This is a redundancy. The columns are **linearly dependent**.

There exists a non-zero recipe $x$ that makes `Ax=0` work:
$$-2 \begin{bmatrix} 1 \\ 3 \end{bmatrix} + 1 \begin{bmatrix} 2 \\ 6 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

So, the vector $x = \begin{bmatrix} -2 \\ 1 \end{bmatrix}$ is a non-zero solution.
- **Conclusion:** The vector $x = \begin{bmatrix} -2 \\ 1 \end{bmatrix}$ (and all its multiples) is in the **nullspace**.
- **Meaning:** The nullspace contains the vector $\begin{bmatrix} -2 \\ 1 \end{bmatrix}$, which is the _exact recipe_ that describes _how_ the columns are dependent. It literally tells you that $1 \times (\text{Column 2}) - 2 \times (\text{Column 1}) = 0$.

**Example #3:**
For our $A$ above, we solve $Ax=0$. The dependency $c_1 + c_2 = c_3$ can be rewritten as $c_1 + c_2 - c_3 = 0$, or $A \begin{bmatrix} 1 \\ 1 \\ -1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$. This shows the vector $\begin{bmatrix} 1 \\ 1 \\ -1 \end{bmatrix}$ is in the nullspace. Since the dimension is 1 (see below), this single vector is a basis. The nullspace is a **line** in $\mathbb{R}^3$.

#### Formal Math

1. $x \in N(A)$ if and only if $Ax=0$.
2. The **dimension** is $\dim(N(A)) = n - r$ (number of columns - rank). This is the number of **free variables**.
    - In our example, $n=3$ and $r=2$, so the dimension is $3 - 2 = 1$. This matches our intuition that the nullspace is a line.
3. A **basis** is formed by the $n-r$ **"special solutions"**. We find these from the reduced form $R$: $$R = \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix} \implies \begin{array}{r} x_1 + x_3 = 0 \\ x_2 + x_3 = 0 \\ 0 = 0 \end{array}$$ The free variable is $x_3$. Set $x_3=1 \implies x_1 = -1, x_2 = -1$. The basis for $N(A)$ is the single special solution $s_1 = \begin{bmatrix} -1 \ -1 \ 1 \end{bmatrix}$. (Note: This is just a different multiple of the vector we found by inspection).

### The Row Space $C(A^T)$

#### Definition

The subspace of $\mathbb{R}^n$ consisting of all linear combinations of the rows of $A$.

#### Intuition and Properties

1. This space represents the "effective input" of $A$. Any input vector $x$ can be split into a row-space part ($x_r$) and a nullspace part ($x_n$). The matrix $A$ _only_ "sees" the $x_r$ part: $A(x_r + x_n) = Ax_r + Ax_n = Ax_r + 0$.
2. Gaussian elimination **does not change the row space**. The row space of $A$ is the _same_ as the row space of its echelon form $U$ or $R$.
3. The **dimension** of $C(A^T)$ is also the **rank $r$**. This is the **"row rank = column rank"** theorem.

**Example:**
For our $A$, the row space is a **plane** in $\mathbb{R}^3$ (since $r=2$).

#### Formal Math

1. A **basis** for $C(A^T)$ is formed by the $r$ non-zero rows of the **echelon form $U$ or $R$**.
    - From our example, the basis for $C(A^T)$ is the set of non-zero rows of $R$: $\left\{ \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix} \right\}$.
2. The row space $C(A^T)$ and the nullspace $N(A)$ are **orthogonal complements**. Every vector in one is perpendicular to every vector in the other.
    - **Check:** Take the basis vectors from $N(A)$ and $C(A^T)$.
        - $\begin{bmatrix} -1 \\ -1 \\ 1 \end{bmatrix} \cdot \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix} = (-1)(1) + (-1)(0) + (1)(1) = 0$.
        - $\begin{bmatrix} -1 \\ -1 \\ 1 \end{bmatrix} \cdot \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix} = (-1)(0) + (-1)(1) + (1)(1) = 0$.
    - Their dimensions add up to the full dimension of the input space: $\dim(C(A^T)) + \dim(N(A)) = r + (n-r) = 2 + 1 = 3 = n$.

### The Left Nullspace $N(A^T)$

#### Definition

The subspace of $\mathbb{R}^m$ consisting of all solutions $y$ to the equation $A^Ty=0$.

#### Intuition and Properties

1. It is called the "left" nullspace because $A^Ty=0$ is the same as $y^TA = 0^T$. This $y$ is a vector of coefficients that combines the _rows_ of $A$ to produce the zero vector.
2. This space gives the **solvability condition** for $Ax=b$. If $y^TA=0$ (a combination of rows is zero), then $y^Tb$ _must also be zero_ for a solution to exist.

**Example:**
For our $A$, we saw from elimination that $(-\text{row } 1) - (\text{row } 2) + (\text{row } 3) = \begin{bmatrix} 0 & 0 & 0 \end{bmatrix}$. The combination vector is $y = \begin{bmatrix} -1 \ -1 \ 1 \end{bmatrix}$. This vector is a basis for $N(A^T)$. It is a **line** in $\mathbb{R}^3$.

#### Formal Math

1. $y \in N(A^T)$ if $A^Ty=0$.
2. The **dimension** is $\dim(N(A^T)) = m - r$ (number of rows - rank). This is the number of zero rows in the echelon form. (Example: $m=3, r=2$, so $\dim = 1$).
3. The left nullspace $N(A^T)$ and the column space $C(A)$ are **orthogonal complements**.
    - **Check:** Take the basis vectors.
        - $C(A)$ basis: $\begin{bmatrix} 1 \ 2 \ 3 \end{bmatrix}$ and $\begin{bmatrix} 1 \ 3 \ 4 \end{bmatrix}$.
        - $N(A^T)$ basis: $\begin{bmatrix} -1 \ -1 \ 1 \end{bmatrix}$.
        - $\begin{bmatrix} -1 \ -1 \ 1 \end{bmatrix} \cdot \begin{bmatrix} 1 \ 2 \ 3 \end{bmatrix} = -1 - 2 + 3 = 0$.
        - $\begin{bmatrix} -1 \ -1 \ 1 \end{bmatrix} \cdot \begin{bmatrix} 1 \ 3 \ 4 \end{bmatrix} = -1 - 3 + 4 = 0$.
    - Their dimensions add up to the full dimension of the output space: $\dim(C(A)) + \dim(N(A^T)) = r + (m-r) = 2 + 1 = 3 = m$.

## Integrating Concepts: The Complete Solution

The four subspaces provide a complete and rigorous answer to the problems from the first section.

### When does $Ax=b$ have a solution? (Existence)

- **The Problem:** Do the $m$ hyperplanes intersect?

- **The Subspace Answer:** A solution exists if and only if $b$ is in the **Column Space $C(A)$**.

- **The Practical Test:** We know $C(A)$ is orthogonal to $N(A^T)$. This gives a perfect test for solvability:

  > $Ax=b$ has a solution if and only if $b$ is orthogonal to the left nullspace.
  >
  > ($y^T b = 0$ for all $y$ that satisfy $A^Ty = 0$).

- **Example:** For $A = \begin{bmatrix} 1 & 1 & 2 \\ 2 & 3 & 5 \\ 3 & 4 & 7 \end{bmatrix}$, the left nullspace is spanned by $y = \begin{bmatrix} -1 \\ -1 \\ 1 \end{bmatrix}$.

    - Does $Ax = b = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$ have a solution?

      Yes, because $y^Tb = \begin{bmatrix} -1 & -1 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix} = -1 - 2 + 3 = 0$.

    - Does $Ax = b = \begin{bmatrix} 1 \\ 2 \\ 4 \end{bmatrix}$ have a solution?

      No, because $y^Tb = \begin{bmatrix} -1 & -1 & 1 \end{bmatrix} \begin{bmatrix} 1 \\ 2 \\ 4 \end{bmatrix} = -1 - 2 + 4 = 1 \neq 0$.

### How many solutions are there? (Uniqueness)

- **The Problem:** Is the intersection a single point, a line, or a plane?

- **The Subspace Answer:** This is controlled entirely by the **Nullspace $N(A)$**.

- **The Complete Answer:** The full solution set is $x = x_p + x_n$, where $x_p$ is one particular solution and $x_n$ is _any_ vector from the nullspace.

    - **Unique Solution:** This happens if $\dim(N(A)) = n-r = 0$. The nullspace is just $\{0\}$. The only solution is $x = x_p$.

    - **Infinite Solutions:** This happens if $\dim(N(A)) = n-r > 0$. The solution set $x = x_p + x_n$ is a line or plane that is _parallel_ to the nullspace, just "shifted" away from the origin by $x_p$.

        - **Example:** For our $A$ (with $n-r=1$) and $b = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$, one particular solution is $x_p = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix}$. The complete solution is the **line** $x = \begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix} + c \begin{bmatrix} -1 \\ -1 \\ 1 \end{bmatrix}$.

---

## Summary

![The Four Fundamental Subspaces](https://opencw.aprende.org/courses/mathematics/18-06sc-linear-algebra-fall-2011/ax-b-and-the-four-subspaces/Unit_1_WIDE.jpg)

*Figure: Visual representation of the four fundamental subspaces and their relationships. [1]*

---

## References

1. MIT OpenCourseWare - *18.06SC Linear Algebra* - [The Four Fundamental Subspaces](https://opencw.aprende.org/courses/mathematics/18-06sc-linear-algebra-fall-2011/ax-b-and-the-four-subspaces/)
2. Strang, Gilbert - *Introduction to Linear Algebra* (Chapter 2)
