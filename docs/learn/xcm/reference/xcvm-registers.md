---
id: learn-xcm-docs-reference-xcvm-registers
title: All XCVM Registers
sidebar_label: All XCVM Registers
description: All XCVM Registers.
keywords: [xcm, cross-consensus messaging, xcvm, registers, reference]
slug: ../reference-xcvm-registers
---

# XCVM Registers

Each implementation of an XCVM contains several registers which cannot generally be set at will, but
rather begin with specific values and may only be mutated under certain circumstances and/or obeying
certain rules. An XCVM has the following registers:

- [Programme](https://github.com/paritytech/xcm-format#31-programme)
- [Programme Counter](https://github.com/paritytech/xcm-format#32-programme-counter)
- [Error](https://github.com/paritytech/xcm-format#33-error)
- [Error Handler](https://github.com/paritytech/xcm-format#34-error-handler)
- [Appendix](https://github.com/paritytech/xcm-format#35-appendix)
- [Origin](https://github.com/paritytech/xcm-format#36-origin)
- [Holding](https://github.com/paritytech/xcm-format#37-holding-register)
- [Surplus Weight](https://github.com/paritytech/xcm-format#38-surplus-weight)
- [Refunded Weight](https://github.com/paritytech/xcm-format#39-refunded-weight)
- [Transact Status](https://github.com/paritytech/xcm-format#310-transact-status)
- [Topic](https://github.com/paritytech/xcm-format#311-topic)
