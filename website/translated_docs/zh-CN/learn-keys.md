---
id: learn-keys
title: Polkadot 密钥
sidebar_label: Polkadot 密钥
---

公钥和私钥是大多数密码系统的重要部分，也是使像 Polkadot 这样的区块链得以存在的重要组成部分。

## 账户密钥

帐户密钥是用来控制资金的密钥，它们可以是：

- 使用 Schnorr 签名的原版` ed25519 `实现。
- 使用 Schnorr 签名的 Schnorrkel / Ristretto ` sr25519 `。

对于简单签名，` ed25519 `和` sr25519 `之间的安全性没有区别。

我们希望在可预见将来，商用 HSM 将更好地支持` ed25519 `。

同时，` sr25519 `使实施更复杂的协议更加安全。 特别是` sr25519 `带有许多协议的安全版本，例如比特币和以太坊生态系统中常见的 HDKD。

### "Controller" 和 "Stash" 密钥

当我们说 "controller" 和 "stash" 密钥时，通常是在运行验证人或提名 DOT 的上下文中谈论，但是它们的概念对所有用户来说都是有用。这两个密钥都是帐户的类型。它们区别在于其预期用途，而不是根本的密码学差异。在上面部分提到的所有信息都适用于这些密钥。当创建新的 controller 或 stash 密钥时，所有密码学都是帐户密钥可用的选项。

Controller 是半在线密钥，用来直接控制用户和提交交易。对于验证人或提名人，这意味着将使用 controller 密钥来开始或停止验证或提名。 controller 密钥需要保留小量 DOTS 作支付交易费，但它并不应持有大量的 DOTs。加上由于使用它的频率相对高并且它保存在互联网上，所以应谨慎留意，并偶尔使用新的密钥代替。

Stash 密钥在大多数情况下是保存在冷钱包，写在纸上也可以受硬件安全保护。如果可以的话，它应该很少在互联网上或用于提交交易。 Stash 密钥用于存储大量资金，应该将它视为银行的储蓄帐户，只有在紧急情况下才使用该帐户。或者也许更恰当的隐喻是将其视为埋藏在某个岛屿上的藏宝，并且只有最初隐藏它的海盗才知道。

因为 stash 密钥是保储在线下，所以它必须拥有自己的资金绑定到指定的 controller。对于非支出操作，controller 拥有其背后 stash 的资金。例如在提名，抵押或投票，controller 可以指出其偏好 stash 的权重，它永远无法移动或拥有其 stash 的资金。但是如果有人获取了你的 controller 密钥，他们可以利用它做出会被惩罚的操作，所以你应小心保存并且时常更改它。

## Session 密钥

Session 密钥是热钥，验证人必须将其保持在线才能执行网络操作。 Session 密钥通常在客户端中生成，尽管不是必须。它们_不是_意在控制资金，仅应用于其预期目的。它们可以定期更改。 Controller 仅需要通过 session 公钥签名来创建证书，然后通过外部广播该证书。

Polkadot 使用四款 session 密钥:

- GRANDPA: ed25519
- BABE: sr25519
- I'm Online: sr25519
- Parachain: sr25519

