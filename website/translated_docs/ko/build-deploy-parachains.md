---
id: build-deploy-parachains
title: How to view and deploy parachains
sidebar_label: How to view and deploy parachains
---

이 가이드는 Alexander testnet과 함께 동작하도록 업데이트 되었습니다.

## 패러체인을 보는 방법(How to view parachains)

[Polkadot UI](https://polkadot.js.org/apps/#/explorer)에서 `Chain State` 탭을 찾으새요. `parachains` 모듈을 선택하고 탭에서 `parachains()`을 선택한 뒤 `+` 을 누르세요. 그렇다면 현재 작동중인 패러체인(parachain)의 array를 리턴합니다.

## 패러체인에 애더(Adder)를 배포하는 방법 (How to deploy the Adder parachain)

**투표를 만들기 위해 필요한 최소한의 보증금이 필요합니다. 현재는 최소 5 Dot이 필요합니다.**

`Adder`패러체인(parachain)은 스토리지에 값을 유지하고 메시지가 전송 될 때 이 값에 더하는 단순한 패러체인(parachain) 입니다. 폴카닷(Polkadot) 레포지토리의 `test-parachains` 폴더에 있습니다.

> 조금 시간이 지난 Adrian Brink가 발표한 [이 가이드의 비디오는 여기서 보실 수 있습니다]((https://www.youtube.com/watch?v=pDqkzvA4C0E)). 가이드가 두개로 나뉘면 이 텍스트를 최종본으로 업데이트 하세요.

### 코드 짜기 (Building the code)

첫번째로 폴카닷(Polkadot) 코드를 다운로드 받습니다.

```bash
git clone https://github.com/paritytech/polkadot.git
```

Rust가 설치되어 있는지 확인하세요.

```bash
curl https://sh.rustup.rs -sSf | sh
sudo apt install make clang pkg-config libssl-dev
rustup update
```

다음 폴카닷(Polkadot) 디렉토리에 있는 `test-parachains`디렉토리를 찾아서 실행시키고 스크립트를 실행시키고 빌드합니다.

```bash
cd polkadot/test-parachains
./build.sh
```

이 폴더에 들어있는 간단한 `Adder` 패러체인(parachain)의 Wasm 실행 파일이 생성됩니다. 이 패러체인(parachain)은 단순히 전송 된 메시지를 추가합니다. Wasm 실행 파일은 `parachains / test / res / adder.wasm` 경로에 값을 출력합니다. 결과값들은 거기서 찾을 수 있습니다.

이 패러체인(parachain)의 제네시스 스테이트를 얻기 위해서 검사기 (Collator)노드를 빌드하고 실행시켜야 합니다.

`test-parachains/adder/collator`디렉토리로 가서 `build`와 `run` 커맨드를 실행하세요.

```bash
cargo build
cargo run
[ctrl-c]
```

검사기(Collator)노드를 즉시 중단하면 다음과 같은 출력이 표시됩니다

```
Starting adder collator with genesis:
Dec: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 27, 77, 3, 221, 140, 1, 241, 4, 145, 67,
207, 156, 76, 129, 126, 75, 22, 127, 29, 27, 131, 229, 198, 240, 241, 13, 137, 186, 30, 123, 206]
Hex: 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000011b4d03dd8c01f1049143cf9c4c817e4b167f1d1b83e5c6f0f10d89ba1e7bce
```

여기서 16진수(hex) 스트링이 중요한 정보입니다. 이 정보는 제네시스 스테이트(Genesis state)이고 다음 단계를 위해서 저장해놓아야 합니다.

### 패러체인 배포하기 (Deploying the parachain)

`Extrinsics` 탭에 있는 [Polkadot UI](https://polkadot.js.org/apps/#/extrinsics)로 가세요. 패러체인(parachain)을 배포하고 싶은 계정을 선택하세요 패러체인(parachain)을 배포하기 위해서 투표를 생성해야 합니다.

`democracy` -> `propose(proposal,value)` -> `parachains` -> `registerParachain(id,code,initial_head_data)` 순서대로 클릭하세요.

`id` 입력에서 패러체인(parachain)의 id를 입력하세요. 단순한 애더(Adder)의 경우 `100`이 됩니다. `code` 필드에서 페이지 버튼을 클릭하고 그다음 이전에 컴파일 된`adder.wasm` 바이너리를 업로드 하세요. `initial_head_data`에서 검사기(collator) 노드를 실행하여 얻은 16진수(hex) 데이터를 복사하여 붙여 넣습니다. `value` 필드에서 투표를 만들 때 필요한 최소값을 입력해야합니다. 이 글을 쓰는 시점에서 Alexander testnet에서 _5 DOTs_가 필요합니다.

![패러체인 등록하기](assets/parachain/register.png)

`Democracy` 탭으로 이동하면 프로포절 섹션에서 프로포절을 볼 수 있습니다.

일단 프로포절이 투표가 될 때까지 기다리면 `Nay`나 `Aye`에 투표 할 수 있습니다. 아마도 당신은 당신의 패러체인(parachain)을 배포하기위한 표가 될 것이기 때문에 당신은 Aye에게 투표 할 것입니다.

![패러체인 투표](assets/parachain/referendum.png)

투표 기간이 끝나면 패러체인(parachain)의 스테이트를 쿼리 할 수 있습니다. `Chain State` 탭으로 가서 `parachains` 스테이트를 쿼리함으로써 패러체인(parachain)에 대한 정보를 볼 수 있습니다.

You can go to the `Chain State` tab and by querying the `parachains` state you should be able to see some information on your parachain.

![parachain info](assets/parachain/info.png)

### 패러체인과 인터렉션 하기 (Interacting with the parachain)

_Coming soon_
