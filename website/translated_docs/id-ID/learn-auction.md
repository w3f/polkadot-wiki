---
id: learn-auction
title: Slot lelang Parachain
sidebar_label: Slot lelang Parachain
---

Slot parachain Polkadot akan dijual sesuai dengan [ lelang lilin ](https://en.wikipedia.org/wiki/Candle_auction) yang telah sedikit dimodifikasi agar aman di blockchain.

## Mekanisme lelang lilin

Lelang lilin adalah varian lelang terbuka di mana penawar mengajukan tawaran yang semakin tinggi dan penawar tertinggi pada akhir lelang dianggap sebagai pemenang.

Lelang lilin awalnya digunakan pada abad ke-16 untuk penjualan kapal dan mendapatkan nama mereka dari "inci lilin" yang menentukan periode lelang terbuka. Ketika nyala api padam dan lilin padam, pelelangan akan tiba-tiba berakhir dan tawaran berdiri pada saat itu akan menang.

Ketika lelang Lilin digunakan secara online, mereka membutuhkan nomor acak untuk memutuskan saat penghentian.

Lelang slot parachain akan sedikit berbeda dari lelang Candle normal karena tidak menggunakan nomor acak untuk memutuskan durasi fase pembukaannya. Sebagai gantinya, ia memiliki fase terbuka yang diketahui dan akan ditentukan secara surut (pada penutupan normal) telah berakhir pada beberapa titik di masa lalu. Jadi selama fase terbuka, penawaran akan terus diterima, tetapi, tawaran selanjutnya memiliki kemungkinan kehilangan yang lebih tinggi karena momen penutupan yang ditentukan secara retroaktif dapat ditemukan telah mendahului waktu ketika penawaran diajukan.

## Mengapa menggunakan lelang Candle?

Sifat terbuka dan transparan dari sistem blockchain membuka vektor serangan yang tidak ada dalam format lelang tradisional. Lelang terbuka normal pada khususnya dapat rentan terhadap <em x-id = "4"> sniping lelang </em> ketika diterapkan melalui internet atau pada blockchain.

Penembakan lelang terjadi ketika akhir lelang diketahui dan penawar ragu untuk menawar harga asli mereka lebih awal, dengan harapan membayar lebih rendah dari nilai sebenarnya barang tersebut.

Misalnya, Alice dapat menilai suatu barang di lelang seharga 30 USD. Dia mengajukan tawaran awal sebesar 10 USD dengan harapan memperoleh barang dengan harga lebih rendah. Strategi Alice adalah menempatkan tawaran yang lebih tinggi secara bertahap hingga nilai sejatinya sebesar 30 USD terlampaui. Penawar lain Hawa menghargai barang yang sama dengan 11 USD. Strategi Eve adalah menonton pelelangan dan mengajukan penawaran sebesar 11 USD pada detik terakhir. Alice tidak akan punya waktu untuk menanggapi tawaran ini sebelum penutupan lelang dan akan kehilangan barang. Mekanisme lelang ini kurang optimal karena belum menemukan harga sebenarnya dari barang tersebut dan barang tersebut belum sampai ke aktor yang paling menghargainya.

Pada blockchains masalah ini mungkin bahkan lebih buruk, karena berpotensi memberikan produsen blok kesempatan untuk melakukan lelang di blok penutup terakhir dengan menambahkannya sendiri dan / atau mengabaikan tawaran lainnya. Ada juga kemungkinan penawar jahat atau produsen blok mencoba <em x-id = "4"> bersedih </em> jujur penawar dengan memotong lelang.

Untuk alasan ini, [ lelang Vickrey ](https://en.wikipedia.org/wiki/Vickrey_auction), varian lelang harga kedua di mana penawaran disembunyikan dan hanya diungkapkan pada fase selanjutnya, telah muncul sebagai mekanik yang dianggap baik. Misalnya, ini diterapkan sebagai mekanisme untuk melelang nama yang dapat dibaca manusia di [ ENS ](https://ens.domains). Pelelangan Candle adalah solusi lain yang tidak memerlukan skema dua langkah komitmen dan pengungkapan (komponen utama lelang Vickrey), dan untuk alasan ini memungkinkan kontrak yang cerdas untuk berpartisipasi.

Lelang lilin memungkinkan setiap orang untuk selalu mengetahui kondisi penawaran, tetapi tidak ketika lelang akan ditentukan telah "berakhir." Ini membantu memastikan bahwa penawar bersedia mengajukan tawaran mereka yang sebenarnya lebih awal. Kalau tidak, mereka mungkin menemukan diri mereka dalam situasi bahwa pelelangan bertekad telah "berakhir" bahkan sebelum mereka menawar.

## Bagaimana ini digunakan di Polkadot

Polkadot akan menggunakan _ suar acak _ berdasarkan VRF yang digunakan juga di tempat lain dari protokol. VRF akan memberikan dasar dari keacakan yang akan menentukan secara retroaktif "akhir zaman" lelang.

Ketika suatu tawaran akun, mereka dapat menempatkan penawaran untuk periode atau rentang yang tersedia di dalam slot. Namun, jika sebuah parachain (dengan STF yang sama) mengajukan tawaran, maka parachain tersebut harus menawar pada periode yang berkelanjutan atau rentang ke yang telah mereka tempati. Mereka tidak akan dapat menawar slot yang tumpang tindih (tidak ada kelipatan dari parachain yang sama pada waktu yang sama) dan mereka tidak akan dapat menawar slot yang akan datang jika ada celah di antaranya. Dalam kasus parachain di-reboot setelah mencapai akhir durasi slotnya, parachain harus dimulai lagi dari genesis baru (yang bisa berupa snapshot dari semua kondisi lama) dan harus ditawar dari akun eksternal.

Durasi slot dibatasi hingga 2 tahun dan dibagi menjadi periode 6 bulan. Parachains dapat menyewa slot untuk rentang waktu slot yang berdekatan. Parachains dapat menyewa lebih dari satu slot dari waktu ke waktu, yang berarti bahwa mereka dapat memperpanjang sewa mereka ke Polkadot melewati durasi slot 2 tahun hanya dengan menyewa slot yang berdekatan.

## Bagaimana cara kerja penawaran?

```
Slot parachain di awal

       --6 bulan--
       v v
Slot A | 1 | 2 | 3 | 4 |...
Slot B | 1 | 2 | 3 | 4 |...
Slot C | __________ | 1 | 2 | 3 | 4 |...
Slot D | __________ | 1 | 2 | 3 | 4 |...
Slot E | __________ | __________ | 1 | 2 | 3 | 4 |...
       ^                                             ^
       ---------------------2 tahun-------------------

Setiap periode dalam rentang 1 - 4 mewakili durasi 6 bulan untuk total 2 tahun
```

Setiap slot parachain memiliki durasi maksimum 2 tahun. Setiap interval 6 bulan dalam slot dibagi menjadi ` masa sewa ` sendiri. Lebih dari satu ` periode berkelanjutan ` adalah ` rentang `.

Beberapa lelang akan berlangsung dalam enam bulan sebelumnya sebelum satu set slot slot parachain dimulai.

Penawar akan mengirimkan konfigurasi tawaran yang menetapkan jumlah DOT yang ingin mereka kunci dan untuk rentang mana. Rentang slot dapat berupa rentang berkelanjutan periode 1 - 4.

Konfigurasi penawar untuk satu penawar mungkin terlihat seperti ini:

```js
Bids [
       {
              range: [1,2,3,4],
              bond_amount: 300, //DOTs
       },
       {
              range: [1,2],
              bond_amount: 777, //DOTs
       },
       {
              range: [2,3,4],
              bond_amount: 450, // DOTs
       }
]
```

Algoritme pemilihan pemenang akan memilih tawaran yang mungkin tidak tumpang tindih untuk memaksimalkan jumlah DOT yang dimiliki selama durasi sewa 2 tahun keseluruhan dari slot parachain. Ini berarti bahwa penawar tertinggi untuk periode sewa slot tertentu mungkin tidak selalu menang (lihat [ contoh di bawah ](#compete)).

Angka acak ditentukan pada setiap blok yang didasarkan pada VRF yang digunakan oleh Polkadot. Selain itu, setiap lelang akan memiliki ambang batas yang dimulai dari 0 dan meningkat menjadi 1. Angka acak yang diproduksi oleh VRF diperiksa di sebelah ambang untuk menentukan apakah blok itu adalah akhir lelang. Selain itu, VRF akan memilih blok dari zaman terakhir untuk mengambil status tawaran (untuk mengurangi beberapa jenis serangan dari validator jahat).

### Contoh

#### Non-bersaing

Ada satu slot parachain yang tersedia.

Tawaran Alice ` 20 DOTs ` untuk rentang 1 - 2.

Tawaran Bob ` 30 DOTs ` untuk rentang 3 - 4.

Lelang berakhir.

Alice mengikat ` 20 DOTs ` dan akan memiliki slot parachain untuk tahun pertama.

Bob mengikat ` 30 DOTs ` dan akan memiliki slot parachain untuk tahun kedua.

#### Bersaing

Ada satu slot parachain yang tersedia.

Tawaran Charlie ` 75 DOTs ` untuk rentang 1 - 4.

Dave tawaran ` 100 DOTs ` untuk rentang 3 - 4.

Tawaran Emily ` 40 DOTs ` untuk rentang 1 - 2.

Mari kita menghitung penilaian setiap penawar sesuai dengan algoritma. Kami melakukan ini dengan mengalikan jumlah obligasi dengan jumlah periode dalam rentang penawaran yang ditentukan.

Emily - 75 * 4 = 300 untuk rentang 1 - 4

Dave - 100 * 2 = 200 untuk rentang 3 - 4

Emily - 40 * 2 = 80 untuk rentang 1 - 2

Meskipun Dave memiliki tawaran tertinggi sesuai dengan jumlah DOT, ketika kami melakukan perhitungan, kami melihat bahwa karena ia hanya menawar untuk kisaran 2, ia harus berbagi slot dengan Emily yang tawarannya jauh lebih sedikit. Tawaran bersama Dave dan Emily hanya sama dengan penilaian ` 280 `.

Penilaian Charlie untuk seluruh rentang adalah ` 300 ` oleh karena itu Charlie diberikan rangkaian lengkap slot parachain.

## Tanya-jawab

### Mengapa tidak semua orang menawar untuk panjang maks?

Selama slot, tawaran ` DOTs ` dalam pelelangan akan dikunci. Ini berarti ada biaya peluang dari kemungkinan menggunakan ` DOTs ` itu untuk sesuatu yang lain. Untuk parachains yang bermanfaat bagi Polkadot, ini harus menyelaraskan kepentingan antara parachains dan rantai relay Polkadot.

### Bagaimana mekanisme ini membantu memastikan keragaman parachain?

Metode untuk membagi slot parachain menjadi interval enam bulan sebagian diinspirasi oleh keinginan untuk memungkinkan jumlah keragaman parachain yang lebih besar, dan mencegah parachain yang sangat besar dan didanai dengan baik dari slot yang menimbun. Dengan membuat setiap periode durasi enam bulan tetapi slot keseluruhan durasi 2 tahun, mekanisme tersebut dapat mengatasi parachain yang didanai dengan baik yang akan memastikan mereka mengamankan slot di akhir masa sewa mereka, sementara secara bertahap memungkinkan parachain lain untuk memasuki ekosistem untuk menempati jangka waktu enam bulan yang tidak diisi. Misalnya, jika parachain besar yang didanai dengan baik telah memperoleh slot untuk rentang 1 - 4, mereka akan sangat tertarik untuk mendapatkan slot berikutnya yang akan terbuka untuk 2 - 5. Di bawah mekanisme ini bahwa parachain dapat memperoleh periode 5 ( karena hanya itu yang dibutuhkan) dan memungkinkan jangkauan 2 - 4 slot parachain kedua untuk ditempati oleh yang lain.

### Mengapa keacakan sulit pada blockchain?

Keacakan adalah masalah untuk sistem blockchain. Menghasilkan angka acak tanpa kepercayaan pada jaringan transparan dan terbuka di mana pihak lain harus dapat memverifikasi membuka kemungkinan bagi pelaku untuk mencoba mengubah atau memanipulasi keacakan. Ada beberapa solusi yang telah diajukan, termasuk bawang hash seperti [ RANDAO ](https://github.com/randao/randao) dan <a href = "https://en.wikipedia.org/wiki/Verifiable_random_function"> fungsi acak yang dapat diverifikasi </a> (VRFs). Yang terakhir adalah apa yang digunakan Polkadot sebagai dasar untuk keacakannya.

## Sumber daya

- [Parachain Allocation](https://research.web3.foundation/en/latest/polkadot/Parachain-Allocation.html) - W3F research page on parachain allocation that goes more in depth to the mechanism.
- [ paritytech / polkadot # 239 ](https://github.com/paritytech/polkadot/pull/239) - Tarik permintaan yang memperkenalkan kode slot parachain.
