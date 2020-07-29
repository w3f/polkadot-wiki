---
id: build-build-with-polkadot
title: С чего начать? Введение в программирование Polkadot
sidebar_label: Инструкция для начала разработки в Polkadot
---

_Эта статья является актуальной версией записи блога: [Все, что вам нужно знать для начала работы с Polkadot](https://medium.com/polkadot-network/everything-you-need-to-know-to-prepare-for-polkadot-32d08b929735)._

Polkadot - это протокол блокчейна с двумя целями: обеспечить **общую безопасность** среди всех подключенных парачейнов и разрешить всем подключенным чейнам **взаимодействовать** с помощью [XCMP](learn-crosschain). С появлением [PDK](build-pdk), такие как Parity Substrate и Cumulus, значительно сократилось время, необходимое для разработки и запуска новой сети. Если раньше запуск новой сети занимал годы, то теперь это может занять недели или даже дни.

Это руководство проведет Вас по шагам, которые вы можете сделать сегодня, чтобы начать строить свое видение с Polkadot. Вы поймете разницу между парачейном и смарт-контрактом (и почему одно либо другое лучше подходит для Вашего приложения). Тут Вы найдете всю необходимую информацию ту, которая уже доступна сейчас и ту, которую скоро появятся, чтобы Вы могли начать создавать свое приложение в ожидании запуска программы основной сети Polkadot в этом году.

## Итак, на какой стадии разработки мы сейчас?

- Релиз Polkadot: **Середина 2020**
- Канареечный релиз: **Kusama**
- Текущая тестовая сеть: **Westend**
- Substrate: **2.0.0**
- Cumulus: **в разработке** ([Доступно демо](https://github.com/paritytech/cumulus))
- ink!: **In development** ([Documentation](https://substrate.dev/docs/en/knowledgebase/smart-contracts))

## Что Вам нужно знать?

В настоящее время Polkadot находится на стадии релиза v0.7 с тестовой сетью Westend и имеющую рыночную ценность канареечной сетью Kusama. Polkadot разрабатывается на [различных языках программирования](learn-implementations) от Rust до JavaScript. В настоящее время главная разработка  ведется на Rust и построена на фреймворке Substrate. Substrate - это библиотека, которая позволяет разработчикам с легкостью разрабатывать целые блокчейн приложения, объединяя сетевой протокол, консенсус и Wasm интерпретатор. Cumulus, являющийся расширением Substrate, позволит любому блокчейну на базе Substrate подключиться к Polkadot и стать парачейном. В настоящее время Substrate приближается к своему официальному релизу 2.0.0, в котором улучшен API.

Polkadot изначально не поддерживает смарт-контракты, однако будут парачейны которые будут их поддерживать. Цепочки Substrate могут включать в себя функциональность смарт-контракта с помощью [Контрактов](https://github.com/paritytech/substrate/tree/master/frame/contracts) платформа для контрактов Wasm или [EVM](https://github.com/paritytech/substrate/tree/master/frame/evm) палеет во FRAME. Платформы для смарт-контрактов позволяют цепочкам использовать скомпилированные в Wasm смарт-контракты, которые могут не иметь привязки к конкретным пользователям и с конкретными правилами, зависящими от цепи. Для облегчения разработки Wasm смарт-контракты, Parity также разрабатывает [ink!](https://github.com/paritytech/ink), язык на Rust для написания смарт-контрактов.

Планируется, что запуск Polkadot начнется в середине 2020 года, в зависимости от аудитов безопасности и внешних факторов что вне контроля команды. С появлением и стабилизацией инструментов, нет лучшего времени для запуска, но подождите! Прежде чем приступить к изучению кода, Вам следует подумать о типе децентрализованного приложения, которое Вы хотите создать, и понять различные парадигмы, доступные разработчикам, которые хотят использовать Polkadot.

## В чем различие между разработкой парачейнов, паратридов и смарт-контрактов?

Polkadot предоставляет Вам несколько способов развертывания Вашего приложения: в качестве смарт-контракта на существующем парачейне, как Ваш собственный парачейн, или как паратред. При работе с каждым из них есть компромиссы и чтение этого раздела поможет Вам понять их.

Parachains are individual chains containing their own runtime logic that benefit from the shared security and the cross-chain messaging provided by the Polkadot Relay Chain. Parachains permit a high degree of flexibility and customization but will require more effort to create and maintain.

Parathreads are like parachains and enable the developer to have lower-level control of the logic of their application. The main difference between the two is economic, since parathreads will be much less expensive to secure than a parachain. The lower costs of parathreads are due to the fact that parathreads will only produce a block when they need to, unlike parachains, which have secured a slot to produce a block at every block of the Relay Chain. When building a parathread, you will use the same tools (like PDKs) and you get all of the benefits of building a parachain, without the drawback of the cost.

В основной цепи Polkadot появятся парачейны, которые будут действовать как платформы смарт-контрактов. Смарт-контракты - это исполняемые программы, которые существуют только в одной цепочке и ограничены по сложности. Поскольку они существуют в одной цепочке, они могут иметь плавную совместимость с другими смарт-контрактами в той же цепочке. Однако они всегда будут скованы и ограничены присущими им характеристиками цепи-хозяина.

Если необходимо иметь большой контроль над возможностями и особенностями вашего приложения, парачейн - это лучший выбор. Имейте в виду, что смарт-контракты могут быть использованы в качестве тестируемого полигона до того, как впоследствии будут преобразованы в полноценный парачейн. Платформы для смарт-контрактов обычно имеют более удобные инструменты, такие как IDEs для облегчения быстрой итерации. MVP (минимально работоспособный, тестовый) смарт-контракт может быть создан для оценки интересов пользователя перед размещением его в рабочем парачейне.

Парачейны предоставляют создателям больше пространства для построения денежно-кредитной системы и других аспектов цепочки с нуля. Они позволят более лаконично и эффективно выполненять сложную логику, чем может предложить платформа смарт-контрактов. Парачейны также предлагают большую гибкость в форме управления и могут выполнять полную модернизацию менее спорным способом, чем нынешний процесс хардфорков.

Вот некоторые примеры функций, которые вы можете использовать на парачейне или паратриде:

- Пользовательская структура оплаты (например, оплата фиксированной комиссии за транзакции или оплата за байт).
- Гибкая настройка кредитно-денежнай политики для нативного токена и локальной экономики.
- Казначейство, которое будет финансироваться за счет переходов в Вашей функции состояния.
- Механизм управления, который мог бы управлять DAO, ответственным за распределение Вашего казначейства по цепочке.

![сборка 1](assets/build-1.png)

Парачейны открывают возможности для построения сложной логики выполнения, которая была бы слишком дорогой для выполнения с помощью смарт-контрактов. Однако, в отличие от смарт-контрактов, парачейны полностью лишены обязательной системы учета газа и потенциально могут быть уязвимы к ошибкам, которые вызывают бесконечные циклы (то, что предотвращается дизайном в смарт-контрактах).

Вы также можете решить использовать комбинацию парачейна, паратрида и смарт-контракта. Если у Вас есть определенная логика, требующая циклов, и она не может быть удалена, используйте нативную среду исполнения парачейна для обработки всей сложной логики и смарт-контракт для вызова итерации. Если Вам требуются данные вне цепочки от оракула, Вы можете использовать паратрид в качестве канала для связи с оракулом, который запускается только один раз в 24 часа (это имеет наибольший смысл, если данные полезны и другим игрокам в экосистеме Polkadot).

Скорее всего, Вы уже поняли, что ваше приложение лучше подходит для того, чтобы быть одним или другим (или гибридом их обоих), но если Вам нужен быстрый обзор, чтобы переварить информацию, Вы можете использовать эту сравнительную диаграмму в качестве шпаргалки:

![сборка 2](assets/build-2.png)

> **Примечание:** Изображение выше не включает паратриды, но, как мы уже упомянули ранее, все преимущества парачейнов применимы также и к паратридам. Однако паратриды _являются_ более дешёвыми для развертывания и обслуживания. Таким образом, если бы у них был столбец в таблице выше, он выглядел бы как столбец парачейн с "легкостью развертывания" и "накладными расходами на обслуживание", измененными на `+`.

Это руководство теперь разделяется на два раздела в зависимости от того, решили ли Вы создать смарт-контракт или парачейн. Не стесняйтесь прочитать оба раздела или то, что Вам подходит.

- [Я хочу построить парачейн или паратрид!](#so-you-want-to-build-a-parachain-or-parathread)
- [Я хочу создать смарт-контракт!](#so-you-want-to-build-a-smart-contract)

## Итак, Вы хотите разработать парачейн или паратрид...

Теперь, когда Вы определили, что создание парачейна или паратрида является правильным подходом для Вашего нового проекта, следующий шаг - это решить, какой фреймворк использовать. Фреймворки для построения парачейна или паратрида известны как  комплекты для разработки параченов (англ. PDK - parachain development kits). В настоящее время единственный доступный PDK - это Substrate и Cumulus от Parity Technologies.

В будущем на разных языках программирования будет много различных PDK, так же, как есть несколько [реализаций](learn-implementations.md) среды исполнения Polkadot.

> **Призыв к действию:** Вы хотите построить комплект для разработки парачейнов с нуля? Фонд Web3 предоставляет гранты командам, которые сделают это, посмотрите подробнее и подайте заявку на сайте [W3F](https://grants.web3.foundation).

### Начать работу с Substrate

Субстрат - это базовый каркас, на котором строится сам Polkadot. Это набор инструментов для блокчейн-новаторов, который обеспечивает необходимые строительные блоки для построения цепочки. Он включает в себя библиотеку модульных плагинов, из которых Вы можете составить свою блокчейн логику и позволяет Вам писать свои собственные паллеты для использования или публикации в сообществе.

The best way to get started with Substrate is to explore the [Substrate Knowledge Base](https://substrate.dev/docs/en/), an online resource built and maintained by Parity Technologies.

Мы рекомендуем Вам покопаться там, чтобы ознакомиться с общими шаблонами. Как только у Вас появится твердое понимание, Вы можете бросить вызов себе, пройдя через мастер-класс Substrate kitties, а затем перейдя к учебнику TCR Dappchain или любому другому.

### Как настроить ваш парачейн

После создания Вашей блокчейн логики с Substrate Вы сможете скомпилировать её до исполняемого файла Wasm. Это blob-код WASM будет содержать всю функцию перехода состояния Вашей цепочки, и это то, что Вам нужно будет при развертывании своего проекта в Polkadot как парачейн или паратрид.

Валидаторы на Polkadot будут использовать представленный код Wasm для проверки переходов состояния Вашей цепочки или потока, но для этого требуется некоторая дополнительная инфраструктура. Валидатор должен каким-то образом оставаться в курсе самых последних переходов состояний, так как узлы Polkadot не должны также быть узлами Вашей цепочки.

Именно здесь в игру вступает узел сортировщик (англ. collator). Сортировщик является сопровождающим Вашего парачейна и выполняет критическое действие по созданию новых блоков-кандидатов для Вашей цепи и передаче их валидаторам Polkadot для включения в релейную цепь.

Substrate comes with its own networking layer built-in but unfortunately only supports solo chains (that is, chains that do not connect to the Relay Chain). However, there is the Cumulus extension that includes a collator node and allows for your Substrate-built logic to be compatible with Polkadot as either a parachain or parathread.

#### Cumulus

Цель [Cumulus](build-cumulus) - это расширение Substrate, которое сделает любую Substrate среду исполнения совместимой с Polkadot.

Он обрабатывает накладные расходы на сетевую совместимость, которые любой парачейн должен был бы реализовать, чтобы быть подключенным к Polkadot. Это включает в себя:

- Перекрёстный обмен сообщениями между цепочками.
- Готовая установка ноды сборщика.
- An embedded light client of the Relay Chain.
- Совместимость с блоками Polkadot.
- Интеграция Cumulus с Вашей Substrate цепочкой портирует его в парачейн, способный работать на Polkadot с минимальными модификациями, возможно, с такой же незначительной доработкой, как импорт крейта и добавление одной строки.

Rob Habermeier, соучредитель Polkadot, в прошлом году выступил с докладом на EthCC, в котором представил Cumulus, который Вы можете посмотреть ниже. <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/thgtXq5YMOo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

### Как развернуть парачейн или паратрид в Polkadot

#### Парачейн

In order to include your parachain into the Polkadot network, you will need to acquire a parachain slot.

Parachain slots will be sold in open auctions, the mechanics of which can be found on the [parachain auction](learn-auction) page of the wiki.

#### Паратрид

Parathreads will not require a parachain slot, so you will not need to engage in the candle auction mechanism. Instead, you will be able to register your parathread code to the Relaychain for a fee and from then be able to start participating in the per-block auctions for inclusion of your state transition into the Relaychain.

For more information on how parathread per-block auctions work, see the more detailed [parathread](learn-parathreads) page.

## Итак Вы хотите создать смарт-контракт...

The Polkadot Relay Chain itself will not support smart contracts. However, since the parachains that connect to Polkadot can support arbitrary state transitions, they can support smart contracts. Builders of smart contracts can use these options when they become available. Today, it's possible to start development using a local development chain and later deploy to a live environment when the technology matures.

Substrate supports smart contracts out-of-the-box in two ways. One way is using the provided [Contracts](https://github.com/paritytech/substrate/tree/master/frame/contracts) pallet in the FRAME library. The second way is using the Substrate [EVM pallet](https://github.com/paritytech/substrate/tree/master/frame/evm) to deploy EVM-based bytecode compiled from Solidity or Vyper and using tools available from the Ethereum stack.

The experience of deploying to an EVM-based chain may be more familiar to developers that have written smart contract before. However, the Contracts pallet makes some notable improvements to the design of the EVM. Namely these are:

1. **Wasm**. В качестве цели компиляции паллет Контракты использует WebAssembly. Любой язык, который компилируется в Wasm, потенциально может быть использован для написания смарт-контрактов. Хотя лучше иметь специфичный проблемно-ориентированный язык, поэтому Parity предлагает язык [ink!](#ink).

2. **Аренда**. Контракты должны платить арендную плату или же содержать депозит, достаточно большой, чтобы оправдать его существование ончейн. Когда контракт не поддерживает это, он может создать то, что называется _tombstone/надгробие_, которое является ссылкой на контракт. В некоторых случаях контракт будет удален сразу же вместе с его хранилищем, если он не будет поддерживать эти требования.

3. **Кэширование**. Контракты кэшируются по умолчанию и поэтому они должны быть развернуты только один раз, а затем создаваться столько раз, сколько Вы хотите. Это помогает свести нагрузку за хранение на цепочку к минимуму. Кроме того, когда контракт больше не используется и _экзистенциальный депозит_ истощается, код будет стерт из хранилища (известного как жатва).

You will likely want to set up a local test environment to start writing your smart contracts. This can be done using a Substrate node with one of the two smart contracts pallets including. After development you will want to look into projects such as [Edgware])(#edgeware) for deploying your smart contract to a live environment.

### Edgeware

One project that is live today with the smart contracts pallet is [Edgeware](https://edgewa.re). Edgeware is a permissionless platform for smart contracts and is conducting experiments with on-chain governance. It is currently the best option for developers who have created their smart contracts and want to deploy to a live environment.

Edgeware intends to at some point connect to Polkadot as a parachain that allows for smart contracts. At this point, the smart contracts would be able to interact with other pieces of the Polkadot ecosystem through [XCMP](learn-crosschain).

Edgeware documentation can be found [here](https://docs.edgewa.re/).

### Ink!

[ink!](https://github.com/paritytech/ink) is a domain specific language for writing smart contracts in Rust and compiles to Wasm code. As it states in its README, it is still in an experimental phase so brave developers should be aware that they might have a bumpy - but workable - development experience. There are some projects that have built projects in ink! with a decent level of complexity such as Plasm's [Plasma contracts](https://github.com/staketechnologies/Plasm), so it is mature enough to start building interesting things.

For interested developers, they can get started writing smart contracts using ink! by studying the [examples](https://github.com/paritytech/ink/tree/master/examples) that were already written. These can be used as guideposts to writing more complex logic that will be deployable on smart contract parachains.

ink! has laid much of the groundwork for a new smart contract stack that is based on a Wasm virtual machine and compatible with Substrate chains.

## Развёртывание Вашего смарт-контракта

A smart contract is simply some code that exists at an address on a chain and is callable by external actors. The key part is that you actually have to put the code on chain before anyone can start executing it!

Deploying your smart contract on chain will vary slightly for whichever specific parachain you will use, but generally you will send a special transaction that will create the smart contract on the ledger. You will likely need to pay an associated fee for the initialization logic and any storage that your contract consumes.

## Оплата Вашего смарт-контракта

Each platform will have a different way of paying for and maintaining the state of your smart contract.

The different patterns you may see for paying for your smart contract include:

- Комиссионный сбор, связанный с развертыванием каждой транзакции.
- Модель подписки, в которой Вы оплачиваете некоторую плату за использование платформы.
- Модель токенов доступа, для которой Вам нужно держать некоторое количество собственных токенов, чтобы использовать платформу (EOS имеет что-то подобное). Аренда хранилища.
- Бесплатная пробная версия или промо-акция от разработчика.
- Большинство платформ смарт-контрактов используют ту или иную форму газа, чтобы ограничить количество операций, которые пользователь может выполнять. Пользователи будут обязаны платить за газ авансом и получат возврат за то, что они не используют.

You will need to consider the storage and complexity of your smart contract to ensure that gas usage stays within reasonable bounds. Storage will likely be expensive for whichever smart contract platform you use, so it is necessary to keep as much data off-chain as possible. You may consider using [IPFS](https://ipfs.io/) or [Storj](https://storj.io/) to keep the data and submitting only the content address on chain.

### До сих пор мы на раннем этапе

It’s still very early for smart contracts on Polkadot and the development is only now stabilizing. We are actively producing content to help developers get up to speed and will maintain the wiki with the latest resources. You should also keep up to date with the following links:

- [Edgeware](https://edgewa.re).
- [ink!](https://github.com/paritytech/ink). (Следите за контентом на вкладке вики.)
- [Модуль контрактов Substrate](https://github.com/paritytech/substrate/tree/master/srml/contracts).

## Заключение

This guide has given you a mental model and shown the requisite resources to help you determine and start building your project as a parachain or smart contract today. Even though the tooling is still maturing, the advantage of being early will be the familiarity and head start on your project, allowing you to innovate and create something truly new.

If you have interesting ideas for parachains or smart contracts on Polkadot feel free to drop in to the [Polkadot Watercooler](https://riot.im/app/#/room/#polkadot-watercooler:matrix.org) to talk about them. Developers may be interested in joining the [Polkadot Beginners Lounge](https://riot.im/app/#/room/#polkadotnoobs:matrix.org) or [Substrate Technical](https://riot.im/app/#/room/#substrate-technical:matrix.org) to ask their questions. As always, keep up to date with Polkadot by following the [social channels](community).

Good luck!
