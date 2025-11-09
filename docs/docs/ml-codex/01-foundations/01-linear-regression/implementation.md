---
sidebar_position: 2
sidebar_label: "Implementation"
title: "Python Implementation"
description: "Three approaches to implementation"
---

# Topic Name: Implementation

Three different implementations: from educational to production-ready.

---

## Practice Problem

**Task:** Implement [algorithm/concept name] to solve [problem description].

**Goal:** Understand the algorithm by implementing it three different ways.

---

## Approach 1: Vanilla Python (From Scratch)

:::info Learning Goal
Understand the **exact mechanics** without libraries.
:::

### Complete Implementation

```python
def basic_function(x):
    """
    Basic implementation using only built-in Python.

    Args:
        x (float): Input value

    Returns:
        float: Computed result
    """
    result = 0.0

    # Step 1: Initialize
    for i in range(len(x)):
        # Step 2: Process
        result += x[i] ** 2

    # Step 3: Return
    return result


def main_algorithm(data, param1=0.01, param2=100):
    """
    Main algorithm implementation.

    Args:
        data (list): Input data
        param1 (float): First parameter
        param2 (int): Second parameter

    Returns:
        result: Computed output
    """
    # Implementation here
    output = basic_function(data)

    # Training loop example
    for epoch in range(param2):
        # Update step
        output = output * param1

        # Print progress
        if epoch % 10 == 0:
            print(f"Epoch {epoch}: Value = {output:.4f}")

    return output


# Example Usage
if __name__ == "__main__":
    sample_data = [1.0, 2.0, 3.0, 4.0]
    result = main_algorithm(sample_data, param1=0.1, param2=50)
    print(f"Final result: {result}")
```

### Output Example

```
Epoch 0: Value = 30.0000
Epoch 10: Value = 0.0859
Epoch 20: Value = 0.0025
...
Final result: 0.0001
```

:::tip Pros & Cons
✅ **Pros:** Complete understanding, no dependencies
❌ **Cons:** Slow, verbose code
:::

---

## Approach 2: NumPy (Vectorized)

:::info Learning Goal
Learn **vectorization** for performance.
:::

```python
import numpy as np


def basic_function(x):
    """
    Vectorized implementation using NumPy.

    Args:
        x (np.ndarray): Input array, shape (n,)

    Returns:
        float: Computed result
    """
    return np.sum(x ** 2)


def main_algorithm(data, param1=0.01, param2=100):
    """
    Vectorized main algorithm.

    Args:
        data (np.ndarray): Input data, shape (m, n)
        param1 (float): First parameter
        param2 (int): Second parameter

    Returns:
        np.ndarray: Computed output
    """
    m, n = data.shape
    output = np.zeros((n,))

    for epoch in range(param2):
        # Vectorized operations
        output = np.dot(data.T, data @ output) * param1

        if epoch % 10 == 0:
            loss = np.mean((output - data) ** 2)
            print(f"Epoch {epoch}: Loss = {loss:.4f}")

    return output


# Example Usage
if __name__ == "__main__":
    # Generate sample data
    X = np.random.randn(100, 5)

    result = main_algorithm(X, param1=0.1, param2=50)
    print(f"Output shape: {result.shape}")
```

:::tip Pros & Cons
✅ **Pros:** 10-100x faster, concise
❌ **Cons:** Requires NumPy
:::

---

## Approach 3: scikit-learn/PyTorch (Production)

:::info Learning Goal
Use **industry-standard** libraries.
:::

```python
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
# or: import torch
# or: from library import Model


# Prepare Data
X = np.random.randn(1000, 10)
y = np.random.randint(0, 2, 1000)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


# Create Model
model = SomeModel(
    param1=0.01,
    param2=100,
    random_state=42
)

# Train
model.fit(X_train_scaled, y_train)

# Evaluate
train_score = model.score(X_train_scaled, y_train)
test_score = model.score(X_test_scaled, y_test)

print(f"Training score: {train_score:.4f}")
print(f"Test score: {test_score:.4f}")

# Make Predictions
predictions = model.predict(X_test_scaled)
probabilities = model.predict_proba(X_test_scaled)

print(f"Sample predictions: {predictions[:5]}")
```

:::tip Pros & Cons
✅ **Pros:** Production-ready, optimized, battle-tested
❌ **Cons:** Black box, harder to debug internals
:::

---

## Comparison Table

| Feature | Vanilla Python | NumPy | Production Library |
|---------|---------------|-------|-------------------|
| **Speed** | Baseline | 10-100x faster | Fastest |
| **Code Length** | ~100 lines | ~50 lines | ~20 lines |
| **Learning Value** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Production Use** | Never | Rare | Always |
| **Customization** | Complete | High | Limited |

---

## Exercises

Try these extensions:

1. **Easy**: Add progress bar to training loop
2. **Medium**: Implement early stopping
3. **Hard**: Add L2 regularization
4. **Expert**: Compare performance across implementations

---

## Navigation

| Previous | Current | Next |
|----------|---------|------|
| [← Problems](./problems.md) | **Implementation** | <!-- [Next Topic →](../XX-next-topic/index.md) --> |

**Current Topic:** Topic Name → [Overview](./index.md) • [Problems](./problems.md) • **Implementation**
