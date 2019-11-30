const {Plugin: Embed} = require('remarkable-embed');
const networkData  = require('./networkData.json');

// Our custom remarkable plugin factory.
const createVariableInjectionPlugin = variables => {
  // `let` binding used to initialize the `Embed` plugin only once for efficiency.
  // See `if` statement below.
  let initializedPlugin;

  const embed = new Embed();
  embed.register({
    // Call the render method to process the corresponding variable with
    // the passed Remarkable instance.
    // -> the Markdown markup in the variable will be converted to HTML.
    inject: key => initializedPlugin.render(variables[key])
  });

  return (md, options) => {
    if (!initializedPlugin) {
      initializedPlugin = {
        render: md.render.bind(md),
        hook: embed.hook(md, options)
      };
    }

    return initializedPlugin.hook;
  };
};

const siteConfig = {
  title: 'Polkadot Wiki', // Title for your website.
  tagline: 'The hub for those interested in learning, building, or running a node on Polkadot.',
  url: 'https://wiki.polkadot.network', // Your website URL
  baseUrl: '/',
  projectName: 'polkadot-wiki',
  organizationName: 'w3f',
  cname: 'wiki.polkadot.network',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'build-index', label: 'Build'},
    {doc: 'learn-introduction', label: 'Learn'},
    {doc: 'maintain-index', label: 'Maintain'},
    { search: true },
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

  algolia: {
    apiKey: '8bfa06b56bb8f33e5698c7f40b00b38f',
    indexName: 'polkadot',
    algoliaOptions: {} // Optional, if provided by Algolia
  },

  /* Custom fonts for website */
  fonts: {
    myFont: [
    'Muli',
    'sans-serif',
    ],
  },

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
    'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.js',
  ],

  stylesheets: [
    'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css',
    'https://fonts.googleapis.com/css?family=Muli&display=swap',
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

  markdownPlugins: [
    (md) => {
      md.use(require('remarkable-katex'));
    },
  ],

  editUrl: 'https://github.com/w3f/polkadot-wiki/edit/master/docs/',

  translationRecruitingLink: 'https://crowdin.com/project/polkadot-wiki',

  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100,
  },

  repoUrl: 'https://github.com/paritytech/polkadot',

  markdownPlugins: [
      createVariableInjectionPlugin(networkData)
  ],
};

module.exports = siteConfig;
