// ── QUESTIONS ────────────────────────────────────────────────────────────────
const T2K_QS = [
  { id:'users', title:'How many people need to use the phone system?', opts:[
    {l:'1–5 users',h:'Micro-business or sole trader with a small team',v:'micro'},
    {l:'6–25 users',h:'Small business with a single office or mixed setup',v:'small'},
    {l:'26–100 users',h:'Growing SME, possibly across multiple sites',v:'mid'},
    {l:'101–500 users',h:'Mid-size organisation with complex requirements',v:'large'},
    {l:'500+ users',h:'Enterprise or multi-site organisation',v:'enterprise'}]},
  { id:'priority', title:'What matters most to your business from a phone system?', opts:[
    {l:'Simplicity — just works, no IT fuss',h:"You want a system that's easy to manage without technical help",v:'simple'},
    {l:'Features & call handling',h:'Call queues, IVR, reporting, CRM integration matter to you',v:'features'},
    {l:'Low cost',h:'Keeping monthly spend as low as possible is the priority',v:'cost'},
    {l:'Microsoft Teams integration',h:'Teams is your main collaboration tool and you want calls inside it',v:'teams'},
    {l:'Control & data security',h:'You need on-premise hosting, data sovereignty, or strict compliance',v:'security'}]},
  { id:'deployment', title:'Where would you prefer the phone system to be hosted?', opts:[
    {l:'Cloud — fully managed, no hardware',h:'You want a provider to manage everything, no on-site equipment',v:'cloud'},
    {l:'On-premises — installed in your building',h:'You want the system on your own server or hardware',v:'onprem'},
    {l:"Either — I'm open to both options",h:"You're flexible and happy to be guided",v:'either'}]},
  { id:'remoteWork', title:'How does your team work day-to-day?', opts:[
    {l:'All office-based',h:'Everyone works from one or more fixed office locations',v:'office'},
    {l:'Mixed — some office, some remote',h:'Hybrid working with staff in different locations',v:'hybrid'},
    {l:'Fully remote or multi-site',h:'Staff work from home, multiple offices, or on the road',v:'remote'}]},
  { id:'callHandling', title:'What level of call handling do you need?', opts:[
    {l:'Basic — answer calls, transfer, voicemail',h:'Standard telephony without complex routing',v:'basic'},
    {l:'Intermediate — hunt groups, auto-attendant, hold music',h:'Professional call routing but not a full contact centre',v:'intermediate'},
    {l:'Advanced — call queues, reporting, agent management',h:'High call volumes with detailed analytics and queue management',v:'advanced'},
    {l:'Contact centre — omnichannel, CRM integration, wallboards',h:'Full contact centre capability across voice, chat and email',v:'contactcentre'}]},
  { id:'integration', title:'Which business tools do you need your phone system to connect with?', opts:[
    {l:'None — standalone phone system is fine',h:"You don't need the phone system to connect to other software",v:'none'},
    {l:'Microsoft Teams',h:'You want calls to work inside Microsoft Teams',v:'teams'},
    {l:'CRM (Salesforce, HubSpot, Dynamics etc)',h:'Screen popping, click-to-dial, or call logging in your CRM',v:'crm'},
    {l:'Both Teams and CRM',h:'Full integration across your Microsoft and CRM stack',v:'both'}]},
  { id:'budget', title:"What best describes your approach to budget?", opts:[
    {l:'Lowest possible monthly cost',h:'Keeping recurring spend to a minimum is most important',v:'lowest'},
    {l:'Good value for the features on offer',h:'Willing to pay more for a system that does more',v:'value'},
    {l:'Prefer CapEx — buy outright rather than subscribe',h:"You'd rather own the system than pay monthly fees",v:'capex'},
    {l:'Enterprise budget — best solution matters most',h:'Spend is less of a concern than capability and reliability',v:'enterprise'}]}
];

