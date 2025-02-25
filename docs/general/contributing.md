---
id: contributing
title: Contributing to the Polkadot Wiki
sidebar_label: Contributing to the Wiki
description: Contribute to the Polkadot Wiki.
keywords: [contributing, contributions, translations]
slug: ../contributing
---

The wiki was started and is maintained by the Web3 Foundation. It is an open-source project and aims
to be the most extensive knowledge resource on the Polkadot and Kusama ecosystems. Much of the
material currently focuses on Polkadot and Kusama directly, but is open to covering informational
material for community projects.

!!!caution "Marketing Material"
      Please do not try to pull request any marketing material as this will be rejected.

Nonetheless, pull requests, discussions, and contributions from the community are encouraged. Active community members who demonstrate a record of good contributions may be given `write` access to the repository.

Otherwise, the Web3 Foundation holds the administrative position and has the final say on the included content. Specifically, the foundation’s Technical Education team is most directly involved.

!!!note "Contributing Explainer"
      Check out the [How to Contribute to the Polkadot Wiki](https://www.youtube.com/watch?v=6i55KOcy7B0)
      video for steps on contributions.



## How to Contribute

You can contribute to the wiki on the
[w3f/polkadot-wiki GitHub repository](https://github.com/w3f/polkadot-wiki). Every page is a [MarkDown](https://guides.github.com/features/mastering-markdown/) file, which is an easy-to-learn syntax extension to plain text that makes creating links, rendering images, and nice-looking
formatting simple.

Each page has an "Edit this page" link at the bottom of the content. By clicking it, you are taken
to the GitHub sign-in page, where you can either log in or create an account.

Once logged in, you'll be taken to the GitHub built-in text editor, where you can make your edits
directly. When you've completed your changes, you can add any specific details on what was changed
and commit to a **new branch** to create a new Pull Request to the repository. From there, one of
the maintainers will review your changes and either merge them or request changes.

![contributing](../assets/contributing.png)
![creating-pull-request](../assets/creating-pull-request.png)

Remember that after you click "Propose Changes", you must also click on "Create Pull Request" on the next page.

![creating-pull-request-2](../assets/creating-pull-request-2.png)

## Ground Rules for Contributing

There are a few basic ground rules for contributors:

1. **No `--force` pushes** or modifying the Git history in any way.
2. Pull requests are preferred to issues, especially for small changes such as typos. Issues should
   be used for generic or broad-based changes or missing content. Suggestions and requests are
   encouraged.
3. Only use **non-master branches**.
4. **Significant modifications**, even by contributors, ought to be subject to a **pull request** to
   solicit feedback from other contributors.
5. Pull requests to solicit feedback are _encouraged_ for any other non-trivial contribution but
   left to the contributor’s discretion.
6. Contributors should adhere to the prevailing `MarkDown` style, language, and layout.
7. Correct grammar should be used at all times. Pull requests with typos will not be merged until
   fixed.
8. Care should be taken to remain as objective and informative as possible. There should be no
   editorializing, and external bias should not be present.
9. We use the Prettier plugin to standardize the style across documents. You can run this on your
   local copy with `npx lint-staged`, but for simplicity, we also have a bot that runs this for us
   in your PRs.

## Style Guides

!!!info "Wiki General Style Guides"
      The style guide from the [Substrate Knowledge Base](https://github.com/substrate-developer-hub/knowledgebase/blob/master/CONTRIBUTING.md#documentation-style) provides general guidelines about how to write your Wiki contribution. See also [the Wiki readme file](https://github.com/w3f/polkadot-wiki?tab=readme-ov-file#contributing-to-documentation).



The Polkadot Wiki is powered by [Docusaurus](https://docusaurus.io/). Docusaurus 3 was a major
version upgrade that caused [MDX errors](https://docusaurus.io/docs/3.2.1/migration/v3). As a general rule, avoid using curly brackets and special characters. If you must use them, for example, to get the \<-\> symbol, you can escape the error with a `\`.

Avoid using exclamation marks `!` and informal sentences, which are usually more appropriate for
blog posts. Running a grammar check before submitting your pull request for review can save
reviewers time and speed up the review process.

To ensure consistency across pages, note the following general terms:

- `relay chain` in text and `Relay chain` at the beginning of a sentence.
- `parachain` in text and `Parachain` at the beginning of a sentence.

The Polkadot Wiki has multiple moving parts. To ensure your contribution does not introduce
compilation errors and that your page is properly rendered in production, we encourage you to build
and render the Wiki on your local machine before submitting a pull request for review. Rendering the
Wiki locally also adds the benefit of checking for broken links.

### Render the Wiki Locally

The Polkadot Wiki is built from the source files in
[this GitHub repository](https://github.com/w3f/polkadot-wiki). The Wiki uses Algolia search, which
can be accessed locally by providing the correct App ID and API key. The `app_id` and `api_key`
environment variables are needed to build the Wiki successfully. If you are an external contributor,
set the variables with some values like shown below, which lets the Wiki repo build successfully
(but disables the search bar).

```bash
export app_id="xxxxxx" api_key="xxxxxxx"
```

After cloning the source locally, you can start the website with the commands below (ensure you run
`yarn` at the root of the repository first to install dependencies).

Using yarn, run:

```bash
yarn install
```

Then you can build the Wiki:

```bash
yarn polkadot:build
```

And finally, you can start the Wiki:

```bash
yarn polkadot:start
```

### Rendering On-chain Values

The Polkadot Wiki can render chain state values via RPC as shown
[here](https://github.com/w3f/polkadot-wiki/blob/master/components/RPC-Connection.jsx) and display
them directly in the docs without the need to recompile or even reload the web app. The rendering of
on-chain values is reserved only in the [Chain State page](chain-state-values.md).

See the example for a react component below:

```bash
<RPC network="polkadot" path="query.staking.validatorCount" defaultValue="400"/>
```

Where `network` can be set to `polkadot`, `kusama`, `statemint` (Polkadot Asset Hub), `statemine`
(Kusama Asset Hub), `polkadotpeople`, and `kusamapeople`. The `path` is composed by:

- `query` or `const`
- pallet and call

The example above shows the path to query the number of validators within the staking pallet. For
more information, see
[pallets and extrinsics](../learn/learn-transactions.md#pallets-and-extrinsics). The `defaultValue`
is the value the react component shows if there is an issue with fetching data on-chain. A
[`filter` flag](https://github.com/w3f/polkadot-wiki/blob/master/components/utilities/filters.js) is
also available to make values human readable, covert block number to days, etc.

## Heritage

This document is based on the
[Level contribution guidelines](https://github.com/Level/community/blob/master/CONTRIBUTING.md).
