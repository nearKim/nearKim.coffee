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
              label: 'Linear Regression',
              collapsed: false,
              items: [
                'ml-codex/foundations/linear-regression/index',
                'ml-codex/foundations/linear-regression/problems',
                'ml-codex/foundations/linear-regression/implementation',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
