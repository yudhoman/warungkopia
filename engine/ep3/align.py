import re,json,subprocess
D=269.322438
raw=subprocess.check_output("ffmpeg -i vo.mp3 -af silencedetect=noise=-35dB:d=0.18 -f null - 2>&1 | grep -oE 'silence_(start|end): [0-9.]+' | awk '{print $2}'",shell=True).decode().split()
v=list(map(float,raw)); segs=[];prev=0.0
for i in range(0,len(v),2):
    segs.append([prev,v[i]]); prev=v[i+1] if i+1<len(v) else None
if prev: segs.append([prev,D])
def syl(w):
    w=w.lower()
    nums={'2.500':7,'2.536':14,'2.537':14,'3':2}
    for k,n in nums.items():
        if k in w: return n
    m=re.findall(r'[aiueo]+',w); return max(1,len(m))
sents=[l.strip() for l in open('script.txt') if l.strip()]
S=[sum(syl(w) for w in s.split()) for s in sents]
tot=sum(S); T=sum(b-a for a,b in segs)
# speech-time -> real time
def s2r(x):
    acc=0
    for a,b in segs:
        d=b-a
        if x<=acc+d: return a+(x-acc)
        acc+=d
    return segs[-1][1]
# boundaries snapped to gap edges
gaps=[(segs[i][1],segs[i+1][0]) for i in range(len(segs)-1)]
bounds=[0.0]; acc=0
for i,s in enumerate(S[:-1]):
    acc+=s; r=s2r(acc/tot*T)
    g=min(gaps,key=lambda g:abs((g[0]+g[1])/2-r))
    bounds.append(g)
out=[]
for i,s in enumerate(sents):
    st=bounds[i][1] if isinstance(bounds[i],tuple) else 0.05
    en=bounds[i+1][0] if i+1<len(bounds) else D
    out.append([round(st,2),round(en,2),s])
for o in out: print(o)
json.dump(out,open('segs.json','w'),ensure_ascii=False)

# ---- DP alignment: boundaries to distinct increasing gaps
import math
G=len(gaps); B=len(S)-1
# speech-time position of each gap (cumulative speech before gap)
cum=[];acc=0
for a,b in segs[:-1]:
    acc+=b-a; cum.append(acc)
exp=[];acc=0
for s in S[:-1]:
    acc+=s; exp.append(acc/tot*T)
INF=1e18
dp=[[INF]*G for _ in range(B)]; bk=[[-1]*G for _ in range(B)]
def cost(i,j): return abs(cum[j]-exp[i]) - 2.5*(gaps[j][1]-gaps[j][0])
for j in range(G): dp[0][j]=cost(0,j)
for i in range(1,B):
    best=INF;bj=-1
    for j in range(G):
        if j-1>=0 and dp[i-1][j-1]<best: best=dp[i-1][j-1]; bj=j-1
        if best<INF: dp[i][j]=best+cost(i,j); bk[i][j]=bj
j=min(range(G),key=lambda j:dp[B-1][j]); sel=[0]*B
for i in range(B-1,-1,-1): sel[i]=j; j=bk[i][j]
out=[]
for i,s in enumerate(sents):
    st=0.05 if i==0 else gaps[sel[i-1]][1]
    en=D if i==B else gaps[sel[i]][0]
    out.append([round(st,2),round(en,2),s])
print('----DP')
for o in out: print(o[0],o[1],o[2][:60])
json.dump(out,open('segs.json','w'),ensure_ascii=False)
