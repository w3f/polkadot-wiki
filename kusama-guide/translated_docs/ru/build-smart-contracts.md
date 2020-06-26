---
id: build-smart-contracts
title: Смарт-контракты
sidebar_label: Смарт-Контракты
---

The Polkadot Relay Chain will not support smart contracts natively. However, parachains on Polkadot will support smart contracts. There are already announced projects such as [Edgeware](https://edgewa.re), and thanks to the Substrate built-in [contract pallet](https://crates.parity.io/pallet_contracts/index.html), it is likely that more parachains will support this feature.

## Ресурсы

Вот список текущих ресурсов, доступных разработчикам, которые хотят начать писать смарт-контракты для развёртывания на основе Substrate.

- [ink!](https://github.com/paritytech/ink) - ink! разрабатываются Parity для написания смарт-контрактов.
- [Мастерская по контрактам Substrate](https://substrate.dev/substrate-contracts-workshop/#/) - Знакомит Вас с основами написания и развёртывания токена ERC20 с помощью `ink!`.
- [Using Smart Contracts on Polkadot and Kusama](https://www.youtube.com/watch?v=fKHkFBXaUxQ&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=6)

## Примеры

Ниже собраны некоторые примеры смарт-контрактов на `ink!` от сообщества. Вы работаете над смарт-примером контракта? Попросите нас добавить его на эту страницу!

- [Ownable](https://github.com/JesseAbram/foRust/) - Порт контракта OpenZeppelin - `Ownable`.

## В чём разница между разработкой смарт-контракта и парачейном?

### Слой абстракции

When you write a smart contract you are creating the instructions that will be deployed and associated to a specific chain address.

Для сравнения, модуль среды исполнения - это вся логика перехода к состояниям цепочки (так называемая функция перехода состояний).

Смарт-контракты должны сознательно реализовывать возможность обновления, в то время как парачейны будут иметь возможность полностью менять свой код через root команду или через паллет управления.

Когда Вы создаете смарт-контракт, он в конечном итоге будет развернут в целевую цепочку со своим собственным окружением/средой. Парачейны позволяют разработчику объявлять окружение своей собственной цепочки, даже позволяя другим писать для него смарт-контракты.

### Плата за газ

Смарт-контракты должны найти способ ограничивать свое собственное исполнение, иначе полные узлы будут уязвимы для DOS-атак. Например, бесконечный цикл в смарт-контракте может потреблять вычислительные ресурсы всей цепочки, не позволяя другим использовать её. The [проблема остановки](https://en.wikipedia.org/wiki/Halting_problem) показывает, что даже при достаточно мощном языке невозможно заранее знать, прекратится ли когда-либо выполнение программы. Некоторые платформы, такие как биткойн, обходят это ограничение, предоставляя очень ограниченный язык сценариев. Другие, например Ethereum, "заряжают" смарт-контракт "газом" за права на выполнение своего кода. Если смарт-контракт действительно попадает в состояние, в котором исполнение никогда не остановится, он в конечном итоге исчерпывает газ, прекращает исполнение, и любой переход состояния, который был бы сделан смарт-контрактом, откатывается назад.

Parachains can implement arbitrarily powerful programming languages and also contain no notion of gas for their own native logic. This means that some functionality is easier to implement for the developer, but it also means there are some constructs, such as a loop without a terminating condition, which should _never_ be implemented. Leaving certain logic, such as complex loops that could possibly run indefinitely, to a non-smart contract layer, or even trying to eliminate it entirely, will often be a wiser choice.

## Ресурсы

- [Когда я должен разрабатывать среду исполнения Substrate по сравнению с смарт-контрактом Substrate](https://stackoverflow.com/a/56041305) - с технической точки зрения отвечает на вопрос, когда разработчик может выбрать для разработки среду исполнения по сравнению со смарт-контрактом.
