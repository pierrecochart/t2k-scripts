// ══════════════════════════════════════════════════════════════════════════
// CONFIG
// ══════════════════════════════════════════════════════════════════════════
// Set to false to disable the silent background lead-capture that fires the
// moment someone reaches the results screen (they've already given name +
// email by then). Even if they never click "Enquire", you still get the lead.
const T2K_AUTO_CAPTURE_LEAD = true;
const T2K_WEB3FORMS_KEY = 'a2e6818c-17e4-4096-b8b3-faec70fce22e';

// Priority weighting applied to raw match scores before ranking.
// 1 = full weight. Lower numbers mean a system needs a stronger, more specific
// signal in the answers before it'll outrank your core four (Phoneline+,
// Horizon, 3CX, Webex). Tune freely — this is the one place to adjust it.
const T2K_PRIORITY = {
  phoneline: 1,
  horizon:   1,
  '3cx':     1,
  webex:     1,
  mitel:     0.75,
  flow:      0.45
};

// ══════════════════════════════════════════════════════════════════════════
// ATTRIBUTION TRACKING — captured once on page load, attached to every
// outbound submission (auto-capture, "top pick" flag, callback request) so
// nothing gets lost when the person doesn't come straight from an ad click.
// gclid + UTM params persist for 30 days via cookie so they survive if
// someone browses the site before reaching the quiz. Landing page is a
// session cookie (no expiry) — first page of this visit, distinct from
// "previous page" which is wherever they were immediately before this page.
// ══════════════════════════════════════════════════════════════════════════
const t2kTrack = (()=>{
  const p = new URLSearchParams(window.location.search);
  const get = k => p.get(k)||'';
  const setCk = (k,v,days) => {
    if(!v) return;
    let str = k+'='+encodeURIComponent(v)+';path=/';
    if(days) str += ';max-age='+(days*86400);
    document.cookie = str;
  };
  const getCk = k => { const m=document.cookie.match('(^|;)\\s*'+k+'\\s*=\\s*([^;]+)'); return m?decodeURIComponent(m[2]):''; };

  const gclid = get('gclid')||getCk('gclid');
  if(get('gclid')) setCk('gclid',get('gclid'),30);
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>{ if(get(k)) setCk(k,get(k),30); });

  // Landing page: first page of this browser session. Session cookie (no
  // max-age) so it resets naturally when the browser closes, rather than
  // persisting for 30 days like the ad-attribution fields above.
  let landingPage = getCk('t2k_landing');
  if(!landingPage){
    landingPage = window.location.href;
    setCk('t2k_landing', landingPage, 0);
  }

  const device = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

  return {
    gclid,
    medium: get('utm_medium')||getCk('utm_medium')||(document.referrer?'referral':'direct'),
    referrer: document.referrer,        // previous page (could be external or internal)
    sourceUrl: window.location.href,    // current page
    landingPage,                        // first page of this session
    device,
    utmSource:  get('utm_source')||getCk('utm_source'),
    utmMedium:  get('utm_medium')||getCk('utm_medium'),
    utmCampaign:get('utm_campaign')||getCk('utm_campaign'),
    utmTerm:    get('utm_term')||getCk('utm_term'),
    utmContent: get('utm_content')||getCk('utm_content')
  };
})();

// Appends the standard attribution fields to any outbound FormData submission
function t2kAppendTracking(fd){
  fd.append('gclid', t2kTrack.gclid);
  fd.append('medium', t2kTrack.medium);
  fd.append('device', t2kTrack.device);
  fd.append('previous_page', t2kTrack.referrer);
  fd.append('landing_page', t2kTrack.landingPage);
  fd.append('source_url', t2kTrack.sourceUrl);
  fd.append('utm_source', t2kTrack.utmSource);
  fd.append('utm_medium', t2kTrack.utmMedium);
  fd.append('utm_campaign', t2kTrack.utmCampaign);
  fd.append('utm_term', t2kTrack.utmTerm);
  fd.append('utm_content', t2kTrack.utmContent);
}

