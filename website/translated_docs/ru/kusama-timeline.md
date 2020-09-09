---
id: хронология-kusama
title: Хронология Kusama
sidebar_label: Хронология
---

Сеть Kusama началась как сеть подтверждения полномочий (Proof-of-Authority) и была переведена на Proof-of-Stake 28 октября 2019 года примерно в 18:43 по Цюрихскому времени (CET). Первая успешная ротация набора валидаторов состоялась в 22:45 CET.

Currently, Kusama is a healthy Proof-of-Stake network with over 500 validators and over two million blocks produced. If you are curious about the history of the Kusama network, you will find more information in the sections below.

## План выполнения

The rollout of full functionality of Kusama was staggered to allow for a safe transition. The first PoS phase began with 20 validators. Of the 20, the Web3 Foundation ran nine and Parity Technologies ran six. Five were ran by highly staked community members as voted in by the Phragmén election.

Когда начальный переход был успешным, дополнительные места для валидаторов были открыты по 10 за 1 раз чтобы позволить участвовать большему количеству валидаторов.

Когда произошел первый переход на PoS, полная функциональность Kusama была еще не полностью доступна. Примечательно, что ключ Sudo все еще существовал и использовался для инициирования дальнейших обновлений. Балансовые переводы все еще были отключены на короткое время.

Kusama now has its full functionality enabled.

## Kusama's First Adventure

[Source](https://polkadot.network/kusamas-first-adventure/)

On 4th January 2020, the Polkadot mainnet runtime, which at that time still wasn't live, was uploaded to the Kusama chain during a runtime upgrade. The mishap was due to a recent split of the Kusama logic from the Polkadot logic and that runtime was not properly named. This led to a halt of block production on the Kusama chain and bricked the chain entirely.

The solution to the issue involved a rollback of the chain history before the problematic runtime upgrade took place. However, due to intricacies of the block production mechanism, it was also necessary to encapsulate the validators of the chain into a time bubble to trick them into believing that they were producing blocks in the past. Furthermore, in order for the chain to catch up to the present moment it was necessary to make time flow in the bubble at a speed of six times greater than the speed of time in the real world. Therefore, the session of Kusama which would normally last one hour would last only 10 minutes until the validators caught up to the present moment.

The above plan was executed successfully on the 7th of January. Due to the time warp, the number of missed blocks in the sessions directly following [block #516558](https://polkascan.io/kusama/block/516558) was significantly higher. This is partly what contributes to the much higher ratio of missed blocks on Kusama versus Polkadot today.
