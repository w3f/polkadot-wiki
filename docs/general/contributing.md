---
id: contributing
title: Contributing to the Polkadot Wiki
sidebar_label: Contributing to the Wiki
description: Contribute to the Polkadot Wiki.
keywords: [contributing, contributions, translations]
slug: ../contributing
---

The wiki was started and is maintained by [the Web3 Foundation Technical Education Team](./contributors.md). It is an open-source project and aims
to be the most extensive knowledge resource on the Polkadot and Kusama ecosystems. Much of the
material currently focuses on Polkadot and Kusama directly, but is open to covering informational
material for community projects.

!!!caution "Marketing Material"
      Please do not try to pull request any marketing material as this will be rejected.

Nonetheless, pull requests, discussions, and contributions from the community are encouraged. Active community members who demonstrate a record of good contributions may be given `write` access to the repository.

Otherwise, the Web3 Foundation holds the administrative position and has the final say on the included content. Specifically, the foundation’s Technical Education team is most directly involved.

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

The Polkadot Wiki is powered by [MkDocs](https://www.mkdocs.org/) using [the MkDocs Material template](https://squidfunk.github.io/mkdocs-material/).

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

!!!info "Run the Wiki Locally"
      For more information about how to run the Wiki locally on your machine visit [the README file on GitHub](https://github.com/w3f/polkadot-wiki/blob/master/README.md).
      
This document is based on the [Level contribution guidelines](https://github.com/Level/community/blob/master/CONTRIBUTING.md).
