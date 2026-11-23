// ===== scenes
const SC = [
  ['s1', 0, 5.2], ['s2', 5.2, 8.4], ['s3', 8.4, 12.7], ['s4', 12.7, 17.2], ['s5', 17.2, 22.2], ['s6', 22.2, 29.2],
  ['s7', 29.2, 34.8], ['s8a', 34.8, 40.0], ['s8b', 40.0, 45.9], ['s9', 45.9, 50.0], ['s10', 50.0, 53.4], ['s11', 53.4, 58.3]];
const END = 58.3;

// ---------- S1 beach landing, golden sunrise
function s1(c, t) {
  const z = lerp(1.0, 1.14, eo(seg(t, 0, 1.4))) + t * .01; const [sx, sy] = shake(t, .22, .45, 22);
  c.save(); cam(c, z, 540, 1150, 0, sx, sy);
  const g = c.createLinearGradient(0, -200, 0, 800); g.addColorStop(0, '#4f6fb8'); g.addColorStop(.55, '#f3a27a'); g.addColorStop(1, '#ffd9a0');
  c.fillStyle = g; c.fillRect(-400, -400, 1900, 1200);
  glow(c, 820, 700, 520, 'rgba(255,230,160,.9)'); circ(c, 820, 712, 70, '#fff2c4');
  cloud(c, 200 + t * 12, 300, 1.0, '#ffe6cf', .9, 'rgba(240,150,120,.4)'); cloud(c, 760 + t * 8, 180, .8, '#ffe6cf', .8, 'rgba(240,150,120,.4)'); cloud(c, -60 + t * 15, 520, .7, '#ffe2c8', .8, 'rgba(240,150,120,.4)');
  // sea
  const sg = c.createLinearGradient(0, 760, 0, 1160); sg.addColorStop(0, '#3a86a8'); sg.addColorStop(1, '#43b4b4'); c.fillStyle = sg; c.fillRect(-400, 760, 1900, 420);
  for (let i = 0; i < 14; i++) { const y = 790 + i * 26, w = 30 + i * 8; ell(c, 820 + Math.sin(t * 2 + i) * 20, y, w, 3 + i * .3, 'rgba(255,230,170,.55)'); }
  const rw = R(3); for (let i = 0; i < 40; i++) { const y = 780 + rw() * 360, x = (rw() * 1600 - 300 + t * 20) % 1700 - 300; line(c, x, y, x + 30 + rw() * 40, y, 'rgba(255,255,255,.35)', 3); }
  // distant boats
  boat(c, 180 - t * 6, 830 + t * 10, .35, Math.sin(t * 2) * .03, 3, 4);
  boat(c, 660 + t * 4, 880 + t * 14, .45, Math.sin(t * 2.3) * .04, 3, 7);
  // sand
  const bg = c.createLinearGradient(0, 1120, 0, 1950); bg.addColorStop(0, '#f6dfae'); bg.addColorStop(1, '#e2bd84'); c.fillStyle = bg;
  c.beginPath(); c.moveTo(-400, 1150); for (let x = -400; x <= 1500; x += 40) c.lineTo(x, 1140 + Math.sin(x * .01 + t * 2) * 10); c.lineTo(1500, 2300); c.lineTo(-400, 2300); c.fill();
  // foam
  c.save(); c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 10; c.beginPath(); for (let x = -400; x <= 1500; x += 30) { const y = 1145 + Math.sin(x * .02 + t * 3) * 8; x === -400 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); c.restore();
  // landing boats at shore
  boat(c, 250, 1150, 1.1, Math.sin(t * 2) * .02, 0, 1); boat(c, 830, 1170, 1.25, Math.sin(t * 2.2 + 1) * .02, 0, 2);
  particlesSplash(c, 250, 1150, .2, t, 18, 9); particlesSplash(c, 830, 1170, .25, t, 20, 12);
  // running crowd
  const rc = R(42); const runners = [];
  for (let i = 0; i < 70; i++) { const ox = rc() < .5 ? 250 : 830, t0 = rc() * 4.2 - .6, tx = 40 + rc() * 1000, sp = .28 + rc() * .25; runners.push({ ox, t0, tx, sp, sh: MINI_SHIRT[i % 10], sk: MINI_SKIN[i % 5], ph: rc() * 6 }); }
  const drawn = [];
  for (const r of runners) { const k = (t - r.t0) * r.sp; if (k < 0) continue; const kk = Math.min(k, 1.15); const y = 1140 + kk * 700; const x = lerp(r.ox + (r.tx - r.ox) * .1, r.tx, kk); drawn.push([y, x, r, k]); }
  drawn.sort((a, b) => a[0] - b[0]);
  for (const [y, x, r, k] of drawn) { const s = .9 + (y - 1140) / 700 * 1.6; mini(c, x, y, s, r.sh, r.sk, { leg: Math.sin(t * 14 + r.ph) * .9, bob: Math.abs(Math.sin(t * 14 + r.ph)) * 6, up: k > 1 ? 1 : Math.max(0, Math.sin(t * 7 + r.ph)), flip: r.tx < r.ox ? -1 : 1 }); }
  // Koko leap
  const jk = seg(t, 1.0, 2.6); const jy = Math.sin(jk * PI) * 260;
  const kx = lerp(560, 520, jk), ky = lerp(1560, 1640, jk) - jy;
  const pose = jk > 0 && jk < 1 ? { armL: 2.6, armR: 2.6, elbL: .2, elbR: .2, legL: .6, legR: .5, expr: 'wow' } : t < 1 ? Object.assign(runPose(t, 12), { expr: 'happy' }) : { armL: 2.4 + Math.sin(t * 10) * .3, armR: 2.6, expr: 'happy', talk: 0 };
  if (jk > 0 && jk < 1) ell(c, 520, 1640, 60, 14, 'rgba(0,0,0,.15)');
  kopian(c, 'koko', kx, ky, 2.1, Object.assign({ shadow: !(jk > 0 && jk < 1) }, pose));
  particlesSplash(c, 520, 1640, 2.6, t, 14, 31, 'rgba(230,200,140,.9)');
  // foreground palm leaves
  palm(c, -60, 2050, 2.0, t, 0); palm(c, 1180, 2100, -2.0, t, 2);
  c.restore();
  // warm grade
  c.fillStyle = 'rgba(255,170,90,.08)'; c.fillRect(0, 0, W, H);
}

// ---------- S2 aerial rise
function s2(c, t) {
  const k = eio(seg(t, 5.2, 8.0));
  const z = lerp(3.4, .66, Math.pow(k, .8)), cy = lerp(SOUTH[1] - 120, 40, k);
  c.save(); cam(c, z, 0, cy);
  drawIsland(c, t, { roads: 0, park: 0, lamps: 0, hospital: 0, houses: () => 0 });
  // crowd dots on beach
  const r = R(8); for (let i = 0; i < 260; i++) { const x = (r() - .5) * 420, y = SOUTH[1] - 90 - r() * 120; circ(c, x, y, 5, MINI_SHIRT[i % 10]); circ(c, x, y - 6, 4, MINI_SKIN[i % 5]); }
  for (let i = 0; i < 4; i++) boat(c, -200 + i * 140, SOUTH[1] + 30 + (i % 2) * 30, .35, 0, 0, i);
  // cloud shadows
  for (let i = 0; i < 3; i++) ell(c, -500 + i * 500 + t * 30, -300 + i * 500, 260, 140, 'rgba(10,30,60,.12)');
  c.restore();
  // foreground clouds rushing past
  const fk = seg(t, 5.2, 7.6);
  if (fk < 1) { const sp = eo(fk); cloud(c, lerp(260, -500, sp), lerp(900, 2400, sp), lerp(3, 6, sp), '#ffffff', .9 * (1 - fk)); cloud(c, lerp(860, 1600, sp), lerp(1200, 2600, sp), lerp(3.5, 7, sp), '#ffffff', .85 * (1 - fk)); }
  cloud(c, 900 - (t - 5.2) * 40, 330, 1.2, '#fff', .55); cloud(c, 120 - (t - 5.2) * 30, 1650, 1.4, '#fff', .45);
}

