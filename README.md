[![CircleCI](https://circleci.com/gh/w3f/polkadot-wiki.svg?style=svg)](https://circleci.com/gh/w3f/polkadot-wiki)

# Polkadot Wiki

The Polkadot Wiki is the central source of truth for Polkadot. It is a community-focused initiative
led by the Web3 Foundation to keep an up-to-date resource on the best information for building on
Polkadot, learning about Polkadot, or maintaining a node on Polkadot.

## Contributing to Documentation

The Wiki is a community-focused initiative and we will review all pull-requests and issues created
in this repository. If you notice typos or grammatical errors, please feel free to directly create
pull requests with these corrections. Larger contributions may start as issues to test the waters on
the subject with the maintainers. It is generally preferable to create a pull request over an issue
to propose a change to the wiki content.

### Running Locally

Both the Polkadot Wiki and the Kusama Guide are built from the source files in this repository.
After cloning the source locally, you can start the websites with each of these respective commands
(ensure you run `yarn` at the root of the repository first to install dependencies):

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

Use [Prettier](https://prettier.io/) to format markdown pages. To run Prettier on the `docs` folder,
run:

```bash
npx prettier --write ./docs/
```

### Automated Deployments

The wiki is automatically deployed to GitHub Pages via the CircleCI job on each new commit to the
master branch. The Kusama guide is also deployed to GitHub Pages (via a separate repository). Both
websites are also uploaded to IPFS via GitHub actions.

### Dynamic Value Inserts

This documentation sometimes makes references to on-chain values that may change over time. For
example, it might reference the current number of validators. A custom script exists to populate
these values post-build. To avoid conflicts in source files, the replacement is done on **built**
files, not the MD files. The value placeholders are defined in
[scripts/inject-dict.json](scripts/inject-dict.json). The placeholders should be included in text
surrounded by double curly braces, like so: `{{ num_validators }}`.

To use the replace script:

```bash
# For Polkadot Wiki
yarn polkadot:inject
# For Kusama Guide
yarn kusama:inject
```

This will read the dictionary and do the replacements for the respective website.

It is recommended to use the dry run option when adding new values and templates in, to make sure
they resolve to values first and don't throw query errors. To use dry run (no replace, just output
of templates and their resolved potential replacements), use the `--dry` or `-d` flag:

```bash
yarn polkadot:inject --dry
```

The script defaults to the websocket URL `wss://kusama-rpc.polkadot.io/`. To change to another URL
or to connect to a local node, use the `--node/-n` flag:

```bash
yarn polkadot:inject -n ws://localhost:9944
```

> Note: make sure you're running an archive node if you're querying into the past!

See other available options by using the `help` command.

```bash
yarn polkadot:inject help
```

The templates to replace in the text take the following format:

```json
  {
    "tpl": "tip_deposit_amount",
    "default": { "kusama": 0.166, "polkadot": 1 },
    "path": "consts.treasury.tipReportDepositBase",
    "filters": ["humanReadableToken"]
  },
```

- `tpl` is the template you want replaced in the text, it should be placed between `{{ }}` curly
  braces.
- `default` is either a literal value or an object with chain-specific defaults.
- `path` is the query to run on the chain
- `computed` is a value that should be set to `true` is the value does not need a `path`. Computed
  properties are exported from `computed.js`.
- `filters` is an array of filters to apply on the value after it's been fetched (does not apply to
  defaults). Filters are defined in `applyFilters` or `inject.js`.

To test the injection, run `polkadot:build` and `kusama:build`, then `polkadot:inject` and
`kusama:inject`. Inspect the built files in the corresponding `build` folder under `website` or
`kusama-guide`.

### Conditional Rendering

The two wikis support conditional rendering depending on which wiki is being deployed. This is
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
`kusama:inject`. Inspect the built files in the corresponding `build` folder under `website` or
`kusama-guide`.

### Mirror pages

A limitation of Docusaurus is that pages can only be included in one sidebar at any given time.
Thus, our Kusama section will either hijack some content it shares with the rest of the wiki, or
lack that content.

To solve this, the repo mirrors some pages and includes them in additional sidebars. The `scripts`
folder contains a `mirror.js` script that creates a copy of the pages to duplicate across sidebars.
The new pages are prefixed with `mirror`, and first need to be declared in `mirror.js` and added to
the relevant sidebar section. To run the script:

```bash
yarn mirror
```

> Note: This command runs automatically when using `polkadot:start` or `kusama:start` development
> scripts, so you don't need to worry about running it manually if you start the development site
> with one of these commands.

## Internationalization

We are using Crowdin to manage all different translations. You can go to the
[project page](https://crowdin.com/project/polkadot-wiki) and select the language you would like to
translate to start.  
All translated content through Crowdin will regularly submit a pull request to this repository.

If you do not see the language you would like to translate, please let us know via Riot.

## License

The Polkadot Wiki is licensed under the GPL-3.0 free software license.
