---
id: glosario
title: Términos y condiciones
sidebar_label: Términos y Condiciones
---

## Bloque

Una recopilación de datos, como las transacciones, que juntos indican una transición de estado de la blockchain.

## Block explorer 

Una aplicación que permite al usuario visualizar los diferentes bloques de una blockchain.

## BLS

Las firmas Boneh-Lynn-Shacham (BLS) tienen una firma lenta, una verificación muy lenta, requieren curvas amistosas de emparejamiento lentas y mucho menos seguras, y tienden hacia una maleabilidad peligrosa. Sin embargo, el BLS permite una amplia gama de opciones de agregar firmas mucho más allá que cualquier otro esquema de firmas conocido, lo que hace de BLS un esquema ideal para votar en algoritmos de consenso y para firmas de umbrales.

## Bonding

Un proceso por el cual los tokens pueden ser "congelados" a cambio de unir una Parachain a la relay chain. Este proceso asegura que sólo las cadenas que son válidas y en funcionamiento serán conectadas a la relay chain, ya que sería conveniente que los titulares de los DOTs dejaran de vincular sus tokens.

## Bridge

Un nodo que actúa como intermediario entre la relay chain de Polkadot y una cadena externa, de tal manera que a la relay chain le parecerá que la cadena externa es una parachain (es decir, que cumple con los requisitos del entorno de tiempo de ejecución de Polkadot). Los bridges permiten la interacción entre otras blockchains como Ethereum y Bitcoin que no son compatibles de forma nativa con Polkadot.

## Byzantine Fault Tolerance

La propiedad de un sistema que es tolerante a los fallos Bizantinos; es decir, un sistema en el que no sólo pueden fallar subsistemas individuales, sino que puede no estar claro si un subsistema en particular ha fallado o no. Es decir, diferentes participantes en el sistema pueden no estar de acuerdo en si el sistema ha fallado o no. Asegurar la tolerancia Bizantina a los errores es una parte importante del desarrollo de cualquier sistema distribuido.

## Collator

Un nodo que mantiene una Parachain recopilando transacciones de la Parachain y produciendo pruebas de transición de estado para los validadores.

## Consensus

El proceso de un grupo de entidades para acordar un valor de datos particular (como el pedido y composición de bloques en una blockchain). Hay una variedad de algoritmos utilizados para determinar el consenso. El algoritmo de consenso utilizado por Polkadot es GRANDPA.

## DOTs

El token nativo de Polkadot. Los DOTs sirven para tres propósitos: gobierno de la red (permitiéndoles votar sobre las mejoras de la red y otros eventos excepcionales), operaciones generales (recompensando a los buenos actores y castigando a los malos), y la vinculación (añadiendo nuevas Parachains mediante la "congelación" de los DOTs mientras están conectados a la relay chain).

## Dapps

Un término genérico para una aplicación descentralizada, es decir, que se ejecuta como parte de una red distribuida en lugar de ejecutarse en un sistema o conjunto de sistemas específicos.

## Extrinsic

De forma genérica, alguna función declarada por el programador, es decir, una que no está incorporada al lenguaje o al framework. Específicamente para Polkadot, esto se refiere a un código binario que representa alguna transición de estado (como una transacción) y se utiliza para que las Parachains se comuniquen a través de la relay chain.

## Finality

La propiedad de un bloque que no puede ser revertido. Generalmente, los bloques creados no son definitivos hasta algún punto en el futuro - quizás nunca, en el caso de la "finalidad probabilística" como en Bitcoin (aunque los bloques de Bitcoin se consideran generalmente "definitivos" después de seis confirmaciones debido a la improbabilidad de revertir en ese punto). En la relay chain de Polkadot, el objetivo es que los bloques se finalicen entre 10 y 12 segundos después de su creación.

## Finality Gadget

Un mecanismo que determina la finalidad.

## Fisherman

Nodos que monitorean la red en busca de validadores o collators que se estén comportando mal. Los Fishermen deben depositar una pequeña cantidad de DOTs pero pueden ser recompensados enormemente si encuentran un mal comportamiento.

