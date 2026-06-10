// ── QUESTIONS ────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'users',
    title: 'How many people need to use the phone system?',
    options: [
      { label: '1–5 users',        hint: 'Micro-business or sole trader with a small team',        val: 'micro' },
      { label: '6–25 users',       hint: 'Small business with a single office or mixed setup',     val: 'small' },
      { label: '26–100 users',     hint: 'Growing SME, possibly across multiple sites',            val: 'mid' },
      { label: '101–500 users',    hint: 'Mid-size organisation with complex requirements',        val: 'large' },
      { label: '500+ users',       hint: 'Enterprise or multi-site organisation',                  val: 'enterprise' },
    ]
  },
  {
    id: 'priority',
    title: 'What matters most to your business from a phone system?',
    options: [
      { label: 'Simplicity — just works, no IT fuss',      hint: 'You want a system that\'s easy to manage without technical help',      val: 'simple' },
      { label: 'Features & call handling',                 hint: 'Call queues, IVR, reporting, CRM integration matter to you',           val: 'features' },
      { label: 'Low cost',                                 hint: 'Keeping monthly spend as low as possible is the priority',             val: 'cost' },
      { label: 'Microsoft Teams integration',              hint: 'Teams is your main collaboration tool and you want calls inside it',   val: 'teams' },
      { label: 'Control & data security',                  hint: 'You need on-premise hosting, data sovereignty, or strict compliance', val: 'security' },
    ]
  },
  {
    id: 'deployment',
    title: 'Where would you prefer the phone system to be hosted?',
    options: [
      { label: 'Cloud — fully managed, no hardware',     hint: 'You want a provider to manage everything, no on-site equipment',     val: 'cloud' },
      { label: 'On-premises — installed in your building', hint: 'You want the system on your own server or hardware',                 val: 'onprem' },
      { label: 'Either — open to both options',          hint: 'You\'re flexible and happy to be guided on what\'s best',            val: 'either' },
    ]
  },
  {
    id: 'remoteWork',
    title: 'How does your team work day-to-day?',
    options: [
      { label: 'All office-based',                        hint: 'Everyone works from one or more fixed office locations',             val: 'office' },
      { label: 'Mixed — some office, some remote',        hint: 'Hybrid working with staff in different locations',                  val: 'hybrid' },
      { label: 'Fully remote or multi-site',              hint: 'Staff work from home, multiple offices, or on the road',            val: 'remote' },
    ]
  },
  {
    id: 'callHandling',
    title: 'What level of call handling do you need?',
    options: [
      { label: 'Basic — answer calls, transfer, voicemail',                   hint: 'Standard telephony without complex routing',                         val: 'basic' },
      { label: 'Intermediate — hunt groups, auto-attendant, hold music',      hint: 'Professional call routing but not a full contact centre',            val: 'intermediate' },
      { label: 'Advanced — call queues, reporting, agent management',         hint: 'High call volumes with detailed analytics and queue management',     val: 'advanced' },
      { label: 'Contact centre — omnichannel, CRM integration, wallboards',  hint: 'Full contact centre capability across voice, chat and email',        val: 'contactcentre' },
    ]
  },
  {
    id: 'integration',
    title: 'Which business tools do you need your phone system to connect with?',
    options: [
      { label: 'None — standalone phone system is fine',         hint: 'You don\'t need the phone system to connect to other software',    val: 'none' },
      { label: 'Microsoft Teams',                                hint: 'You want calls to work inside Microsoft Teams',                    val: 'teams' },
      { label: 'CRM (Salesforce, HubSpot, Dynamics etc)',        hint: 'Screen popping, click-to-dial, or call logging in your CRM',      val: 'crm' },
      { label: 'Both Teams and CRM',                             hint: 'Full integration across your Microsoft and CRM stack',            val: 'both' },
    ]
  },
  {
    id: 'budget',
    title: 'What best describes your approach to budget?',
    options: [
      { label: 'Lowest possible monthly cost',              hint: 'Keeping recurring spend to a minimum is most important',               val: 'lowest' },
      { label: 'Good value for the features on offer',      hint: 'Willing to pay more for a system that does more',                     val: 'value' },
      { label: 'Prefer CapEx — buy outright rather than subscribe', hint: 'You\'d rather own the system than pay monthly fees',          val: 'capex' },
      { label: 'Enterprise budget — best solution matters most',    hint: 'Spend is less of a concern than capability and reliability',   val: 'enterprise' },
    ]
  },
];
 
