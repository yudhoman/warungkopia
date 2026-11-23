# Sistem Pembangunan Kota

## Tahap negara
| Tahap | Ciri | Status |
|---|---|---|
| Discovery | Pulau kosong, warga mendarat | ✅ dilewati |
| Foundation | Rumah, jalan, layanan dasar | ✅ **sekarang** (Permukiman 1 + RS sudah berdiri) |
| Capital | Kota Warungkopia lengkap sebagai ibu kota: balai kota, alun-alun, pasar, sekolah | ⏳ |
| Civilization | Pelabuhan, bandara, energi, kawasan inovasi | ⏳ |
| Republic | Kota-kota baru, pemilu | ⏳ |

✅ Catatan: World Bible v1.1 menaruh RS dan permukiman di tahap Civilization. Episode 001 sengaja langsung membangunnya karena permintaan warga (keputusan kreator).

🟡 PROPOSAL: tahap naik kalau syarat bangunan terpenuhi, bukan karena jumlah penduduk saja.

## Registri bangunan ✅
Disimpan di `data/state.json` (dipakai website Tahap 3).

| ID | Nama | Episode | Tahap |
|---|---|---|---|
| B001 | Kawasan Permukiman 1 (12 rumah, jalan, taman, lampu) | Short 2.500 | Foundation |
| B002 | RS Republik Warungkopia (IGD, ruang rawat, panel surya) | Short 2.500 | Foundation |

Setiap bangunan baru wajib memiliki: ID, nama, episode, posisi di peta, hasil voting (%), dan satu "ciri penasaran" (fakta unik atau inovasi kecil yang membuatnya khas).

## Kota baru 🟡 PROPOSAL
- Usulan kota baru dibuka paling cepat saat penduduk mencapai **10.000 warga** dan Kota Warungkopia sudah di tahap Capital.
- Proses: warga mengusulkan nama di komentar → 4 nama teratas masuk polling 2 minggu → nama pemenang diumumkan di episode khusus.
- Lokasi kota baru dipilih dari kawasan masterplan yang ada.
- Setiap kota baru mendapat: nama pilihan warga, sejarah pendirian (episode pendiriannya), lokasi, warna aksen sendiri dari palet, satu bangunan khas, dan ciri ekonomi-budaya.

⚠️ World Bible v1.1 menyebut "satu kota saja". Master prompt baru membolehkan kota baru lewat voting. Yang berlaku sekarang adalah master prompt baru, kecuali kamu menentukan lain.
