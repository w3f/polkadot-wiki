---
id: learn-bridges
title: 브릿지(Bridges)
sidebar_label: 브릿지(Bridges)
---

블록체인 간 상호연결에 대해 핵심적인 개념 중 하나는 브릿지의 역할입니다. 어떤 부분은 폴카닷에서 브릿지 노드가 어떻게 작동할건지에 대해서 정확히 정해지지 않은 부분이 있지만 이 페이지는 현재 진행되고 있는 최신 정보를 전달하고 있으며 업데이트가 생길 시 바로 반영이 될 것입니다.

현재는 폴카닷에 브릿지 노드로 연결하는 방법은 3가지 경우가 있습니다.

* *브릿지 스마트 컨트랙트(Bridge contracts)* - 폴카닷과 외부 체인에 둘다 배포된 브릿지 스마트 컨트랙트
* *패러체인 간 통신(Cross-parachain communication)* - 스마트 컨트랙트 없이 패러체인 간 통신 프로토콜을 이용하는 방법
* *브릿지 노드 모듈(In-built bridging modules)* - 브릿지에 맞게 외부체인에 대하여 최적화된 모듈로 폴카닷에 연결하는 방법

## 브릿지 스마트 컨트랙트

이더리움을 아시는 분은 [패리티 브릿지](https://github.com/paritytech/parity-bridge)가 스마트 컨트랙트를 이용해 PoA 사이드체인을 이더리움 메인넷에 연결하는 방법을 알 것입니다. 브릿지는 두개의 스마트 컨트랙트들로 이루어져 있으며 하나씩 각 체인에 체인 간 자산이동이 가능하게끔 하나씩 배포됩니다. 패리티 이더리움의 개념증명과 같은 경우, `메인`과 `사이드`로 두 개의 이더리움 체인들을 연결합니다. 이더가 `메인`체인에 있는 스마트 컨트랙트에 보내지면 `사이드`체인에 있는 ERC-20 스마트 컨트랙트에 토큰으로서 양이 채워지게 됩니다. 이와 비슷한 방식으로 사이드 체인에 있는 스마트 컨트랙트의 ERC-20토큰이 사라짐으로서 `메인`체인에 있는 이더로 되돌릴 수 있습니다.

폴카닷의 경우,  브릿지 스마트 컨트랙트가 배포된 EVM기반의 체인과 스마트 컨트랙트를 사용할 수 있는 패러체인이 간에서도 가능합니다. 이 방법으로만 한정되어 있지는 않지만, 튜링완전 기능을 제공하는 패러체인이 있을 때 폴카닷과 스마트 컨트랙트를 지원하는 외부 블록체인을 이어주는 일반적인 방법으로 사용될 수 있습니다.

## 크로스-패러체인 커뮤니케이션(Cross-Parachain Communication)
[패러체인](learn-parachains) 페이지에 언급된 바와 같이, 패러체인 간에는 스마트 컨트랙트 필요없이 메세지나 블록체인 트랜젝션만으로도 서로 브릿지와 같은 기능을 수행할 수 있습니다. 크로스 패러체인 메세징은 주된 폴카닷의 블록체인 간 상호연결 방식이 될 것입니다.

## 내장 브릿징 모듈(In-built Bridging Modules)

패러체인이 아닌(서브스트레이트로 만들어진 체인이 아닌) 외부 체인으로부터 패러체인으로 보내는 트랜젝션은 패러체인의 모듈로서 받아들일 수 있습니다. 이는 브릿지 스마트 컨트랙트의 필요성을 없앰과 동시에 외부 체인을 "가상 패러체인"과 같이 만들 수 있습니다. 외부체인의 트랜젝션에 맞춤 제작된 전달자(Collator)가 외부체인의 트랜젝션들을 모아서 패러체인이 릴레이체인에 전달하듯이 보낼 수 있습니다.

브릿지 모듈은 현재 비트코인이나 이더리움 같은 외부체인에 기반해서 만들어지고 있으며, 이는 곧 비트코인 기반이나 이더리움 기반인 다른 블록체인들(e.g. bitcoin cash, bitcoin gold, bitcoin diamond, ethereum classic, etc)은 폴카닷에 브릿지 스마트 컨트랙트나 패러체인없이 연결이 가능해질 것입니다. 이러한 방식으로 연결되는 외부 블록체인은 폴카닷에 의해 더 빠르게 트랜젝션을 처리할 수 있을 것입니다.

폴카닷에 연결될 내장 브릿징 모듈이 없는 외부 체인은 위에서 언급한 스마트 컨트랙트 브릿지를 설치하여야 합니다.

## 참고자료들 (Resources)

### 스마트 컨트랙트 브릿지 (Smart Contract Bridges)

- [Edgeth Bridge](https://github.com/hicommonwealth/edgeth_bridge/) - 이더리움에서 에지웨어 간 브릿지 (서브스트레이트 기반 체인)
- [Parity Bridge](https://github.com/paritytech/parity-bridge)
- [POA Network](https://poa.network/)
- POA Network의 패리티 브릿지 체인 솔루션 [개발 후기](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772)

### 런타임 모듈 브릿지 (Runtime Module Bridges)

- [ChainX BTC Bridge](https://github.com/chainx-org/ChainX/tree/develop/cxrml/bridge/btc) - ChainX는 BTC를 서브스트레이트 패러체인에 브릿지 모듈을 개발해서 브릿지를 만들었습니다.

### 디자인 (Design)

- [XClaim](https://eprint.iacr.org/2018/643.pdf) - 신용 따위 필요없이 투명하게 Proof-of-Work 컨센서스 블록체인에 대해 브릿지를 만드는 방법
