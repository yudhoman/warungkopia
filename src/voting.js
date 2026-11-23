// Siklus voting mingguan (docs/GOVERNMENT_SYSTEM.md)
const CYCLE = [
  ['Kamis', 'Episode tayang dan bertanya: bangun apa berikutnya?'],
  ['Kamis–Sabtu', 'Warga mengirim usulan lewat komentar.'],
  ['Minggu', '4 usulan teratas masuk polling Community YouTube.'],
  ['Minggu–Selasa', 'Polling dibuka.'],
  ['Rabu', 'Hasil dikunci, produksi dimulai.'],
  ['Kamis', 'Pemenang dibangun di episode baru.'],
];

export function renderVoting(cycleRoot, votesRoot, state) {
  cycleRoot.innerHTML = CYCLE.map(([d, w]) => `<li><span class="day">${d}</span><span class="what">${w}</span></li>`).join('');
  const v = state.voting || [];
  votesRoot.innerHTML = v.length ? v.map(x => `
    <div class="vote">
      <div><strong>Episode ${x.episode}</strong> · ${x.question}</div>
      <div>Pemenang: <span class="win">${x.winner}</span> → dibangun di Episode ${x.built_in}</div>
    </div>`).join('') : '<p>Belum ada voting.</p>';
}
