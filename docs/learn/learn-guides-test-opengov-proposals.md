---
title: Polkadot-JS OpenGov Referenda Testing Guides
description: Learn how to test Polkadot OpenGov referenda using Chopsticks to ensure successful execution before submission.
---

!!!warning "Advanced Guide"
    This guide is intended for advanced users who are familiar with command-line tools, JavaScript, and blockchain development workflows. It requires running local instances of networks using Chopsticks and understanding block production and scheduling mechanisms.

!!!info "Prerequisites"
    Before proceeding, ensure you have **Node.js and npm** installed on your machine. Chopsticks will be run using `npx`, which does not require a separate installation.

A Polkadot OpenGov referendum always contains a call that will be executed after the referendum is
voted in successfully. The referendum proposer is responsible for checking if the call gets executed
successfully on-chain and whether an appropriate origin and track have been chosen. In the case of
referenda that send a cross-chain call to the system chains, it is important to check whether the
XCM call gets dispatched successfully from Asset Hub and is received/executed as expected on the
system chain.

This tutorial aims to show how to test the calls to be submitted with the referendum and ensure they
work as expected. Let us consider the two examples below:

- Submitting a Treasury referendum that requests 4500 DOT
- Submitting a referendum to remove ambassadors
  ([Referendum 1247](https://polkadot.subsquare.io/referenda/1247))

## Test a Polkadot OpenGov Referendum

To request 4500 DOT from the treasury, you must create a pre-image with the call
`treasury.spendLocal(amount,beneficiary)`. The guide for creating pre-images for treasury proposals
and submitting them is available [here](learn-guides-polkadot-opengov.md) on the Wiki. The proposer
needs to know the exact origin and track to submit this proposal. As this is a treasury proposal, it
would be one of the treasury tracks -
[SmallSpender](learn-polkadot-opengov-origins.md#small-spender) in the case of 4500 DOT.

`0x3c030b00d00361ed2800d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d`

![opengov-treasury-proposal-call](../assets/governance/opengov-call-test-treasury-proposal.png)


### Test the Treasury Call

The treasury spend call cannot be submitted through a signed account origin, it must be tested with a treasury track origin. Navigate to Developer > JavaScript tab on Polkadot JS UI to dispatch the call via the scheduler.

!!!info "Block Number for Scheduler"
    When using the scheduler, you must manually specify the relay chain block number. Use the block height displayed in your Chopsticks terminal output when the instance was launched, then add 1 to schedule the call for the next block. For example, if Chopsticks shows the current height as `24152000`, use `24152001` in the scheduler.

```javascript
// Replace 24152001 with your actual relay chain block
const scheduledBlock = 24152001

await api.rpc('dev_setStorage', {
 scheduler: {
   agenda: [
     [
       [scheduledBlock + 1], [
         {
           call: {
             Inline: '0x3c030b00d00361ed2800d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'
           },
           origin: {
             origins: 'SmallSpender'
           }
         }
       ]
     ]
   ]
 }
})
await api.rpc('dev_newBlock')
```

![polkadot-chopstciks-call](../assets/governance/polkadot-chopsticks-call.png)

After clicking the play button in the JavaScript console, the block number visible on the top left
of the Polkadot JS UI should be incremented by 1. Navigate to Network > Explorer to check the emitted events and verify if the call was executed successfully. Any errors will be displayed here if the call is unsuccessful.

![polkadot-js-ui-explorer](../assets/governance/polkadot-js-ui-explorer.png)

## Test a Polkadot OpenGov Referendum with Cross-chain Calls

Take the example of removing a member of the ambassador collective on the Collectives system chain
through a Polkadot OpenGov referendum. Obtain the call data to remove a member from the ambassador
collective in the Collectives system chain runtime.

![collectives-remove-ambassador](../assets/governance/collectives-remove-member.png)

Note down the call data and navigate to Developer > Runtime calls and fetch the weights for
execution of the call through `transactionPaymentCallApi.queryCallInfo`. Here is the call info used
in our example for your reference:

`0x4603000c691601793de060491dab143dfae19f5f6413d4ce4c363637e5ceacb2836a4e0300`

![tx-payment-call-api](../assets/governance/collectives-remove-call-weights.png)

Now you have all the information you need to create an XCM call that needs to be sent from Polkadot.
No fee payment is required for an XCM call dispatched through OpenGov. The Collectives chain
`ParaID` is 1001. With this information, we can construct the XCM call shown below.

`0x1f0005000100a50f05082f0000060300944603000c691601793de060491dab143dfae19f5f6413d4ce4c363637e5ceacb2836a4e0300`

![unpaid-execution-xcm-call](../assets/governance/collectives-remove-xcm-call.png)

### Cross-chain Testing Setup using Chopsticks

To test cross-chain calls, you need to run multiple network instances simultaneously. Use the following command to start the Polkadot relay chain and Asset Hub instances:

```bash
npx @acala-network/chopsticks@latest xcm -r polkadot -p polkadot-asset-hub -p polkadot-collectives
```

This command starts two instances available at ports 8000 (Polkadot) and 8001 (Asset Hub). **Note the block heights displayed in the terminal output for each chain** when they launch—you will need these for scheduling calls.

Connect to each instance using Polkadot JS UI in separate browser windows by editing the custom endpoint settings:

- [Polkadot: `ws://127.0.0.1:8002`](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A8002)
- [Asset Hub: `ws://127.0.0.1:8000`](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A8000)
- [Collectives: `ws://127.0.0.1:8001`](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A8001)

![polkadot-js-local](../assets/governance/polkadot-js-local-node.png)

Navigate to the Asset Hub instance (port 8000) in Polkadot JS UI and open the JavaScript console.

!!!info "Important: Use Relay Chain Block Number"
    Even though you're connected to Asset Hub, the scheduler must use the **relay chain block number** from the Polkadot instance (port 8002), not Asset Hub's block number. Check your Chopsticks terminal for the Polkadot relay chain height and use that value in the scheduler.

```javascript
// Replace 29138613 with the relay chain block height + 1 from your Chopsticks output
const relayChainBlock = 29138613

await api.rpc('dev_setStorage', {
 scheduler: {
   agenda: [
     [
       [relayChainBlock + 1], [
         {
           call: {
             Inline: '0x1f0005000100a50f05082f0000060300944603000c691601793de060491dab143dfae19f5f6413d4ce4c363637e5ceacb2836a4e0300'
           },
           origin: {
             origins: 'FellowshipAdmin'
           }
         }
       ]
     ]
   ]
 }
})
await api.rpc('dev_newBlock')
```

![javascript-fellowship-admin](../assets/governance/javascript-console-fellowship-admin-call.png)

After clicking on the play button in the JavaScript console, the block number visible on the top
left of the Polkadot JS UI should be incremented by 1. You can navigate to Polkadot JS UI Network >
Explorer to check the emitted events and see if the call got executed successfully. If the call is
unsuccessful, you should see the respective errors displayed here.

**Successful XCM call dispatch shown on the Asset Hub network:**

![xcm-polkadot-send](../assets/governance/polkadot-send-xcm.png)

You can then navigate to the local Collectives instance and check the events to confirm the call has been executed.

### Testing Large Calls with Preimage Lookup

For very long calls like [Referendum 1247](https://polkadot.subsquare.io/referenda/1247) which removes 19 ambassadors at once, the call data exceeds the JavaScript console `Inline` character limit. In such cases, use the preimage lookup method instead.

The preimage hash for this call is `0x82802c62d52a2431e422b58fff1fbdd0efc648e7c98351bd26048d169b94f956` with length `733` (obtained from Polkadot JS UI Governance > Preimages tab).

!!!info "Block Number Reminder"
    Remember to use the relay chain block height from your Chopsticks terminal output, not the value from `api.rpc.chain.getHeader()`. The relay chain block number ensures proper cross-chain message scheduling.

```javascript
// Replace 24152001 with the relay chain block height
const relayChainBlock = 24152001

await api.rpc('dev_setStorage', {
 scheduler: {
   agenda: [
     [
       [relayChainBlock + 1], [
         {
           call: {
             Lookup: {
               hash: "0x82802c62d52a2431e422b58fff1fbdd0efc648e7c98351bd26048d169b94f956",
               len: 733
             }
           },
           origin: {
             origins: 'FellowshipAdmin'
           }
         }
       ]
     ]
   ]
 }
})
await api.rpc('dev_newBlock')
```

If there are referenda that are to be submitted on Root track and you like to test it, you can use
the same template as above and replace
### Testing Root Track Referenda

If you need to test a referendum on the Root track, use the same template as above but replace the origin:

```javascript
// Instead of:
origin: {
  origins: 'FellowshipAdmin'
}

// Use:
system: {
  origin: 'Root'
}
```

Remember that regardless of the track or origin, you must always use the relay chain block number from your Chopsticks instance when scheduling calls.