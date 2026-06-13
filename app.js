/* ═══════════════════════════════════════════════════════════════
   GAAVAT Resilience Dashboard — app.js  v1.0
   SDMA Maharashtra | Government of Maharashtra
   Features: Executive Usability Layer, NDMA Pilot Card,
             Resilience Season Selector, BharatFS Forecast,
             GIS Forecast-Risk-Preparedness Gap
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. DISTRICT DATA (all 36 Maharashtra districts) ──────────── */
const DISTRICTS = Object.freeze([
  // Vidarbha (11)
  {name:'Nagpur',          div:'Vidarbha',           dri:84,hpi:74,ipi:78,bci:72,events:22,dqs:86,hazard:'Lightning',   gap:12,know:79,prac:70,pilot:false, hazardIdx:55},
  {name:'Amravati',        div:'Vidarbha',           dri:62,hpi:53,ipi:60,bci:56,events:15,dqs:67,hazard:'Heatwave',    gap:27,know:61,prac:49,pilot:false, hazardIdx:62},
  {name:'Yavatmal',        div:'Vidarbha',           dri:55,hpi:47,ipi:53,bci:50,events:12,dqs:58,hazard:'Lightning',   gap:38,know:54,prac:43,pilot:false, hazardIdx:58},
  {name:'Wardha',          div:'Vidarbha',           dri:71,hpi:62,ipi:68,bci:64,events:18,dqs:76,hazard:'Lightning',   gap:21,know:69,prac:58,pilot:false, hazardIdx:52},
  {name:'Chandrapur',      div:'Vidarbha',           dri:57,hpi:49,ipi:55,bci:51,events:13,dqs:60,hazard:'Heatwave',    gap:35,know:56,prac:45,pilot:false, hazardIdx:65},
  {name:'Gadchiroli',      div:'Vidarbha',           dri:47,hpi:41,ipi:44,bci:45,events:10,dqs:52,hazard:'Flood',       gap:50,know:48,prac:37,pilot:true,  hazardIdx:72},
  {name:'Bhandara',        div:'Vidarbha',           dri:67,hpi:57,ipi:64,bci:59,events:16,dqs:70,hazard:'Flood',       gap:26,know:64,prac:53,pilot:false, hazardIdx:60},
  {name:'Gondia',          div:'Vidarbha',           dri:64,hpi:56,ipi:62,bci:58,events:15,dqs:68,hazard:'Flood',       gap:30,know:62,prac:51,pilot:false, hazardIdx:61},
  {name:'Buldhana',        div:'Vidarbha',           dri:58,hpi:50,ipi:55,bci:52,events:13,dqs:61,hazard:'Drought',     gap:36,know:57,prac:46,pilot:false, hazardIdx:48},
  {name:'Akola',           div:'Vidarbha',           dri:60,hpi:51,ipi:58,bci:54,events:14,dqs:63,hazard:'Heatwave',    gap:33,know:59,prac:47,pilot:false, hazardIdx:63},
  {name:'Washim',          div:'Vidarbha',           dri:53,hpi:44,ipi:51,bci:48,events:11,dqs:57,hazard:'Drought',     gap:40,know:52,prac:40,pilot:false, hazardIdx:50},
  // Marathwada (8)
  {name:'C.Sambhajinagar', div:'Marathwada',         dri:64,hpi:55,ipi:62,bci:67,events:15,dqs:69,hazard:'Drought',     gap:25,know:71,prac:51,pilot:true,  hazardIdx:54, fullName:'Chhatrapati Sambhajinagar'},
  {name:'Latur',           div:'Marathwada',         dri:58,hpi:50,ipi:55,bci:52,events:13,dqs:64,hazard:'Earthquake',  gap:28,know:57,prac:46,pilot:true,  hazardIdx:70},
  {name:'Osmanabad',       div:'Marathwada',         dri:38,hpi:34,ipi:42,bci:39,events: 9,dqs:49,hazard:'Drought',     gap:58,know:43,prac:30,pilot:false, hazardIdx:45},
  {name:'Beed',            div:'Marathwada',         dri:52,hpi:43,ipi:49,bci:48,events:11,dqs:57,hazard:'Drought',     gap:43,know:52,prac:39,pilot:false, hazardIdx:47},
  {name:'Nanded',          div:'Marathwada',         dri:56,hpi:48,ipi:53,bci:50,events:12,dqs:59,hazard:'Flood',       gap:37,know:55,prac:44,pilot:false, hazardIdx:58},
  {name:'Hingoli',         div:'Marathwada',         dri:49,hpi:40,ipi:46,bci:43,events:10,dqs:53,hazard:'Drought',     gap:48,know:47,prac:36,pilot:false, hazardIdx:44},
  {name:'Parbhani',        div:'Marathwada',         dri:51,hpi:42,ipi:49,bci:45,events:11,dqs:55,hazard:'Drought',     gap:45,know:50,prac:38,pilot:false, hazardIdx:46},
  {name:'Jalna',           div:'Marathwada',         dri:54,hpi:46,ipi:52,bci:49,events:12,dqs:58,hazard:'Drought',     gap:41,know:53,prac:42,pilot:false, hazardIdx:48},
  // Western Maharashtra (6)
  {name:'Pune',            div:'Western Maharashtra',dri:79,hpi:72,ipi:75,bci:71,events:21,dqs:82,hazard:'Urban Flood', gap:10,know:76,prac:68,pilot:true,  hazardIdx:58},
  {name:'Kolhapur',        div:'Western Maharashtra',dri:69,hpi:56,ipi:64,bci:58,events:17,dqs:71,hazard:'Flood',       gap:44,know:62,prac:52,pilot:false, hazardIdx:72},
  {name:'Satara',          div:'Western Maharashtra',dri:66,hpi:57,ipi:63,bci:61,events:16,dqs:70,hazard:'Landslide',   gap:31,know:65,prac:53,pilot:false, hazardIdx:66},
  {name:'Solapur',         div:'Western Maharashtra',dri:61,hpi:52,ipi:59,bci:57,events:14,dqs:65,hazard:'Drought',     gap:33,know:62,prac:48,pilot:false, hazardIdx:50},
  {name:'Sangli',          div:'Western Maharashtra',dri:65,hpi:55,ipi:62,bci:60,events:15,dqs:68,hazard:'Flood',       gap:30,know:64,prac:51,pilot:false, hazardIdx:68},
  {name:'Ahmednagar',      div:'Western Maharashtra',dri:59,hpi:50,ipi:57,bci:53,events:13,dqs:62,hazard:'Drought',     gap:36,know:58,prac:46,pilot:false, hazardIdx:52},
  // North Maharashtra (4)
  {name:'Nashik',          div:'North Maharashtra',  dri:77,hpi:70,ipi:73,bci:69,events:20,dqs:79,hazard:'Flood',       gap:18,know:74,prac:65,pilot:true,  hazardIdx:62},
  {name:'Jalgaon',         div:'North Maharashtra',  dri:60,hpi:51,ipi:58,bci:55,events:14,dqs:66,hazard:'Heatwave',    gap:34,know:60,prac:47,pilot:false, hazardIdx:60},
  {name:'Dhule',           div:'North Maharashtra',  dri:55,hpi:46,ipi:53,bci:49,events:12,dqs:60,hazard:'Heatwave',    gap:40,know:54,prac:42,pilot:false, hazardIdx:58},
  {name:'Nandurbar',       div:'North Maharashtra',  dri:41,hpi:38,ipi:39,bci:42,events: 8,dqs:38,hazard:'Flood',       gap:47,know:45,prac:34,pilot:false, hazardIdx:65},
  // Konkan (7)
  {name:'Mumbai City',     div:'Konkan',             dri:73,hpi:62,ipi:70,bci:64,events:18,dqs:78,hazard:'Urban Flood', gap:22,know:69,prac:58,pilot:false, hazardIdx:70},
  {name:'Mumbai Sub.',     div:'Konkan',             dri:70,hpi:60,ipi:67,bci:62,events:17,dqs:75,hazard:'Urban Flood', gap:25,know:67,prac:56,pilot:false, hazardIdx:68},
  {name:'Thane',           div:'Konkan',             dri:68,hpi:58,ipi:65,bci:60,events:16,dqs:72,hazard:'Urban Flood', gap:29,know:65,prac:54,pilot:false, hazardIdx:65},
  {name:'Palghar',         div:'Konkan',             dri:63,hpi:53,ipi:60,bci:55,events:14,dqs:67,hazard:'Cyclone',     gap:38,know:60,prac:49,pilot:false, hazardIdx:74},
  {name:'Raigad',          div:'Konkan',             dri:63,hpi:52,ipi:59,bci:54,events:15,dqs:68,hazard:'Landslide',   gap:41,know:58,prac:48,pilot:true,  hazardIdx:80},
  {name:'Ratnagiri',       div:'Konkan',             dri:48,hpi:35,ipi:50,bci:44,events:12,dqs:61,hazard:'Cyclone',     gap:62,know:48,prac:31,pilot:false, hazardIdx:88},
  {name:'Sindhudurg',      div:'Konkan',             dri:74,hpi:65,ipi:70,bci:66,events:19,dqs:80,hazard:'Cyclone',     gap:20,know:71,prac:61,pilot:false, hazardIdx:76},
]);

