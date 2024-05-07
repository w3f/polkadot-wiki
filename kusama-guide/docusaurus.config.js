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
    'remark-docusaurus-tabs',
    [
      '@docusaurus/plugin-client-redirects',
      {
       redirects: [
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
            to: '/docs/learn-guides-assets-ledger',
            from: ['/docs/kusama-statemine-ledger']
          },
          {
            to: '/docs/learn-nominator',
            from: ['/docs/maintain-guides-how-to-nominate-polkadot']
          },
          {
            to: '/docs/learn-parachains',
            from: ['/docs/learn-parathreads']
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
          to: "docs/kusama-getting-started",
          label: "Docs",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
        {
          to: "docs/contributing",
          label: "Contribute",
          position: "right",
        },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsBefore: [],
          dropdownItemsAfter: [
            {
              to: "https://crowdin.com/project/polkadot-wiki",
              label: "Help us translate",
            },
          ],
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
    announcementBar: {
      id: "banner",
      content:
        'The Polkadot Blockchain Academy is coming to Asia! <a href="https://www.polkadot.network/development/academy/?utm_source=guide.kusama.network&utm_medium=referral&utm_campaign=pba%204%205&utm_content=notification" target="_blank" rel="noopener noreferrer">Find out more 👉</a>',
      backgroundColor: '#e6007a',
      textColor: 'white',
      isCloseable: true,
    },
  },
};
