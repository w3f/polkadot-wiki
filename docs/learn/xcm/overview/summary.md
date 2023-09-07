---
id: learn-xcm-docs-overview-summary
title: "XCM: Cross-Consensus Messaging"
sidebar_label: Summary
description: Summary of the Chapter.
keywords: [xcm, cross-consensus messaging]
slug: ../overview-summary
---

# Overview

XCM enables different consensus systems to communicate with each other. Common cross-consensus
use-cases include:

- Sending tokens between blockchains
- Locking assets on one blockchain in order to gain some benefit on a smart contract on another
  blockchain
- Calling specific functions on another blockchain

These are just a few basic examples; once you can communicate with other consensus systems, you can
create applications that can leverage multiple blockchains' capabilities. The potential it provides
is especially evident in an ecosystem of highly specialized blockchains like Polkadot.

Decentralized distributed systems are very complex, so it's easy to make errors when building
interactions between them. XCM is meant to be used by developers to package these interactions into
their runtime logic before exposing that functionality to end users.

This chapter will cover what XCM is, what it isn't, and why it matters before exploring the
different components that make up the XCM ecosystem.
