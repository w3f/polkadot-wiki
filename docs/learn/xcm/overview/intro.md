---
id: learn-xcm-docs-overview-intro
title: Introduction
sidebar_label: Introduction
description: An Introduction to XCM.
keywords: [xcm, cross-consensus messaging]
slug: ../overview-intro
---

# Introduction

XCM is a **language** for communicating **intentions** between **consensus systems**. Concretely,
XCM is a message format, it specifies how to craft messages that communicate intentions to other
consensus systems. Some examples of consensus systems are blockchains and smart contracts. XCM comes
from the [Polkadot](https://polkadot.network/) ecosystem, but is designed to be general enough to
provide a common format for cross-consensus communication that can be used anywhere.

Its goal is to let blockchain ecosystems thrive via specialization instead of generalization. If
there's no interoperability, a chain is forced to host all services and support all functionalities
on its own. With XCM, we are able to achieve an ecosystem-wide division of labour: a chain can
specialize and focus on its own business logic, and leverage the benefits of depending on other
specialized blockchain for services that it does not provide.

XCM makes the following assumptions regarding the underlying environment:

1. Asynchronous: XCMs in no way assume that the sender will be blocking on its completion.
2. Absolute: XCMs are assumed to be delivered and interpreted accurately, in order and in a timely
   fashion. Once a message is sent, one can assume that it will be processed as intended. This
   guarantee has to be provided by the transport layer.
3. Asymmetric: XCMs, by default, do not have results that let the sender know that the message was
   executed correctly. If results are needed, a new message must be sent.
4. Agnostic: XCM makes no assumptions about the nature of the consensus systems between which the
   messages are being passed. XCM should be usable in any system that derives finality through
   consensus.

XCM is constantly evolving; the format is expected to change over time. It has an RFC process to
propose changes, which end up in newer versions, the current one being v3. To keep up with the
development of the format, or to propose changes, go to
[the XCM format repository](https://github.com/paritytech/xcm-format).