/* ── 2. PILOT DISTRICTS ─────────────────────────────────────────── */
const PILOT_DISTRICTS = DISTRICTS.filter(d => d.pilot);

/* ── 3. RESILIENCE SEASONS ──────────────────────────────────────── */
const SEASONS = {
  presum:     { label:'Winter & Pre-Summer',          period:'1 Jan 2026 – 31 Mar 2026', short:'Jan–Mar 2026',
                focus:['Water conservation','Fire safety','School preparedness','Cold wave readiness'],
                bciDelta:-8, eventsDelta:-30, eventsTarget:150 },
  premonsoon: { label:'Heatwave & Pre-Monsoon',        period:'1 Apr 2026 – 30 Jun 2026', short:'Apr–Jun 2026',
                focus:['Heat Action Plans','Early warning awareness','Mock drills','Pre-positioning resources'],
                bciDelta:0,  eventsDelta:0,   eventsTarget:216 },
  monsoon:    { label:'Monsoon Preparedness',          period:'1 Jul 2026 – 30 Sep 2026', short:'Jul–Sep 2026',
                focus:['Flood preparedness','Cyclone readiness','Lightning safety','Landslide alerts'],
                bciDelta:5,  eventsDelta:30,  eventsTarget:260 },
  recovery:   { label:'Recovery & Resilience',         period:'1 Oct 2026 – 31 Dec 2026', short:'Oct–Dec 2026',
                focus:['Damage assessment','Lessons learned','VDMP updates','GPDP integration'],
                bciDelta:3,  eventsDelta:-10, eventsTarget:190 },
};
let currentSeason = SEASONS.premonsoon;

/* ── 4. BHARATFS + GeoDSS FORECAST DATA ────────────────────────── */
const FORECAST_ALERTS = [
  { district:'Ratnagiri',  hazard:'Heavy Rainfall + Cyclonic Wind',      sev:'Severe',    sevCode:'critical',
    window:'Illustrative Forecast Window',   gps:'Dapoli, Khed, Ratnagiri clusters (8 GPs)',
    hpi:35, fpas:88, action:'Deploy Disaster Mitras immediately. Pre-position rescue boats. Activate all VDMCs.' },
  { district:'Raigad',     hazard:'Heavy Rainfall + Landslide Risk',     sev:'High',      sevCode:'high',
    window:'Illustrative Forecast Window',   gps:'Pen, Alibag, Karjat clusters (6 GPs)',
    hpi:52, fpas:72, action:'Activate GP alerts. Brief Sarpanches. Verify evacuation routes.' },
  { district:'Sindhudurg', hazard:'Coastal Flooding + High Tide',        sev:'High',      sevCode:'high',
    window:'Illustrative Forecast Window',   gps:'Malvan, Kudal, Vengurla clusters (5 GPs)',
    hpi:65, fpas:55, action:'Issue early warning. Monitor coastal GPs. Confirm shelter readiness.' },
  { district:'Palghar',    hazard:'Heavy Rainfall + Tribal Area Flooding',sev:'Moderate', sevCode:'moderate',
    window:'Illustrative Forecast Window',   gps:'Jawhar, Mokhada clusters (4 GPs)',
    hpi:53, fpas:58, action:'Alert BDO. Check road connectivity. Ensure food depots are stocked.' },
  { district:'Gadchiroli', hazard:'River Flooding (Pranhita tributary)', sev:'Moderate',  sevCode:'moderate',
    window:'Illustrative Forecast Window',   gps:'Aheri, Sironcha clusters (3 GPs)',
    hpi:41, fpas:61, action:'Pre-position boats. Alert VDMC. Check communication lines.' },
  { district:'Pune',       hazard:'Urban Flooding (Mula-Mutha catchment)',sev:'Low',      sevCode:'low',
    window:'Illustrative Forecast Window',   gps:'Mulshi, Maval, Haveli clusters (6 GPs)',
    hpi:72, fpas:18, action:'Monitor urban drainage. No immediate escalation required.' },
];

