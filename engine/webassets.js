const {chromium}=require('playwright');const fs=require('fs');const out='/home/claude/warungkopia/assets/';
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log(e.message));
await p.goto('file://'+__dirname+'/webassets.html');await p.evaluate(()=>Promise.all([document.fonts.load('800 40px P800'),document.fonts.load('600 40px P600')]));
for(const id of ['koko','bubu','nara','tiko','mimi','moci','jabrik','bolo']){const d=await p.evaluate(i=>window.kop(i),id);fs.writeFileSync(out+'characters/'+id+'.png',Buffer.from(d.split(',')[1],'base64'));}
for(const [n,night] of [['day',false],['night',true]]){const d=await p.evaluate(x=>window.hero(x),night);fs.writeFileSync(out+'backgrounds/hero-'+n+'.jpg',Buffer.from(d.split(',')[1],'base64'));}
await b.close();console.log('ok')})();
