// ===== WarungKopia Episode 3 — Sekolah Kenapa & Pasar Delapan Penjuru (16:9)
const SC = [['s_open', 0, 20.0], ['s_warga', 20.0, 60.9], ['s_masalah', 60.9, 86.3], ['s_rapat', 86.3, 102.3], ['s_plot', 102.3, 108.2], ['s_cut', 108.2, 126.4], ['s_bell', 126.4, 135.7], ['s_nama', 135.7, 149.1], ['s_kelas', 149.1, 156.3], ['s_dawn', 156.3, 164.1], ['s_pasar', 164.1, 182.4], ['s_lapak', 182.4, 197.7], ['s_trans', 197.7, 212.4], ['s_bolo', 212.4, 221.4], ['s_peta', 221.4, 249.6], ['s_cta', 249.6, 266.4], ['s_motto', 266.4, 270.8]];
const END = 270.8;
const ts = i => SEGS[i][0];

function sky(c, top, bot, y0 = 0, y1 = 1100) { const g = c.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, top); g.addColorStop(1, bot); c.fillStyle = g; c.fillRect(-2000, -2000, 6000, 6000); }
function ground(c, y, col = '#8cbf6a', col2 = '#6aa356') { const g = c.createLinearGradient(0, y, 0, y + 400); g.addColorStop(0, col); g.addColorStop(1, col2); c.fillStyle = g; c.fillRect(-2000, y, 6000, 2000); }
function hills(c, y, col, seed, amp = 60, par = 0) { const r = R(seed); c.fillStyle = col; c.beginPath(); c.moveTo(-2000, y + 400); for (let x = -2000; x <= 4000; x += 160) c.lineTo(x - par, y - r() * amp); c.lineTo(4000, y + 400); c.fill(); }
function houseSide(c, x, y, s, roof = '#c9623f') { c.save(); c.translate(x, y); c.scale(s, s); rr(c, -110, -150, 220, 150, 6, '#f6f2ea'); rr(c, -30, -90, 60, 90, 4, '#8a5a35'); rr(c, 50, -120, 44, 40, 4, '#9fc8d8'); rr(c, -94, -120, 44, 40, 4, '#9fc8d8'); poly(c, [-140, -150, 140, -150, 0, -260], roof); c.restore(); }
function crowd(c, x0, x1, y, n, t, seed = 1, s = 1, up = 0) { const r = R(seed); for (let i = 0; i < n; i++) { const x = lerp(x0, x1, (i + r() * .5) / n), yy = y + (i % 3) * 18; mini(c, x, yy, s * (1 + (i % 3) * .08), MINI_SHIRT[(i + seed) % 10], MINI_SKIN[(i + seed) % 5], { up: up ? (Math.sin(t * 6 + i) > 0 ? 1 : .3) : 0, bob: Math.abs(Math.sin(t * 5 + i)) * 4 }); } }

// ---------- PEMBUKA
function s_open(c, t) {
  const k = eio(seg(t, 0, 19.5));
  const z = lerp(.42, 1.1, k), cx = lerp(0, SET.x + 40, k), cy = lerp(60, SET.y + 120, k);
  c.save(); cam(c, z, cx, cy); drawIsland3(c, t, {}); c.restore();
  c.fillStyle = 'rgba(15,20,55,.25)'; c.fillRect(0, 0, W, H);
  // subscribe = warga
  const a1 = seg(t, .1, .5) * (1 - seg(t, 4.3, 4.7));
  if (a1 > 0) { c.save(); c.globalAlpha = a1; subscribeBtn(c, W / 2 - 440, H / 2 - 40, 1.3, back(seg(t, .1, .5))); outlined(c, '=', W / 2 - 110, H / 2 - 40, 110, '#fff', C.navy, 16); c.save(); c.translate(W / 2 + 270, H / 2 - 40); c.scale(back(seg(t, .6, 1.0)), back(seg(t, .6, 1.0))); outlined(c, 'JADI WARGA', 0, 0, 92, C.yellow, C.navy, 18); c.restore(); c.restore(); }
  const a2 = seg(t, 4.8, 5.2) * (1 - seg(t, 7.4, 7.8));
  if (a2 > 0) { c.save(); c.globalAlpha = a2; const s = back(seg(t, 4.8, 5.3)); c.translate(W / 2, H / 2 - 60); c.scale(s, s); compassIcon(c, 0, -110, 90); outlined(c, 'REPUBLIK', 0, 30, 50, '#fff', C.navy, 12); outlined(c, 'WARUNGKOPIA', 0, 100, 104, C.yellow, C.navy, 20); c.restore(); }
  if (t > 7.85) { const n = t < 11.44 ? 2500 : Math.round(lerp(2500, 2536, eo(seg(t, 11.6, 13.8)))); const s = back(seg(t, 7.85, 8.2)) * (1 - seg(t, 16.6, 17.0) * .4); c.save(); c.translate(W / 2, H / 2 - 50); c.scale(s, s); outlined(c, n.toLocaleString('id-ID'), 0, 0, 200, n >= 2536 ? C.yellow : '#fff', C.navy, 26); c.font = F(800, 40); c.restore(); chip(c, W / 2, H / 2 + 110, 'WARGA', '#fff', C.navy, 40, s); confetti(c, 13.8, t, 90, 4, W / 2, H / 2 - 60); }
  if (t > 15.08) chip(c, W / 2 + 330, H / 2 - 150, '+36 WARGA BARU', C.orange, '#fff', 46, back(seg(t, 15.08, 15.4)), .06);
  if (t > 17.0) { const kk = back(seg(t, 17.0, 17.4)); [['SEKOLAH?', -260], ['PASAR?', 260]].forEach(([l, dx], i) => { speech(c, W / 2 + dx, 230, l, 48, back(seg(t, 17.0 + i * .4, 17.4 + i * .4)), i ? 1 : -1); }); }
}

