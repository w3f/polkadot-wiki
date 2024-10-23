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
    {
      src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
      async: true,
      'data-website-id': 'f4bbad14-cc24-471c-8b7d-3267eafc6dc2',
      'data-project-name': 'Polkadot',
      'data-modal-title': 'Polkadot AI Chatbot',
      'data-project-color': '#1E1E1E',
      'data-button-bg-color': '#1C0533',
      'data-button-text-color': 'white',
      'data-project-logo': 'https://1000logos.net/wp-content/uploads/2022/08/Polkadot-Symbol.png',
      'data-modal-header-bg-color': '#1C0533',
      'data-modal-title-color': 'white',
      'data-modal-disclaimer': 'This is an AI chatbot trained to answer questions about Polkadot. As such, the answers it provides might not always be accurate or up-to-date. Please use your best judgement when evaluating its responses. Also, **please refrain from sharing any personal or private information with the bot**. By submitting a query, you agree that you have read and understood [these conditions](https://polkadot.network/legal-disclosures/). \n\n **If you need further assistance, you can reach out to [Polkadot Support](https://support.polkadot.network/support/tickets/new?ticket_form=i_have_a_support_request).**',
      'data-modal-example-questions': 'Where can I store my DOT?,How can I create a DOT account?,How can I stake my DOT?,How does Polkadot OpenGov work?',
      'data-search-mode-enabled': 'false',
      'data-search-mode-default': 'false',
      'data-button-position-top': '120px',
      'data-button-position-right': '0px',
      'data-search-include-source-names': '["Polkadot Wiki"]',
    },
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
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: '/docs/learn-safrole',
            from: ['/docs/learn-sassafras']
          },
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
            to: '/docs/learn-guides-assets',
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
            from: ['/docs/learn-transactions-index', '/docs/learn-extrinsics', '/docs/learn-balance-transfers', '/docs/learn-transaction-fees']
          },
          {
            to: '/docs/alpha-program',
            from: ['/docs/builders-program']
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
            to: '/docs/learn-offenses',
            from: ['/docs/maintain-guides-avoid-slashing']
          },
          {
            to: '/docs/learn-guides-ledger',
            from: ['/docs/learn-guides-assets-ledger']
          },
          {
            to: '/docs/learn-system-chains',
            from: ['/docs/learn-bridge-hub']
          },
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
        src: "img/wiki-logo.svg",
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
          to: "docs/kusama-getting-started",
          label: "Kusama",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Web3 Foundation`,
      logo: {
        src: "img/wiki-logo-2.svg",
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
    // announcementBar: {
    //   id: "banner",
    //   content:
    //     'The Web3 Summit is coming to Berlin this August! <a href="https://ti.to/web3-summit/web3-summit-2024" target="_blank" rel="noopener noreferrer">Get your ticket 👉</a>',
    //   backgroundColor: '#e6007a',
    //   textColor: 'white',
    //   isCloseable: true,
    // },
    image: 'img/og-polkadot-wiki.png'
  },
};