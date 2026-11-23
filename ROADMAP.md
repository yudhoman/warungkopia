# Roadmap Penyempurnaan — Video Panjang WarungKopia

Standar untuk semua video panjang berikutnya (±5 menit). Short "2.500 Warga, 0 Rumah!" adalah versi dasar.

## 1. Tokoh The Kopians
- [x] Character Sheet v1.0 dibuat dari engine → `assets/The_Kopians_Character_Sheet.png` (render ulang: `node engine/sheetshot.js`)
- [ ] Tampak samping untuk jalan/lari (bukan hanya tampak depan)
- [ ] Gerak mulut saat tokoh berdialog, kedip mata acak, napas
- [ ] Lebih banyak pose: menunjuk, memanjat, mengangkat, terpeleset, berpelukan, berlutut
- [ ] Ekspresi tambahan: kaget, malu, marah lucu, menangis haru

## 2. Visual & lingkungan
- [ ] Format 16:9 (1920x1080) dengan komposisi ulang semua scene — DITETAPKAN: semua video panjang 16:9
- [ ] Interior baru: dalam rumah, lobi RS, ruang rapat warga, warung
- [ ] Cuaca & waktu: hujan, angin, senja, malam, kabut pagi
- [ ] Pulau lebih detail: tekstur pantai, sungai mengalir, burung, kendaraan lewat, penduduk berjalan di jalan
- [ ] Bangunan tropical modern lebih detail (atap, ventilasi, teras, tanaman)
- [ ] Peta masterplan sebagai benang merah: tiap bab menambah titik di peta

## 3. Kamera & tempo
- [ ] Variasi shot per bab: aerial, low angle, close-up wajah, tracking, orbit, POV
- [ ] Tidak ada sudut sama di adegan berurutan
- [ ] Perkembangan visual tiap 3–5 detik

## 4. Cerita
- [ ] Struktur per bab: masalah → usaha → hambatan lucu → hasil
- [ ] Konflik kecil antartokoh (Pak Bolo sok tahu, Nara perfeksionis, Bubu lapar) sebagai humor
- [ ] Hook 2 detik pertama, pertanyaan pemancing di akhir
- [ ] Hasil episode selalu terlihat di peta

## 5. Suara
- [ ] Voiceover per bab + dialog tokoh (suara berbeda per karakter)
- [ ] Musik bertema per suasana (harapan, lucu, tegang, haru) — bukan satu loop
- [ ] SFX lebih kaya: ambience pulau, langkah kaki, alat bangunan, kerumunan
- [ ] Loudnorm 2 tahap, narasi selalu dominan

## 6. Produksi
- [ ] Paket produksi per bab disetujui dulu sebelum render
- [ ] Engine dipecah per modul (tokoh, pulau, bangunan, efek) supaya mudah dipakai ulang
- [ ] Setiap episode: kode di-push ke `main`, MP4 di Releases
- [ ] Thumbnail dari frame terbaik + judul hook

## Workflow tiap episode
1. Kumpulkan usulan warga dari komentar / polling (usulan episode panjang pertama: masuk minggu depan)
2. Konsep + naskah + storyboard per bab → disetujui
3. Rekam voiceover (ElevenLabs)
4. Render per bab → review → revisi
5. Gabung, cek akhir, push ke GitHub, upload MP4 ke Releases
