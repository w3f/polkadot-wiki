---
id: build-smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
---

폴카닷(Polkadot) 릴레이 체인은 스마트 컨트랙트를 기본적으로 지원하지 않습니다. 그러나 폴카닷(Polkadot)의 패러체인(parachain)은 스마트 컨트랙트를 지원합니다. 이미 [Edgeware](https://edgewa.re)와 같은 발표된 프로젝트와 서브스트레이트 내장 [컨트랙트 모듈](https://crates.parity.io/srml_contract/index.html)로 인해 더 많은 패러체인(parachain)이 이 기능을 지원할 수 있습니다.

## Resources

Substrate 기반의 패러체인(parachain)에 배포 할 스마트 컨트랙트 작성을 시작하려는 개발자가 현재 사용할 수있는 리소스 목록입니다.

- [ink!](https://github.com/paritytech/ink) - 스마트 컨트랙트를 작성하기 위한 Parity의 ink.
- [첫번째 컨트랙트 배포하기](https://github.com/paritytech/ink/wiki/Deploying-Your-First-Contract) - 제공되는 `flipper` 컨트랙트 배포 가이드.
- [첫번째 컨트랙트 작성하기](https://github.com/paritytech/ink/wiki/Writing-Your-First-Contract) - `flipper` 컨트랙트를 어떻게 작성하는지에 대한 가이드.
- [서브스트레이트 컨트랙트 워크샵 (Substrate contracts workshop)](https://shawntabrizi.github.io/substrate-contracts-workshop/#/) - `ink!`를 사용하고 ERC20 토큰을 어떻게 작성하는지에 대한 과정을 안내합니다.

## 예시

아래는 스마트 컨트랙트의 커뮤니티 예시들 입니다. 스마트 컨트랙트 예시에 대해서 작업하고 있다면 이 페이지에 추가 하도록 요청 할 수 있습니다!

- [Ownable](https://github.com/JesseAbram/foRust/) - OpenZeppelin `Ownable` 컨트랙트 포팅 구현체.

## 스마트 컨트랙트와 패러체인의 배포에는 어떤 차이점이 있나요?

### 추상화 레이어 (Layer of Abstraction)

스마트 컨트랙트를 작성할 때 특정 체인 주소에 배포되고 연관되는 지침을 작성합니다.

비교해 보면, 런타임 모듈은 체인의 상태 전이 함수라고하는 상태 전이 로직의 전체 로직입니다.

스마트 컨트랙트는 업그레이드 가능성을 의식적으로 구현해야하며 패러체인(parachains)은 루트 명령이나 거버넌스 모듈을 통해 코드를 완전히 교체 할 수 있는 기능이 있어야 합니다.

스마트 컨트랙트를 작성할 경우에는 결국 자체 환경이 있는 타겟 체인에 배포됩니다. 패러체인(Parachains)을 사용하면 개발자가 자신의 체인 환경을 선언 할 수 있을 뿐만 아니라 다른 사람들이 스마트 컨트랙트를 작성할 수 있습니다.

### 가스 수수료 (Gas Fees)

스마트 컨트랙트가 자체 실행을 제한하는 방법을 찾지 않으면 전체 노드가 DOS 공격에 취약합니다. 예를 들어 스마트 컨트랙트의 무한 루프는 체인 전체의 계산 자원을 소비하여 다른 사람이 사용하지 못하도록 할 수 있습니다. [halting problem](https://en.wikipedia.org/wiki/Halting_problem)은 강력한 프로그래밍 언어를 사용하면 프로그램이 실행을 중단할지 여부를 미리 알 수 없다는 것을 보여줍니다. 비트코인과 같은 일부 플랫폼은 매우 제한된 스크립팅 언어를 제공함으로써 이러한 제약을 극복합니다. 이더리움과 같은 다른 플랫폼들은 스마트 컨트랙트 "가스"를 통해 자신의 코드를 실행할 수있는 권리를 "청구"합니다. 스마트 컨트랙트가 실행이 중단되지 않는 상태가 되면 결국에는 가스가 없어져서 실행이 중단되고 스마트 컨트랙트로 만들어진 모든 상태 전이가 롤백됩니다.

패러체인(Parachains)는 임의로 강력한 프로그래밍 언어를 구현할 수 있으며 자체적인 로직에 대한 가스 개념을 포함하지 않습니다. 이는 어떤 기능을 개발자가 쉽게 구현할 수 있다는 것을 의미하지만, 종료 조건이 없는 루프와 같은 _절대 구현하지 말아야_ 할 일부 구조가 있다는 의미이기도 합니다. 종료가 명확하지 않는 복잡한 루프와 같은 특정 논리를 스마트 컨트랙트가 아닌 레이어에 두거나 완전히 제거하는 것이 현명한 선택이 될 수 있습니다.

## 참고자료들 (Resources)

- [서브스트레이트(Substrate) 런타임과 서브스트레이트(Substrate) 스마트 컨트랙트는 언제 만들어야 되나요?](https://stackoverflow.com/a/56041305) - 기술적 관점에서 볼 때 개발자가 런타임 컨트랙트를 개발할지 스마트 컨트랙트를 개발할 것인지에 대한 질문에 대답합니다.
