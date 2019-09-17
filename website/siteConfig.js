/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/image.jpg'.
    image: '/img/undraw_open_source.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Polkadot Wiki', // Title for your website.
  tagline: 'The hub for those interested in learning, building, or running a node on the Polkadot protocol.',
  url: 'https://w3f.github.io', // Your website URL
  baseUrl: '/polkadot-wiki-i18n/',
  projectName: 'polkadot-wiki-i18n',
  organizationName: 'w3f',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'polkadot-build-index', label: 'Build'},
    {doc: 'polkadot-learn-index', label: 'Learn'},
    {doc: 'polkadot-node-index', label: 'Maintain'},
    { languages: true }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#E6007A',
    secondaryColor: '#000000',
  },

  /* Custom fonts for website */
  /*
    fonts: {
    myFont: [
    "Times New Roman",
    "Serif"
    ],
    myOtherFont: [
    "-apple-system",
    "system-ui"
    ]
    },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Web3 Foundation`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/paritytech/polkadot',
};

module.exports = siteConfig;
