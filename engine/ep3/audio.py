import numpy as np, wave
SR=48000; D=270.8; N=int(SR*D); out=np.zeros(N)
rng=np.random.default_rng(1)
def add(sig,t,g=1.0):
    i=int(t*SR); j=min(N,i+len(sig)); 
    if i<N: out[i:j]+=sig[:j-i]*g
def env(n,a=.005,r=.2):
    t=np.arange(n)/SR; e=np.minimum(1,t/a)*np.exp(-t/r); return e
def tone(f,d,a=.005,r=.3,typ='sin'):
    n=int(d*SR); t=np.arange(n)/SR
    s=np.sin(2*np.pi*f*t) if typ=='sin' else (2*((f*t)%1)-1)
    return s*env(n,a,r)
def noise(d): return rng.standard_normal(int(d*SR))
def lp(x,k=0.05):
    y=np.zeros_like(x); acc=0
    for i in range(len(x)): acc+=k*(x[i]-acc); y[i]=acc
    return y
def lpf(x,k):  # fast one-pole via cumulative trick (approx with convolution)
    n=int(1/k*4); h=np.exp(-np.arange(n)*k); h/=h.sum(); return np.convolve(x,h,'same')
def boom(): n=int(.6*SR); t=np.arange(n)/SR; f=110*np.exp(-t*6)+40; return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*5)
def whoosh(d=.5,up=True):
    x=lpf(noise(d),0.02); n=len(x); e=np.sin(np.linspace(0,np.pi,n))**2; return x*e*3
def pop(): a=tone(700,.12,.002,.04); a[:3840]+=tone(1100,.08,.002,.03)*.5; return a
def ding(f=1320): return tone(f,1.0,.002,.35)+tone(f*2,1.0,.002,.2)*.3
def buzz(): n=int(.45*SR); t=np.arange(n)/SR; return np.sign(np.sin(2*np.pi*110*t))*np.minimum(1,t/.01)*np.exp(-t*3)*.4
def bam():
    a=boom()*1.2; n=lpf(noise(.25),.1)*env(int(.25*SR),.001,.05)*1.5; a[:len(n)]+=n; return a
def click():
    a=tone(2200,.05,.001,.01); n=lpf(noise(.04),.3)*.3; a[:len(n)]+=n; return a
def whistle(): n=int(.9*SR); t=np.arange(n)/SR; f=2900+90*np.sin(2*np.pi*28*t); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.minimum(1,t/.02)*np.minimum(1,(0.9-t)/.05)*.35
def siren(d=1.6):
    n=int(d*SR); t=np.arange(n)/SR; f=np.where((t*2.5)%1<.5,960,770); return np.sin(2*np.pi*np.cumsum(f)/SR)*.18*np.minimum(1,t/.05)*np.minimum(1,(d-t)/.2)
def bed(d,k,g): x=lpf(noise(d),k); n=len(x); e=np.minimum(1,np.minimum(np.arange(n),n-np.arange(n))/(SR*.3)); return x*e*g

mus=np.zeros(N)
def madd(sig,t,g):
    i=int(t*SR); j=min(N,i+len(sig))
    if i<N and i>=0: mus[i:j]+=sig[:j-i]*g
def bell(f,d=1.4):
    a=tone(f,d,.002,.5); b=tone(f*2.76,d,.002,.2)*.3; a[:len(b)]+=b; return a
def pad(f,d,g,t0):
    n=int(d*SR); tt=np.arange(n)/SR; e=np.minimum(1,tt/1.5)*np.minimum(1,(d-tt)/1.2)
    madd((np.sin(2*np.pi*f*tt)+.5*np.sin(2*np.pi*f*1.5*tt)+.3*np.sin(2*np.pi*f*2*tt))*e,t0,g)
sl=[293.7,329.6,392.0,440.0,523.3,587.3]
pat=[0,2,1,3,2,4,3,1,0,3,2,4,5,4,2,1]
# sections: (start,end,mood)
secs=[(0,20,'up'),(20,61,'warm'),(61,64.3,'up'),(64.3,82.4,'sad'),(82.4,102.3,'up'),(102.3,135.7,'build'),(135.7,156.3,'warm'),(156.3,164.1,'calm'),(164.1,212.4,'play'),(212.4,221.4,'play'),(221.4,231.6,'calm'),(231.6,249.6,'tense'),(249.6,266.4,'up'),(266.4,270.8,'calm')]
for a,b,m in secs:
    root={'up':146.8,'warm':130.8,'sad':110,'build':146.8,'calm':130.8,'play':164.8,'tense':98}[m]
    pad(root,b-a+1.2,.05 if m!='tense' else .07,a)
    if m in('up','warm','build','play'):
        step=.5 if m!='play' else .32; t=a; k=0
        while t<b-.3:
            madd(bell(sl[pat[k%16]]*(1 if m!='play' else 1.12)),t,.045); t+=step; k+=1
    if m in('build','up') :
        t=a
        while t<b-.3: madd(boom()*.5,t,.06); t+=1.0
    if m=='tense':
        n=int((b-a)*SR); tt=np.arange(n)/SR; madd(np.sin(2*np.pi*55*tt)*np.minimum(1,tt/1)*np.minimum(1,(b-a-tt)/1),a,.08)
