---
title: Contributing to the Polkadot Wiki
description: Learn how to contribute to the Polkadot Wiki and help expand its knowledge base.
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

## Polkadot Wiki Style Guide

!!!info "Wiki General Style Guides"
    See also [the Wiki README - Contributing to Documentation](https://github.com/w3f/polkadot-wiki?tab=readme-ov-file#contributing-to-documentation).

This style guide provides editorial guidelines for anyone writing documentation for the Polkadot Wiki. It is based and inspired in principle on the Google Developer Documentation Style Guide, adapted to fit the specific needs and terminology of the Polkadot ecosystem, with a focus on **creating static, long-lasting content.**


The Polkadot Wiki is powered by [MkDocs](https://www.mkdocs.org/) using [the MkDocs Material template](https://squidfunk.github.io/mkdocs-material/).

The Polkadot Wiki has multiple moving parts. To ensure your contribution does not introduce
compilation errors and that your page is properly rendered in production, we encourage you to build
and render the Wiki on your local machine before submitting a pull request for review. Rendering the
Wiki locally also adds the benefit of checking for broken links.

!!!info "Run the Wiki Locally"
      For more information about how to run the Wiki locally on your machine, visit [the README file on GitHub](https://github.com/w3f/polkadot-wiki/blob/master/README.md#running-locally).

### General Guidelines

The overarching theme is to ensure that the Polkadot Wiki's content is long-lasting, adheres to the guidelines, minimizes maintenance, and continues to have a high-quality standard.

#### Avoid informal language

Avoid using exclamation marks `!` and informal sentences, which are usually more appropriate for blog posts.

#### Grammar and consistency

Running a grammar check before submitting your pull request for review can save reviewers time and speed up the review process.

To ensure consistency across pages, note the following general terms:
- `relay chain` in text and `Relay chain` at the beginning of a sentence.
- `parachain` in text and `Parachain` at the beginning of a sentence.

#### Clarity

Prioritize clear, concise, and direct language. Assume the reader has a basic understanding of blockchain concepts but may be new to Polkadot.  
- **Example:** Instead of: "The utilization of a multi-chain architecture enables the facilitation of diverse transactional modalities."  
  
- Write: "Polkadot's heterogeneous, multi-chain design allows different types of transactions to be submitted on the network."  

#### Longevity

The Polkadot Wiki should only contain features live in production, on the Polkadot relay chain. It should not allude to any feature on test networks or Kusama. **Document features and information *only* when they are live and available on the Polkadot mainnet.** Exclude information about features that are only available on Kusama, Westend, or other testnets. 

- **Example:** Do not include a section on a new XCM feature if it is only live on Kusama. Only document it once it is available on Polkadot Mainnet.  

Prioritize information that is expected to remain relevant for an extended period. Avoid language that quickly becomes outdated.

- **Example:** Instead of: "The upcoming upgrade will introduce new governance features."  
- Write: "Polkadot governance allows token holders to participate in decision-making." (This describes the general function, not a specific, time-sensitive upgrade)  

#### Accuracy

Ensure all information is technically accurate and up-to-date. The Polkadot ecosystem evolves rapidly, so meticulous attention to detail is crucial.  

#### Consistency

Maintain a consistent style and terminology throughout all documentation. This creates a professional and cohesive experience for the reader.  
- **Example:** Always use the term "parachain" and not "parallel chain" or "para-chain."  

### Voice and tone

Present information in a neutral and objective tone, avoiding hype or marketing language.  

- **Example:** Instead of: "Polkadot is the most revolutionary blockchain technology..."
- Write: "Polkadot is a network that enables interoperability between different blockchains."

#### Voice

Use a confident and authoritative voice, but avoid being overly formal or academic. An active voice should be used, versus a passive voice, to make the documentation more direct and engaging.  

- **Example (formal):** "It is imperative to note that the aforementioned process..."  
- **Write (concise):** "Note that the process..."  
- **Example (passive):** "The Relay Chain is secured by validators."  
- **Write (active):** "Validators secure the Relay Chain."

#### Tone

Aim for a friendly, helpful, and approachable tone. Imagine you are a knowledgeable guide helping someone navigate the Polkadot ecosystem.  

- **Example:** Instead of: "The user must execute the following commands..."  
- Write: "You can use the following commands..."  

Part of this can be accomplished via using the second-person tense when the user/reader is referred to. Use the second person ("you") to address the reader directly and make the documentation more engaging.  

- **Example:** "To create a parachain, you need to..."  

#### Tense

- Use the present tense whenever possible to describe how Polkadot works on mainnet.  
  - **Example:** "Validators secure the Polkadot network."  
- Use the past tense to describe specific events that have already occurred on mainnet.  
  - **Example:** "The first parachain auctions on Polkadot concluded in 2021."  
- Avoid future tense and speculative language about features that are not yet live on Polkadot mainnet.  
  - **Example:** Instead of: "Parachains will connect to the Relay Chain in the future."  
  - Write: "Parachains connect to the Relay Chain." (Only if this is true on Polkadot Mainnet)