// ---------- S3 empty island scan
function s3(c, t) {
  const k = seg(t, 8.4, 12.7);
  const rot = lerp(-.05, .05, sm(k)), z = lerp(.66, .74, k);
  const [sx, sy] = shake(t, 11.3, .4, 16);
  c.save(); cam(c, z, 0, 60, rot, sx, sy);
  drawIsland(c, t, { roads: 0, park: 0, lamps: 0, hospital: 0, houses: () => 0 });
  const r = R(8); for (let i = 0; i < 260; i++) { const x = (r() - .5) * 420, y = SOUTH[1] - 90 - r() * 120; circ(c, x, y, 5, MINI_SHIRT[i % 10]); circ(c, x, y - 6, 4, MINI_SKIN[i % 5]); }
  for (let i = 0; i < 3; i++) ell(c, -600 + i * 500 + t * 30, -500 + i * 600, 280, 150, 'rgba(10,30,60,.14)');
  // scanning ring in world space
  const sk = seg(t, 8.7, 11.2);
  if (sk > 0 && sk < 1) { const a = sk * TAU * .9 - PI / 2; const x = Math.cos(a) * 380, y = Math.sin(a) * 620; dashedRing(c, x, y, 150, t, C.yellow, 10); c.font = F(800, 70); c.fillStyle = C.yellow; c.textAlign = 'center'; c.fillText('?', x, y + 24); }
  c.restore();
  // desaturate/dim
  c.fillStyle = `rgba(40,45,80,${.22 * sm(seg(t, 9.6, 10.6))})`; c.fillRect(0, 0, W, H);
  const ck = seg(t, 11.3, 11.6);
  if (ck > 0) { chip(c, W / 2, 760, 'RUMAH: 0', C.red, '#fff', 96, back(ck)); }
}

// ---------- S4 night beach
function s4(c, t) {
  let z, cx, cy;
  if (t < 14.6) { const k = seg(t, 12.7, 14.6); z = 1.25; cx = lerp(330, 700, sm(k)); cy = 1360; }
  else { const k = eio(seg(t, 14.6, 16.0)); z = lerp(1.25, 2.3, k); cx = lerp(700, 430, k); cy = lerp(1360, 1470, k); }
  c.save(); cam(c, z, cx, cy);
  const g = c.createLinearGradient(0, 300, 0, 900); g.addColorStop(0, '#141a45'); g.addColorStop(1, '#3b3a7a'); c.fillStyle = g; c.fillRect(-600, 0, 2300, 900);
  const rs = R(2); for (let i = 0; i < 120; i++) { const x = rs() * 2200 - 500, y = 320 + rs() * 460; circ(c, x, y, 1.5 + rs() * 2, `rgba(255,255,255,${.4 + .6 * Math.abs(Math.sin(t * 2 + i))})`); }
  glow(c, 230, 520, 240, 'rgba(220,230,255,.5)'); circ(c, 230, 520, 60, '#f4f1ea'); circ(c, 252, 505, 52, '#141a45');
  const sg = c.createLinearGradient(0, 860, 0, 1200); sg.addColorStop(0, '#1d2a5c'); sg.addColorStop(1, '#25407a'); c.fillStyle = sg; c.fillRect(-600, 860, 2300, 360);
  for (let i = 0; i < 9; i++) ell(c, 230 + Math.sin(t + i) * 10, 880 + i * 30, 30 + i * 6, 3, 'rgba(220,230,255,.35)');
  const bg = c.createLinearGradient(0, 1180, 0, 1950); bg.addColorStop(0, '#4a4b7e'); bg.addColorStop(1, '#3a3a6a'); c.fillStyle = bg; c.fillRect(-600, 1190, 2300, 900);
  c.save(); c.strokeStyle = 'rgba(200,210,255,.5)'; c.lineWidth = 6; c.beginPath(); for (let x = -600; x <= 1700; x += 30) { const y = 1195 + Math.sin(x * .02 + t * 2) * 6; x === -600 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); c.restore();
  palm(c, 1150, 1260, 1.6, t, 1, true); palm(c, -120, 1240, -1.5, t, 3, true);
  // campfire
  const fx = 760, fy = 1330; const fl = .85 + .15 * Math.sin(t * 23) * Math.sin(t * 7);
  glow(c, fx, fy - 30, 520 * fl, 'rgba(255,150,70,.42)');
  for (let i = 0; i < 4; i++) line(c, fx - 40 + i * 22, fy + 10, fx + 30 - i * 18, fy - 6, '#5a3a2a', 10);
  c.fillStyle = '#ff9a3c'; c.beginPath(); c.moveTo(fx - 34, fy); c.quadraticCurveTo(fx - 30, fy - 70 * fl, fx, fy - 110 * fl); c.quadraticCurveTo(fx + 30, fy - 70 * fl, fx + 34, fy); c.fill();
  c.fillStyle = '#ffd166'; c.beginPath(); c.moveTo(fx - 18, fy); c.quadraticCurveTo(fx - 14, fy - 40 * fl, fx + 2, fy - 64 * fl); c.quadraticCurveTo(fx + 16, fy - 40 * fl, fx + 18, fy); c.fill();
  const re = R(Math.floor(t * 8)); for (let i = 0; i < 5; i++) circ(c, fx + (re() - .5) * 60, fy - 120 - re() * 120, 3, 'rgba(255,200,100,.8)');
  // sleeping rows
  const r = R(17);
  for (let row = 0; row < 3; row++) for (let i = 0; i < 9; i++) { const x = -150 + i * 150 + row * 60 + r() * 30, y = 1290 + row * 95; if (Math.abs(x - fx) < 120 && row < 2) continue; if (Math.abs(x - 430) < 130 && row === 2) continue; miniLying(c, x, y, 1.1 + row * .15, MINI_SHIRT[(i + row * 3) % 10], MINI_SKIN[(i + row) % 5], t * 2 + i); }
  // Moci sitting scratching head
  kopian(c, 'moci', 190, 1470, 1.35, { armR: 2.9, elbR: 1.2 + Math.sin(t * 14) * .25, armL: .2, expr: 'worried', look: .5, legL: -1.2, legR: -1.2 });
  // Mimi whispering
  kopian(c, 'mimi', 1010, 1470, 1.35, { armL: 2.1, elbL: 1.6, expr: 'talk', talk: .3 + .3 * Math.abs(Math.sin(t * 12)), look: -.8, flip: -1 });
  mini(c, 900, 1470, 2.0, '#4a6fa5', '#d9a07a', { up: 0 });
  // Bubu hugging rice sack
  kopian(c, 'bubu', 430, 1560, 1.7, { expr: 'sleep', armL: .9, armR: .9, elbL: 1.4, elbR: 1.4, prop: 'sack', bob: Math.sin(t * 2.4) * 3 });
  zzz(c, 510, 1180, t);
  // fire light on scene
  c.restore();
  c.save(); c.globalCompositeOperation = 'soft-light'; c.fillStyle = 'rgba(255,140,60,.18)'; c.fillRect(0, 0, W, H); c.restore();
  // iris close
  const ik = seg(t, 16.85, 17.2); if (ik > 0) iris(c, W / 2, H / 2 - 80, lerp(1300, 0, eio(ik)));
}

