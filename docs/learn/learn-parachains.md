---
id: learn-parachains
title: Parachains
sidebar_label: Introduction to Parachains
description: An Introduction to Polkadot's Parachains.
keywords: [parachains, application-specific, sharding, on-demand, parathread]
slug: ../learn-parachains
---

:::info Testing on Rococo

For information on how to participate in the crowdloan and parachain auction testing on Rococo,
please see the
{{ polkadot: [Rococo Content](../build/build-parachains.md##testing-a-parachains:-rococo-testnet) :polkadot }}
{{ kusama: [Rococo Content](../build/build-parachains.md##testing-a-parachains:-rococo-testnet) :kusama }}
on the parachain development guide.

:::

## Definition of a Parachain

A parachain is an application-specific data structure that is globally coherent and can be validated
by the validators of the Relay Chain. They take their name from the concept of parallelized chains
that run parallel to the Relay Chain. Most commonly, a parachain will take the form of a blockchain,
but there is no specific need for them to be actual blockchains.

![One parachain](../assets/one-parachain.png)

Due to their parallel nature, they can parallelize transaction processing and achieve scalability of
the {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} protocol. They
[inherit the security](#shared-security) of the entire network and can communicate with other
parachains through the [XCM](learn-xcm.md) format.

Parachains are maintained by a network maintainer known as a [collator](learn-collator.md). The role
of the collator node is to maintain a full node of the parachain, retain all necessary information
about the parachain, and produce new block candidates to pass to the Relay Chain validators for
verification and inclusion in the shared state of
{{ polkadot: Polkadot. :polkadot }}{{ kusama: Kusama. :kusama }} The incentivization of a collator
node is an implementation detail of the parachain. They are not required to be staked on the Relay
Chain or own the native token unless stipulated by the parachain implementation.

### State Transitions

Like other blockchains, parachains are **deterministic state machines**. Each parachain has a
**state**, executes a batch of transactions grouped into a block, and achieves a new state. Joe
Petrowski provided in [this article](https://polkadot.network/blog/the-path-of-a-parachain-block/) a
good analogy of a state with a light switch that can be either on or off, which is one of the
simplest examples of how a state machine functions. Each parachain has its own state, and the Relay
Chain links all those states into one state, i.e. a state of states. A multi-chain network like
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} can be viewed like one computer's
state with many light switches where a **state transition function** is the logic to decide which
switches should be toggled. Parachains have their own transition rule, separate economies,
governance mechanisms, and users.

A parachain's state is stored in a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree). Merkle
trees have the convenient property that if some values within the tree change, this will be
reflected in the Merkle root (in this case, the state root). One can verify the change by only
looking at the new values and the paths that are affected within the tree.

The {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Host requires that the state
transitions performed on parachains be specified as a [Wasm](learn-wasm.md) executable. Proofs of
new state transitions that occur on a parachain must be validated against the registered state
transition function (STF) that is stored on the Relay Chain by the validators before
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} acknowledges a state transition has
occurred on a parachain. The key constraint regarding the logic of a parachain is that it must be
verifiable by the Relay Chain validators. Verification most commonly takes the form of a bundled
proof of a state transition known as a Proof-of-Verification (PoV) block, which is submitted for
checking to the validators from one or more parachain collators.

## Why Parachains?

Parachains are a solution to two fundamental problems in blockchains:

- **Scalability**: Having one blockchain for many purposes makes it difficult to scale as future
  implementations and upgrades will likely advantage some purposes and disadvantage others.
  Conversely, having different blockchains will allow them to implement features without affecting
  other chains.
- **Flexibility**: It is reasonable to state a blockchain will either be really good at solving one
  problem or not so good at trying to solve many problems. A blockchain specializing in solving a
  specific problem has more leverage toward itself and its users. Parachains are purpose-built
  blockchains are highly specialized and can take advantage of each other through cooperation.

### Shared Security

Shared security, sometimes referred as _pooled security_, is one of the unique value propositions
for chains considering becoming a [parachain](learn-parachains.md) and joining the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} network. On a high level, shared
security means that all parachains that are connected to the
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} Relay Chain by leasing a parachain
slot will benefit from the economic security provided by the Relay Chain
[validators](learn-validator.md).

The notion of shared security is different from inter-chain protocols that build on an architecture
of bridges. For bridge protocols, each chain is considered sovereign and must maintain its own
validator set and economic security. One concern in these protocols is the point of scalability of
security. For example, one suggestion to scale blockchains is that of _scale by altcoins,_ which
suggests that transaction volumes will filter down to lower market cap altcoins as the bigger ones
fill their blocks. A major flaw in this idea is that the lower market cap coins will have less
economic security attached and be easier to attack. A real-life example of a 51% attack occurred
recently (
[Ethereum Classic attack on January 10, 2019](https://cointelegraph.com/news/ethereum-classic-51-attack-the-reality-of-proof-of-work)
), in which an unknown attacker double spent 219_500 ETC (~1.1 million USD). This was followed by
two more 51% attacks on ETC.

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} overcomes security scalability
concerns since it gravitates all the economic incentives to the Relay Chain and allows the
parachains to tap into stronger guarantees at genesis. Sovereign chains must expend much more effort
to grow the value of their coin so that it is sufficiently secure against well-funded attackers.

### PoW vs Parachain Model

Let's compare the standard sovereign security model that exists on current proof-of-work (PoW)
chains to that of the shared security of
{{ polkadot: Polkadot. :polkadot }}{{ kusama: Kusama. :kusama }} Chains secured by their security
models, like Bitcoin, Zcash, and their derivatives, must bootstrap their independent network of
miners and maintain a competitive portion of honest hashing power. Since mining is becoming a larger
industry that increasingly centralizes key players, it is becoming more real that a single actor may
control enough hash power to attack a chain.

This means that smaller chains that cannot maintain a secure amount of hash power on their networks
could potentially be attacked by a large mining cartel at the simple whim of redirecting its hash
power away from Bitcoin and toward a new and less secure chain.
[51% attacks are viable today](https://www.crypto51.app) with attacks having been reported on
Ethereum Classic (see above),
[Verge](https://coincentral.com/verge-suffers-51-attack-hard-forks-in-response/),
[Bitcoin Gold](https://bitcoingold.org/responding-to-attacks/), and other cryptocurrencies.

On {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, this disparity between chain
security will not be present. When a parachain connects to
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}, the relay chain validators become
the securers of that parachain's state transitions. The parachain will only have the overhead of
running a few collator nodes to keep the validators informed with the latest state transitions and
proofs/witness. Validators will then check these for the parachains to which they are assigned. In
this way, new parachains instantly benefit from the overall security of
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} even if they have just been launched.

## Parachain Economies

Parachains may have their economies with their native tokens. Schemes such as Proof-of-Stake are
usually used to select the validator set to handle validation and finalization; parachains will not
be required to do either of those things. However, since
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} is not overly particular about what
the parachain can implement, it may be the choice of the parachain to implement a staking token, but
it's not generally necessary.

Collators may be incentivized through the inflation of a native parachain token. There may be other
ways to incentivize the collator nodes that do not involve inflating the native parachain token.

Transaction fees in a native parachain token can also be an implementation choice of parachains.
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} makes no hard and fast rules for how
the parachains decide on the original validity of transactions. For example, a parachain may be
implemented so that transactions must pay a minimum fee to collators to be valid. The Relay Chain
will enforce this validity. Similarly, a parachain could not include that in their implementation,
and {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} would still enforce its validity.

Parachains are not required to have their token. If they do, it is up to the parachain to make the
economic case for their token, not {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}.

## Parachain Slot Acquisition

There are two ways to allocate parachain slots on
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}:

- Governance granted parachains, or "system parachains"
- Auction granted parachains

[System parachains](#system-parachains) are allocated by
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s on-chain
[governance](./learn-polkadot-opengov.md) and are part of the network's protocol, such as bridges to
other networks or chains. These typically do not have an economic model and help remove transactions
from the Relay Chain, allowing for more efficient parachain processing.

[Auction granted parachains](learn-auction.md) are granted in a permissionless auction. Parachain
teams can either bid with their own {{ polkadot: DOT :polkadot }}{{ kusama: KSM :kusama }} tokens,
or source them from the community using the [crowdloan functionality](learn-crowdloans.md).

### Parachain Lease Expiration

When a parachain wins an auction, the tokens it bids get reserved until the lease's end. Reserved
balances are non-transferrable and cannot be used for staking. At the end of the lease, the tokens
are unreserved. Parachains without a new lease to extend their slot will be deprecated to the status of a parathread (i.e., a chain with a registered `ParaID` but has no access to a core).

## System Parachains

[System parachains](./learn-system-chains.md) are parachains that use execution cores allocated by
the network's governance. These chains remove transactions from the Relay Chain, allowing network
validators to allocate resources to validating parachains. System chains are Polkadot using its
scaling technology to host itself.

See this
[Polkadot blog article](https://polkadot.network/common-good-parachains-an-introduction-to-governance-allocated-parachain-slots/)
and this
[Polkadot Forum thread](https://forum.polkadot.network/t/polkadot-protocol-and-common-good-parachains/866)
for more information.

## On-demand Parachains

:::info On-demand parachains were previously named parathreads

On-demand parachains (previously called parathreads) are parachains that acquire
[on-demand coretime](./learn-agile-coretime.md#on-demand-coretime).

:::

On-demand parachains temporarily participate (on a block by block basis) in
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} security without needing to lease a
dedicated parachain slot. This is done through economically sharing the scarce resource of a
_parachain slot_ (or core) among several competing resources (parachains). Chains that otherwise
would not be able to acquire a full parachain slot or do not find it economically sensible to do so,
can participate in {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}'s shared security
as the [on-demand coretime](./learn-agile-coretime.md#on-demand-coretime) offers a graceful off-ramp
to parachains that no longer require a dedicated parachain slot, but would like to continue using
the Relay Chain.

### Historical Context of On-demand parachains

According to [this talk](https://v.douyu.com/show/a4Jj7llO5q47Dk01) in Chengdu back in 2019, the origin of the
idea for on-demand parachains came from similar notions in the limited resource of memory on early personal computers of the
late '80s and '90s. Since computers have a limited amount of physical memory, when an application
needs more, the computer can create virtual memory by using _swap space_ on a hard disk. Swap space
allows the capacity of a computer's memory to expand and for more processes to run concurrently with
the trade-off that some processes will take longer to progress.

### Parachains vs. On-demand Parachains

Parachains and on-demand parachains are very similar from a development perspective. One can imagine
that a chain developed with Substrate can at different points in its lifetime assume one of three
states:

- an independent chain with secured bridge,
- a parachain always connected to the Relay Chain (i.e. permanent),
- or a parachain intermittently connected to the Relay Chain (i.e. on-demand)

It can switch between these states with relatively minimal effort since the difference is more of an
economic distinction than a technological one.

On-demand parachains have the exact same benefits for connecting to
{{ polkadot: Polkadot :polkadot }} {{ kusama: Kusama :kusama }} that a full parachain has. Namely,
it is able to send messages to other para-objects through [XCMP](learn-xcm.md###XCMP) and it is
secured under the full economic security of {{ polkadot: Polkadot :polkadot }}
{{ kusama: Kusama :kusama }}'s validator set.

## Parachains' Use Cases

Note that we still have to see the true potential of parachains and what it is listed below are just
a few examples.

- **Encrypted Consortium Chains**: These are possibly private chains that do not leak any
  information to the public but still can be interacted with trustlessly due to the nature of the
  XCMP protocol.
- **High-Frequency Chains**: These chains can compute many transactions in a short amount of time by
  taking certain trade-offs or making optimizations.
- **Privacy Chains**: These chains do not leak any information to the public through novel
  cryptography.
- **Smart Contract Chains**: These chains can have additional logic implemented through the
  deployment of code known as _smart contracts_.

## Parachain Host

{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} includes a blockchain called a relay
chain. A blockchain is a
[Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) (DAG) of state
transitions, where every added block can be viewed as the head of the chain or fork with cumulative
state. All paths through the DAG terminate at the Genesis Block. A blockchain is a tree, as each
block can have only one parent.

A blockchain network is made of nodes that have a view of many forks of the chain and must decide
which fork to follow. To construct the parachain host we need to answer two categories of questions
addressed by two different components:

- What is the state transition function of the blockchain? This is handled by the **Runtime**, which
  defines the state transition logic of the chain. The Runtime logic is divided into:

  - **Modules** encapsulate particular behavior of the protocol and consist of:
    - Storage
    - Routines are invoked by entry points and other modules upon block initialization or closing.
      Routines can alter the storage of a module.
    - The entry point defines how new information is introduced to a module and can limit the origin
      from which they are called (user, root, parachain).
  - **API** provides means for the node-side behavior to extract meaningful information from the
    state of a single fork.

  :::info

  The Polkadot Parachain Host Implementers' Guide provides details about
  [Runtime Architecture](https://paritytech.github.io/polkadot/book/runtime/index.html) and
  [Runtime API](https://paritytech.github.io/polkadot/book/runtime-api/index.html).

  :::

- Knowing various forks of the blockchain, what behaviors should a node take? What information
  should a node extract from the state of which forks, and how should that information be used? This
  is handled by the **Node-side behavior**, which defines all activities a node undertakes given its
  view of the blockchain. The node-side behavior can be divided into two categories:

  - **Networking behaviors**, relate to how information is distributed between nodes but not how the
    information is used afterward.
  - **Core behaviors**, relate to internal work that a specific node does. Such behavior cares about
    that information is _distributed_ and _received_, but not how these two are achieved.

  These two categories often interact, but they can be heavily abstracted from each other. The
  node-side behavior is split into various **subsystems**, which perform a particular category of
  work. Subsystems can communicate with each other through an
  [Overseer](https://paritytech.github.io/polkadot/book/node/overseer.html) that prevents race
  conditions.

  :::info

  The Polkadot Parachain Host Implementers' Guide provides details about
  [node architecture](https://paritytech.github.io/polkadot/book/node/index.html) the main
  subsystems:

  - [Collator subsystem](https://paritytech.github.io/polkadot/book/node/collators/index.html)
  - [Backing subsystem](https://paritytech.github.io/polkadot/book/node/backing/index.html)
  - [Availability subsystem](https://paritytech.github.io/polkadot/book/node/availability/index.html)
  - [Approval subsystem](https://paritytech.github.io/polkadot/book/node/approval/index.html)
  - [Dispute subsystem](https://paritytech.github.io/polkadot/book/node/disputes/index.html)
  - [Utility subsystem](https://paritytech.github.io/polkadot/book/node/utility/index.html)

  :::

The Runtime and Node-side behavior are dependent on each other. The Runtime depends on Node-side
behavior to author blocks, and to include [extrinsics](./learn-transactions.md) which trigger the
correct entry points. The Node-side behavior relies on the Runtime APIs to extract information
necessary to determine which action to take.

## Parachain Hubs

While {{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }} enables crosschain
functionality amongst the parachains, it necessitates that there is some latency between the
dispatch of a message from one parachain until the destination parachain receives the message. In
the optimistic scenario, the latency for this message should be at least two blocks - one block for
the message to be dispatched and one block for the receiving parachain to process and produce a
block that acts upon the message. However, in some cases, we may see that the latency for messages
is higher if many messages are in queue to be processed or if no nodes are running both parachain
networks that can quickly gossip the message across the networks.

Due to the necessary latency in sending crosschain messages, some parachains plan to become _hubs_
for an entire industry. For example, many DeFi applications could take advantage of a property known
as _composability_ which means that functions of one application can be synergistically composed
with others to create new applications. One example of this includes flash loans, which borrow funds
to execute some on-chain logic as long as the loan is repaid at the end of the transaction.

An issue with crosschain latency means that composability property weakens among parachains compared
to a single blockchain. **This implication is common to all sharded blockchain designs, including
Polkadot, Eth2.0, and others.** The solution to this is the introduction of parachain hubs, which
maintain the stronger property of single block composability.

## Resources

- [Polkadot: The Parachain](https://medium.com/polkadot-network/polkadot-the-parachain-3808040a769a) -
  Blog post by Polkadot co-founder Rob Habermeier who introduced parachains in 2017 as "a simpler
  form of blockchain, which attaches to the security provided by a Relay Chain rather than providing
  its own. The Relay Chain provides security to attached parachains, but also provides a guarantee
  of secure message-passing between them."
- [The Path of a Parachain Block](https://polkadot.network/the-path-of-a-parachain-block/) - A
  technical walk-through of how parachains interact with the Relay Chain.