// ---------- BAB 1: WARGA BARU di gerbang
const ARR = [['rizki', 30.0, .78], ['rizka', 31.8, .74], ['ibu', 33.6, 1.0], ['kakak', 42.4, .9], ['abang', 43.0, .95], ['ayah', 44.0, 1.05], ['della', 51.9, .85], ['gavendra', 53.0, .9]];
const NAMES = { rizki: 'RIZKI', rizka: 'RIZKA', ibu: 'IBU', kakak: 'KAKAK', abang: 'ABANG', ayah: 'AYAH', della: 'DELLA', gavendra: 'GAVENDRA' };
function s_warga(c, t) {
  let cx = 960, z = 1.0;
  if (t < 28.0) { z = lerp(1.25, 1.0, eio(seg(t, 20, 23))); cx = lerp(820, 960, eio(seg(t, 20, 23))); }
  else if (t < 39) { z = 1.15; cx = lerp(960, 1050, seg(t, 28, 39)); }
  else if (t < 51) { z = 1.0; cx = lerp(1050, 1150, seg(t, 39, 51)); }
  else { z = lerp(1.0, .9, seg(t, 51, 56)); cx = 1050; }
  c.save(); cam(c, z, cx, 600);
  sky(c, '#6fb2e6', '#ffe8c0'); glow(c, 400, 250, 400, 'rgba(255,240,190,.8)');
  cloud(c, 300 + t * 6, 200, .8); cloud(c, 1400 + t * 4, 150, .7);
  hills(c, 700, '#9ab7d0', 3, 80); hills(c, 760, '#7aa87a', 5, 60);
  for (let i = 0; i < 5; i++) houseSide(c, 1500 + i * 260, 830, .7, ['#c9623f', '#2f8c8c', '#e0a33a'][i % 3]);
  ground(c, 820);
  gateKota(c, 330, 900, .95);
  // Mimi with scroll
  const len = lerp(120, t > 49.45 ? 820 : 560, eo(seg(t, 39.0, 41.5))) + (t > 28.4 ? 120 * seg(t, 28.4, 39) : 0);
  kopian(c, 'mimi', 760, 940, 1.25, { expr: t > 49.45 && t < 51.3 ? 'wow' : 'talk', talk: .35 * Math.abs(Math.sin(t * 10)), armR: 1.4, elbR: .6, look: .7 });
  scroll(c, 890, 640, .9, Math.min(len, 900), ['Rizki', 'Rizka', 'Al', 'Kakak', 'Abang', 'Ibu', 'Ayah', 'Della', 'Gavendra'], t, [30.0, 31.8, 33.8, 42.4, 43.0, 43.5, 44.0, 51.9, 53.0]);
  if (t > 49.45 && t < 52) for (let i = 0; i < 6; i++) { const k = seg(t, 49.6 + i * .1, 51.6 + i * .1); c.save(); c.globalAlpha = 1 - k; c.translate(900 + i * 30 + k * 200, 1300 - k * 500); c.rotate(k * 6 + i); rr(c, -14, -18, 28, 36, 2, '#fff8e6'); c.restore(); }
  // arrivals queue: walk in from right, stop in line
  ARR.forEach(([id, t0, s], i) => {
    const k = eo(seg(t, t0 - 1.6, t0)); if (k <= 0) return;
    const tx = 1080 + i * 115, x = lerp(2300, tx, k), walking = k < 1;
    kopian(c, id, x, 960 + (i % 2) * 14, s, Object.assign(walking ? runPose(t, 9, .5) : { expr: 'happy', armR: t > 54.2 ? 2.6 : .3, armL: t > 55.9 ? 2.5 : .2, look: -.6 }, { flip: -1 }));
    if (id === 'ibu') baby(c, x - 10, 960 - 120 * s, .7, t);
    const nk = back(seg(t, t0, t0 + .3)); if (nk > 0) chip(c, x, 960 - 300 * s - 40 - (i % 2) * 48, NAMES[id], C.yellow, C.navy, 32, nk);
  });
  if (t > 33.8) { const ix = 1080 + 2 * 115; chip(c, ix + 40, 960 - 300 - 100, 'AL (BAYI)', '#fff', C.navy, 28, back(seg(t, 33.8, 34.1))); }
  c.restore();
  if (t > 44.97 && t < 49.4) { chip(c, W / 2, 140, '1 KELUARGA = 7 WARGA', C.orange, '#fff', 54, back(seg(t, 44.97, 45.3))); chip(c, W / 2 + 470, 140, '👍', '#fff', C.navy, 40, back(seg(t, 46.5, 46.8))); }
  if (t > 39.04 && t < 39.95) chip(c, W / 2, 140, 'TUNGGU…', '#fff', C.navy, 54, back(seg(t, 39.04, 39.3)));
  if (t > 54.19) { chip(c, W / 2, 140, 'SELAMAT DATANG, WARGA BARU!', C.yellow, C.navy, 54, back(seg(t, 54.19, 54.5))); confetti(c, 54.3, t, 120, 7, W / 2, 200); }
}

