---
id: claims
title: Polkadot 认领
sidebar_label: 认领
---

如果您在之前的销售中购买了 DOT，则需要通过以下程序认领 DOT 代币。对于那些已在较早创世块之前提交了认领交易到以太坊上的 Claims 合约，那么您应该已经知道您的 Polkadot 地址。您仍然需要提交一个不用交易费的 _attest_ 交易，该交易用于同意您的分配条款和条件。您必须首先声明或证明，之后 DOT 才能在您的帐户中使用。

本指南将带领您完成认领或证明声明的步骤。

如果您是首次认领 DOT，请阅读下面[认领](#making-a-claim)的部分继续。如果您在创世块之前已经认领，请前往[证明声明](#attesting-to-a-statement)部分。

## 认领

如果您在创世块之前期间没有认领，那么您就可以在创世块后的任何时间认领。认领没有时间限制，因此任何时候您都可以这样做。

> 注意: 认领时，您将同时对所需的陈述作证明。这两个动作 "claim" 和 "attest" 是在一个交易里完成，但是从 UI 的角度来看，这在很大程度上被简化了。

### 您将需要什么

- 持有 DOT 代币的以太坊账户
- MyCrypto 钱包
- Polkadot 帐户

您应该已经拥有以太坊账户，该账户持有 Polkadot 的 DOT 代币。 您需要访问该帐户才能进行签名。

[ MyCrypto ][] 是款多功能钱包，可为您的以太坊账户提供多种存储方式。请点击链接转到其下载页面，并确保您下载了适用于您操作系统的最新版本。 这很重要，因为最新版本将有最新的安全补丁程序。

> **注意**: 在本地下载和使用 MyCrypto 应用程序更加安全。 您可以在其[releases page][mycrypto]上找到桌面应用程序的最新版本。

You will need a Polkadot account to claim your DOTs. Please follow the instructions on the \[account generation\]\[\] page for generating a new Polkadot account.

#### 使用 MyCrypto 认领您的 DOT

Polkadot JS [Claims app][]可帮助您从 MyCrypto 签名消息。 万一您持有 DOT 代币的以太坊帐户的密钥存储在 Ledger Nano S 或 Trezor 等冷钱包上，MyCrypto 是个不错的选择。它还支持私钥，助记词和 Parity signer。

一旦下载了 MyCrypto 并使其在本地运行(为了获得最大的安全性，我们建议使用完全离线的电脑)，您可以先前往到 Polkadot-JS Apps 上的 Claims 程序。选择您要申请认领 DOT 的帐户，然后点蓝色的 "Continue" 按钮继续。您的屏幕应如下所示:

![claim-1](assets/new-claims/claim-1.png)

现在您将需要提供与您将认领 DOT 代币的以太坊地址。在框中输入以太坊地址，然后点击 "Continue"。

![claim-2](assets/new-claims/claim-2.png)

接下来，屏幕应如下图所示。

![claim-2-1](assets/new-claims/claim-2-1.png)

句子后面的十六进制编码字符串: "Pay DOTs to the Polkadot account:" 是您 Polkadot 帐户的十六进制编码公钥，减去 `0x` 前缀。

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

如果认领成功，那么您将看到一条成功消息，并且您的 DOT 将会在您认领的帐户中。

#### 确认您的认领

当提出链上认领 DOT 之后，Polkadot UI 上应立即更新了您的余额。

遇到麻烦? 在 DOT [Claims Support]()渠道寻求帮助。

![claim-10](assets/new-claims/claim-10.png)

恭喜，您现在已经完成了 DOT 认领和签名的程序。

### 第三方认领程序

#### Coinbase 托管

> 请注意，使用 Coinbase 托管进行认领过程要求您的帐户至少有 1,000 DOT，另外也有与 Coinbase 托管相关的费用。

1. 开设帐户，请直接通过 sales@coinbase.com 与 Coinbase 托管联系。
1. 开设帐户后，Coinbase 托管将生成一个 DOT 地址供您在认领过程中使用并将其发送给您。
1. 然后您可以使用 Coinbase 托管您的 DOT 地址认领您的代币，并且您的代币将出现在您的 Coinbase 托管帐户中。

对于有关使用 Coinbase 托管认领的问题，请联系 sales@coinbase.com。

#### 其它第三方程序

**我们不建议使用其它第三方应用程序或程序来执行您的认领或获取 DOT。**

使用其它第三方程序进行认领可能会导致分配失败。因此我们不建议您使用任何第三方应用程序来这样做。按照我们的认领流程中指定的方式手动生成交易数据，或使用Coinbase 托管，这是确保您将收到分配的唯一方法。

## 证明声明

如果您已经在创世块之前提出了认领，您仍然需要使用您的 Polkadot 帐户签署同意声明。

### 您将需要什么

- 您的 Polkadot 帐户已在 Polkadot-JS Apps UI 上解锁。

您将通过 Polkadot-JS Apps UI 从您的 Polkadot 帐户发送不用交易费的交易。完成交易后，您的帐户将可以使用该代币。

### 前往 Polkadot-JS 程序

继续使用 [polkadot-js Apps][claims app]。您将需要以某种方式授予程序对您帐户的访问权限。一种方法是前往到 Accounts 页面并 "create" 新帐户，将生成的种子或助记词替换为属于您的帐户的种子或助记词。另一种方法是使用 Polkadot-JS 扩展，然后在其输入您的种子或助记词，通常比直接在程序页面中输入更安全。

### 提交证明

当输入帐户后，您应该会在左侧导航的 "Claim Tokens" 标签上看到红色的提示。

![claim-attest-1](assets/new-claims/new-attest-1.png)

点击 "Claims Tokens" 选项，您将在页面顶部看到大通知，告诉您需要签署证明。

![claim-attest-2](assets/new-claims/new-attest-2.png)

该通知将显示您已在 Polkadot-JS 中加载并需要签名的多个 Polkadot 地址。使用下拉选择来选择拥有认领 Polkadot 的帐户。如果您没有收到通知或看到，请仔细检查该帐户是否已加载到 Polkadot-JS 中，并且在创世块之前已经认领了该帐户。与往常一样，请随时在 [Claims Support]() 频道中寻求协助。

点击 "Continue"，您将看到右侧的绿色框。

![claim-attest-3](assets/new-claims/new-attest-3.png)

![claim-attest-4](assets/new-claims/new-attest-4.png)

Click on "I Agree" and then "Sign and Submit" to make your free attest transaction. When the transaction is included in the block, you will see a green success box appear in the upper right corner and the DOTs will be in your account.

![claim-attest-5](assets/new-claims/new-attest-5.png)
  https://riot.im/app/#/room/!kwIkVteRpPRjjTyvTe:web3.foundation?via=web3.foundation&via=matrix.org&via=matrix.parity.io

[ MyCrypto ]: https://download.mycrypto.com/

[mycrypto]: https://download.mycrypto.com/
[Claims app]: https://polkadot.js.org/apps/#/claims
[claims app]: https://polkadot.js.org/apps/#/claims
