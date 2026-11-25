const { chromium } = require('playwright'); const { spawn } = require('child_process'); const fs = require('fs');
const SC=[['s_open',0,20.0],['s_warga',20.0,60.9],['s_masalah',60.9,86.3],['s_rapat',86.3,102.3],['s_plot',102.3,108.2],['s_cut',108.2,126.4],['s_bell',126.4,135.7],['s_nama',135.7,149.1],['s_kelas',149.1,156.3],['s_dawn',156.3,164.1],['s_pasar',164.1,182.4],['s_lapak',182.4,197.7],['s_trans',197.7,212.4],['s_bolo',212.4,221.4],['s_peta',221.4,249.6],['s_cta',249.6,266.4],['s_motto',266.4,270.8]];
const only=process.argv.slice(2);
(async()=>{
 const b=await chromium.launch(); fs.mkdirSync(__dirname+'/out',{recursive:true});
 const jobs=SC.map((s,i)=>({i,name:s[0],f0:Math.round(s[1]*30),f1:Math.round(s[2]*30)})).filter(j=>!only.length||only.includes(j.name));
 async function worker(){ const p=await b.newPage({viewport:{width:1920,height:1080}}); p.on('pageerror',e=>console.log('ERR',e.message));
  await p.goto('file://'+__dirname+'/index.html'); await p.evaluate(()=>Promise.all([document.fonts.load('800 40px P800'),document.fonts.load('600 40px P600')]));
  while(jobs.length){ const j=jobs.shift(); const tmp=`${__dirname}/out/${String(j.i).padStart(2,'0')}_tmp.mp4`;
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r','30',tmp]);
   for(let f=j.f0;f<j.f1;f++){ const d=await p.evaluate(t=>window.frameJPG(t),f/30); if(!ff.stdin.write(Buffer.from(d,'base64'))) await new Promise(r=>ff.stdin.once('drain',r)); }
   ff.stdin.end(); const code=await new Promise(r=>ff.on('close',r)); if(code===0) fs.renameSync(tmp,tmp.replace('_tmp','')); console.log(j.name,code); }
 }
 await Promise.all([worker(),worker(),worker(),worker()]); await b.close();
})();
