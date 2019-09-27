---
id: build-tools-subkey
title: Subkey
sidebar_label: Subkey
---

Subkey是Substrate中包含的命令行实用程序，用于生成或恢复Substrate密钥。

`subkey`默认使用[sr25519](learn-cryptography#keypairs-and-signing)加密。如果您需要使用较旧的ed25519加密技术来生成或恢复密钥，或生成供验证程序使用的会话密钥（session key），请将`--ed25519`标志传递给命令。

## 用法

### 生成一个随机帐户

```bash
subkey generate
```

将输出助记词并为您提供新帐户的种子，公钥和地址。不要与任何人分享你的助记词或种子，它会让他们获得你的资金。如果有人要给你转账，他们只需要你的**地址**。

请注意，助记词将允许您生成原始种子。建议使用助记词，因为不推荐使用原始种子供最终用户使用。助记词还为您提供校验和并减少拼写错误的可能性。

### 检查一个私钥

您可以检查给定的URI（助记词，种子，公钥或地址）并恢复公钥和地址。

```bash
echo <msg> | subkey sign <seed,mnemonic>

OUTPUT：
a69da4a6ccbf81dbbbfad235fa12cf8528c18012b991ae89214de8d20d29c1280576ced6eb38b7406d1b7e03231df6dd4a5257546ddad13259356e1c3adfb509
```

### 签名

​```bash subkey inspect 

```bash
echo <msg> | subkey verify <sig> <address>

OUTPUT:
Signature verifies correctly.
```

### 验证签名

```bash
subkey vanity 1337
```

### 使用虚荣地址生成器

OUTPUT: Public key (hex): 0x461edcf1ba99e43f50dec4bdeb3d1a2cf521ad7c3cd0eeee5cd3314e50fd424c Address (SS58): 5DeeNqcAcaHDSed2HYnqMDK7JHcvxZ5QUE9EKmjc5snvU6wF ​```

```bash
subkey vanity 1337
```