## Algoritmo de consenso GRANDPA

GHOST-based Recursive Ancestor Deriving Prefix Agreement. Es el gadget final para Polkadot, que permite una finalización asincrónica, responsable y segura para la blockchain. Para una perspectiva general de GRANDPA, vea este post de Medium: <https://medium.com/polkadot-network/polkadot-proof-of-concept-3-a-better-consensus-algorithm-e81c380a2372>

## Governance

El proceso de determinar qué cambios en la red son aceptables, por ejemplo, modificaciones en el código o en la gestión de fondos. El sistema de gobernanza de Polkadot es on-chain y gira en torno a la votación de las partes implicadas, es decir, la mayoría de las participaciones (DOTs) determina la dirección de la red.

## Governance Council

Una entidad on-chain que consiste en varias cuentas on-chain (comenzando en 6 y eventualmente terminando con el valor final de 24) que puede actuar como representante de las partes implicadas "pasivas" (sin voto). Los miembros del Consejo tienen dos tareas principales: proponer referéndums para que el grupo de partes interesadas en general vote y cancelar los referéndums maliciosos.

## LIBP2P

Una librería de open-source para comunicaciones peer-to-peer encriptadas y otras funcionalidades de red. Más información en: <https://libp2p.io/>

## Liveness

La propiedad de un sistema distribuido que eventualmente llegará a algún acuerdo de consenso. Un sistema atascado en un bucle infinito no se consideraría vivo, incluso si se están realizando cálculos; un sistema que finalmente proporciona un resultado, incluso si es incorrecto o tarda mucho tiempo, se considera que tiene vida.

## Node explorer

Una herramienta que proporciona información sobre un nodo, como los últimos bloques firmados, finalizados y el estado actual de la cadena tal y como lo conoce ese nodo.

## Nominated Proof of Stake (NPoS)

Un sistema de prueba de participación en el que los nominadores "ceden" su participación a los validadores, como muestra de fe en el buen comportamiento del validador. La prueba de participación nominada difiere de la prueba de participación delegada en que los nominadores están sujetos a la pérdida de participación si nominan a un validador malo; los delegadores no están sujetos a la pérdida de participación basada en el comportamiento del validador.

## Nominator

Nodos que seleccionan un set de validadores. Para ello se debe vincular una cierta cantidad de DOTs, que pueden perderse si el validador se comporta mal. Esto obliga a los nominadores a seleccionar cuidadosamente a los validadores.

## On-chain governance

Gobierno de una blockchain cuyo control se realiza mediante mecanismos gestionados por la blockchain. La gobernanza on-chain permite que las decisiones se tomen de manera transparente. Tenga en cuenta que hay una variedad de algoritmos diferentes para tomar estas decisiones, como la votación por mayoría simple o la votación cuadrática basada en la identidad.

## Parachain

Una blockchain que reúne varias características que le permiten trabajar dentro de los límites del Runtime Environment de Polkadot. También conocida como "parallelized chain".

## Parachain Registry

Una construcción relativamente simple, similar a una base de datos, que contiene información estática y dinámica sobre cada cadena.

## Parity Technologies

Una empresa, fundada por el Dr. Gavin Wood, que está desarrollando Substrate. También ha publicado otros proyectos, entre ellos Parity en Ethereum y Parity Wasm.

## Polkadot

Una tecnología heterogénea multi-cadena que permite que varias blockchains de diferentes características realicen la comunicación entre ellas.

## Polkadot Runtime Environment

El entorno de tiempo de ejecución en el que se puede ejecutar un módulo de tiempo de ejecución. Parachains deben ser compatibles con el Polkadot Runtime Environment - cadenas externas que no tendrán que usar un bridge.

## Proof of Stake (PoS)

Un método para lograr consenso en el cual el siguiente bloque es determinado por un nodo que es elegido por alguna característica (por ejemplo, la cantidad de tokens que se vinculan).

## Proof of Work

