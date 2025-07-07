---
title: Extrinsics
description: Learn about blockchain bridges, their role in cross-chain communication, and trustless designs for secure interoperability.
---


!!!warning "Developer-oriented content"
    The following content is meant for technical / development purposes.

The following sections contain Extrinsics methods are part of the default Substrate runtime. On the api, these are exposed via `api.tx.<module>.<method>`. 

(NOTE: These were generated from a static/snapshot view of a recent default Substrate runtime. Some items may not be available in older nodes, or in any customized implementations.)

---

## alliance
 
### abdicateFellowStatus()
- **interface**: `api.tx.alliance.abdicateFellowStatus`
- **summary**:    Abdicate one's position as a voting member and just be an Ally. May be used by Fellows  who do not want to leave the Alliance but do not have the capacity to participate  operationally for some time. 
 
### addUnscrupulousItems(items: `Vec<PalletAllianceUnscrupulousItem>`)
- **interface**: `api.tx.alliance.addUnscrupulousItems`
- **summary**:    Add accounts or websites to the list of unscrupulous items. 
 
### announce(announcement: `PalletAllianceCid`)
- **interface**: `api.tx.alliance.announce`
- **summary**:    Make an announcement of a new IPFS CID about alliance issues. 
 
### close(proposal_hash: `H256`, index: `Compact<u32>`, proposal_weight_bound: `SpWeightsWeightV2Weight`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.alliance.close`
- **summary**:    Close a vote that is either approved, disapproved, or whose voting period has ended. 

   Must be called by a Fellow. 
 
### disband(witness: `PalletAllianceDisbandWitness`)
- **interface**: `api.tx.alliance.disband`
- **summary**:    Disband the Alliance, remove all active members and unreserve deposits. 

   Witness data must be set. 
 
### elevateAlly(ally: `MultiAddress`)
- **interface**: `api.tx.alliance.elevateAlly`
- **summary**:    Elevate an Ally to Fellow. 
 
### giveRetirementNotice()
- **interface**: `api.tx.alliance.giveRetirementNotice`
- **summary**:    As a member, give a retirement notice and start a retirement period required to pass in  order to retire. 
 
### initMembers(fellows: `Vec<AccountId32>`, allies: `Vec<AccountId32>`)
- **interface**: `api.tx.alliance.initMembers`
- **summary**:    Initialize the Alliance, onboard fellows and allies. 

   The Alliance must be empty, and the call must provide some founding members. 

   Must be called by the Root origin. 
 
### joinAlliance()
- **interface**: `api.tx.alliance.joinAlliance`
- **summary**:    Submit oneself for candidacy. A fixed deposit is reserved. 
 
### kickMember(who: `MultiAddress`)
- **interface**: `api.tx.alliance.kickMember`
- **summary**:    Kick a member from the Alliance and slash its deposit. 
 
### nominateAlly(who: `MultiAddress`)
- **interface**: `api.tx.alliance.nominateAlly`
- **summary**:    A Fellow can nominate someone to join the alliance as an Ally. There is no deposit  required from the nominator or nominee. 
 
### propose(threshold: `Compact<u32>`, proposal: `Call`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.alliance.propose`
- **summary**:    Add a new proposal to be voted on. 

   Must be called by a Fellow. 
 
### removeAnnouncement(announcement: `PalletAllianceCid`)
- **interface**: `api.tx.alliance.removeAnnouncement`
- **summary**:    Remove an announcement. 
 
### removeUnscrupulousItems(items: `Vec<PalletAllianceUnscrupulousItem>`)
- **interface**: `api.tx.alliance.removeUnscrupulousItems`
- **summary**:    Deem some items no longer unscrupulous. 
 
### retire()
- **interface**: `api.tx.alliance.retire`
- **summary**:    As a member, retire from the Alliance and unreserve the deposit. 

   This can only be done once you have called `give_retirement_notice` and the  `RetirementPeriod` has passed. 
 
### setRule(rule: `PalletAllianceCid`)
- **interface**: `api.tx.alliance.setRule`
- **summary**:    Set a new IPFS CID to the alliance rule. 
 
### vote(proposal: `H256`, index: `Compact<u32>`, approve: `bool`)
- **interface**: `api.tx.alliance.vote`
- **summary**:    Add an aye or nay vote for the sender to the given proposal. 

   Must be called by a Fellow. 

___


## allianceMotion
 
### close(proposal_hash: `H256`, index: `Compact<u32>`, proposal_weight_bound: `SpWeightsWeightV2Weight`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.allianceMotion.close`
- **summary**:    Close a vote that is either approved, disapproved or whose voting period has ended. 

   May be called by any signed account in order to finish voting and close the proposal. 

   If called before the end of the voting period it will only close the vote if it is  has enough votes to be approved or disapproved. 

   If called after the end of the voting period abstentions are counted as rejections  unless there is a prime member set and the prime member cast an approval. 

   If the close operation completes successfully with disapproval, the transaction fee will  be waived. Otherwise execution of the approved operation will be charged to the caller. 

   + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed  proposal.  + `length_bound`: The upper bound for the length of the proposal in storage. Checked via  `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length. 

   #### Complexity 

  - `O(B + M + P1 + P2)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` is members-count (code- and governance-bounded)

  - `P1` is the complexity of `proposal` preimage.

  - `P2` is proposal-count (code-bounded)
 
### disapproveProposal(proposal_hash: `H256`)
- **interface**: `api.tx.allianceMotion.disapproveProposal`
- **summary**:    Disapprove a proposal, close, and remove it from the system, regardless of its current  state. 

   Must be called by the Root origin. 

   Parameters: 

  * `proposal_hash`: The hash of the proposal that should be disapproved.

   #### Complexity  O(P) where P is the number of max proposals 
 
### execute(proposal: `Call`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.allianceMotion.execute`
- **summary**:    Dispatch a proposal from a member using the `Member` origin. 

   Origin must be a member of the collective. 

   #### Complexity: 

  - `O(B + M + P)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` members-count (code-bounded)

  - `P` complexity of dispatching `proposal`
 
### kill(proposal_hash: `H256`)
- **interface**: `api.tx.allianceMotion.kill`
- **summary**:    Disapprove the proposal and burn the cost held for storing this proposal. 

   Parameters: 

  - `origin`: must be the `KillOrigin`.

  - `proposal_hash`: The hash of the proposal that should be killed.

   Emits `Killed` and `ProposalCostBurned` if any cost was held for a given proposal. 
 
### propose(threshold: `Compact<u32>`, proposal: `Call`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.allianceMotion.propose`
- **summary**:    Add a new proposal to either be voted on or executed directly. 

   Requires the sender to be member. 

   `threshold` determines whether `proposal` is executed directly (`threshold < 2`)  or put up for voting. 

   #### Complexity 

  - `O(B + M + P1)` or `O(B + M + P2)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` is members-count (code- and governance-bounded)

  - branching is influenced by `threshold` where:

  - `P1` is proposal execution complexity (`threshold < 2`)

  - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
 
### releaseProposalCost(proposal_hash: `H256`)
- **interface**: `api.tx.allianceMotion.releaseProposalCost`
- **summary**:    Release the cost held for storing a proposal once the given proposal is completed. 

   If there is no associated cost for the given proposal, this call will have no effect. 

   Parameters: 

  - `origin`: must be `Signed` or `Root`.

  - `proposal_hash`: The hash of the proposal.

   Emits `ProposalCostReleased` if any cost held for a given proposal. 
 
### setMembers(new_members: `Vec<AccountId32>`, prime: `Option<AccountId32>`, old_count: `u32`)
- **interface**: `api.tx.allianceMotion.setMembers`
- **summary**:    Set the collective's membership. 

   - `new_members`: The new member list. Be nice to the chain and provide it sorted. 

  - `prime`: The prime member whose vote sets the default.

  - `old_count`: The upper bound for the previous number of members in storage. Used for weight estimation. 

   The dispatch of this call must be `SetMembersOrigin`. 

   NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but  the weight estimations rely on it to estimate dispatchable weight. 

   #### WARNING: 

   The `pallet-collective` can also be managed by logic outside of the pallet through the  implementation of the trait [`ChangeMembers`].  Any call to `set_members` must be careful that the member set doesn't get out of sync  with other logic managing the member set. 

   #### Complexity: 

  - `O(MP + N)` where:

  - `M` old-members-count (code- and governance-bounded)

  - `N` new-members-count (code- and governance-bounded)

  - `P` proposals-count (code-bounded)
 
### vote(proposal: `H256`, index: `Compact<u32>`, approve: `bool`)
- **interface**: `api.tx.allianceMotion.vote`
- **summary**:    Add an aye or nay vote for the sender to the given proposal. 

   Requires the sender to be a member. 

   Transaction fees will be waived if the member is voting on any particular proposal  for the first time and the call is successful. Subsequent vote changes will charge a  fee.  #### Complexity 

  - `O(M)` where `M` is members-count (code- and governance-bounded)

___


## assetConversion
 
### addLiquidity(asset1: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, asset2: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, amount1_desired: `u128`, amount2_desired: `u128`, amount1_min: `u128`, amount2_min: `u128`, mint_to: `AccountId32`)
- **interface**: `api.tx.assetConversion.addLiquidity`
- **summary**:    Provide liquidity into the pool of `asset1` and `asset2`.  NOTE: an optimal amount of asset1 and asset2 will be calculated and  might be different than the provided `amount1_desired`/`amount2_desired`  thus you should provide the min amount you're happy to provide.  Params `amount1_min`/`amount2_min` represent that.  `mint_to` will be sent the liquidity tokens that represent this share of the pool. 

   NOTE: when encountering an incorrect exchange rate and non-withdrawable pool liquidity,  batch an atomic call with [`Pallet::add_liquidity`] and  [`Pallet::swap_exact_tokens_for_tokens`] or [`Pallet::swap_tokens_for_exact_tokens`]  calls to render the liquidity withdrawable and rectify the exchange rate. 

   Once liquidity is added, someone may successfully call  [`Pallet::swap_exact_tokens_for_tokens`]. 
 
### createPool(asset1: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, asset2: `FrameSupportTokensFungibleUnionOfNativeOrWithId`)
- **interface**: `api.tx.assetConversion.createPool`
- **summary**:    Creates an empty liquidity pool and an associated new `lp_token` asset  (the id of which is returned in the `Event::PoolCreated` event). 

   Once a pool is created, someone may [`Pallet::add_liquidity`] to it. 
 
### removeLiquidity(asset1: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, asset2: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, lp_token_burn: `u128`, amount1_min_receive: `u128`, amount2_min_receive: `u128`, withdraw_to: `AccountId32`)
- **interface**: `api.tx.assetConversion.removeLiquidity`
- **summary**:    Allows you to remove liquidity by providing the `lp_token_burn` tokens that will be  burned in the process. With the usage of `amount1_min_receive`/`amount2_min_receive`  it's possible to control the min amount of returned tokens you're happy with. 
 
### swapExactTokensForTokens(path: `Vec<FrameSupportTokensFungibleUnionOfNativeOrWithId>`, amount_in: `u128`, amount_out_min: `u128`, send_to: `AccountId32`, keep_alive: `bool`)
- **interface**: `api.tx.assetConversion.swapExactTokensForTokens`
- **summary**:    Swap the exact amount of `asset1` into `asset2`.  `amount_out_min` param allows you to specify the min amount of the `asset2`  you're happy to receive. 

   [`AssetConversionApi::quote_price_exact_tokens_for_tokens`] runtime call can be called  for a quote. 
 
### swapTokensForExactTokens(path: `Vec<FrameSupportTokensFungibleUnionOfNativeOrWithId>`, amount_out: `u128`, amount_in_max: `u128`, send_to: `AccountId32`, keep_alive: `bool`)
- **interface**: `api.tx.assetConversion.swapTokensForExactTokens`
- **summary**:    Swap any amount of `asset1` to get the exact amount of `asset2`.  `amount_in_max` param allows to specify the max amount of the `asset1`  you're happy to provide. 

   [`AssetConversionApi::quote_price_tokens_for_exact_tokens`] runtime call can be called  for a quote. 
 
### touch(asset1: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, asset2: `FrameSupportTokensFungibleUnionOfNativeOrWithId`)
- **interface**: `api.tx.assetConversion.touch`
- **summary**:    Touch an existing pool to fulfill prerequisites before providing liquidity, such as  ensuring that the pool's accounts are in place. It is typically useful when a pool  creator removes the pool's accounts and does not provide a liquidity. This action may  involve holding assets from the caller as a deposit for creating the pool's accounts. 

   The origin must be Signed. 

   - `asset1`: The asset ID of an existing pool with a pair (asset1, asset2). 

  - `asset2`: The asset ID of an existing pool with a pair (asset1, asset2).

   Emits `Touched` event when successful. 

___


## assetConversionMigration
 
### migrateToNewAccount(asset1: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, asset2: `FrameSupportTokensFungibleUnionOfNativeOrWithId`)
- **interface**: `api.tx.assetConversionMigration.migrateToNewAccount`
- **summary**:    Migrates an existing pool to a new account ID derivation method for a given asset pair.  If the migration is successful, transaction fees are refunded to the caller. 

   Must be signed. 

___


## assetRate
 
### create(asset_kind: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, rate: `u128`)
- **interface**: `api.tx.assetRate.create`
- **summary**:    Initialize a conversion rate to native balance for the given asset. 

   #### Complexity 

  - O(1)
 
### remove(asset_kind: `FrameSupportTokensFungibleUnionOfNativeOrWithId`)
- **interface**: `api.tx.assetRate.remove`
- **summary**:    Remove an existing conversion rate to native balance for the given asset. 

   #### Complexity 

  - O(1)
 
### update(asset_kind: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, rate: `u128`)
- **interface**: `api.tx.assetRate.update`
- **summary**:    Update the conversion rate to native balance for the given asset. 

   #### Complexity 

  - O(1)

___


## assetRewards
 
### cleanupPool(pool_id: `u32`)
- **interface**: `api.tx.assetRewards.cleanupPool`
- **summary**:    Cleanup a pool. 

   Origin must be the pool admin. 

   Cleanup storage, release any associated storage cost and return the remaining reward  tokens to the admin. 
 
### createPool(staked_asset_id: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, reward_asset_id: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, reward_rate_per_block: `u128`, expiry: `FrameSupportScheduleDispatchTime`, admin: `Option<AccountId32>`)
- **interface**: `api.tx.assetRewards.createPool`
- **summary**:    Create a new reward pool. 

   Parameters: 

  - `origin`: must be `Config::CreatePoolOrigin`;

  - `staked_asset_id`: the asset to be staked in the pool;

  - `reward_asset_id`: the asset to be distributed as rewards;

  - `reward_rate_per_block`: the amount of reward tokens distributed per block;

  - `expiry`: the block number at which the pool will cease to accumulate rewards. The [`DispatchTime::After`] variant evaluated at the execution time. 

  - `admin`: the account allowed to extend the pool expiration, increase the rewards rate and receive the unutilized reward tokens back after the pool completion. If `None`,  the caller is set as an admin. 
 
### depositRewardTokens(pool_id: `u32`, amount: `u128`)
- **interface**: `api.tx.assetRewards.depositRewardTokens`
- **summary**:    Convenience method to deposit reward tokens into a pool. 

   This method is not strictly necessary (tokens could be transferred directly to the  pool pot address), but is provided for convenience so manual derivation of the  account id is not required. 
 
### harvestRewards(pool_id: `u32`, staker: `Option<AccountId32>`)
- **interface**: `api.tx.assetRewards.harvestRewards`
- **summary**:    Harvest unclaimed pool rewards. 

   Parameters: 

  - origin: must be the `staker` if the pool is still active. Otherwise, any account.

  - pool_id: the pool to harvest from.

  - staker: the account for which to harvest rewards. If `None`, the caller is used.
 
### setPoolAdmin(pool_id: `u32`, new_admin: `AccountId32`)
- **interface**: `api.tx.assetRewards.setPoolAdmin`
- **summary**:    Modify a pool admin. 

   Only the pool admin may perform this operation. 
 
### setPoolExpiryBlock(pool_id: `u32`, new_expiry: `FrameSupportScheduleDispatchTime`)
- **interface**: `api.tx.assetRewards.setPoolExpiryBlock`
- **summary**:    Set when the pool should expire. 

   Currently the expiry block can only be extended. 

   Only the pool admin may perform this operation. 
 
### setPoolRewardRatePerBlock(pool_id: `u32`, new_reward_rate_per_block: `u128`)
- **interface**: `api.tx.assetRewards.setPoolRewardRatePerBlock`
- **summary**:    Modify a pool reward rate. 

   Currently the reward rate can only be increased. 

   Only the pool admin may perform this operation. 
 
### stake(pool_id: `u32`, amount: `u128`)
- **interface**: `api.tx.assetRewards.stake`
- **summary**:    Stake additional tokens in a pool. 

   A freeze is placed on the staked tokens. 
 
### unstake(pool_id: `u32`, amount: `u128`, staker: `Option<AccountId32>`)
- **interface**: `api.tx.assetRewards.unstake`
- **summary**:    Unstake tokens from a pool. 

   Removes the freeze on the staked tokens. 

   Parameters: 

  - origin: must be the `staker` if the pool is still active. Otherwise, any account.

  - pool_id: the pool to unstake from.

  - amount: the amount of tokens to unstake.

  - staker: the account to unstake from. If `None`, the caller is used.

___


## assets
 
### approveTransfer(id: `Compact<u32>`, delegate: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.assets.approveTransfer`
- **summary**:    Approve an amount of asset for transfer by a delegated third-party account. 

   Origin must be Signed. 

   Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account  for the purpose of holding the approval. If some non-zero amount of assets is already  approved from signing account to `delegate`, then it is topped up or unreserved to  meet the right value. 

   NOTE: The signing account does not need to own `amount` of assets at the point of  making this call. 

   - `id`: The identifier of the asset. 

  - `delegate`: The account to delegate permission to transfer asset.

  - `amount`: The amount of asset that may be transferred by `delegate`. If there is already an approval in place, then this acts additively. 

   Emits `ApprovedTransfer` on success. 

   Weight: `O(1)` 
 
### block(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.assets.block`
- **summary**:    Disallow further unprivileged transfers of an asset `id` to and from an account `who`. 

   Origin must be Signed and the sender should be the Freezer of the asset `id`. 

   - `id`: The identifier of the account's asset. 

  - `who`: The account to be unblocked.

   Emits `Blocked`. 

   Weight: `O(1)` 
 
### burn(id: `Compact<u32>`, who: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.assets.burn`
- **summary**:    Reduce the balance of `who` by as much as possible up to `amount` assets of `id`. 

   Origin must be Signed and the sender should be the Manager of the asset `id`. 

   Bails with `NoAccount` if the `who` is already dead. 

   - `id`: The identifier of the asset to have some amount burned. 

  - `who`: The account to be debited from.

  - `amount`: The maximum amount by which `who`'s balance should be reduced.

   Emits `Burned` with the actual amount burned. If this takes the balance to below the  minimum for the asset, then the amount burned is increased to take it to zero. 

   Weight: `O(1)`  Modes: Post-existence of `who`; Pre & post Zombie-status of `who`. 
 
### cancelApproval(id: `Compact<u32>`, delegate: `MultiAddress`)
- **interface**: `api.tx.assets.cancelApproval`
- **summary**:    Cancel all of some asset approved for delegated transfer by a third-party account. 

   Origin must be Signed and there must be an approval in place between signer and  `delegate`. 

   Unreserves any deposit previously reserved by `approve_transfer` for the approval. 

   - `id`: The identifier of the asset. 

  - `delegate`: The account delegated permission to transfer asset.

   Emits `ApprovalCancelled` on success. 

   Weight: `O(1)` 
 
### clearMetadata(id: `Compact<u32>`)
- **interface**: `api.tx.assets.clearMetadata`
- **summary**:    Clear the metadata for an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   Any deposit is freed for the asset owner. 

   - `id`: The identifier of the asset to clear. 

   Emits `MetadataCleared`. 

   Weight: `O(1)` 
 
### create(id: `Compact<u32>`, admin: `MultiAddress`, min_balance: `u128`)
- **interface**: `api.tx.assets.create`
- **summary**:    Issue a new class of fungible assets from a public origin. 

   This new asset class has no assets initially and its owner is the origin. 

   The origin must conform to the configured `CreateOrigin` and have sufficient funds free. 

   Funds of sender are reserved by `AssetDeposit`. 

   Parameters: 

  - `id`: The identifier of the new asset. This must not be currently in use to identify an existing asset. If [`NextAssetId`] is set, then this must be equal to it. 

  - `admin`: The admin of this class of assets. The admin is the initial address of each member of the asset class's admin team. 

  - `min_balance`: The minimum balance of this new asset that any single account must have. If an account's balance is reduced below this, then it collapses to zero. 

   Emits `Created` event when successful. 

   Weight: `O(1)` 
 
### destroyAccounts(id: `Compact<u32>`)
- **interface**: `api.tx.assets.destroyAccounts`
- **summary**:    Destroy all accounts associated with a given asset. 

   `destroy_accounts` should only be called after `start_destroy` has been called, and the  asset is in a `Destroying` state. 

   Due to weight restrictions, this function may need to be called multiple times to fully  destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   Each call emits the `Event::DestroyedAccounts` event. 
 
### destroyApprovals(id: `Compact<u32>`)
- **interface**: `api.tx.assets.destroyApprovals`
- **summary**:    Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit). 

   `destroy_approvals` should only be called after `start_destroy` has been called, and the  asset is in a `Destroying` state. 

   Due to weight restrictions, this function may need to be called multiple times to fully  destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   Each call emits the `Event::DestroyedApprovals` event. 
 
### finishDestroy(id: `Compact<u32>`)
- **interface**: `api.tx.assets.finishDestroy`
- **summary**:    Complete destroying asset and unreserve currency. 

   `finish_destroy` should only be called after `start_destroy` has been called, and the  asset is in a `Destroying` state. All accounts or approvals should be destroyed before  hand. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   Each successful call emits the `Event::Destroyed` event. 
 
### forceAssetStatus(id: `Compact<u32>`, owner: `MultiAddress`, issuer: `MultiAddress`, admin: `MultiAddress`, freezer: `MultiAddress`, min_balance: `Compact<u128>`, is_sufficient: `bool`, is_frozen: `bool`)
- **interface**: `api.tx.assets.forceAssetStatus`
- **summary**:    Alter the attributes of a given asset. 

   Origin must be `ForceOrigin`. 

   - `id`: The identifier of the asset. 

  - `owner`: The new Owner of this asset.

  - `issuer`: The new Issuer of this asset.

  - `admin`: The new Admin of this asset.

  - `freezer`: The new Freezer of this asset.

  - `min_balance`: The minimum balance of this new asset that any single account must have. If an account's balance is reduced below this, then it collapses to zero. 

  - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient value to account for the state bloat associated with its balance storage. If set to  `true`, then non-zero balances may be stored without a `consumer` reference (and thus  an ED in the Balances pallet or whatever else is used to control user-account state  growth). 

  - `is_frozen`: Whether this asset class is frozen except for permissioned/admin instructions. 

   Emits `AssetStatusChanged` with the identity of the asset. 

   Weight: `O(1)` 
 
### forceCancelApproval(id: `Compact<u32>`, owner: `MultiAddress`, delegate: `MultiAddress`)
- **interface**: `api.tx.assets.forceCancelApproval`
- **summary**:    Cancel all of some asset approved for delegated transfer by a third-party account. 

   Origin must be either ForceOrigin or Signed origin with the signer being the Admin  account of the asset `id`. 

   Unreserves any deposit previously reserved by `approve_transfer` for the approval. 

   - `id`: The identifier of the asset. 

  - `delegate`: The account delegated permission to transfer asset.

   Emits `ApprovalCancelled` on success. 

   Weight: `O(1)` 
 
### forceClearMetadata(id: `Compact<u32>`)
- **interface**: `api.tx.assets.forceClearMetadata`
- **summary**:    Clear the metadata for an asset. 

   Origin must be ForceOrigin. 

   Any deposit is returned. 

   - `id`: The identifier of the asset to clear. 

   Emits `MetadataCleared`. 

   Weight: `O(1)` 
 
### forceCreate(id: `Compact<u32>`, owner: `MultiAddress`, is_sufficient: `bool`, min_balance: `Compact<u128>`)
- **interface**: `api.tx.assets.forceCreate`
- **summary**:    Issue a new class of fungible assets from a privileged origin. 

   This new asset class has no assets initially. 

   The origin must conform to `ForceOrigin`. 

   Unlike `create`, no funds are reserved. 

   - `id`: The identifier of the new asset. This must not be currently in use to identify  an existing asset. If [`NextAssetId`] is set, then this must be equal to it. 

  - `owner`: The owner of this class of assets. The owner has full superuser permissions over this asset, but may later change and configure the permissions using  `transfer_ownership` and `set_team`. 

  - `min_balance`: The minimum balance of this new asset that any single account must have. If an account's balance is reduced below this, then it collapses to zero. 

   Emits `ForceCreated` event when successful. 

   Weight: `O(1)` 
 
### forceSetMetadata(id: `Compact<u32>`, name: `Bytes`, symbol: `Bytes`, decimals: `u8`, is_frozen: `bool`)
- **interface**: `api.tx.assets.forceSetMetadata`
- **summary**:    Force the metadata for an asset to some value. 

   Origin must be ForceOrigin. 

   Any deposit is left alone. 

   - `id`: The identifier of the asset to update. 

  - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.

  - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.

  - `decimals`: The number of decimals this asset uses to represent one unit.

   Emits `MetadataSet`. 

   Weight: `O(N + S)` where N and S are the length of the name and symbol respectively. 
 
### forceTransfer(id: `Compact<u32>`, source: `MultiAddress`, dest: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.assets.forceTransfer`
- **summary**:    Move some assets from one account to another. 

   Origin must be Signed and the sender should be the Admin of the asset `id`. 

   - `id`: The identifier of the asset to have some amount transferred. 

  - `source`: The account to be debited.

  - `dest`: The account to be credited.

  - `amount`: The amount by which the `source`'s balance of assets should be reduced and `dest`'s balance increased. The amount actually transferred may be slightly greater in  the case that the transfer would otherwise take the `source` balance above zero but  below the minimum balance. Must be greater than zero. 

   Emits `Transferred` with the actual amount transferred. If this takes the source balance  to below the minimum for the asset, then the amount transferred is increased to take it  to zero. 

   Weight: `O(1)`  Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of  `dest`. 
 
### freeze(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.assets.freeze`
- **summary**:    Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`  must already exist as an entry in `Account`s of the asset. If you want to freeze an  account that does not have an entry, use `touch_other` first. 

   Origin must be Signed and the sender should be the Freezer of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

  - `who`: The account to be frozen.

   Emits `Frozen`. 

   Weight: `O(1)` 
 
### freezeAsset(id: `Compact<u32>`)
- **interface**: `api.tx.assets.freezeAsset`
- **summary**:    Disallow further unprivileged transfers for the asset class. 

   Origin must be Signed and the sender should be the Freezer of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

   Emits `Frozen`. 

   Weight: `O(1)` 
 
### mint(id: `Compact<u32>`, beneficiary: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.assets.mint`
- **summary**:    Mint assets of a particular class. 

   The origin must be Signed and the sender must be the Issuer of the asset `id`. 

   - `id`: The identifier of the asset to have some amount minted. 

  - `beneficiary`: The account to be credited with the minted assets.

  - `amount`: The amount of the asset to be minted.

   Emits `Issued` event when successful. 

   Weight: `O(1)`  Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`. 
 
### refund(id: `Compact<u32>`, allow_burn: `bool`)
- **interface**: `api.tx.assets.refund`
- **summary**:    Return the deposit (if any) of an asset account or a consumer reference (if any) of an  account. 

   The origin must be Signed. 

   - `id`: The identifier of the asset for which the caller would like the deposit  refunded. 

  - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.

   It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if  the asset account contains holds or freezes in place. 

   Emits `Refunded` event when successful. 
 
### refundOther(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.assets.refundOther`
- **summary**:    Return the deposit (if any) of a target asset account. Useful if you are the depositor. 

   The origin must be Signed and either the account owner, depositor, or asset `Admin`. In  order to burn a non-zero balance of the asset, the caller must be the account and should  use `refund`. 

   - `id`: The identifier of the asset for the account holding a deposit. 

  - `who`: The account to refund.

   It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if  the asset account contains holds or freezes in place. 

   Emits `Refunded` event when successful. 
 
### setMetadata(id: `Compact<u32>`, name: `Bytes`, symbol: `Bytes`, decimals: `u8`)
- **interface**: `api.tx.assets.setMetadata`
- **summary**:    Set the metadata for an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   Funds of sender are reserved according to the formula:  `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into  account any already reserved funds. 

   - `id`: The identifier of the asset to update. 

  - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.

  - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.

  - `decimals`: The number of decimals this asset uses to represent one unit.

   Emits `MetadataSet`. 

   Weight: `O(1)` 
 
### setMinBalance(id: `Compact<u32>`, min_balance: `u128`)
- **interface**: `api.tx.assets.setMinBalance`
- **summary**:    Sets the minimum balance of an asset. 

   Only works if there aren't any accounts that are holding the asset or if  the new value of `min_balance` is less than the old one. 

   Origin must be Signed and the sender has to be the Owner of the  asset `id`. 

   - `id`: The identifier of the asset. 

  - `min_balance`: The new value of `min_balance`.

   Emits `AssetMinBalanceChanged` event when successful. 
 
### setTeam(id: `Compact<u32>`, issuer: `MultiAddress`, admin: `MultiAddress`, freezer: `MultiAddress`)
- **interface**: `api.tx.assets.setTeam`
- **summary**:    Change the Issuer, Admin and Freezer of an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

  - `issuer`: The new Issuer of this asset.

  - `admin`: The new Admin of this asset.

  - `freezer`: The new Freezer of this asset.

   Emits `TeamChanged`. 

   Weight: `O(1)` 
 
### startDestroy(id: `Compact<u32>`)
- **interface**: `api.tx.assets.startDestroy`
- **summary**:    Start the process of destroying a fungible asset class. 

   `start_destroy` is the first in a series of extrinsics that should be called, to allow  destruction of an asset class. 

   The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if  an account contains holds or freezes in place. 
 
### thaw(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.assets.thaw`
- **summary**:    Allow unprivileged transfers to and from an account again. 

   Origin must be Signed and the sender should be the Admin of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

  - `who`: The account to be unfrozen.

   Emits `Thawed`. 

   Weight: `O(1)` 
 
### thawAsset(id: `Compact<u32>`)
- **interface**: `api.tx.assets.thawAsset`
- **summary**:    Allow unprivileged transfers for the asset again. 

   Origin must be Signed and the sender should be the Admin of the asset `id`. 

   - `id`: The identifier of the asset to be thawed. 

   Emits `Thawed`. 

   Weight: `O(1)` 
 
### touch(id: `Compact<u32>`)
- **interface**: `api.tx.assets.touch`
- **summary**:    Create an asset account for non-provider assets. 

   A deposit will be taken from the signer account. 

   - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit  to be taken. 

  - `id`: The identifier of the asset for the account to be created.

   Emits `Touched` event when successful. 
 
### touchOther(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.assets.touchOther`
- **summary**:    Create an asset account for `who`. 

   A deposit will be taken from the signer account. 

   - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account  must have sufficient funds for a deposit to be taken. 

  - `id`: The identifier of the asset for the account to be created.

  - `who`: The account to be created.

   Emits `Touched` event when successful. 
 
### transfer(id: `Compact<u32>`, target: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.assets.transfer`
- **summary**:    Move some assets from the sender account to another. 

   Origin must be Signed. 

   - `id`: The identifier of the asset to have some amount transferred. 

  - `target`: The account to be credited.

  - `amount`: The amount by which the sender's balance of assets should be reduced and `target`'s balance increased. The amount actually transferred may be slightly greater in  the case that the transfer would otherwise take the sender balance above zero but below  the minimum balance. Must be greater than zero. 

   Emits `Transferred` with the actual amount transferred. If this takes the source balance  to below the minimum for the asset, then the amount transferred is increased to take it  to zero. 

   Weight: `O(1)`  Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of  `target`. 
 
### transferAll(id: `Compact<u32>`, dest: `MultiAddress`, keep_alive: `bool`)
- **interface**: `api.tx.assets.transferAll`
- **summary**:    Transfer the entire transferable balance from the caller asset account. 

   NOTE: This function only attempts to transfer _transferable_ balances. This means that  any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be  transferred by this function. To ensure that this function results in a killed account,  you might need to prepare the account by removing any reference counters, storage  deposits, etc... 

   The dispatch origin of this call must be Signed. 

   - `id`: The identifier of the asset for the account holding a deposit. 

  - `dest`: The recipient of the transfer.

  - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all of the funds the asset account has, causing the sender asset account to be killed  (false), or transfer everything except at least the minimum balance, which will  guarantee to keep the sender asset account alive (true). 
 
### transferApproved(id: `Compact<u32>`, owner: `MultiAddress`, destination: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.assets.transferApproved`
- **summary**:    Transfer some asset balance from a previously delegated account to some third-party  account. 

   Origin must be Signed and there must be an approval in place by the `owner` to the  signer. 

   If the entire amount approved for transfer is transferred, then any deposit previously  reserved by `approve_transfer` is unreserved. 

   - `id`: The identifier of the asset. 

  - `owner`: The account which previously approved for a transfer of at least `amount` and from which the asset balance will be withdrawn. 

  - `destination`: The account to which the asset balance of `amount` will be transferred.

  - `amount`: The amount of assets to transfer.

   Emits `TransferredApproved` on success. 

   Weight: `O(1)` 
 
### transferKeepAlive(id: `Compact<u32>`, target: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.assets.transferKeepAlive`
- **summary**:    Move some assets from the sender account to another, keeping the sender account alive. 

   Origin must be Signed. 

   - `id`: The identifier of the asset to have some amount transferred. 

  - `target`: The account to be credited.

  - `amount`: The amount by which the sender's balance of assets should be reduced and `target`'s balance increased. The amount actually transferred may be slightly greater in  the case that the transfer would otherwise take the sender balance above zero but below  the minimum balance. Must be greater than zero. 

   Emits `Transferred` with the actual amount transferred. If this takes the source balance  to below the minimum for the asset, then the amount transferred is increased to take it  to zero. 

   Weight: `O(1)`  Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of  `target`. 
 
### transferOwnership(id: `Compact<u32>`, owner: `MultiAddress`)
- **interface**: `api.tx.assets.transferOwnership`
- **summary**:    Change the Owner of an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   - `id`: The identifier of the asset. 

  - `owner`: The new Owner of this asset.

   Emits `OwnerChanged`. 

   Weight: `O(1)` 

___


## babe
 
### planConfigChange(config: `SpConsensusBabeDigestsNextConfigDescriptor`)
- **interface**: `api.tx.babe.planConfigChange`
- **summary**:    Plan an epoch config change. The epoch config change is recorded and will be enacted on  the next call to `enact_epoch_change`. The config will be activated one epoch after.  Multiple calls to this method will replace any existing planned config change that had  not been enacted yet. 
 
### reportEquivocation(equivocation_proof: `SpConsensusSlotsEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.babe.reportEquivocation`
- **summary**:    Report authority equivocation/misbehavior. This method will verify  the equivocation proof and validate the given key ownership proof  against the extracted offender. If both are valid, the offence will  be reported. 
 
### reportEquivocationUnsigned(equivocation_proof: `SpConsensusSlotsEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.babe.reportEquivocationUnsigned`
- **summary**:    Report authority equivocation/misbehavior. This method will verify  the equivocation proof and validate the given key ownership proof  against the extracted offender. If both are valid, the offence will  be reported.  This extrinsic must be called unsigned and it is expected that only  block authors will call it (validated in `ValidateUnsigned`), as such  if the block author is defined it will be defined as the equivocation  reporter. 

___


## balances
 
### burn(value: `Compact<u128>`, keep_alive: `bool`)
- **interface**: `api.tx.balances.burn`
- **summary**:    Burn the specified liquid free balance from the origin account. 

   If the origin's account ends up below the existential deposit as a result  of the burn and `keep_alive` is false, the account will be reaped. 

   Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,  this `burn` operation will reduce total issuance by the amount _burned_. 
 
### forceAdjustTotalIssuance(direction: `PalletBalancesAdjustmentDirection`, delta: `Compact<u128>`)
- **interface**: `api.tx.balances.forceAdjustTotalIssuance`
- **summary**:    Adjust the total issuance in a saturating way. 

   Can only be called by root and always needs a positive `delta`. 

   #### Example 
 
### forceSetBalance(who: `MultiAddress`, new_free: `Compact<u128>`)
- **interface**: `api.tx.balances.forceSetBalance`
- **summary**:    Set the regular balance of a given account. 

   The dispatch origin for this call is `root`. 
 
