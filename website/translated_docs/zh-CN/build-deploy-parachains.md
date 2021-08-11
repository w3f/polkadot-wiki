---
id: build-deploy-parachains
title: 如何部署平行链
sidebar_label: 如何部署平行链
---

这个指南经已更新到Alexander测试网络

## 如何查询平行链

前往[Polkadot UI](https://polkadot.js.org/apps/#/explorer)的`Chain State`，选择`parachains`模组和`parachains(）`之后按下`+`按钮，之后会回传有效的平行链。

## 如何部署Adder平行链

**You will need to have the minimum deposit needed to create a referendum. Currently this minimum is 5 DOT.**

The `adder` parachain is a simple parachain that will keep a value in storage and add to this value as messages are sent to it. It can be found in the Polkadot repository under the `test-parachains` folder.

> 由 Adrian Brink 提出的本指南的过时视频版本 [此处](https://www.youtube.com/watch?v=pDqkzvA4C0E)。 当两个指南有分歧时，请参阅此。

### 代码生成

第一步首先下载Polkadot代码到你本地目录

```bash
git clone https://github.com/paritytech/polkadot.git
```

确保你经己安装好了Rust

```bash
curl https://sh.rustup.rs -sSf | sh
sudo apt install make clang pkg-config libssl-dev
rustup update
```

现在前往在Polkadot代码库裹的`test-parachains`资料夹并执行生成脚本

```bash
cd polkadot/test-parachains
./build.sh
```

它会在这个资料夹建立简单`adder`平行链的Wasm可执行文件，它将简单地添加发送到给它的消息。Wasm可执行文件会在`parachains/test/res/adder.wasm`路径，所以确保你能在那找到。

你需要生成并运行校对人(Collator)节点从而取得平行链的创世纪状态。

前往`test-parachains/adder/collator`资料夹并执行`build`和`run`指令

```bash
cargo build
cargo run
[ctrl-c]
```

停止校对人节点后你将获得如下结果：

```
Starting adder collator with genesis:
Dec: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 27, 77, 3, 221, 140, 1, 241, 4, 145, 67,
207, 156, 76, 129, 126, 75, 22, 127, 29, 27, 131, 229, 198, 240, 241, 13, 137, 186, 30, 123, 206]
Hex: 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000011b4d03dd8c01f1049143cf9c4c817e4b167f1d1b83e5c6f0f10d89ba1e7bce
```

最重要的资料是Hex字串，这是你的创世纪状态，你需要将它保存用于接下来步骤。

### 部署平行链

前往[Polkadot UI](https://polkadot.js.org/apps/#/extrinsics)的`Extrinsics`标签，选择你要从中部署parachain的帐户，你需要创建公投从而部署平行链。

Click on `democracy` -> `propose(proposal,value)` -> `parachains` -> `registerParachain(id,code,initial_head_data)`.

In the `id` input enter in the id of the parachain. In the case of the simple adder it will be `100`. In the `code` field click on the page button and then upload the `adder.wasm` binary that was compiled from before. In the `initial_head_data` we will copy and paste the hex data that we got from running the collator node. In the `value` field you will need to input the minimum required value for creating a referendum. At the time of writing this is _5 DOT_ on the Alexander testnet.

![registering a parachain](assets/parachain/register.png)

假如你前往到`Democracy`标签，你应该会看到你的提案在议案部分

一旦你等待的提案成为公投，你可以投票选择`赞成(Aye)`或`反对(Nay)`，投赞成票使你能够部署平行链。

![parachain referendum](assets/parachain/referendum.png)

当公投结束后，你可以查询你的平行链状态。

前往`Chain State`标签之后选择查询`parachains`状态 ，你应该能够看到一些你的平行链资料。

![parachain info](assets/parachain/info.png)

### 与Parachain互动

_Coming soon_