// ── SCORING RULES ────────────────────────────────────────────────────────────
const T2K_RULES = [
  {q:'users',v:'micro',s:{phoneline:4,horizon:2,flow:1}},
  {q:'users',v:'small',s:{'3cx':2,horizon:3,phoneline:2,flow:2}},
  {q:'users',v:'mid',s:{'3cx':3,horizon:3,webex:2,flow:3,mitel:1}},
  {q:'users',v:'large',s:{mitel:4,'3cx':3,webex:3,flow:3,horizon:2}},
  {q:'users',v:'enterprise',s:{mitel:5,'3cx':3,webex:3,flow:3}},
  {q:'priority',v:'simple',s:{phoneline:4,horizon:3,webex:2}},
  {q:'priority',v:'features',s:{mitel:4,'3cx':4,horizon:3,webex:3,flow:3}},
  {q:'priority',v:'cost',s:{phoneline:4,'3cx':3,horizon:2}},
  {q:'priority',v:'teams',s:{flow:5,webex:4,'3cx':2}},
  {q:'priority',v:'security',s:{mitel:5,'3cx':4}},
  {q:'deployment',v:'cloud',s:{phoneline:3,horizon:3,webex:3,flow:3}},
  {q:'deployment',v:'onprem',s:{mitel:5,'3cx':5}},
  {q:'deployment',v:'either',s:{mitel:2,'3cx':2,horizon:2,webex:2,flow:2}},
  {q:'remoteWork',v:'office',s:{mitel:2,horizon:2,phoneline:2}},
  {q:'remoteWork',v:'hybrid',s:{horizon:3,webex:3,flow:3,'3cx':2}},
  {q:'remoteWork',v:'remote',s:{flow:4,webex:4,'3cx':3,horizon:3}},
  {q:'callHandling',v:'basic',s:{phoneline:4,horizon:2}},
  {q:'callHandling',v:'intermediate',s:{horizon:4,'3cx':3,flow:3,webex:2}},
  {q:'callHandling',v:'advanced',s:{'3cx':4,mitel:4,flow:4,webex:3,horizon:2}},
  {q:'callHandling',v:'contactcentre',s:{mitel:5,'3cx':4,flow:4,webex:4,horizon:3}},
  {q:'integration',v:'none',s:{phoneline:3,horizon:2,mitel:1}},
  {q:'integration',v:'teams',s:{flow:5,webex:4,'3cx':2}},
  {q:'integration',v:'crm',s:{mitel:4,'3cx':4,flow:3,webex:3,horizon:2}},
  {q:'integration',v:'both',s:{flow:5,webex:5,'3cx':3,mitel:3}},
  {q:'budget',v:'lowest',s:{phoneline:5,'3cx':3}},
  {q:'budget',v:'value',s:{horizon:4,'3cx':4,flow:3,webex:3}},
  {q:'budget',v:'capex',s:{mitel:5,'3cx':4}},
  {q:'budget',v:'enterprise',s:{mitel:4,webex:4,flow:3,'3cx':3}}
];

