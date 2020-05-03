---
id: build-pdk
title: Kit Pengembangan Parachain (PDK)
sidebar_label: Kit Pengembangan Parachain (PDK)
---

Kit pengembangan parachain (PDK) adalah seperangkat alat yang memudahkan pengembang untuk membuat [ parachains ](learn-parachains) yang kompatibel dengan Polkadot.

## Mengapa membuat parachain?

Sebelum menyelam ke dalam apa itu PDK dan bagaimana itu akan digunakan, mari kita kembali <em x-id = "4"> mengapa </em> pengembang ingin membuat parachain dan menghubungkannya ke Polkadot.

Parachain memiliki dua nilai tambah utama yang menjadikannya pilihan yang diinginkan untuk pengembang daripada menciptakan rantai mandiri:

- _ Keamanan bersama _ - menghapus keharusan bootstrap set validator rantai itu sendiri.
- _ Komunikasi lintas rantai _ - memungkinkan parachains untuk saling beroperasi melalui protokol XCMP.

Parachains dapat [ menyewakan keamanan ](learn-security) jaringan Polkadot dengan mengikat [ DOTs ](learn-DOT) untuk slot parachain. Ini berarti bahwa biaya sosial untuk membangun komunitas di sekitar proyek Anda dan meyakinkan validator untuk berpartisipasi dalam keamanan jaringan Anda berkurang. Diperkirakan bahwa Polkadot akan memiliki keamanan yang kuat, dan proyek aplikasi terdesentralisasi yang ingin mendapatkan manfaat dari keamanan ini ingin menjadi parachain. Untuk informasi lebih lanjut tentang mekanisme penyewaan slot parachain melalui lelang lilin, lihat [ di sini ](learn-auction).

Setiap aplikasi atau rantai terdesentralisasi yang ingin memungkinkan pengiriman pesan tanpa percaya ke parachain lain yang telah terhubung ke Polkadot ingin menjadi parachain. Interoperabilitas antara rantai berdaulat melibatkan kendala tertentu dan protokol kompleks untuk memungkinkan lintas luas rantai. Dengan Polkadot, Anda akan mendapatkan fitur ini di luar kotak jika Anda membuat aplikasi sebagai parachain. [ protokol XCMP ](learn-crosschain) akan memungkinkan parachains untuk beroperasi dengan mengirimkan pesan di antara mereka. Lebih lanjut, ketika jembatan ke rantai lain diluncurkan (seperti yang ke Bitcoin atau Ethereum) parachains akan dapat beroperasi dengan ini juga.

## Apa itu PDK?

Seperti disebutkan, PDK adalah seperangkat alat yang memungkinkan pengembang untuk dengan mudah membuat parachain. Dalam praktiknya ini berarti bahwa PDK akan terdiri dari beberapa komponen utama:

- _ Fungsi transisi negara _ - cara bagi aplikasi Anda untuk berpindah dari satu kondisi ke kondisi lainnya.
- _ Fungsi transisi negara _ - cara untuk aplikasi Anda untuk berpindah dari satu kondisi ke kondisi lainnya.

Fungsi transisi status (STF) dapat berupa cara abstrak apa pun agar aplikasi beralih dari satu kondisi ke kondisi lainnya. Satu-satunya kendala yang ditempatkan Polkadot pada STF ini adalah harus mudah diverifikasi - biasanya meskipun apa yang kita sebut _ saksi _ atau _ bukti _. Pasti begitu karena validator rantai relai perlu memeriksa bahwa setiap negara yang diterimanya dari simpul kolator benar tanpa benar-benar menjalankan seluruh perhitungan. Beberapa contoh dari bukti ini termasuk blok Proof-of-Validity atau zk-SNARK yang membutuhkan lebih sedikit sumber daya komputasi untuk memverifikasi daripada yang mereka hasilkan. Asimetri verifikasi dalam menghasilkan bukti STF adalah salah satu wawasan integral yang memungkinkan Polkadot untuk skala sambil menjaga jaminan keamanan yang tinggi.

Node kolator adalah salah satu jenis pengelola jaringan dalam protokol Polkadot. Mereka bertanggung jawab untuk ** menjaga ketersediaan ** status parachain dan status baru yang dikembalikan dari iterasi fungsi transisi status. Mereka harus tetap online untuk melacak negara dan juga pesan XCMP yang akan dirutekan antara dirinya dan parachain lainnya. Node kolator bertanggung jawab untuk meneruskan bukti ringkas ke validator rantai relai, dan melacak blok terbaru dari rantai relai. Pada dasarnya, simpul kolator juga bertindak sebagai klien ringan untuk rantai relai Polkadot. Untuk lebih lanjut tentang simpul-simpul pengumpul, lihat [ di sini ](maintain-collator).

## PDK macam apa yang ada?

Saat ini satu-satunya PDK adalah Paritas [Substrat](https://github.com/paritytech/substrate)and[Cumulus](https://github.com/paritytech/cumulus). Substrate adalah kerangka kerja blockchain yang menyediakan blok bangunan dasar dari blockchain (hal-hal seperti lapisan jaringan, konsensus, juru bahasa Wasm) dan menyediakan cara intuitif untuk membangun runtime Anda. Substrat dibuat untuk memudahkan proses pembuatan rantai baru, tetapi tidak memberikan dukungan untuk kompatibilitas Polkadot secara langsung. Untuk alasan ini, Cumulus, perpustakaan tambahan akan berisi semua kode lem kompatibilitas Polkadot. Cumulus masih dalam pengembangan, tetapi idenya adalah bahwa itu harus sederhana untuk mengambil rantai Substrat dan menambahkan kode parachain dengan mengimpor peti dan menambahkan satu baris kode.

Substrate dan Cumulus menyediakan PDK dari abstraksi format blockchain, tetapi tidak perlu bahwa parachain bahkan perlu menjadi blockchain. Misalnya, sebuah parachain hanya perlu memenuhi dua kendala yang tercantum di atas: _ fungsi transisi status _ dan _ node collator _. Segala sesuatu yang lain tergantung pada pelaksana PDK.

Satu ide menarik untuk PDK yang akan menyenangkan untuk dilihat adalah memiliki <a href = "https://ethresear.ch/t/roll-up-roll-back-snark-side-chain-17000-tps/3675 "> roll_up </a> kit yang memungkinkan pengembang membuat parachain berbasis snark. Jika kami meninjau penulisan roll_up, kami melihat bahwa sistem menggunakan dua peran: pengguna yang memperbarui status ** ** dan operator yang ** mengumpulkan status pembaruan ** menjadi satu pembaruan dalam satu jaringan. Itu harus lurus ke depan untuk melihat bagaimana kita bisa menerjemahkan ini ke istilah parachain. Fungsi transisi status untuk parachain seperti roll_up akan memperbarui status (dalam praktiknya, kemungkinan besar pohon merkle yang mudah diverifikasi) dari input pengguna. Operator akan bertindak sebagai simpul collator yang akan menggabungkan keadaan dan membuat bukti zk-SNARK yang akan diserahkan ke validator rantai relai untuk verifikasi.

## Membangun PDK

Jika Anda atau tim Anda tertarik mengembangkan PDK, jangan ragu untuk membuka masalah di [ repositori kolaborasi W3F ](https://github.com/w3f/Web3-collaboration) untuk komentar. Mungkin ada hibah yang tersedia untuk jenis pekerjaan ini.