### forceTransfer(source: `MultiAddress`, dest: `MultiAddress`, value: `Compact<u128>`)
- **interface**: `api.tx.balances.forceTransfer`
- **summary**:    Exactly as `transfer_allow_death`, except the origin must be root and the source account  may be specified. 
 
### forceUnreserve(who: `MultiAddress`, amount: `u128`)
- **interface**: `api.tx.balances.forceUnreserve`
- **summary**:    Unreserve some balance from a user by force. 

   Can only be called by ROOT. 
 
### transferAll(dest: `MultiAddress`, keep_alive: `bool`)
- **interface**: `api.tx.balances.transferAll`
- **summary**:    Transfer the entire transferable balance from the caller account. 

   NOTE: This function only attempts to transfer _transferable_ balances. This means that  any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be  transferred by this function. To ensure that this function results in a killed account,  you might need to prepare the account by removing any reference counters, storage  deposits, etc... 

   The dispatch origin of this call must be Signed. 

   - `dest`: The recipient of the transfer. 

  - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all of the funds the account has, causing the sender account to be killed (false), or  transfer everything except at least the existential deposit, which will guarantee to  keep the sender account alive (true). 
 
### transferAllowDeath(dest: `MultiAddress`, value: `Compact<u128>`)
- **interface**: `api.tx.balances.transferAllowDeath`
- **summary**:    Transfer some liquid free balance to another account. 

   `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.  If the sender's account is below the existential deposit as a result  of the transfer, the account will be reaped. 

   The dispatch origin for this call must be `Signed` by the transactor. 
 
### transferKeepAlive(dest: `MultiAddress`, value: `Compact<u128>`)
- **interface**: `api.tx.balances.transferKeepAlive`
- **summary**:    Same as the [`transfer_allow_death`] call, but with a check that the transfer will not  kill the origin account. 

   99% of the time you want [`transfer_allow_death`] instead. 

   [`transfer_allow_death`]: struct.Pallet.html#method.transfer 
 
### upgradeAccounts(who: `Vec<AccountId32>`)
- **interface**: `api.tx.balances.upgradeAccounts`
- **summary**:    Upgrade a specified account. 

   - `origin`: Must be `Signed`. 

  - `who`: The account to be upgraded.

   This will waive the transaction fee if at least all but 10% of the accounts needed to  be upgraded. (We let some not have to be upgraded just in order to allow for the  possibility of churn). 

___


## beefy
 
### reportDoubleVoting(equivocation_proof: `SpConsensusBeefyDoubleVotingProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.beefy.reportDoubleVoting`
- **summary**:    Report voter equivocation/misbehavior. This method will verify the  equivocation proof and validate the given key ownership proof  against the extracted offender. If both are valid, the offence  will be reported. 
 
### reportDoubleVotingUnsigned(equivocation_proof: `SpConsensusBeefyDoubleVotingProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.beefy.reportDoubleVotingUnsigned`
- **summary**:    Report voter equivocation/misbehavior. This method will verify the  equivocation proof and validate the given key ownership proof  against the extracted offender. If both are valid, the offence  will be reported. 

   This extrinsic must be called unsigned and it is expected that only  block authors will call it (validated in `ValidateUnsigned`), as such  if the block author is defined it will be defined as the equivocation  reporter. 
 
### reportForkVoting(equivocation_proof: `SpConsensusBeefyForkVotingProofAncestryProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.beefy.reportForkVoting`
- **summary**:    Report fork voting equivocation. This method will verify the equivocation proof  and validate the given key ownership proof against the extracted offender.  If both are valid, the offence will be reported. 
 
### reportForkVotingUnsigned(equivocation_proof: `SpConsensusBeefyForkVotingProofAncestryProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.beefy.reportForkVotingUnsigned`
- **summary**:    Report fork voting equivocation. This method will verify the equivocation proof  and validate the given key ownership proof against the extracted offender.  If both are valid, the offence will be reported. 

   This extrinsic must be called unsigned and it is expected that only  block authors will call it (validated in `ValidateUnsigned`), as such  if the block author is defined it will be defined as the equivocation  reporter. 
 
### reportFutureBlockVoting(equivocation_proof: `SpConsensusBeefyFutureBlockVotingProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.beefy.reportFutureBlockVoting`
- **summary**:    Report future block voting equivocation. This method will verify the equivocation proof  and validate the given key ownership proof against the extracted offender.  If both are valid, the offence will be reported. 
 
### reportFutureBlockVotingUnsigned(equivocation_proof: `SpConsensusBeefyFutureBlockVotingProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.beefy.reportFutureBlockVotingUnsigned`
- **summary**:    Report future block voting equivocation. This method will verify the equivocation proof  and validate the given key ownership proof against the extracted offender.  If both are valid, the offence will be reported. 

   This extrinsic must be called unsigned and it is expected that only  block authors will call it (validated in `ValidateUnsigned`), as such  if the block author is defined it will be defined as the equivocation  reporter. 
 
### setNewGenesis(delay_in_blocks: `u32`)
- **interface**: `api.tx.beefy.setNewGenesis`
- **summary**:    Reset BEEFY consensus by setting a new BEEFY genesis at `delay_in_blocks` blocks in the  future. 

   Note: `delay_in_blocks` has to be at least 1. 

___


## bounties
 
### acceptCurator(bounty_id: `Compact<u32>`)
- **interface**: `api.tx.bounties.acceptCurator`
- **summary**:    Accept the curator role for a bounty.  A deposit will be reserved from curator and refund upon successful payout. 

   May only be called from the curator. 

   #### Complexity 

  - O(1).
 
### approveBounty(bounty_id: `Compact<u32>`)
- **interface**: `api.tx.bounties.approveBounty`
- **summary**:    Approve a bounty proposal. At a later time, the bounty will be funded and become active  and the original deposit will be returned. 

   May only be called from `T::SpendOrigin`. 

   #### Complexity 

  - O(1).
 
### approveBountyWithCurator(bounty_id: `Compact<u32>`, curator: `MultiAddress`, fee: `Compact<u128>`)
- **interface**: `api.tx.bounties.approveBountyWithCurator`
- **summary**:    Approve bountry and propose a curator simultaneously.  This call is a shortcut to calling `approve_bounty` and `propose_curator` separately. 

   May only be called from `T::SpendOrigin`. 

   - `bounty_id`: Bounty ID to approve. 

  - `curator`: The curator account whom will manage this bounty.

  - `fee`: The curator fee.

   #### Complexity 

  - O(1).
 
### awardBounty(bounty_id: `Compact<u32>`, beneficiary: `MultiAddress`)
- **interface**: `api.tx.bounties.awardBounty`
- **summary**:    Award bounty to a beneficiary account. The beneficiary will be able to claim the funds  after a delay. 

   The dispatch origin for this call must be the curator of this bounty. 

   - `bounty_id`: Bounty ID to award. 

  - `beneficiary`: The beneficiary account whom will receive the payout.

   #### Complexity 

  - O(1).
 
### claimBounty(bounty_id: `Compact<u32>`)
- **interface**: `api.tx.bounties.claimBounty`
- **summary**:    Claim the payout from an awarded bounty after payout delay. 

   The dispatch origin for this call must be the beneficiary of this bounty. 

   - `bounty_id`: Bounty ID to claim. 

   #### Complexity 

  - O(1).
 
### closeBounty(bounty_id: `Compact<u32>`)
- **interface**: `api.tx.bounties.closeBounty`
- **summary**:    Cancel a proposed or active bounty. All the funds will be sent to treasury and  the curator deposit will be unreserved if possible. 

   Only `T::RejectOrigin` is able to cancel a bounty. 

   - `bounty_id`: Bounty ID to cancel. 

   #### Complexity 

  - O(1).
 
### extendBountyExpiry(bounty_id: `Compact<u32>`, remark: `Bytes`)
- **interface**: `api.tx.bounties.extendBountyExpiry`
- **summary**:    Extend the expiry time of an active bounty. 

   The dispatch origin for this call must be the curator of this bounty. 

   - `bounty_id`: Bounty ID to extend. 

  - `remark`: additional information.

   #### Complexity 

  - O(1).
 
### proposeBounty(value: `Compact<u128>`, description: `Bytes`)
- **interface**: `api.tx.bounties.proposeBounty`
- **summary**:    Propose a new bounty. 

   The dispatch origin for this call must be _Signed_. 

   Payment: `TipReportDepositBase` will be reserved from the origin account, as well as  `DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,  or slashed when rejected. 

   - `curator`: The curator account whom will manage this bounty. 

  - `fee`: The curator fee.

  - `value`: The total payment amount of this bounty, curator fee included.

  - `description`: The description of this bounty.
 
### proposeCurator(bounty_id: `Compact<u32>`, curator: `MultiAddress`, fee: `Compact<u128>`)
- **interface**: `api.tx.bounties.proposeCurator`
- **summary**:    Propose a curator to a funded bounty. 

   May only be called from `T::SpendOrigin`. 

   #### Complexity 

  - O(1).
 
### unassignCurator(bounty_id: `Compact<u32>`)
- **interface**: `api.tx.bounties.unassignCurator`
- **summary**:    Unassign curator from a bounty. 

   This function can only be called by the `RejectOrigin` a signed origin. 

   If this function is called by the `RejectOrigin`, we assume that the curator is  malicious or inactive. As a result, we will slash the curator when possible. 

   If the origin is the curator, we take this as a sign they are unable to do their job and  they willingly give up. We could slash them, but for now we allow them to recover their  deposit and exit without issue. (We may want to change this if it is abused.) 

   Finally, the origin can be anyone if and only if the curator is "inactive". This allows  anyone in the community to call out that a curator is not doing their due diligence, and  we should pick a new curator. In this case the curator should also be slashed. 

   #### Complexity 

  - O(1).

___


## broker
 
### assign(region_id: `PalletBrokerRegionId`, task: `u32`, finality: `PalletBrokerFinality`)
- **interface**: `api.tx.broker.assign`
- **summary**:    Assign a Bulk Coretime Region to a task. 

   - `origin`: Must be a Signed origin of the account which owns the Region `region_id`. 

  - `region_id`: The Region which should be assigned to the task.

  - `task`: The task to assign.

  - `finality`: Indication of whether this assignment is final (in which case it may be eligible for renewal) or provisional (in which case it may be manipulated and/or  reassigned at a later stage). 
 
### claimRevenue(region_id: `PalletBrokerRegionId`, max_timeslices: `u32`)
- **interface**: `api.tx.broker.claimRevenue`
- **summary**:    Claim the revenue owed from inclusion in the Instantaneous Coretime Pool. 

   - `origin`: Must be a Signed origin. 

  - `region_id`: The Region which was assigned to the Pool.

  - `max_timeslices`: The maximum number of timeslices which should be processed. This must be greater than 0. This may affect the weight of the call but should be ideally  made equivalent to the length of the Region `region_id`. If less, further dispatches  will be required with the same `region_id` to claim revenue for the remainder. 
 
### configure(config: `PalletBrokerConfigRecord`)
- **interface**: `api.tx.broker.configure`
- **summary**:    Configure the pallet. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `config`: The configuration for this pallet.
 
### disableAutoRenew(core: `u16`, task: `u32`)
- **interface**: `api.tx.broker.disableAutoRenew`
- **summary**:    Extrinsic for disabling auto renewal. 

   Callable by the sovereign account of the task on the specified core. 

   - `origin`: Must be the sovereign account of the task. 

  - `core`: The core for which we want to disable auto renewal.

  - `task`: The task for which we want to disable auto renewal.
 
### dropContribution(region_id: `PalletBrokerRegionId`)
- **interface**: `api.tx.broker.dropContribution`
- **summary**:    Drop an expired Instantaneous Pool Contribution record from the chain. 

   - `origin`: Can be any kind of origin. 

  - `region_id`: The Region identifying the Pool Contribution which has expired.
 
### dropHistory(when: `u32`)
- **interface**: `api.tx.broker.dropHistory`
- **summary**:    Drop an expired Instantaneous Pool History record from the chain. 

   - `origin`: Can be any kind of origin. 

  - `region_id`: The time of the Pool History record which has expired.
 
### dropRegion(region_id: `PalletBrokerRegionId`)
- **interface**: `api.tx.broker.dropRegion`
- **summary**:    Drop an expired Region from the chain. 

   - `origin`: Can be any kind of origin. 

  - `region_id`: The Region which has expired.
 
### dropRenewal(core: `u16`, when: `u32`)
- **interface**: `api.tx.broker.dropRenewal`
- **summary**:    Drop an expired Allowed Renewal record from the chain. 

   - `origin`: Can be any kind of origin. 

  - `core`: The core to which the expired renewal refers.

  - `when`: The timeslice to which the expired renewal refers. This must have passed.
 
### enableAutoRenew(core: `u16`, task: `u32`, workload_end_hint: `Option<u32>`)
- **interface**: `api.tx.broker.enableAutoRenew`
- **summary**:    Extrinsic for enabling auto renewal. 

   Callable by the sovereign account of the task on the specified core. This account  will be charged at the start of every bulk period for renewing core time. 

   - `origin`: Must be the sovereign account of the task 

  - `core`: The core to which the task to be renewed is currently assigned.

  - `task`: The task for which we want to enable auto renewal.

  - `workload_end_hint`: should be used when enabling auto-renewal for a core that is not expiring in the upcoming bulk period (e.g., due to holding a lease) since it would be  inefficient to look up when the core expires to schedule the next renewal. 
 
### forceReserve(workload: `Vec<PalletBrokerScheduleItem>`, core: `u16`)
- **interface**: `api.tx.broker.forceReserve`
- **summary**:    Reserve a core for a workload immediately. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `workload`: The workload which should be permanently placed on a core starting immediately. 

  - `core`: The core to which the assignment should be made until the reservation takes effect. It is left to the caller to either add this new core or reassign any other  tasks to this existing core. 

   This reserves the workload and then injects the workload into the Workplan for the next  two sale periods. This overwrites any existing assignments for this core at the start of  the next sale period. 
 
### interlace(region_id: `PalletBrokerRegionId`, pivot: `PalletBrokerCoreMask`)
- **interface**: `api.tx.broker.interlace`
- **summary**:    Split a Bulk Coretime Region into two wholly-overlapping Regions with complementary  interlace masks which together make up the original Region's interlace mask. 

   - `origin`: Must be a Signed origin of the account which owns the Region `region_id`. 

  - `region_id`: The Region which should become two interlaced Regions of incomplete regularity. 

  - `pivot`: The interlace mask of one of the two new regions (the other is its partial complement). 
 
### notifyCoreCount(core_count: `u16`)
- **interface**: `api.tx.broker.notifyCoreCount`
 
### notifyRevenue(revenue: `PalletBrokerOnDemandRevenueRecord`)
- **interface**: `api.tx.broker.notifyRevenue`
 
### partition(region_id: `PalletBrokerRegionId`, pivot: `u32`)
- **interface**: `api.tx.broker.partition`
- **summary**:    Split a Bulk Coretime Region into two non-overlapping Regions at a particular time into  the region. 

   - `origin`: Must be a Signed origin of the account which owns the Region `region_id`. 

  - `region_id`: The Region which should be partitioned into two non-overlapping Regions.

  - `pivot`: The offset in time into the Region at which to make the split.
 
### pool(region_id: `PalletBrokerRegionId`, payee: `AccountId32`, finality: `PalletBrokerFinality`)
- **interface**: `api.tx.broker.pool`
- **summary**:    Place a Bulk Coretime Region into the Instantaneous Coretime Pool. 

   - `origin`: Must be a Signed origin of the account which owns the Region `region_id`. 

  - `region_id`: The Region which should be assigned to the Pool.

  - `payee`: The account which is able to collect any revenue due for the usage of this Coretime. 
 
### purchase(price_limit: `u128`)
- **interface**: `api.tx.broker.purchase`
- **summary**:    Purchase Bulk Coretime in the ongoing Sale. 

   - `origin`: Must be a Signed origin with at least enough funds to pay the current price  of Bulk Coretime. 

  - `price_limit`: An amount no more than which should be paid.
 
