---
sidebar_position: 2
---

# Probability Basics

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: How Do We Reason About Uncertainty?

Machine learning deals with uncertain data, noisy measurements, and incomplete information. Probability theory provides the mathematical framework for quantifying and reasoning about uncertainty. Every probabilistic model, every Bayesian method, and every stochastic algorithm rests on these foundations.

Consider these scenarios:
1. A spam filter must decide whether an email is spam given observed features. Bayes' theorem updates the prior belief about spam using the observed evidence.
2. A medical test has known false positive and false negative rates. The probability that a patient actually has the disease given a positive test depends on the disease prevalence (the prior).
3. Features in a dataset may be independent or dependent. Understanding conditional independence allows us to build efficient probabilistic graphical models.

Probability axioms and Bayes' theorem are the starting point for all of probabilistic ML.

---

## Topics to Cover

### Probability Axioms and Sample Spaces
- Sample space $\Omega$, events, and sigma-algebras
- Kolmogorov axioms: non-negativity, normalization, countable additivity
- Frequentist vs Bayesian interpretations

### Conditional Probability
- Definition: $P(A|B) = P(A \cap B) / P(B)$
- Multiplication rule: $P(A \cap B) = P(A|B)P(B)$
- Law of total probability: $P(A) = \sum_i P(A|B_i)P(B_i)$

### Bayes' Theorem
- $P(A|B) = \frac{P(B|A)P(A)}{P(B)}$
- Prior, likelihood, posterior, and evidence
- Sequential updating: the posterior becomes the next prior

### Independence
- Definition: $P(A \cap B) = P(A)P(B)$
- Conditional independence: $P(A \cap B | C) = P(A|C)P(B|C)$
- Independence does not imply conditional independence (and vice versa)

---

## Summary

**Answering the Central Question:** Probability theory quantifies uncertainty through axioms that assign numbers between 0 and 1 to events, with the total probability summing to 1. Conditional probability $P(A|B)$ tells us how to update beliefs given evidence, and Bayes' theorem $P(A|B) = P(B|A)P(A)/P(B)$ provides the systematic way to invert conditioning. Independence simplifies joint probabilities into products, enabling tractable models. These foundations underpin every probabilistic method in ML.

---

## Applications in Data Science and Machine Learning

- **Naive Bayes classifier**: Applies Bayes' theorem with the conditional independence assumption to classify data
- **Bayesian inference**: Updates parameter beliefs from prior to posterior using Bayes' theorem
- **Probabilistic graphical models**: Conditional independence structure determines the factorization of joint distributions
- **A/B testing**: Frequentist and Bayesian approaches to determining whether a treatment effect is real
- **Generative models**: Define joint distributions $P(X, Y)$ and use Bayes' theorem to compute $P(Y|X)$

---

## Guided Problems

---

## References

1. Blitzstein and Hwang - *Introduction to Probability*, 2nd ed., Chapters 1-2
2. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 1.2
3. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 2
4. Harvard Stat 110 - [*Probability*](https://projects.iq.harvard.edu/stat110)