// ---------- S5 construction kickoff (side, morning)
function s5(c, t) {
  // pan position
  let pan;
  if (t < 19.0) pan = lerp(0, 60, seg(t, 17.2, 19));
  else if (t < 19.45) pan = lerp(60, 1650, eio(seg(t, 19.0, 19.45)));
  else pan = lerp(1650, 2050, seg(t, 19.45, 22.2));
  const z = t < 19 ? lerp(1.15, 1.25, seg(t, 17.2, 19)) : 1.05;
  const blur = t > 19.0 && t < 19.45 ? Math.sin(seg(t, 19.0, 19.45) * PI) : 0;
  c.save(); if (blur > 0.02) c.filter = `blur(${(blur * 18).toFixed(1)}px)`;
  const g = c.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#5aa8e6'); g.addColorStop(1, '#cfeefa'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  glow(c, 880, 300, 400, 'rgba(255,240,190,.7)');
  for (let i = 0; i < 5; i++) cloud(c, ((i * 420 - pan * .1 + t * 10) % 2100 + 2100) % 2100 - 400, 220 + (i % 3) * 120, .8 + (i % 2) * .3, '#fff', .95);
  // far mountains
  c.save(); c.translate(-pan * .2, 0); c.fillStyle = '#8aa6c8'; c.beginPath(); c.moveTo(-200, 1100); for (let x = -200; x <= 3000; x += 160) c.lineTo(x, 900 - Math.abs(Math.sin(x * .004)) * 260 - (x % 320 ? 0 : 60)); c.lineTo(3000, 1300); c.lineTo(-200, 1300); c.fill(); c.restore();
  c.save(); c.translate(-pan * .45, 0); c.fillStyle = '#6fae6a'; c.beginPath(); c.moveTo(-200, 1200); for (let x = -200; x <= 4000; x += 100) c.lineTo(x, 1080 - Math.sin(x * .006) * 70); c.lineTo(4000, 1400); c.lineTo(-200, 1400); c.fill();
  for (let i = 0; i < 14; i++) palm(c, i * 300 + 50, 1150 - Math.sin((i * 300 + 50) * .006) * 70, .6, t, i); c.restore();
  // main layer with camera
  c.save(); cam(c, z, 540 + pan, 1420);
  const gg = c.createLinearGradient(0, 1220, 0, 2100); gg.addColorStop(0, '#8cc56a'); gg.addColorStop(1, '#5d9a4a'); c.fillStyle = gg; c.fillRect(-600, 1230, 4200, 900);
  const rg = R(4); for (let i = 0; i < 120; i++) { const x = rg() * 4000 - 400, y = 1250 + rg() * 600; line(c, x, y, x + 6, y - 18, 'rgba(40,100,40,.4)', 3); }
  // pegs & string marking lot
  for (let i = 0; i < 6; i++) { const x = 1500 + i * 220; line(c, x, 1300, x, 1250, '#a86f37', 6); circ(c, x, 1248, 6, C.orange); }
  c.save(); c.strokeStyle = C.yellow; c.lineWidth = 3; c.setLineDash([12, 10]); c.beginPath(); c.moveTo(1500, 1262); c.lineTo(2600, 1262); c.stroke(); c.restore();
  flag(c, 980, 1330, 1.0, t);
  // Pak Bolo pointing wrong way
  kopian(c, 'bolo', 230, 1400, 1.7, { armL: 1.6, elbL: 0, armR: .2, expr: 'proud', talk: t > 18 ? .3 * Math.abs(Math.sin(t * 11)) : 0, look: -1 });
  // Nara whistle
  const blow = t > 17.6 && t < 18.6;
  kopian(c, 'nara', 560, 1560, 2.4, { armR: 1.5, elbR: 0, armL: .5, elbL: 1.0, prop: blow ? 'whistle' : 'clip', expr: 'stern', bob: blow ? Math.sin(t * 30) * 3 : 0 });
  if (!blow) { } else { for (let i = 0; i < 3; i++) { const k = (t * 3 + i / 3) % 1; c.save(); c.globalAlpha = 1 - k; c.strokeStyle = '#fff'; c.lineWidth = 6; c.beginPath(); c.arc(700, 1040, 30 + k * 90, -.6, .6); c.stroke(); c.restore(); } }
  if (t > 18.3) chip(c, 560, 820, 'MULAI!', C.yellow, C.navy, 54, back(seg(t, 18.3, 18.55)), -.06);
  // Tiko blueprint
  const bk = eo(seg(t, 19.5, 20.6));
  kopian(c, 'tiko', 2200, 1560, 2.0, { armL: 1.1, armR: 1.1, elbL: .4, elbR: .4, expr: 'happy', look: .6 });
  c.save(); c.translate(2290, 1430); c.rotate(-.04); rr(c, 0, -10, 380 * bk, 200, 6, '#2d6cc0'); c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = 3;
  if (bk > .3) { c.beginPath(); for (let i = 0; i < 4; i++) { c.rect(24 + i * 85, 40, 60 * bk, 50); } c.stroke(); c.beginPath(); c.moveTo(20, 130); c.lineTo(360 * bk, 130); c.stroke(); }
  ell(c, 380 * bk, 90, 16, 104, '#3d7cd0'); c.restore();
  // workers running with planks
  const rw = R(9);
  for (let i = 0; i < 14; i++) { const t0 = 19.4 + rw() * 1.5, sp = 260 + rw() * 160; const x = 1500 + (t - t0) * sp - 200 + rw() * 200, y = 1330 + rw() * 260; if (t < t0) continue; const s = 1.3 + (y - 1330) / 260 * .8; mini(c, x, y, s, MINI_SHIRT[i % 10], MINI_SKIN[i % 5], { leg: Math.sin(t * 16 + i) * .9, bob: Math.abs(Math.sin(t * 16 + i)) * 5, hold: i % 2 ? 'plank' : null, up: i % 2 ? 1 : 0 }); }
  // truck
  const tx = 1450 + (t - 19.3) * 320; if (t > 19.3) { c.save(); c.translate(tx, 1720); rr(c, -180, -130, 220, 110, 10, C.orange); rr(c, 40, -100, 110, 80, 12, '#f2c94c'); rr(c, 70, -88, 60, 34, 6, '#bfe6f5'); rr(c, -170, -150, 200, 22, 4, '#c58a4b'); circ(c, -120, -12, 32, '#2b2b3d'); circ(c, 90, -12, 32, '#2b2b3d'); circ(c, -120, -12, 12, '#999'); circ(c, 90, -12, 12, '#999'); c.restore(); for (let i = 0; i < 6; i++) { const k = ((t * 2 + i / 6) % 1); circ(c, tx - 220 - k * 200, 1700 - k * 40, 20 + k * 40, `rgba(220,200,160,${.5 * (1 - k)})`); } }
  c.restore(); c.restore();
  speedLines(c, t, t > 19.45 ? .5 : blur, -1);
  // iris open
  const ik = seg(t, 17.2, 17.6); if (ik < 1) iris(c, W / 2, H / 2 - 80, lerp(0, 1300, eio(ik)));
}

