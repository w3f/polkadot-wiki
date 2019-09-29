---
id: build-tools-index
title: Tools
sidebar_label: Tools
---

여기에서는 개발에 사용할 수 있는 도구 목록을 제공합니다. 도구들은 프로그래밍 언어별로 정렬됩니다. 현재 Rust 생태계는 가장 성숙했고 현시점의 서브스트레이트 위에서 개발을 시작 할 수 있습니다. 다른 프로그래밍 언어를 둘러싼 생태계가 확장되면 아래 섹션도 채워질것입니다.

## 블록 탐색기 (Block explorers)

- [Polka.io](https://polka.io) - 폴카닷(Polkadot)의 블록 탐색기(Blockchain explorer) .
- [Polkadot-JS Apps Explorer](https://polkadot.js.org/apps/#/explorer) - 폴카닷(Polkadot)의 대시보드(dashboard) 블록탐색기(block explorer). 기본설정으로 현재 알렉산더 테스트 넷(Alexander testnet)에 연결되어 있습니다. 다른 외부나 로컬의 엔드포인트(endpoint)로 연결 할 수 있습니다.
- [Polkascan](https://polkascan.io/) - 폴카닷(Polkadot)의 블록 탐색기(Blockchain explorer) . **현재 사용중지.**

## 지갑들 (Wallets)

- [Polkadot-JS Apps - Accounts](https://polkadot.js.org/apps/#/accounts)
- [Bonds oo7 Polkadot UI](https://github.com/paritytech/substrate-ui) - Bonds oo7 라이브러리로 만들어진 지갑.
- [Polkawallet](https://polkawallet.io/) - 아이폰(iOs)과 안드로이드(Android)를 둘 다 지원하는 폴카닷 모바일 월렛(mobile wallet for Polkadot). 현재 개발중이며 베타버전은 다운로드가 가능합니다. 이 [GitHub](https://github.com/polkawallet-io/polkawallet-RN)링크에서 확인하세요.
- [SpeckleOS](https://www.speckleos.io/) - 브라우저 확장 월렛, 개발중입니다.- 이 [GitHub](https://github.com/SpeckleOS/speckle-browser-extension)에서 진행사항을 확인 할 수 있습니다.

## 네트워크 모니터링 및 리포팅 툴 (Network Monitoring & Reporting)

- [Polkadot Telemetry Service](https://telemetry.polkadot.io/) - 체인을 실행하는 노드, 어떤 소프트웨어 버전 실행중인지, 동기화 상태와 어디에 위치하는지가 표시된 맵 등의 네트워크 정보를 보여줍니다.
- Polkabot - Riot chat을 이용해서 폴카닷 네트워크 모니터링과 리포팅을 합니다. 유저는 봇 플러그인을 만들 수 있습니다. [Blogpost](https://medium.com/polkadot-network/polkabot-a3dba18c20c8). [Github Repository](https://gitlab.com/Polkabot/polkabot)

## 러스트 (Rust)

### 클라이언트

- [Polkadot](https://github.com/paritytech/polkadot) - 러스트로 구현된 폴카닷 런타임 환경(Polkadot Runtime Environment).

### Tools

- [서브스트레이트(Substrate)](https://github.com/paritytech/substrate) - 러스트로 개발된 블록체인 개발 플랫폼(Blockchain development platform). 폴카닷(Polkadot)은 서브스트레이트 위에서 작성됩니다.
- [Substrate Development Hub](https://docs.substrate.dev) - 서브스트레이트를 사용해서 만들어진 블록체인의 전체적인 문서들과 튜토리얼들

## C++

- [Kagome](https://github.com/soramitsu/kagome) - [Soramitsu](https://github.com/soramitsu)에서 구현한 C++ 폴카닷 클라이언트(Polkadot client)

## Go

- [Gossamer](https://github.com/ChainSafe/gossamer) - 폴카닷 런타임 환경(Polkadot Runtime Environment)의 Golang 구현체.
- [Golkadot](https://github.com/opennetsys/golkadot) -폴카닷 서브스트레이트(Polkadot Substrate)의 Golang 구현체 .

## 자바 스크립트 (JS)

### 클라이언트

- [Polkadot-JS client](https://github.com/polkadot-js/client) - JavaScript를 사용하는 개발자들을 위해서 구현된 다른 클라이언트.

[Polkadot-JS](https://polkadot.js.org)의 문서들은 폴카닷을 좀 더 깊이 이해하는데 좋은 시작 포인트라고 할 수 있습니다.

로컬 노드(local node)를 설정하고 작동시키면 [Polkadot 익스플로러](https://polkadot.js.org/apps/#/explorer)를 통해 인터렉션 할 수 있습니다.

### 라이브러리들 (Libraries)

### Polkadot-JS Common

Polkadot-JS Common은 @polkadot 네임 스페이스 내의 모든 프로젝트에서 사용하는 다양하고 유용한 유틸리티 기능을 제공합니다. 그리고 다음과 같은 여러가지 내부 유틸리티 패키지로 분할됩니다. 문서 및 사용법은 [Polkadot-JS / Common API 문서 링크](https://polkadot.js.org/common/)를 참고하세요.

- [@polkadot/keyring](https://polkadot.js.org/common/keyring/) JavaScript로 계정을 생성/로드하거나, 지갑을 만드는데 도움이 되거나 또는 유저가 체인에 무언가 쓸(Write) 필요가 있는 애플리케이션에 도움이 되는 툴 입니다. [관련 예시 참고 링크](https://polkadot.js.org/common/examples/keyring/)
- [@polkadot/util](https://polkadot.js.org/common/util/)  문자열 (String)이 Hex 인코딩이 되었는지 등을 확인 할 때 쓰는 유용한 유틸리티.
- [@polkadot/util-crypto](https://polkadot.js.org/common/util-crypto/) Polkadot로 개발하는 동안 유용하게 사용할 수있는 암호 유틸리티.

#### Bonds oo7

- [oo7-polkadot](https://github.com/polkadot-js/oo7-polkadot) Polkadot의 bonds 라이브러리. [oo7 API 문서](https://paritytech.github.io/oo7/)

### CLI Tools

- [@polkadot/api-cli](https://github.com/polkadot-js/tools/tree/master/packages/api-cli) Polkadot API를 위한 단순한 CLI(commandline interface). [참고문서](https://polkadot.js.org/api/api/)
- [@polkadot/monitor-rpc](https://github.com/polkadot-js/tools/tree/master/packages/monitor-rpc) Polkadot의 RPC 모니터. RPC tool 과 관련해서는 아래의 추가 정보를 확인하세요.

### RPC 도구들(tools)

- [@polkadot/api/rpc-provider](https://github.com/polkadot-js/api/tree/master/packages/rpc-provider) - 노드들이 JS 도구를 사용해서 RPC를 통해 어떻게 인터랙션 하는지 보여줍니다.
- [RPC documentation](https://polkadot.js.org/api/METHODS_RPC.html) - 섭스트레이트 RPC 엔드포인트 관련 문서들.
