---
id: build-node-interaction
title: Node Interaction
sidebar_label: Node Interaction
---

This page will guide you through some basic interactions with your node. Always refer to the proper
documentation for the tool you are using. This guide should _guide you to the proper tools,_ not be
seen as canonical reference.

- [Substrate RPC API](https://substrate.dev/rustdocs/v2.0.1/sc_rpc_api/index.html)
- [Polkadot-JS RPC Documentation](https://polkadot.js.org/api/substrate/rpc.html)
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
[SCALE encoding](https://substrate.dev/docs/en/knowledgebase/advanced/codec) as a format that is
suitable for resource-constrained execution environments. You will need to decode the information
and use the chain [metadata](https://substrate.dev/docs/en/knowledgebase/runtime/metadata)
(`state_getMetadata`) to obtain human-readable information.

### Tracking the Chain Head

Use the RPC endpoint `chain_subscribeFinalizedHeads` to subscribe to a stream of hashes of finalized
headers, or `chain_FinalizedHeads` to fetch the latest hash of the finalized header. Use
`chain_getBlock` to get the block associated with a given hash. `chain_getBlock` only accepts block
hashes, so if you need to query intermediate blocks, use `chain_getBlockHash` to get the block hash
from a block number.

## Substrate API Sidecar

Parity maintains an RPC client, written in TypeScript, that exposes a limited set of endpoints. It
handles the metadata and codec logic so that you are always dealing with decoded information. It
also aggregates information that an infrastructure business may need for accounting and auditing,
e.g. transaction fees.

The sidecar can fetch blocks, get the balance of an address atomically (i.e., with a corresponding
block number), get the chain's metadata, get a transaction fee prediction, calculate outstanding
staking rewards for an address, submit transactions to a node's transaction queue, and
[much more](https://github.com/paritytech/substrate-api-sidecar#available-paths).

The client runs on an HTTP host. The following examples use python3, but you can query any way you
prefer at `http://HOST:PORT/`. The default is `http://127.0.0.1:8080`.

> Note: The Sidecar team is in the process of releasing v1.0.0. As such, there are many breaking
> changes and new features on the way. Please refer to the
> [repo](https://github.com/paritytech/substrate-api-sidecar) for the latest documentation.

### Fetching a Block

Fetch a block using the `block/number` endpoint. To get the chain tip, omit the block number.

```python
import requests
import json

url = 'http://127.0.0.1:8080/block/2077200'
response = requests.get(url)
if response.ok:
	block_info = json.loads(response.text)
	print(block_info)
```

This returns a fully decoded block. In the `balances.transfer` extrinsic, the `partialFee` item is
the transaction fee. It is called "partial fee" because the [total fee](build-protocol-info#fees)
would include the `tip` field. Notice that some extrinsics do not have a signature. These are
[inherents](build-protocol-info#extrinsics).

> When tracking transaction fees, the `extrinsics.paysFee` value is not sufficient for determining
> if the extrinsic had a fee. This field only means that it would require a fee if submitted as a
> transaction. In order to charge a fee, a transaction also needs to be signed. So in the following
> example, the `timestamp.set` extrinsic does not pay a fee because it is an _inherent,_ put in the
> block by the block author.

```python
{'number': '1419394',
 'hash': '0xaa4ebb82c0fe2a0afddb02872f6fd72cc9b68de1990e54d351d8152da040681e',
 'parentHash': '0x9022a1fe7192366553c0caa3e1d0d9f7d9fd2eab601ea4a26e49ba66375fb735',
 'stateRoot': '0x6b4c0b81bc86e3104ea15b38e457e9f2d2395d997a8737a7072c2c1b2aa057ce',
 'extrinsicsRoot': '0x9a66295996ccfab5b71924f1816a68854bfa4bae92e196770235b8c5ebf67f8a',
 'authorId': '15V6NjwmKkZihe644Tyr8GVLxjEzBAHktf6ZcJCTx7RPCoYS',
 'logs': [{'type': 'PreRuntime',
   'index': '6',
   'value': ['BABE',
    '0x03a0000000be9ce20f000000001815f7649023d7af85be14fe902084fec2bf2bc10175b6c49f5fd37556b58f7b128e4c1de5d4b6df0ef5bcd817b8c2337a381b9e15bdb3b9a831a1308cf797091484ae9f861b7978852164dd018b4dddd6ef7e438a8d2d9b5644567ebec9700d']},
  {'type': 'Seal',
   'index': '5',
   'value': ['BABE',
    '0x5809634ab178c8484724b19f07035510dd6e6457bfa0423ba74887d67bc4b135713d926a93d62e76950f31750aabd57f93065b6fad273fb77e84b3185645a58d']}],
 'onInitialize': {'events': []},
 'extrinsics': [{'method': 'timestamp.set',
   'signature': None,
   'nonce': '0',
   'args': {'now': '1599057012000'},
   'tip': '0',
   'hash': '0x830017ff2f8971d488ae4d35c851c389ce74271c4c1daf8aea70baffda018a0b',
   'info': {},
   'events': [{'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': '158000000',
       'class': 'Mandatory',
       'paysFee': 'Yes'}]}],
   'success': True,
   'paysFee': True},
  {'method': 'parachains.setHeads',
   'signature': None,
   'nonce': '0',
   'args': {'heads': []},
   'tip': '0',
   'hash': '0xcf52705d1ade64fc0b05859ac28358c0770a217dd76b75e586ae848c56ae810d',
   'info': {},
   'events': [{'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': '1000000000',
       'class': 'Mandatory',
       'paysFee': 'Yes'}]}],
   'success': True,
   'paysFee': True},
  {'method': 'staking.bondExtra',
   'signature': {'signature': '0x92b50d7d4317503971f5f670a88adfe1e8e3e5aa4ba62c1d8792590abfd4805dad8ac8d442af8610236af7c3c48269d9487584486dca684dd6b89aed4c7f3d83',
    'signer': '15x3TLV67TVAde2pcuQsNCs8KNWGG769UvzjfNtzex9mL6Ld'},
   'nonce': '2',
   'args': {'max_additional': '1000000000000'},
   'tip': '0',
   'hash': '0xab2b0a862a7d4c18a1f7294d2db181af3a7fe00bde70de88b61cefe4f9f74012',
   'info': {'weight': '355000000',
    'class': 'Normal',
    'partialFee': '122000000'},
   'events': [{'method': 'staking.Bonded',
     'data': ['15x3TLV67TVAde2pcuQsNCs8KNWGG769UvzjfNtzex9mL6Ld',
      '1000000000000']},
    {'method': 'treasury.Deposit', 'data': ['97600000']},
    {'method': 'balances.Deposit',
     'data': ['15V6NjwmKkZihe644Tyr8GVLxjEzBAHktf6ZcJCTx7RPCoYS', '24400000']},
    {'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': '355000000', 'class': 'Normal', 'paysFee': 'Yes'}]}],
   'success': True,
   'paysFee': True},
  {'method': 'balances.transfer',
   'signature': {'signature': '0x5c63107916871286a946c8d06052a0ac7c50c6a052c5a9dee87f26dce3dac64a18f24cf07a4de69dc56733ad9e0a2aa5b95a11428203ed32603c22544369d902',
    'signer': '1JVrK16XZm9vyZjHoYVPjtZ35LvTQ4oyufMoUFTFpAUhath'},
   'nonce': '3017',
   'args': {'dest': '12YFp3fPi73U3pwRqK9Hwa1iVhaGSTq3e3XaTbM5UfuP1LpX',
    'value': '18539953920000'},
   'tip': '0',
   'hash': '0x0e7692706202dad75c2a468aff6bf78b88d505ef7031b82b6e9d5220817f082b',
   'info': {'weight': '195000000',
    'class': 'Normal',
    'partialFee': '156000000'},
   'events': [{'method': 'balances.Transfer',
     'data': ['1JVrK16XZm9vyZjHoYVPjtZ35LvTQ4oyufMoUFTFpAUhath',
      '12YFp3fPi73U3pwRqK9Hwa1iVhaGSTq3e3XaTbM5UfuP1LpX',
      '18539953920000']},
    {'method': 'treasury.Deposit', 'data': ['124800000']},
    {'method': 'balances.Deposit',
     'data': ['15V6NjwmKkZihe644Tyr8GVLxjEzBAHktf6ZcJCTx7RPCoYS', '31200000']},
    {'method': 'system.ExtrinsicSuccess',
     'data': [{'weight': '195000000', 'class': 'Normal', 'paysFee': 'Yes'}]}],
   'success': True,
   'paysFee': True}],
 'onFinalize': {'events': []}}
```

> The JS number type is a 53 bit precision float. There is no guarantee that the numerical values in
> the response will have a numerical type. Any numbers larger than `2**53-1` will have a string
> type.

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