// ---------- S6 settlement timelapse aerial
function s6(c, t) {
  const k = seg(t, 22.2, 29.2);
  const z = lerp(1.9, 2.35, sm(k)), cx = lerp(SET.x - 10, SET.x + 30, k), cy = lerp(SET.y + 40, SET.y + 10, k);
  const sa = lerp(-.4, 1.0, k); const shv = [Math.cos(sa) * 26, 10 + Math.sin(sa) * 6];
  c.save(); cam(c, z, cx, cy);
  drawIsland(c, t, {
    roads: i => i === 0 ? seg(t, 22.3, 23.4) : i < 4 ? seg(t, 22.9 + i * .3, 24.0 + i * .25) : seg(t, 24.0, 25.0),
    houses: i => back(seg(t, 24.95 + POP_ORDER.indexOf(i) * .18, 25.25 + POP_ORDER.indexOf(i) * .18)),
    park: seg(t, 27.4, 28.4), lamps: i => seg(t, 28.1 + i * .04, 28.5 + i * .04), hospital: 0, shadow: shv,
  });
  // tiny workers
  const r = R(66); for (let i = 0; i < 26; i++) { const bx = SET.x + (r() - .5) * 420, by = SET.y + (r() - .5) * 260; const x = bx + Math.sin(t * 2 + i) * 20, y = by + Math.cos(t * 1.7 + i) * 10; mini(c, x, y, .32, MINI_SHIRT[i % 10], MINI_SKIN[i % 5], { leg: Math.sin(t * 15 + i) * .8, face: false }); }
  // dust puffs on pop
  for (const h of HOUSES) { const t0 = 24.95 + POP_ORDER.indexOf(h.i) * .18; const dk = seg(t, t0, t0 + .6); if (dk > 0 && dk < 1) for (let j = 0; j < 6; j++) { const a = j / 6 * TAU; circ(c, h.x + Math.cos(a) * 40 * eo(dk), h.y - 10 + Math.sin(a) * 18 * eo(dk), 10 * (1 - dk) + 2, `rgba(240,225,190,${.8 * (1 - dk)})`); } }
  // highlight ring
  if (t > 23.3 && t < 25) dashedRing(c, SET.x - 30, SET.y + 5, 260 * eo(seg(t, 23.3, 23.8)), t, C.yellow, 5);
  c.restore();
  // golden timelapse grade
  c.fillStyle = `rgba(255,170,80,${.14 * k})`; c.fillRect(0, 0, W, H);
  // chips
  chip(c, W / 2, 330, 'KAWASAN PERMUKIMAN 1', C.yellow, C.navy, 50, back(seg(t, 23.3, 23.6)));
  const n = HOUSES.filter(h => t > 25.1 + POP_ORDER.indexOf(h.i) * .18).length;
  if (t > 24.9) chip(c, W / 2, 470, 'RUMAH: ' + n, '#fff', C.navy, 50, back(seg(t, 24.9, 25.2)));
}

// ---------- S7 house cutaway
function houseSide(c, t, rain) {
  const g = c.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#6f7fa8'); g.addColorStop(1, '#b8c4d8'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.fillStyle = '#6aa05a'; c.fillRect(0, 1400, W, 520);
  rr(c, 180, 980, 720, 430, 6, '#f6f2ea'); rr(c, 440, 1160, 140, 250, 6, '#8a5a35'); rr(c, 240, 1080, 150, 120, 6, '#9fc8d8'); rr(c, 640, 1080, 190, 120, 6, '#9fc8d8');
  for (let i = 0; i < 7; i++) rr(c, 640 + i * 28, 1080, 10, 120, 2, '#b9805a');
  poly(c, [110, 1000, 970, 1000, 540, 620], '#c9623f'); poly(c, [540, 620, 970, 1000, 900, 1000], '#a64f33');
  rr(c, 500, 600, 80, 50, 6, '#c9623f');
  if (rain) { const r = R(Math.floor(t * 30)); for (let i = 0; i < 70; i++) { const x = r() * W, y = r() * H; line(c, x, y, x - 8, y + 34, 'rgba(220,235,255,.6)', 3); } }
}
function houseCut(c, t) {
  navyGrid(c, 0, t * 10);
  const L = 'rgba(200,220,255,.95)';
  c.save(); c.lineJoin = 'round';
  // ground
  rr(c, 60, 1400, 960, 24, 4, '#4a5a9a');
  // walls
  rr(c, 170, 980, 26, 420, 4, '#dfe6ff'); rr(c, 884, 980, 26, 420, 4, '#dfe6ff');
  rr(c, 170, 1390, 740, 14, 4, '#dfe6ff');
  // window openings
  rr(c, 170, 1100, 26, 120, 2, '#20265a'); rr(c, 884, 1100, 26, 120, 2, '#20265a');
  // roof section
  c.strokeStyle = L; c.lineWidth = 22; c.beginPath(); c.moveTo(80, 1010); c.lineTo(510, 610); c.moveTo(570, 610); c.lineTo(1000, 1010); c.stroke();
  // ridge vent cap
  c.lineWidth = 16; c.beginPath(); c.moveTo(470, 560); c.lineTo(540, 520); c.lineTo(610, 560); c.stroke();
  c.restore();
  // dimension labels
  c.save(); c.setLineDash([10, 8]); c.strokeStyle = 'rgba(255,209,102,.6)'; c.lineWidth = 3; c.beginPath(); c.moveTo(1030, 610); c.lineTo(1030, 1400); c.stroke(); c.restore();
  // Koko inside
  const relax = seg(t, 33.4, 33.9);
  const fan = relax < 1 ? Math.sin(t * 18) * .5 : 0;
  kopian(c, 'koko', 540, 1390, 2.1, { armR: lerp(2.0, .3, relax) + fan * .2, elbR: lerp(1.2, .2, relax), fanA: fan - .8, prop: relax < .5 ? 'fan' : null, armL: .2, expr: relax > .5 ? 'happy' : 'worried', bob: Math.sin(t * 2) * 2 });
  if (relax < .5) { for (let i = 0; i < 3; i++) { const k = (t * 1.5 + i / 3) % 1; c.globalAlpha = 1 - k; c.fillStyle = '#9fe0ff'; c.beginPath(); c.ellipse(470 - i * 20, 920 + k * 60, 8, 12, 0, 0, TAU); c.fill(); } c.globalAlpha = 1; }
  // rain + runoff arrows
  const rk = seg(t, 31.3, 31.6);
  if (t > 29.6) { const r = R(Math.floor(t * 24)); for (let i = 0; i < 50; i++) { const x = r() * W, y = r() * 900; line(c, x, y, x - 6, y + 30, 'rgba(140,200,255,.55)', 3); } }
  if (rk > 0) {
    for (let side = -1; side <= 1; side += 2) for (let j = 0; j < 3; j++) {
      const k = ((t - 31.4) * .9 + j / 3) % 1; const x0 = 540 + side * 40, y0 = 640, x1 = 540 + side * 470, y1 = 1015;
      const px = lerp(x0, x1, k), py = lerp(y0, y1, k) - 30; c.globalAlpha = rk * Math.sin(k * PI);
      arrow(c, px - side * 50, py - 42, px, py, '#5bc0eb', 12, 30); c.globalAlpha = 1;
    }
    for (const side of [-1, 1]) { const k = (t * 2) % 1; circ(c, 540 + side * 470, 1030 + k * 90, 9, `rgba(91,192,235,${rk * (1 - k)})`); }
  }
  // hot air up and out
  const hk = seg(t, 32.7, 33.0);
  if (hk > 0) {
    for (let j = 0; j < 5; j++) { const k = ((t - 32.7) * .8 + j / 5) % 1; const x = 540 + Math.sin(j * 2 + k * 6) * 120 * (1 - k), y = lerp(1180, 480, k); c.globalAlpha = hk * Math.sin(k * PI); c.save(); c.strokeStyle = C.orange; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(x, y + 60); c.quadraticCurveTo(x + 24, y + 30, x, y); c.stroke(); poly(c, [x, y - 26, x - 18, y + 4, x + 18, y + 4], C.orange); c.restore(); c.globalAlpha = 1; }
    dashedRing(c, 540, 565, 95, t);
  }
  chip(c, 290, 700, 'ATAP CURAM', C.yellow, C.navy, 44, back(seg(t, 29.9, 30.2)), -.06);
  chip(c, 790, 470, 'VENTILASI', C.orange, '#fff', 44, back(seg(t, 33.1, 33.4)), .05);
  // temperature chip
  if (t > 33.6) chip(c, 540, 1560, 'SEJUK', '#5bc0eb', C.navy, 48, back(seg(t, 33.6, 33.9)));
}
function s7(c, t) {
  const lk = seg(t, 29.3, 30.0);
  const zz = lerp(1.0, 1.08, seg(t, 29.2, 34.8));
  if (lk < 1) { c.save(); cam(c, 1 + lk * .15, 540, 900 - lk * 100); houseSide(c, t, true); c.restore(); }
  const draw = () => { c.save(); cam(c, zz, 540, 1000 - seg(t, 29.2, 34.8) * 40); houseCut(c, t); c.restore(); };
  if (lk >= 1) draw(); else lens(c, 540, 700, lerp(0, 1500, eio(lk)), draw);
}

