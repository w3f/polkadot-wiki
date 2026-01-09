<p align="center">
<img align="center" src="./docs/assets/logo/polkadot_logo_dark.png" width="200">
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
  - [Formatting](#formatting)
  - [Vale - Writing Style Linter](#vale---writing-style-linter)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Configuration](#configuration)
    - [Adding Custom Terms](#adding-custom-terms)
  - [Automation](#automation)
    - [Deployments](#deployments)
    - [GitHub Actions](#github-actions)
  - [Conditional Rendering](#conditional-rendering)
  - [Mkdocs Macros](#mkdocs-macros)
    - [RPC Macro Example](#rpc-macro-example)
- [Internationalization](#internationalization)
- [License](#license)
<!-- /TOC -->

---

<img align="right" src="https://user-images.githubusercontent.com/25497083/147788625-14e67f76-c53c-4992-8e84-d23cd78e88bd.png" width="50">

<p align="left">
  The Polkadot Wiki is the central source of truth for Polkadot. It is a community-focused initiative led by 
  Web3 Foundation to keep an up-to-date resource on the best information for learning, building, or maintaining 
  on Polkadot. 
</p>

## Contributing to Documentation

[The Technical Education team](https://wiki.polkadot.com/general/contributors/) at Web3 Foundation
are the primary maintainers of the Wiki and will review all issues and pull requests created on this
repository. If you notice typos or grammatical errors, please feel free to create pull requests with
these corrections directly. Larger contributions may start as issues to test the waters on the
subject with the maintainers. It is generally preferable to create a pull request over an issue to
propose a change to the Wiki content.

Learn more about [contributing](https://wiki.polkadot.com/general/contributing/).

## Running Locally

- Make sure `python` (Python 3.12+), `pip` and `mkdocs` are installed and configured in your path
- It's recommended to use a virtual environment, as is common practice
- Ensure you are in the `polkadot-wiki` directory

1. Install dependencies 
    ```sh
    pip install -r requirements.txt
    ```

2. Once installed, run the serve command:
    ```sh
    # Set ENABLE_RPC to true if you plan to work with RPC macros
    ENABLE_RPC=false mkdocs serve
    ```

### Build

🟣 Building the Polkadot Wiki:

```bash
# Set ENABLE_RPC to true if you plan to work with RPC macros
ENABLE_RPC=false mkdocs build
```

### Formatting

See the [Conditional Rendering](#conditional-rendering) and
[Mkdocs Macros](#mkdocs-macros) sections for additional details regarding how to
properly format syntax for elements outside of the standard markdown library.

### Vale - Writing Style Linter

Vale is configured to help maintain consistent writing style across the Wiki. It uses Google style guidelines along with Polkadot-specific terminology and rules.

#### Installation

Install Vale via your package manager or download from [GitHub releases](https://github.com/errata-ai/vale/releases):

```bash
# macOS (using Homebrew)
brew install vale

# Linux/Windows - Download from releases or use package manager
```

#### Usage

Run Vale on specific files or directories:

```bash
# Check a single file
vale docs/general/contributing.md

# Check all markdown files in docs directory
vale docs/

# Check all files (respects .vale.ini configuration)
vale .
```

#### Configuration

The Wiki's Vale configuration (`.vale.ini`) includes:
- **Google Style Guide** rules for general writing quality
- **Polkadot-specific vocabulary** and terminology
- **Custom rules** for acronyms, contractions, and Polkadot ecosystem terms
- **Industry vocabulary** for blockchain and technical terms

#### Adding Custom Terms

To add new accepted terms to the vocabulary:
1. Edit `.github/styles/config/vocabularies/Polkadot/accept.txt` for Polkadot-specific terms
2. Edit `.github/styles/config/vocabularies/Industry/accept.txt` for general blockchain terms

### Automation

#### Deployments

The Polkadot Wiki is built in a CI job, where it is then deployed on Netlify. Each commit to master triggers a new build and production deployment.

Pull request previews are enabled, meaning a temporary deployment via Netlify is generated for each PR.

After these jobs are successfully completed, the CICD production workflow will automatically deploy
`prod` to the public site when the PR is merged to master: [Polkadot Wiki](https://wiki.polkadot.network).

#### GitHub Actions

| Job                                                                                                                       | Description                                                                                                                                                                                                       | Frequency                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Audit Links](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/audit-links.yml)                         | Test all links in the docs for broken references and opens a new issue displaying results if any are found.                                                                                                       | Monthly or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/audit-links.yml)          |
| [Code QL Analysis](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/codeql.yml)                | Tests for vulnerabilities across the codebase                                                                                                                                                                     | Weekly, Push to `master` or Pull Request to `master`                                                            |
| [Dependabot](https://github.com/w3f/polkadot-wiki/blob/master/.github/dependabot.yml)                                                                                                            | Helps keep packages up-to-date with latest release.                                                                                                                                                               | Daily                                                                                                           |
| [Build and Deploy to Netlify](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/preview.yml)         | Builds and deploys the site to Netlify. If it is a PR, it generates a preview. If it is a push to master, it will deploy on the production URL.                                                                            |
| [Status Badges](https://github.com/w3f/polkadot-wiki/blob/master/.github/workflows/status-badges.yml)                     | Update the commit history of various [open source projects](https://github.com/w3f/polkadot-wiki/blob/master/docs/build/build-open-source.md) in the ecosystem.                                                   | Weekly or [Workflow Dispatch](https://github.com/w3f/polkadot-wiki/actions/workflows/status-badges.yml)         |

### Conditional Rendering

The Polkadot Wiki does not support conditional rendering. If needed, represent multiple chains (i.e, Polkadot and Kusama) using the tab layout specified here on the[ Mkdocs Material documentation](https://squidfunk.github.io/mkdocs-material/reference/content-tabs/#usage).

### Mkdocs Macros

Mkdocs macros allow the use of Jinja2 templates and custom Python functions to allow for custom data fetching and rendering within Mkdocs. All current macros can be found in: [`macros/`](./macros/). 

#### RPC Macro Example

For example, the `rpc` macro can be used in the following manner, with each field representing the input for the function signature respectively.

1. `rpc` macro function signature:

```py
def rpc(network, module, call, default_value, is_constant=False, readable="")
```

2. Example Usage:

```md
## Number of Nominators
{{ rpc("polkadot", "Staking", "CounterForNominators", 36793, is_constant=false) }}
```

3. Different types of readable, depending on usage and network: 
    * Percentage
    * Human Readable / Human Readable Kusama (rounds to nearest 100)
    * Blocks to days (converts blocks to days)
    * Precise DOT / KSM (returns an unrounded number with full precision)

| ---------------------------------------------------------------------------------------------------------------------------- |

## License

The Polkadot Wiki is licensed under the [GPL-3.0](LICENSE) free software license.
