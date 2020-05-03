---
id: build-node-interaction
title: Node Interaction
sidebar_label: Node Interaction
---

This page will guide you through some basic interactions with your node. Always refer to the proper
documentation for the tool you are using. This guide should _guide you to the proper tools,_ not be
seen as canonical reference.

- [Substrate RPC API](https://substrate.dev/rustdocs/master/sc_rpc_api/index.html)
- [Polkadot JS RPC Documentation](https://polkadot.js.org/api/substrate/rpc.html)
- [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar)

## Polkadot RPC

The Parity Polkadot client exposes HTTP and WS endpoints for RPC connections. The default ports are
9933 for HTTP and 9944 for WS.

To get a list of all RPC methods, the node has an RPC endpoint called `rpc_methods`.

For example:

```bash
$ curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}' http://localhost:9933/

{"jsonrpc":"2.0","result":{"methods":["account_nextIndex","author_hasKey","author_hasSessionKeys","author_insertKey","author_pendingExtrinsics","author_removeExtrinsic","author_rotateKeys","author_submitAndWatchExtrinsic","author_submitExtrinsic","author_unwatchExtrinsic","chain_getBlock","chain_getBlockHash","chain_getFinalisedHead","chain_getFinalizedHead","chain_getHead","chain_getHeader","chain_getRuntimeVersion","chain_subscribeAllHeads","chain_subscribeFinalisedHeads","chain_subscribeFinalizedHeads","chain_subscribeNewHead","chain_subscribeNewHeads","chain_subscribeRuntimeVersion","chain_unsubscribeAllHeads","chain_unsubscribeFinalisedHeads","chain_unsubscribeFinalizedHeads","chain_unsubscribeNewHead","chain_unsubscribeNewHeads","chain_unsubscribeRuntimeVersion","offchain_localStorageGet","offchain_localStorageSet","payment_queryInfo","state_call","state_callAt","state_getChildKeys","state_getChildStorage","state_getChildStorageHash","state_getChildStorageSize","state_getKeys","state_getKeysPaged","state_getKeysPagedAt","state_getMetadata","state_getPairs","state_getRuntimeVersion","state_getStorage","state_getStorageAt","state_getStorageHash","state_getStorageHashAt","state_getStorageSize","state_getStorageSizeAt","state_queryStorage","state_subscribeRuntimeVersion","state_subscribeStorage","state_unsubscribeRuntimeVersion","state_unsubscribeStorage","subscribe_newHead","system_accountNextIndex","system_addReservedPeer","system_chain","system_health","system_name","system_networkState","system_nodeRoles","system_peers","system_properties","system_removeReservedPeer","system_version","unsubscribe_newHead"],"version":1},"id":1}
```

Add parameters in the call, for example get a block by its hash value:

```bash
$ curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getBlock", "params":["0x3fa6a530850324391fde50bdf0094bdc17ee17ec84aca389b4047ef54fea0037"]}' http://localhost:9933

{"jsonrpc":"2.0","result":{"block":{"extrinsics":["0x280402000b50055ee97001","0x1004140000"],"header":{"digest":{"logs":["0x06424142453402af000000937fbd0f00000000","0x054241424501011e38401b0aab22f4d72ebc95329c3798445786b92ca1ae69366aacb6e1584851f5fcdfcc0f518df121265c343059c62ab0a34e8e88fda8578810fbe508b6f583"]},"extrinsicsRoot":"0x0e354333c062892e774898e7ff5e23bf1cdd8314755fac15079e25c1a7765f06","number":"0x16c28c","parentHash":"0xe3bf2e8f0e901c292de24d07ebc412d67224ce52a3d1ffae76dc4bd78351e8ac","stateRoot":"0xd582f0dfeb6a7c73c47db735ae82d37fbeb5bada67ee8abcd43479df0f8fc8d8"}},"justification":null},"id":1}
```

Some return values may not appear meaningful at first glance. Polkadot uses
[SCALE encoding](https://www.substrate.io/kb/advanced/codec) as a format that is
suitable for resource-constrained execution environments. You will need to decode the information
and use the chain
[metadata](https://www.substrate.io/kb/runtime/metadata)
(`state_getMetadata`) to obtain human-readable information.

### Tracking the Chain Head

Use the RPC endpoint `chain_subscribeFinalizedHeads` to subscribe to a stream of hashes of
finalized headers, or `chain_FinalizedHeads` to fetch the latest hash of the finalized header. Use
`chain_getBlock` to get the block associated with a given hash. `chain_getBlock` only accepts block
hashes, so if you need to query intermediate blocks, use `chain_getBlockHash` to get the block hash
from a block number.

## Substrate API Sidecar

Parity maintains an RPC client, written in TypeScript, that exposes a limited set of endpoints. It
handles the metadata and codec logic so that you are always dealing with decoded information. It
also aggregates information that an infrastructure business may need for accounting and auditing,
e.g. transaction fees.

The sidecar can fetch blocks, get the balance of an address atomically (i.e., with a corresponding
block number), get the chain's metadata, and submit transactions to a node's transaction queue. If
you have any feature/endpoint requests, log an issue in the
[repo](https://github.com/paritytech/substrate-api-sidecar).

The client runs on an HTTP host. The following examples use python3, but you can query any way you
prefer at `http://HOST:PORT/`. The default is `http://127.0.0.1:8080`.

### Fetching a Block

Fetch a block using the `block/number` endpoint. To get the chain tip, omit the block number.

```python
import requests
import json

url = 'http://127.0.0.1:8080/block/1432511'
response = requests.get(url)
if response.ok:
	block_info = json.loads(response.text)
	print(block_info)
```

This returns a fully decoded block. In the `balances.transfer` extrinsic, the `partialFee` item is
the transaction fee. It is called "partial fee" because the [total fee](build-protocol-info#fees)
would include the `tip` field. Notice that some extrinsics do not have a signature. These are
[inherents](build-protocol-info#extrinsics).

```python
{'number': 1432511,
 'hash': '0xd0807525ff44b9fe1185d88568d22bf405e5510c96f0f3e4c2168deacba8cd32',
 'parentHash': '0x668aab2ed0df7bf530f4af6a0e732f525ef648520650da981d349a3c5a56dacb',
 'stateRoot': '0x5a37e58467f65dc333cb21c8784f2b5891173b163322ac552d73c383355f436d',
 'extrinsicsRoot': '0x59e92902c90aeeec87cfdd076220b38f9ab77cc98a15456c7bbfb0de883be711',
 'logs': [{'type': 'PreRuntime',
   'index': 6,
   'value': [1161969986,
    '0x011b000000ee95bc0f0000000082cfa4b35d0e36fd7a7091ce5aba20fce7b257abea6a7a3f27a04c865810ca1aacb0f813db546170709f7eb6e12f110f8ac022c08e7117c30c3aff79c179cf03bafe4fe4c4de1330128b48d256050cf0a31665e4791d947276abe8f2c027210a']},
  {'type': 'Seal',
   'index': 5,
   'value': [1161969986,
    '0x14645b478c91e081e0d0fb23c69bf19b367c418f95111a92edbd6791ab0a9907bde61d2330f97100bf9e2316f7a21d4d62d37878c54ae6d3c870a2844ada5087']}],
 'extrinsics': [{'method': 'timestamp.set',
   'signature': None,
   'nonce': 0,
   'args': [1584104340000],
   'tip': 0,
   'hash': '0xb4a40086f7203b82a69e4ff10c839c2e23ade50c8d0d1ab7521a619d773e426e',
   'info': {},
   'events': [{'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': 10000, 'class': 'Operational', 'paysFee': True}]}],
   'success': True},
  {'method': 'finalityTracker.finalHint',
   'signature': None,
   'nonce': 0,
   'args': [1432508],
   'tip': 0,
   'hash': '0x4d3925dbb29f5938de2682d11809feb708051bc748141e70e713fe9db7950c95',
   'info': {},
   'events': [{'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': 10000, 'class': 'Normal', 'paysFee': True}]}],
   'success': True},
  {'method': 'parachains.setHeads',
   'signature': None,
   'nonce': 0,
   'args': [[]],
   'tip': 0,
   'hash': '0xcf52705d1ade64fc0b05859ac28358c0770a217dd76b75e586ae848c56ae810d',
   'info': {},
   'events': [{'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': 1000000, 'class': 'Normal', 'paysFee': True}]}],
   'success': True},
  {'method': 'balances.transfer',
   'signature': {'signature': '0xd6d0ec4828bbe08efce3f400ef61b5fc9b4c7c6381776fb2a4dfd2b8b40193857161d2ac0ac451357f4682fb3ddff38d6850fe9a282a25119f20ad4dc6ba0b0f',
    'signer': 'Fy2KSMaRjkpxpJ7UFhCiWqXrFuKdRfurtEn24hYJNr5oJLb'},
   'nonce': 0,
   'args': ['G9njmrCmZKBnojVue8umYiVLGF8W7eJJWTkUZwWktmQxEFo', 90000000000],
   'tip': 0,
   'hash': '0x7cb3ac653e0c17131bf4d952dbe0db28f88faa1e112b193236684d67d76dc4c1',
   'info': {'weight': 1000000, 'class': 'Normal', 'partialFee': 10000000000},
   'events': [{'method': 'treasury.Deposit', 'data': [8000000000]},
    {'method': 'balances.Deposit',
     'data': ['FXCgfz7AzQA1fNaUqubSgXxGh77sjWVVkypgueWLmAcwv79', 2000000000]},
    {'method': 'system.KilledAccount',
     'data': ['Fy2KSMaRjkpxpJ7UFhCiWqXrFuKdRfurtEn24hYJNr5oJLb']},
    {'method': 'balances.Transfer',
     'data': ['Fy2KSMaRjkpxpJ7UFhCiWqXrFuKdRfurtEn24hYJNr5oJLb',
      'G9njmrCmZKBnojVue8umYiVLGF8W7eJJWTkUZwWktmQxEFo',
      90000000000]},
    {'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': 1000000, 'class': 'Normal', 'paysFee': True}]}],
   'success': True}]}
```

> The JS number type is a 53 bit precision float. There is no guarantee that the numerical values in
the response will have a numerical type. Any numbers larger than `2**53-1` will have a string type.

### Submitting a Transaction

Submit a serialized transaction using the `tx` endpoint with an HTTP POST request.

```python
import requests
import json

url = 'http://127.0.0.1:8080/tx/'
tx_headers = {'Content-type' : 'application/json', 'Accept' : 'text/plain'}
response = requests.post(
	url,
	data='{"tx": "0xed0...000"}', # A serialized tx.
	headers=tx_headers
)
tx_response = json.loads(response.text)
```

If successful, this endpoint returns a JSON with the transaction hash. In case of error, it will
return an error report, e.g.:

```
{
    "error": "Failed to parse a tx" | "Failed to submit a tx",
    "cause": "Upstream error description"
}
```
