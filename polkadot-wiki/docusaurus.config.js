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
            from: ['/docs/learn-account-transfer']
          },
          {
            to: '/docs/learn-cryptography',
            from: ['/docs/learn-keys']
          },
          {
            to: '/docs/learn-staking-advanced',
            from: ['/docs/learn-simple-payouts']
          },
          {
            to: '/docs/learn-account-generation',
            from: ['/docs/learn-account-restore']
          },
          {
            to: '/docs/learn-opengov',
            from: ['/docs/learn-gov2']
          },
          {
            to: '/docs/wallets',
            from: ['/docs/build-wallets']
          },
          {
            to: '/docs/learn-system-chains',
            from: ['/docs/learn-common-goods']
          },
          {
            to: '/docs/learn-launch',
            from: ['/docs/claims']
          },
          {
            to: '/docs/learn-redenomination',
            from: ['/docs/redenomination']
          },
          {
            to: '/docs/learn-account-advanced',
            from: ['/docs/ens']
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
      theme: require("prism-react-renderer/themes/github"),
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
          to: "docs/getting-started",
          label: "Get Started",
          position: "right",
        },
        {
          to: "docs/learn-launch",
          label: "Learn",
          position: "right",
        },
        {
          to: "docs/build-index",
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
      appId: "BEUYRRAUZN",
      apiKey: "e472cf1f938eb8c46dd952ff22332538",
      indexName: "polkadot",
      contextualSearch: true,
    },
    docsSideNavCollapsible: true,
    /* Banner / Announcement bar */
    // announcementBar: {
    //   id: "banner",
    //   content:
    //     '<b>Sub0 is coming to Lisbon!</b> Join the Polkadot developer conference, November 28th-29th 👉 <a href="https://sub0.polkadot.network/?utm_source=wiki.polkadot.network&utm_medium=referral&utm_campaign=sub0%202022&utm_content=notification%20banner%20wiki" target="_blank" rel="noopener nofollow noreferrer">SIGN UP</a>',
    //   backgroundColor: '#e6007a',
    //   textColor: 'white',
    //   isCloseable: true,
    // },
  },
};
