---
id: learn-keys
title: Polkadot 密钥
sidebar_label: Polkadot 密钥
---

公钥和私钥是大多数密码系统的重要部分，也是使像 Polkadot 这样的区块链得以存在的重要组成部分。

## 账户密钥

帐户密钥是用来控制资金的密钥，它们可以是：

- 使用 Schnorr 签名的原版`ed25519`实现。
- 使用 Schnorr 签名的 Schnorrkel / Ristretto `sr25519`。
- ECDSA signatures on secp256k1

对于简单签名，`ed25519`和`sr25519`之间的安全性没有区别。

我们希望在可预见将来，商用 HSM 将更好地支持`ed25519`。

同时，`sr25519`使实施更复杂的协议更加安全。 特别是`sr25519`带有许多协议的安全版本，例如比特币和以太坊生态系统中常见的 HDKD。

### "Controller" 和 "Stash" 密钥

When we talk about "controller" and "stash" keys, we usually talk about them in the context of running a validator or nominating DOT, but they are useful concepts for all users to know. Both keys are types of account keys. They are distinguished by their intended use, not by an underlying cryptographic difference. All the info mentioned in the parent section applies to these keys. When creating new controller or stash keys, all cryptography supported by account keys are an available option.

The controller key is a semi-online key that will be in the direct control of a user, and used to submit manual extrinsics. For validators or nominators, this means that the controller key will be used to start or stop validating or nominating. Controller keys should hold some DOT to pay for fees, but they should not be used to hold huge amounts or life savings. Since they will be exposed to the internet with relative frequency, they should be treated carefully and occasionally replaced with new ones.

Stash 密钥在大多数情况下是保存在冷钱包，写在纸上也可以受硬件安全保护。如果可以的话，它应该很少在互联网上或用于提交交易。 Stash 密钥用于存储大量资金，应该将它视为银行的储蓄帐户，只有在紧急情况下才使用该帐户。或者也许更恰当的隐喻是将其视为埋藏在某个岛屿上的藏宝，并且只有最初隐藏它的海盗才知道。

因为 stash 密钥是保储在线下，所以它必须拥有自己的资金绑定到指定的 controller。对于非支出操作，controller 拥有其背后 stash 的资金。例如在提名，抵押或投票，controller 可以指出其偏好 stash 的权重，它永远无法移动或拥有其 stash 的资金。但是如果有人获取了你的 controller 密钥，他们可以利用它做出会被惩罚的操作，所以你应小心保存并且时常更改它。

## Session 密钥

Session 密钥是热钥，验证人必须将其保持在线才能执行网络操作。 Session 密钥通常在客户端中生成，尽管不是必须。它们*不是*意在控制资金，仅应用于其预期目的。它们可以定期更改。 Controller 仅需要通过 session 公钥签名来创建证书，然后通过外部广播该证书。

Polkadot 使用四款 session 密钥:

- GRANDPA: ed25519
- BABE: sr25519
- I'm Online: sr25519
- Parachain: sr25519

