// Encore Global account detail page — Overview / Insights / Notes tabs

const QUOTES = [
  { id: 'Q-1042', lane: 'ORD→LAX', service: 'White Glove', status: 'open',  amount: 18200, created: 'May 12', last: '2 days ago', stale: false, agent: 'James R.',
    tipTitle: 'Mike countered on price. No response.',
    tipBody: "Mike counter-offered 10% reduction May 15. James hasn't responded. Expires May 22." },
  { id: 'Q-1055', lane: 'MKE→ORD', service: 'Ground',      status: 'open',  amount: 3100,  created: 'May 14', last: '1 day ago',  stale: false, agent: 'James R.',
    tipTitle: 'On track. Pickup Thu.',
    tipBody: 'Sarah confirmed Thursday pickup.' },
  { id: 'Q-1061', lane: 'DFW→ATL', service: 'Expedited',   status: 'open',  amount: 7800,  created: 'May 16', last: 'Today',      stale: false, agent: 'James R.',
    tipTitle: 'New. Awaiting response.',
    tipBody: 'Sent today to Sarah.' },
  { id: 'Q-1038', lane: 'ORD→SFO', service: 'White Glove', status: 'open',  amount: 22400, created: 'May 10', last: '4 days ago', stale: false, agent: 'James R.',
    tipTitle: 'Insurance Q unanswered.',
    tipBody: 'Sarah asked about cargo insurance. Same Q on Q-0952.' },
  { id: 'Q-0987', lane: 'LAX→ORD', service: 'Ground',      status: 'won',   amount: 4200,  created: 'Apr 28', last: 'May 8',      stale: false, agent: 'James R.',
    tipTitle: 'Delivered on time.', tipBody: '' },
  { id: 'Q-0952', lane: 'ORD→LAX', service: 'White Glove', status: 'won',   amount: 15600, created: 'Apr 20', last: 'May 2',      stale: false, agent: 'James R.',
    tipTitle: 'In transit.', tipBody: '' },
  { id: 'Q-0931', lane: 'SFO→JFK', service: 'Expedited',   status: 'won',   amount: 12100, created: 'Apr 15', last: 'Apr 28',     stale: false, agent: 'James R.',
    tipTitle: 'Delivered. Satisfied.', tipBody: '' },
  { id: 'Q-0910', lane: 'ORD→LAX', service: 'Ground',      status: 'lost',  amount: 8400,  created: 'Apr 10', last: 'Apr 22',     stale: true,  agent: 'Agent C',
    tipTitle: 'Lost to competitor.',
    tipBody: 'Lower rate ~15% gap.' },
  { id: 'Q-0895', lane: 'DFW→MIA', service: 'Ground',      status: 'lost',  amount: 2800,  created: 'Apr 5',  last: 'Apr 14',     stale: true,  agent: 'James R.',
    tipTitle: 'No follow-up sent.',
    tipBody: '' },
];

// ===== Account Header (top bar) =====
function AccountHero({ account, onBack }) {
  return (
    <div className="acct-hero">
      <div className="acct-hero__top">
        <button className="acct-hero__back" onClick={onBack}>
          <Ico.ChevronLeft /> Back
        </button>
        <span className="acct-hero__name">{account.name}</span>
        <span className="pill pill--red-bold">Needs Attention</span>
        <span className="acct-hero__loc">{account.station || 'DFW'} Station · {account.agent || 'James R.'}</span>
      </div>
      <div className="kpi-strip">
        <div className="kpi-strip__card">
          <div className="label">Revenue</div>
          <div className="value">$142K <span className="trend-down"><Ico.ArrowDown /></span></div>
          <div className="sub">YTD · 8% MoM</div>
        </div>
        <div className="kpi-strip__card">
          <div className="label">Win Rate</div>
          <div className="value">62%</div>
          <div className="sub">last 12 quotes</div>
        </div>
        <div className="kpi-strip__card">
          <div className="label">Open</div>
          <div className="value blue">4</div>
          <div className="sub">$51K in pipeline</div>
        </div>
        <div className="kpi-strip__card">
          <div className="label">Won</div>
          <div className="value">5</div>
          <div className="sub">$48K · this qtr</div>
        </div>
        <div className="kpi-strip__card">
          <div className="label">Lost</div>
          <div className="value">3</div>
          <div className="sub">$19K · this qtr</div>
        </div>
      </div>
    </div>
  );
}