tt=np.arange(N)/SR
duck=np.ones(N)
for a,b in [(140.6,142.4),(247.0,247.6)]:
    duck[(tt>a)&(tt<b)]=0.15
duck=np.convolve(duck,np.ones(int(SR*.1))/int(SR*.1),'same'); mus*=duck
mus*=np.minimum(1,tt/.3)*np.clip((D-tt)/1.5,0,1)
# sfx
add(pop(),.1,.5); add(ding(1568),.6,.3); add(whoosh(.8),4.6,.3); add(ding(1320),4.9,.35)
for k in range(14): add(click(),11.6+k*.15,.3)
add(ding(1760),13.8,.4); add(pop(),15.1,.4); add(pop(),17.0,.35); add(pop(),17.4,.35)
for t0 in [30.0,31.8,33.8,42.4,43.0,43.5,44.0,51.9,53.0]: add(pop(),t0,.4)
add(buzz(),39.1,.25); add(ding(1320),45.0,.3); add(whoosh(.6),49.5,.3); add(ding(1568),54.2,.4); add(bed(3,.2,.1),54.3)
add(bed(3,.2,.18),61.0)
add(bed(3.5,.05,.25),68.1)  # ombak
add(tone(90,.6,.05,.3)*1.0,71.3,.4); add(tone(80,.6,.05,.3),72.2,.3)  # kruuk
add(buzz(),78.8,.25); add(ding(1047),82.5,.3); add(pop(),84.3,.45); add(pop(),85.3,.45)
add(pop(),90.5,.4); for_ = [add(pop(),95+i*.4,.3) for i in range(4)]
for k in range(10): add(boom()*.5,98.5+k*.3,.25)
add(ding(1320),100.3,.35)
for k in range(6): add(click(),105.3+k*.35,.3)
add(whoosh(1),108.3,.25); add(bed(6,.15,.08),113.6); add(ding(1760),120.3,.3); add(bed(4,.2,.15),122.4)
add(ding(880,),129.0,.6); add(ding(880),129.7,.5); add(ding(880),130.4,.4); add(ding(880),133.5,.35)
add(bam(),142.5,.55); add(ding(1568),142.6,.4); add(bed(3,.2,.12),142.6); add(ding(1175),147.6,.3)
add(ding(880),149.3,.55); add(ding(880),150.0,.45); add(bed(1.5,.2,.08),151.1)
for k in range(6): add(click(),164.5+k*.12,.3)
for i in range(8): add(pop(),170+i*.25,.3)
add(bam(),180.5,.5); add(ding(1568),180.6,.4)
add(bed(4,.05,.08),182.6); add(pop(),187.3,.3)
for k in range(8): add(tone(220,.08,.005,.03),194.7+k*.25,.2)
add(whoosh(.8),197.9,.3); add(ding(1047),201.1,.35)
for k in range(3): add(tone(2600,.25,.002,.08),205.6+k*.15,.25)
add(bam(),209.0,.5); add(bed(.2,.6,.3),208.9)
add(buzz(),218.3,.3); add(whoosh(.8),221.5,.3)
for t0 in [225.4,226.6,227.8,229.0]: add(bam(),t0,.35)
add(ding(784),234.8,.3); add(pop(),239.4,.35); add(pop(),240.2,.35); add(pop(),241.0,.35); add(ding(1568),245.8,.35); add(ding(1760),246.2,.35); add(buzz(),247.1,.3)
add(pop(),249.8,.45); add(ding(1568),255.5,.4); add(bed(2,.2,.1),255.5); add(pop(),261.3,.4)
add(ding(1320),266.5,.35); add(ding(1760),266.9,.25)
mix=out*0.6+mus
mix=np.clip(mix,-1,1)
w=wave.open('bg.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix*32767*.8).astype(np.int16).tobytes()); w.close()
print('ok', np.abs(mix).max())