// ── SCORING RULES ─────────────────────────────────────────────────────────────
// Each rule: { qId, val, scores: { systemKey: points } }
// System keys: mitel | 3cx | horizon | webex | phoneline | flow
const RULES = [
  // users
  { qId:'users', val:'micro',      scores:{ phoneline:4, horizon:2, flow:1 } },
  { qId:'users', val:'small',      scores:{ horizon:3, '3cx':2, phoneline:2, flow:2 } },
  { qId:'users', val:'mid',        scores:{ horizon:3, '3cx':3, flow:3, webex:2, mitel:1 } },
  { qId:'users', val:'large',      scores:{ mitel:4, '3cx':3, flow:3, webex:3, horizon:2 } },
  { qId:'users', val:'enterprise', scores:{ mitel:5, '3cx':3, webex:3, flow:3 } },
  // priority
  { qId:'priority', val:'simple',   scores:{ phoneline:4, horizon:3, webex:2 } },
  { qId:'priority', val:'features', scores:{ mitel:4, '3cx':4, horizon:3, webex:3, flow:3 } },
  { qId:'priority', val:'cost',     scores:{ phoneline:4, '3cx':3, horizon:2 } },
  { qId:'priority', val:'teams',    scores:{ flow:5, webex:4, '3cx':2 } },
  { qId:'priority', val:'security', scores:{ mitel:5, '3cx':4 } },
  // deployment
  { qId:'deployment', val:'cloud',   scores:{ phoneline:3, horizon:3, webex:3, flow:3 } },
  { qId:'deployment', val:'onprem',  scores:{ mitel:5, '3cx':5 } },
  { qId:'deployment', val:'either',  scores:{ mitel:2, '3cx':2, horizon:2, webex:2, flow:2 } },
  // remote work
  { qId:'remoteWork', val:'office',  scores:{ mitel:2, horizon:2, phoneline:2 } },
  { qId:'remoteWork', val:'hybrid',  scores:{ horizon:3, webex:3, flow:3, '3cx':2 } },
  { qId:'remoteWork', val:'remote',  scores:{ flow:4, webex:4, '3cx':3, horizon:3 } },
  // call handling
  { qId:'callHandling', val:'basic',         scores:{ phoneline:4, horizon:2 } },
  { qId:'callHandling', val:'intermediate',  scores:{ horizon:4, '3cx':3, flow:3, webex:2 } },
  { qId:'callHandling', val:'advanced',      scores:{ '3cx':4, mitel:4, flow:4, webex:3, horizon:2 } },
  { qId:'callHandling', val:'contactcentre', scores:{ mitel:5, '3cx':4, flow:4, webex:4, horizon:3 } },
  // integration
  { qId:'integration', val:'none',   scores:{ phoneline:3, horizon:2, mitel:1 } },
  { qId:'integration', val:'teams',  scores:{ flow:5, webex:4, '3cx':2 } },
  { qId:'integration', val:'crm',    scores:{ mitel:4, '3cx':4, flow:3, webex:3, horizon:2 } },
  { qId:'integration', val:'both',   scores:{ flow:5, webex:5, '3cx':3, mitel:3 } },
  // budget
  { qId:'budget', val:'lowest',     scores:{ phoneline:5, '3cx':3 } },
  { qId:'budget', val:'value',      scores:{ horizon:4, '3cx':4, flow:3, webex:3 } },
  { qId:'budget', val:'capex',      scores:{ mitel:5, '3cx':4 } },
  { qId:'budget', val:'enterprise', scores:{ mitel:4, webex:4, flow:3, '3cx':3 } },
];
 
