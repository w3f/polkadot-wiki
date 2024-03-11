const { injectPlugin } = require("../scripts/injectPlugin");
const i18n = require("./i18n");

module.exports = {
  title: "Polkadot Wiki",
  tagline: "The hub for those interested in learning, building, or running a node on Polkadot.",
  titleDelimiter: "·",
  url: "https://wiki.polkadot.network",
  baseUrl: "/",
  projectName: "polkadot-wiki",
  organizationName: "w3f",
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.js",
    "https://unpkg.com/aos@next/dist/aos.js",
    {
      src: "https://apisa.polkadot.network/latest.js",
      async: true,
      defer: true,
    },
    "../js/custom.js",
    "../js/clipboard.min.js",
    "../js/copycode.js",
  ],
  stylesheets: [
    "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css",
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
    "https://unpkg.com/aos@next/dist/aos.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
  ],
  i18n,
  favicon: "img/Polkadot_Favicon.png",
  trailingSlash: false,
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  onDuplicateRoutes: "log",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          editUrl: ({ docPath }) =>
            `https://github.com/w3f/polkadot-wiki/edit/master/docs/${docPath}`,
          path: "../docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "docs",
          remarkPlugins: [injectPlugin({ isPolkadot: true })],
        },
        theme: {
          customCss: [
            require.resolve("./static/css/custom.css"),
            require.resolve("./static/css/copycode.css"),
            require.resolve("./static/css/socicon.css"),
          ],
        },
      },
    ],
  ],
  plugins: [
    "remark-docusaurus-tabs",
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/",
            from: ["/en/latest", "/en/"],
          },
          {
            to: '/docs/learn-xcm',
            from: ['/docs/learn-crosschain', '/docs/learn-cross-consensus']
          },
          {
            to: '/docs/learn-parachains',
            from: ['/docs/learn-security']
          },
          {
            to: '/docs/learn-account-advanced',
            from: ['/docs/learn-account-transfer', '/docs/ens']
          },
          {
            to: '/docs/learn-cryptography',
            from: ['/docs/learn-keys', '/docs/learn-randomness']
          },
          {
            to: '/docs/learn-staking-advanced',
            from: ['/docs/learn-simple-payouts', '/docs/learn-staking-miner']
          },
          {
            to: '/docs/learn-polkadot-opengov',
            from: ['/docs/learn-gov2', '/docs/learn-opengov']
          },
          {
            to: '/docs/wallets-and-extensions',
            from: ['/docs/build-wallets', '/docs/wallets']
          },
          {
            to: '/docs/learn-system-chains',
            from: ['/docs/learn-common-goods']
          },
          {
            to: '/docs/maintain-guides-how-to-validate-polkadot',
            from: ['/docs/maintain-guides-how-to-use-polkadot-validator-setup', '/docs/maintain-guides-how-to-setup-a-validator-with-reverse-proxy']
          },
          {
            to: '/docs/ledger',
            from: ['/docs/learn-ledger']
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
            to: '/docs/learn-staking',
            from: ['/docs/learn-staking-faq']
          },
          {
            to: '/docs/learn-guides-assets-create',
            from: ['/docs/learn-statemint', '/docs/learn-assets-guides']
          },
          {
            to: '/docs/learn-comparisons-kusama',
            from: ['/docs/learn-kusama-vs-polkadot']
          },
          {
            to: '/docs/build-guide',
            from: ['/docs/build-build-with-polkadot']
          },
          {
            to: '/docs/learn-parachains-protocol',
            from: ['/docs/learn-availability']
          },
          {
            to: '/docs/learn-polkadot-opengov-origins',
            from: ['/docs/maintain-guides-opengov']
          },
          {
            to: '/docs/learn-guides-staking',
            from: ['/docs/learn-staking-guides']
          },
          {
            to: '/docs/learn-guides-identity',
            from: ['/docs/learn-identity-guides']
          },
          {
            to: '/docs/learn-guides-vault',
            from: ['/docs/learn-vault-guides']
          },
          {
            to: '/docs/staking-apps',
            from: ['/docs/learn-staking-apps']
          },
          {
            to: '/docs/learn-polkadot-opengov-origins',
            from: ['/docs/maintain-guides-polkadot-opengov']
          },
          {
            to: '/docs/learn-accounts',
            from: ['/docs/learn-account-generation', '/docs/learn-account-restore', '/docs/learn-accounts-index']
          },
          {
            to: '/docs/learn-transactions',
            from: ['/docs/learn-transactions-index', '/docs/learn-extrinsics', '/docs/learn-balance-transfers']
          },
          {
            to: '/docs/alpha-program',
            from: ['/docs/builders-program']
          }
        ],
        createRedirects: function (existingPath) {
          if (existingPath.startsWith("/docs/")) {
            return [existingPath.replace("/docs/", "/docs/en/")];
          }
        },
      },
    ],
  ],
  themeConfig: {
    colorMode: {
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
      backgroundColor: '#E6007A',
      textColor: '#FFFFFF',
      isCloseable: false,
    },
    */
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: "bottom",
    },
    navbar: {
      logo: {
        src: "img/Polkadot_Logo_Horizontal_Pink-Black.svg",
      },
      items: [
        {
          to: "docs/explore-index",
          label: "Explore",
          position: "right",
        },
        {
          to: "docs/learn-index",
          label: "Learn",
          position: "right",
        },
        {
          to: "docs/build-guide",
          label: "Build",
          position: "right",
        },
        {
          to: "docs/maintain-index",
          label: "Maintain ",
          position: "right",
        },
        {
          href: "https://guide.kusama.network",
          label: "Kusama",
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
      copyright: `© ${new Date().getFullYear()} Web3 Foundation`,
      logo: {
        src: "img/Polkadot_Logo_Horizontal_White.svg",
      },
    },
    algolia: {
      appId: process.env.app_id,
      apiKey: process.env.api_key,
      indexName: "polkadot",
      contextualSearch: true,
    },
    docsSideNavCollapsible: true,
    /* Banner / Announcement bar */
    announcementBar: {
      id: "banner",
      content:
        'The Polkadot Blockchain Academy is coming to Asia! <a href="https://www.polkadot.network/development/academy/?utm_source=wiki.polkadot.network&utm_medium=referral&utm_campaign=pba%204%205&utm_content=notification" target="_blank" rel="noopener noreferrer">Find out more 👉</a>',
      backgroundColor: '#e6007a',
      textColor: 'white',
      isCloseable: true,
    },
    image: 'img/og-polkadot.png'
  },
};