// ══════════════════════════════════════════════════════════════════════════
// QUESTIONS
// section:'quiz'  → the original 7 diagnostic questions. These are the only
//                   ones counted in the "Question X of Y" / progress bar.
// section:'lead'  → the progressive personal-detail questions. Deliberately
//                   excluded from the quiz counter (see t2kRender) since
//                   they aren't part of the matching quiz itself.
// ══════════════════════════════════════════════════════════════════════════
const T2K_QS = [
  { id:'users', section:'quiz', type:'number', title:'How many people need to use the phone system?', placeholder:'e.g. 12', hint:'A rough estimate is fine.' },
  { id:'priority', section:'quiz', type:'choice', title:'What matters most to your business from a phone system?', opts:[
    {l:'Simplicity — just works, no IT fuss',h:"You want a system that's easy to manage without technical help",v:'simple'},
    {l:'Features & call handling',h:'Call queues, IVR, reporting, CRM integration matter to you',v:'features'},
    {l:'Low cost',h:'Keeping monthly spend as low as possible is the priority',v:'cost'},
    {l:'Control & data security',h:'You need on-premise hosting, data sovereignty, or strict compliance',v:'security'}]},
  { id:'deployment', section:'quiz', type:'choice', title:'Where would you prefer the phone system to be hosted?', opts:[
    {l:'Cloud — fully managed, no hardware',h:'You want a provider to manage everything, no on-site equipment',v:'cloud'},
    {l:'On-premises — installed in your building',h:'You want the system on your own server or hardware',v:'onprem'},
    {l:"Either — I'm open to both options",h:"You're flexible and happy to be guided",v:'either'}]},
  { id:'remoteWork', section:'quiz', type:'choice', title:'How does your team work day-to-day?', opts:[
    {l:'All office-based',h:'Everyone works from one or more fixed office locations',v:'office'},
    {l:'Mixed — some office, some remote',h:'Hybrid working with staff in different locations',v:'hybrid'},
    {l:'Fully remote or multi-site',h:'Staff work from home, multiple offices, or on the road',v:'remote'}]},
  { id:'callHandling', section:'quiz', type:'choice', title:'What level of call handling do you need?', opts:[
    {l:'Basic — answer calls, transfer, voicemail',h:'Standard telephony without complex routing',v:'basic'},
    {l:'Intermediate — hunt groups, auto-attendant, hold music',h:'Professional call routing but not a full contact centre',v:'intermediate'},
    {l:'Advanced — call queues, reporting, agent management',h:'High call volumes with detailed analytics and queue management',v:'advanced'},
    {l:'Contact centre — omnichannel, CRM integration, wallboards',h:'Full contact centre capability across voice, chat and email',v:'contactcentre'}]},
  { id:'integration', section:'quiz', type:'choice', title:'Which business tools do you need your phone system to connect with?', opts:[
    {l:'None — standalone phone system is fine',h:"You don't need the phone system to connect to other software",v:'none'},
    {l:'CRM (Salesforce, HubSpot, Dynamics etc)',h:'Screen popping, click-to-dial, or call logging in your CRM',v:'crm'},
    {l:'Microsoft 365 / Teams and CRM',h:'Full integration across your Microsoft and CRM stack',v:'both'}]},
  { id:'budget', section:'quiz', type:'choice', title:"What best describes your approach to budget?", opts:[
    {l:'Lowest possible monthly cost',h:'Keeping recurring spend to a minimum is most important',v:'lowest'},
    {l:'Good value for the features on offer',h:'Willing to pay more for a system that does more',v:'value'},
    {l:'Prefer CapEx — buy outright rather than subscribe',h:"You'd rather own the system than pay monthly fees",v:'capex'},
    {l:'Enterprise budget — best solution matters most',h:'Spend is less of a concern than capability and reliability',v:'enterprise'}]},

  { id:'leadName', section:'lead', type:'text', title:'What is your name?', placeholder:'Jane Smith' },
  { id:'leadCompany', section:'lead', type:'text', title:'And, what is your company called?', placeholder:'Acme Ltd' },
  { id:'leadEmail', section:'lead', type:'email', title:'Where should we send your comparison quote?', hint:'We take your privacy seriously and only use your email address to provide you with details of the best phone system for your business.', placeholder:'name@example.com' },
  { id:'wantCallback', section:'lead', type:'choice', title:'Finally, would you like us to call you to answer any questions you have?', opts:[
    {l:'Yes', v:'yes'},
    {l:'No', v:'no'}
  ]},
  { id:'leadPhone', section:'lead', type:'tel', title:"No problem, what's the best number to reach you on?", placeholder:'01202 000000', skipIf:a=>a.wantCallback!=='yes' }
];

const T2K_LABELS = {
  users:'Team size', priority:'Priority', deployment:'Hosting', remoteWork:'Working style',
  callHandling:'Call handling', integration:'Integrations', budget:'Budget',
  leadName:'Name', leadCompany:'Company', leadEmail:'Email', wantCallback:'Wants callback', leadPhone:'Phone'
};