// ===== Overview — quote table =====
function InfoCell({ title, detail }) {
  const [open, setOpen] = React.useState(false);
  return (
    <td className={`info-cell ${open ? 'open' : ''}`} onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}>
      <button className="info-icon" aria-label="More info">i</button>
      <div className="info-tooltip" role="tooltip">
        <div className="ttl">{title}</div>
        {detail && <div className="det">{detail}</div>}
      </div>
    </td>
  );
}

function QuoteSection({ onOpenQuote }) {
  const [status, setStatus] = React.useState('All');
  const [query, setQuery]   = React.useState('');

  const filtered = QUOTES.filter(q => {
    if (status !== 'All' && q.status !== status.toLowerCase()) return false;
    if (query) {
      const qq = query.toLowerCase();
      return q.id.toLowerCase().includes(qq) ||
             q.lane.toLowerCase().includes(qq) ||
             q.service.toLowerCase().includes(qq) ||
             q.agent.toLowerCase().includes(qq);
    }
    return true;
  });

  return (
    <section>
      <div className="qt-toolbar">
        <span className="label">Quotes</span>
        <FilterDropdown
          label="Status"
          value={status}
          options={['All', 'Open', 'Won', 'Lost']}
          onChange={setStatus}
        />
        <div className="search" style={{ flex: 1 }}>
          <Ico.Search />
          <input
            placeholder="Search by quote ID, lane, or agent..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="table-wrap">
        <table className="tbl qt-table">
          <thead>
            <tr>
              <th style={{ width: '26%' }}>Quote</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Created</th>
              <th>Last Activity</th>
              <th>Agent</th>
              <th aria-label=""></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(q => (
              <tr key={q.id} onClick={() => onOpenQuote && onOpenQuote(q)} style={{ cursor: 'pointer' }}>
                <td>
                  <div className="qt-lane">{q.lane} {q.service}</div>
                  <div className="qt-id">{q.id}</div>
                </td>
                <td><span className={`status-pill ${q.status}`}>{q.status}</span></td>
                <td className="amount">${q.amount.toLocaleString()}</td>
                <td className="when">{q.created}</td>
                <td className={`when ${q.stale ? 'stale' : ''}`}>{q.last}</td>
                <td className="agent">{q.agent}</td>
                <InfoCell title={q.tipTitle} detail={q.tipBody} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cd-overview-hint">
        Click any quote for lane-level pricing, response time, and competitive intelligence
      </div>
    </section>
  );
}

// ===== Customer Insights — full width with sub-tabs =====
function CustomerInsights() {
  const [sub, setSub] = React.useState('actions');
  const data = ACCOUNT_INTEL;

  return (
    <>
      <AiBriefing
        title="AI Briefing for Encore Global"
        date="MAY 18, 2026"
        condensed="3 items need attention · pricing ↓"
        actions={[
          { tone: 'red',   text: "Q-1042: Mike's price counter unanswered 3 days. $18K at risk." },
          { tone: 'red',   text: "Q-1038: Sarah's insurance question asked twice, never answered." },
          { tone: 'amber', text: 'Q-0895: No follow-up sent in 14 days.' },
        ]}
        summary="Pricing sentiment trending negative (62% negative, up from 40%). Win rate declining: 62% vs 70% last quarter. Ops response: 8.2h."
      />

      <div className="insights-head">
        <div className="subtabs">
          <button className={`subtab ${sub === 'actions'   ? 'active' : ''}`} onClick={() => setSub('actions')}>Actions <span className="tc">{data.actions.length}</span></button>
          <button className={`subtab ${sub === 'health'    ? 'active' : ''}`} onClick={() => setSub('health')}>Health</button>
          <button className={`subtab ${sub === 'sentiment' ? 'active' : ''}`} onClick={() => setSub('sentiment')}>Sentiment</button>
          <button className={`subtab ${sub === 'contacts'  ? 'active' : ''}`} onClick={() => setSub('contacts')}>Contacts <span className="tc">{data.contacts.length}</span></button>
          <button className={`subtab ${sub === 'analysis'  ? 'active' : ''}`} onClick={() => setSub('analysis')}>Analysis</button>
          <button className={`subtab ${sub === 'agents'    ? 'active' : ''}`} onClick={() => setSub('agents')}>Agents <span className="tc">{data.accountAgents.length}</span></button>
        </div>
      </div>

      <div className="insights-body">
        {sub === 'actions'   && <CdActions   data={data} />}
        {sub === 'health'    && <CdHealth    data={data} />}
        {sub === 'sentiment' && <CdSentiment data={data} />}
        {sub === 'contacts'  && <CdContacts  data={data} />}
        {sub === 'analysis'  && <CdAnalysis  data={data} />}
        {sub === 'agents'    && <CdAgents    data={data} />}
      </div>
    </>
  );
}

// ===== Sentiment sub-tab =====
function CdSentiment({ data }) {
  const [period, setPeriod] = React.useState('quarter');
  const [view, setView]     = React.useState('overall');
  const [forceFull, setForceFull] = React.useState(false);

  // Encore Global averages 2.3 emails/month — below threshold (5+ for 3 consecutive months).
  // Default: show insufficient-data state. Allow user to override for demo via small link.
  const sufficient = forceFull;

  if (!sufficient) {
    return (
      <div className="sent-insufficient">
        <div className="sent-insufficient__title">Customer Sentiment Trend</div>
        <p>
          Sentiment trending requires at least 5 customer emails per month for 3 consecutive months.
        </p>
        <p>
          Current average: <strong>2.3 emails/month</strong> from this customer.
        </p>
        <p>
          Individual email sentiments are available in the Analysis tab,
          where you can see per-email and per-aspect sentiment with evidence.
        </p>
        <div className="sent-insufficient__links">
          <button className="sent-insufficient__link">View Analysis tab →</button>
          <button className="sent-insufficient__demo" onClick={() => setForceFull(true)}>
            Preview full view (demo)
          </button>
        </div>
      </div>
    );
  }

  // 12-month overall sentiment data
  const overall = {
    months: ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],
    points: [
      { v: 0.5,  tone: 'pos', emails: 8 },
      { v: 0.55, tone: 'pos', emails: 10 },
      { v: 0.45, tone: 'pos', emails: 7 },
      { v: 0.6,  tone: 'pos', emails: 9 },
      { v: 0.4,  tone: 'pos', emails: 11 },
      { v: 0.2,  tone: 'pos', emails: 12 },
      { v: 0.1,  tone: 'neu', emails: 8 },
      { v: 0.0,  tone: 'neu', emails: 9 },
      { v: -0.2, tone: 'neg', emails: 10 },
      { v: -0.3, tone: 'neg', emails: 11 },
      { v: -0.4, tone: 'neg', emails: 9 },
      { v: -0.5, tone: 'neg', emails: 12 },
    ],
  };
  const byAspect = {
    pricing: [0.0, 0.0, -0.1, 0.1, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.7],
    service: [0.6, 0.65, 0.55, 0.7, 0.55, 0.5, 0.55, 0.6, 0.55, 0.5, 0.45, 0.5],
    timing:  [0.2, 0.25, 0.2, 0.3, 0.25, 0.2, 0.15, 0.2, 0.15, 0.1, 0.15, 0.2],
  };
  const byContact = {
    sarah: [0.6, 0.65, 0.55, 0.7, 0.6, 0.55, 0.5, 0.55, 0.5, 0.45, 0.5, 0.55],
    mike:  [null, null, null, null, null, null, null, null, -0.3, -0.4, -0.6, -0.8],
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <InsTimeFilter
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'month',   label: 'This Month' },
            { id: 'quarter', label: 'This Quarter' },
            { id: 'year',    label: 'This Year' },
          ]}
        />
      </div>

      <div className="ins-section__title" style={{ marginBottom: 4 }}>Overall Customer Sentiment Trend</div>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>Average customer email sentiment per month</div>

      <CustSentimentChart
        view={view}
        overall={overall}
        byAspect={byAspect}
        byContact={byContact}
      />

      <div className="sent-sub-toggle">
        <button className={view === 'overall'  ? 'active' : ''} onClick={() => setView('overall')}>Overall</button>
        <button className={view === 'aspect'   ? 'active' : ''} onClick={() => setView('aspect')}>By Aspect</button>
        <button className={view === 'contact'  ? 'active' : ''} onClick={() => setView('contact')}>By Contact</button>
      </div>

      {view === 'aspect' && (
        <div className="sent-legend-row">
          <span className="legend-item"><span className="legend-sw solid-red" /> Pricing</span>
          <span className="legend-item"><span className="legend-sw dashed" /> Service</span>
          <span className="legend-item"><span className="legend-sw dotted" /> Timing</span>
        </div>
      )}
      {view === 'contact' && (
        <div className="sent-legend-row">
          <span className="legend-item"><span className="legend-sw solid-green" /> Sarah Chen</span>
          <span className="legend-item"><span className="legend-sw solid-red" /> Mike Rivera</span>
        </div>
      )}

      <div className="ins-ai-summary" style={{ marginTop: 24 }}>
        Pricing sentiment has shifted from mostly neutral (last quarter) to mostly negative (this quarter). 5 of 8 pricing mentions this quarter were negative. Sarah remains warm and collaborative. Mike's tone has become increasingly transactional since March.
      </div>
    </>
  );
}

