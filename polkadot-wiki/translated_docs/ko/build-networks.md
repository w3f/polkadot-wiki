---
id: build-networks
title: Networks
sidebar_label: Networks
---

다음 커맨드들은 다른 네트워크들 끼리 연결하는데 사용 할 수 있습니다.

## Development

다음 명령어로 폴카닷(polkadot)을 설치하고 `polkadot` 바이너리를 `PATH`에 등록하세요.

```bash
cargo install --git https://github.com/paritytech/polkadot.git polkadot
```

다음 명령어를 터미널에 입력해서 단순한 단일 노드 개발 "네트워크"를 작동 시킬 수 있습니다.

```bash
polkadot --dev
```

http://github.com/paritytech/polka-ui나 http://github.com/paritytech/polkadot-ui을 클로닝하거나 만들면서 노닥거릴수 있습니다. 아니면 https://polkadot.js.org/apps을 가리킬 수도 있습니다.

## Krumme Lanke (베를린 남서쪽에 있는 호수 이름 - 역자 주 )

Krumme Lanke는 PoC-2의 개발단계에서 사용했던 테스트넷 네트워크 입니다. 다음 명령어로 Polkadot PoC-2를 설치하고  `polkadot` 바이너리를 `PATH`에 등록하세요.

글로벌 "Krumme Lanke" 테스트넷에 기본적으로 연결되어서 동작합니다. 명령어는 아래와 같습니다.

```bash
cargo install --git https://github.com/paritytech/substrate.git --branch v0.2 polkadot
```

Alexander 는 PoC-3와 PoC-4 개발단계에서 사용했던 테스트넷 네트워크 입니다. 다음 명령어로 Polkadot PoC-4를 설치하고  `polkadot` 바이너리를 `PATH`에 등록하세요.

```bash
polkadot
```

## Alexander (PoC-4)

글로벌 "Alexander" 테스트넷에 기본적으로 연결되어서 동작합니다. 명령어는 아래와 같습니다.

다중 노드 합의 알고리즘 실행을 로컬에서 보고 싶다면 로컬 testnet을 생성 할 수 있습니다. 두 개의 터미널이 열려 있어야합니다. 하나는 다음을 실행하십시오.

```bash
cargo install --git https://github.com/paritytech/polkadot.git --branch v0.4 polkadot
```

다른 터미널에서는 다음 명령어를 실행하세요.

```bash
polkadot
```

## 2개의 노드로 테스트넷 작동시키기

`ALICE_BOOTNODE_ID_HERE`를 첫 번째 터미널의 출력에서 노드 ID로 대체했는지 확인하십시오.

```bash
polkadot --chain=local --validator --key Alice -d /tmp/alice
```

and in the other, run:

```bash
polkadot --chain=local --validator --key Bob -d /tmp/bob --port 30334 --bootnodes '/ip4/127.0.0.1/tcp/30333/p2p/ALICE_BOOTNODE_ID_HERE'
```

Ensure you replace `ALICE_BOOTNODE_ID_HERE` with the node ID from the output of the first terminal.
