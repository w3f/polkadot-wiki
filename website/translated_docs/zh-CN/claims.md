---
id: claims
title: Polkadot 认领
sidebar_label: 认领
---

如果您在之前的销售中购买了 DOT，则需要通过以下程序认领 DOT 代币。对于那些已在较早创世块之前提交了认领交易到以太坊上的 Claims 合约，那么您应该已经知道您的 Polkadot 地址。您仍然需要提交一个不用交易费的 _attest_ 交易，该交易用于同意您的分配条款和条件。您必须首先声明或证明，之后 DOT 才能在您的帐户中使用。

本指南将带领您完成认领或证明声明的步骤。

如果您是首次认领 DOT，请阅读下面[认领](#making-a-claim)的部分继续。如果您在创世块之前已经认领，请前往[证明声明](#attesting-to-a-statement)部分。

> To learn more on How to claim your DOT post genesis, check out our walkthrough [video](https://www.youtube.com/watch?v=rjhWfKXJTCg&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=22) and our video on [Claiming DOT with an Ethereum address generated using an old mnemonic phrase](https://www.youtube.com/watch?v=AlwrM27x3As&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=16)

## 认领

如果您在创世块之前期间没有认领，那么您就可以在创世块后的任何时间认领。认领没有时间限制，因此任何时候您都可以这样做。

> Note: When you make a claim, you will also attest to the agreement that corresponds to your DOT allocation. The two actions "claim" and "attest" are done in a single transaction, but for the most part this is simplified from the perspective of the user.

### 您将需要什么

- 持有 DOT 代币的以太坊账户
- MyCrypto 钱包
- Polkadot 帐户

您应该已经拥有以太坊账户，该账户持有 Polkadot 的 DOT 代币。 您需要访问该帐户才能进行签名。

[ MyCrypto ][] 是款多功能钱包，可为您的以太坊账户提供多种存储方式。请点击链接转到其下载页面，并确保您下载了适用于您操作系统的最新版本。 这很重要，因为最新版本将有最新的安全补丁程序。

> **NOTICE**: It is much more secure to download and use the MyCrypto app locally. You can always find the most up-to-date releases of the desktop app on their [releases page][mycrypto].

You will need a Polkadot account to claim your DOT. Please follow the instructions on the \[account generation\]\[\] page for generating a new Polkadot account.

#### 使用 MyCrypto 认领您的 DOT

Polkadot JS [Claims app][]可帮助您从 MyCrypto 签名消息。 万一您持有 DOT 代币的以太坊帐户的密钥存储在 Ledger Nano S 或 Trezor 等冷钱包上，MyCrypto 是个不错的选择。它还支持私钥，助记词和 Parity signer。

Once you've downloaded MyCrypto and have it running locally (we recommend an air-gapped computer for maximum security), you can start by navigating to the Claims app on Polkadot-JS Apps. Select the account you would like to claim the DOT into and click the blue "Continue" button to proceed. Your screen should look something like this:

![claim-1](assets/new-claims/claim-1.png)

现在您将需要提供与您将认领 DOT 代币的以太坊地址。在框中输入以太坊地址，然后点击 "Continue"。

![claim-2](assets/new-claims/claim-2.png)

接下来，屏幕应如下图所示。

![claim-2-1](assets/new-claims/claim-2-1.png)

The hex-encoded string that follows the sentence: "Pay DOT to the Polkadot account:" is the hex-encoded public key of your Polkadot account, minus the `0x` prefix.

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

If this claim succeeded, then you will see a success message and your DOT will be in the account that you claimed to.

#### 确认您的认领

After you make an on-chain claim for DOT, your balance should be updated on the Polkadot UI immediately.

遇到麻烦? 在 DOT [Claims Support]()渠道寻求帮助。

![claim-10](assets/new-claims/claim-10.png)

Congratulations, you have now completed the process for claiming and signing for your DOT.

### 第三方认领程序

**We do not recommend using third-party apps or processes to perform your claim or acquire DOT.**

Claiming using a third-party process can lead to the loss of your allocation, therefore we cannot recommend using any third party apps to do so. Manually specifying your transaction data, as specified in our claims process, is the only way to be certain you will receive your allocation.

## 证明声明

If you've already made a pre-genesis claim, you still have to agree to a statement using your Polkadot account.

## Using Polkadot-JS Apps

### 您将需要什么

- 您的 Polkadot 帐户已在 Polkadot-JS Apps UI 上解锁。

You will be sending a free transaction from your Polkadot account on the Polkadot-JS Apps UI. Once you make this transaction you will have the tokens available in your account.

### 前往 Polkadot-JS 程序

Proceed to [polkadot-js Apps][claims app]. You will need to grant Apps access to your account in some way. One way would be to go to the Accounts page and "create" a new account, replacing the generated seed or mnemonic with the one belonging to your account. The other way is by using the Polkadot-JS extension and entering your seed or mnemonic there, which is generally safer than entering it directly to the Apps page.

### 提交证明

After entering your account, you should see a red counter appear on the "Claim Tokens" tab on the left navigation drawer.

![claim-attest-1](assets/new-claims/new-attest-1.png)

Click on the "Claim Tokens" tab and you will see a large notification at the top of the page that tells you that you need to sign an attestation.

![claim-attest-2](assets/new-claims/new-attest-2.png)

The notification will display one or more Polkadot addresses that you have loaded in Polkadot-JS that you need to sign. Select a Polkadot account with a claim using the drop down selection. If you don't see a notification or don't see the selector, please double check that the account has been loaded into Polkadot-JS and that it has already claimed during the preclaim period. As always, feel free to reach out for help in the [Claims Support]() channel.

Click "Continue" and you will see a green box appear on the right.

![claim-attest-3](assets/new-claims/new-attest-3.png)

![claim-attest-4](assets/new-claims/new-attest-4.png)

Click on "I Agree" and then "Sign and Submit" to make your free attest transaction. When the transaction is included in the block, you will see a green success box appear in the upper right corner and the DOT will be in your account.

![claim-attest-5](assets/new-claims/new-attest-5.png)

## Using Parity Signer

### What you will need

- Parity Signer
- Your Polkadot account linked to Polkadot-JS Apps UI

Before claiming, you should import your Polkadot address on Parity Signer to the PolkadotJS apps. All operations will use Parity Signer to sign the transaction, but will broadcast it via the PolkadotJS apps remote node. If you do not have a Polkadot address, please follow the instructions on the Parity Signer section in the [account generation][] page for generating a new Polkadot account.

### Go to Polkadot-JS Apps

Proceed to [polkadot-js Apps][claims app]. You will need to import your address on Parity Signer to the Accounts page first.

### Make the Attestation

![ps-claim-1](assets/new-claims/ps-claim-1.png)

Click "Add via Qr" on the right side.

![ps-claim-2](assets/new-claims/ps-claim-2.png)

Open Parity Signer and choose "Polkadot" network.

![ps-1](assets/new-claims/ps-01.jpg)

Select the address that you have claimed DOT to during pre-genesis.

![ps-2](assets/new-claims/ps-02.jpg)

![ps-3](assets/new-claims/ps-03.jpg)

Your address will be displayed in QR code format. You can move the QR code to the camera so that the PolkadotJS Apps can decode it.

![ps-claim-3](assets/new-claims/ps-claim-3.png)

Once decoded successfully, input the name for your address and click "Create".

![ps-claim-4](assets/new-claims/ps-claim-4.png)

You will notice that the digit beside the "Claim Tokens" menu changed to 2. It means the number of addresses on the Accounts page that need to do attestations.

Go to the [Claim Tokens](https://polkadot.js.org/apps/#/claims) page and and you will see a large notification at the top of the page that tells you that you need to sign an attestation.

Select the Polkadot account that you just have imported with a claim using the drop-down selection. If you don't see a notification or don't see the selector, please double check that the account has been loaded into Polkadot-JS and that it has already claimed during the pre-genesis period. As always, feel free to reach out for help in the [Claims Support]() channel.

![ps-claim-5](assets/new-claims/ps-claim-5.png)

Then click "Continue" and you will see a green box appear on the right.

![ps-claim-6](assets/new-claims/ps-claim-6.png)

Click on "I Agree" and then "Sign via Qr".

![ps-claim-7](assets/new-claims/ps-claim-7.png)

Now you need to sign the transaction using the Parity Signer with your Polkadot address.

![ps-claim-8](assets/new-claims/ps-claim-8.png)

First, you need to press the "QR Scanner" on the Parity Signer to scan the QR code that's shown on the authorize transaction window to generate the raw transaction. Next, you may be required to input the PIN on the Parity Signer to generate the signed transaction as a QR code. Then move the QR code to the camera on the PolkadotJS Apps to continue.

![ps-3r](assets/new-claims/ps-3r.jpg)

When the transaction is included in the block, you will see a green success box appear in the upper right corner and the DOT will be in your account.
  https://riot.im/app/#/room/!kwIkVteRpPRjjTyvTe:web3.foundation?via=web3.foundation&via=matrix.org&via=matrix.parity.io

[ MyCrypto ]: https://download.mycrypto.com/

[mycrypto]: https://download.mycrypto.com/
[account generation]: learn-account-generation
[Claims app]: https://polkadot.js.org/apps/#/claims
[claims app]: https://polkadot.js.org/apps/#/claims
