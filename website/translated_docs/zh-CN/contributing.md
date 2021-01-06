---
id: contributing
title: 参与贡献
sidebar_label: 参与贡献
---

The wiki was started and is maintained by the Web3 Foundation. It is an open source project and aims to be the most extensive resource of knowledge on Polkadot and the Polkadot ecosystem. A large part of the material currently focuses on Polkadot directly but it is not opposed to covering informational material for community projects. Please do not try to pull request any marketing material as this will be rejected.

Pull requests, discussions, and contributions from the community are encouraged. Active community members who demonstrate a record of good contributions may be given write access to the repository. Otherwise, Web3 Foundation holds the administrative position and final say on the content that is included. Specifically the Technical Education team at the foundation are most directly involved.

> There is video guide on how to contribute to the wiki [here](https://www.youtube.com/watch?v=6i55KOcy7B0).

## 如何参与贡献

Contributing to the wiki is easy with a GitHub account. Every page is a MarkDown file, which is a [very easy to learn](https://guides.github.com/features/mastering-markdown/) syntax extension to plain text that makes creating links, rendering images, and nice-looking formatting simple.

Each page has an "Edit" button in the top right corner of the content. By clicking this button you are taken to the GitHub sign in page, where you can either log in or create an account.

![](assets/edit_button.png)

Once logged in, you'll be taken to the GitHub text editor in which you can make your edits directly. When you've completed your changes, you can add any specific details on what was changed and commit to a new branch to create a new Pull Request to the repository. From there one of the maintainers will either merge it in or request changes very soon.

![](assets/contributing.png) ![](assets/creating-pull-request.png)

Remember that after you click "Propose Changes", you must also click on "Create Pull Request" on the next page.

![](assets/creating-pull-request-2.png)

## 规则

There are a few basic ground-rules for contributors:

1. **没有` --force ` pushes **或以任何方式修改 Git 历史记录。
2. 对于某些问题，尤其是对于诸如错别字之类的较小更改，优先使用 Pull requests。 问题适用于一般或广泛的更改或内容缺少。
3. Only use **non-master branches**.
4. **Significant modifications**, even by contributors, ought to be subject to a **pull request** to solicit feedback from other contributors.
5. 对于任何其不是非常重要的贡献，_鼓励_ Pull requests，但由贡献者自行决定。
6. Contributors should attempt to adhere to the prevailing MarkDown style, language, and layout.
7. 应使用正确的语法。带有错别字的 Pull requests 的请求在修复之前不会合并。
8. 应注意保持尽可能客观和有益的信息。不应故意编造 ，也不应存在外部偏见。
9. We use a plugin called Prettier to standardize the style across documents. You can run this on your local copy with `npx run prettier --save`, but for simplicity we also have a bot which runs this for us in your PRs.

## Heritage

This document was based on the Level contribution guidelines located here: [https://github.com/Level/community/blob/master/CONTRIBUTING.md](https://github.com/Level/community/blob/master/CONTRIBUTING.md)