### purchaseCredit(amount: `u128`, beneficiary: `AccountId32`)
- **interface**: `api.tx.broker.purchaseCredit`
- **summary**:    Purchase credit for use in the Instantaneous Coretime Pool. 

   - `origin`: Must be a Signed origin able to pay at least `amount`. 

  - `amount`: The amount of credit to purchase.

  - `beneficiary`: The account on the Relay-chain which controls the credit (generally this will be the collator's hot wallet). 
 
### removeAssignment(region_id: `PalletBrokerRegionId`)
- **interface**: `api.tx.broker.removeAssignment`
- **summary**:    Remove an assignment from the Workplan. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `region_id`: The Region to be removed from the workplan.
 
### removeLease(task: `u32`)
- **interface**: `api.tx.broker.removeLease`
- **summary**:    Remove a lease. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `task`: The task id of the lease which should be removed.
 
### renew(core: `u16`)
- **interface**: `api.tx.broker.renew`
- **summary**:    Renew Bulk Coretime in the ongoing Sale or its prior Interlude Period. 

   - `origin`: Must be a Signed origin with at least enough funds to pay the renewal price  of the core. 

  - `core`: The core which should be renewed.
 
### requestCoreCount(core_count: `u16`)
- **interface**: `api.tx.broker.requestCoreCount`
- **summary**:    Request a change to the number of cores available for scheduling work. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `core_count`: The desired number of cores to be made available.
 
### reserve(workload: `Vec<PalletBrokerScheduleItem>`)
- **interface**: `api.tx.broker.reserve`
- **summary**:    Reserve a core for a workload. 

   The workload will be given a reservation, but two sale period boundaries must pass  before the core is actually assigned. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `workload`: The workload which should be permanently placed on a core.
 
### setLease(task: `u32`, until: `u32`)
- **interface**: `api.tx.broker.setLease`
- **summary**:    Reserve a core for a single task workload for a limited period. 

   In the interlude and sale period where Bulk Coretime is sold for the period immediately  after `until`, then the same workload may be renewed. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `task`: The workload which should be placed on a core.

  - `until`: The timeslice now earlier than which `task` should be placed as a workload on a core. 
 
### startSales(end_price: `u128`, extra_cores: `u16`)
- **interface**: `api.tx.broker.startSales`
- **summary**:    Begin the Bulk Coretime sales rotation. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `end_price`: The price after the leadin period of Bulk Coretime in the first sale.

  - `extra_cores`: Number of extra cores that should be requested on top of the cores required for `Reservations` and `Leases`. 

   This will call [`Self::request_core_count`] internally to set the correct core count on  the relay chain. 
 
### swapLeases(id: `u32`, other: `u32`)
- **interface**: `api.tx.broker.swapLeases`
 
### transfer(region_id: `PalletBrokerRegionId`, new_owner: `AccountId32`)
- **interface**: `api.tx.broker.transfer`
- **summary**:    Transfer a Bulk Coretime Region to a new owner. 

   - `origin`: Must be a Signed origin of the account which owns the Region `region_id`. 

  - `region_id`: The Region whose ownership should change.

  - `new_owner`: The new owner for the Region.
 
### unreserve(item_index: `u32`)
- **interface**: `api.tx.broker.unreserve`
- **summary**:    Cancel a reservation for a workload. 

   - `origin`: Must be Root or pass `AdminOrigin`. 

  - `item_index`: The index of the reservation. Usually this will also be the index of the core on which the reservation has been scheduled. However, it is possible that if  other cores are reserved or unreserved in the same sale rotation that they won't  correspond, so it's better to look up the core properly in the `Reservations` storage. 

___


## childBounties
 
### acceptCurator(parent_bounty_id: `Compact<u32>`, child_bounty_id: `Compact<u32>`)
- **interface**: `api.tx.childBounties.acceptCurator`
- **summary**:    Accept the curator role for the child-bounty. 

   The dispatch origin for this call must be the curator of this  child-bounty. 

   A deposit will be reserved from the curator and refund upon  successful payout or cancellation. 

   Fee for curator is deducted from curator fee of parent bounty. 

   Parent bounty must be in active state, for this child-bounty call to  work. 

   Child-bounty must be in "CuratorProposed" state, for processing the  call. And state of child-bounty is moved to "Active" on successful  call completion. 

   - `parent_bounty_id`: Index of parent bounty. 

  - `child_bounty_id`: Index of child bounty.
 
### addChildBounty(parent_bounty_id: `Compact<u32>`, value: `Compact<u128>`, description: `Bytes`)
- **interface**: `api.tx.childBounties.addChildBounty`
- **summary**:    Add a new child-bounty. 

   The dispatch origin for this call must be the curator of parent  bounty and the parent bounty must be in "active" state. 

   Child-bounty gets added successfully & fund gets transferred from  parent bounty to child-bounty account, if parent bounty has enough  funds, else the call fails. 

   Upper bound to maximum number of active  child bounties that can be  added are managed via runtime trait config  [`Config::MaxActiveChildBountyCount`]. 

   If the call is success, the status of child-bounty is updated to  "Added". 

   - `parent_bounty_id`: Index of parent bounty for which child-bounty is being added. 

  - `value`: Value for executing the proposal.

  - `description`: Text description for the child-bounty.
 
### awardChildBounty(parent_bounty_id: `Compact<u32>`, child_bounty_id: `Compact<u32>`, beneficiary: `MultiAddress`)
- **interface**: `api.tx.childBounties.awardChildBounty`
- **summary**:    Award child-bounty to a beneficiary. 

   The beneficiary will be able to claim the funds after a delay. 

   The dispatch origin for this call must be the parent curator or  curator of this child-bounty. 

   Parent bounty must be in active state, for this child-bounty call to  work. 

   Child-bounty must be in active state, for processing the call. And  state of child-bounty is moved to "PendingPayout" on successful call  completion. 

   - `parent_bounty_id`: Index of parent bounty. 

  - `child_bounty_id`: Index of child bounty.

  - `beneficiary`: Beneficiary account.
 
### claimChildBounty(parent_bounty_id: `Compact<u32>`, child_bounty_id: `Compact<u32>`)
- **interface**: `api.tx.childBounties.claimChildBounty`
- **summary**:    Claim the payout from an awarded child-bounty after payout delay. 

   The dispatch origin for this call may be any signed origin. 

   Call works independent of parent bounty state, No need for parent  bounty to be in active state. 

   The Beneficiary is paid out with agreed bounty value. Curator fee is  paid & curator deposit is unreserved. 

   Child-bounty must be in "PendingPayout" state, for processing the  call. And instance of child-bounty is removed from the state on  successful call completion. 

   - `parent_bounty_id`: Index of parent bounty. 

  - `child_bounty_id`: Index of child bounty.
 
### closeChildBounty(parent_bounty_id: `Compact<u32>`, child_bounty_id: `Compact<u32>`)
- **interface**: `api.tx.childBounties.closeChildBounty`
- **summary**:    Cancel a proposed or active child-bounty. Child-bounty account funds  are transferred to parent bounty account. The child-bounty curator  deposit may be unreserved if possible. 

   The dispatch origin for this call must be either parent curator or  `T::RejectOrigin`. 

   If the state of child-bounty is `Active`, curator deposit is  unreserved. 

   If the state of child-bounty is `PendingPayout`, call fails &  returns `PendingPayout` error. 

   For the origin other than T::RejectOrigin, parent bounty must be in  active state, for this child-bounty call to work. For origin  T::RejectOrigin execution is forced. 

   Instance of child-bounty is removed from the state on successful  call completion. 

   - `parent_bounty_id`: Index of parent bounty. 

  - `child_bounty_id`: Index of child bounty.
 
### proposeCurator(parent_bounty_id: `Compact<u32>`, child_bounty_id: `Compact<u32>`, curator: `MultiAddress`, fee: `Compact<u128>`)
- **interface**: `api.tx.childBounties.proposeCurator`
- **summary**:    Propose curator for funded child-bounty. 

   The dispatch origin for this call must be curator of parent bounty. 

   Parent bounty must be in active state, for this child-bounty call to  work. 

   Child-bounty must be in "Added" state, for processing the call. And  state of child-bounty is moved to "CuratorProposed" on successful  call completion. 

   - `parent_bounty_id`: Index of parent bounty. 

  - `child_bounty_id`: Index of child bounty.

  - `curator`: Address of child-bounty curator.

  - `fee`: payment fee to child-bounty curator for execution.
 
### unassignCurator(parent_bounty_id: `Compact<u32>`, child_bounty_id: `Compact<u32>`)
- **interface**: `api.tx.childBounties.unassignCurator`
- **summary**:    Unassign curator from a child-bounty. 

   The dispatch origin for this call can be either `RejectOrigin`, or  the curator of the parent bounty, or any signed origin. 

   For the origin other than T::RejectOrigin and the child-bounty  curator, parent bounty must be in active state, for this call to  work. We allow child-bounty curator and T::RejectOrigin to execute  this call irrespective of the parent bounty state. 

   If this function is called by the `RejectOrigin` or the  parent bounty curator, we assume that the child-bounty curator is  malicious or inactive. As a result, child-bounty curator deposit is  slashed. 

   If the origin is the child-bounty curator, we take this as a sign  that they are unable to do their job, and are willingly giving up.  We could slash the deposit, but for now we allow them to unreserve  their deposit and exit without issue. (We may want to change this if  it is abused.) 

   Finally, the origin can be anyone iff the child-bounty curator is  "inactive". Expiry update due of parent bounty is used to estimate  inactive state of child-bounty curator. 

   This allows anyone in the community to call out that a child-bounty  curator is not doing their due diligence, and we should pick a new  one. In this case the child-bounty curator deposit is slashed. 

   State of child-bounty is moved to Added state on successful call  completion. 

   - `parent_bounty_id`: Index of parent bounty. 

  - `child_bounty_id`: Index of child bounty.

___


## contracts
 
### call(dest: `MultiAddress`, value: `Compact<u128>`, gas_limit: `SpWeightsWeightV2Weight`, storage_deposit_limit: `Option<Compact<u128>>`, data: `Bytes`)
- **interface**: `api.tx.contracts.call`
- **summary**:    Makes a call to an account, optionally transferring some balance. 

   #### Parameters 

   * `dest`: Address of the contract to call. 

  * `value`: The balance to transfer from the `origin` to `dest`.

  * `gas_limit`: The gas limit enforced when executing the constructor.

  * `storage_deposit_limit`: The maximum amount of balance that can be charged from the caller to pay for the storage consumed. 

  * `data`: The input data to pass to the contract.

   * If the account is a smart-contract account, the associated code will be  executed and any value will be transferred. 

  * If the account is a regular account, any value will be transferred.

  * If no account exists and the call value is not less than `existential_deposit`, a regular account will be created and any value will be transferred. 
 
### callOldWeight(dest: `MultiAddress`, value: `Compact<u128>`, gas_limit: `Compact<u64>`, storage_deposit_limit: `Option<Compact<u128>>`, data: `Bytes`)
- **interface**: `api.tx.contracts.callOldWeight`
- **summary**:    Deprecated version if [`Self::call`] for use in an in-storage `Call`. 
 
### instantiate(value: `Compact<u128>`, gas_limit: `SpWeightsWeightV2Weight`, storage_deposit_limit: `Option<Compact<u128>>`, code_hash: `H256`, data: `Bytes`, salt: `Bytes`)
- **interface**: `api.tx.contracts.instantiate`
- **summary**:    Instantiates a contract from a previously deployed wasm binary. 

   This function is identical to [`Self::instantiate_with_code`] but without the  code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary  must be supplied. 
 
### instantiateOldWeight(value: `Compact<u128>`, gas_limit: `Compact<u64>`, storage_deposit_limit: `Option<Compact<u128>>`, code_hash: `H256`, data: `Bytes`, salt: `Bytes`)
- **interface**: `api.tx.contracts.instantiateOldWeight`
- **summary**:    Deprecated version if [`Self::instantiate`] for use in an in-storage `Call`. 
 
### instantiateWithCode(value: `Compact<u128>`, gas_limit: `SpWeightsWeightV2Weight`, storage_deposit_limit: `Option<Compact<u128>>`, code: `Bytes`, data: `Bytes`, salt: `Bytes`)
- **interface**: `api.tx.contracts.instantiateWithCode`
- **summary**:    Instantiates a new contract from the supplied `code` optionally transferring  some balance. 

   This dispatchable has the same effect as calling [`Self::upload_code`] +  [`Self::instantiate`]. Bundling them together provides efficiency gains. Please  also check the documentation of [`Self::upload_code`]. 

   #### Parameters 

   * `value`: The balance to transfer from the `origin` to the newly created contract. 

  * `gas_limit`: The gas limit enforced when executing the constructor.

  * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved from the caller to pay for the storage consumed. 

  * `code`: The contract code to deploy in raw bytes.

  * `data`: The input data to pass to the contract constructor.

  * `salt`: Used for the address derivation. See [`Pallet::contract_address`].

   Instantiation is executed as follows: 

   - The supplied `code` is deployed, and a `code_hash` is created for that code. 

  - If the `code_hash` already exists on the chain the underlying `code` will be shared.

  - The destination address is computed based on the sender, code_hash and the salt.

  - The smart-contract account is created at the computed address.

  - The `value` is transferred to the new account.

  - The `deploy` function is executed in the context of the newly-created account.
 
### instantiateWithCodeOldWeight(value: `Compact<u128>`, gas_limit: `Compact<u64>`, storage_deposit_limit: `Option<Compact<u128>>`, code: `Bytes`, data: `Bytes`, salt: `Bytes`)
- **interface**: `api.tx.contracts.instantiateWithCodeOldWeight`
- **summary**:    Deprecated version if [`Self::instantiate_with_code`] for use in an in-storage `Call`. 
 
### migrate(weight_limit: `SpWeightsWeightV2Weight`)
- **interface**: `api.tx.contracts.migrate`
- **summary**:    When a migration is in progress, this dispatchable can be used to run migration steps.  Calls that contribute to advancing the migration have their fees waived, as it's helpful  for the chain. Note that while the migration is in progress, the pallet will also  leverage the `on_idle` hooks to run migration steps. 
 
### removeCode(code_hash: `H256`)
- **interface**: `api.tx.contracts.removeCode`
- **summary**:    Remove the code stored under `code_hash` and refund the deposit to its owner. 

   A code can only be removed by its original uploader (its owner) and only if it is  not used by any contract. 
 
### setCode(dest: `MultiAddress`, code_hash: `H256`)
- **interface**: `api.tx.contracts.setCode`
- **summary**:    Privileged function that changes the code of an existing contract. 

   This takes care of updating refcounts and all other necessary operations. Returns  an error if either the `code_hash` or `dest` do not exist. 

   #### Note 

   This does **not** change the address of the contract in question. This means  that the contract address is no longer derived from its code hash after calling  this dispatchable. 
 
### uploadCode(code: `Bytes`, storage_deposit_limit: `Option<Compact<u128>>`, determinism: `PalletContractsWasmDeterminism`)
- **interface**: `api.tx.contracts.uploadCode`
- **summary**:    Upload new `code` without instantiating a contract from it. 

   If the code does not already exist a deposit is reserved from the caller  and unreserved only when [`Self::remove_code`] is called. The size of the reserve  depends on the size of the supplied `code`. 

   If the code already exists in storage it will still return `Ok` and upgrades  the in storage version to the current  [`InstructionWeights::version`](InstructionWeights). 

   - `determinism`: If this is set to any other value but [`Determinism::Enforced`] then  the only way to use this code is to delegate call into it from an offchain execution.  Set to [`Determinism::Enforced`] if in doubt. 

   #### Note 

   Anyone can instantiate a contract from any uploaded code and thus prevent its removal.  To avoid this situation a constructor could employ access control so that it can  only be instantiated by permissioned entities. The same is true when uploading  through [`Self::instantiate_with_code`]. 

   Use [`Determinism::Relaxed`] exclusively for non-deterministic code. If the uploaded  code is deterministic, specifying [`Determinism::Relaxed`] will be disregarded and  result in higher gas costs. 

___


## convictionVoting
 
### delegate(class: `u16`, to: `MultiAddress`, conviction: `PalletConvictionVotingConviction`, balance: `u128`)
- **interface**: `api.tx.convictionVoting.delegate`
- **summary**:    Delegate the voting power (with some given conviction) of the sending account for a  particular class of polls. 

   The balance delegated is locked for as long as it's delegated, and thereafter for the  time appropriate for the conviction's lock period. 

   The dispatch origin of this call must be _Signed_, and the signing account must either: 

  - be delegating already; or

  - have no voting activity (if there is, then it will need to be removed through `remove_vote`). 

   - `to`: The account whose voting the `target` account's voting power will follow. 

  - `class`: The class of polls to delegate. To delegate multiple classes, multiple calls to this function are required. 

  - `conviction`: The conviction that will be attached to the delegated votes. When the account is undelegated, the funds will be locked for the corresponding period. 

  - `balance`: The amount of the account's balance to be used in delegating. This must not be more than the account's current balance. 

   Emits `Delegated`. 

   Weight: `O(R)` where R is the number of polls the voter delegating to has  voted on. Weight is initially charged as if maximum votes, but is refunded later. 
 
### removeOtherVote(target: `MultiAddress`, class: `u16`, index: `u32`)
- **interface**: `api.tx.convictionVoting.removeOtherVote`
- **summary**:    Remove a vote for a poll. 

   If the `target` is equal to the signer, then this function is exactly equivalent to  `remove_vote`. If not equal to the signer, then the vote must have expired,  either because the poll was cancelled, because the voter lost the poll or  because the conviction period is over. 

   The dispatch origin of this call must be _Signed_. 

   - `target`: The account of the vote to be removed; this account must have voted for poll  `index`. 

  - `index`: The index of poll of the vote to be removed.

  - `class`: The class of the poll.

   Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.  Weight is calculated for the maximum number of vote. 
 
### removeVote(class: `Option<u16>`, index: `u32`)
- **interface**: `api.tx.convictionVoting.removeVote`
- **summary**:    Remove a vote for a poll. 

   If: 

  - the poll was cancelled, or

  - the poll is ongoing, or

  - the poll has ended such that

  - the vote of the account was in opposition to the result; or

  - there was no conviction to the account's vote; or

  - the account made a split vote ...then the vote is removed cleanly and a following call to `unlock` may result in more  funds being available. 

   If, however, the poll has ended and: 

  - it finished corresponding to the vote of the account, and

  - the account made a standard vote with conviction, and

  - the lock period of the conviction is not over ...then the lock will be aggregated into the overall account's lock, which may involve 

  *overlocking* (where the two locks are combined into a single lock that is the maximum of both the amount locked and the time is it locked for). 

   The dispatch origin of this call must be _Signed_, and the signer must have a vote  registered for poll `index`. 

   - `index`: The index of poll of the vote to be removed. 

  - `class`: Optional parameter, if given it indicates the class of the poll. For polls which have finished or are cancelled, this must be `Some`. 

   Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.  Weight is calculated for the maximum number of vote. 
 
### undelegate(class: `u16`)
- **interface**: `api.tx.convictionVoting.undelegate`
- **summary**:    Undelegate the voting power of the sending account for a particular class of polls. 

   Tokens may be unlocked following once an amount of time consistent with the lock period  of the conviction with which the delegation was issued has passed. 

   The dispatch origin of this call must be _Signed_ and the signing account must be  currently delegating. 

   - `class`: The class of polls to remove the delegation from. 

   Emits `Undelegated`. 

   Weight: `O(R)` where R is the number of polls the voter delegating to has  voted on. Weight is initially charged as if maximum votes, but is refunded later. 
 
### unlock(class: `u16`, target: `MultiAddress`)
- **interface**: `api.tx.convictionVoting.unlock`
- **summary**:    Remove the lock caused by prior voting/delegating which has expired within a particular  class. 

   The dispatch origin of this call must be _Signed_. 

   - `class`: The class of polls to unlock. 

  - `target`: The account to remove the lock on.

   Weight: `O(R)` with R number of vote of target. 
 
### vote(poll_index: `Compact<u32>`, vote: `PalletConvictionVotingVoteAccountVote`)
- **interface**: `api.tx.convictionVoting.vote`
- **summary**:    Vote in a poll. If `vote.is_aye()`, the vote is to enact the proposal;  otherwise it is a vote to keep the status quo. 

   The dispatch origin of this call must be _Signed_. 

   - `poll_index`: The index of the poll to vote for. 

  - `vote`: The vote configuration.

   Weight: `O(R)` where R is the number of polls the voter has voted on. 

___


## coreFellowship
 
### approve(who: `AccountId32`, at_rank: `u16`)
- **interface**: `api.tx.coreFellowship.approve`
- **summary**:    Approve a member to continue at their rank. 

   This resets `last_proof` to the current block, thereby delaying any automatic demotion. 

   `who` must already be tracked by this pallet for this to have an effect. 

   - `origin`: An origin which satisfies `ApproveOrigin` or root. 

  - `who`: A member (i.e. of non-zero rank).

  - `at_rank`: The rank of member.
 
### bump(who: `AccountId32`)
- **interface**: `api.tx.coreFellowship.bump`
- **summary**:    Bump the state of a member. 

   This will demote a member whose `last_proof` is now beyond their rank's  `demotion_period`. 

   - `origin`: A `Signed` origin of an account. 

  - `who`: A member account whose state is to be updated.
 
### import()
- **interface**: `api.tx.coreFellowship.import`
- **summary**:    Introduce an already-ranked individual of the collective into this pallet. 

   The rank may still be zero. This resets `last_proof` to the current block and  `last_promotion` will be set to zero, thereby delaying any automatic demotion but  allowing immediate promotion. 

   - `origin`: A signed origin of a ranked, but not tracked, account. 
 
### importMember(who: `AccountId32`)
- **interface**: `api.tx.coreFellowship.importMember`
- **summary**:    Introduce an already-ranked individual of the collective into this pallet. 

   The rank may still be zero. Can be called by anyone on any collective member - including  the sender. 

   This resets `last_proof` to the current block and `last_promotion` will be set to zero,  thereby delaying any automatic demotion but allowing immediate promotion. 

   - `origin`: A signed origin of a ranked, but not tracked, account. 

  - `who`: The account ID of the collective member to be inducted.
 
### induct(who: `AccountId32`)
- **interface**: `api.tx.coreFellowship.induct`
- **summary**:    Introduce a new and unranked candidate (rank zero). 

   - `origin`: An origin which satisfies `InductOrigin` or root. 

  - `who`: The account ID of the candidate to be inducted and become a member.
 
### offboard(who: `AccountId32`)
- **interface**: `api.tx.coreFellowship.offboard`
- **summary**:    Stop tracking a prior member who is now not a ranked member of the collective. 

   - `origin`: A `Signed` origin of an account. 

  - `who`: The ID of an account which was tracked in this pallet but which is now not a ranked member of the collective. 
 
### promote(who: `AccountId32`, to_rank: `u16`)
- **interface**: `api.tx.coreFellowship.promote`
- **summary**:    Increment the rank of a ranked and tracked account. 

   - `origin`: An origin which satisfies `PromoteOrigin` with a `Success` result of  `to_rank` or more or root. 

  - `who`: The account ID of the member to be promoted to `to_rank`.

  - `to_rank`: One more than the current rank of `who`.
 
### promoteFast(who: `AccountId32`, to_rank: `u16`)
- **interface**: `api.tx.coreFellowship.promoteFast`
- **summary**:    Fast promotions can skip ranks and ignore the `min_promotion_period`. 

   This is useful for out-of-band promotions, hence it has its own `FastPromoteOrigin` to  be (possibly) more restrictive than `PromoteOrigin`. Note that the member must already  be inducted. 
 
### setActive(is_active: `bool`)
- **interface**: `api.tx.coreFellowship.setActive`
- **summary**:    Set whether a member is active or not. 

   - `origin`: A `Signed` origin of a member's account. 

  - `is_active`: `true` iff the member is active.
 
### setParams(params: `PalletCoreFellowshipParamsTypeU128`)
- **interface**: `api.tx.coreFellowship.setParams`
- **summary**:    Set the parameters. 

   - `origin`: An origin complying with `ParamsOrigin` or root. 

  - `params`: The new parameters for the pallet.
 
### setPartialParams(partial_params: `PalletCoreFellowshipParamsTypeOption`)
- **interface**: `api.tx.coreFellowship.setPartialParams`
- **summary**:    Set the parameters partially. 

   - `origin`: An origin complying with `ParamsOrigin` or root. 

  - `partial_params`: The new parameters for the pallet.

   This update config with multiple arguments without duplicating  the fields that does not need to update (set to None). 
 
### submitEvidence(wish: `PalletCoreFellowshipWish`, evidence: `Bytes`)
- **interface**: `api.tx.coreFellowship.submitEvidence`
- **summary**:    Provide evidence that a rank is deserved. 

   This is free as long as no evidence for the forthcoming judgement is already submitted.  Evidence is cleared after an outcome (either demotion, promotion of approval). 

   - `origin`: A `Signed` origin of an inducted and ranked account. 

  - `wish`: The stated desire of the member.

  - `evidence`: A dump of evidence to be considered. This should generally be either a Markdown-encoded document or a series of 32-byte hashes which can be found on a  decentralised content-based-indexing system such as IPFS. 

___


## council
 
### close(proposal_hash: `H256`, index: `Compact<u32>`, proposal_weight_bound: `SpWeightsWeightV2Weight`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.council.close`
- **summary**:    Close a vote that is either approved, disapproved or whose voting period has ended. 

   May be called by any signed account in order to finish voting and close the proposal. 

   If called before the end of the voting period it will only close the vote if it is  has enough votes to be approved or disapproved. 

   If called after the end of the voting period abstentions are counted as rejections  unless there is a prime member set and the prime member cast an approval. 

   If the close operation completes successfully with disapproval, the transaction fee will  be waived. Otherwise execution of the approved operation will be charged to the caller. 

   + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed  proposal.  + `length_bound`: The upper bound for the length of the proposal in storage. Checked via  `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length. 

   #### Complexity 

  - `O(B + M + P1 + P2)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` is members-count (code- and governance-bounded)

  - `P1` is the complexity of `proposal` preimage.

  - `P2` is proposal-count (code-bounded)
 
### disapproveProposal(proposal_hash: `H256`)
- **interface**: `api.tx.council.disapproveProposal`
- **summary**:    Disapprove a proposal, close, and remove it from the system, regardless of its current  state. 

   Must be called by the Root origin. 

   Parameters: 

  * `proposal_hash`: The hash of the proposal that should be disapproved.

   #### Complexity  O(P) where P is the number of max proposals 
 
### execute(proposal: `Call`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.council.execute`
- **summary**:    Dispatch a proposal from a member using the `Member` origin. 

   Origin must be a member of the collective. 

   #### Complexity: 

  - `O(B + M + P)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` members-count (code-bounded)

  - `P` complexity of dispatching `proposal`
 
### kill(proposal_hash: `H256`)
- **interface**: `api.tx.council.kill`
- **summary**:    Disapprove the proposal and burn the cost held for storing this proposal. 

   Parameters: 

  - `origin`: must be the `KillOrigin`.

  - `proposal_hash`: The hash of the proposal that should be killed.

   Emits `Killed` and `ProposalCostBurned` if any cost was held for a given proposal. 
 
### propose(threshold: `Compact<u32>`, proposal: `Call`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.council.propose`
- **summary**:    Add a new proposal to either be voted on or executed directly. 

   Requires the sender to be member. 

   `threshold` determines whether `proposal` is executed directly (`threshold < 2`)  or put up for voting. 

   #### Complexity 

  - `O(B + M + P1)` or `O(B + M + P2)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` is members-count (code- and governance-bounded)

  - branching is influenced by `threshold` where:

  - `P1` is proposal execution complexity (`threshold < 2`)

  - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
 
### releaseProposalCost(proposal_hash: `H256`)
- **interface**: `api.tx.council.releaseProposalCost`
- **summary**:    Release the cost held for storing a proposal once the given proposal is completed. 

   If there is no associated cost for the given proposal, this call will have no effect. 

   Parameters: 

  - `origin`: must be `Signed` or `Root`.

  - `proposal_hash`: The hash of the proposal.

   Emits `ProposalCostReleased` if any cost held for a given proposal. 
 
### setMembers(new_members: `Vec<AccountId32>`, prime: `Option<AccountId32>`, old_count: `u32`)
- **interface**: `api.tx.council.setMembers`
- **summary**:    Set the collective's membership. 

   - `new_members`: The new member list. Be nice to the chain and provide it sorted. 

  - `prime`: The prime member whose vote sets the default.

  - `old_count`: The upper bound for the previous number of members in storage. Used for weight estimation. 

   The dispatch of this call must be `SetMembersOrigin`. 

   NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but  the weight estimations rely on it to estimate dispatchable weight. 

   #### WARNING: 

   The `pallet-collective` can also be managed by logic outside of the pallet through the  implementation of the trait [`ChangeMembers`].  Any call to `set_members` must be careful that the member set doesn't get out of sync  with other logic managing the member set. 

   #### Complexity: 

  - `O(MP + N)` where:

  - `M` old-members-count (code- and governance-bounded)

  - `N` new-members-count (code- and governance-bounded)

  - `P` proposals-count (code-bounded)
 
### vote(proposal: `H256`, index: `Compact<u32>`, approve: `bool`)
- **interface**: `api.tx.council.vote`
- **summary**:    Add an aye or nay vote for the sender to the given proposal. 

   Requires the sender to be a member. 

   Transaction fees will be waived if the member is voting on any particular proposal  for the first time and the call is successful. Subsequent vote changes will charge a  fee.  #### Complexity 

  - `O(M)` where `M` is members-count (code- and governance-bounded)

___


## democracy
 
### blacklist(proposal_hash: `H256`, maybe_ref_index: `Option<u32>`)
- **interface**: `api.tx.democracy.blacklist`
- **summary**:    Permanently place a proposal into the blacklist. This prevents it from ever being  proposed again. 

   If called on a queued public or external proposal, then this will result in it being  removed. If the `ref_index` supplied is an active referendum with the proposal hash,  then it will be cancelled. 

   The dispatch origin of this call must be `BlacklistOrigin`. 

   - `proposal_hash`: The proposal hash to blacklist permanently. 

  - `ref_index`: An ongoing referendum whose hash is `proposal_hash`, which will be cancelled. 

   Weight: `O(p)` (though as this is an high-privilege dispatch, we assume it has a  reasonable value). 
 
### cancelProposal(prop_index: `Compact<u32>`)
- **interface**: `api.tx.democracy.cancelProposal`
- **summary**:    Remove a proposal. 

   The dispatch origin of this call must be `CancelProposalOrigin`. 

   - `prop_index`: The index of the proposal to cancel. 

   Weight: `O(p)` where `p = PublicProps::<T>::decode_len()` 
 
### cancelReferendum(ref_index: `Compact<u32>`)
- **interface**: `api.tx.democracy.cancelReferendum`
- **summary**:    Remove a referendum. 

   The dispatch origin of this call must be _Root_. 

   - `ref_index`: The index of the referendum to cancel. 

   Weight: `O(1)`. 
 
### clearPublicProposals()
- **interface**: `api.tx.democracy.clearPublicProposals`
- **summary**:    Clears all public proposals. 

   The dispatch origin of this call must be _Root_. 

   Weight: `O(1)`. 
 
### delegate(to: `MultiAddress`, conviction: `PalletDemocracyConviction`, balance: `u128`)
- **interface**: `api.tx.democracy.delegate`
- **summary**:    Delegate the voting power (with some given conviction) of the sending account. 

   The balance delegated is locked for as long as it's delegated, and thereafter for the  time appropriate for the conviction's lock period. 

   The dispatch origin of this call must be _Signed_, and the signing account must either: 

  - be delegating already; or

  - have no voting activity (if there is, then it will need to be removed/consolidated through `reap_vote` or `unvote`). 

   - `to`: The account whose voting the `target` account's voting power will follow. 

  - `conviction`: The conviction that will be attached to the delegated votes. When the account is undelegated, the funds will be locked for the corresponding period. 

  - `balance`: The amount of the account's balance to be used in delegating. This must not be more than the account's current balance. 

   Emits `Delegated`. 

   Weight: `O(R)` where R is the number of referendums the voter delegating to has  voted on. Weight is charged as if maximum votes. 
 
### emergencyCancel(ref_index: `u32`)
- **interface**: `api.tx.democracy.emergencyCancel`
- **summary**:    Schedule an emergency cancellation of a referendum. Cannot happen twice to the same  referendum. 

   The dispatch origin of this call must be `CancellationOrigin`. 

   -`ref_index`: The index of the referendum to cancel. 

   Weight: `O(1)`. 
 
### externalPropose(proposal: `FrameSupportPreimagesBounded`)
- **interface**: `api.tx.democracy.externalPropose`
- **summary**:    Schedule a referendum to be tabled once it is legal to schedule an external  referendum. 

   The dispatch origin of this call must be `ExternalOrigin`. 

   - `proposal_hash`: The preimage hash of the proposal. 
 
### externalProposeDefault(proposal: `FrameSupportPreimagesBounded`)
- **interface**: `api.tx.democracy.externalProposeDefault`
- **summary**:    Schedule a negative-turnout-bias referendum to be tabled next once it is legal to  schedule an external referendum. 

   The dispatch of this call must be `ExternalDefaultOrigin`. 

   - `proposal_hash`: The preimage hash of the proposal. 

   Unlike `external_propose`, blacklisting has no effect on this and it may replace a  pre-scheduled `external_propose` call. 

   Weight: `O(1)` 
 
### externalProposeMajority(proposal: `FrameSupportPreimagesBounded`)
- **interface**: `api.tx.democracy.externalProposeMajority`
- **summary**:    Schedule a majority-carries referendum to be tabled next once it is legal to schedule  an external referendum. 

   The dispatch of this call must be `ExternalMajorityOrigin`. 

   - `proposal_hash`: The preimage hash of the proposal. 

   Unlike `external_propose`, blacklisting has no effect on this and it may replace a  pre-scheduled `external_propose` call. 

   Weight: `O(1)` 
 
### fastTrack(proposal_hash: `H256`, voting_period: `u32`, delay: `u32`)
- **interface**: `api.tx.democracy.fastTrack`
- **summary**:    Schedule the currently externally-proposed majority-carries referendum to be tabled  immediately. If there is no externally-proposed referendum currently, or if there is one  but it is not a majority-carries referendum then it fails. 

   The dispatch of this call must be `FastTrackOrigin`. 

   - `proposal_hash`: The hash of the current external proposal. 

  - `voting_period`: The period that is allowed for voting on this proposal. Increased to Must be always greater than zero.  For `FastTrackOrigin` must be equal or greater than `FastTrackVotingPeriod`. 

  - `delay`: The number of block after voting has ended in approval and this should be enacted. This doesn't have a minimum amount. 

   Emits `Started`. 

   Weight: `O(1)` 
 
### propose(proposal: `FrameSupportPreimagesBounded`, value: `Compact<u128>`)
- **interface**: `api.tx.democracy.propose`
- **summary**:    Propose a sensitive action to be taken. 

   The dispatch origin of this call must be _Signed_ and the sender must  have funds to cover the deposit. 

   - `proposal_hash`: The hash of the proposal preimage. 

  - `value`: The amount of deposit (must be at least `MinimumDeposit`).

   Emits `Proposed`. 
 
### removeOtherVote(target: `MultiAddress`, index: `u32`)
- **interface**: `api.tx.democracy.removeOtherVote`
- **summary**:    Remove a vote for a referendum. 

   If the `target` is equal to the signer, then this function is exactly equivalent to  `remove_vote`. If not equal to the signer, then the vote must have expired,  either because the referendum was cancelled, because the voter lost the referendum or  because the conviction period is over. 

   The dispatch origin of this call must be _Signed_. 

   - `target`: The account of the vote to be removed; this account must have voted for  referendum `index`. 

  - `index`: The index of referendum of the vote to be removed.

   Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.  Weight is calculated for the maximum number of vote. 
 
### removeVote(index: `u32`)
- **interface**: `api.tx.democracy.removeVote`
- **summary**:    Remove a vote for a referendum. 

   If: 

  - the referendum was cancelled, or

  - the referendum is ongoing, or

  - the referendum has ended such that

  - the vote of the account was in opposition to the result; or

  - there was no conviction to the account's vote; or

  - the account made a split vote ...then the vote is removed cleanly and a following call to `unlock` may result in more  funds being available. 

   If, however, the referendum has ended and: 

  - it finished corresponding to the vote of the account, and

  - the account made a standard vote with conviction, and

  - the lock period of the conviction is not over ...then the lock will be aggregated into the overall account's lock, which may involve 

  *overlocking* (where the two locks are combined into a single lock that is the maximum of both the amount locked and the time is it locked for). 

   The dispatch origin of this call must be _Signed_, and the signer must have a vote  registered for referendum `index`. 

   - `index`: The index of referendum of the vote to be removed. 

   Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.  Weight is calculated for the maximum number of vote. 
 
### second(proposal: `Compact<u32>`)
- **interface**: `api.tx.democracy.second`
- **summary**:    Signals agreement with a particular proposal. 

   The dispatch origin of this call must be _Signed_ and the sender  must have funds to cover the deposit, equal to the original deposit. 

   - `proposal`: The index of the proposal to second. 
 
### setMetadata(owner: `PalletDemocracyMetadataOwner`, maybe_hash: `Option<H256>`)
- **interface**: `api.tx.democracy.setMetadata`
- **summary**:    Set or clear a metadata of a proposal or a referendum. 

   Parameters: 

  - `origin`: Must correspond to the `MetadataOwner`.

  - `ExternalOrigin` for an external proposal with the `SuperMajorityApprove` threshold. 

  - `ExternalDefaultOrigin` for an external proposal with the `SuperMajorityAgainst` threshold. 

  - `ExternalMajorityOrigin` for an external proposal with the `SimpleMajority` threshold. 

  - `Signed` by a creator for a public proposal.

  - `Signed` to clear a metadata for a finished referendum.

  - `Root` to set a metadata for an ongoing referendum.

  - `owner`: an identifier of a metadata owner.

  - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
 
### undelegate()
- **interface**: `api.tx.democracy.undelegate`
- **summary**:    Undelegate the voting power of the sending account. 

   Tokens may be unlocked following once an amount of time consistent with the lock period  of the conviction with which the delegation was issued. 

   The dispatch origin of this call must be _Signed_ and the signing account must be  currently delegating. 

   Emits `Undelegated`. 

   Weight: `O(R)` where R is the number of referendums the voter delegating to has  voted on. Weight is charged as if maximum votes. 
 
### unlock(target: `MultiAddress`)
- **interface**: `api.tx.democracy.unlock`
- **summary**:    Unlock tokens that have an expired lock. 

   The dispatch origin of this call must be _Signed_. 

   - `target`: The account to remove the lock on. 

   Weight: `O(R)` with R number of vote of target. 
 
### vetoExternal(proposal_hash: `H256`)
- **interface**: `api.tx.democracy.vetoExternal`
- **summary**:    Veto and blacklist the external proposal hash. 

   The dispatch origin of this call must be `VetoOrigin`. 

   - `proposal_hash`: The preimage hash of the proposal to veto and blacklist. 

   Emits `Vetoed`. 

   Weight: `O(V + log(V))` where V is number of `existing vetoers` 
 
### vote(ref_index: `Compact<u32>`, vote: `PalletDemocracyVoteAccountVote`)
- **interface**: `api.tx.democracy.vote`
- **summary**:    Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;  otherwise it is a vote to keep the status quo. 

   The dispatch origin of this call must be _Signed_. 

   - `ref_index`: The index of the referendum to vote for. 

  - `vote`: The vote configuration.

___


## electionProviderMultiPhase
 
### governanceFallback(maybe_max_voters: `Option<u32>`, maybe_max_targets: `Option<u32>`)
- **interface**: `api.tx.electionProviderMultiPhase.governanceFallback`
- **summary**:    Trigger the governance fallback. 

   This can only be called when [`Phase::Emergency`] is enabled, as an alternative to  calling [`Call::set_emergency_election_result`]. 
 
### setEmergencyElectionResult(supports: `Vec<(AccountId32,SpNposElectionsSupport)>`)
- **interface**: `api.tx.electionProviderMultiPhase.setEmergencyElectionResult`
- **summary**:    Set a solution in the queue, to be handed out to the client of this pallet in the next  call to `ElectionProvider::elect`. 

   This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`. 

   The solution is not checked for any feasibility and is assumed to be trustworthy, as any  feasibility check itself can in principle cause the election process to fail (due to  memory/weight constrains). 
 
### setMinimumUntrustedScore(maybe_next_score: `Option<SpNposElectionsElectionScore>`)
- **interface**: `api.tx.electionProviderMultiPhase.setMinimumUntrustedScore`
- **summary**:    Set a new value for `MinimumUntrustedScore`. 

   Dispatch origin must be aligned with `T::ForceOrigin`. 

   This check can be turned off by setting the value to `None`. 
 
### submit(raw_solution: `PalletElectionProviderMultiPhaseRawSolution`)
- **interface**: `api.tx.electionProviderMultiPhase.submit`
- **summary**:    Submit a solution for the signed phase. 

   The dispatch origin fo this call must be __signed__. 

   The solution is potentially queued, based on the claimed score and processed at the end  of the signed phase. 

   A deposit is reserved and recorded for the solution. Based on the outcome, the solution  might be rewarded, slashed, or get all or a part of the deposit back. 
 
### submitUnsigned(raw_solution: `PalletElectionProviderMultiPhaseRawSolution`, witness: `PalletElectionProviderMultiPhaseSolutionOrSnapshotSize`)
- **interface**: `api.tx.electionProviderMultiPhase.submitUnsigned`
- **summary**:    Submit a solution for the unsigned phase. 

   The dispatch origin fo this call must be __none__. 

   This submission is checked on the fly. Moreover, this unsigned solution is only  validated when submitted to the pool from the **local** node. Effectively, this means  that only active validators can submit this transaction when authoring a block (similar  to an inherent). 

   To prevent any incorrect solution (and thus wasted time/weight), this transaction will  panic if the solution submitted by the validator is invalid in any way, effectively  putting their authoring reward at risk. 

   No deposit or reward is associated with this submission. 

___


## elections
 
### cleanDefunctVoters(num_voters: `u32`, num_defunct: `u32`)
- **interface**: `api.tx.elections.cleanDefunctVoters`
- **summary**:    Clean all voters who are defunct (i.e. they do not serve any purpose at all). The  deposit of the removed voters are returned. 

   This is an root function to be used only for cleaning the state. 

   The dispatch origin of this call must be root. 

   #### Complexity 

  - Check is_defunct_voter() details.
 
### removeMember(who: `MultiAddress`, slash_bond: `bool`, rerun_election: `bool`)
- **interface**: `api.tx.elections.removeMember`
- **summary**:    Remove a particular member from the set. This is effective immediately and the bond of  the outgoing member is slashed. 

   If a runner-up is available, then the best runner-up will be removed and replaces the  outgoing member. Otherwise, if `rerun_election` is `true`, a new phragmen election is  started, else, nothing happens. 

   If `slash_bond` is set to true, the bond of the member being removed is slashed. Else,  it is returned. 

   The dispatch origin of this call must be root. 

   Note that this does not affect the designated block number of the next election. 

   #### Complexity 

  - Check details of remove_and_replace_member() and do_phragmen().
 
### removeVoter()
- **interface**: `api.tx.elections.removeVoter`
- **summary**:    Remove `origin` as a voter. 

   This removes the lock and returns the deposit. 

   The dispatch origin of this call must be signed and be a voter. 
 
### renounceCandidacy(renouncing: `PalletElectionsPhragmenRenouncing`)
- **interface**: `api.tx.elections.renounceCandidacy`
- **summary**:    Renounce one's intention to be a candidate for the next election round. 3 potential  outcomes exist: 

   - `origin` is a candidate and not elected in any set. In this case, the deposit is  unreserved, returned and origin is removed as a candidate. 

  - `origin` is a current runner-up. In this case, the deposit is unreserved, returned and origin is removed as a runner-up. 

  - `origin` is a current member. In this case, the deposit is unreserved and origin is removed as a member, consequently not being a candidate for the next round anymore.  Similar to [`remove_member`](Self::remove_member), if replacement runners exists, they  are immediately used. If the prime is renouncing, then no prime will exist until the  next round. 

   The dispatch origin of this call must be signed, and have one of the above roles.  The type of renouncing must be provided as witness data. 

   #### Complexity 

  - Renouncing::Candidate(count): O(count + log(count))

  - Renouncing::Member: O(1)

  - Renouncing::RunnerUp: O(1)
 
### submitCandidacy(candidate_count: `Compact<u32>`)
- **interface**: `api.tx.elections.submitCandidacy`
- **summary**:    Submit oneself for candidacy. A fixed amount of deposit is recorded. 

   All candidates are wiped at the end of the term. They either become a member/runner-up,  or leave the system while their deposit is slashed. 

   The dispatch origin of this call must be signed. 

   #### Warning 

   Even if a candidate ends up being a member, they must call [`Call::renounce_candidacy`]  to get their deposit back. Losing the spot in an election will always lead to a slash. 

   The number of current candidates must be provided as witness data.  #### Complexity  O(C + log(C)) where C is candidate_count. 
 
### vote(votes: `Vec<AccountId32>`, value: `Compact<u128>`)
- **interface**: `api.tx.elections.vote`
- **summary**:    Vote for a set of candidates for the upcoming round of election. This can be called to  set the initial votes, or update already existing votes. 

   Upon initial voting, `value` units of `who`'s balance is locked and a deposit amount is  reserved. The deposit is based on the number of votes and can be updated over time. 

   The `votes` should: 

  - not be empty.

  - be less than the number of possible candidates. Note that all current members and runners-up are also automatically candidates for the next round. 

   If `value` is more than `who`'s free balance, then the maximum of the two is used. 

   The dispatch origin of this call must be signed. 

   #### Warning 

   It is the responsibility of the caller to **NOT** place all of their balance into the  lock and keep some for further operations. 

___


## fastUnstake
 
### control(eras_to_check: `u32`)
- **interface**: `api.tx.fastUnstake.control`
- **summary**:    Control the operation of this pallet. 

   #### Dispatch Origin 

   The dispatch origin of this call must be [`Config::ControlOrigin`]. 

   #### Details 

   Can set the number of eras to check per block, and potentially other admin work. 

   #### Events 

   No events are emitted from this dispatch. 
 
### deregister()
- **interface**: `api.tx.fastUnstake.deregister`
- **summary**:    Deregister oneself from the fast-unstake. 

   #### Dispatch Origin 

   The dispatch origin of this call must be *signed* by whoever is permitted to call  unbond funds by the staking system. See [`Config::Staking`]. 

   #### Details 

   This is useful if one is registered, they are still waiting, and they change their mind. 

   Note that the associated stash is still fully unbonded and chilled as a consequence of  calling [`Pallet::register_fast_unstake`]. Therefore, this should probably be followed  by a call to `rebond` in the staking system. 

   #### Events 

   Some events from the staking and currency system might be emitted. 
 
### registerFastUnstake()
- **interface**: `api.tx.fastUnstake.registerFastUnstake`
- **summary**:    Register oneself for fast-unstake. 

   #### Dispatch Origin 

   The dispatch origin of this call must be *signed* by whoever is permitted to call  unbond funds by the staking system. See [`Config::Staking`]. 

   #### Details 

   The stash associated with the origin must have no ongoing unlocking chunks. If  successful, this will fully unbond and chill the stash. Then, it will enqueue the stash  to be checked in further blocks. 

   If by the time this is called, the stash is actually eligible for fast-unstake, then  they are guaranteed to remain eligible, because the call will chill them as well. 

   If the check works, the entire staking data is removed, i.e. the stash is fully  unstaked. 

   If the check fails, the stash remains chilled and waiting for being unbonded as in with  the normal staking system, but they lose part of their unbonding chunks due to consuming  the chain's resources. 

   #### Events 

   Some events from the staking and currency system might be emitted. 

___


## glutton
 
### bloat(garbage: `Vec<[u8;1024]>`)
- **interface**: `api.tx.glutton.bloat`
- **summary**:    Increase the block size by including the specified garbage bytes. 
 
### initializePallet(new_count: `u32`, witness_count: `Option<u32>`)
- **interface**: `api.tx.glutton.initializePallet`
- **summary**:    Initialize the pallet. Should be called once, if no genesis state was provided. 

   `current_count` is the current number of elements in `TrashData`. This can be set to  `None` when the pallet is first initialized. 

   Only callable by Root or `AdminOrigin`. A good default for `new_count` is `5_000`. 
 
### setBlockLength(block_length: `u64`)
- **interface**: `api.tx.glutton.setBlockLength`
- **summary**:    Set how much of the block length should be filled with trash data on each block. 

   `1.0` means that all block should be filled. If set to `1.0`, storage proof size will  be close to zero. 

   Only callable by Root or `AdminOrigin`. 
 
### setCompute(compute: `u64`)
- **interface**: `api.tx.glutton.setCompute`
- **summary**:    Set how much of the remaining `ref_time` weight should be consumed by `on_idle`. 

   Only callable by Root or `AdminOrigin`. 
 
### setStorage(storage: `u64`)
- **interface**: `api.tx.glutton.setStorage`
- **summary**:    Set how much of the remaining `proof_size` weight should be consumed by `on_idle`. 

   `1.0` means that all remaining `proof_size` will be consumed. The PoV benchmarking  results that are used here are likely an over-estimation. 100% intended consumption will  therefore translate to less than 100% actual consumption. 

   Only callable by Root or `AdminOrigin`. 

___


## grandpa
 
### noteStalled(delay: `u32`, best_finalized_block_number: `u32`)
- **interface**: `api.tx.grandpa.noteStalled`
- **summary**:    Note that the current authority set of the GRANDPA finality gadget has stalled. 

   This will trigger a forced authority set change at the beginning of the next session, to  be enacted `delay` blocks after that. The `delay` should be high enough to safely assume  that the block signalling the forced change will not be re-orged e.g. 1000 blocks.  The block production rate (which may be slowed down because of finality lagging) should  be taken into account when choosing the `delay`. The GRANDPA voters based on the new  authority will start voting on top of `best_finalized_block_number` for new finalized  blocks. `best_finalized_block_number` should be the highest of the latest finalized  block of all validators of the new authority set. 

   Only callable by root. 
 
### reportEquivocation(equivocation_proof: `SpConsensusGrandpaEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.grandpa.reportEquivocation`
- **summary**:    Report voter equivocation/misbehavior. This method will verify the  equivocation proof and validate the given key ownership proof  against the extracted offender. If both are valid, the offence  will be reported. 
 
### reportEquivocationUnsigned(equivocation_proof: `SpConsensusGrandpaEquivocationProof`, key_owner_proof: `SpSessionMembershipProof`)
- **interface**: `api.tx.grandpa.reportEquivocationUnsigned`
- **summary**:    Report voter equivocation/misbehavior. This method will verify the  equivocation proof and validate the given key ownership proof  against the extracted offender. If both are valid, the offence  will be reported. 

   This extrinsic must be called unsigned and it is expected that only  block authors will call it (validated in `ValidateUnsigned`), as such  if the block author is defined it will be defined as the equivocation  reporter. 

___


## identity
 
### acceptUsername(username: `Bytes`)
- **interface**: `api.tx.identity.acceptUsername`
- **summary**:    Accept a given username that an `authority` granted. The call must include the full  username, as in `username.suffix`. 
 
### addRegistrar(account: `MultiAddress`)
- **interface**: `api.tx.identity.addRegistrar`
- **summary**:    Add a registrar to the system. 

   The dispatch origin for this call must be `T::RegistrarOrigin`. 

   - `account`: the account of the registrar. 

   Emits `RegistrarAdded` if successful. 
 
### addSub(sub: `MultiAddress`, data: `Data`)
- **interface**: `api.tx.identity.addSub`
- **summary**:    Add the given account to the sender's subs. 

   Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated  to the sender. 

   The dispatch origin for this call must be _Signed_ and the sender must have a registered  sub identity of `sub`. 
 
### addUsernameAuthority(authority: `MultiAddress`, suffix: `Bytes`, allocation: `u32`)
- **interface**: `api.tx.identity.addUsernameAuthority`
- **summary**:    Add an `AccountId` with permission to grant usernames with a given `suffix` appended. 

   The authority can grant up to `allocation` usernames. To top up the allocation or  change the account used to grant usernames, this call can be used with the updated  parameters to overwrite the existing configuration. 
 
### cancelRequest(reg_index: `u32`)
- **interface**: `api.tx.identity.cancelRequest`
- **summary**:    Cancel a previous request. 

   Payment: A previously reserved deposit is returned on success. 

   The dispatch origin for this call must be _Signed_ and the sender must have a  registered identity. 

   - `reg_index`: The index of the registrar whose judgement is no longer requested. 

   Emits `JudgementUnrequested` if successful. 
 
### clearIdentity()
- **interface**: `api.tx.identity.clearIdentity`
- **summary**:    Clear an account's identity info and all sub-accounts and return all deposits. 

   Payment: All reserved balances on the account are returned. 

   The dispatch origin for this call must be _Signed_ and the sender must have a registered  identity. 

   Emits `IdentityCleared` if successful. 
 
### killIdentity(target: `MultiAddress`)
- **interface**: `api.tx.identity.killIdentity`
- **summary**:    Remove an account's identity and sub-account information and slash the deposits. 

   Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by  `Slash`. Verification request deposits are not returned; they should be cancelled  manually using `cancel_request`. 

   The dispatch origin for this call must match `T::ForceOrigin`. 

   - `target`: the account whose identity the judgement is upon. This must be an account  with a registered identity. 

   Emits `IdentityKilled` if successful. 
 
### killUsername(username: `Bytes`)
- **interface**: `api.tx.identity.killUsername`
- **summary**:    Call with [ForceOrigin](crate::Config::ForceOrigin) privileges which deletes a username  and slashes any deposit associated with it. 
 
### provideJudgement(reg_index: `Compact<u32>`, target: `MultiAddress`, judgement: `PalletIdentityJudgement`, identity: `H256`)
- **interface**: `api.tx.identity.provideJudgement`
- **summary**:    Provide a judgement for an account's identity. 

   The dispatch origin for this call must be _Signed_ and the sender must be the account  of the registrar whose index is `reg_index`. 

   - `reg_index`: the index of the registrar whose judgement is being made. 

  - `target`: the account whose identity the judgement is upon. This must be an account with a registered identity. 

  - `judgement`: the judgement of the registrar of index `reg_index` about `target`.

  - `identity`: The hash of the [`IdentityInformationProvider`] for that the judgement is provided. 

   Note: Judgements do not apply to a username. 

   Emits `JudgementGiven` if successful. 
 
### quitSub()
- **interface**: `api.tx.identity.quitSub`
- **summary**:    Remove the sender as a sub-account. 

   Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated  to the sender (*not* the original depositor). 

   The dispatch origin for this call must be _Signed_ and the sender must have a registered  super-identity. 

   NOTE: This should not normally be used, but is provided in the case that the non-  controller of an account is maliciously registered as a sub-account. 
 
### removeExpiredApproval(username: `Bytes`)
- **interface**: `api.tx.identity.removeExpiredApproval`
- **summary**:    Remove an expired username approval. The username was approved by an authority but never  accepted by the user and must now be beyond its expiration. The call must include the  full username, as in `username.suffix`. 
 
### removeSub(sub: `MultiAddress`)
- **interface**: `api.tx.identity.removeSub`
- **summary**:    Remove the given account from the sender's subs. 

   Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated  to the sender. 

   The dispatch origin for this call must be _Signed_ and the sender must have a registered  sub identity of `sub`. 
 
### removeUsername(username: `Bytes`)
- **interface**: `api.tx.identity.removeUsername`
- **summary**:    Permanently delete a username which has been unbinding for longer than the grace period.  Caller is refunded the fee if the username expired and the removal was successful. 
 
### removeUsernameAuthority(suffix: `Bytes`, authority: `MultiAddress`)
- **interface**: `api.tx.identity.removeUsernameAuthority`
- **summary**:    Remove `authority` from the username authorities. 
 
### renameSub(sub: `MultiAddress`, data: `Data`)
- **interface**: `api.tx.identity.renameSub`
- **summary**:    Alter the associated name of the given sub-account. 

   The dispatch origin for this call must be _Signed_ and the sender must have a registered  sub identity of `sub`. 
 
### requestJudgement(reg_index: `Compact<u32>`, max_fee: `Compact<u128>`)
- **interface**: `api.tx.identity.requestJudgement`
- **summary**:    Request a judgement from a registrar. 

   Payment: At most `max_fee` will be reserved for payment to the registrar if judgement  given. 

   The dispatch origin for this call must be _Signed_ and the sender must have a  registered identity. 

   - `reg_index`: The index of the registrar whose judgement is requested. 

  - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:

   ```nocompile  Registrars::<T>::get().get(reg_index).unwrap().fee  ``` 

   Emits `JudgementRequested` if successful. 
 
### setAccountId(index: `Compact<u32>`, new: `MultiAddress`)
- **interface**: `api.tx.identity.setAccountId`
- **summary**:    Change the account associated with a registrar. 

   The dispatch origin for this call must be _Signed_ and the sender must be the account  of the registrar whose index is `index`. 

   - `index`: the index of the registrar whose fee is to be set. 

  - `new`: the new account ID.
 
### setFee(index: `Compact<u32>`, fee: `Compact<u128>`)
- **interface**: `api.tx.identity.setFee`
- **summary**:    Set the fee required for a judgement to be requested from a registrar. 

   The dispatch origin for this call must be _Signed_ and the sender must be the account  of the registrar whose index is `index`. 

   - `index`: the index of the registrar whose fee is to be set. 

  - `fee`: the new fee.
 
### setFields(index: `Compact<u32>`, fields: `u64`)
- **interface**: `api.tx.identity.setFields`
- **summary**:    Set the field information for a registrar. 

   The dispatch origin for this call must be _Signed_ and the sender must be the account  of the registrar whose index is `index`. 

   - `index`: the index of the registrar whose fee is to be set. 

  - `fields`: the fields that the registrar concerns themselves with.
 
### setIdentity(info: `PalletIdentityLegacyIdentityInfo`)
- **interface**: `api.tx.identity.setIdentity`
- **summary**:    Set an account's identity information and reserve the appropriate deposit. 

   If the account already has identity information, the deposit is taken as part payment  for the new deposit. 

   The dispatch origin for this call must be _Signed_. 

   - `info`: The identity information. 

   Emits `IdentitySet` if successful. 
 
### setPrimaryUsername(username: `Bytes`)
- **interface**: `api.tx.identity.setPrimaryUsername`
- **summary**:    Set a given username as the primary. The username should include the suffix. 
 
### setSubs(subs: `Vec<(AccountId32,Data)>`)
- **interface**: `api.tx.identity.setSubs`
- **summary**:    Set the sub-accounts of the sender. 

   Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned  and an amount `SubAccountDeposit` will be reserved for each item in `subs`. 

   The dispatch origin for this call must be _Signed_ and the sender must have a registered  identity. 

   - `subs`: The identity's (new) sub-accounts. 
 
### setUsernameFor(who: `MultiAddress`, username: `Bytes`, signature: `Option<SpRuntimeMultiSignature>`, use_allocation: `bool`)
- **interface**: `api.tx.identity.setUsernameFor`
- **summary**:    Set the username for `who`. Must be called by a username authority. 

   If `use_allocation` is set, the authority must have a username allocation available to  spend. Otherwise, the authority will need to put up a deposit for registering the  username. 

   Users can either pre-sign their usernames or  accept them later. 

   Usernames must: 

  - Only contain lowercase ASCII characters or digits.

  - When combined with the suffix of the issuing authority be _less than_ the `MaxUsernameLength`. 
 
### unbindUsername(username: `Bytes`)
- **interface**: `api.tx.identity.unbindUsername`
- **summary**:    Start the process of removing a username by placing it in the unbinding usernames map.  Once the grace period has passed, the username can be deleted by calling  [remove_username](crate::Call::remove_username). 

___


## imOnline
 
### heartbeat(heartbeat: `PalletImOnlineHeartbeat`, signature: `PalletImOnlineSr25519AppSr25519Signature`)
- **interface**: `api.tx.imOnline.heartbeat`
- **summary**:    #### Complexity: 

  - `O(K)` where K is length of `Keys` (heartbeat.validators_len)

  - `O(K)`: decoding of length `K`

___


## indices
 
### claim(index: `u32`)
- **interface**: `api.tx.indices.claim`
- **summary**:    Assign an previously unassigned index. 

   Payment: `Deposit` is reserved from the sender account. 

   The dispatch origin for this call must be _Signed_. 

   - `index`: the index to be claimed. This must not be in use. 

   Emits `IndexAssigned` if successful. 

   #### Complexity 

  - `O(1)`.
 
### forceTransfer(new: `MultiAddress`, index: `u32`, freeze: `bool`)
- **interface**: `api.tx.indices.forceTransfer`
- **summary**:    Force an index to an account. This doesn't require a deposit. If the index is already  held, then any deposit is reimbursed to its current owner. 

   The dispatch origin for this call must be _Root_. 

   - `index`: the index to be (re-)assigned. 

  - `new`: the new owner of the index. This function is a no-op if it is equal to sender.

  - `freeze`: if set to `true`, will freeze the index so it cannot be transferred.

   Emits `IndexAssigned` if successful. 

   #### Complexity 

  - `O(1)`.
 
### free(index: `u32`)
- **interface**: `api.tx.indices.free`
- **summary**:    Free up an index owned by the sender. 

   Payment: Any previous deposit placed for the index is unreserved in the sender account. 

   The dispatch origin for this call must be _Signed_ and the sender must own the index. 

   - `index`: the index to be freed. This must be owned by the sender. 

   Emits `IndexFreed` if successful. 

   #### Complexity 

  - `O(1)`.
 
### freeze(index: `u32`)
- **interface**: `api.tx.indices.freeze`
- **summary**:    Freeze an index so it will always point to the sender account. This consumes the  deposit. 

   The dispatch origin for this call must be _Signed_ and the signing account must have a  non-frozen account `index`. 

   - `index`: the index to be frozen in place. 

   Emits `IndexFrozen` if successful. 

   #### Complexity 

  - `O(1)`.
 
### pokeDeposit(index: `u32`)
- **interface**: `api.tx.indices.pokeDeposit`
- **summary**:    Poke the deposit reserved for an index. 

   The dispatch origin for this call must be _Signed_ and the signing account must have a  non-frozen account `index`. 

   The transaction fees is waived if the deposit is changed after poking/reconsideration. 

   - `index`: the index whose deposit is to be poked/reconsidered. 

   Emits `DepositPoked` if successful. 
 
### transfer(new: `MultiAddress`, index: `u32`)
- **interface**: `api.tx.indices.transfer`
- **summary**:    Assign an index already owned by the sender to another account. The balance reservation  is effectively transferred to the new account. 

   The dispatch origin for this call must be _Signed_. 

   - `index`: the index to be re-assigned. This must be owned by the sender. 

  - `new`: the new owner of the index. This function is a no-op if it is equal to sender.

   Emits `IndexAssigned` if successful. 

   #### Complexity 

  - `O(1)`.

___


## lottery
 
### buyTicket(call: `Call`)
- **interface**: `api.tx.lottery.buyTicket`
- **summary**:    Buy a ticket to enter the lottery. 

   This extrinsic acts as a passthrough function for `call`. In all  situations where `call` alone would succeed, this extrinsic should  succeed. 

   If `call` is successful, then we will attempt to purchase a ticket,  which may fail silently. To detect success of a ticket purchase, you  should listen for the `TicketBought` event. 

   This extrinsic must be called by a signed origin. 
 
### setCalls(calls: `Vec<Call>`)
- **interface**: `api.tx.lottery.setCalls`
- **summary**:    Set calls in storage which can be used to purchase a lottery ticket. 

   This function only matters if you use the `ValidateCall` implementation  provided by this pallet, which uses storage to determine the valid calls. 

   This extrinsic must be called by the Manager origin. 
 
### startLottery(price: `u128`, length: `u32`, delay: `u32`, repeat: `bool`)
- **interface**: `api.tx.lottery.startLottery`
- **summary**:    Start a lottery using the provided configuration. 

   This extrinsic must be called by the `ManagerOrigin`. 

   Parameters: 

   * `price`: The cost of a single ticket. 

  * `length`: How long the lottery should run for starting at the current block.

  * `delay`: How long after the lottery end we should wait before picking a winner.

  * `repeat`: If the lottery should repeat when completed.
 
### stopRepeat()
- **interface**: `api.tx.lottery.stopRepeat`
- **summary**:    If a lottery is repeating, you can use this to stop the repeat.  The lottery will continue to run to completion. 

   This extrinsic must be called by the `ManagerOrigin`. 

___


## messageQueue
 
### executeOverweight(message_origin: `u32`, page: `u32`, index: `u32`, weight_limit: `SpWeightsWeightV2Weight`)
- **interface**: `api.tx.messageQueue.executeOverweight`
- **summary**:    Execute an overweight message. 

   Temporary processing errors will be propagated whereas permanent errors are treated  as success condition. 

   - `origin`: Must be `Signed`. 

  - `message_origin`: The origin from which the message to be executed arrived.

  - `page`: The page in the queue in which the message to be executed is sitting.

  - `index`: The index into the queue of the message to be executed.

  - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution of the message. 

   Benchmark complexity considerations: O(index + weight_limit). 
 
### reapPage(message_origin: `u32`, page_index: `u32`)
- **interface**: `api.tx.messageQueue.reapPage`
- **summary**:    Remove a page which has no more messages remaining to be processed or is stale. 

___


## metaTx
 
### dispatch(meta_tx: `PalletMetaTxMetaTx`)
- **interface**: `api.tx.metaTx.dispatch`
- **summary**:    Dispatch a given meta transaction. 

   - `_origin`: Can be any kind of origin. 

  - `meta_tx`: Meta Transaction with a target call to be dispatched.

___


## mixnet
 
### register(registration: `PalletMixnetRegistration`, signature: `SpMixnetAppSignature`)
- **interface**: `api.tx.mixnet.register`
- **summary**:    Register a mixnode for the following session. 

___


## multiBlockMigrations
 
### clearHistoric(selector: `PalletMigrationsHistoricCleanupSelector`)
- **interface**: `api.tx.multiBlockMigrations.clearHistoric`
- **summary**:    Clears the `Historic` set. 

   `map_cursor` must be set to the last value that was returned by the  `HistoricCleared` event. The first time `None` can be used. `limit` must be chosen in a  way that will result in a sensible weight. 
 
### forceOnboardMbms()
- **interface**: `api.tx.multiBlockMigrations.forceOnboardMbms`
- **summary**:    Forces the onboarding of the migrations. 

   This process happens automatically on a runtime upgrade. It is in place as an emergency  measurement. The cursor needs to be `None` for this to succeed. 
 
### forceSetActiveCursor(index: `u32`, inner_cursor: `Option<Bytes>`, started_at: `Option<u32>`)
- **interface**: `api.tx.multiBlockMigrations.forceSetActiveCursor`
- **summary**:    Allows root to set an active cursor to forcefully start/forward the migration process. 

   This is an edge-case version of [`Self::force_set_cursor`] that allows to set the  `started_at` value to the next block number. Otherwise this would not be possible, since  `force_set_cursor` takes an absolute block number. Setting `started_at` to `None`  indicates that the current block number plus one should be used. 
 
### forceSetCursor(cursor: `Option<PalletMigrationsMigrationCursor>`)
- **interface**: `api.tx.multiBlockMigrations.forceSetCursor`
- **summary**:    Allows root to set a cursor to forcefully start, stop or forward the migration process. 

   Should normally not be needed and is only in place as emergency measure. Note that  restarting the migration process in this manner will not call the  [`MigrationStatusHandler::started`] hook or emit an `UpgradeStarted` event. 

___


## multisig
 
### approveAsMulti(threshold: `u16`, other_signatories: `Vec<AccountId32>`, maybe_timepoint: `Option<PalletMultisigTimepoint>`, call_hash: `[u8;32]`, max_weight: `SpWeightsWeightV2Weight`)
- **interface**: `api.tx.multisig.approveAsMulti`
- **summary**:    Register approval for a dispatch to be made from a deterministic composite account if  approved by a total of `threshold - 1` of `other_signatories`. 

   Payment: `DepositBase` will be reserved if this is the first approval, plus  `threshold` times `DepositFactor`. It is returned once this dispatch happens or  is cancelled. 

   The dispatch origin for this call must be _Signed_. 

   - `threshold`: The total number of approvals for this dispatch before it is executed. 

  - `other_signatories`: The accounts (other than the sender) who can approve this dispatch. May not be empty. 

  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is not the first approval, then it must be `Some`, with the timepoint (block number and  transaction index) of the first approval transaction. 

  - `call_hash`: The hash of the call to be executed.

   NOTE: If this is the final approval, you will want to use `as_multi` instead. 

   #### Complexity 

  - `O(S)`.

  - Up to one balance-reserve or unreserve operation.

  - One passthrough operation, one insert, both `O(S)` where `S` is the number of signatories. `S` is capped by `MaxSignatories`, with weight being proportional. 

  - One encode & hash, both of complexity `O(S)`.

  - Up to one binary search and insert (`O(logS + S)`).

  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.

  - One event.

  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit taken for its lifetime of `DepositBase + threshold * DepositFactor`. 
 
### asMulti(threshold: `u16`, other_signatories: `Vec<AccountId32>`, maybe_timepoint: `Option<PalletMultisigTimepoint>`, call: `Call`, max_weight: `SpWeightsWeightV2Weight`)
- **interface**: `api.tx.multisig.asMulti`
- **summary**:    Register approval for a dispatch to be made from a deterministic composite account if  approved by a total of `threshold - 1` of `other_signatories`. 

   If there are enough, then dispatch the call. 

   Payment: `DepositBase` will be reserved if this is the first approval, plus  `threshold` times `DepositFactor`. It is returned once this dispatch happens or  is cancelled. 

   The dispatch origin for this call must be _Signed_. 

   - `threshold`: The total number of approvals for this dispatch before it is executed. 

  - `other_signatories`: The accounts (other than the sender) who can approve this dispatch. May not be empty. 

  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is not the first approval, then it must be `Some`, with the timepoint (block number and  transaction index) of the first approval transaction. 

  - `call`: The call to be executed.

   NOTE: Unless this is the final approval, you will generally want to use  `approve_as_multi` instead, since it only requires a hash of the call. 

   Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise  on success, result is `Ok` and the result from the interior call, if it was executed,  may be found in the deposited `MultisigExecuted` event. 

   #### Complexity 

  - `O(S + Z + Call)`.

  - Up to one balance-reserve or unreserve operation.

  - One passthrough operation, one insert, both `O(S)` where `S` is the number of signatories. `S` is capped by `MaxSignatories`, with weight being proportional. 

  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.

  - One encode & hash, both of complexity `O(S)`.

  - Up to one binary search and insert (`O(logS + S)`).

  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.

  - One event.

  - The weight of the `call`.

  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit taken for its lifetime of `DepositBase + threshold * DepositFactor`. 
 
### asMultiThreshold1(other_signatories: `Vec<AccountId32>`, call: `Call`)
- **interface**: `api.tx.multisig.asMultiThreshold1`
- **summary**:    Immediately dispatch a multi-signature call using a single approval from the caller. 

   The dispatch origin for this call must be _Signed_. 

   - `other_signatories`: The accounts (other than the sender) who are part of the  multi-signature, but do not participate in the approval process. 

  - `call`: The call to be executed.

   Result is equivalent to the dispatched result. 

   #### Complexity  O(Z + C) where Z is the length of the call and C its execution weight. 
 
### cancelAsMulti(threshold: `u16`, other_signatories: `Vec<AccountId32>`, timepoint: `PalletMultisigTimepoint`, call_hash: `[u8;32]`)
- **interface**: `api.tx.multisig.cancelAsMulti`
- **summary**:    Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously  for this operation will be unreserved on success. 

   The dispatch origin for this call must be _Signed_. 

   - `threshold`: The total number of approvals for this dispatch before it is executed. 

  - `other_signatories`: The accounts (other than the sender) who can approve this dispatch. May not be empty. 

  - `timepoint`: The timepoint (block number and transaction index) of the first approval transaction for this dispatch. 

  - `call_hash`: The hash of the call to be executed.

   #### Complexity 

  - `O(S)`.

  - Up to one balance-reserve or unreserve operation.

  - One passthrough operation, one insert, both `O(S)` where `S` is the number of signatories. `S` is capped by `MaxSignatories`, with weight being proportional. 

  - One encode & hash, both of complexity `O(S)`.

  - One event.

  - I/O: 1 read `O(S)`, one remove.

  - Storage: removes one item.
 
### pokeDeposit(threshold: `u16`, other_signatories: `Vec<AccountId32>`, call_hash: `[u8;32]`)
- **interface**: `api.tx.multisig.pokeDeposit`
- **summary**:    Poke the deposit reserved for an existing multisig operation. 

   The dispatch origin for this call must be _Signed_ and must be the original depositor of  the multisig operation. 

   The transaction fee is waived if the deposit amount has changed. 

   - `threshold`: The total number of approvals needed for this multisig. 

  - `other_signatories`: The accounts (other than the sender) who are part of the multisig. 

  - `call_hash`: The hash of the call this deposit is reserved for.

   Emits `DepositPoked` if successful. 

___


## nftFractionalization
 
### fractionalize(nft_collection_id: `u32`, nft_id: `u32`, asset_id: `u32`, beneficiary: `MultiAddress`, fractions: `u128`)
- **interface**: `api.tx.nftFractionalization.fractionalize`
- **summary**:    Lock the NFT and mint a new fungible asset. 

   The dispatch origin for this call must be Signed.  The origin must be the owner of the NFT they are trying to lock. 

   `Deposit` funds of sender are reserved. 

   - `nft_collection_id`: The ID used to identify the collection of the NFT.  Is used within the context of `pallet_nfts`. 

  - `nft_id`: The ID used to identify the NFT within the given collection. Is used within the context of `pallet_nfts`. 

  - `asset_id`: The ID of the new asset. It must not exist. Is used within the context of `pallet_assets`. 

  - `beneficiary`: The account that will receive the newly created asset.

  - `fractions`: The total issuance of the newly created asset class.

   Emits `NftFractionalized` event when successful. 
 
### unify(nft_collection_id: `u32`, nft_id: `u32`, asset_id: `u32`, beneficiary: `MultiAddress`)
- **interface**: `api.tx.nftFractionalization.unify`
- **summary**:    Burn the total issuance of the fungible asset and return (unlock) the locked NFT. 

   The dispatch origin for this call must be Signed. 

   `Deposit` funds will be returned to `asset_creator`. 

   - `nft_collection_id`: The ID used to identify the collection of the NFT.  Is used within the context of `pallet_nfts`. 

  - `nft_id`: The ID used to identify the NFT within the given collection. Is used within the context of `pallet_nfts`. 

  - `asset_id`: The ID of the asset being returned and destroyed. Must match the original ID of the created asset, corresponding to the NFT.  Is used within the context of `pallet_assets`. 

  - `beneficiary`: The account that will receive the unified NFT.

   Emits `NftUnified` event when successful. 

___


## nfts
 
### approveItemAttributes(collection: `u32`, item: `u32`, delegate: `MultiAddress`)
- **interface**: `api.tx.nfts.approveItemAttributes`
- **summary**:    Approve item's attributes to be changed by a delegated third-party account. 

   Origin must be Signed and must be an owner of the `item`. 

   - `collection`: A collection of the item. 

  - `item`: The item that holds attributes.

  - `delegate`: The account to delegate permission to change attributes of the item.

   Emits `ItemAttributesApprovalAdded` on success. 
 
### approveTransfer(collection: `u32`, item: `u32`, delegate: `MultiAddress`, maybe_deadline: `Option<u32>`)
- **interface**: `api.tx.nfts.approveTransfer`
- **summary**:    Approve an item to be transferred by a delegated third-party account. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the  `item`. 

   - `collection`: The collection of the item to be approved for delegated transfer. 

  - `item`: The item to be approved for delegated transfer.

  - `delegate`: The account to delegate permission to transfer the item.

  - `maybe_deadline`: Optional deadline for the approval. Specified by providing the number of blocks after which the approval will expire 

   Emits `TransferApproved` on success. 

   Weight: `O(1)` 
 
### burn(collection: `u32`, item: `u32`)
- **interface**: `api.tx.nfts.burn`
- **summary**:    Destroy a single item. 

   The origin must conform to `ForceOrigin` or must be Signed and the signing account must  be the owner of the `item`. 

   - `collection`: The collection of the item to be burned. 

  - `item`: The item to be burned.

   Emits `Burned`. 

   Weight: `O(1)` 
 
### buyItem(collection: `u32`, item: `u32`, bid_price: `u128`)
- **interface**: `api.tx.nfts.buyItem`
- **summary**:    Allows to buy an item if it's up for sale. 

   Origin must be Signed and must not be the owner of the `item`. 

   - `collection`: The collection of the item. 

  - `item`: The item the sender wants to buy.

  - `bid_price`: The price the sender is willing to pay.

   Emits `ItemBought` on success. 
 
### cancelApproval(collection: `u32`, item: `u32`, delegate: `MultiAddress`)
- **interface**: `api.tx.nfts.cancelApproval`
- **summary**:    Cancel one of the transfer approvals for a specific item. 

   Origin must be either: 

  - the `Force` origin;

  - `Signed` with the signer being the Owner of the `item`;

   Arguments: 

  - `collection`: The collection of the item of whose approval will be cancelled.

  - `item`: The item of the collection of whose approval will be cancelled.

  - `delegate`: The account that is going to loose their approval.

   Emits `ApprovalCancelled` on success. 

   Weight: `O(1)` 
 
### cancelItemAttributesApproval(collection: `u32`, item: `u32`, delegate: `MultiAddress`, witness: `PalletNftsCancelAttributesApprovalWitness`)
- **interface**: `api.tx.nfts.cancelItemAttributesApproval`
- **summary**:    Cancel the previously provided approval to change item's attributes.  All the previously set attributes by the `delegate` will be removed. 

   Origin must be Signed and must be an owner of the `item`. 

   - `collection`: Collection that the item is contained within. 

  - `item`: The item that holds attributes.

  - `delegate`: The previously approved account to remove.

   Emits `ItemAttributesApprovalRemoved` on success. 
 
### cancelSwap(offered_collection: `u32`, offered_item: `u32`)
- **interface**: `api.tx.nfts.cancelSwap`
- **summary**:    Cancel an atomic swap. 

   Origin must be Signed.  Origin must be an owner of the `item` if the deadline hasn't expired. 

   - `collection`: The collection of the item. 

  - `item`: The item an owner wants to give.

   Emits `SwapCancelled` on success. 
 
### claimSwap(send_collection: `u32`, send_item: `u32`, receive_collection: `u32`, receive_item: `u32`, witness_price: `Option<PalletNftsPriceWithDirection>`)
- **interface**: `api.tx.nfts.claimSwap`
- **summary**:    Claim an atomic swap.  This method executes a pending swap, that was created by a counterpart before. 

   Origin must be Signed and must be an owner of the `item`. 

   - `send_collection`: The collection of the item to be sent. 

  - `send_item`: The item to be sent.

  - `receive_collection`: The collection of the item to be received.

  - `receive_item`: The item to be received.

  - `witness_price`: A price that was previously agreed on.

   Emits `SwapClaimed` on success. 
 
### clearAllTransferApprovals(collection: `u32`, item: `u32`)
- **interface**: `api.tx.nfts.clearAllTransferApprovals`
- **summary**:    Cancel all the approvals of a specific item. 

   Origin must be either: 

  - the `Force` origin;

  - `Signed` with the signer being the Owner of the `item`;

   Arguments: 

  - `collection`: The collection of the item of whose approvals will be cleared.

  - `item`: The item of the collection of whose approvals will be cleared.

   Emits `AllApprovalsCancelled` on success. 

   Weight: `O(1)` 
 
### clearAttribute(collection: `u32`, maybe_item: `Option<u32>`, namespace: `PalletNftsAttributeNamespace`, key: `Bytes`)
- **interface**: `api.tx.nfts.clearAttribute`
- **summary**:    Clear an attribute for a collection or item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the  attribute. 

   Any deposit is freed for the collection's owner. 

   - `collection`: The identifier of the collection whose item's metadata to clear. 

  - `maybe_item`: The identifier of the item whose metadata to clear.

  - `namespace`: Attribute's namespace.

  - `key`: The key of the attribute.

   Emits `AttributeCleared`. 

   Weight: `O(1)` 
 
### clearCollectionMetadata(collection: `u32`)
- **interface**: `api.tx.nfts.clearCollectionMetadata`
- **summary**:    Clear the metadata for a collection. 

   Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of  the `collection`. 

   Any deposit is freed for the collection's owner. 

   - `collection`: The identifier of the collection whose metadata to clear. 

   Emits `CollectionMetadataCleared`. 

   Weight: `O(1)` 
 
### clearMetadata(collection: `u32`, item: `u32`)
- **interface**: `api.tx.nfts.clearMetadata`
- **summary**:    Clear the metadata for an item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the  `collection`. 

   Any deposit is freed for the collection's owner. 

   - `collection`: The identifier of the collection whose item's metadata to clear. 

  - `item`: The identifier of the item whose metadata to clear.

   Emits `ItemMetadataCleared`. 

   Weight: `O(1)` 
 
### create(admin: `MultiAddress`, config: `PalletNftsCollectionConfig`)
- **interface**: `api.tx.nfts.create`
- **summary**:    Issue a new collection of non-fungible items from a public origin. 

   This new collection has no items initially and its owner is the origin. 

   The origin must be Signed and the sender must have sufficient funds free. 

   `CollectionDeposit` funds of sender are reserved. 

   Parameters: 

  - `admin`: The admin of this collection. The admin is the initial address of each member of the collection's admin team. 

   Emits `Created` event when successful. 

   Weight: `O(1)` 
 
### createSwap(offered_collection: `u32`, offered_item: `u32`, desired_collection: `u32`, maybe_desired_item: `Option<u32>`, maybe_price: `Option<PalletNftsPriceWithDirection>`, duration: `u32`)
- **interface**: `api.tx.nfts.createSwap`
- **summary**:    Register a new atomic swap, declaring an intention to send an `item` in exchange for  `desired_item` from origin to target on the current blockchain.  The target can execute the swap during the specified `duration` of blocks (if set).  Additionally, the price could be set for the desired `item`. 

   Origin must be Signed and must be an owner of the `item`. 

   - `collection`: The collection of the item. 

  - `item`: The item an owner wants to give.

  - `desired_collection`: The collection of the desired item.

  - `desired_item`: The desired item an owner wants to receive.

  - `maybe_price`: The price an owner is willing to pay or receive for the desired `item`.

  - `duration`: A deadline for the swap. Specified by providing the number of blocks after which the swap will expire. 

   Emits `SwapCreated` on success. 
 
### destroy(collection: `u32`, witness: `PalletNftsDestroyWitness`)
- **interface**: `api.tx.nfts.destroy`
- **summary**:    Destroy a collection of fungible items. 

   The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the  owner of the `collection`. 

   NOTE: The collection must have 0 items to be destroyed. 

   - `collection`: The identifier of the collection to be destroyed. 

  - `witness`: Information on the items minted in the collection. This must be correct. 

   Emits `Destroyed` event when successful. 

   Weight: `O(m + c + a)` where: 

  - `m = witness.item_metadatas`

  - `c = witness.item_configs`

  - `a = witness.attributes`
 
### forceCollectionConfig(collection: `u32`, config: `PalletNftsCollectionConfig`)
- **interface**: `api.tx.nfts.forceCollectionConfig`
- **summary**:    Change the config of a collection. 

   Origin must be `ForceOrigin`. 

   - `collection`: The identifier of the collection. 

  - `config`: The new config of this collection.

   Emits `CollectionConfigChanged`. 

   Weight: `O(1)` 
 
### forceCollectionOwner(collection: `u32`, owner: `MultiAddress`)
- **interface**: `api.tx.nfts.forceCollectionOwner`
- **summary**:    Change the Owner of a collection. 

   Origin must be `ForceOrigin`. 

   - `collection`: The identifier of the collection. 

  - `owner`: The new Owner of this collection.

   Emits `OwnerChanged`. 

   Weight: `O(1)` 
 
### forceCreate(owner: `MultiAddress`, config: `PalletNftsCollectionConfig`)
- **interface**: `api.tx.nfts.forceCreate`
- **summary**:    Issue a new collection of non-fungible items from a privileged origin. 

   This new collection has no items initially. 

   The origin must conform to `ForceOrigin`. 

   Unlike `create`, no funds are reserved. 

   - `owner`: The owner of this collection of items. The owner has full superuser  permissions over this item, but may later change and configure the permissions using  `transfer_ownership` and `set_team`. 

   Emits `ForceCreated` event when successful. 

   Weight: `O(1)` 
 
### forceMint(collection: `u32`, item: `u32`, mint_to: `MultiAddress`, item_config: `PalletNftsItemConfig`)
- **interface**: `api.tx.nfts.forceMint`
- **summary**:    Mint an item of a particular collection from a privileged origin. 

   The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the  Issuer of the `collection`. 

   - `collection`: The collection of the item to be minted. 

  - `item`: An identifier of the new item.

  - `mint_to`: Account into which the item will be minted.

  - `item_config`: A config of the new item.

   Emits `Issued` event when successful. 

   Weight: `O(1)` 
 
### forceSetAttribute(set_as: `Option<AccountId32>`, collection: `u32`, maybe_item: `Option<u32>`, namespace: `PalletNftsAttributeNamespace`, key: `Bytes`, value: `Bytes`)
- **interface**: `api.tx.nfts.forceSetAttribute`
- **summary**:    Force-set an attribute for a collection or item. 

   Origin must be `ForceOrigin`. 

   If the attribute already exists and it was set by another account, the deposit  will be returned to the previous owner. 

   - `set_as`: An optional owner of the attribute. 

  - `collection`: The identifier of the collection whose item's metadata to set.

  - `maybe_item`: The identifier of the item whose metadata to set.

  - `namespace`: Attribute's namespace.

  - `key`: The key of the attribute.

  - `value`: The value to which to set the attribute.

   Emits `AttributeSet`. 

   Weight: `O(1)` 
 
### lockCollection(collection: `u32`, lock_settings: `u64`)
- **interface**: `api.tx.nfts.lockCollection`
- **summary**:    Disallows specified settings for the whole collection. 

   Origin must be Signed and the sender should be the Owner of the `collection`. 

   - `collection`: The collection to be locked. 

  - `lock_settings`: The settings to be locked.

   Note: it's possible to only lock(set) the setting, but not to unset it. 

   Emits `CollectionLocked`. 

   Weight: `O(1)` 
 
### lockItemProperties(collection: `u32`, item: `u32`, lock_metadata: `bool`, lock_attributes: `bool`)
- **interface**: `api.tx.nfts.lockItemProperties`
- **summary**:    Disallows changing the metadata or attributes of the item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Admin  of the `collection`. 

   - `collection`: The collection if the `item`. 

  - `item`: An item to be locked.

  - `lock_metadata`: Specifies whether the metadata should be locked.

  - `lock_attributes`: Specifies whether the attributes in the `CollectionOwner` namespace should be locked. 

   Note: `lock_attributes` affects the attributes in the `CollectionOwner` namespace only.  When the metadata or attributes are locked, it won't be possible the unlock them. 

   Emits `ItemPropertiesLocked`. 

   Weight: `O(1)` 
 
### lockItemTransfer(collection: `u32`, item: `u32`)
- **interface**: `api.tx.nfts.lockItemTransfer`
- **summary**:    Disallow further unprivileged transfer of an item. 

   Origin must be Signed and the sender should be the Freezer of the `collection`. 

   - `collection`: The collection of the item to be changed. 

  - `item`: The item to become non-transferable.

   Emits `ItemTransferLocked`. 

   Weight: `O(1)` 
 
### mint(collection: `u32`, item: `u32`, mint_to: `MultiAddress`, witness_data: `Option<PalletNftsMintWitness>`)
- **interface**: `api.tx.nfts.mint`
- **summary**:    Mint an item of a particular collection. 

   The origin must be Signed and the sender must comply with the `mint_settings` rules. 

   - `collection`: The collection of the item to be minted. 

  - `item`: An identifier of the new item.

  - `mint_to`: Account into which the item will be minted.

  - `witness_data`: When the mint type is `HolderOf(collection_id)`, then the owned item_id from that collection needs to be provided within the witness data object. If  the mint price is set, then it should be additionally confirmed in the `witness_data`. 

   Note: the deposit will be taken from the `origin` and not the `owner` of the `item`. 

   Emits `Issued` event when successful. 

   Weight: `O(1)` 
 
### mintPreSigned(mint_data: `PalletNftsPreSignedMint`, signature: `SpRuntimeMultiSignature`, signer: `AccountId32`)
- **interface**: `api.tx.nfts.mintPreSigned`
- **summary**:    Mint an item by providing the pre-signed approval. 

   Origin must be Signed. 

   - `mint_data`: The pre-signed approval that consists of the information about the item,  its metadata, attributes, who can mint it (`None` for anyone) and until what block  number. 

  - `signature`: The signature of the `data` object.

  - `signer`: The `data` object's signer. Should be an Issuer of the collection.

   Emits `Issued` on success.  Emits `AttributeSet` if the attributes were provided.  Emits `ItemMetadataSet` if the metadata was not empty. 
 
### payTips(tips: `Vec<PalletNftsItemTip>`)
- **interface**: `api.tx.nfts.payTips`
- **summary**:    Allows to pay the tips. 

   Origin must be Signed. 

   - `tips`: Tips array. 

   Emits `TipSent` on every tip transfer. 
 
### redeposit(collection: `u32`, items: `Vec<u32>`)
- **interface**: `api.tx.nfts.redeposit`
- **summary**:    Re-evaluate the deposits on some items. 

   Origin must be Signed and the sender should be the Owner of the `collection`. 

   - `collection`: The collection of the items to be reevaluated. 

  - `items`: The items of the collection whose deposits will be reevaluated.

   NOTE: This exists as a best-effort function. Any items which are unknown or  in the case that the owner account does not have reservable funds to pay for a  deposit increase are ignored. Generally the owner isn't going to call this on items  whose existing deposit is less than the refreshed deposit as it would only cost them,  so it's of little consequence. 

   It will still return an error in the case that the collection is unknown or the signer  is not permitted to call it. 

   Weight: `O(items.len())` 
 
### setAcceptOwnership(maybe_collection: `Option<u32>`)
- **interface**: `api.tx.nfts.setAcceptOwnership`
- **summary**:    Set (or reset) the acceptance of ownership for a particular account. 

   Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a  provider reference. 

   - `maybe_collection`: The identifier of the collection whose ownership the signer is  willing to accept, or if `None`, an indication that the signer is willing to accept no  ownership transferal. 

   Emits `OwnershipAcceptanceChanged`. 
 
### setAttribute(collection: `u32`, maybe_item: `Option<u32>`, namespace: `PalletNftsAttributeNamespace`, key: `Bytes`, value: `Bytes`)
- **interface**: `api.tx.nfts.setAttribute`
- **summary**:    Set an attribute for a collection or item. 

   Origin must be Signed and must conform to the namespace ruleset: 

  - `CollectionOwner` namespace could be modified by the `collection` Admin only;

  - `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item` should be set in that case; 

  - `Account(AccountId)` namespace could be modified only when the `origin` was given a permission to do so; 

   The funds of `origin` are reserved according to the formula:  `AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into  account any already reserved funds. 

   - `collection`: The identifier of the collection whose item's metadata to set. 

  - `maybe_item`: The identifier of the item whose metadata to set.

  - `namespace`: Attribute's namespace.

  - `key`: The key of the attribute.

  - `value`: The value to which to set the attribute.

   Emits `AttributeSet`. 

   Weight: `O(1)` 
 
### setAttributesPreSigned(data: `PalletNftsPreSignedAttributes`, signature: `SpRuntimeMultiSignature`, signer: `AccountId32`)
- **interface**: `api.tx.nfts.setAttributesPreSigned`
- **summary**:    Set attributes for an item by providing the pre-signed approval. 

   Origin must be Signed and must be an owner of the `data.item`. 

   - `data`: The pre-signed approval that consists of the information about the item,  attributes to update and until what block number. 

  - `signature`: The signature of the `data` object.

  - `signer`: The `data` object's signer. Should be an Admin of the collection for the `CollectionOwner` namespace. 

   Emits `AttributeSet` for each provided attribute.  Emits `ItemAttributesApprovalAdded` if the approval wasn't set before.  Emits `PreSignedAttributesSet` on success. 
 
### setCollectionMaxSupply(collection: `u32`, max_supply: `u32`)
- **interface**: `api.tx.nfts.setCollectionMaxSupply`
- **summary**:    Set the maximum number of items a collection could have. 

   Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of  the `collection`. 

   - `collection`: The identifier of the collection to change. 

  - `max_supply`: The maximum number of items a collection could have.

   Emits `CollectionMaxSupplySet` event when successful. 
 
### setCollectionMetadata(collection: `u32`, data: `Bytes`)
- **interface**: `api.tx.nfts.setCollectionMetadata`
- **summary**:    Set the metadata for a collection. 

   Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of  the `collection`. 

   If the origin is `Signed`, then funds of signer are reserved according to the formula:  `MetadataDepositBase + DepositPerByte * data.len` taking into  account any already reserved funds. 

   - `collection`: The identifier of the item whose metadata to update. 

  - `data`: The general information of this item. Limited in length by `StringLimit`.

   Emits `CollectionMetadataSet`. 

   Weight: `O(1)` 
 
### setMetadata(collection: `u32`, item: `u32`, data: `Bytes`)
- **interface**: `api.tx.nfts.setMetadata`
- **summary**:    Set the metadata for an item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the  `collection`. 

   If the origin is Signed, then funds of signer are reserved according to the formula:  `MetadataDepositBase + DepositPerByte * data.len` taking into  account any already reserved funds. 

   - `collection`: The identifier of the collection whose item's metadata to set. 

  - `item`: The identifier of the item whose metadata to set.

  - `data`: The general information of this item. Limited in length by `StringLimit`.

   Emits `ItemMetadataSet`. 

   Weight: `O(1)` 
 
### setPrice(collection: `u32`, item: `u32`, price: `Option<u128>`, whitelisted_buyer: `Option<MultiAddress>`)
- **interface**: `api.tx.nfts.setPrice`
- **summary**:    Set (or reset) the price for an item. 

   Origin must be Signed and must be the owner of the `item`. 

   - `collection`: The collection of the item. 

  - `item`: The item to set the price for.

  - `price`: The price for the item. Pass `None`, to reset the price.

  - `buyer`: Restricts the buy operation to a specific account.

   Emits `ItemPriceSet` on success if the price is not `None`.  Emits `ItemPriceRemoved` on success if the price is `None`. 
 
### setTeam(collection: `u32`, issuer: `Option<MultiAddress>`, admin: `Option<MultiAddress>`, freezer: `Option<MultiAddress>`)
- **interface**: `api.tx.nfts.setTeam`
- **summary**:    Change the Issuer, Admin and Freezer of a collection. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the  `collection`. 

   Note: by setting the role to `None` only the `ForceOrigin` will be able to change it  after to `Some(account)`. 

   - `collection`: The collection whose team should be changed. 

  - `issuer`: The new Issuer of this collection.

  - `admin`: The new Admin of this collection.

  - `freezer`: The new Freezer of this collection.

   Emits `TeamChanged`. 

   Weight: `O(1)` 
 
### transfer(collection: `u32`, item: `u32`, dest: `MultiAddress`)
- **interface**: `api.tx.nfts.transfer`
- **summary**:    Move an item from the sender account to another. 

   Origin must be Signed and the signing account must be either: 

  - the Owner of the `item`;

  - the approved delegate for the `item` (in this case, the approval is reset).

   Arguments: 

  - `collection`: The collection of the item to be transferred.

  - `item`: The item to be transferred.

  - `dest`: The account to receive ownership of the item.

   Emits `Transferred`. 

   Weight: `O(1)` 
 
### transferOwnership(collection: `u32`, new_owner: `MultiAddress`)
- **interface**: `api.tx.nfts.transferOwnership`
- **summary**:    Change the Owner of a collection. 

   Origin must be Signed and the sender should be the Owner of the `collection`. 

   - `collection`: The collection whose owner should be changed. 

  - `owner`: The new Owner of this collection. They must have called `set_accept_ownership` with `collection` in order for this operation to succeed. 

   Emits `OwnerChanged`. 

   Weight: `O(1)` 
 
### unlockItemTransfer(collection: `u32`, item: `u32`)
- **interface**: `api.tx.nfts.unlockItemTransfer`
- **summary**:    Re-allow unprivileged transfer of an item. 

   Origin must be Signed and the sender should be the Freezer of the `collection`. 

   - `collection`: The collection of the item to be changed. 

  - `item`: The item to become transferable.

   Emits `ItemTransferUnlocked`. 

   Weight: `O(1)` 
 
### updateMintSettings(collection: `u32`, mint_settings: `PalletNftsMintSettings`)
- **interface**: `api.tx.nfts.updateMintSettings`
- **summary**:    Update mint settings. 

   Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer  of the `collection`. 

   - `collection`: The identifier of the collection to change. 

  - `mint_settings`: The new mint settings.

   Emits `CollectionMintSettingsUpdated` event when successful. 

___


## nis
 
### communify(index: `Compact<u32>`)
- **interface**: `api.tx.nis.communify`
- **summary**:    Make a private receipt communal and create fungible counterparts for its owner. 
 
### fundDeficit()
- **interface**: `api.tx.nis.fundDeficit`
- **summary**:    Ensure we have sufficient funding for all potential payouts. 

   - `origin`: Must be accepted by `FundOrigin`. 
 
### placeBid(amount: `Compact<u128>`, duration: `u32`)
- **interface**: `api.tx.nis.placeBid`
- **summary**:    Place a bid. 

   Origin must be Signed, and account must have at least `amount` in free balance. 

   - `amount`: The amount of the bid; these funds will be reserved, and if/when  consolidated, removed. Must be at least `MinBid`. 

  - `duration`: The number of periods before which the newly consolidated bid may be thawed. Must be greater than 1 and no more than `QueueCount`. 

   Complexities: 

  - `Queues[duration].len()` (just take max).
 
### privatize(index: `Compact<u32>`)
- **interface**: `api.tx.nis.privatize`
- **summary**:    Make a communal receipt private and burn fungible counterparts from its owner. 
 
### retractBid(amount: `Compact<u128>`, duration: `u32`)
- **interface**: `api.tx.nis.retractBid`
- **summary**:    Retract a previously placed bid. 

   Origin must be Signed, and the account should have previously issued a still-active bid  of `amount` for `duration`. 

   - `amount`: The amount of the previous bid. 

  - `duration`: The duration of the previous bid.
 
### thawCommunal(index: `Compact<u32>`)
- **interface**: `api.tx.nis.thawCommunal`
- **summary**:    Reduce or remove an outstanding receipt, placing the according proportion of funds into  the account of the owner. 

   - `origin`: Must be Signed and the account must be the owner of the fungible counterpart  for receipt `index`. 

  - `index`: The index of the receipt.
 
### thawPrivate(index: `Compact<u32>`, maybe_proportion: `Option<Perquintill>`)
- **interface**: `api.tx.nis.thawPrivate`
- **summary**:    Reduce or remove an outstanding receipt, placing the according proportion of funds into  the account of the owner. 

   - `origin`: Must be Signed and the account must be the owner of the receipt `index` as  well as any fungible counterpart. 

  - `index`: The index of the receipt.

  - `portion`: If `Some`, then only the given portion of the receipt should be thawed. If `None`, then all of it should be. 

___


## nominationPools
 
### adjustPoolDeposit(pool_id: `u32`)
- **interface**: `api.tx.nominationPools.adjustPoolDeposit`
- **summary**:    Top up the deficit or withdraw the excess ED from the pool. 

   When a pool is created, the pool depositor transfers ED to the reward account of the  pool. ED is subject to change and over time, the deposit in the reward account may be  insufficient to cover the ED deficit of the pool or vice-versa where there is excess  deposit to the pool. This call allows anyone to adjust the ED deposit of the  pool by either topping up the deficit or claiming the excess. 
 
### applySlash(member_account: `MultiAddress`)
- **interface**: `api.tx.nominationPools.applySlash`
- **summary**:    Apply a pending slash on a member. 

   Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:  [`adapter::StakeStrategyType::Delegate`]. 

   The pending slash amount of the member must be equal or more than `ExistentialDeposit`.  This call can be dispatched permissionlessly (i.e. by any account). If the execution  is successful, fee is refunded and caller may be rewarded with a part of the slash  based on the [`crate::pallet::Config::StakeAdapter`] configuration. 
 
### bondExtra(extra: `PalletNominationPoolsBondExtra`)
- **interface**: `api.tx.nominationPools.bondExtra`
- **summary**:    Bond `extra` more funds from `origin` into the pool to which they already belong. 

   Additional funds can come from either the free balance of the account, of from the  accumulated rewards, see [`BondExtra`]. 

   Bonding extra funds implies an automatic payout of all pending rewards as well.  See `bond_extra_other` to bond pending rewards of `other` members. 
 
### bondExtraOther(member: `MultiAddress`, extra: `PalletNominationPoolsBondExtra`)
- **interface**: `api.tx.nominationPools.bondExtraOther`
- **summary**:    `origin` bonds funds from `extra` for some pool member `member` into their respective  pools. 

   `origin` can bond extra funds from free balance or pending rewards when `origin ==  other`. 

   In the case of `origin != other`, `origin` can only bond extra pending rewards of  `other` members assuming set_claim_permission for the given member is  `PermissionlessCompound` or `PermissionlessAll`. 
 
### chill(pool_id: `u32`)
- **interface**: `api.tx.nominationPools.chill`
- **summary**:    Chill on behalf of the pool. 

   The dispatch origin of this call can be signed by the pool nominator or the pool  root role, same as [`Pallet::nominate`]. 

   This directly forwards the call to an implementation of `StakingInterface` (e.g.,  `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool. 

   Under certain conditions, this call can be dispatched permissionlessly (i.e. by any  account). 

   #### Conditions for a permissionless dispatch: 

  * When pool depositor has less than `MinNominatorBond` staked, otherwise pool members are unable to unbond. 

   #### Conditions for permissioned dispatch: 

  * The caller is the pool's nominator or root.
 
### claimCommission(pool_id: `u32`)
- **interface**: `api.tx.nominationPools.claimCommission`
- **summary**:    Claim pending commission. 

   The `root` role of the pool is _always_ allowed to claim the pool's commission. 

   If the pool has set `CommissionClaimPermission::Permissionless`, then any account can  trigger the process of claiming the pool's commission. 

   If the pool has set its `CommissionClaimPermission` to `Account(acc)`, then only  accounts 

  * `acc`, and

  * the pool's root account

   may call this extrinsic on behalf of the pool. 

   Pending commissions are paid out and added to the total claimed commission.  The total pending commission is reset to zero. 
 
### claimPayout()
- **interface**: `api.tx.nominationPools.claimPayout`
- **summary**:    A bonded member can use this to claim their payout based on the rewards that the pool  has accumulated since their last claimed payout (OR since joining if this is their first  time claiming rewards). The payout will be transferred to the member's account. 

   The member will earn rewards pro rata based on the members stake vs the sum of the  members in the pools stake. Rewards do not "expire". 

   See `claim_payout_other` to claim rewards on behalf of some `other` pool member. 
 
### claimPayoutOther(other: `AccountId32`)
- **interface**: `api.tx.nominationPools.claimPayoutOther`
- **summary**:    `origin` can claim payouts on some pool member `other`'s behalf. 

   Pool member `other` must have a `PermissionlessWithdraw` or `PermissionlessAll` claim  permission for this call to be successful. 
 
### create(amount: `Compact<u128>`, root: `MultiAddress`, nominator: `MultiAddress`, bouncer: `MultiAddress`)
- **interface**: `api.tx.nominationPools.create`
- **summary**:    Create a new delegation pool. 

   #### Arguments 

   * `amount` - The amount of funds to delegate to the pool. This also acts of a sort of  deposit since the pools creator cannot fully unbond funds until the pool is being  destroyed. 

  * `index` - A disambiguation index for creating the account. Likely only useful when creating multiple pools in the same extrinsic. 

  * `root` - The account to set as [`PoolRoles::root`].

  * `nominator` - The account to set as the [`PoolRoles::nominator`].

  * `bouncer` - The account to set as the [`PoolRoles::bouncer`].

   #### Note 

   In addition to `amount`, the caller will transfer the existential deposit; so the caller  needs at have at least `amount + existential_deposit` transferable. 
 
### createWithPoolId(amount: `Compact<u128>`, root: `MultiAddress`, nominator: `MultiAddress`, bouncer: `MultiAddress`, pool_id: `u32`)
- **interface**: `api.tx.nominationPools.createWithPoolId`
- **summary**:    Create a new delegation pool with a previously used pool id 

   #### Arguments 

   same as `create` with the inclusion of 

  * `pool_id` - `A valid PoolId.
 
### join(amount: `Compact<u128>`, pool_id: `u32`)
- **interface**: `api.tx.nominationPools.join`
- **summary**:    Stake funds with a pool. The amount to bond is delegated (or transferred based on  [`adapter::StakeStrategyType`]) from the member to the pool account and immediately  increases the pool's bond. 

   The method of transferring the amount to the pool account is determined by  [`adapter::StakeStrategyType`]. If the pool is configured to use  [`adapter::StakeStrategyType::Delegate`], the funds remain in the account of  the `origin`, while the pool gains the right to use these funds for staking. 

   #### Note 

   * An account can only be a member of a single pool. 

  * An account cannot join the same pool multiple times.

  * This call will *not* dust the member account, so the member must have at least `existential deposit + amount` in their account. 

  * Only a pool with [`PoolState::Open`] can be joined
 
### migrateDelegation(member_account: `MultiAddress`)
- **interface**: `api.tx.nominationPools.migrateDelegation`
- **summary**:    Migrates delegated funds from the pool account to the `member_account`. 

   Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:  [`adapter::StakeStrategyType::Delegate`]. 

   This is a permission-less call and refunds any fee if claim is successful. 

   If the pool has migrated to delegation based staking, the staked tokens of pool members  can be moved and held in their own account. See [`adapter::DelegateStake`] 
 
### migratePoolToDelegateStake(pool_id: `u32`)
- **interface**: `api.tx.nominationPools.migratePoolToDelegateStake`
- **summary**:    Migrate pool from [`adapter::StakeStrategyType::Transfer`] to  [`adapter::StakeStrategyType::Delegate`]. 

   Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:  [`adapter::StakeStrategyType::Delegate`]. 

   This call can be dispatched permissionlessly, and refunds any fee if successful. 

   If the pool has already migrated to delegation based staking, this call will fail. 
 
### nominate(pool_id: `u32`, validators: `Vec<AccountId32>`)
- **interface**: `api.tx.nominationPools.nominate`
- **summary**:    Nominate on behalf of the pool. 

   The dispatch origin of this call must be signed by the pool nominator or the pool  root role. 

   This directly forwards the call to an implementation of `StakingInterface` (e.g.,  `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool. 

   #### Note 

   In addition to a `root` or `nominator` role of `origin`, the pool's depositor needs to  have at least `depositor_min_bond` in the pool to start nominating. 
 
### poolWithdrawUnbonded(pool_id: `u32`, num_slashing_spans: `u32`)
- **interface**: `api.tx.nominationPools.poolWithdrawUnbonded`
- **summary**:    Call `withdraw_unbonded` for the pools account. This call can be made by any account. 

   This is useful if there are too many unlocking chunks to call `unbond`, and some  can be cleared by withdrawing. In the case there are too many unlocking chunks, the user  would probably see an error like `NoMoreChunks` emitted from the staking system when  they attempt to unbond. 
 
### setClaimPermission(permission: `PalletNominationPoolsClaimPermission`)
- **interface**: `api.tx.nominationPools.setClaimPermission`
- **summary**:    Allows a pool member to set a claim permission to allow or disallow permissionless  bonding and withdrawing. 

   #### Arguments 

   * `origin` - Member of a pool. 

  * `permission` - The permission to be applied.
 
### setCommission(pool_id: `u32`, new_commission: `Option<(Perbill,AccountId32)>`)
- **interface**: `api.tx.nominationPools.setCommission`
- **summary**:    Set the commission of a pool.  Both a commission percentage and a commission payee must be provided in the `current`  tuple. Where a `current` of `None` is provided, any current commission will be removed. 

   - If a `None` is supplied to `new_commission`, existing commission will be removed. 
 
### setCommissionChangeRate(pool_id: `u32`, change_rate: `PalletNominationPoolsCommissionChangeRate`)
- **interface**: `api.tx.nominationPools.setCommissionChangeRate`
- **summary**:    Set the commission change rate for a pool. 

   Initial change rate is not bounded, whereas subsequent updates can only be more  restrictive than the current. 
 
### setCommissionClaimPermission(pool_id: `u32`, permission: `Option<PalletNominationPoolsCommissionClaimPermission>`)
- **interface**: `api.tx.nominationPools.setCommissionClaimPermission`
- **summary**:    Set or remove a pool's commission claim permission. 

   Determines who can claim the pool's pending commission. Only the `Root` role of the pool  is able to configure commission claim permissions. 
 
### setCommissionMax(pool_id: `u32`, max_commission: `Perbill`)
- **interface**: `api.tx.nominationPools.setCommissionMax`
- **summary**:    Set the maximum commission of a pool. 

   - Initial max can be set to any `Perbill`, and only smaller values thereafter. 

  - Current commission will be lowered in the event it is higher than a new max commission. 
 
### setConfigs(min_join_bond: `PalletNominationPoolsConfigOpU128`, min_create_bond: `PalletNominationPoolsConfigOpU128`, max_pools: `PalletNominationPoolsConfigOpU32`, max_members: `PalletNominationPoolsConfigOpU32`, max_members_per_pool: `PalletNominationPoolsConfigOpU32`, global_max_commission: `PalletNominationPoolsConfigOpPerbill`)
- **interface**: `api.tx.nominationPools.setConfigs`
- **summary**:    Update configurations for the nomination pools. The origin for this call must be  [`Config::AdminOrigin`]. 

   #### Arguments 

   * `min_join_bond` - Set [`MinJoinBond`]. 

  * `min_create_bond` - Set [`MinCreateBond`].

  * `max_pools` - Set [`MaxPools`].

  * `max_members` - Set [`MaxPoolMembers`].

  * `max_members_per_pool` - Set [`MaxPoolMembersPerPool`].

  * `global_max_commission` - Set [`GlobalMaxCommission`].
 
### setMetadata(pool_id: `u32`, metadata: `Bytes`)
- **interface**: `api.tx.nominationPools.setMetadata`
- **summary**:    Set a new metadata for the pool. 

   The dispatch origin of this call must be signed by the bouncer, or the root role of the  pool. 
 
### setState(pool_id: `u32`, state: `PalletNominationPoolsPoolState`)
- **interface**: `api.tx.nominationPools.setState`
- **summary**:    Set a new state for the pool. 

   If a pool is already in the `Destroying` state, then under no condition can its state  change again. 

   The dispatch origin of this call must be either: 

   1. signed by the bouncer, or the root role of the pool,  2. if the pool conditions to be open are NOT met (as described by `ok_to_be_open`), and  then the state of the pool can be permissionlessly changed to `Destroying`. 
 
### unbond(member_account: `MultiAddress`, unbonding_points: `Compact<u128>`)
- **interface**: `api.tx.nominationPools.unbond`
- **summary**:    Unbond up to `unbonding_points` of the `member_account`'s funds from the pool. It  implicitly collects the rewards one last time, since not doing so would mean some  rewards would be forfeited. 

   Under certain conditions, this call can be dispatched permissionlessly (i.e. by any  account). 

   #### Conditions for a permissionless dispatch. 

   * The pool is blocked and the caller is either the root or bouncer. This is refereed to  as a kick. 

  * The pool is destroying and the member is not the depositor.

  * The pool is destroying, the member is the depositor and no other members are in the pool. 

   #### Conditions for permissioned dispatch (i.e. the caller is also the  `member_account`): 

   * The caller is not the depositor. 

  * The caller is the depositor, the pool is destroying and no other members are in the pool. 

   #### Note 

   If there are too many unlocking chunks to unbond with the pool account,  [`Call::pool_withdraw_unbonded`] can be called to try and minimize unlocking chunks.  The [`StakingInterface::unbond`] will implicitly call [`Call::pool_withdraw_unbonded`]  to try to free chunks if necessary (ie. if unbound was called and no unlocking chunks  are available). However, it may not be possible to release the current unlocking chunks,  in which case, the result of this call will likely be the `NoMoreChunks` error from the  staking system. 
 
### updateRoles(pool_id: `u32`, new_root: `PalletNominationPoolsConfigOpAccountId32`, new_nominator: `PalletNominationPoolsConfigOpAccountId32`, new_bouncer: `PalletNominationPoolsConfigOpAccountId32`)
- **interface**: `api.tx.nominationPools.updateRoles`
- **summary**:    Update the roles of the pool. 

   The root is the only entity that can change any of the roles, including itself,  excluding the depositor, who can never change. 

   It emits an event, notifying UIs of the role change. This event is quite relevant to  most pool members and they should be informed of changes to pool roles. 
 
### withdrawUnbonded(member_account: `MultiAddress`, num_slashing_spans: `u32`)
- **interface**: `api.tx.nominationPools.withdrawUnbonded`
- **summary**:    Withdraw unbonded funds from `member_account`. If no bonded funds can be unbonded, an  error is returned. 

   Under certain conditions, this call can be dispatched permissionlessly (i.e. by any  account). 

   #### Conditions for a permissionless dispatch 

   * The pool is in destroy mode and the target is not the depositor. 

  * The target is the depositor and they are the only member in the sub pools.

  * The pool is blocked and the caller is either the root or bouncer.

   #### Conditions for permissioned dispatch 

   * The caller is the target and they are not the depositor. 

   #### Note 

   - If the target is the depositor, the pool will be destroyed. 

  - If the pool has any pending slash, we also try to slash the member before letting them withdraw. This calculation adds some weight overhead and is only defensive. In reality,  pool slashes must have been already applied via permissionless [`Call::apply_slash`]. 

___


## parameters
 
### setParameter(key_value: `KitchensinkRuntimeRuntimeParameters`)
- **interface**: `api.tx.parameters.setParameter`
- **summary**:    Set the value of a parameter. 

   The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be  deleted by setting them to `None`. 

___


## poolAssets
 
### approveTransfer(id: `Compact<u32>`, delegate: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.approveTransfer`
- **summary**:    Approve an amount of asset for transfer by a delegated third-party account. 

   Origin must be Signed. 

   Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account  for the purpose of holding the approval. If some non-zero amount of assets is already  approved from signing account to `delegate`, then it is topped up or unreserved to  meet the right value. 

   NOTE: The signing account does not need to own `amount` of assets at the point of  making this call. 

   - `id`: The identifier of the asset. 

  - `delegate`: The account to delegate permission to transfer asset.

  - `amount`: The amount of asset that may be transferred by `delegate`. If there is already an approval in place, then this acts additively. 

   Emits `ApprovedTransfer` on success. 

   Weight: `O(1)` 
 
### block(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.poolAssets.block`
- **summary**:    Disallow further unprivileged transfers of an asset `id` to and from an account `who`. 

   Origin must be Signed and the sender should be the Freezer of the asset `id`. 

   - `id`: The identifier of the account's asset. 

  - `who`: The account to be unblocked.

   Emits `Blocked`. 

   Weight: `O(1)` 
 
### burn(id: `Compact<u32>`, who: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.burn`
- **summary**:    Reduce the balance of `who` by as much as possible up to `amount` assets of `id`. 

   Origin must be Signed and the sender should be the Manager of the asset `id`. 

   Bails with `NoAccount` if the `who` is already dead. 

   - `id`: The identifier of the asset to have some amount burned. 

  - `who`: The account to be debited from.

  - `amount`: The maximum amount by which `who`'s balance should be reduced.

   Emits `Burned` with the actual amount burned. If this takes the balance to below the  minimum for the asset, then the amount burned is increased to take it to zero. 

   Weight: `O(1)`  Modes: Post-existence of `who`; Pre & post Zombie-status of `who`. 
 
### cancelApproval(id: `Compact<u32>`, delegate: `MultiAddress`)
- **interface**: `api.tx.poolAssets.cancelApproval`
- **summary**:    Cancel all of some asset approved for delegated transfer by a third-party account. 

   Origin must be Signed and there must be an approval in place between signer and  `delegate`. 

   Unreserves any deposit previously reserved by `approve_transfer` for the approval. 

   - `id`: The identifier of the asset. 

  - `delegate`: The account delegated permission to transfer asset.

   Emits `ApprovalCancelled` on success. 

   Weight: `O(1)` 
 
### clearMetadata(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.clearMetadata`
- **summary**:    Clear the metadata for an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   Any deposit is freed for the asset owner. 

   - `id`: The identifier of the asset to clear. 

   Emits `MetadataCleared`. 

   Weight: `O(1)` 
 
### create(id: `Compact<u32>`, admin: `MultiAddress`, min_balance: `u128`)
- **interface**: `api.tx.poolAssets.create`
- **summary**:    Issue a new class of fungible assets from a public origin. 

   This new asset class has no assets initially and its owner is the origin. 

   The origin must conform to the configured `CreateOrigin` and have sufficient funds free. 

   Funds of sender are reserved by `AssetDeposit`. 

   Parameters: 

  - `id`: The identifier of the new asset. This must not be currently in use to identify an existing asset. If [`NextAssetId`] is set, then this must be equal to it. 

  - `admin`: The admin of this class of assets. The admin is the initial address of each member of the asset class's admin team. 

  - `min_balance`: The minimum balance of this new asset that any single account must have. If an account's balance is reduced below this, then it collapses to zero. 

   Emits `Created` event when successful. 

   Weight: `O(1)` 
 
### destroyAccounts(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.destroyAccounts`
- **summary**:    Destroy all accounts associated with a given asset. 

   `destroy_accounts` should only be called after `start_destroy` has been called, and the  asset is in a `Destroying` state. 

   Due to weight restrictions, this function may need to be called multiple times to fully  destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   Each call emits the `Event::DestroyedAccounts` event. 
 
### destroyApprovals(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.destroyApprovals`
- **summary**:    Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit). 

   `destroy_approvals` should only be called after `start_destroy` has been called, and the  asset is in a `Destroying` state. 

   Due to weight restrictions, this function may need to be called multiple times to fully  destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   Each call emits the `Event::DestroyedApprovals` event. 
 
### finishDestroy(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.finishDestroy`
- **summary**:    Complete destroying asset and unreserve currency. 

   `finish_destroy` should only be called after `start_destroy` has been called, and the  asset is in a `Destroying` state. All accounts or approvals should be destroyed before  hand. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   Each successful call emits the `Event::Destroyed` event. 
 
### forceAssetStatus(id: `Compact<u32>`, owner: `MultiAddress`, issuer: `MultiAddress`, admin: `MultiAddress`, freezer: `MultiAddress`, min_balance: `Compact<u128>`, is_sufficient: `bool`, is_frozen: `bool`)
- **interface**: `api.tx.poolAssets.forceAssetStatus`
- **summary**:    Alter the attributes of a given asset. 

   Origin must be `ForceOrigin`. 

   - `id`: The identifier of the asset. 

  - `owner`: The new Owner of this asset.

  - `issuer`: The new Issuer of this asset.

  - `admin`: The new Admin of this asset.

  - `freezer`: The new Freezer of this asset.

  - `min_balance`: The minimum balance of this new asset that any single account must have. If an account's balance is reduced below this, then it collapses to zero. 

  - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient value to account for the state bloat associated with its balance storage. If set to  `true`, then non-zero balances may be stored without a `consumer` reference (and thus  an ED in the Balances pallet or whatever else is used to control user-account state  growth). 

  - `is_frozen`: Whether this asset class is frozen except for permissioned/admin instructions. 

   Emits `AssetStatusChanged` with the identity of the asset. 

   Weight: `O(1)` 
 
### forceCancelApproval(id: `Compact<u32>`, owner: `MultiAddress`, delegate: `MultiAddress`)
- **interface**: `api.tx.poolAssets.forceCancelApproval`
- **summary**:    Cancel all of some asset approved for delegated transfer by a third-party account. 

   Origin must be either ForceOrigin or Signed origin with the signer being the Admin  account of the asset `id`. 

   Unreserves any deposit previously reserved by `approve_transfer` for the approval. 

   - `id`: The identifier of the asset. 

  - `delegate`: The account delegated permission to transfer asset.

   Emits `ApprovalCancelled` on success. 

   Weight: `O(1)` 
 
### forceClearMetadata(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.forceClearMetadata`
- **summary**:    Clear the metadata for an asset. 

   Origin must be ForceOrigin. 

   Any deposit is returned. 

   - `id`: The identifier of the asset to clear. 

   Emits `MetadataCleared`. 

   Weight: `O(1)` 
 
### forceCreate(id: `Compact<u32>`, owner: `MultiAddress`, is_sufficient: `bool`, min_balance: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.forceCreate`
- **summary**:    Issue a new class of fungible assets from a privileged origin. 

   This new asset class has no assets initially. 

   The origin must conform to `ForceOrigin`. 

   Unlike `create`, no funds are reserved. 

   - `id`: The identifier of the new asset. This must not be currently in use to identify  an existing asset. If [`NextAssetId`] is set, then this must be equal to it. 

  - `owner`: The owner of this class of assets. The owner has full superuser permissions over this asset, but may later change and configure the permissions using  `transfer_ownership` and `set_team`. 

  - `min_balance`: The minimum balance of this new asset that any single account must have. If an account's balance is reduced below this, then it collapses to zero. 

   Emits `ForceCreated` event when successful. 

   Weight: `O(1)` 
 
### forceSetMetadata(id: `Compact<u32>`, name: `Bytes`, symbol: `Bytes`, decimals: `u8`, is_frozen: `bool`)
- **interface**: `api.tx.poolAssets.forceSetMetadata`
- **summary**:    Force the metadata for an asset to some value. 

   Origin must be ForceOrigin. 

   Any deposit is left alone. 

   - `id`: The identifier of the asset to update. 

  - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.

  - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.

  - `decimals`: The number of decimals this asset uses to represent one unit.

   Emits `MetadataSet`. 

   Weight: `O(N + S)` where N and S are the length of the name and symbol respectively. 
 
### forceTransfer(id: `Compact<u32>`, source: `MultiAddress`, dest: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.forceTransfer`
- **summary**:    Move some assets from one account to another. 

   Origin must be Signed and the sender should be the Admin of the asset `id`. 

   - `id`: The identifier of the asset to have some amount transferred. 

  - `source`: The account to be debited.

  - `dest`: The account to be credited.

  - `amount`: The amount by which the `source`'s balance of assets should be reduced and `dest`'s balance increased. The amount actually transferred may be slightly greater in  the case that the transfer would otherwise take the `source` balance above zero but  below the minimum balance. Must be greater than zero. 

   Emits `Transferred` with the actual amount transferred. If this takes the source balance  to below the minimum for the asset, then the amount transferred is increased to take it  to zero. 

   Weight: `O(1)`  Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of  `dest`. 
 
### freeze(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.poolAssets.freeze`
- **summary**:    Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`  must already exist as an entry in `Account`s of the asset. If you want to freeze an  account that does not have an entry, use `touch_other` first. 

   Origin must be Signed and the sender should be the Freezer of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

  - `who`: The account to be frozen.

   Emits `Frozen`. 

   Weight: `O(1)` 
 
### freezeAsset(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.freezeAsset`
- **summary**:    Disallow further unprivileged transfers for the asset class. 

   Origin must be Signed and the sender should be the Freezer of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

   Emits `Frozen`. 

   Weight: `O(1)` 
 
### mint(id: `Compact<u32>`, beneficiary: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.mint`
- **summary**:    Mint assets of a particular class. 

   The origin must be Signed and the sender must be the Issuer of the asset `id`. 

   - `id`: The identifier of the asset to have some amount minted. 

  - `beneficiary`: The account to be credited with the minted assets.

  - `amount`: The amount of the asset to be minted.

   Emits `Issued` event when successful. 

   Weight: `O(1)`  Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`. 
 
### refund(id: `Compact<u32>`, allow_burn: `bool`)
- **interface**: `api.tx.poolAssets.refund`
- **summary**:    Return the deposit (if any) of an asset account or a consumer reference (if any) of an  account. 

   The origin must be Signed. 

   - `id`: The identifier of the asset for which the caller would like the deposit  refunded. 

  - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.

   It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if  the asset account contains holds or freezes in place. 

   Emits `Refunded` event when successful. 
 
### refundOther(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.poolAssets.refundOther`
- **summary**:    Return the deposit (if any) of a target asset account. Useful if you are the depositor. 

   The origin must be Signed and either the account owner, depositor, or asset `Admin`. In  order to burn a non-zero balance of the asset, the caller must be the account and should  use `refund`. 

   - `id`: The identifier of the asset for the account holding a deposit. 

  - `who`: The account to refund.

   It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if  the asset account contains holds or freezes in place. 

   Emits `Refunded` event when successful. 
 
### setMetadata(id: `Compact<u32>`, name: `Bytes`, symbol: `Bytes`, decimals: `u8`)
- **interface**: `api.tx.poolAssets.setMetadata`
- **summary**:    Set the metadata for an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   Funds of sender are reserved according to the formula:  `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into  account any already reserved funds. 

   - `id`: The identifier of the asset to update. 

  - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.

  - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.

  - `decimals`: The number of decimals this asset uses to represent one unit.

   Emits `MetadataSet`. 

   Weight: `O(1)` 
 
### setMinBalance(id: `Compact<u32>`, min_balance: `u128`)
- **interface**: `api.tx.poolAssets.setMinBalance`
- **summary**:    Sets the minimum balance of an asset. 

   Only works if there aren't any accounts that are holding the asset or if  the new value of `min_balance` is less than the old one. 

   Origin must be Signed and the sender has to be the Owner of the  asset `id`. 

   - `id`: The identifier of the asset. 

  - `min_balance`: The new value of `min_balance`.

   Emits `AssetMinBalanceChanged` event when successful. 
 
### setTeam(id: `Compact<u32>`, issuer: `MultiAddress`, admin: `MultiAddress`, freezer: `MultiAddress`)
- **interface**: `api.tx.poolAssets.setTeam`
- **summary**:    Change the Issuer, Admin and Freezer of an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

  - `issuer`: The new Issuer of this asset.

  - `admin`: The new Admin of this asset.

  - `freezer`: The new Freezer of this asset.

   Emits `TeamChanged`. 

   Weight: `O(1)` 
 
### startDestroy(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.startDestroy`
- **summary**:    Start the process of destroying a fungible asset class. 

   `start_destroy` is the first in a series of extrinsics that should be called, to allow  destruction of an asset class. 

   The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`. 

   - `id`: The identifier of the asset to be destroyed. This must identify an existing  asset. 

   It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if  an account contains holds or freezes in place. 
 
### thaw(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.poolAssets.thaw`
- **summary**:    Allow unprivileged transfers to and from an account again. 

   Origin must be Signed and the sender should be the Admin of the asset `id`. 

   - `id`: The identifier of the asset to be frozen. 

  - `who`: The account to be unfrozen.

   Emits `Thawed`. 

   Weight: `O(1)` 
 
### thawAsset(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.thawAsset`
- **summary**:    Allow unprivileged transfers for the asset again. 

   Origin must be Signed and the sender should be the Admin of the asset `id`. 

   - `id`: The identifier of the asset to be thawed. 

   Emits `Thawed`. 

   Weight: `O(1)` 
 
### touch(id: `Compact<u32>`)
- **interface**: `api.tx.poolAssets.touch`
- **summary**:    Create an asset account for non-provider assets. 

   A deposit will be taken from the signer account. 

   - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit  to be taken. 

  - `id`: The identifier of the asset for the account to be created.

   Emits `Touched` event when successful. 
 
### touchOther(id: `Compact<u32>`, who: `MultiAddress`)
- **interface**: `api.tx.poolAssets.touchOther`
- **summary**:    Create an asset account for `who`. 

   A deposit will be taken from the signer account. 

   - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account  must have sufficient funds for a deposit to be taken. 

  - `id`: The identifier of the asset for the account to be created.

  - `who`: The account to be created.

   Emits `Touched` event when successful. 
 
### transfer(id: `Compact<u32>`, target: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.transfer`
- **summary**:    Move some assets from the sender account to another. 

   Origin must be Signed. 

   - `id`: The identifier of the asset to have some amount transferred. 

  - `target`: The account to be credited.

  - `amount`: The amount by which the sender's balance of assets should be reduced and `target`'s balance increased. The amount actually transferred may be slightly greater in  the case that the transfer would otherwise take the sender balance above zero but below  the minimum balance. Must be greater than zero. 

   Emits `Transferred` with the actual amount transferred. If this takes the source balance  to below the minimum for the asset, then the amount transferred is increased to take it  to zero. 

   Weight: `O(1)`  Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of  `target`. 
 
### transferAll(id: `Compact<u32>`, dest: `MultiAddress`, keep_alive: `bool`)
- **interface**: `api.tx.poolAssets.transferAll`
- **summary**:    Transfer the entire transferable balance from the caller asset account. 

   NOTE: This function only attempts to transfer _transferable_ balances. This means that  any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be  transferred by this function. To ensure that this function results in a killed account,  you might need to prepare the account by removing any reference counters, storage  deposits, etc... 

   The dispatch origin of this call must be Signed. 

   - `id`: The identifier of the asset for the account holding a deposit. 

  - `dest`: The recipient of the transfer.

  - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all of the funds the asset account has, causing the sender asset account to be killed  (false), or transfer everything except at least the minimum balance, which will  guarantee to keep the sender asset account alive (true). 
 
### transferApproved(id: `Compact<u32>`, owner: `MultiAddress`, destination: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.transferApproved`
- **summary**:    Transfer some asset balance from a previously delegated account to some third-party  account. 

   Origin must be Signed and there must be an approval in place by the `owner` to the  signer. 

   If the entire amount approved for transfer is transferred, then any deposit previously  reserved by `approve_transfer` is unreserved. 

   - `id`: The identifier of the asset. 

  - `owner`: The account which previously approved for a transfer of at least `amount` and from which the asset balance will be withdrawn. 

  - `destination`: The account to which the asset balance of `amount` will be transferred.

  - `amount`: The amount of assets to transfer.

   Emits `TransferredApproved` on success. 

   Weight: `O(1)` 
 
### transferKeepAlive(id: `Compact<u32>`, target: `MultiAddress`, amount: `Compact<u128>`)
- **interface**: `api.tx.poolAssets.transferKeepAlive`
- **summary**:    Move some assets from the sender account to another, keeping the sender account alive. 

   Origin must be Signed. 

   - `id`: The identifier of the asset to have some amount transferred. 

  - `target`: The account to be credited.

  - `amount`: The amount by which the sender's balance of assets should be reduced and `target`'s balance increased. The amount actually transferred may be slightly greater in  the case that the transfer would otherwise take the sender balance above zero but below  the minimum balance. Must be greater than zero. 

   Emits `Transferred` with the actual amount transferred. If this takes the source balance  to below the minimum for the asset, then the amount transferred is increased to take it  to zero. 

   Weight: `O(1)`  Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of  `target`. 
 
### transferOwnership(id: `Compact<u32>`, owner: `MultiAddress`)
- **interface**: `api.tx.poolAssets.transferOwnership`
- **summary**:    Change the Owner of an asset. 

   Origin must be Signed and the sender should be the Owner of the asset `id`. 

   - `id`: The identifier of the asset. 

  - `owner`: The new Owner of this asset.

   Emits `OwnerChanged`. 

   Weight: `O(1)` 

___


## pov
 
### emitEvent()
- **interface**: `api.tx.pov.emitEvent`
 
### noop()
- **interface**: `api.tx.pov.noop`

___


## preimage
 
### ensureUpdated(hashes: `Vec<H256>`)
- **interface**: `api.tx.preimage.ensureUpdated`
- **summary**:    Ensure that the bulk of pre-images is upgraded. 

   The caller pays no fee if at least 90% of pre-images were successfully updated. 
 
### notePreimage(bytes: `Bytes`)
- **interface**: `api.tx.preimage.notePreimage`
- **summary**:    Register a preimage on-chain. 

   If the preimage was previously requested, no fees or deposits are taken for providing  the preimage. Otherwise, a deposit is taken proportional to the size of the preimage. 
 
### requestPreimage(hash: `H256`)
- **interface**: `api.tx.preimage.requestPreimage`
- **summary**:    Request a preimage be uploaded to the chain without paying any fees or deposits. 

   If the preimage requests has already been provided on-chain, we unreserve any deposit  a user may have paid, and take the control of the preimage out of their hands. 
 
### unnotePreimage(hash: `H256`)
- **interface**: `api.tx.preimage.unnotePreimage`
- **summary**:    Clear an unrequested preimage from the runtime storage. 

   If `len` is provided, then it will be a much cheaper operation. 

   - `hash`: The hash of the preimage to be removed from the store. 

  - `len`: The length of the preimage of `hash`.
 
### unrequestPreimage(hash: `H256`)
- **interface**: `api.tx.preimage.unrequestPreimage`
- **summary**:    Clear a previously made request for a preimage. 

   NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`. 

___


## proxy
 
### addProxy(delegate: `MultiAddress`, proxy_type: `KitchensinkRuntimeProxyType`, delay: `u32`)
- **interface**: `api.tx.proxy.addProxy`
- **summary**:    Register a proxy account for the sender that is able to make calls on its behalf. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `proxy`: The account that the `caller` would like to make a proxy.

  - `proxy_type`: The permissions allowed for this proxy account.

  - `delay`: The announcement period required of the initial proxy. Will generally be zero. 
 
### announce(real: `MultiAddress`, call_hash: `H256`)
- **interface**: `api.tx.proxy.announce`
- **summary**:    Publish the hash of a proxy-call that will be made in the future. 

   This must be called some number of blocks before the corresponding `proxy` is attempted  if the delay associated with the proxy relationship is greater than zero. 

   No more than `MaxPending` announcements may be made at any one time. 

   This will take a deposit of `AnnouncementDepositFactor` as well as  `AnnouncementDepositBase` if there are no other pending announcements. 

   The dispatch origin for this call must be _Signed_ and a proxy of `real`. 

   Parameters: 

  - `real`: The account that the proxy will make a call on behalf of.

  - `call_hash`: The hash of the call to be made by the `real` account.
 
### createPure(proxy_type: `KitchensinkRuntimeProxyType`, delay: `u32`, index: `u16`)
- **interface**: `api.tx.proxy.createPure`
- **summary**:    Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and  initialize it with a proxy of `proxy_type` for `origin` sender. 

   Requires a `Signed` origin. 

   - `proxy_type`: The type of the proxy that the sender will be registered as over the  new account. This will almost always be the most permissive `ProxyType` possible to  allow for maximum flexibility. 

  - `index`: A disambiguation index, in case this is called multiple times in the same transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just  want to use `0`. 

  - `delay`: The announcement period required of the initial proxy. Will generally be zero. 

   Fails with `Duplicate` if this has already been called in this transaction, from the  same sender, with the same parameters. 

   Fails if there are insufficient funds to pay for deposit. 
 
### killPure(spawner: `MultiAddress`, proxy_type: `KitchensinkRuntimeProxyType`, index: `u16`, height: `Compact<u32>`, ext_index: `Compact<u32>`)
- **interface**: `api.tx.proxy.killPure`
- **summary**:    Removes a previously spawned pure proxy. 

   WARNING: **All access to this account will be lost.** Any funds held in it will be  inaccessible. 

   Requires a `Signed` origin, and the sender account must have been created by a call to  `pure` with corresponding parameters. 

   - `spawner`: The account that originally called `pure` to create this account. 

  - `index`: The disambiguation index originally passed to `pure`. Probably `0`.

  - `proxy_type`: The proxy type originally passed to `pure`.

  - `height`: The height of the chain when the call to `pure` was processed.

  - `ext_index`: The extrinsic index in which the call to `pure` was processed.

   Fails with `NoPermission` in case the caller is not a previously created pure  account whose `pure` call has corresponding parameters. 
 
### pokeDeposit()
- **interface**: `api.tx.proxy.pokeDeposit`
- **summary**:    Poke / Adjust deposits made for proxies and announcements based on current values.  This can be used by accounts to possibly lower their locked amount. 

   The dispatch origin for this call must be _Signed_. 

   The transaction fee is waived if the deposit amount has changed. 

   Emits `DepositPoked` if successful. 
 
### proxy(real: `MultiAddress`, force_proxy_type: `Option<KitchensinkRuntimeProxyType>`, call: `Call`)
- **interface**: `api.tx.proxy.proxy`
- **summary**:    Dispatch the given `call` from an account that the sender is authorised for through  `add_proxy`. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `real`: The account that the proxy will make a call on behalf of.

  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.

  - `call`: The call to be made by the `real` account.
 
### proxyAnnounced(delegate: `MultiAddress`, real: `MultiAddress`, force_proxy_type: `Option<KitchensinkRuntimeProxyType>`, call: `Call`)
- **interface**: `api.tx.proxy.proxyAnnounced`
- **summary**:    Dispatch the given `call` from an account that the sender is authorized for through  `add_proxy`. 

   Removes any corresponding announcement(s). 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `real`: The account that the proxy will make a call on behalf of.

  - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.

  - `call`: The call to be made by the `real` account.
 
### rejectAnnouncement(delegate: `MultiAddress`, call_hash: `H256`)
- **interface**: `api.tx.proxy.rejectAnnouncement`
- **summary**:    Remove the given announcement of a delegate. 

   May be called by a target (proxied) account to remove a call that one of their delegates  (`delegate`) has announced they want to execute. The deposit is returned. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `delegate`: The account that previously announced the call.

  - `call_hash`: The hash of the call to be made.
 
### removeAnnouncement(real: `MultiAddress`, call_hash: `H256`)
- **interface**: `api.tx.proxy.removeAnnouncement`
- **summary**:    Remove a given announcement. 

   May be called by a proxy account to remove a call they previously announced and return  the deposit. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `real`: The account that the proxy will make a call on behalf of.

  - `call_hash`: The hash of the call to be made by the `real` account.
 
### removeProxies()
- **interface**: `api.tx.proxy.removeProxies`
- **summary**:    Unregister all proxy accounts for the sender. 

   The dispatch origin for this call must be _Signed_. 

   WARNING: This may be called on accounts created by `pure`, however if done, then  the unreserved fees will be inaccessible. **All access to this account will be lost.** 
 
### removeProxy(delegate: `MultiAddress`, proxy_type: `KitchensinkRuntimeProxyType`, delay: `u32`)
- **interface**: `api.tx.proxy.removeProxy`
- **summary**:    Unregister a proxy account for the sender. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `proxy`: The account that the `caller` would like to remove as a proxy.

  - `proxy_type`: The permissions currently enabled for the removed proxy account.

___


## rankedCollective
 
### addMember(who: `MultiAddress`)
- **interface**: `api.tx.rankedCollective.addMember`
- **summary**:    Introduce a new member. 

   - `origin`: Must be the `AddOrigin`. 

  - `who`: Account of non-member which will become a member.

   Weight: `O(1)` 
 
### cleanupPoll(poll_index: `u32`, max: `u32`)
- **interface**: `api.tx.rankedCollective.cleanupPoll`
- **summary**:    Remove votes from the given poll. It must have ended. 

   - `origin`: Must be `Signed` by any account. 

  - `poll_index`: Index of a poll which is completed and for which votes continue to exist. 

  - `max`: Maximum number of vote items from remove in this call.

   Transaction fees are waived if the operation is successful. 

   Weight `O(max)` (less if there are fewer items to remove than `max`). 
 
### demoteMember(who: `MultiAddress`)
- **interface**: `api.tx.rankedCollective.demoteMember`
- **summary**:    Decrement the rank of an existing member by one. If the member is already at rank zero,  then they are removed entirely. 

   - `origin`: Must be the `DemoteOrigin`. 

  - `who`: Account of existing member of rank greater than zero.

   Weight: `O(1)`, less if the member's index is highest in its rank. 
 
### exchangeMember(who: `MultiAddress`, new_who: `MultiAddress`)
- **interface**: `api.tx.rankedCollective.exchangeMember`
- **summary**:    Exchanges a member with a new account and the same existing rank. 

   - `origin`: Must be the `ExchangeOrigin`. 

  - `who`: Account of existing member of rank greater than zero to be exchanged.

  - `new_who`: New Account of existing member of rank greater than zero to exchanged to.
 
### promoteMember(who: `MultiAddress`)
- **interface**: `api.tx.rankedCollective.promoteMember`
- **summary**:    Increment the rank of an existing member by one. 

   - `origin`: Must be the `PromoteOrigin`. 

  - `who`: Account of existing member.

   Weight: `O(1)` 
 
### removeMember(who: `MultiAddress`, min_rank: `u16`)
- **interface**: `api.tx.rankedCollective.removeMember`
- **summary**:    Remove the member entirely. 

   - `origin`: Must be the `RemoveOrigin`. 

  - `who`: Account of existing member of rank greater than zero.

  - `min_rank`: The rank of the member or greater.

   Weight: `O(min_rank)`. 
 
### vote(poll: `u32`, aye: `bool`)
- **interface**: `api.tx.rankedCollective.vote`
- **summary**:    Add an aye or nay vote for the sender to the given proposal. 

   - `origin`: Must be `Signed` by a member account. 

  - `poll`: Index of a poll which is ongoing.

  - `aye`: `true` if the vote is to approve the proposal, `false` otherwise.

   Transaction fees are be waived if the member is voting on any particular proposal  for the first time and the call is successful. Subsequent vote changes will charge a  fee. 

   Weight: `O(1)`, less if there was no previous vote on the poll by the member. 

___


## rankedPolls
 
### cancel(index: `u32`)
- **interface**: `api.tx.rankedPolls.cancel`
- **summary**:    Cancel an ongoing referendum. 

   - `origin`: must be the `CancelOrigin`. 

  - `index`: The index of the referendum to be cancelled.

   Emits `Cancelled`. 
 
### kill(index: `u32`)
- **interface**: `api.tx.rankedPolls.kill`
- **summary**:    Cancel an ongoing referendum and slash the deposits. 

   - `origin`: must be the `KillOrigin`. 

  - `index`: The index of the referendum to be cancelled.

   Emits `Killed` and `DepositSlashed`. 
 
### nudgeReferendum(index: `u32`)
- **interface**: `api.tx.rankedPolls.nudgeReferendum`
- **summary**:    Advance a referendum onto its next logical state. Only used internally. 

   - `origin`: must be `Root`. 

  - `index`: the referendum to be advanced.
 
### oneFewerDeciding(track: `u16`)
- **interface**: `api.tx.rankedPolls.oneFewerDeciding`
- **summary**:    Advance a track onto its next logical state. Only used internally. 

   - `origin`: must be `Root`. 

  - `track`: the track to be advanced.

   Action item for when there is now one fewer referendum in the deciding phase and the  `DecidingCount` is not yet updated. This means that we should either: 

  - begin deciding another referendum (and leave `DecidingCount` alone); or

  - decrement `DecidingCount`.
 
### placeDecisionDeposit(index: `u32`)
- **interface**: `api.tx.rankedPolls.placeDecisionDeposit`
- **summary**:    Post the Decision Deposit for a referendum. 

   - `origin`: must be `Signed` and the account must have funds available for the  referendum's track's Decision Deposit. 

  - `index`: The index of the submitted referendum whose Decision Deposit is yet to be posted. 

   Emits `DecisionDepositPlaced`. 
 
### refundDecisionDeposit(index: `u32`)
- **interface**: `api.tx.rankedPolls.refundDecisionDeposit`
- **summary**:    Refund the Decision Deposit for a closed referendum back to the depositor. 

   - `origin`: must be `Signed` or `Root`. 

  - `index`: The index of a closed referendum whose Decision Deposit has not yet been refunded. 

   Emits `DecisionDepositRefunded`. 
 
### refundSubmissionDeposit(index: `u32`)
- **interface**: `api.tx.rankedPolls.refundSubmissionDeposit`
- **summary**:    Refund the Submission Deposit for a closed referendum back to the depositor. 

   - `origin`: must be `Signed` or `Root`. 

  - `index`: The index of a closed referendum whose Submission Deposit has not yet been refunded. 

   Emits `SubmissionDepositRefunded`. 
 
### setMetadata(index: `u32`, maybe_hash: `Option<H256>`)
- **interface**: `api.tx.rankedPolls.setMetadata`
- **summary**:    Set or clear metadata of a referendum. 

   Parameters: 

  - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a metadata of a finished referendum. 

  - `index`:  The index of a referendum to set or clear metadata for.

  - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
 
### submit(proposal_origin: `KitchensinkRuntimeOriginCaller`, proposal: `FrameSupportPreimagesBounded`, enactment_moment: `FrameSupportScheduleDispatchTime`)
- **interface**: `api.tx.rankedPolls.submit`
- **summary**:    Propose a referendum on a privileged action. 

   - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds  available. 

  - `proposal_origin`: The origin from which the proposal should be executed.

  - `proposal`: The proposal.

  - `enactment_moment`: The moment that the proposal should be enacted.

   Emits `Submitted`. 

___


## recovery
 
### asRecovered(account: `MultiAddress`, call: `Call`)
- **interface**: `api.tx.recovery.asRecovered`
- **summary**:    Send a call through a recovered account. 

   The dispatch origin for this call must be _Signed_ and registered to  be able to make calls on behalf of the recovered account. 

   Parameters: 

  - `account`: The recovered account you want to make a call on-behalf-of.

  - `call`: The call you want to make with the recovered account.
 
### cancelRecovered(account: `MultiAddress`)
- **interface**: `api.tx.recovery.cancelRecovered`
- **summary**:    Cancel the ability to use `as_recovered` for `account`. 

   The dispatch origin for this call must be _Signed_ and registered to  be able to make calls on behalf of the recovered account. 

   Parameters: 

  - `account`: The recovered account you are able to call on-behalf-of.
 
### claimRecovery(account: `MultiAddress`)
- **interface**: `api.tx.recovery.claimRecovery`
- **summary**:    Allow a successful rescuer to claim their recovered account. 

   The dispatch origin for this call must be _Signed_ and must be a "rescuer"  who has successfully completed the account recovery process: collected  `threshold` or more vouches, waited `delay_period` blocks since initiation. 

   Parameters: 

  - `account`: The lost account that you want to claim has been successfully recovered by you. 
 
### closeRecovery(rescuer: `MultiAddress`)
- **interface**: `api.tx.recovery.closeRecovery`
- **summary**:    As the controller of a recoverable account, close an active recovery  process for your account. 

   Payment: By calling this function, the recoverable account will receive  the recovery deposit `RecoveryDeposit` placed by the rescuer. 

   The dispatch origin for this call must be _Signed_ and must be a  recoverable account with an active recovery process for it. 

   Parameters: 

  - `rescuer`: The account trying to rescue this recoverable account.
 
### createRecovery(friends: `Vec<AccountId32>`, threshold: `u16`, delay_period: `u32`)
- **interface**: `api.tx.recovery.createRecovery`
- **summary**:    Create a recovery configuration for your account. This makes your account recoverable. 

   Payment: `ConfigDepositBase` + `FriendDepositFactor` * #_of_friends balance  will be reserved for storing the recovery configuration. This deposit is returned  in full when the user calls `remove_recovery`. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `friends`: A list of friends you trust to vouch for recovery attempts. Should be ordered and contain no duplicate values. 

  - `threshold`: The number of friends that must vouch for a recovery attempt before the account can be recovered. Should be less than or equal to the length of the list of  friends. 

  - `delay_period`: The number of blocks after a recovery attempt is initialized that needs to pass before the account can be recovered. 
 
### initiateRecovery(account: `MultiAddress`)
- **interface**: `api.tx.recovery.initiateRecovery`
- **summary**:    Initiate the process for recovering a recoverable account. 

   Payment: `RecoveryDeposit` balance will be reserved for initiating the  recovery process. This deposit will always be repatriated to the account  trying to be recovered. See `close_recovery`. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `account`: The lost account that you want to recover. This account needs to be recoverable (i.e. have a recovery configuration). 
 
### removeRecovery()
- **interface**: `api.tx.recovery.removeRecovery`
- **summary**:    Remove the recovery process for your account. Recovered accounts are still accessible. 

   NOTE: The user must make sure to call `close_recovery` on all active  recovery attempts before calling this function else it will fail. 

   Payment: By calling this function the recoverable account will unreserve  their recovery configuration deposit.  (`ConfigDepositBase` + `FriendDepositFactor` * #_of_friends) 

   The dispatch origin for this call must be _Signed_ and must be a  recoverable account (i.e. has a recovery configuration). 
 
### setRecovered(lost: `MultiAddress`, rescuer: `MultiAddress`)
- **interface**: `api.tx.recovery.setRecovered`
- **summary**:    Allow ROOT to bypass the recovery process and set a rescuer account  for a lost account directly. 

   The dispatch origin for this call must be _ROOT_. 

   Parameters: 

  - `lost`: The "lost account" to be recovered.

  - `rescuer`: The "rescuer account" which can call as the lost account.
 
### vouchRecovery(lost: `MultiAddress`, rescuer: `MultiAddress`)
- **interface**: `api.tx.recovery.vouchRecovery`
- **summary**:    Allow a "friend" of a recoverable account to vouch for an active recovery  process for that account. 

   The dispatch origin for this call must be _Signed_ and must be a "friend"  for the recoverable account. 

   Parameters: 

  - `lost`: The lost account that you want to recover.

  - `rescuer`: The account trying to rescue the lost account that you want to vouch for.

   The combination of these two parameters must point to an active recovery  process. 

___


## referenda
 
### cancel(index: `u32`)
- **interface**: `api.tx.referenda.cancel`
- **summary**:    Cancel an ongoing referendum. 

   - `origin`: must be the `CancelOrigin`. 

  - `index`: The index of the referendum to be cancelled.

   Emits `Cancelled`. 
 
### kill(index: `u32`)
- **interface**: `api.tx.referenda.kill`
- **summary**:    Cancel an ongoing referendum and slash the deposits. 

   - `origin`: must be the `KillOrigin`. 

  - `index`: The index of the referendum to be cancelled.

   Emits `Killed` and `DepositSlashed`. 
 
### nudgeReferendum(index: `u32`)
- **interface**: `api.tx.referenda.nudgeReferendum`
- **summary**:    Advance a referendum onto its next logical state. Only used internally. 

   - `origin`: must be `Root`. 

  - `index`: the referendum to be advanced.
 
### oneFewerDeciding(track: `u16`)
- **interface**: `api.tx.referenda.oneFewerDeciding`
- **summary**:    Advance a track onto its next logical state. Only used internally. 

   - `origin`: must be `Root`. 

  - `track`: the track to be advanced.

   Action item for when there is now one fewer referendum in the deciding phase and the  `DecidingCount` is not yet updated. This means that we should either: 

  - begin deciding another referendum (and leave `DecidingCount` alone); or

  - decrement `DecidingCount`.
 
### placeDecisionDeposit(index: `u32`)
- **interface**: `api.tx.referenda.placeDecisionDeposit`
- **summary**:    Post the Decision Deposit for a referendum. 

   - `origin`: must be `Signed` and the account must have funds available for the  referendum's track's Decision Deposit. 

  - `index`: The index of the submitted referendum whose Decision Deposit is yet to be posted. 

   Emits `DecisionDepositPlaced`. 
 
### refundDecisionDeposit(index: `u32`)
- **interface**: `api.tx.referenda.refundDecisionDeposit`
- **summary**:    Refund the Decision Deposit for a closed referendum back to the depositor. 

   - `origin`: must be `Signed` or `Root`. 

  - `index`: The index of a closed referendum whose Decision Deposit has not yet been refunded. 

   Emits `DecisionDepositRefunded`. 
 
### refundSubmissionDeposit(index: `u32`)
- **interface**: `api.tx.referenda.refundSubmissionDeposit`
- **summary**:    Refund the Submission Deposit for a closed referendum back to the depositor. 

   - `origin`: must be `Signed` or `Root`. 

  - `index`: The index of a closed referendum whose Submission Deposit has not yet been refunded. 

   Emits `SubmissionDepositRefunded`. 
 
### setMetadata(index: `u32`, maybe_hash: `Option<H256>`)
- **interface**: `api.tx.referenda.setMetadata`
- **summary**:    Set or clear metadata of a referendum. 

   Parameters: 

  - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a metadata of a finished referendum. 

  - `index`:  The index of a referendum to set or clear metadata for.

  - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
 
### submit(proposal_origin: `KitchensinkRuntimeOriginCaller`, proposal: `FrameSupportPreimagesBounded`, enactment_moment: `FrameSupportScheduleDispatchTime`)
- **interface**: `api.tx.referenda.submit`
- **summary**:    Propose a referendum on a privileged action. 

   - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds  available. 

  - `proposal_origin`: The origin from which the proposal should be executed.

  - `proposal`: The proposal.

  - `enactment_moment`: The moment that the proposal should be enacted.

   Emits `Submitted`. 

___


## remark
 
### store(remark: `Bytes`)
- **interface**: `api.tx.remark.store`
- **summary**:    Index and store data off chain. 

___


## revive
 
### call(dest: `H160`, value: `Compact<u128>`, gas_limit: `SpWeightsWeightV2Weight`, storage_deposit_limit: `Compact<u128>`, data: `Bytes`)
- **interface**: `api.tx.revive.call`
- **summary**:    Makes a call to an account, optionally transferring some balance. 

   #### Parameters 

   * `dest`: Address of the contract to call. 

  * `value`: The balance to transfer from the `origin` to `dest`.

  * `gas_limit`: The gas limit enforced when executing the constructor.

  * `storage_deposit_limit`: The maximum amount of balance that can be charged from the caller to pay for the storage consumed. 

  * `data`: The input data to pass to the contract.

   * If the account is a smart-contract account, the associated code will be  executed and any value will be transferred. 

  * If the account is a regular account, any value will be transferred.

  * If no account exists and the call value is not less than `existential_deposit`, a regular account will be created and any value will be transferred. 
 
### dispatchAsFallbackAccount(call: `Call`)
- **interface**: `api.tx.revive.dispatchAsFallbackAccount`
- **summary**:    Dispatch an `call` with the origin set to the callers fallback address. 

   Every `AccountId32` can control its corresponding fallback account. The fallback account  is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a  recovery function in case an `AccountId20` was used without creating a mapping first. 
 
### ethTransact(payload: `Bytes`)
- **interface**: `api.tx.revive.ethTransact`
- **summary**:    A raw EVM transaction, typically dispatched by an Ethereum JSON-RPC server. 

   #### Parameters 

   * `payload`: The encoded [`crate::evm::TransactionSigned`]. 

  * `gas_limit`: The gas limit enforced during contract execution.

  * `storage_deposit_limit`: The maximum balance that can be charged to the caller for storage usage. 

   #### Note 

   This call cannot be dispatched directly; attempting to do so will result in a failed  transaction. It serves as a wrapper for an Ethereum transaction. When submitted, the  runtime converts it into a [`sp_runtime::generic::CheckedExtrinsic`] by recovering the  signer and validating the transaction. 
 
### instantiate(value: `Compact<u128>`, gas_limit: `SpWeightsWeightV2Weight`, storage_deposit_limit: `Compact<u128>`, code_hash: `H256`, data: `Bytes`, salt: `Option<[u8;32]>`)
- **interface**: `api.tx.revive.instantiate`
- **summary**:    Instantiates a contract from a previously deployed wasm binary. 

   This function is identical to [`Self::instantiate_with_code`] but without the  code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary  must be supplied. 
 
### instantiateWithCode(value: `Compact<u128>`, gas_limit: `SpWeightsWeightV2Weight`, storage_deposit_limit: `Compact<u128>`, code: `Bytes`, data: `Bytes`, salt: `Option<[u8;32]>`)
- **interface**: `api.tx.revive.instantiateWithCode`
- **summary**:    Instantiates a new contract from the supplied `code` optionally transferring  some balance. 

   This dispatchable has the same effect as calling [`Self::upload_code`] +  [`Self::instantiate`]. Bundling them together provides efficiency gains. Please  also check the documentation of [`Self::upload_code`]. 

   #### Parameters 

   * `value`: The balance to transfer from the `origin` to the newly created contract. 

  * `gas_limit`: The gas limit enforced when executing the constructor.

  * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved from the caller to pay for the storage consumed. 

  * `code`: The contract code to deploy in raw bytes.

  * `data`: The input data to pass to the contract constructor.

  * `salt`: Used for the address derivation. If `Some` is supplied then `CREATE2` semantics are used. If `None` then `CRATE1` is used. 

  

   Instantiation is executed as follows: 

   - The supplied `code` is deployed, and a `code_hash` is created for that code. 

  - If the `code_hash` already exists on the chain the underlying `code` will be shared.

  - The destination address is computed based on the sender, code_hash and the salt.

  - The smart-contract account is created at the computed address.

  - The `value` is transferred to the new account.

  - The `deploy` function is executed in the context of the newly-created account.
 
### mapAccount()
- **interface**: `api.tx.revive.mapAccount`
- **summary**:    Register the callers account id so that it can be used in contract interactions. 

   This will error if the origin is already mapped or is a eth native `Address20`. It will  take a deposit that can be released by calling [`Self::unmap_account`]. 
 
### removeCode(code_hash: `H256`)
- **interface**: `api.tx.revive.removeCode`
- **summary**:    Remove the code stored under `code_hash` and refund the deposit to its owner. 

   A code can only be removed by its original uploader (its owner) and only if it is  not used by any contract. 
 
### setCode(dest: `H160`, code_hash: `H256`)
- **interface**: `api.tx.revive.setCode`
- **summary**:    Privileged function that changes the code of an existing contract. 

   This takes care of updating refcounts and all other necessary operations. Returns  an error if either the `code_hash` or `dest` do not exist. 

   #### Note 

   This does **not** change the address of the contract in question. This means  that the contract address is no longer derived from its code hash after calling  this dispatchable. 
 
### unmapAccount()
- **interface**: `api.tx.revive.unmapAccount`
- **summary**:    Unregister the callers account id in order to free the deposit. 

   There is no reason to ever call this function other than freeing up the deposit.  This is only useful when the account should no longer be used. 
 
### uploadCode(code: `Bytes`, storage_deposit_limit: `Compact<u128>`)
- **interface**: `api.tx.revive.uploadCode`
- **summary**:    Upload new `code` without instantiating a contract from it. 

   If the code does not already exist a deposit is reserved from the caller  and unreserved only when [`Self::remove_code`] is called. The size of the reserve  depends on the size of the supplied `code`. 

   #### Note 

   Anyone can instantiate a contract from any uploaded code and thus prevent its removal.  To avoid this situation a constructor could employ access control so that it can  only be instantiated by permissioned entities. The same is true when uploading  through [`Self::instantiate_with_code`]. 

___


## rootTesting
 
### fillBlock(ratio: `Perbill`)
- **interface**: `api.tx.rootTesting.fillBlock`
- **summary**:    A dispatch that will fill the block weight up to the given ratio. 
 
### triggerDefensive()
- **interface**: `api.tx.rootTesting.triggerDefensive`

___


## safeMode
 
### enter()
- **interface**: `api.tx.safeMode.enter`
- **summary**:    Enter safe-mode permissionlessly for [`Config::EnterDuration`] blocks. 

   Reserves [`Config::EnterDepositAmount`] from the caller's account.  Emits an [`Event::Entered`] event on success.  Errors with [`Error::Entered`] if the safe-mode is already entered.  Errors with [`Error::NotConfigured`] if the deposit amount is `None`. 
 
### extend()
- **interface**: `api.tx.safeMode.extend`
- **summary**:    Extend the safe-mode permissionlessly for [`Config::ExtendDuration`] blocks. 

   This accumulates on top of the current remaining duration.  Reserves [`Config::ExtendDepositAmount`] from the caller's account.  Emits an [`Event::Extended`] event on success.  Errors with [`Error::Exited`] if the safe-mode is entered.  Errors with [`Error::NotConfigured`] if the deposit amount is `None`. 

   This may be called by any signed origin with [`Config::ExtendDepositAmount`] free  currency to reserve. This call can be disabled for all origins by configuring  [`Config::ExtendDepositAmount`] to `None`. 
 
### forceEnter()
- **interface**: `api.tx.safeMode.forceEnter`
- **summary**:    Enter safe-mode by force for a per-origin configured number of blocks. 

   Emits an [`Event::Entered`] event on success.  Errors with [`Error::Entered`] if the safe-mode is already entered. 

   Can only be called by the [`Config::ForceEnterOrigin`] origin. 
 
### forceExit()
- **interface**: `api.tx.safeMode.forceExit`
- **summary**:    Exit safe-mode by force. 

   Emits an [`Event::Exited`] with [`ExitReason::Force`] event on success.  Errors with [`Error::Exited`] if the safe-mode is inactive. 

   Note: `safe-mode` will be automatically deactivated by [`Pallet::on_initialize`] hook  after the block height is greater than the [`EnteredUntil`] storage item.  Emits an [`Event::Exited`] with [`ExitReason::Timeout`] event when deactivated in the  hook. 
 
### forceExtend()
- **interface**: `api.tx.safeMode.forceExtend`
- **summary**:    Extend the safe-mode by force for a per-origin configured number of blocks. 

   Emits an [`Event::Extended`] event on success.  Errors with [`Error::Exited`] if the safe-mode is inactive. 

   Can only be called by the [`Config::ForceExtendOrigin`] origin. 
 
### forceReleaseDeposit(account: `AccountId32`, block: `u32`)
- **interface**: `api.tx.safeMode.forceReleaseDeposit`
- **summary**:    Force to release a deposit for an account that entered safe-mode at a given  historical block. 

   This can be called while safe-mode is still entered. 

   Emits a [`Event::DepositReleased`] event on success.  Errors with [`Error::Entered`] if safe-mode is entered.  Errors with [`Error::NoDeposit`] if the payee has no reserved currency at the  specified block. 

   Can only be called by the [`Config::ForceDepositOrigin`] origin. 
 
### forceSlashDeposit(account: `AccountId32`, block: `u32`)
- **interface**: `api.tx.safeMode.forceSlashDeposit`
- **summary**:    Slash a deposit for an account that entered or extended safe-mode at a given  historical block. 

   This can only be called while safe-mode is entered. 

   Emits a [`Event::DepositSlashed`] event on success.  Errors with [`Error::Entered`] if safe-mode is entered. 

   Can only be called by the [`Config::ForceDepositOrigin`] origin. 
 
### releaseDeposit(account: `AccountId32`, block: `u32`)
- **interface**: `api.tx.safeMode.releaseDeposit`
- **summary**:    Permissionlessly release a deposit for an account that entered safe-mode at a  given historical block. 

   The call can be completely disabled by setting [`Config::ReleaseDelay`] to `None`.  This cannot be called while safe-mode is entered and not until  [`Config::ReleaseDelay`] blocks have passed since safe-mode was entered. 

   Emits a [`Event::DepositReleased`] event on success.  Errors with [`Error::Entered`] if the safe-mode is entered.  Errors with [`Error::CannotReleaseYet`] if [`Config::ReleaseDelay`] block have not  passed since safe-mode was entered. Errors with [`Error::NoDeposit`] if the payee has no  reserved currency at the block specified. 

___


## salary
 
### bump()
- **interface**: `api.tx.salary.bump`
- **summary**:    Move to next payout cycle, assuming that the present block is now within that cycle. 

   - `origin`: A `Signed` origin of an account. 
 
### checkPayment()
- **interface**: `api.tx.salary.checkPayment`
- **summary**:    Update a payment's status; if it failed, alter the state so the payment can be retried. 

   This must be called within the same cycle as the failed payment. It will fail with  `Event::NotCurrent` otherwise. 

   - `origin`: A `Signed` origin of an account which is a member of `Members` who has  received a payment this cycle. 
 
### induct()
- **interface**: `api.tx.salary.induct`
- **summary**:    Induct oneself into the payout system. 
 
### init()
- **interface**: `api.tx.salary.init`
- **summary**:    Start the first payout cycle. 

   - `origin`: A `Signed` origin of an account. 
 
### payout()
- **interface**: `api.tx.salary.payout`
- **summary**:    Request a payout. 

   Will only work if we are after the first `RegistrationPeriod` blocks since the cycle  started but by no more than `PayoutPeriod` blocks. 

   - `origin`: A `Signed` origin of an account which is a member of `Members`. 
 
### payoutOther(beneficiary: `AccountId32`)
- **interface**: `api.tx.salary.payoutOther`
- **summary**:    Request a payout to a secondary account. 

   Will only work if we are after the first `RegistrationPeriod` blocks since the cycle  started but by no more than `PayoutPeriod` blocks. 

   - `origin`: A `Signed` origin of an account which is a member of `Members`. 

  - `beneficiary`: The account to receive payment.
 
### register()
- **interface**: `api.tx.salary.register`
- **summary**:    Register for a payout. 

   Will only work if we are in the first `RegistrationPeriod` blocks since the cycle  started. 

   - `origin`: A `Signed` origin of an account which is a member of `Members`. 

___


## scheduler
 
### cancel(when: `u32`, index: `u32`)
- **interface**: `api.tx.scheduler.cancel`
- **summary**:    Cancel an anonymously scheduled task. 
 
### cancelNamed(id: `[u8;32]`)
- **interface**: `api.tx.scheduler.cancelNamed`
- **summary**:    Cancel a named scheduled task. 
 
### cancelRetry(task: `(u32,u32)`)
- **interface**: `api.tx.scheduler.cancelRetry`
- **summary**:    Removes the retry configuration of a task. 
 
### cancelRetryNamed(id: `[u8;32]`)
- **interface**: `api.tx.scheduler.cancelRetryNamed`
- **summary**:    Cancel the retry configuration of a named task. 
 
### schedule(when: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.schedule`
- **summary**:    Anonymously schedule a task. 
 
### scheduleAfter(after: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleAfter`
- **summary**:    Anonymously schedule a task after a delay. 
 
### scheduleNamed(id: `[u8;32]`, when: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleNamed`
- **summary**:    Schedule a named task. 
 
### scheduleNamedAfter(id: `[u8;32]`, after: `u32`, maybe_periodic: `Option<(u32,u32)>`, priority: `u8`, call: `Call`)
- **interface**: `api.tx.scheduler.scheduleNamedAfter`
- **summary**:    Schedule a named task after a delay. 
 
### setRetry(task: `(u32,u32)`, retries: `u8`, period: `u32`)
- **interface**: `api.tx.scheduler.setRetry`
- **summary**:    Set a retry configuration for a task so that, in case its scheduled run fails, it will  be retried after `period` blocks, for a total amount of `retries` retries or until it  succeeds. 

   Tasks which need to be scheduled for a retry are still subject to weight metering and  agenda space, same as a regular task. If a periodic task fails, it will be scheduled  normally while the task is retrying. 

   Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic  clones of the original task. Their retry configuration will be derived from the  original task's configuration, but will have a lower value for `remaining` than the  original `total_retries`. 
 
### setRetryNamed(id: `[u8;32]`, retries: `u8`, period: `u32`)
- **interface**: `api.tx.scheduler.setRetryNamed`
- **summary**:    Set a retry configuration for a named task so that, in case its scheduled run fails, it  will be retried after `period` blocks, for a total amount of `retries` retries or until  it succeeds. 

   Tasks which need to be scheduled for a retry are still subject to weight metering and  agenda space, same as a regular task. If a periodic task fails, it will be scheduled  normally while the task is retrying. 

   Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic  clones of the original task. Their retry configuration will be derived from the  original task's configuration, but will have a lower value for `remaining` than the  original `total_retries`. 

___


## session
 
### purgeKeys()
- **interface**: `api.tx.session.purgeKeys`
- **summary**:    Removes any session key(s) of the function caller. 

   This doesn't take effect until the next session. 

   The dispatch origin of this function must be Signed and the account must be either be  convertible to a validator ID using the chain's typical addressing system (this usually  means being a controller account) or directly convertible into a validator ID (which  usually means being a stash account). 

   #### Complexity 

  - `O(1)` in number of key types. Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed. 
 
### setKeys(keys: `KitchensinkRuntimeSessionKeys`, proof: `Bytes`)
- **interface**: `api.tx.session.setKeys`
- **summary**:    Sets the session key(s) of the function caller to `keys`.  Allows an account to set its session key prior to becoming a validator.  This doesn't take effect until the next session. 

   The dispatch origin of this function must be signed. 

   #### Complexity 

  - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed. 

___


## society
 
### bestowMembership(candidate: `AccountId32`)
- **interface**: `api.tx.society.bestowMembership`
- **summary**:    Transform an approved candidate into a member. Callable only by the Signed origin of the  Founder, only after the period for voting has ended and only when the candidate is not  clearly rejected. 
 
### bid(value: `u128`)
- **interface**: `api.tx.society.bid`
- **summary**:    A user outside of the society can make a bid for entry. 

   Payment: The group's Candidate Deposit will be reserved for making a bid. It is returned  when the bid becomes a member, or if the bid calls `unbid`. 

   The dispatch origin for this call must be _Signed_. 

   Parameters: 

  - `value`: A one time payment the bid would like to receive when joining the society.
 
### claimMembership()
- **interface**: `api.tx.society.claimMembership`
- **summary**:    Transform an approved candidate into a member. Callable only by the  the candidate, and only after the period for voting has ended. 
 
### cleanupCandidacy(candidate: `AccountId32`, max: `u32`)
- **interface**: `api.tx.society.cleanupCandidacy`
- **summary**:    Remove up to `max` stale votes for the given `candidate`. 

   May be called by any Signed origin, but only after the candidate's candidacy is ended. 
 
### cleanupChallenge(challenge_round: `u32`, max: `u32`)
- **interface**: `api.tx.society.cleanupChallenge`
- **summary**:    Remove up to `max` stale votes for the defender in the given `challenge_round`. 

   May be called by any Signed origin, but only after the challenge round is ended. 
 
### defenderVote(approve: `bool`)
- **interface**: `api.tx.society.defenderVote`
- **summary**:    As a member, vote on the defender. 

   The dispatch origin for this call must be _Signed_ and a member. 

   Parameters: 

  - `approve`: A boolean which says if the candidate should be approved (`true`) or rejected (`false`). 
 
### dissolve()
- **interface**: `api.tx.society.dissolve`
- **summary**:    Dissolve the society and remove all members. 

   The dispatch origin for this call must be Signed, and the signing account must be both  the `Founder` and the `Head`. This implies that it may only be done when there is one  member. 
 
### dropCandidate(candidate: `AccountId32`)
- **interface**: `api.tx.society.dropCandidate`
- **summary**:    Remove a `candidate`'s failed application from the society. Callable by any  signed origin but only at the end of the subsequent round and only for  a candidate with more rejections than approvals. 

   The bid deposit is lost and the voucher is banned. 
 
### foundSociety(founder: `MultiAddress`, max_members: `u32`, max_intake: `u32`, max_strikes: `u32`, candidate_deposit: `u128`, rules: `Bytes`)
- **interface**: `api.tx.society.foundSociety`
- **summary**:    Found the society. 

   This is done as a discrete action in order to allow for the  pallet to be included into a running chain and can only be done once. 

   The dispatch origin for this call must be from the _FounderSetOrigin_. 

   Parameters: 

  - `founder` - The first member and head of the newly founded society.

  - `max_members` - The initial max number of members for the society.

  - `max_intake` - The maximum number of candidates per intake period.

  - `max_strikes`: The maximum number of strikes a member may get before they become suspended and may only be reinstated by the founder. 

  - `candidate_deposit`: The deposit required to make a bid for membership of the group.

  - `rules` - The rules of this society concerning membership.

   Complexity: O(1) 
 
### judgeSuspendedMember(who: `MultiAddress`, forgive: `bool`)
- **interface**: `api.tx.society.judgeSuspendedMember`
- **summary**:    Allow suspension judgement origin to make judgement on a suspended member. 

   If a suspended member is forgiven, we simply add them back as a member, not affecting  any of the existing storage items for that member. 

   If a suspended member is rejected, remove all associated storage items, including  their payouts, and remove any vouched bids they currently have. 

   The dispatch origin for this call must be Signed from the Founder. 

   Parameters: 

  - `who` - The suspended member to be judged.

  - `forgive` - A boolean representing whether the suspension judgement origin forgives (`true`) or rejects (`false`) a suspended member. 
 
### kickCandidate(candidate: `AccountId32`)
- **interface**: `api.tx.society.kickCandidate`
- **summary**:    Remove the candidate's application from the society. Callable only by the Signed origin  of the Founder, only after the period for voting has ended, and only when they do not  have a clear approval. 

   Any bid deposit is lost and voucher is banned. 
 
### payout()
- **interface**: `api.tx.society.payout`
- **summary**:    Transfer the first matured payout for the sender and remove it from the records. 

   NOTE: This extrinsic needs to be called multiple times to claim multiple matured  payouts. 

   Payment: The member will receive a payment equal to their first matured  payout to their free balance. 

   The dispatch origin for this call must be _Signed_ and a member with  payouts remaining. 
 
### punishSkeptic()
- **interface**: `api.tx.society.punishSkeptic`
- **summary**:    Punish the skeptic with a strike if they did not vote on a candidate. Callable by the  candidate. 
 
### resignCandidacy()
- **interface**: `api.tx.society.resignCandidacy`
- **summary**:    Remove the candidate's application from the society. Callable only by the candidate. 

   Any bid deposit is lost and voucher is banned. 
 
### setParameters(max_members: `u32`, max_intake: `u32`, max_strikes: `u32`, candidate_deposit: `u128`)
- **interface**: `api.tx.society.setParameters`
- **summary**:    Change the maximum number of members in society and the maximum number of new candidates  in a single intake period. 

   The dispatch origin for this call must be Signed by the Founder. 

   Parameters: 

  - `max_members` - The maximum number of members for the society. This must be no less than the current number of members. 

  - `max_intake` - The maximum number of candidates per intake period.

  - `max_strikes`: The maximum number of strikes a member may get before they become suspended and may only be reinstated by the founder. 

  - `candidate_deposit`: The deposit required to make a bid for membership of the group.
 
### unbid()
- **interface**: `api.tx.society.unbid`
- **summary**:    A bidder can remove their bid for entry into society.  By doing so, they will have their candidate deposit returned or  they will unvouch their voucher. 

   Payment: The bid deposit is unreserved if the user made a bid. 

   The dispatch origin for this call must be _Signed_ and a bidder. 
 
### unvouch()
- **interface**: `api.tx.society.unvouch`
- **summary**:    As a vouching member, unvouch a bid. This only works while vouched user is  only a bidder (and not a candidate). 

   The dispatch origin for this call must be _Signed_ and a vouching member. 

   Parameters: 

  - `pos`: Position in the `Bids` vector of the bid who should be unvouched.
 
### vote(candidate: `MultiAddress`, approve: `bool`)
- **interface**: `api.tx.society.vote`
- **summary**:    As a member, vote on a candidate. 

   The dispatch origin for this call must be _Signed_ and a member. 

   Parameters: 

  - `candidate`: The candidate that the member would like to bid on.

  - `approve`: A boolean which says if the candidate should be approved (`true`) or rejected (`false`). 
 
### vouch(who: `MultiAddress`, value: `u128`, tip: `u128`)
- **interface**: `api.tx.society.vouch`
- **summary**:    As a member, vouch for someone to join society by placing a bid on their behalf. 

   There is no deposit required to vouch for a new bid, but a member can only vouch for  one bid at a time. If the bid becomes a suspended candidate and ultimately rejected by  the suspension judgement origin, the member will be banned from vouching again. 

   As a vouching member, you can claim a tip if the candidate is accepted. This tip will  be paid as a portion of the reward the member will receive for joining the society. 

   The dispatch origin for this call must be _Signed_ and a member. 

   Parameters: 

  - `who`: The user who you would like to vouch for.

  - `value`: The total reward to be paid between you and the candidate if they become a member in the society. 

  - `tip`: Your cut of the total `value` payout when the candidate is inducted into the society. Tips larger than `value` will be saturated upon payout. 
 
### waiveRepay(amount: `u128`)
- **interface**: `api.tx.society.waiveRepay`
- **summary**:    Repay the payment previously given to the member with the signed origin, remove any  pending payments, and elevate them from rank 0 to rank 1. 

___


## staking
 
### bond(value: `Compact<u128>`, payee: `PalletStakingRewardDestination`)
- **interface**: `api.tx.staking.bond`
- **summary**:    Take the origin account as a stash and lock up `value` of its balance. `controller` will  be the account that controls it. 

   `value` must be more than the `minimum_balance` specified by `T::Currency`. 

   The dispatch origin for this call must be _Signed_ by the stash account. 

   Emits `Bonded`.  #### Complexity 

  - Independent of the arguments. Moderate complexity.

  - O(1).

  - Three extra DB entries.

   NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned  unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed  as dust. 
 
### bondExtra(max_additional: `Compact<u128>`)
- **interface**: `api.tx.staking.bondExtra`
- **summary**:    Add some extra amount that have appeared in the stash `free_balance` into the balance up  for staking. 

   The dispatch origin for this call must be _Signed_ by the stash, not the controller. 

   Use this if there are additional funds in your stash account that you wish to bond.  Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose  any limitation on the amount that can be added. 

   Emits `Bonded`. 

   #### Complexity 

  - Independent of the arguments. Insignificant complexity.

  - O(1).
 
### cancelDeferredSlash(era: `u32`, slash_indices: `Vec<u32>`)
- **interface**: `api.tx.staking.cancelDeferredSlash`
- **summary**:    Cancel enactment of a deferred slash. 

   Can be called by the `T::AdminOrigin`. 

   Parameters: era and indices of the slashes for that era to kill. 
 
### chill()
- **interface**: `api.tx.staking.chill`
- **summary**:    Declare no desire to either validate or nominate. 

   Effects will be felt at the beginning of the next era. 

   The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

   #### Complexity 

  - Independent of the arguments. Insignificant complexity.

  - Contains one read.

  - Writes are limited to the `origin` account key.
 
### chillOther(stash: `AccountId32`)
- **interface**: `api.tx.staking.chillOther`
- **summary**:    Declare a `controller` to stop participating as either a validator or nominator. 

   Effects will be felt at the beginning of the next era. 

   The dispatch origin for this call must be _Signed_, but can be called by anyone. 

   If the caller is the same as the controller being targeted, then no further checks are  enforced, and this function behaves just like `chill`. 

   If the caller is different than the controller being targeted, the following conditions  must be met: 

   * `controller` must belong to a nominator who has become non-decodable, 

   Or: 

   * A `ChillThreshold` must be set and checked which defines how close to the max  nominators or validators we must reach before users can start chilling one-another. 

  * A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine how close we are to the threshold. 

  * A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines if this is a person that should be chilled because they have not met the threshold  bond required. 

   This can be helpful if bond requirements are updated, and we need to remove old users  who do not satisfy these requirements. 
 
### deprecateControllerBatch(controllers: `Vec<AccountId32>`)
- **interface**: `api.tx.staking.deprecateControllerBatch`
- **summary**:    Updates a batch of controller accounts to their corresponding stash account if they are  not the same. Ignores any controller accounts that do not exist, and does not operate if  the stash and controller are already the same. 

   Effects will be felt instantly (as soon as this function is completed successfully). 

   The dispatch origin must be `T::AdminOrigin`. 
 
### forceApplyMinCommission(validator_stash: `AccountId32`)
- **interface**: `api.tx.staking.forceApplyMinCommission`
- **summary**:    Force a validator to have at least the minimum commission. This will not affect a  validator who already has a commission greater than or equal to the minimum. Any account  can call this. 
 
### forceNewEra()
- **interface**: `api.tx.staking.forceNewEra`
- **summary**:    Force there to be a new era at the end of the next session. After this, it will be  reset to normal (non-forced) behaviour. 

   The dispatch origin must be Root. 

   #### Warning 

   The election process starts multiple blocks before the end of the era.  If this is called just before a new era is triggered, the election process may not  have enough blocks to get a result. 

   #### Complexity 

  - No arguments.

  - Weight: O(1)
 
### forceNewEraAlways()
- **interface**: `api.tx.staking.forceNewEraAlways`
- **summary**:    Force there to be a new era at the end of sessions indefinitely. 

   The dispatch origin must be Root. 

   #### Warning 

   The election process starts multiple blocks before the end of the era.  If this is called just before a new era is triggered, the election process may not  have enough blocks to get a result. 
 
### forceNoEras()
- **interface**: `api.tx.staking.forceNoEras`
- **summary**:    Force there to be no new eras indefinitely. 

   The dispatch origin must be Root. 

   #### Warning 

   The election process starts multiple blocks before the end of the era.  Thus the election process may be ongoing when this is called. In this case the  election will continue until the next era is triggered. 

   #### Complexity 

  - No arguments.

  - Weight: O(1)
 
### forceUnstake(stash: `AccountId32`, num_slashing_spans: `u32`)
- **interface**: `api.tx.staking.forceUnstake`
- **summary**:    Force a current staker to become completely unstaked, immediately. 

   The dispatch origin must be Root. 

   #### Parameters 

   - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more  details. 
 
### increaseValidatorCount(additional: `Compact<u32>`)
- **interface**: `api.tx.staking.increaseValidatorCount`
- **summary**:    Increments the ideal number of validators up to maximum of  `ElectionProviderBase::MaxWinners`. 

   The dispatch origin must be Root. 

   #### Complexity  Same as [`Self::set_validator_count`]. 
 
### kick(who: `Vec<MultiAddress>`)
- **interface**: `api.tx.staking.kick`
- **summary**:    Remove the given nominations from the calling validator. 

   Effects will be felt at the beginning of the next era. 

   The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

   - `who`: A list of nominator stash accounts who are nominating this validator which  should no longer be nominating this validator. 

   Note: Making this call only makes sense if you first set the validator preferences to  block any further nominations. 
 
### manualSlash(validator_stash: `AccountId32`, era: `u32`, slash_fraction: `Perbill`)
- **interface**: `api.tx.staking.manualSlash`
- **summary**:    This function allows governance to manually slash a validator and is a 

  **fallback mechanism**.

   The dispatch origin must be `T::AdminOrigin`. 

   #### Parameters 

  - `validator_stash` - The stash account of the validator to slash.

  - `era` - The era in which the validator was in the active set.

  - `slash_fraction` - The percentage of the stake to slash, expressed as a Perbill.

   #### Behavior 

   The slash will be applied using the standard slashing mechanics, respecting the  configured `SlashDeferDuration`. 

   This means: 

  - If the validator was already slashed by a higher percentage for the same era, this slash will have no additional effect. 

  - If the validator was previously slashed by a lower percentage, only the difference will be applied. 

  - The slash will be deferred by `SlashDeferDuration` eras before being enacted.
 
### migrateCurrency(stash: `AccountId32`)
- **interface**: `api.tx.staking.migrateCurrency`
- **summary**:    Removes the legacy Staking locks if they exist. 

   This removes the legacy lock on the stake with [`Config::OldCurrency`] and creates a  hold on it if needed. If all stake cannot be held, the best effort is made to hold as  much as possible. The remaining stake is forced withdrawn from the ledger. 

   The fee is waived if the migration is successful. 
 
### nominate(targets: `Vec<MultiAddress>`)
- **interface**: `api.tx.staking.nominate`
- **summary**:    Declare the desire to nominate `targets` for the origin controller. 

   Effects will be felt at the beginning of the next era. 

   The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

   #### Complexity 

  - The transaction's complexity is proportional to the size of `targets` (N) which is capped at CompactAssignments::LIMIT (T::MaxNominations). 

  - Both the reads and writes follow a similar pattern.
 
### payoutStakers(validator_stash: `AccountId32`, era: `u32`)
- **interface**: `api.tx.staking.payoutStakers`
- **summary**:    Pay out next page of the stakers behind a validator for the given era. 

   - `validator_stash` is the stash account of the validator. 

  - `era` may be any era between `[current_era - history_depth; current_era]`.

   The origin of this call must be _Signed_. Any account can call this function, even if  it is not one of the stakers. 

   The reward payout could be paged in case there are too many nominators backing the  `validator_stash`. This call will payout unpaid pages in an ascending order. To claim a  specific page, use `payout_stakers_by_page`.` 

   If all pages are claimed, it returns an error `InvalidPage`. 
 
### payoutStakersByPage(validator_stash: `AccountId32`, era: `u32`, page: `u32`)
- **interface**: `api.tx.staking.payoutStakersByPage`
- **summary**:    Pay out a page of the stakers behind a validator for the given era and page. 

   - `validator_stash` is the stash account of the validator. 

  - `era` may be any era between `[current_era - history_depth; current_era]`.

  - `page` is the page index of nominators to pay out with value between 0 and `num_nominators / T::MaxExposurePageSize`. 

   The origin of this call must be _Signed_. Any account can call this function, even if  it is not one of the stakers. 

   If a validator has more than [`Config::MaxExposurePageSize`] nominators backing  them, then the list of nominators is paged, with each page being capped at  [`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,  the call needs to be made for each page separately in order for all the nominators  backing a validator to receive the reward. The nominators are not sorted across pages  and so it should not be assumed the highest staker would be on the topmost page and vice  versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost. 
 
### reapStash(stash: `AccountId32`, num_slashing_spans: `u32`)
- **interface**: `api.tx.staking.reapStash`
- **summary**:    Remove all data structures concerning a staker/stash once it is at a state where it can  be considered `dust` in the staking system. The requirements are: 

   1. the `total_balance` of the stash is below existential deposit.  2. or, the `ledger.total` of the stash is below existential deposit.  3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero. 

   The former can happen in cases like a slash; the latter when a fully unbonded account  is still receiving staking rewards in `RewardDestination::Staked`. 

   It can be called by anyone, as long as `stash` meets the above requirements. 

   Refunds the transaction fees upon successful execution. 

   #### Parameters 

   - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more  details. 
 
### rebond(value: `Compact<u128>`)
- **interface**: `api.tx.staking.rebond`
- **summary**:    Rebond a portion of the stash scheduled to be unlocked. 

   The dispatch origin must be signed by the controller. 

   #### Complexity 

  - Time complexity: O(L), where L is unlocking chunks

  - Bounded by `MaxUnlockingChunks`.
 
### restoreLedger(stash: `AccountId32`, maybe_controller: `Option<AccountId32>`, maybe_total: `Option<u128>`, maybe_unlocking: `Option<Vec<PalletStakingUnlockChunk>>`)
- **interface**: `api.tx.staking.restoreLedger`
- **summary**:    Restores the state of a ledger which is in an inconsistent state. 

   The requirements to restore a ledger are the following: 

  * The stash is bonded; or

  * The stash is not bonded but it has a staking lock left behind; or

  * If the stash has an associated ledger and its state is inconsistent; or

  * If the ledger is not corrupted *but* its staking lock is out of sync.

   The `maybe_*` input parameters will overwrite the corresponding data and metadata of the  ledger associated with the stash. If the input parameters are not set, the ledger will  be reset values from on-chain state. 
 
### scaleValidatorCount(factor: `Percent`)
- **interface**: `api.tx.staking.scaleValidatorCount`
- **summary**:    Scale up the ideal number of validators by a factor up to maximum of  `ElectionProviderBase::MaxWinners`. 

   The dispatch origin must be Root. 

   #### Complexity  Same as [`Self::set_validator_count`]. 
 
### setController()
- **interface**: `api.tx.staking.setController`
- **summary**:    (Re-)sets the controller of a stash to the stash itself. This function previously  accepted a `controller` argument to set the controller to an account other than the  stash itself. This functionality has now been removed, now only setting the controller  to the stash, if it is not already. 

   Effects will be felt instantly (as soon as this function is completed successfully). 

   The dispatch origin for this call must be _Signed_ by the stash, not the controller. 

   #### Complexity  O(1) 

  - Independent of the arguments. Insignificant complexity.

  - Contains a limited number of reads.

  - Writes are limited to the `origin` account key.
 
### setInvulnerables(invulnerables: `Vec<AccountId32>`)
- **interface**: `api.tx.staking.setInvulnerables`
- **summary**:    Set the validators who cannot be slashed (if any). 

   The dispatch origin must be Root. 
 
### setMinCommission(new: `Perbill`)
- **interface**: `api.tx.staking.setMinCommission`
- **summary**:    Sets the minimum amount of commission that each validators must maintain. 

   This call has lower privilege requirements than `set_staking_config` and can be called  by the `T::AdminOrigin`. Root can always call this. 
 
### setPayee(payee: `PalletStakingRewardDestination`)
- **interface**: `api.tx.staking.setPayee`
- **summary**:    (Re-)set the payment target for a controller. 

   Effects will be felt instantly (as soon as this function is completed successfully). 

   The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

   #### Complexity 

  - O(1)

  - Independent of the arguments. Insignificant complexity.

  - Contains a limited number of reads.

  - Writes are limited to the `origin` account key.

  ---------
 
### setStakingConfigs(min_nominator_bond: `PalletStakingPalletConfigOpU128`, min_validator_bond: `PalletStakingPalletConfigOpU128`, max_nominator_count: `PalletStakingPalletConfigOpU32`, max_validator_count: `PalletStakingPalletConfigOpU32`, chill_threshold: `PalletStakingPalletConfigOpPercent`, min_commission: `PalletStakingPalletConfigOpPerbill`, max_staked_rewards: `PalletStakingPalletConfigOpPercent`)
- **interface**: `api.tx.staking.setStakingConfigs`
- **summary**:    Update the various staking configurations . 

   * `min_nominator_bond`: The minimum active bond needed to be a nominator. 

  * `min_validator_bond`: The minimum active bond needed to be a validator.

  * `max_nominator_count`: The max number of users who can be a nominator at once. When set to `None`, no limit is enforced. 

  * `max_validator_count`: The max number of users who can be a validator at once. When set to `None`, no limit is enforced. 

  * `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which should be filled in order for the `chill_other` transaction to work. 

  * `min_commission`: The minimum amount of commission that each validators must maintain. This is checked only upon calling `validate`. Existing validators are not affected. 

   RuntimeOrigin must be Root to call this function. 

   NOTE: Existing nominators and validators will not be affected by this update.  to kick people under the new limits, `chill_other` should be called. 
 
### setValidatorCount(new: `Compact<u32>`)
- **interface**: `api.tx.staking.setValidatorCount`
- **summary**:    Sets the ideal number of validators. 

   The dispatch origin must be Root. 

   #### Complexity  O(1) 
 
### unbond(value: `Compact<u128>`)
- **interface**: `api.tx.staking.unbond`
- **summary**:    Schedule a portion of the stash to be unlocked ready for transfer out after the bond  period ends. If this leaves an amount actively bonded less than  [`asset::existential_deposit`], then it is increased to the full amount. 

   The dispatch origin for this call must be _Signed_ by the controller, not the stash. 

   Once the unlock period is done, you can call `withdraw_unbonded` to actually move  the funds out of management ready for transfer. 

   No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)  can co-exists at the same time. If there are no unlocking chunks slots available  [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible). 

   If a user encounters the `InsufficientBond` error when calling this extrinsic,  they should call `chill` first in order to free up their bonded funds. 

   Emits `Unbonded`. 

   See also [`Call::withdraw_unbonded`]. 
 
### updatePayee(controller: `AccountId32`)
- **interface**: `api.tx.staking.updatePayee`
- **summary**:    Migrates an account's `RewardDestination::Controller` to  `RewardDestination::Account(controller)`. 

   Effects will be felt instantly (as soon as this function is completed successfully). 

   This will waive the transaction fee if the `payee` is successfully migrated. 
 
### validate(prefs: `PalletStakingValidatorPrefs`)
- **interface**: `api.tx.staking.validate`
- **summary**:    Declare the desire to validate for the origin controller. 

   Effects will be felt at the beginning of the next era. 

   The dispatch origin for this call must be _Signed_ by the controller, not the stash. 
 
### withdrawUnbonded(num_slashing_spans: `u32`)
- **interface**: `api.tx.staking.withdrawUnbonded`
- **summary**:    Remove any unlocked chunks from the `unlocking` queue from our management. 

   This essentially frees up that balance to be used by the stash account to do whatever  it wants. 

   The dispatch origin for this call must be _Signed_ by the controller. 

   Emits `Withdrawn`. 

   See also [`Call::unbond`]. 

   #### Parameters 

   - `num_slashing_spans` indicates the number of metadata slashing spans to clear when  this call results in a complete removal of all the data related to the stash account.  In this case, the `num_slashing_spans` must be larger or equal to the number of  slashing spans associated with the stash account in the [`SlashingSpans`] storage type,  otherwise the call will fail. The call weight is directly proportional to  `num_slashing_spans`. 

   #### Complexity  O(S) where S is the number of slashing spans to remove  NOTE: Weight annotation is the kill scenario, we refund otherwise. 

___


## stateTrieMigration
 
### continueMigrate(limits: `PalletStateTrieMigrationMigrationLimits`, real_size_upper: `u32`, witness_task: `PalletStateTrieMigrationMigrationTask`)
- **interface**: `api.tx.stateTrieMigration.continueMigrate`
- **summary**:    Continue the migration for the given `limits`. 

   The dispatch origin of this call can be any signed account. 

   This transaction has NO MONETARY INCENTIVES. calling it will not reward anyone. Albeit,  Upon successful execution, the transaction fee is returned. 

   The (potentially over-estimated) of the byte length of all the data read must be  provided for up-front fee-payment and weighing. In essence, the caller is guaranteeing  that executing the current `MigrationTask` with the given `limits` will not exceed  `real_size_upper` bytes of read data. 

   The `witness_task` is merely a helper to prevent the caller from being slashed or  generally trigger a migration that they do not intend. This parameter is just a message  from caller, saying that they believed `witness_task` was the last state of the  migration, and they only wish for their transaction to do anything, if this assumption  holds. In case `witness_task` does not match, the transaction fails. 

   Based on the documentation of [`MigrationTask::migrate_until_exhaustion`], the  recommended way of doing this is to pass a `limit` that only bounds `count`, as the  `size` limit can always be overwritten. 
 
### controlAutoMigration(maybe_config: `Option<PalletStateTrieMigrationMigrationLimits>`)
- **interface**: `api.tx.stateTrieMigration.controlAutoMigration`
- **summary**:    Control the automatic migration. 

   The dispatch origin of this call must be [`Config::ControlOrigin`]. 
 
### forceSetProgress(progress_top: `PalletStateTrieMigrationProgress`, progress_child: `PalletStateTrieMigrationProgress`)
- **interface**: `api.tx.stateTrieMigration.forceSetProgress`
- **summary**:    Forcefully set the progress the running migration. 

   This is only useful in one case: the next key to migrate is too big to be migrated with  a signed account, in a parachain context, and we simply want to skip it. A reasonable  example of this would be `:code:`, which is both very expensive to migrate, and commonly  used, so probably it is already migrated. 

   In case you mess things up, you can also, in principle, use this to reset the migration  process. 
 
### migrateCustomChild(root: `Bytes`, child_keys: `Vec<Bytes>`, total_size: `u32`)
- **interface**: `api.tx.stateTrieMigration.migrateCustomChild`
- **summary**:    Migrate the list of child keys by iterating each of them one by one. 

   All of the given child keys must be present under one `child_root`. 

   This does not affect the global migration process tracker ([`MigrationProcess`]), and  should only be used in case any keys are leftover due to a bug. 
 
### migrateCustomTop(keys: `Vec<Bytes>`, witness_size: `u32`)
- **interface**: `api.tx.stateTrieMigration.migrateCustomTop`
- **summary**:    Migrate the list of top keys by iterating each of them one by one. 

   This does not affect the global migration process tracker ([`MigrationProcess`]), and  should only be used in case any keys are leftover due to a bug. 
 
### setSignedMaxLimits(limits: `PalletStateTrieMigrationMigrationLimits`)
- **interface**: `api.tx.stateTrieMigration.setSignedMaxLimits`
- **summary**:    Set the maximum limit of the signed migration. 

___


## sudo
 
### removeKey()
- **interface**: `api.tx.sudo.removeKey`
- **summary**:    Permanently removes the sudo key. 

   **This cannot be un-done.** 
 
### setKey(new: `MultiAddress`)
- **interface**: `api.tx.sudo.setKey`
- **summary**:    Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo  key. 
 
### sudo(call: `Call`)
- **interface**: `api.tx.sudo.sudo`
- **summary**:    Authenticates the sudo key and dispatches a function call with `Root` origin. 
 
### sudoAs(who: `MultiAddress`, call: `Call`)
- **interface**: `api.tx.sudo.sudoAs`
- **summary**:    Authenticates the sudo key and dispatches a function call with `Signed` origin from  a given account. 

   The dispatch origin for this call must be _Signed_. 
 
### sudoUncheckedWeight(call: `Call`, weight: `SpWeightsWeightV2Weight`)
- **interface**: `api.tx.sudo.sudoUncheckedWeight`
- **summary**:    Authenticates the sudo key and dispatches a function call with `Root` origin.  This function does not check the weight of the call, and instead allows the  Sudo user to specify the weight of the call. 

   The dispatch origin for this call must be _Signed_. 

___


## system
 
### applyAuthorizedUpgrade(code: `Bytes`)
- **interface**: `api.tx.system.applyAuthorizedUpgrade`
- **summary**:    Provide the preimage (runtime binary) `code` for an upgrade that has been authorized. 

   If the authorization required a version check, this call will ensure the spec name  remains unchanged and that the spec version has increased. 

   Depending on the runtime's `OnSetCode` configuration, this function may directly apply  the new `code` in the same block or attempt to schedule the upgrade. 

   All origins are allowed. 
 
### authorizeUpgrade(code_hash: `H256`)
- **interface**: `api.tx.system.authorizeUpgrade`
- **summary**:    Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied  later. 

   This call requires Root origin. 
 
### authorizeUpgradeWithoutChecks(code_hash: `H256`)
- **interface**: `api.tx.system.authorizeUpgradeWithoutChecks`
- **summary**:    Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied  later. 

   WARNING: This authorizes an upgrade that will take place without any safety checks, for  example that the spec name remains the same and that the version number increases. Not  recommended for normal use. Use `authorize_upgrade` instead. 

   This call requires Root origin. 
 
### killPrefix(prefix: `Bytes`, subkeys: `u32`)
- **interface**: `api.tx.system.killPrefix`
- **summary**:    Kill all storage items with a key that starts with the given prefix. 

   **NOTE:** We rely on the Root origin to provide us the number of subkeys under  the prefix we are removing to accurately calculate the weight of this function. 
 
### killStorage(keys: `Vec<Bytes>`)
- **interface**: `api.tx.system.killStorage`
- **summary**:    Kill some items from storage. 
 
### remark(remark: `Bytes`)
- **interface**: `api.tx.system.remark`
- **summary**:    Make some on-chain remark. 

   Can be executed by every `origin`. 
 
### remarkWithEvent(remark: `Bytes`)
- **interface**: `api.tx.system.remarkWithEvent`
- **summary**:    Make some on-chain remark and emit event. 
 
### setCode(code: `Bytes`)
- **interface**: `api.tx.system.setCode`
- **summary**:    Set the new runtime code. 
 
### setCodeWithoutChecks(code: `Bytes`)
- **interface**: `api.tx.system.setCodeWithoutChecks`
- **summary**:    Set the new runtime code without doing any checks of the given `code`. 

   Note that runtime upgrades will not run if this is called with a not-increasing spec  version! 
 
### setHeapPages(pages: `u64`)
- **interface**: `api.tx.system.setHeapPages`
- **summary**:    Set the number of pages in the WebAssembly environment's heap. 
 
### setStorage(items: `Vec<(Bytes,Bytes)>`)
- **interface**: `api.tx.system.setStorage`
- **summary**:    Set some items of storage. 

___


## technicalCommittee
 
### close(proposal_hash: `H256`, index: `Compact<u32>`, proposal_weight_bound: `SpWeightsWeightV2Weight`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.technicalCommittee.close`
- **summary**:    Close a vote that is either approved, disapproved or whose voting period has ended. 

   May be called by any signed account in order to finish voting and close the proposal. 

   If called before the end of the voting period it will only close the vote if it is  has enough votes to be approved or disapproved. 

   If called after the end of the voting period abstentions are counted as rejections  unless there is a prime member set and the prime member cast an approval. 

   If the close operation completes successfully with disapproval, the transaction fee will  be waived. Otherwise execution of the approved operation will be charged to the caller. 

   + `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed  proposal.  + `length_bound`: The upper bound for the length of the proposal in storage. Checked via  `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length. 

   #### Complexity 

  - `O(B + M + P1 + P2)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` is members-count (code- and governance-bounded)

  - `P1` is the complexity of `proposal` preimage.

  - `P2` is proposal-count (code-bounded)
 
### disapproveProposal(proposal_hash: `H256`)
- **interface**: `api.tx.technicalCommittee.disapproveProposal`
- **summary**:    Disapprove a proposal, close, and remove it from the system, regardless of its current  state. 

   Must be called by the Root origin. 

   Parameters: 

  * `proposal_hash`: The hash of the proposal that should be disapproved.

   #### Complexity  O(P) where P is the number of max proposals 
 
### execute(proposal: `Call`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.technicalCommittee.execute`
- **summary**:    Dispatch a proposal from a member using the `Member` origin. 

   Origin must be a member of the collective. 

   #### Complexity: 

  - `O(B + M + P)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` members-count (code-bounded)

  - `P` complexity of dispatching `proposal`
 
### kill(proposal_hash: `H256`)
- **interface**: `api.tx.technicalCommittee.kill`
- **summary**:    Disapprove the proposal and burn the cost held for storing this proposal. 

   Parameters: 

  - `origin`: must be the `KillOrigin`.

  - `proposal_hash`: The hash of the proposal that should be killed.

   Emits `Killed` and `ProposalCostBurned` if any cost was held for a given proposal. 
 
### propose(threshold: `Compact<u32>`, proposal: `Call`, length_bound: `Compact<u32>`)
- **interface**: `api.tx.technicalCommittee.propose`
- **summary**:    Add a new proposal to either be voted on or executed directly. 

   Requires the sender to be member. 

   `threshold` determines whether `proposal` is executed directly (`threshold < 2`)  or put up for voting. 

   #### Complexity 

  - `O(B + M + P1)` or `O(B + M + P2)` where:

  - `B` is `proposal` size in bytes (length-fee-bounded)

  - `M` is members-count (code- and governance-bounded)

  - branching is influenced by `threshold` where:

  - `P1` is proposal execution complexity (`threshold < 2`)

  - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
 
### releaseProposalCost(proposal_hash: `H256`)
- **interface**: `api.tx.technicalCommittee.releaseProposalCost`
- **summary**:    Release the cost held for storing a proposal once the given proposal is completed. 

   If there is no associated cost for the given proposal, this call will have no effect. 

   Parameters: 

  - `origin`: must be `Signed` or `Root`.

  - `proposal_hash`: The hash of the proposal.

   Emits `ProposalCostReleased` if any cost held for a given proposal. 
 
### setMembers(new_members: `Vec<AccountId32>`, prime: `Option<AccountId32>`, old_count: `u32`)
- **interface**: `api.tx.technicalCommittee.setMembers`
- **summary**:    Set the collective's membership. 

   - `new_members`: The new member list. Be nice to the chain and provide it sorted. 

  - `prime`: The prime member whose vote sets the default.

  - `old_count`: The upper bound for the previous number of members in storage. Used for weight estimation. 

   The dispatch of this call must be `SetMembersOrigin`. 

   NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but  the weight estimations rely on it to estimate dispatchable weight. 

   #### WARNING: 

   The `pallet-collective` can also be managed by logic outside of the pallet through the  implementation of the trait [`ChangeMembers`].  Any call to `set_members` must be careful that the member set doesn't get out of sync  with other logic managing the member set. 

   #### Complexity: 

  - `O(MP + N)` where:

  - `M` old-members-count (code- and governance-bounded)

  - `N` new-members-count (code- and governance-bounded)

  - `P` proposals-count (code-bounded)
 
### vote(proposal: `H256`, index: `Compact<u32>`, approve: `bool`)
- **interface**: `api.tx.technicalCommittee.vote`
- **summary**:    Add an aye or nay vote for the sender to the given proposal. 

   Requires the sender to be a member. 

   Transaction fees will be waived if the member is voting on any particular proposal  for the first time and the call is successful. Subsequent vote changes will charge a  fee.  #### Complexity 

  - `O(M)` where `M` is members-count (code- and governance-bounded)

___


## technicalMembership
 
### addMember(who: `MultiAddress`)
- **interface**: `api.tx.technicalMembership.addMember`
- **summary**:    Add a member `who` to the set. 

   May only be called from `T::AddOrigin`. 
 
### changeKey(new: `MultiAddress`)
- **interface**: `api.tx.technicalMembership.changeKey`
- **summary**:    Swap out the sending member for some other key `new`. 

   May only be called from `Signed` origin of a current member. 

   Prime membership is passed from the origin account to `new`, if extant. 
 
### clearPrime()
- **interface**: `api.tx.technicalMembership.clearPrime`
- **summary**:    Remove the prime member if it exists. 

   May only be called from `T::PrimeOrigin`. 
 
### removeMember(who: `MultiAddress`)
- **interface**: `api.tx.technicalMembership.removeMember`
- **summary**:    Remove a member `who` from the set. 

   May only be called from `T::RemoveOrigin`. 
 
### resetMembers(members: `Vec<AccountId32>`)
- **interface**: `api.tx.technicalMembership.resetMembers`
- **summary**:    Change the membership to a new set, disregarding the existing membership. Be nice and  pass `members` pre-sorted. 

   May only be called from `T::ResetOrigin`. 
 
### setPrime(who: `MultiAddress`)
- **interface**: `api.tx.technicalMembership.setPrime`
- **summary**:    Set the prime member. Must be a current member. 

   May only be called from `T::PrimeOrigin`. 
 
### swapMember(remove: `MultiAddress`, add: `MultiAddress`)
- **interface**: `api.tx.technicalMembership.swapMember`
- **summary**:    Swap out one member `remove` for another `add`. 

   May only be called from `T::SwapOrigin`. 

   Prime membership is *not* passed from `remove` to `add`, if extant. 

___


## timestamp
 
### set(now: `Compact<u64>`)
- **interface**: `api.tx.timestamp.set`
- **summary**:    Set the current time. 

   This call should be invoked exactly once per block. It will panic at the finalization  phase, if this call hasn't been invoked by that time. 

   The timestamp should be greater than the previous one by the amount specified by  [`Config::MinimumPeriod`]. 

   The dispatch origin for this call must be _None_. 

   This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware  that changing the complexity of this call could result exhausting the resources in a  block to execute any other calls. 

   #### Complexity 

  - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)

  - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in `on_finalize`) 

  - 1 event handler `on_timestamp_set`. Must be `O(1)`.

