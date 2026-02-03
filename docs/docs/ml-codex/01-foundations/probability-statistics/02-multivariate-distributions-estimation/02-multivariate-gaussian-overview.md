---
sidebar_position: 3
---

# The Multivariate Gaussian

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

---

## The Central Question: Why Is the Gaussian Distribution So Central to Machine Learning?

The multivariate Gaussian (MVN) is the most important distribution in machine learning. Its closed-form conditioning and marginalization formulas make it analytically tractable. The central limit theorem makes it a natural model for aggregated noise. And many ML algorithms (GP regression, Kalman filters, LDA) are fundamentally Gaussian.

Consider these scenarios:
1. Gaussian process regression places a multivariate Gaussian prior over function values. Conditioning on observed data gives a posterior that is also Gaussian, with closed-form mean and variance.
2. The Kalman filter models state evolution and observations as linear-Gaussian. All updates are applications of the MVN conditioning formula.
3. Linear discriminant analysis assumes each class has a Gaussian distribution, and the decision boundary comes from comparing Gaussian densities.

The MVN is the workhorse distribution of probabilistic ML.

---

## Topics to Cover

### MVN Definition and Parameterization
- $X \sim \mathcal{N}(\mu, \Sigma)$ with density $p(x) = \frac{1}{(2\pi)^{n/2}|\Sigma|^{1/2}}\exp\left(-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu)\right)$
- Mean vector $\mu$ and covariance matrix $\Sigma$
- Precision matrix $\Lambda = \Sigma^{-1}$ and information form

### Conditioning and Marginalization Formulas
- Partition: $\begin{bmatrix} x_1 \\ x_2 \end{bmatrix} \sim \mathcal{N}\left(\begin{bmatrix} \mu_1 \\ \mu_2 \end{bmatrix}, \begin{bmatrix} \Sigma_{11} & \Sigma_{12} \\ \Sigma_{21} & \Sigma_{22} \end{bmatrix}\right)$
- Marginal: $x_1 \sim \mathcal{N}(\mu_1, \Sigma_{11})$
- Conditional: $x_1 | x_2 \sim \mathcal{N}(\mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(x_2 - \mu_2), \; \Sigma_{11} - \Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21})$

### Mahalanobis Distance
- $(x - \mu)^T\Sigma^{-1}(x - \mu)$: the Gaussian's notion of "distance"
- Reduces to Euclidean distance when $\Sigma = I$
- Level curves of the Gaussian are ellipsoids defined by constant Mahalanobis distance

### Affine Transformations
- If $X \sim \mathcal{N}(\mu, \Sigma)$ and $Y = AX + b$, then $Y \sim \mathcal{N}(A\mu + b, A\Sigma A^T)$
- Whitening: choosing $A = \Sigma^{-1/2}$ to decorrelate
- Connection to Spectral Theory (eigendecomposition of $\Sigma$)

---

## Summary

**Answering the Central Question:** The Gaussian is central because: (1) it is closed under marginalization, conditioning, and affine transformation, making it analytically tractable; (2) the central limit theorem makes it a natural model for averaged quantities; (3) it is the maximum entropy distribution for given mean and variance; (4) many ML algorithms (GPs, Kalman filters, LDA, factor analysis) are built on Gaussian assumptions. The key formulas are the conditioning formula $\mu_{1|2} = \mu_1 + \Sigma_{12}\Sigma_{22}^{-1}(x_2 - \mu_2)$ and the affine transformation $Y = AX + b \Rightarrow Y \sim \mathcal{N}(A\mu + b, A\Sigma A^T)$.

---

## Applications in Data Science and Machine Learning

- **Gaussian process regression**: The posterior over function values is computed using the MVN conditioning formula
- **Kalman filter**: State estimation via sequential application of MVN conditioning
- **Linear discriminant analysis**: Assumes class-conditional Gaussian distributions, derives linear decision boundaries
- **Factor analysis and PCA**: Model data as a low-rank Gaussian plus noise
- **Variational autoencoders**: The encoder outputs parameters of a Gaussian, and the reparameterization trick samples from it

---

## Guided Problems

---

## References

1. Bishop, Christopher - *Pattern Recognition and Machine Learning*, Chapter 2.3
2. Murphy, Kevin - *Machine Learning: A Probabilistic Perspective*, Chapter 4
3. Deisenroth, Faisal, and Ong - [*Mathematics for Machine Learning*](https://mml-book.com/), Chapter 6.5
4. Rasmussen and Williams - [*Gaussian Processes for Machine Learning*](https://gaussianprocess.org/gpml/), Chapter 2
