---
id: learn-cryptography
title: 암호화체계 부연 설명
sidebar_label: 암호화체계 부연 설명
---

이 섹션은 폴카닷에 쓰이는 암호화 체계에 대해 전체적으로 흝어봅니다. 이 섹션은 독자가 해시함수, 타원곡선 암호화 알고리즘(ECC), 그리고 공유키/개인키 쌍에 대한 배경지식이 있으신 분들을 위해 만들어졌습니다.

좀 더 자세하고 전문적인 설명을 원하신다면 [연구자용 위키](https://research.web3.foundation)를 참고하세요

## 해시함수 알고리듬(Hashing Algorithm)

폴카닷에 쓰이는 해시함수 알고리듬은 [Blake2b](https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2)입니다. Blake2는 매우 빠른 암호화 해시 함수로 [지캐시(Zcash)](https://z.cash)에도 주로 쓰입니다.

## 키쌍과 전자서명(Keypairs and Signing)

폴카닷은 슈노클/리스트레토(Schnorrkel/Ristretto) x25519 ("sr25519")를 전자서명이나 다른 키를 만들어내는데 사용합니다.

Sr25519는 EdDSA에서 쓰는 곡선을 이용하지만 [Curve25519](https://en.wikipedia.org/wiki/Curve25519), 슈노르 서명(Schnorr signature)를 쓴다는 점에서 차별점을 가집니다. 이는 여러가지 뚜렷한 이점을 가져다주는데 보다 효율적으로 연산을 처리할 수 있게 해주며 보안을 잃지 않게 해줍니다. 또한 다중서명을 하기 위한 [서명 통합](https://bitcoincore.org/en/2017/03/23/schnorr-signature-aggregation/)을 할 수 있게 해줍니다

슈노클(Schnorrkel)과 리스트레토(Ristretto)라는 이름들은 이 도안들을 구현한 두개의 러스트 라이브러리에서 따온 것입니다. 슈노클(Schnorrkel)은 리스트레토 라이브러리를 기반으로 슈노르 키 생성, 서명, 검증을 수행하는 [슈노클(Schnorrkel)](https://github.com/w3f/schnorrkel)라이브러리에서 따왔고, 리스트레토(Ristretto)는 Curve25519와 같은 보조인자가 8인 타원곡선에서의 연산을 담당하는[리스트레토(Ristretto)](https://ristretto.group/ristretto.html)라이브러리에서 따왔습니다.
