import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkObsidianCallout from 'remark-obsidian-callout';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * The notes under docs/ are written but not published yet. Flip this to true to
 * put them back on the site; nothing else needs to change. While it is false the
 * docs plugin is never registered, so those pages generate no routes and stay out
 * of the sitemap entirely.
 */
const PUBLISH_NOTES = false;

const notesOptions = {
  sidebarPath: './sidebars.ts',
  // Authoring scaffold, not content
  exclude: ['**/template/**'],
  // Math rendering support
  remarkPlugins: [remarkMath, remarkObsidianCallout],
  rehypePlugins: [rehypeKatex],
  editUrl: 'https://github.com/nearKim/nearkim.coffee/tree/main/docs/',
};

const config: Config = {
  title: 'In Keun Kim',
  tagline: 'M.S. Student, Computer Science · Columbia University',
  favicon: 'img/favicon/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://nearKim.coffee',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nearKim', // Usually your GitHub org/user name.
  projectName: 'nearkim.coffee', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  // KaTeX stylesheet for math rendering
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: PUBLISH_NOTES ? notesOptions : false,
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Math rendering support for blog
          remarkPlugins: [remarkMath, remarkObsidianCallout],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/nearKim/nearkim.coffee/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'In Keun Kim',
      logo: {
        alt: 'In Keun Kim',
        src: 'img/logo/logo-white.png',
        srcDark: 'img/logo/logo-white-line.png',
      },
      // Empty on purpose: the sidebar already carries CV, GitHub, and the rest.
      items: [],
    },
    footer: {
      style: 'light',
      copyright: `© ${new Date().getFullYear()} In Keun Kim`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
