<p align="center">
<img align="center" src="https://user-images.githubusercontent.com/25497083/148661419-419ad5b3-1b9f-480a-b723-3f292616730c.png" width="200">
</p>

<div align="Center">
<h1>Polkadot Wiki</h1>
<h3> The Source of Truth for Polkadot </h3>
<br>
  
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](#LICENSE)
[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](https://www.markdownguide.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/general/contributing.md)
[![Polkadot Prod](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-polkadot-prod.yml/badge.svg)](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-polkadot-prod.yml)
[![Kusama Prod](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-kusama-prod.yml/badge.svg)](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-kusama-prod.yml)
</div>

<!-- TOC -->

- [Contributing to Documentation](#contributing-to-documentation)
- [Running Locally](#running-locally)
  - [Build](#build)
  - [Start](#start)
  - [Publish](#publish)
- [Style and Configuration Guide](#style-and-configuration-guide)
  - [Formatting](#formatting)
  - [Static Site Generator](#static-site-generator)
  - [Search Engine](#search-engine)
  - [Automated Deployments](#automated-deployments)
  - [Conditional Rendering](#conditional-rendering)
- [Internationalization](#internationalization)
- [License](#license)
<!-- /TOC -->

---

<img align="right" src="https://user-images.githubusercontent.com/25497083/147788625-14e67f76-c53c-4992-8e84-d23cd78e88bd.png" width="250">

<p align="left">
  The Polkadot Wiki is the central source of truth for Polkadot. It is a community-focused initiative led by 
  Web3 Foundation to keep an up-to-date resource on the best information for learning, building, or maintaining 
  on Polkadot. 
</p>

## Contributing to Documentation

The Technical Education team at Web3 Foundation are the primary maintainers of the Wiki and will
review all issues and pull requests created in this repository. If you notice typos or grammatical
errors, please feel free to create pull requests with these corrections directly. Larger
contributions may start as issues to test the waters on the subject with the maintainers. It is
generally preferable to create a pull request over an issue to propose a change to the Wiki content.

:sparkles: **_The Wiki belongs to the community, help generate its identity._** :sparkles:

https://user-images.githubusercontent.com/25497083/146822391-5c52a64a-dc2e-4583-9746-109191db5271.mp4

> :inbox_tray: There will be an upcoming initiative that will promote and encourage contributions
> towards Polkadot-based content and documentation. In the meantime, feel free to share any ideas or
> feedback you may have for the Wiki by opening a
> [Feature Request issue](https://github.com/w3f/polkadot-wiki/issues/new/choose).

**Keep engaged by checking out these common
[Polkadot ecosystem resources](https://hackmd.io/IMgniwlyT_GIqjI8Wui35A)**.

## Running Locally

Both the Polkadot Wiki and the Kusama Guide are built from the source files in this repository.
After cloning the source locally, you can start the websites with each of these respective commands
(ensure you run `yarn` at the root of the repository first to install dependencies).

Using yarn, run:

```bash
yarn install
```

> The site is built using Docusaurus: you may need to install Docusaurus before running the Wiki
> locally.

```bash
yarn upgrade @docusaurus/core@latest @docusaurus/preset-classic@latest
```

### Build

> The Wiki is currently in the process of being deployed onto IPFS and will follow the same
> configuration to build the static files.

:bird: Building the Kusama Guide:

```bash
yarn kusama:build
```

🟣 Building the Polkadot Wiki:

```bash
yarn polkadot:build
```

### Start

:bird: Starting the Kusama Guide:

```bash
yarn kusama:start
```

🟣 Starting the Polkadot Wiki:

```bash
yarn polkadot:start
```

### Test

✅❌ Running tests locally:

```bash
yarn polkadot:test

or

yarn kusama:test
```

There is no need to run both as the tests are unified.

### Publish

:bird: Publishing the Kusama Guide:

```bash
yarn kusama:publish-gh-pages
```

🟣 Publishing the Polkadot Wiki:

```bash
yarn polkadot:publish-gh-pages
```

## Style and Configuration Guide

Use the style guide from the
[Substrate Knowledge Base](https://github.com/substrate-developer-hub/knowledgebase/blob/master/CONTRIBUTING.md#documentation-style)

### Formatting

Prettier should be run on all modified docs when submitting a new PR.

To format markdown pages, run the following in the `docs` folder:

```bash
# Run on entire project
npm pretty-quick
# Run only on staged changes
npx pretty-quick --staged
# Run only on local changes
npx pretty-quick --branch
```

### Static Site Generator

The Wiki's latest version uses the [Docusaurus](https://docusaurus.io/) static website generator to
convert the Markdown docs into a documentation website.

### Search Engine

[Algolia DocSearch](https://docsearch.algolia.com/) is the search engine that is used, which is
built into Docusaurus. Indexing via Algolia provides faster lookup; the actual configuration for
lookup is located in another repository that Algolia DocSearch maintains.

We have enabled searching on the Wiki by declaring the `algolia` section in the `siteConfig.js` file
in `scripts`, and defining an API key and index name that are provided by DocSearch.

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
[DocSearch Program](https://docsearch.algolia.com/apply/), where they will send a JavaScript snippet
that you can re-integrate into the configuration, similar to the one shown above.

### Automated Deployments

The Polkadot Wiki is built on the `gh-pages` branch and automatically deployed to GitHub Pages. The
Kusama Wiki is also deployed to GitHub Pages (via a separate repository).

Development servers exist at `https://staging.polkadot.network` and
`https://staging.kusama.network`. The servers will reflect the latest `master` commit or PR put up
against the master branch by a member of the Technical Education team. The latest version of
`master` is staged and checked by the team. If all is well, the new commits on `master` are
transferred into the production branch,`prod`, by rebasing `master` on `prod`. The CICD production
workflow will deploy `prod` to the public sites: [Polkadot Wiki](https://wiki.polkadot.network) and
[Kusama Guide](https://guide.kusama.network), respectively.

### Conditional Rendering

The two Wikis support conditional rendering depending on which Wiki is being deployed. This is
useful for mirrored pages with most content in common but have minor differences. To use this
functionality, surround Kusama specific content with {{ kusama: :kusama }}, and polkadot specific
content with {{ polkadot: :polkadot }}. Example:

```md
If the treasury ends a budget period without spending all of its funds, it suffers a burn of a
percentage of its funds -- thereby causing deflationary pressure.
{{ polkadot: This percentage is currently at 1%
on Polkadot. :polkadot }}{{ kusama: This percentage is currently 0.2% on Kusama, with the amount currently
going to [Society](https://guide.kusama.network/docs/en/maintain-guides-society-kusama) rather than being
burned. :kusama }}
```

To verify the appropriate values have been substituted in each scenario, run `polkadot:start` and
`kusama:start` in separate terminals. If prompted with
`[WARNING] Something is already running on port 3000. Would you like to run the app on another port instead?`,
proceed with `yes`. This will likely launch one project on port 3000 and the other on 3001, allowing
you to compare the rendered outputs for both projects locally and simultaneously.

### Inline React Components

Occasionally you may require additional functionality that is outside of the scope of basic
markdown. React components can be used inline in existing markdown documents as a solution, allowing
you to render custom elements. This is currently the strategy used to
[retrieve live on-chain values](https://github.com/w3f/polkadot-wiki/blob/master/components/RPC-Connection.jsx)
and display them directly in the docs without the need to recompile or even reload the web app using
RPCs.

If you are looking to invoke and embed data from 3rd party APIs or sources, checkout the
[Http-Request-Sample component](https://github.com/w3f/polkadot-wiki/blob/master/components/Http-Request-Sample.jsx).
A full list of sample components can be found
[here](https://github.com/w3f/polkadot-wiki/tree/master/components).

Try and reuse existing components as much as possible instead of creating new ones to keep the code
lean and comprehensive. It is also important to run prettier after adding a new component,
validating that the desired rendering format is not altered based on the formatting changes. Below
are some best practices for achieving common formatting that will not be modified by the prettier
command:

Always wrap RPC components in conditional rendering & keep them on newlines:

```
{{ polkadot: <RPC network="polkadot" path="query.staking.validatorCount" defaultValue={297}/> :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.validatorCount" defaultValue={297}/> :kusama }}
```

To add grammar without added spacing, place the grammar inside the conditional brackets:

```
The validator count followed by a period is
{{ polkadot: <RPC network="polkadot" path="query.staking.validatorCount" defaultValue={297}/>. :polkadot }}
{{ kusama: <RPC network="kusama" path="query.staking.validatorCount" defaultValue={297}/>. :kusama }}

The validator count in parentheses is
{{ polkadot: (<RPC network="polkadot" path="query.staking.validatorCount" defaultValue={297}/>) :polkadot }}
{{ kusama: (<RPC network="kusama" path="query.staking.validatorCount" defaultValue={297}/>) :kusama }}
```

Failing to follow this schema can results in unexpected formatting, such as added line-breaks or
spacing, especially after running prettier.

## Internationalization

| ❗ Currently the Wiki is being reorgnaized and updated. It is recommended to resume working on translations after the Wiki revamp is completed. |
| ----------------------------------------------------------------------------------------------------------------- |

We are using Crowdin to manage all different translations. You can go to the
[project page](https://crowdin.com/project/polkadot-wiki) and select the language you would like to
translate to start.  
All translated content through Crowdin will regularly submit a pull request to this repository.

If you do not see the language you would like to translate in, please let us know via Matrix.

## License

The Polkadot Wiki is licensed under the [GPL-3.0](LICENSE) free software license.
