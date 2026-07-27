---
title: Parity Signer — How to Sign a Transaction
description: "A step-by-step guide on how to sign a Polkadot transaction in Parity Signer"
---

!!!info "Related Wiki page"
    For the underlying concepts, see [Polkadot Vault](../../general/polkadot-vault.md).

Signing a transaction is the final step of any transaction, like [sending funds out of your account](transfer-funds.md). A transaction will not be broadcasted to the blockchain until you sign it. You sign a transaction with your private key for your account, proving that you own this account. The signing process, however, depends on what wallet or account manager you use.

!!! info

    The Parity Signer app has been rebranded to **[Polkadot Vault](https://signer.parity.io/)**. If you want to sign a transaction from the Polkadot Vault app, visit the following article: "[Polkadot Vault: How to Sign a Transaction](vault-sign-transaction.md)"


### Signing a transaction with Parity Signer on Polkadot Developer Interface



When you [create](parity-signer-create-account.md) your accounts in Parity Signer, you need a UI to interact with your accounts and initiate transactions.

!!! warning "IMPORTANT"

    For most users, we strongly recommend adding Parity Signer accounts in the **[Polkadot Developer Signer](https://paritytech.github.io/polkadot-support/getting-started/basics/polkadot-developer-signer-where-to-download-it)**.

    Click [here](parity-signer-add-account.md) to see the instructions.

1. Initiate a transaction on the Polkadot Developer Interface and click "Sign via QR" or "Sign and Submit":

![](../../assets/how-to/65032426070.png)

2\. If you have added your Parity Signer account through the Polkadot Developer Signer, a new window will pop up and you will see a QR code. If you have added your Parity Signer account directly on the Polkadot Developer Interface, you will see a QR code on the left and a camera screen on the right.

![](../../assets/how-to/65032426106.png)

![](../../assets/how-to/65032429575.jpeg)

3\. Open your Parity Signer app, navigate to the Scan tab, and scan the QR code you see on your computer.

4. Now you can check the transaction details in Parity Signer before signing. Tap "Unlock key and sign" if the details are correct, or tap "Decline" to reject the transaction.

5\. In the Parity Signer app, a QR code for the signature will appear. If you have added your Parity Signer account through the extension, click the "Sign signature via camera" button. Show the QR code to the camera on your computer.

6\. Congratulations, you have signed a transaction! It will be included in the blockchain within a few seconds. You can now open any of the [block explorers](block-explorers.md) to view your transaction:

![](../../assets/how-to/65032426315.png)

* * *

### Cannot sign a transaction?

Sometimes it might happen that we cannot sign a transaction. Here are described some of the causes and possible solutions.

#### **Camera doesn't start**

If your camera doesn't start, please allow the Polkadot Developer Interface or the extension to use your camera. A pop-up should appear asking for your permission. For the extension, please click on the gear icon and open the extension in a new window first.

![](../../assets/how-to/65016125183.png)

If you denied access or accidentally closed the pop-up, click on the camera icon near your URL bar and allow camera access.

However, for the Polkadot Developer Signer to ask permission to use your camera, you first need to enable the option to allow camera access within the extension itself.

1\. Open the extension and click on the gear icon on the top right

2\. Check "Allow QR Camera Access". The first time you do this, you may need to click on "Open the extension in a new window" and do these steps from there.

![](../../assets/how-to/65016536264.png)

#### **Cannot scan a QR code**

Please make sure that the full QR code is visible to the camera. You may need to tilt your device a bit to avoid screen glares.

#### **My transaction failed**

Signing a transaction means that it will be included in the blockchain. However, it doesn't always mean it will be executed. You can check the result of your transaction on a block explorer. Sometimes a transaction cannot be executed, and it fails:

![](../../assets/how-to/65016106656.png)![](../../assets/how-to/65016106650.png)

Please check the article "[Why can't I Transfer Tokens?](why-cant-i-transfer-dot.md)" to help you understand why your transaction failed, fix the issue, and send the transaction again.

* * *
