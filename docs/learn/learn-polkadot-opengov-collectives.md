---
title: Collectives
description: Learn about collectives on Polkadot, their various mechanisms, and how they can be created/managed.
---

## Collectives

Collectives are on-chain groups hosted on the Polkadot Collectives parachain, designed to serve the Polkadot network. They enable collaborative decision-making and governance through customizable parameters and funding mechanisms. Below is an overview of their key features:

### Setting Up a Collective

To set up a collective, stakeholders define its purpose, governance structure, and operational parameters. These parameters include promotion/demotion periods, offboarding timeouts, and minimum promotion periods, ensuring flexibility while maintaining operational consistency.

Once these matters are decided, a new instance of the collective pallet is added to the runtime with the desired parameters in place. A collective may need multiple pallets to implement all of its desired functionality; for example, the Polkadot Technical Fellowship has the following implementations in the runtime for its specific logic:

1. **Ranked Collectives** - A membership pallet which allows members to use their voting power for referenda within the collective.
   
2. **Core Fellowship** - A pallet which contains specific logic pertaining to salary, member activity, promotion, and demotion specific to the Technical Fellowship.
   
For more information on the pallets used, refer to the [implementation file in the runtime.](https://github.com/polkadot-fellows/runtimes/blob/ba0bfd6caf7d0df80166f1151e9f86b68ec4dbed/system-parachains/collectives/collectives-polkadot/src/fellowship/mod.rs)

### Collective Parameters

Key parameters for collectives include:

- **Demotion Period**: The time required to demote a member.
- **Minimum Promotion Period**: The minimum duration before a member can be promoted.
- **Offboard Timeout**: The time allowed for offboarding a member.

These parameters, and more, can be tailored to meet the specific needs of the collective.

### Submitting Evidence

Collectives may require evidence submission for retaining their rank in a collective. Guidelines for submitting evidence are defined by the collective and ensure transparency and accountability. 

For example of this mechanism, see the [Evaluations](https://github.com/polkadot-fellows/Evaluations) repository for the Polkadot Technical Fellowship

### Funding and Salaries

Collectives can manage [sub-treasuries](./learn-polkadot-opengov-treasury.md#sub-treasuries) to fund their operations and allocate salaries to members. This allows them to operate independently while contributing to the broader Polkadot ecosystem.