Un método para lograr consenso en el que el siguiente bloque es determinado por el primero para resolver un rompecabezas difícil (por ejemplo, en Bitcoin, resolver un pre-image hash para un candidato a bloque).

## Proposal

Un posible llamamiento a la votación en un referéndum. Los proposals modifican el comportamiento de la red de Polkadot, desde el ajuste de parámetros menores hasta la sustitución del código del runtime.

## Referendum

Una votación sobre si una propuesta debe ser aceptada o no por la red. Estos referéndums pueden ser iniciados por el Consejo de Gobierno, por un miembro del público o como resultado de una propuesta previa. Las partes interesadas votan en los referéndums, ponderados tanto por el tamaño de su depósito (es decir, el número de DOTs celebrados) como por la cantidad de tiempo que están dispuestos a bloquear sus tokens.

## Relay chain

La cadena que coordina el consenso y la comunicación entre las Parachains (y las cadenas externas, a través de bridges).

## Runtime

Una función de transición de estado que indica un algoritmo válido para determinar el estado del bloque siguiente dado el bloque anterior.

## Runtime Module

Código de wasm que codifica una función de transición de estado.

## Safety

La propiedad de un sistema distribuido que indica que el sistema cumplirá correctamente con todas las invariantes; es decir, que nada "malo" le suceda a los datos (como por ejemplo, que estén corruptos).

## Sealing

El proceso de añadir un bloque a la relay chain. Tenga en cuenta que la finalización es un proceso separado - los bloques se finalizan algún tiempo después de que se hayan cerrado (el objetivo es aproximadamente de 10 a 12 segundos).

## Session certificate

Otro nombre para la "llave" de sesión que es una llave BLS para GRANDPA, una llave sr25519 para BABE, y eventualmente una llave Ed25519 para libp2p.

## Session key

Una "llave" para la sesión es una llave BLS para GRANDPA, una llave sr25519 para BABE, y eventualmente una llave Ed25519 para libp2p.

## Staking

"Reservar" tokens (para Polkadot, DOTs) que se presentan como "fianza" para la posibilidad de producir un bloque válido (y así obtener una recompensa por el bloque). Los validadores y nominadores (que respaldan a los validadores a través de NPoS) ponen en juego sus DOTs para añadir bloques a la relay chain.

## State transition function

Una función que describe cómo se puede transformar el estado de una blockchain. Por ejemplo, puede describir cómo se pueden transferir tokens de una cuenta a otra.

## Substrate

Una implementación del runtime de Polkadot que permite a los desarrolladores generar Parachains compatibles con la relay chain de Polkadot.

## Transaction

Un componente individual de la función de transición de estado de un bloque, como mover tokens de una cuenta a otra.

## Validator

Un nodo que asegura la relay chain mediante la vinculación de DOTs, validando las pruebas de los collators en las Parachains, y determinando un consenso con otros validadores.

## Voting

El proceso de los accionistas para determinar si debe aprobarse o no un referéndum para implementar una propuesta específica. Los votos se basan tanto por el número de DOTs que controla la cuenta de las partes interesadas como por la cantidad de tiempo que están dispuestas a vincular sus DOTs. La votación puede ser anulada por el Consejo de Gobernanza si existe un acuerdo unánime de que no es así.

## Wallet

Un programa que permite almacenar, recibir y transmitir DOTs u otros tokens basados en bloques.

## Web3 Foundation

Una fundación con sede en Suiza que fomenta y administra tecnologías y aplicaciones en los campos de los protocolos de software web descentralizados, en particular aquellos que utilizan métodos criptográficos modernos para garantizar la descentralización, en beneficio y para la estabilidad del ecosistema de Web3.

## WebAssembly

Un formato de instrucción para una máquina virtual basada en stacks. Los módulos runtime de Polkadot se compilan en WebAssembly. También conocido como Wasm.

## Wasm

Un formato de instrucción para una máquina virtual basada en stacks. Los módulos de runtime de Polkadot están compilados en Wasm.

## Witness

Pruebas criptográficas de la validez del dato.