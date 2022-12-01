---
id: doc-maintain-guides-validator-community
title: Validator Community Overview
sidebar_label: Validator Community Overview
description: An extensive guide to help you start and build a validator community.
keywords: [validator, community, reputation, nominations]
slug: ../maintain-guides-validator-community
---

## Building a Community and Attracting Nominations

After [setting up a validator][], nominations will only come in with extra work. The community of
nominators will need to know about the validator to trust staking with them, and thus the
validator must distinguish themselves to attract nominations. The following gives some
general guidance on different approaches to building a community and attracting nominations.

Being a high-quality validator entails effectively running nodes and building a
brand, reputation, and community around validation services. The responsibilities of a quality
validator additionally include marketing oneself and participating in the greater community.
Becoming a known participant throughout the ecosystem is a great way to attract nominations and
solidify longevity and sustainability as a validator.

One thing to remember is that there is a risk involved in staking for both validators and nominators,
as both can lose up to 100% of their funds if a validator gets slashed. This means it is paramount
for nominators only to nominate validators that they trust, as well as for validators to do their
best to instill confidence in their ability to provide validation services. Validators should do
their best to build a reputation through many different means, as this is one of the most important
factors in how nominators should pick whom they stake with.

## Gaining Visibility

Nominators should be able to know whom they are staking with. If nominators stake with a bunch of
pseudo-anonymous addresses because it seems profitable, they expose themselves to more risks than
nominating validators that follow best practices to whom they _know_ the addresses belong.
Establishing a clear identity in multiple places can help gain visibility across the ecosystem. This
includes setting an on-chain identity and making a known presence throughout various community
channels.

### Setting Identity

All validators should set an on-chain [identity][] and get a judgement on the identity so that
nominators can find nodes when browsing through various dashboards and UIs. When someone interacts
with the chain, it ensures that an address they may come across belongs to the validator, and
actions of that identity throughout various parts of the ecosystem (staking, governance, block
explorers, etc.) form a cohesive representation of their participation.

:::note When running multiple validator nodes, the best way to scale an identity is to use multiple
sub-identities from a single verified identity

:::

It's recommended to fill out as many fields in the identity as possible so Nominators have ample
means of reaching out. Nominators may wish to know more about the Validator, the particular setup,
future staking plans, tooling used, or several additional topics. Having a dedicated website
additionally to provide this sort of information is ideal.

:::note Ledger app doesn't support the extrinsic for setting identity yet