// ── SYSTEM DEFINITIONS ────────────────────────────────────────────────────────
const SYSTEMS = {
  mitel: {
    name: 'Mitel MiVoice Business',
    tagline: 'Enterprise-grade communications with genuine deployment choice',
    color: '#e63946',
    why: (ans) => {
      let w = '<strong>Mitel MiVoice Business</strong> is built for organisations that need proven, enterprise-grade telephony with total control over where and how it\'s deployed. ';
      if (ans.deployment === 'onprem') w += 'Your preference for on-premises deployment is exactly Mitel\'s sweet spot — it supports on-prem, private cloud, and public cloud on a single codebase. ';
      if (ans.users === 'enterprise' || ans.users === 'large') w += 'At your scale, Mitel\'s support for 5 to 65,000 users on one platform eliminates the need to re-platform as you grow. ';
      if (ans.priority === 'security') w += 'With full data sovereignty and on-site hardware options, it meets the strictest compliance and security requirements. ';
      if (ans.callHandling === 'contactcentre') w += 'The MiContact Centre Business add-on provides a fully integrated omnichannel contact centre without a third-party platform. ';
      return w;
    },
    pros: ['On-premises or cloud deployment', 'Scales 5 to 65,000 users', 'Full data sovereignty', 'MiContact Centre integration', 'CapEx or OpEx pricing', '50+ years of UC development'],
    cons: ['Higher upfront cost on-prem', 'IT resource recommended', 'No native Teams integration', 'Less suited to micro-businesses'],
    features: ['On-premise', 'Call recording', 'Contact centre', 'CRM integration', 'Mobile app', 'Hot desking'],
    highlight: ['On-premise', 'Contact centre'],
    cta: '/telephone-numbers/',
    url: '/telephone-system-reviews/mitel-mivoice-business/',
  },
  '3cx': {
    name: '3CX',
    tagline: 'Open-platform PBX priced by concurrent calls, not headcount',
    color: '#2563eb',
    why: (ans) => {
      let w = '<strong>3CX</strong> stands out for its flexible pricing model — you pay per concurrent call rather than per user, which typically delivers significant savings as your team grows. ';
      if (ans.deployment === 'onprem') w += 'As one of the few modern systems available on-premises (Windows or Linux) as well as cloud-hosted, it gives you genuine deployment choice. ';
      if (ans.priority === 'cost') w += 'The concurrent-call pricing model often works out considerably cheaper than per-user alternatives, especially for businesses where many staff share a smaller number of active lines. ';
      if (ans.callHandling === 'advanced' || ans.callHandling === 'contactcentre') w += 'Built-in call queues, IVR, and detailed reporting come standard — no expensive add-ons required. ';
      if (ans.integration === 'teams') w += 'Teams integration is supported natively, allowing calls within Microsoft Teams without additional phone licensing. ';
      return w;
    },
    pros: ['Priced per concurrent call — cheaper at scale', 'On-premises or cloud', 'Built-in video conferencing', 'Teams integration', 'Open-platform SIP compatibility', 'No per-user add-ons for core features'],
    cons: ['IT resource helps with setup', 'Less managed than fully hosted options', 'Not ideal for tech-averse teams', 'Support varies by partner'],
    features: ['On-premise', 'Video conferencing', 'Teams integration', 'Call recording', 'Call queues', 'CRM integration'],
    highlight: ['On-premise', 'Video conferencing'],
    cta: '/telephone-numbers/',
    url: '/telephone-system-reviews/3cx/',
  },
  horizon: {
    name: 'Gamma Horizon',
    tagline: 'Award-winning hosted cloud PBX — fully managed, no hardware',
    color: '#7c3aed',
    why: (ans) => {
      let w = '<strong>Gamma Horizon</strong> is the UK\'s most widely adopted hosted phone system, and for good reason — it\'s a complete, fully managed cloud PBX that requires no on-site hardware and minimal IT resource to run. ';
      if (ans.priority === 'simple') w += 'Its web-based admin portal makes adding users, changing call routing, and managing the system straightforward without any technical background. ';
      if (ans.remoteWork === 'hybrid' || ans.remoteWork === 'remote') w += 'Mobile apps and softphones mean staff can take calls from anywhere with the same experience as being in the office. ';
      if (ans.users === 'small' || ans.users === 'mid') w += 'The per-user monthly pricing model scales cleanly with your headcount, making it easy to manage costs as your team grows. ';
      return w;
    },
    pros: ['No on-site hardware needed', 'Easy web-based admin portal', 'CRM integration on higher tiers', 'Mobile apps for remote working', 'UK-hosted in multiple datacentres', '99.999% uptime SLA'],
    cons: ['Cloud-only — no on-prem option', 'Advanced features on higher-cost tiers', 'Teams integration via add-on only', 'Less suitable for enterprise scale'],
    features: ['Cloud hosted', 'Mobile app', 'Auto-attendant', 'Call recording', 'Hunt groups', 'CRM integration'],
    highlight: ['Cloud hosted', 'Mobile app'],
    cta: '/telephone-numbers/',
    url: '/telephone-system-reviews/gamma-horizon/',
  },
  webex: {
    name: 'Gamma Webex',
    tagline: 'Horizon telephony meets Cisco Webex collaboration — one platform',
    color: '#0891b2',
    why: (ans) => {
      let w = '<strong>Gamma Webex</strong> combines Gamma\'s reliable Horizon hosted telephony network with Cisco\'s enterprise Webex platform — giving you carrier-grade voice quality alongside AI-powered meetings, transcription, and messaging in a single licence. ';
      if (ans.integration === 'teams' || ans.integration === 'both') w += 'If your team already uses Microsoft Teams but you want enterprise collaboration depth, Webex provides a compelling alternative with tighter telephony integration. ';
      if (ans.remoteWork === 'hybrid' || ans.remoteWork === 'remote') w += 'The combination of a mobile-first platform and Webex\'s desktop experience makes it particularly strong for hybrid and remote-first teams. ';
      if (ans.callHandling === 'advanced' || ans.callHandling === 'contactcentre') w += 'AI-powered call routing, real-time transcription, and predictive insights are included natively — not as expensive add-ons. ';
      return w;
    },
    pros: ['Cisco Webex collaboration built in', 'AI transcription and insights', 'Carrier-grade 99.999% uptime', 'Single licence for voice and UC', 'Mobile and desktop apps', 'CRM integration'],
    cons: ['Cloud-only deployment', 'Higher cost than basic hosted options', 'Overkill for simple telephony needs', 'Teams users may prefer Flow'],
    features: ['Cloud hosted', 'Video conferencing', 'AI transcription', 'Call recording', 'CRM integration', 'Mobile app'],
    highlight: ['Video conferencing', 'AI transcription'],
    cta: '/telephone-numbers/',
    url: '/telephone-system-reviews/gamma-webex/',
  },
  phoneline: {
    name: 'Gamma Phoneline+',
    tagline: 'The simplest PSTN replacement — ready in minutes, no hardware',
    color: '#059669',
    why: (ans) => {
      let w = '<strong>Gamma Phoneline+</strong> is the most straightforward way for small businesses and sole traders to move away from a traditional landline before the PSTN switch-off deadline. ';
      if (ans.users === 'micro') w += 'At your size, a full hosted PBX would be more system than you need and cost more than necessary — Phoneline+ gives you everything a small business actually uses at a fraction of the price. ';
      if (ans.priority === 'simple') w += 'There\'s no admin portal to learn, no hardware to configure, and no IT resource required — the setup takes minutes and it just works. ';
      if (ans.priority === 'cost') w += 'Per-line pricing keeps costs predictable and minimal — you only pay for what you actually need. ';
      return w;
    },
    pros: ['Simplest possible setup', 'Lowest cost option', 'Keeps your existing number', 'Mobile app included', 'No hardware required', 'Ideal PSTN replacement'],
    cons: ['No CRM integration', 'No call queues or ACD', 'Limited to small teams', 'No video conferencing', 'Less suited as business scales'],
    features: ['Cloud hosted', 'Mobile app', 'Voicemail to email', 'Number porting', 'Call forwarding', 'Hunt groups (Office tier)'],
    highlight: ['Simplest setup', 'Lowest cost'],
    cta: '/telephone-numbers/',
    url: '/telephone-system-reviews/gamma-phoneline-plus/',
  },
  flow: {
    name: 'Voiceflex Flow',
    tagline: 'UCaaS-first platform with native Microsoft Teams PBX — no Teams licence needed',
    color: '#d97706',
    why: (ans) => {
      let w = '<strong>Voiceflex Flow</strong> is built from the ground up as a UCaaS platform — unlike most competitors that add collaboration onto a voice system, Flow starts with unified communications and adds full PBX telephony on top. ';
      if (ans.integration === 'teams' || ans.integration === 'both') w += 'Its standout feature is a native Microsoft Teams integration via an embedded app that gives you complete PBX call handling inside Teams — without needing a Microsoft Teams Phone licence. ';
      if (ans.remoteWork === 'remote') w += 'Regardless of whether staff call from mobile, PSTN, the internet, or Teams, the experience and feature set is identical — making it the strongest option for fully distributed teams. ';
      if (ans.callHandling === 'advanced' || ans.callHandling === 'contactcentre') w += 'Self-service admin for call routing, queue management, and reporting means less reliance on your provider for day-to-day changes. ';
      return w;
    },
    pros: ['Native Teams integration — no Phone licence', 'True UCaaS — not voice-first', 'Self-service admin portal', 'CRM integration', 'Contact centre built in', 'Same experience across all devices'],
    cons: ['Cloud-only deployment', 'More complex than basic options', 'Best value for Teams-using businesses', 'Less known than Horizon or Mitel'],
    features: ['Teams integration', 'Cloud hosted', 'Contact centre', 'CRM integration', 'Mobile app', 'Video conferencing'],
    highlight: ['Teams integration', 'No Teams licence needed'],
    cta: '/telephone-numbers/',
    url: '/telephone-system-reviews/voiceflex-flow/',
  },
};
 