BABE 需要适用于[可验证随机函数 (VRF)](learn-randomness#vrfs)以及数字签名的密钥。 Sr25519 密钥具有两种功能，并且可用于 BABE。

因为 BLS 密钥允许更高效聚合签名，在将来我们计划在 GRANDPA 使用它。

## 常见问题

### 为什么在`secp256k1`上选择了`ed25519`？

为 Polkadot 和 Substrate 链实现的原有密钥导出密码学是`ed25519`，这是在 Edward's 曲线 25519 上实现的 Schnorr 签名算法(由于曲线方程的参数而命名)。

大部份加密货币包括比特币, 以太币现在是在 secp256k1 曲线上使用 ECDSA 签名。这曲线被认为比 NIST 曲线安全得多，因为 [NSA 可能有 NIST 曲线的后门](#appendix-a-on-the-security-of-curves)。Curve25519 被认为可能比这*更安全*，并且可以更轻松地实现 Schnorr 签名。最近它的专利即将到期，使它成为在 Polkadot 使用的首选。

使用 Schnorr 签名而不是使用 ECDSA 的选择并非人们所预料的。正如 Jeff Burdges (Web3 研究员)所述，[论坛帖子](https://forum.web3.foundation/t/account-signatures-and-keys-in-polkadot/70/2):

> 我们在帐户密钥中选择 Schnorr 签名而不是 ECDSA 做了些牺牲: 两者都需要 64 字节，但是只有 ECDSA 签名才能传递其公钥。有些过时的 Schnorr 变体支持从签名中恢复公钥，但它们破坏了诸如分层确定性密钥导出之类重要的功能。因此 Schnorr 签名通常会为公钥占用额外的 32 个字节。

但最终使用 Schnorr 签名的好处大于权衡，将来优化可能会解决上述指出的低效率问题。

### 什么是 `sr25519` 并它是从何而来?

某些情况下: Twisted Edward's 曲线 25519 上的 Schnorr 签名被认为是安全，但是 Ed25519 并没有完全解决其错误。最值得注意的是，[ Monero 和所有其他 CryptoNote 货币](https://www.getmonero.org/2017/05/17/disclosure-of-a-major-bug-in-cryptonote-based-currencies.html)很容易受到双花的利用，这有可能导致未的无限通胀。

这些漏洞的源于是由于 Ed25519 中的特点，即其 8 的协因子。曲线的协因子是深奥的细节，这可能对更复杂协议的安全实现产生可怕的后果。

更方便的是，[ Mike Hamburg's Decaf 论文](https://www.shiftleft.org/paper/decaf/index.xhtml)提供了解决这个潜在错误的途径。 Decaf 基本上是种采用 Twisted Edward's 曲线的协因子和数学变化，以很少的成本性能和获得安全的方法。

[ Ristretto Group ](https://ristretto.group/)的 Decaf 论文中的方法得到延伸，并在 Rust 中实現，以包含诸如 Curve25519 之类的协因子 8 曲线，并在 Edward's 曲线上做出 Schnorr 签名使它更安全。

Web3 基金会已在[ Schnorrkel ](https://github.com/w3f/schnorrkel)库中的 Curve25519 上使用更安全的 Ristretto 压缩实现了 Schnorr 签名库。 Schnorrkel 在此曲线压缩的基础上实现了相关的协议，例如 HDKD，MuSig 和 VRF。它还包括各种较小的改进，例如哈希方案 STROBE，该方案理论上可以通过 Wasm 进行一次调用就可以处理大量数据。

在 Polkadot 中使用的 Schnorr 签名实现和通过 Curve25519 的 Ristretto 压缩 Schnorrkel 协议的实现称为** sr25519 **。

### BLS 签名是否在 Polkadot 使用?

还没有，但是会。 BLS 签名允许更高效的聚合签名。由于 GRANDPA 验证人通常对同一件事情(例如区块)进行签名，所以聚合它们可以使其它协议得到优化。

如 BLS 库所述，

> Boneh-Lynn-Shacham(BLS)签名速度慢，验证速度非常慢，需要慢和低安全性的友好曲线，并且可能造成危险的延展性。 但是 BLS 允许多种的聚合签名选项，这使 BLS 成为共识算法中投票和阈值签名的首选方案。

即使 Schnorr 签名允许进行聚合签名，但 BLS 签名在某方面还是更有效。因此它将是 session 密钥之一，供 Polkadot 网络上的验证人使用，并且对于 GRANDPA 最终确定性工具特别重要。

## 资源

- [对 BIP32-Ed25519](https://forum.web3.foundation/t/key-recovery-attack-on-bip32-ed25519/44) - 论坛帖子详细描述了对 BIP32-Ed25519 的潜在攻击。 向 sr25519 变量过渡的动机。
- [在 Polkadot 中的账户签名和密钥](https://forum.web3.foundation/t/account-signatures-and-keys-in-polkadot/70) - Web3 研究人员 Jeff Burdges 的帖子。
- [Schnorr 签名有抗量子计算吗?](https://bitcoin.stackexchange.com/questions/57965/are-schnorr-signatures-quantum-computer-resistant/57977#57977)

## 附录 A: 曲线安全

From the [introduction of Curve25519](https://git.libssh.org/projects/libssh.git/tree/doc/curve25519-sha256@libssh.org.txt#n10) into `libssl`:

```text
The reason is the following: During summer of 2013, revelations from ex-
consultant at [the] NSA Edward Snowden gave proof that [the] NSA willingly inserts backdoors
into software, hardware components and published standards. While it is still
believed that the mathematics behind ECC (Elliptic-curve cryptography) are still sound and solid,
some people (including Bruce Schneier [SCHNEIER]), showed their lack of confidence
in NIST-published curves such as nistp256, nistp384, nistp521, for which constant
parameters (including the generator point) are defined without explanation. It
is also believed that [the] NSA had a word to say in their definition. These curves
are not the most secure or fastest possible for their key sizes [DJB], and
researchers think it is possible that NSA have ways of cracking NIST curves.
It is also interesting to note that SSH belongs to the list of protocols the NSA
claims to be able to eavesdrop. Having a secure replacement would make passive
attacks much harder if such a backdoor exists.

However an alternative exists in the form of Curve25519. This algorithm has been
proposed in 2006 by DJB [Curve25519]. Its main strengths are its speed, its
constant-time run time (and resistance against side-channel attacks), and its
lack of nebulous hard-coded constants.
```