function CustSentimentChart({ view, overall, byAspect, byContact }) {
  const n = overall.months.length;
  const W = 720, H = 200, padL = 40, padR = 16, padT = 16, padB = 32;
  const xs = (i) => padL + (i / (n - 1)) * (W - padL - padR);
  const ys = (v) => padT + ((1 - (v + 1) / 2)) * (H - padT - padB);

  const renderLine = (values, cls, dash, key) => {
    const segs = [];
    let last = -1;
    for (let i = 0; i < values.length; i++) {
      if (values[i] == null) continue;
      if (last >= 0) {
        segs.push(`M ${xs(last)} ${ys(values[last])} L ${xs(i)} ${ys(values[i])}`);
      }
      last = i;
    }
    return (
      <g key={key}>
        {segs.map((d, i) => (
          <path key={i} className={`seg ${cls} ${dash || ''}`} d={d} />
        ))}
        {values.map((v, i) => v != null ? (
          <circle key={`d${i}`} className={`dot ${cls.replace('sarah','pos').replace('mike','neg').replace('pricing','neg').replace('service','pos').replace('timing','neu')}`} cx={xs(i)} cy={ys(v)} r={2.6} />
        ) : null)}
      </g>
    );
  };

  return (
    <svg className="cust-sent-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <line className="grid-mid" x1={padL} x2={W - padR} y1={ys(0)} y2={ys(0)} />
      <line className="axis"     x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} />
      <text className="lbl-y" x="2" y={ys(0.9)}>POS</text>
      <text className="lbl-y" x="2" y={ys(-0.9) + 4}>NEG</text>
      <text className="lbl-y" x="2" y={ys(0) + 3} style={{ opacity: 0.5 }}>NEU</text>

      {view === 'overall' && (() => {
        const vals = overall.points.map(p => p.v);
        const segs = [];
        for (let i = 0; i < n - 1; i++) {
          const a = overall.points[i], b = overall.points[i + 1];
          const cls = a.tone === b.tone ? a.tone : (b.v < 0 ? 'neg' : 'pos');
          segs.push({ d: `M ${xs(i)} ${ys(a.v)} L ${xs(i + 1)} ${ys(b.v)}`, cls });
        }
        return (
          <g>
            {segs.map((s, i) => <path key={i} className={`seg ${s.cls}`} d={s.d} />)}
            {overall.points.map((p, i) => (
              <circle key={i} className={`dot ${p.tone}`} cx={xs(i)} cy={ys(p.v)} r="2.8" />
            ))}
          </g>
        );
      })()}

      {view === 'aspect' && (
        <>
          {renderLine(byAspect.pricing, 'pricing', '', 'p')}
          {renderLine(byAspect.service, 'service', 'dashed', 's')}
          {renderLine(byAspect.timing,  'timing',  'dotted', 't')}
        </>
      )}

      {view === 'contact' && (
        <>
          {renderLine(byContact.sarah, 'sarah', '', 'sa')}
          {renderLine(byContact.mike,  'mike',  '', 'mi')}
        </>
      )}

      {overall.months.map((m, i) => (
        <text key={i} className="lbl-x" x={xs(i)} y={H - padB + 16} textAnchor="middle">{m}</text>
      ))}
    </svg>
  );
}