// ── STATE ─────────────────────────────────────────────────────────────────────
let current = 0;
let answers = {};
 
function getScores() {
  const scores = { mitel:0, '3cx':0, horizon:0, webex:0, phoneline:0, flow:0 };
  RULES.forEach(rule => {
    if (answers[rule.qId] === rule.val) {
      Object.entries(rule.scores).forEach(([sys, pts]) => { scores[sys] = (scores[sys] || 0) + pts; });
    }
  });
  return scores;
}
 
function maxPossible() {
  const max = { mitel:0, '3cx':0, horizon:0, webex:0, phoneline:0, flow:0 };
  RULES.forEach(rule => {
    Object.entries(rule.scores).forEach(([sys, pts]) => { max[sys] = (max[sys] || 0) + pts; });
  });
  return max;
}
 
// ── RENDER QUESTION ───────────────────────────────────────────────────────────
function renderQuestion() {
  const q = QUESTIONS[current];
  document.getElementById('q-badge').textContent = current + 1;
  document.getElementById('q-num').textContent = current + 1;
  document.getElementById('q-title').textContent = q.title;
 
  const pct = Math.round(((current) / QUESTIONS.length) * 100);
  document.getElementById('progress-fill').style.width = Math.max(pct, 4) + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-of').textContent = 'Step ' + (current + 1) + ' of ' + QUESTIONS.length;
 
  const grid = document.getElementById('options-grid');
  grid.innerHTML = q.options.map((opt, i) => `
    <button class="option-btn${answers[q.id] === opt.val ? ' selected' : ''}"
      onclick="selectOpt('${q.id}','${opt.val}',this)"
      type="button">
      <div class="option-radio"></div>
      <div class="option-text">
        <div class="option-label">${opt.label}</div>
        ${opt.hint ? `<div class="option-hint">${opt.hint}</div>` : ''}
      </div>
    </button>
  `).join('');
 
  document.getElementById('btn-next').disabled = !answers[q.id];
  document.getElementById('btn-back').style.display = current > 0 ? 'block' : 'none';
 
  const isLast = current === QUESTIONS.length - 1;
  const nextBtn = document.getElementById('btn-next');
  nextBtn.innerHTML = isLast
    ? 'See my results <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>'
    : 'Next question <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
 
  renderAnswerSidebar();
  renderScoreSidebar();
}
 