// ---------- BAB 2: MASALAH
function s_masalah(c, t) {
  if (t < 64.2) { // suara warga
    const [sx, sy] = shake(t, 61.2, .6, 14);
    c.save(); cam(c, 1.0, 960, 560, 0, sx, sy);
    sky(c, '#6fb2e6', '#ffe8c0'); hills(c, 720, '#7aa87a', 5, 60); ground(c, 800);
    crowd(c, 120, 1800, 900, 22, t, 3, 2.2, 1);
    c.restore();
    speech(c, 600, 260, 'SEKOLAH!', 64, back(seg(t, 61.4, 61.8)), -1); speech(c, 1320, 300, 'PASAR!', 64, back(seg(t, 62.0, 62.4)), 1);
    return;
  }
  if (t < 70.8) { // menulis di pasir
    c.save(); cam(c, 1.15, 960, 620);
    sky(c, '#7fc0ea', '#ffe8c0'); c.fillStyle = '#3aa6c0'; c.fillRect(-500, 520, 3000, 200);
    ground(c, 700, '#f3dcaa', '#e2bd84');
    const wv = eio(seg(t, 68.2, 69.6));
    // letters
    c.save(); c.globalAlpha = 1 - seg(t, 69.0, 70.0); c.font = F(800, 110); c.fillStyle = 'rgba(140,100,50,.55)'; c.textAlign = 'center'; c.fillText('A B C', 960, 900); c.restore();
    // wave
    c.fillStyle = 'rgba(80,190,210,.85)'; c.beginPath(); c.moveTo(-500, 700); for (let x = -500; x <= 2400; x += 40) c.lineTo(x, 700 + wv * 260 * Math.sin(seg(t, 68.2, 70.2) * PI) + Math.sin(x * .02 + t * 4) * 10); c.lineTo(2400, 690); c.fill();
    kopian(c, 'rizki', 700, 980, .8, { expr: t > 69 ? 'wow' : 'happy', armR: 1.2, elbR: .4, look: .4 }); kopian(c, 'rizka', 1220, 980, .75, { expr: t > 69 ? 'worried' : 'happy', armL: 1.2, elbL: .4, look: -.4 });
    c.restore();
    return;
  }
  if (t < 82.3) { // Bubu menunggu perahu
    c.save(); cam(c, lerp(1.0, 1.15, seg(t, 70.8, 82)), 960, 600);
    sky(c, '#7fc0ea', '#ffd8a8'); c.fillStyle = '#3a90b8'; c.fillRect(-500, 560, 3000, 600);
    for (let i = 0; i < 20; i++) line(c, (i * 130 + t * 20) % 2200 - 100, 600 + (i % 5) * 60, (i * 130 + t * 20) % 2200 - 40, 600 + (i % 5) * 60, 'rgba(255,255,255,.4)', 3);
    rr(c, 300, 780, 900, 30, 4, '#8a6a42'); for (let i = 0; i < 6; i++) rr(c, 320 + i * 160, 800, 16, 200, 4, '#6b4a2f');
    ground(c, 950, '#f3dcaa', '#e2bd84');
    const bx = t < 78.7 ? lerp(2100, 1600, seg(t, 73.5, 78.5)) : 1600 + Math.sin(t * 2) * 6;
    boat(c, bx, 640, .6, Math.sin(t * 2) * .03, 1, 3);
    kopian(c, 'bubu', 650, 790, 1.1, { expr: t > 78.7 ? 'worried' : 'wow', armL: .9, elbL: 1.6, look: 1, bob: Math.sin(t * 3) * 2, tilt: t > 79 ? .1 : 0 });
    c.restore();
    if (t > 71.2) { const k = (t * 1.5) % 1; c.save(); c.globalAlpha = 1 - k; c.font = F(800, 40); c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('kruuuk…', 760, 480 - k * 60); c.restore(); }
    if (t > 78.72) chip(c, W / 2, 140, 'PERAHU TERLAMBAT', C.red, '#fff', 50, back(seg(t, 78.72, 79.0)));
    return;
  }
  // hasil voting
  navyGrid(c, 0, t * 10);
  chip(c, W / 2, 170, 'HASIL VOTING WARGA', C.yellow, C.navy, 56, back(seg(t, 82.4, 82.7)));
  [['SEKOLAH', 84.3, '#2f8c8c'], ['PASAR', 85.3, C.orange]].forEach(([l, t0, col], i) => {
    const k = back(seg(t, t0, t0 + .35)); if (k <= 0) return;
    c.save(); c.translate(W / 2 + (i ? 330 : -330), 560); c.scale(k, k); rr(c, -260, -200, 520, 400, 40, '#fff');
    circ(c, 0, -60, 90, col); c.font = F(800, 90); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(i ? '🛒'.length ? '' : '' : '', 0, -60);
    if (i === 0) { rr(c, -50, -90, 100, 60, 4, '#fff'); poly(c, [-62, -90, 62, -90, 0, -130], '#fff'); } else { for (let j = 0; j < 4; j++) poly(c, [-56 + j * 28, -110, -28 + j * 28, -110, -32 + j * 28, -80, -60 + j * 28, -80], j % 2 ? '#fff' : '#ffd8c0'); rr(c, -56, -80, 112, 50, 4, '#fff'); }
    c.font = F(800, 64); c.fillStyle = C.navy; c.fillText(l, 0, 110); chip(c, 0, -190, '#' + (i + 1) + ' USULAN TERBANYAK', col, '#fff', 26, 1); c.restore();
  });
}

// ---------- RAPAT DEWAN
function s_rapat(c, t) {
  let z = 1.0, cx = 960, cy = 600;
  if (t > 88.6 && t < 94.2) { z = 1.6; cx = 560; cy = 640; } else if (t >= 94.2 && t < 98.2) { z = 1.6; cx = 1200; cy = 640; } else if (t >= 98.2) { z = 1.0; cx = lerp(960, 1300, seg(t, 98.2, 102)); }
  c.save(); cam(c, z, cx, cy);
  sky(c, '#7fc0ea', '#ffe8c0'); hills(c, 700, '#7aa87a', 2, 70); ground(c, 790);
  // big tree
  rr(c, 920, 380, 80, 420, 20, '#7a5530'); for (const [x, y, r] of [[960, 330, 230], [780, 400, 160], [1140, 400, 170], [960, 220, 160]]) circ(c, x, y, r, '#3f8a3a'); circ(c, 900, 280, 120, 'rgba(160,220,120,.25)');
  ell(c, 960, 860, 360, 50, '#a8743f'); ell(c, 960, 850, 340, 40, '#c58a4b');
  const seat = [['moci', 560], ['tiko', 700], ['mimi', 830], ['bubu', 1090], ['jabrik', 1220], ['bolo', 1360]];
  seat.forEach(([id, x]) => kopian(c, id, x, 960, 1.0, id === 'moci' ? { expr: 'stern', armL: .9, armR: .9, elbL: 2.2, elbR: 2.2, look: .6 } : { expr: 'happy', look: x < 960 ? .5 : -.5, bob: Math.abs(Math.sin(t * 3 + x)) * 2 }));
  kopian(c, 'nara', 1200, 970, 1.05, { expr: 'stern', prop: 'clip', armL: .5, elbL: 1.0, look: -.6 });
  // Koko lari
  if (t > 98.2) { const kx = lerp(1000, 2300, seg(t, 98.4, 102)); kopian(c, 'koko', kx, 980, 1.05, Object.assign(runPose(t, 13, .9), { expr: 'happy', tilt: .15 })); line(c, kx + 40, 860, kx + 120, 760, '#8a6a42', 10); poly(c, [kx + 110, 740, kx + 150, 770, kx + 120, 800], '#9aa6b0'); for (let i = 0; i < 5; i++) { const k = (t * 2 + i / 5) % 1; circ(c, kx - 60 - k * 200, 960 - k * 20, 20 + k * 30, `rgba(220,200,160,${.5 * (1 - k)})`); } } else kopian(c, 'koko', 760, 980, 1.05, { expr: 'happy', look: .4 });
  c.restore();
  if (t > 86.4 && t < 88.6) chip(c, W / 2, 140, 'DEWAN DELAPAN ARAH', C.yellow, C.navy, 54, back(seg(t, 86.4, 86.7)));
  if (t > 90.5 && t < 94.2) speech(c, 700, 230, 'BIAYANYA DARI MANA?', 56, back(seg(t, 90.5, 90.8)), -1);
  if (t > 94.3 && t < 98.2) { for (let i = 0; i < 4; i++) chip(c, W / 2 + 250, 220 + i * 90, '✓ ' + ['LAHAN', 'BAHAN', 'TENAGA', 'ARAH'][i], '#3fae6a', '#fff', 36, back(seg(t, 95 + i * .4, 95.3 + i * .4))); }
  if (t > 100.22) chip(c, W / 2, 140, 'BANGUNAN PERTAMA: SEKOLAH', '#2f8c8c', '#fff', 56, back(seg(t, 100.22, 100.5)));
}

