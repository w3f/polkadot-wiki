---
id: learn-xcm-docs-overview-xcvm
title: The XCVM
sidebar_label: The XCVM
description: The Cross-Consensus Virtual Machine.
keywords: [xcm, cross-consensus messaging, xcvm]
slug: ../overview-xcvm
---

# The XCVM

At the core of XCM lies the XCVM (Cross-Consensus Virtual Machine). A message in XCM (referred to as
an XCM, cross-consensus message, or XCMs for more than one) is an XCVM program. The XCVM is a
register-based state machine that executes every program by processing its instructions one at a
time. During execution, state is tracked in domain-specific registers, and is constantly being used
and updated. Most of the XCM format comprises these registers and the instructions used to compose
XCVM programs.

Like XCM, the XCVM is also a specification. The implementation that will be used in this
documentation is the
[xcm-executor](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot/xcm/xcm-executor),
provided by Parity. The executor is highly configurable. For more information on the extensive
configuration options available, see the [Config Deep Dive](../executor_config/config.md) chapter.

Anyone can create an implementation of the XCVM. As long as they follow the standard, they'll be
able to send XCMs to systems using other implementations.

Typically, an XCM takes the following path through the XCVM:

- Instructions within an XCM are read one-by-one.
- The instruction is executed. This means that the current values of the XCVM registers, the
  instruction type, and the instruction operands are all used to execute some operation, which might
  result in some registers changing their value, or in an error being thrown, which would halt
  execution.
- Each subsequent instruction within the XCM is read until the end of the message has been reached.

An example of an XCVM register is the holding register. Any XCVM program that handles assets will be
putting them in and taking them from this register. This register is used by several of the
instructions we will look at later, including `DepositAsset` and `WithdrawAsset`.

For more information on other registers, see the
[All XCVM Registers](../reference/xcvm-registers.md) section.
