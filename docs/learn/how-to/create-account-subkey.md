---
title: How to Create an Account in Subkey
description: "How to create a new Polkadot or Kusama account in Subkey."
---

!!!info "Related Wiki page"
    For the underlying concepts, see [Accounts (advanced)](../learn-account-advanced.md).

!!! warning "IMPORTANT"

    In this article you will learn how to create a new account in Subkey, which is meant for **advanced users**. If you want to know how to create an account **in the Polkadot browser extension** , please refer to [this article](create-polkadot-account.md).

### How to create a new account in Subkey

1\. If you don't have Rust and Cargo installed yet, you'll need to download the stable release using [these steps](https://doc.rust-lang.org/cargo/getting-started/installation.html).

2\. Next, open a terminal (Mac) or PowerShell (Windows) and enter the following two commands to install the dependencies and Subkey. The official guide is [here.](https://docs.substrate.io/reference/command-line-tools/subkey/)

curl https://getsubstrate.io -sSf | bash -s -- --fast
cargo install --force subkey --git https://github.com/paritytech/substrate

3\. Then, use the following command to generate an account.

subkey generate

The output should be something similar to this:

Secret phrase 'your seed phrase will appear here' is account:
Secret seed: 0xc8fa03532fb22ee1f7f6908b9c02b4e72483f0dbd66e4cd456b8f34c6230b849
Public key (hex): 0xd6a3105d6768e956e9e5d41050ac29843f98561410d3a47f9dd5b3b227ab8746
Public key (SS58): 5Gv8YYFu8H1btvmrJy9FjjAWfb99wrhV3uhPFoNEr918utyR
Account ID: 0xd6a3105d6768e956e9e5d41050ac29843f98561410d3a47f9dd5b3b227ab8746
SS58 Address: 5Gv8YYFu8H1btvmrJy9FjjAWfb99wrhV3uhPFoNEr918utyR

This is your new account! Make sure to [save your 12-word mnemonic phrase safely](store-mnemonic-safely.md). For more Subkey commands, please refer to [this guide](https://docs.substrate.io/reference/command-line-tools/subkey/).

* * *

If you are more of a visual learner, check this video guide:

[Create your Polkadot Account using Subkey](https://www.youtube.com/watch?v=SWfE_EwxgIU)

* * *