___


## tips
 
### closeTip(hash: `H256`)
- **interface**: `api.tx.tips.closeTip`
- **summary**:    Close and payout a tip. 

   The dispatch origin for this call must be _Signed_. 

   The tip identified by `hash` must have finished its countdown period. 

   - `hash`: The identity of the open tip for which a tip value is declared. This is formed  as the hash of the tuple of the original tip `reason` and the beneficiary account ID. 

   #### Complexity 

  - : `O(T)` where `T` is the number of tippers. decoding `Tipper` vec of length `T`. `T` is charged as upper bound given by `ContainsLengthBound`. The actual cost depends on  the implementation of `T::Tippers`. 
 
### reportAwesome(reason: `Bytes`, who: `MultiAddress`)
- **interface**: `api.tx.tips.reportAwesome`
- **summary**:    Report something `reason` that deserves a tip and claim any eventual the finder's fee. 

   The dispatch origin for this call must be _Signed_. 

   Payment: `TipReportDepositBase` will be reserved from the origin account, as well as  `DataDepositPerByte` for each byte in `reason`. 

   - `reason`: The reason for, or the thing that deserves, the tip; generally this will be  a UTF-8-encoded URL. 

  - `who`: The account which should be credited for the tip.

   Emits `NewTip` if successful. 

   #### Complexity 

  - `O(R)` where `R` length of `reason`.

  - encoding and hashing of 'reason'
 
