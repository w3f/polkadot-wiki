const siteConfig = {
  title: 'Polkadot Wiki', // Title for your website.
  tagline: 'The hub for those interested in learning, building, or running a node on the Polkadot protocol.',
  url: 'https://wiki.polkadot.network', // Your website URL
  baseUrl: '/',
  projectName: 'polkadot-wiki',
  organizationName: 'w3f',
  cname: 'wiki.polkadot.network',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'build-index', label: 'Build'},
    {doc: 'learn-index', label: 'Learn'},
    {doc: 'maintain-index', label: 'Maintain'},
    { languages: true }
  ],

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
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://wiki.polkadot.network/js/load.js',
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  
  // No .html extensions for paths.
  cleanUrl: true,

  // For sites with a sizable amount of content, set collapsible to true.
  // Expand/collapse the links and subcategories under categories.
  docsSideNavCollapsible: true,

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  editUrl: 'https://github.com/w3f/polkadot-wiki/edit/master/docs/',

  translationRecruitingLink: 'https://crowdin.com/project/polkadot-wiki',

  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },

  repoUrl: 'https://github.com/paritytech/polkadot',
};

module.exports = siteConfig;
