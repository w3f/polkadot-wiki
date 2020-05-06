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
master branch.

### Dynamic Value Inserts

This documentation sometimes makes references to on-chain values that may change over time. For
example, it might reference the current number of validators. A custom script exists to populate
these values post-build. To avoid conflicts in source files, the replacement is done on **built**
files, not the MD files. The value placeholders are defined in
[website/inject-dict.json](website/inject-dict.json). The placeholders should be included in text
surrounded by double curly braces, like so: `{{ num_validators }}`.

To use the replace script:

```bash
cd website
node inject.js
```

This will read the dictionary and do the replacements.

It is recommended to use the dry run option when adding new values and templates in, to make sure
they resolve to values first and don't throw query errors. To use dry run (no replace, just output
of templates and their resolved potential replacements), use the `--dry` or `-d` flag:

```bash
node inject.js --dry
```

The script defaults to the websocket URL `wss://kusama-rpc.polkadot.io/`. To change to another URL
or to connect to a local node, use the `--node/-n` flag:

```bash
node inject.js -n ws:localhost:9944
```

> Note: make sure you're running an archive node if you're querying into the past!

See other available options by using the `help` command.

```bash
node inject.js help
```

### Mirror pages

A limitation of Docusaurus is that pages can only be included in one sidebar at any given time.
Thus, our Kusama section will either hijack some content it shares with the rest of the wiki, or
lack that content.

To solve this, the repo mirrors some pages and includes them in additional sidebars. The `website`
folder contains a `mirror.js` script that creates a copy of the pages to duplicate across sidebars.
The new pages are prefixed with `mirror`, and first need to be declared in `mirror.js` and added to
the relevant sidebar section. To run the script:

```bash
node mirror.js
```

## Internationalization

We are using Crowdin to manage all different translations. You can go to the
[project page](https://crowdin.com/project/polkadot-wiki) and select the language you would like to
translate to start.  
All translated content through Crowdin will regularly submit a pull request to this repository.

If you do not see the language you would like to translate, please let us know via Riot.

## License

The Polkadot Wiki is licensed under the GPL-3.0 free software license.