// ── SYSTEM DEFINITIONS ───────────────────────────────────────────────────────
const T2K_SYS = {
  mitel:{
    name:'Mitel MiVoice Business',tagline:'Enterprise-grade unified communications with genuine deployment choice',
    color:'#dc2626',
    url:'/telephone-system-reviews/mitel-mivoice-business',
    quoteUrl:'/quote/request-a-quote?plan=mitel-no-package#Quote',
    why(a){let w='<strong>Mitel MiVoice Business</strong> is built for organisations that need proven, enterprise-grade telephony with total control over where and how it\'s deployed. ';if(a.deployment==='onprem')w+='Your preference for on-premises deployment is exactly Mitel\'s sweet spot — it supports on-prem, private cloud, and public cloud on a single codebase. ';if(a.users==='enterprise'||a.users==='large')w+='At your scale, Mitel\'s support for 5 to 65,000 users on one platform eliminates the need to re-platform as you grow. ';if(a.priority==='security')w+='With full data sovereignty and on-site hardware options, it meets the strictest compliance and security requirements. ';return w;},
    pros:['Genuine on-premises deployment','Scales 5–65,000 users','Full data sovereignty','Integrated contact centre','CapEx or OpEx pricing'],
    cons:['Higher upfront cost on-prem','IT resource recommended','No native Teams integration','Not suited to micro-businesses'],
    features:['On-premise','Call recording','Contact centre','CRM integration','Mobile app','Hot desking'],
    hl:['On-premise','Contact centre']
  },
  '3cx':{
    name:'3CX',tagline:'Open-platform PBX priced by concurrent calls, not headcount',
    color:'#2563eb',
    url:'/telephone-system-reviews/3cx',
    quoteUrl:'/quote/request-a-quote?plan=3cx-no-package#Quote',
    why(a){let w='<strong>3CX</strong> stands out for its pricing model — you pay per concurrent call rather than per user, which typically delivers significant savings as your team grows. ';if(a.deployment==='onprem')w+='As one of the few modern systems available on-premises (Windows or Linux) as well as cloud-hosted, it gives you genuine deployment choice. ';if(a.priority==='cost')w+='The concurrent-call pricing model often works out considerably cheaper than per-user alternatives for businesses where many staff share a smaller number of active lines. ';if(a.integration==='teams')w+='Teams integration is supported natively, allowing calls within Microsoft Teams without additional phone licensing. ';return w;},
    pros:['Priced per concurrent call — cheaper at scale','On-premises or cloud','Built-in video conferencing','Teams integration','Open-platform SIP compatibility'],
    cons:['IT resource helps with setup','Less managed than fully hosted','Not ideal for tech-averse teams','Annual licence model'],
    features:['On-premise','Video conferencing','Teams integration','Call recording','Call queues','CRM integration'],
    hl:['On-premise','Video conferencing']
  },
  horizon:{
    name:'Gamma Horizon',tagline:'Award-winning hosted cloud PBX — fully managed, no hardware',
    color:'#7c3aed',
    url:'/telephone-system-reviews/gamma-horizon',
    quoteUrl:'/quote/request-a-quote?plan=horizon-no-package#Quote',
    why(a){let w='<strong>Gamma Horizon</strong> is the UK\'s most widely adopted hosted phone system — a complete, fully managed cloud PBX that requires no on-site hardware and minimal IT resource to run. ';if(a.priority==='simple')w+='Its web-based admin portal makes adding users, changing call routing, and managing the system straightforward without any technical background. ';if(a.remoteWork==='hybrid'||a.remoteWork==='remote')w+='Mobile apps and softphones mean staff can take calls from anywhere with the same experience as being in the office. ';return w;},
    pros:['No on-site hardware needed','Easy web-based admin portal','Strong mobile app','99.999% uptime SLA','UK-hosted data centres'],
    cons:['Cloud-only — no on-prem option','Advanced features on higher tiers','Teams integration via add-on only','Less suitable for enterprise scale'],
    features:['Cloud hosted','Mobile app','Auto-attendant','Call recording','Hunt groups','CRM integration'],
    hl:['Cloud hosted','Mobile app']
  },
  webex:{
    name:'Gamma Webex',tagline:'Horizon telephony meets Cisco Webex — AI meetings, transcription and UC in one platform',
    color:'#0891b2',
    url:'/telephone-system-reviews/gamma-webex',
    quoteUrl:'/quote/request-a-quote?plan=webex-no-package#Quote',
    why(a){let w='<strong>Gamma Webex</strong> combines Gamma\'s reliable Horizon hosted telephony network with Cisco\'s enterprise Webex platform — carrier-grade voice quality alongside AI-powered meetings, transcription, and messaging in a single licence. ';if(a.remoteWork==='hybrid'||a.remoteWork==='remote')w+='The combination of a mobile-first platform and Webex\'s desktop experience makes it particularly strong for hybrid and remote-first teams. ';if(a.callHandling==='advanced'||a.callHandling==='contactcentre')w+='AI-powered call routing, real-time transcription, and predictive insights are included natively — not as expensive add-ons. ';return w;},
    pros:['Cisco Webex AI features built in','Carrier-grade 99.999% uptime','Single licence for voice and UC','Enterprise-grade security','Strong mobile and desktop apps'],
    cons:['Cloud-only deployment','Higher cost than basic hosted','More than needed for simple telephony','Teams users may prefer Flow'],
    features:['Cloud hosted','Video conferencing','AI transcription','Call recording','CRM integration','Mobile app'],
    hl:['Video conferencing','AI transcription']
  },
  phoneline:{
    name:'Gamma Phoneline+',tagline:'The simplest PSTN replacement — ready the same day, no hardware',
    color:'#059669',
    url:'/telephone-system-reviews/gamma-phoneline-plus',
    quoteUrl:'/quote/request-a-quote?plan=phoneline-plus-no-package#Quote',
    why(a){let w='<strong>Gamma Phoneline+</strong> is the most straightforward way for small businesses and sole traders to move away from a traditional landline before the PSTN switch-off deadline. ';if(a.users==='micro')w+='At your size, a full hosted PBX would be more system than you need and cost more than necessary — Phoneline+ gives you everything a small business actually uses at a fraction of the price. ';if(a.priority==='simple')w+="There's no admin portal to learn, no hardware to configure, and no IT resource required — the setup takes minutes and it just works. ";return w;},
    pros:['Simplest possible setup','Lowest cost option','Keeps your existing number','Mobile app included','Unlimited UK calls','Ideal PSTN replacement'],
    cons:['No CRM integration','No call recording','No video conferencing','Limited to small teams','No contact centre capability'],
    features:['Cloud hosted','Mobile app','Voicemail to email','Number porting','Unlimited UK calls','Same-day activation'],
    hl:['Simplest setup','Lowest cost']
  },
  flow:{
    name:'Voiceflex Flow',tagline:'UCaaS-first platform with native Microsoft Teams PBX — no Teams Phone licence required',
    color:'#d97706',
    url:'/telephone-system-reviews/voiceflex-flow',
    quoteUrl:'/quote/request-a-quote?plan=voiceflex-flow-no-package#Quote',
    why(a){let w='<strong>Voiceflex Flow</strong> is built from the ground up as a UCaaS platform — unlike most competitors that add collaboration onto a voice system, Flow starts with unified communications and adds full PBX telephony on top. ';if(a.integration==='teams'||a.integration==='both')w+='Its standout feature is a native Microsoft Teams integration via an embedded app that gives you complete PBX call handling inside Teams — without needing a Microsoft Teams Phone licence. ';if(a.remoteWork==='remote')w+='Regardless of whether staff call from mobile, PSTN, the internet, or Teams, the experience and feature set is identical — making it the strongest option for fully distributed teams. ';return w;},
    pros:['Native Teams integration — no Phone licence','True UCaaS — not voice-first','Self-service admin portal','Contact centre built in','Same experience across all devices'],
    cons:['Cloud-only deployment','Best value for Teams-using businesses','Newer platform — less market history','More complex than basic options'],
    features:['Teams integration','Cloud hosted','Contact centre','CRM integration','Mobile app','Video conferencing'],
    hl:['Teams integration','No Teams Phone licence']
  }
};

