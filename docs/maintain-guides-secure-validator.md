---
id: maintain-guides-secure-validator
title: Guide: Secure Validator
sidebar_label: Secure Validator
---

# Secure Validator Setup

Validators in a Proof of Stake network are responsible for keeping the network in consensus and verifying state transitions. As the number of validators is limited, validators in the set have the responsibility to be online and faithfully execute their tasks.

This primarily means that validators:

- Must have infrastructure that protects the validator's signing keys so that an attacker cannot take control and commit slashable behavior.
- And; must be high availability.

## High Availability

The best way to keep your validator available is to have it behind a layer of "sentry nodes". Sentry nodes are full nodes that can be provisioned on cloud infrastructure, e.g. AWS, GCP, Azure. Your validator node should be placed in a private data center and limit its connections to the sentry nodes.

Sentry nodes can filter the messages that they send to the validator, never sending duplicates so that the validator doesn't get spammed. Likewise, if a sentry node is attacked and goes offline, other instances can be provisioned to replace it. DDoS attacks should never make it to the validator.

As validators are expected to have 100% uptime, node operators may want to have failovers. In this setup, there would be one primary validator, and a second one that only responds to messages if the primary goes offline.

If multiple validators do end up online at the same time, your validator may end up signing multiple blocks and will thus get slashed for equivocation. A properly configured, highly available setup like this will reduce your chances of getting slashed for non-responsiveness, but a misconfigured setup will increase your chances of getting slashed for equivocation. This is a trade-off, and we expect that different validators will make different decisions on which side they err towards.

## Key Management

See the [Polkadot Keys guide](https://wiki.polkadot.network/en/latest/polkadot/learn/keys/) for more information on keys. The keys that are of primary concern for validator infrastructure are the Session keys. These keys sign messages related to consensus and parachains. Although Session keys are _not_ account keys and therefore cannot transfer funds, an attacker could use them to commit slashable behavior.

Session keys are generated inside the node via RPC call. See the [Kusama guide](https://guide.kusama.network/en/latest/try/validate/#set-the-session-key) for instructions on setting Session keys. These should be generated and kept within your client. When you generate new Session keys, you must submit an extrinsic (a Session certificate) from your Controller key telling the chain your new Session keys.

> **NOTE:** Session keys can also be generated outside the client and inserted into the client's keystore via RPC. For most users, we recommend using the key generation functionality within the client.

### Signing Outside the Client

In the future, Polkadot will support signing payloads outside the client so that keys can be stored on another device, e.g. a hardware security module (HSM) or secure enclave. For the time being, however, Session key signatures are performed within the client.

> **NOTE:** HSMs are not a panacea. They do not incorporate any logic and will just sign and return whatever payload they receive. Therefore, an attacker who gains access to your validator node could still commit slashable behavior.

An example of highly available, secure setup would be a layer of sentry nodes in front of multiple validators connected to a single signing machine. This machine could implement signing logic to avoid equivocation, even if an attacker gained access to a validator node.

## Monitoring Tools

- [Telemetry](https://github.com/paritytech/substrate-telemetry) This tracks your node details including the version you are running, block height, CPU & memory usage, block propagation time, etc.  

- [Prometheus](https://prometheus.io/)-based monitoring stack, including [Grafana](https://grafana.com) for dashboards and log aggregation. It includes alerting, querying, visualization, and monitoring features and works for both cloud and on-premise systems. The data from `substrate-telemetry` can be made available to Prometheus through exporters like [this](https://github.com/w3f/substrate-telemetry-exporter).

## Linux Best Practices

- Never use the root user.
- Always update the security patches for your OS.
- Enable and set up a firewall.
- Never allow password-based SSH, only use key-based access.
- Disable non-essential SSH subsystems (banner, motd, scp, X11 forwarding) and harden your SSH configuration ([reasonable guide to begin with](https://stribika.github.io/2015/01/04/secure-secure-shell.html)).
- Back up your storage regularly.

## Conclusions

- Do not expose validators to the public internet, they should only be accessible by allowed parties. Therefore, we propose a layered approach in which the validators are isolated from the internet and connect to the Polkadot network via an intermediate layer of public-facing nodes.

- At the moment, Polkadot/Substrate can't interact with HSM/SGX, so we need to provide the signing key seeds to the validator machine. This key is kept in memory for signing operations and persisted to disk (encrypted with a password).

- Given that HA setups would always be at risk of double-signing and there's currently no built-in mechanism to prevent it, we propose having a single instance of the validator to avoid slashing. Slashing penalties for being offline are much less than those for equivocation.

### Validators 

- Validators should only run the Polkadot binary, and they should not listen on any port other than the configured p2p port.

- Validators should run on bare-metal machines, as opposed to VMs. This will prevent some of the availability issues with cloud providers, along with potential attacks from other VMs on the same hardware. The provisioning of the validator machine should be automated and defined in code. This code should be kept in private version control, reviewed, audited, and tested.

- Session keys should be generated and provided in a secure way.

- Polkadot should be started at boot and restarted if stopped for any reason (supervisor process).

- Polkadot should run as non-root user.

- Each validator should connect to the Polkadot network through a set of at least 2 public-facing nodes. The connection is done through a VPN and the machine can't access the public internet, thus the only possible connection is through the VPN.

### Public Facing Nodes

- At least two nodes associated with each validator run on at least two different cloud providers and they only publicly expose the p2p port.

- They can run as a container on Kubernetes and we can define the desired state (number of replicas always up, network and storage settings); the connection between the validator and the public-facing nodes is done through a VPN. They have the common Kubernetes security setup in place (restrictive service account, pod security policy and network policy).

- Node keys should be provided in a secure way.

- Only run the Polkadot container, no additional services. The VPN agent should run on a sidecar in the same pod (sharing the same network stack).

### Monitoring

- Public-facing nodes and the validator should be monitored and alerts set for several failure conditions defined.

- There should be an on-call rotation for managing the alerts.

- There should be a clear protocol with actions to perform for each level of each alert and an escalation policy.

## Resources

- [Figment Network's Full Disclosure of Cosmos Validator Infrastructure](https://medium.com/figment-networks/full-disclosure-figments-cosmos-validator-infrastructure-3bc707283967) 
- [Certus One's Knowledge Base](https://kb.certus.one/)
- [EOS Block Producer Security List](https://github.com/slowmist/eos-bp-nodes-security-checklist)
- [Sentry Node Architecture Overview](https://forum.cosmos.network/t/sentry-node-architecture-overview/454)
- [HSM Policies and the Important of Validator Security](https://medium.com/loom-network/hsm-policies-and-the-importance-of-validator-security-ec8a4cc1b6f)