### retractTip(hash: `H256`)
- **interface**: `api.tx.tips.retractTip`
- **summary**:    Retract a prior tip-report from `report_awesome`, and cancel the process of tipping. 

   If successful, the original deposit will be unreserved. 

   The dispatch origin for this call must be _Signed_ and the tip identified by `hash`  must have been reported by the signing account through `report_awesome` (and not  through `tip_new`). 

   - `hash`: The identity of the open tip for which a tip value is declared. This is formed  as the hash of the tuple of the original tip `reason` and the beneficiary account ID. 

   Emits `TipRetracted` if successful. 

   #### Complexity 

  - `O(1)`

  - Depends on the length of `T::Hash` which is fixed.
 
### slashTip(hash: `H256`)
- **interface**: `api.tx.tips.slashTip`
- **summary**:    Remove and slash an already-open tip. 

   May only be called from `T::RejectOrigin`. 

   As a result, the finder is slashed and the deposits are lost. 

   Emits `TipSlashed` if successful. 

   #### Complexity 

  - O(1).
 
### tip(hash: `H256`, tip_value: `Compact<u128>`)
- **interface**: `api.tx.tips.tip`
- **summary**:    Declare a tip value for an already-open tip. 

   The dispatch origin for this call must be _Signed_ and the signing account must be a  member of the `Tippers` set. 

   - `hash`: The identity of the open tip for which a tip value is declared. This is formed  as the hash of the tuple of the hash of the original tip `reason` and the beneficiary  account ID. 

  - `tip_value`: The amount of tip that the sender would like to give. The median tip value of active tippers will be given to the `who`. 

   Emits `TipClosing` if the threshold of tippers has been reached and the countdown period  has started. 

   #### Complexity 

  - `O(T)` where `T` is the number of tippers. decoding `Tipper` vec of length `T`, insert tip and check closing, `T` is charged as upper bound given by `ContainsLengthBound`.  The actual cost depends on the implementation of `T::Tippers`. 

   Actually weight could be lower as it depends on how many tips are in `OpenTip` but it  is weighted as if almost full i.e of length `T-1`. 
 
