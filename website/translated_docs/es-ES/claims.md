---
id: claims
title: Polkadot Claims
sidebar_label: Claims
---

Si hiciste una compra de DOTs en una de las ventas previas al lanzamiento, entonces tendrás que solicitar tus tokens DOTs. Para aquellos que hicieron la solicitud previa al lanzamiento enviando una transacción de solicitud al Contrato de Reclamación en Ethereum, aún tendrán que enviar una transacción gratuita de _prueba_ que acepte los términos y condiciones de su asignación. Si no ha hecho una reclamación previa al génesis, entonces la reclamará y certificará en una sola transacción.

Esta guía le ayudará en los pasos para hacer una reclamación o dar fe de la declaración.

Si es la primera vez que reclama en Polkadot, por favor, lea más abajo en la sección de [reclamaciones](#making-a-claim). Si ya ha reclamado durante el período de reclamación previo al Génesis, por favor proceda a la sección de [certificar una declaración](#attesting-to-a-statement) en su lugar.

## Hacer la reclamación

Si no hizo la solicitud en el período de reclamación previo a la génesis, entonces puede reclamar sus tokens DOTs después del génesis. No hay límite de tiempo para hacer su reclamación, así que siéntase libre de hacerlo cuando se sienta más cómodo.

> Nota: Cuando haga una reclamación, también dará fe del acuerdo que corresponde a su asignación DOT. Las dos acciones "reclamar" y "atestiguar" se realizan en una sola transacción, pero para la mayor parte de esto se simplifica desde la perspectiva del usuario.

### Lo que necesitarás

- La cuenta Ethereum que contiene los tokens del indicador DOT
- La cartera MyCrypto
- Una cuenta de Polkadot

Ya deberías tener tu cuenta en Ethereum que tiene los tokens del indicador DOT de Polkadot de la venta anterior. Necesitarás tener acceso a esta cuenta para poder firmar.

[MyCrypto][] es una cartera versátil que admite una variedad de métodos de almacenamiento para su cuenta de Ethereum. Vaya a su página de descargas y asegúrese de descargar la última versión para su sistema operativo. Esto es importante porque la última versión siempre tendrá los últimos parches de seguridad.

> **AVISO**: Es mucho más seguro descargar y usar la aplicación MyCrypto localmente. Siempre puedes encontrar las versiones más actualizadas de la aplicación de escritorio en su [página de versiones][mycrypto].

Necesitarás una cuenta Polkadot para reclamar tus DOTs. Por favor, sigue las instrucciones de la página \[generación de la cuenta\]\[\] para generar una nueva cuenta Polkadot.

#### Reclamando tus DOTs con MyCrypto

La aplicación [Polkadot JS Claims][] te ayuda a firmar un mensaje de MyCrypto. MyCrypto es una buena opción en caso de que hayas guardado la clave de la cuenta de Ethereum con tus tokens de DOT en un dispositivo de hardware como Ledger Nano S o Trezor. También soporta claves privadas en bruto, mnemotécnicos y Parity Signer.

Una vez que hayas descargado MyCrypto y lo tengas funcionando localmente (recomendamos un ordenador air-gapped para máxima seguridad), puedes empezar a navegar por la aplicación de Reclamaciones en Polkadot-JS Apps. Selecciona la cuenta en la que quieres reclamar los DOTs y haz clic en el botón azul "Continue" para continuar. Tu pantalla debería tener un aspecto parecido a este:

![claim-1](assets/new-claims/claim-1.png)

Ahora tendrás que proporcionar la dirección de Ethereum que está asociada con los tokens DOTs que reclamarás. Introduce la dirección de Ethereum en la casilla y haz clic en "Continue".

![claim-2](assets/new-claims/claim-2.png)

A continuación, tu pantalla debe mostrar la imagen de abajo.

![claim-2-1](assets/new-claims/claim-2-1.png)

La cadena codificada hexadecimal que sigue a la frase: "Pay DOTs to the Polkadot account:" es la clave pública con código hexadecimal de tu cuenta Polkadot, menos el prefijo `0x`.

El siguiente paso es ir a la aplicación MyCrypto y hacer clic en la pestaña "Sign & Verify Message".

![claim-3](assets/new-claims/claim-3.png)

Esto te pedirá que selecciones un método para desbloquear tu cartera.

![claim-4](assets/new-claims/claim-4.png)

Después de desbloquear tu cartera, pega el mensaje de Polkadot JS en el apartado "Message".

![claim-5](assets/new-claims/claim-5.png)

Cuando hagas clic en "Sign Message" obtendrás una salida JSON como la de abajo:

![claim-6](assets/new-claims/claim-6.png)

Copia y pega la salida JSON del mensaje firmado de MyCrypto en el recuadro de entrada de la interfaz Polkadot JS y haz clic en "Confirm Claim."

![claim-7](assets/new-claims/claim-7.png) ![claim-8](assets/new-claims/claim-8.png)

Aparecerá un cuadro verde que te indicará la cantidad a reclamar con un botón "Claim" para hacer la solicitud. Haz clic en el botón "Claim" y luego en "Submit (no signature)" para completar la solicitud.

![claim-9](assets/new-claims/claim-9.png)

Si esta reclamación tuvo éxito, entonces verá un mensaje de éxito y sus DOTs estarán en la cuenta que usted declaró.

#### Verificando tu reclamación

Después de hacer una solicitud en cadena para sus DOTs, su saldo debe ser actualizado en la UI de Polkadot inmediatamente.

¿Tienes problemas? Consigue ayuda en el [canal de soporte de reclamaciones]() de DOT.

![claim-10](assets/new-claims/claim-10.png)

Enhorabuena, ya has completado el proceso para reclamar y registrar tus DOTs.

### Procesos de reclamaciones de terceros

#### Coinbase Custody

> Tenga en cuenta que el uso de Coinbase Custody para el proceso de reclamaciones requiere que su cuenta disponga de al menos1.000 DOTs. También hay honorarios asociados a Coinbase Custody.

1. Para abrir una cuenta, por favor contacte con Coinbase Custody directamente en sales@coinbase.com
1. Una vez que haya abierto una cuenta, Coinbase Custody generará una dirección DOT para que la use en el proceso de reclamaciones y se lo enviará.
1. Pueden reclamar sus tokens usando la dirección de Coinbase Custody y sus tokens aparecerán en su cuenta de Coinbase Custody.

Para preguntas sobre cómo reclamar con Coinbase Custody, por favor contacta a sales@coinbase.com.

#### Otros procesos de terceros

**No recomendamos el uso de aplicaciones o procesos de terceros para realizar su reclamación o adquirir DOT.**

Reclamar usando otros procesos de terceros puede llevar a la pérdida de su asignación; por lo tanto, no podemos recomendar el uso de aplicaciones de terceros para hacerlo. Especificar manualmente sus datos de transacción, como se especifica en nuestro proceso de reclamaciones o utilizando Coinbase Custody, es la única manera de estar seguro de que usted recibirá su asignación.

## Acreditar una declaración

Si ya ha hecho una reclamación previa al génesis, todavía tiene que aceptar una declaración usando su Cuenta Polkadot.

### Lo que necesitarás

- Tu cuenta de Polkadot desbloqueada en la IU de Polkadot-JS Apps.

Enviará una transacción gratuita desde su cuenta Polkadot en la Interfaz de Aplicaciones Polkadot-JS. Una vez que hagas esta transacción tendrás los tokens disponibles en tu cuenta.

### Vaya a Polkadot-JS Apps

Continúe en las aplicaciones de [Polkadot-JS][claims app]. Tendrás que conceder a Apps acceso a tu cuenta de alguna manera. Una forma sería ir a la página de Cuentas y "crear" una nueva cuenta, reemplazando la semilla o mnemotécnica generada que pertenece a tu cuenta. La otra forma es utilizando la extensión Polkadot-JS e introduciendo tu semilla o mnemotécnica allí, lo que generalmente es más seguro que introducirla directamente en la página de Apps.

### Haga la declaración

Después de entrar en su cuenta, debería ver aparecer un cartel rojo en la pestaña "Claim Tokens" en el cajón de navegación izquierdo.

![claim-attest-1](assets/new-claims/new-attest-1.png)

Haga clic en la pestaña "Claim Tokens" y verá una notificación grande en la parte superior de la página que le dice que tiene que firmar la declaración.

![claim-attest-2](assets/new-claims/new-attest-2.png)

La notificación mostrará una o más direcciones Polkadot que haya cargado en Polkadot-JS y que necesite firmar. Selecciona una cuenta Polkadot con una solicitud usando la selección desplegable. Si no ves una notificación o no ves el selector, comprueba que la cuenta se ha cargado en Polkadot-JS y que ya ha sido reclamada durante el período de pre-reclamación. Como siempre, siéntase libre de pedir ayuda en el [canal de Soporte de Reclamaciones]().

Haga clic en "Continue" y verá que aparece un cuadro verde a la derecha.

![claim-attest-3](assets/new-claims/new-attest-3.png)

![claim-attest-4](assets/new-claims/new-attest-4.png)

Haga clic en "I Agree" y luego en "Sign and Submit" para realizar su transacción de confirmación gratuita. Cuando la transacción esté incluida en el bloque, verá aparecer un cuadro verde de éxito en la esquina superior derecha y los DOT estarán en su cuenta.

![claim-attest-5](assets/new-claims/new-attest-5.png)
  https://riot.im/app/#/room/!kwIkVteRpPRjjTyvTe:web3.foundation?via=web3.foundation&via=matrix.org&via=matrix.parity.io

[MyCrypto]: https://download.mycrypto.com/

[mycrypto]: https://download.mycrypto.com/
[Polkadot JS Claims]: https://polkadot.js.org/apps/#/claims
[claims app]: https://polkadot.js.org/apps/#/claims
