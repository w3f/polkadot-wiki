---
id: maintain-guides-how-to-validate-kusama
title: Run a Validator (Kusama)
sidebar_label: How to run a Validator on Kusama
description: The fundamentals for running a Kusama validator.
keywords: [validate, validator, kusama, stake, maintain]
slug: ../../maintain-guides-how-to-validate-kusama
---

Running a validator on the Kusama network is identical to running a Polkadot validator. Check out
the [Polkadot guide](../maintain-guides-how-to-validate-polkadot.md) on how to setup a validator.

Make sure to adjust the Polkadot guide to run a Kusama network validator:

1. When starting the node pass `--chain=kusama` CLI flag:

```sh
./target/release/polkadot --pruning=archive --chain kusama
```

2. Similar to Polkadot network Kusama has its own token called KSM