// ---------- S8a hospital hero
function hospitalFront(c, t, o = {}) {
  const g = c.createLinearGradient(0, -400, 0, 1300); g.addColorStop(0, '#3f8fd8'); g.addColorStop(1, '#bfe6f5'); c.fillStyle = g; c.fillRect(-400, -600, 1900, 2000);
  glow(c, 220, 200, 380, 'rgba(255,245,200,.8)');
  cloud(c, 820 + t * 10, 160, 1.1); cloud(c, 160 + t * 6, 420, .8, '#fff', .9);
  // lake + far hills
  c.fillStyle = '#7fa8c8'; c.beginPath(); c.moveTo(-400, 1000); c.quadraticCurveTo(300, 760, 900, 880); c.quadraticCurveTo(1300, 950, 1500, 900); c.lineTo(1500, 1200); c.lineTo(-400, 1200); c.fill();
  c.fillStyle = '#4fb3c8'; c.fillRect(600, 1040, 1000, 160); for (let i = 0; i < 8; i++) ell(c, 760 + i * 40 + Math.sin(t * 2 + i) * 10, 1080 + i * 12, 30, 3, 'rgba(255,255,255,.6)');
  // hill
  const hg = c.createLinearGradient(0, 1000, 0, 2000); hg.addColorStop(0, '#7dbb5e'); hg.addColorStop(1, '#4f8a44'); c.fillStyle = hg;
  c.beginPath(); c.moveTo(-400, 1250); c.quadraticCurveTo(540, 1050, 1500, 1250); c.lineTo(1500, 2400); c.lineTo(-400, 2400); c.fill();
  palm(c, 40, 1300, 1.1, t, 0); palm(c, 1040, 1300, -1.1, t, 2);
  // building
  const bx = 150, by = 760, bw = 780; // top of floor2 at 760, ground at 1260
  poly(c, [bx - 30, by + 10, bx + bw + 30, by + 10, bx + bw, by - 20, bx, by - 20], '#e7ebee');
  // solar panels
  for (let i = 0; i < 8; i++) { const px = bx + 30 + i * 92; poly(c, [px, by - 20, px + 80, by - 20, px + 70, by - 70, px - 10, by - 70], '#263a6e'); c.strokeStyle = 'rgba(140,170,255,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(px + 35, by - 20); c.lineTo(px + 30, by - 70); c.stroke(); const sh = (Math.sin(t * 2 - i * .5) + 1) / 2; poly(c, [px + 10 + sh * 40, by - 25, px + 22 + sh * 40, by - 25, px + 16 + sh * 40, by - 65, px + 4 + sh * 40, by - 65], `rgba(255,255,255,${.35 * (o.panelGlow || .5)})`); }
  rr(c, bx, by, bw, 500, 8, '#f7f9fb');
  rr(c, bx, by + 245, bw, 16, 2, '#b9805a');
  for (let i = 0; i < 10; i++) { rr(c, bx + 24 + i * 76, by + 60, 52, 140, 6, '#7fc4d8'); for (let j = 0; j < 4; j++) rr(c, bx + 24 + i * 76 + j * 14, by + 60, 5, 140, 1, '#c58a4b'); }
  for (let i = 0; i < 10; i++) if (i < 3 || i > 6) rr(c, bx + 24 + i * 76, by + 300, 52, 140, 6, '#7fc4d8');
  // ER entrance
  rr(c, bx + 250, by + 300, 280, 200, 6, '#bfe6f5'); rr(c, bx + 380, by + 300, 4, 200, 1, '#fff');
  poly(c, [bx + 210, by + 290, bx + 570, by + 290, bx + 600, by + 320, bx + 180, by + 320], C.orange);
  chip(c, bx + 390, by + 270, 'IGD', C.red, '#fff', 40, 1);
  // sign
  rr(c, bx + 90, by + 14, 600, 40, 20, C.navy); c.font = F(800, 26); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('RS REPUBLIK WARUNGKOPIA', bx + 390, by + 35);
  circ(c, bx + bw - 50, by + 34, 26, '#3f7fbf'); c.font = F(800, 30); c.fillStyle = '#fff'; c.fillText('H', bx + bw - 50, by + 36);
  // path
  poly(c, [bx + 300, by + 500, bx + 480, by + 500, bx + 640, 1920, bx + 140, 1920], '#e6d7b0');
}
function ambulance(c, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -150, -130, 230, 120, 14, '#ffffff'); rr(c, 70, -100, 90, 90, 14, '#ffffff'); rr(c, 96, -88, 50, 36, 6, '#bfe6f5'); rr(c, -150, -70, 310, 18, 2, C.orange);
  const on = Math.floor(t * 6) % 2; rr(c, -40, -148, 30, 18, 6, on ? '#5bc0eb' : '#2b6c9a'); rr(c, -6, -148, 30, 18, 6, on ? '#c0563a' : C.orange);
  if (on) glow(c, -25, -140, 90, 'rgba(91,192,235,.5)'); else glow(c, 10, -140, 90, 'rgba(239,111,60,.5)');
  circ(c, -90, -8, 28, '#2b2b3d'); circ(c, 100, -8, 28, '#2b2b3d'); circ(c, -90, -8, 10, '#aaa'); circ(c, 100, -8, 10, '#aaa');
  c.restore();
}
function s8a(c, t) {
  const k = eio(seg(t, 34.8, 39.6));
  const z = lerp(1.9, 1.0, k), cx = lerp(440, 540, k), cy = lerp(1330, 960, k);
  c.save(); cam(c, z, cx, cy);
  hospitalFront(c, t, { panelGlow: .3 + .7 * k });
  ambulance(c, 860, 1380, 1.0, t);
  // nurses with stretcher
  const nk = seg(t, 34.9, 37.4); const nx = lerp(450, 180, nk);
  rr(c, nx - 40, 1330, 140, 18, 6, '#fff'); line(c, nx - 30, 1348, nx - 30, 1390, '#888', 5); line(c, nx + 90, 1348, nx + 90, 1390, '#888', 5);
  mini(c, nx - 70, 1400, 1.5, '#5ad1c0', '#d9a07a', { leg: Math.sin(t * 16) * .9, flip: -1, hair: '#2a1a12' }); mini(c, nx + 130, 1400, 1.5, '#5ad1c0', '#b97a55', { leg: Math.sin(t * 16 + 2) * .9, flip: -1 });
  // Pak Jabrik on bench waving
  rr(c, 760, 1560, 240, 16, 4, '#a86f37'); line(c, 780, 1576, 780, 1620, '#7a5530', 8); line(c, 980, 1576, 980, 1620, '#7a5530', 8);
  kopian(c, 'jabrik', 870, 1600, 1.6, { armR: 2.7 + Math.sin(t * 9) * .35, elbR: .3, legL: -1.3, legR: -1.3, expr: 'happy', look: -.3 });
  // crowd cheering
  for (let i = 0; i < 9; i++) mini(c, 120 + i * 50, 1690 + (i % 2) * 30, 1.6, MINI_SHIRT[i], MINI_SKIN[i % 5], { up: (Math.sin(t * 8 + i) > 0) ? 1 : .4 });
  // sparkle on sign
  if (t > 37.7) { const sk = seg(t, 37.7, 38.5); sparkle(c, 250 + sk * 560, 770, 1.6 * Math.sin(sk * PI), '#fff'); dashedRing(c, 540, 795, 380 * eo(seg(t, 37.7, 38.0)), t, C.yellow, 6); }
  c.restore();
  if (t > 37.7) chip(c, W / 2, 360, 'PALING BANYAK DIMINTA', C.yellow, C.navy, 46, back(seg(t, 37.7, 38.0)), -.04);
}