/* ── 5. GP / CLUSTER DATA ────────────────────────────────────────── */
const CLUSTERS = [
  {name:'Cluster A · Anchor',     ipi:76,hpi:68,bci:65,gpCount:5,status:'On Track'},
  {name:'Cluster B · Flood Belt', ipi:61,hpi:49,bci:54,gpCount:4,status:'Needs Action'},
  {name:'Cluster C · Tribal',     ipi:52,hpi:43,bci:48,gpCount:5,status:'Lagging'},
  {name:'Cluster D · Urban Fringe',ipi:69,hpi:57,bci:61,gpCount:4,status:'On Track'},
  {name:'Cluster E · Drought Zone',ipi:46,hpi:38,bci:45,gpCount:5,status:'Critical'},
];
const GPS = [
  {name:'Dhayari GP',       score:72,hpi:64,ipi:78,bci:67,mitra:'Active',  vdmp:'Updated',    hh:312},
  {name:'Uruli Kanchan GP', score:61,hpi:52,ipi:66,bci:58,mitra:'Active',  vdmp:'Updated',    hh:247},
  {name:'Shindewadi GP',    score:46,hpi:35,ipi:51,bci:44,mitra:'Inactive',vdmp:'Pending',    hh:188},
  {name:'Khed GP',          score:55,hpi:49,ipi:59,bci:50,mitra:'Active',  vdmp:'Pending',    hh:421},
  {name:'Maval GP',         score:39,hpi:28,ipi:44,bci:37,mitra:'Inactive',vdmp:'Not Updated',hh:156},
];
const HPI_ITEMS = [
  {label:'Safe shelter route known',             pct:78},
  {label:'Emergency contact list maintained',    pct:81},
  {label:'72-hour emergency kit available',      pct:31},
  {label:'GAAVAT event attendance (6 months)',   pct:66},
  {label:'Basic first aid demonstrated',         pct:45},
  {label:'72-hour water storage secured',        pct:54},
  {label:'Family meeting point designated',      pct:24},
  {label:'Important documents secured/copied',   pct:28},
  {label:'Local warning signal recognized',      pct:72},
  {label:'Family disaster roles discussed',      pct:49},
];

/* ── 6. ALERTS ───────────────────────────────────────────────────── */
const ALERTS = [
  {type:'critical',district:'Ratnagiri',  msg:'High flood/cyclone exposure. HPI 35. Mitra deployment recommended urgently.', action:'Deploy Mitras'},
  {type:'critical',district:'Osmanabad',  msg:'DRI 38 — below critical threshold for 3rd consecutive cycle. Immediate review required.', action:'Schedule Review'},
  {type:'warning', district:'Nandurbar',  msg:'Data Quality Score 38. Photos missing in 4 event reports. Data coordinator to follow up.', action:'Flag to BDO'},
  {type:'warning', district:'Hingoli',    msg:'VDMP overdue for 6 GPs. GP Secretaries not responded to automated reminders.', action:'Send Reminder'},
  {type:'info',    district:'Pune',       msg:'BCI end-line survey due this week for 6 GPs. Facilitators have been notified.', action:'View Schedule'},
  {type:'good',    district:'Nagpur',     msg:'DRI reached 84 — highest in Maharashtra. District Collector recognition recommended.', action:'Draft Certificate'},
];

/* ── 7. GIS LAYER DESCRIPTIONS ───────────────────────────────────── */
const GIS_LAYERS = {
  action:   { title:'36-District Action Priority Map',   desc:'Composite: forecast severity × preparedness gap = action urgency. Red = pre-emptive deployment required.',   metric: d => Math.round(d.hazardIdx * (100 - d.hpi) / 100) },
  forecast: { title:'36-District Hazard Forecast Map',   desc:'Current BharatFS forecast severity rating by district. Based on 96-hour weather + hazard model.',            metric: d => d.hazardIdx },
  exposure: { title:'36-District Hazard Exposure Map',   desc:'Structural hazard exposure index from NDMA GeoDSS — flood zones, seismic zones, cyclone tracks.',            metric: d => d.hazardIdx },
  prep:     { title:'36-District Preparedness Map',      desc:'GAAVAT Household Preparedness Index (HPI). Inverted for gap view: lower HPI = higher urgency.',              metric: d => d.hpi },
};
let currentGISLayer = 'action';

/* ── 8. STATE ─────────────────────────────────────────────────────── */
let selectedDistrict = DISTRICTS[0];
let currentMetric    = 'dri';
let rankFilter       = '';
let charts           = {};
const VIEW_TITLES = {
  command:'State Command Centre', district:'District Performance',
  gp:'GP Cluster Intelligence',  behaviour:'Behaviour Change Dashboard',
  gis:'GIS Intelligence',        ndma:'NDMA Reporting',
};

/* ── 9. UTILS ─────────────────────────────────────────────────────── */
const $   = id  => document.getElementById(id);
const qs  = sel => document.querySelector(sel);
const cls = score => score >= 70 ? 'green' : score >= 50 ? 'amber' : 'red';
const gapCls = g => g > 50 ? 'critical' : g > 35 ? 'high' : g > 20 ? 'medium' : 'good';
const fpasColor = s => s >= 70 ? 'red' : s >= 45 ? 'amber' : s >= 25 ? '#D4761B' : 'green';

function mkChart(id, type, data, options = {}) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  const ctx = $(id); if (!ctx) return;
  charts[id] = new Chart(ctx, {
    type, data,
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position:'bottom', labels:{ font:{size:11}, padding:12 } } },
      ...options
    }
  });
}

/* ── 10. MODALS ───────────────────────────────────────────────────── */
function showModal(title, body) {
  $('modalTitle').textContent = title;
  $('modalBody').innerHTML = body;
  $('modalOverlay').classList.add('open');
}
function closeModal() { $('modalOverlay').classList.remove('open'); }

function showMethodology() {
  $('methodBody').innerHTML = buildMethodologyHTML();
  $('methodologyOverlay').classList.add('open');
}
function closeMethodology() { $('methodologyOverlay').classList.remove('open'); }