// T2K_VIDEOS — configure each system's video
// For Wistia: { type:'wistia', id:'innvsb7xi4' }
// For YouTube: { type:'youtube', id:'dQw4w9WgXcQ' }  (just the video ID after ?v=)
// Leave null to hide the watch button for that system
const T2K_VIDEOS = {
  mitel:     null,
  '3cx':     { type:'youtube', id:'8TfD-B3fKXw' },
  horizon:   { type:'wistia',  id:'innvsb7xi4'  },
  webex:     { type:'wistia',  id:'lb9ykdf4hj'  },
  phoneline: { type:'wistia',  id:'5qy1vfqfy7'  },
  flow:      null
};

// ── STATE ────────────────────────────────────────────────────────────────────
let t2kCur = 0;
let t2kAns = {};
let t2kEnqType = null;
let t2kVidCurrentSys = null;

const T2K_LABELS = {users:'Team size',priority:'Priority',deployment:'Hosting',remoteWork:'Working style',callHandling:'Call handling',integration:'Integrations',budget:'Budget'};

// ── TRACKING ─────────────────────────────────────────────────────────────────
const t2kTrack = (()=>{
  const p = new URLSearchParams(window.location.search);
  const get = k => p.get(k)||'';
  const setCk = (k,v) => { if(v) document.cookie=k+'='+encodeURIComponent(v)+';path=/;max-age=2592000'; };
  const getCk = k => { const m=document.cookie.match('(^|;)\\s*'+k+'\\s*=\\s*([^;]+)'); return m?decodeURIComponent(m[2]):''; };
  const gclid = get('gclid')||getCk('gclid');
  if(get('gclid')) setCk('gclid',get('gclid'));
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>{ if(get(k)) setCk(k,get(k)); });
  return {
    gclid, medium:get('utm_medium')||getCk('utm_medium')||(document.referrer?'referral':'direct'),
    referrer:document.referrer, sourceUrl:window.location.href,
    utmSource:get('utm_source')||getCk('utm_source'),
    utmMedium:get('utm_medium')||getCk('utm_medium'),
    utmCampaign:get('utm_campaign')||getCk('utm_campaign'),
    utmTerm:get('utm_term')||getCk('utm_term'),
    utmContent:get('utm_content')||getCk('utm_content')
  };
})();

