---
id: build-extrinsic-format
title: Polkadot Extrinsic Format aka Transaction Format
sidebar_label: Polkadot Extrinsic Format aka Transaction Format
---

## 이전 포맷

참고로 **예전** 트랜잭션 포맷은 아래와 같습니다.:

```
[ account-id (32-bytes), index (4-bytes), call (dynamic-length),  첫 세가지 필드에 서명 (account-id, index, call에 서명함 - 역자 주) (64 bytes) ]
```

## 현재 포맷

폴카닷(Polkadot) 트랜잭션 포맷은 아래와 같습니다.:

```
[ address (1/3/5/9/33-bytes, 첫번째 바이트에 따라 다름), index (4-bytes), call (dynamic-length), *오리지널* 필드에 서명함 (64 bytes) ]
```

*오리지널* 필드들은 예전 트랜잭션 포맷에서 다음과 같은 요소들을 참조합니다.

```
[ account-id (32-bytes), index (4-bytes), call (dynamic-length) ]
```

새 주소 타입을 위한 특정 형식은 아래 5개의 하위 형식 중 하나이며 첫 번째 바이트로 전환됩니다.

- `0xff, 32-byte account id`
- `0xfe, 8-byte account index`
- `0xfd, 4-byte account index`
- `0xfc, 2-byte account index`
- `[0xf0...0xfb] (유효하지 않음, 나중에 사용하기 위해 남겨놓음)`
- `[0x00...0xef] 1-byte account index (0xf0보다 작음)`

계정 인덱스 변형들은 상당히 작지만 스테이트에서 조회가 필요합니다. 인덱스가 계정을 변경할 때 트랜잭션 리플레이 어택을 피하기 위해 서명은 첫 번째 필드인 인덱스가 아닌 계정 ID로 서명되므로 이것때문에 인덱스가 다른 ID를 조회하는 데 사용되면 이전의 모든 서명이 무효화됩니다.

발신자 필드 뿐만 아니라 이전 형식의 AccountId(32-bytes)였던 Call/Propose(PrivCall) 필드에 대한 파라매터는 이제 Address(1/3/5/9/33-bytes)입니다.

## 출처

[Substrate #195](https://github.com/paritytech/substrate/pull/195)
