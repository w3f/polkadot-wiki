---
id: construcción-smart-contracts
title: Smart Contracts
sidebar_label: Smart Contracts
---

La Chain Relay de relé Polkadot no Smart Contracts de forma nativa. Sin embargo, los parachains en Polkadot soportarán Smart Contracts. Ya hay proyectos anunciados como [Edgeware](https://edgewa.re), y gracias al Substrate incorporado [contract pallet](https://crates.parity.io/pallet_contracts/index.html), es probable que más parachains soporten esta característica.

## Recursos

Aquí está la lista de los recursos actuales disponibles para desarrolladores que quieren comenzar a escribir contratos inteligentes para desplegar en parachains basados en Substrate.

- [ink!](https://github.com/paritytech/ink) - Ink de Paridad para escribir Smart Contracts.
- [Taller de Contratos de Substrate](https://substrate.dev/substrate-contracts-workshop/#/) - Te conduce a través de los conceptos básicos para escribir e implementar un token ERC20 usando `ink!`.
- [Using Smart Contracts on Polkadot and Kusama](https://www.youtube.com/watch?v=fKHkFBXaUxQ&list=PLOyWqupZ-WGuAuS00rK-pebTMAOxW41W8&index=6)

## Ejemplos

A continuación se recolectan algunos ejemplos comunitarios de Smart Contracts en `tink!`. ¿Estás trabajando en un ejemplo de Smart Contracts? ¡Pídanos que lo añada a esta página!

- [Ownable](https://github.com/JesseAbram/foRust/) - Port of the OpenZeppelin `Ownable` contract.

## ¿Cuál es la diferencia entre desarrollar un Smart Contracts y un parachain?

### Capa de abstracción

Cuando escribes un Smart Contracts estás creando las instrucciones que serán desplegadas y asociadas a una dirección de cadena específica.

En comparación, un módulo de tiempo de ejecución es la lógica completa de las transiciones de estado de una cadena (lo que se llama un función de transición de estado).

Los Smart contracts deben implementar conscientemente la actualización, mientras que los parachains tendrán la capacidad de intercambiar su código completamente a través de un comando raíz o a través de la paleta de gobernanza.

Cuando construyes un Smart contracts, eventualmente será desplegado en una cadena de destino con su propio entorno. Parachains permite al desarrollador declarar el entorno de su propia cadena, incluso permitiendo a otros escribir Smart contracts para ella.

### Gastos de Gas

Los Smart contracts deben encontrar una manera de limitar su propia ejecución, de lo contrario, los nodos completos son vulnerables a los ataques de DOS. Un bucle infinito en un Smart contract, por ejemplo, podría consumir el cálculo recursos de una cadena completa, evitando que otros la usen.El [problema del halting](https://en.wikipedia.org/wiki/Halting_problem) muestra eso con un lenguaje suficientemente potente, Es imposible saber con antelación si un programa dejará de ejecutarse o no. Algunas plataformas, como Bitcoin, superan esta restricción al proporcionar un lenguaje de script muy restringido. Otros, como Ethereum, "cobran" el "gas" del Smart contract por los derechos de ejecución de su código. Si un Smart contract llega a un estado donde la ejecución nunca se detendrá, finalmente se queda sin gas, cesa la ejecución y cualquier transición de estado que hubiera sido hecha por el Smart contract se revierte.

Parachains puede implementar lenguajes de programación poderosamente arbitrarios y tampoco contener ninguna noción de gas para su propia lógica nativa. Esto significa que alguna funcionalidad es más fácil de implementar para el desarrollador, pero también significa que hay algunas construcciones, como un bucle sin una condición finalizadora, la cual _nunca_ debería ser implementada. Dejando cierta lógica, como bucles complejos que podría correr indefinidamente, a una capa de contrato no inteligente, o incluso tratando de eliminarlo por completo, a menudo podria ser una elección más inteligente.

## Recursos

- [¿Cuándo debo construir un runtime de Substrate versus un Smart contract de Substrate](https://stackoverflow.com/a/56041305) - Desde un punto de vista técnico respondo a la pregunta de cuándo un desarrollador puede elegir desarrollar un runtime versus un Smart contract.
