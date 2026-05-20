// Global panel data — Actions / Performance / Risk / Opportunity / Agents

const GLOBAL_INTEL = {
  scope: 'global',

  // === ACTIONS ===
  actionsSubtitle: 'AI-recommended across your 6 accounts',
  actions: [
    { id: 'g1', tone: 'red',   account: 'Encore Global',     title: "Respond to Mike's price counter on Q-1042", detail: '$18K · 3 days, no Ops reply',        ref: 'Q-1042', kind: 'reactive',
      draft: { to: 'Mike Rivera (mike@encoreglobal.com)', subject: 'Re: Q-1042 pricing',
        body: `Hi Mike,

Thanks for getting back to us on the ORD to LAX White Glove quote. I understand pricing is a key consideration.

Given the high-value electronics and our dedicated handling with real-time tracking, I can offer a 5% adjustment to $17,290. This reflects our commitment to the partnership, especially with the Q4 renewal discussion ahead.

Happy to discuss further.

Best,
Kiran` } },
    { id: 'g2', tone: 'red',   account: 'Westfield Inc',     title: 'Quote stalled 6 days on Q-1067',           detail: '$22K · no Ops response',              ref: 'Q-1067', kind: 'reactive',
      draft: { to: 'Tom Reid (tom@westfield.com)', subject: 'Re: Q-1067 — checking in',
        body: `Hi Tom,

Wanted to circle back on Q-1067. I know it's been a few days — I'm pushing internally to get the response across the line and will have an update by EOD tomorrow.

Apologies for the delay. This is a high-priority deal on our side.

Best,
Kiran` } },
    { id: 'g3', tone: 'red',   account: 'Encore Global',     title: "Answer Sarah's insurance Q on Q-1038",     detail: 'Asked twice, never answered',         ref: 'Q-1038', kind: 'reactive',
      draft: { to: 'Sarah Chen (sarah@encoreglobal.com)', subject: 'Re: Insurance coverage on Q-1038',
        body: `Hi Sarah,

Apologies for the delay. Confirming: for ORD→SFO White Glove on high-value electronics, our standard cargo insurance covers replacement value up to $250K with no deductible. Damage in transit is covered end-to-end, including during dedicated handling and climate-controlled storage.

Happy to send the full policy sheet if helpful.

Best,
Kiran` } },
    { id: 'g4', tone: 'amber', account: 'Pacific Logistics', title: 'Quote frequency down 35%',                 detail: 'Last 30d vs prior 30d',               ref: null, kind: 'reactive' },
    { id: 'g5', tone: 'amber', account: 'Acme Corp',         title: 'CSAT dropped to 2.8',                      detail: 'Late delivery, no follow-up',         ref: null, kind: 'reactive' },
    { id: 'g6', tone: 'blue',  account: 'Encore Global',     title: 'New contact Linda Park entered Q-1042',    detail: 'VP Operations, first appearance',     ref: 'Q-1042', kind: 'reactive' },
    // Proactive (seasonal / lifecycle) recommendations
    { id: 'g7', tone: 'amber', account: 'Encore Global',     title: 'Q4 volume spike in 6 weeks',               detail: 'Historical pattern: 2x quote volume Oct-Nov', ref: null, kind: 'proactive',
      draft: { to: 'Sarah Chen (sarah@encoreglobal.com)', subject: 'Q4 capacity planning for Encore',
        body: `Hi Sarah,

Looking ahead at Q4: based on the last two years, we typically see your quote volume roughly double in Oct/Nov for the holiday events push. Want to get ahead of it on our side.

A few things would help:
- Estimated lane mix (ORD→LAX, ORD→SEA, anything new?)
- Approximate volume vs last Q4
- Any service shifts (more White Glove, less Ground?)

Happy to lock in dedicated capacity now if useful. No pressure — just want to be ready.

Best,
Kiran` } },
    { id: 'g8', tone: 'blue',  account: 'SGK Industries',    title: 'Contract renewal in 45 days',              detail: 'Win rate 78%, relationship healthy', ref: null, kind: 'proactive',
      draft: { to: 'Tom Lin (tom@sgk.com)', subject: 'Annual contract — let\'s lock in next year',
        body: `Hi Tom,

Your annual agreement is up in 45 days and the year has been strong on both sides: 78% win rate, fastest response time in our portfolio, zero issues across 22 quotes.

I'd love to extend a multi-year option with locked-in rates and the lane expansions we discussed last quarter. Happy to put something together this week and walk you through it.

When works for a 30-min call?

Best,
Kiran` } },
  ],

  // === PERFORMANCE — rep's scorecard ===
  performanceSummary:
    "Revenue down 14% vs last quarter. Win rate dropped from 64% to 58%. Quote volume is stable but you're converting less. Primary factor: response time on Baltimore accounts averaging 12h+.",
  perf: {
    revenue:      { v: '$1.2M', vs: 'vs $1.4M last quarter', chg: '−14%', chgPos: false,
                    spark: { months: ['Nov','Dec','Jan','Feb','Mar','Apr'], values: [240, 220, 260, 230, 240, 210] } },
    customers:    { active: 34, newQ: 2, lost: 1 },
    quoteVolume:  { v: '323 quotes', vs: 'vs 358 last quarter', chg: '−10%', chgPos: false,
                    spark: { months: ['Nov','Dec','Jan','Feb','Mar','Apr'], values: [52, 48, 58, 54, 62, 53] } },
    winRate:      { v: '58%', vs: 'vs 64% last quarter', chg: '−6 pts', chgPos: false },
    responseBuckets: [
      { x: '<2h',    win: 72, count: 84,  hl: true  },
      { x: '2-6h',   win: 58, count: 112, hl: false },
      { x: '6-12h',  win: 41, count: 67,  hl: false },
      { x: '12-24h', win: 29, count: 38,  hl: false },
      { x: '24h+',   win: 14, count: 22,  hl: false },
    ],
  },

  // === RISK ===
  riskSummary:
    'Top 3 customers represent 62% of your revenue. Encore Global is flagged Needs Attention with competitor activity. 3 customers declining in frequency. $18K in pipeline sitting in quotes older than 14 days.',
  revenueConcentration: [
    { name: 'SGK Industries',  v: 340 },
    { name: 'Nova Dynamics',   v: 276 },
    { name: 'Acme Corp',       v: 210 },
    { name: 'Encore Global',   v: 142 },
    { name: 'Meridian Events', v: 94  },
  ],
  declining: [
    { name: 'Encore Global',    q: '4 vs 5',  r: '$142K vs $161K' },
    { name: 'Westfield Inc',    q: '0 vs 2',  r: '$31K vs $48K'   },
    { name: 'Crestline Supply', q: '1 vs 3',  r: '$52K vs $67K'   },
  ],
  customerHealth: [
    { tone: 'g', lab: 'Active', v: 24, ctx: 'quoted ≤14d' },
    { tone: 'a', lab: 'Quiet',  v: 7,  ctx: '14-30d'      },
    { tone: 'r', lab: 'Silent', v: 3,  ctx: '30d+'        },
  ],
  staleQuotes: { count: '9', context: 'quotes with no activity 7+ days', total: '$64K total value', breakdown: '3 are 14+ days old ($18K)' },
  unanswered:  { count: '7', context: 'unanswered emails this week', under24: '2 under 24h', mid: '2 at 24-48h', over48: '3 over 48h' },

  // === OPPORTUNITY ===
  opportunitySummary:
    'SGK Industries expanding into new lanes with medical equipment. 3 Ground-only customers showing upsell signals for White Glove. DFW→ATL is your strongest lane at 82% driven by fast response.',
  growing: [
    { name: 'SGK Industries', q: '22 vs 16', r: '$340K vs $280K',
      insight: "Started quoting 2 new lanes (SFO→JFK, DFW→MIA) they've never used before. Brian Kim asking about packaging requirements for fragile medical equipment. This is a new cargo type for this account. Previously only shipped industrial components." },
    { name: 'Nova Dynamics',  q: '18 vs 12', r: '$276K vs $210K',
      insight: 'COO Dana Park entered 3 email threads this quarter. Previously only Chris Lee (Supply Chain) was involved. Average quote value increased from $8K to $14K. Account shifting from transactional to strategic.' },
  ],
  upsellSignals: [
    { name: 'Encore Global',
      current:    'Ground service for electronics shipments',
      signal:     '2 damage conversations this quarter on shipments valued at $15K+. Customer expressed frustration about cargo handling.',
      opportunity:"White Glove addresses cargo damage risk. iCat's White Glove win rate: 71%." },
    { name: 'Pacific Logistics',
      current:    'Ground for event equipment',
      signal:     'Sarah asked about installation and setup services in recent email thread. Currently arranging installation separately.',
      opportunity:"iCat offers White Glove with installation. Customer doesn't know this." },
    { name: 'SGK Industries',
      current:    'Ground + Expedited only',
      signal:     "Brian Kim asked about special handling for fragile medical equipment. Current Ground service doesn't include handling guarantees.",
      opportunity:'White Glove for medical equipment lanes. Already quoting new lanes where this applies.' },
  ],
  laneIntel: {
    strong: [
      { lane: 'DFW→ATL', win: 82, quotes: 18,
        insight: 'Fastest response time (3.2h avg). Pricing competitive. James handles 16 of 18 quotes.' },
      { lane: 'MKE→ORD', win: 71, quotes: 12,
        insight: 'Consistent performer. No competitor pressure detected in any email.' },
    ],
    weak: [
      { lane: 'ORD→LAX', win: 38, quotes: 28,
        insight: '7 of 11 losses cited price. Competitor approximately 12-15% cheaper on this lane. Agent C handled 4 of the 11 losses.' },
      { lane: 'DFW→MIA', win: 52, quotes: 8,
        insight: '3 losses from no follow-up. Average Ops response on this lane: 9 hours. Fixable with faster response.' },
    ],
  },

  // === AGENTS ===
  agentsNarratives: {
    today:   'Agent C has 3 unanswered customer emails, the oldest is 48 hours. James is handling 22 active quotes with zero issues. All other agents are current.',
    week:    'Follow-up rate dropped to 71% this week from 82% last week. Agent C and Diana S. account for 6 of the 8 missed follow-ups. Average response time across your agents is 6.2h, up from 5.4h last week.',
    month:   'Agent C is underperforming across all metrics: 14.2h avg response, 38% win rate, 3 unanswered emails. This is impacting Westfield and Crestline. James handles 53% of your portfolio and his response time is creeping up from 3.2h to 4.1h, suggesting capacity strain.',
    quarter: 'Your portfolio lost approximately $15K in recoverable revenue due to Ops response delays over 12 hours. 8 of 11 delayed quotes were handled by Agent C or Diana S. at Baltimore station. DFW is your strongest station at 67% conversion. Baltimore is weakest at 41%.',
  },
  topPerformers: [
    { name: 'Sam P.',   station: 'Chicago', stats: '3.8h response · 78% win rate · 5 accounts · 0 issues',
      note: 'Fastest response time and highest conversion in your portfolio' },
    { name: 'Maria T.', station: 'NYC',     stats: '5.3h response · 71% win rate · 8 accounts · 1 issue',
      note: 'Consistent performer, handles complex NYC accounts well' },
    { name: 'James R.', station: 'DFW',     stats: '4.1h response · 68% win rate · 18 accounts · 0 issues',
      note: 'Carries the largest book but response time trending up slightly' },
  ],
  lowPerformers: [
    { name: 'Agent C',  station: 'Baltimore', resp: '14.2h', win: '38%', accounts: 3, issues: 3,
      insight: "Consistently delays first response by 2-3 days, then sends incomplete replies that don't address all customer questions. On Q-0841, customer explicitly cited slow response as reason for choosing competitor. On Q-0910, 2-day delay gave competitor time to close first. 2 of 3 accounts are flagged Needs Attention." },
    { name: 'Diana S.', station: 'Baltimore', resp: '7.8h',  win: '52%', accounts: 2, issues: 1,
      insight: 'Response time acceptable but follow-up rate is 76%, lowest in your portfolio. Tends to send initial quote but doesn\'t follow up when customer goes quiet. 1 unanswered question currently pending.' },
  ],
  stations: [
    { name: 'DFW',       agents: 3, resp: '4.6h',  win: '67%', weak: false },
    { name: 'NYC',       agents: 2, resp: '5.0h',  win: '72%', weak: false },
    { name: 'Chicago',   agents: 2, resp: '4.8h',  win: '71%', weak: false },
    { name: 'Baltimore', agents: 2, resp: '11.0h', win: '41%', weak: true  },
  ],
};

