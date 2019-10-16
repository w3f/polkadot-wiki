---
id: build-build-with-polkadot
title: Polkadot Builders Starter's Guide
sidebar_label: Polkadot Builders Starter's Guide
---

_This article is the up-to-date version of the blog post: [Everything you Need to Know to Prepare for Polkadot](https://medium.com/polkadot-network/everything-you-need-to-know-to-prepare-for-polkadot-32d08b929735)._

@(Polkadot)은 연결된 모든 패러체인들에 **공유된 보안(Shared security)**을 제공하고 연결된 모든 체인이 [ICMP](learn-interchain)를 통해 **상호 운용(interoperate)** 할 수 있도록 하자 라는 두 가지 목표를 가진 블록체인 프로토콜입니다. Parity Substrate 및 Cumulus와 같은 [PDKs](build-pdk)가 등장해서 새로운 체인을 개발하고 런칭하는 데 걸리는 시간이 크게 줄어 들었습니다. 예전엔 새로운 체인을 출시하는 데 몇 년이 걸렸지만 이제 겨우 몇 주나 몇 일밖에 걸리지 않습니다.

이 가이드는 오늘 Polkadot으로 당신의 비전을 오늘 당장 시작해 볼 수 있도록 안내합니다. 그리고 @(parachain)과 스마트 컨트랙트의 차이점을 설명할 것입니다.(그리고 둘 중 다른 하나가 왜 당신의 어플리케이션에 더 적합한 지 알 수 있습니다.) 현재 사용할 수있는 리소스와 곧 제공될 리소스를 배치할 것이므로 올해 후반에 런칭 될 폴카닷(Polkadot) 메인넷에 당신의 애플리케이션을 만들 수 있습니다.

## 우리는 지금 어디쯤 있을까요?

- 메인넷: **End of 2019**
- 현재 PoC 릴리스: **PoC-4**
- 현재 testnet: **Alexander**
- Substrate: **1.0.0-rc**
- Cumulus: **미완성**
- ink!: **프리 알파(Pre-Alpha)**

**알아야 할 것들**: 폴카닷(Polkadot)은 현재 Alexander testnet의 PoC-4 릴리스를 진행했습니다. Alexander testnet은 전체 PoC-3 릴리스 사이클을 ​​통해 3개월 이상 운영 되었습니다. 폴카닷(Polkadot)은 Rust에서 JavaScript까지 [다양한 프로그래밍 언어로 구현됩니다]((learn-implementations)). 현재 최신 구현체가 Rust로 구현되어 있고 서브스트레이트(Substrate) 프레임워크를 사용하여 블록 체인을 개발합니다. 서브스트레이트(Substrate)는 개발자가 네트워킹 프로토콜, 컨센서스 및 Wasm 인터프리터를 포함하여 기본 레이어을 기반으로 전체 블록 체인을 보다 쉽게 ​​개발할 수있게 해주는 라이브러리입니다.  개발 중인 서브스트레이트(Substrate)의 확장 기능인 Cumulus를 사용하면 모든 서브스트레이트(Substrate)로 구축된 체인이 Polkadot에 연결되어 패러체인이 될 수 있습니다. Substrate는 1.0.0릴리스에 가까워지고 있고 API를 결정 할 예정입니다.

서브스트레이트(Substrate)체인은 SRML의 컨트랙트 런타임 모듈을 포함하여 스마트 컨트랙트를 만들 수 있습니다. 컨트랙트 모듈을 사용하면 Wasm으로 컴파일 된 스마트 컨트랙트를 체인에 배포 할 수 있습니다. 컨트랙트의 배포를 쉽게 하기 위해 Parity는 ink!라는 DSL(Domain Specific Language)를 개발했습니다.

폴카닷(Polkadot)은 2019년 말에 mainnet을 런칭 할 예정입니다. 이제 개발 도구들이 생기고 안정화되기 시작했기 때문에 메인넷을 시작하는데 더 좋습니다. 하지만 기다려주세요! 먼저 코드를 들여다보기 전에, Polkadot를 빌드하려는 개발자가 사용할 수있는 다양한 패러다임이 있다는 것을 이해하고 만들고 싶은 분산형 애플리케이션의 종류에 대해 생각해야 합니다.

## 패러체인을 만드는 것과 스마트 컨트랙트를 만드는 것의 차이점은 뭔가요?

폴카닷(Polkadot)은 두 가지 방법으로 어플리케이션을 배포 할 수 있습니다. 기존의 패러체인에 스마트 컨트랙트를 개발하던지 아니면 당신만의 패러체인을 만드는 것입니다. 이 중 한 방법으로 작업 할 때 트레이드 오프가 있으며 이 섹션을 읽으면 트레이드 오프에 대해서 이해하는 데 도움이 됩니다.

패러체인(Parachain)는 폴카닷(Polkadot) 릴레이 체인에서 제공하는 shared security 와 인터체인 메시징의 이점을 누리는 자체 런타임 로직를 포함하는 개별 체인입니다. 패리체인(parachain)은 높은 수준의 유연성과 커스텀을 허용하지만 패러체인을 만들 떄 더 많은 노력이 필요합니다.

폴카닷(Polkadot) mainnet에는 스마트 컨트랙트 플랫폼 역할을 하는 하나 이상의 패러체인(parachain)이 있습니다. 스마트 컨트랙트는 단일 체인에만 존재하며 복잡성이 제한된 실행 프로그램입니다. 스마트 컨트랙트는 단일 체인에 존재하기 때문에 다른 스마트 컨트랙트와 원활한 상호 운용성을 가집니다. 그러나 호스트 체인의 내재된 특성에 의해 항상 제한적입니다.

어플리케이션의 디자인과 기능에 대해서 많은 부분을 제어해야 할 필요가 있는 경우 패러체인(parachain)을 선택하는 것이 더 낫습니다. 스마트 컨트랙트는 나중에 제대로 된 패러체인(parachain)으로 바뀌기 전에 테스트 용도로 사용할 수 있는것에 대해서 염두에 두세요. 스마트 컨트랙트 플랫폼에는 일반적으로 이터레이션(iteration)을 수월하게 만드는 IDE와 같은 편리한 도구가 포함될 것입니다. 패러체인(parachain)을 만들기 위한 모든 작업을 시작하기 전에 유저의 관심도을 측정하기 위해 스마트 계약 MVP를 만들 수 있습니다.

패러체인(parachain)은 처음부터 체인의 통화 시스템을 구축 할 수있는 공간을 제작자에게 줍니다. 복잡한 논리를 스마트 컨트랙트 플랫폼 보다 좀 더 간결하고 효율적으로 실행할 수 있게 합니다. 또한 패러체인(parachain)은 거버넌스의 형태로 더 많은 것들을 제공하며 지금같은 하드포크 프로세스보다 덜 논쟁적인 방식으로 완전한 업그레이드를 할 수 있습니다.

패러체인(parachain)에서 할 수 있는 기능들의 몇가지 예시를 말하자면,

Some examples of features you can have on a parachain or parathread:

- 수수료 구조 커스텀 (예를 들어 트랜잭션에 대해 고정 수수료를 내거나 바이트 별로 수수료를 낼 수 있게 하는것)
- 자체 토큰을 위한 커스텀 인플레이션 정책 (Custom inflation policy for the native token)
- 스테이트 함수의 변화를 통해 자금을 모금하는 것 (Treasury to be funded through transitions in your state function)
- 온체인 자금을 분배하는 역할을 가진 DAO를 관리할 수 있는 거버넌스 매커니즘

![build 1](assets/build-1.png)

또한 패러체인(parachain)과 스마트 컨트랙트를 결합하여 사용할 수도 있습니다. 루프가 필요한 특정 로직이 있고 제거 할 수 없다면 내장된 패러체인(parachain) 런타임을 사용하여 모든 복잡한 로직을 처리하고 스마트 컨트랙트는 이터레이션을 호출하는 방법을 쓰면 됩니다.

대부분의 경우 어플리케이션이 패러체인(parachain)을 사용하는 방법이나 다른 방법이 (또는 둘의 하이브리드)에 더 잘 어울리는 것을 이미 알았을 것입니다. 그러나 정보를 요약하기 위해 간단한 요약본이 필요할 경우 다음 비교차트를 치트시트로 사용할 수 있습니다. :

Most likely you’ve already realized that your application is better suited to be one or the other (or a hybrid of them both ), but if you need a quick recap to digest the information, you can use this comparison chart as a cheat sheet:

![build 2](assets/build-2.png)

> Substrate 개발자 허브-> [**여길 클릭해보세요.**](https://docs.substrate.dev)

이제 패러체인(parachain)을 구축하는 것이 새 프로젝트에 적합한 방법이라는 결론을 얻었으므로 다음 단계는 사용할 프레임 워크를 결정하는 것입니다. 현재로는 서브스트레이트(Substrate)가 패러체인 개발을 위한 유일한 프레임워크 입니다.

- [패러체인(parachain)으로 만들고 싶어요!](#so-you-want-to-build-a-parachain-or-parathread)
- [스마트 컨트랙트로 만들고 싶어요!](#so-you-want-to-build-a-smart-contract)

## 패러체인(parachain)을 만들길 원한다면

앞으로 C++, Rust, Go 및 JS를 통해 다양한 언어로 많은 [폴카닷(Polkadot) 런타임 구현체](learn-implementations)가 생길 겁니다.

위에서 언급했듯이 서브스트레이트(Substrate)는 폴카닷(Polkado)t 자체가 만들어지는 기본 프레임워크 입니다. 블록체인을 도입하려는 사람들을 위한 툴셋이며 체인 구성에 필요한 빌딩 블록을 제공합니다. 서브스트레이트(Substrate)에는 더 복잡한 체인 논리를 작성할 수있는 모듈식 플러그 인 라이브러리(library of modular plug-in)가 포함되어 있습니다.

> **Call to Action:** Do you want to build a Parachain Development Kit from scratch? The Web3 Foundation is giving grants to teams who are doing this, learn more and apply on the [W3F grants page](https://grants.web3.foundation).

### 서브스트레이트(Substrate)로 시작하기

Parity Technologies가 만들고 유지 관리하는 온라인 리소스 인 서브스트레이트(Substrate) 개발 Hub에 가서 살펴보는 것이 서브스트레이트(Substrate)를 시작하는 가장 좋은 방법입니다.

일반적인 패턴에 익숙해지기 위해 개발자 허브를 뒤져보는 것이 좋습니다. 확실히 이해를 한 후에는 Substratekitties 워크샵을 통해서 스스로에게 도전해보고 TCR Dappchain 튜토리얼로 넘어가서 진행하면 됩니다.

서브스트레이트(Substrate)로 체인 로직을 만든 후에는 @(Wasm)실행 파일로 컴파일 할 수 있습니다. 이 Wasm 코드 Blob은 만들어진 패러체인(parachain)의 전체 스테이트 전이 함수를 포함합니다.

### 패러체인(parachain)을 만드는 방법

폴카닷(Polkadot) 릴레이 체인의 밸리데이터는 이 Wasm BLOB를 사용하여 만들어진 패러체인(parachain)의 모든 스테이트 전이를 확인합니다.

폴카닷(Polkadot) 밸리데이터 가 패러체인(parachain)의 최근 스테이트 전이를 최신상태로 유지하기 위해서 필요한 인프라가 있습니다. 위에서 설명한 작업은 패러체인(parachain)의 검사기(collator) 노드에 의해 수행됩니다.

서브스트레이트(Substrate)에는 자체 네트워킹 레이어가 내장되어 있지만 폴카닷(Polkadot)-호환 검사기(collator) 노드는 네트워킹 레이어가 지금 당장은 없습니다.

이를 위해 Parity Technologies는 서브스트레이트(Substrate)에 대한 확장기능인 Cumulus를 개발하여 서브스트레이트(Substrate)로 만들어진 체인을 폴카닷(Polkadot)에 연결할 준비가 된 패러체인(parachain)으로 쉽게 전환 할 수있게합니다.

#### 뭉게구름(Cumulus)

[Cumulus](cumulus)는 서브스트레이트(Substrate)의 확장기능이며 폴카닷(Polkadot)과 호환되는 서브스트레이트(Substrate) 런타임을 만드는 것이 목표입니다.

폴카닷(Polkadot)에 연결하기 위해 모든 패러체인(parachain)이 구현해야하는 아래항목들이 포함된 네트워크 호환 오버헤드(network compatibility overhead)를 다룹니다.

- 인터체인 메시지 전달 (Interchain message passing)
- 특별 검사기 노드 셋업 (Out-of-the-box Collator node setup)
- 릴레이 체인의 내장 라이트 클라이언트  (An embedded light client of the relay chain)
- 폴카닷(Polkadot) 블록 출처 호환 (Polkadot block authorship compatibility)
- Cumulus를 서브스트레이트(Substrate) 체인에 통합하면 최소한의 수정으로 폴카닷(Polkadot)에서 작업 할 수있는 패러체인(parachain)으로 이식 할 수 있습니다. crate를 불러와서 한 줄을 추가하는 것과 같은 작은 작업으로도 가능합니다.

폴카닷(Polkadot)의 공동 창업자인 Rob Habermeier가 최근 EthCC에서 Cumulus의 최근 개발상황에 대해서 말했습니다. 아래에서 비디오를 보실 수 있습니다.

[![img](http://img.youtube.com/vi/thgtXq5YMOo/0.jpg)](https://www.youtube.com/watch?v=thgtXq5YMOo)

### 폴카닷(Polkadot)에 패러체인(parachain)을 포함시키는 방법

#### Parachain

패러체인(parachain)을 Polkadot 네트워크에 포함 시키려면 패러체인(parachain)슬롯을 확보해야합니다.

패러체인(parachain)슬롯은 공개 입찰로 판매되며, 그 메커니즘은 위키의 [parachain auction](learn-auction) 페이지에서 확인할 수 있습니다.

#### Parathread

폴카닷(Polkadot) 릴레이 체인 자체는 스마트 컨트랙트를 지원하지 않을 것입니다. 그러나 폴카닷(Polkadot)는 여러 다른 종류의 블록체인의 네트워크이므로 패러체인(parachain)이 스마트 컨트랙트를 지원 할 것입니다.

이미 Parity Technologies는 스마트 컨트랙트 기능을 포함하길 원하는 패러체인(parachain)을 위해 즉시 사용 가능한 솔루션의 기초 작업을 해놓았습니다. 코어 SRML의 서브스트레이트(Substrate) [contract](https://github.com/paritytech/substrate/tree/master/srml/contract) 모듈은 Wasm으로 컴파일 된 스마트 컨트랙트을 지원합니다.

## 스마트 컨트랙트를 만들기를 원할 경우

Wasm으로 컴파일되는 스마트 컨트랙트를 개발하기 위해서는 적절한 언어가 필요합니다. 이를 위해 Parity는 [잉크](#ink)라는 DSL(Domain Specific Language)을 개발하고 있습니다.

[Edgeware](#edgeware)는 스마트 컨트랙트를 지원하는 폴카닷 패러체인(Polkadot parachain)이 될 의사가 있다고 발표한 프로젝트 입니다. 생태계가 성숙함에 따라 더 많은 블록체인들이 스마트 컨트랙트가 가능한 패러체인(parachain)으로 될 확률이 높습니다.

폴카닷(Polkadot)은 또한 브릿지를 통해 Ethereum 및 Tezos와 같은 기존 스마트 계약 플랫폼과 호환 될 것입니다. 즉, 오늘 이런 플랫폼에서 개발 된 작업조차도 향후 폴카닷(Polkadot)에서 실행할 수 있습니다.

Edgeware는 폴카닷(Polkadot)을 위해 계획된 패러체인(parachain)이고 스마트 컨트랙트 기능도 작동 할 것입니다. 거버넌스 및 토큰 배포와 관련된 다른 흥미로운 혁신과 함께 스마트 컨트랙트 기능이 활성화 된 폴카닷(Polkadot) 메인넷에 연결되는 최초의 패러체인(parachain)이 될 것입니다. [웹 사이트](https://edgewa.re)에서 프로젝트의 최신 정보를 얻을 수 있습니다.

\[잉크\] (https://github.com/paritytech/ink)는 Rust로 만들어졌으며 스마트 컨트랙트 개발을 위한 새로운 DSL(Domain specific language)이고 Wasm 코드로 컴파일 됩니다. README에 쓰여진 것 처럼, 아직 실험 단계에 있으며 계획된 많은 기능이 빠져 있지만 지금 스마트 컨트랙트를 작정 할 수 있습니다.

### Edgeware

관심있는 개발자의 경우 이미 만들어진 \[예제\]((https://github.com/paritytech/ink/tree/master/examples)를 공부해보고 Ink를 사용하여 스마트 컨트랙트 개발을 시작할 수 있습니다. 이 예제들은 스마트 컨트랙트 패러체인(parachain)에 배포 할 수 있는 더 복잡한 로직을 작성하는것을 도와주는 가이드로 사용할 수 있습니다.

### Ink

WasmVM 기반이며 서브스트레이트(Substrate)체인과 호환되는 잉크!는 새로운 스마트 컨트랙트 스택을 위한 많은 기초작업을 진행했습니다.

서브스트레이트(Substrate)에는 스마트 컨트랙트 체인에 필요한 핵심 로직을 포함하는 컨트랙트 모듈이 포함됩니다. 이 라인을 따라, 잉크!는 Rust로 작성된 스마트 컨트랙트 언어가 될 것입니다. 기존의 Rust 툴링 과 지원을 받을 수 있다는 이점이 있고 Wasm로 컴파일 할 것입니다.

스마트 컨트랙트는 단순하게 말하자면 체인의 주소에 있는 코드이고 외부 액터가 호출 할 수 있습니다. 핵심 부분은 누군가가 실행을 시작하기 전에 실제로 코드를 체인에 두어야한다는 것입니다!

사용할 어떤 특정 패러체인(parachain)인지에 따라서 체인에 스마트 컨트랙트를 배포하는 것은 약간 다를 수 있지만 대개 장부에 스마트 컨트랙트를 작성하는 특별 트랜잭션이 전송됩니다. 스마트 컨트랙트가 소비하는 초기화 로직 및 스토리지에 대한 관련 요금을 지불해야 할 것입니다.

## 스마트 컨트랙트 배포하기

각 플랫폼마다 스마트 컨트랙트 스테이트를 유지하는 다른 지불 방법이 있습니다.

스마트 컨트랙트에 대해 지불하는 다양한 방식은 다음과 같습니다.

## 스마트 컨트랙에 수수료 지불하기

가스 사용량이 합리적인 범위 내에서 유지되도록 스마트 컨트랙트의 저장장치와 복잡성을 고려해야합니다. 저장소는 사용하는 스마트 컨트랙트 플랫폼에 따라 비용이 많이 들 수 있으므로 가능한 한 많은 데이터를 체인에서 분리해야합니다. IPFS 또는 Storj를 사용하여 데이터를 보관하고 체인에있는 컨텐츠 주소만 체인에 저장하는 것을 고려할 수 있습니다.

폴카닷(Polkadot)의 스마트 컨트랙트의 경우 아직 매우 이른 때이고 개발은 이제서야 안정화되고 있습니다. 우리는 최신 정보와 함께 위키를 유지하고 개발자들이 프로젝트에 대해 빨리 파악 할 수 있도록 컨텐츠를 적극적으로 제작하고 있습니다. 또한 다음 링크를 통해 최신 정보를 알아야 합니다.

- 각 트랜잭션 배포와 관련된 트랜잭션 수수료.
- 플랫폼의 사용을 위해 체인 엔티티를 정기적으로 지불하는 구독 모델.
- 플랫폼을 사용하기 위해 자체 토큰의 일정량을 보유해야하는 액세스 토큰 모델 (EOS도 비슷한 모델이 있습니다). 보관료.
- 무료 평가판 또는 개발자 프로모션.
- 대부분의 스마트 컨트랙트 플랫폼은 사용자가 수행 할 수있는 작업의 수를 제한하기 위해 가스 형태를 사용합니다. 사용자는 가스 요금을 먼저 지불해야하며 사용하지 않은 것에 대해서는 환불됩니다.

이 가이드는 멘탈 모델을 제시하고 지금 프로젝트를 패러체인(parachain)로 할 것인지 스마트 컨트랙트로 할 것인지 결정하고 시작하는 데 도움이 되는 필수 리소스를 보여줍니다. 툴링이 여전히 발전하는 중이라도 빨리 시작하는 것의 장점은 프로젝트에 익숙해진다는 것과 앞서서 출발 하는 것이기 때문에 정말 새로운 것을 만들 수 있고 혁신 할 수 있습니다.

### 여전히 초기단계예요.

If you have interesting ideas for parachains or smart contracts on Polkadot feel free to drop in to the [Polkadot Watercooler](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org) to talk about them. Developers may be interested in joining the [Polkadot Beginners Lounge](https://riot.im/app/#/room/#polkadotnoobs:matrix.org) or [Substrate Technical](https://riot.im/app/#/room/#substrate-technical:matrix.org) to ask their questions. As always, keep up to date with Polkadot by following the [social channels](https://wiki.polkadot.network/en/latest/community/). Good luck!

- [Edgeware](https://edgewa.re).
- [ink!](https://github.com/paritytech/ink). (Wiki 탭에서 내용을 확인하세요.)
- [Substrate contracts module](https://github.com/paritytech/substrate).

## 결론 (Conclusion)

This guide has given you a mental model and shown the requisite resources to help you determine and start building your project as a parachain or smart contract today. Even though the tooling is still maturing, the advantage of being early will be the familiarity and head start on your project, allowing you to innovate and create something truly new.

If you have interesting ideas for parachains or smart contracts on Polkadot feel free to drop in to the [Polkadot Watercooler](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org) to talk about them. Developers may be interested in joining the [Polkadot Beginners Lounge](https://riot.im/app/#/room/#polkadotnoobs:matrix.org) or [Substrate Technical](https://riot.im/app/#/room/#substrate-technical:matrix.org) to ask their questions. As always, keep up to date with Polkadot by following the [social channels](https://wiki.polkadot.network/en/latest/community/).

Good luck!
