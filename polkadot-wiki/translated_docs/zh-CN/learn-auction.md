---
id: learn-auction
title: 平行链插槽拍卖
sidebar_label: 平行链插槽拍卖
---

The parachain slots of Polkadot will be sold according to an unpermissioned [Candle auction](https://en.wikipedia.org/wiki/Candle_auction) that has been slightly modified to be secure on a blockchain.

## 蜡烛(Candle)拍卖机制

蜡烛拍卖是公开拍卖的一种形式，投标人提交的出价越来越高，拍卖结束时出价最高的投标人被视为获胜者。

蜡烛拍卖法最初是在16世纪使用的，用于出售船只，其名称取自"蜡烛的英寸"，而蜡烛的长度决定了拍卖的开放时间。 当火焰熄灭并且蜡烛熄灭时，拍卖会突然终止，这时的长期竞标将获胜。

在线使用蜡烛拍卖法时，它们需要一个随机数来决定终止的时间。

平行链插槽拍卖与正常的蜡烛拍卖法会略有不同，因为它不使用随机数来决定其开放阶段的持续时间。 取而代之的是，它具有已知的开放阶段，并将被追溯确定(在正常关闭时)在过去的某个时刻结束。 因此在公开阶段，投标将继续被接受，但是以后的投标有更高的失败概率，因为追溯确定的关闭时刻可能早于提交投标的时间。

## 为什么要使用蜡烛拍卖?

The open and transparent nature of blockchain systems opens attack vectors that are non-existent in traditional auction formats. Normal open auctions in particular can be vulnerable to _auction sniping_ when implemented over the internet or on a blockchain.

当已知拍卖结束且竞标者不愿提早竞标其真实价格时，便会进行拍卖狙击，以期支付比实际价格低的价格。

例如爱丽丝在拍卖会上可能会为某物品估价30美元。 她提交了10美元的初始出价，希望以较低的价格购买这些物品。 爱丽丝的策略是逐步提高出价，直到超过其30美元的真实价值。 另一个竞标者夏娃对同一物品的估价为11美元。 夏娃的策略是持续观看拍卖结果，并在最后一秒提交11美元的出价。 在拍卖结束之前，爱丽丝将没有时间响应此出价，并且会失去该物品。 拍卖机制是次优的，因为它尚未发现商品的真实价格，而且商品也未归给估价最高的人员。

在区块链上，这个问题可能更加严重，因为它可能给出块者提供机会，通过自己添加和/或忽略其他出价来窥探最后一个区块的任何拍卖。恶意竞标者或出块者还可能通过狙击拍卖来_grief_诚实的竞标者。

For this reason, [Vickrey auctions](https://en.wikipedia.org/wiki/Vickrey_auction), a variant of second price auction in which bids are hidden and only revealed in a later phase, have emerged as a well-regarded mechanic. For example, it is implemented as the mechanism to auction human readable names on the [ENS](https://ens.domains). The Candle auction is another solution that does not need the two-step commit and reveal schemes (a main component of Vickrey auctions), and for this reason allows smart contracts to participate.

蜡烛拍卖允许每个人始终知道出价的状态，但不能知道何时确定拍卖已"结束"。 这有助于确保投标人愿意尽早出价其真实出价。 否则他们可能会发现自己在甚至竞标之前就已确定拍卖已经"结束"。

## Polkadot 如何使用它

Polkadot will use a _random beacon_ based on the VRF that's used also in other places of the protocol. The VRF will provide the base of the randomness, which will retroactively determine the "end-time" of the auction.

当账户出价时，他们可以为插槽位中的任何可用时间段或范围出价，但是如果平行链(具有相同的STF)出价，则该平行链必须在连续的时期或范围内竞标，直至其已经占据的时期。它们将无法竞标重叠的插槽位(同一条平行链不能同时获得)，并且如果两者之间存在差距，他们将无法竞标未来的插槽位。如果平行链已达到其插槽持续时间的结束后重新启动，则需要从新的创世(可能是所有旧状态的快照)重新启动，并且需要从外部帐户出价 。

插槽的持续时间上限为2年，每期分为6个月。平行链可以在时隙持续时间的任何连续范围内租用一个时隙。平行链可能会随时间租用一个以上的插槽，这意味着他们可以通过租用连续的插槽，将租约延长至 Polkadot 超过2年的插槽期限。

## 竞标如何运作？

```
创世的平行链插槽

       --6 months--
       v          v
Slot A |     1    |     2    |     3     |     4     |...
Slot B |     1    |     2    |     3     |     4     |...
Slot C |__________|     1    |     2     |     3     |     4     |...
Slot D |__________|     1    |     2     |     3     |     4     |...
Slot E |__________|__________|     1     |     2     |     3     |     4     |...
       ^                                             ^
       ---------------------2 years-------------------

1-4范围的每个周期代表6个月的持续时间，共2年
```

每个平行链插槽的最长持续时间为2年。 在插槽各6个月的间隔被划分成它自己的`租赁期`。 一个`范围`是一个以上连续的`期间`。

在开始一组平行链插槽租赁之前的六个月中，将进行几次拍卖。

投标人将提交一份投标配置，以指定他们愿意锁定的 DOT 金额以及范围。 时隙范围可以是时段1-4的任何连续范围。

单个投标人的投标人配置可能如下所示：

```js
Bids[
  ({
    range: [1, 2, 3, 4],
    bond_amount: 300, //DOTs
  },
  {
    range: [1, 2],
    bond_amount: 777, //DOTs
  },
  {
    range: [2, 3, 4],
    bond_amount: 450, // DOTs
  })
];
```

The winner selection algorithm will pick bids that may be non-overlapping in order to maximize the amount of DOTs held over the entire 2-year lease duration of the parachain slot. This means that the highest bidder for any given slot lease period might not always win (see the [example below](#compete)).

A random number, which is based on the VRF used by Polkadot, is determined at each block. Additionally, each auction will have a threshold that starts at 0 and increases to 1. The random number produced by the VRF is examined next to the threshold to determine if that block is the end of the auction. Additionally, the VRF will pick a block from the last epoch to take the state of bids from (to mitigate some types of attacks from malicious validators).

### 例子

#### 非竞争性

只有一个平行链插槽可用

爱丽丝将` 20 DOTs`的出价设置在1-2阶段。

鲍勃出价` 30 DOTs `在3-4阶段。

拍卖结束

爱丽丝会绑定` 20 DOTs`，并将在第一年拥有平行链插槽。

鲍勃绑定了` 30 DOTs`，并将在第二年拥有平行链插槽。

#### 竞争性

只有一个平行链插槽可用

对于1-4阶段，查理出价` 75个DOT `

对于3-4阶段，戴夫出价`100 DOTs`

对于1-2阶段，艾米丽出价`40 DOTs`

让我们根据算法来计算每个投标人的估价。 为此我们将保证金金额乘以投标指定范围内的期间数。

在1-4阶段，查理-75*4=300

在3-4阶段，戴夫-100 * 2 = 200

在1-2阶段，艾米丽-40 * 2 = 80

尽管根据 DOT 金额，戴夫的出价最高，但是当我们进行计算时，我们看到，由于他只出价2个在区间，他需要与出价低得多的艾米丽分享这个期间。戴夫和艾米丽的出价加在一起，其估价仅为` 280 `。

查理对整个范围的估价是`300`因此查理被授予平行链插槽的整个阶段。

## 常见问题

### 为什么每个人不竞标最大长度？

For the duration of the slot the `DOTs` bid in the auction will be locked up. This means that there are opportunity costs from the possibility of using those `DOTs` for something else. For parachains that are beneficial to Polkadot, this should align the interests between parachains and the Polkadot Relay Chain.

### 这种机制如何帮助确保平行链的多样性？

The method for dividing the parachain slots into six month intervals was partly inspired by the desire to allow for a greater amount of parachain diversity, and prevent particularly large and well-funded parachains from hoarding slots. By making each period a six-month duration but the overall slot a 2-year duration, the mechanism can cope with well-funded parachains that will ensure they secure a slot at the end of their lease, while gradually allowing other parachains to enter the ecosystem to occupy the six-month durations that are not filled. For example, if a large, well-funded parachain has already acquired a slot for range 1 - 4, they would be very interested in getting the next slot that would open for 2 - 5. Under this mechanism that parachain could acquire period 5 (since that is the only one it needs) and allow range 2 - 4 of the second parachain slot to be occupied by another.

### 为什么在区块链上很难实现随机性？

对于区块链系统来说，随机性是个问题。在透明开放的网络上以不信任的方式生成随机数，其他各方必须能够在该网络中进行验证，这为行为者尝试改变或操纵随机性提供了可能性。 已经提出了一些解决方案，包括[ RANDAO ](https://github.com/randao/randao)和[可验证的随机函数](https:// zh.wikipedia.org/wiki/Verifiable_random_function)(VRFs)。后者是 Polkadot 用作随机性的基础。

## 资源

- [ 平行链分配](http://research.web3.foundation/zh-Cn/latest/polkadot/Parachain-Allocation/)-有关平行链分配的 W3F 研究页面，对该机制进行了更深入的介绍。
- [ paritytech/polkadot#239 ](https://github.com/paritytech/polkadot/pull/239) - Pull request，介绍了平行链插槽代码。
