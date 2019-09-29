---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> 뭉게구름(Cumulus clouds)은 점(dots)처럼 생겼고 이 프로젝트처럼 아직 정해진 것이 없습니다. (현재 초기 프로토타입이므로 모양이 정해지면 (구름은 아직 형태가 정해지지 않았으므로 gets cooler 라고 원문에 표시되어 있음 - 역자 주 )이름을 변경해야합니다.

[Cumulus](https://github.com/paritytech/cumulus)는 섭스트레이트의 확장 기능으로 어떤 섭스트레이트 빌트 런타임이라도 Polkadot 호환 패러체인으로 쉽게 만들 수 있게 합니다.

## 컴포넌트(Components)

### 뭉게구름 컨센서스 (Cumulus Consensus)

폴카닷(Polkadot) 릴레이 체인을 따르는 Substrate의 컨센서스 엔진입니다. 이것은 폴카닷(Polkadot) 노드를 내부적으로 실행하고 어떤 체인을 따를 것이며, 어떤 체인을 최종적으로 승인할 것인지(Finalize), 어떤 체인을 제일 먼저 다룰 것인지에 대해서 클라이언트와 동기화 알고리즘에 영향을 줍니다.

### 뭉게구름 런타임 (Cumulus Runtime)

폴카닷(Polkadot) 밸리데이터가 유효성을 검사하고 증인 생성 루틴(Witness generating routine)을 제공할 수 있게 하는 서브스트레이트(Substrate) 런타임의 Wrapper입니다. 밸리데이터가 호출 할 서브스트레이트(Substrate) 외부 인터페이스에 `validate_block` API를 추가합니다.

섭스트레이트 런타임에 통합하는 것은 Crate를 가져와서 한 행의 매크로를 코드에 추가하는것 만큼 쉽습니다.

``` rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### 뭉게구름 검사기 (Cumulus Collator)

패러체인을 위한 폴카닷(Polkadot) 검사기(collator)가 준비중입니다.

## Resources

- [EthCC에서 Cumulus를 소개하는 Rob의 발표](https://www.youtube.com/watch?v=thgtXq5YMOo)
