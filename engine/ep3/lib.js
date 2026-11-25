// ===== WarungKopia short — drawing library
const W = 1920, H = 1080;
const C = { navy: '#1b1f4b', purple: '#3b3a7a', orange: '#ef6f3c', yellow: '#ffd166', cream: '#f4f1ea', green: '#2f6b5b', red: '#e04848', white: '#ffffff' };
const PI = Math.PI, TAU = Math.PI * 2;
const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;
const lerp = (a, b, t) => a + (b - a) * t;
const sm = t => { t = clamp01(t); return t * t * (3 - 2 * t); };
const eo = t => { t = clamp01(t); return 1 - Math.pow(1 - t, 3); };
const eio = t => { t = clamp01(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
const back = t => { t = clamp01(t); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const seg = (t, a, b) => clamp01((t - a) / (b - a));
function R(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hex2rgb(h) { h = h.replace('#', ''); return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)]; }
function mixc(a, b, t) { const A = hex2rgb(a), B = hex2rgb(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp01(t)))).join(',')})`; }
function ell(c, x, y, rx, ry, col, rot = 0) { c.fillStyle = col; c.beginPath(); c.ellipse(x, y, Math.max(.01, rx), Math.max(.01, ry), rot, 0, TAU); c.fill(); }
function circ(c, x, y, r, col) { ell(c, x, y, r, r, col); }
function rr(c, x, y, w, h, r, col) { c.fillStyle = col; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); }
function poly(c, pts, col) { c.fillStyle = col; c.beginPath(); c.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) c.lineTo(pts[i], pts[i + 1]); c.closePath(); c.fill(); }
function line(c, x1, y1, x2, y2, col, w) { c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
function glow(c, x, y, r, col, a = 1) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(0,0,0,0)'); c.save(); c.globalAlpha = a; c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); c.restore(); }
function cam(c, z, cx, cy, rot = 0, sx = 0, sy = 0) { c.translate(W / 2 + sx, H / 2 + sy); c.rotate(rot); c.scale(z, z); c.translate(-cx, -cy); }
function shake(t, t0, dur, amp) { const k = (t - t0) / dur; if (k < 0 || k > 1) return [0, 0]; const a = amp * (1 - k); return [Math.sin(t * 97) * a, Math.cos(t * 83) * a]; }
function F(w, s) { return `${w} ${s}px P${w}`; }

// ---------- chip (label pill)
function chip(c, x, y, text, bg, fg, size, k = 1, rot = 0) {
  if (k <= 0) return;
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(k, k);
  c.font = F(800, size); const w = c.measureText(text).width + size * 1.1, h = size * 1.6;
  c.fillStyle = 'rgba(10,12,40,.28)'; c.beginPath(); c.roundRect(-w / 2 + 4, -h / 2 + 8, w, h, h / 2); c.fill();
  rr(c, -w / 2, -h / 2, w, h, h / 2, bg);
  c.fillStyle = fg; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, size * 0.06);
  c.restore();
}
function outlined(c, text, x, y, size, fill, stroke = C.navy, sw = 16, w = 800) {
  c.font = F(w, size); c.textAlign = 'center'; c.textBaseline = 'middle';
  c.lineJoin = 'round'; c.strokeStyle = stroke; c.lineWidth = sw; c.strokeText(text, x, y);
  c.fillStyle = fill; c.fillText(text, x, y);
}

// ---------- characters: The Kopians
const CH = {
  rizki: { skin: '#d9a07a', shirt: '#e04848', pants: '#2b3a55', hair: 'short', hairC: '#1f1712' },
  rizka: { skin: '#e3a97a', shirt: '#f08fb0', pants: '#6a3f7a', hair: 'bob', hairC: '#2a1a12', flower: '#ffd166' },
  kakak: { skin: '#d9a07a', shirt: '#2f9c8f', pants: '#2b3a55', hair: 'bun', hairC: '#2a1a12' },
  abang: { skin: '#c98d63', shirt: '#4a6fa5', pants: '#3a3a44', hair: 'messy', hairC: '#1f1712' },
  ibu: { skin: '#e0a878', shirt: '#9a6bb0', pants: '#5a3f6a', hijab: '#c0563a' },
  ayah: { skin: '#b97a55', shirt: '#5aa65a', pants: '#3a3a44', hair: 'short', hairC: '#1f1712', mustache: '#2a1a12' },
  della: { skin: '#e9b48c', shirt: '#ffd166', pants: '#3f7fbf', hair: 'bob', hairC: '#5a3018' },
  gavendra: { skin: '#c98d63', shirt: '#ef6f3c', pants: '#2b3a55', hair: 'messy', hairC: '#231c18', glasses: true },
  pria: { skin: '#c98d63', shirt: '#3f7fbf', pants: '#2b3a55', hair: 'short', hairC: '#1f1712' },
  teman: { skin: '#e9b48c', shirt: '#f2c94c', pants: '#4a4a6a', hijab: '#2f9c8f' },
  nakes: { skin: '#d9a07a', shirt: '#ffffff', pants: '#2f6fb5', hair: 'short', hairC: '#2a1a12' },
  mbok: { skin: '#c98d63', shirt: '#8a5b3d', pants: '#5a3f2a', hair: 'bun', hairC: '#cfcfcf' },
  tmas: { skin: '#e3a97a', shirt: '#f2b632', pants: '#b5543a', hair: 'bob', hairC: '#2a1a12', flower: '#ef6f3c', braid: true },
  tmaskid: { skin: '#e3a97a', shirt: '#f2b632', pants: '#b5543a', hair: 'bob', hairC: '#2a1a12', flower: '#ef6f3c' },
  pertapa: { skin: '#b8835a', shirt: '#efe7d6', pants: '#efe7d6', hair: 'side', hairC: '#f2f2f2', beard: '#f5f5f5', udeng: '#f4f1ea' },
  koko: { skin: '#d9a07a', shirt: C.orange, pants: '#3d6fb6', hat: 'straw' },
  bubu: { skin: '#f1c6a0', shirt: '#f2c94c', pants: '#7a6248', hat: 'greencap', wide: 1.28 },
  nara: { skin: '#e8b890', shirt: '#3f7fbf', pants: '#2b3a55', hair: 'bun', hairC: '#3a2416' },
  tiko: { skin: '#c98d63', shirt: '#eef0f4', pants: '#4a4a6a', hair: 'messy', hairC: '#231c18', glasses: true },
  mimi: { skin: '#e9b48c', shirt: '#f08fb0', pants: '#6a3f7a', hijab: '#7b4fb0' },
  moci: { skin: '#b97a55', shirt: '#2f9c8f', pants: '#2b3a55', hair: 'bob', hairC: '#2a1a12' },
  jabrik: { skin: '#a8714d', shirt: '#5b7f8f', vest: '#8a6a3a', pants: '#3b4a5a', hair: 'spiky', hairC: '#d9d9d9', beard: '#e6e6e6' },
  bolo: { skin: '#d9a07a', shirt: '#9a5b2e', pants: '#3a3a44', hair: 'side', hairC: '#f0f0f0', mustache: '#ffffff', peci: true },
};
function limb(c, x, y, l1, l2, a1, a2, w, col, endCol, endR) {
  const x1 = x + Math.sin(a1) * l1, y1 = y + Math.cos(a1) * l1;
  const x2 = x1 + Math.sin(a1 + a2) * l2, y2 = y1 + Math.cos(a1 + a2) * l2;
  c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.lineJoin = 'round';
  c.beginPath(); c.moveTo(x, y); c.lineTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  if (endCol) circ(c, x2, y2, endR, endCol);
  return [x2, y2];
}
// o: armL/armR (rad, outward positive), elbL/elbR, legL/legR, bob, expr, blink, talk, flip, tilt, look, prop
function kopian(c, id, x, y, s, o = {}) {
  const P = CH[id], w = P.wide || 1;
  o = Object.assign({ armL: .22, armR: .22, elbL: 0, elbR: 0, legL: 0, legR: 0, bob: 0, expr: 'happy', blink: false, talk: 0, flip: 1, tilt: 0, look: 0, shadow: true }, o);
  c.save(); c.translate(x, y); c.scale(s * o.flip, s);
  if (o.shadow) ell(c, 0, 2, 50 * w, 11, 'rgba(10,10,40,.22)');
  c.translate(0, -o.bob); c.rotate(o.tilt);
  const shoe = '#2b2b3d';
  // legs
  limb(c, -15 * w, -48, 22, 22, o.legL, -Math.abs(o.legL) * .5, 18, P.pants);
  limb(c, 15 * w, -48, 22, 22, -o.legR, Math.abs(o.legR) * .5, 18, P.pants);
  const lf = [-15 * w + Math.sin(o.legL) * 22 + Math.sin(o.legL - Math.abs(o.legL) * .5) * 22, -48 + Math.cos(o.legL) * 22 + Math.cos(o.legL - Math.abs(o.legL) * .5) * 22];
  const rf = [15 * w + Math.sin(-o.legR) * 22 + Math.sin(-o.legR + Math.abs(o.legR) * .5) * 22, -48 + Math.cos(o.legR) * 22 + Math.cos(-o.legR + Math.abs(o.legR) * .5) * 22];
  ell(c, lf[0] - 4, lf[1] + 2, 15, 8, shoe); ell(c, rf[0] + 4, rf[1] + 2, 15, 8, shoe);
  // arms behind? draw body first
  // body
  rr(c, -36 * w, -124, 72 * w, 82, 28, P.shirt);
  rr(c, -36 * w, -64, 72 * w, 20, 10, P.pants);
  if (P.vest) { poly(c, [-36 * w, -112, -12, -112, -8, -50, -36 * w, -50], P.vest); poly(c, [36 * w, -112, 12, -112, 8, -50, 36 * w, -50], P.vest); }
  const g = c.createLinearGradient(-36 * w, 0, 36 * w, 0); g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(.6, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,40,.18)');
  c.fillStyle = g; c.beginPath(); c.roundRect(-36 * w, -124, 72 * w, 82, 28); c.fill();
  // arms
  const hL = limb(c, -31 * w, -108, 24, 22, -o.armL, -o.elbL, 15, P.shirt, P.skin, 10);
  const hR = limb(c, 31 * w, -108, 24, 22, o.armR, o.elbR, 15, P.shirt, P.skin, 10);
  // props
  if (o.prop === 'clip' || P === CH.nara && o.prop !== 'none' && o.prop !== 'whistle2') { }
  if (o.prop === 'clip') { c.save(); c.translate(hL[0] - 6, hL[1] - 10); c.rotate(-.15); rr(c, -18, -26, 36, 48, 5, '#a8743f'); rr(c, -14, -20, 28, 38, 3, '#ffffff'); for (let i = 0; i < 4; i++) line(c, -9, -12 + i * 8, 9, -12 + i * 8, '#9aa6c8', 2.5); rr(c, -8, -30, 16, 8, 3, '#c0c4d0'); c.restore(); }
  if (o.prop === 'sack') { c.save(); c.translate(0, -78); ell(c, 0, 0, 62 * w, 44, '#e9dcc0'); ell(c, 0, -6, 52 * w, 30, '#f4ead4'); c.font = F(800, 22); c.fillStyle = '#b5543a'; c.textAlign = 'center'; c.fillText('BERAS', 0, 8); c.restore(); }
  if (o.prop === 'plank') { c.save(); c.translate((hL[0] + hR[0]) / 2, Math.min(hL[1], hR[1]) - 6); c.rotate(-.05); rr(c, -95, -9, 190, 18, 4, '#c58a4b'); line(c, -90, -2, 90, -2, '#a86f37', 2); c.restore(); }
  if (o.prop === 'fan') { c.save(); c.translate(hR[0], hR[1]); c.rotate(o.fanA || 0); c.fillStyle = '#e9c46a'; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 34, -PI * .85, -PI * .15); c.closePath(); c.fill(); for (let i = 0; i < 5; i++) { const a = -PI * .85 + i * PI * .7 / 4; line(c, 0, 0, Math.cos(a) * 32, Math.sin(a) * 32, '#c49a3a', 2); } c.restore(); }
  // head
  head(c, P, o, w);
  c.restore();
}
function head(c, P, o, w) {
  const hy = -184, r = 62;
  // back hair
  if (P.hair === 'bun') { circ(c, 0, hy - 66, 24, P.hairC); }
  if (P.hair === 'bob') { rr(c, -70, hy - 40, 140, 86, 36, P.hairC); }
  if (P.hijab) {
    c.fillStyle = P.hijab; c.beginPath(); c.arc(0, hy, r + 10, PI, 0); c.lineTo(r + 22, hy + 72); c.quadraticCurveTo(0, hy + 98, -r - 22, hy + 72); c.closePath(); c.fill();
    ell(c, 0, hy + 6, 50, 54, P.skin);
  } else {
    circ(c, 0, hy, r, P.skin);
    const g = c.createRadialGradient(-20, hy - 24, 10, 0, hy, r); g.addColorStop(0, 'rgba(255,255,255,.16)'); g.addColorStop(1, 'rgba(60,20,20,.12)'); c.fillStyle = g; c.beginPath(); c.arc(0, hy, r, 0, TAU); c.fill();
  }
  // front hair / hats
  if (P.hair === 'bun') { c.fillStyle = P.hairC; c.beginPath(); c.arc(0, hy, r + 2, PI * 1.02, -.02); c.quadraticCurveTo(20, hy - 34, -10, hy - 30); c.quadraticCurveTo(-40, hy - 30, -62, hy - 6); c.closePath(); c.fill(); }
  if (P.hair === 'bob') { c.fillStyle = P.hairC; c.beginPath(); c.arc(0, hy, r + 6, PI * 1.0, 0); c.lineTo(r + 6, hy - 4); c.quadraticCurveTo(10, hy - 44, -r - 6, hy + 2); c.closePath(); c.fill(); }
  if (P.hair === 'messy') { for (let i = 0; i < 8; i++) { const a = PI + .2 + i * (PI - .4) / 7; circ(c, Math.cos(a) * (r - 8), hy + Math.sin(a) * (r - 8) - 4, 22, P.hairC); } }
  if (P.hair === 'short') { c.fillStyle = P.hairC; c.beginPath(); c.arc(0, hy, r + 3, PI * 1.05, -PI * .05); c.quadraticCurveTo(20, hy - 40, -20, hy - 36); c.quadraticCurveTo(-50, hy - 30, -64, hy - 4); c.closePath(); c.fill(); }
  if (P.hair === 'spiky') { c.fillStyle = P.hairC; c.beginPath(); c.moveTo(-r, hy - 10); for (let i = 0; i <= 8; i++) { const a = PI + i * PI / 8; const rad = i % 2 ? r + 28 : r - 4; c.lineTo(Math.cos(a) * rad, hy - 6 + Math.sin(a) * rad); } c.lineTo(r, hy - 10); c.closePath(); c.fill(); }
  if (P.hair === 'side') { ell(c, -58, hy - 4, 14, 22, P.hairC); ell(c, 58, hy - 4, 14, 22, P.hairC); }
  if (P.peci) { rr(c, -46, hy - 84, 92, 34, 8, P.pecC || '#2b2f5a'); if (!P.pecC) rr(c, -46, hy - 60, 92, 6, 3, '#d8b25a'); }
  if (P.udeng) { rr(c, -64, hy - 56, 128, 22, 10, P.udeng); poly(c, [52, hy - 50, 86, hy - 70, 80, hy - 36], P.udeng); }
  if (P.flower) { for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; circ(c, 46 + Math.cos(a) * 11, hy - 40 + Math.sin(a) * 11, 8, P.flower); } circ(c, 46, hy - 40, 6, '#ffd166'); }
  if (P.braid) { for (let i = 0; i < 5; i++) circ(c, -58, hy + 30 + i * 22, 13 - i, P.hairC); }
  if (P.hat === 'straw') { ell(c, 0, hy - 44, 102, 24, '#e2b95e'); rr(c, -52, hy - 96, 104, 54, 26, '#ecc874'); rr(c, -52, hy - 62, 104, 12, 4, C.orange); ell(c, 0, hy - 44, 102, 24, 'rgba(0,0,0,0)'); c.strokeStyle = 'rgba(150,100,30,.35)'; c.lineWidth = 3; c.beginPath(); c.ellipse(0, hy - 44, 96, 19, 0, 0, PI); c.stroke(); }
  if (P.hat === 'greencap') { c.fillStyle = '#3e9a52'; c.beginPath(); c.arc(0, hy - 18, r - 2, PI, 0); c.closePath(); c.fill(); ell(c, 34, hy - 20, 46, 12, '#2f7a40'); circ(c, 0, hy - 80, 8, '#2f7a40'); }
  // face
  const ex = 21, ey = hy + 4, lx = o.look * 6;
  const e = o.expr;
  if (e === 'sleep' || o.blink) {
    c.strokeStyle = '#2a1a18'; c.lineWidth = 5; c.lineCap = 'round';
    for (const sx of [-1, 1]) { c.beginPath(); c.arc(sx * ex + lx, ey - 2, 9, .15 * PI, .85 * PI); c.stroke(); }
  } else if (e === 'happy' && !o.talk) {
    c.strokeStyle = '#2a1a18'; c.lineWidth = 5.5; c.lineCap = 'round';
    for (const sx of [-1, 1]) { c.beginPath(); c.arc(sx * ex + lx, ey + 4, 9, 1.15 * PI, 1.85 * PI); c.stroke(); }
  } else {
    const er = e === 'wow' ? 8.5 : 7;
    for (const sx of [-1, 1]) { circ(c, sx * ex + lx, ey, er, '#2a1a18'); circ(c, sx * ex + lx + 2.5, ey - 3, 2.4, '#fff'); }
  }
  // brows
  c.strokeStyle = P.hairC && !P.hijab ? (P.hair === 'spiky' || P.hair === 'side' ? '#bdbdbd' : P.hairC) : '#3a2416'; c.lineWidth = 5; c.lineCap = 'round';
  const bw = { happy: [0, 0], wow: [-10, 0], stern: [4, .35], worried: [-2, -.35], sleep: [2, 0], talk: [0, 0], proud: [-4, -.1] }[e] || [0, 0];
  for (const sx of [-1, 1]) { c.save(); c.translate(sx * ex + lx, ey - 24 + bw[0]); c.rotate(sx * bw[1]); c.beginPath(); c.moveTo(-9, 0); c.lineTo(9, 0); c.stroke(); c.restore(); }
  // cheeks
  ell(c, -40, hy + 22, 11, 7, 'rgba(240,110,120,.45)'); ell(c, 40, hy + 22, 11, 7, 'rgba(240,110,120,.45)');
  if (P.glasses) { c.strokeStyle = '#3b2a1e'; c.lineWidth = 4; for (const sx of [-1, 1]) { c.beginPath(); c.arc(sx * ex + lx, ey, 15, 0, TAU); c.stroke(); } line(c, -6 + lx, ey, 6 + lx, ey, '#3b2a1e', 4); }
  // mouth
  const my = hy + 34;
  if (P.beard) { c.fillStyle = P.beard; c.beginPath(); c.arc(0, hy + 14, 50, .1 * PI, .9 * PI); c.quadraticCurveTo(0, hy + 82, 50 * Math.cos(.1 * PI), hy + 14 + 50 * Math.sin(.1 * PI)); c.fill(); }
  if (o.prop === 'whistle') { circ(c, 0, my, 7, '#7a2a2a'); rr(c, -6, my - 4, 34, 12, 5, C.yellow); circ(c, 28, my + 2, 9, C.yellow); }
  else if (o.talk > 0.05) { ell(c, 0, my + 2, 12, 4 + 12 * o.talk, '#7a2a2a'); ell(c, 0, my + 6 + 6 * o.talk, 7, 3 * o.talk, '#e87d7d'); }
  else if (e === 'wow') { ell(c, 0, my + 4, 11, 14, '#7a2a2a'); }
  else if (e === 'sleep') { ell(c, 0, my, 6, 5, '#7a2a2a'); }
  else if (e === 'stern' || e === 'worried') { c.strokeStyle = '#7a2a2a'; c.lineWidth = 5; c.beginPath(); if (e === 'worried') c.arc(0, my + 10, 11, 1.2 * PI, 1.8 * PI); else { c.moveTo(-10, my); c.lineTo(10, my); } c.stroke(); }
  else { c.fillStyle = '#7a2a2a'; c.beginPath(); c.arc(0, my - 4, 15, .08 * PI, .92 * PI); c.closePath(); c.fill(); ell(c, 0, my + 6, 8, 3.5, '#e87d7d'); }
  if (P.mustache) { c.fillStyle = P.mustache; c.beginPath(); c.ellipse(-14, my - 10, 16, 7, -.25, 0, TAU); c.ellipse(14, my - 10, 16, 7, .25, 0, TAU); c.fill(); }
}
// run pose helper
function runPose(t, speed = 9, amp = .8) { const p = Math.sin(t * speed); return { legL: p * amp, legR: -p * amp, armL: .3 - p * .7, armR: .3 + p * .7, elbL: .6, elbR: .6, bob: Math.abs(Math.cos(t * speed)) * 10 }; }

// ---------- mini crowd figure
const MINI_SHIRT = ['#ef6f3c', '#3f7fbf', '#2f9c8f', '#f2c94c', '#e86a92', '#7b4fb0', '#5aa65a', '#f4f1ea', '#c0563a', '#4a6fa5'];
const MINI_SKIN = ['#f1c6a0', '#d9a07a', '#b97a55', '#8d5a3b', '#e8b890'];
function mini(c, x, y, s, shirt, skin, o = {}) {
  c.save(); c.translate(x, y); c.scale(s * (o.flip || 1), s);
  ell(c, 0, 1, 16, 4, 'rgba(10,10,40,.2)');
  c.translate(0, -(o.bob || 0));
  const lp = o.leg || 0;
  line(c, -6, -14, -6 + Math.sin(lp) * 8, 0, '#2f3550', 6); line(c, 6, -14, 6 - Math.sin(lp) * 8, 0, '#2f3550', 6);
  rr(c, -12, -40, 24, 28, 10, shirt);
  const up = o.up || 0;
  line(c, -10, -34, -16 - up * 2, -22 - up * 26, shirt, 5.5); line(c, 10, -34, 16 + up * 2, -22 - up * 26, shirt, 5.5);
  if (o.hold === 'plank') { rr(c, -34, -64 + (up ? 0 : 26), 68, 7, 2, '#c58a4b'); }
  circ(c, 0, -56, 17, skin);
  if (o.hair) { c.fillStyle = o.hair; c.beginPath(); c.arc(0, -58, 18, PI, 0); c.closePath(); c.fill(); }
  if (o.face !== false) { circ(c, -6, -56, 2.2, '#2a1a18'); circ(c, 6, -56, 2.2, '#2a1a18'); if (o.mouth) ell(c, 0, -47, 4, 4, '#7a2a2a'); }
  c.restore();
}
function miniLying(c, x, y, s, shirt, skin, phase) {
  c.save(); c.translate(x, y); c.scale(s, s);
  ell(c, 0, 4, 40, 7, 'rgba(0,0,20,.25)');
  const br = Math.sin(phase) * 1.2;
  rr(c, -22, -16 - br, 32, 20 + br, 9, shirt); line(c, 8, -4, 30, -4, '#2f3550', 7);
  circ(c, -34, -10, 15, skin); c.strokeStyle = '#2a1a18'; c.lineWidth = 2; c.beginPath(); c.arc(-38, -12, 3, .1 * PI, .9 * PI); c.stroke();
  rr(c, -10, -20, 46, 16, 6, 'rgba(240,230,210,.8)');
  c.restore();
}

// ---------- nature
function cloud(c, x, y, s, col = '#fff', a = 1, shade = 'rgba(160,170,210,.35)') {
  c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s);
  const B = [[-70, 10, 50], [-20, -15, 62], [40, 0, 54], [85, 18, 38], [-110, 25, 32]];
  for (const b of B) circ(c, b[0], b[1] + 8, b[2], shade);
  for (const b of B) circ(c, b[0], b[1], b[2], col);
  rr(c, -140, 10, 260, 46, 23, col);
  c.restore();
}
function palm(c, x, y, s, t, ph = 0, dark = false) {
  c.save(); c.translate(x, y); c.scale(s, s);
  const sw = Math.sin(t * 1.6 + ph) * .06;
  c.strokeStyle = dark ? '#3a2e2a' : '#8a6038'; c.lineWidth = 20; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(30, -150, 60 + sw * 200, -300); c.stroke();
  for (let i = 0; i < 7; i++) { c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 3; c.beginPath(); const yy = -30 - i * 38; c.moveTo(6 + i * 7 - 9, yy); c.lineTo(6 + i * 7 + 9, yy - 4); c.stroke(); }
  c.translate(60 + sw * 200, -300);
  const cols = dark ? ['#1e3a3a', '#24464a'] : ['#2f7a40', '#3f9a50'];
  for (let i = 0; i < 7; i++) {
    const a = -PI + i * PI / 6 + Math.sin(t * 2 + i + ph) * .05;
    c.save(); c.rotate(a); c.fillStyle = cols[i % 2];
    c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(80, -40, 170, 30); c.quadraticCurveTo(80, 10, 0, 0); c.fill(); c.restore();
  }
  circ(c, 0, 4, 16, dark ? '#3a2e2a' : '#7a5530');
  c.restore();
}
function boat(c, x, y, s, rock, people, seed) {
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(rock);
  const r = R(seed);
  for (let i = 0; i < people; i++) mini(c, -60 + i * 34, -20, .8, MINI_SHIRT[(seed + i) % 10], MINI_SKIN[(seed + i * 3) % 5], { up: (i % 2) });
  poly(c, [-110, -20, 110, -20, 85, 30, -85, 30], '#8b5a35'); poly(c, [-110, -20, 110, -20, 104, -8, -104, -8], C.cream); poly(c, [-100, 10, 100, 10, 92, 22, -92, 22], C.orange);
  c.restore();
}
function particlesSplash(c, x, y, t0, t, n, seed, col = 'rgba(255,255,255,.9)') {
  const k = t - t0; if (k < 0 || k > 1.2) return; const r = R(seed);
  for (let i = 0; i < n; i++) { const a = -PI * (.15 + r() * .7), v = 120 + r() * 260; const px = x + Math.cos(a) * v * k, py = y + Math.sin(a) * v * k + 420 * k * k; c.globalAlpha = 1 - k / 1.2; circ(c, px, py, 4 + r() * 7, col); }
  c.globalAlpha = 1;
}
function confetti(c, t0, t, n, seed, cx = W / 2, cy = 520) {
  const k = t - t0; if (k < 0 || k > 2.5) return; const r = R(seed);
  const cols = [C.yellow, C.orange, '#ffffff', '#5bc0eb', '#e86a92'];
  for (let i = 0; i < n; i++) { const a = r() * TAU, v = 300 + r() * 700; const px = cx + Math.cos(a) * v * eo(k * 1.2) * .9, py = cy + Math.sin(a) * v * eo(k * 1.2) * .6 + 260 * k * k; c.save(); c.translate(px, py); c.rotate(k * 8 + i); c.globalAlpha = clamp01(1.4 - k * .6); c.fillStyle = cols[i % 5]; c.fillRect(-7, -4, 14, 8); c.restore(); }
}
function speedLines(c, t, a, dir = 1, col = 'rgba(255,255,255,.55)') {
  if (a <= 0) return; const r = R(77 + Math.floor(t * 12)); c.save(); c.globalAlpha = a;
  for (let i = 0; i < 26; i++) { const y = r() * H, L = 120 + r() * 380, x = r() * W; line(c, x, y, x - dir * L, y, col, 3 + r() * 5); }
  c.restore();
}
function flag(c, x, y, s, t) { // white-blue-yellow-orange
  c.save(); c.translate(x, y); c.scale(s, s);
  line(c, 0, 0, 0, -420, '#d9d9e2', 9); circ(c, 0, -424, 9, C.yellow);
  const cols = ['#ffffff', '#3f7fbf', C.yellow, C.orange];
  for (let b = 0; b < 4; b++) { c.fillStyle = cols[b]; c.beginPath(); const y0 = -410 + b * 30; for (let i = 0; i <= 20; i++) { const xx = i * 9, yy = y0 + Math.sin(t * 6 - i * .45) * i * .9; i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } for (let i = 20; i >= 0; i--) { const xx = i * 9, yy = y0 + 30 + Math.sin(t * 6 - i * .45) * i * .9; c.lineTo(xx, yy); } c.closePath(); c.fill(); }
  c.restore();
}

// ---------- island (aerial, world coords)
const ISL = [];
(function () { for (let i = 0; i < 160; i++) { const a = i / 160 * TAU; const r = 760 * (1 + .1 * Math.sin(3 * a + 1) + .07 * Math.sin(5 * a + 2.3) + .04 * Math.sin(9 * a + .5) + .02 * Math.sin(17 * a)); ISL.push([Math.cos(a) * r * 1.0, Math.sin(a) * r * 1.42]); } })();
function islRad(a) { const r = 760 * (1 + .1 * Math.sin(3 * a + 1) + .07 * Math.sin(5 * a + 2.3) + .04 * Math.sin(9 * a + .5) + .02 * Math.sin(17 * a)); return r; }
function inIsl(x, y, m = 1) { const a = Math.atan2(y / 1.42, x); const r = Math.hypot(x, y / 1.42); return r < islRad(a) * m; }
function islPath(c, k = 1) { c.beginPath(); ISL.forEach((p, i) => i ? c.lineTo(p[0] * k, p[1] * k) : c.moveTo(p[0] * k, p[1] * k)); c.closePath(); }
const SOUTH = [0, islRad(PI / 2) * 1.42];
const SET = { x: -230, y: 420 }; // settlement center
const HOS = { x: 280, y: -30 };   // hospital
const LAKE = { x: 230, y: -370, rx: 190, ry: 125 };
const MOUNTS = [[-260, -830, 190], [20, -960, 230], [300, -820, 170], [-470, -620, 130]];
const HOUSES = []; (function () { const xs = [-175, -100, 40, 115], ys = [-95, 5, 105]; let i = 0; for (const yy of ys) for (const xx of xs) { HOUSES.push({ x: SET.x + xx, y: SET.y + yy, i: i, roof: ['#c9623f', '#2f8c8c', '#c9623f', '#e0a33a'][i % 4] }); i++; } })();
// order of pop: spiral-ish
const POP_ORDER = [5, 6, 1, 2, 9, 10, 4, 7, 0, 3, 8, 11];
const ROADS = [
  [[SOUTH[0] - 10, SOUTH[1] - 70], [-60, 900], [-150, 720], [SET.x - 30, SET.y + 170], [SET.x - 30, SET.y - 130]],
  [[SET.x - 230, SET.y - 45], [SET.x + 175, SET.y - 45]],
  [[SET.x - 230, SET.y + 55], [SET.x + 175, SET.y + 55]],
  [[SET.x + 175, SET.y - 45], [SET.x + 175, SET.y + 55]],
  [[SET.x + 175, SET.y - 45], [60, 230], [190, 80], [HOS.x - 60, HOS.y + 70]],
];
const PARK = { x: SET.x + 290, y: SET.y + 5, r: 78 };
const LAMPS = []; (function () { for (const x of [-210, -130, -50, 30, 110]) { LAMPS.push([SET.x + x + 20, SET.y - 45]); LAMPS.push([SET.x + x + 20, SET.y + 55]); } LAMPS.push([SET.x - 30, SET.y + 130], [SET.x - 70, SET.y + 230], [-150, 720], [-60, 900], [60, 230], [190, 80], [PARK.x, PARK.y - PARK.r - 10], [PARK.x - PARK.r - 10, PARK.y]); })();
const TREES = []; (function () {
  const r = R(11);
  for (let i = 0; i < 2600 && TREES.length < 900; i++) {
    const x = (r() - .5) * 1700, y = (r() - .5) * 2500;
    if (!inIsl(x, y, .86)) continue;
    if (Math.hypot(x - SET.x - 40, (y - SET.y) * 1.1) < 330) continue;
    if (Math.hypot(x - HOS.x, y - HOS.y) < 200) continue;
    if (Math.hypot((x - LAKE.x) / (LAKE.rx + 40), (y - LAKE.y) / (LAKE.ry + 40)) < 1) continue;
    if (y > SOUTH[1] - 330 && Math.abs(x) < 260) continue;
    if (Math.abs(x - (-100)) < 70 && y > 600 && y < 950) continue;
    let nearM = false; for (const m of MOUNTS) if (Math.hypot(x - m[0], y - m[1]) < m[2] * .9) nearM = true; if (nearM) continue;
    if (Math.hypot(x - 120, y - 120) < 90) continue;
    TREES.push([x, y, 14 + r() * 14, r()]);
  }
  TREES.sort((a, b) => a[1] - b[1]);
})();
function strokePath(c, pts, k) { // partial polyline by fraction
  let L = 0; const seglen = []; for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seglen.push(l); L += l; }
  let rem = L * clamp01(k); c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && rem > 0; i++) { const l = seglen[i - 1], f = Math.min(1, rem / l); c.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= l; }
  c.stroke();
}
function houseIso(c, x, y, s, roof, k, lit = 0, shadow = [18, 8]) {
  if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k);
  poly(c, [-24, 0, 36, -10, 36 + shadow[0], -10 + shadow[1], -24 + shadow[0], shadow[1]], 'rgba(20,30,40,.25)');
  poly(c, [22, 0, 36, -10, 36, -34, 22, -26], '#d9d4c8'); // side
  rr(c, -24, -26, 46, 26, 2, '#f6f2ea'); // front wall
  rr(c, -6, -16, 10, 16, 1, '#8a5a35'); // door
  rr(c, 8, -19, 9, 8, 1, lit ? '#ffd166' : '#6fa6c0'); rr(c, -19, -19, 9, 8, 1, lit ? '#ffd166' : '#6fa6c0');
  poly(c, [-28, -26, 26, -26, -1, -56], roof); // gable
  poly(c, [-1, -56, 14, -66, 40, -36, 26, -26], mixc(roof.length === 7 ? roof : '#c9623f', '#1b1f4b', .25));
  poly(c, [-20, -30, 18, -30, -1, -50], 'rgba(255,255,255,.18)');
  c.restore();
}
function hospitalIso(c, x, y, s, k = 1, lit = 0, shadow = [30, 14]) {
  if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k);
  poly(c, [-130, 0, 130, 0, 130 + shadow[0], shadow[1], -130 + shadow[0], shadow[1]], 'rgba(20,30,40,.25)');
  // side
  poly(c, [130, 0, 158, -20, 158, -110, 130, -90], '#cfd6dc');
  rr(c, -130, -90, 260, 90, 4, '#f7f9fb');
  // floors stripes
  rr(c, -130, -50, 260, 6, 1, '#b9805a');
  for (let i = 0; i < 9; i++) { rr(c, -118 + i * 27, -80, 18, 22, 2, lit ? '#ffe08a' : '#7fc4d8'); rr(c, -118 + i * 27, -38, 18, 22, 2, lit ? '#ffe08a' : '#7fc4d8'); }
  rr(c, -24, -36, 48, 36, 3, lit ? '#ffe9b0' : '#9fd8e6'); // entrance
  rr(c, -40, -42, 80, 8, 3, C.orange); // canopy
  // roof
  poly(c, [-130, -90, 130, -90, 158, -110, -102, -110], '#e7ebee');
  for (let i = 0; i < 6; i++) poly(c, [-92 + i * 38, -93, -62 + i * 38, -93, -48 + i * 38, -106, -78 + i * 38, -106], '#263a6e');
  circ(c, 120, -100, 0.1, '#000');
  // H sign
  circ(c, 0, -122, 20, '#3f7fbf'); c.font = F(800, 26); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('H', 0, -121);
  c.restore();
}
function lampIso(c, x, y, s, k, on) {
  if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s, s);
  line(c, 0, 0, 0, -30 * k, '#4a4f6a', 3); circ(c, 0, -31 * k, 4, on ? '#fff3c0' : '#d8dbe6');
  c.restore();
}
function treeTop(c, x, y, r, v, k = 1, night = false) {
  if (k <= 0) return; r *= k;
  const base = v < .33 ? '#2f7a40' : v < .66 ? '#3b8a46' : '#28703c';
  ell(c, x + r * .35, y + r * .35, r, r * .8, 'rgba(10,30,20,.28)');
  circ(c, x, y, r, base); circ(c, x - r * .3, y - r * .3, r * .55, 'rgba(160,220,120,.35)');
}
function mountain(c, x, y, r, sunX = -1) {
  const px = x - r * .1, py = y - r * .55;
  poly(c, [x - r, y + r * .35, px, py, x + r, y + r * .4], '#5f7f63');
  poly(c, [px, py, x + r, y + r * .4, x + r * .2, y + r * .45], '#4a6a54');
  poly(c, [x - r, y + r * .35, px, py, x - r * .2, y + r * .45], '#7a9c72');
  poly(c, [px, py, px - r * .18, py + r * .22, px + r * .05, py + r * .16, px + r * .2, py + r * .25], '#9db08a');
}
// opts: houses k array fn, roads k, park k, lamps k, hospital k, night, lights(array chain)
function drawIsland(c, t, o = {}) {
  const sh = o.shadow || [18, 8];
  // sea
  const g = c.createRadialGradient(0, 0, 400, 0, 0, 2600); g.addColorStop(0, '#2bb3c0'); g.addColorStop(.5, '#1d8aa8'); g.addColorStop(1, '#155f86');
  c.fillStyle = g; c.fillRect(-3000, -4000, 6000, 8000);
  // sea sparkle waves
  c.save(); c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = 3; c.setLineDash([30, 50]);
  for (let i = 0; i < 4; i++) { c.lineDashOffset = -t * 40 - i * 20; const k = 1.07 + i * .06 + Math.sin(t * 1.2 + i) * .006; islPath(c, k); c.stroke(); }
  c.restore();
  // shallows
  c.save(); islPath(c, 1.0); c.strokeStyle = 'rgba(120,230,220,.55)'; c.lineWidth = 140; c.lineJoin = 'round'; c.stroke(); c.lineWidth = 60; c.strokeStyle = 'rgba(180,245,230,.7)'; c.stroke();
  // sand
  islPath(c, 1.0); c.fillStyle = '#f0d9a2'; c.fill();
  // grass
  islPath(c, .95); const gg = c.createRadialGradient(0, -100, 100, 0, 0, 1200); gg.addColorStop(0, '#7dbb5e'); gg.addColorStop(1, '#5c9d4e'); c.fillStyle = gg; c.fill();
  c.restore();
  // grass patches
  const rp = R(5); for (let i = 0; i < 70; i++) { const x = (rp() - .5) * 1400, y = (rp() - .5) * 2100; if (inIsl(x, y, .85)) ell(c, x, y, 60 + rp() * 90, 30 + rp() * 50, 'rgba(60,120,50,.18)', rp() * 3); }
  // lake
  ell(c, LAKE.x, LAKE.y, LAKE.rx + 16, LAKE.ry + 14, '#d9c98f');
  const lg = c.createRadialGradient(LAKE.x - 40, LAKE.y - 30, 10, LAKE.x, LAKE.y, LAKE.rx); lg.addColorStop(0, '#6fd3e0'); lg.addColorStop(1, '#2b8fb0');
  c.fillStyle = lg; c.beginPath(); c.ellipse(LAKE.x, LAKE.y, LAKE.rx, LAKE.ry, 0, 0, TAU); c.fill();
  for (let i = 0; i < 6; i++) { const a = t * .7 + i; ell(c, LAKE.x - 100 + i * 40, LAKE.y - 30 + Math.sin(a) * 20 + i * 10, 18, 3, 'rgba(255,255,255,.5)'); }
  // river from lake to sea (east)
  c.save(); c.strokeStyle = '#3aa6c0'; c.lineWidth = 22; c.lineCap = 'round'; c.beginPath(); c.moveTo(LAKE.x + LAKE.rx - 10, LAKE.y + 30); c.quadraticCurveTo(560, -250, 700, -120); c.stroke(); c.restore();
  // mountains
  for (const m of MOUNTS) mountain(c, m[0], m[1], m[2]);
  // roads
  const rk = o.roads == null ? 1 : o.roads;
  if (rk > 0) {
    c.save(); c.lineCap = 'round'; c.lineJoin = 'round';
    ROADS.forEach((p, i) => { const k = typeof rk === 'function' ? rk(i) : rk; if (k <= 0) return; c.strokeStyle = '#d6c7a2'; c.lineWidth = 26; strokePath(c, p, k); c.strokeStyle = '#8f8f98'; c.lineWidth = 18; strokePath(c, p, k); });
    c.restore();
  }
  // park
  const pk = o.park == null ? 1 : o.park;
  if (pk > 0) { ell(c, PARK.x, PARK.y, PARK.r * eo(pk), PARK.r * .8 * eo(pk), '#8fd06a'); ell(c, PARK.x + 10, PARK.y + 5, 28 * eo(pk), 16 * eo(pk), '#5fc0d8'); c.save(); c.strokeStyle = '#e8dcb5'; c.lineWidth = 6; c.beginPath(); c.ellipse(PARK.x, PARK.y, PARK.r * .62 * eo(pk), PARK.r * .48 * eo(pk), 0, 0, TAU); c.stroke(); c.restore(); }
  // trees + buildings sorted by y
  const items = [];
  for (const tr of TREES) items.push([tr[1], 'tree', tr]);
  const hk = o.houses || (() => 1);
  for (const h of HOUSES) items.push([h.y, 'house', h]);
  if ((o.hospital == null ? 1 : o.hospital) > 0) items.push([HOS.y, 'hos']);
  const parkTrees = [[-50, -40], [40, -45], [-60, 30], [55, 35], [0, -55], [-20, 50]];
  for (const p of parkTrees) items.push([PARK.y + p[1], 'ptree', p]);
  const lk = o.lamps == null ? 1 : o.lamps;
  LAMPS.forEach((l, i) => items.push([l[1], 'lamp', l, i]));
  items.sort((a, b) => a[0] - b[0]);
  for (const it of items) {
    if (it[1] === 'tree') treeTop(c, it[2][0], it[2][1], it[2][2], it[2][3]);
    else if (it[1] === 'house') { const k = hk(it[2].i); houseIso(c, it[2].x, it[2].y, 1.15, it[2].roof, k, o.lit ? o.lit(it[2].i) : 0, sh); }
    else if (it[1] === 'hos') hospitalIso(c, HOS.x, HOS.y, 1.0, o.hospital == null ? 1 : o.hospital, o.hosLit || 0, [sh[0] * 1.6, sh[1] * 1.6]);
    else if (it[1] === 'ptree') { const k = typeof pk === 'number' ? seg(pk, .3, 1) : 1; treeTop(c, PARK.x + it[2][0], PARK.y + it[2][1], 16, .5, back(k)); }
    else if (it[1] === 'lamp') { const k = typeof lk === 'function' ? lk(it[3]) : lk; lampIso(c, it[2][0], it[2][1], 1, eo(k), o.lampOn ? o.lampOn(it[3]) : 0); }
  }
  // beach palms (south)
  const rb = R(21); for (let i = 0; i < 26; i++) { const a = PI * (.25 + rb() * .5); const r = islRad(a) * .93; const x = Math.cos(a) * r, y = Math.sin(a) * r * 1.42; treeTop(c, x, y, 12, .9); }
}
function nightOverlay(c, a) { c.save(); c.globalCompositeOperation = 'multiply'; c.globalAlpha = a; c.fillStyle = '#2a2d6e'; c.fillRect(-4000, -4000, 8000, 8000); c.restore(); }

// ---------- iris & lens transitions
function iris(c, cx, cy, r, ringCol = C.yellow, bg = C.navy) {
  c.save(); c.beginPath(); c.rect(0, 0, W, H); c.arc(cx, cy, Math.max(0, r), 0, TAU, true); c.fillStyle = bg; c.fill('evenodd');
  if (r > 0) { c.strokeStyle = ringCol; c.lineWidth = 18; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke(); }
  c.restore();
}
function lens(c, cx, cy, r, drawInside) {
  if (r <= 0) return; c.save(); c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.clip(); drawInside(); c.restore();
  c.save(); c.strokeStyle = C.yellow; c.lineWidth = 16; c.beginPath(); c.arc(cx, cy, r, 0, TAU); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 4; c.beginPath(); c.arc(cx, cy, Math.max(0, r - 14), 0, TAU); c.stroke(); c.restore();
}
function navyGrid(c, ox = 0, oy = 0) {
  const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#20265a'); g.addColorStop(1, '#141838'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(120,150,255,.13)'; c.lineWidth = 2;
  for (let x = ((ox % 60) + 60) % 60; x < W; x += 60) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
  for (let y = ((oy % 60) + 60) % 60; y < H; y += 60) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
}
function arrow(c, x1, y1, x2, y2, col, w = 12, head = 26) {
  const a = Math.atan2(y2 - y1, x2 - x1); line(c, x1, y1, x2 - Math.cos(a) * head * .6, y2 - Math.sin(a) * head * .6, col, w);
  poly(c, [x2, y2, x2 - Math.cos(a - .5) * head, y2 - Math.sin(a - .5) * head, x2 - Math.cos(a + .5) * head, y2 - Math.sin(a + .5) * head], col);
}
function dashedRing(c, x, y, r, t, col = C.yellow, w = 7) { c.save(); c.strokeStyle = col; c.lineWidth = w; c.setLineDash([22, 16]); c.lineDashOffset = -t * 60; c.beginPath(); c.arc(x, y, r, 0, TAU); c.stroke(); c.restore(); }
function sparkle(c, x, y, s, col = '#fff') { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = col; c.beginPath(); c.moveTo(0, -22); c.quadraticCurveTo(3, -3, 22, 0); c.quadraticCurveTo(3, 3, 0, 22); c.quadraticCurveTo(-3, 3, -22, 0); c.quadraticCurveTo(-3, -3, 0, -22); c.fill(); c.restore(); }
function zzz(c, x, y, t) { for (let i = 0; i < 3; i++) { const k = ((t * .6 + i / 3) % 1); c.globalAlpha = Math.sin(k * PI); c.font = F(800, 30 + i * 12); c.fillStyle = '#ffffff'; c.textAlign = 'center'; c.fillText('Z', x + k * 50 + i * 14, y - k * 110); } c.globalAlpha = 1; }