function selectOpt(qId, val, el) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  answers[qId] = val;
  document.getElementById('btn-next').disabled = false;
  renderScoreSidebar();
}
 
function renderAnswerSidebar() {
  const wrap = document.getElementById('answers-so-far');
  const shortLabels = { users:'Team size', priority:'Priority', deployment:'Hosting', remoteWork:'Working style', callHandling:'Call handling', integration:'Integrations', budget:'Budget' };
  wrap.innerHTML = QUESTIONS.map(q => {
    const ans = answers[q.id];
    const opt = q.options.find(o => o.val === ans);
    return `<div class="answer-row">
      <div class="answer-q">${shortLabels[q.id]}</div>
      <div class="answer-v ${ans ? '' : 'empty'}">${opt ? opt.label : 'Not answered yet'}</div>
    </div>`;
  }).join('');
}
 
function renderScoreSidebar() {
  const scores = getScores();
  const maxS = maxPossible();
  const sysOrder = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  const maxScore = Math.max(...Object.values(scores), 1);
  const colors = { mitel:'#e63946','3cx':'#2563eb', horizon:'#7c3aed', webex:'#0891b2', phoneline:'#059669', flow:'#d97706' };
  const names  = { mitel:'Mitel MiVoice','3cx':'3CX', horizon:'Horizon', webex:'Webex', phoneline:'Phoneline+', flow:'Voiceflex Flow' };
 
  document.getElementById('score-display').innerHTML = sysOrder.map(([sys, score]) => `
    <div class="sys-score-row">
      <div class="sys-score-name">${names[sys]}</div>
      <div class="sys-score-bar-wrap">
        <div class="sys-score-bar" style="width:${score ? Math.round((score/maxScore)*100) : 0}%;background:${colors[sys]}"></div>
      </div>
      <div class="sys-score-num" style="color:${colors[sys]}">${score}</div>
    </div>
  `).join('');
}
 
function nextQ() {
  if (current < QUESTIONS.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResults();
  }
}
 
function prevQ() {
  if (current > 0) { current--; renderQuestion(); }
}
 
