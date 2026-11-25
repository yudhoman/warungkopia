import { drawMap } from './city.js';
import { renderKopians } from './characters.js';
import { renderVoting } from './voting.js';

const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString('id-ID');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function countUp(node, to, ms = 1600) {
  if (reduce) { node.textContent = fmt(to); return; }
  const t0 = performance.now();
  const step = t => { const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3); node.textContent = fmt(Math.round(to * e)); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

function showInfo(info, state) {
  const box = $('map-info');
  if (info.kind === 'built') {
    const ep = (state.episodes || []).find(e => e.no === info.episode);
    box.innerHTML = `<span class="tag" style="background:#ffc845">SUDAH BERDIRI · ${info.id}</span>
      <h3>${info.name}</h3><p>${info.detail}</p>
      <p style="color:#4a5478;font-size:14px">Dibangun di Episode ${info.episode}${ep && ep.population ? ` · penduduk ${fmt(ep.population)}` : ''} · hasil usulan warga</p>`;
  } else {
    box.innerHTML = `<span class="tag" style="background:#e6e6ef">BELUM DIBANGUN</span>
      <h3>Kawasan ${info.name}</h3><p>Ada di peta masterplan, tapi belum ada apa-apa di sini. Warga bisa mengusulkannya di episode berikutnya.</p>
      <a class="btn btn-primary" href="#voting">Cara mengusulkan</a>`;
  }
}

async function init() {
  const state = await (await fetch('data/state.json', { cache: 'no-cache' })).json();
  const pop = state.population[state.population.length - 1].value;
  countUp($('pop'), pop);
  $('capital').textContent = state.capital;
  $('s-build').textContent = state.buildings.length;
  $('s-stage').textContent = state.stage;
  $('s-ep').textContent = (state.episodes || []).filter(e => e.status !== 'pra-produksi').length;
  $('updated').textContent = new Date(state.updated).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  if (state.links) { $('yt').href = state.links.youtube; $('community').href = state.links.community; }

  drawMap($('map'), state, info => showInfo(info, state));

  $('builds').innerHTML = state.buildings.map(b => `
    <article class="build"><span class="id">${b.id} · EPISODE ${b.episode}</span><h3>${b.name}</h3><p style="margin:0">${b.detail}</p><span class="meta">Tahap ${b.stage} · usulan warga</span></article>`).join('');
  const n = state.next || {};
  $('next').innerHTML = `<span class="q" aria-hidden="true">?</span><div><h3>Berikutnya: Episode ${n.episode ?? ''}</h3><p style="margin:4px 0 0">${n.status ?? ''}${n.format ? ' · ' + n.format : ''}. Bangunannya ditentukan lewat voting warga.</p></div>`;

  renderVoting($('cycle'), $('votes'), state);
  renderKopians($('kops'));

  $('timeline').innerHTML = (state.episodes || []).map(e => {
    const soon = e.status === 'pra-produksi';
    return `<li><span class="dot ${soon ? 'soon' : ''}">${e.no}</span>
      <h3>Episode ${e.no}${e.format === 'short' ? ' · Short' : ' · Video panjang'}</h3>
      <span class="when">${e.date ? new Date(e.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : soon ? 'Segera' : 'November 2026'}${e.population ? ' · ' + fmt(e.population) + ' warga' : ''}</span>
      <p>${e.summary}</p></li>`;
  }).join('');
}
init().catch(err => { console.error(err); document.getElementById('pop').textContent = '2.500'; });
