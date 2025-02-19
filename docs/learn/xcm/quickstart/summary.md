---
id: learn-xcm-docs-quickstart-summary
title: Quickstart
sidebar_label: Summary
description: Summary of the Chapter.
keywords: [xcm, cross-consensus messaging]
slug: ../quickstart-summary
---

# Quickstart

The XCM code can be found in
[polkadot repository](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm).

## Rust & Cargo

A pre-requisite for using XCM is to have a stable Rust version and Cargo installed. Here's an
[installation guide](https://docs.polkadot.com/develop/parachains/install-polkadot-sdk/).

## Running the Examples

All examples in the documentation are located in the
[repository](https://github.com/paritytech/xcm-docs/tree/main/examples). Follow these steps to run
the `first-look` example. First clone the repository:

```shell
git clone git@github.com:paritytech/xcm-docs.git
cd xcm-docs/examples
```

To run the first-look example, run the following line:

```shell
cargo test -p xcm-examples para_a_simple_transfer -- --nocapture
```

It should show you the following output:

```shell
running 1 test
test first_look::tests::para_a_simple_transfer ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 1 filtered out; finished in 0.01s
```
