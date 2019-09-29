---
id: build-dev-roadmap
title: Roadmap For Developers
sidebar_label: Roadmap For Developers
---

개발자들에게는 언제 업스트림 팀이 특정 마일스톤에 도달 할지 예상할 수 있는 몇 가지 가이드 포스트가 필요합니다. 우리가 알고있는 정보로 아래 섹션을 최신 상태로 유지하고 가능한 경우 명확한 날짜를 추가하려고 노력할 것입니다.

## 서브스트레이트(Substrate)

### 1.0

41% 완료

[마일스톤 트래커](https://github.com/paritytech/substrate/milestone/9)

예상되는 기능들:

 - 확정된 API와 안정된 인터페이스
 - Ristretto Crypto
 - 튼튼한 네트워크
 - 해결되지 않은 버그 제거
 - 분리된 잔고 (Decoupled balances)
 - 인테그레이션 테스트 (Integration tests)
 - Wasm/native 실행 휴리스틱스를 통한 향상된 컨트롤 (Enhanced control over Wasm/native execution heuristics)
 - 런타임에서의 Panics/overflows 스윕 (Panics/overflows sweeps in runtime)

### 1.1

[마일스톤 트래커](https://github.com/paritytech/substrate/milestone/4)

예상되는 기능:

 - 경제학적 안정 (Economic safety)

## Polkadot

현재 릴리즈: **PoC-4**

### PoC 5,6,7

이슈 트래커에서 7% 진척도가 있음.

[마일스톤 트래커](https://github.com/paritytech/polkadot/milestone/2)

예상되는 기능들:

 - 패러체인(parachain) 후보들의 증명을 위한 BLS 시그니처 에그리게이션
 - [패러체인(parachain) 토큰들을 거버넌스에 통합(Integrate Parachain tokens into governance)](https://github.com/paritytech/polkadot/issues/124)
 - 패러체인(parachain) 확인(validation)의 개선