As a workaround, create a primary identity with an on-chain account and then use that primary
identity, assign a [sub-identity](../learn/learn-identity.md#sub-accounts) to the Ledger stash.

:::

### Website

One strategy for helping gain additional visibility is to set up a dedicated site for your validator, which
includes the networks that one is a validator for and validator details such as addresses,
commission, and so forth. Including all suggestions from this page is potential content to include
on the site. After setting up a website, a validator should add this website to the
corresponding field in their identity so nominators can find it easily.

## Transparency & Establishing Trust

Considering the risks involved for both Validators and Nominators, establishing trust is one of the
most essential factors in running quality validator services.

### Self Stake

Validators should have skin in the game in their operations in the form of a stake that is self-bonded
to their validator stash. Slashing applies to the total stake of a Validator, therefore having a high self-stake shows confidence in the operations. This helps show commitment from the Validator as they have skin in the game and can be penalized for negative actions or poor maintenance.
mess up. Having very little self-stake can signal to nominators that they have nothing to lose
in the case of failures.

Additionally, it can help nominators to get a sense of how validators manage their stakes.
Defining a self-allocation strategy is also helpful in seeing how efficiently a validator's stake
can be utilized.

### Commission & Rewards

#### Commission

What does your validator charge as commission, and how did you reach this number? It can be helpful
to be transparent about the long-term plans around the business models of running a validator,
including the costs for infrastructure and person-hours involved in maintaining operations. As many
validators will charge low commissions that often do not cover costs, outlining what commission is
charged and why can help justify higher commission rates.

Besides the current commission, it would be helpful to describe the _range_ of commission charged,
as nominators can know what to expect if the rate goes up or down. Nominators may want
to nominate a validator with a very narrow commission percent range, as this signals stability in a
validator's operations and business plans.

Many validators will charge 0% or near 0% commission to bootstrap themselves at first, with plans to
raise that over time. It can be helpful to elaborate on these plans in the future. For example
"_after x amount of months in the active set with 0% commission, we plan to increase it to 1%_."

#### Rewards

Another factor to consider is that claiming rewards for both the validator and the nominator is not
automatic. Rewards must be claimed manually or set up in an automated way. Validators are suggested
to claim rewards on behalf of their nominators and be transparent about how often claiming will
happen. A nominator may be more likely to stake with a validator that claims rewards daily instead
of one that doesn't claim rewards at all.

The following are some tools for automating reward claiming:

- [staking-payouts](https://github.com/canontech/staking-payouts)
- [substrate-payctl](https://github.com/stakelink/substrate-payctl)

### Validator Experience

### Architecture

One aspect of building trust is being transparent about your validator infrastructure. If nominators
know that you are running a tight ship that is focused on security, they are more likely to trust
you compared to those that do not disclose their infrastructure.

Some factors of architecture to highlight might include:

#### Servers

Outlining how a validator runs its servers helps nominators understand how diversified a
validator is. Does the Validator run in the cloud, on dedicated machines, in a co-located
datacenter, or in a home residential setup? Do they run multiple nodes on the same machine? If every
validator is hosted in AWS, there is a risk of potential outages that cause large amounts of nodes
to go offline, causing slashing for unresponsiveness. Nominators may want to choose validators that
have thoroughly diversified the providers they use or the facilities they operate in.

Additionally, how does a Validator contribute to decentralization? It can be helpful to outline
these efforts so that the values of a Nominator and Validator are aligned.

It's also helpful to outline what kind of OS is used on these servers and what is the updating
policy for the software on that OS. For example, are LTS versions used? Do they use NiXOS,
distro-packaged libraries? Any server hardening practices, etc.

#### Specs

Are you running the recommended Standard Hardware for
{{ polkadot: Polkadot :polkadot }}{{ kusama: Kusama :kusama }}? Can you ensure that machines have
enough processing power, memory, file storage, and network connectivity? It's helpful for nominators
to know the specs of the machines a validator uses to assess how they may perform in the network.
If a validator is running underpowered machines, they may not want to nominate them, as these can
result in fewer blocks produced and fewer overall rewards. In certain circumstances, more powerful
machines can result in higher rewards for both the Validator and their Nominators.

#### Automation and orchestration approaches (Terraform, Ansible, Chef, Puppet, Kubernetes, etc.)

What kind of approach is taken for spinning up and provisioning nodes? How might you automate
spinning up large clusters of nodes and upgrading them? Elaborating on what type of automation (or
lack thereof) can help get a sense of how robust a validator setup is. Many everyday actions
or routine maintenance needs to be done, and automating this type of thing often helps mitigate
human errors.

#### Network Topology

Does the Validator node have protection against Denial of Service attacks, and if so, how is that
done? Outlining a desired network topology for a Validators infrastructure design will help Nominators understand how resilient their operations are to attacks. Some things to highlight are the usage of firewalls,
VPNs, network segmentation, proxies, or other layers separation.

#### Upgrading

Both Polkadot and Kusama releases are published.
[here](https://github.com/paritytech/polkadot/releases). Validators are expected to upgrade their
nodes as soon as a new release comes. Although not every release is mandatory to upgrade,
each new release usually has bug fixes, optimizations, new features, or other beneficial changes.
It's in the best interest of the entire network that validators update their nodes in a timely
fashion. This signals to nominators that a validator is timely care about their operations and is
quick to adapt to necessary circumstances.

It can also be helpful for Nominators to know how the Validator runs software and where they get new
binaries. How do they get alerted for new releases? Do they receive updates from the matrix chatrooms? Do
they have alerts for particular GitHub activities? Do they use the Debian/RPM packages? Do they use
the Parity-provided GitHub binaries? Do they use Parity Docker images? Do they make their own Docker
images? Do they build the binaries themselves? Validators often have their own build server for
making binaries. If they take the extra steps to make these and do not rely on external parties,
this can be seen as a plus from nominators, as it helps contribute to decentralization.

#### Logging, metrics, monitoring, and observability

Good node operators keep tabs on how their systems are running. Observability is one of the most
critical aspects of understanding the performance and behavior of a node. One should be able to
outline the efforts taken in building out monitoring and observability practices. Are Prometheus and
Grafana set up? What types of metrics are collected and looked at? How is this done across multiple
nodes? A quality validator may make these metrics and graphs public so that Nominators
can see how these nodes are running.

##### Health checks and alerting conditions

Similar to the last point, it can be helpful for nominators to know what kind of health checks and
alerting conditions are in place for validator nodes. What conditions are not typical and may need to
be looked at? If conditions are not specific, how is the node operator alerted to this? Are there any
public Telegram, SMS, or email alerts? Nominators will want to know that a Validator can respond to
abnormal conditions promptly, as their tokens are on the line of potentially being lost.

##### Scenario runbooks

Many scenarios happen routinely, such as upgrading nodes, restoring backups, or moving servers.
Creating runbooks and sharing the procedures and precautions taken around these can instill
confidence in nominators that various scenarios are thought out and planned for.

##### Which regions nodes are in

A diverse network of nodes in varying different regions helps strengthen decentralized networks.
Outlining what regions nodes are in gives clarity to this facet of networks. Nominators may want to
promote validators that actively try to decentralize networks operating in regions in which others
do not run nodes.

##### Security / Key handling policies

It is paramount that session keys and stash/controller keys are stored and handled with the utmost
As a compromise of these, care can get both validator and nominator slashed. Outlining how keys are
handled, how they are stored, who has access to them, and the overall policies and procedures around
them is a great point of reference for nominators to gauge how comfortable they are with the
security a validator takes.

### Robust Communication

The relationship between Validators and Nominators is one built on trust, and as such, having direct
lines of communication with Nominators is a great way to build and reinforce that trust. This could
mean setting up dedicated Telegram / Matrix / Discord channels or hosting a reoccurring call where
anyone can join. Creating inclusive environments with direct connections between parties is
going the extra mile to ensure that nominators know they're in good hands. Many updates can be given, such as nodes being updated to a new version, rewards being paid out, servers being
migrated, new features or tools being built, or just checking in to say hello. These kinds of
gestures can be much appreciated in putting words and a person behind the name of someone running a
server.

### Actively Participating in the Community

Participating in the community goes hand in hand with building a reputation. This is not only for
Nominators, but for other Validators, builders, developers, governance participants, and general
enthusiasts. Being helpful or contributing to discussions can go a long way in building a trusted
brand and reputation.

There are many communities to participate in, from validator, developer, and governance communities,
to local communities dedicated to specific regions. For example, one can be pretty active in the
South American communities and building camaraderie among those who speak the same language or
can attend the same meetups in an area. One absolute best way to build trust is meeting
people in person.

#### Participating in Governance

Another way to show that one cares about the network is by actively participating in governance.
Whether by voting on-chain, or by discussing off-chain, or proposing new
things, active participation in the direction of the chain is an excellent signal that a validator is
there for the network’s good. There are many ways to participate in different governance aspects, such as voting for council members, weighing in on treasury proposals, voting on
public referenda, proposing tips, and more. See the section on [governance][] for additional
details.

#### Producing Educational Content

With a fast-moving ecosystem, there often are gaps in educational content where there are new
features, changes, deprecations, or just a slow-moving process for putting out information about
very complex concepts. Putting out educational content in the form of blog posts, videos, tutorials,
development guides, and more (especially if it's geared toward nominators) provides tangible value
to the ecosystem. It shows that one has a good grasp of how things work, and disseminating this
knowledge to others can give some credence to one's brand and reputation as a competent entity in
the space. Furthermore, one might get tips from the treasury if the community finds something
beneficial.

#### Building Tooling

Building public tooling is a great way to support the ecosystem. This provides tangible
value to those that use this tooling and gives visibility to the validator for their
contributions. A nominator might be more likely to nominate a validator for the utilities they
provide the ecosystem since the validator then can build a reputation around the quality of their
work outside their validation services. Some potential building categories are block
explorers, deployment scripts, monitoring, observability services, staking dashboards, wallets,
command-line utilities, or porting implementations to other languages. Additionally, this may also
be eligible to be funded via a
[Web 3 Foundation Grant](https://github.com/w3f/Grants-Program).

[setting up a validator]: maintain-guides-how-to-validate-Polkadot
[identity]: ../learn/learn-identity.md#setting-an-identity
[governance]: maintain-guides-democracy