// ══════════════════════════════════════════════════════════════════════════
// SCORING RULES
// ══════════════════════════════════════════════════════════════════════════
const T2K_RULES = [
  {q:'usersBucket',v:'micro',s:{phoneline:4,horizon:2,flow:1}},
  {q:'usersBucket',v:'small',s:{'3cx':2,horizon:3,phoneline:2,flow:2}},
  {q:'usersBucket',v:'mid',s:{'3cx':3,horizon:3,webex:2,flow:3,mitel:1}},
  {q:'usersBucket',v:'large',s:{mitel:4,'3cx':3,webex:3,flow:3,horizon:2}},
  {q:'usersBucket',v:'enterprise',s:{mitel:5,'3cx':3,webex:3,flow:3}},
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

// ══════════════════════════════════════════════════════════════════════════
// SYSTEM DEFINITIONS
// ══════════════════════════════════════════════════════════════════════════
const T2K_SYS = {
  mitel:{
    name:'Mitel MiVoice Business',tagline:'Enterprise-grade unified communications with genuine deployment choice',color:'#dc2626',
    why(a){let w='<strong>Mitel MiVoice Business</strong> is built for organisations that need proven, enterprise-grade telephony with total control over where and how it\'s deployed. ';if(a.deployment==='onprem')w+='Your preference for on-premises deployment is exactly Mitel\'s sweet spot — it supports on-prem, private cloud, and public cloud on a single codebase. ';if(a.usersBucket==='enterprise'||a.usersBucket==='large')w+='At your scale, Mitel\'s support for 5 to 65,000 users on one platform eliminates the need to re-platform as you grow. ';if(a.priority==='security')w+='With full data sovereignty and on-site hardware options, it meets the strictest compliance and security requirements. ';return w;},
    pros:['Genuine on-premises deployment','Scales 5–65,000 users','Full data sovereignty','Integrated contact centre','CapEx or OpEx pricing'],
    cons:['Higher upfront cost on-prem','IT resource recommended','No native Teams integration','Not suited to micro-businesses'],
    features:['On-premise','Call recording','Contact centre','CRM integration','Mobile app','Hot desking'], hl:['On-premise','Contact centre']
  },
  '3cx':{
    name:'3CX',tagline:'Open-platform PBX priced by concurrent calls, not headcount',color:'#2563eb',
    why(a){let w='<strong>3CX</strong> stands out for its pricing model — you pay per concurrent call rather than per user, which typically delivers significant savings as your team grows. ';if(a.deployment==='onprem')w+='As one of the few modern systems available on-premises (Windows or Linux) as well as cloud-hosted, it gives you genuine deployment choice. ';if(a.priority==='cost')w+='The concurrent-call pricing model often works out considerably cheaper than per-user alternatives for businesses where many staff share a smaller number of active lines. ';if(a.integration==='teams')w+='Teams integration is supported natively, allowing calls within Microsoft Teams without additional phone licensing. ';return w;},
    pros:['Priced per concurrent call — cheaper at scale','On-premises or cloud','Built-in video conferencing','Teams integration','Open-platform SIP compatibility'],
    cons:['IT resource helps with setup','Less managed than fully hosted','Not ideal for tech-averse teams','Annual licence model'],
    features:['On-premise','Video conferencing','Teams integration','Call recording','Call queues','CRM integration'], hl:['On-premise','Video conferencing']
  },
  horizon:{
    name:'Gamma Horizon',tagline:'Award-winning hosted cloud PBX — fully managed, no hardware',color:'#7c3aed',
    why(a){let w='<strong>Gamma Horizon</strong> is the UK\'s most widely adopted hosted phone system — a complete, fully managed cloud PBX that requires no on-site hardware and minimal IT resource to run. ';if(a.priority==='simple')w+='Its web-based admin portal makes adding users, changing call routing, and managing the system straightforward without any technical background. ';if(a.remoteWork==='hybrid'||a.remoteWork==='remote')w+='Mobile apps and softphones mean staff can take calls from anywhere with the same experience as being in the office. ';return w;},
    pros:['No on-site hardware needed','Easy web-based admin portal','Strong mobile app','99.999% uptime SLA','UK-hosted data centres'],
    cons:['Cloud-only — no on-prem option','Advanced features on higher tiers','Teams integration via add-on only','Less suitable for enterprise scale'],
    features:['Cloud hosted','Mobile app','Auto-attendant','Call recording','Hunt groups','CRM integration'], hl:['Cloud hosted','Mobile app']
  },
  webex:{
    name:'Gamma Webex',tagline:'Horizon telephony meets Cisco Webex — AI meetings, transcription and UC in one platform',color:'#0891b2',
    why(a){let w='<strong>Gamma Webex</strong> combines Gamma\'s reliable Horizon hosted telephony network with Cisco\'s enterprise Webex platform — carrier-grade voice quality alongside AI-powered meetings, transcription, and messaging in a single licence. ';if(a.remoteWork==='hybrid'||a.remoteWork==='remote')w+='The combination of a mobile-first platform and Webex\'s desktop experience makes it particularly strong for hybrid and remote-first teams. ';if(a.callHandling==='advanced'||a.callHandling==='contactcentre')w+='AI-powered call routing, real-time transcription, and predictive insights are included natively — not as expensive add-ons. ';return w;},
    pros:['Cisco Webex AI features built in','Carrier-grade 99.999% uptime','Single licence for voice and UC','Enterprise-grade security','Strong mobile and desktop apps'],
    cons:['Cloud-only deployment','Higher cost than basic hosted','More than needed for simple telephony','Teams users may prefer Flow'],
    features:['Cloud hosted','Video conferencing','AI transcription','Call recording','CRM integration','Mobile app'], hl:['Video conferencing','AI transcription']
  },
  phoneline:{
    name:'Gamma Phoneline+',tagline:'The simplest PSTN replacement — ready the same day, no hardware',color:'#059669',
    why(a){let w='<strong>Gamma Phoneline+</strong> is the most straightforward way for small businesses and sole traders to move away from a traditional landline before the PSTN switch-off deadline. ';if(a.usersBucket==='micro')w+='At your size, a full hosted PBX would be more system than you need and cost more than necessary — Phoneline+ gives you everything a small business actually uses at a fraction of the price. ';if(a.priority==='simple')w+="There's no admin portal to learn, no hardware to configure, and no IT resource required — the setup takes minutes and it just works. ";return w;},
    pros:['Simplest possible setup','Lowest cost option','Keeps your existing number','Mobile app included','Unlimited UK calls','Ideal PSTN replacement'],
    cons:['No CRM integration','No call recording','No video conferencing','Limited to small teams','No contact centre capability'],
    features:['Cloud hosted','Mobile app','Voicemail to email','Number porting','Unlimited UK calls','Same-day activation'], hl:['Simplest setup','Lowest cost']
  },
  flow:{
    name:'Voiceflex Flow',tagline:'UCaaS-first platform with native Microsoft Teams PBX — no Teams Phone licence required',color:'#d97706',
    why(a){let w='<strong>Voiceflex Flow</strong> is built from the ground up as a UCaaS platform — unlike most competitors that add collaboration onto a voice system, Flow starts with unified communications and adds full PBX telephony on top. ';if(a.integration==='teams'||a.integration==='both')w+='Its standout feature is a native Microsoft Teams integration via an embedded app that gives you complete PBX call handling inside Teams — without needing a Microsoft Teams Phone licence. ';if(a.remoteWork==='remote')w+='Regardless of whether staff call from mobile, PSTN, the internet, or Teams, the experience and feature set is identical — making it the strongest option for fully distributed teams. ';return w;},
    pros:['Native Teams integration — no Phone licence','True UCaaS — not voice-first','Self-service admin portal','Contact centre built in','Same experience across all devices'],
    cons:['Cloud-only deployment','Best value for Teams-using businesses','Newer platform — less market history','More complex than basic options'],
    features:['Teams integration','Cloud hosted','Contact centre','CRM integration','Mobile app','Video conferencing'], hl:['Teams integration','No Teams Phone licence']
  }
};

// T2K_VIDEOS — configure each system's overview video.
// Wistia: { type:'wistia', id:'...' }   YouTube: { type:'youtube', id:'...' }
// null hides the "Watch overview" button for that system.
const T2K_VIDEOS = {
  mitel:     null,
  '3cx':     { type:'youtube', id:'8TfD-B3fKXw' },
  horizon:   { type:'wistia',  id:'innvsb7xi4'  },
  webex:     { type:'wistia',  id:'lb9ykdf4hj'  },
  phoneline: { type:'wistia',  id:'5qy1vfqfy7'  },
  flow:      null
};

// ══════════════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════════════
let t2kCur = 0;
let t2kAns = {};
let t2kEnqType = null;
let t2kStartedFired = false;
let t2kLeadCaptured = false;
let t2kCallEditing = false;
let t2kVidCurrentSys = null;
let t2kLeadRef = null;

// Web3Forms has no concept of "updating" a submission — every fetch() call is
// a brand new email with no link to earlier ones. This reference code is our
// own lightweight way of tying the initial quiz-completion email and any
// later follow-up email (e.g. a flagged preferred system) back to the same
// person, so whoever picks it up can match them by eye/search.
function t2kGetLeadRef(){
  if(!t2kLeadRef){
    t2kLeadRef = 'T2K-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2,5).toUpperCase();
  }
  return t2kLeadRef;
}

// ══════════════════════════════════════════════════════════════════════════
// DERIVED / HELPERS
// ══════════════════════════════════════════════════════════════════════════
function t2kUsersBucket(n){
  n = parseInt(n,10);
  if(!n || isNaN(n) || n<1) return null;
  if(n<=5) return 'micro';
  if(n<=25) return 'small';
  if(n<=100) return 'mid';
  if(n<=500) return 'large';
  return 'enterprise';
}
function t2kDerived(){ return Object.assign({}, t2kAns, {usersBucket: t2kUsersBucket(t2kAns.users)}); }
function t2kActiveQS(){ return T2K_QS.filter(q=>!q.skipIf || !q.skipIf(t2kAns)); }
function t2kQuizQS(){ return t2kActiveQS().filter(q=>q.section==='quiz'); }

function t2kFireQuizStarted(){
  if(t2kStartedFired) return;
  t2kStartedFired=true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event:'quiz_started' });
}

