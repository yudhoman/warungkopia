# Sistem Pembangunan Kota ✅

## Tahap negara
Urutan ini menggantikan urutan di World Bible v1.1, karena di sana RS dan permukiman baru muncul di tahap Civilization padahal keduanya sudah dibangun lebih dulu.

| Tahap | Ciri | Syarat naik tahap | Status |
|---|---|---|---|
| 1. Tanah Kosong | Nama Warungkopia sudah ada, warga ada, belum ada bangunan | Bangunan pertama berdiri | ✅ selesai |
| 2. Permukiman | Rumah, jalan, layanan dasar (kesehatan) | Ada pasar/pangan, sekolah, dan balai warga | ✅ **sekarang** |
| 3. Ibu Kota | Kota Warungkopia lengkap: balai kota, alun-alun, pasar, sekolah | Ada pelabuhan atau sumber energi | ⏳ |
| 4. Peradaban | Pelabuhan, bandara, energi bersih, kawasan inovasi | Penduduk 10.000 | ⏳ |
| 5. Republik Penuh | Kota-kota baru, pemilihan presiden | — | ⏳ |

Tahap hanya naik kalau syarat bangunannya terpenuhi, bukan karena jumlah penduduk saja. Bangunan yang dibangun tetap mengikuti hasil voting warga. Kalau warga memilih bangunan dari tahap yang lebih tinggi, bangunan itu boleh dibangun sebagai versi awal yang kecil.

## Registri bangunan ✅
Disimpan di `data/state.json` (dipakai website Tahap 3).

| ID | Nama | Episode | Tahap |
|---|---|---|---|
| B001 | Kawasan Permukiman 1 (12 rumah, jalan, taman, lampu) | Short 2.500 | Permukiman |
| B002 | RS Republik Warungkopia (IGD, ruang rawat, panel surya) | Short 2.500 | Permukiman |

Setiap bangunan baru wajib memiliki: ID, nama, episode, posisi di peta, hasil voting (%), dan satu "ciri penasaran" (fakta unik atau inovasi kecil yang membuatnya khas).

## Kota baru ✅
- Usulan kota baru dibuka paling cepat saat penduduk mencapai **10.000 warga** dan Kota Warungkopia sudah di tahap Ibu Kota.
- Proses: warga mengusulkan nama di komentar → 4 nama teratas masuk polling 2 minggu → nama pemenang diumumkan di episode khusus.
- Lokasi kota baru dipilih dari kawasan masterplan yang ada.
- Setiap kota baru mendapat: nama pilihan warga, sejarah pendirian (episode pendiriannya), lokasi, warna aksen sendiri dari palet, satu bangunan khas, dan ciri ekonomi-budaya.
