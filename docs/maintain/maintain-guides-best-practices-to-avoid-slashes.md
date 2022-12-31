---
id: maintain-guides-avoid-slashing
title: Validator Best Practices
sidebar_label: Validator Best Practices
description: Best practices to avoid slashing.
keywords: [validator, rewards, slashing]
slug: ../maintain-guides-avoid-slashing
---

## Best practices to prevent slashing

Slashing is implemented as a deterrent for validators to misbehave. Slashes are applied to a
validator’s total stake (own + nominated) and can range from as little as 0.01% or rise to 100%. In
all instances, slashes are accompanied by a loss of nominators.

A slash may occur under four circumstances:

1.  Unresponsiveness – Slashing starts when 10% of the active validators set are offline and
    increases in a linear manner until 44% of the validator set is offline; at this point, the slash
    is held at 7%
2.  Equivocation – A slash of 0.01% is applied with as little as a single evocation. The slashed
    amount increases to 100% incrementally as more validators also equivocate.
3.  Malicious action – This may result from a validator trying to represent the contents of a block
    falsely. Slashing penalties of 100% may apply.
4.  Application related (bug or otherwise) – The amount is unknown and may manifest as scenarios 1,
    2, and 3 above.

This article provides some best practices to prevent slashing based on lessons learned from previous
slashes. It provides comments and guidance for all circumstances except for malicious action by the
node operator.

## Unresponsiveness

An offline event occurs when a validator does not produce a BLOCK or IMONLINE message within an
EPOCH. Isolated offline events do not result in a slash; however, the validator would not earn any
era points while offline. A slash for unresponsiveness occurs when 10% or more of the active
validators are offline at the same time. Check the Wiki section on
[slashing due to unresponsiveness](../learn/learn-staking-advanced.md#unresponsiveness) to learn
more about its specifics.

The following are recommendations to validators to avoid slashing under liveliness for servers that
have historically functioned:

1.  Utilize systems to host your validator instance. Systemd should be configured to auto reboot the
    service with a minimum 60-second delay. This configuration should aid with re-establishing the
    instance under isolated failures with the binary.
2.  A validator instance can demonstrate un-lively behaviour if it cannot sync new blocks. This may
    result from insufficient disk space or a corrupt database.
3.  Monitoring should be implemented that allows node operators to monitor connectivity network
    connectivity to the peer-to-peer port of the validator instance. Monitoring should also be
    implemented to ensure that there is <50 Block ‘drift’ between the target and best blocks. If
    either event produces a failure, the node operator should be notified. The following are
    recommendations to validators to avoid liveliness for new servers / migrated servers:
4.  Ensure that the `--validator` flag is used when starting the validator instance
5.  If switching keys, ensure that the correct session keys are applied
6.  If migrating using a two-server approach, ensure that you don’t switch off the original server
    too soon.
7.  Ensure that the database on the new server is fully synchronized It is highly recommended to
    avoid hosting on providers that other validators may also utilize. If the provider fails, there
    is a probability that one or more other validators would also fail due to liveliness building to
    a slash.  
    There is a precedent that a slash may be forgiven if a single validator faces an offline event
    when a larger operator also faces multiple offline events, resulting in a slash.

## Equivocation

Equivocation events can occur when a validator produces two or more of the same block; under this
condition, it is referred to as a BABE equivocation. Equivocation may also happen when a validator
signs two or more of the same consensus vote; under this condition, it is referred to as a GRANDPA
Equivocation. Equivocations usually occur when duplicate signing keys reside on the validator host.
If keys are never duplicated, the probability of an equivocation slash decreases to near 0. Check
the Wiki section on [Equivocation](../learn/learn-staking-advanced.md#equivocation) to learn more
about its specifics.

The following are scenarios that build towards slashes under equivocation:

1.  Cloning a server, i.e., copying all contents when migrating to new hardware. This action should
    be avoided. If an image is desired, it should be taken before keys are generated.
2.  High Availability (HA) Systems – Equivocation can occur if there are any concurrent operations,
    either when a failed server restarts or if false positive event results in both servers being
    online simultaneously. HA systems are to be treated with extreme caution and are not advised.
3.  The keystore folder is copied when attempting to copy a database from one instance to another.  
    It is important to note that equivocation slashes occur with a single incident. This can happen
    if duplicated keystores are used for only a few seconds. A slash can result in losing
    nominators, and funds, removal from the Thousand Validator Programme, and reputational damage.
    An offline event results in losing some funds but the retention of nominators and a fault under
    the Thousand Validator Programme.

## Application Related

In the past, there have been releases with bugs that lead to slashes; these issues are not as
prevalent in current releases. The following are advised to node operators to ensure that they
obtain pristine binaries or source code and to ensure the security of their node:

1.  Always download either source files or binaries from the official Parity repository
2.  Verify the hash of downloaded files.
3.  Use the W3F secure validator setup or adhere to its principles
4.  Ensure essential security items are checked, use a firewall, manage user access, use SSH
    certificates
5.  Avoid using your server as a general-purpose system. Hosting a validator on your workstation or
    one that hosts other services increases the risk of maleficence.

## Examples

| Network  | Era  | Event Type         | Details                                                                                                                                                                                                                                                                                                                      | Action Taken                                                                                                                       |
| -------- | ---- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Polkadot | 774  | Small Equivocation | [The validator](https://matrix.to/#/!NZrbtteFeqYKCUGQtr:matrix.parity.io/$165562246360408hKCfC:matrix.org?via=matrix.parity.io&via=corepaper.org&via=matrix.org) migrated servers and cloned the keystore folder. The on-chain event can be viewed [here](https://polkadot.subscan.io/extrinsic/11190109-0?event=11190109-5) | The validator did not submit a request for the slash to be canceled.                                                               |
| Kusama   | 3329 | Small Equivocation | The validator operated a test machine with cloned keys; the test machine was online at the same time as the primary, which resulted in a slash. Details can be found [here](https://kusama.polkassembly.io/post/1343)                                                                                                        | The validator requested a cancellation of the slash, but the council declined.                                                     |
| Kusama   | 3995 | Small Equivocation | The validator noticed several errors, after which the client crashed, and a slash was applied. The validator recorded all events and opened GitHub issues to allow for technical opinions to be shared. Details can be found [here](https://kusama.polkassembly.io/post/1733).                                               | The validator requested to cancel the slash. The council approved the request as they believed the error was not operator related. |
| Kusama | 4543 | Medium Unresponsiveness | A large amount of disputes flooded the network resulting in an application fault.  The fault caused the client software to hang and as a result ~197 unique validators become unresponsive.  Further details can be found [here](https://kusama.polkassembly.io/referenda/16). |  The pending slash was cancelled and with runtime [9350](https://kusama.polkassembly.io/referenda/24) all lost nominations were restored.  The application bug was addressed with client version [0.9.36](https://forum.polkadot.network/t/polkadot-release-analysis-v0-9-36/1529) |
