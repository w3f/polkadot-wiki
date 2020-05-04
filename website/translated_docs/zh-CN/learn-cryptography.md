---
id: learn-cryptography
title: 密码学解释
sidebar_label: 密码学解释
---

这是 Polkadot 中使用密码学技术的高级概述。假设你已了解在区块链中常用的密码学术语例如哈希，椭圆曲线密码学（ECC）和公私密钥对。

有关所用密码学的详细说明，请参阅我们[研究团队的维基](https://research.web3.foundation)。

## 哈希算法

在 Polkadot 使用的哈希算法是  [Blake2b](https://en.wikipedia.org/wiki/BLAKE_(hash_function)#BLAKE2)。 Blake2 被认为是一个非常快的加密哈希函数，也用在 [Zcash](https://z.cash) 加密货币。

## 密钥对和签名

Polkadot 使用 Schnorrkel/Ristretto x25519 ("sr25519") 作为导出密钥和签名算法。

Sr25519 基于 [Curve25519](https://en.wikipedia.org/wiki/Curve25519) 相同的底層作為 EdDSA 的哥哥  [Ed25519](https://en.wikipedia.org/wiki/EdDSA#Ed25519) ，但是它使用 Schnorr 簽名而不是 EdDSA 方案。与 ECDSA / EdDSA 方案相比，Schnorr 签名带来了一些明显好处，一方面效率更高，但仍保留相同的功能和安全性假设。另外它允许通过簽名集合方式进行原生多重签名。

Schnorrkel 和 Ristretto 名称来自实现该方案的两个 Rust 库，分别为[ Schnorrkel ](https://github.com/w3f/schnorrkel)库用于 Schnorr 签名和 [Ristretto](https://ristretto.group/ristretto.html) 库，使可以用诸如 Curve25519 之类的 cofactor-8 曲线。