// ---------- SEKOLAH
function s_plot(c, t) {
  const k = eio(seg(t, 102.3, 108));
  c.save(); cam(c, lerp(1.3, 1.6, k), lerp(SET.x - 80, SCH.x + 80, k), lerp(SET.y, SCH.y + 20, k));
  drawIsland3(c, t, { roads3: i => i === 0 ? seg(t, 105.2, 107.5) : 0 });
  if (t > 102.5) { c.save(); c.setLineDash([16, 12]); c.lineDashOffset = -t * 40; c.strokeStyle = C.yellow; c.lineWidth = 6; c.strokeRect(SCH.x - 150, SCH.y - 110, 300, 200); c.restore(); }
  c.restore();
  if (t > 105.2) chip(c, W / 2, 140, 'DEKAT RUMAH', C.yellow, C.navy, 54, back(seg(t, 105.2, 105.5)));
}
function s_cut(c, t) {
  navyGrid(c, t * 6, 0);
  const z = lerp(1.0, 1.06, seg(t, 108.2, 126.4));
  c.save(); cam(c, z, 960, 640);
  // ground
  rr(c, 200, 800, 1520, 20, 4, '#4a5a9a');
  // walls
  rr(c, 420, 480, 24, 320, 4, '#dfe6ff'); rr(c, 1476, 480, 24, 320, 4, '#dfe6ff');
  rr(c, 420, 560, 24, 130, 2, '#20265a'); rr(c, 1476, 560, 24, 130, 2, '#20265a'); // jendela dua sisi
  // roof
  c.strokeStyle = '#dfe6ff'; c.lineWidth = 20; c.beginPath(); c.moveTo(340, 500); c.lineTo(920, 220); c.moveTo(1000, 220); c.lineTo(1580, 500); c.stroke();
  c.lineWidth = 14; c.beginPath(); c.moveTo(880, 180); c.lineTo(960, 140); c.lineTo(1040, 180); c.stroke();
  // desks + kids
  for (let i = 0; i < 4; i++) { rr(c, 560 + i * 220, 720, 120, 14, 4, '#c58a4b'); line(c, 570 + i * 220, 734, 570 + i * 220, 800, '#c58a4b', 6); line(c, 670 + i * 220, 734, 670 + i * 220, 800, '#c58a4b', 6); mini(c, 620 + i * 220, 800, 1.5, MINI_SHIRT[i], MINI_SKIN[i], { up: Math.sin(t * 2 + i) > .7 ? 1 : 0 }); }
  rr(c, 880, 560, 160, 100, 6, '#2f6b5b'); c.font = F(800, 50); c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('?', 960, 625);
  // hot air out through ridge (atap tinggi)
  const hk = seg(t, 108.4, 108.8);
  if (t < 113.6 && hk > 0) { for (let j = 0; j < 5; j++) { const k = ((t - 108.4) * .8 + j / 5) % 1; const x = 960 + Math.sin(j * 2 + k * 6) * 160 * (1 - k), y = lerp(700, 80, k); c.save(); c.globalAlpha = Math.sin(k * PI); c.strokeStyle = C.orange; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y + 60); c.quadraticCurveTo(x + 24, y + 30, x, y); c.stroke(); poly(c, [x, y - 26, x - 18, y + 4, x + 18, y + 4], C.orange); c.restore(); } dashedRing(c, 960, 170, 90, t); }
  // cross ventilation
  if (t > 113.6 && t < 120.3) { for (let j = 0; j < 4; j++) { const k = ((t - 113.6) * .5 + j / 4) % 1; const x = lerp(250, 1700, k), y = 600 + Math.sin(k * PI * 2 + j) * 30; c.save(); c.globalAlpha = Math.sin(k * PI); arrow(c, x - 120, y, x, y, '#7fd0ff', 12, 30); c.restore(); } }
  // solar
  const sk = seg(t, 120.2, 120.6);
  for (let i = 0; i < 4; i++) { const px = 1090 + i * 100, py = 280 + i * 48; c.save(); c.translate(px, py); c.rotate(.45); rr(c, -40, -40, 84, 22, 3, '#263a6e'); if (sk > 0) rr(c, -40, -40, 84, 22, 3, `rgba(255,220,120,${.6 * sk * (.6 + .4 * Math.sin(t * 5 + i))})`); c.restore(); }
  if (sk > 0) { glow(c, 1600, 120, 120, 'rgba(255,220,120,.7)', sk); }
  // rain tank
  const rk = seg(t, 122.3, 126.3);
  rr(c, 560, 860, 800, 160, 20, 'rgba(160,200,255,.2)'); c.strokeStyle = '#dfe6ff'; c.lineWidth = 6; c.beginPath(); c.roundRect(560, 860, 800, 160, 20); c.stroke();
  if (rk > 0) { rr(c, 566, 1014 - 148 * rk, 788, 148 * rk, 16, 'rgba(91,192,235,.7)'); const r = R(Math.floor(t * 20)); for (let i = 0; i < 20; i++) { const x = r() * 1500 + 200, y = r() * 300; line(c, x, y, x - 6, y + 28, 'rgba(140,200,255,.6)', 3); } line(c, 1360, 940, 1640, 940, '#5bc0eb', 10); for (let i = 0; i < 5; i++) { const fx = 1660 + i * 30; line(c, fx, 820, fx, 780 - i % 2 * 20, '#5fae4a', 8); circ(c, fx, 770 - i % 2 * 20, 14, '#7fcf5a'); } }
  c.restore();
  if (t < 113.6 && t > 108.5) chip(c, W / 2, 80, 'ATAP TINGGI + LUBANG ANGIN', C.orange, '#fff', 44, back(seg(t, 108.5, 108.8)));
  if (t > 113.6 && t < 120.2) chip(c, W / 2, 80, 'JENDELA DUA SISI', '#7fd0ff', C.navy, 46, back(seg(t, 113.6, 113.9)));
  if (t > 120.2 && t < 122.3) chip(c, W / 2, 80, 'PANEL SURYA', C.yellow, C.navy, 46, back(seg(t, 120.2, 120.5)));
  if (t > 122.3) chip(c, W / 2, 80, 'TANGKI AIR HUJAN', '#5bc0eb', C.navy, 46, back(seg(t, 122.3, 122.6)));
}
function s_bell(c, t) {
  if (t < 132.9) {
    c.save(); cam(c, 1.2, 960, 600);
    sky(c, '#7fc0ea', '#ffe8c0'); hills(c, 700, '#7aa87a', 4, 60); ground(c, 800);
    schoolFront(c, 1300, 820, .9, t, '');
    const sw = t > 129 ? Math.sin(t * 8) * .35 * (1 - seg(t, 131, 132.8)) : 0;
    bellObj(c, 760, 840, 1.6, sw);
    kopian(c, 'tiko', 520, 960, 1.1, { expr: 'happy', armR: 2.0, elbR: .6, look: .6 });
    c.restore();
    if (t > 126.6) chip(c, W / 2, 140, 'LONCENG DARI TABUNG BEKAS', C.yellow, C.navy, 48, back(seg(t, 126.6, 126.9)));
    if (t > 129) for (let i = 0; i < 3; i++) { const k = (t * 1.2 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; c.strokeStyle = C.yellow; c.lineWidth = 8; c.beginPath(); c.arc(912, 560, 60 + k * 300, -1, 1); c.stroke(); c.restore(); }
    return;
  }
  // aerial: sound ring reaches beach
  c.save(); cam(c, .55, -150, 600);
  drawIsland3(c, t, { school: 1 });
  const k = eo(seg(t, 133.0, 135.6)); c.save(); c.strokeStyle = C.yellow; c.lineWidth = 14; for (let i = 0; i < 3; i++) { const kk = Math.max(0, k - i * .15); c.globalAlpha = 1 - kk; c.beginPath(); c.arc(SCH.x, SCH.y, 60 + kk * 900, 0, TAU); c.stroke(); } c.restore();
  c.restore();
  chip(c, W / 2, 140, 'TERDENGAR SAMPAI PANTAI', C.yellow, C.navy, 48, back(seg(t, 133.4, 133.7)));
}
function schoolFront(c, x, y, s, t, name) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -420, -260, 840, 260, 8, '#f6f2ea');
  for (let i = 0; i < 6; i++) rr(c, -380 + i * 130, -200, 90, 90, 6, '#9fc8d8');
  rr(c, -50, -150, 100, 150, 6, '#8a5a35');
  poly(c, [-470, -260, 470, -260, 380, -420, -380, -420], '#2f8c8c');
  rr(c, -80, -440, 160, 26, 6, '#263a6e');
  rr(c, -280, -330, 560, 70, 14, C.navy);
  if (name) { c.font = F(800, 46); c.fillStyle = C.yellow; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(name, 0, -294); }
  c.restore();
}
function s_nama(c, t) {
  c.save(); cam(c, lerp(1.0, 1.25, eio(seg(t, 135.7, 149))), 960, lerp(560, 470, seg(t, 135.7, 149)));
  sky(c, '#7fc0ea', '#ffe8c0'); hills(c, 700, '#7aa87a', 4, 60); ground(c, 800);
  schoolFront(c, 960, 860, 1.0, t, t > 142.43 ? 'SEKOLAH KENAPA' : '');
  if (t < 142.43) { c.font = F(800, 70); c.fillStyle = 'rgba(255,255,255,.5)'; c.textAlign = 'center'; c.fillText('?', 960 + Math.sin(t * 3) * 8, 590); }
  crowd(c, 300, 1650, 960, 16, t, 8, 1.5, t > 142.5 ? 1 : 0);
  c.restore();
  if (t > 135.8 && t < 142.3) { const k = back(seg(t, 136.5, 136.9)); c.save(); c.translate(W / 2, 170); c.scale(k, k); rr(c, -620, -60, 1240, 120, 60, 'rgba(27,31,75,.85)'); c.font = F(800, 44); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('"Dunia terlalu luas untuk tidak penasaran"', 0, 3); c.restore(); }
  if (t > 142.43) { const k = back(seg(t, 142.43, 142.8)); c.save(); c.translate(W / 2, 200); c.scale(k, k); c.rotate(-.04); outlined(c, 'SEKOLAH KENAPA', 0, 0, 120, C.yellow, C.navy, 22); c.restore(); confetti(c, 142.5, t, 110, 9, W / 2, 230); }
  if (t > 147.5) { const k = back(seg(t, 147.5, 147.9)); c.save(); c.translate(W - 250, 380); c.scale(k, k); outlined(c, 'KENAPA?', 0, 0, 80, '#fff', C.orange, 16); c.restore(); }
}
function s_kelas(c, t) {
  c.save(); cam(c, 1.15, 960, 600);
  sky(c, '#7fc0ea', '#ffe8c0'); hills(c, 700, '#7aa87a', 4, 60); ground(c, 800);
  schoolFront(c, 1150, 860, .95, t, 'SEKOLAH KENAPA');
  const sw = Math.sin(t * 9) * .35 * (1 - seg(t, 150, 151.5)); bellObj(c, 450, 860, 1.3, t < 151.5 ? sw : 0);
  const rk = seg(t, 151.06, 152.9);
  kopian(c, 'rizki', lerp(500, 1150, rk), 980, .8, Object.assign(rk < 1 ? runPose(t, 12, .8) : { expr: 'happy' }, { expr: 'happy' }));
  kopian(c, 'rizka', lerp(400, 1080, rk), 990, .75, Object.assign(rk < 1 ? runPose(t + .3, 12, .8) : { expr: 'happy' }, { expr: 'happy' }));
  kopian(c, 'ibu', 700, 990, 1.0, { expr: 'happy', armL: .9, elbL: 1.6, armR: .9, elbR: 1.6, look: .3 });
  baby(c, 690, 860, .8, t);
  if (t > 153.07) zzz(c, 760, 820, t);
  c.restore();
  if (t > 149.2 && t < 151) for (let i = 0; i < 3; i++) { const k = (t * 1.5 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; c.strokeStyle = C.yellow; c.lineWidth = 8; c.beginPath(); c.arc(520, 430, 50 + k * 220, -1, 1); c.stroke(); c.restore(); }
  if (t > 153.07) chip(c, 800, 160, 'AL MASIH TIDUR 😴'.replace(' 😴', ''), '#fff', C.navy, 40, back(seg(t, 153.07, 153.4)));
}

// ---------- PASAR
function s_dawn(c, t) {
  const k = seg(t, 156.3, 164);
  c.save(); cam(c, lerp(1.25, 1.05, k), 960, 600);
  sky(c, mixc('#2b2f6e', '#f3a06a', k), mixc('#b0567a', '#ffe2b0', k));
  glow(c, 1400, 760, 500 * k + 100, `rgba(255,200,130,${.3 + .5 * k})`); circ(c, 1400, 780 - 160 * k, 70, '#ffe2a8');
  hills(c, 740, mixc('#2f3d5a', '#7aa87a', k), 4, 60); ground(c, 820, mixc('#3a4a3a', '#8cbf6a', k), mixc('#2a3a2a', '#6aa356', k));
  c.save(); c.setLineDash([18, 14]); c.strokeStyle = C.yellow; c.lineWidth = 6; c.beginPath(); c.ellipse(1150, 900, 380, 80, 0, 0, TAU); c.stroke(); c.restore();
  rr(c, 600, 880, 120, 70, 6, '#a8743f');
  kopian(c, 'bubu', 660, 900, 1.15, { expr: k > .6 ? 'happy' : 'sleep', legL: -1.2, legR: -1.2, look: .6, bob: Math.sin(t * 2) * 2 });
  if (k < .6) zzz(c, 720, 560, t);
  c.restore();
  chip(c, W / 2, 140, 'BANGUNAN KEDUA: PASAR', C.orange, '#fff', 56, back(seg(t, 156.35, 156.7)) * (1 - seg(t, 158.2, 158.4)));
  if (t > 158.4) chip(c, W / 2, 140, 'MENUNGGU DARI SUBUH', '#fff', C.navy, 50, back(seg(t, 158.4, 158.7)));
}
const DIRS = ['U', 'TL', 'T', 'TG', 'S', 'BD', 'B', 'BL'];
function s_pasar(c, t) {
  const k = eio(seg(t, 164.1, 167.5));
  const z = t < 169.6 ? lerp(.9, 1.6, k) : lerp(1.6, 2.4, eio(seg(t, 169.6, 171.5)));
  c.save(); cam(c, z, lerp(-80, MKT.x, k), lerp(700, MKT.y - 10, k));
  drawIsland3(c, t, { school: 1, market: back(seg(t, 164.4, 165.2)), roads3: i => i === 0 ? 1 : seg(t, 165, 166.5) });
  if (t > 164.2 && t < 167.8) { c.save(); c.setLineDash([16, 12]); c.lineDashOffset = -t * 40; c.strokeStyle = C.yellow; c.lineWidth = 5; c.beginPath(); c.moveTo(SET.x, SET.y + 60); c.lineTo(MKT.x, MKT.y); c.lineTo(0, SOUTH[1] - 100); c.stroke(); c.restore(); }
  if (t > 169.6) DIRS.forEach((d, i) => { const a = i * PI / 4 - PI / 2, kk = back(seg(t, 170 + i * .25, 170.3 + i * .25)); if (kk <= 0) return; const x = MKT.x + Math.cos(a) * 170, y = MKT.y + Math.sin(a) * 90; circ(c, x, y, 22 * kk, C.navy); c.font = F(800, 18 * kk); c.fillStyle = C.yellow; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(d, x, y + 1); });
  if (t > 174.47) { const r = R(3); for (let i = 0; i < 16; i++) { const a = r() * TAU, d = 260 + r() * 80, p = ((t - 174.5) * .5 + r()) % 1; const x0 = MKT.x + Math.cos(a) * d, y0 = MKT.y + Math.sin(a) * d * .55; const x = lerp(x0, MKT.x + Math.cos(a) * 150, p), y = lerp(y0, MKT.y + Math.sin(a) * 80, p); circ(c, x, y, 6, MINI_SHIRT[i % 10]); } }
  c.restore();
  if (t > 167.9 && t < 174.4) chip(c, W / 2, 140, '8 GERBANG · 8 ARAH MATA ANGIN', C.yellow, C.navy, 48, back(seg(t, 167.9, 168.2)));
  if (t > 174.47 && t < 180.3) chip(c, W / 2, 140, 'SELALU ADA PINTU MENGHADAP RUMAHMU', '#fff', C.navy, 44, back(seg(t, 174.5, 174.8)));
  if (t > 180.43) { const kk = back(seg(t, 180.43, 180.8)); c.save(); c.translate(W / 2, 190); c.scale(kk, kk); c.rotate(-.03); outlined(c, 'PASAR DELAPAN PENJURU', 0, 0, 100, C.yellow, C.navy, 20); c.restore(); confetti(c, 180.5, t, 100, 11, W / 2, 220); }
}
function s_lapak(c, t) {
  const second = t > 192.5;
  c.save(); cam(c, 1.1, second ? 1300 : 700, 600);
  sky(c, '#7fc0ea', '#ffe8c0');
  c.fillStyle = '#e8dcb5'; c.fillRect(-500, 760, 3000, 600);
  for (let i = 0; i < 14; i++) poly(c, [-400 + i * 200, 120, -200 + i * 200, 120, -230 + i * 200, 200, -370 + i * 200, 200], i % 2 ? '#ef6f3c' : '#f9efe0');
  fishStall(c, 700, 860, 1.4); foodStall(c, 1300, 860, 1.4);
  kopian(c, 'jabrik', 600, 980, 1.15, { expr: 'talk', talk: .35 * Math.abs(Math.sin(t * 9)), armR: 1.8 + Math.sin(t * 3) * .4, elbR: .4, look: .4 });
  for (let i = 0; i < 4; i++) mini(c, 820 + i * 80, 1010, 1.9, MINI_SHIRT[i + 3], MINI_SKIN[i], { mouth: t > 189 && i % 2 });
  const chew = Math.abs(Math.sin(t * 12));
  kopian(c, 'bubu', 1400, 990, 1.15, { expr: t > 195 ? 'happy' : 'talk', talk: chew * .5, armL: 1.6 + chew * .3, elbL: 1.2, look: -.3 });
  c.restore();
  if (t < 192.5) { chip(c, W / 2, 140, 'LAPAK IKAN PERTAMA · SISI SELATAN', '#3f7fbf', '#fff', 44, back(seg(t, 182.6, 182.9))); if (t > 187.29) speech(c, 640, 330, '"Dulu, waktu laut masih…"', 44, back(seg(t, 187.3, 187.6)), -1); }
  else { chip(c, W / 2, 140, 'LAPAK MAKANAN · SISI TENGGARA', C.orange, '#fff', 44, back(seg(t, 192.6, 192.9))); if (t > 194.66) chip(c, 1300, 320, 'MENCICIPI = PENGAWASAN', C.yellow, C.navy, 40, back(seg(t, 195.5, 195.8)), .05); }
}
function s_trans(c, t) {
  if (t < 204.6) {
    navyGrid(c, 0, t * 10);
    const k = back(seg(t, 201.0, 201.5));
    if (k > 0) { noteARAH(c, W / 2 - 260, 560, 1.6 * k, '1'); noteARAH(c, W / 2 + 140, 520, 1.6 * k, '5'); for (let i = 0; i < 3; i++) coin(c, W / 2 + 480 + i * 70, 700 - i * 20, 46 * k); }
    chip(c, W / 2, 150, t < 201 ? 'SESUATU YANG BERSEJARAH…' : 'MATA UANG ARAH DIPAKAI', C.yellow, C.navy, 52, back(seg(t, 197.9, 198.2)));
    return;
  }
  const flash = t > 208.9 && t < 209.2;
  c.save(); cam(c, lerp(1.1, 1.3, seg(t, 204.6, 212)), 960, 600);
  sky(c, '#7fc0ea', '#ffe8c0'); c.fillStyle = '#e8dcb5'; c.fillRect(-500, 760, 3000, 600);
  foodStall(c, 1150, 860, 1.4);
  kopian(c, 'bubu', 1250, 990, 1.1, { expr: 'happy', armR: 1.3, elbR: .3, look: -.6 });
  kopian(c, 'gavendra', 760, 990, .95, { expr: 'happy', armR: 1.5, elbR: .2, look: .6 }); chip(c, 760, 640, 'GAVENDRA', C.yellow, C.navy, 30, 1);
  const ck = eo(seg(t, 205.5, 207)); for (let i = 0; i < 3; i++) coin(c, lerp(880, 1060, ck) + i * 24, lerp(780, 840, ck) - Math.sin(ck * PI) * 80, 22);
  if (t > 206.5) { const k = eo(seg(t, 206.5, 207.6)); poly(c, [lerp(1060, 860, k) - 40, 830, lerp(1060, 860, k) + 40, 830, lerp(1060, 860, k) + 30, 790, lerp(1060, 860, k) - 30, 790], '#7fae3f'); }
  c.restore();
  if (t > 206.5) chip(c, W / 2, 150, '1 NASI BUNGKUS = 3 ARAH', C.yellow, C.navy, 52, back(seg(t, 206.5, 206.8)));
  if (t > 208.9) { c.fillStyle = `rgba(110,80,40,${.25 * seg(t, 208.9, 209.4)})`; c.fillRect(0, 0, W, H); const k = back(seg(t, 209.0, 209.4)); c.save(); c.translate(W / 2, 300); c.scale(k, k); c.rotate(-.08); c.strokeStyle = C.red; c.lineWidth = 12; c.strokeRect(-420, -70, 840, 140); c.font = F(800, 64); c.fillStyle = C.red; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('TRANSAKSI PERTAMA', 0, 4); c.restore(); }
  if (flash) { c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(0, 0, W, H); }
}
function s_bolo(c, t) {
  navyGrid(c, 0, t * 8);
  c.save(); c.translate(W / 2, H / 2 + 40);
  // top-down market
  circ(c, 0, 0, 380, '#f9efe0'); circ(c, 0, 0, 220, '#e8dcb5');
  for (let i = 0; i < 8; i++) { const a = i * PI / 4 - PI / 2; c.save(); c.rotate(a); rr(c, 210, -36, 190, 72, 6, C.navy); c.restore(); const x = Math.cos(a) * 430, y = Math.sin(a) * 430; c.font = F(800, 34); c.fillStyle = i === 0 ? C.yellow : '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(DIRS[i], x, y); }
  compassIcon(c, 0, 0, 70, '#2f6fb5');
  // Pak Bolo path: masuk utara, keliling, keluar utara
  const p = seg(t, 213.8, 217.9);
  let x, y;
  if (p < .2) { x = 0; y = lerp(-520, -260, p / .2); } else if (p < .85) { const a = -PI / 2 + (p - .2) / .65 * TAU; x = Math.cos(a) * 280; y = Math.sin(a) * 280; } else { x = 0; y = lerp(-260, -520, (p - .85) / .15); }
  c.save(); c.translate(x, y); c.scale(.45, .45); kopian(c, 'bolo', 0, 120, 1, { expr: 'proud', armL: 1.6, look: -.5, shadow: false }); c.restore();
  if (t > 218.2) { c.font = F(800, 120); c.fillStyle = C.yellow; c.textAlign = 'center'; c.fillText('?', 60, -560 + Math.sin(t * 4) * 6); }
  c.restore();
  chip(c, W / 2, 80, t < 218.2 ? 'MASUK UTARA… KELUAR UTARA' : '8 GERBANG, TETAP TERSESAT', t < 218.2 ? '#fff' : C.red, t < 218.2 ? C.navy : '#fff', 46, back(seg(t, 213.9, 214.2)));
}

// ---------- PETA & ATURAN
function mapScene3(c, t) {
  c.fillStyle = '#efe4c8'; c.fillRect(-3000, -3000, 6000, 6000);
  c.save(); c.strokeStyle = 'rgba(80,120,160,.25)'; c.lineWidth = 3; for (let i = 1; i < 5; i++) { islPath(c, 1 + i * .05); c.stroke(); } c.restore();
  islPath(c, 1); c.fillStyle = '#f6edd3'; c.fill(); c.strokeStyle = C.navy; c.lineWidth = 7; c.stroke();
  for (const m of MOUNTS) for (let j = 0; j < 3; j++) { const x = m[0] - 60 + j * 60, y = m[1] + (j % 2) * 30; c.strokeStyle = '#6b5a45'; c.lineWidth = 5; c.beginPath(); c.moveTo(x - 50, y + 40); c.lineTo(x, y - 40); c.lineTo(x + 50, y + 40); c.stroke(); }
  ell(c, LAKE.x, LAKE.y, LAKE.rx, LAKE.ry, '#a8d4e0');
  c.save(); c.strokeStyle = '#8a7a60'; c.lineWidth = 8; c.lineCap = 'round'; ROADS.forEach(p => strokePath(c, p, 1)); ROADS3.forEach(p => strokePath(c, p, 1)); c.restore();
  const P = [[SET.x, SET.y, 'PERMUKIMAN', 225.4, '#c9623f'], [HOS.x, HOS.y, 'RUMAH SAKIT', 226.6, '#3f7fbf'], [SCH.x, SCH.y, 'SEKOLAH KENAPA', 227.8, '#2f8c8c'], [MKT.x, MKT.y, 'PASAR DELAPAN PENJURU', 229.0, C.orange]];
  P.forEach(([x, y, l, t0, col]) => { const k = back(seg(t, t0, t0 + .35)); if (k <= 0 && t > 225) return; const kk = t < 225 ? 1 : k; circ(c, x, y, 70 * kk, col); circ(c, x, y, 40 * kk, '#fff'); if (kk > .5) { c.font = F(800, 58); c.fillStyle = C.navy; c.textAlign = 'center'; const ly = l === 'SEKOLAH KENAPA' ? y - 100 : y + 120; c.fillText(l, l === 'SEKOLAH KENAPA' ? x - 120 : x, ly); } });
  // empty plot for balai warga
  const BW = { x: -60, y: 200 };
  if (t > 247) { const pk = .5 + .5 * Math.sin(t * 6); c.save(); c.setLineDash([16, 12]); c.strokeStyle = `rgba(239,111,60,${.5 + .5 * pk})`; c.lineWidth = 8; c.beginPath(); c.arc(BW.x, BW.y, 90, 0, TAU); c.stroke(); c.restore(); c.font = F(800, 110); c.fillStyle = C.orange; c.textAlign = 'center'; c.fillText('?', BW.x, BW.y + 38); c.font = F(800, 34); c.fillText('BALAI WARGA', BW.x, BW.y + 140); }
}
function s_peta(c, t) {
  if (t < 231.6 || t > 245.7) {
    const z = t < 231.6 ? lerp(.44, .5, seg(t, 221.4, 231.6)) : lerp(.5, .62, eio(seg(t, 247, 249)));
    const cy = t < 231.6 ? 300 : lerp(300, 320, seg(t, 247, 249));
    c.save(); cam(c, z, t > 245.7 ? 250 : -60, cy); mapScene3(c, t); c.restore();
    if (t < 225.3) chip(c, W / 2, 80, 'PETA WARUNGKOPIA · +2 TITIK', C.yellow, C.navy, 48, back(seg(t, 221.6, 221.9)));
    if (t > 245.7) checklist(c, t, W - 380, 300);
    if (t > 247.03) chip(c, W / 2, 80, 'TINGGAL 1 BANGUNAN LAGI', C.orange, '#fff', 56, back(seg(t, 247.03, 247.4)));
    return;
  }
  // Nara & catatan
  c.save(); cam(c, 1.1, 960, 600);
  sky(c, '#141a45', '#3b3a7a'); const rs = R(4); for (let i = 0; i < 80; i++) circ(c, rs() * 2200 - 100, rs() * 600, 1.5 + rs() * 2, `rgba(255,255,255,${.3 + .5 * Math.abs(Math.sin(t * 2 + i))})`);
  ground(c, 820, '#3a4a6a', '#2a3456'); glow(c, 700, 760, 260, 'rgba(255,210,120,.4)');
  kopian(c, 'nara', 700, 980, 1.3, { expr: t > 234.7 ? 'wow' : 'stern', prop: 'clip', armL: .5, elbL: 1.0, look: .4 });
  c.restore();
  checklist(c, t, 1280, 330);
  if (t > 242.65) chip(c, 1280, 820, 'TEMPAT WARGA BERKUMPUL & MEMUTUSKAN', '#fff', C.navy, 30, back(seg(t, 242.7, 243)));
}
function checklist(c, t, x, y) {
  const k = back(seg(t, 234.7, 235.1)); if (k <= 0) return;
  c.save(); c.translate(x, y); c.scale(k, k);
  rr(c, -320, -110, 640, 470, 30, 'rgba(255,255,255,.95)');
  c.font = F(800, 34); c.fillStyle = C.navy; c.textAlign = 'center'; c.fillText('SYARAT JADI IBU KOTA', 0, -50);
  [['PASAR', 239.4], ['SEKOLAH', 240.2], ['BALAI WARGA', 241.0]].forEach(([l, t0], i) => {
    const yy = 30 + i * 100, done = i < 2 && t > (i ? 246.2 : 245.8); const show = seg(t, t0 - .2, t0);
    c.globalAlpha = show; rr(c, -260, yy - 34, 68, 68, 12, done ? '#3fae6a' : (i === 2 ? (Math.sin(t * 6) > 0 ? '#ffe0d0' : '#fff') : '#eef')); c.strokeStyle = i === 2 ? C.orange : C.navy; c.lineWidth = 5; c.strokeRect(-260, yy - 34, 68, 68);
    if (done) { c.strokeStyle = '#fff'; c.lineWidth = 10; c.beginPath(); c.moveTo(-246, yy); c.lineTo(-230, yy + 16); c.lineTo(-204, yy - 18); c.stroke(); }
    c.font = F(800, 44); c.fillStyle = C.navy; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(l, -160, yy + 2); c.globalAlpha = 1;
  });
  c.restore();
}

// ---------- CTA
function s_cta(c, t) {
  sky(c, '#20265a', '#3b3a7a');
  const rs = R(5); for (let i = 0; i < 80; i++) circ(c, rs() * W, rs() * 600, 1.5 + rs() * 2, `rgba(255,255,255,${.3 + .5 * Math.abs(Math.sin(t * 2 + i))})`);
  c.fillStyle = '#2b2f55'; c.fillRect(0, 820, W, 300);
  crowd(c, 120, 1500, 920, 24, t, 12, 1.9, 1);
  // newcomer
  const nk = eo(seg(t, 252.8, 255.5));
  c.save(); c.globalAlpha = .4 + .6 * nk; mini(c, lerp(2100, 1680, nk), 930, 2.4, '#ffd166', '#d9a07a', { leg: nk < 1 ? Math.sin(t * 12) * .9 : 0, up: nk >= 1 ? 1 : 0 }); c.restore();
  if (nk > .9) chip(c, 1680, 640, 'KAMU?', C.yellow, C.navy, 40, back(seg(t, 255.3, 255.6)));
  subscribeBtn(c, W / 2, 210, 1.4, back(seg(t, 249.8, 250.2)) * (t > 261 ? 1 - seg(t, 261, 261.4) : 1));
  if (t > 252.75 && t < 261) { const n = t < 255.5 ? 2536 : 2537; chip(c, W / 2, 380, 'WARGA KE-' + n.toLocaleString('id-ID'), n === 2537 ? C.yellow : '#fff', C.navy, 60, back(seg(t, 252.8, 253.1))); if (t > 255.5) confetti(c, 255.5, t, 80, 13, W / 2, 380); }
  if (t > 261.2) speech(c, W / 2, 260, 'BALAI WARGA KITA MAU SEPERTI APA?', 52, back(seg(t, 261.2, 261.6)), 1);
}
function s_motto(c, t) {
  c.save(); cam(c, lerp(.5, .58, seg(t, 266.4, 270.8)), -100, 300);
  drawIsland3(c, t, { school: 1, market: 1, lit: () => 1, hosLit: 1, lampOn: () => 1, lit3: 1 });
  nightOverlay(c, .9);
  c.save(); c.globalCompositeOperation = 'lighter'; LAMPS.forEach(l => glow(c, l[0], l[1] - 30, 60, 'rgba(255,210,120,.85)')); for (const h of HOUSES) glow(c, h.x + 5, h.y - 18, 55, 'rgba(255,200,110,.7)'); glow(c, HOS.x, HOS.y - 50, 220, 'rgba(255,210,130,.65)'); glow(c, SCH.x, SCH.y - 30, 200, 'rgba(255,210,130,.6)'); glow(c, MKT.x, MKT.y, 220, 'rgba(255,210,130,.6)'); c.restore();
  c.restore();
  const k = back(seg(t, 266.5, 266.9));
  c.save(); c.translate(W / 2, H / 2 - 40); c.scale(k, k);
  outlined(c, 'DUNIA TERLALU LUAS', 0, -60, 90, '#fff', C.navy, 18); outlined(c, 'UNTUK TIDAK PENASARAN', 0, 50, 90, C.yellow, C.navy, 18);
  c.restore();
  const fo = seg(t, 270.3, 270.8); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
}
