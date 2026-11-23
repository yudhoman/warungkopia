// The Kopians — Dewan Delapan Arah (docs/CHARACTER_BIBLE.md)
export const KOPIANS = [
  { id: 'tiko', name: 'Tiko', dir: 'Utara', role: 'Teknologi & Energi', trait: 'Penemu, otak teknik. Selalu membuka cetak biru di saat yang tidak tepat.' },
  { id: 'moci', name: 'Moci', dir: 'Timur Laut', role: 'Pendidikan & Pengawasan', trait: 'Cerdas dan kritis. Pertanyaan andalannya: "biayanya dari mana?"' },
  { id: 'koko', name: 'Koko', dir: 'Timur', role: 'Pembangunan & Kerja Warga', trait: 'Optimis dan selalu semangat. Orang pertama yang melompat, kadang terlalu cepat.' },
  { id: 'bubu', name: 'Bubu', dir: 'Tenggara', role: 'Pangan & Pasar', trait: 'Polos, lucu, selalu lapar. Menilai semua hal dari makanannya.' },
  { id: 'jabrik', name: 'Pak Jabrik', dir: 'Selatan', role: 'Kelautan & Pelabuhan', trait: 'Nelayan tua. Ceritanya selalu dimulai "Dulu, waktu laut masih..."' },
  { id: 'mimi', name: 'Mimi', dir: 'Barat Daya', role: 'Informasi & Komunikasi', trait: 'Tahu semua kabar. Kabarnya selalu sampai sebelum pengumuman resmi.' },
  { id: 'nara', name: 'Nara', dir: 'Barat', role: 'Tata Kota & Aturan', trait: 'Perfeksionis dan taat aturan. Meniup peluit kalau ada yang melanggar garis.' },
  { id: 'bolo', name: 'Pak Bolo', dir: 'Barat Laut', role: 'Penasihat Tetua', trait: 'Warga senior yang sok tahu. Menunjuk arah yang salah dengan sangat yakin.' },
];

export function renderKopians(root) {
  root.innerHTML = KOPIANS.map(k => `
    <article class="kop">
      <img src="assets/characters/${k.id}.png" alt="${k.name}" width="150" height="195">
      <span class="dir">${k.dir.toUpperCase()}</span>
      <h3>${k.name}</h3>
      <span class="role">${k.role}</span>
      <p class="trait">${k.trait}</p>
    </article>`).join('');
}
