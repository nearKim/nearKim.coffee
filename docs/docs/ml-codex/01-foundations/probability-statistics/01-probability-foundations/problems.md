---
sidebar_position: 7
---

# Section 1: Problems

University-level exam questions for Probability Foundations.

## Probability Basics

### Problem 1.1
A medical test has sensitivity 0.95 (true positive rate) and specificity 0.90 (true negative rate). If the prevalence of the disease is 1%, what is the probability that a patient who tests positive actually has the disease?

**Difficulty**: Medium

### Problem 1.2
Prove that $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ from the axioms of probability.

**Difficulty**: Easy

### Problem 1.3
Three cards are drawn from a standard 52-card deck without replacement. Find the probability that all three are aces.

**Difficulty**: Easy

## Random Variables

### Problem 2.1
Let $X$ be a continuous random variable with PDF $f(x) = 3x^2$ for $0 \le x \le 1$. Find the CDF, $P(X > 0.5)$, and the median.

**Difficulty**: Medium

### Problem 2.2
If $X \sim \text{Uniform}(0, 1)$, find the PDF of $Y = -\ln(X)$. What distribution does $Y$ follow?

**Difficulty**: Medium

## Common Distributions

### Problem 3.1
Show that the Poisson distribution with parameter $\lambda$ can be derived as a limit of $\text{Binomial}(n, p)$ as $n \to \infty$ and $p \to 0$ with $np = \lambda$.

**Difficulty**: Hard

### Problem 3.2
For a Gaussian random variable $X \sim \mathcal{N}(\mu, \sigma^2)$, derive the moment generating function $M_X(t) = E[e^{tX}]$.

**Difficulty**: Hard

## Expectation and Variance

### Problem 4.1
Let $X_1, \ldots, X_n$ be i.i.d. random variables with mean $\mu$ and variance $\sigma^2$. Find $E[\bar{X}]$ and $\text{Var}(\bar{X})$ where $\bar{X} = \frac{1}{n}\sum_i X_i$.

**Difficulty**: Easy

### Problem 4.2
Prove the law of total expectation: $E[X] = E[E[X \mid Y]]$.

**Difficulty**: Hard

### Problem 4.3
Show that $\text{Var}(X) = E[X^2] - (E[X])^2$ using the definition of variance.

**Difficulty**: Easy

## Challenge Problems

### Problem 5.1
(Coupon collector) There are $n$ distinct types of coupons. Each time you collect one uniformly at random. Find the expected number of coupons you need to collect to have at least one of each type.

**Difficulty**: Very Hard

---

## Solutions

Solutions are available in the implementation file with verification code.