// ── SCORE ────────────────────────────────────────────────────────────────────
function t2kScores(){
  const s={mitel:0,'3cx':0,horizon:0,webex:0,phoneline:0,flow:0};
  T2K_RULES.forEach(r=>{ if(t2kAns[r.q]===r.v) Object.entries(r.s).forEach(([k,v])=>s[k]+=v); });
  return s;
}

// ── RENDER QUESTION ──────────────────────────────────────────────────────────
function t2kRender(){
  const q = T2K_QS[t2kCur];
  document.getElementById('t2k-qbadge').textContent = t2kCur+1;
  document.getElementById('t2k-qnum').textContent = t2kCur+1;
  document.getElementById('t2k-qtitle').textContent = q.title;
  const pct = Math.round(t2kCur/T2K_QS.length*100);
  document.getElementById('t2k-pfill').style.width = Math.max(pct,4)+'%';
  document.getElementById('t2k-ppct').textContent = pct+'%';
  document.getElementById('t2k-pof').textContent = 'Step '+(t2kCur+1)+' of '+T2K_QS.length;
  document.getElementById('t2k-opts').innerHTML = q.opts.map(o=>`
    <button class="t2k-opt${t2kAns[q.id]===o.v?' t2k-sel':''}" onclick="t2kSel('${q.id}','${o.v}',this)" type="button">
      <div class="t2k-opt-radio"></div>
      <div><div class="t2k-opt-lbl">${o.l}</div>${o.h?`<div class="t2k-opt-hint">${o.h}</div>`:''}</div>
    </button>`).join('');
  document.getElementById('t2k-next').disabled = !t2kAns[q.id];
  document.getElementById('t2k-back').style.display = t2kCur>0?'block':'none';
  const isLast = t2kCur===T2K_QS.length-1;
  const nb = document.getElementById('t2k-next');
  nb.innerHTML = isLast
    ? 'See my results <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>'
    : 'Next question <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  t2kRenderSidebar();
}

function t2kSel(qId,val,el){
  document.querySelectorAll('.t2k-opt').forEach(b=>b.classList.remove('t2k-sel'));
  el.classList.add('t2k-sel');
  t2kAns[qId]=val;
  document.getElementById('t2k-next').disabled=false;
  t2kRenderSidebar();
}

function t2kRenderSidebar(){
  document.getElementById('t2k-ans-panel').innerHTML = T2K_QS.map(q=>{
    const a=t2kAns[q.id]; const opt=q.opts.find(o=>o.v===a);
    return `<div class="t2k-ans-row"><div class="t2k-ans-q">${T2K_LABELS[q.id]}</div><div class="t2k-ans-v${a?'':' t2k-empty'}">${opt?opt.l:'Not answered yet'}</div></div>`;
  }).join('');
  const sc=t2kScores();
  const maxS=Math.max(...Object.values(sc),1);
  const sysColors={mitel:'#dc2626','3cx':'#2563eb',horizon:'#7c3aed',webex:'#0891b2',phoneline:'#059669',flow:'#d97706'};
  const sysNames={mitel:'Mitel MiVoice','3cx':'3CX',horizon:'Horizon',webex:'Webex',phoneline:'Phoneline+',flow:'Voiceflex Flow'};
  document.getElementById('t2k-scores-panel').innerHTML = Object.entries(sc).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`
    <div class="t2k-score-row">
      <div class="t2k-score-name">${sysNames[k]}</div>
      <div class="t2k-score-bar-wrap"><div class="t2k-score-bar" style="width:${v?Math.round(v/maxS*100):0}%;background:${sysColors[k]}"></div></div>
      <div class="t2k-score-num" style="color:${sysColors[k]}">${v}</div>
    </div>`).join('');
}

