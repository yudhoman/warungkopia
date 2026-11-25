function baby(c, x, y, s, t) {
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(-.3);
  ell(c, 20, 10, 60, 40, '#f2b632'); // kain
  circ(c, -40, -10, 38, '#e3a97a');
  c.strokeStyle = '#2a1a12'; c.lineWidth = 4; c.lineCap = 'round';
  for (const sx of [-1, 1]) { c.beginPath(); c.arc(-40 + sx * 13, -12, 6, .15 * PI, .85 * PI); c.stroke(); }
  c.beginPath(); c.arc(-40, 2, 7, .1 * PI, .9 * PI); c.stroke();
  ell(c, -58, 0, 7, 5, 'rgba(240,110,120,.5)'); ell(c, -22, 0, 7, 5, 'rgba(240,110,120,.5)');
  c.restore();
}
