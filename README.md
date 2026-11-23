<p align="center"><img src="assets/brand/logo-vertical.svg" width="320" alt="Logo Republik Warungkopia"></p>

# Republik Warungkopia

**DUNIA TERLALU LUAS UNTUK TIDAK PENASARAN.**

Negara imajiner channel YouTube **@teoriwarungkopi**. Penonton adalah warga, dan merekalah yang mengusulkan serta memilih apa yang dibangun berikutnya. Ibu kota: **Warungkopia**. Serial mingguan, terbit setiap **Kamis**.

<p align="center"><img src="assets/flag/flag.svg" width="240" alt="Bendera Republik Warungkopia"></p>

## Status negara
| Episode | Penduduk | Dibangun |
|---|---|---|
| 1 · Short | 1.931 | — (ibu kota masih kosong; warga diajak mengusulkan) |
| 2 · Short "2.500 Warga, 0 Rumah!" | 2.500 | Kawasan Permukiman 1 · RS Republik Warungkopia |
| 3 · Video panjang 16:9 | — | pra-produksi |

## Dokumen
- [Project Master Prompt](docs/PROJECT_MASTER_PROMPT.md) — aturan & tahapan proyek
- [Brand Guidelines](docs/BRAND_GUIDELINES.md) — logo, bendera, lambang, mata uang ARAH
- [ROADMAP](ROADMAP.md) — penyempurnaan video panjang (16:9)
- [CHANGELOG](CHANGELOG.md)
- [The Kopians Character Sheet](assets/characters/The_Kopians_Character_Sheet.png)

## Struktur
```
assets/     brand · flag · currency · characters · buildings · backgrounds · maps
docs/       master prompt, brand guidelines, (Tahap 2: world bible, dst.)
engine/     mesin animasi (canvas 2D → Playwright → ffmpeg)
episodes/   catatan per episode — MP4 ada di tab Releases
stories/    naskah & storyboard
proposals/  alternatif yang belum/tidak dipilih
```

## Render video
```bash
cd engine
npm install
npx playwright install chromium
node render.js        # scene → engine/out/
python3 audio.py      # musik + SFX → bg.wav
```
Butuh Node 18+, Python 3 + numpy, ffmpeg.
