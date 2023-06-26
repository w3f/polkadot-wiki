---
id: learn-guides-polkadot-opengov
title: Polkadot OpenGov How-to Guides
sidebar_label: Polkadot OpenGov
description: Advanced How-to Guides about Polkadot OpenGov.
keywords: [opengov, preimage, whitelist, fellowship]
slug: ../learn-guides-polkadot-opengov
---

:::info Polkadot OpenGov

Visit the [dedicated page about OpenGov](./learn-polkadot-opengov.md) to learn more about it.

:::

## Submitting Whitelisted Proposals

Let's take the example that you would like to increase the active validator count to 1000.

- You [submit a preimage](../maintain/maintain-guides-opengov.md#submitting-a-preimage) with the
  call that sets the number of validators to 1000. Note that the call must be of the form
  `whitelist.dispatchWhitelistedCallWhithPreimage(call)`. Failing to do so will result in your
  whitelisted call being rejected.
- You could directly submit this to Root track or go through the whitelisting process with the
  Technical Fellowship. If whitelisted, your proposal will take less time to be voted on and enacted
  than choosing the Root track.
- If you go through the fellowship, you will need to provide them with the preimage and hash details
  of the call for your proposal.
- Someone from the fellowship will create a fellowship referendum to whitelist that call, and it
  will be voted on by the fellowship members only.
- Once the call is whitelisted, you can
  [submit a referenda proposal](../maintain/maintain-guides-opengov.md#submitting-a-proposal) with
  whitelist origin.
- The public now votes on the referendum after placing a decision deposit.
- Once passed, it gets enacted successfully as the call has been whitelisted.

Note that you can also submit the public referendum while the fellowship is voting on the fellowship
referendum to whitelist your call. This comes with the risk that if the fellowship declines to
whitelist the call, you must submit it directly to the Root origin.
