import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Machine Learning Codex',
      collapsed: false,
      items: [
        'ml-codex/index',
        {
          type: 'category',
          label: 'Mathematical Foundations',
          collapsed: false,
          items: [
            {
              type: 'category',
              label: 'Linear Algebra',
              collapsed: false,
              items: [
                'ml-codex/foundations/linear-algebra/index',
                {
                  type: 'category',
                  label: 'Section 1: Core Linear System Theory',
                  collapsed: true,
                  items: [
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/index',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/vector-spaces-overview',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/vector-spaces-deepdive',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/linear-transformations-overview',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/linear-transformations-deepdive',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/matrix-operations-overview',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/matrix-operations-deepdive',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/problems',
                    'ml-codex/foundations/linear-algebra/core-linear-system-theory/implementation',
                  ],
                },
                {
                  type: 'category',
                  label: 'Section 2: Spectral Theory',
                  collapsed: true,
                  items: [
                    'ml-codex/foundations/linear-algebra/spectral-theory/index',
                    'ml-codex/foundations/linear-algebra/spectral-theory/eigenvalues-overview',
                    'ml-codex/foundations/linear-algebra/spectral-theory/eigenvalues-deepdive',
                    'ml-codex/foundations/linear-algebra/spectral-theory/decompositions-overview',
                    'ml-codex/foundations/linear-algebra/spectral-theory/decompositions-deepdive',
                    'ml-codex/foundations/linear-algebra/spectral-theory/problems',
                    'ml-codex/foundations/linear-algebra/spectral-theory/implementation',
                  ],
                },
                {
                  type: 'category',
                  label: 'Section 3: Geometric & Optimization',
                  collapsed: true,
                  items: [
                    'ml-codex/foundations/linear-algebra/geometric-optimization/index',
                    'ml-codex/foundations/linear-algebra/geometric-optimization/orthogonality-overview',
                    'ml-codex/foundations/linear-algebra/geometric-optimization/orthogonality-deepdive',
                    'ml-codex/foundations/linear-algebra/geometric-optimization/optimization-overview',
                    'ml-codex/foundations/linear-algebra/geometric-optimization/optimization-deepdive',
                    'ml-codex/foundations/linear-algebra/geometric-optimization/problems',
                    'ml-codex/foundations/linear-algebra/geometric-optimization/implementation',
                  ],
                },
                {
                  type: 'category',
                  label: 'Section 4: Computational Methods',
                  collapsed: true,
                  items: [
                    'ml-codex/foundations/linear-algebra/computational-methods/index',
                    'ml-codex/foundations/linear-algebra/computational-methods/numerical-methods-overview',
                    'ml-codex/foundations/linear-algebra/computational-methods/numerical-methods-deepdive',
                    'ml-codex/foundations/linear-algebra/computational-methods/linear-programming-overview',
                    'ml-codex/foundations/linear-algebra/computational-methods/linear-programming-deepdive',
                    'ml-codex/foundations/linear-algebra/computational-methods/problems',
                    'ml-codex/foundations/linear-algebra/computational-methods/implementation',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
