const { chromium } = require('playwright'); const { spawn } = require('child_process'); const fs = require('fs');
const SC=[['s1',0,5.2],['s2',5.2,8.4],['s3',8.4,12.7],['s4',12.7,17.2],['s5',17.2,22.2],['s6',22.2,29.2],['s7',29.2,34.8],['s8a',34.8,40.0],['s8b',40.0,45.9],['s9',45.9,50.0],['s10',50.0,53.4],['s11',53.4,58.3]];
const only=process.argv.slice(2);
(async()=>{
 const b=await chromium.launch(); fs.mkdirSync(__dirname+'/out',{recursive:true});
 const jobs=SC.map((s,i)=>({i,name:s[0],f0:Math.round(s[1]*30),f1:Math.round(s[2]*30)})).filter(j=>!only.length||only.includes(j.name));
 async function worker(){ const p=await b.newPage({viewport:{width:1080,height:1920}}); p.on('pageerror',e=>console.log('ERR',e.message));
  await p.goto('file://'+__dirname+'/index.html'); await p.evaluate(()=>Promise.all([document.fonts.load('800 40px P800'),document.fonts.load('600 40px P600')]));
  while(jobs.length){ const j=jobs.shift(); const tmp=`${__dirname}/out/${String(j.i).padStart(2,'0')}_tmp.mp4`;
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-r','30',tmp]);
   for(let f=j.f0;f<j.f1;f++){ const d=await p.evaluate(t=>window.frameJPG(t),f/30); if(!ff.stdin.write(Buffer.from(d,'base64'))) await new Promise(r=>ff.stdin.once('drain',r)); }
   ff.stdin.end(); const code=await new Promise(r=>ff.on('close',r)); if(code===0) fs.renameSync(tmp,tmp.replace('_tmp','')); console.log(j.name,code); }
 }
 await Promise.all([worker(),worker(),worker(),worker()]); await b.close();
})();
