---
id: claims
title: Polkadot 申领
sidebar_label: 认领
---

如果您在之前的销售中购买了 DOT，则需要通过以下程序认领 DOT 代币。对于那些已在较早创世块之前提交了认领交易到以太坊上的 Claims 合约，那么您应该已经知道您的 Polkadot 地址。您仍然需要提交一个不用交易费的 _attest_ 交易，该交易用于同意您的分配条款和条件。您必须首先声明或证明，之后 DOT 才能在您的帐户中使用。

本指南将带领您完成认领或证明声明的步骤。

如果您是首次认领 DOT，请阅读下面[认领](#making-a-claim)的部分继续。如果您在创世块之前已经认领，请前往[证明声明](#attesting-to-a-statement)部分。

> 了解更多如何认领您的DOT，请查看我们的攻略  [video](https://www.youtube.com/watch?v=rjhWfKXJTCg&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=22)和视频 [Claiming DOT with an Ethereum address generated using an old mnemonic phrase](https://www.youtube.com/watch?v=AlwrM27x3As&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=16)

## 认领

如果您在创世块之前期间没有认领，那么您就可以在创世块后的任何时间认领。认领没有时间限制，因此任何时候您都可以这样做。

> 注意: 申领时，您还需验证您的DOT代币分配协议。申领及验证将在一个同交易里完成，从用户的角度来看，这已是极度简化的流程。

### 您将需要什么

- 持有 DOT 代币的以太坊账户
- MyCrypto 钱包
- Polkadot 帐户

您应该已经拥有以太坊账户，该账户持有 Polkadot 的 DOT 代币。 您需要访问该帐户才能进行签名。

[ MyCrypto ][] 是款多功能钱包，可为您的以太坊账户提供多种存储方式。请点击链接转到其下载页面，并确保您下载了适用于您操作系统的最新版本。 这很重要，因为最新版本将有最新的安全补丁程序。

> **注意**: 在本地下载和使用 MyCrypto 应用程序更加安全。 您可以在其[releases page][mycrypto]上找到桌面应用程序的最新版本。

您需要一个 Polkadot 帐户作为获取申领的DOT的账户。请根据\[创建账户\]\[\] 页面上的说明生成新的 Polkadot 帐户。

#### 使用 MyCrypto 认领您的 DOT

Polkadot JS [Claims app][]可帮助您从 MyCrypto 签名消息。 万一您持有 DOT 代币的以太坊帐户的密钥存储在 Ledger Nano S 或 Trezor 等冷钱包上，MyCrypto 是个不错的选择。它还支持私钥，助记词和 Parity signer。

一旦下载了 MyCrypto 并使其在本地运行(为了获得最大的安全性，我们建议使用完全离线的电脑)，您可以先访问 Polkadot-JS Apps 上的 Claims 程序。选择您要申请认领 DOT 的帐户，然后点蓝色的 "Continue" 按钮继续。您的屏幕应如下图所示:

![claim-1](assets/new-claims/claim-1.png)

现在您将需要提供与您将认领 DOT 代币的以太坊地址。在框中输入以太坊地址，然后点击 "Continue"。

![claim-2](assets/new-claims/claim-2.png)

接下来，屏幕应如下图所示。

![claim-2-1](assets/new-claims/claim-2-1.png)

句子后面的十六进制编码字符串: "Pay DOTs to the Polkadot account:" 是您 Polkadot 帐户的十六进制编码公钥，去除 `0x` 前缀。

下一步是转到 MyCrypto 程序，然后点击 "Sign & Verify Message" 选项。

![claim-3](assets/new-claims/claim-3.png)

这将提示您选择一种解锁钱包的方法。

![claim-4](assets/new-claims/claim-4.png)

解锁钱包后，将来自 Polkadot JS 的信息粘贴到 "Message" 框中。

![claim-5](assets/new-claims/claim-5.png)

当您点击 "Sign Message" 时，您将获得类似于以下 JSON 的内容:

![claim-6](assets/new-claims/claim-6.png)

将来自 MyCrypto 的签名信息的 JSON 结果复制并粘贴到 Polkadot JS UI 的输入框中，然后点击 "Confirm Claim"。

![claim-7](assets/new-claims/claim-7.png) ![claim-8](assets/new-claims/claim-8.png)

将会出现一个绿色框，告诉您要认领的金额，并带有 "Claim" 按钮以提出认领。 点击 "Claim" 按钮，然后按 "Submit (no signature)" 以完成认领。

![claim-9](assets/new-claims/claim-9.png)

若申领成功，那么您将看到提示成功的消息，同时您的DOT将会出现在您在申领时提交的账户中。

#### 确认您的认领

当您在链上申领 DOT 后，Polkadot UI 上应即时更新了您的余额。

遇到麻烦? 在 DOT [Claims Support]()渠道寻求帮助。

![claim-10](assets/new-claims/claim-10.png)

恭喜，您现在已经完成了 DOT 申领及签名的流程。

### 第三方认领程序

**我们不建议使用其它第三方应用程序或流程来进行您DOT的申领或获取。**

使用第三方程序进行申领可能会导致代币分配失败，因此我们不建议您使用任何第三方应用程序这样做。按照我们的申领流程，手动指定您的交易数据，是确保您将收到DOT代币的唯一方法。

## 证明声明

若您已经在创世块前提出申领，您仍然需要使用您的 Polkadot 帐户签署一份协议。

## 使用 Polkadot-JS App UI

### 您将需要什么

- 您的 Polkadot 帐户已在 Polkadot-JS Apps UI 上解锁。

您将通过您的 Polkadot 帐户发起一次无交易费用的交易。完成交易后，您的代币将出现在您的账户中。

### 前往 Polkadot-JS 程序

继续使用 [polkadot-js Apps][claims app]。您需要授予应用程序对您账户的访问权限。一种方法是前往到 Accounts 页面并 "创建" 新帐户，将生成的种子或助记词替换为您的帐户的seed或助记词。另一种方法是使用 Polkadot-JS 扩展程序，然后在其输入您的seed或助记词，这通常比直接在程序页面中输入更安全。

### 提交证明

当输入帐户后，您应该会在左侧导航栏的 "Claim Tokens" 标签上看到红色的提示。

![claim-attest-1](assets/new-claims/new-attest-1.png)

点击 "Claims Tokens" 选项，您将在页面顶部看到一个大型通知，告诉您需要签署验证声明。

![claim-attest-2](assets/new-claims/new-attest-2.png)

该通知将显示您已在 Polkadot-JS 中加载并需要签名的多个 Polkadot 地址。使用下拉选择来选择已申领 Polkadot 的帐户。如果您没有看到或收到通知，请仔细检查该帐户是否已加载到 Polkadot-JS 中，并且在创世块前已经进行申领。与往常一样，请随时在 [Claims Support]() 中寻求帮助。

点击 "Continue"，您将看到右侧的绿弹框。

![claim-attest-3](assets/new-claims/new-attest-3.png)

![claim-attest-4](assets/new-claims/new-attest-4.png)

点击 "I Agree"，然后点击 "Sign and Submit" 提交您无交易费用的验证交易。当交易打包入区块中后，您将看到绿色的成功弹框出现在右上角，同时 DOT 将出现在您的帐户中。

![claim-attest-5](assets/new-claims/new-attest-5.png)

## 使用Parity Signer

### 您需要准备什么

- Parity Signer
- 已链接到 Polkadot-JS Apps UI 的 Polkadot 帐户

在申领前，您应将您在Parity Signer上的 Polkadot 地址导入到 PolkadotJS 应用程序中。 所有操作都将使用Parity Signer来签署交易，但将通过PolkadotJS 的远程节点进行广播。 如果您没有 Polkadot 地址， 请按照 [创建账户][] 页面中Parity Signer部分的说明创建一个新的 Polkadot 账户。

### 前往 Polkadot-JS Apps

继续使用 [polkadot-js Apps][claims app]。您需要先将您在Parity Signer上的地址导入到账户页面。

### 提交验证声明

![ps-claim-1](assets/new-claims/ps-claim-1.png)

点击右侧的“Add via Qr”。

![ps-claim-2](assets/new-claims/ps-claim-2.png)

打开Parity Signer并选择 "Polkadot" 网络。

![ps-1](assets/new-claims/ps-01.jpg)

选择你在创世块前申领DOT的地址。

![ps-2](assets/new-claims/ps-02.jpg)

![ps-3](assets/new-claims/ps-03.jpg)

您的地址将以二维码的方式显示。 您可扫描二维码，以便 PolkadotJS 应用程序对其进行解码。

![ps-claim-3](assets/new-claims/ps-claim-3.png)

当二维码信息读取成功后，输入您的地址名称并点击“创建”。

![ps-claim-4](assets/new-claims/ps-claim-4.png)

您会注意到“申领代币”菜单旁的数字已更改为2。 这代表着账户页面上需要进行验证的地址数量。

转到 [申领代币](https://polkadot.js.org/apps/#/claims) 页面，您将在页面顶部看到一个大的通知，告诉您需要签署验证声明。

使用下拉选择选择刚刚导入用以进行申领的Polkadot账户。 如果没有看到通知或者没有看到选择器，请仔细检查该账户是否已经加载到Polkadot-JS中并且其已在创世块前进行了申领。同时，请随时在[Claims Support]()中寻求帮助。

![ps-claim-5](assets/new-claims/ps-claim-5.png)

随后点击 "Continue"，您将看到右侧的绿色弹框。

![ps-claim-6](assets/new-claims/ps-claim-6.png)

点击“I Agree”，然后点击“Sign via Qr”。

![ps-claim-7](assets/new-claims/ps-claim-7.png)

现在您需要使用已加载您Polkadot地址的 Parity Signer 来签署交易。

![ps-claim-8](assets/new-claims/ps-claim-8.png)

首先，您需要点击Parity Signer上的“QR Scanner”，扫描授权交易窗口上显示的二维码，生成原始交易。接下来，您可能需要在Parity Signer上输入PIN码，以二维码的形式生成签名交易。然后将二维码移动到PolkadotJS Apps上的镜头中以继续下一步。

![ps-3r](assets/new-claims/ps-3r.jpg)

当交易被成功打包后，您将看到绿色成功框出现在右上角，同时DOT 将出现在您的帐户中。
  https://riot.im/app/#/room/!kwIkVteRpPRjjTyvTe:web3.foundation?via=web3.foundation&via=matrix.org&via=matrix.parity.io

[ MyCrypto ]: https://download.mycrypto.com/

[mycrypto]: https://download.mycrypto.com/
[创建账户]: learn-account-generation
[Claims app]: https://polkadot.js.org/apps/#/claims
[claims app]: https://polkadot.js.org/apps/#/claims