BABE 需要适用于[可验证随机函数](learn-randomness#vrfs)以及数字签名的密钥。 Sr25519 密钥具有两种功能，并且可用于BABE。

因为 BLS 密钥允许更高效聚合签名，在将来我们计划在 GRANDPA 使用它。

## 常见问题

### 为什么在` secp256k1 `上选择了` ed25519 `？

为 Polkadot 和 Substrate 链实现的原有密钥导出密码学是` ed25519 `，这是在 Edward's 曲线 25519上实现的 Schnorr 签名算法(由于曲线方程的参数而命名)。

大部份加密货币包括比特币, 以太币现在是在 secp256k1 曲线上使用 ECDSA 签名。这曲线被认为比 NIST 曲线安全得多，因为 [NSA 可能有 NIST 曲线的后门](#appendix-a-on-the-security-of-curves)。 Curve25519 被认为可能比这_更安全_，并且可以更轻松地实现 Schnorr 签名。最近它的专利即将到期，使它成为在 Polkadot 使用的首选。

使用 Schnorr 签名而不是使用 ECDSA 的选择并非人们所预料的。正如 Jeff Burdges (Web3 研究员)所述，[论坛帖子](https://forum.web3.foundation/t/account-signatures-and-keys-in-polkadot/70/2):

> 我们在帐户密钥中选择 Schnorr 签名而不是 ECDSA 做了些牺牲: 两者都需要64字节，但是只有 ECDSA 签名才能传递其公钥。有些过时的 Schnorr 变体支持从签名中恢复公钥，但它们破坏了诸如分层确定性密钥导出之类重要的功能。因此 Schnorr 签名通常会为公钥占用额外的32个字节。

但最终使用 Schnorr 签名的好处大于权衡，将来优化可能会解决上述指出的低效率问题。

### 什么是 `sr25519` 并它是从何而来?

某些情况下: Twisted Edward's 曲线25519上的 Schnorr 签名被认为是安全，但是 Ed25519 并没有完全解决其错误。最值得注意的是，[ Monero 和所有其他CryptoNote 货币](https://www.getmonero.org/2017/05/17/disclosure-of-a-major-bug-in-cryptonote-based-currencies.html)很容易受到双花的利用，这有可能导致未被发现的无限通胀。

这些漏洞的源于是由于 Ed25519 中的特点，即其8的协因子。曲线的协因子是深奥的细节，这可能对更复杂协议的安全实现产生可怕的后果。

更方便的是，[ Mike Hamburg's Decaf 论文](https://www.shiftleft.org/paper/decaf/index.xhtml)提供了解决这个潜在错误的途径。 Decaf 基本上是种采用 Twisted Edward's 曲线的协因子和数学变化，以很少的成本性能和获得安全的方法。

[ Ristretto Group ](https://ristretto.group/)的 Decaf 论文中的方法得到延伸，并在Rust 中实現，以包含诸如 Curve25519 之类的协因子8曲线，并在  Edward's 曲线上做出 Schnorr 签名使它更安全。

Web3 基金会已在[ Schnorrkel ](https://github.com/w3f/schnorrkel)库中的Curve25519 上使用更安全的 Ristretto 压缩实现了 Schnorr 签名库。 Schnorrkel 在此曲线压缩的基础上实现了相关的协议，例如 HDKD，MuSig 和 VRF。它还包括各种较小的改进，例如哈希方案 STROBE，该方案理论上可以通过 Wasm 进行一次调用就可以处理大量数据。

在 Polkadot 中使用的 Schnorr 签名实现和通过 Curve25519 的 Ristretto 压缩 Schnorrkel 协议的实现称为** sr25519 **。

### BLS 签名是否在 Polkadot 使用?

还没有，但是会。 BLS 签名允许更高效的聚合签名。由于 GRANDPA 验证人通常对同一件事情(例如区块)进行签名，所以聚合它们可以使其它协议得到优化。

如 BLS 库所述，

> Boneh-Lynn-Shacham(BLS)签名速度慢，验证速度非常慢，需要慢和低安全性的友好曲线，并且可能造成危险的延展性。 但是 BLS 允许多种的聚合签名选项，这使 BLS 成为共识算法中投票和阈值签名的首选方案。

即使 Schnorr 签名允许进行聚合签名，但 BLS 签名在某方面还是更有效。因此它将是 session 密钥之一，供 Polkadot 网络上的验证人使用，并且对于 GRANDPA 最终确定性工具特别重要。

## 资源

- [Key discovery attack on BIP32-Ed25519](https://forum.web3.foundation/t/key-recovery-attack-on-bip32-ed25519/44) - Forum post detailing a potential attack on BIP32-Ed25519. A motivation for transition to the sr25519 variant.
- [Account signatures and keys in Polkadot](https://forum.web3.foundation/t/account-signatures-and-keys-in-polkadot/70) - Original forum post by Web3 researcher Jeff Burdges.
- [Are Schnorr signatures quantum computer resistant?](https://bitcoin.stackexchange.com/questions/57965/are-schnorr-signatures-quantum-computer-resistant/57977#57977)

## Appendix A: On the security of curves

From the [introduction of Curve25519](https://git.libssh.org/projects/libssh.git/tree/doc/curve25519-sha256@libssh.org.txt#n10) into `libssl`:

```
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