function t2kValidateInput(val,type){
  if(type==='number') return val!=='' && val!==undefined && !isNaN(val) && parseInt(val)>0;
  if(type==='email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val||'');
  if(type==='tel') return (val||'').trim().length>=7;
  return (val||'').trim().length>0;
}

// ══════════════════════════════════════════════════════════════════════════
// SCORING
// ══════════════════════════════════════════════════════════════════════════
function t2kScores(){
  const s={mitel:0,'3cx':0,horizon:0,webex:0,phoneline:0,flow:0};
  const d = t2kDerived();
  T2K_RULES.forEach(r=>{
    let match;
    if(r.multi) match = Array.isArray(d[r.q]) && d[r.q].includes(r.v);
    else match = d[r.q]===r.v;
    if(match) Object.entries(r.s).forEach(([k,v])=>{ s[k]=(s[k]||0)+v; });
  });
  Object.keys(s).forEach(k=>{
    if(s[k]<0) s[k]=0;
    s[k] = Math.round(s[k] * (T2K_PRIORITY[k] !== undefined ? T2K_PRIORITY[k] : 1));
  });
  return s;
}

// ══════════════════════════════════════════════════════════════════════════
// RENDER QUESTION
// ══════════════════════════════════════════════════════════════════════════
function t2kRender(){
  const list = t2kActiveQS();
  if(t2kCur > list.length-1) t2kCur = list.length-1;
  const q = list[t2kCur];
  const quizList = list.filter(x=>x.section==='quiz');
  const quizTotal = quizList.length;

  document.getElementById('t2k-qtitle').textContent = q.title;

  if(q.section==='quiz'){
    const qIdx = quizList.findIndex(x=>x.id===q.id);
    document.getElementById('t2k-qbadge').textContent = qIdx+1;
    document.getElementById('t2k-qstep-lbl').innerHTML = 'Question <span id="t2k-qnum">'+(qIdx+1)+'</span> of <span id="t2k-qtotal">'+quizTotal+'</span>';
    const pct = Math.round(qIdx/quizTotal*100);
    document.getElementById('t2k-pfill').style.width = Math.max(pct,4)+'%';
    document.getElementById('t2k-ppct').textContent = pct+'%';
    document.getElementById('t2k-pof').textContent = 'Step '+(qIdx+1)+' of '+quizTotal;
  } else {
    // Personal-detail steps are deliberately excluded from the quiz counter —
    // they're not part of the matching questions, just contact capture.
    document.getElementById('t2k-qbadge').innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>';
    document.getElementById('t2k-qstep-lbl').textContent = 'Just a couple of details';
    document.getElementById('t2k-pfill').style.width = '100%';
    document.getElementById('t2k-ppct').textContent = '100%';
    document.getElementById('t2k-pof').textContent = 'Quiz complete';
  }

  const optsEl = document.getElementById('t2k-opts');
  const hintHtml = q.hint ? `<div class="t2k-qhint">${q.hint}</div>` : '';

  if(q.type==='choice'){
    optsEl.innerHTML = hintHtml + q.opts.map(o=>`
      <button class="t2k-opt${t2kAns[q.id]===o.v?' t2k-sel':''}" onclick="t2kSel('${q.id}','${o.v}',this)" type="button">
        <div class="t2k-opt-radio"></div>
        <div><div class="t2k-opt-lbl">${o.l}</div>${o.h?`<div class="t2k-opt-hint">${o.h}</div>`:''}</div>
      </button>`).join('');
  } else if(q.type==='multi'){
    const sel = Array.isArray(t2kAns[q.id]) ? t2kAns[q.id] : [];
    optsEl.innerHTML = hintHtml + q.opts.map(o=>`
      <button class="t2k-opt${sel.includes(o.v)?' t2k-sel':''}" onclick="t2kToggleMulti('${q.id}','${o.v}',this)" type="button">
        <div class="t2k-opt-check"></div>
        <div><div class="t2k-opt-lbl">${o.l}</div></div>
      </button>`).join('');
  } else {
    const val = t2kAns[q.id] || '';
    optsEl.innerHTML = hintHtml + `<input class="t2k-qinput" type="${q.type}" id="t2k-input-${q.id}" placeholder="${q.placeholder||''}" value="${val}"
        oninput="t2kOnInput('${q.id}','${q.type}',this)"
        onkeydown="if(event.key==='Enter'){event.preventDefault(); if(!document.getElementById('t2k-next').disabled) t2kNext();}">`;
    setTimeout(()=>{ const inp=document.getElementById('t2k-input-'+q.id); if(inp) inp.focus(); },60);
  }

  let enabled;
  if(q.type==='choice') enabled = !!t2kAns[q.id];
  else if(q.type==='multi') enabled = Array.isArray(t2kAns[q.id]) && t2kAns[q.id].length>0;
  else enabled = t2kValidateInput(t2kAns[q.id], q.type);
  document.getElementById('t2k-next').disabled = !enabled;

  document.getElementById('t2k-back').style.display = t2kCur>0?'block':'none';
  const isLast = t2kCur===list.length-1;
  const nb = document.getElementById('t2k-next');
  nb.innerHTML = isLast
    ? 'See my results <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>'
    : 'Next question <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  t2kRenderSidebar();
}

function t2kSel(qId,val,el){
  document.querySelectorAll('#t2k-opts .t2k-opt').forEach(b=>b.classList.remove('t2k-sel'));
  el.classList.add('t2k-sel');
  t2kAns[qId]=val;
  document.getElementById('t2k-next').disabled=false;
  t2kRenderSidebar();
  t2kFireQuizStarted();
}

function t2kToggleMulti(qId,val,el){
  if(!Array.isArray(t2kAns[qId])) t2kAns[qId]=[];
  const idx=t2kAns[qId].indexOf(val);
  if(idx>-1){ t2kAns[qId].splice(idx,1); el.classList.remove('t2k-sel'); }
  else { t2kAns[qId].push(val); el.classList.add('t2k-sel'); }
  document.getElementById('t2k-next').disabled = t2kAns[qId].length===0;
  t2kRenderSidebar();
  t2kFireQuizStarted();
}

function t2kOnInput(qId,type,el){
  t2kAns[qId]=el.value;
  document.getElementById('t2k-next').disabled = !t2kValidateInput(el.value,type);
  t2kRenderSidebar();
  t2kFireQuizStarted();
}

function t2kRenderSidebar(){
  const list = t2kActiveQS();
  document.getElementById('t2k-ans-panel').innerHTML = list.map(q=>{
    let displayVal='Not answered yet', empty=true;
    const a=t2kAns[q.id];
    if(q.type==='choice'){
      const opt=q.opts.find(o=>o.v===a);
      if(opt){ displayVal=opt.l; empty=false; }
    } else if(q.type==='multi'){
      if(Array.isArray(a) && a.length){
        displayVal = a.map(v=>{ const o=q.opts.find(x=>x.v===v); return o?o.l:v; }).join(', ');
        empty=false;
      }
    } else {
      if(a && String(a).trim()){ displayVal=a; empty=false; }
    }
    return `<div class="t2k-ans-row"><div class="t2k-ans-q">${T2K_LABELS[q.id]}</div><div class="t2k-ans-v${empty?' t2k-empty':''}">${displayVal}</div></div>`;
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
  const list = t2kActiveQS();
  if(t2kCur<list.length-1){ t2kCur++; t2kRender(); }
  else t2kShowResults();
}
function t2kPrev(){ if(t2kCur>0){ t2kCur--; t2kRender(); } }

// ══════════════════════════════════════════════════════════════════════════
// RESULTS
// ══════════════════════════════════════════════════════════════════════════
function t2kShowResults(){
  document.getElementById('t2k-quiz').style.display='none';
  document.getElementById('t2k-results').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
  const leadRef = t2kGetLeadRef();
  window.dataLayer = window.dataLayer || [];
  // Primary conversion event — this is the one to map to your GA4/Ads
  // "generate_lead" conversion action.
  window.dataLayer.push({ event:'quiz_completed', lead_reference:leadRef });

  const derived = t2kDerived();
  const sc=t2kScores();
  const sorted=Object.entries(sc).sort((a,b)=>b[1]-a[1]);
  const topSc=sorted[0][1];

  const sentBanner = document.getElementById('t2k-quote-sent-banner');
  if(t2kAns.leadEmail){
    document.getElementById('t2k-sent-email').textContent = t2kAns.leadEmail;
    sentBanner.style.display='flex';
  } else {
    sentBanner.style.display='none';
  }

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
        <div class="t2k-rwhy">${S.why(derived)}</div>
        <div class="t2k-fpills">${S.features.map(f=>`<span class="t2k-fpill${S.hl.includes(f)?' t2k-hl':''}">${f}</span>`).join('')}</div>
        <div class="t2k-pros-cons">
          <div class="t2k-pros"><div class="t2k-pros-lbl">Strengths</div>${S.pros.slice(0,3).map(p=>`<div class="t2k-pro">${p}</div>`).join('')}</div>
          <div class="t2k-cons"><div class="t2k-cons-lbl">Limitations</div>${S.cons.slice(0,3).map(c=>`<div class="t2k-con">${c}</div>`).join('')}</div>
        </div>
        <div class="t2k-rfooter">
          <button class="t2k-btn-enq" type="button" id="t2k-pref-btn-${sys}" onclick="t2kFlagPreferred('${sys}','${S.name.replace(/'/g,"\\'")}',this)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            This is my top pick
          </button>
          ${T2K_VIDEOS[sys] !== null ? `<button class="t2k-btn-watch" type="button" onclick="t2kOpenVid('${sys}','${S.name.replace(/'/g,"\\'")}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Watch ${S.name} overview</button>` : ''}
          <button class="t2k-btn-watch" type="button" onclick="t2kOpenEnq('${sys}',${pct})">Request a callback about this one</button>
        </div>
      </div>
    </div>`;
  }).join('');

  if(T2K_AUTO_CAPTURE_LEAD) t2kAutoCaptureLead(sorted, derived);
}

function t2kAutoCaptureLead(sorted, derived){
  if(t2kLeadCaptured) return;
  if(!t2kAns.leadEmail) return;
  t2kLeadCaptured = true;
  const leadRef = t2kGetLeadRef();
  const topSys = T2K_SYS[sorted[0][0]].name;
  const ansStr = t2kActiveQS().map(q=>{
    const a=t2kAns[q.id];
    const v = Array.isArray(a) ? a.join(', ') : (a || 'N/A');
    return T2K_LABELS[q.id]+': '+v;
  }).join(' | ');
  try{
    const fd = new FormData();
    fd.append('access_key', T2K_WEB3FORMS_KEY);
    fd.append('subject','Phone System Finder — quiz completed ['+leadRef+']');
    fd.append('from_name','T2K VoIP — Phone System Finder');
    fd.append('lead_reference', leadRef);
    fd.append('name', t2kAns.leadName||'');
    fd.append('email', t2kAns.leadEmail||'');
    fd.append('company', t2kAns.leadCompany||'');
    fd.append('phone', t2kAns.leadPhone||'');
    fd.append('top_match', topSys);
    fd.append('wants_callback', t2kAns.wantCallback||'');
    fd.append('quiz_answers', ansStr);
    t2kAppendTracking(fd);
    fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).catch(()=>{});
  }catch(e){}
}

function t2kRestart(){
  t2kCur=0; t2kAns={}; t2kStartedFired=false; t2kLeadCaptured=false; t2kLeadRef=null;
  document.getElementById('t2k-results').style.display='none';
  document.getElementById('t2k-quiz').style.display='block';
  t2kRender();
  window.scrollTo({top:0,behavior:'smooth'});
}

// ══════════════════════════════════════════════════════════════════════════
// ENQUIRY MODAL — pre-filled from answers already captured mid-quiz
// ══════════════════════════════════════════════════════════════════════════
function t2kFlagPreferred(sysKey, sysName, btn){
  if(btn.dataset.flagged) return;
  btn.dataset.flagged='1';
  btn.disabled=true;
  btn.classList.add('t2k-btn-confirmed');
  btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg> Noted — we\'ll prioritise this one';

  const leadRef = t2kGetLeadRef();

  // IMPORTANT: this is an *engagement* signal, not a second conversion — the
  // real conversion already fired as 'quiz_completed' when the results
  // screen loaded. Keep this on its own event name and do NOT wire it into
  // the same GA4/Ads conversion trigger as 'quiz_completed', or every flag
  // click will double-count as a second lead for the same person.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'quiz_preferred_system_flagged',
    lead_reference: leadRef,
    preferred_system: sysName
  });

  try{
    const fd = new FormData();
    fd.append('access_key', T2K_WEB3FORMS_KEY);
    fd.append('subject','Follow-up ['+leadRef+'] — '+(t2kAns.leadName||'A lead')+' flagged '+sysName+' as their top pick');
    fd.append('from_name','T2K VoIP — Phone System Finder');
    fd.append('lead_reference', leadRef);
    fd.append('note', 'This follows an earlier Phone System Finder submission from the same person — match using the reference code or email address above.');
    fd.append('name', t2kAns.leadName||'');
    fd.append('email', t2kAns.leadEmail||'');
    fd.append('company', t2kAns.leadCompany||'');
    fd.append('preferred_system', sysName);
    t2kAppendTracking(fd);
    fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).catch(()=>{});
  }catch(e){}
}

function t2kOpenEnq(sysKey,matchPct){
  const S=T2K_SYS[sysKey];
  document.getElementById('t2k-mname').textContent=S.name;
  document.getElementById('t2k-mdot').style.background=S.color;

  document.getElementById('t2k-enq-form').reset();
  t2kEnqType='call';

  const hasPrefill = !!(t2kAns.leadName || t2kAns.leadPhone);
  document.getElementById('t2k-prefill-note').style.display = hasPrefill ? 'flex' : 'none';
  const set=(id,v)=>{ const e=document.getElementById(id); if(e && v) e.value=v; };
  set('t2k-call-name', t2kAns.leadName);
  set('t2k-call-co', t2kAns.leadCompany);
  set('t2k-call-phone', t2kAns.leadPhone);

  // If we already hold name + phone (e.g. they said yes to a callback mid-quiz),
  // default to a one-line confirmation instead of re-showing the fields.
  const callReady = !!(t2kAns.leadName && t2kAns.leadPhone);
  t2kCallEditing = !callReady;
  t2kRenderEnqSummaries();

  document.getElementById('t2k-overlay').classList.add('t2k-open');
  document.body.style.overflow='hidden';
  document.getElementById('t2k-overlay').dataset.sys = sysKey;
  document.getElementById('t2k-overlay').dataset.pct = matchPct;
}

function t2kRenderEnqSummaries(){
  const cParts=[];
  if(t2kAns.leadName) cParts.push(t2kAns.leadName);
  if(t2kAns.leadCompany) cParts.push(t2kAns.leadCompany);
  if(t2kAns.leadPhone) cParts.push(t2kAns.leadPhone);
  document.getElementById('t2k-call-summary-text').textContent = cParts.join(' · ');
  document.getElementById('t2k-call-summary').style.display = t2kCallEditing ? 'none' : 'flex';
  document.getElementById('t2k-fcall-fields').style.display = t2kCallEditing ? 'block' : 'none';
}

function t2kToggleEdit(){
  t2kCallEditing = !t2kCallEditing;
  t2kRenderEnqSummaries();
}

function t2kCloseEnq(){
  document.getElementById('t2k-overlay').classList.remove('t2k-open');
  document.body.style.overflow='';
}
function t2kOverlayClick(e){ if(e.target===document.getElementById('t2k-overlay')) t2kCloseEnq(); }

function t2kValidate(){
  let ok=true;
  ['t2k-fc-name','t2k-fc-phone'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.classList.remove('t2k-invalid');
  });
  const n=document.getElementById('t2k-call-name');
  const ph=document.getElementById('t2k-call-phone');
  if(!n.value.trim()){ document.getElementById('t2k-fc-name').classList.add('t2k-invalid'); ok=false; }
  if(!ph.value.trim()){ document.getElementById('t2k-fc-phone').classList.add('t2k-invalid'); ok=false; }
  return ok;
}

function t2kHandleSubmit(e){
  e.preventDefault();
  if(!t2kValidate()) return false;
  const btn=document.getElementById('t2k-msubmit');
  btn.disabled=true;
  btn.innerHTML='<div class="t2k-spinner"></div> Sending…';
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event:'quiz_enquiry_submitted' });

  const overlay = document.getElementById('t2k-overlay');
  const sysKey = overlay.dataset.sys;
  const S = T2K_SYS[sysKey];

  try{
    const fd = new FormData();
    fd.append('access_key', T2K_WEB3FORMS_KEY);
    fd.append('subject','Callback request ['+t2kGetLeadRef()+'] — '+S.name+' (T2K Phone System Finder)');
    fd.append('lead_reference', t2kGetLeadRef());
    fd.append('from_name','T2K VoIP — Phone System Finder');
    fd.append('recommended_system', S.name);
    fd.append('match_score', overlay.dataset.pct+'% match');
    fd.append('enquiry_type', 'Callback request');
    fd.append('name', document.getElementById('t2k-call-name').value);
    fd.append('company', document.getElementById('t2k-call-co').value);
    fd.append('phone', document.getElementById('t2k-call-phone').value);
    fd.append('email', t2kAns.leadEmail||'');
    t2kAppendTracking(fd);
    fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).catch(()=>{});
  }catch(err){}

  setTimeout(()=>{
    btn.innerHTML='✓ Sent — we\'ll be in touch soon';
    setTimeout(t2kCloseEnq, 1400);
  }, 500);
  return false;
}

// ══════════════════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════════════════
// VIDEO MODAL
// ══════════════════════════════════════════════════════════════════════════
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
  const sysKey = t2kVidCurrentSys;
  const pct = 0; // opened from the video modal, not a specific results row
  t2kCloseVid();
  setTimeout(() => {
    if (sysKey) t2kOpenEnq(sysKey, pct);
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

document.addEventListener('keydown', e => { if (e.key === 'Escape') { t2kCloseEnq(); t2kCloseVid(); } });
t2kRender();
