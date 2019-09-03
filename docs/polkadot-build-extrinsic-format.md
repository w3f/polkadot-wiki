---
id: polkadot-build-extrinsic-format
title: Polkadot Extrinsic Format aka Transaction Format
sidebar_label: Polkadot Extrinsic Format aka Transaction Format
---

# Polkadot Extrinsic Format aka Transaction Format

## Old Format

For reference the **old** extrinsic format was:

```
[ account-id (32-bytes), index (4-bytes), call (dynamic-length), signature on first three fields (64 bytes) ]
```

## Current Format

The Polkadot extrinsic format is:

```
[ address (1/3/5/9/33-bytes, dependent on first byte), index (4-bytes), call (dynamic-length), signature on *original* fields (64 bytes) ]
```

The *original* fields refer to the following from the old extrinsic format:

```
[ account-id (32-bytes), index (4-bytes), call (dynamic-length) ]
```

The specific format for the new address type is one of 5 sub-formats, switched on the first byte:

- `0xff, 32-byte account id`
- `0xfe, 8-byte account index`
- `0xfd, 4-byte account index`
- `0xfc, 2-byte account index`
- `[0xf0...0xfb] (invalid, reserved for future use)`
- `[0x00...0xef] 1-byte account index (less than 0xf0)`

The account index variants are significantly smaller but require a lookup in the state. To avoid a transaction replay attack when an index changes its account, the signature is signed not with the first field as the index, but rather as the account id, thereby invalidating all previous signatures once the index is used to lookup a different id.

In addition to the sender field, any parameters to Call/Propose (PrivCall) fields that were AccountId (32-bytes) in the old format are now Address (1/3/5/9/33-bytes).

## Source

[Substrate #195](https://github.com/paritytech/substrate/pull/195)