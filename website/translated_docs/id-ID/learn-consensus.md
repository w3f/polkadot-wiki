---
id: learn-consensus
title: Konsensus Polkadot
sidebar_label: Konsensus Polkadot
description: Penjelasan tentang model konsensus yang digunakan di Polkadot dan Kusama
---

## Mengapa kita membutuhkan konsensus?

Konsensus adalah metode untuk mencapai kesepakatan atas negara bersama. Agar keadaan blockchain terus membangun dan bergerak maju, semua node dalam jaringan harus setuju dan mencapai konsensus. Ini adalah cara agar node dalam jaringan terdesentralisasi dapat tetap disinkronkan satu sama lain. Tanpa konsensus untuk jaringan node yang terdesentralisasi di blockchain, tidak ada cara untuk memastikan bahwa keadaan yang diyakini oleh satu simpul benar akan dibagikan oleh simpul lain. Konsensus bertujuan untuk memberikan pandangan _ objektif _ dari negara di tengah peserta yang masing-masing memiliki pandangan _ subyektif _ dari jaringan. Ini adalah proses di mana simpul-simpul ini berkomunikasi dan mencapai kesepakatan, dan mampu membangun blok baru.

## Apa itu PoW dan PoS?

Proof of Work (PoW) dan Proof of Stake (PoS) telah digunakan sebagai referensi untuk merujuk pada mekanisme konsensus dari blockchain, tetapi itu tidak menangkap gambaran penuh. PoW adalah metode untuk menyetujui penulis blok dan bagian dari [ konsensus Nakamoto ](#nakamoto-consensus) yang lebih lengkap yang juga mencakup algoritma pemilihan rantai (aturan rantai terpanjang dalam Bitcoin). Demikian pula, PoS adalah seperangkat aturan untuk memilih set validator dan tidak menentukan aturan pemilihan rantai atau bagaimana rantai dapat mencapai finalitas. Algoritma PoS secara tradisional telah dipasangkan dengan algoritma untuk mencapai kesepakatan Bizantium antar node. Misalnya, [ Tendermint ](learn-comparisons-cosmos) adalah algoritme toleran kesalahan Bizantium praktis yang menggunakan PoS sebagai metode pemilihan kumpulan validatornya.

## Kenapa tidak Bukti Kerja?

Walaupun sederhana dan efektif untuk mencapai konsensus yang terdesentralisasi, bukti konsensus kerja menghabiskan banyak energi, tidak memiliki finalitas ekonomis atau dapat dibuktikan, dan tidak memiliki strategi yang efektif dalam melawan kartel.

## Probabilitas vs finalitas yang dapat dibuktikan

Blockchain murni konsensus Nakamoto yang menjalankan PoW hanya mampu mencapai gagasan _ finalitas probabilistik _ dan mencapai _ akhirnya konsensus _. Finalitas probabilistik berarti bahwa berdasarkan beberapa asumsi tentang jaringan dan peserta, jika kita melihat beberapa blok bangunan di blok tertentu, kita dapat memperkirakan probabilitas bahwa itu final. Konsensus akhirnya berarti bahwa di beberapa titik di masa depan, semua node akan setuju pada kebenaran satu set data. Konsensus akhir ini mungkin membutuhkan waktu yang lama dan tidak akan dapat ditentukan berapa lama waktu yang dibutuhkan. Namun, gadget finalitas seperti GRANDPA atau Ethereum's Casper FFG dirancang untuk memberikan jaminan yang lebih kuat dan lebih cepat pada finalitas blok - khususnya, bahwa mereka tidak akan pernah dapat dikembalikan setelah beberapa proses perjanjian Bizantium terjadi. Gagasan konsensus ireversibel dikenal sebagai _ finalitas yang dapat dibuktikan. _

Dalam makalah GRANDPA, ini diungkapkan dengan cara ini:

> Kami mengatakan oracle A dalam protokol adalah _ akhirnya konsisten _ jika itu mengembalikan nilai yang sama untuk semua peserta setelah beberapa waktu yang tidak ditentukan.

## Apa itu GRANDPA/BABE?

### Konsensus Hibrid

Ada dua akronim yang kita gunakan ketika kita berbicara tentang protokol konsensus Polkadot, GRANDPA dan BABE. Kami berbicara tentang kedua akronim ini karena Polkadot menggunakan apa yang dikenal sebagai _ konsensus hibrida _. Konsensus hibrid memisahkan gadget finalitas dari mekanisme produksi blok.

Ini adalah cara untuk mendapatkan manfaat dari finalitas probabilistik (kemampuan untuk selalu menghasilkan blok baru) dan finalitas yang dapat dibuktikan (memiliki kesepakatan universal tentang rantai kanonik tanpa ada peluang untuk pengembalian) di Polkadot. Ini juga menghindari kelemahan terkait masing-masing mekanisme (kesempatan tanpa sadar mengikuti garpu yang salah dalam finalitas probabilistik, dan kesempatan untuk "mengulur-ulur" - tidak mampu menghasilkan blok baru - dalam finalitas yang dapat dibuktikan). Dengan menggabungkan kedua mekanisme ini, Polkadot memungkinkan blok diproduksi secara cepat, dan mekanisme finalitas yang lebih lambat berjalan dalam proses terpisah untuk menyelesaikan blok tanpa risiko pemrosesan transaksi yang lambat atau terhenti.

Konsensus hibrida telah diusulkan di masa lalu. Khususnya, itu diusulkan (sekarang mati) sebagai langkah dalam transisi Ethereum ke bukti kepemilikan di [ EIP 1011 ](http://eips.ethereum.org/EIPS/eip-1011) yang ditentukan [ Casper FFG ](#casper-ffg).

### BABE

BABE (Blind Assignment untuk Blockchain Extension) adalah mekanisme produksi blok yang berjalan antara node validator dan menentukan penulis blok baru. BABE dapat dibandingkan sebagai algoritme dengan Ouroboros Praos, dengan beberapa perbedaan utama dalam aturan pemilihan rantai dan penyesuaian waktu slot. BABE memberikan slot produksi blok kepada validator sesuai taruhan dan menggunakan Polkadot [ siklus pengacakan ](learn-randomness).

Validator di Polkadot akan berpartisipasi dalam [ lotre ](learn-randomness) di setiap slot yang akan memberi tahu mereka apakah mereka adalah kandidat produsen blokir untuk slot itu. Slot adalah satuan waktu yang terpisah, panjang nominal 6 detik. Karena mekanisme keacakan ini, beberapa validator dapat menjadi kandidat untuk slot yang sama. Di waktu lain, sebuah slot bisa kosong, menghasilkan waktu blok yang tidak konsisten.

#### Multi Validator per Slot

Ketika beberapa validator adalah kandidat produsen blok dalam slot yang diberikan, semua akan menghasilkan blok dan menyiarkannya ke jaringan. Pada saat itu, ini sebuah perlombaan. Validator yang bloknya mencapai sebagian besar jaringan pertama kali menang. Bergantung pada topologi dan latensi jaringan, kedua rantai akan terus membangun dalam beberapa kapasitas, hingga finalisasi menendang dan mengamputasi garpu. Lihat Pilihan Fork di bawah ini untuk mengetahui cara kerjanya.

#### Tidak ada Validator di Slot

Ketika tidak ada validator yang terguling cukup rendah dalam lotre acak untuk memenuhi syarat untuk produksi blok, slot dapat tetap tampak tanpa blok. Kami menghindari ini dengan menjalankan algoritme pemilihan validator gaya putaran-robin sekunder di latar belakang. Validator yang dipilih untuk menghasilkan blok melalui algoritma ini selalu menghasilkan blok, tetapi blok ini _ sekunder _ diabaikan jika slot yang sama juga menghasilkan blok primer dari [ validator VRF-terpilih ](learn-randomness). Dengan demikian, sebuah slot dapat memiliki blok _ primary _ atau _ sekunder _, dan tidak ada slot yang pernah dilewati.

For more details on BABE, please see the [working research draft](https://research.web3.foundation/en/latest/polkadot/BABE/Babe.html).

### GRANDPA: Gadget finalitas

GRANDPA (Perjanjian Prefigurasi Derivatif Berurutan Rekursi berbasis GHOST) adalah gadget finalitas yang diterapkan untuk rantai relai Polkadot.

Ini bekerja dalam model jaringan yang sebagian sinkron selama 2/3 dari node jujur dan dapat mengatasi 1/5 node Bizantium dalam pengaturan asinkron.

Perbedaan utama adalah bahwa GRANDPA mencapai kesepakatan tentang rantai alih-alih blok, sangat mempercepat proses finalisasi, bahkan setelah pemartisian jaringan jangka panjang atau kegagalan jaringan lainnya.

Dengan kata lain, segera setelah lebih dari 2/3 validator membuktikan suatu rantai yang berisi blok tertentu, semua blok yang mengarah ke sana diselesaikan sekaligus.

#### Protokol

Silakan merujuk ke pos 3 di [ makalah ](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) untuk deskripsi lengkap protokol.

#### Implementasi

The [Rust implementation](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs) is part of Substrate Runtime Module Library.

For even more detail, see the [GRANDPA research page](https://research.web3.foundation/en/latest/polkadot/GRANDPA.html) on the W3F Research pages.

### Pilihan Fork

Menyatukan BABE dan GRANDPA, pilihan garpu Polkadot menjadi jelas. BABE harus selalu membangun di atas rantai yang telah diselesaikan oleh GRANDPA. Ketika ada garpu setelah kepala final, BABE memberikan finalitas probabilistik dengan membangun pada rantai dengan blok yang paling utama.

![Pilihan rantai terbaik](assets/best_chain.png)

Pada gambar di atas, blok hitam diselesaikan. Yang primer, dua adalah blok sekunder. Meskipun rantai teratas adalah rantai terpanjang pada blok terakhir yang diselesaikan, itu tidak memenuhi syarat karena memiliki lebih sedikit pemilihan pendahuluan pada saat evaluasi daripada yang di bawahnya.

## Perbandingan

### Konsensus Nakamoto

Konsensus Nakamoto terdiri dari aturan rantai terpanjang yang menggunakan bukti kerja sebagai mekanisme perlawanan dan pemilihan pemimpin.

Konsensus Nakamoto hanya memberi kita finalitas probabilistik. Finalitas probabilistik menyatakan bahwa blok di masa lalu hanya seaman jumlah konfirmasi yang dimilikinya, atau jumlah blok yang telah dibangun di atasnya. Karena lebih banyak blok dibangun di atas blok tertentu dalam rantai Bukti Kerja, lebih banyak pekerjaan komputasi telah dikeluarkan di balik rantai tertentu ini. Namun, itu tidak menjamin bahwa rantai yang mengandung blok akan selalu tetap rantai yang disepakati, karena pelaku dengan sumber daya tak terbatas berpotensi membangun rantai yang bersaing dan mengeluarkan sumber daya komputasi yang cukup untuk membuat rantai yang tidak mengandung blok tertentu. Dalam situasi seperti itu, aturan rantai terpanjang yang digunakan dalam Bitcoin dan bukti rantai kerja lainnya akan pindah ke rantai baru ini sebagai rantai kanonik.

### PBFT / Tendermint

Silakan lihat [ bagian yang relevan ](learn-comparisons-cosmos#consensus) di artikel perbandingan Cosmos.

<!-- ### HoneyBadgerBFT -->

### Casper FFG

Dua perbedaan utama antara GRANDPA dan Casper FFG (Friendly Finality Gadget) adalah:

 - di GRANDPA, pemilih yang berbeda dapat memberikan suara secara bersamaan untuk blok di ketinggian yang berbeda
 - GRANDPA hanya tergantung pada blok yang difinalisasi untuk mempengaruhi aturan pilihan garpu dari mekanisme produksi blok yang mendasarinya

### Casper CBC

_Segera akan hadir!_

<!-- ### Avalanche -->

## Sumber daya

- [ makalah GRANDPA ](https://github.com/w3f/consensus/blob/master/pdf/grandpa.pdf) - Deskripsi akademis gadget finalitas GRANDPA. Berisi bukti formal dari algoritma.
- [Rust implementation](https://github.com/paritytech/finality-grandpa) - The reference implementation and the accompanying [Substrate runtime module](https://github.com/paritytech/substrate/blob/master/srml/grandpa/src/lib.rs).

<!-- ## Consensus in Polkadot

### Block Production

### Finality Gadget

### NPoS -->