function buildMethodologyHTML() {
  const scores = [
    { code:'HPI', color:'#1A6B5A', name:'Household Preparedness Index',
      purpose:'Measures whether individual households have taken the key protective actions that reduce risk before a disaster strikes.',
      components:[
        ['Emergency family plan (written or discussed)', '20%', 'Household interview'],
        ['72-hour emergency kit available',              '20%', 'Direct observation'],
        ['Evacuation route knowledge (demonstration)',   '20%', 'Demonstration-based test'],
        ['Early warning signal recognition',            '20%', 'Household interview'],
        ['Financial / insurance preparedness',          '20%', 'Household interview'],
      ],
      bands:[['≥ 70 · Prepared','green'],['50–69 · Developing','amber'],['< 50 · Critical','red']],
    },
    { code:'IPI', color:'#1A3560', name:'Institutional Preparedness Index',
      purpose:'Assesses whether Gram Panchayat institutions have the structures, plans and resources in place to lead community disaster response.',
      components:[
        ['VDMP current and updated (within 6 months)',         '25%', 'Document review'],
        ['VDMC active and meeting regularly (monthly)',        '25%', 'Meeting register check'],
        ['Resources pre-positioned (first aid, boats, ropes)', '25%', 'Physical verification'],
        ['Trained DM functionaries available at GP level',     '25%', 'Structured interview'],
      ],
      bands:[['≥ 70 · Institutionally Ready','green'],['50–69 · Partial','amber'],['< 50 · Needs Urgent Institutional Support','red']],
    },
    { code:'BCI', color:'#C8860A', name:'Behaviour Change Index',
      purpose:'Captures whether GAAVAT programme activities have resulted in genuine behaviour change — not just knowledge gained, but protective actions actually taken.',
      components:[
        ['Knowledge: Recalls key protective actions (4 weeks post-event)', '25%', 'Structured recall test'],
        ['Attitude: Believes household is personally at risk',             '25%', 'Household interview'],
        ['Intent: States specific protective action intention',            '15%', 'Household interview'],
        ['Practice: Has taken 2 or more protective actions',              '35%', 'Observation + self-report'],
      ],
      bands:[['≥ 70 · Significant Change','green'],['50–69 · Emerging Change','amber'],['< 50 · Limited Change — Review Design','red']],
    },
    { code:'DRI', color:'#1E8449', name:'District Resilience Index',
      purpose:'Composite score measuring the overall disaster preparedness and resilience of a district. Used by District Collectors and SDMA for resource prioritisation and performance tracking.',
      components:[
        ['HPI — Household Preparedness Index',               '40%', 'Aggregated from GP surveys'],
        ['IPI — Institutional Preparedness Index',           '30%', 'Aggregated from GP assessments'],
        ['BCI — Behaviour Change Index',                     '20%', 'Post-event recall surveys'],
        ['Infrastructure Coverage (shelters, Mitra density)','10%', 'Field mapping + official records'],
      ],
      formula: 'DRI = (HPI × 0.40) + (IPI × 0.30) + (BCI × 0.20) + (Infra × 0.10)',
      bands:[['≥ 70 · Strong','green'],['50–69 · Developing','amber'],['< 50 · Critical — Priority Action','red']],
    },
    { code:'FPAS', color:'#8A2432', name:'Forecast Preparedness Alert Score',
      purpose:'An early-warning composite that flags districts where active hazard forecasts intersect with low preparedness — enabling pre-emptive protective action before a disaster strikes.',
      components:[
        ['Forecast Hazard Severity (BharatFS weather model)',              '35%', 'BharatFS 96-hr forecast'],
        ['Hazard Exposure Index (GeoDSS hazard zone layer)',               '30%', 'NDMA GeoDSS spatial data'],
        ['Preparedness Gap (100 − HPI)',                                   '25%', 'GAAVAT field data'],
        ['Trend direction (3-season DRI trajectory)',                      '10%', 'GAAVAT longitudinal data'],
      ],
      formula: 'FPAS ≈ (ForecastSeverity × ExposureIdx × (100 − HPI)) / 100',
      bands:[['≥ 70 · Critical Alert — Pre-emptive Deployment','red'],['45–69 · High Alert — Activate GPs','amber'],['25–44 · Monitor','navy'],['< 25 · Stable','green']],
    },
  ];

  const cards = scores.map(s => `
    <div class="method-card" style="border-top-color:${s.color}">
      <div class="method-head">
        <span class="method-code" style="background:${s.color}">${s.code}</span>
        <div><h4>${s.name}</h4><p>${s.purpose}</p></div>
      </div>
      <div class="method-table-wrap">
        ${s.formula ? `<p style="font-size:11px;font-weight:700;color:#1A3560;margin:8px 0 6px;font-family:monospace;background:#F4F7FB;padding:6px 10px;border-radius:6px">${s.formula}</p>` : ''}
        <table class="method-table">
          <thead><tr><th>Component</th><th>Weight</th><th>How Measured</th></tr></thead>
          <tbody>${s.components.map(c => `<tr><td>${c[0]}</td><td style="white-space:nowrap;font-weight:700">${c[1]}</td><td>${c[2]}</td></tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="method-bands">
        ${s.bands.map(b => `<span class="band ${b[1]}">${b[0]}</span>`).join('')}
      </div>
    </div>`).join('');

  return `
    <div class="method-intro">
      GAAVAT uses four composite indices and one forecast-integrated alert score to measure and anticipate village-level disaster resilience.
      All scores are derived from verified field data collected by trained Village Facilitators and Block Coordinators.
    </div>
    <div class="method-grid">${cards}</div>
    <div class="method-note">
      <strong>Methodology Note — Version 1.0:</strong>
      Version 1.0 uses expert-weighted illustrative methodology for demonstration, to be validated during pilot implementation.
      Scores shown in this dashboard are illustrative values used for platform design and stakeholder consultation.
      Actual baselines will be established during pilot implementation across 6 districts and 120 Gram Panchayats.
      Weightings and indicator definitions will be validated with SDMA and NDMA technical teams before production deployment.
      <br/><br/>
      <strong>Note on FPAS:</strong>
      Version 1.0 uses a simplified illustrative FPAS calculation for demonstration purposes.
      Full production methodology will incorporate forecast severity, hazard exposure and preparedness indicators
      following pilot validation and integration with BharatFS forecast feeds and NDMA GeoDSS spatial data.
    </div>`;
}

/* ── 11. NAVIGATION ───────────────────────────────────────────────── */
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  $(id).classList.add('active');
  $('pageTitle').textContent = VIEW_TITLES[id];
  setTimeout(() => {
    if (id === 'district')  renderDistrictCharts();
    if (id === 'behaviour') renderBehaviourCharts();
    if (id === 'gis')       renderCoverageChart();
  }, 80);
}
function bindNav() {
  document.querySelectorAll('.nav-item').forEach(btn => btn.onclick = () => showView(btn.dataset.view));
}

/* ── 12. CONTROLS ─────────────────────────────────────────────────── */
function bindControls() {
  // Map metric toggle
  $('mapMetric').querySelectorAll('button').forEach(btn => btn.onclick = () => {
    currentMetric = btn.dataset.metric;
    $('mapMetric').querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMap();
  });
  // Monsoon alert mode
  $('toggleMode').onclick = () => {
    const active = document.body.classList.toggle('alert-mode');
    $('toggleMode').textContent = active ? 'Normal Mode' : 'Monsoon Alert Mode';
    $('alertBanner').innerHTML = active
      ? '<strong>MONSOON ALERT MODE:</strong> Coastal districts prioritized. Ratnagiri, Raigad, Palghar and Sindhudurg flagged for immediate preparedness escalation.'
      : '<strong>Preparedness Intelligence:</strong> 6 districts below critical DRI threshold. 14 GPs show high hazard exposure with low household preparedness.';
  };
  // District selector
  $('districtSelector').onchange = e => {
    selectedDistrict = DISTRICTS.find(d => d.name === e.target.value) || DISTRICTS[0];
    renderDistrictView();
    showView('district');
  };
  // Rank search
  const s = $('rankSearch');
  if (s) s.oninput = e => { rankFilter = e.target.value.toLowerCase(); renderRanking(); };
  // Action modal close
  $('modalClose').onclick = closeModal;
  $('modalOverlay').onclick = e => { if (e.target === $('modalOverlay')) closeModal(); };
  // Methodology modal
  $('methodologyBtn').onclick = showMethodology;
  $('methodClose').onclick = closeMethodology;
  $('methodologyOverlay').onclick = e => { if (e.target === $('methodologyOverlay')) closeMethodology(); };
  // Season selector
  $('seasonSelector').onchange = e => updateSeason(e.target.value);
  // Export brief
  $('exportBtn').onclick = () => {
    document.body.classList.add('print-all');
    window.print();
    setTimeout(() => document.body.classList.remove('print-all'), 1000);
  };
  // GIS layer toggle
  $('gisLayer').querySelectorAll('button').forEach(btn => btn.onclick = () => {
    currentGISLayer = btn.dataset.layer;
    $('gisLayer').querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const layer = GIS_LAYERS[currentGISLayer];
    $('gisMapTitle').textContent = layer.title;
    $('gisMapDesc').textContent  = layer.desc;
    $('layerDesc').textContent   = layer.desc;
    renderGapMap();
  });
}

/* ── 13. SEASON ───────────────────────────────────────────────────── */
function updateSeason(key) {
  currentSeason = SEASONS[key] || SEASONS.premonsoon;
  // Sidebar
  $('sidebarSeason').textContent  = currentSeason.label;
  $('sidebarPeriod').textContent  = currentSeason.short;
  // Topbar
  $('seasonPeriod').textContent   = 'Reporting Period: ' + currentSeason.period;
  // Focus bar
  $('seasonFocusTags').innerHTML  = currentSeason.focus.map(f => `<span class="sfb-tag">${f}</span>`).join('');
  // Season-adjusted KPIs
  const bci    = 61 + currentSeason.bciDelta;
  const events = 186 + currentSeason.eventsDelta;
  $('stateBCI').textContent         = bci;
  $('stateBCILabel').textContent    = `↑ ${bci - 54} from baseline`;
  $('seasonEvents').textContent     = events;
  $('seasonEventsLabel').textContent = `Target ${currentSeason.eventsTarget}`;
}

/* ── 14. DISTRICT SELECTOR ────────────────────────────────────────── */
function renderDistrictSelector() {
  const sel  = $('districtSelector');
  const divs = [...new Set(DISTRICTS.map(d => d.div))];
  sel.innerHTML = divs.map(div => {
    const opts = DISTRICTS.filter(d => d.div === div)
      .map(d => `<option value="${d.name}"${d === selectedDistrict ? ' selected' : ''}>${d.name}${d.pilot ? ' ★' : ''}</option>`)
      .join('');
    return `<optgroup label="${div}">${opts}</optgroup>`;
  }).join('');
}

/* ── 15. STATE COMMAND ────────────────────────────────────────────── */
function renderPilotCard() {
  $('pilotDistrictChips').innerHTML = PILOT_DISTRICTS.map(d =>
    `<div class="pilot-chip"><span class="star">★</span>${d.fullName || d.name}</div>`
  ).join('');
  $('sidebarPilotList').innerHTML = PILOT_DISTRICTS.map(d =>
    `<span>★ ${d.fullName || d.name}</span>`
  ).join('');
}

function renderForecastPanel() {
  $('forecastList').innerHTML = FORECAST_ALERTS.map(f =>
    `<div class="forecast-item sev-${f.sevCode}">
       <div class="fi-district">${f.district}</div>
       <div class="fi-hazard"><small style="color:var(--muted);font-size:10px;display:block;margin-bottom:2px">Hazard</small>${f.hazard}</div>
       <div><small style="color:var(--muted);font-size:10px;display:block;margin-bottom:2px">Severity</small><span class="sev-badge ${f.sevCode}">${f.sev}</span></div>
       <div class="fi-window"><small style="color:var(--muted);font-size:10px;display:block;margin-bottom:2px">Window · GPs</small>${f.window}<br><small>${f.gps}</small></div>
       <div class="fi-gap"><small style="color:var(--muted);font-size:10px;display:block;margin-bottom:2px">HPI · FPAS</small>
         <div style="display:flex;align-items:center;gap:8px">
           <span>HPI <b style="color:${f.hpi<50?'var(--red)':f.hpi<70?'var(--amber)':'var(--green)'}">${f.hpi}</b></span>
           <span>FPAS <b style="color:${fpasColor(f.fpas)}">${f.fpas}</b></span>
         </div>
       </div>
       <div class="fi-action"><small style="color:var(--muted);font-size:10px;display:block;margin-bottom:2px">Recommended Action</small>${f.action}</div>
     </div>`
  ).join('');
}

function renderMap() {
  const sorted = [...DISTRICTS].sort((a, b) => b[currentMetric] - a[currentMetric]);
  $('districtMap').innerHTML = sorted.map(d =>
    `<div class="district-tile ${cls(d[currentMetric])}${d.pilot ? ' pilot' : ''}"
          onclick="drillDistrict('${d.name}')" title="${d.fullName || d.name} · ${d.div}">
       <strong>${d.name}</strong>
       <small>${d.hazard}</small>
       <span>${d[currentMetric]}</span>
     </div>`
  ).join('');
}

function renderAlerts() {
  $('alertsList').innerHTML = ALERTS.map((a, i) =>
    `<div class="alert-item ${a.type}">
       <strong>${a.district}</strong>
       <span>${a.msg}</span>
       <button onclick="openAlert(${i})">${a.action}</button>
     </div>`
  ).join('');
}
window.openAlert = function(i) {
  const a = ALERTS[i];
  showModal(`${a.type.toUpperCase()} · ${a.district}`,
    `<p class="modal-msg">${a.msg}</p>
     <div class="modal-actions">
       <button class="btn primary" onclick="closeModal()">Acknowledge</button>
       <button class="btn secondary" onclick="drillDistrict('${a.district}'); closeModal()">View District</button>
     </div>`);
};

function renderRanking() {
  const sorted   = [...DISTRICTS].sort((a, b) => b.dri - a.dri);
  const filtered = rankFilter
    ? sorted.filter(d => d.name.toLowerCase().includes(rankFilter) || d.div.toLowerCase().includes(rankFilter) || d.hazard.toLowerCase().includes(rankFilter))
    : sorted;
  const rows = filtered.map(d => {
    const rank = sorted.indexOf(d) + 1;
    return `<tr onclick="drillDistrict('${d.name}')" style="cursor:pointer">
      <td>${rank}</td>
      <td><b>${d.fullName || d.name}</b>${d.pilot ? ' <span class="badge pilot-badge">PILOT</span>' : ''}<br><small>${d.div}</small></td>
      <td><span class="score-chip ${cls(d.dri)}">${d.dri}</span></td>
      <td>${d.hpi}</td><td>${d.ipi}</td><td>${d.bci}</td><td>${d.dqs}%</td>
      <td><span class="badge ${cls(d.dri)}-badge">${d.dri>=70?'Strong':d.dri>=50?'Developing':'Critical'}</span></td>
    </tr>`;
  }).join('');
  $('rankingTable').innerHTML =
    `<thead><tr><th>#</th><th>District</th><th>DRI</th><th>HPI</th><th>IPI</th><th>BCI</th><th>DQS</th><th>Status</th></tr></thead><tbody>${rows}</tbody>`;
}

function renderSubIndexChart() {
  const top = [...DISTRICTS].sort((a, b) => b.dri - a.dri).slice(0, 10);
  mkChart('subIndexChart', 'bar', {
    labels: top.map(d => d.name),
    datasets: [
      {label:'HPI', data:top.map(d=>d.hpi), backgroundColor:'rgba(26,107,90,.75)'},
      {label:'IPI', data:top.map(d=>d.ipi), backgroundColor:'rgba(26,53,96,.75)'},
      {label:'BCI', data:top.map(d=>d.bci), backgroundColor:'rgba(200,134,10,.80)'},
    ]
  }, { scales:{y:{beginAtZero:true,max:100}} });
}

function updateNavBadges() {
  const n = ALERTS.filter(a => a.type === 'critical' || a.type === 'warning').length;
  const btn = qs('[data-view="command"]');
  if (btn && n) btn.innerHTML = `State Command <span class="nav-badge">${n}</span>`;
}

/* ── 16. DISTRICT DRILL-DOWN ──────────────────────────────────────── */
function drillDistrict(name) {
  selectedDistrict = DISTRICTS.find(d => d.name === name) || DISTRICTS[0];
  renderDistrictSelector();
  renderDistrictView();
  showView('district');
}
window.drillDistrict = drillDistrict;

function renderDistrictView() {
  const d    = selectedDistrict;
  const rank = [...DISTRICTS].sort((a,b) => b.dri - a.dri).findIndex(x => x.name === d.name) + 1;
  $('districtTitle').textContent = d.fullName || d.name;
  const kpis = [
    {label:'DRI Score', val:d.dri,         sub:`Ranked ${rank} of 36`},
    {label:'Events',    val:d.events,       sub:'Current season'},
    {label:'HPI',       val:d.hpi+'%',      sub:'Household preparedness'},
    {label:'IPI',       val:d.ipi,          sub:'Institutional readiness'},
    {label:'BCI',       val:d.bci,          sub:'Behaviour change index'},
    {label:'Data Quality',val:d.dqs+'%',    sub:'Entry accuracy'},
  ];
  $('districtKpis').innerHTML = kpis.map(k =>
    `<div class="kpi-card"><p>${k.label}</p><strong>${k.val}</strong><span>${k.sub}</span></div>`
  ).join('');
  $('pilotBadge').innerHTML = d.pilot
    ? `<span class="badge pilot-badge large">Example Pilot District</span>
       <span style="font-size:12px;color:var(--muted);margin-left:10px">Illustrative pilot configuration · 20 GPs · Demonstration alignment with NDMA and MoPR structures</span>`
    : `<span class="badge grey-badge">Non-Pilot District</span>`;
  $('clusterCards').innerHTML = CLUSTERS.map(c =>
    `<div class="cluster-card" onclick="showView('gp')">
       <div><b>${c.name}</b><br><small>${c.gpCount} GPs · ${c.status}</small></div>
       <span class="mini-score ${cls(c.ipi)}">${c.ipi}</span>
     </div>`
  ).join('');
  const events = [
    {date:'02 Jun',label:'GP Safety Mapping',               status:'done'},
    {date:'12 Jun',label:'Flood Preparedness Drill',         status:'done'},
    {date:'18 Jul',label:'Mitra Training Workshop',          status:'upcoming'},
    {date:'25 Jul',label:'BCI End-Line Survey',              status:'pending'},
    {date:'05 Aug',label:'VDMP Annual Review',               status:'overdue'},
  ];
  $('eventTimeline').innerHTML = events.map(ev =>
    `<div class="timeline-item">
       <span class="tl-date">${ev.date}</span>
       <div><b>${ev.label}</b></div>
       <span class="tl-badge ${ev.status}">${ev.status==='done'?'Verified':ev.status==='overdue'?'Overdue':ev.status==='upcoming'?'Scheduled':'Pending'}</span>
     </div>`
  ).join('');
  setTimeout(renderDistrictCharts, 50);
}

function renderDistrictCharts() {
  const d = selectedDistrict;
  mkChart('districtRadar', 'radar', {
    labels:['Event Delivery','Behaviour Change','Household Prep','Institutional','Convergence'],
    datasets:[{
      label:d.name,
      data:[Math.min(100,Math.round(d.events/22*100)), d.bci, d.hpi, d.ipi, 72],
      backgroundColor:'rgba(26,107,90,.15)', borderColor:'#1A6B5A', pointBackgroundColor:'#1A6B5A',
    }]
  }, {scales:{r:{beginAtZero:true,max:100}}});
  mkChart('deptChart','bar',{
    labels:['Health','Education','WCD','Revenue','Agriculture','PRI','Fire Dept'],
    datasets:[{label:'Convergence Score',data:[78,71,68,52,41,76,69],backgroundColor:['#1A6B5A','#1A3560','#8A2432','#C8860A','#1E8449','#1A6B5A','#1A3560']}]
  },{indexAxis:'y',scales:{x:{beginAtZero:true,max:100}},plugins:{legend:{display:false}}});
}

/* ── 17. GP CLUSTER VIEW ──────────────────────────────────────────── */
function renderGPView() {
  $('gpBoard').innerHTML = GPS.map((g, i) =>
    `<div class="gp-card ${i===0?'active':''}" onclick="renderGPScore(${i})">
       <div class="gp-card-head"><b>${g.name}</b><span class="score-chip ${cls(g.score)}">${g.score}</span></div>
       <small>${g.hh} HH · VDMP: ${g.vdmp} · Mitra: ${g.mitra}</small>
       <div class="progress-bar"><i style="width:${g.score}%;background:${g.score>=70?'#1E8449':g.score>=50?'#C8860A':'#C0392B'}"></i></div>
     </div>`
  ).join('');
  renderGPScore(0);
}
function renderGPScore(i) {
  const g = GPS[i];
  document.querySelectorAll('.gp-card').forEach((x,ix) => x.classList.toggle('active',ix===i));
  $('gpScorecard').innerHTML =
    `<div class="gp-score-header">
       <div><p class="eyebrow">Selected GP</p><h2>${g.name}</h2><span class="pill ${cls(g.score)}">${g.score>=70?'Prepared':g.score>=50?'Developing':'Critical'}</span></div>
       <div class="gp-score-big ${cls(g.score)}">${g.score}</div>
     </div>
     <div class="score-breakdown">
       ${[['HPI',g.hpi],['IPI',g.ipi],['BCI',g.bci]].map(([l,v]) =>
         `<div class="breakdown-item"><p>${l}</p><div class="progress-bar"><i style="width:${v}%;background:#1A6B5A"></i></div><b>${v}</b></div>`
       ).join('')}
     </div><hr/>
     <p><b>Mitra Status:</b> ${g.mitra}</p>
     <p><b>VDMP Status:</b> ${g.vdmp}</p>
     <p><b>Total Households:</b> ${g.hh}</p>
     <button class="btn primary" style="margin-top:12px;width:100%"
             onclick="showModal('Action Reminder Sent','<p class=\\'modal-msg\\'>Automated reminder sent to GP Secretary of ${g.name} for VDMP update and data entry. BDO has been cc\\'d.</p><div class=\\'modal-actions\\'><button class=\\'btn primary\\' onclick=\\'closeModal()\\'>Done</button></div>')">
       Send Action Reminder
     </button>`;
  $('hpiChecklist').innerHTML = HPI_ITEMS.map(it =>
    `<div class="check-item">
       <b>${it.label}</b>
       <div class="check-right">
         <div class="mini-bar"><i style="width:${it.pct}%;background:${it.pct>=70?'#1E8449':it.pct>=40?'#C8860A':'#C0392B'}"></i></div>
         <b class="${it.pct<40?'text-red':''}">${it.pct}%</b>
       </div>
     </div>`
  ).join('');
}
window.renderGPScore = renderGPScore;

/* ── 18. BEHAVIOUR CHANGE ─────────────────────────────────────────── */
function renderBehaviour() {
  $('funnel').innerHTML = [
    ['Participated in GAAVAT Event',         100],
    ['Recalled key preparedness message',     67],
    ['Knows specific protective actions',     69],
    ['Believes personal risk is real',        72],
    ['Took 2 or more protective actions',     52],
    ['Household HPI ≥ 70',                    31],
  ].map((x,i) =>
    `<div class="funnel-step" style="width:${Math.max(x[1],32)}%;opacity:${1-i*0.06}">
       <span>${x[0]}</span><b>${x[1]}%</b>
     </div>`
  ).join('');
  $('eventImpactTable').innerHTML =
    '<thead><tr><th>Event</th><th>District</th><th>Format</th><th>BCI Delta</th></tr></thead><tbody>' +
    [['Community Flood Drill','C.Sambhajinagar','Drill + IPC','+31'],['SHG Preparedness Workshop','Nagpur','Sakhi Session','+26'],
     ['School Safety Programme','Pune','Pathshala','+22'],['Drought Resilience Sabha','Osmanabad','Gram Sabha','+8'],
     ['Fire Safety Training','Nagpur','Mitra Training','+19'],['Women Safety Mapping','Raigad','Community Mapping','+14'],
    ].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td><b style="color:#1E8449">${r[3]}</b></td></tr>`).join('') + '</tbody>';
  setTimeout(renderBehaviourCharts, 50);
}
function renderBehaviourCharts() {
  mkChart('kpScatter','scatter',{
    datasets:[{
      label:'Districts',
      data:DISTRICTS.map(d=>({x:d.know,y:d.prac})),
      backgroundColor:DISTRICTS.map(d=>d.pilot?'#8A2432':'rgba(26,53,96,.55)'),
      pointRadius:DISTRICTS.map(d=>d.pilot?7:5),
    }]
  },{
    scales:{x:{min:30,max:95,title:{display:true,text:'Knowledge Score'}},y:{min:25,max:85,title:{display:true,text:'Practice Score'}}},
    plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>{const d=DISTRICTS[ctx.dataIndex];return `${d.fullName||d.name}: K ${ctx.parsed.x}, P ${ctx.parsed.y}${d.pilot?' ★':''}`;}}}}
  });
}

/* ── 19. GIS INTELLIGENCE (Forecast–Risk–Preparedness Gap) ────────── */
function renderGapMap() {
  const layer  = GIS_LAYERS[currentGISLayer];
  const scored = [...DISTRICTS].map(d => ({...d, layerScore: layer.metric(d)}))
                               .sort((a,b) => b.layerScore - a.layerScore);
  $('gapMap').innerHTML = scored.map(d => {
    const score = d.layerScore;
    const col   = currentGISLayer === 'prep'
      ? cls(score)
      : (score >= 70 ? 'red' : score >= 45 ? 'amber' : score >= 25 ? 'medium' : 'good');
    return `<div class="gap-tile ${col}" onclick="drillDistrict('${d.name}')">
       <strong>${d.name}</strong>
       <small>${d.hazard}</small>
       <span>${Math.round(score)}</span>
     </div>`;
  }).join('');
}

function renderGIS() {
  renderGapMap();
  $('spatialAlerts').innerHTML = [
    ['critical','Ratnagiri: FPAS 88 — Heavy rainfall forecast + HPI 35. Critical pre-emptive action window: 48 hrs.'],
    ['critical','Raigad: Landslide risk + flood forecast. 6 GPs with HPI < 52. Activate VDMC immediately.'],
    ['warning', 'Palghar tribal clusters: 4 GPs with no active Mitra and HPI below 53. Road connectivity risk.'],
    ['warning', 'Gadchiroli: Pranhita river flooding forecast. 3 GPs with IPI < 44 — institutional gap critical.'],
    ['info',    'Latur (Pilot): Earthquake preparedness drill overdue for 6 GPs. BDO action required.'],
    ['good',    'Pune Urban Fringe: FPAS 18. Adequate preparedness. Sharing best practices with Raigad cluster.'],
  ].map(a =>
    `<div class="alert-item ${a[0]}"><strong>${a[0].toUpperCase()}</strong><span>${a[1]}</span></div>`
  ).join('');
  // Forecast-Risk-Preparedness District Prioritisation Table
  const fpasRanked = [...DISTRICTS]
    .map(d => ({...d, fpasScore: Math.round(d.hazardIdx * (100-d.hpi) / 100)}))
    .sort((a,b) => b.fpasScore - a.fpasScore);
  const fAlert = name => FORECAST_ALERTS.find(f => f.district === name);
  $('riskTable').innerHTML =
    '<thead><tr><th>#</th><th>District</th><th>Forecast Hazard</th><th>Severity</th><th>HPI</th><th>FPAS</th><th>Recommended Action</th></tr></thead><tbody>' +
    fpasRanked.slice(0,12).map((d,i) => {
      const fa  = fAlert(d.name);
      const sev = fa ? fa.sev : '—';
      const act = fa ? fa.action.split('.')[0] : 'Continue monitoring';
      return `<tr>
        <td>${i+1}</td>
        <td><b>${d.fullName||d.name}</b>${d.pilot?' <span class="badge pilot-badge">P</span>':''}</td>
        <td>${d.hazard}</td>
        <td>${fa?`<span class="sev-badge ${fa.sevCode}">${sev}</span>`:'<span style="color:var(--muted)">—</span>'}</td>
        <td>${d.hpi}</td>
        <td><b style="color:${fpasColor(d.fpasScore)}">${d.fpasScore}</b></td>
        <td style="font-size:11px">${act}</td>
      </tr>`;
    }).join('') + '</tbody>';
  setTimeout(renderCoverageChart, 60);
}
function renderCoverageChart() {
  mkChart('coverageChart','doughnut',{
    labels:['Shelter: Adequate','Shelter: Deficit','Mitra: Active','Mitra: Gap'],
    datasets:[{data:[62,18,54,26],backgroundColor:['#1E8449','#C0392B','#1A6B5A','#C8860A']}]
  },{plugins:{legend:{position:'right'}}});
}

/* ── 20. NDMA REPORTING ───────────────────────────────────────────── */
function renderNDMA() {
  $('ndmaStatus').innerHTML = [
    {label:'GPs with current VDMP',              pct:78, target:100},
    {label:'DRR focal person designated',         pct:82, target:100},
    {label:'Community safety map maintained',     pct:64, target:100},
    {label:'DRR integrated in GPDP',             pct:41, target:80},
    {label:'Panchayat functionaries trained',     pct:73, target:90},
    {label:'Household emergency kits verified',   pct:31, target:70},
    {label:'VDMC meeting in current season',      pct:69, target:100},
    {label:'Early warning linkage established',   pct:88, target:100},
  ].map(x =>
    `<div class="ndma-row">
       <div class="ndma-label"><b>${x.label}</b><span>${x.pct}% <small>target ${x.target}%</small></span></div>
       <div class="progress-bar wide">
         <i style="width:${x.pct}%;background:${x.pct>=x.target*0.8?'#1E8449':x.pct>=x.target*0.5?'#C8860A':'#C0392B'}"></i>
       </div>
     </div>`
  ).join('');
  $('sendaiList').innerHTML = [
    {code:'C1.1',label:'Affected population by district and hazard type',         status:'Mapped'},
    {code:'C1.2',label:'Disaster-related deaths and injuries (GAAVAT event log)', status:'Mapped'},
    {code:'C3.1',label:'Households with active family emergency plans',           status:'Mapped'},
    {code:'C5.1',label:'GPs with functional Disaster Management Committees',      status:'Mapped'},
    {code:'C6.1',label:'Community members who recall DRR training (BCI survey)',  status:'Mapped'},
    {code:'D1.1',label:'Critical infrastructure damage and recovery data',        status:'Partial'},
    {code:'D2.1',label:'GP-level economic loss estimation',                       status:'Pending'},
  ].map(x =>
    `<div class="check-item">
       <div><b>${x.code}</b> — ${x.label}</div>
       <span class="badge ${x.status==='Mapped'?'green-badge':x.status==='Partial'?'amber-badge':'grey-badge'}">${x.status}</span>
     </div>`
  ).join('');
  $('reportTimeline').innerHTML = [
    {name:'Illustrative MoPR Progress Report (Q2)',   due:'Sample Reporting Date', status:'upcoming'},
    {name:'Illustrative MoPR Progress Report (Q3)',   due:'Sample Reporting Date', status:'pending'},
    {name:'Sendai Indicator Extract (Illustrative)',  due:'Sample Reporting Date', status:'pending'},
    {name:'Annual Resilience Assessment (Illustrative)', due:'Sample Reporting Date', status:'pending'},
  ].map(r =>
    `<div class="timeline-item">
       <span class="tl-date">${r.due}</span>
       <div><b>${r.name}</b></div>
       <span class="tl-badge ${r.status}">${r.status==='done'?'Submitted':r.status==='upcoming'?'In Progress':'Scheduled'}</span>
     </div>`
  ).join('');
}

/* ── 21. INIT ─────────────────────────────────────────────────────── */
function init() {
  renderDistrictSelector();
  renderPilotCard();
  renderForecastPanel();
  renderMap();
  renderAlerts();
  renderRanking();
  renderSubIndexChart();
  renderDistrictView();
  renderGPView();
  renderBehaviour();
  renderGIS();
  renderNDMA();
  updateNavBadges();
  bindNav();
  bindControls();
  updateSeason('premonsoon');  // set initial season state
  setTimeout(() => { $('stateScoreBar').style.width = '61%'; }, 200);
}

window.addEventListener('DOMContentLoaded', init);
