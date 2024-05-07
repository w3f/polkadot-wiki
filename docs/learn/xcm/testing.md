---
id: learn-xcm-docs-testing
title: Testing
sidebar_label: Testing
description: Testing XCM-powered Solutions.
keywords: [xcm, cross-consensus messaging, config]
slug: ./testing
---

# Testing

Before deploying your XCM-powered solution to production, it's paramount to test it thoroughly.
There are different levels for testing, which should be tackled sequentially:

- Message: Making sure your message works properly, according to the XCVM spec.
- Configuration: Making sure your executor's configuration is as expected.
- End-to-end: Making sure the whole flow works, in an environment as similar to production as
  possible.

We'll discuss tools and best practices for each of these levels.

## XCM Simulator

The
[xcm-simulator](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/xcm-simulator)
is a tool to quickly test the execution of various XCM instructions against the `xcm-executor`. The
examples in this documentation use the xcm-simulator. The simulator mocks the Downward Message
Passing pallet, enabling us to get the XCMs that a parachain receives from the relay chain using the
`received_dmp` getter. The simulator should be used as a XCM playground. For testing the XCM
configuration of your parachain and the integration with other chains, you can use the xcm-emulator.

## XCM Emulator

The [xcm-emulator](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus/xcm/xcm-emulator)
is a tool to emulate XCM program execution using pre-configured runtimes, including those used to
run on live networks, such as Kusama, Polkadot, Statemine, etc. This allows for testing cross-chain
message passing and verifying outcomes, weights, and side-effects.

An example of how the emulator is used for testing common good parachains can be found
[here](https://github.com/paritytech/polkadot-sdk/tree/master/cumulus/parachains/integration-tests/emulated).

The xcm-emulator uses the transport layer pallets. However, the messages do not utilize the same
messaging infrastructure as live networks, as the transport mechanism is being mocked out. Also,
consensus related events are not tested, like disputes and staking. To test for these events,
parachains can use E2E tests.

## End-to-End testing

There are two frameworks being used in the ecosystem to do e2e testing:

- [Zombienet](https://github.com/paritytech/zombienet).
- [Chopsticks](https://github.com/AcalaNetwork/chopsticks).
