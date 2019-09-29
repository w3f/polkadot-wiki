---
id: build-pdk
title: Parachain Development Kits (PDKs)
sidebar_label: Parachain Development Kits (PDKs)
---

PDK (Parachain Development Kit)는 개발자가 폴카닷(Polkadot)에 호환되는 [패러체인(parachains)](learn-parachains)을 쉽게 만들 수 있도록 해주는 툴 셋입니다.

## 왜 parachain을 만드나요?

PDK가 무엇이고 어떻게 사용되는지 알아보기 전에 _왜_ 개발자가 패러체인(parachain)을 만들고 폴카닷(Polkadot)에 연결하길 원하는지 다시 논의해봅시다.

parachain은 개발자에게 독립된 체인을 만드는 것보다 바람직한 두 가지 주요 부가 기능을 제공합니다.

- _Shared security_ - 체인 자체의 밸리데이터 셋을 부트스트래핑 할 필요성을 없앱니다.
- _인터체인 Interchain communication_ - ICMP 프로토콜을 통해서 parachain들 끼리 서로 상호운용(interoperate)하게 합니다.

패러체인(Parachains)은 패러체인 슬롯에 [DOT](learn-DOT)을 저당잡은 후 폴카닷(Polkadot) [네트워크의 보안을 빌려올 수 있습니다](learn-security). 즉, 프로젝트를 둘러싼 커뮤니티를 구축하고 네트워크 보안에 참여할 수있는 밸리데이터를 설득하는 사회적 비용이 감소합니다. 폴카닷(Polkadot)은 강력한 보안성을 가질것이며 분산 어플리케이션 프로젝트는 패러체인(parachain)이 되어서 이런 보안기능을 통해 이득을 얻기를 원할것이라고 예상할 수 있습니다. candle 경매를 통해 패러체인(parachain)슬롯을 발리는 매커니즘에 대한 내용은 [여기](learn-auction)를 참조하십시오.

이미 폴카닷(Polkadot)에 연결된 다른 패러체인(parachains)에 신뢰가 필요없는(trustless) 메시징을 하려는 분산 어플리케이션이나 체인은 패러체인(parachain)이 되길 원합니다. 독립된 체인 간의 상호 운용성에는 광범위한 체인 간에 사용할 수 있도록 특정 제약조건과 복잡한 프로토콜을 포함합니다. 폴카닷(Polkadot)를 사용해서 어플리케이션을 패러체인(parachain)으로 빌드하면 이 기능을 사용할 수 있습니다. [ICMP 프로토콜](learn-interchain)은 어떤 패러체인(parachains)이라도 서로 메시지를 전달해서 상호 운용(interoperate)할 수있게 합니다. 더해서,다른 체인에 대한 브릿지가 런칭된다면 (예를 들어 Bitcoin 또는 Ethereum) 패러체인(parachain)은 다른 체인과 함께 운영이 가능해집니다.

## PDK가 뭔가요?

얘기했다시피 PDK는 개발자가 패러체인(parachain)을 쉽게 만들 수 있게 하는 툴 세트입니다. 실제로 이것은 PDK가 두 가지 주요 구성 요소로 구성된다는 것을 의미합니다.

- _상태 전이 함수  (State transition function)_ - 어플리케이션이 한 상태에서 다른 상태로 이동하는 방법.
- _검사기 노드 (Collator node)_ - 패러체인(parachain)에 대해서 특정 책임을 지는 폴카닷(Polkadot)네트워크 내의 P2P 노드 타입.

상태 전이 함수(STF)는 응용 프로그램이 하나의 상태에서 다른 상태로 이동하는 모든 추상적인 방법 일 수 있습니다. 이 STF에 대해서 Polkadot이 두는 유일한 제약은 쉽게 증명할 수 있어야 한다 라는 것입니다. 일반적으로 우리는 _증인_ 이나 _증거_ 라고 부릅니다. 릴레이 체인 밸리데이터는 검사기(collator) 노드로부터 받은 각 상태가 실제로 전체 계산을 거치지 않고 올바른지 확인해야하기 때문에 그렇게 해야 합니다.

이러한 증명의 일부 예로는 Proof-of-Validity 블록 또는 블록을 생성하는 데 필요한 것보다 계산 자원이 적게 필요한 zk-SNARK가 포함됩니다. STF의 증명 생성 내에서 검증 비대칭성(verficaition asymmetry)은 폴카닷(Polkadot)이 높은 보안 보증을 유지하면서 확장을 할 수 있게 하는 필수 불가결한 인사이트 중 하나입니다.

## 어떤 종류의 PDK가 있나요?

검사기(Collator) 노드는 폴카닷(Polkadot) 프로토콜의 네트워크 메인테이너(maintainer) 유형 중 하나입니다. 그들은 패러체인(parachain)의 상태와 상태 전이 함수의 반복(iteration)에서 반환 된 새로운 상태의 **가용성을 유지하는 것에(keeping availability)** 대해서 책임이 있습니다. 검사기(collator)노드는 상태(state)를 기록하고 와 ICMP 메시지를 자신과 다른 패러체인간 라우팅 한 것을 기록하기 위해서 온라인 상태를 반드시 유지해야 합니다. 검사기(Collator) 노드는 간결한(succint) 증명을 릴레이 체인 밸리데이터로 전달하고 릴레이 체인에서 최신 블록을 추적해야 되는 역할을 맡고 있습니다. 본질적으로 검사기(collator) 노드는 폴카닷(Polkadot) 릴레이 체인의 라이트 클라이언트로도 작동합니다. 검사기(collator) 노드에 대한 자세한 내용은 [여기](maintain-collator)를 참조하십시오.

현재 유일한 PDK는 Parity의 [서브스트레이트(Substrate)](https://github.com/paritytech/substrate) 와 [Cumulus](https://github.com/paritytech/cumulus)입니다. 서브스트레이트(Substrate)는 블록체인에서 기본적으로 만들어지는 블록(네트워킹 레이어, 합의, Wasm 인터프리터 같은 것들)을 제공하고 런타임을 구성하는 직관적인 방법을 제공하는 블록체인 프레임워크입니다. 서브스트레이트(Substrate)는 새로운 체인을 만드는 과정을 쉽게 만들었지만 폴카닷(Polkadot) 호환성을 직접적으로 지원하지는 않습니다. 이런 이유로 Cumulus에 추가된 라이브러리에 Polkadot 호환성 글루(glue)코드가 모두 포함됩니다. Cumulus는 아직 개발 중이지만, crate를 임포트 하고 코드 한 줄을 추가해서 서브스트레이트(Substrate)체인을 가져와서 패러체인(parachain)코드를 추가하는 것이 간단해야 한다 라는 아이디어가 있습니다.

서브스트레이트(Substrate)와 Cumulus는 블록체인 포맷을 추상화 한 PDK를 제공하지만 패러체인(parachain)이 블록체인이 될 필요는 없습니다. 예를 들어, 패러체인(parachain)은 위의 두 가지 제약 조건, 즉 _상태 전이 함수 (state transition function)_ 및 _검사기 노드(collator node)_ 를 가 있어야 합니다. 다른 모든 것은 PDK를 구현하는 사람에게 달려있습니다.

## PDK 만들기

PDK에 대한 흥미로운 아이디어 중 하나는 개발자가 snark 기반 parachains를 만들 수있는 [roll_up](https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675)키트에 대한 것입니다.
