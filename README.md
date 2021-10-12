[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](#LICENSE)
[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](https://www.markdownguide.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/general/contributing.md)
[![Polkadot Prod](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-polkadot-prod.yml/badge.svg)](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-polkadot-prod.yml)
[![Kusama Prod](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-kusama-prod.yml/badge.svg)](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-kusama-prod.yml)

| <a href="https://wiki.polkadot.network/" rel="some text">![Polkadot Wiki](docs/assets/polkadot-wiki.png)</a> | <a href="https://guide.kusama.network/" rel="some text">![Kusama Guide](docs/assets/kusama-guide.png)</a> |
| :----------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: |

# Polkadot Wiki

<img align="right" src="docs/assets/web3-logo.png" width="500" height="255">

<p align="left">
  The Polkadot Wiki is the central source of truth for Polkadot. It is a community-focused initiative led by Web3 Foundation to 
  keep an up-to-date resource on the best information for learning, building, or maintaining on Polkadot. 
</p>

## Contributing to Documentation

The Wiki is an open source project and we will review all issues and pull-requests created
in this repository. If you notice typos or grammatical errors, please feel free to create pull requests 
with these corrections directly. Larger contributions may start as issues to test the waters on the subject 
with the maintainers. It is generally preferable to create a pull request over an issue to propose a change 
to the Wiki content.

### Running Locally

Both the Polkadot Wiki and the Kusama Guide are built from the source files in this repository.
After cloning the source locally, you can start the websites with each of these respective commands
(ensure you run `yarn` at the root of the repository first to install dependencies):

> The site is built using Docusaurus: you may need to install Docusaurus before running
> the Wiki locally. Using yarn, run `yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest`.

#### Building
> The Wiki is currently being deployed onto IPFS and will follow the same configuration to build the static files.

- Run `yarn kusama:build`
- Run `yarn polkadot:build`

#### Running GitHub Pages

- Run `yarn kusama:publish-gh-pages`
- Run `yarn polkadot:publish-gh-pages`

#### Start

```zsh
# For the Polkadot Wiki:
yarn polkadot:start
# For the Kusama Guide:
yarn kusama:start
```
### Style Guide

Use the style guide from the
[Substrate Knowledge Base](https://github.com/substrate-developer-hub/knowledgebase/blob/master/CONTRIBUTING.md#documentation-style)

#### Formatting

Use [pretty-quick](https://prettier.io/docs/en/precommit.html#option-2-pretty-quickhttpsgithubcomazzpretty-quick)
as a pre-commit formatting tool.

There is an automatic `pretty-quick` check that occurs pre-commit to format
your changed/staged files.

To format markdown pages, run the following in the `docs` folder:

```bash
npx pretty-quick --staged
```

To run pretty on the whole project, `npx pretty-quick`.

### Static Site Generator

The Wiki's latest version uses the [Docusaurus](https://docusaurus.io/) static website
generator to convert the Markdown docs into a documentation website.

### Search Engine

[Algolia DocSearch](https://docsearch.algolia.com/) is the search engine that is used, which
is built into Docusaurus. Indexing via Algolia provides faster lookup; the actual configuration
for lookup is located in another repository that's maintained by Algolia DocSearch.

We have enabled searching on the Wiki by declaring the `algolia` section in the `siteConfig.js`
file in `scripts`, and defining an API key and index name that are provided by DocSearch.

```js
  algolia: {
    apiKey: "53c6a4ab0d77c0755375a971c9b7cc3d",
    indexName: "kusama_guide",
    algoliaOptions: {
      facetFilters: ["language:LANGUAGE"],
    }, // Optional, if provided by Algolia
  }
```

If you would like to access and modify this, you can re-submit the documentation url via
[DocSearch Program](https://docsearch.algolia.com/apply/), where they will send
a JavaScript snippet that you can re-integrate into the configuration, similar to the
one shown above.

### Automated Deployments

The Polkadot Wiki is built on the `gh-pages` branch and automatically deployed to GitHub Pages.
The Kusama Wiki is also deployed to GitHub Pages (via a separate repository).

Development servers exist at `https://staging.polkadot.network` and `https://staging.kusama.network`.
The servers will reflect the latest `master` commit or PR put up against the master branch by a member of the Technical Education team.
The latest version of `master` is staged and checked by the team. If all is well, the new commits on `master` are transferred into the production branch,`prod`, by rebasing `master` on `prod`. The CICD production workflow will deploy `prod` to the public sites:
[Polkadot Wiki](https://wiki.polkadot.network) and [Kusama Guide](https://guide.kusama.network), respectively.

### Mirror Pages

A limitation of Docusaurus is that pages can only be included in one sidebar at any given time.
Thus, our Kusama section will either hijack some content it shares with the rest of the Wiki or
lack that content.

To solve this, the repo mirrors some pages and includes them in additional sidebars. The `scripts`
folder contains a `mirror.js` script that creates a copy of the pages to duplicate across sidebars.
The new pages are prefixed with `mirror` and must first be declared in `mirror.js`, then added to
the relevant sidebar section. To run the script:

```bash
yarn mirror
```

> Note: This command runs when using `polkadot:start` or `kusama:start` development
> scripts, so you don't need to worry about running it manually if you start the development site
> with one of these commands.

### Conditional Rendering

The two Wikis support conditional rendering depending on which Wiki is being deployed. This is
useful for mirrored pages that have most content in common, but some minor differences. To use this
functionality, surround Kusama specific content with {{ kusama: :kusama }}, and polkadot specific
content with {{ polkadot: :polkadot }}. Example:

```md
If the treasury ends a budget period without spending all of its funds, it suffers a burn of a
percentage of its funds -- thereby causing deflationary pressure.
{{ polkadot: This percentage is currently at 1%
on Polkadot. :polkadot }} {{ kusama: This percentage is currently 0.2% on Kusama, with the amount currently going to
[Society](https://guide.kusama.network/docs/en/maintain-guides-society-kusama) rather than being
burned. :kusama }}
```

To test the resolution, run `polkadot:build` and `kusama:build`, then `polkadot:inject` and
`kusama:inject`, respectively.
Inspect the built files in the corresponding `build` folder under `website` or
`kusama-guide`.

## Internationalization

We are using Crowdin to manage all different translations. You can go to the
[project page](https://crowdin.com/project/polkadot-wiki) and select the language you would like to
translate to start.  
All translated content through Crowdin will regularly submit a pull request to this repository.

If you do not see the language you would like to translate, please let us know via Element.

## License

The Polkadot Wiki is licensed under the [GPL-3.0](LICENSE) free software license.

<p float="center">
  <img src="docs/assets/polkadot.gif" width="400" height="185"> 
  <img src="docs/assets/kusama.gif" width="400" height="185"> 
</p>
