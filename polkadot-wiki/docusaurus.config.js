const { baseUrlPattern } = require('../scripts/utils');
const { injectPlugin } = require('../scripts/injectPlugin');
const i18n = require('./i18n');

const isBuilding = process.env.BUILDING === 'true';
const isPublishing = process.env.PUBLISHING === 'true';

module.exports = {
  title: 'Polkadot Wiki',
  tagline: 'The hub for those interested in learning, building, or running a node on Polkadot.',
  titleDelimiter: '·',
  url: 'https://wiki.polkadot.network',
  baseUrl: '/',
  projectName: 'polkadot-wiki',
  organizationName: 'w3f',
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.js',
    'https://unpkg.com/aos@next/dist/aos.js',
    {
      src: 'https://unpkg.com/vanilla-back-to-top@7.2.1/dist/vanilla-back-to-top.min.js',
      onload: 'addBackToTop()',
      defer: true,
    },
    {
      src: 'https://apisa.web3.foundation/latest.js',
      async: true,
      defer: true,
    },
    '../js/custom.js',
    '../js/packaged/addressChanger.js',
    '../js/clipboard.min.js',
    '../js/copycode.js',
  ],
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css',
    'https://fonts.googleapis.com/css?family=Work+Sans:400,700&display=swap',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
    'https://unpkg.com/aos@next/dist/aos.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
  ],
  i18n,
  favicon: 'img/Polkadot_Favicon.png',
  trailingSlash: false,
  onBrokenLinks: 'log',
  onBrokenMarkdownLinks: 'log',
  onDuplicateRoutes: 'log',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          editUrl: ({ docPath }) =>
            `https://github.com/w3f/polkadot-wiki/edit/master/docs/${docPath}`,
          path: '../docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          remarkPlugins: [injectPlugin({ isPolkadot: true })],
        },
        theme: {
          customCss: [
            require.resolve('./static/css/custom.css'),
            require.resolve('./static/css/copycode.css'),
            require.resolve('./static/css/socicon.css'),
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
            to: '/',

            from: ['/en/latest', '/en/'],
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
      disableSwitch: true,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
    },
    announcementBar: {
      id: 'announcement',
      content: '<a target="_blank" href="https://decoded.polkadot.network/">POLKADOT DECODED June 29th-30th, 2022. Join 100+ talks, live streamed from 4 locations worldwide</a>',
      backgroundColor: '#E6007A',
      textColor: '#FFFFFF',
      isCloseable: false,
    },
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
    navbar: {
      logo: {
        src: 'img/Polkadot_Logo_Horizontal_Pink-Black.svg',
      },
      items: [
        {
          to: 'docs/getting-started',
          label: 'Get Started',
          position: 'right',
        },
        {
          to: 'docs/learn-launch',
          label: 'Learn',
          position: 'right',
        },
        {
          to: 'docs/build-index',
          label: 'Build',
          position: 'right',
        },
        {
          to: 'docs/maintain-index',
          label: 'Maintain ',
          position: 'right',
        },
        {
          href: 'https://guide.kusama.network',
          label: 'Kusama',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          to: 'docs/contributing',
          label: 'Contribute',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
          dropdownItemsAfter: [
            {
              to: 'https://crowdin.com/project/polkadot-wiki',
              label: 'Help us translate',
            },
          ],
        },
      ],
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Web3 Foundation`,
      logo: {
        src: 'img/Polkadot_Logo_Horizontal_White.svg',
      },
    },
    algolia: {
      appId: 'BEUYRRAUZN',
      apiKey: 'e472cf1f938eb8c46dd952ff22332538',
      indexName: 'polkadot',
      contextualSearch: true,
    },
    docsSideNavCollapsible: true,
  },
};