function t2kNext(){
  if(t2kCur<T2K_QS.length-1){ t2kCur++; t2kRender(); }
  else t2kShowResults();
}
function t2kPrev(){ if(t2kCur>0){ t2kCur--; t2kRender(); } }

// ── RESULTS ──────────────────────────────────────────────────────────────────
function t2kShowResults(){
  document.getElementById('t2k-quiz').style.display='none';
  document.getElementById('t2k-results').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
  const sc=t2kScores();
  const sorted=Object.entries(sc).sort((a,b)=>b[1]-a[1]);
  const topSc=sorted[0][1];
  document.getElementById('t2k-rlist').innerHTML = sorted.map(([sys,score],idx)=>{
    const S=T2K_SYS[sys];
    const pct=Math.round(score/Math.max(topSc,1)*100);
    const isTop=idx===0;
    const pctCls=pct>=75?'t2k-hi':pct>=45?'t2k-md':'t2k-lo';
    const rankCls=idx===0?'t2k-r1':idx===1?'t2k-r2':'t2k-r3';
    return `<div class="t2k-rcard${isTop?' t2k-top':''}">
      <div class="t2k-rcard-hd">
        <div class="t2k-rank ${rankCls}">${idx+1}</div>
        <div>${isTop?'<span class="t2k-top-badge">Best match</span>':''}<div class="t2k-rname" style="color:${S.color}">${S.name}</div><div class="t2k-rtagline">${S.tagline}</div></div>
        <div class="t2k-rmatch"><div class="t2k-rpct ${pctCls}">${pct}%</div><div class="t2k-rmatch-lbl">match score</div></div>
      </div>
      <div class="t2k-rbody">
        <div class="t2k-rwhy">${S.why(t2kAns)}</div>
        <div class="t2k-fpills">${S.features.map(f=>`<span class="t2k-fpill${S.hl.includes(f)?' t2k-hl':''}">${f}</span>`).join('')}</div>
        <div class="t2k-pros-cons">
          <div class="t2k-pros"><div class="t2k-pros-lbl">Strengths</div>${S.pros.slice(0,3).map(p=>`<div class="t2k-pro">${p}</div>`).join('')}</div>
          <div class="t2k-cons"><div class="t2k-cons-lbl">Limitations</div>${S.cons.slice(0,3).map(c=>`<div class="t2k-con">${c}</div>`).join('')}</div>
        </div>
        <div class="t2k-rfooter">
          <button class="t2k-btn-enq" type="button" onclick="t2kOpenEnq('${sys}',${pct})">Enquire about ${S.name} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>
          ${T2K_VIDEOS[sys] !== null ? `<button class="t2k-btn-watch" type="button" onclick="t2kOpenVid('${sys}','${S.name}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Watch ${S.name} overview</button>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function t2kRestart(){
  t2kCur=0; t2kAns={};
  document.getElementById('t2k-results').style.display='none';
  document.getElementById('t2k-quiz').style.display='block';
  t2kRender();
  window.scrollTo({top:0,behavior:'smooth'});
}

// ── ENQUIRY MODAL ────────────────────────────────────────────────────────────
function t2kOpenEnq(sysKey,matchPct){
  const S=T2K_SYS[sysKey];
  document.getElementById('t2k-mname').textContent=S.name;
  document.getElementById('t2k-mdot').style.background=S.color;
  document.getElementById('t2k-msubj').value='Phone system enquiry — '+S.name+' (T2K Phone System Finder)';
  document.getElementById('t2k-hsys').value=S.name;
  document.getElementById('t2k-hscore').value=matchPct+'% match';
  const ansStr=T2K_QS.map(q=>{const a=t2kAns[q.id];const opt=q.opts.find(o=>o.v===a);return T2K_LABELS[q.id]+': '+(opt?opt.l:'N/A');}).join(' | ');
  document.getElementById('t2k-hans').value=ansStr;
  const sv=(id,v)=>{ const e=document.getElementById(id); if(e) e.value=v||''; };
  sv('t2k-hgclid',t2kTrack.gclid); sv('t2k-hmed',t2kTrack.medium);
  sv('t2k-href',t2kTrack.referrer); sv('t2k-hsrc',t2kTrack.sourceUrl);
  sv('t2k-hutms',t2kTrack.utmSource); sv('t2k-hutmm',t2kTrack.utmMedium);
  sv('t2k-hutmc',t2kTrack.utmCampaign); sv('t2k-hutmt',t2kTrack.utmTerm); sv('t2k-hutmx',t2kTrack.utmContent);
  t2kEnqType=null;
  document.getElementById('t2k-enq-form').reset();
  document.getElementById('t2k-msubj').value='Phone system enquiry — '+S.name+' (T2K Phone System Finder)';
  document.getElementById('t2k-hsys').value=S.name;
  document.getElementById('t2k-hans').value=ansStr;
  document.getElementById('t2k-hscore').value=matchPct+'% match';
  sv('t2k-hgclid',t2kTrack.gclid); sv('t2k-hmed',t2kTrack.medium);
  sv('t2k-href',t2kTrack.referrer); sv('t2k-hsrc',t2kTrack.sourceUrl);
  sv('t2k-hutms',t2kTrack.utmSource); sv('t2k-hutmm',t2kTrack.utmMedium);
  sv('t2k-hutmc',t2kTrack.utmCampaign); sv('t2k-hutmt',t2kTrack.utmTerm); sv('t2k-hutmx',t2kTrack.utmContent);
  document.getElementById('t2k-equote-btn').classList.remove('t2k-eta');
  document.getElementById('t2k-ecall-btn').classList.remove('t2k-eta');
  document.getElementById('t2k-fquote').style.display='none';
  document.getElementById('t2k-fcall').style.display='none';
  document.getElementById('t2k-msubmit').style.display='none';
  document.getElementById('t2k-priv').style.display='none';
  document.getElementById('t2k-overlay').classList.add('t2k-open');
  document.body.style.overflow='hidden';
  setTimeout(()=>document.getElementById('t2k-equote-btn').focus(),320);
}

function t2kSetType(type){
  t2kEnqType=type;
  document.getElementById('t2k-htype').value=type==='call'?'Callback request':'Quote request';
  document.getElementById('t2k-equote-btn').classList.toggle('t2k-eta',type==='quote');
  document.getElementById('t2k-ecall-btn').classList.toggle('t2k-eta',type==='call');
  document.getElementById('t2k-fquote').style.display=type==='quote'?'block':'none';
  document.getElementById('t2k-fcall').style.display=type==='call'?'block':'none';
  document.getElementById('t2k-msubmit').style.display='flex';
  document.getElementById('t2k-priv').style.display='flex';
  const btn=document.getElementById('t2k-msubmit');
  btn.disabled=false;
  btn.innerHTML=type==='call'
    ?'Request a callback <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 5.5 5.5l.86-.86a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
    :'Send quote request <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
}

function t2kCloseEnq(){
  document.getElementById('t2k-overlay').classList.remove('t2k-open');
  document.body.style.overflow='';
}
function t2kOverlayClick(e){ if(e.target===document.getElementById('t2k-overlay')) t2kCloseEnq(); }

// Validation
function t2kValidate(){
  if(!t2kEnqType) return false;
  let ok=true;
  ['t2k-fq-users','t2k-fq-name','t2k-fq-email','t2k-fc-name','t2k-fc-phone'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.classList.remove('t2k-invalid');
  });
  if(t2kEnqType==='quote'){
    const u=document.getElementById('t2k-quote-users');
    const n=document.getElementById('t2k-quote-name');
    const em=document.getElementById('t2k-quote-email');
    if(!u.value||isNaN(u.value)||parseInt(u.value)<1){ document.getElementById('t2k-fq-users').classList.add('t2k-invalid'); ok=false; }
    if(!n.value.trim()){ document.getElementById('t2k-fq-name').classList.add('t2k-invalid'); ok=false; }
    if(!em.value.trim()||!em.value.includes('@')){ document.getElementById('t2k-fq-email').classList.add('t2k-invalid'); ok=false; }
  } else {
    const n=document.getElementById('t2k-call-name');
    const ph=document.getElementById('t2k-call-phone');
    if(!n.value.trim()){ document.getElementById('t2k-fc-name').classList.add('t2k-invalid'); ok=false; }
    if(!ph.value.trim()){ document.getElementById('t2k-fc-phone').classList.add('t2k-invalid'); ok=false; }
  }
  return ok;
}

// ── VIDEO MODAL ──────────────────────────────────────────────────────────────
function t2kLoadWistia(mediaId, wrap) {
  if (!document.querySelector('script[src*="wistia.com/player.js"]')) {
    const s1 = document.createElement('script');
    s1.src = 'https://fast.wistia.com/player.js';
    s1.async = true;
    document.head.appendChild(s1);
  }
  const embedScript = document.querySelector('script[src*="wistia.com/embed/' + mediaId + '"]');
  if (!embedScript) {
    const s2 = document.createElement('script');
    s2.src = 'https://fast.wistia.com/embed/' + mediaId + '.js';
    s2.async = true;
    s2.type = 'module';
    document.head.appendChild(s2);
  }
  const player = document.createElement('wistia-player');
  player.setAttribute('media-id', mediaId);
  player.style.width = '100%';
  player.style.height = '100%';
  player.style.position = 'absolute';
  player.style.top = '0';
  player.style.left = '0';
  wrap.appendChild(player);
}

function t2kOpenVid(sysKey, sysName) {
  t2kVidCurrentSys = sysKey;
  document.getElementById('t2k-vid-title').textContent = sysName + ' — Overview';
  const wrap = document.getElementById('t2k-vid-embed');
  const ph   = document.getElementById('t2k-vid-ph');
  wrap.querySelectorAll('iframe, wistia-player').forEach(el => el.remove());
  const vid = T2K_VIDEOS[sysKey];
  if (vid && vid.type === 'wistia') {
    ph.style.display = 'none';
    t2kLoadWistia(vid.id, wrap);
  } else if (vid && vid.type === 'youtube') {
    ph.style.display = 'none';
    const ifr = document.createElement('iframe');
    ifr.src = 'https://www.youtube.com/embed/' + vid.id + '?autoplay=1&rel=0';
    ifr.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    ifr.allowFullscreen = true;
    ifr.title = sysName + ' overview';
    wrap.appendChild(ifr);
  } else {
    ph.style.display = 'flex';
  }
  document.getElementById('t2k-vid-overlay').classList.add('t2k-open');
  document.body.style.overflow = 'hidden';
}

function t2kVidToEnq() {
  t2kCloseVid();
  setTimeout(() => {
    if (t2kVidCurrentSys) t2kOpenEnq(t2kVidCurrentSys, 0);
  }, 280);
}

function t2kCloseVid() {
  document.getElementById('t2k-vid-overlay').classList.remove('t2k-open');
  document.body.style.overflow = '';
  setTimeout(() => {
    const wrap = document.getElementById('t2k-vid-embed');
    wrap.querySelectorAll('iframe, wistia-player').forEach(el => el.remove());
    document.getElementById('t2k-vid-ph').style.display = 'flex';
  }, 260);
}

function t2kVidOverlayClick(e) { if (e.target === document.getElementById('t2k-vid-overlay')) t2kCloseVid(); }

// ── INIT ─────────────────────────────────────────────────────────────────────
function t2kInit() {
  t2kRender();

  const form = document.getElementById('t2k-enq-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      if (!t2kValidate()) { e.preventDefault(); return; }
      e.stopImmediatePropagation();
      const btn = document.getElementById('t2k-msubmit');
      btn.disabled = true;
      btn.innerHTML = '<div class="t2k-spinner"></div> Sending…';
    });
  }

  [['t2k-quote-users','t2k-fq-users'],['t2k-quote-name','t2k-fq-name'],
   ['t2k-quote-email','t2k-fq-email'],['t2k-call-name','t2k-fc-name'],
   ['t2k-call-phone','t2k-fc-phone']].forEach(([inId,fId]) => {
    const el = document.getElementById(inId);
    if (el) el.addEventListener('blur', function() {
      document.getElementById(fId).classList.toggle('t2k-invalid', !this.value.trim());
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { t2kCloseEnq(); t2kCloseVid(); }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', t2kInit);
} else {
  t2kInit();
}
