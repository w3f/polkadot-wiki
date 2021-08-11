---
id: learn-implementations
title: Polkadot Implementations
sidebar_label: Polkadot Implementations
---

# Polkadot Implementations

Polkadot is the flagship protocol of the [Web3 Foundation][], and while Polkadot can be defined as 
a protocol, a network, or, a type of infrastructure, it serves to be an ecosystem. For true 
decentralization, there should be multiple implementations of Polkadot. Even being a *Layer 0* protocol 
that attempts to build an interconnected, interoperable and secure Web3 ecosystem, Polkadot is a complex 
piece of software, and its formal implementation depends on being built on top of a tech stack.

> There is a countless number of development that is happening in the Polkadot ecosystem, though, this 
> page will focus on implementations of Polkadot's underlying infrastructure (i.e. runtime, host).

## Parity Technologies: A [Rustic Vision for Polkadot][]

[Parity Technologies][] is often in the spotlight for its core development of Polkadot, and while this 
is true, Parity Polkadot also serves to be the [Rust][] client. Parity has a rustic vision for Polkadot
through the use of their main product, [Substrate][]. Substrate can also be used for different 
chains and different networks, but in the case of Polkadot, Substrate acts as the tech stack that is used 
to implement Polkadot's sharded heterogeneous multi-chain model. What's important to realize is that Polkadot 
can support parachains that are not built on Substrate, and, chains can also be built on Substrate which are not 
required to be deployed onto Polkadot.

> Parity focuses on blockchain infrastructure for the decentralised web, where they initially offered an 
> Ethereum client (Parity Ethereum). Parity was hired by the Web3 Foundation to foster the development of the 
> first implementation of Polkadot. 

With this in mind, we can point to some other implementations of Polkadot. Having different implementations 
inherently promotes the decentralization of the technology and progresses it in a meaningful way. Other 
implementations of Polkadot that exist, many of whom have received a [grant](grants.md) from the Web3 Foundation, 
are in programming languages like Go, C++, and JavaScript.

As stated in the Soramitsu grant announcement:

    It is critically important to have multiple implementations of the Polkadot protocol for a number
    of reasons, including decentralization, knowledge dispersion, and better definitions of the
    protocol... Multiple implementations of Polkadot improves network resilience and adds to the
    decentralization of the network. The governance of the network is more democratized when multiple
    teams build clients that run the nodes in the network.

## Alternative Implementations

### ChainSafe Systems: [Gossamer][]

**Gossamer** is a Go implementation being built by [ChainSafe Systems](https://github.com/ChainSafeSystems), a blockchain
R&D firm based in Toronto, Canada that is also building an Eth2.0 Serenity client. They were awarded a grant from the Web3 
Foundation. 

### SORAMITSU: [Kagome][]

**Kagome** is a C++ implementation of the Polkadot Host being built by [Soramitsu][], a Japanese digital identity 
company that previously developed [Hyperledger Iroha][]. They were awarded a grant from the Web3 Foundation and released 
the first version of Kagome in April 2020. As part of the process, they also released a [libp2p][] networking layer in C++.

### Polkadot-JS Project: [Polkadot-JS][]

**Polkadot-JS** is a [JavaScript client][] and offers a collection of tools, interfaces, and libraries for Polkadot and Substrate.

### Other implementations that have received grants
- [Golkadot][]
- [Polkadot in Java][]

[Web3 Foundation]: https://web3.foundation/
[Parity Technologies]: https://www.parity.io/
[Substrate]: https://www.substrate.io/
[Rust]: https://www.rust-lang.org/

[ChainSafe Systems]: https://chainsafe.io/
[SORAMITSU]: https://soramitsu.co.jp/
[Polkadot-JS]: https://github.com/polkadot-js

[Rustic vision for Polkadot]: https://github.com/paritytech/polkadot
[Gossamer]: https://github.com/ChainSafe/gossamer#a-go-implementation-of-the-polkadot-host
[Kagome]: https://github.com/soramitsu/kagome#intro
[Hyperledger Iroha]: https://iroha.tech
[libp2p]: https://github.com/soramitsu/libp2p-grpc
[JavaScript client]: https://github.com/polkadot-js/client

[Golkadot]: https://github.com/opennetsys/golkadot
[Polkadot in Java]: https://github.com/polkadot-java