import json,re,subprocess
out=json.load(open('segs.json'))
raw=subprocess.check_output("ffmpeg -i vo.mp3 -af silencedetect=noise=-35dB:d=0.18 -f null - 2>&1 | grep -oE 'silence_(start|end): [0-9.]+' | awk '{print $2}'",shell=True).decode().split()
v=list(map(float,raw)); segs=[];prev=0.0
for i in range(0,len(v),2):
    segs.append([prev,v[i]]); prev=v[i+1] if i+1<len(v) else None
segs.append([prev,269.32])
gaps=[(segs[i][1],segs[i+1][0]) for i in range(len(segs)-1)]
def syl(w):
    w=w.lower()
    for k,n in {'2.500':7,'2.536':14,'2.537':14,'3 ':2}.items():
        if k in w: return n
    return max(1,len(re.findall(r'[aiueo]+',w)))
def regroup(i0,i1):
    st=out[i0][0]; en=out[i1][1]
    sp=[(max(a,st),min(b,en)) for a,b in segs if b>st and a<en]
    T=sum(b-a for a,b in sp)
    S=[sum(syl(w) for w in out[i][2].split()) for i in range(i0,i1+1)]
    tot=sum(S); acc=0; prevb=st
    def s2r(x):
        c=0
        for a,b in sp:
            if x<=c+(b-a): return a+(x-c)
            c+=b-a
        return en
    for k,i in enumerate(range(i0,i1)):
        acc+=S[k]; r=s2r(acc/tot*T)
        cand=[g for g in gaps if st<g[0]<en and g[0]>prevb+.3]
        g=min(cand,key=lambda g:abs((g[0]+g[1])/2-r)) if cand else (r,r)
        if abs((g[0]+g[1])/2-r)>1.0: g=(r,r)
        out[i][1]=round(g[0],2); out[i+1][0]=round(g[1],2); prevb=g[1]
for a,b in [(8,9),(10,12),(22,25),(29,31),(33,46),(67,70)]: regroup(a,b)
json.dump(out,open('segs.json','w'),ensure_ascii=False)
for i,(a,b,s) in enumerate(out):
    n=sum(syl(w) for w in s.split()); r=n/max(.1,b-a)
    print(i,f'{a:7.2f} {b:7.2f} {r:4.1f}', s[:50])
