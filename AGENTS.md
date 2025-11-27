# Writing Style Guide for ML Codex Overview Documents

This document defines the writing style and structure for `*-overview.md` files in the ML Codex. This format ensures consistency, pedagogical effectiveness, and reader engagement across all overview documents.

---

## Document Structure

### 1. Front Matter
```yaml
---
sidebar_position: <number>
---

# [Chapter Title]

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

-----
```

### 2. Rationale/Motivation Section (## Level)

**Purpose:** Establish why the topic matters and what problems it solves.

**Format:**
- Start with a concrete problem statement
- Present 2-3 scenarios/possibilities
- Use accessible language before introducing formalism
- Connect to intuitive understanding

**Example Pattern:**
```markdown
## The Problem of [Core Question]

We want to [goal]. In the [perspective] view, [intuitive description].

This presents three possibilities:
1. **[Scenario 1]:** [Description]
2. **[Scenario 2]:** [Description]
3. **[Scenario 3]:** [Description]
```

---

### 3. Foundation Concepts Section (## Level)

**Purpose:** Build prerequisite knowledge before main content.

**Structure for each subsection (### Level):**

#### A. Start with Concrete Example
- Use a specific, numerical example
- Provide visual aids (diagrams/figures) when possible
- Include figure captions with detailed explanations

```markdown
### [Concept Name]

You can represent every vector in $R^2$ with combinations of...

![Figure Title](/path/to/image.png)

*Figure: [Detailed caption explaining all elements of the figure]*
```

#### B. Build Intuition
- Explain WHY the example works
- Compare valid vs invalid cases
- Show what happens when assumptions are violated

#### C. Formal Definition
- Use `:::danger` callouts for definitions
- Number properties/conditions when applicable
- Provide both mathematical notation and plain language

```markdown
:::danger[Definition: [Concept Name]]
The **[concept]** of [context] is [formal definition].

1. **[Property 1]:** [Description with math notation]
2. **[Property 2]:** [Description with math notation]
:::
```

#### D. Theorem (if applicable)
- Use `:::info` callouts for theorems
- State theorem clearly before proof
- Keep proofs high-level in overview (defer details to deepdive)

```markdown
:::info[Theorem: [Theorem Name]]
[Statement of theorem with math notation]
:::
```

#### E. Key Properties
- Use markdown tables for comparisons
- Include "How to find it" or "Example" columns
- Keep entries concise but complete

```markdown
| **Feature** | **Description** | **Example** |
|-------------|-----------------|-------------|
| [Property 1] | [Description] | [Concrete example] |
```

---

### 4. Main Content Section (## Level for topic, ### for each subsection)

For each major concept/component:

#### A. Concrete Example
- Use the running example matrix throughout the document
- Show the specific instance before generalizing

```markdown
To answer the questions we stated at first, let's consider the $m \times n$ matrix $A$ below.
For our examples, we will use this $3 \times 3$ matrix $A$ with **rank $r=2$**:

$$A = \begin{bmatrix} ... \end{bmatrix}$$
```

#### B. Intuitive Explanation
- Start with what the concept means in plain language
- Use "Consider..." to guide the reader through reasoning
- Connect to the concrete example

```markdown
Consider the columns of our matrix $A$: ... Notice that [key observation].
This [description of what's happening geometrically/intuitively].
```

#### C. Formal Definition
- Same format as Foundation section (:::danger callout)
- Include "It is a subspace of $\mathbb{R}^k$" when applicable

#### D. Key Properties Table
- **Always** include columns: Property | Description | Our Example
- Cover: Dimension, Basis, Solvability (when relevant), How to find

```markdown
**Key Properties:**

| Property | Description | Our Example |
|----------|-------------|-------------|
| **Dimension** | $\dim(...) = ...$ | [Specific value] |
| **Basis** | [Description] | [Explicit basis vectors] |
```

#### E. Finding the Basis (Procedural Section)
- **Header format:** `**Finding the Basis: [Method Name]**`
- Step-by-step instructions
- Use boxed notation for pivots: `\boxed{1}`
- Include worked example with the running matrix
- Add **Important:** notes for common pitfalls

```markdown
**Finding the Basis: [Method Name]**

To find a basis for $[space]$, [procedure]:

$$[Step-by-step matrix operations]$$

**Important:** [Critical note about common mistakes]
```

#### F. Additional Examples/Applications
- Provide 2-3 additional examples showing edge cases or variations
- Use collapsible `<details>` for extended examples

```markdown
**Additional Examples:**

[Brief example 1]

[Brief example 2]

<details>
<summary>📌 **Example:** [Title for complex example]</summary>

[Extended example with full explanation]

</details>
```

#### G. Connections and Applications
- Connect to related concepts in the same chapter
- Show orthogonal complement relationships
- Provide real-world applications (ML, data science)

```markdown
**[Type of Connection]:**

[Explanation of how concepts relate]

**Example:** [Concrete demonstration]

<details>
<summary>💡 **Question:** [Natural question that arises]</summary>

**Answer:** [Clear explanation]

**[Intuition Type]:** [Geometric/algebraic insight]

</details>
```

---

### 5. Integration Section (## Level)

**Purpose:** Show how all concepts work together.

**Format:**
- Present unifying theorems
- Work through complete examples using all concepts
- Use corollaries for special cases

```markdown
## Integrating Concepts: [Integration Theme]

[Explanation of how concepts connect]

:::info[Theorem: [Unifying Theorem Name]]
[Statement connecting multiple concepts]
:::

**Example 1:** [Demonstration]
**Example 2:** [Demonstration]

:::note[Corollary: [Special Case]]
[Simplified case with practical importance]
:::
```

---

### 6. Summary Section (## Level)

**Format:**
- Comprehensive table summarizing all main concepts
- State the fundamental theorem of the chapter
- Use `:::info` callout for the main theorem

```markdown
## Summary: [Chapter's Main Theorem/Framework]

[Overview paragraph]

| **Concept** | **Lives in** | **Dimension** | **Interpretation** |
|-------------|--------------|---------------|-------------------|
| [Concept 1] | $\mathbb{R}^k$ | [Formula] | [What it means] |

### The [Main Theorem Name]

:::info[Theorem: The [Main Theorem Name]]
[Complete statement with all parts]

**Part 1: [Aspect 1]**
[Formulas]

**Part 2: [Aspect 2]**
[Formulas]
:::

[Additional explanatory notes]
[Optional: Diagram summarizing relationships]
```

---

### 7. Guided Problems (## Level)

**Purpose:** Test conceptual understanding with minimal calculation.

**Format:**
- Brief introduction paragraph
- 2-3 problems numbered as `### Problem [N]: [Descriptive Title]`
- Each problem in consistent format

```markdown
## Guided Problems

[Brief paragraph on what these problems test]

### Problem 1: [Descriptive Title]

[Problem statement with clear setup]

[Mathematical notation]

1. [Question 1]
2. [Question 2]
3. [Question 3]


<details>
<summary>💡 **Solution**</summary>

**Hints:**

* **[Aspect 1]:** [Strategic hint]
* **[Aspect 2]:** [Strategic hint]

**Solution:**

**Part 1: [Part Name]**

[Step-by-step solution]

**Part 2: [Part Name]**

[Step-by-step solution]

**Key Insight:** [Connection to broader concepts or applications]

</details>
```

---

### 8. References (## Level)

**Format:**
- Numbered list
- Include: Primary textbooks, course materials, papers
- Format: `Author - *Title* (Section/Chapter)` or `Source - [Link](url)`

```markdown
## References

1. MIT OpenCourseWare - *Course Number* - [Topic](url)
2. Author, Name - *Book Title* (Chapter X)
```

---

## Styling Conventions

### Callout Usage

- **`:::danger`** - Formal definitions (the most important takeaways)
- **`:::info`** - Theorems, formal results
- **`:::note`** - Corollaries, special cases
- **`:::tip`** - Practical tips, solution structures

### Collapsible Details

Use `<details>` for:
- Extended examples that might interrupt flow
- Questions and answers
- Additional technical content
- Complex edge cases

**Icons:**
- 💡 for Solutions and explanatory questions
- 📌 for Extended examples

### Mathematical Notation

- **Inline math:** `$x$`
- **Display math:** `$$...$$`
- **Matrices:** Use `\begin{bmatrix}...\end{bmatrix}`
- **Operations:** Show with arrows: `\xrightarrow{\text{operation}}`
- **Emphasis:** Box important values: `\boxed{1}`
- **Sets:** Use braces: `\{...\}`

### Formatting Emphasis

- **Bold** for key terms on first use: `**basis**`
- *Italics* for emphasis in explanations
- `Code blocks` for variable names in text
- Capitalized section labels: `**Important:**`, `**Key Insight:**`

### Tables

Always include:
- Header row with `**Bold**` labels
- Alignment (usually left for text, center for math)
- Three columns minimum: Concept | Description | Example

---

## Pedagogical Principles

### 1. Concrete → Abstract
Always present specific numerical examples before general formulas.

### 2. Visual → Formal
Include diagrams before mathematical definitions when possible.

### 3. Intuition → Rigor
Explain "what it means" before "how to prove it."

### 4. Progressive Complexity
- Start with 2×2 or 3×3 matrices
- Build to general m×n case
- Show edge cases last

### 5. Running Example
Use the same example matrix throughout a section to build familiarity.

### 6. Connections Matter
Always show:
- How concepts relate to each other
- How theory connects to practice (ML/data science)
- Geometric and algebraic perspectives

---

## Writing Style Guidelines

### Voice
- **Active voice** preferred: "We find..." not "It can be found..."
- **Inclusive first person:** "Let's consider..." "We want to solve..."
- **Direct address when appropriate:** "You can represent..."

### Sentence Structure
- Keep sentences concise (15-20 words average)
- Use lists for multiple items (not run-on sentences)
- One idea per sentence in technical explanations

### Explanation Pattern
1. **State what** (the concept)
2. **Show why** (the motivation)
3. **Demonstrate how** (the procedure)
4. **Connect where** (applications/relationships)

### Transitions
Use clear transitional phrases:
- "To answer this question..."
- "Notice that..."
- "This leads us to..."
- "Therefore..."
- "In contrast..."

---

## Document Checklist

Before finalizing an overview document, verify:

- [ ] Front matter includes sidebar_position and TOCInline
- [ ] Starts with motivation/problem statement
- [ ] Each major concept has: Example → Intuition → Definition → Properties
- [ ] All definitions use `:::danger` callouts
- [ ] All theorems use `:::info` callouts
- [ ] Key properties are in markdown tables
- [ ] Procedural sections include step-by-step examples
- [ ] Figures have detailed captions
- [ ] Running example is used consistently
- [ ] Integration section connects all concepts
- [ ] Summary includes comprehensive table and main theorem
- [ ] 2-3 guided problems with hidden solutions
- [ ] References section with 2+ sources
- [ ] Mathematical notation is consistent
- [ ] No orphaned sections (all connect to main narrative)

---

## File Naming Convention

Format: `[number]-[topic-name]-overview.md`

Examples:
- `01-vector-spaces-overview.md`
- `02-matrix-inverse-overview.md`
- `03-linear-transformations-overview.md`

Corresponding deep dive files:
- `01-vector-spaces-deepdive.md`
- No deepdive for inverse (short topic)
- `03-linear-transformations-deepdive.md`

---

*This style guide should be referenced when creating any new `*-overview.md` file in the ML Codex. Consistency in structure and style improves learning outcomes and maintains professional quality.*
