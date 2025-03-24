---
id: chain-state-values
title: Chain State Values
sidebar_label: Chain State
description:
  Chain constants and storage values that can be queried from the live network nodes of Polkadot,
  Kusama and their system chains.
keywords: [polkadot, kusama, constants, storage, values]
slug: ../chain-state-values
---

<!-- prettier-ignore-start -->

=== "Polkadot"

    !!!info "What to do with DOT"
        - __{{ rpc("polkadot", "Balances", "ExistentialDeposit", 0, is_constant=true, readable="human_readable") }} :__ the minimum balance required to have an active account on Polkadot Network. If your account balance drops below the minimum, your account will be reaped. Learn more about [Accounts](../learn/learn-accounts.md) and the [Existential Deposit](../learn/learn-accounts.md#existential-deposit-and-reaping) requirement.
        - __{{ rpc("polkadot", "NominationPools", "MinJoinBond", 0, is_constant=false, readable="human_readable") }} :__ the minimum contribution required to join a [nomination pool](../learn/learn-nomination-pools.md) and earn staking rewards for contributing to the security of the network. Learn more about [nomination pools](../learn/learn-nomination-pools.md).
        - __{{ rpc("polkadot-people", "Identity", "BasicDeposit", 0, is_constant=true, readable="human_readable") }} :__ register an [on-chain identity](../learn/learn-identity.md)
        - __{{ rpc("polkadot", "Proxy", "ProxyDepositBase", 0, is_constant=true, readable="human_readable") }} :__ create a [proxy account](../learn/learn-proxies.md).
        - __{{ rpc("polkadot", "Staking", "MinNominatorBond", 0, is_constant=false, readable="human_readable") }} :__ the minimum stake required to submit your intent to directly nominate validators.
        - __{{ rpc("polkadot", "Staking", "MinimumActiveStake", 0, is_constant=false, readable="human_readable") }} :__ the minimum amount of DOT required to become an active nominator and earn rewards, i.e. the minimum active bond. To increase the chance of earning staking rewards, your stake should not be less than the minimum stake among the active nominators, which is a dynamic threshold. If you have lesser DOT than the minimum active nomination, please consider contributing to [nomination pools](../learn/learn-nomination-pools.md). Learn more about [becoming a nominator](../learn/learn-nominator.md).
        - __{{ rpc("polkadot", "NominationPools", "MinCreateBond", 0, is_constant=false, readable="human_readable") }} :__ you can create your own [nomination pool](../learn/learn-nomination-pools.md).

    #### Active Validator Count

    The number of Polkadot validators in the active set is {{ rpc("polkadot", "Staking", "ValidatorCount", 297, false, false) }}.

    #### Block Hash Count

    On Polkadot, the maximum number of block hashes retained on-chain at any given time is {{ rpc("polkadot", "System", "BlockHashCount", 4096, true, false) }} (which maps to seven hours given 6-second block times).

    #### Bounty Curator Deposit

    On Polkadot, the bounty curator deposit is calculated by multiplying the curator fee by the bounty curator deposit multiplier set to {{ rpc("polkadot", "Bounties", "CuratorDepositMultiplier", 500000, true, readable="percentage") }}. The deposit can range between a minimum of {{ rpc("polkadot", "Bounties", "CuratorDepositMin", 100000000000, true, readable="human_readable") }}  and a maximum of {{ rpc("polkadot", "Bounties", "CuratorDepositMax", 2000000000000, true, readable="human_readable") }}

    #### Bounty Deposit

    The deposit to submit a bounty on Polkadot is {{ rpc("polkadot", "Bounties", "BountyDepositBase", 10000000000, true, readable="human_readable") }}

    #### Bounty Duration

    A Polkadot bounty has a predetermined duration of {{ rpc("polkadot", "Bounties", "BountyUpdatePeriod", 1296000, true, readable="blocks_to_days") }} days.

    #### Conviction Voting Lock Period

    One conviction voting lock period on Polkadot equals {{ rpc("polkadot", "ConvictionVoting", "VoteLockingPeriod", 100800, true, readable="blocks_to_days") }} days.

    #### Existential Deposit

    The minimum number of tokens to keep an account alive on the Polkadot relay chain is {{ rpc("polkadot", "Balances", "ExistentialDeposit", 333000000, true, readable="human_readable") }}

    #### Inactive Issuance

    Polkadot's inactive issuance is {{ rpc("polkadot", "Balances", "InactiveIssuance", 20115636146084858300, is_constant=false, readable="precise_dot") }} in the era {{ rpc("polkadot", "Staking", "CurrentEra", 1553, is_constant=false) }}.

    #### Index Deposit

    The deposit to reserve an index on Polkadot is {{ rpc("polkadot", "Indices", "Deposit", 100000000000, is_constant=true, readable="human_readable") }}

    #### Maximum Number of Nominators

    The maximum number of nominators on Polkadot is uncapped and the current value is {{ rpc("polkadot", "Staking", "CounterForNominators", 36793, is_constant=false) }}.

    #### Maximum Number of Proxies per Account

    The maximum number of proxies per Polkadot account is {{ rpc("polkadot", "Proxy", "MaxProxies", 32, is_constant=true) }}. You can have the same proxy for multiple accounts.

    #### Maximum Votes per Nominator

    A nominator on Polkadot can select up to {{ rpc("polkadot", "ElectionProviderMultiPhase", "MinerMaxVotesPerVoter", 16, is_constant=true) }} validators.

    #### Minimum Active Bond

    The minimum amount of tokens to nominate on Polkadot is {{ rpc("polkadot", "Staking", "MinimumActiveStake", 5521439075539, is_constant=false, readable="human_readable") }} 

    #### Minimum Bond to Create a Nomination Pool

    The minimum bond to create a Polkadot nomination pool is {{ rpc("polkadot", "NominationPools", "MinCreateBond", 5000000000000, is_constant=false,readable="human_readable") }}.

    #### Minimum Bond to Join a Nomination Pool

    The minimum bond to join a Polkadot nomination pool is {{ rpc("polkadot", "NominationPools", "MinJoinBond", 10000000000, is_constant=false, readable="human_readable") }}

    #### Minimum Bond to Participate in Staking

    The minimum bond to nominate on Polkadot is {{ rpc("polkadot", "Staking", "MinNominatorBond", 2500000000000, is_constant=false, readable="human_readable") }}  while the minimum amount to join a pool is {{ rpc("polkadot", "NominationPools", "MinJoinBond", 10000000000, is_constant=false, readable="human_readable") }}

    #### Minimum Validator Bond

    To start a validator instance on Polkadot, the minimum bond required is {{ rpc("polkadot", "Staking", "MinValidatorBond", 0, is_constant=false, readable="human_readable") }}

    #### Minimum Validator Commission

    The minimum commission a Polkadot Validator can set is {{ rpc("polkadot", "Staking", "MinCommission", 0, is_constant=false, readable="percentage") }}. [This does not guarantee entry into the active set and earning rewards](../maintain/maintain-guides-how-to-validate-polkadot.md#how-many-dot-do-i-need-to-become-an-active-validator).

    #### Multisig Deposit Base

    The multisig deposit base on Polkadot is {{ rpc("polkadot", "Multisig", "DepositBase", 200880000000, is_constant=true, readable="human_readable") }}

    #### Multisig Deposit Factor

    The multisig deposit factor on Polkadot is {{ rpc("polkadot", "Multisig", "DepositFactor", 320000000, is_constant=true, readable="human_readable") }}

    #### Nomination Pool Max Commission

    The maximum commission that can be set for a Polkadot nomination pool is {{ rpc("polkadot", "NominationPools", "GlobalMaxCommission", 100000000, is_constant=false, readable="percentage") }}.

    #### Nomination Pool Members

    There are currently {{ rpc("polkadot", "NominationPools", "CounterForPoolMembers", 0, is_constant=false) }} members in {{ rpc("polkadot", "NominationPools", "LastPoolId", 0, is_constant=false) }} Polkadot nomination pools. There is no limit to the number of pools or pool members per pool.

    #### OpenGov Referendum Timeout

    A Polkadot referendum is timeout for not submitting the Decision Deposit within {{ rpc("polkadot", "Referenda", "UndecidingTimeout", 0, is_constant=true, readable="blocks_to_days") }} days since its creation.

    #### OpenGov Submission Deposit

    A deposit of {{ rpc("polkadot", "Referenda", "SubmissionDeposit", 0, is_constant=true, readable="human_readable") }} is needed to submit a referendum on Polkadot.

    #### Parachain ID Registration Deposit

    Reserving a `ParaID` on Polkadot requires a deposit of {{ rpc("polkadot", "Registrar", "ParaDeposit", 0, is_constant=true, readable="human_readable") }}

    #### Parachain Genesis State Registration Deposit

    Registering the genesis state and WASM code of a Polkadot parachain requires a deposit {{ rpc("polkadot", "Registrar", "DataDepositPerByte", 0, is_constant=true,  readable="human_readable") }} per byte.

    #### Proxy Deposits

    The creation of proxies on Polkadot requires a **proxy deposit base** of {{ rpc("polkadot", "Proxy", "ProxyDepositBase", 0, is_constant=true,  readable="human_readable") }} and a **proxy deposit factor** of {{ rpc("polkadot", "Proxy", "ProxyDepositFactor", 0, is_constant=true,  readable="human_readable") }} that is multiplied by the number of proxies under the same proxied account.

    In case of time-delayed proxies, there is an **announcement deposit base** of {{ rpc("polkadot", "Proxy", "AnnouncementDepositBase", 0, is_constant=true,  readable="human_readable") }} for announcing a call and an **announcement deposit factor** of {{ rpc("polkadot", "Proxy", "AnnouncementDepositFactor", 0, is_constant=true, readable="human_readable") }} for each proxy call.

    #### Staking Miner Deposit and Reward

    Staking miners on Polkadot are required to reserve a deposit to submit their solutions. The the deposit is the sum of a **signed deposit base** of {{ rpc("polkadot", "ElectionProviderMultiPhase", "SignedDepositBase", 0, is_constant=true, readable="human_readable") }}, a **signed deposit per byte** of {{ rpc("polkadot", "ElectionProviderMultiPhase", "SignedDepositByte", 0, is_constant=true, readable="human_readable") }} (a solution weighing 200KB would yield 200 x 0.0000097656 = 0.00195312 DOT), and a **signed deposit weight** set to 0.

    The **signed reward base** on Polkadot is {{ rpc("polkadot", "ElectionProviderMultiPhase", "SignedRewardBase", 0, is_constant=true, readable="human_readable") }} which is a fixed amount.

    #### Staking Miner Max Submissions

    The maximum number of submissions for a staking miner on Polkadot is {{ rpc("polkadot", "ElectionProviderMultiPhase", "SignedMaxSubmissions", 0, is_constant=true) }}.

    #### Staking Reward Retention

    Polkadot staking rewards are kept available for 84 eras. The following calculation can be used to
    approximate this length in days:

    `84 eras` × `24 hours in a single era` ÷ `24 hours in a day` = `84 days`

    #### Total Issuance

    Polkadot's total issuance is {{ rpc("polkadot", "Balances", "TotalIssuance", 0, is_constant=false, readable="precise_dot") }} in the era {{ rpc("polkadot", "Staking", "CurrentEra", 0, is_constant=false) }}.

    #### Treasury Burn Factor

    At the end of every spending period on Polkadot, {{ rpc("polkadot", "Treasury", "Burn", 0, is_constant=true, readable="percentage") }} of the available funds are burned.

    #### Treasury Spending Period

    The spending period on Polkadot is currently {{ rpc("polkadot", "Treasury", "SpendPeriod", 0, is_constant=true, readable="blocks_to_days") }} days.

    #### Unbonding Duration

    The unbonding duration on Polkadot is set to {{ rpc("polkadot", "Staking", "BondingDuration", 0, is_constant=true) }} days. This is
    calculated by taking the **bonding duration** (in eras), multiplying it by the **length of a single
    era** (in hours), and dividing by the **hours in a day** (24). Example: 28 × 24 ÷ 24 = 28 days.

=== "Kusama"

    !!!info "What to do with KSM"
        - __{{ rpc("kusama", "Balances", "ExistentialDeposit", 0, is_constant=true, readable="precise_ksm") }} :__ the minimum balance required to have an active account on Kusama Network. If your account balance drops below the minimum, your account will be reaped. Learn more about [Accounts](../learn/learn-accounts.md) and the [Existential Deposit](../learn/learn-accounts.md#existential-deposit-and-reaping) requirement.
        - __{{ rpc("kusama", "NominationPools", "MinJoinBond", 0, is_constant=false, readable="precise_ksm") }} :__ the minimum contribution required to join a [nomination pool](../learn/learn-nomination-pools.md) and earn staking rewards for contributing to the security of the network. Learn more about [nomination pools](../learn/learn-nomination-pools.md).
        - __{{ rpc("kusama-people", "Identity", "BasicDeposit", 0, is_constant=true, readable="precise_ksm") }} :__ register an [on-chain identity](../learn/learn-identity.md)
        - __{{ rpc("kusama", "Proxy", "ProxyDepositBase", 0, is_constant=true, readable="human_readable_kusama") }} :__ create a [proxy account](../learn/learn-proxies.md).
        - __{{ rpc("kusama", "Staking", "MinNominatorBond", 0, is_constant=false, readable="human_readable_kusama") }} :__ the minimum stake required to submit your intent to directly nominate validators.
        - __{{ rpc("kusama", "Staking", "MinimumActiveStake", 0, is_constant=false, readable="human_readable_kusama") }} :__ the minimum amount required to become an active nominator and earn rewards, i.e. the minimum active bond. To increase the chance of earning staking rewards, your stake should not be less than the minimum stake among the active nominators, which is a dynamic threshold. If you have lesser KSM than the minimum active nomination, please consider contributing to [nomination pools](../learn/learn-nomination-pools.md). Learn more about [becoming a nominator](../learn/learn-nominator.md).
        - __{{ rpc("kusama", "NominationPools", "MinCreateBond", 0, is_constant=false, readable="human_readable_kusama") }} :__ you can create your own [nomination pool](../learn/learn-nomination-pools.md).

    #### Active Validator Count

    The number of Kusama validators in the active set is {{ rpc("kusama", "Staking", "ValidatorCount", 297, false, false) }}.

    #### Block Hash Count

    On Kusama, the maximum number of block hashes retained on-chain at any given time is {{ rpc("kusama", "System", "BlockHashCount", 4096, true, false) }}(which maps to seven hours given 6-second block times).

    #### Bounty Curator Deposit

    On Kusama, the bounty curator deposit is calculated by multiplying the curator fee by the bounty curator deposit multiplier set to {{ rpc("kusama", "Bounties", "CuratorDepositMultiplier", 500000, true, readable="percentage") }}. The deposit can range between a minimum of {{ rpc("kusama", "Bounties", "CuratorDepositMin", 100000000000, true, readable="human_readable_kusama") }}  and a maximum of {{ rpc("kusama", "Bounties", "CuratorDepositMax", 2000000000000, true, readable="human_readable_kusama") }}

    #### Bounty Deposit

    The deposit to submit a bounty on Kusama is {{ rpc("kusama", "Bounties", "BountyDepositBase", 10000000000, true, readable="human_readable_kusama") }} .

    #### Bounty Duration

    A Kusama bounty has a predetermined duration of {{ rpc("kusama", "Bounties", "BountyUpdatePeriod", 1296000, true, readable="blocks_to_days") }} days.

    #### Conviction Voting Lock Period

    One conviction voting lock period on Kusama equals {{ rpc("kusama", "ConvictionVoting", "VoteLockingPeriod", 100800, true, readable="blocks_to_days") }} days.

    #### Existential Deposit

    The minimum number of tokens to keep an account alive on the Kusama relay chain is {{ rpc("kusama", "Balances", "ExistentialDeposit", 333000000, true, readable="human_readable_kusama") }}.

    #### Inactive Issuance

    Kusama's inactive issuance is {{ rpc("kusama", "Balances", "InactiveIssuance", 20115636146084858300, is_constant=false, readable="precise_ksm") }} in the era {{ rpc("kusama", "Staking", "CurrentEra", 1553, is_constant=false) }}.

    #### Index Deposit

    The deposit to reserve an index on Kusama is {{ rpc("kusama", "Indices", "Deposit", 100000000000, is_constant=true, readable="human_readable_kusama") }}

    #### Maximum Number of Nominators

    The maximum number of nominators on Kusama is uncapped and the current value is {{ rpc("kusama", "Staking", "CounterForNominators", 36793, is_constant=false) }}.

    #### Maximum Number of Proxies per Account

    The maximum number of proxies per Kusama account is {{ rpc("kusama", "Proxy", "MaxProxies", 32, is_constant=true) }}. You can have the same proxy for multiple accounts.

    #### Maximum Votes per Nominator

    A nominator on Kusama can select up to {{ rpc("kusama", "ElectionProviderMultiPhase", "MinerMaxVotesPerVoter", 16, is_constant=true) }} validators.

    #### Minimum Active Bond

    The minimum amount of tokens to nominate on Kusama is {{ rpc("kusama", "Staking", "MinimumActiveStake", 5521439075539, is_constant=false, readable="human_readable_kusama") }} 

    #### Minimum Bond to Create a Nomination Pool

    The minimum bond to create a Kusama nomination pool is {{ rpc("kusama", "NominationPools", "MinCreateBond", 5000000000000, is_constant=false, readable="human_readable_kusama") }}.

    #### Minimum Bond to Join a Nomination Pool

    The minimum bond to join a Kusama nomination pool is {{ rpc("kusama", "NominationPools", "MinJoinBond", 10000000000, is_constant=false, readable="human_readable_kusama") }}.

    #### Minimum Bond to Participate in Staking

    The minimum bond to nominate on Kusama is {{ rpc("kusama", "Staking", "MinNominatorBond", 2500000000000, is_constant=false, readable="human_readable_kusama") }} while the minimum amount to join a pool is {{ rpc("kusama", "NominationPools", "MinJoinBond", 10000000000, is_constant=false, readable="human_readable_kusama") }}

    #### Minimum Validator Bond

    To start a validator instance on Kusama, the minimum bond required is {{ rpc("kusama", "Staking", "MinValidatorBond", 0, is_constant=false, readable="human_readable_kusama") }}

    #### Minimum Validator Commission

    The minimum commission a Kusama Validator can set is {{ rpc("kusama", "Staking", "MinCommission", 0, is_constant=false, readable="percentage") }}. [This does not guarantee entry into the active set and earning rewards](../maintain/maintain-guides-how-to-validate-polkadot.md#how-many-dot-do-i-need-to-become-an-active-validator).

    #### Multisig Deposit Base

    The multisig deposit base on Kusama is {{ rpc("kusama", "Multisig", "DepositBase", 200880000000, is_constant=true, readable="human_readable_kusama") }}.

    #### Multisig Deposit Factor

    The multisig deposit factor on Kusama is {{ rpc("kusama", "Multisig", "DepositFactor", 320000000, is_constant=true, readable="human_readable_kusama") }}.

    #### Nomination Pool Max Commission

    The maximum commission that can be set for a Kusama nomination pool is {{ rpc("kusama", "NominationPools", "GlobalMaxCommission", 100000000, is_constant=false, readable="percentage") }}.

    #### Nomination Pool Members

    There are currently {{ rpc("kusama", "NominationPools", "CounterForPoolMembers", 0, is_constant=false) }} members in {{ rpc("kusama", "NominationPools", "LastPoolId", 0, is_constant=false) }} Kusama nomination pools. There is no limit to the number of pools or pool members per pool.

    #### OpenGov Referendum Timeout

    A Kusama referendum is timeout for not submitting the Decision Deposit within {{ rpc("kusama", "Referenda", "UndecidingTimeout", 0, is_constant=true, readable="blocks_to_days") }} days since its creation.

    #### OpenGov Submission Deposit

    A deposit of {{ rpc("kusama", "Referenda", "SubmissionDeposit", 0, is_constant=true, readable="human_readable_kusama") }}is needed to submit a referendum on Kusama.

    #### Parachain ID Registration Deposit

    Reserving a `ParaID` on Kusama requires a deposit of {{ rpc("kusama", "Registrar", "ParaDeposit", 0, is_constant=true, readable="human_readable_kusama") }}.

    #### Parachain Genesis State Registration Deposit

    Registering the genesis state and WASM code of a Kusama parachain requires a deposit {{ rpc("kusama", "Registrar", "DataDepositPerByte", 0, is_constant=true, readable="human_readable_kusama") }} per byte.

    #### Proxy Deposits

    The creation of proxies on Kusama requires a **proxy deposit base** of {{ rpc("kusama", "Proxy", "ProxyDepositBase", 0, is_constant=true, readable="human_readable_kusama") }} and a **proxy deposit factor** of {{ rpc("kusama", "Proxy", "ProxyDepositFactor", 0, is_constant=true, readable="human_readable_kusama") }} that is multiplied by the number of proxies under the same proxied account.

    In case of time-delayed proxies, there is an **announcement deposit base** of {{ rpc("kusama", "Proxy", "AnnouncementDepositBase", 0, is_constant=true, readable="human_readable_kusama") }} for announcing a call and an **announcement deposit factor** of {{ rpc("kusama", "Proxy", "AnnouncementDepositFactor", 0, is_constant=true, readable="human_readable_kusama") }} for each proxy call.

    #### Staking Miner Deposit and Reward

    Staking miners on Kusama are required to reserve a deposit to submit their solutions. The the deposit is the sum of a **signed deposit base** of {{ rpc("kusama", "ElectionProviderMultiPhase", "SignedDepositBase", 0, is_constant=true, readable="human_readable_kusama") }}, a **signed deposit per byte** of {{ rpc("kusama", "ElectionProviderMultiPhase", "SignedDepositByte", 0, is_constant=true, readable="human_readable_kusama") }} (a solution weighing 200KB would yield 200 x 0.00000032551 = 0.000065102), and a **signed deposit weight** set to 0 and has no effect.

    The **signed reward base** on Kusama is {{ rpc("kusama", "ElectionProviderMultiPhase", "SignedRewardBase", 0, is_constant=true, readable="human_readable_kusama") }} which is a fixed amount.

    #### Staking Miner Max Submissions

    The maximum number of submission for a staking miner on Kusama is {{ rpc("kusama", "ElectionProviderMultiPhase", "SignedMaxSubmissions", 0, is_constant=true) }}.

    #### Staking Reward Retention

    Kusama staking rewards are kept available for 84 eras. The following calculation can be used to
    approximate this length in days:

    `84 eras` × `6 hours in a single era` ÷ `24 hours in a day` = `21 days`

    #### Total Issuance

    Kusama's total issuance is {{ rpc("kusama", "Balances", "TotalIssuance", 0, is_constant=false, readable="human_readable_kusama") }} in the era {{ rpc("kusama", "Staking", "CurrentEra", 0, is_constant=false) }}.

    #### Treasury Burn Factor

    At the end of every spending period on Kusama, {{ rpc("kusama", "Treasury", "Burn", 0, is_constant=true, readable="percentage") }} of the available funds are burned.

    #### Treasury Spending Period

    The spending period on Kusama is currently {{ rpc("kusama", "Treasury", "SpendPeriod", 0, is_constant=true, readable="blocks_to_days") }} days.

    #### Unbonding Duration

    The unbonding duration on Kusama is set to {{ rpc("kusama", "Staking", "BondingDuration", 0, is_constant=true, readable="blocks_to_days") }} days. This is
    calculated by taking the **bonding duration** (in eras), multiplying it by the **length of a single
    era** (in hours), and dividing by the **hours in a day** (24). Example: 28 × 6 ÷ 24 = 7 days.

=== "Polkadot Asset Hub"

    #### Asset Deposit

    To reserve an asset on the Polkadot Asset Hub you need a deposit of {{ rpc("polkadot-assethub", "Assets", "AssetDeposit", 100000000000, true, readable="precise_dot") }} and {{ rpc("polkadot-assethub", "Assets", "MetadataDepositBase", 668933304, true, readable="precise_dot") }} for the asset metadata.

    #### Existential Deposit

    The minimum number of tokens to keep an account alive on the Polkadot Asset Hub is {{ rpc("polkadot-assethub", "Balances", "ExistentialDeposit", 100000000, true, readable="precise_dot") }}.

=== "Kusama Asset Hub"

    #### Asset Deposit

    To reserve an asset on the Kusama Asset Hub you need a deposit of {{ rpc("kusama-assethub", "Assets", "AssetDeposit", 100000000000, true, readable="precise_ksm") }} and {{ rpc("kusama-assethub", "Assets", "MetadataDepositBase", 668933304, true, readable="precise_ksm") }} for the asset metadata.

    #### Existential Deposit

    The minimum number of tokens to keep an account alive on the Kusama Asset Hub is {{ rpc("kusama-assethub", "Balances", "ExistentialDeposit", 100000000, true, readable="precise_ksm") }}.

=== "Polkadot People"

    #### Identity Deposit

    The creation of a Polkadot identity required a deposit of {{ rpc("polkadot-people", "Identity", "BasicDeposit", 2001700000, true, readable="precise_dot") }} and {{ rpc("polkadot-people", "Identity", "ByteDeposit", 100000, true, readable="precise_dot") }} (per byte) per each field beyond the legal name.

    #### Sub-identity Deposit

    The creation of a Polkadot sub-identity required a deposit of {{ rpc("polkadot-people", "Identity", "SubAccountDeposit", 2005300000, true, readable="precise_dot") }}.

=== "Kusama People"

    #### Identity Deposit

    The creation of a Kusama identity required a deposit of {{ rpc("kusama-people", "Identity", "BasicDeposit", 6672333321, true, readable="precise_ksm") }} and {{ rpc("kusama-people", "Identity", "ByteDeposit", 333333, true, readable="precise_ksm") }} (per byte) per each field beyond the legal name.

    #### Sub-identity Deposit

    The creation of a Kusama sub-identity required a deposit of {{ rpc("kusama-people", "Identity", "SubAccountDeposit", 6684333309, true, readable="precise_ksm") }}.

<!-- prettier-ignore-end -->