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

**We do not recommend using third-party apps or processes to perform your claim or acquire DOT.**

Claiming using a third-party process can lead to the loss of your allocation, therefore we cannot recommend using any third party apps to do so. Manually specifying your transaction data, as specified in our claims process, is the only way to be certain you will receive your allocation.

## Acreditar una declaración

If you've already made a pre-genesis claim, you still have to agree to a statement using your Polkadot account.

## Using Polkadot-JS Apps

### Lo que necesitarás

- Tu cuenta de Polkadot desbloqueada en la IU de Polkadot-JS Apps.

You will be sending a free transaction from your Polkadot account on the Polkadot-JS Apps UI. Once you make this transaction you will have the tokens available in your account.

### Vaya a Polkadot-JS Apps

Proceed to [polkadot-js Apps][claims app]. You will need to grant Apps access to your account in some way. One way would be to go to the Accounts page and "create" a new account, replacing the generated seed or mnemonic with the one belonging to your account. The other way is by using the Polkadot-JS extension and entering your seed or mnemonic there, which is generally safer than entering it directly to the Apps page.

### Haga la declaración

After entering your account, you should see a red counter appear on the "Claim Tokens" tab on the left navigation drawer.

![claim-attest-1](assets/new-claims/new-attest-1.png)

Click on the "Claim Tokens" tab and you will see a large notification at the top of the page that tells you that you need to sign an attestation.

![claim-attest-2](assets/new-claims/new-attest-2.png)

The notification will display one or more Polkadot addresses that you have loaded in Polkadot-JS that you need to sign. Select a Polkadot account with a claim using the drop down selection. If you don't see a notification or don't see the selector, please double check that the account has been loaded into Polkadot-JS and that it has already claimed during the preclaim period. As always, feel free to reach out for help in the [Claims Support]() channel.

Click "Continue" and you will see a green box appear on the right.

![claim-attest-3](assets/new-claims/new-attest-3.png)

![claim-attest-4](assets/new-claims/new-attest-4.png)

Click on "I Agree" and then "Sign and Submit" to make your free attest transaction. When the transaction is included in the block, you will see a green success box appear in the upper right corner and the DOTs will be in your account.

![claim-attest-5](assets/new-claims/new-attest-5.png)

## Using Parity Signer

### What you will need

- Parity Signer
- Your Polkadot account linked to Polkadot-JS Apps UI

Before claiming, you should import your Polkadot address on Parity Signer to the PolkadotJS apps. All operations will use Parity Signer to sign the transaction, but will broadcast it via the PolkadotJS apps remote node. If you do not have a Polkadot address, please follow the instructions on the Parity Signer section in the [account generation][] page for generating a new Polkadot account.

### Go to Polkadot-JS Apps

Proceed to [polkadot-js Apps][claims app]. You will need to import your address on Parity Signer to the Accounts page first.

### Make the Attestation

![ps-claim-1](assets/new-claims/ps-claim-1.png)

Click "Add via Qr" on the right side.

![ps-claim-2](assets/new-claims/ps-claim-2.png)

Open Parity Signer and choose "Polkadot" network.

![ps-1](assets/new-claims/ps-01.jpg)

Select the address that you have claimed DOTs to during pre-genesis.

![ps-2](assets/new-claims/ps-02.jpg)

![ps-3](assets/new-claims/ps-03.jpg)

Your address will be displayed in QR code format. You can move the QR code to the camera so that the PolkadotJS Apps can decode it.

![ps-claim-3](assets/new-claims/ps-claim-3.png)

Once decoded successfully, input the name for your address and click "Create".

![ps-claim-4](assets/new-claims/ps-claim-4.png)

You will notice that the digit beside the "Claim Tokens" menu changed to 2. It means the number of addresses on the Accounts page that need to do attestations.

Go to the [Claim Tokens](https://polkadot.js.org/apps/#/claims) page and and you will see a large notification at the top of the page that tells you that you need to sign an attestation.

Select the Polkadot account that you just have imported with a claim using the drop-down selection. If you don't see a notification or don't see the selector, please double check that the account has been loaded into Polkadot-JS and that it has already claimed during the pre-genesis period. As always, feel free to reach out for help in the [Claims Support]() channel.

![ps-claim-5](assets/new-claims/ps-claim-5.png)

Then click "Continue" and you will see a green box appear on the right.

![ps-claim-6](assets/new-claims/ps-claim-6.png)

Click on "I Agree" and then "Sign via Qr".

![ps-claim-7](assets/new-claims/ps-claim-7.png)

Now you need to sign the transaction using the Parity Signer with your Polkadot address.

![ps-claim-8](assets/new-claims/ps-claim-8.png)

First, you need to press the "QR Scanner" on the Parity Signer to scan the QR code that's shown on the authorize transaction window to generate the raw transaction. Next, you may be required to input the PIN on the Parity Signer to generate the signed transaction as a QR code. Then move the QR code to the camera on the PolkadotJS Apps to continue.

![ps-3r](assets/new-claims/ps-3r.jpg)

When the transaction is included in the block, you will see a green success box appear in the upper right corner and the DOTs will be in your account.
  https://riot.im/app/#/room/!kwIkVteRpPRjjTyvTe:web3.foundation?via=web3.foundation&via=matrix.org&via=matrix.parity.io

[MyCrypto]: https://download.mycrypto.com/

[mycrypto]: https://download.mycrypto.com/
[account generation]: learn-account-generation
[Polkadot JS Claims]: https://polkadot.js.org/apps/#/claims
[claims app]: https://polkadot.js.org/apps/#/claims
