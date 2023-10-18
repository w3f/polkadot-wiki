---
id: learn-xcm-docs-journey-channels
title: Channels and Bridges
sidebar_label: Channels and Bridges
description: Establishment of HRMP Channels between Parachains.
keywords: [xcm, cross-consensus messaging, channels, bridges]
slug: ../journey-channels
---

# Channels

XCM has instructions that aid in the establishment of a HRMP channel between parachains. HRMP
channels are always unidirectional (one-way); every channel has a static sender and a static
recipient. To send messages in the opposite direction (i.e. from recipient to sender), another new
HRMP channel must be opened. Unlike other XCM instructions, these HRMP instructions are related to
the underlying transport mechanism, and will normally not be sent by developers. We still want to
list them, as they are part of XCM:

- `HrmpNewChannelOpenRequest`
- `HrmpChannelAccepted`
- `HrmpChannelClosing`

## HrmpNewChannelOpenRequest

```rust
HrmpNewChannelOpenRequest {
    #[codec(compact)]
    sender: u32,
    #[codec(compact)]
    max_message_size: u32,
    #[codec(compact)]
    max_capacity: u32,
}
```

The `HrmpNewChannelOpenRequest` is an instruction to notify about a new incoming HRMP channel. This
message is meant to be sent by the relay chain to a parachain.

The `sender` field represents the ParaId of the parachain initializing the channel. This parachain
will also be the sender in the to-be opened channel.

The `max_message_size` field is the maximum size of a message that is send through the channel. This
field is the size proposed by the sender, and needs to be accepted by the recipient.

The `max_capacity` is the maximum number of messages that can be queued in the channel.

## HrmpChannelAccepted

```rust
HrmpChannelAccepted {
    #[codec(compact)]
    recipient: u32,
}
```

The `HrmpChannelAccepted` instruction is used to notify about that a previously sent open channel
request has been accepted by the recipient. That means that the channel will be opened during the
next relay chain session change. This message is meant to be sent by the relay chain to a parachain.

The `recipient` field represents the ParaId of the parachain that initialized the channel, so it
equals the `sender` field in the preceding `HrmpNewChannelOpenRequest` instruction.

## HrmpChannelClosing

```rust
HrmpChannelClosing {
    #[codec(compact)]
    initiator: u32,
    #[codec(compact)]
    sender: u32,
    #[codec(compact)]
    recipient: u32,
}
```

The `HrmpChannelClosing` instruction is used to notify that the other party in an open channel
decided to close it. In particular, `initiator` is going to close the channel opened from `sender`
to the `recipient`. The close will be enacted at the next relay chain session change. This message
is meant to be sent by the relay chain to a para.

The `initiator` field represents the ParaId of the parachain that is closing the channel. It is
equal to either the `sender` or `recipient` field.

The `sender` field represents the ParaId of the parachain that is the sender side of the channel.

The `recipient` field represents the ParaId of the parachain that is the recipient side of the
channel.

Important to note is that both the sender and recipient can close the channel.

# Message Export (Bridging)

XCM has an instruction that allows us to send an XCM to a Non-Local Consensus System, meaning to
MultiLocation that is outside our current GlobalConsensus. For example, it allows us to send an XCM
from Kusama to Polkadot or from Polkadot to an Ethereum-based chain. Exporting an XCM to another
Non-Local Consensus System will tend to utilize some extra consensus layer/mechanism, the obvious
one being a bridge. The instruction to export an XCM is called `ExportMessage`.

## ExportMessage

```rust
ExportMessage { network: NetworkId, destination: InteriorMultiLocation, xcm: Xcm<()> },
```

The `ExportMessage` instruction can be used to export a message to a Non-Local Consensus System. The
message is sent to the bridge (or other consensus mechanism) that is able to export the message. A
fee is charged for exporting the message via the bridge.

The `network` field is the remote consensus system to which the message should be exported.

The `destination` field is the location relative to the remote consensus system to which the message
should be sent on arrival.

The `xcm` field is the message to be exported.

As an example, to export a message for execution on Statemine (parachain `#1000` in the Kusama
network), you would call with `network: NetworkId::Kusama` and `destination: X1(Parachain(1000))`.
Alternatively, to export a message for execution on Polkadot, you would call with
`network: NetworkId:: Polkadot` and `destination: Here`.
