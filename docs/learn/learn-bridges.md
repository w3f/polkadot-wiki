---
id: learn-bridges
title: Bridges
sidebar_label: Bridges
description: Bridges and Examples of Common Bridges.
keywords: [bridges, cross-chain, bridge methods]
slug: ../learn-bridges
---

Bridges are vital infrastructure, enabling cross-chain communication between technically diverse
networks like Polkadot and Ethereum. Bridges allow these chains to acknowledge and trust each
other’s finalized states, paving the way for many applications like asset swaps and chain
migrations.

Current bridge architectures rely on centralized intermediaries, such as multi-signature relayers,
to validate information passed between chains. This approach introduces additional trust assumptions
and creates a single point of failure, opening up attack vectors like censorship. Recent history has
shown how risky this can be — centralized entities can be compromised or act maliciously. According
to [Chainalysis report](https://www.chainalysis.com/blog/cross-chain-bridge-hacks-2022/), failures
in centralized bridges account for over 60% of all crypto hacks, resulting in losses exceeding $2
billion. Four of the top five incidents on the [rekt leaderboard](https://rekt.news/tr/leaderboard/)
are bridge-related hacks. A system’s security is only **as strong as its weakest link**, and bridges
have proven to be a critical vulnerability.

!!!info "Purpose of bridging"
    Bridges enable Polkadot to communicate with external blockchains such as Bitcoin and Ethereum. Within Polkadot, chains already benefit from secure interoperability. For more information about the native interoperability technology that allows parachains to communicate trustlessly, please see the dedicated [cross consensus](learn-xcm.md) page on the Wiki.

Thus, Bridge designs come in various flavors ranging from centralized and trusted to more
decentralized and trustless. Polkadot favors the latter bridge designs for its ecosystem.

## Trustless Bridges

A two-way trustless bridge between chains A and B can be viewed as two one-way bridges (A → B and B
→ A). Hence, the design of a two-way bridge can be explained in terms of a one-way bridge with a
source and a target chain. Any trustless bridge will have **on-chain and off-chain components**.

Trustlessness means that users do not need to trust particular individuals or organizations; they
only need to trust mathematics, code, cryptography, and protocol. An example of a system which
implies a high level of trust would be that of a bridge which is controlled via a multi-signature
scheme, wherein you must trust the cosignatories.

Basic assumptions are always needed in principle when defining a trustless system as a completely
trustless setup cannot always be guaranteed.

## On-chain Bridge Components

Building a trustless bridge can be done through the implementation of the following on-chain
components (ordered by suggested methodology):

- _Bridge pallets_ - For Substrate-native chains, use a bridge pallet (e.g.
  [Kusama `<->` Polkadot bridge](./learn-DOT-KSM-bridge.md), since both networks' parachains use
  Substrate).
- _Smart contracts_ - If the chain is not on Substrate, you should have smart contracts on the
  non-Substrate chain to bridge (e.g. [Snowbridge](./learn-snowbridge.md), Ethereum mainnet has a
  bridge smart contract that initiates Eth transactions based on incoming XCMP messages).
- _Higher-order protocols_ - If your chain does not support smart contracts (e.g. Bitcoin), you
  should use [XClaim](https://eprint.iacr.org/2018/643.pdf) or similar protocols to bridge.

On-chain bridge components are modules (usually pallets or smart contracts) deployed on the chain's
runtime. Modules that track the finality of the source chain are required to be deployed on the
target chain, while the modules that deal with cross-chain messaging need to be deployed on both
source and target chains.

There are also on-chain components responsible for queuing messages at the source chain and
receiving the message proofs at the target chain. The messages are sent through a particular lane,
where they are guaranteed to be received in the same order they are sent. On Bridge Hub, the
messages are in XCM format, and an XCM executor is used to dispatch them.

### via Bridge Pallets

Operating a bridge between chains that finalize through GRANDPA consensus is straightforward. A
GRANDPA light client of the source chain built into the target chain's runtime provides a "source of
truth" about the source chain's finality. For instance,
[Bridge Hub](./learn-system-chains.md#bridge-hub) runs an on-chain light client of Kusama which uses
GRANDPA consensus and infers the finality of all the transactions on Kusama and its parachains.

Receiving messages on Polkadot from an external, non-parachain blockchain is possible through a
Substrate pallet. The Substrate instance can then be deployed to Polkadot either as a system-level
parachain (native extension to the core Polkadot software) or as a community-operated parachain.

An example of a bridge that would strictly use bridge pallets would be
[the Kusama `<->` Polkadot bridge](./learn-DOT-KSM-bridge.md), since both use parachains based on
Substrate.

For the standalone chains that will not have a parachain bridging module (non-Substrate), it will be
necessary to deploy bridge contracts.

### via Smart Contracts

Given the generality of blockchain platforms with Turing-complete smart contract languages, it is
possible to bridge Polkadot and any other smart-contract-capable blockchain. For instance,
[Snowbridge](./learn-snowbridge.md) uses the Polkadot Bridge Hub to run an on-chain light client of
Ethereum to infer the finality of transactions on the Ethereum chain. Running a GRANDPA light client
through smart contracts on Ethereum is possible but expensive. Hence,
[BEEFY consensus layer](./learn-consensus.md#bridging-beefy) sitting on top of GRANDPA enables a
cost-effective solution for operating a trustless bridge with Ethereum and other protocols.
Trustless bridges to chains like Cosmos, Avalanche, NEAR, etc., would require custom pallets to be
deployed on Bridge Hub.

!!!note
    To learn more on how Bitcoin and Ethereum can cooperate and collaborate through Polkadot, check out this explainer video [here](https://www.youtube.com/watch?v=rvoFUiOR3cM)

### via Higher-Order Protocols

Higher-order protocols (like [XCLAIM](https://eprint.iacr.org/2018/643.pdf)) can be used to bridge
but should only be used when other options are not available. XCLAIM, in particular, requires any
swappable asset to be backed by a collateral of higher value than the swappable assets, which adds
additional overhead.

An example of a network that would be well-suited for higher-order protocols would be Bitcoin, since
it does not support smart contracts, and it's not based on Substrate.

#### Bitcoin Bridge (XCLAIM \<-\> Substrate \<-\> Polkadot)

The Interlay team has written a [specification](https://spec.interlay.io/) on a Bitcoin bridge that
is based on the [XCLAIM](https://eprint.iacr.org/2018/643.pdf) design paper. The protocol enables a
two-way bridge between Polkadot and Bitcoin. It allows holders of BTC to issue iBTC in Polkadot and
holders of iBTC to redeem BTC on the Bitcoin chain.

The Bitcoin bridge, as documented in the specification, is composed of two logically different
components:

- The XCLAIM component maintains all accounts that own iBTC.
- The BTC-Relay verifies the Bitcoin state when a new transaction is submitted.

For full details on how it works, please refer to the specification.

There is now a
[working implementation and mainnet bridge available](https://app.interlay.io/btc?tab=issue).

## Offchain Bridge Components

Offchain bridge components are separate processes called relayers. Relayers are connected both to
the source chain and target chain nodes. For instance, the task of relayer between chains that run
on GRANDPA consensus is to submit source chain GRANDPA justifications and their corresponding
headers to the Bridge GRANDPA Finality Pallet deployed at the target chain. For that, the relayer
subscribes to the source chain GRANDPA justifications stream and submits every new justification to
the target chain GRANDPA light client.

Messages between chains are relayed through the relayers, which involve messages delivery relay and
delivery confirmation relay. For more information on relayers and the Bridge Hub design, read
through the
[High-level bridge documentation on the Polkadot-SDK repository](https://github.com/paritytech/polkadot-sdk/blob/master/bridges/docs/high-level-overview.md).

## Bridge Comparison

[Snowbridge](./learn-snowbridge.md) and [Hyperbridge](./learn-hyperbridge.md) are two trustless
bridges that connect Polkadot with other ecosystems. Here below is a main technical comparison
between the two.

!!!danger "Tokens sent through different bridges are different"
    Unless specific logic is implemented, WETH sent through Snowbridge cannot be sent back using Hyperbridge, and _vice versa_. **Sending tokens using different bridges might lead to loss of funds.**

|                                                                                                                       Snowbridge                                                                                                                       |                                                                                                          Hyperbridge                                                                                                          |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                               Ethereum only<sup>1</sup>.                                                                                                               |                                                                                                          Multichain.                                                                                                          |
|                                               Ethereum light client on [Bridge Hub System Chain](./learn-system-chains.md#bridge-hub)<sup>2</sup> and Polkadot light client on Ethereum smart contract.                                                |                                                                                                        Own parachain.                                                                                                         |
|                                                                                                              [DOT token](./learn-DOT.md).                                                                                                              |                                                                                                   Hyperbridge native token.                                                                                                   |
|                                                                                    [Random-sampling BEEFY](./learn-snowbridge.md#random-sampling-beefy) for prover.                                                                                    |                                                                                                    Zero-knowledge Proofs.                                                                                                     |
|                                                                                                 Simple codebase but complex analysis by the verifier.                                                                                                  |                                                                                    Complex codebase, but simple analysis by the verifier.                                                                                     |
|                                                                                                     Low-spec hardware for prover, permissionless.                                                                                                      |                                                              High-spec hardware for prover, permissionless but somewhat permissioned due to the ZK-based nature.                                                              |
|                                                                                                  Possible high-level decentralization for the prover.                                                                                                  | Prover decentralization possible but probably by removing dependency on ZK circuits through BLS ([Boneh–Lynn–Shacham](https://en.wikipedia.org/wiki/BLS_digital_signature)) version of BEEFY and BLS precompiles on Ethereum. |
| Ethereum > Polkadot: In the range of [10-20 minutes](https://app.snowbridge.network/status). Polkadot > Ethereum: High latency (half an hour) as two epochs are needed on Ethereum to achieve unpredictable randomness to update the Polkadot's state. |                          Ethereum > Polkadot: In the range of 10-20 minutes (to Polkadot, both bridges have the same latency). Polkadot > Ethereum: Low latency, 5-7 minutes on reference hardware.                           |
|                                      Dependency on external library for BLS signature verification ([Milagro BLS](https://github.com/sigp/milagro_bls), used by Lighthouse, the Rust Ethereum consensus client).                                       |                                                Dependency on external libraries due to ZK-based nature. Such libraries include [PLONK](https://eprint.iacr.org/2019/953.pdf).                                                 |
|                                                                                                 [XCM](./learn-xcm.md) as a cross-chain message format.                                                                                                 |                                                                   [ISMP](https://docs.hyperbridge.network/protocol/ismp) as a bridge integration protocol.                                                                    |
|                                                                                                                         Live.                                                                                                                          |                                                                                                             Live.                                                                                                             |

<sup>1</sup> WETH sent through different bridges are different. Unless specific logic is
implemented, WETH sent through Snowbridge cannot be sent back using Hyperbridge.<br/><br/>

<sup>2</sup> Because Snowbridge is deployed on a system chain, Snowbridge WETH can be considered as
the "official" WETH on Polkadot (although this must not be interpreted as a positive sign for
Snowbridge and negative sign for Hyperbridge).<br/><br/>

## Resources

- [Snowbridge - a trustless, decentralized bridge between Polkadot and Ethereum](https://docs.snowbridge.network/)
- [Parity Bridges Common Resources](https://github.com/paritytech/parity-bridges-common)
- [Substrate/Ethereum Bridge](https://github.com/ChainSafe/ChainBridge) - ChainSafe and Centrifuge
  were awarded a grant in W3F Grants
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a Substrate to Ethereum two-way bridge.
- [iBTC (Bitcoin \<-\> Polkadot Bridge)](https://docs.interlay.io/#//)
- [EOS Bridge](https://github.com/bifrost-codes/bifrost) - The Bifrost team was awarded a grant in
  W3F Grants
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a bridge to EOS.
- [Tendermint Bridge](https://github.com/ChorusOne/tendermint-light-client) - ChorusOne was awarded
  a grant in
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a GRANDPA light client in Tendermint.
- [Interlay BTC Bridge](https://app.interlay.io/btc?tab=issue) - The Interlay team was awarded a
  grant in W3F grants
  [Wave 5](https://medium.com/web3foundation/web3-foundation-grants-wave-5-recipients-2205f4fde096)
  to build a trust-minimized BTC bridge.
- [ChainX BTC Bridge](https://github.com/chainx-org/ChainX/tree/master/xpallets/gateway/bitcoin) -
  ChainX has implemented a BTC to Substrate bridge for their parachain.
- [POA Network](https://poa.network/)
- [Case study](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772) of POA
  Network's implementation of Parity's bridge chain solution.
- [Edgeth Bridge](https://github.com/hicommonwealth/edgeth_bridge/) - a bridge from Ethereum to
  Edgeware chain (a Substrate-based chain) is now defunct and not maintained, but it is a good
  example.
- [XCLAIM](https://eprint.iacr.org/2018/643.pdf) - XCLAIM is a framework for achieving trustless and
  efficient cross-chain exchanges using cryptocurrency-backed assets.
- [Celer cBridge](https://github.com/celer-network/cBridge-contracts) - a bridge to transfer assets
  from Ethereum & Binance Smart Chain to the Astar Polkadot EVM.
