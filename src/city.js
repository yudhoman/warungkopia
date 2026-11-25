// Peta pulau Warungkopia — bentuk pulau sama persis dengan engine animasi (engine/lib.js)
const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs = {}, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

const islRad = a => 760 * (1 + .1 * Math.sin(3 * a + 1) + .07 * Math.sin(5 * a + 2.3) + .04 * Math.sin(9 * a + .5) + .02 * Math.sin(17 * a));
function islandPath(k = 1) {
  let d = '';
  for (let i = 0; i < 160; i++) { const a = i / 160 * Math.PI * 2, r = islRad(a) * k; d += (i ? 'L' : 'M') + (Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r * 1.42).toFixed(1); }
  return d + 'Z';
}
const LAKE = { x: 230, y: -370, rx: 190, ry: 125 };
const MOUNTS = [[-260, -830, 190], [20, -960, 230], [300, -820, 170], [-470, -620, 130]];

export function drawMap(svg, state, onPick) {
  svg.innerHTML = '';
  el('rect', { x: -950, y: -1300, width: 1900, height: 2600, fill: '#1d8aa8' }, svg);
  for (let i = 1; i <= 3; i++) el('path', { d: islandPath(1 + i * .05), fill: 'none', stroke: 'rgba(255,255,255,.18)', 'stroke-width': 4, 'stroke-dasharray': '30 40' }, svg);
  el('path', { d: islandPath(1), fill: 'none', stroke: 'rgba(150,240,225,.6)', 'stroke-width': 90, 'stroke-linejoin': 'round' }, svg);
  el('path', { d: islandPath(1), fill: '#f0d9a2' }, svg);
  el('path', { d: islandPath(.95), fill: '#6fb15a' }, svg);
  for (const [x, y, r] of MOUNTS) {
    el('polygon', { points: `${x - r},${y + r * .35} ${x - r * .1},${y - r * .55} ${x + r},${y + r * .4}`, fill: '#5f7f63' }, svg);
    el('polygon', { points: `${x - r},${y + r * .35} ${x - r * .1},${y - r * .55} ${x - r * .2},${y + r * .45}`, fill: '#7a9c72' }, svg);
  }
  el('ellipse', { cx: LAKE.x, cy: LAKE.y, rx: LAKE.rx, ry: LAKE.ry, fill: '#4fb3d0' }, svg);
  // roads between built places
  el('path', { d: 'M-10 1000 L-60 900 L-150 720 L-260 590 L-260 290 M-55 375 L60 230 L190 80 L220 40', fill: 'none', stroke: '#8f8f98', 'stroke-width': 18, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  el('text', { x: 0, y: -1180, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 800, 'font-size': 64, fill: '#fff' }, svg).textContent = 'PULAU WARUNGKOPIA';

  const pick = (g, info) => { g.addEventListener('click', () => onPick(info)); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(info); } }); };

  for (const z of state.masterplan || []) {
    const g = el('g', { class: 'marker', tabindex: 0, role: 'button', 'aria-label': `Kawasan ${z.name}, belum dibangun` }, svg);
    el('circle', { class: 'ring', cx: z.x, cy: z.y, r: 95, fill: 'rgba(255,255,255,.35)', stroke: 'rgba(60,60,90,.55)', 'stroke-width': 6, 'stroke-dasharray': '16 12' }, g);
    el('text', { x: z.x, y: z.y + 26, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 800, 'font-size': 80, fill: 'rgba(40,40,70,.6)' }, g).textContent = '?';
    el('text', { x: z.x, y: z.y + 140, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 700, 'font-size': 34, fill: '#fff' }, g).textContent = z.name.toUpperCase();
    pick(g, { kind: 'plan', ...z });
  }
  for (const b of state.buildings) {
    const g = el('g', { class: 'marker', tabindex: 0, role: 'button', 'aria-label': b.name }, svg);
    el('circle', { class: 'ring', cx: b.x, cy: b.y, r: 110, fill: '#ffc845', stroke: '#fff', 'stroke-width': 10 }, g);
    if (b.icon === 'school') {
      el('rect', { x: b.x - 55, y: b.y - 30, width: 110, height: 70, rx: 6, fill: '#fff' }, g);
      el('polygon', { points: `${b.x - 65},${b.y - 30} ${b.x},${b.y - 75} ${b.x + 65},${b.y - 30}`, fill: '#2f8c8c' }, g);
      el('text', { x: b.x, y: b.y + 30, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 800, 'font-size': 44, fill: '#2f8c8c' }, g).textContent = '?';
    } else if (b.icon === 'market') {
      el('circle', { cx: b.x, cy: b.y, r: 60, fill: '#fff', stroke: '#ef6f3c', 'stroke-width': 16, 'stroke-dasharray': '30 14' }, g);
    } else if (b.icon === 'house') {
      el('polygon', { points: `${b.x - 50},${b.y - 5} ${b.x},${b.y - 55} ${b.x + 50},${b.y - 5}`, fill: '#c9623f' }, g);
      el('rect', { x: b.x - 38, y: b.y - 5, width: 76, height: 50, fill: '#fff' }, g);
      el('rect', { x: b.x - 10, y: b.y + 15, width: 20, height: 30, fill: '#8a5a35' }, g);
    } else {
      el('rect', { x: b.x - 55, y: b.y - 45, width: 110, height: 90, rx: 10, fill: '#fff' }, g);
      el('circle', { cx: b.x, cy: b.y, r: 30, fill: '#2f6fb5' }, g);
      el('text', { x: b.x, y: b.y + 14, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 800, 'font-size': 40, fill: '#fff' }, g).textContent = 'H';
    }
    const ly = b.icon === 'hospital' || b.icon === 'school' ? b.y - 140 : b.y + 160;
    el('text', { x: b.x, y: ly, 'text-anchor': 'middle', 'font-family': 'Poppins', 'font-weight': 800, 'font-size': 36, fill: '#fff', stroke: '#1b2a5a', 'stroke-width': 8, 'paint-order': 'stroke' }, g).textContent = (b.short || b.name).toUpperCase();
    pick(g, { kind: 'built', ...b });
  }
}
