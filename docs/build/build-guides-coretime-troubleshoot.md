---
id: build-guides-coretime-troubleshoot
title: Troubleshooting
sidebar_label: Troubleshooting
description: Introduction to the Polkadot SDK
keywords: [coretime, blockspace, parathread, parachain, cores, coretime, agile]
slug: ../build-guides-coretime-troubleshoot
---

This page aims to cover and aggregate various resources that relate to troubleshooting common
problems when using the Polkadot SDK or deploying on a core.

## FAQ / Troubleshooting

### Why do I have to sync Rococo locally? Can't I just use a remote, trusted node and connect to that?

**A:** You can actually, via the `--relay-chain-rpc-urls` flag, which can be passed to your
collator. Unfortunately, the caveat is you can't use this for collation at this time - meaning if
you intend on being a collator/validator for your blockchain and intend to create blocks, you need
to sync locally.

---

### Is there a faster way to sync Rococo? Why not warp sync?

**A:** Warp sync is currently not possible on Rococo or Westend.
[See this answer for more context.](https://substrate.stackexchange.com/questions/9730/rococo-cant-warp-sync-stuck-at-16mb-finality-proof-download)

---

### My collator is not producing blocks

**A:** Check these sanity checklists:

- https://substrate.stackexchange.com/questions/178/how-can-i-get-my-parachain-to-produce-blocks-sanity-checklist
- https://substrate.stackexchange.com/questions/1394/our-parachain-doesnt-produce-blocks-checklist

---

### I want to run more than one collator, how do I do that?\*\*

**A:** Ideally, you would want to run these on seperate machines/servers, but you could as long as
you ensure you can provide different RPC/WebSocket and P2P ports for each collator. You also may
need to sync a seperate instance of Rococo for each collator on the same machine.

---

### Why do we only have one collator? Isn't it better to have more?

**A:** Mostly for simplicity. If we have more than one collator, we would have to also spin it up,
which would be a hassle on a single machine (it is possible though). Of course, if you had an actual
network with multiple collators, it is assumed you'd have seperate VPS/servers for each.

---

### Why are we registering parathreads and not parachains?

**A:** _Parathreads_ are a bit of an outdated term by now. They refer to what are now known as
on-demand parachains. Although they be references in various places through PolkadotJS, docs, or
other UIs, really we only have two types of parachain: on-demand parachains, and parachains which
use bulk coretime.

---

### What is a good amount to put as the `max_amount` for my on-demand assignment?

**A:** todo
