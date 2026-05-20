// Quote Detail — Q-1042 (ORD→LAX White Glove, Encore Global)
// Three primary tabs: Quote Details / Thread / Intelligence

const QUOTE_DETAIL = {
  id: 'Q-1042',
  account: 'Encore Global',
  origin: 'ORD', destination: 'LAX',
  originCity: 'Chicago, IL', destCity: 'Los Angeles',
  status: 'open',
  service: 'White Glove',
  amount: 18200,
  mode: 'Ground',
  carrier: 'XYZ Trucking',
  weight: '1,200 lb',
  commodity: 'Electronics',
  created: 'May 12',
  expires: 'May 22',
  lastUpdated: '2 days ago',
  opsAgent: 'James R.',
  station: 'DFW',
  source: 'Email thread',

  // Sentiment per email
  sentimentPoints: [
    { id: 'E1', v: 0.7,  tone: 'pos', who: 'Sarah Chen',  date: 'May 12, 10:20 AM', summary: 'Initial request, warm tone' },
    { id: 'E2', v: 0.55, tone: 'pos', who: 'James R.',    date: 'May 12, 4:15 PM',  summary: 'Quote sent, professional' },
    { id: 'E3', v: -0.7, tone: 'neg', who: 'Mike Rivera', date: 'May 15, 2:30 PM',  summary: 'Counter-offer with competitor mention' },
  ],
  likelihood: 35,
  likelihoodTooltip:
    'Response delay: 3 days (22% historical conversion). Counter-offer present (positive: customer engaged). White Glove >$15K converts 55% same-day. Winning range on this lane: $15.6K–$19.8K. Customer ask ($16.4K) within range. Weighted: 35%.',
  nextAction: 'Respond to price counter-offer. 3 days overdue. Quote expires in 4 days.',

  aiSummary:
    'Sarah requested White Glove quote for electronics ORD to LAX on May 12. James quoted $18,200 same day. Mike Rivera (Procurement) entered the thread May 15 with a 10% counter-offer, mentioning a competing rate. James has not responded. Quote expires May 22 (4 days). Ball is in iCat\'s court.',
  draftReply:
`Hi Mike,

Thank you for getting back to us on the ORD to LAX White Glove quote. I understand pricing is a key consideration.

Given the high-value electronics and our dedicated handling with real-time tracking, I can offer a 5% adjustment to $17,290. This reflects our commitment to the partnership, especially with the Q4 renewal discussion ahead.

Happy to discuss further.

Best,
James`,

  statusSteps: [
    { id: 'requested',   label: 'Requested',   state: 'done'   },
    { id: 'quoted',      label: 'Quoted',      state: 'done'   },
    { id: 'negotiating', label: 'Negotiating', state: 'active' },
    { id: 'booked',      label: 'Booked',      state: 'pending'},
    { id: 'delivered',   label: 'Delivered',   state: 'pending'},
  ],

  intelligenceActions: [
    { tone: 'red',   title: 'Respond to price counter-offer',
      ctx: '3 days overdue. Mike asked for 10% off ($16,380). Quote expires May 22. Customer ask is within historical winning range ($15.6K-$19.8K).',
      link: 'Draft Reply →' },
    { tone: 'red',   title: 'Answer volume discount question',
      ctx: 'Mike asked about discount for 10+ shipments/month. Unanswered 3 days.',
      link: 'Draft Reply →' },
    { tone: 'amber', title: 'Acknowledge competitor concern',
      ctx: 'Mike mentioned competing offer. Ignoring it signals indifference. Address value proposition without naming competitor.',
      link: null },
  ],

  laneHistory: [
    { id: 'Q-0880', date: 'Apr 1',  amount: '$19,800', result: 'WON',          response: '3h',   agent: 'James R.', bad: false },
    { id: 'Q-0952', date: 'Apr 20', amount: '$15,600', result: 'WON',          response: '4h',   agent: 'James R.', bad: false },
    { id: 'Q-0910', date: 'Apr 10', amount: '$8,400',  result: 'LOST (price)', response: '48h',  agent: 'Agent C',  bad: true  },
    { id: 'Q-1042', date: 'May 12', amount: '$18,200', result: 'OPEN',         response: '72h+', agent: 'James R.', bad: true  },
  ],

  customer: {
    since: 'March 2024',
    quotes12: 16,
    winRate: '62%',
    winRatePrev: 'was 70%',
    revenue: '$142K',
    revenuePrev: 'was $161K',
    services: [
      { name: 'White Glove', q: 8, win: '71%' },
      { name: 'Ground',      q: 5, win: '52%' },
      { name: 'Expedited',   q: 3, win: '65%' },
    ],
    lanes: [
      { name: 'ORD→LAX', q: 4, win: '50%' },
      { name: 'MKE→ORD', q: 3, win: '67%' },
      { name: 'SFO→JFK', q: 2, win: '100%' },
    ],
    contacts: [
      'Sarah Chen — Logistics Coordinator (primary, 80% of emails)',
      'Mike Rivera — Procurement Director (enters on $15K+, price-focused)',
      'Linda Park — VP Operations (new, 1 thread)',
    ],
    negotiationPattern:
      'Mike enters on quotes over $15K and always counters. Deals typically close after the second counter. Average discount from first quote to accepted price: 4-6%.',
    notes: [
      { when: 'May 15', txt: 'Open to 3-year renewal in Q4.' },
      { when: 'May 8',  txt: "Mike always counters. It's his process." },
      { when: 'Apr 20', txt: 'Expanding Seattle events division. New lanes SFO, SEA.' },
    ],
  },

  signals: [
    { tone: 'red',   text: 'Price counter-offer',                              when: 'May 15' },
    { tone: 'red',   text: 'Competitor mentioned',                             when: 'May 15' },
    { tone: 'amber', text: 'Question: volume discount options (unanswered)',   when: 'May 15' },
    { tone: 'amber', text: 'Question: can you relook pricing (unanswered)',    when: 'May 15' },
    { tone: 'grey',  text: 'Quote sent',                                       when: 'May 12' },
    { tone: 'grey',  text: 'Quote requested',                                  when: 'May 12' },
  ],

  contacts: [
    { name: 'Sarah Chen',  role: 'Logistics Coordinator', tagline: 'Initiated request',
      tone: 'Warm, collaborative', emails: '1 email (Email 1)', newSpeaker: false,
      desc: 'Primary requester. Casual greetings. Provides cargo details proactively.' },
    { name: 'Mike Rivera', role: 'Procurement Director', tagline: 'Entered May 15',
      tone: 'Direct, transactional', emails: '1 email (Email 3)', newSpeaker: true,
      newSpeakerNote: 'First appearance — was not on original request',
      desc: 'Counter-offered on price. Mentioned competitor. Focus exclusively on pricing. His entry signals procurement involvement.' },
  ],

  emails: [
    {
      id: 'e3', side: 'customer', sentiment: 'red', newSpeaker: true,
      from: 'Mike Rivera', role: 'Procurement Director',
      when: 'May 15, 2:30 PM',
      body:
`Hi James,

Thanks for the quote on the ORD to LAX White Glove shipment. We've reviewed internally and the $18,200 rate is higher than what we're currently seeing for similar services on this lane.

We'd need to see this come down by about 10% to move forward. We have a competing offer that's in that range.

Can you take another look at the pricing and get back to us?

Mike Rivera
Director of Procurement
Encore Global`,
      tags: [
        { tone: 'red',   text: 'Pricing' },
        { tone: 'red',   text: 'Competitor' },
        { tone: 'amber', text: 'Question' },
      ],
    },
    {
      id: 'e2', side: 'icat', sentiment: 'green',
      from: 'James R.', role: 'DFW Station',
      when: 'May 12, 4:15 PM',
      body:
`Hi Sarah, Mike,

Please find attached our quote for White Glove service, Chicago (ORD) to Los Angeles (LAX).

Quote: Q-1042
Service: White Glove
Rate: $18,200
Includes: Dedicated handling, real-time tracking, climate-controlled transport
Estimated transit: 4-5 business days
Valid through: May 22, 2026

Let me know if you have any questions or would like to proceed.

Best,
James R.
iCat Logistics — DFW Station`,
      tags: [
        { tone: 'grey', text: 'Quote sent' },
        { tone: 'grey', text: 'Pricing · neutral' },
      ],
    },
    {
      id: 'e1', side: 'customer', sentiment: 'green',
      from: 'Sarah Chen', role: 'Logistics Coordinator',
      when: 'May 12, 10:20 AM',
      body:
`Hi James,

We need to move a shipment of electronics from our Chicago warehouse to Los Angeles. High-value items, approximately 1,200 lbs. Would need White Glove service.

Can you send over a quote when you get a chance? We're looking to ship within the next two weeks.

Thanks!
Sarah`,
      tags: [
        { tone: 'grey',  text: 'Quote request' },
        { tone: 'green', text: 'Cargo handling · positive' },
        { tone: 'green', text: 'Timing · positive' },
      ],
    },
  ],

  activityLog: [
    { when: 'May 12, 10:20 AM', txt: 'Quote requested by Sarah Chen via email' },
    { when: 'May 12, 10:45 AM', txt: 'Quote created in WorldTrak by James R.' },
    { when: 'May 12, 4:15 PM',  txt: 'Quote sent to customer via email' },
    { when: 'May 15, 2:30 PM',  txt: 'Customer responded with counter-offer' },
    { when: 'May 15, 2:30 PM',  txt: 'New speaker detected: Mike Rivera (Procurement)' },
    { when: 'May 18',           txt: 'No Ops response (3 days overdue)' },
  ],

  threadAspects: [
    {
      id: 'pricing', name: 'Pricing', sentiment: 'neg', sentimentLabel: 'Negative', count: 3,
      delta: { dir: 'up', text: 'from 40% last month' },
      mentions: [
        { date: 'May 15', quote: 'Q-1042', person: 'Mike Rivera', tone: 'red',
          quoteText: '$18,200 rate is higher than what we\'re currently seeing' },
        { date: 'May 15', quote: 'Q-1042', person: 'Mike Rivera', tone: 'red',
          quoteText: "We'd need to see this come down by about 10%" },
        { date: 'May 12', quote: 'Q-1042', person: 'James R.', tone: 'grey',
          quoteText: 'Rate: $18,200', note: 'stated, no sentiment' },
      ],
    },
    {
      id: 'competitor', name: 'Competitor', sentiment: 'neg', sentimentLabel: 'Mentioned', count: 1,
      delta: { dir: 'new', text: 'NEW this month' },
      mentions: [
        { date: 'May 15', quote: 'Q-1042', person: 'Mike Rivera', tone: 'red',
          quoteText: "We have a competing offer that's in that range" },
      ],
    },
    {
      id: 'timing', name: 'Timing', sentiment: 'pos', sentimentLabel: 'Positive', count: 2,
      delta: { dir: 'flat', text: 'stable' },
      mentions: [
        { date: 'May 12', quote: 'Q-1042', person: 'Sarah Chen', tone: 'green',
          quoteText: 'Looking to ship within the next two weeks' },
        { date: 'May 12', quote: 'Q-1042', person: 'James R.', tone: 'grey',
          quoteText: 'Estimated transit: 4-5 business days' },
      ],
    },
    {
      id: 'service', name: 'Service quality', sentiment: 'pos', sentimentLabel: 'Positive', count: 2,
      delta: { dir: 'flat', text: 'stable' },
      mentions: [
        { date: 'May 12', quote: 'Q-1042', person: 'Sarah Chen', tone: 'green',
          quoteText: 'Would need White Glove service' },
        { date: 'May 12', quote: 'Q-1042', person: 'James R.', tone: 'green',
          quoteText: 'Dedicated handling, real-time tracking' },
        { date: 'May 15', quote: 'Q-1042', person: null, tone: null, absent: true,
          quoteText: 'Email 3 — Not mentioned',
          note: 'Mike did not dispute service quality. Only pricing.' },
      ],
    },
    {
      id: 'cargo', name: 'Cargo handling', sentiment: 'pos', sentimentLabel: 'Positive', count: 1,
      delta: { dir: 'flat', text: 'stable' },
      mentions: [
        { date: 'May 12', quote: 'Q-1042', person: 'Sarah Chen', tone: 'green',
          quoteText: 'High-value items, approximately 1,200 lbs' },
      ],
    },
  ],
  threadSpeakers: [
    { side: 'customer', name: 'Sarah Chen',  role: 'Logistics Coordinator', emails: '1 email (E1)', tone: 'Warm',
      desc: 'Initiated request. Gave cargo details proactively. Used casual greeting.',
      newSpeaker: false },
    { side: 'customer', name: 'Mike Rivera', role: 'Procurement Director',  emails: '1 email (E3)', tone: 'Direct',
      desc: 'Entered at negotiation. Counter-offered. Mentioned competitor. Focused exclusively on pricing.',
      newSpeaker: true,
      newSpeakerNote: 'First appearance — was not on the original request' },
    { side: 'agent',    name: 'James R.',    role: 'DFW Station · iCat',    emails: '1 email (E2)', tone: 'Professional',
      desc: 'Quoted same day. Has not responded to counter (3 days overdue).',
      newSpeaker: false },
  ],
  threadUnanswered: [
    { kind: 'question', age: '3 days unanswered', speaker: 'Mike Rivera', email: 'Email 3', date: 'May 15',
      quote: 'Can you take another look at the pricing and get back to us?' },
    { kind: 'implied',  age: 'Not addressed',     speaker: 'Mike Rivera', email: 'Email 3', date: 'May 15',
      quote: "We'd need to see this come down by about 10% to move forward",
      note: 'Customer stated condition for proceeding. No response.' },
  ],
};

