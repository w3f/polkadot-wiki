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
</div>

<!-- TOC -->

- [Contributing to Documentation](#contributing-to-documentation)
- [Running Locally](#running-locally)
  - [Build](#build)
- [Style and Configuration Guide](#style-and-configuration-guide)
  - [Formatting](#formatting)
  - [Automation](#automation)
    - [Deployments](#deployments)
    - [GitHub Actions](#github-actions)
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

- Make sure `python` (Python 3.12) and `pip` are installed and in your path
- It's recommended to use a virtual environment, as is common practice
  
1. Enter a virtual environment:
```sh
# Create the env
python -m venv venv
# Enter the env
source venv/bin/activate
```

1. Install dependencies (make sure you're in the project's directory)
```sh
pip install -r requirements.txt
```

1. Once installed, run the serve command:
```sh
# If you're in a virtual env (set to false if you're not editing RPC commands, otherwise it will take time to load)
ENABLE_RPC=false mkdocs serve
# If you're not in a virtual env
python -m mkdocs build
```

### Build

🟣 Building the Polkadot Wiki:

```bash
# If you're in a virtual env (set to false if you're not editing RPC commands, otherwise it will take time to load)
ENABLE_RPC=false mkdocs build
# If you're not in a virtual env
python -m mkdocs build
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

### Automation

#### Deployments

The Polkadot Wiki is built in a CI job, where it is then deployed on Netlify. Each commit to master triggers a new build and subsequent deployment.

Pull request previews are enabled, meaning a temporary deployment via Netlify is generated per PR.

After these jobs are completed, the CICD production workflow will automatically deploy
`prod` to the public site: [Polkadot Wiki](https://wiki.polkadot.network).

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

## Internationalization

| ❗ The Wiki is currently being reorganized and updated. Work will resume on translations after the Wiki revamp is completed. |
| ---------------------------------------------------------------------------------------------------------------------------- |

## License

The Polkadot Wiki is licensed under the [GPL-3.0](LICENSE) free software license.