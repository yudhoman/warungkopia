// ===== Episode 3: sekolah, pasar, gerbang, peta (16:9)
const SCH = { x: -480, y: 430 };
const MKT = { x: 70, y: 770 };
(function () { for (let i = TREES.length - 1; i >= 0; i--) { const t = TREES[i]; if (Math.hypot(t[0] - SCH.x, t[1] - SCH.y) < 190 || Math.hypot(t[0] - MKT.x, (t[1] - MKT.y) * 1.2) < 210) TREES.splice(i, 1); } })();
const ROADS3 = [[[SET.x - 230, SET.y + 5], [SCH.x + 110, SCH.y + 5]], [[-110, 810], [MKT.x - 110, MKT.y]]];

function schoolIso(c, x, y, s, k = 1, lit = 0) {
  if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k);
  ell(c, 0, 60, 150, 50, '#9ad06a'); c.strokeStyle = '#fff'; c.lineWidth = 3; c.beginPath(); c.ellipse(0, 60, 110, 34, 0, 0, TAU); c.stroke(); // lapangan
  poly(c, [-120, 0, 120, 0, 150, 18, -90, 18], 'rgba(20,30,40,.22)');
  poly(c, [110, 0, 130, -14, 130, -60, 110, -46], '#d9d4c8');
  rr(c, -120, -46, 230, 46, 2, '#f6f2ea');
  for (let i = 0; i < 6; i++) rr(c, -108 + i * 36, -36, 22, 16, 2, lit ? '#ffd166' : '#6fa6c0');
  rr(c, -14, -24, 26, 24, 2, '#8a5a35');
  poly(c, [-130, -46, 120, -46, 140, -60, -110, -60], '#2f8c8c');
  poly(c, [-110, -60, 140, -60, 105, -92, -75, -92], '#257070');
  rr(c, -20, -100, 50, 10, 3, '#263a6e'); // ventilasi
  line(c, 150, 10, 150, -110, '#ccc', 3); poly(c, [150, -110, 190, -100, 150, -90], '#3f7fbf');
  c.restore();
}
function marketIso(c, x, y, s, k = 1, lit = 0) {
  if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k);
  ell(c, 10, 14, 150, 64, 'rgba(20,30,40,.22)');
  ell(c, 0, 0, 140, 70, '#e8dcb5');
  c.save(); c.scale(1, .5);
  for (let i = 0; i < 8; i++) { const a0 = i * PI / 4 + .14, a1 = (i + 1) * PI / 4 - .14; c.fillStyle = i % 2 ? '#ef6f3c' : '#f9efe0'; c.beginPath(); c.arc(0, 0, 140, a0, a1); c.arc(0, 0, 70, a1, a0, true); c.closePath(); c.fill(); }
  circ(c, 0, 0, 62, '#c9b98a');
  c.restore();
  // compass in courtyard
  for (let i = 0; i < 8; i++) { const a = i * PI / 4 - PI / 2, L = i % 2 ? 18 : 30; poly(c, [0, 0, Math.cos(a) * L, Math.sin(a) * L * .5, Math.cos(a + .3) * 6, Math.sin(a + .3) * 3], i === 0 ? C.yellow : '#fff'); }
  if (lit) glow(c, 0, 0, 160, 'rgba(255,210,120,.5)');
  c.restore();
}
function drawIsland3(c, t, o = {}) {
  drawIsland(c, t, o);
  c.save(); c.lineCap = 'round';
  ROADS3.forEach((p, i) => { const k = o.roads3 ? o.roads3(i) : 1; if (k <= 0) return; c.strokeStyle = '#d6c7a2'; c.lineWidth = 26; strokePath(c, p, k); c.strokeStyle = '#8f8f98'; c.lineWidth = 18; strokePath(c, p, k); });
  c.restore();
  schoolIso(c, SCH.x, SCH.y, 1.0, o.school == null ? 0 : o.school, o.lit3 || 0);
  marketIso(c, MKT.x, MKT.y, 1.0, o.market == null ? 0 : o.market, o.lit3 || 0);
}
function gateKota(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -330, -460, 90, 460, 10, '#ffffff'); rr(c, 240, -460, 90, 460, 10, '#ffffff');
  rr(c, -330, -40, 90, 40, 4, C.orange); rr(c, 240, -40, 90, 40, 4, C.orange);
  c.strokeStyle = '#3f7fbf'; c.lineWidth = 46; c.beginPath(); c.moveTo(-285, -420); c.quadraticCurveTo(0, -620, 285, -420); c.stroke();
  rr(c, -220, -400, 440, 110, 16, C.navy);
  c.font = F(800, 46); c.fillStyle = C.yellow; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('KOTA WARUNGKOPIA', 0, -360);
  c.font = F(600, 22); c.fillStyle = '#fff'; c.fillText('IBU KOTA REPUBLIK WARUNGKOPIA', 0, -316);
  for (const px of [-285, 285]) compassIcon(c, px, -500, 46);
  c.restore();
}
function compassIcon(c, x, y, r, bg = '#3f7fbf') {
  circ(c, x, y, r, bg);
  for (let i = 0; i < 8; i++) { const a = i * PI / 4 - PI / 2, L = (i % 2 ? .55 : .9) * r, w = (i % 2 ? .12 : .17) * r; poly(c, [x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, x + Math.cos(a + PI / 2) * w, y + Math.sin(a + PI / 2) * w], i === 0 ? C.yellow : '#fff'); poly(c, [x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, x + Math.cos(a - PI / 2) * w, y + Math.sin(a - PI / 2) * w], i === 0 ? C.orange : '#cfe0f2'); }
  circ(c, x, y, r * .24, C.navy); c.font = F(800, r * .34); c.fillStyle = C.yellow; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', x, y + r * .02);
}
function scroll(c, x, y, s, len, names, t, revealT) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -90, 0, 180, len, 4, '#fff8e6'); for (let i = 0; i < len / 26 - 1; i++) line(c, -70, 22 + i * 26, 70, 22 + i * 26, 'rgba(120,100,60,.25)', 2);
  names.forEach((n, i) => { const k = seg(t, revealT[i], revealT[i] + .3); if (k > 0 && 20 + i * 26 < len) { c.globalAlpha = k; c.font = F(800, 18); c.fillStyle = C.navy; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('✓ ' + n, -72, 22 + i * 26); c.globalAlpha = 1; } });
  rr(c, -100, -14, 200, 24, 12, '#c58a4b'); rr(c, -100, len - 8, 200, 24, 12, '#c58a4b');
  c.restore();
}
function subscribeBtn(c, x, y, s, k = 1) {
  if (k <= 0) return; c.save(); c.translate(x, y); c.scale(s * k, s * k);
  rr(c, -190, -50, 380, 100, 50, '#e33b3b'); c.font = F(800, 46); c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('SUBSCRIBE', 18, 3);
  c.strokeStyle = '#fff'; c.lineWidth = 5; c.beginPath(); c.arc(-140, -4, 16, PI, 0); c.lineTo(-124, 10); c.lineTo(-156, 10); c.closePath(); c.stroke(); circ(c, -140, 16, 4, '#fff');
  c.restore();
}
function bellObj(c, x, y, s, swing) {
  c.save(); c.translate(x, y); c.scale(s, s);
  line(c, -70, -120, -70, 60, '#7a5530', 12); line(c, 70, -120, 70, 60, '#7a5530', 12); line(c, -80, -120, 80, -120, '#7a5530', 12);
  c.save(); c.translate(0, -120); c.rotate(swing); line(c, 0, 0, 0, 30, '#555', 4); rr(c, -26, 30, 52, 80, 10, '#9aa6b0'); rr(c, -26, 40, 52, 8, 2, '#7a8690'); rr(c, -26, 90, 52, 8, 2, '#7a8690'); circ(c, 0, 116, 8, '#555'); c.restore();
  c.restore();
}
function noteARAH(c, x, y, s, val) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -150, -75, 300, 150, 12, '#f6f1e4'); c.strokeStyle = '#2f6fb5'; c.lineWidth = 6; c.strokeRect(-138, -63, 276, 126);
  compassIcon(c, -80, 0, 44, '#2f6fb5');
  c.font = F(800, 64); c.fillStyle = C.orange; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(val, 50, -6);
  c.font = F(800, 26); c.fillStyle = '#2f6fb5'; c.fillText('ARAH', 50, 44);
  c.restore();
}
function coin(c, x, y, r) { circ(c, x, y, r, '#e8b83a'); circ(c, x, y, r * .78, '#f6cf5a'); c.font = F(800, r); c.fillStyle = '#8a5a10'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('1', x, y + 2); }
function fishStall(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -170, -60, 340, 60, 6, '#a8743f'); rr(c, -180, -240, 16, 240, 4, '#7a5530'); rr(c, 164, -240, 16, 240, 4, '#7a5530');
  for (let i = 0; i < 6; i++) poly(c, [-200 + i * 66, -250, -134 + i * 66, -250, -140 + i * 66, -200, -206 + i * 66, -200], i % 2 ? '#fff' : '#3f7fbf');
  for (let i = 0; i < 5; i++) { const fx = -130 + i * 62; ell(c, fx, -76, 28, 12, '#8ab0c8'); poly(c, [fx + 26, -76, fx + 42, -88, fx + 42, -64], '#8ab0c8'); circ(c, fx - 16, -78, 3, '#222'); }
  c.restore();
}
function foodStall(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s);
  rr(c, -170, -60, 340, 60, 6, '#a8743f'); rr(c, -180, -240, 16, 240, 4, '#7a5530'); rr(c, 164, -240, 16, 240, 4, '#7a5530');
  for (let i = 0; i < 6; i++) poly(c, [-200 + i * 66, -250, -134 + i * 66, -250, -140 + i * 66, -200, -206 + i * 66, -200], i % 2 ? '#fff' : C.orange);
  for (let i = 0; i < 4; i++) { const fx = -120 + i * 80; poly(c, [fx - 26, -64, fx + 26, -64, fx + 14, -96, fx - 14, -96], '#7fae3f'); rr(c, fx - 6, -104, 12, 10, 3, '#5a8a2f'); }
  c.restore();
}
function speech(c, x, y, text, size = 40, k = 1, tailDir = 1) {
  if (k <= 0) return; c.save(); c.translate(x, y); c.scale(k, k);
  c.font = F(800, size); const w = c.measureText(text).width + size * 1.2, h = size * 1.9;
  rr(c, -w / 2, -h / 2, w, h, h / 2, '#fff'); poly(c, [tailDir * 20 - 14, h / 2 - 4, tailDir * 20 + 14, h / 2 - 4, tailDir * 50, h / 2 + 30], '#fff');
  c.fillStyle = C.navy; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, 0, 3); c.restore();
}
