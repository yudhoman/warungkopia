# 🏝️ WarungKopia

Kota imajiner channel YouTube **@teoriwarungkopi** — 1 follower = 1 penduduk.
Serial mingguan, terbit setiap **Kamis**.

## Status kota
| Episode | Penduduk | Dibangun |
|---|---|---|
| Short "2.500 Warga, 0 Rumah!" | 2.500 | Kawasan Permukiman 1 (12 rumah, jalan, taman, lampu) · RS Republik Warungkopia |

## Struktur
```
engine/     kode animasi (canvas 2D → Playwright → ffmpeg)
episodes/   hasil MP4 tiap episode
```

## Cara render
```bash
cd engine
npm install
npx playwright install chromium
node render.js                 # render semua scene ke engine/out/
python3 audio.py               # musik + SFX → bg.wav
```
Butuh: Node 18+, Python 3 + numpy, ffmpeg.