### tipNew(reason: `Bytes`, who: `MultiAddress`, tip_value: `Compact<u128>`)
- **interface**: `api.tx.tips.tipNew`
- **summary**:    Give a tip for something new; no finder's fee will be taken. 

   The dispatch origin for this call must be _Signed_ and the signing account must be a  member of the `Tippers` set. 

   - `reason`: The reason for, or the thing that deserves, the tip; generally this will be  a UTF-8-encoded URL. 

  - `who`: The account which should be credited for the tip.

  - `tip_value`: The amount of tip that the sender would like to give. The median tip value of active tippers will be given to the `who`. 

   Emits `NewTip` if successful. 

   #### Complexity 

  - `O(R + T)` where `R` length of `reason`, `T` is the number of tippers.

  - `O(T)`: decoding `Tipper` vec of length `T`. `T` is charged as upper bound given by `ContainsLengthBound`. The actual cost depends on the implementation of  `T::Tippers`. 

  - `O(R)`: hashing and encoding of reason of length `R`

___


## transactionStorage
 
### checkProof(proof: `SpTransactionStorageProofTransactionStorageProof`)
- **interface**: `api.tx.transactionStorage.checkProof`
- **summary**:    Check storage proof for block number `block_number() - StoragePeriod`.  If such block does not exist the proof is expected to be `None`.  #### Complexity 

  - Linear w.r.t the number of indexed transactions in the proved block for random probing.  There's a DB read for each transaction. 
 
