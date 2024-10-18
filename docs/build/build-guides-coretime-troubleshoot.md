---
id: build-guides-coretime-troubleshoot
title: Coretime Troubleshooting FAQ
sidebar_label: Troubleshooting FAQ
description:
  FAQ on issues related to using coretime and testing/deploying parachains using Polkadot SDK
keywords: [coretime, blockspace, parathread, parachain, cores, coretime, agile]
slug: ../build-guides-coretime-troubleshoot
---

This page aims to cover and aggregate various resources that relate to troubleshooting common
problems when using the Polkadot SDK or deploying on a core.

## FAQ / Troubleshooting

### Why do I have to sync Paseo locally? Can't I just use a remote, trusted node and connect to that?

You can remotely connect to Paseo network via the `--relay-chain-rpc-urls` flag, which can be passed
to your node. Unfortunately, the caveat is you can't use this node for collation at this time -
meaning if you intend on being a collator/validator for your blockchain and intend to create blocks,
you need to sync the chain locally.

### My collator is not producing blocks

Check these sanity checklists:

- https://substrate.stackexchange.com/questions/178/how-can-i-get-my-parachain-to-produce-blocks-sanity-checklist
- https://substrate.stackexchange.com/questions/1394/our-parachain-doesnt-produce-blocks-checklist

### I want to run more than one collator, how do I do that?

Ideally, you would want to run these on separate machines/servers, but you could as long as you
ensure you can provide different RPC/WebSocket and P2P ports for each collator. You also may need to
sync a separate instance of Paseo for each collator on the same machine. You also will need to
choose the block production mechanism like
[Aura](https://substrate.stackexchange.com/questions/5572/production-like-parachain-setup-and-launch).

### Why do we only have one collator in the parachain guides on the Wiki? Isn't it better to have more?

Mostly for simplicity. If we have more than one collator, we would have to also spin it up, which
would be a hassle on a single machine (it is possible though). Of course, if you had an actual
network with multiple collators, it is assumed you'd have separate VPS/servers for each.

### Why are we registering parathreads and not parachains?

When registering a parachain on a relay chain, they are assigned a `ParaID`, and they are referred
to as Parathreads till they start producing blocks. _Parathreads_ are a bit of an outdated term now.
They refer to what are now known as on-demand parachains. Although they be references in various
places through PolkadotJS, docs, or other UIs, really we only have two types of parachain: on-demand
parachains, and parachains which use bulk coretime.
