---
id: maintain-guides-how-to-join-council
title: 協議会への参加
sidebar_label: 協議会への参加
---

協議会は、PolkadotおよびKusamaのステークホルダーたちを代表するチェーン上のアカウントから選ばれたもので構成されています。協議会にはガバナンスにおける主な役割が主に二つあります。それは、1) 投票を提案すること、2) 危険および悪意のある投票を拒否権を使い否認することです。協議会についてより詳しく知るためには[ガバナンスページ](learn-governance#council)　をご覧下さい。このガイドは協議会に立候補する方法について説明します。

## 立候補を表明する

Submitting your candidacy for the council requires a small bond of DOT / KSM. The bond will be forfeited if your candidacy does not win or become a runner-up and will be kept otherwise. You only receive your bond back, if you manually renounce your candidacy before losing. Runners-up are selected after every round and are reserved members in case one of the winners gets forcefully removed.

> 現在Polkadotにおいて協議会に立候補する場合の担保額は100DOT、Kusamaにおいて協議会に立候補する場合の担保額は0.1666KSMです。

協議会に立候補をする前には、選挙が開始され、すぐに投票してもらえるように、前以て出馬することをアナウンスし、サポーターに対し周知活動しておくことが良いでしょう。万が一、誰も投票してくれない場合は自分で自身に対し票をいれることができます。

Go to [Polkadot Apps Dashboard](https://polkadot.js.org/apps) and navigate to the "Council" tab. Click the button on the right that says "Submit Candidacy."

![立候補を表明するボタン](assets/council/polkadotjs_submit_candidancy.png)

トランザクションを行った後に、「立候補者」の下にあなたのアカウントが表示されます。

![立候補者リスト](assets/council/polkadotjs_candidates.png)

まず、自分自身のアカウントに対して票を入れ、例を作っておくことが良いと考えれらます。

## 立候補者に対して投票する

Next to the button to submit candidacy is another button titled "Vote." You will click this button to make a vote for yourself (optional).

![UIの投票ボタン](assets/council/polkadotjs_vote_button.png)

The council uses [Phragmén](learn-phragmen) approval voting, which is also used in the validator elections. This means that you can choose up to 16 distinct candidates to vote for and your stake will equalize between them. For this guide, choose to approve your own candidacy by clicking on the switch next to your account and changing it to say "Aye."

![UIでの投票ポップアップ](assets/council/polkadotjs_voting.png)

## 当選

If you are one of the lucky ones to win a council election you will see your account move underneath the row "Members".

![council members list](assets/council/polkadotjs_council_members.png)

これであなたも協議会に参加し、提案を行うことができます。よりアクティブなディスカッションに参加するには[Kusamaガバナンスチャンネル](https://matrix.to/#/!QXMnIJzxlnVrvRzhUA:matrix.parity.io?via=matrix.parity.io&via=matrix.org&via=web3.foundation)まで。