// ── RESULTS ───────────────────────────────────────────────────────────────────
function showResults() {
  document.getElementById('quiz-panel').style.display = 'none';
  document.getElementById('results-panel').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
 
  const scores = getScores();
  const maxS = maxPossible();
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);
 
  const topScore = sorted[0][1];
 
  const list = document.getElementById('results-list');
  list.innerHTML = sorted.map(([sys, score], idx) => {
    const S = SYSTEMS[sys];
    const pct = Math.round((score / Math.max(topScore, 1)) * 100);
    const isTop = idx === 0;
    const pctClass = pct >= 75 ? 'high' : pct >= 45 ? 'mid' : 'low';
    const rankClass = idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : 'rank-3';
 
    return `<div class="result-card${isTop ? ' top-pick' : ''}">
      <div class="result-card-header">
        <div class="result-rank ${rankClass}">${idx+1}</div>
        <div>
          ${isTop ? '<span class="top-pick-badge">Best match</span>' : ''}
          <div class="result-name" style="color:${S.color}">${S.name}</div>
          <div class="result-tagline">${S.tagline}</div>
        </div>
        <div class="result-match">
          <div class="match-pct ${pctClass}">${pct}%</div>
          <div class="match-label">match score</div>
        </div>
      </div>
      <div class="result-body">
        <div class="result-why">${S.why(answers)}</div>
        <div class="feature-pills">
          ${S.features.map(f => `<span class="feature-pill${S.highlight.includes(f)?' highlight':''}">${f}</span>`).join('')}
        </div>
        <div class="result-pros-cons">
          <div class="pros">
            <div class="pros-label">Strengths</div>
            ${S.pros.slice(0,3).map(p=>`<div class="pro-item">${p}</div>`).join('')}
          </div>
          <div class="cons">
            <div class="cons-label">Limitations</div>
            ${S.cons.slice(0,3).map(c=>`<div class="con-item">${c}</div>`).join('')}
          </div>
        </div>
        <div class="result-footer">
          <button class="btn-enquire" type="button" onclick="openModal('${sys}', ${pct})">
            Enquire about ${S.name}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <a class="btn-learn" href="${S.url}">
            Read our ${S.name} review
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <button class="btn-watch" type="button" onclick="openVideoModal('${sys}', '${S.name}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Watch ${S.name} overview
          </button>
          ${idx === 0 ? `<button class="btn-restart" onclick="restartQuiz()">Retake quiz</button>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}
 
function restartQuiz() {
  current = 0;
  answers = {};
  document.getElementById('results-panel').style.display = 'none';
  document.getElementById('quiz-panel').style.display = 'block';
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
 
 
 
// ── TRACKING CAPTURE ─────────────────────────────────────────────────────────
(function() {
  const params = new URLSearchParams(window.location.search);
  const get = k => params.get(k) || '';
  const setCookie = (k, v) => { if (v) document.cookie = k + '=' + encodeURIComponent(v) + ';path=/;max-age=2592000'; };
  const getCookie = k => { const m = document.cookie.match('(^|;)\\s*' + k + '\\s*=\\s*([^;]+)'); return m ? decodeURIComponent(m[2]) : ''; };
 
  const gclid = get('gclid') || getCookie('gclid');
  if (get('gclid')) setCookie('gclid', get('gclid'));
  ['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k => { if (get(k)) setCookie(k, get(k)); });
 
  window._tracking = {
    gclid,
    medium: get('utm_medium') || getCookie('utm_medium') || (document.referrer ? 'referral' : 'direct'),
    referrer: document.referrer,
    sourceUrl: window.location.href,
    prevUrl: document.referrer,
    utmSource: get('utm_source') || getCookie('utm_source'),
    utmMedium: get('utm_medium') || getCookie('utm_medium'),
    utmCampaign: get('utm_campaign') || getCookie('utm_campaign'),
    utmTerm: get('utm_term') || getCookie('utm_term'),
    utmContent: get('utm_content') || getCookie('utm_content'),
  };
})();
 
// ── MODAL LOGIC ───────────────────────────────────────────────────────────────
const Q_SHORT_LABELS = {
  users:'Team size', priority:'Priority', deployment:'Hosting',
  remoteWork:'Working style', callHandling:'Call handling',
  integration:'Integrations', budget:'Budget'
};
 
// ── ENQUIRY TYPE TOGGLE ──────────────────────────────────────────────────────
let currentEnqType = 'call';
 
function setEnqType(type) {
  currentEnqType = type;
  document.getElementById('hidden-enq-type').value = type === 'call' ? 'Callback request' : 'Quote request';
  document.getElementById('enq-call-btn').classList.toggle('active', type === 'call');
  document.getElementById('enq-quote-btn').classList.toggle('active', type === 'quote');
  document.getElementById('fields-call').style.display  = type === 'call'  ? 'block' : 'none';
  document.getElementById('fields-quote').style.display = type === 'quote' ? 'block' : 'none';
  // Show submit button only once a type is selected
  const submitBtn = document.getElementById('modal-submit-btn');
  const privacyNotice = document.getElementById('modal-privacy');
  submitBtn.style.display = 'flex';
  privacyNotice.style.display = 'flex';
  submitBtn.innerHTML = (type === 'call'
    ? 'Request a callback <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 5.5 5.5l.86-.86a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
    : 'Send quote request <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>');
}
 
// ── ENQUIRY MODAL ─────────────────────────────────────────────────────────────
function openModal(sysKey, matchPct) {
  const S = SYSTEMS[sysKey];
  const t = window._tracking;
 
  document.getElementById('modal-sys-name').textContent = S.name;
  document.getElementById('modal-sys-dot').style.background = S.color;
  document.getElementById('modal-subject').value = 'Phone system enquiry — ' + S.name + ' (T2K VoIP Phone System Finder)';
  document.getElementById('hidden-system').value = S.name;
  document.getElementById('hidden-score').value  = matchPct + '% match';
 
  // Build answers string for hidden field (not shown to user)
  const answerLines = QUESTIONS.map(q => {
    const ans = answers[q.id];
    const opt = q.options.find(o => o.val === ans);
    return Q_SHORT_LABELS[q.id] + ': ' + (opt ? opt.label : 'Not answered');
  }).join(' | ');
  document.getElementById('hidden-answers').value = answerLines;
 
  // Still populate summary div for hidden data — but CSS hides it from user
  const summary = document.getElementById('modal-summary');
  summary.innerHTML = QUESTIONS.filter(q => answers[q.id]).map(q => {
    const opt = q.options.find(o => o.val === answers[q.id]);
    return `<span class="ans-chip">${Q_SHORT_LABELS[q.id]}: ${opt ? opt.label : ''}</span>`;
  }).join('');
 
  // Tracking
  const setV = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
  setV('modal-gclid',        t.gclid);
  setV('modal-medium',       t.medium);
  setV('modal-referrer',     t.referrer);
  setV('modal-source-url',   t.sourceUrl);
  setV('modal-prev-url',     t.prevUrl);
  setV('modal-utm-source',   t.utmSource);
  setV('modal-utm-medium',   t.utmMedium);
  setV('modal-utm-campaign', t.utmCampaign);
  setV('modal-utm-term',     t.utmTerm);
  setV('modal-utm-content',  t.utmContent);
 
  // Reset form and type state — no type pre-selected
  currentEnqType = null;
  document.getElementById('enquiry-modal-form').reset();
  document.getElementById('enq-call-btn').classList.remove('active');
  document.getElementById('enq-quote-btn').classList.remove('active');
  document.getElementById('fields-call').style.display  = 'none';
  document.getElementById('fields-quote').style.display = 'none';
  document.getElementById('modal-submit-btn').style.display = 'none';
  const pn = document.getElementById('modal-privacy');
  if (pn) pn.style.display = 'none';
 
  // Re-apply hidden values after reset
  document.getElementById('hidden-system').value  = S.name;
  document.getElementById('hidden-answers').value = answerLines;
  document.getElementById('hidden-score').value   = matchPct + '% match';
  document.getElementById('modal-subject').value  = 'Phone system enquiry — ' + S.name + ' (T2K VoIP Phone System Finder)';
  document.getElementById('hidden-enq-type').value = '';
  setV('modal-gclid',        t.gclid);
  setV('modal-medium',       t.medium);
  setV('modal-referrer',     t.referrer);
  setV('modal-source-url',   t.sourceUrl);
  setV('modal-prev-url',     t.prevUrl);
  setV('modal-utm-source',   t.utmSource);
  setV('modal-utm-medium',   t.utmMedium);
  setV('modal-utm-campaign', t.utmCampaign);
  setV('modal-utm-term',     t.utmTerm);
  setV('modal-utm-content',  t.utmContent);
 
  resetModalSubmit();
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('modal-call-name').focus(), 320);
}
 
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
 
function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}
 
// ── VALIDATION ────────────────────────────────────────────────────────────────
function validateModal() {
  let valid = true;
 
  // Guard — type must be selected
  if (!currentEnqType) return false;
 
  // Clear all errors first
  ['mf-call-name','mf-call-phone','mf-quote-name','mf-quote-email','mf-quote-users'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('invalid');
  });
 
  if (currentEnqType === 'call') {
    const name  = document.getElementById('modal-call-name');
    const phone = document.getElementById('modal-call-phone');
    if (!name.value.trim())  { document.getElementById('mf-call-name').classList.add('invalid');  valid = false; }
    if (!phone.value.trim()) { document.getElementById('mf-call-phone').classList.add('invalid'); valid = false; }
  } else {
    const name  = document.getElementById('modal-quote-name');
    const email = document.getElementById('modal-quote-email');
    const users = document.getElementById('modal-quote-users');
    if (!name.value.trim())                                        { document.getElementById('mf-quote-name').classList.add('invalid');  valid = false; }
    if (!email.value.trim() || !email.value.includes('@'))         { document.getElementById('mf-quote-email').classList.add('invalid'); valid = false; }
    if (!users.value || isNaN(users.value) || parseInt(users.value) < 1) { document.getElementById('mf-quote-users').classList.add('invalid'); valid = false; }
  }
  return valid;
}
 