// === Account-scope intel (Encore Global) ===
const ACCOUNT_INTEL = {
  scope: 'account',
  // Actions
  actions: [
    { id: 'ea1', tone: 'red',   title: "Respond to Mike's price counter on Q-1042", detail: '$18K · 3 days, no Ops reply',         ref: 'Q-1042', kind: 'reactive',
      draft: { to: 'Mike Rivera (mike@encoreglobal.com)', subject: 'Re: Q-1042 pricing',
        body: `Hi Mike,

Thanks for getting back to us on the ORD to LAX White Glove quote. I understand pricing is a key consideration.

Given the high-value electronics, our dedicated handling, and real-time tracking, I can offer a 5% adjustment to $17,290. With the Q4 renewal discussion ahead, this reflects our commitment to the partnership.

Happy to discuss further.

Best,
Kiran` } },
    { id: 'ea2', tone: 'red',   title: "Answer Sarah's insurance Q on Q-1038",      detail: 'Asked twice, never answered',          ref: 'Q-1038', kind: 'reactive',
      draft: { to: 'Sarah Chen (sarah@encoreglobal.com)', subject: 'Re: Insurance coverage on Q-1038',
        body: `Hi Sarah,

Apologies for the delay. Our standard cargo insurance for ORD→SFO White Glove covers replacement value up to $250K with no deductible. End-to-end during dedicated handling and climate-controlled storage.

Sending the full policy sheet now.

Best,
Kiran` } },
    { id: 'ea3', tone: 'amber', title: 'Follow up on Q-0895',                       detail: 'Sent 14 days ago, no follow-up from Ops', ref: 'Q-0895', kind: 'reactive',
      draft: { to: 'Sarah Chen (sarah@encoreglobal.com)', subject: 'Following up on Q-0895',
        body: `Hi Sarah,

Wanted to follow up on Q-0895. It's been a couple weeks — is this lane still active for you, or should we set it aside? Happy to refresh the rates if timing has shifted.

Best,
Kiran` } },
    // Proactive
    { id: 'ea4', tone: 'amber', title: 'Q4 volume spike in 6 weeks',                detail: 'Historical pattern: 2x quote volume Oct-Nov', ref: null, kind: 'proactive',
      draft: { to: 'Sarah Chen (sarah@encoreglobal.com)', subject: 'Q4 capacity planning',
        body: `Hi Sarah,

Looking at Q4: based on the last two years, your quote volume typically doubles in Oct/Nov for the holiday events push. Want to get ahead on our side.

A few things would help me plan:
- Estimated lane mix (ORD→LAX, ORD→SEA, anything new?)
- Approximate volume vs last Q4
- Any service shifts (more White Glove, less Ground?)

Happy to lock in dedicated capacity now if useful.

Best,
Kiran` } },
    { id: 'ea5', tone: 'blue',  title: 'Renewal conversation opportunity',          detail: 'Sarah open to 3-year contract. Q4 timing.',  ref: null, kind: 'proactive',
      draft: { to: 'Sarah Chen (sarah@encoreglobal.com)', subject: 'Q4 renewal conversation',
        body: `Hi Sarah,

You mentioned being open to a 3-year arrangement when we last spoke. With Q4 around the corner and the year you've had with us, I'd love to put a proposal together this month.

Locked-in rates, dedicated capacity for the Oct/Nov spike, and the Seattle lane expansion you mentioned.

When works for a 30-min call in the next two weeks?

Best,
Kiran` } },
  ],

  // Health
  healthSummary:
    'Relationship stable but pricing friction increasing. Quote frequency slightly down. Win rate dropped from 70% to 62%. Ops response time on this account is 8.2h, above your portfolio average of 6.2h.',
  behavioral: [
    { lab: 'Quote frequency',  v: '4 this qtr vs 5 last',    trend: 'down'   },
    { lab: 'Customer response', v: '1.2 days avg',            trend: 'flat'   },
    { lab: 'Active contacts',  v: '3 people',                 trend: 'up'     },
    { lab: 'Last activity',    v: '2 days ago',               trend: null     },
  ],
  operational: [
    { lab: 'Win rate',       v: '62% vs 70% last qtr',         trend: 'down' },
    { lab: 'Avg quote value', v: '$12.4K',                     trend: 'flat' },
    { lab: 'Revenue',        v: '$142K vs $161K last',          trend: 'down' },
    { lab: 'Services used',  v: '3 of 5',                       trend: null   },
    { lab: 'Lost reasons',   v: 'Price (2), No follow-up (1)',  trend: null   },
  ],
  riskFlags: [
    { text: 'Competitor mentioned on Q-1042 by Mike Rivera',                       ref: 'Q-1042' },
    { text: 'New contact Linda Park (VP Ops) appeared. May indicate executive review.', ref: null },
    { text: 'Quote frequency declining 2 consecutive quarters',                    ref: null },
  ],

  // Contacts
  contacts: [
    { id: 'ec1', tone: 'green', name: 'Sarah Chen',  role: 'Logistics Coordinator', freq: '80% of emails',
      pattern: 'Primary requester. Warm tone. Responds same day. Handles all Ground and White Glove quotes.' },
    { id: 'ec2', tone: 'amber', name: 'Mike Rivera', role: 'Procurement Director',  freq: 'Enters on quotes over $15K',
      pattern: 'Price-focused. Counters on every large quote. Mentioned competitor on Q-1042. When Mike is involved, deals close at lower margin but higher volume.' },
    { id: 'ec3', tone: 'grey',  name: 'Linda Park',  role: 'VP Operations',         freq: 'New — appeared in 1 thread',
      pattern: 'First appeared on Q-1042 this month. VP-level involvement often signals vendor review or strategic evaluation.' },
  ],

  // Analysis
  aspects: [
    { id: 'asp1', name: 'Pricing',         mentions: 8, pctNegative: 62, sentiment: 'neg', delta: { dir: 'up',   text: 'from 40% last month' },
      pattern: [
        '<strong>Market:</strong> Pricing complaints across multiple agents and carriers. Not concentrated on any single agent. Market-driven.',
        '<strong>Lane:</strong> ORD→LAX accounts for 50% of pricing complaints. Competitor consistently ~12-15% cheaper on this lane.',
        '<strong>Positive:</strong> SFO→JFK pricing accepted without pushback. Competitive lane.',
      ] },
    { id: 'asp2', name: 'Cargo handling',  mentions: 4, pctNegative: 50, sentiment: 'neg', delta: { dir: 'flat', text: 'stable' },
      pattern: [
        '<strong>Carrier:</strong> Both negative mentions involve XYZ Trucking. Both positive involve ABC Freight. Issue is carrier-driven, not agent-driven.',
        '<strong>Lane:</strong> Damage on LAX→ORD and ORD→SEA with XYZ Trucking.',
        '<strong>Agent:</strong> All handled by James R. Agent is NOT the issue.',
      ] },
    { id: 'asp3', name: 'Timing',          mentions: 3, pctNegative: 0,  sentiment: 'pos', delta: { dir: 'flat', text: 'stable' }, pattern: null },
    { id: 'asp4', name: 'Communication',   mentions: 4, pctNegative: 75, sentiment: 'neg', delta: { dir: 'new',  text: 'NEW this month' },
      pattern: [
        '<strong>Agent:</strong> 2 of 3 negative mentions from James R. (unusual, normally strong communicator). 1 from Agent C (consistent with pattern).',
        '<strong>Recent trend:</strong> James\'s communication complaints are NEW this quarter. Previously zero. May indicate capacity overload (quote volume up 37%).',
        '<strong>Agent C:</strong> Consistent poor communication across all accounts.',
      ] },
    { id: 'asp5', name: 'Carrier reliability', mentions: 3, pctNegative: 67, sentiment: 'neg', delta: { dir: 'flat', text: 'stable' },
      pattern: [
        '<strong>Carrier:</strong> XYZ Trucking involved in both late deliveries. ABC Freight on-time. Carrier-driven issue.',
        '<strong>Lane:</strong> ORD→LAX and ORD→SEA affected with XYZ Trucking.',
        '<strong>Action:</strong> Review carrier assignment on these lanes.',
      ] },
  ],
  evidence: {
    asp1: [
      { date: 'May 15', quote: 'Q-1042', person: 'Mike Rivera', tone: 'red', quoteText: "$18,200 rate is higher than what we're seeing",
        agent: 'James R.', carrier: 'XYZ Trucking', lane: 'ORD→LAX' },
      { date: 'May 15', quote: 'Q-1042', person: 'Mike Rivera', tone: 'red', quoteText: "We'd need this to come down by about 10%",
        agent: 'James R.', lane: 'ORD→LAX' },
      { date: 'May 10', quote: 'Q-1038', person: 'Sarah Chen',  tone: 'red', quoteText: 'Can you match the rate from our other provider',
        agent: 'James R.', lane: 'MKE→ORD' },
      { date: 'Apr 22', quote: 'Q-0910', person: 'Mike Rivera', tone: 'red', quoteText: 'We went with a more competitive option',
        agent: 'Agent C', lane: 'ORD→LAX' },
      { date: 'Apr 18', quote: 'Q-0952', person: 'Sarah Chen',  tone: 'green', quoteText: 'That price works for us',
        agent: 'James R.', lane: 'SFO→JFK' },
    ],
    asp2: [
      { date: 'May 8',  quote: 'Q-0987', person: 'Sarah Chen', tone: 'red',   quoteText: 'The shipment arrived with visible damage to two units',
        carrier: 'XYZ Trucking', lane: 'LAX→ORD', agent: 'James R.' },
      { date: 'Apr 18', quote: 'Q-0880', person: 'Sarah Chen', tone: 'red',   quoteText: 'We had damage again on this lane. This is the second time',
        carrier: 'XYZ Trucking', lane: 'ORD→SEA', agent: 'James R.' },
      { date: 'May 2',  quote: 'Q-0952', person: 'Sarah Chen', tone: 'green', quoteText: 'Shipment arrived in perfect condition. Thank you',
        carrier: 'ABC Freight', lane: 'ORD→LAX', agent: 'James R.' },
      { date: 'Apr 28', quote: 'Q-0931', person: 'Sarah Chen', tone: 'green', quoteText: 'No issues with the delivery',
        carrier: 'ABC Freight', lane: 'SFO→JFK', agent: 'James R.' },
    ],
    asp3: [
      { date: 'May 13', quote: 'Q-1055', person: 'Sarah Chen', tone: 'green', quoteText: 'Thursday pickup confirmed, perfect timing',
        agent: 'James R.', lane: 'MKE→ORD' },
    ],
    asp4: [
      { date: 'May 15', quote: 'Q-1042', person: 'Mike Rivera', tone: 'red', quoteText: 'Can you take another look and get back to us?',
        agent: 'James R.', lane: 'ORD→LAX', delay: '3 days no response' },
      { date: 'May 14', quote: 'Q-1038', person: 'Sarah Chen', tone: 'red',  quoteText: "I asked about insurance coverage but haven't heard back",
        agent: 'James R.', lane: 'MKE→ORD', delay: '4 days no response' },
      { date: 'Mar 28', quote: 'Q-0841', person: 'Tom Reid',   tone: 'red',  quoteText: "Your response took too long. We've already booked elsewhere",
        agent: 'Agent C', lane: 'ORD→DFW', delay: 'Responded after 3 days' },
      { date: 'Mar 15', quote: 'Q-0895', person: 'Sarah Chen', tone: 'green', quoteText: 'Thanks for the quick turnaround on this',
        agent: 'James R.', lane: 'DFW→MIA', delay: 'Responded in 2 hours' },
    ],
    asp5: [
      { date: 'Apr 22', quote: 'Q-0910', person: 'Mike Rivera', tone: 'red',   quoteText: 'The delivery was two days late',
        carrier: 'XYZ Trucking', lane: 'ORD→LAX', agent: 'Agent C' },
      { date: 'Apr 18', quote: 'Q-0880', person: 'Sarah Chen',  tone: 'amber', quoteText: 'Arrived one day late but we were notified',
        carrier: 'XYZ Trucking', lane: 'ORD→SEA', agent: 'James R.' },
      { date: 'May 8',  quote: 'Q-0987', person: 'Sarah Chen',  tone: 'green', quoteText: 'Delivered right on schedule',
        carrier: 'ABC Freight', lane: 'LAX→ORD', agent: 'James R.' },
    ],
  },
  openQuestions: [
    { quote: 'Q-1038', person: 'Sarah Chen',  date: 'May 14', text: 'What cargo insurance coverage do you provide for electronics?',
      pending: 'Unanswered for 4 days', repeat: 'Also asked on Q-0952 (never answered)' },
    { quote: 'Q-1042', person: 'Mike Rivera', date: 'May 15', text: 'Is there a volume discount if we commit to 10+ shipments per month?',
      pending: 'Unanswered for 3 days', repeat: null },
  ],
  openPromises: [
    { person: 'James R.', quote: 'Q-1042', date: 'May 12', text: "I'll send you revised rate options by end of day Tuesday",
      due: 'May 13', overdue: 'Overdue by 5 days' },
  ],

  // Notes
  notes: [
    { when: 'Today',  txt: "Spoke with Sarah about Q4 renewal. She's open to a 3-year contract. Need to keep service levels high to close this." },
    { when: 'May 8',  txt: "Mike always counters on price. Don't take it personally. It's his procurement process. The deal usually closes after the second counter." },
    { when: 'Apr 20', txt: 'Encore is expanding their Seattle events division. Potential new lanes: SFO and SEA origins. Ask Sarah about it next call.' },
  ],

  // Health charts
  winRateTrend: {
    months: ['Dec','Jan','Feb','Mar','Apr','May'],
    values: [70, 68, 66, 64, 60, 62],
    current: '62%',
    direction: 'red',
  },
  revenueTrend: {
    months: ['Dec','Jan','Feb','Mar','Apr','May'],
    values: [161, 155, 148, 152, 145, 142],
    current: '$142K',
    direction: 'red',
  },
  quoteVolumeTrend: {
    months: ['Dec','Jan','Feb','Mar','Apr','May'],
    values: [6, 5, 5, 6, 4, 4],
    current: '4',
  },
  servicesUsed: [
    { name: 'White Glove', q: 8, win: 71 },
    { name: 'Ground',      q: 5, win: 52 },
    { name: 'Expedited',   q: 3, win: 65 },
  ],
  topLanes: [
    { name: 'ORD→LAX', q: 4, win: 50 },
    { name: 'MKE→ORD', q: 3, win: 67 },
    { name: 'SFO→JFK', q: 2, win: 100 },
  ],
  negotiationPattern:
    'Mike enters on quotes over $15K and always counters. Deals typically close after the second counter. Average discount from first quote to accepted price: 4-6%.',

  // Agents (account-level) — table view
  accountAgents: [
    {
      id: 'aja',
      name: 'James R.', station: 'DFW', primary: true,
      sentimentDot: 'green', sentimentWord: 'Warm',
      winRate: 71, avgResponseH: 4.1, quotes: 14,
      tipTitle: 'Customer sentiment: Warm',
      tipBody: 'Sarah directs most quote requests to James by name. Uses casual greetings and adds shipment context proactively. Response time consistent at 4h. 14 quotes handled: 5 won, 2 lost, 7 open. Customer is comfortable and collaborative in these threads.',
      comparable: 'Same lane (ORD→LAX White Glove). James 71%. Next best: Maria T. 65%. James is the top performer for this customer\'s primary lane.',
    },
    {
      id: 'ajc',
      name: 'Agent C', station: 'Baltimore', primary: false,
      sentimentDot: 'red',   sentimentWord: 'Transactional',
      winRate: 0,  avgResponseH: 14.2, quotes: 2,
      tipTitle: 'Customer sentiment: Transactional',
      tipBody: "Both quotes handled by Agent C were lost. Q-0910: 2-day response delay gave competitor time to close first. Q-0841: customer explicitly cited slow response as reason for going elsewhere. Customer tone in Agent C's threads is noticeably shorter. Sarah did not use casual greetings and responses were minimal compared to threads with James.",
      comparable: 'Same lane (ORD→LAX Ground) handled by James R. at 55% win rate vs Agent C 0%. Response time: James 4.1h vs Agent C 14.2h.',
    },
    {
      id: 'ajm',
      name: 'Maria T.', station: 'NYC', primary: false,
      sentimentDot: 'green', sentimentWord: 'Professional',
      winRate: 68, avgResponseH: 5.2, quotes: 6,
      tipTitle: 'Customer sentiment: Professional',
      tipBody: 'Handles 6 quotes on NYC-origin lanes. Customer communication is business-appropriate and responsive. No issues detected. 4 won, 1 lost, 1 open.',
      comparable: 'Same lane (ORD→LAX White Glove). Maria 65% vs James 71%. James leads on this customer\'s primary lane.',
    },
    {
      id: 'ajs',
      name: 'Sam P.', station: 'Chicago', primary: false,
      sentimentDot: 'grey',  sentimentWord: 'Neutral',
      winRate: 75, avgResponseH: 3.8, quotes: 3,
      tipTitle: 'Customer sentiment: Neutral',
      tipBody: 'Only 3 quotes handled, all Chicago-origin. Standard business communication. Fastest response time. 2 won, 0 lost, 1 open. Insufficient email volume to assess sentiment pattern.',
      comparable: 'Only handles Chicago-origin lanes. No comparable data for this customer\'s primary ORD→LAX lane.',
    },
    {
      id: 'ajd',
      name: 'Diana S.', station: 'Baltimore', primary: false,
      sentimentDot: 'red',   sentimentWord: 'Curt',
      winRate: 50, avgResponseH: 7.8, quotes: 2,
      tipTitle: 'Customer sentiment: Curt',
      tipBody: '2 quotes handled. Customer responses to Diana are significantly shorter than average. One-word confirmations instead of the detailed replies Sarah sends to James. Follow-up rate 0%: quote sent but no follow-up when customer went quiet. 1 won, 1 lost.',
      comparable: 'Same lane (ORD→LAX Ground). Diana 50% vs James 55%. Below James but above Agent C (0%).',
    },
  ],
};

window.GLOBAL_INTEL  = GLOBAL_INTEL;
window.ACCOUNT_INTEL = ACCOUNT_INTEL;