function CdActions({ data }) {
  const [period, setPeriod] = React.useState('today');
  if (!data.actions.length) {
    return <div className="cp-empty-center pos">No actions needed. This account is on track.</div>;
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div className="copilot__sub" style={{ margin: 0 }}>AI-recommended for Encore Global</div>
        <InsTimeFilter
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'today',   label: 'Today' },
            { id: 'week',    label: 'Week' },
            { id: 'month',   label: 'Month' },
            { id: 'quarter', label: 'Quarter' },
          ]}
        />
      </div>
      {data.actions.map(a => (
        <ActionRow key={a.id} action={a} compact={true} showAccount={false} />
      ))}
    </>
  );
}

function CdHealth({ data }) {
  const [period, setPeriod] = React.useState('quarter');
  const TrendIcon = ({ d }) => {
    if (d === 'down') return <span className="arrow down"><Ico.ArrowDown /></span>;
    if (d === 'up')   return <span className="arrow up"><Ico.ArrowUp /></span>;
    if (d === 'flat') return <span className="arrow flat"><Ico.ArrowRight /></span>;
    return null;
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
        <InsTimeFilter
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'month',   label: 'This Month' },
            { id: 'quarter', label: 'This Quarter' },
            { id: 'year',    label: 'This Year' },
          ]}
        />
      </div>
      <div className="ins-ai-summary">{data.healthSummary}</div>

      <div className="health-2col">
        <div className="health-col">
          <div className="health-col__title">Behavioral Trends</div>
          {data.behavioral.map((b, i) => (
            <div className="kv-row" key={i}>
              <span className="lab">{b.lab}</span>
              <span className="v">{b.v} <TrendIcon d={b.trend} /></span>
            </div>
          ))}
        </div>
        <div className="health-col">
          <div className="health-col__title">Operational Metrics</div>
          {data.operational.map((o, i) => (
            <div className="kv-row" key={i}>
              <span className="lab">{o.lab}</span>
              <span className="v">{o.v} <TrendIcon d={o.trend} /></span>
            </div>
          ))}
        </div>
      </div>

      <div className="cd-charts-2col" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="cd-chart-card">
          <div className="cd-chart-card__title">Win Rate Trend</div>
          <div className={`cd-chart-card__current ${data.winRateTrend.direction}`}>{data.winRateTrend.current}</div>
          <div className="cd-chart-card__sub">May · current</div>
          <CdLineChart trend={data.winRateTrend} unit="%" />
        </div>
        <div className="cd-chart-card">
          <div className="cd-chart-card__title">Revenue Trend</div>
          <div className={`cd-chart-card__current ${data.revenueTrend.direction}`}>{data.revenueTrend.current}</div>
          <div className="cd-chart-card__sub">May · current</div>
          <CdLineChart trend={data.revenueTrend} unit="K" prefix="$" />
        </div>
        <div className="cd-chart-card">
          <div className="cd-chart-card__title">Quote Volume Trend</div>
          <div className="cd-chart-card__current">{data.quoteVolumeTrend.current}</div>
          <div className="cd-chart-card__sub">this month · 33% below 6-mo avg</div>
          {(() => {
            const vals = data.quoteVolumeTrend.values;
            const months = data.quoteVolumeTrend.months;
            const max = Math.max(...vals);
            const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
            return (
              <>
                <div className="ad-bar-chart">
                  {vals.map((v, i) => {
                    const low = v < avg * 0.7;
                    return (
                      <div className="ad-bar-chart__col" key={i}>
                        <div className="ad-bar-chart__val">{v}</div>
                        <div className="ad-bar-chart__bar" style={{ height: `${(v / max) * 100}%`, background: low ? 'var(--amber)' : 'var(--ink)' }} />
                      </div>
                    );
                  })}
                </div>
                <div className="ad-bar-chart__axis">
                  {months.map((m, i) => (
                    <div className="ad-bar-chart__axis-cell" key={i}>{m}</div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      <div className="cd-charts-2col">
        <div className="cd-chart-card">
          <div className="cd-chart-card__title">Services Used</div>
          <CdHBars rows={data.servicesUsed} />
        </div>
        <div className="cd-chart-card">
          <div className="cd-chart-card__title">Top Lanes</div>
          <CdHBars rows={data.topLanes} />
        </div>
      </div>

      <div className="ins-section__title" style={{ marginBottom: 8 }}>Negotiation Pattern</div>
      <div className="cd-neg-pattern">{data.negotiationPattern}</div>

      {data.riskFlags && data.riskFlags.length > 0 && (
        <div className="cp-block">
          <div className="cp-block__title">Risk Flags</div>
          {data.riskFlags.map((f, i) => (
            <div className="risk-flag" key={i}>{f.text}</div>
          ))}
        </div>
      )}
    </>
  );
}

function CdLineChart({ trend, unit, prefix }) {
  const vals = trend.values;
  const n = vals.length;
  const W = 360, H = 130, padL = 26, padR = 10, padT = 12, padB = 22;
  const min = Math.min(...vals) - (Math.max(...vals) - Math.min(...vals)) * 0.25;
  const max = Math.max(...vals) + (Math.max(...vals) - Math.min(...vals)) * 0.15;
  const xs = (i) => padL + (i / (n - 1)) * (W - padL - padR);
  const ys = (v) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);
  const line = vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xs(i).toFixed(1)} ${ys(v).toFixed(1)}`).join(' ');
  const cls = trend.direction || 'grey';
  return (
    <svg className="cd-line-chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <line className="axis" x1={padL} x2={W - padR} y1={H - padB} y2={H - padB} />
      <path className={`line ${cls}`} d={line} />
      {vals.map((v, i) => (
        <circle key={i} className={`dot ${cls}`} cx={xs(i)} cy={ys(v)} r={i === n - 1 ? 3.4 : 2.5} />
      ))}
      {trend.months.map((m, i) => (
        <text key={i} className="lbl" x={xs(i)} y={H - 5} textAnchor="middle">{m}</text>
      ))}
      {/* y axis labels */}
      <text className="lbl" x="2" y={ys(max) + 3}>{prefix || ''}{Math.round(max)}{unit || ''}</text>
      <text className="lbl" x="2" y={ys(min) + 3}>{prefix || ''}{Math.round(min)}{unit || ''}</text>
    </svg>
  );
}

function CdHBars({ rows }) {
  const max = Math.max(...rows.map(r => r.q));
  const winCls = (w) => w >= 70 ? 'good' : w < 50 ? 'bad' : 'neu';
  return (
    <div className="cd-hbars">
      {rows.map((r, i) => (
        <div className="cd-hbar-row" key={i}>
          <div className="nm">{r.name}</div>
          <div className="track"><div className="fill" style={{ width: `${(r.q / max) * 100}%` }} /></div>
          <div className="q">{r.q}q</div>
          <div className={`win ${winCls(r.win)}`}>{r.win}%</div>
        </div>
      ))}
    </div>
  );
}

function CdContacts({ data }) {
  return (
    <>
      <div className="copilot__sub" style={{ marginBottom: 18 }}>Discovered from email patterns</div>
      <div className="contacts-3col">
        {data.contacts.map(c => (
          <div className="contact-card-full" key={c.id}>
            <div className="contact-card-full__top">
              <span className={`sdot ${c.tone}`} />
              <div>
                <div className="nm">{c.name}</div>
                <div className="role">{c.role}</div>
                <div className="freq">{c.freq}</div>
              </div>
            </div>
            {c.pattern && <div className="pattern">{c.pattern}</div>}
          </div>
        ))}
      </div>
    </>
  );
}

function CdAnalysis({ data }) {
  const [openId, setOpenId] = React.useState(null);
  const toggle = (id) => setOpenId(o => o === id ? null : id);

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
      <div className="copilot__sub" style={{ marginBottom: 18 }}>Based on email analysis across this account's quotes</div>

      <div className="ins-section">
        <div className="ins-section__title">What they're talking about</div>
        {data.aspects.map(a => {
          const isOpen = openId === a.id;
          const fillPct = a.sentiment === 'neg' ? a.pctNegative : (100 - a.pctNegative);
          return (
            <div className={`aspect-row aspect-row-full ${a.sentiment} ${isOpen ? 'open' : ''}`} key={a.id}>
              <div className="aspect-row__head" onClick={() => toggle(a.id)}>
                <div>
                  <div className="aspect-row__name">{a.name}</div>
                </div>
                <span className={`ta-aspect__sent ${a.sentiment}`}>
                  <span className="sdot" />
                  {a.sentiment === 'neg' ? 'Negative' : a.sentiment === 'pos' ? 'Positive' : 'Neutral'}
                </span>
                <div className="aspect-row__count">{a.mentions} mentions</div>
                <div className="aspect-bar"><div className={`aspect-bar__fill ${a.sentiment}`} style={{ width: `${fillPct}%` }} /></div>
                <div className={`aspect-delta-inline ${deltaToneClass(a.delta.dir, a.sentiment)}`}>
                  {deltaText(a)}
                </div>
              </div>
              {isOpen && (
                <div className="aspect-row__body">
                  {(data.evidence[a.id] || []).map((e, i) => (
                    <div className="cd-ev" key={i}>
                      <div className="cd-ev__head">
                        <span className={`sd ${e.tone || (a.sentiment === 'neg' ? 'red' : a.sentiment === 'pos' ? 'green' : 'grey')}`} />
                        <span>{e.date} · {e.quote} · {e.person}</span>
                      </div>
                      <div className="cd-ev__quote">{e.quoteText}</div>
                      <div className="ev-attr">
                        {e.carrier && <>Carrier: {e.carrier} · </>}
                        Lane: {e.lane || a.lane || 'ORD→LAX'} · Agent: {e.agent || 'James R.'}
                        {e.delay && <> · {e.delay}</>}
                      </div>
                    </div>
                  ))}
                  {a.pattern && (
                    <div className="pattern-detected">
                      {a.pattern.map((line, j) => (
                        <div className="pattern-detected__row" key={j} dangerouslySetInnerHTML={{ __html: line }} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Open Questions</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
          Customer questions awaiting response
        </div>
        {data.openQuestions.length === 0 ? (
          <div className="cp-positive-empty">All customer questions have been addressed</div>
        ) : (
          data.openQuestions.map((q, i) => (
            <div className="qa-card" key={i}>
              <div className="qa-card__meta">{q.quote} · {q.person} · {q.date}</div>
              <div className="qa-card__quote">{q.text}</div>
              <div className="qa-card__pending">
                {q.pending}
                {q.repeat && <> · <span className="qa-card__repeat">{q.repeat}</span></>}
              </div>
              <button className="qa-card__link">View quote →</button>
            </div>
          ))
        )}
      </div>

      <div className="ins-section">
        <div className="ins-section__title">Open Promises</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
          Ops commitments pending fulfillment
        </div>
        {data.openPromises.length === 0 ? (
          <div className="cp-positive-empty">No outstanding commitments</div>
        ) : (
          data.openPromises.map((p, i) => (
            <div className="qa-card" key={i}>
              <div className="qa-card__meta">{p.person} · {p.quote} · {p.date}</div>
              <div className="qa-card__quote">{p.text}</div>
              <div className="qa-card__pending">
                Due: {p.due} · <span className="qa-card__overdue">{p.overdue}</span>
              </div>
              <button className="qa-card__link">View quote →</button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function CdAgents({ data }) {
  const [period, setPeriod] = React.useState('quarter');
  const agents = [...data.accountAgents].sort((a, b) => b.quotes - a.quotes);
  const primaryId = agents.length >= 2 && (agents[0].quotes - agents[1].quotes) > 2
    ? agents[0].id
    : (agents.length === 1 ? agents[0].id : null);
  const winClass  = (w) => w < 40 ? 'bad' : w > 70 ? 'good' : 'neu';
  const respClass = (r) => r > 10 ? 'bad' : 'neu';

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div className="copilot__sub" style={{ margin: 0 }}>Ops agents who have handled Encore Global's quotes</div>
        <InsTimeFilter
          value={period}
          onChange={setPeriod}
          options={[
            { id: 'quarter', label: 'This Quarter' },
            { id: 'year',    label: 'This Year' },
            { id: 'all',     label: 'All Time' },
          ]}
        />
      </div>

      <table className="cd-agents-tbl">
        <thead>
          <tr>
            <th>Agent</th>
            <th>Station</th>
            <th>Sentiment</th>
            <th className="r">Win Rate</th>
            <th className="r">Avg Response</th>
            <th className="center" aria-label=""></th>
          </tr>
        </thead>
        <tbody>
          {agents.map(ag => (
            <tr key={ag.id}>
              <td>
                <span className="agent-name">
                  {ag.name}
                  {ag.id === primaryId && <span className="pri">Primary</span>}
                </span>
              </td>
              <td><span className="agent-station">{ag.station}</span></td>
              <td>
                <span className={`sent-pill ${ag.sentimentDot}`}>
                  <span className="sdot" />
                  {ag.sentimentWord}
                </span>
              </td>
              <td className={`r ${winClass(ag.winRate)}`}>{ag.winRate}%</td>
              <td className={`r ${respClass(ag.avgResponseH)}`}>{ag.avgResponseH}h</td>
              <AgentTipCell title={ag.tipTitle} body={ag.tipBody} comparable={ag.comparable} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function AgentTipCell({ title, body, comparable }) {
  const [open, setOpen] = React.useState(false);
  return (
    <td
      className={`info-cell agent-info center ${open ? 'open' : ''}`}
      onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
    >
      <button className="info-icon" aria-label="More info">i</button>
      <div className="info-tooltip" role="tooltip" style={{ width: 320 }}>
        <div className="ttl">{title}</div>
        <div className="det">{body}</div>
        {comparable && (
          <div className="det" style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <strong style={{ color: '#fff' }}>Comparable:</strong> {comparable}
          </div>
        )}
      </div>
    </td>
  );
}

// ===== Notes (primary tab) =====
function CustomerNotes({ data }) {
  const [notes, setNotes] = React.useState(data.notes);
  const [draft, setDraft] = React.useState('');
  const save = () => {
    const text = draft.trim();
    if (!text) return;
    setNotes(n => [{ when: 'Today', txt: text }, ...n]);
    setDraft('');
  };
  return (
    <>
      <div className="copilot__sub" style={{ marginBottom: 18 }}>Your notes about Encore Global</div>
      <textarea
        className="cd-notes-input"
        placeholder="Add a note about this account..."
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <button className="cd-notes-save" onClick={save} disabled={!draft.trim()}>Save Note</button>
      <div style={{ marginTop: 24 }}>
        {notes.map((n, i) => (
          <div className="cd-note" key={i}>
            <div className="when">{n.when}</div>
            <div className="txt">{n.txt}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ===== Page root =====

function AccountDetail({ account, onBack, onOpenQuote }) {
  const display = { ...account, name: 'Encore Global', station: account.station || 'DFW', agent: account.agent || 'James R.' };
  const [tab, setTab] = React.useState('overview');

  return (
    <>
      <AccountHero account={display} onBack={onBack} />

      <div className="cd-tabs">
        <button className={`cd-tab ${tab === 'overview' ? 'active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
        <button className={`cd-tab insights-tab ${tab === 'insights' ? 'active' : ''}`} onClick={() => setTab('insights')}>
          <InsightsTabLabel count={ACCOUNT_INTEL.actions.length} />
        </button>
        <button className={`cd-tab ${tab === 'notes' ? 'active' : ''}`} onClick={() => setTab('notes')}>Notes</button>
      </div>

      {tab === 'overview' && <QuoteSection onOpenQuote={onOpenQuote} />}
      {tab === 'insights' && <CustomerInsights />}
      {tab === 'notes'    && <CustomerNotes data={ACCOUNT_INTEL} />}
    </>
  );
}

window.AccountDetail = AccountDetail;
