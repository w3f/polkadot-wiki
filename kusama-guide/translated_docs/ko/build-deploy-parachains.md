---
id: build-deploy-parachains
title: How to view and deploy parachains
sidebar_label: How to view and deploy parachains
---

이 가이드는 Alexander testnet과 함께 동작하도록 업데이트 되었습니다.

## 패러체인을 보는 방법(How to view parachains)

On the [Polkadot UI](https://polkadot.js.org/apps/#/explorer) navigate to the `Chain State` tab. Select the `parachains` module and the `parachains()` then hit the `+` button. It will return an array of the currently active parachains.

## 패러체인에 애더(Adder)를 배포하는 방법 (How to deploy the Adder parachain)

**You will need to have the minimum deposit needed to create a referendum. Currently this minimum is 5 DOTs.**

The `adder` parachain is a simple parachain that will keep a value in storage and add to this value as messages are sent to it. It can be found in the Polkadot repository under the `test-parachains` folder.

> A slightly out-of-date video version of this guide presented by Adrian Brink is available [here](https://www.youtube.com/watch?v=pDqkzvA4C0E). When the two guides diverge, please refer to this written text as definitive and updated.

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

Now navigate to the `test-parachains` folder in the Polkadot code repository and run the build script.

```bash
cd polkadot/test-parachains
./build.sh
```

This will create the Wasm executable of the simple `adder` parachain contained in this folder. This parachain will simply add messages that are sent to it. The Wasm executable will output into the `parachains/test/res/adder.wasm` path so make sure you are able to find it there.

You will need to build and run the collator node in order to get the genesis state of this parachain.

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

The important information is the hex string. This is your genesis state and you will need to save it for the next steps.

### 패러체인 배포하기 (Deploying the parachain)

Go to [Polkadot UI](https://polkadot.js.org/apps/#/extrinsics) on the `Extrinsics` tab. Select the account you wish to deploy the parachain from. You will need to create a referendum to deploy the parachain.

Click on `democracy` -> `propose(proposal,value)` -> `parachains` -> `registerParachain(id,code,initial_head_data)`.

In the `id` input enter in the id of the parachain. In the case of the simple adder it will be `100`. In the `code` field click on the page button and then upload the `adder.wasm` binary that was compiled from before. In the `initial_head_data` we will copy and paste the hex data that we got from running the collator node. In the `value` field you will need to input the minimum required value for creating a referendum. At the time of writing this is _5 DOTs_ on the Alexander testnet.

![패러체인 등록하기](assets/parachain/register.png)

If you navigate to the `Democracy` tab you will be able to see your proposal in the proposals section.

Once you wait for the proposal to become a referendum you will be able to vote `Nay` or `Aye` on it. Assumably, you will vote Aye as this will be a vote for the deployment of your parachain.

![패러체인 투표](assets/parachain/referendum.png)

After the voting period of your referendum goes through you will be able to query the state of your parachain.

You can go to the `Chain State` tab and by querying the `parachains` state you should be able to see some information on your parachain.

![parachain info](assets/parachain/info.png)

### 패러체인과 인터렉션 하기 (Interacting with the parachain)

_Coming soon_