### renew(block: `u32`, index: `u32`)
- **interface**: `api.tx.transactionStorage.renew`
- **summary**:    Renew previously stored data. Parameters are the block number that contains  previous `store` or `renew` call and transaction index within that block.  Transaction index is emitted in the `Stored` or `Renewed` event.  Applies same fees as `store`.  #### Complexity 

  - O(1).
 
### store(data: `Bytes`)
- **interface**: `api.tx.transactionStorage.store`
- **summary**:    Index and store data off chain. Minimum data size is 1 bytes, maximum is  `MaxTransactionSize`. Data will be removed after `STORAGE_PERIOD` blocks, unless `renew`  is called.  #### Complexity 

  - O(n*log(n)) of data size, as all data is pushed to an in-memory trie.

___


## treasury
 
### checkStatus(index: `u32`)
- **interface**: `api.tx.treasury.checkStatus`
- **summary**:    Check the status of the spend and remove it from the storage if processed. 

   #### Dispatch Origin 

   Must be signed. 

   #### Details 

   The status check is a prerequisite for retrying a failed payout.  If a spend has either succeeded or expired, it is removed from the storage by this  function. In such instances, transaction fees are refunded. 

   #### Parameters 

  - `index`: The spend index.

   #### Events 

   Emits [`Event::PaymentFailed`] if the spend payout has failed.  Emits [`Event::SpendProcessed`] if the spend payout has succeed. 
 
