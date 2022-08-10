---
id: build-open-source
title: Open Source Stack
sidebar_label: Open Source Stack
description: Overview of the open source Polkadot/Kusama Tech Stack
keywords: [open, source, development, code, resources, tools, apis]
slug: ../build-open-source
---

# Open Source Polkadot Stack <!-- omit in toc -->

The goal of this page is to provide an overview of the open-source Polkadot/Kusama Tech Stack.

This is a living document and we are relying on our community to contribute to it and help maintain it. [**Please feel free to make edits and additions via pull requests**](#contributing). We apologize if we missed your project!

---

- [About](#about)
- [Layers of Polkadot Stack](#layers-of-polkadot-stack)
  - [User Interface](#user-interface)
  - [Tools, APIs and Languages](#tools-apis-and-languages)
  - [ink Smart Contracts](#ink-smart-contracts)
  - [Chains and Pallets](#chains-and-pallets)
  - [Host](#host)
  - [Network Maintenance Tools](#network-maintenance-tools)
  - [Signatures](#signatures)
  - [Consensus](#consensus)
  - [Networking](#networking)
- [Contributing](#contributing)

## About

The Polkadot Tech Stack is a subset of the Web 3.0 Tech Stack, which consists of the **open-source** technologies contributing to and relying on [Polkadot](https://polkadot.network/), [Kusama](https://kusama.network/) and [Substrate](https://substrate.dev/). It is meant to be used for decentralized application (Dapp) development within numerous verticals including DeFi, Gaming, Provenance and many others not pictured below.

<!-- markdownlint-disable MD040 -->
```
|------|--------|------------|
| DeFi | Gaming | Provenance |
|______|________|____________|
            Dapps
|--------------------------/-|
| Explorers, Wallets      /  |
|------------------------/---|
| Tools, Apis, Languages/    |
|----------------------/-----|
| 2nd layer protocols /      |
|--------------------/-------|
| Chains            /  other |
|------------------/---    --|
| *Polkadot*      |   tech   |
|------------------\---------|
| P2P, Crypto, Wasm \        |
|--------------------\-------|
```

## Layers of Polkadot Stack

In the below sections you can find a list of different layers of the Polkadot Stack.

**Maintenance Status**: 
- :green_heart: Actively maintained
- :yellow_heart: Stale (no activity since 1 month)
- :broken_heart: Unmaintained (no activity for more than 3 months)

### User Interface 

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Desktop/Web Wallets | [Talisman Web Application](https://github.com/TalismanSociety/talisman-web) :green_heart:, [AirGap](https://github.com/airgap-it/airgap-wallet) :green_heart:, [Sakura](https://github.com/w3finance/sakura) :broken_heart:| User-friendly Wallet based on the [Recovery Pallet](https://github.com/paritytech/substrate/tree/master/frame/recovery)<!-- NO_STATUS_BADGE -->, Web wallets focused on user-onboarding (e.g. using [localStorage](https://github.com/near/near-wallet)<!-- NO_STATUS_BADGE --> )
| Browser Extensions | [Enkrypt](https://github.com/enkryptcom/enKrypt), [Polkadot{.js}](https://github.com/polkadot-js/extension) :green_heart:, [Polkadot-Js-Plus-Extension](https://github.com/Nick-1979/polkadot-Js-Plus-extension) :green_heart:, [SubWallet-Extension](https://github.com/Koniverse/SubWallet-Extension) :green_heart:, [Doter](https://github.com/ChainBridgeNetworkTeam/Doter) :broken_heart:, [Enzyme](https://github.com/blockxlabs/enzyme/) :broken_heart:, [Speckle OS](https://github.com/GetSpeckle/speckle-browser-extension) :broken_heart:| Sign-in with your polkadot, kusama, etc. account.  
| Mobile Wallets|  [Lunie](https://github.com/luniehq/lunie) :broken_heart:, [Polkawallet](https://github.com/polkawallet-io/polkawallet-flutter) :broken_heart:, [Parity Signer](https://github.com/paritytech/parity-signer) :green_heart:, [imToken](https://github.com/consenlabs/token-core) :broken_heart:, [Fearless Wallet Android](https://github.com/soramitsu/fearless-Android) :green_heart:, [Fearless Wallet iOS](https://github.com/soramitsu/fearless-iOS) :green_heart:, [Stylo](https://github.com/stylo-app/stylo) :green_heart:, [Nova Wallet](https://github.com/nova-wallet/nova-utils) :green_heart:, [Fractapp](https://github.com/fractapp/fractapp/) :broken_heart:
| Burner Wallets/Faucet| [KodaDot](https://github.com/vue-polkadot/apps) :broken_heart:, [Astar Faucet Bot](https://github.com/AstarNetwork/astar-faucet-bot) :yellow_heart:| Faucet (a sybil-resistant way to receive free tokens)
| CLI Wallet | [Subwallet](https://github.com/yxf/subwallet) :broken_heart:, [Proxy-hot-wallet](https://github.com/canontech/proxy-hot-wallet) :broken_heart:
| Multisignature Wallets| [Subscan Multisig UI - React](https://github.com/itering/subscan-multisig-react) :yellow_heart:, [Subscan Multisig UI](https://github.com/itering/subscan-multisig-ui) :broken_heart:, [Dorafactory-Multisig](https://github.com/DoraFactory/dorafactory-multisig) :broken_heart:|
| Hardware Wallets | [Ledger Polkadot](https://github.com/ZondaX/ledger-polkadot) :green_heart:, [Ledger Kusama](https://github.com/Zondax/ledger-kusama) :green_heart:| Trezor
| Block Explorers | [Polkaholic](https://github.com/colorfulnotion/polkaholic) :green_heart:, [Polkascan](https://github.com/polkascan/explorer-api) :yellow_heart:, [Polkastats](https://github.com/Colm3na/polkastats-backend) :broken_heart:, [Subscan](https://github.com/itering/subscan) :green_heart:, [Statescan](https://github.com/opensquare-network/statescan) :green_heart:, [Edgscan](https://github.com/edgeware-builders/edgscan) :broken_heart:| Ink Smart Contract Explorer, Mempool focused explorer (including parachain transaction)
| Validator Dashboards | [Polkacube](https://github.com/hashquark-io/polkacube-frontend) :broken_heart:, [YieldScan](https://github.com/buidl-labs/YieldScan) :broken_heart:, [Hubble](https://github.com/w3f-community/hubble/tree/master/app/controllers/polkadot) :broken_heart:
| Node Explorers | [Polkadot Node Explorer](https://github.com/protos-research/polkadot-node-explorer) :broken_heart:
| NFT Explorer | [NFT Explorer for Kusama & Polkadot](https://github.com/kodadot/nft-gallery) :green_heart:
| Governance Dashboards | [Polkassembly](https://github.com/premiurly/polkassembly) :green_heart:, [dotreasury](https://github.com/opensquare-network/dotreasury) :green_heart:, [Bright Treasury](https://github.com/bright/bright-tresury) :broken_heart:, [OpenSquare offchain voting](https://github.com/opensquare-network/collaboration) :green_heart:| UI for the kusama and/or polkadot treasury (see [bounty module](https://github.com/paritytech/substrate/pull/5715)<!-- NO_STATUS_BADGE --> ), UI for Parachain Lease Offering (PLO)  |
| Staking | [Staking Rewards Collector](https://github.com/w3f/staking-rewards-collector) :yellow_heart:, [Staking Rewards Viewer](https://github.com/jackson-harris-iii/staking-rewards-viewer) :broken_heart:, [Polkadot Staking Site](https://github.com/cryptolab-network/polkadot-staking-site) :broken_heart:, [Polkadot Staking Dashboard](https://github.com/paritytech/polkadot-staking-dashboard) :green_heart:|
| Bridge UI | [Parity Bridges UI](https://github.com/paritytech/parity-bridges-ui) :broken_heart:, [Donut Interface (Steem - Dot)](https://github.com/nutbox-dao/donut-interface) :broken_heart:| |
| Parachain/Crowdloan | [Parachains.Network](https://github.com/jhonalino/parachains.network) :broken_heart:, [PolkAuction](https://github.com/CrommVardek/polk-auction-ui) :yellow_heart:| |
| Identicon | [PolkadotWebIdenticon](https://github.com/RidOne-technologies/polkadot-web-identicon) :broken_heart:, [Polkadot Angular IdentIcon](https://github.com/RidOne-technologies/polkadot-angular-identicon) :broken_heart:, [Bird Identicon](https://github.com/Noc2/Bird-Identicon) :broken_heart:|
| Other | [KappaSigmaMu Fratority](https://github.com/KappaSigmaMu/ksm-app) :green_heart:, [Quadratic Funding Webapp](https://github.com/OAK-Foundation/quadratic-funding-webapp) :broken_heart:, [Polkawatch](https://gitlab.com/polkawatch/polkawatch), [Bytepay](https://github.com/bytepayment/bytepay) :yellow_heart:, [charging-management-platform](https://github.com/Delmonicos/charging-management-platform) :broken_heart:, [subidentity-webapp](https://github.com/TDSoftware/subidentity-webapp) :green_heart:, [OpenSquare Paid QA](https://github.com/opensquare-network/paid-qa/) :green_heart:| Portfolio Viewer like Zapper or Zerion

### Tools, APIs and Languages

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Parachain | [Parachain utilities](https://github.com/AcalaNetwork/parachain-utilities) :broken_heart:, [Gantree](https://github.com/gantree-io/gantree-core) :broken_heart:| Tools to create parachains from frameworks used in other ecosystems |
| Client Libraries | [Go](https://github.com/centrifuge/go-substrate-rpc-client) :green_heart:, [.Net](https://github.com/usetech-llc/polkadot_api_dotnet) :broken_heart:, [.NET Standard 2.0](https://github.com/ajuna-network/Ajuna.NetApi) :green_heart:, [C++](https://github.com/usetech-llc/polkadot_api_cpp) :broken_heart:, [C](https://github.com/finoabanking/substrate-c-tool) :broken_heart:, [Haskell](https://github.com/airalab/hs-web3) :green_heart:, [Javascript](https://github.com/polkadot-js/api) :green_heart:, [Substrate API Sidecar - TypeScript](https://github.com/paritytech/substrate-api-sidecar) :green_heart:, [Ruby](https://github.com/itering/scale.rb) :broken_heart:, [Python](https://github.com/polkascan/py-substrate-interface) :yellow_heart:, [Java (+ Android)](https://github.com/emeraldpay/polkaj) :yellow_heart:, [Substrate Client Java](https://github.com/strategyobject/substrate-client-java) :green_heart:, [Rust SCS](https://github.com/scs/substrate-api-client) :green_heart:, [Rust Parity](https://github.com/paritytech/substrate-subxt) :green_heart:, [PHP (gmajor-encrypt)](https://github.com/gmajor-encrypt/php-substrate-api) :yellow_heart:, [PHP (neha0921)](https://github.com/neha0921/substrate-interface-package) :broken_heart:, [RPC-Ethereum](https://github.com/paritytech/frontier) :green_heart:, [Swift](https://github.com/tesseract-one/Substrate.swift) :broken_heart:| |
|Substrate Contract clients | [PatractGo](https://github.com/patractlabs/go-patract) :broken_heart:| |
| SCALE Codec | [Rust](https://github.com/paritytech/parity-scale-codec) :green_heart:, [Python](https://github.com/polkascan/py-scale-codec) :green_heart:, [Golang Chainsafe](https://github.com/ChainSafe/gossamer/tree/development/lib/scale) :green_heart:, [Golang Itering](https://github.com/itering/scale.go) :green_heart:, [C](https://github.com/MatthewDarnell/cScale) :broken_heart:, [C++](https://github.com/soramitsu/scale-codec-cpp) :broken_heart:, [JavaScript](https://github.com/polkadot-js/api) :green_heart:, [AssemblyScript](https://github.com/LimeChain/as-scale-codec) :broken_heart:, [Haskell](https://github.com/airalab/hs-web3/tree/master/src/Codec) :green_heart:, [Java](https://github.com/emeraldpay/polkaj) :yellow_heart:, [Ruby](https://github.com/itering/scale.rb) :broken_heart:, [Dart](https://github.com/nbltrust/dart-scale-codec) :broken_heart:, [Swift](https://github.com/tesseract-one/swift-scale-codec) :broken_heart:, [PHP](https://github.com/gmajor-encrypt/php-scale-codec) :broken_heart:,  [JavaScript by Soramitsu](https://github.com/soramitsu/scale-codec-js-library) :yellow_heart:|
| Easy Runtime Development | [VS Code Plugin](https://github.com/everstake/vscode-plugin-substrate) :broken_heart:, [Atom Code Plugin](https://github.com/everstake/atom-plugin-substrate) :broken_heart:, [Substrate Playground](https://github.com/paritytech/substrate-playground) :green_heart:, [Substrate Marketplace VS Code Plugin](https://github.com/paritytech/vscode-substrate) :broken_heart:, [AssemblyScript Runtime Generation](https://github.com/LimeChain/as-substrate-runtime) :broken_heart:, [Substrate Package Manager](https://github.com/clearloop/sup) :broken_heart:, [Subsembly: Framework for developing AssemblyScript Substrate Runtimes](https://github.com/LimeChain/subsembly) :broken_heart:, [dependency diener](https://github.com/bkchr/diener) :green_heart:| |
| Easy Smart Contract Development | [Typechain Polkadot](https://github.com/Supercolony-net/typechain-polkadot), [ink-playground](https://github.com/staketechnologies/ink-playground/tree/master) :broken_heart:, [Ink! Remix Plugin](https://github.com/blockchain-it-hr/ink-remix-plugin) :broken_heart:
| Runtime Security | [K specifications](https://github.com/kframework/wasm-semantics) :yellow_heart:, [PolPatrol - Polkadot Runtime Checker](https://github.com/ChainSecurity/polpatrol) :broken_heart:| Automated Runtime checking tools, economic audit simulator such as [gauntlet.network](https://gauntlet.network/)
| Smart Contract Languages | [Ask!](https://github.com/ask-lang/ask) :green_heart:, [Subscript](https://github.com/slickup/subscript) :broken_heart:, [Solang](https://github.com/hyperledger-labs/solang) :green_heart:, [Ink!](https://github.com/paritytech/ink) :green_heart:, [Move VM Substrate](https://github.com/pontem-network/sp-move) :broken_heart:, [Move smart contract by Neatcoin](https://github.com/neatcoin/neatcoin) :broken_heart:, [Sol2Ink](https://github.com/Supercolony-net/sol2ink) :green_heart:| Functional Programming Languages, other languages with developed toolchains |
| Smart Contract Security | [Vanguard](https://github.com/Veridise/Vanguard) | 
| Testing | [Halva](https://github.com/halva-suite/halva) :broken_heart:, [Ink Waterfall](https://github.com/paritytech/ink-waterfall) :yellow_heart:, [Redspot](https://github.com/patractlabs/redspot) :broken_heart:, [MixBytes Tank](https://github.com/mixbytes/tank) :broken_heart:, [sub-flood](https://github.com/NikVolf/sub-flood) :broken_heart:, [Substrate debug-kit](https://github.com/paritytech/substrate-debug-kit) :broken_heart:, [Dotscale - SCALE Codec Comparator](https://github.com/arijitAD/dotscale) :broken_heart:, [Asset CLI tool](https://github.com/JesseAbram/asset_cli_tool) :yellow_heart:, [sub_crash](https://github.com/JesseAbram/unfinished_testing_tool) :broken_heart:, [subwasm](https://github.com/chevdor/subwasm) :yellow_heart:, [subsee](https://github.com/ascjones/subsee) :broken_heart:, [polkadot-lab](https://github.com/w3f/polkadot-lab) :broken_heart:, [Zombienet](https://github.com/paritytech/zombienet) :green_heart:, [RPC-perf](https://github.com/dwellir-public/rpc-perf/) :yellow_heart:
| Testnet | [Polkadot Launch](https://github.com/paritytech/polkadot-launch) :green_heart:, [polkadot-starship](https://github.com/koute/polkadot-starship) :broken_heart:, [Fork off Substrate](https://github.com/maxsam4/fork-off-substrate) :broken_heart:, [Parachain Launch](https://github.com/open-web3-stack/parachain-launch) :green_heart:|
| Benchmarking | [Substrate Graph Benchmarks](https://github.com/shawntabrizi/substrate-graph-benchmarks) :broken_heart:|
| Blockchain Indexing Engine | [Substrate Archive](https://github.com/paritytech/substrate-archive) :yellow_heart:, [PSQL Indexer](https://github.com/usetech-llc/polkadot_psql_indexer) :broken_heart:, [Polkadothub Indexer](https://github.com/figment-networks/polkadothub-indexer) :green_heart:, [Substrate Graph](https://github.com/playzero/substrate-graph) :yellow_heart:, [Hydra](https://github.com/subsquid/hydra) :broken_heart:, [Subquery](https://github.com/OnFinality-io/subql) :green_heart:, [Polkadot Profit Transformer](https://github.com/p2p-org/polkadot-profit-transformer) :green_heart:|
| Blockchain/Event Monitoring | [Web3 Guardian](https://github.com/open-web3-stack/guardian) :green_heart:, [Aurras Event Manager](https://github.com/HugoByte/aurras-event-manager) :green_heart:, [@commonwealth/chain-events](https://github.com/hicommonwealth/chain-events) :green_heart:|
| Gaming | [Crossbow](https://github.com/dodorare/crossbow) :green_heart:| [Amethyst](https://amethyst.rs/) + [Substrate](https://substrate.dev/)
| No-code Platforms | [EzCode's Polkadot.js plugin on Bubble.io](https://github.com/NovaBloq/Bubble-Plugin-Polkadot.js) :broken_heart:, [Blackprint Visual Programming Polkadot.js module](https://github.com/Blackprint/nodes-polkadot.js) :green_heart:| |
| XCM | [XCM-tools](https://github.com/PureStake/xcm-tools) :green_heart:| |
| Wallet Connection | [Tesseract](https://github.com/tesseract-one/Tesseract.rs) :yellow_heart:, [WalletConnect](https://github.com/WalletConnect-Labs/walletconnect-v2-monorepo) :grey_question:| |
| Other | [open-web3 JS library](https://github.com/open-web3-stack/open-web3.js) :green_heart:, [VM-Bridge](https://github.com/CycanTech/GVM-Bridge) :broken_heart:, [srtool](https://github.com/paritytech/srtool) :yellow_heart:, [Substrate Tip Bot](https://github.com/paritytech/substrate-tip-bot) :green_heart:, [ORI (Onchain Risk Intelligence)](https://github.com/syntifi/ori) :broken_heart:, [PolkaTools](https://github.com/albertov19/PolkaTools) :green_heart:, [polkadot-scripts](https://github.com/paritytech/polkadot-scripts) :yellow_heart:, [Static analyzer for Substrate FRAME's pallets](https://github.com/simon-perriard/saft) :green_heart:, [Sube](https://github.com/virto-network/sube) :broken_heart:, [data-store-sidecar](https://github.com/CESSProject/data-store-sidecar) :green_heart:

### ink Smart Contracts 

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Bridges | [Dante Protocol](https://github.com/dantenetwork/protocol-stack-for-ink) :green_heart:| |
| DeFi | [Polkadot AMM](https://github.com/realnimish/polkadot-amm) :broken_heart:, [Vera](https://github.com/veradefi/defi) :broken_heart:, [Nsure Insurance](https://github.com/nsure-tech/dot-contract) :broken_heart:, [Everlasting Cash](https://github.com/CycanTech/ELC) :broken_heart:, [Coinversation](https://github.com/Coinversation/coinpro) :broken_heart:, [zenlink-dex-contract](https://github.com/zenlinkpro/zenlink-dex-contract) :yellow_heart:, [AlgoCash](https://github.com/ReserveLabs/AlgoCash) :broken_heart:| New seigniorage-style stable coins
| Gaming | [Open Emoji Battler](https://github.com/OpenEmojiBattler/open-emoji-battler) :green_heart:, [NewOmega](https://github.com/WiktorStarczewski/newomega.polkadot/blob/master/newomega_delegator/newomega/newomega.rs) :broken_heart:| |
| DAO | [subDAO](https://github.com/SubDAO-Network/subDAO-contracts) :broken_heart:, [RainbowDAO](https://github.com/RainbowcityFoundation/RainbowDAO-Protocol-Ink-milestone_1) :broken_heart:| |
| Spam Protection | [Prosopo](https://github.com/prosopo-io/integration) :green_heart:| |
| Other | [Candle Auctions](https://github.com/agryaznov/candle-auction-ink) :broken_heart:, [polkasign-contract](https://github.com/SubDAO-Network/polkasign-contract) :broken_heart:, [OCEX](https://github.com/bsn-si/ocex-cli) :yellow_heart:, [Roloi](https://github.com/RoloiMoney/roloi-polkadot-w3f-grant) :green_heart:| |


### Chains and Pallets 

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Scalable Transactions | [Perun channels](https://github.com/perun-network/perun-polkadot-pallet) :yellow_heart:, [CLI demo of Perun](https://github.com/perun-network/perun-polkadot-demo) :broken_heart:, [Astar](https://github.com/AstarNetwork/Astar) :green_heart:, [Celer](https://github.com/celer-network/cChannel-substrate) :broken_heart:, [Gunclear](https://github.com/GunClear/Gunero) :broken_heart:| roll-ups, DAG-based consensus mechanisms, side chains |
| Bridges |  [interBTC](https://github.com/interlay/interbtc) :green_heart:, [ChainBridge](https://github.com/centrifuge/ChainBridge/) :green_heart:, [EOS by Bifrost](https://github.com/bifrost-finance/bifrost-eos-relay) :broken_heart:, [POA - Substrate](https://github.com/paritytech/parity-bridge) :broken_heart:, [Substrate - Ethereum DAI Bridge](https://github.com/akropolisio/POC-polkadai-bridge) :broken_heart:, [Substrate - Substrate Bridge](https://github.com/paritytech/substrate-bridge-relay) :broken_heart:, [BTC by ChainX](https://github.com/chainx-org/ChainX) :yellow_heart:, [Cosmos-Substrate bridge](https://github.com/ChorusOne/wormhole-bridge) :broken_heart:, [Substrate IBC Pallet](https://github.com/octopus-network/substrate-ibc) :yellow_heart:, [Polkadot Ethereum Bridge](https://github.com/Snowfork/polkadot-ethereum) :green_heart:, [Darwinia](https://github.com/darwinia-network/darwinia) :green_heart:, [Stellar/DeFi Bridge by Pendulum](https://github.com/pendulum-chain/pendulum-prototype) :broken_heart:, [Filecoindot](https://github.com/ChainSafe/filecoindot) :broken_heart:| ZCash |
| Privacy | [Webb Anon](https://github.com/webb-tools/anon) :broken_heart:, [ZeroChain](https://github.com/LayerXcom/zero-chain) :broken_heart:, [pLibra (Phala Network)](https://github.com/Phala-Network/phala-blockchain) :green_heart:, [Automata Network](https://github.com/automata-network/automata) :yellow_heart:, [zCloak Network](https://github.com/zCloak-Network/zcloak-node) :broken_heart:, [Zero Network](https://github.com/zero-network/zero) :yellow_heart:|  [Multi-Asset Shielded Pool (MASP)](https://github.com/anoma/masp)<!-- NO_STATUS_BADGE --> , [Zkay](https://arxiv.org/pdf/2009.01020.pdf), [Zexe](https://eprint.iacr.org/2018/962.pdf)
| ZKP | [ZeroPool](https://github.com/zeropoolnetwork/zeropool-substrate-groth16-example) :broken_heart:, [Megaclite](https://github.com/patractlabs/megaclite) :broken_heart:, [zkMega](https://github.com/patractlabs/zkmega) :broken_heart:, [PLONK for Substrate](https://github.com/AstarNetwork/plonk) :yellow_heart:, [Webb Anchor Protocol](https://github.com/webb-tools/protocol-substrate) :green_heart:|
| TEE | [Integritee](https://github.com/integritee-network/worker) :green_heart:, [substraTEE](https://github.com/scs/substraTEE) :broken_heart:
| DeFi | [Diora](https://github.com/Diora-Network/Diora) :green_heart:, [Pendulum Chain](https://github.com/pendulum-chain/pendulum) :green_heart:, [Compound Gateway](https://github.com/compound-finance/gateway) :broken_heart:, [Parallel Finance](https://github.com/parallel-finance/parallel) :green_heart:, [PINT](https://github.com/ChainSafe/PINT) :broken_heart:, [Laminar Chain](https://github.com/laminar-protocol/laminar-chain) :broken_heart:, [Acala](https://github.com/AcalaNetwork/Acala) :green_heart:, [Centrifuge](https://github.com/centrifuge/centrifuge-chain) :green_heart:, [Stafi](https://github.com/stafiprotocol/stafi-node) :broken_heart:, [Definex](https://github.com/y2labs-0sh/definex) :broken_heart:, [OAX Foundation](https://github.com/OAXFoundation/parrot) :broken_heart:, [Cybex](https://github.com/alexxuyang/substrate-dex) :broken_heart:, [Zenlink](https://github.com/zenlinkpro/pallet-zenlink) :broken_heart:, [Swaps Pallet](https://github.com/lsaether/pallet-swaps) :broken_heart:, [Polkadex](https://github.com/Polkadex-Substrate/Polkadex/tree/master) :yellow_heart:, [SubDEX](https://github.com/subdarkdex/subdex-parachain) :broken_heart:, [HydraDX](https://github.com/galacticcouncil/hack.HydraDX-node) :green_heart:, [Substrate Stablecoin](https://github.com/apopiak/stablecoin) :broken_heart:, [Standard protocol](https://github.com/digitalnativeinc/standard-substrate) :broken_heart:, [Polkaswap](https://github.com/sora-xor/sora2-network) :green_heart:, [Curve AMM](https://github.com/equilibrium-eosdt/equilibrium-curve-amm) :broken_heart:, [Konomi Network](https://github.com/konomi-network/cumulus/) :broken_heart:, [Composable Finance](https://github.com/ComposableFi/composable) :green_heart:, [Stable Asset](https://github.com/nutsfinance/stable-asset) :green_heart:, [Libra Payment](https://github.com/atscaletech/libra) :green_heart:, [Mangata](https://github.com/mangata-finance/mangata-node) :green_heart:, [Tidechain](https://github.com/tidelabs/tidechain) :green_heart:| DEX with privacy and confidentiality features such as those found in a [dark pool](https://en.wikipedia.org/wiki/Dark_pool)
| Smart contract chains | [moonbeam](https://github.com/PureStake/moonbeam) :green_heart:, [Edgeware](https://github.com/hicommonwealth/edgeware-node) :broken_heart:, [ParaState](https://github.com/ParaState/substrate-ssvm-node) :broken_heart:, [gear](https://github.com/gear-tech/gear) :green_heart:, [CENNZnet](https://github.com/cennznet/cennznet) :green_heart:, [SkyeKiwi](https://github.com/skyekiwi/skyekiwi-network) :yellow_heart:, [OAK-blockchain](https://github.com/OAK-Foundation/OAK-blockchain) :green_heart:, [ICE Blockchain](https://github.com/web3labs/ice-substrate) :green_heart:| smart contract chains with novel security approaches, smart contract chains based on existing toolchains|
| Oracle | [Laminar](https://github.com/laminar-protocol/open-runtime-module-library/tree/master/oracle) :green_heart:, [Parallel Finance](https://github.com/parallel-finance/parallel/blob/feature-oracle/pallets/ocw-oracle/src/lib.rs) :green_heart:, [Chainlink-polkadot](https://github.com/smartcontractkit/chainlink-polkadot) :broken_heart:, [Ares Protocol](https://github.com/aresprotocols/ares) :green_heart:, [Kylin Network](https://github.com/Kylin-Network/kylin-node) :green_heart:, [interbtc-clients oracle](https://github.com/interlay/interbtc-clients/tree/master/oracle) :green_heart:, [Anonima](https://github.com/webb-tools/anonima) :broken_heart:, [Apollo](https://github.com/ComposableFi/composable/tree/main/frame/oracle) :green_heart:
| Identity/DID | [Litentry](https://github.com/litentry/litentry-runtime) :broken_heart:, [pallet-did](https://github.com/substrate-developer-hub/pallet-did) :broken_heart:, [dot-id](https://github.com/prasad-kumkar/dot-id) :broken_heart:
| IoT | [Nodle](https://github.com/NodleCode/chain) :green_heart:, [MXC/DataHighway](https://github.com/DataHighway-DHX/node) :broken_heart:, [peaq-network-node](https://github.com/peaqnetwork/peaq-network-node) :broken_heart:
| Verifiable Claims | [KILT](https://github.com/KILTprotocol/kilt-node) :green_heart:, [Dock](https://github.com/docknetwork/dock-substrate) :green_heart:, [Fennel Protocol](https://github.com/fennelLabs/Fennel-Protocol) :yellow_heart:
| Supply chain| [DSCP Node](https://github.com/digicatapult/dscp-node) :green_heart:| | 
| Health care| [AriaHealth](https://github.com/AriaHealth/MetaNetwork) :broken_heart:| | 
| Social Networking | [Social Network](https://github.com/social-network/blockchain) :broken_heart:, [SubSocial](https://github.com/dappforce/subsocial-node) :broken_heart:, [ZeroDAO](https://github.com/ZeroDAO/ZeroDAO-node) :yellow_heart:, [Myriad Node](https://github.com/myriadsocial/myriad-node) :green_heart:, [Wika Network](https://github.com/randombishop/wika_etl) :broken_heart:, [Project Liberty](https://github.com/LibertyDSNP/mrc) :green_heart:, [Listen](https://github.com/listenofficial/listen-parachain) :green_heart:| Private instant messenger that uses on-chain identity
| Governance/DAO| [Hashed Network](https://github.com/hashed-io/hashed-substrate) :green_heart:, [Sunshine DAO](https://github.com/sunshine-protocol/sunshine-bounty) :broken_heart:, [Governance OS](https://github.com/NucleiStudio/governance-os) :broken_heart:, [Idavoll Network](https://github.com/idavollnetwork/idavoll) :broken_heart:, [Substrate Moloch](https://github.com/DoraFactory/Substrate-Moloch-V2) :broken_heart:, [QRUCIAL-DAO](https://github.com/Qrucial/QRUCIAL-DAO) :green_heart:, [Societal](https://github.com/sctllabs/societal-node) :grey_question:, [DAOs](https://github.com/daos-org/daos) :green_heart:|   [Consul](https://github.com/consul/consul)<!-- NO_STATUS_BADGE --> - Open Government and E-Participation Web Software
| Prediction Markets and Futarchy| [Zeitgeist](https://github.com/zeitgeistpm/zeitgeist) :green_heart:, [X Predict Market](https://github.com/XPredictMarket/NodePredict) :broken_heart:|
| Messaging | [HOPR](https://github.com/validitylabs/HOPR-PL-Substrate) :broken_heart:, [Nolik](https://github.com/chainify/pallet-nolik/) :broken_heart:
| File Storage, Cloud | [DatDot](https://github.com/playproject-io/datdot) :broken_heart:, [Crust Network](https://github.com/crustio/crust) :broken_heart:, [offchain::ipfs](https://github.com/rs-ipfs/offchain-ipfs-manual) :broken_heart:, [Canyon Network](https://github.com/canyon-network/canyon) :broken_heart:, [CESS](https://github.com/Cumulus2021/cess) :green_heart:, [CESS Proving Subsystem](https://github.com/CESSProject/cess-proving-system) :broken_heart:, [Iris](https://github.com/ideal-lab5/iris) :yellow_heart:, [fmd-cess](https://github.com/CESSProject/fmd-cess) :broken_heart:, [IPFS Frame V3](https://github.com/DanHenton/pocket-substrate/tree/ipfs-ocw) :yellow_heart:, [Threefold Chain](https://github.com/threefoldtech/tfchain) :green_heart:, [Apron](https://github.com/Apron-Network/apron-node) :broken_heart:
| Name Service| [Substrate Names](https://github.com/xaya/substrate-names) :broken_heart:, [ENS on Substrate](https://github.com/hskang9/substrate-name-service) :broken_heart:, [PNS-Pallets](https://github.com/pnsproject/pns-pallets) :broken_heart:
| Gaming | [Bit.country](https://github.com/bit-country/Bit-Country-Blockchain) :green_heart:, [SubGame](https://github.com/SubGame-Network/subgame-network) :yellow_heart:, [subzero](https://github.com/playzero/subzero) :broken_heart:, [Web3Games](https://github.com/web3gamesofficial/web3games-blockchain) :broken_heart:, [Ajuna Network](https://github.com/ajuna-network/Ajuna) :green_heart:, [Gafi Network](https://github.com/cryptoviet/gafi) :green_heart:, [Asylum](https://gitlab.com/asylum-space/asylum-item-nft) | 
| Computation/AI | [DeepBrain Chain](https://github.com/DeepBrainChain/DeepBrainChain-MainChain) :green_heart:, [AI Infrastructure on Blockchain](https://github.com/anudit/cerebrum) :broken_heart:|
| Enable specific use-cases | [Robonomics](https://github.com/airalab/substrate-node-robonomics) :green_heart:, [UniversalDOT](https://github.com/UniversalDot/pallets) :broken_heart:, [Evercity Sustainable Finance Protocol](https://github.com/EvercityEcosystem/evercity-chain) :green_heart:, [Fennel Protocol](https://github.com/fennelLabs/Fennel-Protocol) :yellow_heart:, [logion](https://github.com/logion-network/logion-node) :green_heart:
| NFT | [ternoa](https://github.com/capsule-corp-ternoa/chain) :green_heart:, [FRAME Pallet: NFTs for Substrate](https://github.com/danforbes/pallet-nft) :broken_heart:, [Unique NFT Parachain](https://github.com/UniqueNetwork/unique-chain) :green_heart:, [DNFT](https://github.com/DNFT-Team/dnft-substrate-node/tree/master/pallets) :broken_heart:, [RMRK-Substrate](https://github.com/rmrk-team/rmrk-substrate) :green_heart:
| Randomness | [DKG and Randomness Beacon](https://github.com/Cardinal-Cryptography/substrate/tree/randomness-beacon) :yellow_heart:
| Licensing | [Anagolay Network](https://github.com/anagolay/anagolay-chain) :green_heart:| 
| Banking Integration | [FIAT on-off-ramp](https://github.com/element36-io/ebics-java-service) :yellow_heart:
| Crowdfunding | [Imbue Network](https://github.com/ImbueNetwork/imbue) :green_heart:, [Quadratic Funding pallet by Dora](https://github.com/zhangjiannan/QFgrant) :broken_heart:, [Quadratic Funding pallet by OAK](https://github.com/OAK-Foundation/quadratic-funding-pallet/tree/master) :broken_heart:|  [Minimum Anti-Collusion Infrastructure (MACI)](https://ethresear.ch/t/minimal-anti-collusion-infrastructure/5413) 
| Licensing | [Anagolay Network](https://github.com/anagolay/anagolay-chain) :green_heart:| 
| Collection of Pallets | [Substrate Open Runtime Module Library](https://github.com/open-web3-stack/open-runtime-module-library) :green_heart:, [warehouse](https://github.com/galacticcouncil/warehouse) :green_heart:, [InvArch FRAME Pallet Library](https://github.com/InvArch/InvArch-Frames) :yellow_heart:|
| Marketplaces | [Dot Marketplace](https://github.com/WowLabz/dot-marketplace-v2/tree/Phase2_Milestone2) :green_heart:| 
| Other | [Substrate Account Filter](https://github.com/gautamdhameja/substrate-account-filter) :broken_heart:, [Subtensor](https://github.com/opentensor/subtensor) :green_heart:, [BitGreen](https://github.com/bitgreen/bitg-node) :green_heart:, [AdMeta](https://github.com/AdMetaNetwork/admeta) :green_heart:, [Chocolate Node](https://github.com/chocolatenetwork/chocolate-node) :green_heart:, [Virto Network](https://github.com/virto-network/virto-node) :yellow_heart:, [Substrate Validator Set](https://github.com/gautamdhameja/substrate-validator-set) :green_heart:, [DEIP](https://github.com/DEIPworld/deip-node) :green_heart:, [DeBio](https://github.com/debionetwork/debio-node) :green_heart:, [MathChain](https://github.com/mathwallet/MathChain) :broken_heart:, [encointer](https://github.com/encointer/encointer-node) :green_heart:, [Grassland](https://github.com/grasslandnetwork/substrate_node) :broken_heart:, [Substrate-Tutorials](https://github.com/rusty-crewmates/substrate-tutorials) :green_heart:, [Fair Squares](https://github.com/Fair-Squares/fair-squares) :green_heart:, [Totem Live Accounting](https://github.com/totem-tech/totem) :broken_heart:| Decentralized review/reputation system

### Host

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Rust | [Substrate](https://github.com/paritytech/substrate) :green_heart:, [Cumulus](https://github.com/paritytech/cumulus) :green_heart:
| C++ | [Kagome](https://github.com/soramitsu/kagome) :green_heart:
| Go | [Gossamer](https://github.com/ChainSafe/gossamer) :green_heart:
| AssemblyScript |
| Light Client | [Substrate Connect](https://github.com/paritytech/substrate-connect) :green_heart:|

### Network Maintenance Tools

| Components | Existing projects | Potentially interesting projects
|-|-|-
| Secure validator setup | [Polkadot Validation Node Ansible Setup](https://github.com/polkachu/polkadot-validator) :green_heart:, [W3F Polkadot Validator Setup](https://github.com/w3f/polkadot-validator-setup) :broken_heart:
| High availability setup | [Archipel](https://github.com/luguslabs/archipel) :yellow_heart:, [Polkadot Failover Mechanism](https://github.com/protofire/polkadot-failover-mechanism) :broken_heart:
| Load Balanced Endpoints | [terragrunt-polkadot](https://github.com/insight-w3f/terragrunt-polkadot) :broken_heart:, [Geometry Labs' Substrate Meta repo](https://github.com/sudoblockio/substrate-meta) :yellow_heart:
| Deployment Tools| [Polkadot Package Manager](https://github.com/Blockdaemon/bpm-sdk) :broken_heart:, [PolkaHub](https://github.com/akropolisio/polkahub-monorepo) :broken_heart:, [Avado](https://github.com/AvadoDServer/AVADO-DNP-Polkadot-custom) :broken_heart:, [Polkadot Deployer](https://github.com/w3f/polkadot-deployer) :broken_heart:
| Validator monitoring | [ONE-T](https://github.com/turboflakes/one-t), [SubVT](https://github.com/helikon-labs/subvt) :yellow_heart:, [P.A.N.I.C.](https://github.com/SimplyVC/panic_polkadot) :broken_heart:, [Polkalert](https://github.com/galacticcouncil/polkalert) :broken_heart:, [B-Harvest](https://github.com/nodebreaker0-0/substrate/tree/prometheus_v0.3) :broken_heart:, [nmonpolkadot](https://github.com/stakezone/nmonpolkadot) :broken_heart:, [Polkadot-K8s-Monitor](https://github.com/ironoa/polkadot-k8s-monitor) :yellow_heart:, [Polkadot-Watcher](https://github.com/w3f/polkadot-watcher) :green_heart:, [1KV Telegram Bot](https://github.com/helikon-labs/polkadot-kusama-1kv-telegram-bot) :yellow_heart:
| Validator payout management | [Substrate validator auto payout](https://github.com/Colm3na/substrate-auto-payout) :yellow_heart:, [Polkadot Payouts](https://github.com/w3f/polkadot-payouts) :green_heart:, [staking-payouts CLI](https://github.com/emostov/staking-payouts) :yellow_heart:, [Payctl](https://github.com/stakelink/substrate-payctl) :broken_heart:, [crunch](https://github.com/turboflakes/crunch) :green_heart:|

### Signatures

| Components | Existing projects | Potentially interesting projects
|-|-|-
| SR25519 | [rust](https://github.com/w3f/schnorrkel) :green_heart:(contains partial bindings for C, JavaScript, and Python), [.Net bindings](https://github.com/gautamdhameja/sr25519-dotnet) :broken_heart:, [C](https://github.com/usetech-llc/sr25519) :broken_heart:*(old)*, [C](https://github.com/TerenceGe/sr25519-donna) :broken_heart:*(new)*, [C/C++](https://github.com/soramitsu/soramitsu-sr25519-crust) :broken_heart:, [C#](https://github.com/usetech-llc/sr25519_dotnet) :broken_heart:, [Go](https://github.com/ChainSafe/go-schnorrkel) :green_heart:, [java](https://github.com/debuggor/schnorrkel-java) :broken_heart:, [PHP](https://github.com/gmajor-encrypt/sr25519-bindings) :yellow_heart:
| Distributed key generation (DKG) | [keygen.rs](https://github.com/isislovecruft/frost-dalek) :broken_heart:
| Validator HSMs| [Zondax Remote Signer](https://github.com/Zondax/buildroot-zondax) 

### Consensus

| Components | Existing projects | Potentially interesting projects
|-|-|-
| PoC | [Spartan](https://github.com/subspace/substrate) :broken_heart:|
| PoW | [PoW consensus for Substrate](https://github.com/paritytech/substrate/tree/master/client/consensus/pow) :green_heart:, [RandomX](https://github.com/kulupu/kulupu/tree/master/pow) :yellow_heart:, [Sha3 PoW](https://github.com/substrate-developer-hub/recipes/tree/master/consensus/sha3pow) :broken_heart:|
| Block production | [BABE](https://github.com/paritytech/substrate/tree/master/client/consensus/babe) :green_heart:, [Aura](https://github.com/paritytech/substrate/tree/master/client/consensus/aura) :green_heart:|
| Finality | [GRANDPA](https://github.com/paritytech/substrate/tree/master/frame/grandpa) :green_heart:, [AlephBFT](https://github.com/Cardinal-Cryptography/aleph-node/tree/main/finality-aleph) :green_heart:|
| Other | [Nimbus: Upgradeable consensus framework](https://github.com/PureStake/nimbus) :green_heart:| 


### Networking

| Components          | Existing projects                                                                                               | Potentially interesting projects |
|---------------------|-----------------------------------------------------------------------------------------------------------------|----------------------------------|
| DHT crawler         | [Go](https://github.com/atredispartners/dht-crawler-polkadot) :broken_heart:, [Kotlin](https://github.com/emeraldpay/polkabot) :broken_heart:|                                  |
| RPC Tor-like access | [WhiteNoise](https://github.com/Evanesco-Labs/WhiteNoise.rs) :broken_heart:|                                  |

## Contributing

Pull requests, issues, or other contributions from the community are encouraged!  You can not only add specific projects, but also potentially interesting fields/areas which are currently missing in the tech stack.

:heavy_exclamation_mark: All technologies listed above need to be open-source. Ideally, the links lead directly to the code.

_Note: You will need a GitHub account to suggest changes or open issues. If you do not have one, you may [sign up for free](https://github.com/join)._
