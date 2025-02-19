---
id: learn-hyperbridge
title: Hyperbridge
sidebar_label: Hyperbridge
description: Polkadot's Bridge to Ethereum.
keywords: [bridge, polkadot, ethereum]
slug: ../learn-hyperbridge
---

!!!info "Learn about Parachain and Bridges"
    To follow the material on this page, it is recommended to be familiar with the concepts of [Parachains](./learn-parachains.md) and [Bridges](./learn-bridges.md).

Interoperability is the core vision of the Polkadot technology. Through years of blockchain
development, much effort has been put into making a secure interoperability solution between
blockchains. Polkadot provides secure interoperability between parachains through its
[Cross-Consensus Messaging (XCM)](./learn-xcm.md), and
[Cross-Chain Message Passing (XCMP)](./learn-xcm-transport.md#xcmp-cross-chain-message-passing)
protocol. However, these solutions work when there is a shared security. In the case of interaction
between chains that do not belong to the same Polkadot's shared security, bridges are needed.

Hyperbridge (short for hyper-scalable bridge) is innovated as a cross-chain solution built as an
interoperability coprocessor. Hyperbridge is crafted to scale cryptographically secure, consensus,
and state-proof-based interoperability across all blockchains.

## Coprocessor Model

Ensuring secure cross-chain communication involves the meticulous verification of various aspects,
including: [Consensus Mechanisms](https://wiki.polkadot.network/docs/learn-consensus),
[Consensus Faults](https://research.polytope.technology/consensus-proofs),
[State Proofs](https://research.polytope.technology/state-machine-proofs) and
[State Transitions](https://wiki.polkadot.network/docs/learn-parachains#state-transitions).

> What is a coprocessor?
>
> **Coprocessor**, in the context of hardware, can be referred to as a microprocessor designed to
> supplement the capabilities of the primary processor. For example, a GPU is a coprocessor of the
> CPU to be optimized for graphical and simultaneous computation.

Due to the complexity and expensiveness of the onchain verification process, in the coprocessor
model, the computation is performed off-chain. The execution outcomes and cryptographic proofs
validating their accuracy are subsequently presented on-chain.

Expanding more about the coprocessor model, it has been applied in other solutions of offloading
cryptographic computation as well, particularly
[**Zero-knowledge (ZK) coprocessor**](https://orochi.network/blog/Exploring-ZK-Coprocessor-What-Comes-Next)
or [SNARK circuit](https://www.di.ens.fr/~nitulesc/files/Survey-SNARKs.pdf).

### Parachain as Coprocessors

By leveraging the cost-effective consensus proofs facilitated by
[BEEFY](https://spec.polkadot.network/sect-finality#sect-grandpa-beefy), Hyperbridge affirms the
legitimacy of all parachain state transitions safeguarded by the network.

This capability enables the distribution of the validation workload for consensus, state proofs, and
state transition re-execution across various designated
[Parachain Cores](../general/polkadot-direction.md#polkadot-as-a-computational-resource). Hence,
Polkadot is utilized by Hyperbridge as a verifiable computation layer to provide the
["Full Node Security"](https://blog.polytope.technology/introducing-hyperbridge-interoperability-coprocessor#full-node-level-security)
in cross-chain bridges.

Hence, an additional layer of security is provided, allowing Hyperbridge to detect and prevent
[Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault) behaviors across connected chains.

### Interoperable State Machine Protocol (ISMP)

[Interoperable State Machine Protocol (ISMP)](https://blog.polytope.technology/introducing-hyperbridge-interoperability-coprocessor)
provides a familiar HTTP-like API for developers who want to make cross-chain requests to trigger
certain logic on the counterparty chain. It allows POST requests to send arbitrary data to connected
chains and GET requests to read the storage (verified through state proofs) of applications on
connected chains.

In addition to facilitating cross-chain message passing among connected chains, ISMP also serves as
a synchronization primitive across Hyperbridge's internal state machines. This enables its parachain
cores to communicate with each other and delegate tasks.

### Underlying technologies

The underlying technologies of the Hyperbridge are integrated with:

- [PLONK verifier](https://eprint.iacr.org/2019/953.pdf): The PLONK Verifier within Hyperbridge can
  be likened to a sophisticated security apparatus. It operates like an expert detective,
  meticulously ensuring the legitimacy of every transaction without compromising private details.
  Continuously enhancing its capabilities, particularly with advancements like UltraPLONK, this
  integral component is pivotal in maintaining the utmost integrity and confidentiality of
  cross-chain communications.
- [BEEFY consensus](https://spec.polkadot.network/sect-finality#sect-grandpa-beefy): The BEEFY
  (Bridge Efficiency Enabling Finality Yielder) protocol functions as a complementary system to
  GRANDPA, specifically designed to facilitate efficient bridging between the Polkadot network's
  relay chain and external, isolated blockchains like Ethereum. Notably, BEEFY addresses the
  interoperability challenge with blockchains not initially constructed to integrate seamlessly with
  the Polkadot interchain framework.
- [The Barretenberg backend](https://github.com/AztecProtocol/barretenberg): Within the realm of
  Hyperbridge, Barretenberg functions as a powerhouse engine, adeptly managing intricate
  mathematical computations. As the backend infrastructure, it guarantees the swift, secure, and
  reliable execution of all cryptographic operations within the Hyperbridge ecosystem.

## Terminology

### State Proofs

State proofs are a critical primitive of the blockchain stack that enables things like trustless
bridges. These off-chain light clients can access on-chain data in a permissionless and secure
manner and modular blockchain architectures where the execution layer can be decoupled from the
consensus layer.

### Consensus Proofs

Consensus Proofs in a blockchain system denote the mechanism by which participants, often nodes or
validators, collectively agree on the validity of new transactions or blocks. The nature of
consensus proofs varies across different blockchain architectures, such as Proof-of-Work,
Proof-of-Stake, or other consensus algorithms.

The ultimate goal is to ensure a widespread and verifiable agreement among network participants,
enhancing the security and reliability of the distributed ledger.

For example, Consensus Proofs in a proof of stake system are given as the signatures over the latest
block header in the chain from a supermajority (two-thirds plus one) subset of the full authority
set.

## Resources

To learn more about Hyperbridge, see the resources below.

- [Introducing Hyperbridge: An Interoperability Coprocessor](https://blog.polytope.technology/introducing-hyperbridge-interoperability-coprocessor) -
  Article by Seun Lanlege, Polytope Lab founder.
- [Hyperbridge: The New Interoperability Coprocessor on Polkadot](https://medium.com/simplystaking/hyperbridge-the-new-interoperability-coprocessor-on-polkadot-b532ae622d8e) -
  Article by Erik from Simply Staking
- [Digital Services as State Machines](https://polkadot-blockchain-academy.github.io/pba-book/blockchain-contracts/services-as-state-machines/page.html) -
  Lecture about state machine from Polkadot Blockchain Academy
- [Hyperbridge Source Code](https://github.com/polytope-labs/hyperbridge) - Public codebase
  repository of hyperbridge.
- [Interoperable State Machine Protocol (ISMP) Book](https://ismp.polytope.technology/) - Guidebook
  of the ISMP
- [The Puzzle of Blockchain Interoperability](https://twitter.com/stakenode_dev/status/1744653040764817675)
- [ISMP, The Endgame for Parachain Interoperability | Sub0 2023](https://www.youtube.com/watch?v=MCOAwooWecs)
