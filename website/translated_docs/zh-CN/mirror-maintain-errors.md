---
id: mirror-maintain-errors
title: Errors and How to Resolve Them
sidebar_label: Resolving Errors
---

Errors in Substrate-based chains are usually accompanied by descriptive messages. However, to read these messages, a tool parsing the blockchain data needs to request _chain metadata_ from a node. That metadata explains how to read the messages. One such tool with a built-in parser for chain metadata is the [Polkadot JS Apps UI](https://polkadot.js.org/apps).

## PolkadotJS Apps Explorer

Here's how to find out the detailed error description through Polkadot JS Apps.

A typical failed transactions looks something like this:

![Error while sending a transaction](/img/errors/01.jpg)

The image displays only the error name as defined in the code, not its error message. Despite this error being rather self-explanatory, let's find its details.

In the [explorer tab](https://polkadot.js.org/apps/#/explorer), find the block in which this failure occured. Then, expand the `system.ExtrinsicFailed` frame:

![Error described](/img/errors/02.jpg)

Notice how the `details` field contains a human-readable description of the error. Most errors will have this, if looked up this way.

[This block](https://polkadot.js.org/apps/#/explorer/query/0xa10104ed21dfe409c7871a975155766c5dd97e1e2ac7faf3c90f1f8dca89104b) is a live example of the above.

If you cannot look up the error this way, or there is no message in the `details` field, consult the table below.

## Common Errors

The table below lists the most commonly encountered errors and ways to resolve them.

| Error             | Description                                                                                                  | Solution                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BadOrigin         | You are not allowed to do this operation, e.g. trying to create a council motion with a non-council account. | Either switch to an account which has the necessary permissions, or check if the operation you're trying to execute is permitted at all (e.g. calling `system.setCode` to do a runtime upgrade directly, without voting).                                                                                                                                                                 |
| BadProof          | The transaction's signature seems invalid.                                                                   | It's possible that the node you're connected to is following an obsolete fork - trying again after it catches up usually resolves the issue. To check for bigger problems, inspect the last finalized and current best block of the node you're connected to and compare the values to chain stats exposed by other nodes - are they in sync? If not, try connecting to a different node. |
| Future            | Transaction nonce too high, i.e. it's "from the future".                                                     | Reduce the nonce to +1 of current nonce. Check current nonce by inspecting the address you're using to send the transaction.                                                                                                                                                                                                                                                              |
| Stale             | Transaction nonce too low.                                                                                   | Increase the nonce to +1 of current nonce. Check current nonce by inspecting the address you're using to send the transaction.                                                                                                                                                                                                                                                            |
| ExhaustsResources | There aren't enough resources left in the current block to submit this transaction.                          | Try again in the next block.                                                                                                                                                                                                                                                                                                                                                              |
| Payment           | Unable to pay for TX fee.                                                                                    | You might not have enough free balance to cover the fee this transaction would incur.                                                                                                                                                                                                                                                                                                     |