### payout(index: `u32`)
- **interface**: `api.tx.treasury.payout`
- **summary**:    Claim a spend. 

   #### Dispatch Origin 

   Must be signed 

   #### Details 

   Spends must be claimed within some temporal bounds. A spend may be claimed within one  [`Config::PayoutPeriod`] from the `valid_from` block.  In case of a payout failure, the spend status must be updated with the `check_status`  dispatchable before retrying with the current function. 

   #### Parameters 

  - `index`: The spend index.

   #### Events 

   Emits [`Event::Paid`] if successful. 
 
### removeApproval(proposal_id: `Compact<u32>`)
- **interface**: `api.tx.treasury.removeApproval`
- **summary**:    Force a previously approved proposal to be removed from the approval queue. 

   #### Dispatch Origin 

   Must be [`Config::RejectOrigin`]. 

   #### Details 

   The original deposit will no longer be returned. 

   #### Parameters 

  - `proposal_id`: The index of a proposal

   #### Complexity 

  - O(A) where `A` is the number of approvals

   #### Errors 

  - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the approval queue, i.e., the proposal has not been approved. This could also mean the  proposal does not exist altogether, thus there is no way it would have been approved  in the first place. 
 
### spend(asset_kind: `FrameSupportTokensFungibleUnionOfNativeOrWithId`, amount: `Compact<u128>`, beneficiary: `MultiAddress`, valid_from: `Option<u32>`)
- **interface**: `api.tx.treasury.spend`
- **summary**:    Propose and approve a spend of treasury funds. 

   #### Dispatch Origin 

   Must be [`Config::SpendOrigin`] with the `Success` value being at least  `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted  for assertion using the [`Config::BalanceConverter`]. 

   #### Details 

   Create an approved spend for transferring a specific `amount` of `asset_kind` to a  designated beneficiary. The spend must be claimed using the `payout` dispatchable within  the [`Config::PayoutPeriod`]. 

   #### Parameters 

  - `asset_kind`: An indicator of the specific asset class to be spent.

  - `amount`: The amount to be transferred from the treasury to the `beneficiary`.

  - `beneficiary`: The beneficiary of the spend.

  - `valid_from`: The block number from which the spend can be claimed. It can refer to the past if the resulting spend has not yet expired according to the  [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after  approval. 

   #### Events 

   Emits [`Event::AssetSpendApproved`] if successful. 
 
### spendLocal(amount: `Compact<u128>`, beneficiary: `MultiAddress`)
- **interface**: `api.tx.treasury.spendLocal`
- **summary**:    Propose and approve a spend of treasury funds. 

   #### Dispatch Origin 

   Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`. 

   #### Details  NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the  beneficiary. 

   #### Parameters 

  - `amount`: The amount to be transferred from the treasury to the `beneficiary`.

  - `beneficiary`: The destination account for the transfer.

   #### Events 

   Emits [`Event::SpendApproved`] if successful. 
 
### voidSpend(index: `u32`)
- **interface**: `api.tx.treasury.voidSpend`
- **summary**:    Void previously approved spend. 

   #### Dispatch Origin 

   Must be [`Config::RejectOrigin`]. 

   #### Details 

   A spend void is only possible if the payout has not been attempted yet. 

   #### Parameters 

  - `index`: The spend index.

   #### Events 

   Emits [`Event::AssetSpendVoided`] if successful. 

___


## txPause
 
### pause(full_name: `(Bytes,Bytes)`)
- **interface**: `api.tx.txPause.pause`
- **summary**:    Pause a call. 

   Can only be called by [`Config::PauseOrigin`].  Emits an [`Event::CallPaused`] event on success. 
 
### unpause(ident: `(Bytes,Bytes)`)
- **interface**: `api.tx.txPause.unpause`
- **summary**:    Un-pause a call. 

   Can only be called by [`Config::UnpauseOrigin`].  Emits an [`Event::CallUnpaused`] event on success. 

___


## uniques
 
### approveTransfer(collection: `u32`, item: `u32`, delegate: `MultiAddress`)
- **interface**: `api.tx.uniques.approveTransfer`
- **summary**:    Approve an item to be transferred by a delegated third-party account. 

   The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be  either the owner of the `item` or the admin of the collection. 

   - `collection`: The collection of the item to be approved for delegated transfer. 

  - `item`: The item of the item to be approved for delegated transfer.

  - `delegate`: The account to delegate permission to transfer the item.

   Important NOTE: The `approved` account gets reset after each transfer. 

   Emits `ApprovedTransfer` on success. 

   Weight: `O(1)` 
 
### burn(collection: `u32`, item: `u32`, check_owner: `Option<MultiAddress>`)
- **interface**: `api.tx.uniques.burn`
- **summary**:    Destroy a single item. 

   Origin must be Signed and the signing account must be either: 

  - the Admin of the `collection`;

  - the Owner of the `item`;

   - `collection`: The collection of the item to be burned. 

  - `item`: The item of the item to be burned.

  - `check_owner`: If `Some` then the operation will fail with `WrongOwner` unless the item is owned by this value. 

   Emits `Burned` with the actual amount burned. 

   Weight: `O(1)`  Modes: `check_owner.is_some()`. 
 
### buyItem(collection: `u32`, item: `u32`, bid_price: `u128`)
- **interface**: `api.tx.uniques.buyItem`
- **summary**:    Allows to buy an item if it's up for sale. 

   Origin must be Signed and must not be the owner of the `item`. 

   - `collection`: The collection of the item. 

  - `item`: The item the sender wants to buy.

  - `bid_price`: The price the sender is willing to pay.

   Emits `ItemBought` on success. 
 
### cancelApproval(collection: `u32`, item: `u32`, maybe_check_delegate: `Option<MultiAddress>`)
- **interface**: `api.tx.uniques.cancelApproval`
- **summary**:    Cancel the prior approval for the transfer of an item by a delegate. 

   Origin must be either: 

  - the `Force` origin;

  - `Signed` with the signer being the Admin of the `collection`;

  - `Signed` with the signer being the Owner of the `item`;

   Arguments: 

  - `collection`: The collection of the item of whose approval will be cancelled.

  - `item`: The item of the item of whose approval will be cancelled.

  - `maybe_check_delegate`: If `Some` will ensure that the given account is the one to which permission of transfer is delegated. 

   Emits `ApprovalCancelled` on success. 

   Weight: `O(1)` 
 
### clearAttribute(collection: `u32`, maybe_item: `Option<u32>`, key: `Bytes`)
- **interface**: `api.tx.uniques.clearAttribute`
- **summary**:    Clear an attribute for a collection or item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the  `collection`. 

   Any deposit is freed for the collection's owner. 

   - `collection`: The identifier of the collection whose item's metadata to clear. 

  - `maybe_item`: The identifier of the item whose metadata to clear.

  - `key`: The key of the attribute.

   Emits `AttributeCleared`. 

   Weight: `O(1)` 
 
### clearCollectionMetadata(collection: `u32`)
- **interface**: `api.tx.uniques.clearCollectionMetadata`
- **summary**:    Clear the metadata for a collection. 

   Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of  the `collection`. 

   Any deposit is freed for the collection's owner. 

   - `collection`: The identifier of the collection whose metadata to clear. 

   Emits `CollectionMetadataCleared`. 

   Weight: `O(1)` 
 
### clearMetadata(collection: `u32`, item: `u32`)
- **interface**: `api.tx.uniques.clearMetadata`
- **summary**:    Clear the metadata for an item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the  `item`. 

   Any deposit is freed for the collection's owner. 

   - `collection`: The identifier of the collection whose item's metadata to clear. 

  - `item`: The identifier of the item whose metadata to clear.

   Emits `MetadataCleared`. 

   Weight: `O(1)` 
 
### create(collection: `u32`, admin: `MultiAddress`)
- **interface**: `api.tx.uniques.create`
- **summary**:    Issue a new collection of non-fungible items from a public origin. 

   This new collection has no items initially and its owner is the origin. 

   The origin must conform to the configured `CreateOrigin` and have sufficient funds free. 

   `ItemDeposit` funds of sender are reserved. 

   Parameters: 

  - `collection`: The identifier of the new collection. This must not be currently in use.

  - `admin`: The admin of this collection. The admin is the initial address of each member of the collection's admin team. 

   Emits `Created` event when successful. 

   Weight: `O(1)` 
 
### destroy(collection: `u32`, witness: `PalletUniquesDestroyWitness`)
- **interface**: `api.tx.uniques.destroy`
- **summary**:    Destroy a collection of fungible items. 

   The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the  owner of the `collection`. 

   - `collection`: The identifier of the collection to be destroyed. 

  - `witness`: Information on the items minted in the collection. This must be correct. 

   Emits `Destroyed` event when successful. 

   Weight: `O(n + m)` where: 

  - `n = witness.items`

  - `m = witness.item_metadatas`

  - `a = witness.attributes`
 
### forceCreate(collection: `u32`, owner: `MultiAddress`, free_holding: `bool`)
- **interface**: `api.tx.uniques.forceCreate`
- **summary**:    Issue a new collection of non-fungible items from a privileged origin. 

   This new collection has no items initially. 

   The origin must conform to `ForceOrigin`. 

   Unlike `create`, no funds are reserved. 

   - `collection`: The identifier of the new item. This must not be currently in use. 

  - `owner`: The owner of this collection of items. The owner has full superuser permissions  over this item, but may later change and configure the permissions using  `transfer_ownership` and `set_team`. 

   Emits `ForceCreated` event when successful. 

   Weight: `O(1)` 
 
### forceItemStatus(collection: `u32`, owner: `MultiAddress`, issuer: `MultiAddress`, admin: `MultiAddress`, freezer: `MultiAddress`, free_holding: `bool`, is_frozen: `bool`)
- **interface**: `api.tx.uniques.forceItemStatus`
- **summary**:    Alter the attributes of a given item. 

   Origin must be `ForceOrigin`. 

   - `collection`: The identifier of the item. 

  - `owner`: The new Owner of this item.

  - `issuer`: The new Issuer of this item.

  - `admin`: The new Admin of this item.

  - `freezer`: The new Freezer of this item.

  - `free_holding`: Whether a deposit is taken for holding an item of this collection.

  - `is_frozen`: Whether this collection is frozen except for permissioned/admin instructions. 

   Emits `ItemStatusChanged` with the identity of the item. 

   Weight: `O(1)` 
 
### freeze(collection: `u32`, item: `u32`)
- **interface**: `api.tx.uniques.freeze`
- **summary**:    Disallow further unprivileged transfer of an item. 

   Origin must be Signed and the sender should be the Freezer of the `collection`. 

   - `collection`: The collection of the item to be frozen. 

  - `item`: The item of the item to be frozen.

   Emits `Frozen`. 

   Weight: `O(1)` 
 
### freezeCollection(collection: `u32`)
- **interface**: `api.tx.uniques.freezeCollection`
- **summary**:    Disallow further unprivileged transfers for a whole collection. 

   Origin must be Signed and the sender should be the Freezer of the `collection`. 

   - `collection`: The collection to be frozen. 

   Emits `CollectionFrozen`. 

   Weight: `O(1)` 
 
### mint(collection: `u32`, item: `u32`, owner: `MultiAddress`)
- **interface**: `api.tx.uniques.mint`
- **summary**:    Mint an item of a particular collection. 

   The origin must be Signed and the sender must be the Issuer of the `collection`. 

   - `collection`: The collection of the item to be minted. 

  - `item`: The item value of the item to be minted.

  - `beneficiary`: The initial owner of the minted item.

   Emits `Issued` event when successful. 

   Weight: `O(1)` 
 
### redeposit(collection: `u32`, items: `Vec<u32>`)
- **interface**: `api.tx.uniques.redeposit`
- **summary**:    Reevaluate the deposits on some items. 

   Origin must be Signed and the sender should be the Owner of the `collection`. 

   - `collection`: The collection to be frozen. 

  - `items`: The items of the collection whose deposits will be reevaluated.

   NOTE: This exists as a best-effort function. Any items which are unknown or  in the case that the owner account does not have reservable funds to pay for a  deposit increase are ignored. Generally the owner isn't going to call this on items  whose existing deposit is less than the refreshed deposit as it would only cost them,  so it's of little consequence. 

   It will still return an error in the case that the collection is unknown of the signer  is not permitted to call it. 

   Weight: `O(items.len())` 
 
### setAcceptOwnership(maybe_collection: `Option<u32>`)
- **interface**: `api.tx.uniques.setAcceptOwnership`
- **summary**:    Set (or reset) the acceptance of ownership for a particular account. 

   Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a  provider reference. 

   - `maybe_collection`: The identifier of the collection whose ownership the signer is  willing to accept, or if `None`, an indication that the signer is willing to accept no  ownership transferal. 

   Emits `OwnershipAcceptanceChanged`. 
 
### setAttribute(collection: `u32`, maybe_item: `Option<u32>`, key: `Bytes`, value: `Bytes`)
- **interface**: `api.tx.uniques.setAttribute`
- **summary**:    Set an attribute for a collection or item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the  `collection`. 

   If the origin is Signed, then funds of signer are reserved according to the formula:  `MetadataDepositBase + DepositPerByte * (key.len + value.len)` taking into  account any already reserved funds. 

   - `collection`: The identifier of the collection whose item's metadata to set. 

  - `maybe_item`: The identifier of the item whose metadata to set.

  - `key`: The key of the attribute.

  - `value`: The value to which to set the attribute.

   Emits `AttributeSet`. 

   Weight: `O(1)` 
 
### setCollectionMaxSupply(collection: `u32`, max_supply: `u32`)
- **interface**: `api.tx.uniques.setCollectionMaxSupply`
- **summary**:    Set the maximum amount of items a collection could have. 

   Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of  the `collection`. 

   Note: This function can only succeed once per collection. 

   - `collection`: The identifier of the collection to change. 

  - `max_supply`: The maximum amount of items a collection could have.

   Emits `CollectionMaxSupplySet` event when successful. 
 
### setCollectionMetadata(collection: `u32`, data: `Bytes`, is_frozen: `bool`)
- **interface**: `api.tx.uniques.setCollectionMetadata`
- **summary**:    Set the metadata for a collection. 

   Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of  the `collection`. 

   If the origin is `Signed`, then funds of signer are reserved according to the formula:  `MetadataDepositBase + DepositPerByte * data.len` taking into  account any already reserved funds. 

   - `collection`: The identifier of the item whose metadata to update. 

  - `data`: The general information of this item. Limited in length by `StringLimit`.

  - `is_frozen`: Whether the metadata should be frozen against further changes.

   Emits `CollectionMetadataSet`. 

   Weight: `O(1)` 
 
### setMetadata(collection: `u32`, item: `u32`, data: `Bytes`, is_frozen: `bool`)
- **interface**: `api.tx.uniques.setMetadata`
- **summary**:    Set the metadata for an item. 

   Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the  `collection`. 

   If the origin is Signed, then funds of signer are reserved according to the formula:  `MetadataDepositBase + DepositPerByte * data.len` taking into  account any already reserved funds. 

   - `collection`: The identifier of the collection whose item's metadata to set. 

  - `item`: The identifier of the item whose metadata to set.

  - `data`: The general information of this item. Limited in length by `StringLimit`.

  - `is_frozen`: Whether the metadata should be frozen against further changes.

   Emits `MetadataSet`. 

   Weight: `O(1)` 
 
### setPrice(collection: `u32`, item: `u32`, price: `Option<u128>`, whitelisted_buyer: `Option<MultiAddress>`)
- **interface**: `api.tx.uniques.setPrice`
- **summary**:    Set (or reset) the price for an item. 

   Origin must be Signed and must be the owner of the asset `item`. 

   - `collection`: The collection of the item. 

  - `item`: The item to set the price for.

  - `price`: The price for the item. Pass `None`, to reset the price.

  - `buyer`: Restricts the buy operation to a specific account.

   Emits `ItemPriceSet` on success if the price is not `None`.  Emits `ItemPriceRemoved` on success if the price is `None`. 
 
### setTeam(collection: `u32`, issuer: `MultiAddress`, admin: `MultiAddress`, freezer: `MultiAddress`)
- **interface**: `api.tx.uniques.setTeam`
- **summary**:    Change the Issuer, Admin and Freezer of a collection. 

   Origin must be Signed and the sender should be the Owner of the `collection`. 

   - `collection`: The collection whose team should be changed. 

  - `issuer`: The new Issuer of this collection.

  - `admin`: The new Admin of this collection.

  - `freezer`: The new Freezer of this collection.

   Emits `TeamChanged`. 

   Weight: `O(1)` 
 
### thaw(collection: `u32`, item: `u32`)
- **interface**: `api.tx.uniques.thaw`
- **summary**:    Re-allow unprivileged transfer of an item. 

   Origin must be Signed and the sender should be the Freezer of the `collection`. 

   - `collection`: The collection of the item to be thawed. 

  - `item`: The item of the item to be thawed.

   Emits `Thawed`. 

   Weight: `O(1)` 
 
### thawCollection(collection: `u32`)
- **interface**: `api.tx.uniques.thawCollection`
- **summary**:    Re-allow unprivileged transfers for a whole collection. 

   Origin must be Signed and the sender should be the Admin of the `collection`. 

   - `collection`: The collection to be thawed. 

   Emits `CollectionThawed`. 

   Weight: `O(1)` 
 
### transfer(collection: `u32`, item: `u32`, dest: `MultiAddress`)
- **interface**: `api.tx.uniques.transfer`
- **summary**:    Move an item from the sender account to another. 

   This resets the approved account of the item. 

   Origin must be Signed and the signing account must be either: 

  - the Admin of the `collection`;

  - the Owner of the `item`;

  - the approved delegate for the `item` (in this case, the approval is reset).

   Arguments: 

  - `collection`: The collection of the item to be transferred.

  - `item`: The item of the item to be transferred.

  - `dest`: The account to receive ownership of the item.

   Emits `Transferred`. 

   Weight: `O(1)` 
 
### transferOwnership(collection: `u32`, new_owner: `MultiAddress`)
- **interface**: `api.tx.uniques.transferOwnership`
- **summary**:    Change the Owner of a collection. 

   Origin must be Signed and the sender should be the Owner of the `collection`. 

   - `collection`: The collection whose owner should be changed. 

  - `owner`: The new Owner of this collection. They must have called `set_accept_ownership` with `collection` in order for this operation to succeed. 

   Emits `OwnerChanged`. 

   Weight: `O(1)` 

___


## utility
 
### asDerivative(index: `u16`, call: `Call`)
- **interface**: `api.tx.utility.asDerivative`
- **summary**:    Send a call through an indexed pseudonym of the sender. 

   Filter from origin are passed along. The call will be dispatched with an origin which  use the same filter as the origin of this call. 

   NOTE: If you need to ensure that any account-based filtering is not honored (i.e.  because you expect `proxy` to have been used prior in the call stack and you do not want  the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`  in the Multisig pallet instead. 

   NOTE: Prior to version *12, this was called `as_limited_sub`. 

   The dispatch origin for this call must be _Signed_. 
 
### batch(calls: `Vec<Call>`)
- **interface**: `api.tx.utility.batch`
- **summary**:    Send a batch of dispatch calls. 

   May be called from any origin except `None`. 

   - `calls`: The calls to be dispatched from the same origin. The number of call must not  exceed the constant: `batched_calls_limit` (available in constant metadata). 

   If origin is root then the calls are dispatched without checking origin filter. (This  includes bypassing `frame_system::Config::BaseCallFilter`). 

   #### Complexity 

  - O(C) where C is the number of calls to be batched.

   This will return `Ok` in all circumstances. To determine the success of the batch, an  event is deposited. If a call failed and the batch was interrupted, then the  `BatchInterrupted` event is deposited, along with the number of successful calls made  and the error of the failed call. If all were successful, then the `BatchCompleted`  event is deposited. 
 
### batchAll(calls: `Vec<Call>`)
- **interface**: `api.tx.utility.batchAll`
- **summary**:    Send a batch of dispatch calls and atomically execute them.  The whole transaction will rollback and fail if any of the calls failed. 

   May be called from any origin except `None`. 

   - `calls`: The calls to be dispatched from the same origin. The number of call must not  exceed the constant: `batched_calls_limit` (available in constant metadata). 

   If origin is root then the calls are dispatched without checking origin filter. (This  includes bypassing `frame_system::Config::BaseCallFilter`). 

   #### Complexity 

  - O(C) where C is the number of calls to be batched.
 
### dispatchAs(as_origin: `KitchensinkRuntimeOriginCaller`, call: `Call`)
- **interface**: `api.tx.utility.dispatchAs`
- **summary**:    Dispatches a function call with a provided origin. 

   The dispatch origin for this call must be _Root_. 

   #### Complexity 

  - O(1).
 
### dispatchAsFallible(as_origin: `KitchensinkRuntimeOriginCaller`, call: `Call`)
- **interface**: `api.tx.utility.dispatchAsFallible`
- **summary**:    Dispatches a function call with a provided origin. 

   Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call. 

   The dispatch origin for this call must be _Root_. 
 
### forceBatch(calls: `Vec<Call>`)
- **interface**: `api.tx.utility.forceBatch`
- **summary**:    Send a batch of dispatch calls.  Unlike `batch`, it allows errors and won't interrupt. 

   May be called from any origin except `None`. 

   - `calls`: The calls to be dispatched from the same origin. The number of call must not  exceed the constant: `batched_calls_limit` (available in constant metadata). 

   If origin is root then the calls are dispatch without checking origin filter. (This  includes bypassing `frame_system::Config::BaseCallFilter`). 

   #### Complexity 

  - O(C) where C is the number of calls to be batched.
 
### ifElse(main: `Call`, fallback: `Call`)
- **interface**: `api.tx.utility.ifElse`
- **summary**:    Dispatch a fallback call in the event the main call fails to execute.  May be called from any origin except `None`. 

   This function first attempts to dispatch the `main` call.  If the `main` call fails, the `fallback` is attemted.  if the fallback is successfully dispatched, the weights of both calls  are accumulated and an event containing the main call error is deposited. 

   In the event of a fallback failure the whole call fails  with the weights returned. 

   - `main`: The main call to be dispatched. This is the primary action to execute. 

  - `fallback`: The fallback call to be dispatched in case the `main` call fails.

   #### Dispatch Logic 

  - If the origin is `root`, both the main and fallback calls are executed without applying any origin filters. 

  - If the origin is not `root`, the origin filter is applied to both the `main` and `fallback` calls. 

   #### Use Case 

  - Some use cases might involve submitting a `batch` type call in either main, fallback or both. 
 
### withWeight(call: `Call`, weight: `SpWeightsWeightV2Weight`)
- **interface**: `api.tx.utility.withWeight`
- **summary**:    Dispatch a function call with a specified weight. 

   This function does not check the weight of the call, and instead allows the  Root origin to specify the weight of the call. 

   The dispatch origin for this call must be _Root_. 

___


## vesting
 
### forceRemoveVestingSchedule(target: `MultiAddress`, schedule_index: `u32`)
- **interface**: `api.tx.vesting.forceRemoveVestingSchedule`
- **summary**:    Force remove a vesting schedule 

   The dispatch origin for this call must be _Root_. 

   - `target`: An account that has a vesting schedule 

  - `schedule_index`: The vesting schedule index that should be removed
 
### forceVestedTransfer(source: `MultiAddress`, target: `MultiAddress`, schedule: `PalletVestingVestingInfo`)
- **interface**: `api.tx.vesting.forceVestedTransfer`
- **summary**:    Force a vested transfer. 

   The dispatch origin for this call must be _Root_. 

   - `source`: The account whose funds should be transferred. 

  - `target`: The account that should be transferred the vested funds.

  - `schedule`: The vesting schedule attached to the transfer.

   Emits `VestingCreated`. 

   NOTE: This will unlock all schedules through the current block. 

   #### Complexity 

  - `O(1)`.
 
### mergeSchedules(schedule1_index: `u32`, schedule2_index: `u32`)
- **interface**: `api.tx.vesting.mergeSchedules`
- **summary**:    Merge two vesting schedules together, creating a new vesting schedule that unlocks over  the highest possible start and end blocks. If both schedules have already started the  current block will be used as the schedule start; with the caveat that if one schedule  is finished by the current block, the other will be treated as the new merged schedule,  unmodified. 

   NOTE: If `schedule1_index == schedule2_index` this is a no-op.  NOTE: This will unlock all schedules through the current block prior to merging.  NOTE: If both schedules have ended by the current block, no new schedule will be created  and both will be removed. 

   Merged schedule attributes: 

  - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block, current_block)`. 

  - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.

  - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.

   The dispatch origin for this call must be _Signed_. 

   - `schedule1_index`: index of the first schedule to merge. 

  - `schedule2_index`: index of the second schedule to merge.
 
### vest()
- **interface**: `api.tx.vesting.vest`
- **summary**:    Unlock any vested funds of the sender account. 

   The dispatch origin for this call must be _Signed_ and the sender must have funds still  locked under this pallet. 

   Emits either `VestingCompleted` or `VestingUpdated`. 

   #### Complexity 

  - `O(1)`.
 
### vestOther(target: `MultiAddress`)
- **interface**: `api.tx.vesting.vestOther`
- **summary**:    Unlock any vested funds of a `target` account. 

   The dispatch origin for this call must be _Signed_. 

   - `target`: The account whose vested funds should be unlocked. Must have funds still  locked under this pallet. 

   Emits either `VestingCompleted` or `VestingUpdated`. 

   #### Complexity 

  - `O(1)`.
 
### vestedTransfer(target: `MultiAddress`, schedule: `PalletVestingVestingInfo`)
- **interface**: `api.tx.vesting.vestedTransfer`
- **summary**:    Create a vested transfer. 

   The dispatch origin for this call must be _Signed_. 

   - `target`: The account receiving the vested funds. 

  - `schedule`: The vesting schedule attached to the transfer.

   Emits `VestingCreated`. 

   NOTE: This will unlock all schedules through the current block. 

   #### Complexity 

  - `O(1)`.

___


## voterList
 
### putInFrontOf(lighter: `MultiAddress`)
- **interface**: `api.tx.voterList.putInFrontOf`
- **summary**:    Move the caller's Id directly in front of `lighter`. 

   The dispatch origin for this call must be _Signed_ and can only be called by the Id of  the account going in front of `lighter`. Fee is payed by the origin under all  circumstances. 

   Only works if: 

   - both nodes are within the same bag, 

  - and `origin` has a greater `Score` than `lighter`.
 
### putInFrontOfOther(heavier: `MultiAddress`, lighter: `MultiAddress`)
- **interface**: `api.tx.voterList.putInFrontOfOther`
- **summary**:    Same as [`Pallet::put_in_front_of`], but it can be called by anyone. 

   Fee is paid by the origin under all circumstances. 
 
### rebag(dislocated: `MultiAddress`)
- **interface**: `api.tx.voterList.rebag`
- **summary**:    Declare that some `dislocated` account has, through rewards or penalties, sufficiently  changed its score that it should properly fall into a different bag than its current  one. 

   Anyone can call this function about any potentially dislocated account. 

   Will always update the stored score of `dislocated` to the correct score, based on  `ScoreProvider`. 

   If `dislocated` does not exists, it returns an error. 

___


## whitelist
 
### dispatchWhitelistedCall(call_hash: `H256`, call_encoded_len: `u32`, call_weight_witness: `SpWeightsWeightV2Weight`)
- **interface**: `api.tx.whitelist.dispatchWhitelistedCall`
 
### dispatchWhitelistedCallWithPreimage(call: `Call`)
- **interface**: `api.tx.whitelist.dispatchWhitelistedCallWithPreimage`
 
### removeWhitelistedCall(call_hash: `H256`)
- **interface**: `api.tx.whitelist.removeWhitelistedCall`
 
### whitelistCall(call_hash: `H256`)
- **interface**: `api.tx.whitelist.whitelistCall`