// ---------- S8b hospital cutaway
function hosCut(c, t) {
  navyGrid(c, 0, t * 10);
  const bx = 120, bw = 840;
  const f1 = seg(t, 40.15, 40.5), f2 = seg(t, 42.1, 42.45), f3 = seg(t, 44.0, 44.35);
  // floors: ground 1250-1520, floor2 980-1250, roof 980
  c.fillStyle = `rgba(224,72,72,${.28 * f1})`; c.fillRect(bx, 1250, bw, 270);
  c.fillStyle = `rgba(90,200,120,${.28 * f2})`; c.fillRect(bx, 980, bw, 270);
  const L = '#dfe6ff';
  rr(c, bx - 20, 1520, bw + 40, 18, 3, L); rr(c, bx - 10, 1240, bw + 20, 14, 3, L); rr(c, bx - 30, 970, bw + 60, 14, 3, L);
  rr(c, bx - 10, 970, 16, 560, 3, L); rr(c, bx + bw - 6, 970, 16, 560, 3, L);
  rr(c, bx + 420, 1254, 10, 266, 2, 'rgba(223,230,255,.5)'); rr(c, bx + 280, 984, 10, 256, 2, 'rgba(223,230,255,.5)'); rr(c, bx + 560, 984, 10, 256, 2, 'rgba(223,230,255,.5)');
  // IGD contents
  for (const ox of [190, 560]) { rr(c, bx + ox, 1440, 190, 24, 6, '#ffffff'); line(c, bx + ox + 15, 1464, bx + ox + 15, 1510, '#9aa', 6); line(c, bx + ox + 175, 1464, bx + ox + 175, 1510, '#9aa', 6); rr(c, bx + ox + 150, 1330, 60, 46, 6, '#2b3a6e'); c.strokeStyle = '#5be08a'; c.lineWidth = 3; c.beginPath(); for (let i = 0; i < 12; i++) { const x = bx + ox + 154 + i * 4.5, y = 1353 + ((i + Math.floor(t * 8)) % 6 === 0 ? -14 : 0); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); }
  mini(c, bx + 120 + Math.sin(t * 3) * 30, 1510, 1.5, '#5ad1c0', '#d9a07a', { leg: Math.sin(t * 10) * .6, hair: '#2a1a12' });
  mini(c, bx + 480 + Math.sin(t * 2.4 + 1) * 40, 1510, 1.5, '#5ad1c0', '#b97a55', { leg: Math.sin(t * 10 + 1) * .6 });
  // ward contents
  for (let i = 0; i < 3; i++) { const x = bx + 60 + i * 280; rr(c, x, 1180, 180, 26, 8, '#ffffff'); rr(c, x, 1150, 50, 34, 10, '#cfe0ff'); line(c, x + 10, 1206, x + 10, 1240, '#9aa', 6); line(c, x + 170, 1206, x + 170, 1240, '#9aa', 6); miniLying(c, x + 110, 1180, 1.25, MINI_SHIRT[i + 2], MINI_SKIN[i], t * 2 + i); line(c, x + 200, 1060, x + 200, 1240, '#9aa', 4); rr(c, x + 186, 1060, 28, 40, 6, 'rgba(190,230,255,.8)'); }
  // roof panels
  for (let i = 0; i < 8; i++) { const px = bx + 20 + i * 104; poly(c, [px, 968, px + 90, 968, px + 78, 900, px - 12, 900], '#263a6e'); c.strokeStyle = 'rgba(140,170,255,.7)'; c.lineWidth = 2; c.beginPath(); c.moveTo(px + 45, 968); c.lineTo(px + 33, 900); c.stroke(); if (f3 > 0) { const sh = (Math.sin(t * 4 - i * .6) + 1) / 2; poly(c, [px + 10 + sh * 50, 962, px + 24 + sh * 50, 962, px + 14 + sh * 50, 906, px + sh * 50, 906], `rgba(255,230,140,${.7 * f3})`); } }
  if (f3 > 0) {
    // sun rays
    c.save(); c.globalAlpha = f3; circ(c, 900, 640, 60, C.yellow); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t * .5; line(c, 900 + Math.cos(a) * 80, 640 + Math.sin(a) * 80, 900 + Math.cos(a) * 110, 640 + Math.sin(a) * 110, C.yellow, 8); }
    for (let i = 0; i < 5; i++) { const k = ((t - 44) * .9 + i / 5) % 1; line(c, lerp(860, 300 + i * 120, k) , lerp(690, 900, k), lerp(860, 300 + i * 120, Math.min(1, k + .08)), lerp(690, 900, Math.min(1, k + .08)), 'rgba(255,209,102,.9)', 6); }
    // energy flowing down
    c.setLineDash([14, 14]); c.lineDashOffset = -t * 120; c.strokeStyle = C.yellow; c.lineWidth = 6; c.beginPath(); c.moveTo(bx + bw - 40, 960); c.lineTo(bx + bw - 40, 1500); c.stroke();
    c.restore();
  }
  chip(c, bx + 200, 1290, 'IGD', C.red, '#fff', 52, back(f1));
  chip(c, bx + 220, 1020, 'RUANG RAWAT', '#3fae6a', '#fff', 46, back(f2));
  chip(c, bx + 260, 840, 'PANEL SURYA', C.yellow, C.navy, 46, back(f3));
}
function s8b(c, t) {
  let z, cy;
  if (t < 42.0) { z = 1.55; cy = lerp(1430, 1400, seg(t, 40, 42)); }
  else if (t < 43.9) { const k = eio(seg(t, 42.0, 42.6)); z = 1.55; cy = lerp(1400, 1120, k); }
  else if (t < 45.2) { const k = eio(seg(t, 43.9, 44.5)); z = lerp(1.55, 1.35, k); cy = lerp(1120, 860, k); }
  else { const k = eio(seg(t, 45.2, 45.9)); z = lerp(1.35, 1.0, k); cy = lerp(860, 1180, k); }
  const draw = () => { c.save(); cam(c, z, 540, cy); hosCut(c, t); c.restore(); };
  const lk = seg(t, 40.0, 40.45);
  if (lk < 1) { s8a(c, 39.99); lens(c, 540, 1100, lerp(0, 1500, eio(lk)), draw); } else draw();
}