function resetModalSubmit() {
  const btn = document.getElementById('modal-submit-btn');
  btn.disabled = false;
  if (currentEnqType) setEnqType(currentEnqType);
}
 
document.getElementById('enquiry-modal-form').addEventListener('submit', function(e) {
  if (!validateModal()) { e.preventDefault(); return; }
  const btn = document.getElementById('modal-submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Sending…';
});
 
// Blur validation
['modal-call-name','modal-call-phone'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur', function() {
    const fieldMap = { 'modal-call-name':'mf-call-name', 'modal-call-phone':'mf-call-phone' };
    const field = document.getElementById(fieldMap[id]);
    if (field) field.classList.toggle('invalid', !this.value.trim());
  });
});
['modal-quote-name','modal-quote-email'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('blur', function() {
    const fieldMap = { 'modal-quote-name':'mf-quote-name', 'modal-quote-email':'mf-quote-email' };
    const field = document.getElementById(fieldMap[id]);
    if (!field) return;
    const tests = { 'modal-quote-name': v => v.trim().length > 0, 'modal-quote-email': v => v.trim().length > 0 && v.includes('@') };
    if (field) field.classList.toggle('invalid', !tests[id](this.value));
  });
});
 
// ── VIDEO MODAL ───────────────────────────────────────────────────────────────
const VIDEO_EMBEDS = {
  'mitel':     '',  // Add YouTube/Vimeo embed URL for Mitel MiVoice Business
  '3cx':       '',  // Add YouTube/Vimeo embed URL for 3CX
  'horizon':   '',  // Add YouTube/Vimeo embed URL for Gamma Horizon
  'webex':     '',  // Add YouTube/Vimeo embed URL for Gamma Webex
  'phoneline': '',  // Add YouTube/Vimeo embed URL for Gamma Phoneline+
  'flow':      '',  // Add YouTube/Vimeo embed URL for Voiceflex Flow
};
 