// ===== Charts and reusable bits =====

function QDStatusTracker({ steps }) {
  return (
    <div className="q-status">
      {steps.map(s => (
        <div key={s.id} className={`q-status__step ${s.state}`}>
          <div className="q-status__bar"><div className="fill" /></div>
          <div className="q-status__lbl">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function QDBigSentimentChart({ points }) {
  const [hover, setHover] = React.useState(null);
  const n = points.length;
  const W = 360, H = 160, padL = 38, padR = 14, padT = 14, padB = 32;
  const xs = (i) => padL + (i / (n - 1)) * (W - padL - padR);
  const ys = (v) => padT + ((1 - (v + 1) / 2)) * (H - padT - padB);
  const segs = [];
  for (let i = 0; i < n - 1; i++) {
    const a = points[i], b = points[i + 1];
    const cls = a.tone === b.tone ? a.tone : (b.v < 0 ? 'neg' : 'pos');
    segs.push({ d: `M ${xs(i)} ${ys(a.v)} L ${xs(i + 1)} ${ys(b.v)}`, cls });
  }
  return (
    <div style={{ position: 'relative' }}>
      <svg className="qd-big-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {/* y labels */}
        <text className="lbl-y" x="2" y={ys(0.9)}>POS</text>
        <text className="lbl-y" x="2" y={ys(-0.9) + 4}>NEG</text>
        <text className="lbl-y" x="2" y={ys(0) + 3} style={{ opacity: 0.5 }}>NEU</text>
        {/* mid line */}
        <line className="grid-mid" x1={padL} x2={W - padR} y1={ys(0)} y2={ys(0)} />
        {/* baseline */}
        <line className="axis" x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} />

        {segs.map((s, i) => <path key={i} className={`seg ${s.cls}`} d={s.d} />)}
        {points.map((p, i) => (
          <circle
            key={i}
            className={`dot ${p.tone}`}
            cx={xs(i)}
            cy={ys(p.v)}
            r={hover === i ? 5 : 3.6}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
        {points.map((p, i) => (
          <text key={i} className="lbl-x" x={xs(i)} y={H - padB + 16} textAnchor="middle">{p.id}</text>
        ))}
        {points.map((p, i) => (
          <text key={`s${i}`} className="lbl-x" x={xs(i)} y={H - padB + 28} textAnchor="middle"
                style={{ fontSize: 8.5, opacity: 0.7 }}>{p.who.split(' ')[0]}</text>
        ))}
      </svg>
      {hover != null && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: `${(xs(hover) / W) * 100}%`,
          transform: 'translateX(-50%) translateY(-4px)',
          background: '#181715',
          color: '#fff',
          borderRadius: 6,
          padding: '8px 10px',
          fontSize: 11.5,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
          boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        }}>
          <div style={{ fontWeight: 600 }}>{points[hover].who} · {points[hover].date}</div>
          <div style={{ opacity: 0.75, marginTop: 2 }}>{points[hover].summary}</div>
        </div>
      )}
    </div>
  );
}

// ===== Tab content components =====

function TabQuoteDetails({ q }) {
  return (
    <>
      <div className="qd-ref">
        <div className="qd-ref__title">Quote Reference</div>
        <div className="qd-ref__grid">
          <div className="kv"><div className="k">Quote ID</div><div className="v">{q.id}</div></div>
          <div className="kv"><div className="k">Amount</div><div className="v">${q.amount.toLocaleString()}</div></div>
          <div className="kv"><div className="k">Mode</div><div className="v">{q.mode}</div></div>
          <div className="kv"><div className="k">Carrier</div><div className="v">{q.carrier}</div></div>
          <div className="kv"><div className="k">Weight</div><div className="v">{q.weight}</div></div>
          <div className="kv"><div className="k">Commodity</div><div className="v">{q.commodity}</div></div>

          <div className="kv"><div className="k">Service</div><div className="v">{q.service}</div></div>
          <div className="kv"><div className="k">Pickup</div><div className="v">{q.originCity}</div></div>
          <div className="kv"><div className="k">Delivery</div><div className="v">{q.destCity}</div></div>
          <div className="kv"><div className="k">Created</div><div className="v">{q.created}</div></div>
          <div className="kv"><div className="k">Expires</div><div className="v">{q.expires}</div></div>
          <div className="kv"><div className="k">Last Updated</div><div className="v">{q.lastUpdated}</div></div>

          <div className="kv"><div className="k">Ops Agent</div><div className="v">{q.opsAgent}</div></div>
          <div className="kv"><div className="k">Station</div><div className="v">{q.station}</div></div>
          <div className="kv"><div className="k">Source</div><div className="v">{q.source}</div></div>
        </div>
      </div>

      <div className="qd-status-block">
        <div className="qd-status-block__title">Quote Status</div>
        <QDStatusTracker steps={q.statusSteps} />
      </div>

      <div className="qd-intel-row">
        <div className="qd-intel-col">
          <div className="qd-intel-col__title">Sentiment Trajectory</div>
          <QDBigSentimentChart points={q.sentimentPoints} />
        </div>
        <div className="qd-intel-col">
          <div className="qd-intel-col__title">Estimated Likelihood</div>
          <div className="qd-likely__v">
            {q.likelihood}%
            <span className="q-intel-info" role="button" tabIndex={0} style={{ position: 'relative' }}>i
              <span className="tip">{q.likelihoodTooltip}</span>
            </span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'Geist Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            chance of winning this quote
          </div>
        </div>
        <div className="qd-intel-col">
          <div className="qd-intel-col__title">Next Action</div>
          <div className="qd-nextaction">{q.nextAction}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12, fontFamily: 'Geist Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            See Intelligence tab for full action list
          </div>
        </div>
      </div>
    </>
  );
}

function TabThread({ q }) {
  const [sub, setSub] = React.useState('emails');
  const [summaryOpen, setSummaryOpen] = React.useState(false);
  const [draftOpen, setDraftOpen]     = React.useState(false);
  const [draftText, setDraftText]     = React.useState(q.draftReply);
  const [copied, setCopied]           = React.useState(false);

  const copyDraft = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(draftText).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="insights-head qd-subtabs">
        <div className="subtabs">
          <button className={`subtab ${sub === 'emails'    ? 'active' : ''}`} onClick={() => setSub('emails')}>Email Thread <span className="tc">{q.emails.length}</span></button>
          <button className={`subtab ${sub === 'analysis'  ? 'active' : ''}`} onClick={() => setSub('analysis')}>Thread Analysis</button>
          <button className={`subtab ${sub === 'documents' ? 'active' : ''}`} onClick={() => setSub('documents')}>Documents</button>
          <button className={`subtab ${sub === 'activity'  ? 'active' : ''}`} onClick={() => setSub('activity')}>Activity Log</button>
        </div>
      </div>

      {sub === 'emails' && (
        <>
          <div className="qd-actions-row">
            <button className="q-btn" onClick={() => setSummaryOpen(o => !o)}>
              {summaryOpen ? 'Hide Summary' : 'Generate Summary'}
            </button>
            <button className="q-btn primary" onClick={() => setDraftOpen(o => !o)}>
              {draftOpen ? 'Hide Draft' : 'Draft Reply'}
            </button>
          </div>

          {summaryOpen && (
            <div className="q-summary" style={{ marginTop: 0, marginBottom: 16 }}>
              {q.aiSummary}
              <button className="q-summary__hide" onClick={() => setSummaryOpen(false)}>Hide summary</button>
            </div>
          )}

          {draftOpen && (
            <div className="q-draft" style={{ marginTop: 0, marginBottom: 16 }}>
              <div className="q-draft__title">Suggested Reply</div>
              <textarea value={draftText} onChange={(e) => setDraftText(e.target.value)} />
              <div className="q-draft__actions">
                <button className="q-btn" onClick={copyDraft}>Copy to Clipboard</button>
                {copied && <span className="q-draft__copied">Copied ✓</span>}
              </div>
            </div>
          )}

          {q.emails.map(e => (
            <div className={`email-card ${e.side}`} key={e.id}>
              <div className="email-card__head">
                <div className="email-card__from">
                  <span className={`email-tag ${e.side}`}>{e.side === 'customer' ? 'Customer' : 'iCat'}</span>
                  <span className="email-card__name">{e.from}</span>
                  <span className="email-card__role">· {e.role}</span>
                </div>
                <div className="email-card__when">
                  {e.when}
                  <span className={`email-card__sent ${e.sentiment}`} />
                </div>
              </div>
              {e.newSpeaker && (<div className="new-speaker">⚡ New speaker — first appearance in this thread</div>)}
              <div className="email-card__body" style={{ marginTop: e.newSpeaker ? 12 : 0 }}>{e.body}</div>
              {e.tags && e.tags.length > 0 && (
                <div className="email-card__tags">
                  {e.tags.map((t, i) => (
                    <span key={i} className={`email-card__tag ${t.tone}`}>{t.text}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {sub === 'analysis' && <ThreadAnalysis data={q} />}

      {sub === 'documents' && (
        <div className="q-empty">No documents attached to this quote.</div>
      )}

      {sub === 'activity' && (
        <div className="activity-log">
          {q.activityLog.map((row, i) => (
            <div className="activity-log__row" key={i}>
              <div className="activity-log__when">{row.when}</div>
              <div className="activity-log__txt">{row.txt}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function ThreadAnalysis({ data }) {
  const [openAspect, setOpenAspect] = React.useState(null);
  const order = { neg: 0, neu: 1, pos: 2 };
  const aspects = [...data.threadAspects].sort((a, b) => order[a.sentiment] - order[b.sentiment]);

  const deltaToneClass = (dir, sentiment) => {
    if (dir === 'new')  return 'new';
    if (dir === 'flat') return 'flat';
    if (dir === 'up')   return sentiment === 'neg' ? 'up' : 'down';
    if (dir === 'down') return sentiment === 'neg' ? 'down' : 'up';
    return 'flat';
  };
  const deltaText = (a) => {
    if (a.delta.dir === 'new')  return a.delta.text;
    if (a.delta.dir === 'flat') return '→ stable';
    if (a.delta.dir === 'up')   return `↑ ${a.delta.text}`;
    if (a.delta.dir === 'down') return `↓ ${a.delta.text}`;
    return a.delta.text;
  };

  return (
    <>
      <div className="ins-section">
        <div className="ins-section__title">Aspects Discussed</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
          Topics mentioned across this email thread, with sentiment per mention
        </div>
        {aspects.map(a => {
          const isOpen = openAspect === a.id;
          const fillPct = a.sentiment === 'neg' ? 70 : 80;
          return (
            <div className={`aspect-row aspect-row-full ${a.sentiment} ${isOpen ? 'open' : ''}`} key={a.id}>
              <div className="aspect-row__head" onClick={() => setOpenAspect(o => o === a.id ? null : a.id)}>
                <div>
                  <div className="aspect-row__name">{a.name}</div>
                </div>
                <span className={`ta-aspect__sent ${a.sentiment}`}>
                  <span className="sdot" />{a.sentimentLabel}
                </span>
                <span className="ta-aspect__count">{a.count} {a.count === 1 ? 'mention' : 'mentions'}</span>
                <div className="aspect-bar"><div className={`aspect-bar__fill ${a.sentiment}`} style={{ width: `${fillPct}%` }} /></div>
                <div className={`aspect-delta-inline ${deltaToneClass(a.delta.dir, a.sentiment)}`}>
                  {deltaText(a)}
                </div>
              </div>
              {isOpen && (
                <div className="aspect-row__body">
                  {a.mentions.map((m, i) => (
                    <div className={`ev-inline ${m.absent ? 'absent' : ''}`} key={i}>
                      <div className="when">{m.date}</div>
                      <div className="qid">{m.quote}</div>
                      <div className="who">{m.person || ''}</div>
                      <div className="quote">{m.quoteText}{m.note ? ` (${m.note})` : ''}</div>
                      {!m.absent && <span className={`sd ${m.tone}`} />}
                      {m.absent && <span />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Customer Contacts in this Thread</div>
        <div className="speakers-3col" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {data.threadSpeakers.filter(s => s.side !== 'agent').map((s, i) => (
            <div className="ta-speaker" key={i} style={{ marginBottom: 0 }}>
              <div className="ta-speaker__head">
                <div>
                  <div className="ta-speaker__name">{s.name}</div>
                  <div className="ta-speaker__role">{s.role}</div>
                </div>
                <div className="ta-speaker__emails">{s.emails}</div>
              </div>
              {s.newSpeaker && (<div className="ta-speaker__new">⚡ {s.newSpeakerNote}</div>)}
              <div className="ta-speaker__tone">Tone: <strong>{s.tone}</strong></div>
              <div className="ta-speaker__desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Agent Performance on this Thread</div>
        {(() => {
          const agentSpeaker = data.threadSpeakers.find(s => s.side === 'agent');
          if (!agentSpeaker) return null;
          const a = data.agentPerf || {};
          return (
            <div className="agent-perf-card">
              <div className="agent-perf-card__head">
                <span className="agent-perf-card__name">{agentSpeaker.name}</span>
                <span className="agent-perf-card__station">{agentSpeaker.role}</span>
              </div>
              <div className="agent-perf-cols">
                <div>
                  <div className="agent-perf-col__title">This thread</div>
                  <div className="agent-perf-col__row">
                    <span className="lab">Response time</span>
                    <span className="v">Same day (E1→E2)</span>
                  </div>
                  <div className="agent-perf-col__row">
                    <span className="lab">Counter response</span>
                    <span className="v bad">3 days overdue</span>
                  </div>
                </div>
                <div>
                  <div className="agent-perf-col__title">On this account (Encore Global)</div>
                  <div className="agent-perf-col__row">
                    <span className="lab">Avg response</span>
                    <span className="v">4.1h</span>
                  </div>
                  <div className="agent-perf-col__row">
                    <span className="lab">Promise fulfillment</span>
                    <span className="v good">92%</span>
                  </div>
                  <div className="agent-perf-col__row">
                    <span className="lab">Win rate</span>
                    <span className="v">68%</span>
                  </div>
                  <div className="agent-perf-col__row">
                    <span className="lab">Book size</span>
                    <span className="v">18 of your accounts</span>
                  </div>
                </div>
              </div>
              <div className="agent-perf-note unusual">
                <strong>⚠ Has not responded to Mike's counter-offer.</strong> This is unusual for James — his avg response is 4.1h. Possible capacity issue (quote volume up 37% this quarter).
              </div>

              <div className="agent-perf-col__title" style={{ marginTop: 20 }}>Agents on Encore Global this quarter</div>
              <table className="agent-mini-tbl">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th className="r">Quotes</th>
                    <th className="r">Avg Resp</th>
                    <th className="r">Win Rate</th>
                    <th className="r">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>James R.</strong> <span style={{ color: 'var(--muted)' }}>· DFW</span></td>
                    <td className="r">14</td>
                    <td className="r">4.1h</td>
                    <td className="r good">68%</td>
                    <td className="r">Warm</td>
                  </tr>
                  <tr>
                    <td><strong>Agent C</strong> <span style={{ color: 'var(--muted)' }}>· Baltimore</span></td>
                    <td className="r">2</td>
                    <td className="r bad">14.2h</td>
                    <td className="r bad">38%</td>
                    <td className="r bad">Transactional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Unanswered in this Thread</div>
        {data.threadUnanswered.length === 0 ? (
          <div className="ta-empty-pos">All questions and requests have been addressed.</div>
        ) : (
          data.threadUnanswered.map((u, i) => (
            <div className={`ta-unanswered ${u.kind === 'implied' ? 'implied' : ''}`} key={i}>
              <div className="ta-unanswered__head">
                <span className="sdot" />
                {u.kind === 'implied' ? 'Implied request' : 'Question'} · {u.age}
              </div>
              <div className="ta-unanswered__meta">{u.speaker} · {u.email} · {u.date}</div>
              <div className="ta-unanswered__quote">{u.quote}</div>
              {u.note && <div className="ta-unanswered__note">{u.note}</div>}
            </div>
          ))
        )}
      </div>
    </>
  );
}

function TabIntelligence({ q }) {
  const [sub, setSub] = React.useState('actions');
  return (
    <>
      <AiBriefing
        title={`Quote Intelligence · ${q.id}`}
        date="MAY 18, 2026"
        condensed="3 actions · counter unanswered 3 days"
        actions={[
          { tone: 'red',   text: 'Price counter unanswered 3 days. Mike asked 10% off ($16,380).' },
          { tone: 'red',   text: 'Volume discount question unanswered.' },
          { tone: 'amber', text: 'Competitor mentioned. Not acknowledged.' },
        ]}
        summary="Estimated likelihood: 35%. Customer ask is within historical winning range ($15.6K-$19.8K). Mike's pattern: always counters, closes after second round at 4-6% discount."
      />

      <div className="insights-head qd-subtabs">
        <div className="subtabs">
          <button className={`subtab ${sub === 'actions'  ? 'active' : ''}`} onClick={() => setSub('actions')}>Actions <span className="tc">{q.intelligenceActions.length}</span></button>
          <button className={`subtab ${sub === 'lane'     ? 'active' : ''}`} onClick={() => setSub('lane')}>Lane</button>
          <button className={`subtab ${sub === 'signals'  ? 'active' : ''}`} onClick={() => setSub('signals')}>Signals</button>
          <button className={`subtab ${sub === 'contacts' ? 'active' : ''}`} onClick={() => setSub('contacts')}>Contacts</button>
        </div>
      </div>

      {sub === 'actions'  && <IntelActions  q={q} />}
      {sub === 'lane'     && <IntelLane     q={q} />}
      {sub === 'signals'  && <IntelSignals  q={q} />}
      {sub === 'contacts' && <IntelContacts q={q} />}
    </>
  );
}

function IntelActions({ q }) {
  return (
    <>
      {q.intelligenceActions.map((a, i) => (
        <div className="qd-action-fw" key={i}>
          <div className="qd-action-fw__head">
            <span className={`qd-action-fw__dot ${a.tone}`} />
            <div className="qd-action-fw__title">{a.title}</div>
          </div>
          <div className="qd-action-fw__ctx">{a.ctx}</div>
          {a.link && <button className="qd-action-fw__link">{a.link}</button>}
        </div>
      ))}

      <div style={{ borderTop: '1px solid var(--line)', margin: '24px 0 18px' }} />

      <div className="ins-section__title">Negotiation Pattern</div>
      <div className="qd-cust-pattern">
        Mike enters on quotes over $15K and always counters. Deals typically close after the second counter. Average discount from first quote to accepted price: 4-6%. This is the first counter. Expect one more round.
      </div>
    </>
  );
}

function IntelLane({ q }) {
  return (
    <>
      <div className="ins-section__title">Lane History: ORD→LAX White Glove</div>
      <table className="qd-lane-tbl-fw">
        <thead>
          <tr>
            <th>Quote</th>
            <th>Date</th>
            <th className="r">Amount</th>
            <th>Result</th>
            <th className="r">Response</th>
            <th>Agent</th>
          </tr>
        </thead>
        <tbody>
          {q.laneHistory.map((l, i) => (
            <tr key={i}>
              <td>{l.id}</td>
              <td>{l.date}</td>
              <td className="r">{l.amount}</td>
              <td className={
                l.result.startsWith('WON') ? 'won' :
                l.result.startsWith('LOST') ? 'lost' :
                l.result.startsWith('OPEN') ? 'open' : ''
              }>{l.result}</td>
              <td className={`r ${l.bad ? 'bad' : ''}`}>{l.response}</td>
              <td>{l.agent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lane-summary-3col">
        <div className="qd-summary-block">
          <div className="qd-summary-block__title">Pricing Summary</div>
          <div className="row"><span>Winning range</span><span className="v">$15,600 – $19,800</span></div>
          <div className="row"><span>Customer's ask</span><span className="v">$16,380</span></div>
          <div style={{ marginTop: 8 }}><span className="pos">Within range ✓</span></div>
          <div style={{ marginTop: 6 }}>Last lost gap: <span className="neg">~15% cheaper</span></div>
        </div>

        <div className="qd-summary-block">
          <div className="qd-summary-block__title">Response Summary</div>
          <div className="row"><span>Wins avg</span><span className="v">3.5h</span></div>
          <div className="row"><span>Losses avg</span><span className="v">48h</span></div>
          <div className="row"><span>Current</span><span className="v"><span className="neg">72h+</span></span></div>
          <div style={{ marginTop: 8 }}>&lt;4h converts at <strong>72%</strong>.</div>
        </div>

        <div className="qd-summary-block">
          <div className="qd-summary-block__title">Competitive Summary</div>
          <div>Competitor on: <strong>Q-1042, Q-0910</strong></div>
          <div style={{ marginTop: 6 }}>Pattern: ~12-15% cheaper on ORD→LAX consistently</div>
          <div style={{ marginTop: 6, fontStyle: 'italic' }}>Speed is the differentiator on this lane.</div>
        </div>
      </div>
    </>
  );
}

function IntelCustomer({ q }) {
  const c = q.customer;
  return (
    <>
      <div className="ins-section__title">Customer History: Encore Global</div>

      <div className="customer-2col">
        <div className="qd-summary-block">
          <div className="qd-summary-block__title">Account Overview</div>
          <div className="row"><span>Customer since</span><span className="v">{c.since}</span></div>
          <div className="row"><span>Quotes (12mo)</span><span className="v">{c.quotes12}</span></div>
          <div className="row"><span>Win rate</span><span className="v">{c.winRate} <span className="neg">({c.winRatePrev})</span></span></div>
          <div className="row"><span>Revenue</span><span className="v">{c.revenue} <span className="neg">({c.revenuePrev})</span></span></div>
          <div className="qd-summary-block__title" style={{ marginTop: 14 }}>Contacts</div>
          {c.contacts.map((line, i) => (
            <div key={i} style={{ fontSize: 12.5, color: 'var(--ink-soft)', lineHeight: 1.55, padding: '3px 0' }}>{line}</div>
          ))}
        </div>

        <div className="qd-summary-block">
          <div className="qd-summary-block__title">Services Used</div>
          {c.services.map((s, i) => (
            <div className="row" key={i}>
              <span>{s.name}</span>
              <span className="v">{s.q} quotes · {s.win} win</span>
            </div>
          ))}
          <div className="qd-summary-block__title" style={{ marginTop: 14 }}>Top Lanes</div>
          {c.lanes.map((l, i) => (
            <div className="row" key={i}>
              <span>{l.name}</span>
              <span className="v">{l.q} quotes · {l.win} win</span>
            </div>
          ))}
        </div>
      </div>

      <div className="ins-section__title" style={{ marginBottom: 8 }}>Negotiation Pattern</div>
      <div className="qd-cust-pattern" style={{ marginBottom: 18 }}>{c.negotiationPattern}</div>

      <div className="ins-section__title" style={{ marginBottom: 8 }}>Recent Notes</div>
      {c.notes.map((n, i) => (
        <div className="qd-cust-note" key={i}>
          <span className="when">{n.when}</span> {n.txt}
        </div>
      ))}
    </>
  );
}

function IntelSignals({ q }) {
  return (
    <div className="qd-signals">
      {q.signals.map((s, i) => (
        <div className="qd-signal" key={i}>
          <span className={`sd ${s.tone}`} />
          <span>{s.text}</span>
          <span className="when">{s.when}</span>
        </div>
      ))}
    </div>
  );
}

function IntelContacts({ q }) {
  return (
    <div className="speakers-3col" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
      {q.contacts.map((c, i) => (
        <div className="ta-speaker" key={i} style={{ marginBottom: 0 }}>
          <div className="ta-speaker__head">
            <div>
              <div className="ta-speaker__name">{c.name}</div>
              <div className="ta-speaker__role">{c.role} · {c.tagline}</div>
            </div>
            <div className="ta-speaker__emails">{c.emails}</div>
          </div>
          {c.newSpeaker && (<div className="ta-speaker__new">⚡ {c.newSpeakerNote}</div>)}
          <div className="ta-speaker__tone">Tone: <strong>{c.tone}</strong></div>
          <div className="ta-speaker__desc">{c.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ===== Page root =====

function QuoteDetail({ quote, onBack }) {
  const q = QUOTE_DETAIL;
  const [tab, setTab] = React.useState('details');

  return (
    <div className="qd-page">
      <div className="q-crumb">
        <div className="q-crumb__left">
          <button className="q-crumb__back" onClick={onBack}>
            <Ico.ChevronLeft /> {q.account}
          </button>
          <span className="q-crumb__sep">/</span>
          <span className="q-crumb__id">{q.id}</span>
        </div>
        <span className={`status-pill ${q.status}`}>● {q.status}</span>
      </div>

      <div className="cd-tabs">
        <button className={`cd-tab ${tab === 'details' ? 'active' : ''}`} onClick={() => setTab('details')}>Quote Details</button>
        <button className={`cd-tab ${tab === 'thread'  ? 'active' : ''}`} onClick={() => setTab('thread')}>Thread</button>
        <button className={`cd-tab insights-tab ${tab === 'intel' ? 'active' : ''}`} onClick={() => setTab('intel')}>
          <InsightsTabLabel count={QUOTE_DETAIL.intelligenceActions.length} label="Intelligence" />
        </button>
      </div>

      {tab === 'details' && <TabQuoteDetails q={q} />}
      {tab === 'thread'  && <TabThread       q={q} />}
      {tab === 'intel'   && <TabIntelligence q={q} />}
    </div>
  );
}

window.QuoteDetail = QuoteDetail;
