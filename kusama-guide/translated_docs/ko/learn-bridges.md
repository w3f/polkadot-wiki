---
id: learn-bridges
title: 브릿지(Bridges)
sidebar_label: 브릿지(Bridges)
---

One of the central ideas in blockchain intercommunication is the role of bridges. Some of the exact details of how bridging will work in Polkadot have yet to be decided; please consider this page a work in progress. It will be updated as more details are determined.

현재는 폴카닷에 브릿지 노드로 연결하는 방법은 3가지 경우가 있습니다.

- *브릿지 스마트 컨트랙트(Bridge contracts)* - 폴카닷과 외부 체인에 둘다 배포된 브릿지 스마트 컨트랙트
- *패러체인 간 통신(Cross-parachain communication)* - 스마트 컨트랙트 없이 패러체인 간 통신 프로토콜을 이용하는 방법
- _In-built bridging modules_ - Bridging to Polkadot from an external chain via a purpose-built module.

## 브릿지 스마트 컨트랙트

Those who are already familiar with Ethereum may know of the [Parity Bridge](https://github.com/paritytech/parity-bridge) and the efforts being made to connect PoA sidechains to the Ethereum mainnet. The bridge is a combination of two smart contracts, one deployed on each chain, that allow for cross-chain transfers of value. As an example of usage, the initial Parity Bridge proof of concept connects two Ethereum chains, `main` and `side`. Ether deposited into the contract on `main` generate a balance denominated in ERC-20 tokens on `side`. Conversely, ERC-20 tokens deposited back into the contract on `side` can free up Ether on `main`.

In the case of Polkadot, it should be possible to have a bridge contract deployed on, say, an EVM-based standalone chain and a contract deployed on a smart contract capable parachain. This would not necessarily be the most efficient method of bridging, but given the generality of a Turing-complete parachain it would be possible to bridge Polkadot and any other smart contract capable blockchain.

## 크로스-패러체인 커뮤니케이션(Cross-Parachain Communication)

As mentioned on the [parachains](learn-parachains) page, parachains will be able to send messages (including transactions) to each other without the need for smart contracts to perform the bridging functionality. Cross-parachain messaging will be native to Polkadot.

## 내장 브릿징 모듈(In-built Bridging Modules)

Receiving messages on a parachain from a non-parachain blockchain will likely be done natively within a module of the client software. This would negate the need for bridging contracts and allow non-parachains to act as "virtual parachains". Collators for the specific blockchain can then collate transactions or other state transitions, and submit them to the relay chain as if the blockchain were a parachain.

The bridging modules will likely be written with particular parachains in mind (e.g. Bitcoin, Ethereum), which means that any blockchain that's based on either of those should be able to be bridged directly to Polkadot without the need of going through a bridge contract on a parachain. This should allow for faster execution for those chains that are compatible.

For the standalone chains that don't have an in-built bridging module on Polkadot, it will be necessary to deploy bridge contracts (see above).

## 참고자료들 (Resources)

### 스마트 컨트랙트 브릿지 (Smart Contract Bridges)

- [Edgeth Bridge](https://github.com/hicommonwealth/edgeth_bridge/) - a bridge from Ethereum to Edgeware chain (a Substrate-based chain).
- [Parity Bridge](https://github.com/paritytech/parity-bridge)
- [POA Network](https://poa.network/)
- [Case study](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772) of POA Network's implementation of Parity's bridge chain solution.

### 런타임 모듈 브릿지 (Runtime Module Bridges)

- [ChainX BTC Bridge](https://github.com/chainx-org/ChainX/tree/develop/cxrml/bridge/btc) - ChainX have implemented a BTC to Substrate bridge for their parachain.

### 디자인 (Design)

- [XClaim](https://eprint.iacr.org/2018/643.pdf) - XClaim design for bridging Proof-of-Work chains in a trustless way.
