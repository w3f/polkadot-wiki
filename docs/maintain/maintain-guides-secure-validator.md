---
id: maintain-guides-secure-validator
title: Secure Validator
sidebar_label: Secure Validator
description: Tips for running a secure validator.
keywords: [secure validator, validator, configuration]
slug: ../maintain-guides-secure-validator
---

Validators in a Proof of Stake network are responsible for keeping the network in consensus and
verifying state transitions. As the number of validators is limited, validators in the set have the
responsibility to be online and faithfully execute their tasks.

This primarily means that validators:

- Must be high availability.
- Must have infrastructure that protects the validator's signing keys so that an attacker cannot
  take control and commit slashable behavior.

## High Availability

High availability set-ups that involve redundant validator nodes may seem attractive at first.
However, they can be **very dangerous** if they are not set up perfectly. The reason for this is
that the session keys used by a validator should always be isolated to just a single node.
Replicating session keys across multiple nodes could lead to equivocation slashes or parachain
validity slashes which can make you lose **100% of your staked funds**.

The good news is that 100% uptime of your validator is not really needed, as it has some buffer
within eras in order to go offline for a little while and upgrade. For this reason, we advise that
you only attempt a high availability set-up if **you're confident you know exactly what you're
doing.**

Many expert validators have made mistakes in the past due to the handling of session keys.

Remember, even if your validator goes offline for some time, the offline slash is much more
forgiving than the equivocation or parachain validity slashing.

## Key Management

See the [Polkadot Keys guide](../learn/learn-keys.md) for more information on keys. The keys that are of
primary concern for validator infrastructure are the Session keys. These keys sign messages related
to consensus and parachains. Although Session keys are _not_ account keys and therefore cannot
transfer funds, an attacker could use them to commit slashable behavior.

Session keys are generated inside the node via RPC call. See the
[How to Validate guide](maintain-guides-how-to-validate-polkadot.md#set-session-keys)
for instructions on setting Session keys. These should be generated and kept within your client.
When you generate new Session keys, you must submit an extrinsic (a Session certificate) from your
Controller key telling the chain your new Session keys.

:::info Generating session keys

Session keys can also be generated outside the client and inserted into the client's
keystore via RPC. For most users, we recommend using the key generation functionality within the
client.

:::

### Signing Outside the Client

In the future, Polkadot will support signing payloads outside the client so that keys can be stored
on another device, e.g. a hardware security module (HSM) or secure enclave. For the time being,
however, Session key signatures are performed within the client.

:::info HSMs are not a panacea

They do not incorporate any logic and will just sign and return
whatever payload they receive. Therefore, an attacker who gains access to your validator node
could still commit slashable behavior.

:::

## Monitoring Tools

- [Telemetry](https://github.com/paritytech/substrate-telemetry) This tracks your node details
  including the version you are running, block height, CPU & memory usage, block propagation time,
  etc.

- [Prometheus](https://prometheus.io/)-based monitoring stack, including
  [Grafana](https://grafana.com) for dashboards and log aggregation. It includes alerting, querying,
  visualization, and monitoring features and works for both cloud and on-premise systems. The data
  from `substrate-telemetry` can be made available to Prometheus through exporters like
  [this](https://github.com/w3f/substrate-telemetry-exporter).

## Linux Best Practices

- Never use the root user.
- Always update the security patches for your OS.
- Enable and set up a firewall.
- Never allow password-based SSH, only use key-based access.
- Disable non-essential SSH subsystems (banner, motd, scp, X11 forwarding) and harden your SSH
  configuration
  ([reasonable guide to begin with](https://stribika.github.io/2015/01/04/secure-secure-shell.html)).
- Back up your storage regularly.

## Conclusions

- At the moment, Polkadot/Substrate can't interact with HSM/SGX, so we need to provide the signing
  key seeds to the validator machine. This key is kept in memory for signing operations and
  persisted to disk (encrypted with a password).

- Given that HA setups would always be at risk of double-signing and there's currently no built-in
  mechanism to prevent it, we propose having a single instance of the validator to avoid slashing.
  Slashing penalties for being offline are much less than those for equivocation.

### Validators

- Validators should only run the Polkadot binary, and they should not listen on any port other than
  the configured p2p port.

- Validators should run on bare-metal machines, as opposed to VMs. This will prevent some of the
  availability issues with cloud providers, along with potential attacks from other VMs on the same
  hardware. The provisioning of the validator machine should be automated and defined in code. This
  code should be kept in private version control, reviewed, audited, and tested.

- Session keys should be generated and provided in a secure way.

- Polkadot should be started at boot and restarted if stopped for any reason (supervisor process).

- Polkadot should run as a non-root user.

### Monitoring

- There should be an on-call rotation for managing the alerts.

- There should be a clear protocol with actions to perform for each level of each alert and an
  escalation policy.

## Resources

- [Figment Network's Full Disclosure of Cosmos Validator Infrastructure](https://medium.com/figment-networks/full-disclosure-figments-cosmos-validator-infrastructure-3bc707283967)
- [Certus One's Knowledge Base](https://kb.certus.one/)
- [EOS Block Producer Security List](https://github.com/slowmist/eos-bp-nodes-security-checklist)
- [HSM Policies and the Important of Validator Security](https://medium.com/loom-network/hsm-policies-and-the-importance-of-validator-security-ec8a4cc1b6f)
