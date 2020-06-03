---
id: build-transaction-construction
title: Создание и подписание транзакций
sidebar_label: Создание транзакций
---

На этой странице будет обсуждаться формат транзакций в Polkadot и способы создания, подписания и трансляции транзакций. Как и на других страницах этого руководства, на этой странице демонстрируются некоторые из доступных инструментов.**При интеграции всегда обращайтесь к документации по каждому инструменту.**

## Формат транзакции

У Polkadot есть базовая информация о транзакциях, которая является общей для всех транзакций.

- Адрес/Address: SS58-кодированный адрес учётной записи отправителя.
- Хеш Блока/Block Hash: Хэш [контрольной точки/checkpoint](build-protocol-info#transaction-mortality) блока.
- Номер Блока/Block Number: номер контрольной точки блока.
- Хеш Генезиса/Genesis Hash: Хэш генезиса цепочки.
- Метаданные/Metadata: метаданные в кодировке SCALE для среды исполнения при отправке.
- Nonce: [nonce](https://ru.wikipedia.org/wiki/Nonce) для этой транзакции.\*
- Версия Spec: Текущая версия spec для среды исполнения.
- Версия транзакции: текущая версия для формата транзакции.
- Подсказка: необязательно, [советы](build-protocol-info#fees) для увеличения приоритета транзакций.
- Период Эы/Era Period: Необязательно, количество блоков после контрольной точки, для которой транзакция является действительной. Если нуль, транзакция [бессмертная](build-protocol-info#transaction-mortality).

\*Nonce, запрошенный из системного модуля, не учитывает отложенные транзакции. Вы должны отслеживать и увеличивать nonce вручную, если хотите отправить несколько действительных транзакций одновременно.

Каждая транзакция будет иметь свои собственные (или нет) параметры для добавления. Например, функция `transferKeepAlive` из паллета Балансов будет принимать:

- `dest`: Адрес назначения
- `#[compact]количество`: Количество токенов (компактная кодировка)

Как только Вы получите всю необходимую информацию, Вам нужно будет:

1. Создать неподписанную транзакцию.
1. Создать информационное наполнение (англ. payload) для подписи.
1. Подписать полезную информацию.
1. Сериализовать подписанную полезную информацию в транзакцию.
1. Отправить сериализованную транзакцию.

Parity предоставляет следующие инструменты для выполнения этих шагов.

## Инструменты Polkadot JS

[Polkadot JS Tools](https://github.com/polkadot-js/tools) содержит набор инструментов командной строки для взаимодействия с клиентом Substrate, включая тот, который называется "Signer CLI" для создания, подписания и трансляции транзакций.

В этом примере будет использована команда `signer submit`, которая создаст и отправит транзакцию. Команда `signer sendOffline` имеет тот же API, но не будет транслировать транзакцию. `submit` и `sendOffline` должны быть подключены к узлу, чтобы получить текущие метаданные и построить действительную транзакцию. Их API имеет формат:

```bash
yarn run:signer <submit|sendOffline> --account <from-account-ss58> --ws <endpoint> <module.method> [param1] [...] [paramX]
```

Подписание:

```bash
yarn run:signer sign --account <from-account-ss58> --seed <seed> --type <sr25519|ed25519> <payload>
```

Например, давайте отправим 0.5 DOT от `121X5bEgTZcGQx5NZjwuTjqKoiG8B2wEAvrUFjuw24ZGZf2` до `15vrtLsCQFG3qRYUcaEeeEih4JwepocNJkpsrqojqnZPc2y`.

```bash
yarn run:signer submit --account 121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2 --ws ws://127.0.0.1:9944 balances.transferKeepAlive 15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y 500000000000
```

Это вернёт полезную информацию для подписи и входные данные, ожидающие подписи. Возьмите эти данные и используйте свою обычную среду для подписи (например, компьютер в режиме Авиа, VM и т. д.). Подпишите данные:

```bash
yarn run:signer sign --account 121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2 --seed "pulp gaze fuel ... mercy inherit equal" --type sr25519 0x040300ff4a83f1...a8239139ff3ff7c3f6
```

Сохраните выходные данные и принесите их на машину, с которой Вы будете транслировать, введите их в поле подписи `submit` и отправьте транзакцию (или просто верните сериализованную транзакцию, если вы используете `sendOffline`).

## Tx Оболочка/Tx Wrapper

Если Вы не хотите использовать CLI для операций подписи, Parity предоставляет SDK с именем [TxWrapper](https://github.com/paritytech/txwrapper) для генерации и подписания транзакций в автономном режиме. Посмотреть на [примеры](https://github.com/paritytech/txwrapper/tree/master/examples) из руководства.

**Импорт приватного ключа**

```ts
import { importPrivateKey } from '@substrate/txwrapper';

const keypair = importPrivateKey(“pulp gaze fuel ... mercy inherit equal”);
```

**Вывод адреса из открытого ключа**

```ts
import { deriveAddress } from '@substrate/txwrapper';

// Открытый ключ может быть либо шестнадцатеричной строкой, либо Uint8Array
const publicKey = “0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235”;
const address = deriveAddress(publicKey);
```

**Построить транзакцию оффлайн**

```ts
import { methods } from "@substrate/txwrapper";

const unsigned = methods.balances.transferKeepAlive(
  {
    dest: "15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y",
    value: 500000000000,
  },
  {
    address: "121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2",
    blockHash: "0x1fc7493f3c1e9ac758a183839906475f8363aafb1b1d3e910fe16fab4ae1b582",
    blockNumber: 4302222,
    genesisHash: "0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636",
    metadataRpc, // необходимо импортировать из клиентского RPC вызов state_getMetadata
    nonce: 2,
    specVersion: 1019,
    tip: 0,
    eraPeriod: 64, // количество блоков от контрольной точки, в которой транзакция является действительной
    transactionVersion: 1,
  },
  {
    metadataRpc,
    registry, // Type registry
  }
);
```

**Создать полезную информацию для подписи**

```ts
import { methods, createSigningPayload } from '@substrate/txwrapper';

// See "Construct a transaction offline" for "{...}"
const unsigned = methods.balances.transferKeepAlive({...}, {...}, {...});
const signingPayload = createSigningPayload(unsigned, { registry });
```

**Сериализовать подписанную транзакцию**

```ts
import { createSignedTx } from "@substrate/txwrapper";

// Пример кода, замените `signWithAlice` на актуального удаленного подписанта.
// Пример приведен здесь:
// https://github.com/paritytech/txwrapper/blob/630c38d/examples/index.ts#L50-L68
const signature = await signWithAlice(signingPayload);
const signedTx = createSignedTx(unsigned, signature, { metadataRpc, registry });
```

**Декодировать типы полезной информации**

Вы можете декодировать полезную информацию для проверки её содержания до отправки.

```ts
import { decode } from "@substrate/txwrapper";

// Декодируем неподписанную tx
const txInfo = decode(unsigned, { metadataRpc, registry });

// Декодируем полезную информацию
const txInfo = decode(signingPayload, { metadataRpc, registry });

// Декодируем подписанную tx
const txInfo = decode(signedTx, { metadataRpc, registry });
```

**Проверьте хэш транзакции**

```ts
import { getTxHash } from ‘@substrate/txwrapper’;
const txHash = getTxHash(signedTx);
```

## Отправка подписанной полезной информации

Есть несколько способов отправить подписанную полезную информацию:

1. Signer CLI (`yarn run:signer submit --tx <signed-transaction> --ws <endpoint>`)
1. [Substrate API Sidecar](build-node-interaction#substrate-api-sidecar)
1. [RPC](build-node-interaction#polkadot-rpc) с `author_submitExtrinsic` или `author_submitAndWatchExtrinsic`, последняя из которых подписывается на события, которые будут уведомлять о том, когда транзакция будет проверена и включена в цепочку.

## Примечания

Некоторые адреса для использования в примерах. Смотрите [документацию по Subkey](https://substrate.dev/docs/en/knowledgebase/integrate/subkey).

```bash
$ subkey --network polkadot generate
Secret phrase `pulp gaze fuel ... mercy inherit equal` is account:
  Secret seed:      0x57450b3e09ba4598 ... ... ... ... ... ... ... .. 219756eeba80bb16
  Public key (hex): 0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235
  Account ID:       0x2ca17d26ca376087dc30ed52deb74bf0f64aca96fe78b05ec3e720a72adb1235
  SS58 Address:     121X5bEgTZcGQx5NZjwuTjqqKoiG8B2wEAvrUFjuw24ZGZf2

$ subkey --network polkadot generate
Secret phrase `exercise auction soft ... obey control easily` is account:
  Secret seed:      0x5f4bbb9fbb69261a ... ... ... ... ... ... ... .. 4691ed7d1130fbbd
  Public key (hex): 0xda04de6cd781c98acf0693dfb97c11011938ad22fcc476ed0089ac5aec3fe243
  Account ID:       0xda04de6cd781c98acf0693dfb97c11011938ad22fcc476ed0089ac5aec3fe243
  SS58 Address:     15vrtLsCQFG3qRYUcaEeeEih4JwepocNJHkpsrqojqnZPc2y
```
