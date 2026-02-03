---
sidebar_position: 4
---

# Limit Theorems and Concentration

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: Why Do Averages Converge, and How Fast?

Machine learning relies on the idea that training on a finite sample tells us something about the true distribution. The law of large numbers says averages converge to expectations. The central limit theorem describes how fast. Concentration inequalities give finite-sample bounds that are essential for generalization guarantees.

Consider these scenarios:
1. SGD approximates the true gradient with a mini-batch average. The LLN says this approximation improves with batch size. The CLT tells us the approximation error is approximately Gaussian.
2. A PAC learning bound says: with probability $\ge 1 - \delta$, the test error is within $\epsilon$ of the training error, provided $n \ge f(\epsilon, \delta, |\mathcal{H}|)$. This bound comes from Hoeffding's inequality.
3. Cross-validation estimates test error by averaging over folds. Concentration inequalities tell us how many folds and samples we need for this estimate to be reliable.

Limit theorems and concentration inequalities are the mathematical foundation of statistical learning theory.

---

## Topics to Cover

### Law of Large Numbers
- Weak LLN: $\bar{X}_n \xrightarrow{P} \mu$ (convergence in probability)
- Strong LLN: $\bar{X}_n \xrightarrow{a.s.} \mu$ (almost sure convergence)
- Why empirical risk minimization works: training loss converges to expected loss

### Central Limit Theorem
- $\sqrt{n}(\bar{X}_n - \mu) \xrightarrow{d} \mathcal{N}(0, \sigma^2)$
- Rate of convergence: $O(1/\sqrt{n})$ standard error
- Justification for confidence intervals and hypothesis tests
- Berry-Esseen theorem: speed of CLT convergence

### Tail Bounds and Concentration Inequalities
- **Markov's inequality**: $P(X \ge t) \le E[X]/t$ for non-negative $X$
- **Chebyshev's inequality**: $P(|X - \mu| \ge t) \le \sigma^2/t^2$
- **Hoeffding's inequality**: $P(|\bar{X} - \mu| \ge t) \le 2\exp(-2nt^2/(b-a)^2)$ for bounded r.v.s
- **Chernoff bound**: $P(X \ge t) \le \min_s e^{-st}M_X(s)$ (exponential tail bound via MGF)
- Sub-Gaussian and sub-exponential random variables

### Connection to PAC Learning
- PAC framework: "Probably Approximately Correct" learning
- Sample complexity from Hoeffding: $n \ge \frac{1}{2\epsilon^2}\log\frac{2|\mathcal{H}|}{\delta}$
- Union bound over hypothesis class
- VC dimension as a measure of hypothesis complexity

---

## Summary

**Answering the Central Question:** The LLN guarantees that sample averages converge to population expectations, justifying empirical risk minimization. The CLT quantifies the fluctuations as approximately Gaussian with standard error $\sigma/\sqrt{n}$. Concentration inequalities (Hoeffding, Chernoff) provide non-asymptotic, finite-sample bounds: $P(|\bar{X} - \mu| \ge \epsilon) \le 2e^{-2n\epsilon^2}$ for bounded random variables. These bounds directly yield PAC learning sample complexity: $n = O(\frac{1}{\epsilon^2}\log\frac{|\mathcal{H}|}{\delta})$ samples suffice to learn within $\epsilon$ error with probability $\ge 1-\delta$.

---

## Applications in Data Science and Machine Learning

- **Generalization bounds**: Concentration inequalities + union bounds give PAC-style guarantees on test error
- **SGD convergence**: LLN and CLT justify stochastic gradient estimates; variance reduction techniques improve the $O(1/\sqrt{n})$ rate
- **Bootstrap and cross-validation**: CLT justifies approximate confidence intervals for model performance estimates
- **Bandit algorithms**: Concentration inequalities (Hoeffding, Bernstein) drive UCB-style exploration strategies
- **Differential privacy**: Concentration bounds on noise addition ensure privacy guarantees hold with high probability
- **Random features and sketching**: Johnson-Lindenstrauss and related concentration results guarantee quality of random projections

---

## Guided Problems

---

## References

1. Wasserman, Larry - *All of Statistics*, Chapters 5-6
2. Shalev-Shwartz and Ben-David - [*Understanding Machine Learning*](https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/), Chapters 2-4
3. Wainwright, Martin - *High-Dimensional Statistics*, Chapter 2
4. Vershynin, Roman - [*High-Dimensional Probability*](https://www.math.uci.edu/~rvershyn/papers/HDP-book/HDP-book.html), Chapters 2-3