// ---------- S9 night lights on
function s9(c, t, noInset) {
  const k = eio(seg(t, 45.9, 49.8));
  const z = lerp(1.45, .7, k), cx = lerp(SET.x + 60, 0, k), cy = lerp(SET.y - 40, 80, k);
  c.save(); cam(c, z, cx, cy);
  drawIsland(c, t, { lit: i => t > 47.6 + POP_ORDER.indexOf(i) * .05 ? 1 : 0, hosLit: t > 48.7 ? 1 : 0, lampOn: i => t > 47.1 + i * .06 ? 1 : 0 });
  nightOverlay(c, .92);
  // moon reflection in lake
  ell(c, LAKE.x + 40, LAKE.y, 40, 10, 'rgba(230,235,255,.6)');
  // lights glow (additive)
  c.save(); c.globalCompositeOperation = 'lighter';
  LAMPS.forEach((l, i) => { const on = seg(t, 47.1 + i * .06, 47.3 + i * .06); if (on > 0) glow(c, l[0], l[1] - 30, 60, 'rgba(255,210,120,.85)', on); });
  for (const h of HOUSES) { const on = seg(t, 47.6 + POP_ORDER.indexOf(h.i) * .05, 47.8 + POP_ORDER.indexOf(h.i) * .05); if (on > 0) glow(c, h.x + 5, h.y - 18, 55, 'rgba(255,200,110,.7)', on); }
  const ho = seg(t, 48.7, 49.0); if (ho > 0) { glow(c, HOS.x, HOS.y - 50, 220, 'rgba(255,210,130,.65)', ho); glow(c, HOS.x, HOS.y - 125, 60, 'rgba(120,180,255,.8)', ho); }
  // beach bonfire
  glow(c, 0, SOUTH[1] - 120, 120, 'rgba(255,150,70,.8)', seg(t, 46.9, 47.1));
  // road light trail
  const rk = seg(t, 47.0, 49.0); c.strokeStyle = 'rgba(255,210,120,.35)'; c.lineWidth = 10; c.lineCap = 'round'; ROADS.forEach(p => strokePath(c, p, rk));
  // fireflies
  const r = R(5); for (let i = 0; i < 40; i++) { const x = (r() - .5) * 900 + Math.sin(t + i) * 20, y = (r() - .5) * 1400 + Math.cos(t * .8 + i) * 20; glow(c, x, y, 14, 'rgba(220,255,140,.9)', .5 + .5 * Math.sin(t * 4 + i)); }
  c.restore();
  c.restore();
  // stars vignette top
  const rs = R(9); for (let i = 0; i < 40; i++) circ(c, rs() * W, rs() * 300, 2, `rgba(255,255,255,${.3 + .5 * Math.abs(Math.sin(t * 2 + i))})`);
  // inset faces
  if (!noInset) {
    const ik = seg(t, 48.6, 48.95);
    if (ik > 0) {
      const R0 = 190 * back(ik), ix = 790, iy = 470;
      c.save(); c.beginPath(); c.arc(ix, iy, R0, 0, TAU); c.clip();
      const g = c.createLinearGradient(0, iy - R0, 0, iy + R0); g.addColorStop(0, '#2a2d6e'); g.addColorStop(1, '#4a3f7a'); c.fillStyle = g; c.fillRect(ix - R0, iy - R0, R0 * 2, R0 * 2);
      glow(c, ix, iy - 120, 260, 'rgba(255,210,120,.5)');
      kopian(c, 'bubu', ix - 70, iy + 260, 1.6, { expr: 'wow', armL: 2.4, armR: .3, look: .2 });
      kopian(c, 'mimi', ix + 85, iy + 260, 1.5, { expr: 'wow', armL: .9, elbL: 2.0, armR: .9, elbR: 2.0, look: -.2 });
      c.restore();
      c.save(); c.strokeStyle = '#fff'; c.lineWidth = 12; c.beginPath(); c.arc(ix, iy, R0, 0, TAU); c.stroke(); c.restore();
    }
  }
}

// ---------- S10 map stamps
function mapScene(c, t) {
  c.fillStyle = '#efe4c8'; c.fillRect(-2000, -3000, 4000, 6000);
  const r = R(3); for (let i = 0; i < 160; i++) ell(c, (r() - .5) * 2600, (r() - .5) * 3600, 30 + r() * 80, 20 + r() * 50, 'rgba(180,150,100,.06)');
  // sea hatch
  c.save(); c.strokeStyle = 'rgba(80,120,160,.25)'; c.lineWidth = 3; for (let i = 1; i < 5; i++) { islPath(c, 1 + i * .05); c.stroke(); } c.restore();
  islPath(c, 1); c.fillStyle = '#f6edd3'; c.fill(); c.strokeStyle = C.navy; c.lineWidth = 7; c.stroke();
  // mountains as ink triangles
  for (const m of MOUNTS) for (let j = 0; j < 3; j++) { const x = m[0] - 60 + j * 60, y = m[1] + (j % 2) * 30; c.strokeStyle = '#6b5a45'; c.lineWidth = 5; c.beginPath(); c.moveTo(x - 50, y + 40); c.lineTo(x, y - 40); c.lineTo(x + 50, y + 40); c.stroke(); }
  ell(c, LAKE.x, LAKE.y, LAKE.rx, LAKE.ry, '#a8d4e0'); c.strokeStyle = '#3a7a9a'; c.lineWidth = 4; c.beginPath(); c.ellipse(LAKE.x, LAKE.y, LAKE.rx, LAKE.ry, 0, 0, TAU); c.stroke();
  c.font = F(600, 34); c.fillStyle = '#3a7a9a'; c.textAlign = 'center'; c.fillText('DANAU', LAKE.x, LAKE.y + 10);
  // future zones (grey dashed)
  const Z = [[-380, -260, 'PENDIDIKAN'], [560, 120, 'BANDARA'], [300, 760, 'PELABUHAN'], [-460, 120, 'ENERGI BERSIH'], [-20, -560, 'INOVASI']];
  for (const z of Z) { c.save(); c.setLineDash([14, 12]); c.strokeStyle = 'rgba(90,90,110,.55)'; c.lineWidth = 5; c.beginPath(); c.arc(z[0], z[1], 95, 0, TAU); c.stroke(); c.restore(); c.font = F(800, 64); c.fillStyle = 'rgba(90,90,110,.45)'; c.textAlign = 'center'; c.fillText('?', z[0], z[1] + 8); c.font = F(600, 26); c.fillText(z[2], z[0], z[1] + 130); }
  // roads ink
  c.save(); c.strokeStyle = '#8a7a60'; c.lineWidth = 8; c.lineCap = 'round'; ROADS.forEach(p => strokePath(c, p, 1)); c.restore();
  // built: settlement + hospital icons
  for (const h of HOUSES) { poly(c, [h.x - 16, h.y, h.x + 16, h.y, h.x + 16, h.y - 18, h.x, h.y - 32, h.x - 16, h.y - 18], '#c9623f'); }
  rr(c, HOS.x - 80, HOS.y - 60, 160, 70, 8, '#ffffff'); c.strokeStyle = C.navy; c.lineWidth = 5; c.strokeRect(HOS.x - 80, HOS.y - 60, 160, 70);
  circ(c, HOS.x, HOS.y - 25, 22, '#3f7fbf'); c.font = F(800, 28); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('H', HOS.x, HOS.y - 23); c.textBaseline = 'alphabetic';
  // compass
  c.save(); c.translate(560, -900); c.strokeStyle = C.navy; c.lineWidth = 4; c.beginPath(); c.arc(0, 0, 60, 0, TAU); c.stroke(); poly(c, [0, -80, 16, 0, 0, 14, -16, 0], C.orange); poly(c, [0, 80, 16, 0, 0, -14, -16, 0], C.navy); c.font = F(800, 30); c.fillStyle = C.navy; c.textAlign = 'center'; c.fillText('U', 0, -95); c.restore();
  c.font = F(800, 64); c.fillStyle = C.navy; c.textAlign = 'center'; c.fillText('PETA WARUNGKOPIA', 0, -1260);
}
function stamp(c, x, y, text, t0, t, col) {
  const k = seg(t, t0 - .25, t0); if (k <= 0) return;
  const sc = lerp(2.6, 1, eo(k)); c.save(); c.translate(x, y); c.rotate(-.12); c.scale(sc, sc); c.globalAlpha = clamp01(k * 2);
  c.font = F(800, 46); const w = c.measureText(text).width + 60;
  c.strokeStyle = col; c.lineWidth = 9; c.beginPath(); c.roundRect(-w / 2, -42, w, 84, 14); c.stroke();
  c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, 4);
  c.restore();
}
function s10(c, t) {
  let z = .62, cx = 0, cy = 0;
  if (t > 50.85 && t < 52.0) { const k = eo(seg(t, 50.85, 51.05)); z = lerp(.62, 1.15, k); cx = lerp(0, SET.x + 20, k); cy = lerp(0, SET.y, k); }
  else if (t >= 52.0 && t < 52.85) { const k = eo(seg(t, 52.0, 52.2)); z = 1.15; cx = lerp(SET.x + 20, HOS.x, k); cy = lerp(SET.y, HOS.y, k); }
  else if (t >= 52.85) { const k = eio(seg(t, 52.85, 53.35)); z = lerp(1.15, .62, k); cx = lerp(HOS.x, 0, k); cy = lerp(HOS.y, 0, k); }
  const [a, b] = shake(t, 51.05, .35, 26), [a2, b2] = shake(t, 52.3, .35, 26);
  const draw = () => {
    c.save(); cam(c, z, cx, cy, 0, a + a2, b + b2); mapScene(c, t);
    stamp(c, SET.x, SET.y + 190, 'PERMUKIMAN 1', 51.05, t, '#d9532e'); stamp(c, HOS.x + 20, HOS.y + 110, 'RS REPUBLIK', 52.3, t, '#d9532e');
    if (t > 51.05) dashedRing(c, SET.x - 20, SET.y, 240, t, '#d9532e', 6); if (t > 52.3) dashedRing(c, HOS.x, HOS.y - 20, 150, t, '#d9532e', 6);
    c.restore();
  };
  const dk = seg(t, 50.0, 50.45);
  if (dk < 1) { s9(c, 49.99, true); c.save(); c.globalAlpha = sm(dk); draw(); c.restore(); } else draw();
  if (t > 52.4) chip(c, W / 2, 1650 - 300, '+2 TITIK BARU', C.yellow, C.navy, 50, back(seg(t, 52.4, 52.7)));
}