const VIDEO_QUOTE_URLS = {
  'mitel':     '/quote/request-a-quote?plan=mitel-no-package#Quote',
  '3cx':       '/quote/request-a-quote?plan=3cx-no-package#Quote',
  'horizon':   '/quote/request-a-quote?plan=horizon-no-package#Quote',
  'webex':     '/quote/request-a-quote?plan=webex-no-package#Quote',
  'phoneline': '/quote/request-a-quote?plan=phoneline-plus-no-package#Quote',
  'flow':      '/quote/request-a-quote?plan=voiceflex-flow-no-package#Quote',
};
 
function openVideoModal(sysKey, sysName) {
  const overlay   = document.getElementById('video-modal-overlay');
  const titleEl   = document.getElementById('video-modal-title-text');
  const wrap      = document.getElementById('video-embed-wrap');
  const placeholder = document.getElementById('video-placeholder');
  const quoteBtn  = document.getElementById('video-modal-quote-btn');
 
  titleEl.textContent = sysName + ' — Overview';
  quoteBtn.href = VIDEO_QUOTE_URLS[sysKey] || '/quote/request-a-quote#Quote';
 
  // Clear any previous iframe
  const existing = wrap.querySelector('iframe');
  if (existing) existing.remove();
 
  const embedUrl = VIDEO_EMBEDS[sysKey];
  if (embedUrl) {
    placeholder.style.display = 'none';
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = sysName + ' overview video';
    wrap.appendChild(iframe);
  } else {
    placeholder.style.display = 'flex';
  }
 
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeVideoModal() {
  const overlay = document.getElementById('video-modal-overlay');
  const wrap    = document.getElementById('video-embed-wrap');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    const iframe = wrap.querySelector('iframe');
    if (iframe) iframe.remove();
    document.getElementById('video-placeholder').style.display = 'flex';
  }, 260);
}
 
function handleVideoOverlayClick(e) {
  if (e.target === document.getElementById('video-modal-overlay')) closeVideoModal();
}
 
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeVideoModal();
  }
});
 
// ── INIT ─────────────────────────────────────────────────────────────────────
renderQuestion();
