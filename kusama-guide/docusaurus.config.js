const { markdown } = require("../polkadot-wiki/docusaurus.config");
const { injectPlugin } = require("../scripts/injectPlugin");
const i18n = require("./i18n");
const isPub = process.env.PUBLISHING === "true";

module.exports = {
  title: "Guide",
  titleDelimiter: "·",
  tagline: "One-stop-shop for Kusama information.",
  url: "https://guide.kusama.network",
  baseUrl: "/",
  projectName: isPub ? "kusama-guide-hosting" : "",
  organizationName: "w3f",
  trailingSlash: false,
  markdown: {
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],
  i18n,
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.js",
    {
      src: "https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js",
      onload: "addBackToTop()",
      defer: true,
    },
    {
      src: "https://apisa.kusama.network/latest.js",
      async: true,
      defer: true,
    },
    "../js/custom.js",
    "../js/clipboard.min.js",
    "../js/copycode.js",
  ],
  stylesheets: [
    "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css",
    "https://fonts.googleapis.com/css?family=Muli&display=swap",
  ],
  favicon: "img/Kusama_Canary_white.png",
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  onDuplicateRoutes: "log",

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          path: "../docs",
          sidebarPath: "./sidebars.js",
          remarkPlugins: [injectPlugin({ isPolkadot: false })],
        },
        theme: {
          customCss: [
            require.resolve("./static/css/custom.css"),
            require.resolve("./static/css/copycode.css"),
          ],
        },
      },
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/docs/learn-safrole',
            from: ['/docs/learn-sassafras']
          },
          {
            to: '/docs/learn-polkadot-opengov',
            from: ['/docs/learn-gov2', '/docs/learn-opengov']
          },
          {
            to: '/docs/learn-account-advanced',
            from: ['/docs/ens']
          },
          {
            to: '/docs/wallets-and-extensions',
            from: ['/docs/build-wallets']
          },
          {
            to: '/docs/polkadotjs',
            from: ['/docs/learn-polkadotjs']
          },
          {
            to: '/docs/bug-bounty',
            from: ['/docs/maintain-bug-bounty']
          },
          {
            to: '/docs/learn-guides-assets',
            from: ['/docs/kusama-statemine']
          },
          {
            to: '/docs/learn-guides-ledger',
            from: ['/docs/kusama-statemine-ledger', '/docs/learn-guides-assets-ledger']
          },
          {
            to: '/docs/learn-nominator',
            from: ['/docs/maintain-guides-how-to-nominate-polkadot']
          },
          {
            to: '/docs/learn-parachains',
            from: ['/docs/learn-parathreads']
          },
          {
            to: '/docs/learn-guides-claims',
            from: ['/docs/kusama-claims']
          },
          {
            to: '/docs/maintain-polkadot-parameters',
            from: ['/docs/kusama-parameters']
          },
          {
            to: '/docs/kusama-getting-started',
            from: ['/docs/kusama-index']
          },
          {
            to: '/docs/community',
            from: ['/docs/kusama-community']
          },
          {
            to: '/docs/learn-transactions',
            from: ['/docs/learn-transaction-fees']
          },
          {
            to: '/docs/learn-system-chains',
            from: ['/docs/learn-bridge-hub']
          },
        ],
        createRedirects: function (existingPath) {
          if (existingPath.startsWith('/docs/')) {
            return [existingPath.replace('/docs/', '/docs/en/')];
          }
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
    },
    prism: {
      additionalLanguages: ["rust"],
      theme: require("prism-react-renderer").themes.github,
    },
    /*
    announcementBar: {
      id: 'announcement',
      content: '<a target="_blank" href="https://decoded.polkadot.network/">POLKADOT DECODED June 29th-30th, 2022. Join 100+ talks, live streamed from 4 locations worldwide</a>',
      backgroundColor: '#FFFFFF',
      textColor: '#E6007A',
      isCloseable: false,
    },
    */
    navbar: {
      title: "Guide",
      logo: {
        src: "img/Kusama_logotype_white_large.png",
      },
      items: [
        {
          label: 'Docs',
          href: 'https://wiki.polkadot.network/docs/kusama-getting-started',
          target: '_blank',
          rel: 'noopener noreferrer',
          position: 'right', 
        },
        {
          type: "search",
          position: "right",
        },
        {
          label: 'Contribute',
          href: 'https://wiki.polkadot.network/docs/contributing',
          target: '_blank',
          rel: 'noopener noreferrer',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [],
      copyright: `© ${new Date().getFullYear()} Web3 Foundation`,
      logo: {
        src: "img/Kusama_Canary_white.png",
      },
    },
    algolia: {
      appId: process.env.app_id,
      apiKey: process.env.api_key,
      indexName: 'kusama_guide',
      contextualSearch: true,
    },
    /* Banner / Announcement bar */
    // announcementBar: {
    //   id: "banner",
    //   content:
    //     'The Web3 Summit is coming to Berlin this August! <a href="https://ti.to/web3-summit/web3-summit-2024" target="_blank" rel="noopener noreferrer">Get your ticket 👉</a>',
    //   backgroundColor: '#e6007a',
    //   textColor: 'white',
    //   isCloseable: true,
    // },
  },
};
