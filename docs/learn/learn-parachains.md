---
id: learn-parachains
title: Parachains
sidebar_label: Parachains
description: An introductory guide to Parachains.
keywords: [parachains, application-specific, sharding]
slug: ../learn-parachains
---

:::info Testing on Rococo

For information on how to participate in the crowdloan and parachain auction testing on Rococo,
please see the
{{ polkadot: [Rococo Content](../build/build-parachains.md##testing-a-parachains:-rococo-testnet) :polkadot }}{{ kusama: [Rococo Content](../build/build-parachains.md##testing-a-parachains:-rococo-testnet) :kusama }}
on the parachain development guide.

:::

## Definition of a Parachain

A parachain is an application-specific data structure that is globally coherent and validatable by
the validators of the Relay Chain. They take their name from the concept of parallelized chains that
run parallel to the Relay Chain. Most commonly, a parachain will take the form of a blockchain, but
there is no specific need for them to be actual blockchains.

![One parachain](../assets/network/one_parachain.png)

Due to their parallel nature, they are able to parallelize transaction processing and achieve
scalability of the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} system. They
[inherit the security](learn-security.md) of the entire network and can communicate with other
parachains through the [XCM](learn-xcm.md) format.

Parachains are maintained by a network maintainer known as a [collator](learn-collator.md). The role
of the collator node is to maintain a full node of the parachain, retain all necessary information
of the parachain, and produce new block candidates to pass to the Relay Chain validators for
verification and inclusion in the shared state of {{ polkadot: Polkadot :polkadot }}
{{ kusama: Kusama :kusama }}. The incentivization of a collator node is an implementation detail of
the parachain. They are not required to be staked on the Relay Chain or own the native token unless
stipulated by the parachain implementation.

The Polkadot Host (PH) requires that the state transitions performed on parachains be specified as a
[Wasm](learn-wasm.md) executable. Proofs of new state transitions that occur on a parachain must be
validated against the registered state transition function (STF) that is stored on the Relay Chain
by the validators before {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} acknowledges
a state transition has occurred on a parachain. The key constraint regarding the logic of a
parachain is that it must be verifiable by the Relay Chain validators. Verification most commonly
takes the form of a bundled proof of a state transition known as a Proof-of-Verification (PoV)
block, which is submitted to the validators from one or more of the parachain collators to be
checked.

## Why Parachains?

Parachains are a solution to two fundamental problems in blockchains:

 - **Scalability**: Having one blockchain for many purposes makes it difficult to scale as future implementations and upgrades will likely advantage some purposes and disadvantage others. On the other hand, having different blockchains will allow them to implement features themselves without affecting other chains.
 - **Flexibility**: It is reasonable to state a blockchain either will be really good in solving one problem or not so good trying to solve many problems. A blockchain able to specialize in solving a specific problem has more leverage towards itself and its users. Parachains are purpose-built blockchains highly specialized and able to take advantage from each other by cooperation.

## Parachain Economies

Parachains may have their own economies with their own native tokens. Schemes such as Proof-of-Stake
are usually used to select the validator set to handle validation and finalization; parachains will
not be required to do either of those things. However, since
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is not overly particular about what
the parachain can implement, it may be the choice of the parachain to implement a staking token, but
it's not generally necessary.

Collators may be incentivized through inflation of a native parachain token. There may be other ways
to incentivize the collator nodes that do not involve inflating the native parachain token.

Transaction fees in a native parachain token can also be an implementation choice of parachains.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} makes no hard and fast rules for how
the parachains decide on original validity of transactions. For example, a parachain may be
implemented so that transactions must pay a minimum fee to collators to be valid. The Relay Chain
will enforce this validity. Similarly, a parachain could not include that in their implementation,
and Polkadot would still enforce its validity.

Parachains are not required to have their own token. If they do, it is up to the parachain to make the
economic case for their token, not {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

## Parachain Hubs

While {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} enables crosschain
functionality amongst the parachains, it necessitates that there is some latency between the
dispatch of a message from one parachain until the destination parachain receives the message. In
the optimistic scenario, the latency for this message should be at least two blocks - one block for
the message to be dispatched and one block for the receiving parachain to process and produce a
block that acts upon the message. However, in some cases, we may see that the latency for messages
is higher if many messages are in queue to be processed or if no nodes are running both of the
parachain networks that can quickly gossip the message across the networks.

Due to the necessary latency involved in sending crosschain messages, some parachains plan to become
_hubs_ for an entire industry. For example, a parachain project [Acala](https://acala.network) is
planning to become a hub for decentralized finance (DeFi) applications. Many DeFi applications take
advantage of a property known as _composability_ which means that functions of one application can
be synergistically composed with others to create new applications. One example of this includes
flash loans, which borrow funds to execute some on-chain logic as long as the loan is repaid at the
end of the transaction.

An issue with crosschain latency means that composability property weakens among parachains compared
to a single blockchain. **This implication is common to all sharded blockchain designs, including
Polkadot, Eth2.0, and others.** The solution to this is the introduction of parachain hubs, which
maintain the stronger property of single block composability.

## Parachain Slot Acquisition

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} supports a limited number of
parachains, currently estimated to be about 100. As the number of slots is limited, there are
several ways to allocate them:

- Governance granted parachains, or "common good" parachains
- Auction granted parachains
- Parathreads

["Common Good" parachains](#common-good-parachains) are allocated by Polkadot's on-chain
{{ polkadot: [governance](learn-governance.md) :polkadot }}
{{ kusama: [governance](learn-governance.md) :kusama }} system, and are deemed as a "common good"
for the network, such as bridges to other networks or chains. They are usually considered
system-level chains or public utility chains. These typically do not have an economic model and help
remove transactions from the Relay Chain, allowing for more efficient parachain processing.

{{ polkadot: [Auction granted parachains](learn-auction.md) :polkadot }}
{{ kusama: [Auction granted parachains](learn-auction.md) :kusama }} are granted in a permissionless
auction. Parachain teams can either bid with their own DOT tokens, or source them from the community
using the {{ polkadot: [crowdloan functionality](learn-crowdloans.md) :polkadot }}
{{ kusama: [crowdloan functionality](learn-crowdloans.md) :kusama }}.

{{ polkadot: [Parathreads](learn-parathreads.md) :polkadot }}
{{ kusama: [Parathreads](learn-parathreads.md) :kusama }} have the same API as parachains, but are
scheduled for execution on a pay-as-you-go basis with an auction for each block.

### Parachain Lease Expiration

When a parachain wins an auction, the tokens that it bids get reserved until the lease's end.
Reserved balances are non-transferrable and cannot be used for staking. At the end of the lease, the
tokens are unreserved. Parachains that have not secured a new lease to extend their slot will
automatically become parathreads.

## Common Good Parachains

"Common Good" parachains are parachain slots reserved for functionality that benefits the
ecosystem as a whole. By allocating a subset of parachain slots to common good chains, the entire
network can realize the benefit of valuable parachains that would otherwise be underfunded due to
the free-rider problem. They are not allocated via the parachain auction process but by the on-chain
{{ polkadot: [governance](learn-governance.md) :polkadot }}
{{ kusama: [governance](learn-governance.md) :kusama }} system. Generally, a common good parachain's
lease would not expire; it would only be removed via governance.

See the
[Polkadot blog article](https://polkadot.network/common-good-parachains-an-introduction-to-governance-allocated-parachain-slots/)
and the [common good parachains](learn-common-good-chains.md) page for more information.

## Examples

Some examples of parachains:

- **Encrypted Consortium Chains**: These are possibly private chains that do not leak any
  information to the public, but still can be interacted with trustlessly due to the nature of the
  XCMP protocol.
- **High-Frequency Chains**: These are chains that can compute many transactions in a short amount
  of time by taking certain trade-offs or making optimizations.
- **Privacy Chains**: These are chains that do not leak any information to the public through use of
  novel cryptography.
- **Smart Contract Chains**: These are chains that can have additional logic implemented on them
  through the deployment of code known as _smart contracts_.

## Resources

- [Polkadot: The Parachain](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) -
  Blog post by Polkadot co-founder Rob Habermeier who introduced parachains in 2017 as "a simpler
  form of blockchain, which attaches to the security provided by a Relay Chain rather than providing
  its own. The Relay Chain provides security to attached parachains, but also provides a guarantee
  of secure message-passing between them."
- [The Path of a Parachain Block](https://polkadot.network/the-path-of-a-parachain-block/) - A
  technical walkthrough of how parachains interact with the Relay Chain.
