---
id: build-extrinsic-format
title: Polkadot Extrinsic Format aka Transaction Format
sidebar_label: Polkadot Extrinsic Format aka Transaction Format
---

## 原格式

**原外部函数格**式可参考如下：

```
[ account-id (32-bytes), index (4-bytes), call (dynamic-length), signature on first three fields (64 bytes) ]
```

## 现格式

Polkadot外部函数格式是：

```
[ address (1/3/5/9/33-bytes, dependent on first byte), index (4-bytes), call (dynamic-length), signature on *original* fields (64 bytes) ]
```

*original*部分指的是原外部函数格式中的下面部分内容：

```
[ account-id (32-bytes), index (4-bytes), call (dynamic-length) ]
```

新地址类型的特定格式是5种子格式中的一种，第一个字节不同。

- `0xff, 32-byte account id`
- `0xfe, 8-byte account index`
- `0xfd, 4-byte account index`
- `0xfc, 2-byte account index`
- `[0xf0...0xfb] (invalid, reserved for future use)`
- `[0x00...0xef] 1-byte account index (less than 0xf0)`

帐户索引变量要小得多，但需要在状态下查找。若要避免索引更改帐户时的交易重播攻击，签名的时候不应以第一个字段作为索引，而应以第一个字段作为帐户ID。因此，一旦索引用于查找不同的ID，就会使以前的所有签名失效。

包括发送器字段在内，所有在旧格式中表示账户ID（32字节）的调用/提议（私下调用）字段的参数现在都是地址（1/3/5/9/33字节）。

## 来源

[Substrate #195](https://github.com/paritytech/substrate/pull/195)