// ---------- S11 town square question
function s11(c, t) {
  const z = lerp(1.0, 1.12, sm(seg(t, 53.4, 58.3)));
  c.save(); cam(c, z, 540, 1060);
  const g = c.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, '#141a45'); g.addColorStop(1, '#4a3f7a'); c.fillStyle = g; c.fillRect(-200, -200, 1500, 1600);
  const rs = R(4); for (let i = 0; i < 90; i++) circ(c, rs() * 1400 - 150, rs() * 700, 1.5 + rs() * 2, `rgba(255,255,255,${.3 + .6 * Math.abs(Math.sin(t * 2 + i))})`);
  // houses row
  for (let i = 0; i < 5; i++) { const x = -60 + i * 260, y = 1180; rr(c, x, y - 230, 220, 230, 6, '#d9d4e8'); poly(c, [x - 20, y - 230, x + 240, y - 230, x + 110, y - 360], ['#c9623f', '#2f8c8c', '#e0a33a', '#c9623f', '#2f8c8c'][i]); rr(c, x + 30, y - 180, 60, 60, 4, '#ffd166'); rr(c, x + 130, y - 180, 60, 60, 4, i % 2 ? '#ffd166' : '#8a8ab0'); rr(c, x + 85, y - 100, 50, 100, 4, '#8a5a35'); glow(c, x + 60, y - 150, 120, 'rgba(255,210,120,.35)'); }
  // string lights
  c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo(-100, 700); c.quadraticCurveTo(540, 860, 1180, 700); c.stroke();
  for (let i = 0; i < 18; i++) { const k = i / 17, x = lerp(-100, 1180, k), y = 700 + Math.sin(k * PI) * 80; glow(c, x, y, 34, 'rgba(255,210,120,.8)', .7 + .3 * Math.sin(t * 5 + i)); circ(c, x, y, 7, '#fff3c0'); }
  // ground square
  c.fillStyle = '#5a527e'; c.fillRect(-200, 1180, 1500, 900);
  for (let i = 0; i < 10; i++) line(c, -200, 1220 + i * 60, 1300, 1220 + i * 60, 'rgba(255,255,255,.06)', 2);
  // lamp posts
  for (const x of [60, 1020]) { line(c, x, 1500, x, 1060, '#2b2f5a', 12); circ(c, x, 1050, 22, '#fff3c0'); glow(c, x, 1050, 200, 'rgba(255,210,120,.5)'); }
  // back row
  const bob = i => Math.sin(t * 3 + i) * 3;
  kopian(c, 'bolo', 180, 1390, 1.35, { expr: 'proud', armL: .3, armR: 2.3, elbR: 1.5, bob: bob(1), look: .3 });
  kopian(c, 'jabrik', 410, 1370, 1.35, { expr: 'happy', armR: 2.7 + Math.sin(t * 8) * .3, bob: bob(2) });
  kopian(c, 'tiko', 660, 1370, 1.35, { expr: 'wow', armL: .9, elbL: 2.1, bob: bob(3), look: -.2 });
  kopian(c, 'nara', 890, 1390, 1.35, { expr: 'stern', prop: 'clip', armL: .5, elbL: 1.2, bob: bob(4), look: -.4 });
  // front row
  kopian(c, 'moci', 140, 1620, 1.7, { expr: 'stern', armL: .9, armR: .9, elbL: 2.2, elbR: 2.2, bob: bob(5), look: .4 });
  kopian(c, 'bubu', 420, 1640, 1.7, { expr: 'worried', armL: 2.8, elbL: .9, armR: .3, bob: bob(6), look: .2 });
  kopian(c, 'mimi', 680, 1630, 1.7, { expr: 'talk', talk: .3 + .3 * Math.abs(Math.sin(t * 9)), armR: 2.0, elbR: 1.6, bob: bob(7), look: -.1 });
  kopian(c, 'koko', 940, 1640, 1.75, { expr: 'happy', armL: 1.4 + Math.sin(t * 6) * .08, elbL: -.2, armR: .3, bob: bob(8), look: -.5 });
  // thought bubbles
  const B = [[220, 640, 'SEKOLAH'], [540, 590, 'PASAR'], [860, 640, 'BANDARA']];
  B.forEach((b, i) => {
    const k = back(seg(t, 54.9 + i * .3, 55.25 + i * .3)); if (k <= 0) return;
    c.save(); c.translate(b[0], b[1] + Math.sin(t * 2 + i) * 8); c.scale(k, k);
    circ(c, -30, 150, 14, '#fff'); circ(c, -14, 120, 20, '#fff'); circ(c, 0, 0, 105, '#fff');
    if (i === 0) { rr(c, -55, -20, 110, 70, 4, '#e0a33a'); poly(c, [-66, -20, 66, -20, 0, -64], '#c9623f'); rr(c, -12, 14, 24, 36, 2, '#8a5a35'); line(c, 0, -64, 0, -92, '#555', 4); poly(c, [0, -92, 26, -84, 0, -76], C.red); }
    if (i === 1) { for (let j = 0; j < 5; j++) poly(c, [-60 + j * 24, -30, -36 + j * 24, -30, -40 + j * 24, 0, -64 + j * 24, 0], j % 2 ? '#fff' : C.orange); rr(c, -58, 0, 116, 50, 4, '#a86f37'); circ(c, -30, 2, 10, '#e04848'); circ(c, -6, 2, 10, '#f2c94c'); circ(c, 20, 2, 10, '#5aa65a'); }
    if (i === 2) { c.save(); c.rotate(-.35); rr(c, -70, -12, 140, 24, 12, '#8fa6c8'); poly(c, [-10, -10, 20, -10, -20, -60, -40, -60], '#6f8ab8'); poly(c, [-10, 10, 20, 10, -20, 60, -40, 60], '#6f8ab8'); poly(c, [-62, -8, -50, -8, -70, -36, -78, -36], '#6f8ab8'); c.restore(); }
    c.font = F(800, 26); c.fillStyle = C.navy; c.textAlign = 'center'; c.fillText(b[2], 0, 82);
    c.restore();
  });
  c.restore();
  // big question mark
  const qk = back(seg(t, 55.3, 55.7));
  if (qk > 0) { c.save(); c.translate(W / 2, 200); const p = 1 + Math.sin(t * 4) * .04; c.scale(qk * p, qk * p); outlined(c, '?', 0, 0, 260, C.yellow, C.navy, 26); c.restore(); }
  // fade out
  const fo = seg(t, 58.0, 58.3); if (fo > 0) { c.fillStyle = `rgba(0,0,0,${fo})`; c.fillRect(0, 0, W, H); }
}
