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
  - [Search Engine](#search-engine)
  - [Automation](#automation)
    - [Deployments](#deployments)
    - [GitHub Actions](#github-actions)
  - [Conditional Rendering](#conditional-rendering)
  - [Inline React Components](#inline-react-components)
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

[The Technical Education team](https://wiki.polkadot.network/docs/contributors) at Web3 Foundation
are the primary maintainers of the Wiki and will review all issues and pull requests created on this
repository. If you notice typos or grammatical errors, please feel free to create pull requests with
these corrections directly. Larger contributions may start as issues to test the waters on the
subject with the maintainers. It is generally preferable to create a pull request over an issue to
propose a change to the Wiki content.

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

The Wiki uses Algolia search, which can be accessed locally by providing the correct App ID and API
key. The `app_id` and `api_key` environment variables are needed for the Wiki to be built
successfully. If you are an external contributor, set the variables with some values like shown
below, which lets the Wiki repo build successfully (but disables the search bar).

```bash
export app_id="xxxxxx" api_key="xxxxxxx"
```

Using yarn, run:

```bash
yarn install
```

### Build

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

Prettier is automatically run when making a local commit. Verify that all changes render as expected
after making new commits by [running the projects locally](#start).

See the [Conditional Rendering](#conditional-rendering) and
[React Components](#inline-react-components) sections for additional details regarding how to
properly format syntax for elements outside of the standard markdown library.

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

### Automation

#### Deployments

The Polkadot Wiki is built on the `gh-pages` branch and automatically deployed to GitHub Pages. The
Kusama Wiki is also deployed to GitHub Pages (via a separate repository).

Development servers exist at `https://staging.polkadot.network` and
`https://staging.kusama.network`. The servers will reflect the latest `master` commit or PR put up
against the master branch by a member of the Technical Education team. A staging environment can be
generated to reflect a specific branch by invoking the `workflow_dispatch` command via the GitHub UI
and can then be reviewed by the team before proceeding to production. If all is well, the new
commits on `master` are transferred into the production branch,`prod`, by rebasing `master` on
`prod`. This is completed automatically every 24 hours or manually through a `workflow_dispatch`
command. After these jobs are completed, the CICD production workflow will automatically deploy
`prod` to the public sites: [Polkadot Wiki](https://wiki.polkadot.network) and
[Kusama Guide](https://guide.kusama.network), respectively.

#### GitHub Actions

| Job                                                                                                                       | Description                                                                                                                                                                                                       | Frequency                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Audit Images](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/audit-images.yml)                       | Searches for unreferenced images in the docs repository and archives them into `/docs/assets/_legacy`.                                                                                                            | Monthly or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/audit-images.yml)         |
| [Audit Links](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/audit-links.yml)                         | Test all links in the docs for broken references and opens a new issue displaying results if any are found.                                                                                                       | Monthly or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/audit-links.yml)          |
| [Code QL Analysis](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/codeql-analysis.yml)                | Tests for vulnerabilities across the codebase                                                                                                                                                                     | Weekly, Push to `master` or Pull Request to `master`                                                            |
| [Dependabot]()                                                                                                            | Helps keep packages up-to-date with latest release.                                                                                                                                                               | Daily                                                                                                           |
| [Deploy Kusama Prod](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/deploy-kusama-prod.yml)           | Deploy Kusama docs to [GitHub Pages](https://w3f.github.io/kusama-guide-hosting) (production).                                                                                                                    | Daily or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-kusama-prod.yml)     |
| [Deploy Kusama Staging](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/deploy-kusama-staging.yml)     | Deploy Kusama docs to [staging environment](https://staging.kusama.network).                                                                                                                                      | [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-kusama-staging.yml)           |
| [Deploy Polkadot Prod](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/deploy-polkadot-prod.yml)       | Deploy Polkadot docs to [GitHub Pages](https://w3f.github.io/polkadot-wiki) (production).                                                                                                                         | Daily or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-polkadot-prod.yml)   |
| [Deploy Polkadot Staging](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/deploy-polkadot-staging.yml) | Deploy Polkadot docs to [staging environment](https://staging.polkadot.network).                                                                                                                                  | [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/deploy-polkadot-staging.yml)         |
| [Generate PDF](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/generate-pdf.yml)                       | Generate a PDF for the docs and upload it to the static website.                                                                                                                                                  | Disabled Manually                                                                                               |
| [Greetings](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/greetings.yml)                             | Greet first time contributors.                                                                                                                                                                                    | First Time Pull Request or Issue Creation                                                                       |
| [Jest Testing Coverage](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/jest-testing-coverage.yml)     | Run a series of [Jest tests](https://github.com/w3f/polkadot-wiki/tree/master/tests) related to React functionality.                                                                                              | Weekly or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/jest-testing-coverage.yml) |
| [Pages and Build Deployment](https://github.com/w3f/polkadot-wiki/actions/workflows/pages/pages-build-deployment)         | Deploy Polkadot docs prod branch from GH Pages to public site. (This was originally setup through the [GitHub settings menu](https://github.com/w3f/polkadot-wiki/settings/pages), prior to GitHub Actions flows) | On Push to `gh-pages` branch                                                                                    |
| [Prettier All](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/prettier-all.yml)                       | Run prettier over all docs to maintain styling standards.                                                                                                                                                         | Weekly or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/prettier-all.yml)          |
| [Status Badges](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/status-badges.yml)                     | Update the commit history of various [open source projects](https://github.com/w3f/polkadot-wiki/blob/master/docs/build/build-open-source.md) in the ecosystem.                                                   | Weekly or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/status-badges.yml)         |

### Conditional Rendering

The Polkadot Wiki does not support conditional rendering. If needed, use `Tabs` and `TabItem` to
display values for Polkadot and Kusama.

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
lean and comprehensive. It is also important to verify prettier has not modified the formatting of
your component after making a commit.

## Internationalization

| ❗ The Wiki is currently being reorganized and updated. Work will resume on translations after the Wiki revamp is completed. |
| ---------------------------------------------------------------------------------------------------------------------------- |

## License

The Polkadot Wiki is licensed under the [GPL-3.0](LICENSE) free software license.
