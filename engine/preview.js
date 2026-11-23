const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + __dirname + '/index.html'); await p.evaluate(() => document.fonts.load('800 40px P800')); await p.evaluate(() => document.fonts.load('600 40px P600'));
  const ts = process.argv.slice(2).map(Number); fs.mkdirSync(__dirname + '/prev', { recursive: true });
  for (const t of ts) { try { const d = await p.evaluate(t => window.frameJPG(t), t); fs.writeFileSync(`${__dirname}/prev/f_${t}.jpg`, Buffer.from(d, 'base64')); } catch (e) { errs.push(t + ': ' + e.message); } }
  console.log(errs.join('\n') || 'ok'); await b.close();
})();
