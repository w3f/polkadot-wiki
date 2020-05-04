---
id: learn-bridges
title: Jembatan
sidebar_label: Jembatan
---

Salah satu ide sentral dalam komunikasi antar blockchain adalah peran jembatan. Beberapa detail pasti tentang bagaimana menjembatani akan berfungsi di Polkadot belum diputuskan; tolong pertimbangkan halaman ini sedang dalam proses. Ini akan diperbarui karena rincian lebih lanjut akan ditentukan.

Saat ini, ada tiga jenis jembatan di Polkadot:

* _ Kontrak jembatan _ - Kontrak pintar yang digunakan sebagai jembatan antara Polkadot dan rantai eksternal.
* _ Komunikasi lintas-parachain _ - Tidak perlu kontrak.
* _ Modul bridging internal _ - Menjembatani ke Polkadot dari rantai eksternal melalui modul yang dibuat khusus.

## Kontrak jembatan

Mereka yang sudah terbiasa dengan Ethereum mungkin tahu tentang [ Jembatan Paritas ](https://github.com/paritytech/parity-bridge) dan upaya yang dilakukan untuk menghubungkan sidechains PoA ke mainnet Ethereum. Jembatan adalah kombinasi dari dua kontrak pintar, satu dikerahkan di setiap rantai, yang memungkinkan untuk transfer nilai lintas-rantai. Sebagai contoh penggunaan, bukti awal konsep Parity Bridge menghubungkan dua rantai Ethereum, ` main ` dan ` side `. Eter yang dimasukkan ke dalam kontrak pada ` utama ` menghasilkan saldo dalam denominasi ERC-20 pada ` sisi `. Sebaliknya, token ERC-20 yang disetor kembali ke dalam kontrak di ` sisi ` dapat membebaskan Ether di ` main `.

Dalam kasus Polkadot, harus dimungkinkan untuk memiliki kontrak jembatan yang digunakan, katakanlah, rantai mandiri berbasis EVM dan kontrak yang digunakan pada parachain yang mampu melakukan kontrak pintar. Ini tidak harus menjadi metode yang paling efisien untuk menjembatani, tetapi mengingat sifat umum dari parachain lengkap Turing akan mungkin untuk menjembatani Polkadot dan blockchain lain yang mampu melakukan kontrak pintar.

## Komunikasi Lintas Parachain
Seperti yang disebutkan pada halaman [ parachains ](learn-parachains), parachains akan dapat saling mengirim pesan (termasuk transaksi) tanpa perlu kontrak pintar untuk melakukan fungsi bridging. Perpesanan lintas-parachain akan menjadi asli Polkadot.

## Modul Bridging yang dibangun

Menerima pesan pada parachain dari blockchain non-parachain kemungkinan akan dilakukan secara asli dalam modul perangkat lunak klien. Ini akan meniadakan kebutuhan untuk menjembatani kontrak dan memungkinkan non-parachain untuk bertindak sebagai "parachain virtual". Kolektor untuk blockchain tertentu kemudian dapat menyusun transaksi atau transisi negara lain, dan mengirimkannya ke rantai relay seolah-olah blockchain adalah parachain.

Modul bridging kemungkinan akan ditulis dengan parachains tertentu dalam pikiran (misalnya Bitcoin, Ethereum), yang berarti bahwa setiap blockchain yang didasarkan pada salah satu dari mereka harus dapat dijembatani langsung ke Polkadot tanpa perlu melalui kontrak jembatan pada sebuah parachain. Ini harus memungkinkan eksekusi yang lebih cepat untuk rantai yang kompatibel.

Untuk rantai mandiri yang tidak memiliki modul bridging built-in pada Polkadot, perlu untuk menggunakan kontrak jembatan (lihat di atas).

## Sumber daya

### Jembatan Kontrak Pintar

- [ Jembatan Edgeth ](https://github.com/hicommonwealth/edgeth_bridge/) - jembatan dari rantai Ethereum ke Edgeware (rantai berbasis substrat).
- [Jembatan Parity](https://github.com/paritytech/parity-bridge)
- [Jaringan POA](https://poa.network/)
- [ Studi kasus ](https://medium.com/giveth/ethereum-dapp-scaling-poa-network-acee8a51e772) implementasi POA Network terhadap solusi solusi jembatan jembatan Parity.

### Runtime Jembatan Modul

- [ Jembatan ChainX BTC ](https://github.com/chainx-org/ChainX/tree/develop/cxrml/bridge/btc) - ChainX telah menerapkan BTC ke Substrate bridge untuk parachain mereka.

### Desain

- [ XClaim ](https://eprint.iacr.org/2018/643.pdf) - desain XClaim untuk menjembatani rantai Bukti Kerja dengan cara yang tidak dapat dipercaya.
