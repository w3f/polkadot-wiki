---
id: build-node-interaction
title: Node Interaction
sidebar_label: Node Interaction
description: Tools for node interaction.
keywords: [RPC, api, integration]
slug: ../build-node-interaction
---

This page will guide you through some basic interactions with your node. This guide should _guide you to the proper tools,_ not be
seen as canonical reference. Always refer to the proper
documentation for the tool you are using:

- [Substrate RPC API](https://paritytech.github.io/substrate/master/sc_rpc_api/index.html)
- [Polkadot-JS RPC](https://polkadot.js.org/docs/substrate/rpc)
- [Substrate API Sidecar](https://github.com/paritytech/substrate-api-sidecar)

**Polkadot-JS RPC** is a JavaScript library for interacting with the **Substrate RPC API** endpoint, distributed as `@polkadot/api` Node.js package.  
**Substrate API Sidecar** is using the **Polkadot-JS RPC** to provide separately runnable REST services.

## Polkadot RPC

The Parity Polkadot client exposes HTTP and WS endpoints for RPC connections. The default ports are
9933 for HTTP and 9944 for WS.

To get a list of all RPC methods, the node has an RPC endpoint called `rpc_methods`.

For example:

```bash
$ curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}' http://localhost:9933/

{"jsonrpc":"2.0","result":{"methods":["account_nextIndex","author_hasKey","author_hasSessionKeys","author_insertKey","author_pendingExtrinsics","author_removeExtrinsic","author_rotateKeys","author_submitAndWatchExtrinsic","author_submitExtrinsic","author_unwatchExtrinsic","chain_getBlock","chain_getBlockHash","chain_getFinalisedHead","chain_getFinalizedHead","chain_getHead","chain_getHeader","chain_getRuntimeVersion","chain_subscribeAllHeads","chain_subscribeFinalisedHeads","chain_subscribeFinalizedHeads","chain_subscribeNewHead","chain_subscribeNewHeads","chain_subscribeRuntimeVersion","chain_unsubscribeAllHeads","chain_unsubscribeFinalisedHeads","chain_unsubscribeFinalizedHeads","chain_unsubscribeNewHead","chain_unsubscribeNewHeads","chain_unsubscribeRuntimeVersion","offchain_localStorageGet","offchain_localStorageSet","payment_queryInfo","state_call","state_callAt","state_getChildKeys","state_getChildStorage","state_getChildStorageHash","state_getChildStorageSize","state_getKeys","state_getKeysPaged","state_getKeysPagedAt","state_getMetadata","state_getPairs","state_getRuntimeVersion","state_getStorage","state_getStorageAt","state_getStorageHash","state_getStorageHashAt","state_getStorageSize","state_getStorageSizeAt","state_queryStorage","state_subscribeRuntimeVersion","state_subscribeStorage","state_unsubscribeRuntimeVersion","state_unsubscribeStorage","subscribe_newHead","system_accountNextIndex","system_addReservedPeer","system_chain","system_health","system_name","system_networkState","system_nodeRoles","system_peers","system_properties","system_removeReservedPeer","system_version","unsubscribe_newHead"],"version":1},"id":1}
```

Note that this call will show even those RPC methods which are disabled by a safety flag like
`--rpc-methods Safe`. This is
[being worked on](https://github.com/paritytech/substrate/issues/7024).

Add parameters in the call, for example get a block by its hash value:

```bash
$ curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getBlock", "params":["0x3fa6a530850324391fde50bdf0094bdc17ee17ec84aca389b4047ef54fea0037"]}' http://localhost:9933

{"jsonrpc":"2.0","result":{"block":{"extrinsics":["0x280402000b50055ee97001","0x1004140000"],"header":{"digest":{"logs":["0x06424142453402af000000937fbd0f00000000","0x054241424501011e38401b0aab22f4d72ebc95329c3798445786b92ca1ae69366aacb6e1584851f5fcdfcc0f518df121265c343059c62ab0a34e8e88fda8578810fbe508b6f583"]},"extrinsicsRoot":"0x0e354333c062892e774898e7ff5e23bf1cdd8314755fac15079e25c1a7765f06","number":"0x16c28c","parentHash":"0xe3bf2e8f0e901c292de24d07ebc412d67224ce52a3d1ffae76dc4bd78351e8ac","stateRoot":"0xd582f0dfeb6a7c73c47db735ae82d37fbeb5bada67ee8abcd43479df0f8fc8d8"}},"justification":null},"id":1}
```

Some return values may not appear meaningful at first glance. Polkadot uses
[SCALE encoding](https://docs.substrate.io/reference/scale-codec/) as a format that is
suitable for resource-constrained execution environments. You will need to decode the information
and use the chain [metadata](https://docs.substrate.io/reference/command-line-tools/subxt/#metadata)
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
[much more](https://paritytech.github.io/substrate-api-sidecar/dist/).

The client runs on an HTTP host. The following examples use python3, but you can query any way you
prefer at `http://HOST:PORT/`. The default is `http://127.0.0.1:8080`.

### Fetching a Block

Fetch a block using the `block/number` endpoint. To get the chain tip, omit the block number.

```python
import requests
import json

url = 'http://127.0.0.1:8080/blocks/7409038'
response = requests.get(url)
if response.ok:
	block_info = json.loads(response.text)
	print(block_info)
```

This returns a fully decoded block.

In the `balances.transfer` extrinsic, the `partialFee` item is the transaction fee. It is called
"partial fee" because the [total fee](build-protocol-info.md#fees) would include the `tip` field.
Notice that some extrinsics do not have a signature. These are
[inherents](build-protocol-info.md#extrinsics).

:::info Tracking transaction fees

When tracking transaction fees, the `extrinsics.paysFee` value is not sufficient for determining
if the extrinsic had a fee. This field only means that it would require a fee if submitted as a
transaction. In order to charge a fee, a transaction also needs to be signed. So in the following
example, the `timestamp.set` extrinsic does not pay a fee because it is an _inherent,_ put in the
block by the block author.

:::

```python
{
   "number":"7409038",
   "hash":"0x0e9610f3c89fac046ef83aa625ad414d5403031faa026b7ab2a918184e389968",
   "parentHash":"0xba308541eb207bc639f36d392706309a031c21622f883fb07411060389c5ffdd",
   "stateRoot":"0x4426383b64a944ad7222a4019aefd558c749da0c6920cfcdfd587741d54abbe2",
   "extrinsicsRoot":"0x74749e5f5aeb610bc23fd6d8d79fd8bbf5e4b6053f70ba94ea6b3cc271df4b3a",
   "authorId":"Fvvz6Ej1D5ZR5ZTK1vE1dCjBvkbxE1VncptEtmFaecXe4PF",
   "logs":[
      {
         "type":"PreRuntime",
         "index":"6",
         "value":[
            "BABE",
            "0x023a0200009c7d191000000000"
         ]
      },
      {
         "type":"Seal",
         "index":"5",
         "value":[
            "BABE",
            "0x2296a50fa4fea3a46a95ad5b1f09de76d22c6ed3dc6755718c976e2d14c63e4dd3c6257813d9bdc03bb180b1e20393f1558ae1204982e5c7570df393e11f908b"
         ]
      }
   ],
   "onInitialize":{
      "events":[

      ]
   },
   "extrinsics":[
      {
         "method":{
            "pallet":"timestamp",
            "method":"set"
         },
         "signature":null,
         "nonce":null,
         "args":{
            "now":"1620636072000"
         },
         "tip":null,
         "hash":"0x8b853f49b6543e4fcbc796ad3574ea5601d2869d80629e080e501da4cb7b74b4",
         "info":{

         },
         "events":[
            {
               "method":{
                  "pallet":"system",
                  "method":"ExtrinsicSuccess"
               },
               "data":[
                  {
                     "weight":"185253000",
                     "class":"Mandatory",
                     "paysFee":"Yes"
                  }
               ]
            }
         ],
         "success":true,
         "paysFee":false
      },
      {
         "method":{
            "pallet":"balances",
            "method":"transfer"
         },
         "signature":{
            "signature":"0x94b63112648e8e692f0076fa1ccab3a04510c269d1392c1df2560503865e144e3afd578f1e37e98063b64b98a77a89a9cdc8ade579dcac0984e78d90646a052001",
            "signer":{
               "id":"Gr5sBB1EgdmQ7FG3Ud2BdECWQTMDXNgGPfdHMMtDsmT4Dj3"
            }
         },
         "nonce":"12",
         "args":{
            "dest":{
               "id":"J6ksma2jVeHRcRoYPZBkJRzRbckys7oSmgvjKLrVbj1U8bE"
            },
            "value":"100000000"
         },
         "tip":"0",
         "hash":"0xfbc5e5de75d64abe5aa3ee9272a3112b3ce53710664f6f2b9416b2ffda8799c2",
         "info":{
            "weight":"201217000",
            "class":"Normal",
            "partialFee":"2583332634"
         },
         "events":[
            {
               "method":{
                  "pallet":"balances",
                  "method":"Transfer"
               },
               "data":[
                  "Gr5sBB1EgdmQ7FG3Ud2BdECWQTMDXNgGPfdHMMtDsmT4Dj3",
                  "J6ksma2jVeHRcRoYPZBkJRzRbckys7oSmgvjKLrVbj1U8bE",
                  "100000000"
               ]
            },
            {
               "method":{
                  "pallet":"balances",
                  "method":"Deposit"
               },
               "data":[
                  "Fvvz6Ej1D5ZR5ZTK1vE1dCjBvkbxE1VncptEtmFaecXe4PF",
                  "2583332634"
               ]
            },
            {
               "method":{
                  "pallet":"system",
                  "method":"ExtrinsicSuccess"
               },
               "data":[
                  {
                     "weight":"201217000",
                     "class":"Normal",
                     "paysFee":"Yes"
                  }
               ]
            }
         ],
         "success":true,
         "paysFee":true
      },
      {
         "method":{
            "pallet":"utility",
            "method":"batch"
         },
         "signature":{
            "signature":"0x8aa2fc3f0cff52533745679523705720cff42d0e7258b9797feed193deb0ca73474726e148af0a0b096d44c07f20e5292819ec92279cffb2897e95cc337e638e",
            "signer":{
               "id":"F4gmSZGiM9pMYPsKW7xnGktDr4zRmN2jqy5Ze678y9YWR7F"
            }
         },
         "nonce":"687",
         "args":{
            "calls":[
               {
                  "method":{
                     "pallet":"staking",
                     "method":"payoutStakers"
                  },
                  "args":{
                     "validator_stash":"Cfish3zJiFnTvR9jscCap7imeA9ep3cH1wZfcZwAp2gdZHo",
                     "era":"2229"
                  }
               },
               {
                  "method":{
                     "pallet":"staking",
                     "method":"payoutStakers"
                  },
                  "args":{
                     "validator_stash":"Cfish3zJiFnTvR9jscCap7imeA9ep3cH1wZfcZwAp2gdZHo",
                     "era":"2230"
                  }
               },
               {
                  "method":{
                     "pallet":"staking",
                     "method":"payoutStakers"
                  },
                  "args":{
                     "validator_stash":"Cfish3zJiFnTvR9jscCap7imeA9ep3cH1wZfcZwAp2gdZHo",
                     "era":"2231"
                  }
               },
               {
                  "method":{
                     "pallet":"staking",
                     "method":"payoutStakers"
                  },
                  "args":{
                     "validator_stash":"DifishR4auphofhzxsy2aupgYo4NaUECH7qgt71CgiB2o6P",
                     "era":"2231"
                  }
               },
               {
                  "method":{
                     "pallet":"staking",
                     "method":"payoutStakers"
                  },
                  "args":{
                     "validator_stash":"J1fishfH94nFZLNScHgC2HorWpFD2xdPxd96wtTCHLvKxfa",
                     "era":"2231"
                  }
               }
            ]
         },
         "tip":"0",
         "hash":"0x69171ec3f4e5e4dfd27f4d1c5b5dbc884932c5d9a078c84495bb7ab875c8785f",
         "info":{
            "weight":"629782467000",
            "class":"Normal",
            "partialFee":"5150837715"
         },
         "events":[
            {
               "method":{
                  "pallet":"staking",
                  "method":"Reward"
               },
               "data":[
                  "Cfish3zJiFnTvR9jscCap7imeA9ep3cH1wZfcZwAp2gdZHo",
                  "40730624074"
               ]
            },
            {
               "method":{
                  "pallet":"staking",
                  "method":"Reward"
               },
               "data":[
                  "FhLcXuFkTwyc3o9K82VBahpain1YHWyGeNMDTTyeDJKfm5b",
                  "4296071738"
               ]
            },
            {
               "method":{
                  "pallet":"staking",
                  "method":"Reward"
               },
               "data":[
                  "F1NyXFUayqmVMdjNK45hcaTCE3JiqdU83sEGhQ3HQXn2Rpq",
                  "1770904403"
               ]
            },

            // ...

            {
               "method":{
                  "pallet":"utility",
                  "method":"BatchCompleted"
               },
               "data":[

               ]
            },
            {
               "method":{
                  "pallet":"balances",
                  "method":"Deposit"
               },
               "data":[
                  "Fvvz6Ej1D5ZR5ZTK1vE1dCjBvkbxE1VncptEtmFaecXe4PF",
                  "5150837715"
               ]
            },
            {
               "method":{
                  "pallet":"system",
                  "method":"ExtrinsicSuccess"
               },
               "data":[
                  {
                     "weight":"629782467000",
                     "class":"Normal",
                     "paysFee":"Yes"
                  }
               ]
            }
         ],
         "success":true,
         "paysFee":true
      }
   ],
   "onFinalize":{
      "events":[

      ]
   },
   "finalized":true
}
```

:::info The JS number type is a 53 bit precision float

There is no guarantee that the numerical values in
the response will have a numerical type. Any numbers larger than `2**53-1` will have a string
type.

:::

### Submitting a Transaction

Submit a serialized transaction using the `transaction` endpoint with an HTTP POST request.

```python
import requests
import json

url = 'http://127.0.0.1:8080/transaction/'
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
