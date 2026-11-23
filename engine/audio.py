import numpy as np, wave
SR=48000; D=58.3; N=int(SR*D); out=np.zeros(N)
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
# --- music: warm progression, 100bpm
bpm=104; beat=60/bpm
prog=[[261.6,329.6,392.0],[196.0,246.9,293.7],[220.0,261.6,329.6],[174.6,220.0,261.6]]
mus=np.zeros(N)
def madd(sig,t,g):
    i=int(t*SR); j=min(N,i+len(sig))
    if i<N: mus[i:j]+=sig[:j-i]*g
bar=beat*4; t=0; b=0
while t<D:
    ch=prog[b%4]
    for f in ch: madd(tone(f/2,bar,.3,bar*.9)+tone(f/2*1.003,bar,.3,bar*.9),t,.05)
    madd(tone(ch[0]/4,bar,.01,.5),t,.12); madd(tone(ch[0]/4,bar,.01,.5),t+beat*2,.1)
    for s in range(8):
        f=ch[[0,1,2,1,2,0,1,2][s]]*2; madd(tone(f,.4,.003,.15),t+s*beat/2,.05)
    if t>34.5 and t<46:  # swell layer
        for f in ch: madd(tone(f,bar,.4,bar),t,.04)
    t+=bar; b+=1
# kick-ish on beats
for k in range(int(D/beat)):
    tt=k*beat
    if tt>17.2: madd(boom()*.5,tt,.10)
tt=np.arange(N)/SR
duck=np.ones(N)
for a,b_ in [(9.9,10.5),(46.0,47.05)]:
    m=(tt>a)&(tt<b_); duck[m]=0.0
duck=np.convolve(duck,np.ones(int(SR*.08))/int(SR*.08),'same')
mus*=duck
mus*=np.minimum(1,tt/.2)*np.clip((58.3-tt)/1.2,0,1)
# --- sfx
add(boom(),0.0,.9); add(bed(5.2,.05,.25),0)  # ocean
add(bed(4.8,.2,.12),0.3)  # crowd hiss
add(boom()*.8,0.22,.6)
add(pop(),2.7,.5); add(whoosh(.8),5.1,.5); add(ding(),7.4,.45)
add(whoosh(.6),8.6,.25); add(buzz(),11.3,.5)
for k in range(30):
    add(tone(4200,.04,.002,.01),12.8+k*.15+(k%3)*.03,.06)
add(bed(4.4,.3,.05),12.75)  # fire crackle-ish
add(whoosh(.4),16.85,.35); add(whistle(),17.6,.6); add(whoosh(.45),19.0,.6)
add(bed(2.8,.01,.4),19.4)  # truck rumble
for i in range(12): add(pop(),24.95+i*.18,.45)
for i in range(6): add(click(),22.4+i*.35,.3)
add(ding(1760),29.35,.25); add(bed(5.4,.15,.18),29.5)  # rain
add(whoosh(1.2),32.8,.3)
add(siren(),36.0,.6); add(ding(1047),37.7,.3)
add(ding(1320),40.19,.35); add(ding(1480),42.16,.35); add(ding(1760),44.03,.35)
for i in range(18): add(click(),47.1+i*.1,.35)
add(bed(1.5,.2,.08),48.0)
add(whoosh(.5),50.0,.3); add(bam(),51.05,.7); add(bam(),52.3,.7); add(pop(),52.4,.4)
add(ding(784),55.3,.3)
mix=out*0.6+mus
np.save('bg.npy',mix)
mix=np.clip(mix,-1,1)
w=wave.open('bg.wav','wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix*32767*.8).astype(np.int16).tobytes()); w.close()
print('ok', np.abs(mix).max())
